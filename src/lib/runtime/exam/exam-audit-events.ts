/**
 * Runtime — Exam : ExamAuditLog & événements immuables (Sprint G).
 *
 * Produit des événements d'audit gelés (immuables). Aucune donnée de correction, aucune réponse correcte.
 */
import type { ExamAuditEvent, ExamAuditEventType } from "./types.ts";

function make(type: ExamAuditEventType, at: string, payload: Record<string, unknown> = {}): ExamAuditEvent {
  return Object.freeze({ type, at, payload: Object.freeze({ ...payload }) }) as ExamAuditEvent;
}

export const ExamAuditEvents = {
  eligibilityChecked: (at: string, examId: string, status: string, reasonCodes: string[]) => make("exam.eligibility_checked", at, { examId, status, reasonCodes }),
  sessionCreated: (at: string, sessionId: string, attemptId: string) => make("exam.session_created", at, { sessionId, attemptId }),
  started: (at: string, sessionId: string) => make("exam.started", at, { sessionId }),
  answerSaved: (at: string, sessionId: string, questionId: string, revision: number) => make("exam.answer_saved", at, { sessionId, questionId, revision }),
  answerRejected: (at: string, sessionId: string, questionId: string, reasonCodes: string[]) => make("exam.answer_rejected", at, { sessionId, questionId, reasonCodes }),
  paused: (at: string, sessionId: string) => make("exam.paused", at, { sessionId }),
  resumed: (at: string, sessionId: string) => make("exam.resumed", at, { sessionId }),
  heartbeatReceived: (at: string, sessionId: string, gapSeconds: number) => make("exam.heartbeat_received", at, { sessionId, gapSeconds }),
  warningRecorded: (at: string, sessionId: string, codes: string[]) => make("exam.warning_recorded", at, { sessionId, codes }),
  expired: (at: string, sessionId: string) => make("exam.expired", at, { sessionId }),
  autoSubmitted: (at: string, sessionId: string) => make("exam.auto_submitted", at, { sessionId }),
  submitted: (at: string, sessionId: string, commandId: string) => make("exam.submitted", at, { sessionId, commandId }),
  gradingStarted: (at: string, sessionId: string) => make("exam.grading_started", at, { sessionId }),
  automaticGradingCompleted: (at: string, sessionId: string, percentage: number) => make("exam.automatic_grading_completed", at, { sessionId, percentage }),
  manualReviewRequested: (at: string, sessionId: string, questionIds: string[]) => make("exam.manual_review_requested", at, { sessionId, questionIds }),
  manualReviewCompleted: (at: string, sessionId: string, status: string) => make("exam.manual_review_completed", at, { sessionId, status }),
  provisionalResultCreated: (at: string, sessionId: string, decision: string) => make("exam.provisional_result_created", at, { sessionId, decision }),
  finalResultCreated: (at: string, sessionId: string, decision: string) => make("exam.final_result_created", at, { sessionId, decision }),
  passed: (at: string, sessionId: string) => make("exam.passed", at, { sessionId }),
  failed: (at: string, sessionId: string) => make("exam.failed", at, { sessionId }),
  invalidated: (at: string, sessionId: string, reason: string) => make("exam.invalidated", at, { sessionId, reason }),
  cancelled: (at: string, sessionId: string, reason: string) => make("exam.cancelled", at, { sessionId, reason }),
  retakeRequested: (at: string, attemptId: string, requestId: string) => make("exam.retake_requested", at, { attemptId, requestId }),
  retakeAuthorized: (at: string, requestId: string) => make("exam.retake_authorized", at, { requestId }),
  retakeDenied: (at: string, requestId: string, reasonCodes: string[]) => make("exam.retake_denied", at, { requestId, reasonCodes }),
};

/** Journal d'audit append-only en mémoire (aucune I/O). */
export class ExamAuditLog {
  private events: ExamAuditEvent[] = [];
  append(...events: ExamAuditEvent[]): void {
    for (const e of events) this.events.push(e);
  }
  all(): ExamAuditEvent[] {
    return [...this.events];
  }
  /** Référence d'audit déterministe (nombre d'événements + dernier horodatage). */
  reference(): string {
    const last = this.events[this.events.length - 1];
    return `audit:${this.events.length}:${last?.at ?? "empty"}`;
  }
}
