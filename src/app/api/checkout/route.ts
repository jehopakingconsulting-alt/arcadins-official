import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { getInstallmentPlan, getFullPaymentTotal, REGISTRATION_FEE } from "@/lib/pricing";

const PLANS: Record<string, { monthly: number; annual: number; name: string }> = {
  starter: { monthly: 19900, annual: 15900, name: "ARCADINS Starter" },
  professionnel: { monthly: 44900, annual: 35900, name: "ARCADINS Professionnel" },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").trim() || "https://arcadins-official.vercel.app";

  const course = searchParams.get("course");
  const coursePrice = searchParams.get("price");
  const paymentMode = searchParams.get("payment") || "full"; // "full" | "installment"

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const redirectPath = course ? `/formations/${course}` : "/tarifs";
    const loginUrl = new URL("/auth/login", siteUrl);
    loginUrl.searchParams.set("redirect", redirectPath);
    loginUrl.searchParams.set("checkout", searchParams.toString());
    return NextResponse.redirect(loginUrl);
  }

  if (course && coursePrice) {
    const price = parseInt(coursePrice);
    const courseName = course.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

    try {
      if (paymentMode === "installment") {
        const plan = getInstallmentPlan(price);
        const [first, second, third] = plan.installments;
        const firstInvoiceOneTime = (first - second + plan.registrationFee) * 100;

        // 3 monthly charges: invoice 1 = recurring(second) + one-time(first - second + fee),
        // invoice 2 & 3 = recurring(second) only. The subscription is set to
        // cancel automatically after the 3rd invoice in the webhook handler
        // (cancel_at isn't settable at Checkout Session creation time).
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          customer_email: user.email,
          line_items: [
            {
              price_data: {
                currency: "cad",
                product_data: { name: `ARCADINS — ${courseName}` },
                unit_amount: second * 100,
                recurring: { interval: "month" },
              },
              quantity: 1,
            },
            {
              price_data: {
                currency: "cad",
                product_data: { name: "Premier versement (solde) + frais d'inscription 50$" },
                unit_amount: firstInvoiceOneTime,
              },
              quantity: 1,
            },
          ],
          mode: "subscription",
          success_url: `${siteUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${siteUrl}/formations/${course}`,
          metadata: {
            type: "course-installment",
            course,
            price: String(price),
            installments: `${first},${second},${third}`,
            userId: user.id,
          },
        });

        return NextResponse.redirect(session.url!, 303);
      }

      // Full payment: course price + $50 registration fee
      const totalCents = getFullPaymentTotal(price) * 100;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: user.email,
        line_items: [
          {
            price_data: {
              currency: "cad",
              product_data: { name: `ARCADINS — ${courseName}`, description: `Formation complète de 24 semaines · Frais d'inscription ${REGISTRATION_FEE}$ inclus · Certificat inclus` },
              unit_amount: totalCents,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${siteUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/formations/${course}`,
        metadata: { type: "course-full", course, price: String(price), userId: user.id },
      });

      return NextResponse.redirect(session.url!, 303);
    } catch (err) {
      console.error("Stripe error:", err);
      return NextResponse.redirect(`${siteUrl}/formations/${course}?error=stripe`);
    }
  }

  const plan = searchParams.get("plan") || "starter";
  const billing = searchParams.get("billing") || "monthly";
  const priceData = PLANS[plan];

  if (!priceData) {
    return NextResponse.redirect(`${siteUrl}/tarifs?error=invalid_plan`);
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: user.email,
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
      metadata: { type: "subscription", plan, billing, userId: user.id },
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.redirect(`${siteUrl}/tarifs?error=stripe`);
  }
}
