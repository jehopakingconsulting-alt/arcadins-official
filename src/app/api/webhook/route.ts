import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { PAYMENT_DEADLINE_DAYS } from "@/lib/pricing";
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

      // ── Step 1: registration fee paid → create pending_payment enrollment ──
      if (metadata.type === "registration-fee" && metadata.course) {
        const { data: program } = await supabase
          .from("programs")
          .select("id")
          .eq("slug", metadata.course)
          .single();

        if (program) {
          const deadline = new Date();
          deadline.setDate(deadline.getDate() + PAYMENT_DEADLINE_DAYS);

          await supabase.from("enrollments").insert({
            user_id: metadata.userId,
            program_id: program.id,
            plan: "course",
            status: "pending_payment",
            payment_deadline: deadline.toISOString(),
            installments_paid: 0,
            stripe_subscription_id: session.id,
          });
        } else {
          console.error("Program not found for slug:", metadata.course);
        }
        break;
      }

      // ── Step 2a: first installment paid in full ──
      if (metadata.type === "course-first-full" && metadata.course) {
        const { data: program } = await supabase
          .from("programs")
          .select("id")
          .eq("slug", metadata.course)
          .single();

        if (program) {
          await supabase
            .from("enrollments")
            .update({
              status: "active",
              installments_paid: 3,
              payment_deadline: null,
              stripe_subscription_id: session.id,
            })
            .eq("user_id", metadata.userId)
            .eq("program_id", program.id)
            .eq("status", "pending_payment");
        }
        break;
      }

      // ── Step 2b: first installment paid via 3-month subscription ──
      if (metadata.type === "course-first-installment" && metadata.course) {
        const { data: program } = await supabase
          .from("programs")
          .select("id")
          .eq("slug", metadata.course)
          .single();

        if (program) {
          await supabase
            .from("enrollments")
            .update({
              status: "active",
              installments_paid: 1,
              payment_deadline: null,
              stripe_subscription_id: session.subscription as string,
            })
            .eq("user_id", metadata.userId)
            .eq("program_id", program.id)
            .eq("status", "pending_payment");
        }

        // Schedule the subscription to auto-cancel after the 3rd monthly
        // invoice (2 months out + safety margin).
        if (session.subscription) {
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
        break;
      }

      // ── Plan subscriptions (Starter/Pro) ──
      if (metadata.type === "subscription" && metadata.plan) {
        await supabase.from("enrollments").insert({
          user_id: metadata.userId,
          program_id: null,
          plan: metadata.plan,
          billing: metadata.billing || "monthly",
          status: "active",
          stripe_subscription_id: (session.subscription as string) || session.id,
        });
      }
      break;
    }

    // ── A scheduled monthly installment failed → suspend access ──
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const subId = (invoice as unknown as { subscription?: string }).subscription;
      if (subId) {
        await supabase
          .from("enrollments")
          .update({ status: "suspended" })
          .eq("stripe_subscription_id", subId)
          .eq("plan", "course");
      }
      break;
    }

    // ── A previously failed installment was retried successfully → restore access ──
    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      const subId = (invoice as unknown as { subscription?: string }).subscription;
      const billingReason = invoice.billing_reason;
      if (subId && billingReason === "subscription_cycle") {
        await supabase
          .from("enrollments")
          .update({ status: "active" })
          .eq("stripe_subscription_id", subId)
          .eq("plan", "course")
          .eq("status", "suspended");

        // Bump installments_paid counter (best-effort, capped at 3)
        const { data: enrollment } = await supabase
          .from("enrollments")
          .select("installments_paid")
          .eq("stripe_subscription_id", subId)
          .single();
        if (enrollment && enrollment.installments_paid < 3) {
          await supabase
            .from("enrollments")
            .update({ installments_paid: enrollment.installments_paid + 1 })
            .eq("stripe_subscription_id", subId);
        }
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
