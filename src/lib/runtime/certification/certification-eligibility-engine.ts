/**
 * Runtime — Certification : CertificationEligibilityEngine (Sprint H).
 *
 * Décide de l'admissibilité à un credential à partir d'un `ExamResultContract` FINALISÉ (Sprint G) et de faits
 * fournis par l'appelant. Un résultat PROVISOIRE ou ÉCHOUÉ ne permet JAMAIS l'émission. PUR, agnostique du programme.
 */
import type {
  CredentialEligibilityContext,
  CredentialEligibilityResult,
  CredentialPolicy,
} from "./types.ts";

export const CertificationEligibilityEngine = {
  evaluate(policy: CredentialPolicy, ctx: CredentialEligibilityContext, now: Date): CredentialEligibilityResult {
    const at = now.toISOString();
    const unmet: string[] = [];
    const fr = ctx.finalResult;

    // Émission déjà active identique → already_issued (prioritaire, informatif).
    if (ctx.existingActiveIssuanceKey) {
      return { status: "already_issued", reasonCodes: ["ACTIVE_CREDENTIAL_EXISTS"], unmetCodes: ["ACTIVE_CREDENTIAL_EXISTS"], checkedAt: at };
    }

    // Source de vérité : résultat DÉFINITIF réussi et admissible à l'émission.
    if (fr.finalStatus !== "passed") unmet.push("FINAL_STATUS_NOT_PASSED");
    if (!fr.passed) unmet.push("RESULT_NOT_PASSED");
    if (!fr.certificateEligibility) unmet.push("CERTIFICATE_ELIGIBILITY_FALSE");
    if (!fr.finalizedAt) unmet.push("RESULT_NOT_FINALIZED");
    if (fr.reviewStatus !== "not_required" && fr.reviewStatus !== "finalized" && fr.reviewStatus !== "approved" && fr.reviewStatus !== "rejected") {
      unmet.push("MANUAL_REVIEW_PENDING");
    }
    if (fr.integrityStatus === "blocking") unmet.push("INTEGRITY_BLOCKING");

    // Exigences de la politique (agnostiques).
    if (policy.issuanceConditions.requireFinalExamPassed && !(fr.finalStatus === "passed" && fr.passed)) unmet.push("FINAL_EXAM_NOT_PASSED");
    if (policy.issuanceConditions.requireFullProgress && !ctx.fullProgressCompleted) unmet.push("PROGRESS_INCOMPLETE");
    if (policy.issuanceConditions.requireFinalProjectValidated && !ctx.finalProjectValidated) unmet.push("FINAL_PROJECT_NOT_VALIDATED");
    if (policy.issuanceConditions.minimumFinalScorePercent != null) {
      const pct = scorePercent(fr);
      if (pct == null || pct < policy.issuanceConditions.minimumFinalScorePercent) unmet.push("FINAL_SCORE_BELOW_MINIMUM");
    }

    // Prérequis administratifs / identité / titre / programme.
    if (!ctx.programAdmissibleForIssuance) unmet.push("PROGRAM_NOT_ADMISSIBLE");
    if (!ctx.learnerDisplayName || ctx.learnerDisplayName.trim() === "") unmet.push("ACADEMIC_IDENTITY_MISSING");
    if (!ctx.documentTitleAuthorized) unmet.push("DOCUMENT_TITLE_NOT_AUTHORIZED");
    if (ctx.administrativeDebtBlocking) unmet.push("ADMINISTRATIVE_DEBT_BLOCKING");
    if (!policy.activatable) unmet.push("POLICY_NOT_ACTIVATABLE");

    // Décision spéciale explicite.
    if (ctx.specialApproval === "denied") {
      return { status: "blocked", reasonCodes: ["SPECIAL_APPROVAL_DENIED"], unmetCodes: ["SPECIAL_APPROVAL_DENIED"], checkedAt: at };
    }

    if (unmet.length === 0) {
      return { status: "eligible", reasonCodes: ["ALL_CONDITIONS_SATISFIED"], unmetCodes: [], checkedAt: at };
    }
    if (ctx.specialApproval === "granted" && !hasHardBlock(unmet)) {
      return { status: "eligible", reasonCodes: ["SPECIAL_APPROVAL_GRANTED"], unmetCodes: [], checkedAt: at };
    }

    // Blocs durs (résultat non définitif/échoué/intégrité) → ineligible ou blocked. Sinon conditionnel/manuel.
    if (hasHardBlock(unmet)) {
      return { status: "ineligible", reasonCodes: unmet, unmetCodes: unmet, checkedAt: at };
    }
    if (unmet.includes("ADMINISTRATIVE_DEBT_BLOCKING") || unmet.includes("DOCUMENT_TITLE_NOT_AUTHORIZED")) {
      return { status: "requires_manual_approval", reasonCodes: ["MANUAL_APPROVAL_REQUIRED", ...unmet], unmetCodes: unmet, checkedAt: at };
    }
    return { status: "conditionally_eligible", reasonCodes: unmet, unmetCodes: unmet, checkedAt: at };
  },

  isEligible(result: CredentialEligibilityResult): boolean {
    return result.status === "eligible";
  },
};

/** Blocs qui interdisent définitivement l'émission (jamais franchissables par dérogation). */
function hasHardBlock(unmet: string[]): boolean {
  return [
    "FINAL_STATUS_NOT_PASSED",
    "RESULT_NOT_PASSED",
    "CERTIFICATE_ELIGIBILITY_FALSE",
    "RESULT_NOT_FINALIZED",
    "MANUAL_REVIEW_PENDING",
    "INTEGRITY_BLOCKING",
  ].some((c) => unmet.includes(c));
}

/** Pourcentage final dérivé des sections (si disponibles). */
function scorePercent(fr: CredentialEligibilityContext["finalResult"]): number | null {
  const max = fr.sectionResults.reduce((a, s) => a + s.maximumPoints, 0);
  if (max <= 0) return null;
  return Math.round((fr.finalScore / max) * 1000) / 10;
}
