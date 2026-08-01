/**
 * Runtime — Integration : types & contrats (Sprint I).
 *
 * Couche serveur générique reliant les moteurs académiques (Sprints A–H) à une persistance sécurisée.
 * Le navigateur n'est jamais l'autorité : identité, scores, progression, décisions sont serveur.
 */

// ─────────────────────────── Contexte de requête ───────────────────────────
export type AcademicRole = "learner" | "tutor" | "content_manager" | "academic_reviewer" | "administrator" | "server_service" | "anonymous";
export type AcademicPermission = string;

/** Identité SERVEUR authentifiée (jamais fournie par le client). */
export interface ServerIdentity {
  authenticatedUserId: string | null;
  learnerId: string | null;
  enrollmentId: string | null;
  programId: string | null;
  programVersionId: string | null;
  roles: AcademicRole[];
  permissions: AcademicPermission[];
  enrollmentStatus?: "active" | "inactive" | "suspended" | "expired" | null;
  accessExpiresAt?: string | null;
}

/** Entrées INFORMATIVES fournies par le client (jamais autoritaires). */
export interface ClientRequestHints {
  locale?: string;
  idempotencyKey?: string;
  clientTimestamp?: string;
  userAgent?: string;
  ip?: string;
  correlationId?: string;
}

export interface AcademicRequestContext {
  authenticatedUserId: string | null;
  learnerId: string | null;
  enrollmentId: string | null;
  programId: string | null;
  programVersionId: string | null;
  roles: AcademicRole[];
  permissions: AcademicPermission[];
  enrollmentStatus: "active" | "inactive" | "suspended" | "expired" | null;
  accessExpiresAt: string | null;
  locale: string;
  requestId: string;
  correlationId: string;
  idempotencyKey: string | null;
  clientTimestamp: string | null; // informatif
  serverTimestamp: string; // autoritaire
  userAgentHash: string | null;
  ipHash: string | null;
  featureFlags: import("./config.ts").AcademicFeatureFlags;
  authorizationScope: string[];
}

// ─────────────────────────── Autorisation ───────────────────────────
export type AuthorizationDecisionStatus =
  | "allowed"
  | "unauthenticated"
  | "forbidden"
  | "enrollment_missing"
  | "enrollment_inactive"
  | "program_mismatch"
  | "resource_not_owned"
  | "prerequisite_missing"
  | "feature_disabled"
  | "access_expired"
  | "rate_limited"
  | "requires_admin_review";
export interface AuthorizationDecision {
  status: AuthorizationDecisionStatus;
  allowed: boolean;
  reasonCodes: string[];
}
export interface ResourceOwnership {
  ownerLearnerId?: string | null;
  ownerUserId?: string | null;
  programId?: string | null;
  requiredPermission?: AcademicPermission;
  requiredRoles?: AcademicRole[];
  requiresFeature?: keyof import("./config.ts").AcademicFeatureFlags;
  /** Apprenants assignés au tuteur courant (le tuteur n'accède qu'à ceux-ci). */
  assignedLearnerIds?: string[];
}

// ─────────────────────────── Idempotence ───────────────────────────
export type IdempotencyStatus = "received" | "processing" | "succeeded" | "failed_retryable" | "failed_final" | "expired";
export interface IdempotencyRecord {
  commandId: string;
  idempotencyKey: string;
  commandType: string;
  actorId: string;
  resourceId: string | null;
  payloadHash: string;
  status: IdempotencyStatus;
  resultReference: string | null;
  startedAt: string;
  completedAt: string | null;
  failedAt: string | null;
  expiresAt: string;
  retryCount: number;
}
export type IdempotencyOutcome =
  | { kind: "fresh"; record: IdempotencyRecord }
  | { kind: "replay"; record: IdempotencyRecord }
  | { kind: "in_progress"; record: IdempotencyRecord }
  | { kind: "conflict"; record: IdempotencyRecord; reasonCodes: string[] };

// ─────────────────────────── Concurrence ───────────────────────────
export interface VersionedEntity {
  version: number;
  updatedAt: string;
}
export type ConcurrencyStatus = "ok" | "conflict";
export interface ConcurrencyCheck {
  status: ConcurrencyStatus;
  nextVersion: number | null;
  conflictReason: string | null;
  reloadRequired: boolean;
}

// ─────────────────────────── Transactions ───────────────────────────
export type CriticalCommandType =
  | "attempt.start"
  | "assessment.submit"
  | "lesson.complete"
  | "module.validate"
  | "exam.start"
  | "exam.submit"
  | "exam.finalize"
  | "credential.issue"
  | "credential.revoke"
  | "credential.replace"
  | "badge.issue";
export interface TransactionOptions {
  maxRetries: number;
  critical: boolean;
}

// ─────────────────────────── Rate limit ───────────────────────────
export interface RateLimitDecision {
  allowed: boolean;
  key: string;
  window: number;
  count: number;
  limit: number;
  retryAfterSeconds: number;
  reasonCode: string | null;
}

// ─────────────────────────── Audit ───────────────────────────
export type AcademicAuditEventType =
  | "academic.request_received"
  | "academic.authorization_allowed"
  | "academic.authorization_denied"
  | "enrollment.access_checked"
  | "lesson.started"
  | "lesson.progress_saved"
  | "lesson.completed"
  | "lesson.completion_denied"
  | "module.unlocked"
  | "module.completed"
  | "assessment.started"
  | "assessment.answer_saved"
  | "assessment.submitted"
  | "assessment.graded"
  | "exam.eligibility_checked"
  | "exam.started"
  | "exam.resumed"
  | "exam.submitted"
  | "exam.expired"
  | "exam.graded"
  | "exam.review_requested"
  | "exam.finalized"
  | "credential.eligibility_checked"
  | "credential.issued"
  | "credential.revoked"
  | "credential.replaced"
  | "badge.issued"
  | "idempotency.conflict"
  | "concurrency.conflict"
  | "rate_limit.exceeded"
  | "security.violation_detected";
export interface AcademicAuditEvent {
  type: AcademicAuditEventType;
  at: string;
  actorId: string | null;
  correlationId: string;
  resourceId: string | null;
  reasonCodes: string[];
  metadata: Record<string, unknown>;
}

// ─────────────────────────── Réponse API standard ───────────────────────────
export interface ApiSuccess<T> {
  ok: true;
  data: T;
  correlationId: string;
}
export interface ApiFailure {
  ok: false;
  error: {
    code: string;
    messageKey: string;
    httpStatus: number;
    retryable: boolean;
    reasonCodes: string[];
  };
  correlationId: string;
}
export type ApiResult<T> = ApiSuccess<T> | ApiFailure;
