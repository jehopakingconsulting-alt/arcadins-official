import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { createInMemoryEphemeralKeyProvider } from "./in-memory-ephemeral-key-provider.server.ts";
import { createProductionCredentialSigningProvider } from "./production-signing-provider.server.ts";
import { createInMemoryCryptoRepositories } from "./crypto-repositories.ts";
import { defaultCryptographicPolicyRegistry } from "./cryptographic-policy.ts";
import { validateSignatureEnvelope } from "./signature-envelope-v2.ts";
import { toSignatureStatusViewModel, toPublicVerificationKeyViewModel, toAuthenticityViewModel } from "./crypto-view-models.ts";
import { inspectClientSafe } from "../ui/security/ensure-client-safe.ts";
import { CREDENTIAL_CRYPTO_FLAGS } from "./crypto-flags.ts";

const NOW = new Date("2026-12-05T10:00:00Z");
const SENTINELS = ["PRIVATE_K4CA_SIGNING_KEY", "PRIVATE_K4CA_SEED", "PRIVATE_K4CA_PEM", "PRIVATE_K4CA_KMS_SECRET", "PRIVATE_K4CA_RECOVERY_MATERIAL", "PRIVATE_K4CA_INTERNAL_REVOCATION_NOTE", "PRIVATE_K4CA_SIGNING_HANDLE", "PRIVATE_K4CA_PROVIDER_SECRET"];
function idProvider() { let n = 0; return { keyReference: () => `key-${++n}`, rotationId: () => `rot-${++n}`, revocationId: () => `rev-${++n}` }; }

test("aucune matière privée dans snapshot / audit / clé publique exposée", () => {
  const keyProvider = createInMemoryEphemeralKeyProvider({ now: () => NOW, ids: idProvider() }, { issuerCode: "ARCADINS-PENDING", generateInitial: true });
  const repos = createInMemoryCryptoRepositories();
  const signer = createProductionCredentialSigningProvider({ keyProvider, policyRegistry: defaultCryptographicPolicyRegistry(), issuerCode: "ARCADINS-PENDING", credentialType: "completion_certificate", environment: "ephemeral", enabled: true });
  const env = signer.sign("digest-1", { signedAt: NOW.toISOString() })!;
  repos.envelopes.save("cred-1", env);
  const pub = keyProvider.getPublicVerificationKey(env.keyReference)!;
  const dump = JSON.stringify({ snap: repos.snapshot(), audit: repos.audit.all(), env, pub, provider: keyProvider });
  assert.ok(!/-----BEGIN|privateKey|"seed"|"secret"|signingHandle/i.test(dump), "aucune matière privée");
  for (const s of SENTINELS) assert.ok(!dump.includes(s), `sentinelle ${s} exposée`);
});

test("ViewModels public-safe (aucune clé, aucun secret)", () => {
  const keyProvider = createInMemoryEphemeralKeyProvider({ now: () => NOW, ids: idProvider() }, { issuerCode: "ARCADINS-PENDING", generateInitial: true });
  const signer = createProductionCredentialSigningProvider({ keyProvider, policyRegistry: defaultCryptographicPolicyRegistry(), issuerCode: "ARCADINS-PENDING", credentialType: "completion_certificate", environment: "ephemeral", enabled: true });
  const env = signer.sign("digest-1", { signedAt: NOW.toISOString() })!;
  const pub = keyProvider.getPublicVerificationKey(env.keyReference)!;
  const vms = [toSignatureStatusViewModel(env), toPublicVerificationKeyViewModel(pub), toAuthenticityViewModel({ status: "authentic", algorithm: "Ed25519", keyReference: env.keyReference, publicKeyFingerprint: env.publicKeyFingerprint })];
  for (const vm of vms) { assert.equal(inspectClientSafe(vm).safe, true); assert.ok(!/-----BEGIN|privateKey|publicKeySpki|signatureValue/i.test(JSON.stringify(vm))); }
});

test("enveloppe avec clé interdite (matière privée) rejetée", () => {
  assert.equal(validateSignatureEnvelope({ signatureVersion: 2, algorithm: "Ed25519", keyReference: "k", payloadDigest: "d", signatureValue: "s", issuerCode: "i", privateKey: "PRIVATE_K4CA_SIGNING_KEY" }).ok, false);
});

test("tous les flags crypto restent false", () => {
  for (const [k, v] of Object.entries(CREDENTIAL_CRYPTO_FLAGS)) assert.equal(v, false, `${k} doit être false`);
});

// ── AE. client-import scan : aucun composant "use client" n'importe le crypto server-only ──
test("client-import scan : aucun composant client n'importe les modules crypto server-only", () => {
  const SERVER_MODULES = ["credential-crypto/in-memory-ephemeral-key-provider", "credential-crypto/production-signing-provider", "credential-crypto/credential-signature-service", "credential-crypto/key-rotation-service", "credential-crypto/key-revocation-service", "credential-crypto/credential-authenticity-verifier", "credential-crypto/credential-key-provider"];
  const files: string[] = [];
  const walk = (dir: string) => { for (const n of readdirSync(dir)) { const p = join(dir, n); const st = statSync(p); if (st.isDirectory()) walk(p); else if (/\.(ts|tsx)$/.test(n) && !n.endsWith(".test.ts")) files.push(p); } };
  walk("src");
  const offenders: string[] = [];
  for (const f of files) {
    const c = readFileSync(f, "utf8");
    if (!/^\s*["']use client["']/m.test(c)) continue;
    for (const m of SERVER_MODULES) if (c.includes(m)) offenders.push(`${f} imports ${m}`);
  }
  assert.deepEqual(offenders, [], `composants client important le crypto server: ${offenders.join(", ")}`);
});
