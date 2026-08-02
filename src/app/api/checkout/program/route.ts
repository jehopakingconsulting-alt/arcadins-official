import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { PROGRAM_CHECKOUT_ENABLED } from "@/lib/config/launch-flags";
import {
  buildProgramCheckoutPlan,
  isProgramCode,
  PROGRAM_NAMES,
} from "@/lib/commerce/program-commerce";

/**
 * Checkout SELF-SERVICE des Programmes officiels (TEF & TCF Canada).
 * Le prix est ENTIÈREMENT calculé côté serveur (program-commerce) : le navigateur
 * n'envoie qu'un identifiant de programme + forfait. Aucune écriture d'accès ici —
 * l'inscription/entitlement est créée UNIQUEMENT par le webhook après paiement vérifié.
 * Gardé par PROGRAM_CHECKOUT_ENABLED : tant que le flag est OFF, la route est inactive
 * (aucun checkout partiel exposé en production).
 */
export async function POST(request: Request) {
  if (!PROGRAM_CHECKOUT_ENABLED) {
    return NextResponse.json({ error: "checkout_disabled" }, { status: 404 });
  }

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").trim() || "https://arcadins-official.vercel.app";

  let payload: { program?: string; packageKey?: string; sessionRef?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const program = String(payload.program || "");
  const packageKey = String(payload.packageKey || "");
  const sessionRef = payload.sessionRef ? String(payload.sessionRef) : null;

  if (!isProgramCode(program)) {
    return NextResponse.json({ error: "unknown_program" }, { status: 400 });
  }

  // ── Authentification requise AVANT paiement (aucun accès payant anonyme). ──
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    const loginUrl = new URL("/auth/login", siteUrl);
    loginUrl.searchParams.set("redirect", `/${program === "tcf-canada" ? "tcf" : "tef"}`);
    return NextResponse.json({ error: "unauthenticated", redirect: loginUrl.toString() }, { status: 401 });
  }

  // ── Frais d'inscription global : déjà payé par cet étudiant ? (décision serveur) ──
  const admin = createAdminClient();
  const { data: feeRow } = await admin
    .from("registration_fee_payments")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  const registrationFeeAlreadyPaid = Boolean(feeRow);

  const plan = buildProgramCheckoutPlan({
    program,
    packageKey,
    userId: user.id,
    registrationFeeAlreadyPaid,
  });
  if (!plan.ok || !plan.metadata) {
    return NextResponse.json({ error: plan.error || "invalid_plan" }, { status: 400 });
  }

  const orderReference = `ORD-${program.toUpperCase().replace("-CANADA", "")}-${crypto.randomUUID().slice(0, 8)}`;
  const successPath = program === "tcf-canada" ? "/tcf" : "/tef";

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment", // TEF/TCF = paiement intégral, jamais d'abonnement
      customer_email: user.email,
      line_items: plan.lineItems.map((li) => ({
        price_data: {
          currency: plan.currency,
          product_data: { name: li.label },
          unit_amount: li.amountCents,
        },
        quantity: 1,
      })),
      success_url: `${siteUrl}/inscription/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}${successPath}?checkout=cancelled`,
      metadata: {
        type: "program-purchase",
        program: plan.metadata.program,
        programName: PROGRAM_NAMES[plan.metadata.program],
        packageKey: plan.metadata.packageKey,
        userId: user.id,
        registrationFeeIncluded: String(plan.metadata.registrationFeeIncluded),
        accessWeeks: plan.metadata.accessWeeks,
        enrollmentSessionId: sessionRef || "",
        orderReference,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Program checkout error:", err);
    return NextResponse.json({ error: "stripe" }, { status: 502 });
  }
}
