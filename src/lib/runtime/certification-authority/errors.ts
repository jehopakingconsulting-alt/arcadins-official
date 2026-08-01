/**
 * Runtime — Certification Authority : taxonomie d'erreurs SÛRE (Sprint K4A, §18).
 *
 * Aucune stack technique, note privée, clé ou donnée sensible n'est exposée. Uniquement un code + une raison
 * publique (clé i18n).
 */
import type { AuthorityErrorCode, HandoffValidationStatus } from "./authority-types.ts";

export interface SafeAuthorityError {
  errorCode: AuthorityErrorCode;
  publicReasonCode: string; // clé i18n publique
}

export function safeError(errorCode: AuthorityErrorCode): SafeAuthorityError {
  return { errorCode, publicReasonCode: `certification.error.${errorCode}` };
}

/** Mappe un statut de validation de handoff vers un code d'erreur PUBLIC-SAFE. */
export function validationStatusToError(status: HandoffValidationStatus): AuthorityErrorCode {
  switch (status) {
    case "unsupported_version": return "unsupported_contract_version";
    case "ineligible": return "ineligible";
    case "duplicate": return "duplicate_request";
    case "administratively_blocked": return "administratively_blocked";
    case "malformed":
    case "tampered":
    case "invalid":
    case "expired":
    default:
      return "invalid_handoff";
  }
}
