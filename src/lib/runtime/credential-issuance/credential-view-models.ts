/**
 * Runtime — Credential Issuance : ViewModels PUBLIC-SAFE + projection publique FUTURE (Sprint K4B, §19, §22).
 *
 * N'exposent JAMAIS : internes d'autorisation/handoff, score privé, réponses, notes reviewer, signaux de
 * risque, digest brut (sauf référence), signatureValue, keyReference privée, ID de repo inutile. Validés par
 * la garde K3-S. La `PublicCredentialProjection` est un CONTRAT FUTUR : aucune route/page active, flag OFF.
 */
import { ensureClientSafePayload } from "../ui/security/ensure-client-safe.ts";
import type { CredentialRecord } from "./credential-record.ts";
import type { CredentialIssuanceResult } from "./credential-issuance-service.ts";
import type { CredentialVerification } from "./credential-verification-service.ts";

export interface CredentialIssuanceViewModel {
  status: string;
  publicReference: string | null; // référence OPAQUE interne (aucun identifiant public actif en K4B)
  credentialType: string | null;
  issuerDisplayName: string;
  issuedAt: string | null;
  expiresAt: string | null;
  publicReasonCode: string;
  reused: boolean;
  nextStepKey: string;
  certificateEmitted: false;
}

export interface CredentialStatusViewModel {
  status: string;
  publicReference: string;
  credentialType: string;
  issuedAt: string;
  expiresAt: string | null;
  replacementStatus: "none" | "replaced" | "superseded" | "replacement_pending";
  publicReasonCode: string;
}

export interface CredentialVerificationViewModel {
  verificationStatus: string;
  publicReasonCode: string;
  nextStepKey: string;
}

/** Contrat FUTUR (K4C) — aucune route/page active, flag OFF. */
export interface PublicCredentialProjection {
  publicCredentialReference: string;
  issuerDisplayName: string;
  credentialTitleKey: string;
  programDisplayName: string;
  learnerDisplayName: string; // masqué selon policy
  issuedAt: string;
  validUntil: string | null;
  status: string;
  verificationStatus: string;
  publicClaims: Record<string, string | number | boolean>;
  replacementReference: string | null;
  revocationReasonCode: string | null;
}

const ISSUER_DISPLAY = "ARCADINS (émission en attente)";

export function toCredentialIssuanceViewModel(result: CredentialIssuanceResult): CredentialIssuanceViewModel {
  return ensureClientSafePayload({
    status: result.status,
    publicReference: result.credentialRecordId,
    credentialType: result.credentialType,
    issuerDisplayName: ISSUER_DISPLAY,
    issuedAt: result.issuedAt,
    expiresAt: result.expiresAt,
    publicReasonCode: result.publicReasonCode,
    reused: result.reused,
    nextStepKey: result.errorCode ? `credential.next.${result.errorCode}` : "credential.next.awaiting_document",
    certificateEmitted: false as const,
  }, "credential-issuance");
}

export function toCredentialStatusViewModel(record: CredentialRecord): CredentialStatusViewModel {
  const replacementStatus = record.lifecycleStatus === "superseded" ? "superseded" : record.lifecycleStatus === "replaced" ? "replaced" : record.lifecycleStatus === "replacement_pending" ? "replacement_pending" : "none";
  return ensureClientSafePayload({
    status: record.lifecycleStatus,
    publicReference: record.credentialRecordId,
    credentialType: record.credentialType,
    issuedAt: record.issuedAt,
    expiresAt: record.expiresAt,
    replacementStatus,
    publicReasonCode: `credential.status.${record.lifecycleStatus}`,
  });
}

export function toCredentialVerificationViewModel(v: CredentialVerification): CredentialVerificationViewModel {
  return ensureClientSafePayload({
    verificationStatus: v.status,
    publicReasonCode: `credential.verify.${v.status}`,
    nextStepKey: v.status === "valid" ? "credential.next.none" : "credential.next.review",
  });
}
