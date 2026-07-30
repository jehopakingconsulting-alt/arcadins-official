/**
 * Runtime — Exam : FinalExamGradingEngine (Sprint G).
 *
 * Correction sommative PRIVÉE et DÉTERMINISTE (conçue pour le serveur), par COMPOSITION du GradingEngine et de
 * l'AnswerNormalizer du Sprint F. Ajoute : pondération par question / par section, seuils de section, règles
 * éliminatoires, pénalités configurables (0 par défaut), résultat PROVISOIRE (correction humaine en attente 0)
 * distinct du résultat définitif. Ne modifie jamais la progression académique.
 */
import type {
  ExamFrozenSection,
  ExamGradingPolicy,
  ExamGradingResult,
  ExamResponse,
  ExamSectionResult,
  CompetencyAssessmentResult,
  PrivateQuestion,
  QuestionGradingResult,
} from "./types.ts";
import { AnswerNormalizer } from "../assessment/answer-normalizer.ts";
import { GradingEngine } from "../assessment/grading-engine.ts";
import { CompetencyAssessmentEngine } from "../assessment/competency-assessment-engine.ts";
import { DEFAULT_ASSESSMENT_POLICY } from "../assessment/config.ts";

function round(n: number): number {
  return Math.round(n * 1000) / 1000;
}

export const FinalExamGradingEngine = {
  /** Corrige une section (privé). */
  gradeSection(section: ExamFrozenSection, responses: Record<string, ExamResponse>, policy: ExamGradingPolicy): { result: ExamSectionResult; questionResults: QuestionGradingResult[] } {
    const questionResults = section.questions.map((q) => {
      const resp = responses[q.id];
      const normalized = AnswerNormalizer.normalize(q, resp && !resp.rejected ? { questionId: q.id, value: resp.value } : undefined);
      const base = GradingEngine.gradeQuestion(q, normalized, policy.ignoreAccents);
      // Pénalité configurable (désactivée par défaut) sur réponse incorrecte auto-corrigée.
      if (policy.penalties.perIncorrect > 0 && base.gradingStatus === "graded" && base.correct === false && !normalized.empty) {
        const penalized = Math.max(0, base.earnedPoints - policy.penalties.perIncorrect);
        return { ...base, earnedPoints: penalized, reasonCodes: [...base.reasonCodes, "PENALTY_APPLIED"] };
      }
      return base;
    });

    const earnedPoints = round(questionResults.reduce((a, r) => a + (r.gradingStatus === "graded" ? r.earnedPoints : 0), 0));
    const maximumPoints = round(questionResults.reduce((a, r) => a + r.maximumPoints, 0));
    const requiresManualReview = questionResults.some((r) => r.gradingStatus === "pending_manual_review");
    const percentage = maximumPoints > 0 ? round((earnedPoints / maximumPoints) * 100) : 0;
    const threshold = policy.sectionThresholds[section.id] ?? section.minSectionPercent ?? 0;
    const passed = !requiresManualReview && percentage >= threshold;

    return {
      result: {
        sectionId: section.id,
        earnedPoints,
        maximumPoints,
        weightedScore: maximumPoints > 0 ? round(earnedPoints / maximumPoints) : 0,
        percentage,
        passed,
        eliminatory: section.eliminatory,
        requiresManualReview,
      },
      questionResults,
    };
  },

  /** Corrige la tentative complète : produit un résultat PROVISOIRE (manuel en attente compté 0). */
  grade(sections: ExamFrozenSection[], responses: Record<string, ExamResponse>, policy: ExamGradingPolicy): ExamGradingResult {
    const perSection = sections.map((s) => FinalExamGradingEngine.gradeSection(s, responses, policy));
    const sectionResults = perSection.map((p) => p.result);
    const allQuestionResults = perSection.flatMap((p) => p.questionResults);
    const allQuestions: PrivateQuestion[] = sections.flatMap((s) => s.questions);

    const maximumPoints = round(sectionResults.reduce((a, s) => a + s.maximumPoints, 0));
    const automaticScore = round(sectionResults.reduce((a, s) => a + s.earnedPoints, 0));
    const manualScorePending = round(
      allQuestionResults.filter((r) => r.gradingStatus === "pending_manual_review").reduce((a, r) => a + r.maximumPoints, 0),
    );
    const requiresManualReview = manualScorePending > 0;

    // Score pondéré selon le mode.
    let percentage: number;
    if (policy.weighting === "by_section") {
      const totalWeight = sectionResults.reduce((a, s) => a + (s.maximumPoints > 0 ? sectionWeight(sections, s.sectionId) : 0), 0);
      const weighted = sectionResults.reduce((a, s) => a + sectionWeight(sections, s.sectionId) * s.weightedScore, 0);
      percentage = totalWeight > 0 ? round((weighted / totalWeight) * 100) : 0;
    } else {
      percentage = maximumPoints > 0 ? round((automaticScore / maximumPoints) * 100) : 0;
    }

    const eliminatoryIds = new Set(policy.eliminatorySectionIds);
    const eliminatoryFailure = sectionResults.some((s) => (s.eliminatory || eliminatoryIds.has(s.sectionId)) && !s.requiresManualReview && !s.passed);
    const sectionThresholdFailure = sectionResults.some((s) => !s.requiresManualReview && !s.passed);

    const passedAutomatically = !requiresManualReview && percentage >= policy.passThresholdPercent && !eliminatoryFailure && !sectionThresholdFailure;

    // Compétences : réutilise l'agrégateur du Sprint F (contrat commun), seuil = seuil d'examen.
    const competencyResults: CompetencyAssessmentResult[] = CompetencyAssessmentEngine.aggregate(allQuestions, allQuestionResults, {
      ...DEFAULT_ASSESSMENT_POLICY,
      passThresholdPercent: policy.passThresholdPercent,
    });

    const reasonCodes: string[] = [];
    if (requiresManualReview) reasonCodes.push("MANUAL_REVIEW_PENDING");
    if (eliminatoryFailure) reasonCodes.push("ELIMINATORY_SECTION_FAILED");
    else if (sectionThresholdFailure) reasonCodes.push("SECTION_THRESHOLD_FAILED");
    if (passedAutomatically) reasonCodes.push("AUTO_PASS");
    else if (!requiresManualReview) reasonCodes.push("AUTO_FAIL");

    const gradingStatus = maximumPoints === 0 ? "incomplete" : requiresManualReview ? "pending_manual_review" : "graded";

    return {
      automaticScore,
      manualScorePending,
      provisionalScore: automaticScore,
      finalScore: requiresManualReview ? null : automaticScore,
      maximumPoints,
      percentage,
      sectionResults,
      competencyResults,
      questionResults: allQuestionResults,
      passedAutomatically,
      requiresManualReview,
      gradingStatus,
      eliminatoryFailure,
      reasonCodes,
    };
  },
};

function sectionWeight(sections: ExamFrozenSection[], sectionId: string): number {
  return sections.find((s) => s.id === sectionId)?.weight ?? 0;
}
