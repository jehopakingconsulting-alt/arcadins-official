/**
 * Runtime — Credential Crypto : repositories MÉMOIRE (Sprint K4C-A, §17).
 *
 * Aucune DB réelle, aucun Supabase. Ne stocke JAMAIS de clé privée : uniquement métadonnées + clés PUBLIQUES +
 * enveloppes + audit. Snapshot PUBLIC-SAFE (aucune matière privée à sérialiser). CAS/idempotence.
 */
import type { KeyMetadata, KeyRevocationRecord, KeyRotationRecord, PublicVerificationKey } from "./crypto-types.ts";
import type { SignatureEnvelopeV2 } from "./signature-envelope-v2.ts";
import type { CryptoAuditRecord } from "./crypto-audit.ts";

export interface CryptoRepositories {
  keyMetadata: { save(m: KeyMetadata): void; find(ref: string): KeyMetadata | null; all(): KeyMetadata[] };
  publicKeys: { save(k: PublicVerificationKey): void; find(ref: string): PublicVerificationKey | null; byIssuer(issuer: string): PublicVerificationKey[] };
  rotations: { save(r: KeyRotationRecord): void; all(): KeyRotationRecord[] };
  revocations: { save(r: KeyRevocationRecord): void; find(ref: string): KeyRevocationRecord | null };
  envelopes: { save(credentialRecordId: string, e: SignatureEnvelopeV2): void; find(credentialRecordId: string): SignatureEnvelopeV2 | null };
  audit: { append(r: CryptoAuditRecord): void; all(): CryptoAuditRecord[] };
  snapshot(): CryptoStoreSnapshot;
}

export interface CryptoStoreSnapshot {
  version: number;
  keyMetadata: KeyMetadata[];
  publicKeys: PublicVerificationKey[];
  rotations: KeyRotationRecord[];
}

export function createInMemoryCryptoRepositories(): CryptoRepositories {
  const meta = new Map<string, KeyMetadata>();
  const pub = new Map<string, PublicVerificationKey>();
  const rots: KeyRotationRecord[] = [];
  const revs = new Map<string, KeyRevocationRecord>();
  const envs = new Map<string, SignatureEnvelopeV2>();
  const auditLog: CryptoAuditRecord[] = [];
  return {
    keyMetadata: { save: (m2) => { meta.set(m2.keyReference, m2); }, find: (r) => meta.get(r) ?? null, all: () => [...meta.values()] },
    publicKeys: { save: (k) => { pub.set(k.keyReference, k); }, find: (r) => pub.get(r) ?? null, byIssuer: (i) => [...pub.values()].filter((k) => k.issuerCode === i) },
    rotations: { save: (r) => { rots.push(r); }, all: () => [...rots] },
    revocations: { save: (r) => { revs.set(r.keyReference, r); }, find: (ref) => revs.get(ref) ?? null },
    envelopes: { save: (id, e) => { envs.set(id, e); }, find: (id) => envs.get(id) ?? null },
    audit: { append: (r) => { auditLog.push(r); }, all: () => [...auditLog] },
    snapshot: () => ({ version: 1, keyMetadata: [...meta.values()], publicKeys: [...pub.values()], rotations: [...rots] }),
  };
}
