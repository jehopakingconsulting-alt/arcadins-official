/**
 * Runtime — Credential Crypto : CredentialAuthenticityVerifier (Sprint K4C-A, §11).
 *
 * Distingue INTÉGRITÉ (le payload n'a pas été altéré) et AUTHENTICITÉ (une autorité autorisée a signé). Utilise
 * le payload canonique reconstruit, le digest d'intégrité, la clé PUBLIQUE liée au keyReference, le statut de la
 * clé et la policy versionnée. Aucune matière privée. Utilise `node:crypto` (server-only en pratique).
 */
import type { CredentialRecord } from "../credential-issuance/credential-record.ts";
import { buildCanonicalCredentialPayload } from "../credential-issuance/canonical-payload.ts";
import type { IntegrityProvider } from "../credential-issuance/integrity-provider.ts";
import type { CredentialKeyProvider } from "./credential-key-provider.ts";
import type { CryptographicPolicyRegistry } from "./cryptographic-policy.ts";
import { CredentialSignatureService } from "./credential-signature-service.server.ts";
import { SIGNATURE_ENVELOPE_VERSION, validateSignatureEnvelope, type SignatureEnvelopeV2 } from "./signature-envelope-v2.ts";
import type { AuthenticityStatus } from "./crypto-types.ts";

export interface AuthenticityInput {
  record: CredentialRecord;
  envelope: SignatureEnvelopeV2 | null;
  keyProvider: CredentialKeyProvider;
  integrity: IntegrityProvider;
  policyRegistry: CryptographicPolicyRegistry;
}

export interface AuthenticityResult {
  status: AuthenticityStatus;
  algorithm: string | null;
  keyReference: string | null;
  publicKeyFingerprint: string | null;
}

export const CredentialAuthenticityVerifier = {
  verify(input: AuthenticityInput): AuthenticityResult {
    const { record, envelope, keyProvider, integrity, policyRegistry } = input;
    const none: AuthenticityResult = { status: "not_signed", algorithm: null, keyReference: null, publicKeyFingerprint: null };
    if (!envelope) return none;
    if (!validateSignatureEnvelope(envelope).ok) return { ...none, status: "unsupported_signature_version" };
    if (envelope.signatureVersion !== SIGNATURE_ENVELOPE_VERSION) return { ...none, status: "unsupported_signature_version" };

    const digest = integrity.compute(buildCanonicalCredentialPayload(record, integrity.algorithm())).integrityDigest;
    const base = { algorithm: envelope.algorithm, keyReference: envelope.keyReference, publicKeyFingerprint: envelope.publicKeyFingerprint };
    if (digest !== envelope.payloadDigest) return { ...base, status: "payload_tampered" };
    if (envelope.issuerCode !== record.issuerCode) return { ...base, status: "issuer_mismatch" };

    const key = keyProvider.getPublicVerificationKey(envelope.keyReference);
    if (!key) return { ...base, status: "unknown_key" };
    const policy = policyRegistry.resolve(record.issuerCode, record.credentialType);
    if (!policy) return { ...base, status: "policy_mismatch" };
    if (!policy.allowedAlgorithms.includes(envelope.algorithm as never)) return { ...base, status: "unsupported_algorithm" };

    // Vérification cryptographique.
    if (!CredentialSignatureService.verifyDetachedPayload(digest, envelope, keyProvider)) return { ...base, status: "invalid_signature" };

    // Signature valide → statut selon l'état de la clé.
    if ((key.status === "revoked") && policy.rejectRevokedKey) return { ...base, status: "revoked_key" };
    if ((key.status === "compromised") && policy.rejectCompromisedKey) return { ...base, status: "compromised_key" };
    if (envelope.testOnly) return { ...base, status: "test_signature_only" };
    if ((key.status === "retiring" || key.status === "retired") && policy.allowRetiredKeyVerification) return { ...base, status: "retired_key_valid_at_signing_time" };
    return { ...base, status: "authentic" };
  },
};
