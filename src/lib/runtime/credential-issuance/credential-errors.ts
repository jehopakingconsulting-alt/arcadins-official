/**
 * Runtime — Credential Issuance : erreurs SÛRES (Sprint K4B). Aucune stack, note privée, clé ou donnée
 * sensible n'est exposée — uniquement un code + une raison publique (clé i18n).
 */
import type { CredentialErrorCode } from "./credential-types.ts";

export interface SafeCredentialError {
  errorCode: CredentialErrorCode;
  publicReasonCode: string;
}

export function credentialError(errorCode: CredentialErrorCode): SafeCredentialError {
  return { errorCode, publicReasonCode: `credential.error.${errorCode}` };
}
