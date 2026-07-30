/**
 * Runtime — Exam : ExamResultContract (Sprint G).
 *
 * Contrat propre destiné à être transmis ULTÉRIEUREMENT au moteur de certification (jamais branché ici).
 * `certificateEligibility` reste FAUX tant que le résultat n'est pas définitif, valide, révisé et réussi.
 */
import type {
  ExamAttempt,
  ExamDecisionStatus,
  ExamFinalResult,
  ExamResultContract,
  ManualReviewRequest,
  ManualReviewStatus,
} from "./types.ts";

/** Statuts définitifs admissibles à un certificat (avant vérification de réussite/intégrité). */
const FINAL_STATUSES: ExamDecisionStatus[] = ["passed", "failed", "invalidated", "cancelled"];

export const ExamResultContractBuilder = {
  build(attempt: ExamAttempt, finalResult: ExamFinalResult | null, review: ManualReviewRequest | null, auditReference: string): ExamResultContract {
    const reviewStatus: ManualReviewStatus | "not_required" = review ? review.status : "not_required";
    const finalStatus: ExamDecisionStatus = finalResult ? finalResult.finalStatus : attempt.provisionalResult ? provisionalDecision(attempt) : "pending";

    const isFinalized = !!finalResult && FINAL_STATUSES.includes(finalResult.finalStatus);
    const reviewComplete = reviewStatus === "not_required" || reviewStatus === "finalized" || reviewStatus === "approved" || reviewStatus === "rejected";
    const integrityOk = !attempt.integrity.blocking && finalResult?.finalStatus !== "invalidated" && finalResult?.finalStatus !== "cancelled";

    // Éligibilité au certificat : UNIQUEMENT si finalisé, réussi, révision complète, intégrité non bloquante.
    const certificateEligibility = isFinalized && !!finalResult?.passed && finalResult.finalStatus === "passed" && reviewComplete && integrityOk;

    const reasonCodes: string[] = [];
    if (!isFinalized) reasonCodes.push("NOT_FINALIZED");
    if (!reviewComplete) reasonCodes.push("REVIEW_INCOMPLETE");
    if (!integrityOk) reasonCodes.push("INTEGRITY_OR_STATUS_BLOCK");
    if (finalResult && !finalResult.passed) reasonCodes.push("NOT_PASSED");
    if (certificateEligibility) reasonCodes.push("CERTIFICATE_ELIGIBLE");

    return {
      learnerReference: attempt.learnerRef,
      programId: attempt.programId,
      examId: attempt.examId,
      examVersion: attempt.frozenVersion,
      attemptId: attempt.id,
      finalStatus,
      finalScore: finalResult ? finalResult.finalScore : 0,
      passed: finalResult ? finalResult.passed : false,
      finalizedAt: finalResult ? finalResult.finalizedAt : null,
      sectionResults: finalResult ? finalResult.sectionResults : attempt.provisionalResult?.gradingResult.sectionResults ?? [],
      integrityStatus: attempt.integrity.highestSeverity,
      reviewStatus,
      certificateEligibility,
      reasonCodes,
      auditReference,
    };
  },
};

function provisionalDecision(attempt: ExamAttempt): ExamDecisionStatus {
  const g = attempt.provisionalResult?.gradingResult;
  if (!g) return "pending";
  if (g.requiresManualReview) return g.passedAutomatically ? "provisional_pass" : "provisional_fail";
  return g.passedAutomatically ? "provisional_pass" : "provisional_fail";
}
