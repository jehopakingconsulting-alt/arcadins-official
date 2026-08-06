import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { stripe } from "@/lib/stripe";
import { PROGRAM_CHECKOUT_ENABLED } from "@/lib/config/launch-flags";

/**
 * Statut d'inscription AUTORITÉ SERVEUR (jamais l'URL comme preuve de paiement).
 * États : access_active | activation_pending | account_mismatch | support_required.
 *
 * DEUX surfaces d'inscription coexistent et doivent TOUTES DEUX être interrogées :
 *  1. `program_enrollments` — Programmes officiels (TEF/TCF), clé `stripe_session_id` ;
 *  2. `enrollments`         — Formations professionnelles, clé `stripe_subscription_id`,
 *     qui vaut l'ID de SESSION pour un paiement intégral et l'ID d'ABONNEMENT pour un
 *     paiement échelonné (3×/6×) — d'où la résolution via Stripe ci-dessous.
 *
 * Sans le point 2, la page de succès d'une FORMATION restait bloquée indéfiniment sur
 * « Nous activons votre accès » alors que l'accès était bel et bien accordé.
 */
export async function GET(request: Request) {
  if (!PROGRAM_CHECKOUT_ENABLED) {
    return NextResponse.json({ state: "support_required" }, { status: 404 });
  }
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");
  if (!sessionId) return NextResponse.json({ state: "support_required" });

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ state: "account_mismatch" });

  const admin = createAdminClient();

  // ── 1) Programmes officiels (TEF/TCF) ──────────────────────────────────────
  const { data: enr } = await admin
    .from("program_enrollments")
    .select("user_id, program_code, package_key, status, access_expires_at")
    .eq("stripe_session_id", sessionId)
    .maybeSingle();

  if (enr) {
    if (enr.user_id !== user.id) return NextResponse.json({ state: "account_mismatch" });
    if (enr.status === "active") {
      return NextResponse.json({
        state: "access_active",
        program: enr.program_code,
        packageKey: enr.package_key,
        accessExpiresAt: enr.access_expires_at,
      });
    }
    if (enr.status === "suspended" || enr.status === "refunded") {
      return NextResponse.json({ state: "support_required", program: enr.program_code });
    }
    return NextResponse.json({ state: "activation_pending", program: enr.program_code });
  }

  // ── 2) Formations professionnelles ─────────────────────────────────────────
  // Résolution de la clé : Stripe fait autorité (l'URL n'est jamais une preuve).
  let subId: string = sessionId;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.subscription) {
      subId = typeof session.subscription === "string" ? session.subscription : session.subscription.id;
    }
  } catch {
    // Session introuvable côté Stripe : on conserve `sessionId` comme clé de repli.
  }

  const { data: courseEnr } = await admin
    .from("enrollments")
    .select("user_id, status, installments_paid, programs(slug, name_fr)")
    .eq("stripe_subscription_id", subId)
    .maybeSingle();

  if (!courseEnr) return NextResponse.json({ state: "activation_pending" });
  if (courseEnr.user_id !== user.id) return NextResponse.json({ state: "account_mismatch" });

  const program = Array.isArray(courseEnr.programs) ? courseEnr.programs[0] : courseEnr.programs;
  const programSlug = program?.slug ?? null;

  if (courseEnr.status === "active") {
    return NextResponse.json({
      state: "access_active",
      type: "formation",
      program: programSlug,
      programName: program?.name_fr ?? null,
    });
  }
  if (courseEnr.status === "suspended" || courseEnr.status === "cancelled") {
    return NextResponse.json({ state: "support_required", type: "formation", program: programSlug });
  }
  return NextResponse.json({ state: "activation_pending", type: "formation", program: programSlug });
}
