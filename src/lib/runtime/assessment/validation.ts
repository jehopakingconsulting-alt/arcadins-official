/**
 * Runtime — Assessment : validation d'invariants (Sprint F).
 */
import type {
  AssessmentAttempt,
  AssessmentSession,
  AssessmentValidationIssue,
  AssessmentValidationReport,
  GradingResult,
} from "./types.ts";
import { containsForbiddenKeys } from "./public-serializer.ts";

/** Valide qu'une session publique ne fuit aucune réponse et reste cohérente. */
export function validatePublicSession(session: AssessmentSession): AssessmentValidationReport {
  const errors: AssessmentValidationIssue[] = [];
  const warnings: AssessmentValidationIssue[] = [];
  const err = (code: string, message: string) => errors.push({ level: "error", code, message });

  if (containsForbiddenKeys(session)) err("ANSWER_LEAK", "La session publique contient des données de correction.");
  const ids = session.publicQuestions.map((q) => q.id);
  if (new Set(ids).size !== ids.length) err("DUP_QUESTION", "Identifiants de questions dupliqués.");
  if (session.progress.total !== session.publicQuestions.length) err("PROGRESS", "Total de progression incohérent.");
  return { ok: errors.length === 0, errors, warnings };
}

/** Valide qu'un résultat de correction est cohérent (bornes, révision manuelle). */
export function validateGradingResult(result: GradingResult): AssessmentValidationReport {
  const errors: AssessmentValidationIssue[] = [];
  const warnings: AssessmentValidationIssue[] = [];
  const err = (code: string, message: string) => errors.push({ level: "error", code, message });

  if (result.earnedPoints < 0 || result.earnedPoints > result.maximumPoints) err("SCORE_BOUNDS", "Score hors bornes [0, max].");
  for (const q of result.questionResults) {
    if (q.earnedPoints < 0 || q.earnedPoints > q.maximumPoints) err("Q_SCORE_BOUNDS", `${q.questionId} : score hors bornes.`);
    if (q.gradingStatus === "pending_manual_review" && q.correct !== null) err("MANUAL_CORRECT", `${q.questionId} : révision manuelle mais correct défini.`);
  }
  if (result.requiresManualReview && !result.provisional) err("PROVISIONAL", "Révision manuelle requise mais résultat non provisoire.");
  return { ok: errors.length === 0, errors, warnings };
}

/** Valide qu'une tentative respecte le nombre maximal et fige ses questions. */
export function validateAttempt(attempt: AssessmentAttempt): AssessmentValidationReport {
  const errors: AssessmentValidationIssue[] = [];
  const warnings: AssessmentValidationIssue[] = [];
  if (attempt.attemptNumber > attempt.maxAttempts) errors.push({ level: "error", code: "TOO_MANY_ATTEMPTS", message: "Numéro de tentative au-delà du maximum." });
  const qids = attempt.questions.map((q) => q.id);
  if (new Set(qids).size !== qids.length) errors.push({ level: "error", code: "DUP_Q", message: "Questions dupliquées dans la tentative." });
  for (const q of attempt.questions) if (typeof q.version !== "number") errors.push({ level: "error", code: "NO_VERSION", message: `${q.id} sans version figée.` });
  return { ok: errors.length === 0, errors, warnings };
}
