/**
 * Runtime — Credential Issuance : types du noyau d'émission (Sprint K4B).
 *
 * Noyau INTERNE consommant l'`AuthorizationResult` de K4A. N'ÉMET AUCUN document (PDF/QR/image/page/email).
 * PUR / node-testable. Aucune donnée privée dans les types PUBLICS.
 */
import type { CredentialType } from "../certification-authority/authority-types.ts";

export type { CredentialType };

/** Cycle de vie d'un credential (§7). */
export type CredentialLifecycleStatus =
  | "pending_issuance"
  | "issued"
  | "active"
  | "expired"
  | "suspended"
  | "revoked"
  | "replacement_pending"
  | "replaced"
  | "superseded"
  | "invalidated"
  | "issuance_failed";

/** Codes d'erreur PUBLIC-SAFE du noyau d'émission. */
export type CredentialErrorCode =
  | "feature_disabled"
  | "not_authorized"
  | "duplicate_issuance"
  | "policy_not_found"
  | "invalid_state_transition"
  | "not_found"
  | "already_revoked"
  | "already_replaced"
  | "expired"
  | "concurrency_conflict"
  | "unsupported_schema_version"
  | "internal_error";

export type CredentialVerificationStatus =
  | "valid"
  | "expired"
  | "revoked"
  | "replaced"
  | "superseded"
  | "invalid_integrity"
  | "invalid_signature"
  | "unknown"
  | "unsupported_version"
  | "suspended";

/** Identifiants opaques (jamais un identifiant public consultable actif en K4B). */
export interface CredentialIdSet {
  credentialRecordId: string;
  issuanceEventId: string;
  integrityReference: string;
  signatureReference: string | null;
  replacementChainId: string | null;
  revocationReference: string | null;
}
