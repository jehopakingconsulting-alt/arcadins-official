/**
 * Runtime — Server : helpers HTTP pour les routes académiques (Sprint I).
 *
 * Réponses standardisées + garde de feature flag. Tant que `ACADEMIC_PERSISTENCE_ENABLED = false`, toutes les
 * routes académiques renvoient `feature_disabled` (404 selon la convention existante) : AUCUNE logique DB, aucune
 * mutation, aucun secret, aucune stack trace publique, aucune bonne réponse.
 */
import { NextResponse } from "next/server";
import { ACADEMIC_PERSISTENCE_ENABLED } from "../integration/config.ts";
import { AcademicError, normalizeError } from "../integration/errors.ts";

function correlationId(req: Request): string {
  const hdr = req.headers.get("x-correlation-id");
  return hdr && /^[\w-]{1,64}$/.test(hdr) ? hdr : "req";
}

/** Réponse « fonctionnalité désactivée » (flag OFF). */
export function featureDisabled(req: Request): NextResponse {
  return NextResponse.json(
    { ok: false, error: { code: "ACADEMIC_FEATURE_DISABLED", messageKey: "academic.error.feature_disabled", httpStatus: 404, retryable: false, reasonCodes: ["ACADEMIC_PERSISTENCE_DISABLED"] }, correlationId: correlationId(req) },
    { status: 404 },
  );
}

/**
 * Garde de route : si la persistance est OFF, renvoie `feature_disabled` sans exécuter le handler. Sinon exécute
 * le handler et normalise toute erreur en réponse publique filtrée (jamais de stack, jamais de secret).
 */
export async function academicRoute(req: Request, handler: () => Promise<NextResponse>): Promise<NextResponse> {
  if (!ACADEMIC_PERSISTENCE_ENABLED) return featureDisabled(req);
  try {
    return await handler();
  } catch (err) {
    const academic: AcademicError = normalizeError(err, correlationId(req));
    return NextResponse.json(academic.toApiFailure(), { status: academic.httpStatus });
  }
}

/** Réponse succès standard. */
export function ok<T>(req: Request, data: T): NextResponse {
  return NextResponse.json({ ok: true, data, correlationId: correlationId(req) }, { status: 200 });
}
