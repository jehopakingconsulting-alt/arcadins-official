/**
 * Runtime — Integration : configuration & flags (Sprint I).
 *
 * Interrupteur maître de la persistance académique. Tant que `ACADEMIC_PERSISTENCE_ENABLED = false` :
 * aucun appel DB académique, aucune mutation, aucune route active, aucun événement réel, aucun impact production.
 * Aucune logique propre à un programme.
 */

/** Interrupteur maître de la couche d'intégration/persistance académique. */
export const ACADEMIC_PERSISTENCE_ENABLED = false;

/** Ensemble des flags académiques (tous OFF). Source unique pour les gardes de routes/services. */
export interface AcademicFeatureFlags {
  learningRuntime: boolean;
  academicPersistence: boolean;
  formativeAssessment: boolean;
  finalExam: boolean;
  certificationEngine: boolean;
}

export const ACADEMIC_FEATURE_FLAGS: AcademicFeatureFlags = {
  learningRuntime: false,
  academicPersistence: ACADEMIC_PERSISTENCE_ENABLED,
  formativeAssessment: false,
  finalExam: false,
  certificationEngine: false,
};

/** La couche de persistance est-elle active ? (garde unique). */
export function isAcademicPersistenceEnabled(flags: AcademicFeatureFlags = ACADEMIC_FEATURE_FLAGS): boolean {
  return flags.academicPersistence === true;
}

/** Politique de limitation par défaut (fenêtre glissante, injectable). */
export interface RateLimitPolicy {
  windowSeconds: number;
  max: number;
}
export const DEFAULT_RATE_LIMITS: Record<string, RateLimitPolicy> = {
  "quiz.start": { windowSeconds: 60, max: 10 },
  "quiz.submit": { windowSeconds: 60, max: 20 },
  "lesson.autosave": { windowSeconds: 60, max: 120 },
  "exam.start": { windowSeconds: 300, max: 3 },
  "exam.submit": { windowSeconds: 300, max: 5 },
  "credential.verify": { windowSeconds: 60, max: 30 },
  "download": { windowSeconds: 60, max: 10 },
  "forbidden.access": { windowSeconds: 60, max: 5 },
};

/** Durée de conservation d'une clé d'idempotence (secondes). */
export const IDEMPOTENCY_TTL_SECONDS = 24 * 3600;
