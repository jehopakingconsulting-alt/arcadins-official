import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { PROGRAM_CHECKOUT_ENABLED } from "@/lib/config/launch-flags";

/**
 * Statut d'inscription AUTORITÉ SERVEUR (jamais l'URL comme preuve de paiement).
 * Lit program_enrollments par stripe_session_id pour l'utilisateur authentifié.
 * États : access_active | activation_pending | account_mismatch | session_expired | support_required.
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
  const { data: enr } = await admin
    .from("program_enrollments")
    .select("user_id, program_code, package_key, status, access_expires_at")
    .eq("stripe_session_id", sessionId)
    .maybeSingle();

  // Pas encore d'inscription : le webhook n'a pas (encore) traité l'événement.
  if (!enr) return NextResponse.json({ state: "activation_pending" });
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
