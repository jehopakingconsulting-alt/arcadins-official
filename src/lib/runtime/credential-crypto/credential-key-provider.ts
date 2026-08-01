/**
 * Runtime — Credential Crypto : contrat KeyProvider (Sprint K4C-A, §6).
 *
 * L'interface expose UNIQUEMENT des opérations sûres. La clé privée n'est JAMAIS retournée : la signature est
 * effectuée PAR le provider (`sign`), la matière privée restant dans sa clôture. `SigningKeyHandle` est opaque.
 */
import type {
  CredentialCryptoAlgorithm, CredentialKeyReference, KeyMetadata, KeyRevocationReason,
  KeyRotationRecord, KeyRevocationRecord, KeyStatus, PublicVerificationKey, SigningKeyHandle,
} from "./crypto-types.ts";

export interface KeyRotationRequest { issuerCode: string; algorithm: CredentialCryptoAlgorithm; commandId: string; enabled?: boolean; }
export interface KeyRevocationRequest { keyReference: CredentialKeyReference; publicReasonCode: string; internalReasonCode: string; reason: KeyRevocationReason; commandId: string; enabled?: boolean; }

export interface CredentialKeyProvider {
  getActiveSigningKey(context: { issuerCode: string }): SigningKeyHandle | null;
  getPublicVerificationKey(keyReference: CredentialKeyReference): PublicVerificationKey | null;
  listVerificationKeys(issuerCode: string): PublicVerificationKey[];
  getKeyStatus(keyReference: CredentialKeyReference): KeyStatus | null;
  getAlgorithm(keyReference: CredentialKeyReference): CredentialCryptoAlgorithm | null;
  getKeyMetadata(keyReference: CredentialKeyReference): KeyMetadata | null;
  /** Signe `data` avec la clé référencée (clé privée en clôture ; retourne base64) ; `null` si impossible. */
  sign(keyReference: CredentialKeyReference, data: string): string | null;
  rotateKey(request: KeyRotationRequest): { ok: true; record: KeyRotationRecord } | { ok: false; reasonCode: string };
  revokeKey(request: KeyRevocationRequest): { ok: true; record: KeyRevocationRecord } | { ok: false; reasonCode: string };
}
