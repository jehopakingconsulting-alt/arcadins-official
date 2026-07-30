/**
 * Runtime — Assessment : événements immuables (Sprint F).
 */
import type { AssessmentEvent, AssessmentEventType } from "./types.ts";

function make(type: AssessmentEventType, at: string, payload: Record<string, unknown> = {}): AssessmentEvent {
  return Object.freeze({ type, at, payload: Object.freeze({ ...payload }) }) as AssessmentEvent;
}

export const AssessmentEvents = {
  attemptCreated: (at: string, attemptId: string, attemptNumber: number) => make("assessment.attempt_created", at, { attemptId, attemptNumber }),
  started: (at: string, attemptId: string) => make("assessment.started", at, { attemptId }),
  answerSaved: (at: string, attemptId: string, questionId: string) => make("assessment.answer_saved", at, { attemptId, questionId }),
  paused: (at: string, attemptId: string) => make("assessment.paused", at, { attemptId }),
  resumed: (at: string, attemptId: string) => make("assessment.resumed", at, { attemptId }),
  submitted: (at: string, attemptId: string, commandId: string) => make("assessment.submitted", at, { attemptId, commandId }),
  graded: (at: string, attemptId: string, percentage: number) => make("assessment.graded", at, { attemptId, percentage }),
  completed: (at: string, attemptId: string, passed: boolean) => make("assessment.completed", at, { attemptId, passed }),
  failed: (at: string, attemptId: string) => make("assessment.failed", at, { attemptId }),
  abandoned: (at: string, attemptId: string) => make("assessment.abandoned", at, { attemptId }),
  expired: (at: string, attemptId: string) => make("assessment.expired", at, { attemptId }),
  manualReviewRequired: (at: string, attemptId: string, questionIds: string[]) => make("assessment.manual_review_required", at, { attemptId, questionIds }),
  feedbackReleased: (at: string, attemptId: string) => make("assessment.feedback_released", at, { attemptId }),
  integrityWarning: (at: string, attemptId: string, codes: string[]) => make("assessment.integrity_warning", at, { attemptId, codes }),
};
