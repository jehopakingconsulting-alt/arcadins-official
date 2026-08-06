import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { PAYMENT_DEADLINE_DAYS } from "@/lib/pricing";
import { PROGRAM_CHECKOUT_ENABLED } from "@/lib/config/launch-flags";
import { getProgramGrants, getProgramOffer, isProgramCode, PROGRAM_NAMES } from "@/lib/commerce/program-commerce";
import { getFormationOffer } from "@/lib/commerce/formation-commerce";
import { composeEntitlements, accessExpiry } from "@/lib/catalog/entitlement";
import { buildAuditRecord } from "@/lib/audit/record";
import { sendEnrollmentEmail } from "@/lib/commerce/emails";
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
    // `completed` couvre les paiements immédiats (carte). Les moyens ASYNCHRONES
    // (Affirm, Klarna, Afterpay, virements) émettent `completed` AVANT l'encaissement,
    // puis `async_payment_succeeded` une fois les fonds confirmés : les deux doivent
    // mener au même traitement, protégé par le contrôle de `payment_status` ci-dessous.
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata;

      if (!metadata?.userId) {
        console.error("Checkout completed without userId in metadata:", session.id);
        break;
      }

      // SÉCURITÉ : ne JAMAIS accorder d'accès tant que la session n'est pas réglée.
      // Sans ce contrôle, un paiement asynchrone abandonné débloquerait l'accès.
      if (session.payment_status !== "paid" && session.payment_status !== "no_payment_required") {
        console.log(
          `[webhook] ${event.type} ignoré — paiement non finalisé (payment_status=${session.payment_status}, session=${session.id}). ` +
            `L'accès sera accordé à la réception de checkout.session.async_payment_succeeded.`
        );
        break;
      }

      // ── Programmes officiels (TEF/TCF) : inscription + entitlement AUTOMATIQUES ──
      // Prix/forfaits = program-commerce (autorité serveur). Idempotent, séparé par
      // programme (un achat TEF ne débloque que TEF). Gardé par le flag de lancement.
      if (PROGRAM_CHECKOUT_ENABLED && metadata.type === "program-purchase") {
        const program = String(metadata.program || "");
        const packageKey = String(metadata.packageKey || "");
        const grants = getProgramGrants(program, packageKey);
        const offer = getProgramOffer(program, packageKey);
        if (!isProgramCode(program) || !grants || !offer) {
          console.error("program-purchase: programme/forfait inconnu", metadata);
          break;
        }

        // Idempotence : un événement Stripe n'est traité qu'une seule fois.
        const { data: seen } = await supabase
          .from("program_purchase_events")
          .select("stripe_event_id")
          .eq("stripe_event_id", event.id)
          .maybeSingle();
        if (seen) break;
        await supabase.from("program_purchase_events").insert({ stripe_event_id: event.id, event_type: event.type });

        // Frais d'inscription GLOBAL (une seule fois par étudiant, jamais deux fois).
        if (metadata.registrationFeeIncluded === "true") {
          await supabase
            .from("registration_fee_payments")
            .upsert(
              { user_id: metadata.userId, amount_cents: 10000, currency: "usd", stripe_session_id: session.id },
              { onConflict: "user_id", ignoreDuplicates: true },
            );
        }

        // Entitlement figé (composition pure) + fenêtre d'accès.
        const now = new Date();
        const entitlement = composeEntitlements(grants);
        const accessExpiresAt = accessExpiry(entitlement, now);

        // UNE inscription par (user, program) : jamais de doublon (webhook rejoué inclus).
        await supabase
          .from("program_enrollments")
          .upsert(
            {
              user_id: metadata.userId,
              program_code: program,
              package_key: packageKey,
              offer_amount_cents: offer.amountCents,
              currency: "usd",
              entitlement,
              status: "active",
              access_starts_at: now.toISOString(),
              access_expires_at: accessExpiresAt,
              stripe_session_id: session.id,
              order_reference: metadata.orderReference || null,
            },
            { onConflict: "user_id,program_code", ignoreDuplicates: true },
          );

        // Audit (best-effort — n'invalide jamais une inscription payée valide).
        try {
          await supabase.from("audit_log").insert(
            buildAuditRecord({
              action: "enrollment.grant",
              actor: { id: metadata.userId },
              targetType: "program",
              targetId: program,
              metadata: { packageKey, orderReference: metadata.orderReference, source: "stripe-webhook", sessionId: session.id },
            }),
          );
        } catch (err) {
          console.error("program-purchase: audit non enregistré (non bloquant):", err);
        }

        // Emails de confirmation (best-effort). L'échec d'envoi ne DOIT PAS annuler
        // l'inscription payée : sendEnrollmentEmail capture toute erreur et journalise.
        const recipient = session.customer_details?.email || session.customer_email || undefined;
        if (recipient) {
          const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").trim() || "https://arcadins-official.vercel.app";
          const emailCtx = {
            to: recipient,
            programName: PROGRAM_NAMES[program],
            packageName: packageKey,
            dashboardUrl: `${siteUrl}/dashboard`,
            accessExpiresLabel: accessExpiresAt ? new Date(accessExpiresAt).toLocaleDateString("fr-CA") : null,
            orderReference: metadata.orderReference || undefined,
          };
          try {
            await sendEnrollmentEmail("payment_confirmation", emailCtx);
            await sendEnrollmentEmail("enrollment_confirmation", emailCtx);
          } catch (err) {
            console.error("program-purchase: email non envoyé (non bloquant):", err);
          }
        }
        break;
      }

      // ── Formation professionnelle : inscription AUTOMATIQUE (Département B) ──
      // Réutilise la table `enrollments` (System 1) → /formations/[slug]/learn débloque.
      if (PROGRAM_CHECKOUT_ENABLED && metadata.type === "formation-purchase" && metadata.slug) {
        const offer = getFormationOffer(metadata.slug);
        if (!offer) { console.error("formation-purchase: formation inconnue", metadata.slug); break; }

        // Idempotence : événement Stripe traité une seule fois.
        const { data: seen } = await supabase
          .from("program_purchase_events").select("stripe_event_id").eq("stripe_event_id", event.id).maybeSingle();
        if (seen) break;
        await supabase.from("program_purchase_events").insert({ stripe_event_id: event.id, event_type: event.type });

        // Frais d'inscription GLOBAL (une seule fois par étudiant).
        if (metadata.registrationFeeIncluded === "true") {
          await supabase.from("registration_fee_payments").upsert(
            { user_id: metadata.userId, amount_cents: 10000, currency: "cad", stripe_session_id: session.id },
            { onConflict: "user_id", ignoreDuplicates: true },
          );
        }

        const { data: program } = await supabase.from("programs").select("id").eq("slug", metadata.slug).single();
        if (!program) { console.error("formation-purchase: programme absent en base", metadata.slug); break; }

        // Mode : paiement complet (BNPL inclus) OU abonnement échelonné (3×/6×).
        const isSubscription = session.mode === "subscription";
        const cycles = parseInt(metadata.cycles || "1", 10) || 1;
        const subId = isSubscription ? (session.subscription as string) : session.id;

        // Une inscription active par (user, programme) : pas de doublon.
        const { data: existing } = await supabase
          .from("enrollments").select("id")
          .eq("user_id", metadata.userId).eq("program_id", program.id).eq("status", "active").maybeSingle();
        if (!existing) {
          await supabase.from("enrollments").insert({
            user_id: metadata.userId,
            program_id: program.id,
            plan: "course",
            status: "active", // accès immédiat après le 1er paiement
            installments_paid: isSubscription ? 1 : cycles,
            payment_deadline: null,
            stripe_subscription_id: subId,
          });
        }

        // Échelonné : borne l'abonnement à N cycles (auto-cancel après le dernier versement).
        // Les handlers invoice.payment_failed / _succeeded existants gèrent la suspension.
        if (isSubscription && session.subscription) {
          const cancelDate = new Date();
          cancelDate.setMonth(cancelDate.getMonth() + (cycles - 1));
          cancelDate.setDate(cancelDate.getDate() + 5);
          try {
            await stripe.subscriptions.update(session.subscription as string, { cancel_at: Math.floor(cancelDate.getTime() / 1000) });
          } catch (err) { console.error("formation installments cancel_at:", err); }
        }

        try {
          await supabase.from("audit_log").insert(buildAuditRecord({
            action: "enrollment.grant", actor: { id: metadata.userId },
            targetType: "formation", targetId: metadata.slug,
            metadata: { orderReference: metadata.orderReference, source: "stripe-webhook", sessionId: session.id },
          }));
        } catch (err) { console.error("formation-purchase: audit non enregistré:", err); }

        const recipient = session.customer_details?.email || session.customer_email || undefined;
        if (recipient) {
          const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").trim() || "https://arcadins-official.vercel.app";
          try {
            await sendEnrollmentEmail("enrollment_confirmation", {
              to: recipient, programName: offer.name, dashboardUrl: `${siteUrl}/formations/${metadata.slug}/learn`,
              orderReference: metadata.orderReference || undefined,
            });
          } catch (err) { console.error("formation-purchase: email non envoyé:", err); }
        }
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
    // Paiement asynchrone REFUSÉ (Affirm/Klarna décline, virement non reçu…).
    // Aucun accès n'a été accordé (le contrôle payment_status l'a empêché) :
    // on journalise pour le suivi, sans action destructrice.
    case "checkout.session.async_payment_failed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.error(
        `[webhook] paiement asynchrone échoué — session=${session.id}, user=${session.metadata?.userId ?? "?"}, ` +
          `type=${session.metadata?.type ?? "?"}. Aucun accès accordé.`
      );
      break;
    }

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
