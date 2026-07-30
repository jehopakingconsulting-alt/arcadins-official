/**
 * Runtime — Exam : ExamIntegrityEngine (Sprint G).
 *
 * Contrôles DÉFENSIFS non intrusifs — aucune surveillance, aucune biométrie, aucune webcam, aucune capture.
 * Classe les anomalies (informational / warning / suspicious / blocking) avec des reason codes NEUTRES et
 * vérifiables. Une anomalie n'est JAMAIS automatiquement qualifiée de fraude. Somme de contrôle déterministe.
 */
import type {
  ExamAttempt,
  ExamFrozenSection,
  ExamIntegrityCode,
  ExamIntegrityIssue,
  ExamIntegritySeverity,
  ExamIntegrityStatus,
  ExamSession,
  FinalExamVersion,
  StudentResponse,
} from "./types.ts";

const SEVERITY_RANK: Record<ExamIntegritySeverity, number> = {
  clean: 0,
  informational: 1,
  warning: 2,
  suspicious: 3,
  blocking: 4,
};

/** Somme de contrôle déterministe (djb2) d'une session (hors champ checksum). */
export function examSessionChecksum(session: Omit<ExamSession, "checksum">): string {
  const stable = JSON.stringify({
    sessionId: session.sessionId,
    attemptId: session.attemptId,
    questionIds: session.sections.flatMap((s) => s.questions.map((q) => `${q.id}@${q.version}`)),
    responses: session.responses,
    status: session.status,
    version: session.frozenVersion,
  });
  let h = 5381;
  for (let i = 0; i < stable.length; i++) h = ((h << 5) + h + stable.charCodeAt(i)) >>> 0;
  return h.toString(16);
}

function issue(code: ExamIntegrityCode, severity: ExamIntegritySeverity, message: string): ExamIntegrityIssue {
  return { code, severity, message };
}

/** Agrège une liste d'anomalies en un statut (sévérité maximale + drapeau bloquant). */
export function summarize(issues: ExamIntegrityIssue[]): ExamIntegrityStatus {
  if (issues.length === 0) return { highestSeverity: "clean", blocking: false, issues: [] };
  const highestSeverity = issues.reduce<ExamIntegritySeverity>((acc, i) => (SEVERITY_RANK[i.severity] > SEVERITY_RANK[acc] ? i.severity : acc), "clean");
  return { highestSeverity, blocking: issues.some((i) => i.severity === "blocking"), issues };
}

/** Fusionne des anomalies dans un statut existant (immuable). */
export function mergeIntegrity(status: ExamIntegrityStatus, added: ExamIntegrityIssue[]): ExamIntegrityStatus {
  return summarize([...status.issues, ...added]);
}

export const EMPTY_INTEGRITY: ExamIntegrityStatus = { highestSeverity: "clean", blocking: false, issues: [] };

export const ExamIntegrityEngine = {
  /** L'apprenant correspond-il au propriétaire de la tentative ? */
  checkOwnership(attempt: ExamAttempt, learnerRef: string): ExamIntegrityIssue[] {
    return attempt.learnerRef === learnerRef ? [] : [issue("FOREIGN_LEARNER", "blocking", "Tentative appartenant à un autre apprenant.")];
  },

  /** Les versions figées de la tentative correspondent-elles à la version attendue ? */
  checkVersion(attempt: ExamAttempt, expected: FinalExamVersion): ExamIntegrityIssue[] {
    const a = JSON.stringify(attempt.frozenVersion);
    const b = JSON.stringify(expected);
    return a === b ? [] : [issue("VERSION_MISMATCH", "warning", "Version d'examen incohérente avec la version figée de la tentative.")];
  },

  /** L'ordre des questions figées est-il inchangé ? */
  checkOrder(attempt: ExamAttempt, expectedOrder: string[]): ExamIntegrityIssue[] {
    const actual = attempt.sections.flatMap((s) => s.questions.map((q) => q.id));
    return JSON.stringify(actual) === JSON.stringify(expectedOrder) ? [] : [issue("ORDER_ALTERED", "suspicious", "Ordre des questions modifié.")];
  },

  /** La somme de contrôle d'une session est-elle valide ? */
  verifyChecksum(session: ExamSession): ExamIntegrityIssue[] {
    const { checksum, ...rest } = session;
    return examSessionChecksum(rest) === checksum ? [] : [issue("INVALID_CHECKSUM", "suspicious", "Somme de contrôle de session invalide.")];
  },

  /** Une réponse peut-elle être acceptée ? (question autorisée, section accessible, pas après expiration/soumission) */
  checkAnswer(attempt: ExamAttempt, sections: ExamFrozenSection[], response: StudentResponse, expired: boolean): ExamIntegrityIssue[] {
    const issues: ExamIntegrityIssue[] = [];
    if (attempt.status === "submitted" || attempt.status === "grading" || attempt.status === "finalized" || attempt.status === "passed" || attempt.status === "failed" || attempt.status === "provisionally_graded") {
      issues.push(issue("ANSWER_AFTER_SUBMISSION", "blocking", "Réponse après soumission."));
    }
    if (expired) issues.push(issue("ANSWER_AFTER_EXPIRY", "blocking", "Réponse après expiration."));
    const section = sections.find((s) => s.questions.some((q) => q.id === response.questionId));
    if (!section) issues.push(issue("UNAUTHORIZED_QUESTION", "blocking", `Question non autorisée : ${response.questionId}.`));
    else if (section.locked) issues.push(issue("SECTION_NOT_ACCESSIBLE", "warning", `Section verrouillée : ${section.id}.`));
    if (response.value === undefined) issues.push(issue("MALFORMED_PAYLOAD", "warning", "Valeur de réponse absente."));
    if (isOversized(response.value)) issues.push(issue("OVERSIZED_PAYLOAD", "warning", "Charge de réponse surdimensionnée."));
    return issues;
  },

  /** Détecte un rejeu de la même commande (idempotence attendue en amont). */
  checkReplay(attempt: ExamAttempt, commandId: string): ExamIntegrityIssue[] {
    return attempt.processedCommands[commandId] ? [issue("REPLAYED_COMMAND", "informational", "Commande déjà traitée (rejeu).")] : [];
  },

  /** Dérive du temps client au-delà de la tolérance ? (indice défensif, non bloquant) */
  checkClientDrift(driftSeconds: number, toleranceSeconds: number): ExamIntegrityIssue[] {
    return driftSeconds > toleranceSeconds ? [issue("CLIENT_CLOCK_INCONSISTENT", "warning", `Dérive d'horloge client : ${driftSeconds}s.`)] : [];
  },

  /** Heartbeat trop espacé ? (indice défensif, non bloquant) */
  checkHeartbeat(gapSeconds: number, maxGapSeconds: number): ExamIntegrityIssue[] {
    return gapSeconds > maxGapSeconds ? [issue("ABNORMAL_HEARTBEAT", "informational", `Heartbeat en retard : ${gapSeconds}s.`)] : [];
  },

  summarize,
  mergeIntegrity,
};

function isOversized(value: unknown): boolean {
  try {
    return JSON.stringify(value ?? "").length > 20000;
  } catch {
    return true;
  }
}
