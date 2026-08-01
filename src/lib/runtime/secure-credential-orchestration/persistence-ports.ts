/**
 * Runtime — Secure Credential Orchestration : PORTS de persistance (Sprint K4C-B, §10). Server-only par nature.
 *
 * K4C-B fournit uniquement des IMPLÉMENTATIONS MÉMOIRE. Les adaptateurs de production sont des CONTRATS
 * (interfaces) sans implémentation réseau. Un adaptateur `kind:"production"` REFUSE tout credential `testOnly`.
 */
import type { CredentialRecord } from "../credential-issuance/credential-record.ts";
import type { SignatureEnvelopeV2 } from "../credential-crypto/signature-envelope-v2.ts";
import type { SecureIssuanceAuditRecord } from "./issuance-audit.ts";
import type { IssuanceReservation, ReservationStatus } from "./issuance-reservation.ts";

export type PersistenceKind = "in_memory_test" | "production";

export interface CredentialPersistencePort {
  readonly kind: PersistenceKind;
  /** Enregistre un credential SIGNÉ (CAS sur la référence). Refuse un `testOnly` sur un adaptateur production. */
  save(record: CredentialRecord, opts: { testOnly: boolean }): { ok: true; record: CredentialRecord } | { ok: false; reasonCode: string };
  findByReference(reference: string): CredentialRecord | null;
}

export interface SignatureMetadataPersistencePort {
  readonly kind: PersistenceKind;
  save(credentialReference: string, envelope: SignatureEnvelopeV2): void;
  find(credentialReference: string): SignatureEnvelopeV2 | null;
}

export interface CredentialAuditPersistencePort {
  append(record: SecureIssuanceAuditRecord): void;
  all(): SecureIssuanceAuditRecord[];
}

export interface CredentialIssuanceReservationPort {
  reserve(reservation: IssuanceReservation): { created: boolean; reservation: IssuanceReservation };
  get(idempotencyKey: string): IssuanceReservation | null;
  updateStatus(idempotencyKey: string, status: ReservationStatus, credentialReference: string | null): void;
}

/** Unité de travail LOGIQUE (commit/rollback en mémoire). */
export interface CredentialIssuanceUnitOfWork {
  persistCredential(record: CredentialRecord, opts: { testOnly: boolean }): { ok: true } | { ok: false; reasonCode: string };
  persistSignatureMetadata(credentialReference: string, envelope: SignatureEnvelopeV2): void;
  persistAudit(record: SecureIssuanceAuditRecord): void;
  commit(): void;
  rollback(): void;
  isCommitted(): boolean;
}

export interface CredentialPersistenceUnitOfWorkFactory {
  create(): CredentialIssuanceUnitOfWork;
}
