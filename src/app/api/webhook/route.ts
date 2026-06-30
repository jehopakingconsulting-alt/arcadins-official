import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createAdminClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata;

      if (!metadata?.userId) {
        console.error("Checkout completed without userId in metadata:", session.id);
        break;
      }

      if ((metadata.type === "course-full" || metadata.type === "course-installment" || metadata.type === "course") && metadata.course) {
        const { data: program } = await supabase
          .from("programs")
          .select("id")
          .eq("slug", metadata.course)
          .single();

        if (program) {
          await supabase.from("enrollments").insert({
            user_id: metadata.userId,
            program_id: program.id,
            plan: "course",
            status: "active",
            stripe_subscription_id: (session.subscription as string) || session.id,
          });
        } else {
          console.error("Program not found for slug:", metadata.course);
        }

        // Installment plan: schedule the subscription to auto-cancel after
        // the 3rd monthly invoice (2 months + a few days safety margin).
        if (metadata.type === "course-installment" && session.subscription) {
          const cancelDate = new Date();
          cancelDate.setMonth(cancelDate.getMonth() + 2);
          cancelDate.setDate(cancelDate.getDate() + 5);
          try {
            await stripe.subscriptions.update(session.subscription as string, {
              cancel_at: Math.floor(cancelDate.getTime() / 1000),
            });
          } catch (err) {
            console.error("Failed to set cancel_at on installment subscription:", err);
          }
        }
      } else if (metadata.type === "subscription" && metadata.plan) {
        await supabase.from("enrollments").insert({
          user_id: metadata.userId,
          program_id: null,
          plan: metadata.plan,
          billing: metadata.billing || "monthly",
          status: "active",
          stripe_subscription_id: session.subscription as string || session.id,
        });
      }
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      // Course installment plans auto-cancel after 3 payments via cancel_at —
      // that's the expected completion, not a real cancellation. Only
      // recurring subscription plans (starter/pro) should lose access here.
      await supabase
        .from("enrollments")
        .update({ status: "cancelled" })
        .eq("stripe_subscription_id", sub.id)
        .neq("plan", "course");
      break;
    }
  }

  return NextResponse.json({ received: true });
}
