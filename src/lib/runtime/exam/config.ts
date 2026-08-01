/**
 * Runtime — Exam : configuration & déterminisme (Sprint G).
 *
 * Flag INDÉPENDANT désactivé par défaut. Fournit les politiques par défaut, le PRNG déterministe (seed),
 * une fabrique d'identifiants injectable et un contexte d'examen. Aucune logique propre à un programme.
 * Réutilise le PRNG du Sprint F (une seule source de non-déterminisme maîtrisée).
 */
import type {
  ExamAccommodationPolicy,
  ExamContext,
  ExamGradingPolicy,
  ExamNavigationPolicy,
  ExamRetakePolicy,
  ExamRuntimeConfig,
} from "./types.ts";
import { createRng as createAssessmentRng, createIdFactory as createAssessmentIdFactory } from "../assessment/config.ts";

/** Le moteur d'examen final reste désactivé tant que l'UI / le serveur ne sont pas prêts. */
export const FINAL_EXAM_ENABLED = false;

export const DEFAULT_EXAM_NAVIGATION_POLICY: ExamNavigationPolicy = {
  mode: "sequential",
  allowBacktrack: false,
  lockSectionAfterComplete: true,
  questionOrder: "stable",
  requireAllAnswered: false,
  allowPartialSubmission: false,
  requireConfirmationBeforeSubmit: true,
  version: 1,
};

export const DEFAULT_EXAM_RETAKE_POLICY: ExamRetakePolicy = {
  maximumAttempts: 2,
  cooldownSeconds: 0,
  requiresAuthorization: true,
  version: 1,
};

export const DEFAULT_EXAM_GRADING_POLICY: ExamGradingPolicy = {
  passThresholdPercent: 70,
  sectionThresholds: {},
  eliminatorySectionIds: [],
  weighting: "by_section",
  penalties: { perIncorrect: 0 },
  bonusEnabled: false,
  ignoreAccents: true,
  version: 1,
};

export const DEFAULT_EXAM_ACCOMMODATION_POLICY: ExamAccommodationPolicy = {
  allowed: ["extra_time", "allow_pause", "screen_reader", "text_size", "contrast", "keyboard_only", "language_adaptation"],
  version: 1,
};

export const DEFAULT_EXAM_RUNTIME_CONFIG: ExamRuntimeConfig = {
  grading: DEFAULT_EXAM_GRADING_POLICY,
  navigation: DEFAULT_EXAM_NAVIGATION_POLICY,
  retake: DEFAULT_EXAM_RETAKE_POLICY,
  gracePeriodSeconds: 0,
  clockDriftToleranceSeconds: 120,
  heartbeatMaxGapSeconds: 90,
};

export function makeExamRuntimeConfig(partial: Partial<ExamRuntimeConfig> = {}): ExamRuntimeConfig {
  return {
    gracePeriodSeconds: partial.gracePeriodSeconds ?? DEFAULT_EXAM_RUNTIME_CONFIG.gracePeriodSeconds,
    clockDriftToleranceSeconds: partial.clockDriftToleranceSeconds ?? DEFAULT_EXAM_RUNTIME_CONFIG.clockDriftToleranceSeconds,
    heartbeatMaxGapSeconds: partial.heartbeatMaxGapSeconds ?? DEFAULT_EXAM_RUNTIME_CONFIG.heartbeatMaxGapSeconds,
    grading: { ...DEFAULT_EXAM_GRADING_POLICY, ...(partial.grading ?? {}) },
    navigation: { ...DEFAULT_EXAM_NAVIGATION_POLICY, ...(partial.navigation ?? {}) },
    retake: { ...DEFAULT_EXAM_RETAKE_POLICY, ...(partial.retake ?? {}) },
  };
}

/** PRNG déterministe (réutilise le mulberry32 du Sprint F). */
export function createRng(seed: number): () => number {
  return createAssessmentRng(seed);
}

/** Fabrique d'identifiants déterministe (préfixe + compteur), injectable. */
export function createIdFactory(prefix = "exam", start = 0): () => string {
  return createAssessmentIdFactory(prefix, start);
}

/** Crée un contexte d'examen (toutes les sources de non-déterminisme sont injectées). */
export function createExamContext(opts: {
  now: Date;
  seed?: number;
  idFactory?: () => string;
  config?: Partial<ExamRuntimeConfig>;
}): ExamContext {
  return {
    now: opts.now,
    seed: opts.seed ?? 1,
    idFactory: opts.idFactory ?? createIdFactory("exam"),
    config: makeExamRuntimeConfig(opts.config),
  };
}
