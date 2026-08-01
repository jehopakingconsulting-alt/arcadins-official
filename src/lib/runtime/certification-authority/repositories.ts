/**
 * Runtime — Certification Authority : contrats de repository + implémentations MÉMOIRE (Sprint K4A, §14).
 *
 * AUCUNE connexion Supabase, AUCUNE migration, AUCUN fetch. Implémentation mémoire avec save/find,
 * compare-and-swap (concurrence), version, historique, idempotence, audit.
 */
import type { AuthorityState, CredentialType, IssuanceDecision } from "./authority-types.ts";

export interface AuthorizationRecord {
  authorizationId: string;
  idempotencyKey: string;
  state: AuthorityState;
  decision: IssuanceDecision | "denied";
  credentialType: CredentialType;
  learnerReference: string;
  programReference: string;
  finalDecisionId: string;
  finalDecisionVersion: number;
  policyVersion: number;
  contractVersion: number;
  createdAt: string;
  version: number; // pour compare-and-swap
}

export interface CredentialRecord { credentialRecordId: string; authorizationId: string; createdAt: string; }
export interface RevocationRecord { revocationRecordId: string; authorizationId: string; reasonCode: string; createdAt: string; }
export interface ReplacementRecord { replacementRecordId: string; replacementChainId: string; authorizationId: string; createdAt: string; }
export interface AppealRecord { appealId: string; authorizationId: string; status: string; createdAt: string; }
export interface AuditRecord { eventId: string; at: string; operation: string; result: string; reasonCode: string; publicReference: string; version: number; actorType: string; }

export interface AuthorizationRepository {
  findByIdempotencyKey(key: string): AuthorizationRecord | null;
  findById(id: string): AuthorizationRecord | null;
  /** Insère si absent (compare-and-swap sur la clé d'idempotence) ; renvoie l'existant sinon. */
  createIfAbsent(record: AuthorizationRecord): { created: boolean; record: AuthorizationRecord };
  history(): AuthorizationRecord[];
}
export interface AuditRepository { append(record: AuditRecord): void; all(): AuditRecord[]; }
export interface IdempotencyRepository { reserve(key: string, authorizationId: string): boolean; get(key: string): string | null; }
export interface CredentialRecordRepository { save(r: CredentialRecord): void; find(id: string): CredentialRecord | null; }
export interface RevocationRepository { save(r: RevocationRecord): void; findByAuthorization(id: string): RevocationRecord | null; }
export interface ReplacementRepository { save(r: ReplacementRecord): void; findByChain(chainId: string): ReplacementRecord[]; }
export interface AppealRepository { save(r: AppealRecord): void; find(id: string): AppealRecord | null; }

export interface AuthorityRepositories {
  authorizations: AuthorizationRepository;
  audit: AuditRepository;
  idempotency: IdempotencyRepository;
  credentials: CredentialRecordRepository;
  revocations: RevocationRepository;
  replacements: ReplacementRepository;
  appeals: AppealRepository;
}

export function createInMemoryRepositories(): AuthorityRepositories {
  const auths = new Map<string, AuthorizationRecord>(); // authorizationId → record
  const byKey = new Map<string, string>(); // idempotencyKey → authorizationId
  const auditLog: AuditRecord[] = [];
  const creds = new Map<string, CredentialRecord>();
  const revs = new Map<string, RevocationRecord>();
  const repls: ReplacementRecord[] = [];
  const appeals = new Map<string, AppealRecord>();

  return {
    authorizations: {
      findByIdempotencyKey: (key) => { const id = byKey.get(key); return id ? auths.get(id) ?? null : null; },
      findById: (id) => auths.get(id) ?? null,
      createIfAbsent(record) {
        // compare-and-swap : la 1re écriture pour une clé gagne ; les suivantes renvoient l'existante.
        const existingId = byKey.get(record.idempotencyKey);
        if (existingId) return { created: false, record: auths.get(existingId)! };
        byKey.set(record.idempotencyKey, record.authorizationId);
        auths.set(record.authorizationId, record);
        return { created: true, record };
      },
      history: () => [...auths.values()],
    },
    audit: { append: (r) => { auditLog.push(r); }, all: () => [...auditLog] },
    idempotency: { reserve: (k, id) => { if (byKey.has(k)) return false; byKey.set(k, id); return true; }, get: (k) => byKey.get(k) ?? null },
    credentials: { save: (r) => { creds.set(r.credentialRecordId, r); }, find: (id) => creds.get(id) ?? null },
    revocations: { save: (r) => { revs.set(r.authorizationId, r); }, findByAuthorization: (id) => revs.get(id) ?? null },
    replacements: { save: (r) => { repls.push(r); }, findByChain: (c) => repls.filter((r) => r.replacementChainId === c) },
    appeals: { save: (r) => { appeals.set(r.appealId, r); }, find: (id) => appeals.get(id) ?? null },
  };
}
