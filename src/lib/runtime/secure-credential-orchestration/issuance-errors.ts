/**
 * Runtime — Secure Credential Orchestration : erreurs SÛRES (Sprint K4C-B). Code + raison publique uniquement.
 */
export type SecureIssuanceErrorCode =
  | "feature_disabled" | "invalid_handoff" | "not_final_pass" | "authorization_denied" | "credential_type_unknown"
  | "policy_disabled" | "crypto_policy_missing" | "no_signing_provider" | "no_active_key" | "key_not_active"
  | "signature_failed" | "verification_failed" | "persistence_failed" | "replay_conflict" | "concurrency_conflict"
  | "production_persistence_blocked" | "internal_error";
export interface SafeSecureIssuanceError { errorCode: SecureIssuanceErrorCode; publicReasonCode: string; }
export function secureIssuanceError(errorCode: SecureIssuanceErrorCode): SafeSecureIssuanceError {
  return { errorCode, publicReasonCode: `credential.issuance.error.${errorCode}` };
}
