import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Liveness probe (S2) : le process répond. Ne dépend d'aucune ressource externe.
export function GET() {
  return NextResponse.json({
    status: "ok",
    ts: new Date().toISOString(),
    uptime_s: Math.round(process.uptime()),
  });
}
