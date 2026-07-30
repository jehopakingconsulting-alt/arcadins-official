/**
 * Runtime — Learning Journey Engine : configuration (Sprint E).
 *
 * La config porte TOUTES les différences pédagogiques entre programmes (aucune logique codée par programme).
 */
import type { JourneyConfig } from "./types.ts";

/** Configuration pédagogique par défaut (générique, ajustable par programme via injection). */
export const DEFAULT_JOURNEY_CONFIG: JourneyConfig = {
  workload: { dailyMinutes: 60, weeklyMinutes: 300, activeDays: [1, 2, 3, 4, 5] }, // lun..ven
  mastery: {
    weights: { lessonCompleted: 1, lessonPassed: 2, summative: 3, practical: 2, tutor: 3 },
    thresholds: { practiced: 0.34, passed: 0.6, mastered: 0.85 },
    freshnessDays: 30,
  },
  review: { baseIntervalDays: 3, easeStart: 2.5, minEase: 1.3, intervalMultiplier: 2 },
  remediation: { maxAttempts: 3 },
  recommendation: { maxItems: 8 },
  defaults: { lessonMinutes: 60, reviewMinutes: 10, remediationMinutes: 20 },
  optionalTargetIds: [],
  goals: [],
  rules: [],
  advancedRecommender: null, // désactivé : aucune couche « IA avancée » branchée
};

/** Fusionne une config partielle sur la config par défaut (peu profond, additif). */
export function makeJourneyConfig(partial: Partial<JourneyConfig> = {}): JourneyConfig {
  return {
    ...DEFAULT_JOURNEY_CONFIG,
    ...partial,
    workload: { ...DEFAULT_JOURNEY_CONFIG.workload, ...(partial.workload ?? {}) },
    mastery: {
      ...DEFAULT_JOURNEY_CONFIG.mastery,
      ...(partial.mastery ?? {}),
      weights: { ...DEFAULT_JOURNEY_CONFIG.mastery.weights, ...(partial.mastery?.weights ?? {}) },
      thresholds: { ...DEFAULT_JOURNEY_CONFIG.mastery.thresholds, ...(partial.mastery?.thresholds ?? {}) },
    },
    review: { ...DEFAULT_JOURNEY_CONFIG.review, ...(partial.review ?? {}) },
    remediation: { ...DEFAULT_JOURNEY_CONFIG.remediation, ...(partial.remediation ?? {}) },
    recommendation: { ...DEFAULT_JOURNEY_CONFIG.recommendation, ...(partial.recommendation ?? {}) },
    defaults: { ...DEFAULT_JOURNEY_CONFIG.defaults, ...(partial.defaults ?? {}) },
    optionalTargetIds: partial.optionalTargetIds ?? DEFAULT_JOURNEY_CONFIG.optionalTargetIds,
    goals: partial.goals ?? DEFAULT_JOURNEY_CONFIG.goals,
    rules: partial.rules ?? DEFAULT_JOURNEY_CONFIG.rules,
    advancedRecommender: partial.advancedRecommender ?? null,
  };
}
