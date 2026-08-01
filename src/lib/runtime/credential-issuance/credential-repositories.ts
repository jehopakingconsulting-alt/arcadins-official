/**
 * Runtime — Credential Issuance : repositories MÉMOIRE (Sprint K4B, §15).
 *
 * Aucune DB réelle, aucun Supabase, aucun fetch. Compare-and-swap sur la clé d'émission (idempotence),
 * versionning optimiste, historique immuable, snapshot/hydrate. Concurrence simulée en mémoire.
 */
import type { CredentialRecord } from "./credential-record.ts";
import type { SignatureEnvelope } from "./signing-provider.ts";
import type { CredentialIntegrity } from "./integrity-provider.ts";

export interface CredentialAuditRecord { eventId: string; at: string; operation: string; result: string; reasonCode: string; publicReference: string; version: number; }
export interface RevocationRecordK4B { revocationReference: string; credentialRecordId: string; publicReasonCode: string; internalReasonCode: string; finalizedAt: string; version: number; }
export interface ReplacementRecordK4B { replacementChainId: string; predecessorId: string; successorId: string; at: string; }

export interface CredentialRepositories {
  /** Insère si absent (CAS sur la clé d'émission) ; renvoie l'existant sinon. */
  createIfAbsent(issuanceKey: string, record: CredentialRecord): { created: boolean; record: CredentialRecord };
  findById(id: string): CredentialRecord | null;
  findByIssuanceKey(key: string): CredentialRecord | null;
  /** Remplace par une nouvelle révision (CAS sur `revision`). Historique conservé. */
  saveRevision(next: CredentialRecord, expectedRevision: number): { ok: boolean; record: CredentialRecord };
  history(id: string): CredentialRecord[];
  all(): CredentialRecord[];
  // Sous-registres du cycle de vie.
  integrity: { save(id: string, i: CredentialIntegrity): void; find(id: string): CredentialIntegrity | null };
  signatures: { save(id: string, e: SignatureEnvelope): void; find(id: string): SignatureEnvelope | null };
  revocations: { save(r: RevocationRecordK4B): void; find(id: string): RevocationRecordK4B | null };
  replacements: { save(r: ReplacementRecordK4B): void; byChain(chainId: string): ReplacementRecordK4B[] };
  audit: { append(r: CredentialAuditRecord): void; all(): CredentialAuditRecord[] };
  // snapshot / hydrate
  snapshot(): CredentialStoreSnapshot;
  hydrate(snap: CredentialStoreSnapshot): void;
}

export interface CredentialStoreSnapshot {
  version: number;
  records: [string, CredentialRecord][];
  keys: [string, string][];
  historyLog: [string, CredentialRecord[]][];
}

const SNAP_VERSION = 1;

export function createInMemoryCredentialRepositories(): CredentialRepositories {
  const records = new Map<string, CredentialRecord>();
  const byKey = new Map<string, string>(); // issuanceKey → recordId
  const hist = new Map<string, CredentialRecord[]>();
  const integrity = new Map<string, CredentialIntegrity>();
  const signatures = new Map<string, SignatureEnvelope>();
  const revocations = new Map<string, RevocationRecordK4B>();
  const replacements: ReplacementRecordK4B[] = [];
  const auditLog: CredentialAuditRecord[] = [];

  const pushHistory = (r: CredentialRecord) => { const h = hist.get(r.credentialRecordId) ?? []; h.push({ ...r }); hist.set(r.credentialRecordId, h); };

  return {
    createIfAbsent(issuanceKey, record) {
      const existingId = byKey.get(issuanceKey);
      if (existingId) return { created: false, record: records.get(existingId)! };
      byKey.set(issuanceKey, record.credentialRecordId);
      records.set(record.credentialRecordId, record);
      pushHistory(record);
      return { created: true, record };
    },
    findById: (id) => records.get(id) ?? null,
    findByIssuanceKey: (key) => { const id = byKey.get(key); return id ? records.get(id) ?? null : null; },
    saveRevision(next, expectedRevision) {
      const current = records.get(next.credentialRecordId);
      if (!current || current.revision !== expectedRevision) return { ok: false, record: current ?? next };
      records.set(next.credentialRecordId, next);
      pushHistory(next);
      return { ok: true, record: next };
    },
    history: (id) => [...(hist.get(id) ?? [])],
    all: () => [...records.values()],
    integrity: { save: (id, i) => { integrity.set(id, i); }, find: (id) => integrity.get(id) ?? null },
    signatures: { save: (id, e) => { signatures.set(id, e); }, find: (id) => signatures.get(id) ?? null },
    revocations: { save: (r) => { revocations.set(r.credentialRecordId, r); }, find: (id) => revocations.get(id) ?? null },
    replacements: { save: (r) => { replacements.push(r); }, byChain: (c) => replacements.filter((r) => r.replacementChainId === c) },
    audit: { append: (r) => { auditLog.push(r); }, all: () => [...auditLog] },
    snapshot: () => ({ version: SNAP_VERSION, records: [...records.entries()], keys: [...byKey.entries()], historyLog: [...hist.entries()] }),
    hydrate(snap) {
      if (snap.version !== SNAP_VERSION) throw new Error("CREDENTIAL_SNAPSHOT_VERSION_MISMATCH");
      records.clear(); byKey.clear(); hist.clear();
      for (const [k, v] of snap.records) records.set(k, v);
      for (const [k, v] of snap.keys) byKey.set(k, v);
      for (const [k, v] of snap.historyLog) hist.set(k, v);
    },
  };
}
