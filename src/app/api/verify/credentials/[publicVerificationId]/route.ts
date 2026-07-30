// Vérification PUBLIQUE de credential (Sprint I) — CONTRAT FUTUR, DÉSACTIVÉ. Flag OFF → `feature_disabled`.
// Révélation minimale uniquement (statut, titre, nom public, programme, dates, émetteur) ; jamais de donnée privée.
import type { NextResponse } from "next/server";
import { academicRoute, featureDisabled } from "@/lib/runtime/server/http";

export async function GET(req: Request): Promise<NextResponse> {
  return academicRoute(req, async () => featureDisabled(req));
}
