/**
 * Runtime — Exam : validation d'invariants (Sprint G).
 *
 * Vérifie les garanties de sécurité et de cohérence d'un examen final : aucune fuite de réponse, immutabilité
 * après soumission, versionnement figé, bornes de score, cohérence sections/global, chronomètre non négatif,
 * transmission conditionnelle à la certification.
 */
import type {
  ExamAttempt,
  ExamFinalResult,
  ExamGradingResult,
  ExamResultContract,
  ExamSession,
  ExamValidationIssue,
  ExamValidationReport,
} from "./types.ts";
import { containsForbiddenKeys } from "./secure-exam-serializer.ts";
import { ExamSessionManager } from "./exam-session-manager.ts";

function report(errors: ExamValidationIssue[], warnings: ExamValidationIssue[] = []): ExamValidationReport {
  return { ok: errors.length === 0, errors, warnings };
}

/** Valide qu'une session publique ne fuit aucune réponse correcte et reste cohérente. */
export function validatePublicExamSession(session: ExamSession): ExamValidationReport {
  const errors: ExamValidationIssue[] = [];
  const err = (code: string, message: string) => errors.push({ level: "error", code, message });

  if (containsForbiddenKeys(session)) err("ANSWER_LEAK", "La session publique contient des données de correction.");
  const ids = session.sections.flatMap((s) => s.questions.map((q) => q.id));
  if (new Set(ids).size !== ids.length) err("DUP_QUESTION", "Identifiants de questions dupliqués.");
  if (session.progress.total !== ids.length) err("PROGRESS", "Total de progression incohérent.");
  if (session.timer.remainingOfficialSeconds < 0) err("TIMER_NEGATIVE", "Temps restant négatif.");
  return report(errors);
}

/** Valide qu'un résultat de correction est borné et cohérent (sections ↔ global). */
export function validateExamGradingResult(result: ExamGradingResult): ExamValidationReport {
  const errors: ExamValidationIssue[] = [];
  const err = (code: string, message: string) => errors.push({ level: "error", code, message });

  if (result.automaticScore < 0 || result.automaticScore > result.maximumPoints) err("SCORE_BOUNDS", "Score automatique hors bornes [0, max].");
  const sectionMax = round(result.sectionResults.reduce((a, s) => a + s.maximumPoints, 0));
  if (result.maximumPoints !== sectionMax) err("SECTION_SUM", "Somme des maxima de sections incohérente avec le maximum global.");
  for (const s of result.sectionResults) {
    if (s.earnedPoints < 0 || s.earnedPoints > s.maximumPoints) err("SECTION_BOUNDS", `${s.sectionId} : score de section hors bornes.`);
  }
  for (const q of result.questionResults) {
    if (q.earnedPoints < 0 || q.earnedPoints > q.maximumPoints) err("Q_BOUNDS", `${q.questionId} : score hors bornes.`);
    if (q.gradingStatus === "pending_manual_review" && q.correct !== null) err("MANUAL_CORRECT", `${q.questionId} : révision manuelle mais correct défini.`);
  }
  if (result.requiresManualReview && result.finalScore !== null) err("PROVISIONAL", "Révision requise mais finalScore déjà défini.");
  return report(errors);
}

/** Valide qu'une tentative fige sa version et respecte le budget de tentatives. */
export function validateExamAttempt(attempt: ExamAttempt): ExamValidationReport {
  const errors: ExamValidationIssue[] = [];
  const err = (code: string, message: string) => errors.push({ level: "error", code, message });

  if (attempt.attemptNumber > attempt.maximumAttempts) err("TOO_MANY_ATTEMPTS", "Numéro de tentative au-delà du maximum.");
  if (typeof attempt.frozenVersion.examVersion !== "number") err("NO_VERSION", "Version d'examen non figée.");
  const qids = attempt.sections.flatMap((s) => s.questions.map((q) => q.id));
  if (new Set(qids).size !== qids.length) err("DUP_Q", "Questions dupliquées dans la tentative.");
  if (attempt.timer.remainingOfficialSeconds < 0 || attempt.timer.elapsedOfficialSeconds < 0) err("TIMER_NEGATIVE", "Chronomètre négatif.");
  if (ExamSessionManager.isImmutable(attempt.status)) {
    // Après soumission, aucune réponse ne doit être en état « non rejetée modifiable » incohérente : contrôle léger.
    if (attempt.status !== "submitted" && attempt.status !== "grading" && !attempt.provisionalResult && attempt.status !== "invalidated" && attempt.status !== "cancelled" && attempt.status !== "abandoned") {
      err("NO_RESULT", "État post-correction sans résultat provisoire.");
    }
  }
  return report(errors);
}

/** Valide la règle d'or : un certificat n'est possible qu'avec un résultat DÉFINITIF réussi et valide. */
export function validateCertificateGate(contract: ExamResultContract, finalResult: ExamFinalResult | null): ExamValidationReport {
  const errors: ExamValidationIssue[] = [];
  const err = (code: string, message: string) => errors.push({ level: "error", code, message });

  if (contract.certificateEligibility) {
    if (!finalResult) err("CERT_NO_FINAL", "Certificat éligible sans résultat définitif.");
    else {
      if (!finalResult.passed || finalResult.finalStatus !== "passed") err("CERT_NOT_PASSED", "Certificat éligible sans réussite définitive.");
      if (contract.reviewStatus !== "not_required" && contract.reviewStatus !== "finalized" && contract.reviewStatus !== "approved" && contract.reviewStatus !== "rejected") err("CERT_REVIEW", "Certificat éligible alors que la révision est incomplète.");
      if (contract.integrityStatus === "blocking") err("CERT_INTEGRITY", "Certificat éligible avec intégrité bloquante.");
    }
  }
  return report(errors);
}

function round(n: number): number {
  return Math.round(n * 1000) / 1000;
}
