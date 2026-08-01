/**
 * Runtime — Exam : ExamResponseManager (Sprint G).
 *
 * Gère les réponses OFFICIELLES : sauvegarde idempotente, numéro de révision, horodatage autoritaire,
 * checksum, dernière réponse acceptée, rejet motivé (après soumission/expiration, question étrangère,
 * payload mal formé). PUR — n'accède ni à la base ni au réseau.
 */
import type { ExamResponse, ExamResponseRevision } from "./types.ts";

/** Checksum déterministe (djb2) d'une valeur de réponse. */
export function responseChecksum(questionId: string, value: unknown, revision: number): string {
  let stable: string;
  try {
    stable = JSON.stringify({ questionId, value: value ?? null, revision });
  } catch {
    stable = `${questionId}:__unserializable__:${revision}`;
  }
  let h = 5381;
  for (let i = 0; i < stable.length; i++) h = ((h << 5) + h + stable.charCodeAt(i)) >>> 0;
  return h.toString(16);
}

export const ExamResponseManager = {
  /**
   * Applique une réponse (immuable). Crée une nouvelle révision uniquement si la valeur change réellement.
   * Idempotent au niveau valeur : sauver deux fois la même valeur ne crée pas de seconde révision.
   */
  save(
    responses: Record<string, ExamResponse>,
    history: Record<string, ExamResponseRevision[]>,
    questionId: string,
    value: unknown,
    now: Date,
  ): { responses: Record<string, ExamResponse>; history: Record<string, ExamResponseRevision[]>; changed: boolean } {
    const at = now.toISOString();
    const existing = responses[questionId];
    const prevHistory = history[questionId] ?? [];

    if (existing && !existing.rejected && sameValue(existing.value, value)) {
      return { responses, history, changed: false }; // aucune modification réelle
    }

    const revision = (existing?.revision ?? 0) + 1;
    const checksum = responseChecksum(questionId, value, revision);
    const response: ExamResponse = { questionId, value, revision, savedAt: at, checksum, rejected: false, rejectReasonCodes: [] };
    const revisionEntry: ExamResponseRevision = { revision, value, savedAt: at, checksum };

    return {
      responses: { ...responses, [questionId]: response },
      history: { ...history, [questionId]: [...prevHistory, revisionEntry] },
      changed: true,
    };
  },

  /** Enregistre un rejet motivé sans écraser une réponse acceptée existante (trace uniquement). */
  reject(
    responses: Record<string, ExamResponse>,
    questionId: string,
    value: unknown,
    reasonCodes: string[],
    now: Date,
  ): Record<string, ExamResponse> {
    const existing = responses[questionId];
    if (existing && !existing.rejected) return responses; // ne pas dégrader une réponse déjà acceptée
    const revision = (existing?.revision ?? 0) + 1;
    const rejected: ExamResponse = {
      questionId,
      value,
      revision,
      savedAt: now.toISOString(),
      checksum: responseChecksum(questionId, value, revision),
      rejected: true,
      rejectReasonCodes: reasonCodes,
    };
    return { ...responses, [questionId]: rejected };
  },

  acceptedCount(responses: Record<string, ExamResponse>): number {
    return Object.values(responses).filter((r) => !r.rejected && r.value !== undefined && r.value !== null && r.value !== "").length;
  },
};

function sameValue(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  try {
    return JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
  } catch {
    return false;
  }
}
