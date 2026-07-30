/**
 * Runtime — Integration : AcademicIdempotencyService (Sprint I).
 *
 * Garantit : même clé + même payload → même résultat ; même clé + payload différent → conflit ; commande en
 * cours → réponse contrôlée ; aucune double soumission/score/examen/certification. PUR ; s'appuie sur un
 * `CommandIdempotencyRepository` injecté. Le hash de payload est déterministe (djb2 canonique).
 */
import type { CommandIdempotencyRepository } from "../repositories/contracts.ts";
import { IDEMPOTENCY_TTL_SECONDS } from "./config.ts";
import type { IdempotencyOutcome, IdempotencyRecord } from "./types.ts";

/** Hash déterministe d'un payload (clés triées). */
export function payloadHash(payload: unknown): string {
  const canonical = canonicalize(payload);
  let h = 5381;
  for (let i = 0; i < canonical.length; i++) h = ((h << 5) + h + canonical.charCodeAt(i)) >>> 0;
  return h.toString(16);
}
function canonicalize(v: unknown): string {
  if (v === null || typeof v !== "object") return JSON.stringify(v) ?? "null";
  if (Array.isArray(v)) return `[${v.map(canonicalize).join(",")}]`;
  const obj = v as Record<string, unknown>;
  return `{${Object.keys(obj).sort().map((k) => `${JSON.stringify(k)}:${canonicalize(obj[k])}`).join(",")}}`;
}

export interface BeginCommandInput {
  commandId: string;
  idempotencyKey: string;
  commandType: string;
  actorId: string;
  resourceId: string | null;
  payload: unknown;
  now: Date;
}

export const AcademicIdempotencyService = {
  payloadHash,

  /**
   * Enregistre (ou récupère) l'état d'une commande. Retourne :
   *  - fresh : nouvelle commande (à exécuter) ;
   *  - replay : commande déjà réussie (renvoyer le même résultat) ;
   *  - in_progress : commande en cours (réponse contrôlée) ;
   *  - conflict : même clé mais payload différent, ou échec final.
   */
  begin(repo: CommandIdempotencyRepository, input: BeginCommandInput): IdempotencyOutcome {
    const existing = repo.getByKey(input.idempotencyKey);
    const hash = payloadHash(input.payload);

    if (existing) {
      // Expiration.
      if (new Date(input.now.getTime()) > new Date(existing.expiresAt) || existing.status === "expired") {
        const fresh = newRecord(input, hash);
        repo.upsert(fresh);
        return { kind: "fresh", record: fresh };
      }
      if (existing.payloadHash !== hash) {
        return { kind: "conflict", record: existing, reasonCodes: ["IDEMPOTENCY_PAYLOAD_MISMATCH"] };
      }
      if (existing.status === "succeeded") return { kind: "replay", record: existing };
      if (existing.status === "processing" || existing.status === "received") return { kind: "in_progress", record: existing };
      if (existing.status === "failed_final") return { kind: "conflict", record: existing, reasonCodes: ["COMMAND_FAILED_FINAL"] };
      // failed_retryable → nouvelle tentative.
      const retried: IdempotencyRecord = { ...existing, status: "processing", retryCount: existing.retryCount + 1, startedAt: input.now.toISOString(), failedAt: null };
      repo.upsert(retried);
      return { kind: "fresh", record: retried };
    }

    const record = newRecord(input, hash);
    repo.upsert(record);
    return { kind: "fresh", record };
  },

  markProcessing(repo: CommandIdempotencyRepository, record: IdempotencyRecord): IdempotencyRecord {
    const next = { ...record, status: "processing" as const };
    repo.upsert(next);
    return next;
  },

  succeed(repo: CommandIdempotencyRepository, record: IdempotencyRecord, resultReference: string, now: Date): IdempotencyRecord {
    const next: IdempotencyRecord = { ...record, status: "succeeded", resultReference, completedAt: now.toISOString() };
    repo.upsert(next);
    return next;
  },

  fail(repo: CommandIdempotencyRepository, record: IdempotencyRecord, retryable: boolean, now: Date): IdempotencyRecord {
    const next: IdempotencyRecord = { ...record, status: retryable ? "failed_retryable" : "failed_final", failedAt: now.toISOString() };
    repo.upsert(next);
    return next;
  },
};

function newRecord(input: BeginCommandInput, hash: string): IdempotencyRecord {
  return {
    commandId: input.commandId,
    idempotencyKey: input.idempotencyKey,
    commandType: input.commandType,
    actorId: input.actorId,
    resourceId: input.resourceId,
    payloadHash: hash,
    status: "received",
    resultReference: null,
    startedAt: input.now.toISOString(),
    completedAt: null,
    failedAt: null,
    expiresAt: new Date(input.now.getTime() + IDEMPOTENCY_TTL_SECONDS * 1000).toISOString(),
    retryCount: 0,
  };
}
