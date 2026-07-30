// Route académique GATÉE (Sprint I). Flag `ACADEMIC_PERSISTENCE_ENABLED = false` → `feature_disabled`.
// Écriture serveur uniquement (idempotency + rate limit + ownership). Inactif tant que le flag est OFF.
import type { NextResponse } from "next/server";
import { academicRoute, featureDisabled } from "@/lib/runtime/server/http";

export async function POST(req: Request): Promise<NextResponse> {
  return academicRoute(req, async () => featureDisabled(req));
}
