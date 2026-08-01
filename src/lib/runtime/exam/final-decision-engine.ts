/**
 * Runtime — Exam : FinalDecisionEngine (Sprint G).
 *
 * Décide du résultat DÉFINITIF en combinant score automatique + score humain, seuils global/section, règles
 * éliminatoires, statut d'intégrité, validité de session/tentative et décision administrative. Produit un
 * ExamFinalResult uniquement quand tout est déterminé. PUR. Un résultat provisoire ne peut jamais être
 * transformé silencieusement en réussite.
 */
import type {
  ExamAttempt,
  ExamDecisionStatus,
  ExamFinalResult,
  ExamGradingPolicy,
  ExamGradingResult,
  ExamProvisionalResult,
  ExamSectionResult,
  ManualReviewRequest,
  ManualReviewStatus,
} from "./types.ts";

function round(n: number): number {
  return Math.round(n * 1000) / 1000;
}

export interface FinalDecisionInput {
  attempt: ExamAttempt;
  provisional: ExamProvisionalResult;
  policy: ExamGradingPolicy;
  review: ManualReviewRequest | null;
  humanScores: Record<string, number>; // questionId → points humains attribués
  administrativeOverride?: "pass" | "fail" | "requires_review" | null;
  now: Date;
  auditReference: string;
}

export const FinalDecisionEngine = {
  /** Construit le résultat provisoire à partir d'une correction. */
  buildProvisional(attempt: ExamAttempt, grading: ExamGradingResult, now: Date): ExamProvisionalResult {
    return {
      attemptId: attempt.id,
      gradingResult: grading,
      provisional: true,
      createdAt: now.toISOString(),
      reasonCodes: grading.reasonCodes,
    };
  },

  /**
   * Décide du résultat définitif. Bloque toute finalisation tant qu'une révision manuelle requise n'est pas
   * complétée (le résultat reste provisoire) ou qu'une décision administrative est requise.
   */
  finalize(input: FinalDecisionInput): { decision: ExamDecisionStatus; finalResult: ExamFinalResult | null; reasonCodes: string[] } {
    const { attempt, provisional, policy, review, humanScores } = input;
    const grading = provisional.gradingResult;
    const reasonCodes: string[] = [];

    // Tentative invalidée / annulée : jamais convertible en réussite.
    if (attempt.lifecycle === "invalidated" || attempt.status === "invalidated") {
      return terminal("invalidated", attempt, grading, input, ["ATTEMPT_INVALIDATED"]);
    }
    if (attempt.lifecycle === "cancelled" || attempt.status === "cancelled") {
      return terminal("cancelled", attempt, grading, input, ["ATTEMPT_CANCELLED"]);
    }

    // Intégrité bloquante → révision administrative.
    if (attempt.integrity.blocking) {
      reasonCodes.push("INTEGRITY_BLOCKING");
      return { decision: "requires_administrative_review", finalResult: null, reasonCodes };
    }

    // Décision administrative explicite.
    if (input.administrativeOverride === "requires_review") {
      return { decision: "requires_administrative_review", finalResult: null, reasonCodes: ["ADMIN_REVIEW_REQUIRED"] };
    }

    // Révision manuelle requise mais non complétée → reste provisoire.
    if (grading.requiresManualReview && (!review || !isReviewComplete(review.status))) {
      const decision: ExamDecisionStatus = grading.percentage >= policy.passThresholdPercent ? "provisional_pass" : "provisional_fail";
      return { decision, finalResult: null, reasonCodes: ["MANUAL_REVIEW_INCOMPLETE"] };
    }

    // Fusion du score humain dans les sections concernées.
    const merged = mergeHumanScores(attempt, grading, humanScores, policy);
    const eliminatoryIds = new Set(policy.eliminatorySectionIds);
    const eliminatoryFailure = merged.sectionResults.some((s) => (s.eliminatory || eliminatoryIds.has(s.sectionId)) && !s.passed);
    const sectionFailure = merged.sectionResults.some((s) => !s.passed);
    let passed = merged.percentage >= policy.passThresholdPercent && !eliminatoryFailure && !sectionFailure;

    // L'administrateur peut forcer un échec, jamais transformer une intégrité bloquante en réussite (déjà filtré).
    if (input.administrativeOverride === "fail") {
      passed = false;
      reasonCodes.push("ADMIN_FORCED_FAIL");
    } else if (input.administrativeOverride === "pass") {
      passed = true;
      reasonCodes.push("ADMIN_FORCED_PASS");
    }

    if (eliminatoryFailure) reasonCodes.push("ELIMINATORY_SECTION_FAILED");
    else if (sectionFailure) reasonCodes.push("SECTION_THRESHOLD_FAILED");
    reasonCodes.push(passed ? "FINAL_PASS" : "FINAL_FAIL");

    const decision: ExamDecisionStatus = passed ? "passed" : "failed";
    const finalResult: ExamFinalResult = {
      attemptId: attempt.id,
      finalStatus: decision,
      finalScore: merged.finalScore,
      percentage: merged.percentage,
      passed,
      sectionResults: merged.sectionResults,
      competencyResults: grading.competencyResults,
      integrityStatus: attempt.integrity.highestSeverity,
      reviewStatus: review ? review.status : "not_required",
      finalizedAt: input.now.toISOString(),
      reasonCodes,
    };
    return { decision, finalResult, reasonCodes };
  },
};

function terminal(
  status: ExamDecisionStatus,
  attempt: ExamAttempt,
  grading: ExamGradingResult,
  input: FinalDecisionInput,
  reasonCodes: string[],
): { decision: ExamDecisionStatus; finalResult: ExamFinalResult; reasonCodes: string[] } {
  const reviewStatus: ManualReviewStatus | "not_required" = input.review ? input.review.status : "not_required";
  return {
    decision: status,
    reasonCodes,
    finalResult: {
      attemptId: attempt.id,
      finalStatus: status,
      finalScore: 0,
      percentage: 0,
      passed: false,
      sectionResults: grading.sectionResults,
      competencyResults: grading.competencyResults,
      integrityStatus: attempt.integrity.highestSeverity,
      reviewStatus,
      finalizedAt: input.now.toISOString(),
      reasonCodes,
    },
  };
}

function isReviewComplete(status: ManualReviewStatus): boolean {
  return status === "finalized" || status === "approved" || status === "rejected";
}

/**
 * Fusionne les points humains dans les questions en attente puis recalcule chaque section à partir des sections
 * FIGÉES de la tentative (source d'autorité sur l'appartenance question → section). Recalcul déterministe.
 */
function mergeHumanScores(
  attempt: ExamAttempt,
  grading: ExamGradingResult,
  humanScores: Record<string, number>,
  policy: ExamGradingPolicy,
): { finalScore: number; percentage: number; sectionResults: ExamSectionResult[] } {
  const humanByQuestion = new Map(Object.entries(humanScores));
  const resById = new Map(
    grading.questionResults.map((r) => {
      if (r.gradingStatus === "pending_manual_review" && humanByQuestion.has(r.questionId)) {
        const awarded = Math.max(0, Math.min(r.maximumPoints, humanByQuestion.get(r.questionId) as number));
        return [r.questionId, { ...r, earnedPoints: awarded, gradingStatus: "graded" as const, correct: awarded >= r.maximumPoints }] as const;
      }
      return [r.questionId, r] as const;
    }),
  );

  const sectionResults = attempt.sections.map((section): ExamSectionResult => {
    const qids = section.questions.map((q) => q.id);
    const earned = round(qids.reduce((a, id) => a + (resById.get(id)?.earnedPoints ?? 0), 0));
    const maximumPoints = round(qids.reduce((a, id) => a + (resById.get(id)?.maximumPoints ?? 0), 0));
    const percentage = maximumPoints > 0 ? round((earned / maximumPoints) * 100) : 0;
    const threshold = policy.sectionThresholds[section.id] ?? section.minSectionPercent ?? 0;
    return {
      sectionId: section.id,
      earnedPoints: earned,
      maximumPoints,
      weightedScore: maximumPoints > 0 ? round(earned / maximumPoints) : 0,
      percentage,
      passed: percentage >= threshold,
      eliminatory: section.eliminatory,
      requiresManualReview: false,
    };
  });

  const finalScore = round(sectionResults.reduce((a, s) => a + s.earnedPoints, 0));
  let percentage: number;
  if (policy.weighting === "by_section") {
    const totalWeight = attempt.sections.reduce((a, s) => a + (sectionResults.find((r) => r.sectionId === s.id)!.maximumPoints > 0 ? s.weight : 0), 0);
    const weighted = sectionResults.reduce((a, s) => a + (attempt.sections.find((fs) => fs.id === s.sectionId)?.weight ?? 0) * s.weightedScore, 0);
    percentage = totalWeight > 0 ? round((weighted / totalWeight) * 100) : 0;
  } else {
    const maximumPoints = round(sectionResults.reduce((a, s) => a + s.maximumPoints, 0));
    percentage = maximumPoints > 0 ? round((finalScore / maximumPoints) * 100) : 0;
  }
  return { finalScore, percentage, sectionResults };
}
