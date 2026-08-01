// Route académique GATÉE (Sprint I). Flag `ACADEMIC_PERSISTENCE_ENABLED = false` → `feature_disabled`.
// Aucune logique DB, aucun secret, aucune bonne réponse, aucune stack publique tant que le flag est OFF.
import type { NextResponse } from "next/server";
import { academicRoute, featureDisabled } from "@/lib/runtime/server/http";

export async function GET(req: Request): Promise<NextResponse> {
  // Contrat futur (auth serveur → validation → ownership → RBAC → RLS → réponse standard). Inactif si flag OFF.
  return academicRoute(req, async () => featureDisabled(req));
}
