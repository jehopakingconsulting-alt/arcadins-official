/**
 * Runtime — UI/Completion : événements d'orchestration (Sprint K3C).
 *
 * Tranche d'événements DÉDIÉE (ne touche pas le RuntimeState du Sprint A). Déterministes, versionnés,
 * sérialisables, NETTOYÉS (aucune donnée privée : ni note de réviseur, ni raison interne, ni barème).
 */
export type CompletionEventType =
  | "ASSESSMENT_COMPLETION_UPDATED"
  | "PROVISIONAL_DECISION_RECORDED"
  | "MANUAL_REVIEW_OPENED"
  | "MANUAL_REVIEW_COMPLETED"
  | "RETAKE_GRANTED"
  | "RETAKE_EXHAUSTED"
  | "FINAL_DECISION_RECORDED"
  | "PROGRAM_ASSESSMENT_PASSED"
  | "PROGRAM_ASSESSMENT_FAILED"
  | "CERTIFICATION_ELIGIBILITY_UPDATED";

export interface CompletionEvent {
  type: CompletionEventType;
  at: string; // ISO (horloge injectée)
  version: number;
  /** Charge utile PUBLIQUE minimale (jamais de raison interne / note privée). */
  payload: Record<string, string | number | boolean | null>;
}

const V = 1;

export const CompletionEvents = {
  completionUpdated(at: string, status: string): CompletionEvent {
    return { type: "ASSESSMENT_COMPLETION_UPDATED", at, version: V, payload: { status } };
  },
  provisionalRecorded(at: string, provisionalId: string, status: string, scorePercent: number | null): CompletionEvent {
    return { type: "PROVISIONAL_DECISION_RECORDED", at, version: V, payload: { provisionalId, status, scorePercent } };
  },
  manualReviewOpened(at: string, reviewStatus: string): CompletionEvent {
    return { type: "MANUAL_REVIEW_OPENED", at, version: V, payload: { reviewStatus } };
  },
  manualReviewCompleted(at: string, reviewStatus: string): CompletionEvent {
    return { type: "MANUAL_REVIEW_COMPLETED", at, version: V, payload: { reviewStatus } };
  },
  retakeGranted(at: string, attemptsRemaining: number): CompletionEvent {
    return { type: "RETAKE_GRANTED", at, version: V, payload: { attemptsRemaining } };
  },
  retakeExhausted(at: string): CompletionEvent {
    return { type: "RETAKE_EXHAUSTED", at, version: V, payload: {} };
  },
  finalDecisionRecorded(at: string, decisionId: string, finalStatus: string, passed: boolean): CompletionEvent {
    return { type: "FINAL_DECISION_RECORDED", at, version: V, payload: { decisionId, finalStatus, passed } };
  },
  programPassed(at: string, decisionId: string): CompletionEvent {
    return { type: "PROGRAM_ASSESSMENT_PASSED", at, version: V, payload: { decisionId } };
  },
  programFailed(at: string, decisionId: string): CompletionEvent {
    return { type: "PROGRAM_ASSESSMENT_FAILED", at, version: V, payload: { decisionId } };
  },
  certificationEligibilityUpdated(at: string, eligible: boolean): CompletionEvent {
    return { type: "CERTIFICATION_ELIGIBILITY_UPDATED", at, version: V, payload: { eligible } };
  },
};
