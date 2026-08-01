/**
 * Runtime — Secure Credential Orchestration : ViewModel PUBLIC-SAFE (Sprint K4C-B, §18). N'expose ni
 * signatureValue, ni learnerId interne, ni note/décision/raison privée, ni audit complet, ni locator de clé,
 * ni interne de repo. Validé par la garde K3-S.
 */
import { ensureClientSafePayload } from "../ui/security/ensure-client-safe.ts";
import type { SecureIssuanceOutcome } from "./issuance-orchestration-types.ts";

export interface SecureCredentialIssuanceResultViewModel {
  status: string;
  credentialReference: string | null; // opaque
  credentialType: string | null;
  issuerDisplayName: string;
  issuedAt: string | null;
  expiresAt: string | null;
  authenticityStatus: string | null;
  signatureAlgorithm: string | null;
  publicKeyFingerprint: string | null;
  policyVersion: number | null;
  testOnly: boolean;
  nextStepKey: string;
  publicReasonCode: string;
}

export function toSecureCredentialIssuanceViewModel(o: SecureIssuanceOutcome): SecureCredentialIssuanceResultViewModel {
  return ensureClientSafePayload({
    status: o.status,
    credentialReference: o.credentialReference,
    credentialType: o.credentialType,
    issuerDisplayName: "ARCADINS (émission en attente)",
    issuedAt: o.issuedAt,
    expiresAt: o.expiresAt,
    authenticityStatus: o.authenticityStatus,
    signatureAlgorithm: o.signatureAlgorithm,
    publicKeyFingerprint: o.publicKeyFingerprint,
    policyVersion: o.policyVersion,
    testOnly: o.testOnly,
    nextStepKey: o.status === "issued" || o.status === "replayed" ? "credential.next.awaiting_document" : `credential.next.${o.errorCode ?? o.status}`,
    publicReasonCode: o.publicReasonCode,
  }, "secure-issuance");
}
