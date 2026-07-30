/**
 * Runtime — Assessment : FeedbackEngine (Sprint F).
 *
 * Rétroaction pédagogique AUTORISÉE (clés i18n), sans jamais divulguer la réponse exacte. Politiques de
 * divulgation configurables. Déterministe.
 */
import type { AssessmentFeedback, FeedbackPolicy, GradingResult, PrivateQuestion } from "./types.ts";

export interface FeedbackContext {
  policy: FeedbackPolicy;
  expired: boolean;
  remainingAttempts: number;
}

export const FeedbackEngine = {
  build(result: GradingResult, questions: PrivateQuestion[], ctx: FeedbackContext): AssessmentFeedback {
    const released = isReleased(ctx);
    const strengths = result.competencyResults.filter((c) => c.provisionalLevel === "strong").map((c) => c.competencyId);
    const fragile = result.competencyResults.filter((c) => c.provisionalLevel !== "strong").map((c) => c.competencyId);

    const relatedLessonIds = [
      ...new Set(
        questions
          .filter((q) => q.competencyId && fragile.includes(q.competencyId) && q.lessonId)
          .map((q) => q.lessonId as string),
      ),
    ].sort();

    const reasonCodes: string[] = [];
    if (result.requiresManualReview) reasonCodes.push("MANUAL_REVIEW_PENDING");
    if (result.passed && !result.requiresManualReview) reasonCodes.push("PASSED");
    if (!result.passed && !result.requiresManualReview) reasonCodes.push("BELOW_THRESHOLD");
    if (fragile.length > 0) reasonCodes.push("REVIEW_WEAK_COMPETENCIES");
    if (ctx.remainingAttempts > 0 && !result.passed) reasonCodes.push("RETRY_AVAILABLE");

    const messageKeys: string[] = [];
    if (result.requiresManualReview) messageKeys.push("assessment.feedback.manual_review");
    else messageKeys.push(result.passed ? "assessment.feedback.passed" : "assessment.feedback.retry");
    if (ctx.remainingAttempts > 0 && !result.passed) messageKeys.push("assessment.feedback.retry_available");

    return {
      policy: ctx.policy,
      released,
      resultSummaryKey: result.requiresManualReview ? "assessment.summary.pending" : result.passed ? "assessment.summary.passed" : "assessment.summary.failed",
      strengths,
      toReview: [...fragile, ...relatedLessonIds],
      fragileCompetencies: fragile,
      recommendationReasonCodes: reasonCodes,
      relatedLessonIds,
      messageKeys,
      disclosesAnswers: false,
    };
  },
};

function isReleased(ctx: FeedbackContext): boolean {
  switch (ctx.policy) {
    case "immediate":
    case "after_submission":
    case "no_answer_disclosure":
      return true;
    case "after_deadline":
      return ctx.expired;
    case "after_all_attempts":
      return ctx.remainingAttempts <= 0;
    case "instructor_release":
      return false;
    default:
      return false;
  }
}
