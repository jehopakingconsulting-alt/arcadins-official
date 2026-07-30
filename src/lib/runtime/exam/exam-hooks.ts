/**
 * Runtime — Exam : hooks de cycle de vie (Sprint G).
 *
 * ⚠️ Pas des hooks React. Bus d'abonnement PUR, agnostique, implémentations no-op sûres par défaut.
 */
export type ExamHookName =
  | "beforeEligibilityCheck"
  | "afterEligibilityCheck"
  | "beforeSessionCreation"
  | "afterSessionCreation"
  | "beforeStart"
  | "afterStart"
  | "beforeAnswerSave"
  | "afterAnswerSave"
  | "beforeSubmission"
  | "afterSubmission"
  | "beforeAutomaticGrading"
  | "afterAutomaticGrading"
  | "onManualReviewRequested"
  | "onManualReviewCompleted"
  | "beforeFinalDecision"
  | "afterFinalDecision"
  | "onIntegrityIssue"
  | "onExpiration"
  | "onRetakeRequested";

type AnyHandler = (payload: unknown) => void;

export interface ExamHooks {
  on(name: ExamHookName, handler: AnyHandler): () => void;
  off(name: ExamHookName, handler: AnyHandler): void;
  emit(name: ExamHookName, payload?: unknown): void;
}

export function createExamHooks(): ExamHooks {
  const handlers = new Map<ExamHookName, Set<AnyHandler>>();
  const hooks: ExamHooks = {
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

/** Implémentations no-op sûres pour chaque hook (aucun effet de bord). */
export const NOOP_EXAM_HOOKS: Readonly<Record<ExamHookName, AnyHandler>> = Object.freeze({
  beforeEligibilityCheck: () => {},
  afterEligibilityCheck: () => {},
  beforeSessionCreation: () => {},
  afterSessionCreation: () => {},
  beforeStart: () => {},
  afterStart: () => {},
  beforeAnswerSave: () => {},
  afterAnswerSave: () => {},
  beforeSubmission: () => {},
  afterSubmission: () => {},
  beforeAutomaticGrading: () => {},
  afterAutomaticGrading: () => {},
  onManualReviewRequested: () => {},
  onManualReviewCompleted: () => {},
  beforeFinalDecision: () => {},
  afterFinalDecision: () => {},
  onIntegrityIssue: () => {},
  onExpiration: () => {},
  onRetakeRequested: () => {},
});
