/**
 * Runtime — Assessment : GradingEngine (Sprint F).
 *
 * Correction PRIVÉE et DÉTERMINISTE (conçue pour s'exécuter côté serveur). Ne dépend jamais du navigateur.
 * Supporte exact-match, one-of/single, all-required/partial, numeric tolerance, ordered/unordered, keyword,
 * rubric-required et manual-review. Produit des résultats bornés et explicables.
 */
import type {
  AssessmentPolicy,
  GradingResult,
  NormalizedResponse,
  PrivateQuestion,
  QuestionGradingResult,
} from "./types.ts";
import { PartialCreditEngine } from "./partial-credit-engine.ts";
import { CompetencyAssessmentEngine } from "./competency-assessment-engine.ts";

export const GradingEngine = {
  /** Corrige une question (privé). */
  gradeQuestion(q: PrivateQuestion, r: NormalizedResponse, ignoreAccents: boolean): QuestionGradingResult {
    const max = q.points;
    const manual = q.grading.kind === "manual" || q.type === "structured_text" || q.type === "file_reference";
    if (manual) {
      return { questionId: q.id, earnedPoints: 0, maximumPoints: max, correct: null, gradingStatus: "pending_manual_review", reasonCodes: ["MANUAL_REVIEW"] };
    }
    if (r.malformed) return graded(q.id, 0, max, false, ["MALFORMED"]);
    if (r.empty) return graded(q.id, 0, max, false, ["EMPTY"]);

    switch (q.grading.kind) {
      case "single": {
        const ok = r.value === q.grading.correctOptionId;
        return graded(q.id, ok ? max : 0, max, ok, [ok ? "CORRECT" : "INCORRECT"]);
      }
      case "boolean": {
        const ok = r.value === (q.grading.correct ? "true" : "false");
        return graded(q.id, ok ? max : 0, max, ok, [ok ? "CORRECT" : "INCORRECT"]);
      }
      case "multiple": {
        const earned = PartialCreditEngine.multiple(q.grading.correctOptionIds, r.value as string[], max, q.grading.partial);
        return graded(q.id, earned, max, earned === max, earned === max ? ["CORRECT"] : earned > 0 ? ["PARTIAL"] : ["INCORRECT"]);
      }
      case "matching": {
        const earned = PartialCreditEngine.matching(q.grading.pairs, r.value as [string, string][], max, q.grading.partial);
        return graded(q.id, earned, max, earned === max, earned === max ? ["CORRECT"] : earned > 0 ? ["PARTIAL"] : ["INCORRECT"]);
      }
      case "ordering": {
        const earned = PartialCreditEngine.ordering(q.grading.order, r.value as string[], max, q.grading.partial);
        return graded(q.id, earned, max, earned === max, earned === max ? ["CORRECT"] : earned > 0 ? ["PARTIAL"] : ["INCORRECT"]);
      }
      case "text": {
        const norm = (s: string) => normalizeText(s, q.grading.kind === "text" ? q.grading.caseSensitive : false, ignoreAccents && !(q.grading as { accentSensitive?: boolean }).accentSensitive);
        const val = norm(String(r.value));
        const ok = q.grading.accepted.some((a) => norm(a) === val);
        return graded(q.id, ok ? max : 0, max, ok, [ok ? "CORRECT" : "INCORRECT"]);
      }
      case "numeric": {
        const ok = Math.abs((r.value as number) - q.grading.value) <= q.grading.tolerance;
        return graded(q.id, ok ? max : 0, max, ok, [ok ? "CORRECT" : "INCORRECT"]);
      }
      case "keyword": {
        const text = normalizeText(String(r.value), false, ignoreAccents);
        const matches = q.grading.keywords.filter((k) => text.includes(normalizeText(k, false, ignoreAccents))).length;
        const ok = matches >= q.grading.minMatches;
        return graded(q.id, ok ? max : 0, max, ok, [ok ? "CORRECT" : "INCORRECT"]);
      }
      default:
        return { questionId: q.id, earnedPoints: 0, maximumPoints: max, correct: null, gradingStatus: "pending_manual_review", reasonCodes: ["MANUAL_REVIEW"] };
    }
  },

  /** Corrige une tentative complète. */
  gradeAttempt(questions: PrivateQuestion[], responses: NormalizedResponse[], policy: AssessmentPolicy, ignoreAccents: boolean): GradingResult {
    const byId = new Map(responses.map((r) => [r.questionId, r]));
    const questionResults: QuestionGradingResult[] = questions.map((q) =>
      GradingEngine.gradeQuestion(q, byId.get(q.id) ?? { questionId: q.id, type: q.type, value: null, empty: true, malformed: false }, ignoreAccents),
    );

    const earnedPoints = round(questionResults.reduce((a, r) => a + r.earnedPoints, 0));
    const maximumPoints = round(questionResults.reduce((a, r) => a + r.maximumPoints, 0));
    const requiresManualReview = questionResults.some((r) => r.gradingStatus === "pending_manual_review");
    const percentage = maximumPoints > 0 ? round((earnedPoints / maximumPoints) * 100) : 0;
    const passed = percentage >= policy.passThresholdPercent;
    const competencyResults = CompetencyAssessmentEngine.aggregate(questions, questionResults, policy);

    return {
      rawScore: earnedPoints,
      earnedPoints,
      maximumPoints,
      percentage,
      passed,
      gradingStatus: requiresManualReview ? "pending_manual_review" : "graded",
      questionResults,
      competencyResults,
      requiresManualReview,
      provisional: requiresManualReview,
    };
  },
};

function graded(questionId: string, earned: number, max: number, correct: boolean, reasonCodes: string[]): QuestionGradingResult {
  return { questionId, earnedPoints: earned, maximumPoints: max, correct, gradingStatus: "graded", reasonCodes };
}
function round(n: number): number {
  return Math.round(n * 1000) / 1000;
}
function normalizeText(s: string, caseSensitive: boolean | undefined, stripAccents: boolean): string {
  let out = s.trim();
  if (!caseSensitive) out = out.toLowerCase();
  if (stripAccents) out = out.normalize("NFD").replace(/\p{Diacritic}/gu, "");
  return out.replace(/\s+/g, " ");
}
