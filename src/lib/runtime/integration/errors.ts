/**
 * Runtime — Integration : taxonomie d'erreurs normalisée (Sprint I).
 *
 * Chaque erreur porte un code, une clé de message PUBLIQUE (jamais de détail interne exposé), un statut HTTP,
 * un drapeau retryable, un correlationId et des métadonnées FILTRÉES. La cause interne n'est jamais sérialisée
 * vers le client.
 */
import type { ApiFailure } from "./types.ts";

export interface AcademicErrorInit {
  publicMessageKey: string;
  internalMessage: string;
  httpStatus: number;
  retryable: boolean;
  correlationId?: string;
  metadata?: Record<string, unknown>;
  reasonCodes?: string[];
  cause?: unknown;
}

export abstract class AcademicError extends Error {
  abstract readonly code: string;
  readonly publicMessageKey: string;
  readonly httpStatus: number;
  readonly retryable: boolean;
  readonly correlationId: string;
  readonly metadata: Record<string, unknown>;
  readonly reasonCodes: string[];
  readonly internalCause?: unknown;

  constructor(init: AcademicErrorInit) {
    super(init.internalMessage);
    this.publicMessageKey = init.publicMessageKey;
    this.httpStatus = init.httpStatus;
    this.retryable = init.retryable;
    this.correlationId = init.correlationId ?? "unknown";
    this.metadata = filterMetadata(init.metadata ?? {});
    this.reasonCodes = init.reasonCodes ?? [];
    this.internalCause = init.cause;
  }

  /** Réponse PUBLIQUE : ni internalMessage, ni cause, ni stack. */
  toApiFailure(): ApiFailure {
    return {
      ok: false,
      error: {
        code: this.code,
        messageKey: this.publicMessageKey,
        httpStatus: this.httpStatus,
        retryable: this.retryable,
        reasonCodes: this.reasonCodes,
      },
      correlationId: this.correlationId,
    };
  }
}

/** Clés de métadonnées sensibles bannies des erreurs publiques. */
const SENSITIVE_META_KEYS = new Set([
  "password", "token", "secret", "privateKey", "serviceRoleKey", "cardNumber", "answer", "answers", "correctAnswer", "correctOptionId", "grading", "email", "ip", "authorization", "cookie",
]);
function filterMetadata(meta: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(meta)) if (!SENSITIVE_META_KEYS.has(k)) out[k] = v;
  return out;
}

export class AcademicAuthenticationError extends AcademicError {
  readonly code = "ACADEMIC_AUTHENTICATION";
  constructor(init?: Partial<AcademicErrorInit>) {
    super({ publicMessageKey: "academic.error.unauthenticated", internalMessage: "Non authentifié.", httpStatus: 401, retryable: false, ...init });
  }
}
export class AcademicAuthorizationError extends AcademicError {
  readonly code = "ACADEMIC_AUTHORIZATION";
  constructor(init?: Partial<AcademicErrorInit>) {
    super({ publicMessageKey: "academic.error.forbidden", internalMessage: "Accès refusé.", httpStatus: 403, retryable: false, ...init });
  }
}
export class AcademicValidationError extends AcademicError {
  readonly code = "ACADEMIC_VALIDATION";
  constructor(init?: Partial<AcademicErrorInit>) {
    super({ publicMessageKey: "academic.error.validation", internalMessage: "Requête invalide.", httpStatus: 400, retryable: false, ...init });
  }
}
export class AcademicConflictError extends AcademicError {
  readonly code = "ACADEMIC_CONFLICT";
  constructor(init?: Partial<AcademicErrorInit>) {
    super({ publicMessageKey: "academic.error.conflict", internalMessage: "Conflit de version.", httpStatus: 409, retryable: true, ...init });
  }
}
export class AcademicIdempotencyError extends AcademicError {
  readonly code = "ACADEMIC_IDEMPOTENCY";
  constructor(init?: Partial<AcademicErrorInit>) {
    super({ publicMessageKey: "academic.error.idempotency", internalMessage: "Conflit d'idempotence.", httpStatus: 409, retryable: false, ...init });
  }
}
export class AcademicNotFoundError extends AcademicError {
  readonly code = "ACADEMIC_NOT_FOUND";
  constructor(init?: Partial<AcademicErrorInit>) {
    super({ publicMessageKey: "academic.error.not_found", internalMessage: "Ressource introuvable.", httpStatus: 404, retryable: false, ...init });
  }
}
export class AcademicFeatureDisabledError extends AcademicError {
  readonly code = "ACADEMIC_FEATURE_DISABLED";
  constructor(init?: Partial<AcademicErrorInit>) {
    super({ publicMessageKey: "academic.error.feature_disabled", internalMessage: "Fonctionnalité désactivée.", httpStatus: 404, retryable: false, ...init });
  }
}
export class AcademicRateLimitError extends AcademicError {
  readonly code = "ACADEMIC_RATE_LIMIT";
  constructor(init?: Partial<AcademicErrorInit>) {
    super({ publicMessageKey: "academic.error.rate_limited", internalMessage: "Trop de requêtes.", httpStatus: 429, retryable: true, ...init });
  }
}
export class AcademicIntegrityError extends AcademicError {
  readonly code = "ACADEMIC_INTEGRITY";
  constructor(init?: Partial<AcademicErrorInit>) {
    super({ publicMessageKey: "academic.error.integrity", internalMessage: "Intégrité compromise.", httpStatus: 422, retryable: false, ...init });
  }
}
export class AcademicPersistenceError extends AcademicError {
  readonly code = "ACADEMIC_PERSISTENCE";
  constructor(init?: Partial<AcademicErrorInit>) {
    super({ publicMessageKey: "academic.error.persistence", internalMessage: "Erreur de persistance.", httpStatus: 500, retryable: true, ...init });
  }
}
export class AcademicExternalDependencyError extends AcademicError {
  readonly code = "ACADEMIC_EXTERNAL_DEPENDENCY";
  constructor(init?: Partial<AcademicErrorInit>) {
    super({ publicMessageKey: "academic.error.dependency", internalMessage: "Dépendance externe indisponible.", httpStatus: 503, retryable: true, ...init });
  }
}
export class AcademicUnexpectedError extends AcademicError {
  readonly code = "ACADEMIC_UNEXPECTED";
  constructor(init?: Partial<AcademicErrorInit>) {
    super({ publicMessageKey: "academic.error.unexpected", internalMessage: "Erreur inattendue.", httpStatus: 500, retryable: false, ...init });
  }
}

/** Normalise n'importe quelle erreur en AcademicError (sans divulguer la cause). */
export function normalizeError(err: unknown, correlationId: string): AcademicError {
  if (err instanceof AcademicError) return err;
  return new AcademicUnexpectedError({ correlationId, cause: err, internalMessage: err instanceof Error ? err.message : "unknown" });
}
