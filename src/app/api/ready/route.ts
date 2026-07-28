import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// Readiness probe (S2) : la dépendance critique (base) est joignable.
// 200 = prêt à recevoir du trafic ; 503 = dégradé (retirer de l'équilibrage).
export async function GET() {
  const started = Date.now();
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("profiles").select("id", { head: true, count: "exact" }).limit(1);
    const latency_ms = Date.now() - started;
    if (error) {
      return NextResponse.json({ status: "degraded", db: false, error: error.code ?? "db_error", latency_ms }, { status: 503 });
    }
    return NextResponse.json({ status: "ready", db: true, latency_ms });
  } catch {
    return NextResponse.json({ status: "down", db: false, latency_ms: Date.now() - started }, { status: 503 });
  }
}
