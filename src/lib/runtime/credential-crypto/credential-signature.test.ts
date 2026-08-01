import { test } from "node:test";
import assert from "node:assert/strict";
import { createInMemoryEphemeralKeyProvider } from "./in-memory-ephemeral-key-provider.server.ts";
import { createProductionCredentialSigningProvider } from "./production-signing-provider.server.ts";
import { CredentialSignatureService } from "./credential-signature-service.server.ts";
import { defaultCryptographicPolicyRegistry } from "./cryptographic-policy.ts";
import { createSha256IntegrityProvider } from "../credential-issuance/integrity-provider.ts";
import { buildCanonicalCredentialPayload } from "../credential-issuance/canonical-payload.ts";
import type { CredentialRecord } from "../credential-issuance/credential-record.ts";

const NOW = new Date("2026-12-05T10:00:00Z");
function idProvider() { let n = 0; return { keyReference: () => `key-${++n}`, rotationId: () => `rot-${++n}`, revocationId: () => `rev-${++n}` }; }
function rec(over: Partial<CredentialRecord> = {}): CredentialRecord {
  return { recordVersion: 1, credentialRecordId: "cred-1", authorizationId: "auth-1", handoffId: "h-1", learnerReference: "L1", programReference: "marketing-digital", curriculumVersion: "v2", credentialType: "completion_certificate", issuerCode: "ARCADINS-PENDING", policyVersion: 1, finalDecisionId: "d1", finalDecisionVersion: 1, issuedAt: NOW.toISOString(), validFrom: NOW.toISOString(), expiresAt: null, lifecycleStatus: "active", publicCredentialReference: null, integrityReference: "", signatureReference: null, replacementChainId: null, replacesCredentialRecordId: null, replacedByCredentialRecordId: null, revocationReference: null, metadata: {}, createdAt: NOW.toISOString(), updatedAt: NOW.toISOString(), revision: 1, ...over };
}
function setup(enabled = true) {
  const keyProvider = createInMemoryEphemeralKeyProvider({ now: () => NOW, ids: idProvider() }, { issuerCode: "ARCADINS-PENDING", generateInitial: true });
  const policyRegistry = defaultCryptographicPolicyRegistry();
  const integrity = createSha256IntegrityProvider();
  const signer = createProductionCredentialSigningProvider({ keyProvider, policyRegistry, issuerCode: "ARCADINS-PENDING", credentialType: "completion_certificate", environment: "ephemeral", enabled });
  return { keyProvider, policyRegistry, integrity, signer };
}
const digestOf = (r: CredentialRecord, integrity: ReturnType<typeof createSha256IntegrityProvider>) => integrity.compute(buildCanonicalCredentialPayload(r, "SHA-256")).integrityDigest;

// A/B/C. génération + signature + vérification valide.
test("A/B/C. Ed25519 : signature valide + vérification valide", () => {
  const { keyProvider, integrity, signer } = setup();
  const r = rec();
  const env = signer.sign(digestOf(r, integrity), { signedAt: NOW.toISOString() })!;
  assert.ok(env);
  assert.equal(env.algorithm, "Ed25519");
  assert.equal(env.testOnly, false);
  assert.equal(env.signatureVersion, 2);
  assert.equal(CredentialSignatureService.verifyDetachedPayload(digestOf(r, integrity), env, keyProvider), true);
});

// C(flag). fail-closed.
test("flag OFF → provider ne signe pas (fail-closed)", () => {
  const { integrity, signer } = setup(false);
  assert.equal(signer.sign(digestOf(rec(), integrity), { signedAt: NOW.toISOString() }), null);
});

// D/E/F. altérations détectées.
test("D. payload altéré → digest différent → vérification échoue", () => {
  const { keyProvider, integrity, signer } = setup();
  const env = signer.sign(digestOf(rec(), integrity), { signedAt: NOW.toISOString() })!;
  const tamperedDigest = digestOf(rec({ learnerReference: "ATTACKER" }), integrity);
  assert.notEqual(tamperedDigest, env.payloadDigest);
  assert.equal(CredentialSignatureService.verifyDetachedPayload(tamperedDigest, env, keyProvider), false);
});
test("F. signature altérée → vérification échoue", () => {
  const { keyProvider, integrity, signer } = setup();
  const d = digestOf(rec(), integrity);
  const env = signer.sign(d, { signedAt: NOW.toISOString() })!;
  const tampered = { ...env, signatureValue: Buffer.from("forged-signature-bytes-000000").toString("base64") };
  assert.equal(CredentialSignatureService.verifyDetachedPayload(d, tampered, keyProvider), false);
});

// G/H. mauvaise clé / keyReference inconnu.
test("G/H. keyReference inconnu → vérification échoue", () => {
  const { keyProvider, integrity, signer } = setup();
  const d = digestOf(rec(), integrity);
  const env = signer.sign(d, { signedAt: NOW.toISOString() })!;
  assert.equal(CredentialSignatureService.verifyDetachedPayload(d, { ...env, keyReference: "does-not-exist" }, keyProvider), false);
});

// K/L. version d'enveloppe incorrecte.
test("K. signatureVersion incorrecte → rejet", () => {
  const { keyProvider, integrity, signer } = setup();
  const d = digestOf(rec(), integrity);
  const env = signer.sign(d, { signedAt: NOW.toISOString() })!;
  assert.equal(CredentialSignatureService.verifyDetachedPayload(d, { ...env, signatureVersion: 99 }, keyProvider), false);
});

// Y. signature Ed25519 déterministe (même clé + même message).
test("Y. signature déterministe (Ed25519)", () => {
  const { integrity, signer } = setup();
  const d = digestOf(rec(), integrity);
  const a = signer.sign(d, { signedAt: NOW.toISOString() })!;
  const b = signer.sign(d, { signedAt: NOW.toISOString() })!;
  assert.equal(a.signatureValue, b.signatureValue);
});

// Z/AB. aucune clé privée dans l'enveloppe.
test("Z/AB. l'enveloppe ne contient aucune matière privée", () => {
  const { integrity, signer } = setup();
  const env = signer.sign(digestOf(rec(), integrity), { signedAt: NOW.toISOString() })!;
  const json = JSON.stringify(env);
  assert.ok(!/privateKey|BEGIN|seed|secret|signingHandle|PRIVATE_K4CA_/i.test(json));
  assert.ok(!("privateKey" in env));
});
