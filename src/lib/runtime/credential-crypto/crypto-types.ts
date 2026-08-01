/**
 * Runtime — Credential Crypto : types (Sprint K4C-A).
 *
 * Sépare l'INTÉGRITÉ (SHA-256, sans secret) de l'AUTHENTICITÉ (signature asymétrique Ed25519). Une clé privée
 * brute n'est JAMAIS un champ d'un objet public : `SigningKeyHandle` est OPAQUE (aucune matière privée).
 */
export type CredentialCryptoAlgorithm = "Ed25519" | "ECDSA_P256_SHA256";

export type KeyStatus =
  | "pending_activation"
  | "active"
  | "retiring"
  | "retired"
  | "revoked"
  | "compromised"
  | "disabled";

/** Référence de clé opaque (jamais la clé elle-même). */
export type CredentialKeyReference = string;

/** Poignée de signature OPAQUE — AUCUNE matière privée. */
export interface SigningKeyHandle {
  keyReference: CredentialKeyReference;
  algorithm: CredentialCryptoAlgorithm;
  createdAt: string;
  issuerCode: string;
}

/** Clé publique de vérification (sûre à exposer). */
export interface PublicVerificationKey {
  keyReference: CredentialKeyReference;
  issuerCode: string;
  algorithm: CredentialCryptoAlgorithm;
  /** Clé publique au format SPKI/DER encodée base64 (aucune matière privée). */
  publicKeySpkiBase64: string;
  publicKeyFingerprint: string;
  status: KeyStatus;
  createdAt: string;
  retiredAt: string | null;
  revokedAt: string | null;
}

export interface KeyMetadata {
  keyReference: CredentialKeyReference;
  issuerCode: string;
  algorithm: CredentialCryptoAlgorithm;
  status: KeyStatus;
  createdAt: string;
  activatedAt: string | null;
  retiredAt: string | null;
  revokedAt: string | null;
  fingerprint: string;
  version: number;
}

export interface KeyRotationRecord {
  rotationId: string;
  issuerCode: string;
  algorithm: CredentialCryptoAlgorithm;
  previousKeyReference: CredentialKeyReference | null;
  newKeyReference: CredentialKeyReference;
  at: string;
}

export interface KeyRevocationRecord {
  revocationId: string;
  keyReference: CredentialKeyReference;
  publicReasonCode: string;
  internalReasonCode: string; // jamais exposé publiquement
  compromised: boolean;
  at: string;
}

export type KeyRevocationReason =
  | "compromised" | "administrative" | "superseded" | "algorithm_deprecated"
  | "key_material_lost" | "provider_disabled" | "other_internal_reason";

/** Résultats de vérification d'authenticité (§11). */
export type AuthenticityStatus =
  | "authentic"
  | "invalid_signature"
  | "payload_tampered"
  | "integrity_mismatch"
  | "unknown_key"
  | "revoked_key"
  | "compromised_key"
  | "retired_key_valid_at_signing_time"
  | "unsupported_algorithm"
  | "unsupported_signature_version"
  | "issuer_mismatch"
  | "policy_mismatch"
  | "not_signed"
  | "test_signature_only"
  | "verification_unavailable";

export type CryptoErrorCode =
  | "feature_disabled"
  | "no_active_key"
  | "unknown_key_reference"
  | "key_not_active"
  | "key_revoked"
  | "key_compromised"
  | "unsupported_algorithm"
  | "empty_digest"
  | "policy_not_found"
  | "issuer_mismatch"
  | "concurrency_conflict"
  | "internal_error";
