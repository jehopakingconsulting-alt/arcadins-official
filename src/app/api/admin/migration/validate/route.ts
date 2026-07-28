import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-data";
import { hasPermission } from "@/lib/rbac";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// Codes signalant que la RPC/les tables de migration n'existent pas encore.
const NOT_READY = new Set(["PGRST202", "PGRST205", "42883", "42P01"]);

/**
 * Validateur de migration — LECTURE SEULE.
 * Appelle la RPC public.migrate_validation_report() (comptages + intégrité).
 * Aucune écriture. Réservé aux rôles disposant de `migration.view`.
 */
export async function GET() {
  const session = await getAdminSession();
  if (!session.userId) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  if (!hasPermission(session.role, "migration.view")) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase.rpc("migrate_validation_report");

  if (error) {
    if (NOT_READY.has(error.code)) {
      return NextResponse.json({ ready: false, reason: "migration_non_appliquee" });
    }
    return NextResponse.json({ ready: false, reason: error.message }, { status: 500 });
  }

  return NextResponse.json({ ready: true, report: data, checkedAt: new Date().toISOString() });
}
