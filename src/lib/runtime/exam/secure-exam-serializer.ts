/**
 * Runtime — Exam : SecureExamSerializer (Sprint G).
 *
 * SÉCURITÉ ABSOLUE : construit la session PUBLIQUE d'un examen à partir de la tentative PRIVÉE, en retirant
 * TOUTE donnée de correction. Réutilise les garanties du Sprint F (`toPublicQuestion`, `containsForbiddenKeys`)
 * et ajoute les clés interdites propres à l'examen final.
 */
import type { ExamAttempt, ExamNavigationMode, ExamPublicSection, ExamSession } from "./types.ts";
import { toPublicQuestion, containsForbiddenKeys as assessmentContainsForbiddenKeys, FORBIDDEN_PUBLIC_KEYS as ASSESSMENT_FORBIDDEN_KEYS } from "../assessment/public-serializer.ts";
import { examSessionChecksum } from "./exam-integrity-engine.ts";

/** Clés strictement interdites dans un payload public d'examen (union avec celles du Sprint F). */
export const FORBIDDEN_EXAM_PUBLIC_KEYS = [
  ...ASSESSMENT_FORBIDDEN_KEYS,
  "correctAnswer",
  "correctAnswers",
  "answerKey",
  "acceptedAnswers",
  "scoringKey",
  "hiddenRubric",
  "privateExplanation",
  "gradingRule",
  "expectedPattern",
  "internalWeight",
  "securityMetadata",
  "reviewerNotes",
  "finalDecisionRule",
] as const;

/** Vérifie qu'un objet ne contient AUCUNE clé interdite (défense en profondeur, testable). */
export function containsForbiddenKeys(value: unknown): boolean {
  if (assessmentContainsForbiddenKeys(value)) return true;
  const forbidden = new Set<string>(FORBIDDEN_EXAM_PUBLIC_KEYS as readonly string[]);
  const seen = new Set<unknown>();
  const walk = (v: unknown): boolean => {
    if (v === null || typeof v !== "object" || seen.has(v)) return false;
    seen.add(v);
    if (Array.isArray(v)) return v.some(walk);
    for (const k of Object.keys(v as Record<string, unknown>)) {
      if (forbidden.has(k)) return true;
      if (walk((v as Record<string, unknown>)[k])) return true;
    }
    return false;
  };
  return walk(value);
}

/** Construit la session PUBLIQUE (aucune réponse correcte, aucun barème, checksum inclus). */
export function buildExamSession(attempt: ExamAttempt, now: Date, currentSectionId: string | null, navMode: ExamNavigationMode, allowBacktrack: boolean): ExamSession {
  const sections: ExamPublicSection[] = attempt.sections.map((s) => ({
    id: s.id,
    titleKey: s.titleKey,
    weight: s.weight,
    sequential: s.sequential,
    locked: s.locked,
    questions: s.questions.map(toPublicQuestion),
  }));

  const total = sections.reduce((n, s) => n + s.questions.length, 0);
  const answered = Object.values(attempt.responses).filter((r) => !r.rejected && r.value !== undefined && r.value !== null && r.value !== "").length;
  const publicResponses: Record<string, unknown> = {};
  for (const [qid, r] of Object.entries(attempt.responses)) if (!r.rejected) publicResponses[qid] = r.value;

  const base: Omit<ExamSession, "checksum"> = {
    sessionId: attempt.sessionId,
    attemptId: attempt.id,
    examId: attempt.examId,
    programId: attempt.programId,
    learnerRefOpaque: attempt.learnerRef,
    status: attempt.status,
    sections,
    responses: publicResponses,
    navigation: { mode: navMode, currentSectionId, allowBacktrack },
    timer: {
      officialStartedAt: attempt.timer.officialStartedAt,
      remainingOfficialSeconds: attempt.timer.remainingOfficialSeconds,
      expired: attempt.timer.expired,
      inGracePeriod: attempt.timer.inGracePeriod,
    },
    progress: { answered, total },
    frozenVersion: attempt.frozenVersion,
    integrityStatus: attempt.integrity.highestSeverity,
    createdAt: attempt.createdAt,
    updatedAt: now.toISOString(),
  };
  const checksum = examSessionChecksum(base);
  return { ...base, checksum };
}
