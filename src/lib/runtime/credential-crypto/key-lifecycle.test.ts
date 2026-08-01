import { test } from "node:test";
import assert from "node:assert/strict";
import { createInMemoryEphemeralKeyProvider } from "./in-memory-ephemeral-key-provider.server.ts";
import { createProductionCredentialSigningProvider } from "./production-signing-provider.server.ts";
import { CredentialSignatureService } from "./credential-signature-service.server.ts";
import { CredentialKeyRotationService } from "./key-rotation-service.server.ts";
import { CredentialKeyRevocationService } from "./key-revocation-service.server.ts";
import { createInMemoryCryptoRepositories } from "./crypto-repositories.ts";
import { defaultCryptographicPolicyRegistry } from "./cryptographic-policy.ts";
import { createSha256IntegrityProvider } from "../credential-issuance/integrity-provider.ts";

const NOW = new Date("2026-12-05T10:00:00Z");
function idProvider() { let n = 0; return { keyReference: () => `key-${++n}`, rotationId: () => `rot-${++n}`, revocationId: () => `rev-${++n}` }; }
function setup() {
  const keyProvider = createInMemoryEphemeralKeyProvider({ now: () => NOW, ids: idProvider() }, { issuerCode: "ARCADINS-PENDING", generateInitial: true });
  const repos = createInMemoryCryptoRepositories();
  const integrity = createSha256IntegrityProvider();
  const signer = createProductionCredentialSigningProvider({ keyProvider, policyRegistry: defaultCryptographicPolicyRegistry(), issuerCode: "ARCADINS-PENDING", credentialType: "completion_certificate", environment: "ephemeral", enabled: true });
  return { keyProvider, repos, integrity, signer };
}
const deps = (repos: ReturnType<typeof createInMemoryCryptoRepositories>) => ({ repos, now: () => NOW, eventId: () => "e" });

test("S/T/U. rotation : ancienne clé retirée MAIS toujours vérifiable ; nouvelle émission = nouvelle clé", () => {
  const { keyProvider, repos, signer } = setup();
  const oldKey = keyProvider.getActiveSigningKey({ issuerCode: "ARCADINS-PENDING" })!.keyReference;
  const oldEnv = signer.sign("digest-old", { signedAt: NOW.toISOString() })!; // signé avec l'ancienne clé
  const rot = CredentialKeyRotationService.rotate(keyProvider, { issuerCode: "ARCADINS-PENDING", algorithm: "Ed25519", commandId: "cmd-1", enabled: true }, deps(repos));
  assert.equal(rot.ok, true);
  const newKey = keyProvider.getActiveSigningKey({ issuerCode: "ARCADINS-PENDING" })!.keyReference;
  assert.notEqual(oldKey, newKey);
  assert.equal(keyProvider.getKeyStatus(oldKey), "retired");
  // T. l'ancienne signature reste vérifiable.
  assert.equal(CredentialSignatureService.verifyDetachedPayload("digest-old", oldEnv, keyProvider), true);
  // U. nouvelle signature utilise la nouvelle clé.
  const newEnv = signer.sign("digest-new", { signedAt: NOW.toISOString() })!;
  assert.equal(newEnv.keyReference, newKey);
});

test("V/W. double rotation même commandId → idempotent (une seule rotation)", () => {
  const { keyProvider, repos } = setup();
  const a = CredentialKeyRotationService.rotate(keyProvider, { issuerCode: "ARCADINS-PENDING", algorithm: "Ed25519", commandId: "cmd-x", enabled: true }, deps(repos));
  const b = CredentialKeyRotationService.rotate(keyProvider, { issuerCode: "ARCADINS-PENDING", algorithm: "Ed25519", commandId: "cmd-x", enabled: true }, deps(repos));
  assert.equal(a.ok && b.ok, true);
  if (a.ok && b.ok) assert.equal(a.record.rotationId, b.record.rotationId);
});

test("rotation OFF (fail-closed)", () => {
  const { keyProvider, repos } = setup();
  const r = CredentialKeyRotationService.rotate(keyProvider, { issuerCode: "ARCADINS-PENDING", algorithm: "Ed25519", commandId: "c", enabled: false }, deps(repos));
  assert.equal(r.ok, false);
});

test("Q/X. révocation idempotente ; clé révoquée non signable", () => {
  const { keyProvider, repos, signer } = setup();
  const key = keyProvider.getActiveSigningKey({ issuerCode: "ARCADINS-PENDING" })!.keyReference;
  const a = CredentialKeyRevocationService.revoke(keyProvider, { keyReference: key, publicReasonCode: "credential.crypto.revoked", internalReasonCode: "INTERNAL", reason: "administrative", commandId: "cmd-r", enabled: true }, deps(repos));
  const b = CredentialKeyRevocationService.revoke(keyProvider, { keyReference: key, publicReasonCode: "credential.crypto.revoked", internalReasonCode: "INTERNAL", reason: "administrative", commandId: "cmd-r", enabled: true }, deps(repos));
  assert.equal(a.ok && b.ok, true);
  if (a.ok && b.ok) assert.equal(a.record.revocationId, b.record.revocationId);
  assert.equal(keyProvider.getKeyStatus(key), "revoked");
  // Clé révoquée : plus de clé active → le provider ne signe plus (fail-closed).
  assert.equal(signer.sign("digest", { signedAt: NOW.toISOString() }), null);
  // Motif interne jamais dans l'audit public.
  assert.ok(!JSON.stringify(repos.audit.all()).includes("INTERNAL"));
});

test("R. compromission enregistrée comme statut distinct", () => {
  const { keyProvider, repos } = setup();
  const key = keyProvider.getActiveSigningKey({ issuerCode: "ARCADINS-PENDING" })!.keyReference;
  CredentialKeyRevocationService.revoke(keyProvider, { keyReference: key, publicReasonCode: "credential.crypto.compromised", internalReasonCode: "X", reason: "compromised", commandId: "c", enabled: true }, deps(repos));
  assert.equal(keyProvider.getKeyStatus(key), "compromised");
});
