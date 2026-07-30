// Route académique GATÉE (Sprint I). Flag `ACADEMIC_PERSISTENCE_ENABLED = false` → `feature_disabled`.
import type { NextResponse } from "next/server";
import { academicRoute, featureDisabled } from "@/lib/runtime/server/http";

export async function DELETE(req: Request): Promise<NextResponse> {
  return academicRoute(req, async () => featureDisabled(req));
}
