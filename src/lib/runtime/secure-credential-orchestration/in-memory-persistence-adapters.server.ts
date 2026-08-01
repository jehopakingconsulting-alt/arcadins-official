/**
 * Runtime — Secure Credential Orchestration : adaptateurs MÉMOIRE (SERVER-ONLY, Sprint K4C-B, §10).
 *
 * Aucune DB réelle, aucun Supabase, aucun réseau. Ne stocke jamais de matière privée. L'UnitOfWork STAGE les
 * écritures et ne les applique qu'au `commit` : un `rollback` (ou un échec de vérification) ne laisse AUCUN
 * record partiel, AUCUNE signature orpheline, AUCUN audit mensonger.
 */
import type { CredentialRecord } from "../credential-issuance/credential-record.ts";
import type { SignatureEnvelopeV2 } from "../credential-crypto/signature-envelope-v2.ts";
import type { SecureIssuanceAuditRecord } from "./issuance-audit.ts";
import type { IssuanceReservation, ReservationStatus } from "./issuance-reservation.ts";
import type {
  CredentialAuditPersistencePort, CredentialIssuanceReservationPort, CredentialIssuanceUnitOfWork,
  CredentialPersistencePort, CredentialPersistenceUnitOfWorkFactory, PersistenceKind, SignatureMetadataPersistencePort,
} from "./persistence-ports.ts";

export function createInMemoryCredentialPersistenceAdapter(kind: PersistenceKind = "in_memory_test"): CredentialPersistencePort {
  const store = new Map<string, CredentialRecord>();
  return {
    kind,
    save(record, opts) {
      // GARDE testOnly : un adaptateur de production refuse un credential de test (jamais publié comme réel).
      if (kind === "production" && opts.testOnly) return { ok: false, reasonCode: "production_persistence_blocked" };
      if (store.has(record.credentialRecordId)) return { ok: true, record: store.get(record.credentialRecordId)! };
      store.set(record.credentialRecordId, record);
      return { ok: true, record };
    },
    findByReference: (ref) => store.get(ref) ?? null,
  };
}

export function createInMemorySignatureMetadataAdapter(kind: PersistenceKind = "in_memory_test"): SignatureMetadataPersistencePort {
  const store = new Map<string, SignatureEnvelopeV2>();
  return { kind, save: (ref, e) => { store.set(ref, e); }, find: (ref) => store.get(ref) ?? null };
}

export function createInMemoryCredentialAuditAdapter(): CredentialAuditPersistencePort {
  const log: SecureIssuanceAuditRecord[] = [];
  return { append: (r) => { log.push(r); }, all: () => [...log] };
}

export function createInMemoryIssuanceReservationAdapter(): CredentialIssuanceReservationPort {
  const store = new Map<string, IssuanceReservation>();
  return {
    reserve(reservation) {
      const existing = store.get(reservation.idempotencyKey);
      if (existing) return { created: false, reservation: existing };
      store.set(reservation.idempotencyKey, reservation);
      return { created: true, reservation };
    },
    get: (k) => store.get(k) ?? null,
    updateStatus(k: string, status: ReservationStatus, credentialReference: string | null) {
      const r = store.get(k);
      if (r) store.set(k, { ...r, status, credentialReference });
    },
  };
}

/** Fabrique d'UnitOfWork MÉMOIRE : stage puis applique au commit ; rollback = rien n'est appliqué. */
export function createInMemoryUnitOfWorkFactory(deps: {
  credentials: CredentialPersistencePort;
  signatures: SignatureMetadataPersistencePort;
  audit: CredentialAuditPersistencePort;
}): CredentialPersistenceUnitOfWorkFactory {
  return {
    create(): CredentialIssuanceUnitOfWork {
      let committed = false;
      let stagedCredential: { record: CredentialRecord; testOnly: boolean } | null = null;
      let stagedSignature: { ref: string; envelope: SignatureEnvelopeV2 } | null = null;
      const stagedAudit: SecureIssuanceAuditRecord[] = [];
      return {
        persistCredential(record, opts) {
          if (deps.credentials.kind === "production" && opts.testOnly) return { ok: false, reasonCode: "production_persistence_blocked" };
          stagedCredential = { record, testOnly: opts.testOnly };
          return { ok: true };
        },
        persistSignatureMetadata(ref, envelope) { stagedSignature = { ref, envelope }; },
        persistAudit(record) { stagedAudit.push(record); },
        commit() {
          if (committed) return;
          if (stagedCredential) deps.credentials.save(stagedCredential.record, { testOnly: stagedCredential.testOnly });
          if (stagedSignature) deps.signatures.save(stagedSignature.ref, stagedSignature.envelope);
          for (const a of stagedAudit) deps.audit.append(a);
          committed = true;
        },
        rollback() { stagedCredential = null; stagedSignature = null; stagedAudit.length = 0; },
        isCommitted: () => committed,
      };
    },
  };
}
