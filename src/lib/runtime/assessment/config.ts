/**
 * Runtime — Assessment : configuration & déterminisme (Sprint F).
 *
 * Flag indépendant désactivé par défaut. Fournit PRNG déterministe (seed), fabrique d'identifiants
 * déterministe, et une config par défaut. Aucune logique propre à un programme.
 */
import type { AssessmentConfig, AssessmentContext, AssessmentPolicy } from "./types.ts";

/** Le moteur d'évaluation formative reste désactivé tant que l'UI/serveur ne sont pas prêts. */
export const FORMATIVE_ASSESSMENT_ENABLED = false;

/** Politique par défaut (générique, surchargée par programme via injection). */
export const DEFAULT_ASSESSMENT_POLICY: AssessmentPolicy = {
  passThresholdPercent: 70,
  attempts: { maxAttempts: 3, cooldownSeconds: 0 },
  timing: { durationLimitSeconds: null, lateSubmission: "reject", extraTimeSeconds: 0 },
  navigation: { order: "stable", allowBacktrack: true, sequential: false, allowPause: true, autosave: true, requireAllAnswered: false },
  feedback: "after_submission",
  version: 1,
};

export const DEFAULT_ASSESSMENT_CONFIG: AssessmentConfig = {
  policy: DEFAULT_ASSESSMENT_POLICY,
  ignoreAccents: true,
};

export function makeAssessmentConfig(partial: Partial<AssessmentConfig> = {}): AssessmentConfig {
  const policy = partial.policy ?? DEFAULT_ASSESSMENT_POLICY;
  return {
    ignoreAccents: partial.ignoreAccents ?? DEFAULT_ASSESSMENT_CONFIG.ignoreAccents,
    policy: {
      ...DEFAULT_ASSESSMENT_POLICY,
      ...policy,
      attempts: { ...DEFAULT_ASSESSMENT_POLICY.attempts, ...(policy.attempts ?? {}) },
      timing: { ...DEFAULT_ASSESSMENT_POLICY.timing, ...(policy.timing ?? {}) },
      navigation: { ...DEFAULT_ASSESSMENT_POLICY.navigation, ...(policy.navigation ?? {}) },
    },
  };
}

/** PRNG déterministe (mulberry32) : même graine → même suite. */
export function createRng(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fabrique d'identifiants déterministe (préfixe + compteur), injectable. */
export function createIdFactory(prefix = "id", start = 0): () => string {
  let n = start;
  return () => `${prefix}-${n++}`;
}

/** Crée un contexte d'évaluation (toutes les sources de non-déterminisme sont injectées). */
export function createAssessmentContext(opts: {
  now: Date;
  seed?: number;
  idFactory?: () => string;
  config?: Partial<AssessmentConfig>;
}): AssessmentContext {
  return {
    now: opts.now,
    seed: opts.seed ?? 1,
    idFactory: opts.idFactory ?? createIdFactory("att"),
    config: makeAssessmentConfig(opts.config),
  };
}
