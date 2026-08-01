import { test } from "node:test";
import assert from "node:assert/strict";
import { SecureCredentialIssuanceOrchestrator, type OrchestratorDeps } from "./secure-credential-issuance-orchestrator.server.ts";
import { createInMemoryCredentialPersistenceAdapter, createInMemorySignatureMetadataAdapter, createInMemoryCredentialAuditAdapter, createInMemoryIssuanceReservationAdapter, createInMemoryUnitOfWorkFactory } from "./in-memory-persistence-adapters.server.ts";
import type { SecureIssuanceRequest } from "./issuance-orchestration-types.ts";
import { canOrchestrationTransition } from "./issuance-state-machine.ts";
import { toSecureCredentialIssuanceViewModel } from "./issuance-view-models.ts";
import { SECURE_ISSUANCE_FLAGS } from "./issuance-flags.ts";
// K4A / K4B / K4C-A
import { createInMemoryRepositories as k4aRepos } from "../certification-authority/repositories.ts";
import { defaultPolicyRegistry } from "../certification-authority/policy-registry.ts";
import { createDeterministicIdProvider } from "../certification-authority/id-generator.ts";
import { createTestIntegrityProvider as k4aIntegrity } from "../certification-authority/integrity.ts";
import { computeIdempotencyKey, type CertificationHandoffInput } from "../certification-authority/handoff-contract.ts";
import { createInMemoryCredentialRepositories } from "../credential-issuance/credential-repositories.ts";
import { createDeterministicCredentialIdProvider } from "../credential-issuance/credential-id-generator.ts";
import { createInMemoryEphemeralKeyProvider } from "../credential-crypto/in-memory-ephemeral-key-provider.server.ts";
import { createProductionCredentialSigningProvider } from "../credential-crypto/production-signing-provider.server.ts";
import { defaultCryptographicPolicyRegistry } from "../credential-crypto/cryptographic-policy.ts";
import { inspectClientSafe } from "../ui/security/ensure-client-safe.ts";

const NOW = new Date("2026-12-10T10:00:00Z");
const ISSUER = "ARCADINS-PENDING";
function handoff(over: Partial<CertificationHandoffInput> = {}): CertificationHandoffInput {
  const base = { contractVersion: 1, handoffId: "h1", learnerReference: "L1", programReference: "marketing-digital", curriculumVersion: "v2", finalDecisionId: "d1", finalDecisionVersion: 1, resultIntegrityReference: "r", certificationEligibility: true, eligibilityDecidedAt: "2026-12-10T09:00:00Z", issuerCode: ISSUER, credentialTypeRequested: "completion_certificate" as const, locale: "fr", idempotencyKey: "", metadata: {} };
  const m = { ...base, ...over } as CertificationHandoffInput;
  if (!m.idempotencyKey) m.idempotencyKey = computeIdempotencyKey({ learnerReference: m.learnerReference, programReference: m.programReference, finalDecisionId: m.finalDecisionId, credentialType: m.credentialTypeRequested, policyVersion: 1 });
  return m;
}
function request(over: Partial<SecureIssuanceRequest> = {}): SecureIssuanceRequest {
  return { handoff: handoff(), finalDecision: { finalDecisionId: "d1", finalStatus: "final_pass", finalPassed: true }, credentialType: "completion_certificate", commandId: "cmd-1", ...over };
}
function setup(over: Partial<OrchestratorDeps> = {}) {
  let n = 0;
  const keyProvider = createInMemoryEphemeralKeyProvider({ now: () => NOW, ids: { keyReference: () => `key-${++n}`, rotationId: () => `rot-${++n}`, revocationId: () => `rev-${++n}` } }, { issuerCode: ISSUER, generateInitial: true });
  const cryptoPolicyRegistry = defaultCryptographicPolicyRegistry();
  const credentials = createInMemoryCredentialPersistenceAdapter(over.credentialsPort?.kind ?? "in_memory_test");
  const signatures = createInMemorySignatureMetadataAdapter();
  const audit = createInMemoryCredentialAuditAdapter();
  const deps: OrchestratorDeps = {
    now: () => NOW, eventId: () => `e-${++n}`, environment: "ephemeral", issuanceVersion: 1,
    authorizeContext: { now: () => NOW, ids: createDeterministicIdProvider(), policyRegistry: defaultPolicyRegistry(), repos: k4aRepos(), integrity: k4aIntegrity(), featureEnabled: true },
    credentialIds: createDeterministicCredentialIdProvider(), credentialRepos: createInMemoryCredentialRepositories(),
    signing: createProductionCredentialSigningProvider({ keyProvider, policyRegistry: cryptoPolicyRegistry, issuerCode: ISSUER, credentialType: "completion_certificate", environment: "ephemeral", enabled: true }),
    keyProvider, cryptoPolicyRegistry,
    reservation: createInMemoryIssuanceReservationAdapter(), uowFactory: createInMemoryUnitOfWorkFactory({ credentials, signatures, audit }), credentialsPort: credentials,
    orchestratorEnabled: true, issuanceEnabled: true, ...over,
  };
  return { deps, credentials, signatures, audit, keyProvider };
}

test("E2E : handoff → autorité → émission → signature Ed25519 → vérification authentic → persistance → issued", () => {
  const { deps, credentials, signatures } = setup();
  const r = SecureCredentialIssuanceOrchestrator.issue(request(), deps);
  assert.equal(r.status, "issued");
  assert.equal(r.authenticityStatus, "authentic");
  assert.equal(r.signatureAlgorithm, "Ed25519");
  assert.equal(r.testOnly, true);
  assert.ok(r.credentialReference);
  // Persistance effective (record + signature).
  assert.ok(credentials.findByReference(r.credentialReference!));
  assert.ok(signatures.find(r.credentialReference!));
});

test("replay identique → même credential, aucun doublon", () => {
  const { deps, credentials } = setup();
  const a = SecureCredentialIssuanceOrchestrator.issue(request(), deps);
  const b = SecureCredentialIssuanceOrchestrator.issue(request(), deps);
  assert.equal(a.credentialReference, b.credentialReference);
  assert.equal(b.status, "replayed");
  assert.equal(credentials.findByReference(a.credentialReference!) !== null, true);
});

test("concurrence (deux appels) → un seul credential actif", () => {
  const { deps } = setup();
  const a = SecureCredentialIssuanceOrchestrator.issue(request({ commandId: "c1" }), deps);
  const b = SecureCredentialIssuanceOrchestrator.issue(request({ commandId: "c2" }), deps);
  assert.equal(a.credentialReference, b.credentialReference);
});

test("replay incohérent (même clé, contenu différent) → conflict", () => {
  const { deps } = setup();
  SecureCredentialIssuanceOrchestrator.issue(request(), deps);
  // Même idempotencyKey (mêmes learner/program/decision/policy/issuance) mais curriculumVersion différente.
  const r = SecureCredentialIssuanceOrchestrator.issue(request({ handoff: handoff({ curriculumVersion: "v9" }) }), deps);
  assert.equal(r.status, "conflict");
});

test("handoff invalide → invalid_handoff, rien de persisté", () => {
  const { deps, credentials } = setup();
  const r = SecureCredentialIssuanceOrchestrator.issue(request({ handoff: { ...handoff(), certificationEligibility: false } }), deps);
  assert.equal(r.errorCode, "invalid_handoff");
  assert.equal(credentials.findByReference("x"), null);
});

test("décision non final_pass → refus", () => {
  const { deps } = setup();
  const r = SecureCredentialIssuanceOrchestrator.issue(request({ finalDecision: { finalDecisionId: "d1", finalStatus: "final_fail", finalPassed: false } }), deps);
  assert.equal(r.errorCode, "not_final_pass");
});

test("flag orchestrateur OFF → feature_disabled (fail-closed)", () => {
  const { deps } = setup({ orchestratorEnabled: false });
  const r = SecureCredentialIssuanceOrchestrator.issue(request(), deps);
  assert.equal(r.status, "feature_disabled");
});

test("vérification échouée (signature falsifiée) → rollback, 0 credential/signature persisté, audit d'échec", () => {
  const base = setup();
  const forgedSigning = { ...base.deps.signing, sign: (d: string, c: { signedAt: string }) => { const e = base.deps.signing.sign(d, c); return e ? { ...e, signatureValue: Buffer.from("forged00000000000000").toString("base64") } : null; } };
  const { deps, credentials, signatures, audit } = setup({ signing: forgedSigning });
  const r = SecureCredentialIssuanceOrchestrator.issue(request(), deps);
  assert.equal(r.status, "signature_verification_failed");
  assert.equal(r.errorCode, "verification_failed");
  assert.equal([...Array(1)].length, 1);
  // Aucun record signé committé, aucune signature persistée.
  assert.equal(credentials.findByReference("k4b-cred-1"), null);
  assert.equal(signatures.find("k4b-cred-1"), null);
  assert.ok(audit.all().some((a) => a.operation === "ISSUANCE_ROLLED_BACK"));
  assert.ok(!audit.all().some((a) => a.operation === "CREDENTIAL_PERSISTED"));
});

test("adaptateur PRODUCTION refuse un credential testOnly", () => {
  const prod = createInMemoryCredentialPersistenceAdapter("production");
  const { deps } = setup({ credentialsPort: prod });
  // rebrancher l'UoW sur l'adaptateur production.
  const sig = createInMemorySignatureMetadataAdapter(); const aud = createInMemoryCredentialAuditAdapter();
  deps.uowFactory = createInMemoryUnitOfWorkFactory({ credentials: prod, signatures: sig, audit: aud });
  const r = SecureCredentialIssuanceOrchestrator.issue(request(), deps);
  assert.equal(r.errorCode, "production_persistence_blocked");
  assert.equal(prod.findByReference("k4b-cred-1"), null);
});

test("state machine : transitions clés", () => {
  assert.equal(canOrchestrationTransition("signing", "persistence_pending"), true);
  assert.equal(canOrchestrationTransition("signing", "signature_verification_failed"), true);
  assert.equal(canOrchestrationTransition("issued", "signing"), false);
  assert.equal(canOrchestrationTransition("authorization_rejected", "issued"), false);
});

test("ViewModel public-safe + tous les flags false", () => {
  const { deps } = setup();
  const vm = toSecureCredentialIssuanceViewModel(SecureCredentialIssuanceOrchestrator.issue(request(), deps));
  assert.equal(inspectClientSafe(vm).safe, true);
  assert.ok(!/signatureValue|privateKey|learner_id/i.test(JSON.stringify(vm)));
  for (const [k, v] of Object.entries(SECURE_ISSUANCE_FLAGS)) assert.equal(v, false, `${k} doit être false`);
});
