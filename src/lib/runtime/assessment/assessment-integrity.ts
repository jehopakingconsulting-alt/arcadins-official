/**
 * Runtime — Assessment : AssessmentIntegrity (Sprint F).
 *
 * Contrôles DÉFENSIFS non intrusifs (aucune surveillance, aucune biométrie, aucune webcam). Somme de contrôle,
 * détection de soumission double / question étrangère / expiration / rejeu / version modifiée / payload mal formé.
 */
import type {
  AssessmentAttempt,
  AssessmentSession,
  IntegrityCheck,
  IntegrityIssue,
  PrivateQuestion,
  StudentResponse,
} from "./types.ts";
import { AssessmentPolicyEngine } from "./assessment-policy-engine.ts";

/** Somme de contrôle déterministe (djb2) d'une session (hors champ checksum). */
export function sessionChecksum(session: Omit<AssessmentSession, "checksum">): string {
  const stable = JSON.stringify({
    attemptId: session.attemptId,
    questionIds: session.publicQuestions.map((q) => `${q.id}@${q.version}`),
    responses: session.responses,
    status: session.status,
    version: session.version,
  });
  let h = 5381;
  for (let i = 0; i < stable.length; i++) h = ((h << 5) + h + stable.charCodeAt(i)) >>> 0;
  return h.toString(16);
}

export const AssessmentIntegrity = {
  /** Une réponse peut-elle être enregistrée ? (non soumise, question connue, payload plausible) */
  checkAnswer(attempt: AssessmentAttempt, response: StudentResponse): IntegrityCheck {
    const issues: IntegrityIssue[] = [];
    if (attempt.status === "submitted" || attempt.status === "graded" || attempt.status === "completed") {
      issues.push({ code: "MODIFIED_AFTER_SUBMISSION", message: "Tentative déjà soumise." });
    }
    if (!attempt.questions.some((q) => q.id === response.questionId)) {
      issues.push({ code: "UNKNOWN_QUESTION", message: `Question absente de la tentative : ${response.questionId}.` });
    }
    if (response.value === undefined) issues.push({ code: "MALFORMED_PAYLOAD", message: "Valeur de réponse absente." });
    return { ok: issues.length === 0, issues };
  },

  /** Une soumission peut-elle être traitée ? (pas déjà soumise avec un autre commandId, pas expirée-rejetée) */
  checkSubmission(attempt: AssessmentAttempt, commandId: string, now: Date): IntegrityCheck {
    const issues: IntegrityIssue[] = [];
    if (attempt.submittedCommandId && attempt.submittedCommandId !== commandId) {
      issues.push({ code: "ALREADY_SUBMITTED", message: "Une soumission différente a déjà été traitée." });
    }
    if (AssessmentPolicyEngine.isExpired(attempt.expiresAt, now) && attempt.status !== "in_progress" && attempt.status !== "ready") {
      issues.push({ code: "EXPIRED", message: "Tentative expirée." });
    }
    return { ok: issues.length === 0, issues };
  },

  /** Détecte un rejeu de la même commande (idempotence attendue en amont). */
  isReplay(attempt: AssessmentAttempt, commandId: string): boolean {
    return attempt.submittedCommandId === commandId;
  },

  /** Vérifie que les versions de questions figées correspondent toujours (banque vivante ≠ tentative). */
  checkVersions(attempt: AssessmentAttempt, current: (id: string) => PrivateQuestion | undefined): IntegrityCheck {
    const issues: IntegrityIssue[] = [];
    for (const q of attempt.questions) {
      const live = current(q.id);
      if (live && live.version !== q.version) {
        issues.push({ code: "VERSION_CHANGED", message: `Version modifiée pour ${q.id} (tentative fige v${q.version}).` });
      }
    }
    return { ok: issues.length === 0, issues };
  },

  /** Vérifie l'intégrité de la somme de contrôle d'une session. */
  verifyChecksum(session: AssessmentSession): IntegrityCheck {
    const expected = sessionChecksum(session);
    return expected === session.checksum
      ? { ok: true, issues: [] }
      : { ok: false, issues: [{ code: "INVALID_CHECKSUM", message: "Somme de contrôle invalide." }] };
  },
};
