/**
 * Runtime — UI/Completion : politique de résultat DÉTERMINISTE (Sprint K3C).
 *
 * Compose des règles injectées (aucune règle codée en dur propre à un programme). Sépare STRICTEMENT le
 * provisoire du définitif, et les raisons PUBLIQUES (clés i18n) des raisons INTERNES (codes d'audit).
 */
import type { CompletionInput, CompletionStatus } from "./completion-types.ts";
import type { ResultPolicyConfig } from "./completion-config.ts";

export interface PolicyReasons {
  publicReasonKeys: string[];
  internalReasonCodes: string[];
}

/** Tous les quiz OBLIGATOIRES sont-ils réussis ? */
export function mandatoryQuizzesPassed(input: CompletionInput, config: ResultPolicyConfig): boolean {
  if (!config.requireAllMandatoryQuizzes) return true;
  return input.quizzes.filter((q) => q.required).every((q) => q.attempted && q.passed);
}

/** Toutes les compétences évaluées atteignent-elles le seuil minimal ? */
export function competencyThresholdMet(input: CompletionInput, config: ResultPolicyConfig): boolean {
  return input.exam.competencies.every((c) => c.score >= config.minCompetencyScore);
}

/** Décision PROVISOIRE (jamais définitive). */
export function evaluateProvisional(input: CompletionInput, config: ResultPolicyConfig): {
  status: "provisional_pass" | "provisional_fail" | "pending_manual_review";
  scorePercent: number | null;
} & PolicyReasons {
  const exam = input.exam;
  if (exam.requiresManualReview) {
    return { status: "pending_manual_review", scorePercent: exam.percentage, publicReasonKeys: ["completion.reason.manual_review_required"], internalReasonCodes: ["MANUAL_REVIEW_PENDING"] };
  }
  const quizzesOk = mandatoryQuizzesPassed(input, config);
  const eliminatory = config.treatEliminatoryAsFail && exam.eliminatoryFailure;
  const examOk = config.requireExamPass ? exam.provisionalPassed === true : true;
  const pass = quizzesOk && examOk && !eliminatory;

  const publicReasonKeys: string[] = [];
  const internalReasonCodes: string[] = [];
  if (!quizzesOk) { publicReasonKeys.push("completion.reason.quiz_incomplete"); internalReasonCodes.push("MANDATORY_QUIZ_NOT_PASSED"); }
  if (eliminatory) { publicReasonKeys.push("completion.reason.eliminatory_section"); internalReasonCodes.push("ELIMINATORY_SECTION_FAILED"); }
  if (config.requireExamPass && exam.provisionalPassed === false) { publicReasonKeys.push("completion.reason.below_threshold"); internalReasonCodes.push("EXAM_BELOW_THRESHOLD"); }
  if (pass) publicReasonKeys.push("completion.reason.provisional_pass");

  return { status: pass ? "provisional_pass" : "provisional_fail", scorePercent: exam.percentage, publicReasonKeys, internalReasonCodes };
}

/** Statut FINAL (uniquement quand l'examen est finalisé et/ou la révision est complète). */
export function deriveFinal(input: CompletionInput): {
  finalStatus: "final_pass" | "final_fail" | "invalidated" | "expired";
  passed: boolean;
} & PolicyReasons {
  const exam = input.exam;
  if (exam.expired) return { finalStatus: "expired", passed: false, publicReasonKeys: ["completion.reason.expired"], internalReasonCodes: ["EXAM_EXPIRED"] };
  if (exam.finalStatus === "invalidated") return { finalStatus: "invalidated", passed: false, publicReasonKeys: ["completion.reason.invalidated"], internalReasonCodes: ["ATTEMPT_INVALIDATED"] };
  const passed = exam.finalPassed === true;
  return {
    finalStatus: passed ? "final_pass" : "final_fail",
    passed,
    publicReasonKeys: [passed ? "completion.reason.final_pass" : "completion.reason.final_fail"],
    internalReasonCodes: [passed ? "FINAL_PASS" : "FINAL_FAIL"],
  };
}

/** L'examen est-il finalisé (décision réellement disponible) ? */
export function isFinalAvailable(input: CompletionInput): boolean {
  const exam = input.exam;
  if (exam.expired || exam.finalStatus === "invalidated") return true;
  return exam.status === "finalized" && exam.finalStatus !== null && exam.finalPassed !== null && (!exam.requiresManualReview || input.reviewComplete);
}

/** Statut de complétion global (machine à états). */
export function computeCompletionStatus(input: CompletionInput, config: ResultPolicyConfig, hasFinal: boolean, retakeExhausted: boolean, retakeAvailable: boolean): CompletionStatus {
  const exam = input.exam;
  if (exam.suspended) return "suspended";
  if (exam.administrativeHold) return "administratively_blocked";
  if (exam.expired) return "expired";

  if (!mandatoryQuizzesPassed(input, config)) return "quiz_requirements_pending";

  if (hasFinal) {
    if (exam.finalPassed === true) return "final_pass";
    if (retakeAvailable) return "retake_available";
    if (retakeExhausted) return "retake_exhausted";
    return "final_fail";
  }

  if (exam.requiresManualReview) return input.reviewStatus === "in_review" ? "manual_review_in_progress" : "manual_review_pending";

  switch (exam.status) {
    case "not_started":
      return exam.eligible ? "final_exam_eligible" : "final_exam_not_eligible";
    case "in_progress":
      return "final_exam_in_progress";
    case "submitted":
      return "final_exam_submitted";
    case "provisionally_graded":
      return exam.provisionalPassed ? "provisional_pass" : "provisional_fail";
    default:
      return "quiz_requirements_completed";
  }
}
