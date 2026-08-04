import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { PROGRAM_CHECKOUT_ENABLED } from "@/lib/config/launch-flags";
import { buildFormationCheckoutPlan, isSellableFormation } from "@/lib/commerce/formation-commerce";

/**
 * Checkout AUTONOME d'une Formation professionnelle (Département B).
 * Prix 100 % serveur (formation-commerce). Aucune écriture d'accès ici : le webhook
 * (branche formation-purchase) crée l'`enrollments` active → /formations/[slug]/learn
 * débloque tout seul. Gardé par PROGRAM_CHECKOUT_ENABLED (inactif tant que OFF).
 */
export async function POST(request: Request) {
  if (!PROGRAM_CHECKOUT_ENABLED) {
    return NextResponse.json({ error: "checkout_disabled" }, { status: 404 });
  }
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").trim() || "https://arcadins-official.vercel.app";

  let payload: { slug?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  const slug = String(payload.slug || "");
  if (!isSellableFormation(slug)) {
    return NextResponse.json({ error: "unknown_formation" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    const loginUrl = new URL("/auth/login", siteUrl);
    loginUrl.searchParams.set("redirect", `/formations/${slug}`);
    return NextResponse.json({ error: "unauthenticated", redirect: loginUrl.toString() }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data: feeRow } = await admin
    .from("registration_fee_payments")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  const plan = buildFormationCheckoutPlan({ slug, userId: user.id, registrationFeeAlreadyPaid: Boolean(feeRow) });
  if (!plan.ok || !plan.metadata) {
    return NextResponse.json({ error: plan.error || "invalid_plan" }, { status: 400 });
  }

  const orderReference = `ORD-FORM-${slug.toUpperCase().slice(0, 6)}-${crypto.randomUUID().slice(0, 8)}`;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: user.email,
      line_items: plan.lineItems.map((li) => ({
        price_data: { currency: plan.currency, product_data: { name: li.label }, unit_amount: li.amountCents },
        quantity: 1,
      })),
      success_url: `${siteUrl}/inscription/succes?session_id={CHECKOUT_SESSION_ID}&type=formation`,
      cancel_url: `${siteUrl}/formations/${slug}?checkout=cancelled`,
      metadata: {
        type: "formation-purchase",
        slug: plan.metadata.slug,
        formationName: plan.metadata.formationName,
        userId: user.id,
        registrationFeeIncluded: String(plan.metadata.registrationFeeIncluded),
        orderReference,
      },
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Formation checkout error:", err);
    return NextResponse.json({ error: "stripe" }, { status: 502 });
  }
}
