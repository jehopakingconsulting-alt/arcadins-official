import { test } from "node:test";
import assert from "node:assert/strict";
import { createInMemoryEphemeralKeyProvider } from "./in-memory-ephemeral-key-provider.server.ts";
import { createProductionCredentialSigningProvider } from "./production-signing-provider.server.ts";
import { CredentialKeyRotationService } from "./key-rotation-service.server.ts";
import { CredentialKeyRevocationService } from "./key-revocation-service.server.ts";
import { createInMemoryCryptoRepositories } from "./crypto-repositories.ts";
import { CredentialAuthenticityVerifier } from "./credential-authenticity-verifier.ts";
import { defaultCryptographicPolicyRegistry } from "./cryptographic-policy.ts";
import { createSha256IntegrityProvider } from "../credential-issuance/integrity-provider.ts";
import { buildCanonicalCredentialPayload } from "../credential-issuance/canonical-payload.ts";
import type { CredentialRecord } from "../credential-issuance/credential-record.ts";

const NOW = new Date("2026-12-05T10:00:00Z");
function idProvider() { let n = 0; return { keyReference: () => `key-${++n}`, rotationId: () => `rot-${++n}`, revocationId: () => `rev-${++n}` }; }
function rec(over: Partial<CredentialRecord> = {}): CredentialRecord {
  return { recordVersion: 1, credentialRecordId: "cred-1", authorizationId: "auth-1", handoffId: "h-1", learnerReference: "L1", programReference: "marketing-digital", curriculumVersion: "v2", credentialType: "completion_certificate", issuerCode: "ARCADINS-PENDING", policyVersion: 1, finalDecisionId: "d1", finalDecisionVersion: 1, issuedAt: NOW.toISOString(), validFrom: NOW.toISOString(), expiresAt: null, lifecycleStatus: "active", publicCredentialReference: null, integrityReference: "", signatureReference: null, replacementChainId: null, replacesCredentialRecordId: null, replacedByCredentialRecordId: null, revocationReference: null, metadata: {}, createdAt: NOW.toISOString(), updatedAt: NOW.toISOString(), revision: 1, ...over };
}
function env(record: CredentialRecord, keyProvider = createInMemoryEphemeralKeyProvider({ now: () => NOW, ids: idProvider() }, { issuerCode: "ARCADINS-PENDING", generateInitial: true })) {
  const policyRegistry = defaultCryptographicPolicyRegistry();
  const integrity = createSha256IntegrityProvider();
  const signer = createProductionCredentialSigningProvider({ keyProvider, policyRegistry, issuerCode: "ARCADINS-PENDING", credentialType: "completion_certificate", environment: "ephemeral", enabled: true });
  const digest = integrity.compute(buildCanonicalCredentialPayload(record, "SHA-256")).integrityDigest;
  const envelope = signer.sign(digest, { signedAt: NOW.toISOString() })!;
  return { envelope, keyProvider, policyRegistry, integrity };
}

test("authentic : signature valide + clé active", () => {
  const r = rec();
  const { envelope, keyProvider, policyRegistry, integrity } = env(r);
  assert.equal(CredentialAuthenticityVerifier.verify({ record: r, envelope, keyProvider, integrity, policyRegistry }).status, "authentic");
});

test("not_signed : aucune enveloppe", () => {
  const r = rec();
  const { keyProvider, policyRegistry, integrity } = env(r);
  assert.equal(CredentialAuthenticityVerifier.verify({ record: r, envelope: null, keyProvider, integrity, policyRegistry }).status, "not_signed");
});

test("payload_tampered : le record a changé depuis la signature", () => {
  const r = rec();
  const { envelope, keyProvider, policyRegistry, integrity } = env(r);
  const tampered = rec({ learnerReference: "ATTACKER" });
  assert.equal(CredentialAuthenticityVerifier.verify({ record: tampered, envelope, keyProvider, integrity, policyRegistry }).status, "payload_tampered");
});

test("issuer_mismatch", () => {
  const r = rec();
  const { envelope, keyProvider, policyRegistry, integrity } = env(r);
  const other = rec({ issuerCode: "OTHER" });
  // recomputed digest diffère (issuerCode dans le payload) → payload_tampered en priorité, sauf si même digest.
  const res = CredentialAuthenticityVerifier.verify({ record: other, envelope, keyProvider, integrity, policyRegistry });
  assert.ok(["issuer_mismatch", "payload_tampered"].includes(res.status));
});

test("invalid_signature : signature falsifiée", () => {
  const r = rec();
  const { envelope, keyProvider, policyRegistry, integrity } = env(r);
  const forged = { ...envelope, signatureValue: Buffer.from("forged-000000000000000000").toString("base64") };
  assert.equal(CredentialAuthenticityVerifier.verify({ record: r, envelope: forged, keyProvider, integrity, policyRegistry }).status, "invalid_signature");
});

test("unknown_key : keyReference inconnu", () => {
  const r = rec();
  const { envelope, keyProvider, policyRegistry, integrity } = env(r);
  assert.equal(CredentialAuthenticityVerifier.verify({ record: r, envelope: { ...envelope, keyReference: "nope" }, keyProvider, integrity, policyRegistry }).status, "unknown_key");
});

test("retired_key_valid_at_signing_time : clé retirée mais historiquement valide", () => {
  const keyProvider = createInMemoryEphemeralKeyProvider({ now: () => NOW, ids: idProvider() }, { issuerCode: "ARCADINS-PENDING", generateInitial: true });
  const r = rec();
  const { envelope, policyRegistry, integrity } = env(r, keyProvider);
  const repos = createInMemoryCryptoRepositories();
  CredentialKeyRotationService.rotate(keyProvider, { issuerCode: "ARCADINS-PENDING", algorithm: "Ed25519", commandId: "c", enabled: true }, { repos, now: () => NOW, eventId: () => "e" });
  assert.equal(CredentialAuthenticityVerifier.verify({ record: r, envelope, keyProvider, integrity, policyRegistry }).status, "retired_key_valid_at_signing_time");
});

test("revoked_key : clé révoquée → rejet même si signature valide", () => {
  const keyProvider = createInMemoryEphemeralKeyProvider({ now: () => NOW, ids: idProvider() }, { issuerCode: "ARCADINS-PENDING", generateInitial: true });
  const r = rec();
  const { envelope, policyRegistry, integrity } = env(r, keyProvider);
  const repos = createInMemoryCryptoRepositories();
  CredentialKeyRevocationService.revoke(keyProvider, { keyReference: envelope.keyReference, publicReasonCode: "p", internalReasonCode: "i", reason: "administrative", commandId: "c", enabled: true }, { repos, now: () => NOW, eventId: () => "e" });
  assert.equal(CredentialAuthenticityVerifier.verify({ record: r, envelope, keyProvider, integrity, policyRegistry }).status, "revoked_key");
});
