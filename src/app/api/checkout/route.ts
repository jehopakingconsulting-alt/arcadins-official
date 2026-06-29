import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const PRICES: Record<string, { monthly: number; annual: number; name: string }> = {
  starter: { monthly: 19900, annual: 15900, name: "ARCADINS Starter" },
  professionnel: { monthly: 44900, annual: 35900, name: "ARCADINS Professionnel" },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const plan = searchParams.get("plan") || "starter";
  const billing = searchParams.get("billing") || "monthly";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const priceData = PRICES[plan];
  if (!priceData) {
    return NextResponse.redirect(`${siteUrl}/tarifs?error=invalid_plan`);
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: { name: priceData.name },
            unit_amount: billing === "annual" ? priceData.annual : priceData.monthly,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${siteUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/tarifs`,
      metadata: { plan, billing },
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.redirect(`${siteUrl}/tarifs?error=stripe`);
  }
}
