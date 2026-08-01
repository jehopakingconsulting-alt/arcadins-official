/**
 * Runtime — Credential Crypto : erreurs SÛRES (Sprint K4C-A). Jamais de clé/secret/stack — code + raison
 * publique uniquement.
 */
import type { CryptoErrorCode } from "./crypto-types.ts";
export interface SafeCryptoError { errorCode: CryptoErrorCode; publicReasonCode: string; }
export function cryptoError(errorCode: CryptoErrorCode): SafeCryptoError {
  return { errorCode, publicReasonCode: `credential.crypto.error.${errorCode}` };
}
