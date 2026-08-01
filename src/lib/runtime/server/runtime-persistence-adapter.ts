/**
 * Runtime — Server : LearningRuntimePersistenceAdapter (Sprint I).
 *
 * Relie le Learning Runtime (Sprint A) et sa persistance abstraite (Sprint B) aux repositories. Persiste des
 * snapshots de PROGRESSION et des événements — jamais une bonne réponse ni une logique de correction dans un
 * état public. Chargement initial, sauvegarde, reprise, synchronisation, expiration.
 */
import type { ServiceEnv } from "./service-env.ts";
import { requireAuthorized } from "./service-env.ts";
import { AcademicValidationError } from "../integration/errors.ts";
import type { LearningEventRow } from "../repositories/contracts.ts";

/** Clés interdites dans un snapshot public (défense en profondeur). */
const FORBIDDEN_SNAPSHOT_KEYS = ["grading", "correctOptionId", "correctOptionIds", "correctAnswer", "answerKey", "privateExplanation"];

function assertNoAnswers(snapshot: unknown): void {
  const blob = JSON.stringify(snapshot ?? {});
  for (const k of FORBIDDEN_SNAPSHOT_KEYS) if (blob.includes(`"${k}"`)) throw new Error(`SNAPSHOT_LEAK:${k}`);
}

function learner(env: ServiceEnv): string {
  if (!env.ctx.learnerId) throw new AcademicValidationError({ correlationId: env.ctx.correlationId, reasonCodes: ["NO_LEARNER"] });
  return env.ctx.learnerId;
}

export const LearningRuntimePersistenceAdapter = {
  /** Sauvegarde un snapshot de progression (aucune donnée de correction autorisée). */
  async saveSnapshot(env: ServiceEnv, snapshot: Record<string, unknown>): Promise<void> {
    requireAuthorized(env, { requiresFeature: "learningRuntime" });
    assertNoAnswers(snapshot);
    await env.repos.learningEvents.append({
      id: env.idFactory(), ownerLearnerId: learner(env), type: "runtime.snapshot", at: env.now.toISOString(),
      payloadJson: JSON.stringify(snapshot),
    });
  },

  /** Enregistre un événement d'apprentissage (progression, temps, favori, note…). */
  async recordEvent(env: ServiceEnv, type: string, payload: Record<string, unknown>): Promise<void> {
    requireAuthorized(env, { requiresFeature: "learningRuntime" });
    assertNoAnswers(payload);
    await env.repos.learningEvents.append({ id: env.idFactory(), ownerLearnerId: learner(env), type, at: env.now.toISOString(), payloadJson: JSON.stringify(payload) });
  },

  /** Charge le dernier snapshot (reprise). */
  async loadLatestSnapshot(env: ServiceEnv): Promise<Record<string, unknown> | null> {
    requireAuthorized(env, { requiresFeature: "learningRuntime" });
    const events = (await env.repos.learningEvents.listByLearner(learner(env))).filter((e: LearningEventRow) => e.type === "runtime.snapshot");
    if (events.length === 0) return null;
    const latest = events.reduce((a, b) => (b.at > a.at ? b : a));
    return JSON.parse(latest.payloadJson) as Record<string, unknown>;
  },
};
