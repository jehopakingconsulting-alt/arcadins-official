/**
 * Runtime — Assessment : hooks de cycle de vie (Sprint F).
 *
 * ⚠️ Pas des hooks React. Bus d'abonnement PUR, implémentations no-op sûres par défaut.
 */
export type AssessmentHookName =
  | "beforeAttemptCreation"
  | "afterAttemptCreation"
  | "beforeAnswerSave"
  | "afterAnswerSave"
  | "beforeSubmission"
  | "afterSubmission"
  | "beforeGrading"
  | "afterGrading"
  | "onManualReviewRequired"
  | "onFeedbackReleased";

type AnyHandler = (payload: unknown) => void;

export interface AssessmentHooks {
  on(name: AssessmentHookName, handler: AnyHandler): () => void;
  off(name: AssessmentHookName, handler: AnyHandler): void;
  emit(name: AssessmentHookName, payload?: unknown): void;
}

export function createAssessmentHooks(): AssessmentHooks {
  const handlers = new Map<AssessmentHookName, Set<AnyHandler>>();
  const hooks: AssessmentHooks = {
    on(name, handler) {
      const set = handlers.get(name) ?? new Set();
      set.add(handler);
      handlers.set(name, set);
      return () => hooks.off(name, handler);
    },
    off(name, handler) {
      handlers.get(name)?.delete(handler);
    },
    emit(name, payload) {
      handlers.get(name)?.forEach((h) => h(payload));
    },
  };
  return hooks;
}
