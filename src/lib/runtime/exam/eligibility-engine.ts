/**
 * Runtime — Exam : ExamEligibilityEngine (Sprint G).
 *
 * Évalue l'admissibilité à un examen final à partir de règles configurables et de faits fournis par
 * l'appelant (jamais lus depuis une base ici). PUR et déterministe. Chaque refus produit des reason codes
 * précis. Aucune logique propre à un programme.
 */
import type { ExamEligibilityContext, ExamEligibilityResult, ExamEligibilityRule } from "./types.ts";

export const ExamEligibilityEngine = {
  evaluate(rule: ExamEligibilityRule, ctx: ExamEligibilityContext, now: Date): ExamEligibilityResult {
    const unmet: string[] = [];
    const reasons: string[] = [];

    if (rule.requireActiveEnrollment && !ctx.enrollmentActive) unmet.push("ENROLLMENT_INACTIVE");
    if (rule.requireProgramAccessible && !ctx.programAccessible) unmet.push("PROGRAM_NOT_ACCESSIBLE");

    const missingModules = rule.requiredModuleIds.filter((m) => !ctx.completedModuleIds.includes(m));
    if (missingModules.length > 0) unmet.push("REQUIRED_MODULES_INCOMPLETE");

    if (ctx.progressPercent < rule.minimumProgressPercent) unmet.push("PROGRESS_BELOW_MINIMUM");

    const missingQuizzes = rule.requiredPassedQuizIds.filter((qz) => !ctx.passedQuizIds.includes(qz));
    if (missingQuizzes.length > 0) unmet.push("REQUIRED_QUIZZES_NOT_PASSED");

    if (rule.requireFinalProjectSubmitted && !ctx.finalProjectSubmitted) unmet.push("FINAL_PROJECT_NOT_SUBMITTED");
    if (rule.requireFinalProjectApproved && !ctx.finalProjectApproved) unmet.push("FINAL_PROJECT_NOT_APPROVED");
    if (rule.forbidAdministrativeHold && ctx.administrativeHold) unmet.push("ADMINISTRATIVE_HOLD");

    if (ctx.availableAttempts < rule.minimumAvailableAttempts) unmet.push("NO_ATTEMPTS_AVAILABLE");

    if (rule.mandatoryCooldownSeconds > 0 && ctx.lastAttemptCompletedAt) {
      const elapsed = (now.getTime() - new Date(ctx.lastAttemptCompletedAt).getTime()) / 1000;
      if (elapsed < rule.mandatoryCooldownSeconds) unmet.push("COOLDOWN_NOT_ELAPSED");
    }

    if (rule.requireExamWindowOpen && !ctx.examWindowOpen) unmet.push("EXAM_WINDOW_CLOSED");

    const missingPrereqs = rule.requiredPrerequisiteSkillIds.filter((s) => !ctx.satisfiedPrerequisiteSkillIds.includes(s));
    if (missingPrereqs.length > 0) unmet.push("PREREQUISITES_NOT_SATISFIED");

    // Décision spéciale explicite d'un tuteur/administrateur.
    if (ctx.specialApproval === "denied") {
      return { status: "ineligible", reasonCodes: ["SPECIAL_APPROVAL_DENIED"], unmetRuleCodes: ["SPECIAL_APPROVAL_DENIED"], ruleVersion: rule.version, checkedAt: now.toISOString() };
    }
    if (ctx.specialApproval === "granted") {
      return { status: "eligible", reasonCodes: ["SPECIAL_APPROVAL_GRANTED"], unmetRuleCodes: [], ruleVersion: rule.version, checkedAt: now.toISOString() };
    }

    if (unmet.length === 0) {
      return { status: "eligible", reasonCodes: ["ALL_RULES_SATISFIED"], unmetRuleCodes: [], ruleVersion: rule.version, checkedAt: now.toISOString() };
    }

    // Le projet final non approuvé (mais soumis) ou une fenêtre fermée relèvent d'une approbation manuelle
    // plutôt que d'un refus définitif ; le reste est bloquant (conditionnel si récupérable par l'apprenant).
    const requiresManual =
      (unmet.includes("FINAL_PROJECT_NOT_APPROVED") && ctx.finalProjectSubmitted) ||
      unmet.includes("ADMINISTRATIVE_HOLD");
    if (requiresManual) {
      reasons.push("MANUAL_APPROVAL_REQUIRED", ...unmet);
      return { status: "requires_manual_approval", reasonCodes: reasons, unmetRuleCodes: unmet, ruleVersion: rule.version, checkedAt: now.toISOString() };
    }

    const recoverable = unmet.every((c) =>
      ["PROGRESS_BELOW_MINIMUM", "REQUIRED_QUIZZES_NOT_PASSED", "REQUIRED_MODULES_INCOMPLETE", "FINAL_PROJECT_NOT_SUBMITTED", "PREREQUISITES_NOT_SATISFIED", "COOLDOWN_NOT_ELAPSED"].includes(c),
    );
    reasons.push(...unmet);
    return {
      status: recoverable ? "conditionally_eligible" : "ineligible",
      reasonCodes: reasons,
      unmetRuleCodes: unmet,
      ruleVersion: rule.version,
      checkedAt: now.toISOString(),
    };
  },

  /** Admissibilité stricte : true seulement si `eligible`. */
  isAdmissible(result: ExamEligibilityResult): boolean {
    return result.status === "eligible";
  },
};
