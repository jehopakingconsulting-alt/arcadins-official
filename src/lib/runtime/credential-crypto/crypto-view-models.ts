/**
 * Runtime — Credential Crypto : ViewModels PUBLIC-SAFE de vérification technique (Sprint K4C-A, §19).
 *
 * N'exposent JAMAIS : clé privée, SigningKeyHandle, localisateur KMS interne, détails de repo, note de
 * révocation interne, audit brut, nom de secret d'environnement, internes de signature de test inutiles.
 * Validés par la garde K3-S.
 */
import { ensureClientSafePayload } from "../ui/security/ensure-client-safe.ts";
import type { AuthenticityResult } from "./credential-authenticity-verifier.ts";
import type { PublicVerificationKey } from "./crypto-types.ts";
import type { SignatureEnvelopeV2 } from "./signature-envelope-v2.ts";

export interface CredentialAuthenticityViewModel {
  authenticityStatus: string;
  algorithm: string | null;
  keyReference: string | null; // opaque
  publicKeyFingerprint: string | null;
  publicReasonCode: string;
  nextStepKey: string;
}
export interface CredentialSignatureStatusViewModel {
  algorithm: string;
  keyReference: string;
  signedAt: string;
  signatureVersion: number;
  policyVersion: number;
  publicKeyFingerprint: string;
  issuerDisplayName: string;
  testOnly: boolean;
}
export interface PublicVerificationKeyViewModel {
  keyReference: string;
  algorithm: string;
  publicKeyFingerprint: string;
  status: string;
  createdAt: string;
}

const ISSUER_DISPLAY = "ARCADINS (émission en attente)";

export function toAuthenticityViewModel(r: AuthenticityResult): CredentialAuthenticityViewModel {
  return ensureClientSafePayload({
    authenticityStatus: r.status,
    algorithm: r.algorithm,
    keyReference: r.keyReference,
    publicKeyFingerprint: r.publicKeyFingerprint,
    publicReasonCode: `credential.authenticity.${r.status}`,
    nextStepKey: r.status === "authentic" ? "credential.next.none" : "credential.next.review",
  });
}

export function toSignatureStatusViewModel(e: SignatureEnvelopeV2): CredentialSignatureStatusViewModel {
  return ensureClientSafePayload({
    algorithm: String(e.algorithm), keyReference: e.keyReference, signedAt: e.signedAt,
    signatureVersion: e.signatureVersion, policyVersion: e.policyVersion, publicKeyFingerprint: e.publicKeyFingerprint,
    issuerDisplayName: ISSUER_DISPLAY, testOnly: e.testOnly,
  });
}

export function toPublicVerificationKeyViewModel(k: PublicVerificationKey): PublicVerificationKeyViewModel {
  // On n'expose PAS la clé publique brute (SPKI) dans le VM — seulement l'empreinte.
  return ensureClientSafePayload({ keyReference: k.keyReference, algorithm: k.algorithm, publicKeyFingerprint: k.publicKeyFingerprint, status: k.status, createdAt: k.createdAt });
}
