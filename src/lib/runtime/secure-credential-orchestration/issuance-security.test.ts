import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { SecureCredentialIssuanceOrchestrator, type OrchestratorDeps } from "./secure-credential-issuance-orchestrator.server.ts";
import { createInMemoryCredentialPersistenceAdapter, createInMemorySignatureMetadataAdapter, createInMemoryCredentialAuditAdapter, createInMemoryIssuanceReservationAdapter, createInMemoryUnitOfWorkFactory } from "./in-memory-persistence-adapters.server.ts";
import { toSecureCredentialIssuanceViewModel } from "./issuance-view-models.ts";
import type { SecureIssuanceRequest } from "./issuance-orchestration-types.ts";
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
const SENTINELS = ["PRIVATE_K4CB_SIGNING_KEY", "PRIVATE_K4CB_SEED", "PRIVATE_K4CB_PEM", "PRIVATE_K4CB_KMS_SECRET", "PRIVATE_K4CB_SIGNING_HANDLE", "PRIVATE_K4CB_REVIEW_NOTE", "PRIVATE_K4CB_ANSWER_KEY", "PRIVATE_K4CB_GRADING_DETAIL", "PRIVATE_K4CB_REPOSITORY_ROW", "PRIVATE_K4CB_SUPABASE_SECRET"];
function req(): SecureIssuanceRequest {
  const h = { contractVersion: 1, handoffId: "h1", learnerReference: "L1", programReference: "marketing-digital", curriculumVersion: "v2", finalDecisionId: "d1", finalDecisionVersion: 1, resultIntegrityReference: "r", certificationEligibility: true, eligibilityDecidedAt: "2026-12-10T09:00:00Z", issuerCode: "ARCADINS-PENDING", credentialTypeRequested: "completion_certificate" as const, locale: "fr", idempotencyKey: "", metadata: {} } as CertificationHandoffInput;
  h.idempotencyKey = computeIdempotencyKey({ learnerReference: "L1", programReference: "marketing-digital", finalDecisionId: "d1", credentialType: "completion_certificate", policyVersion: 1 });
  return { handoff: h, finalDecision: { finalDecisionId: "d1", finalStatus: "final_pass", finalPassed: true }, credentialType: "completion_certificate", commandId: "cmd-1" };
}
function setup(): { deps: OrchestratorDeps; audit: ReturnType<typeof createInMemoryCredentialAuditAdapter>; keyProvider: ReturnType<typeof createInMemoryEphemeralKeyProvider> } {
  let n = 0;
  const keyProvider = createInMemoryEphemeralKeyProvider({ now: () => NOW, ids: { keyReference: () => `key-${++n}`, rotationId: () => `r-${++n}`, revocationId: () => `v-${++n}` } }, { issuerCode: "ARCADINS-PENDING", generateInitial: true });
  const cryptoPolicyRegistry = defaultCryptographicPolicyRegistry();
  const credentials = createInMemoryCredentialPersistenceAdapter(); const signatures = createInMemorySignatureMetadataAdapter(); const audit = createInMemoryCredentialAuditAdapter();
  const deps: OrchestratorDeps = { now: () => NOW, eventId: () => `e-${++n}`, environment: "ephemeral", issuanceVersion: 1, authorizeContext: { now: () => NOW, ids: createDeterministicIdProvider(), policyRegistry: defaultPolicyRegistry(), repos: k4aRepos(), integrity: k4aIntegrity(), featureEnabled: true }, credentialIds: createDeterministicCredentialIdProvider(), credentialRepos: createInMemoryCredentialRepositories(), signing: createProductionCredentialSigningProvider({ keyProvider, policyRegistry: cryptoPolicyRegistry, issuerCode: "ARCADINS-PENDING", credentialType: "completion_certificate", environment: "ephemeral", enabled: true }), keyProvider, cryptoPolicyRegistry, reservation: createInMemoryIssuanceReservationAdapter(), uowFactory: createInMemoryUnitOfWorkFactory({ credentials, signatures, audit }), credentialsPort: credentials, orchestratorEnabled: true, issuanceEnabled: true };
  return { deps, audit, keyProvider };
}

test("aucune matière privée ni sentinelle dans outcome / VM / audit / provider", () => {
  const { deps, audit, keyProvider } = setup();
  const outcome = SecureCredentialIssuanceOrchestrator.issue(req(), deps);
  const vm = toSecureCredentialIssuanceViewModel(outcome);
  const dump = JSON.stringify({ outcome, vm, audit: audit.all(), keyProvider });
  assert.ok(!/-----BEGIN|privateKey|"seed"|signingHandle|signatureValue/i.test(dump), "aucune matière privée");
  for (const s of SENTINELS) assert.ok(!dump.includes(s), `sentinelle ${s} exposée`);
  assert.equal(inspectClientSafe(vm).safe, true);
  assert.equal(vm.testOnly, true);
});

test("client-import scan : aucun composant client n'importe l'orchestration server-only", () => {
  const SERVER = ["secure-credential-orchestration/secure-credential-issuance-orchestrator", "secure-credential-orchestration/in-memory-persistence-adapters"];
  const files: string[] = [];
  const walk = (d: string) => { for (const nm of readdirSync(d)) { const p = join(d, nm); const st = statSync(p); if (st.isDirectory()) walk(p); else if (/\.(ts|tsx)$/.test(nm) && !nm.endsWith(".test.ts")) files.push(p); } };
  walk("src");
  const offenders: string[] = [];
  for (const f of files) { const c = readFileSync(f, "utf8"); if (!/^\s*["']use client["']/m.test(c)) continue; for (const m of SERVER) if (c.includes(m)) offenders.push(`${f} -> ${m}`); }
  assert.deepEqual(offenders, [], `client importe orchestration server: ${offenders.join(", ")}`);
});
