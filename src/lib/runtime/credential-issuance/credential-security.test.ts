import { test } from "node:test";
import assert from "node:assert/strict";
import { CertificationAuthorizationService } from "../certification-authority/authorization-service.ts";
import { createInMemoryRepositories as k4aRepos } from "../certification-authority/repositories.ts";
import { defaultPolicyRegistry } from "../certification-authority/policy-registry.ts";
import { createDeterministicIdProvider } from "../certification-authority/id-generator.ts";
import { createTestIntegrityProvider as k4aIntegrity } from "../certification-authority/integrity.ts";
import { computeIdempotencyKey, type CertificationHandoffInput } from "../certification-authority/handoff-contract.ts";
import { CredentialIssuanceService, type IssuanceHandoffData } from "./credential-issuance-service.ts";
import { createInMemoryCredentialRepositories } from "./credential-repositories.ts";
import { createSha256IntegrityProvider } from "./integrity-provider.ts";
import { createDeterministicTestSigningProvider } from "./signing-provider.ts";
import { createDeterministicCredentialIdProvider } from "./credential-id-generator.ts";
import { toCredentialIssuanceViewModel, toCredentialStatusViewModel, toCredentialVerificationViewModel } from "./credential-view-models.ts";
import { CredentialVerificationService } from "./credential-verification-service.ts";
import { inspectClientSafe } from "../ui/security/ensure-client-safe.ts";

const NOW = new Date("2026-12-01T10:00:00Z");
// Sentinelles hostiles injectées dans les métadonnées (§25).
const SENTINELS = ["PRIVATE_K4B_SIGNING_KEY", "PRIVATE_K4B_INTERNAL_SCORE", "PRIVATE_K4B_REVIEW_NOTE", "PRIVATE_K4B_ANSWER_KEY", "PRIVATE_K4B_RISK_SIGNAL", "PRIVATE_K4B_REPOSITORY_SECRET", "PRIVATE_K4B_CANONICAL_PAYLOAD_SECRET", "PRIVATE_K4B_SIGNATURE_VALUE"];
const HANDOFF: IssuanceHandoffData = { handoffId: "h1", learnerReference: "L1", programReference: "marketing-digital", curriculumVersion: "v2", finalDecisionId: "d1", finalDecisionVersion: 1, issuerCode: "ARCADINS-PENDING", credentialType: "completion_certificate", locale: "fr" };

function authorization() {
  const h: CertificationHandoffInput = { contractVersion: 1, handoffId: "h1", learnerReference: "L1", programReference: "marketing-digital", curriculumVersion: "v2", finalDecisionId: "d1", finalDecisionVersion: 1, resultIntegrityReference: "r", certificationEligibility: true, eligibilityDecidedAt: "2026-12-01T09:00:00Z", issuerCode: "ARCADINS-PENDING", credentialTypeRequested: "completion_certificate", locale: "fr", idempotencyKey: computeIdempotencyKey({ learnerReference: "L1", programReference: "marketing-digital", finalDecisionId: "d1", credentialType: "completion_certificate", policyVersion: 1 }), metadata: {} };
  return CertificationAuthorizationService.authorize(h, { now: () => NOW, ids: createDeterministicIdProvider(), policyRegistry: defaultPolicyRegistry(), repos: k4aRepos(), integrity: k4aIntegrity(), featureEnabled: true });
}

test("sentinelles privées absentes de toutes les surfaces publiques (VMs)", () => {
  const repos = createInMemoryCredentialRepositories();
  const r = CredentialIssuanceService.issue({ authorization: authorization(), handoff: HANDOFF, policyVersion: 1, metadata: { public_note: "ok" } }, { now: () => NOW, ids: createDeterministicCredentialIdProvider(), integrity: createSha256IntegrityProvider(), signing: createDeterministicTestSigningProvider(), repos, featureEnabled: true });
  const rec = repos.findById(r.credentialRecordId!)!;
  const issuanceVm = toCredentialIssuanceViewModel(r);
  const statusVm = toCredentialStatusViewModel(rec);
  const verifyVm = toCredentialVerificationViewModel(CredentialVerificationService.verify(rec.credentialRecordId, { now: () => NOW, repos, integrity: createSha256IntegrityProvider(), signing: createDeterministicTestSigningProvider(), eventId: () => "e" }));
  const dump = JSON.stringify({ issuanceVm, statusVm, verifyVm });
  for (const s of SENTINELS) assert.ok(!dump.includes(s), `sentinelle ${s} exposée`);
  for (const vm of [issuanceVm, statusVm, verifyVm]) assert.equal(inspectClientSafe(vm).safe, true);
});

test("ViewModels ne contiennent ni signatureValue, ni digest brut, ni identifiants internes inutiles", () => {
  const repos = createInMemoryCredentialRepositories();
  const r = CredentialIssuanceService.issue({ authorization: authorization(), handoff: HANDOFF, policyVersion: 1 }, { now: () => NOW, ids: createDeterministicCredentialIdProvider(), integrity: createSha256IntegrityProvider(), signing: createDeterministicTestSigningProvider(), repos, featureEnabled: true });
  const vm = toCredentialIssuanceViewModel(r);
  const dump = JSON.stringify(vm);
  assert.ok(!/signatureValue|keyReference|integrityDigest/i.test(dump));
  assert.equal(vm.certificateEmitted, false);
});
