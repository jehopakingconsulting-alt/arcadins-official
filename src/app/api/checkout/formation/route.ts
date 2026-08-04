import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { PROGRAM_CHECKOUT_ENABLED } from "@/lib/config/launch-flags";
import { buildFormationCheckoutPlan, isSellableFormation, type FormationPlanId } from "@/lib/commerce/formation-commerce";

/**
 * Checkout AUTONOME d'une Formation professionnelle (Département B), 4 modalités :
 *  - full        → paiement complet ; BNPL (Klarna/Affirm/Afterpay) proposé
 *                  automatiquement par Stripe s'il est activé dans le dashboard.
 *  - installments_3 / installments_6 → abonnement mensuel égal (ARCADINS encaisse) ;
 *                  le webhook borne le nombre de cycles (cancel_at) ; les handlers
 *                  invoice.* existants gèrent suspension/rétablissement.
 * Prix 100 % serveur. Écritures d'accès déférées au webhook. Gardé par le flag.
 */
export async function POST(request: Request) {
  if (!PROGRAM_CHECKOUT_ENABLED) return NextResponse.json({ error: "checkout_disabled" }, { status: 404 });
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").trim() || "https://arcadins-official.vercel.app";

  let payload: { slug?: string; planId?: string };
  try { payload = await request.json(); } catch { return NextResponse.json({ error: "invalid_body" }, { status: 400 }); }
  const slug = String(payload.slug || "");
  const planId = (payload.planId || "full") as FormationPlanId;
  if (!isSellableFormation(slug)) return NextResponse.json({ error: "unknown_formation" }, { status: 400 });

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    const loginUrl = new URL("/auth/login", siteUrl);
    loginUrl.searchParams.set("redirect", `/inscription/formation?slug=${slug}`);
    return NextResponse.json({ error: "unauthenticated", redirect: loginUrl.toString() }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data: feeRow } = await admin.from("registration_fee_payments").select("user_id").eq("user_id", user.id).maybeSingle();

  const plan = buildFormationCheckoutPlan({ slug, userId: user.id, planId, registrationFeeAlreadyPaid: Boolean(feeRow) });
  if (!plan.ok || !plan.metadata) return NextResponse.json({ error: plan.error || "invalid_plan" }, { status: 400 });

  const orderReference = `ORD-FORM-${slug.toUpperCase().slice(0, 6)}-${crypto.randomUUID().slice(0, 8)}`;
  const metadata: Record<string, string> = {
    type: "formation-purchase", slug: plan.metadata.slug, formationName: plan.metadata.formationName,
    userId: user.id, planId: plan.planId, cycles: String(plan.cycles),
    registrationFeeIncluded: String(plan.metadata.registrationFeeIncluded), orderReference,
  };
  const success_url = `${siteUrl}/inscription/succes?session_id={CHECKOUT_SESSION_ID}&type=formation`;
  const cancel_url = `${siteUrl}/formations/${slug}?checkout=cancelled`;

  try {
    let session: Stripe.Checkout.Session;

    if (plan.mode === "payment") {
      // Paiement complet — payment_method_types OMIS => Stripe propose carte + BNPL
      // (Klarna/Affirm/Afterpay) selon ce qui est activé dans le dashboard.
      session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: user.email,
        line_items: plan.oneTimeLineItems.map((li) => ({
          price_data: { currency: plan.currency, product_data: { name: li.label }, unit_amount: li.amountCents },
          quantity: 1,
        })),
        success_url, cancel_url, metadata,
      });
    } else {
      // Échelonné — mensualité récurrente + lignes ponctuelles (frais) sur la 1re facture.
      const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
        {
          price_data: {
            currency: plan.currency,
            product_data: { name: `${plan.metadata.formationName} — mensualité (${plan.cycles}×)` },
            unit_amount: plan.recurringCents,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
        ...plan.oneTimeLineItems.map((li) => ({
          price_data: { currency: plan.currency, product_data: { name: li.label }, unit_amount: li.amountCents },
          quantity: 1,
        })),
      ];
      session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer_email: user.email,
        line_items,
        success_url, cancel_url, metadata,
      });
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Formation checkout error:", err);
    return NextResponse.json({ error: "stripe" }, { status: 502 });
  }
}
