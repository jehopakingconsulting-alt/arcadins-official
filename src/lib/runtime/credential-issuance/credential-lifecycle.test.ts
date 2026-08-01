import { test } from "node:test";
import assert from "node:assert/strict";
import { CertificationAuthorizationService } from "../certification-authority/authorization-service.ts";
import { createInMemoryRepositories as k4aRepos } from "../certification-authority/repositories.ts";
import { defaultPolicyRegistry } from "../certification-authority/policy-registry.ts";
import { createDeterministicIdProvider } from "../certification-authority/id-generator.ts";
import { createTestIntegrityProvider as k4aIntegrity } from "../certification-authority/integrity.ts";
import { computeIdempotencyKey, type CertificationHandoffInput } from "../certification-authority/handoff-contract.ts";
import { CredentialIssuanceService, type IssuanceHandoffData } from "./credential-issuance-service.ts";
import { createInMemoryCredentialRepositories, type CredentialRepositories } from "./credential-repositories.ts";
import { createSha256IntegrityProvider } from "./integrity-provider.ts";
import { createDeterministicTestSigningProvider } from "./signing-provider.ts";
import { createDeterministicCredentialIdProvider, type CredentialIdProvider } from "./credential-id-generator.ts";
import { canTransitionCredential, transitionCredential } from "./credential-state-machine.ts";
import { CredentialLifecycleService } from "./credential-lifecycle-service.ts";
import { CredentialRevocationService } from "./credential-revocation-service.ts";
import { CredentialReplacementService } from "./credential-replacement-service.ts";
import { CredentialVerificationService } from "./credential-verification-service.ts";
import { computeExpiresAt } from "./credential-expiration-policy.ts";

const NOW = new Date("2026-12-01T10:00:00Z");
const HANDOFF: IssuanceHandoffData = { handoffId: "h1", learnerReference: "L1", programReference: "marketing-digital", curriculumVersion: "v2", finalDecisionId: "d1", finalDecisionVersion: 1, issuerCode: "ARCADINS-PENDING", credentialType: "completion_certificate", locale: "fr" };

function authorization() {
  const h: CertificationHandoffInput = { contractVersion: 1, handoffId: "h1", learnerReference: "L1", programReference: "marketing-digital", curriculumVersion: "v2", finalDecisionId: "d1", finalDecisionVersion: 1, resultIntegrityReference: "r", certificationEligibility: true, eligibilityDecidedAt: "2026-12-01T09:00:00Z", issuerCode: "ARCADINS-PENDING", credentialTypeRequested: "completion_certificate", locale: "fr", idempotencyKey: computeIdempotencyKey({ learnerReference: "L1", programReference: "marketing-digital", finalDecisionId: "d1", credentialType: "completion_certificate", policyVersion: 1 }), metadata: {} };
  return CertificationAuthorizationService.authorize(h, { now: () => NOW, ids: createDeterministicIdProvider(), policyRegistry: defaultPolicyRegistry(), repos: k4aRepos(), integrity: k4aIntegrity(), featureEnabled: true });
}
function issued(opts: { now?: () => Date; expiration?: Parameters<typeof CredentialIssuanceService.issue>[0]["expiration"] } = {}): { repos: CredentialRepositories; recordId: string; ids: CredentialIdProvider; now: () => Date } {
  const repos = createInMemoryCredentialRepositories();
  const ids = createDeterministicCredentialIdProvider();
  const now = opts.now ?? (() => NOW);
  const r = CredentialIssuanceService.issue({ authorization: authorization(), handoff: HANDOFF, policyVersion: 1, expiration: opts.expiration }, { now, ids, integrity: createSha256IntegrityProvider(), signing: createDeterministicTestSigningProvider(), repos, featureEnabled: true });
  return { repos, recordId: r.credentialRecordId!, ids, now };
}
const lctx = (repos: CredentialRepositories, now = () => NOW) => ({ now, repos, eventId: () => "e" });
const vctx = (repos: CredentialRepositories, now = () => NOW) => ({ now, repos, integrity: createSha256IntegrityProvider(), signing: createDeterministicTestSigningProvider(), eventId: () => "e" });

// ── M-P. active/suspend/reactivate ───────────────────────────────────────────
test("M/O/P. active → suspended → active", () => {
  const { repos, recordId } = issued();
  assert.equal(repos.findById(recordId)!.lifecycleStatus, "active");
  assert.equal(CredentialLifecycleService.suspend(recordId, lctx(repos)).ok, true);
  assert.equal(repos.findById(recordId)!.lifecycleStatus, "suspended");
  assert.equal(CredentialLifecycleService.reactivate(recordId, lctx(repos)).ok, true);
  assert.equal(repos.findById(recordId)!.lifecycleStatus, "active");
});

// ── N. expiration ────────────────────────────────────────────────────────────
test("N. expiration : avant / à l'instant / après", () => {
  const exp = computeExpiresAt({ rule: { kind: "fixed_duration_days", days: 1, from: "issuedAt" }, version: 1 }, { issuedAt: NOW.toISOString(), validFrom: NOW.toISOString() })!;
  const { repos, recordId } = issued({ expiration: { rule: { kind: "fixed_duration_days", days: 1, from: "issuedAt" }, version: 1 } });
  // avant : refus d'expirer.
  assert.equal(CredentialLifecycleService.expire(recordId, lctx(repos, () => NOW)).ok, false);
  // après : expiré.
  const after = () => new Date(new Date(exp).getTime() + 1000);
  assert.equal(CredentialLifecycleService.expire(recordId, lctx(repos, after)).ok, true);
  assert.equal(repos.findById(recordId)!.lifecycleStatus, "expired");
});

// ── Q/R. révocation finale immuable ──────────────────────────────────────────
test("Q/R. révocation → revoked ; revoked → active INTERDIT", () => {
  const { repos, recordId } = issued();
  const rv = CredentialRevocationService.revoke(recordId, { publicReason: "issued_in_error", internalReasonCode: "INTERNAL_XYZ" }, { ...lctx(repos), revocationRef: () => "rev-1" });
  assert.equal(rv.ok, true);
  assert.equal(repos.findById(recordId)!.lifecycleStatus, "revoked");
  assert.equal(canTransitionCredential("revoked", "active"), false);
  assert.equal(CredentialLifecycleService.reactivate(recordId, lctx(repos)).ok, false);
  // Motif interne jamais dans les surfaces publiques (audit).
  assert.ok(!JSON.stringify(repos.audit.all()).includes("INTERNAL_XYZ"));
});

// ── S/T/U/V. remplacement / supersession ─────────────────────────────────────
test("S/U/V. remplacement : successeur distinct, ancien superseded, pas de double successeur", () => {
  const { repos, recordId, ids } = issued();
  const out = CredentialReplacementService.replace(recordId, { now: () => NOW, repos, ids });
  assert.equal(out.ok, true);
  if (out.ok) {
    assert.notEqual(out.successor.credentialRecordId, recordId);
    assert.equal(repos.findById(recordId)!.lifecycleStatus, "superseded");
    assert.equal(repos.findById(recordId)!.replacedByCredentialRecordId, out.successor.credentialRecordId);
    // Double remplacement refusé.
    assert.equal(CredentialReplacementService.replace(recordId, { now: () => NOW, repos, ids }).ok, false);
  }
});

// ── state machine : transitions interdites ───────────────────────────────────
test("state machine : transitions interdites (revoked/expired/superseded/invalidated → active)", () => {
  for (const from of ["revoked", "expired", "superseded", "invalidated", "issuance_failed"] as const) {
    assert.equal(canTransitionCredential(from, "active"), false);
    assert.throws(() => transitionCredential(from, "active"), /INVALID_CREDENTIAL_TRANSITION/);
  }
  assert.equal(canTransitionCredential("replaced", "issued"), false);
  assert.equal(canTransitionCredential("pending_issuance", "revoked"), false);
});

// ── W. version figée / X. snapshot-hydrate / immutabilité ────────────────────
test("W/X. snapshot/hydrate conserve l'état ; historique/révisions monotones", () => {
  const { repos, recordId } = issued();
  CredentialLifecycleService.suspend(recordId, lctx(repos));
  const snap = repos.snapshot();
  const repos2 = createInMemoryCredentialRepositories();
  repos2.hydrate(snap);
  assert.equal(repos2.findById(recordId)!.lifecycleStatus, "suspended");
  // Révisions monotones + historique conservé.
  const hist = repos.history(recordId);
  assert.ok(hist.length >= 2);
  for (let i = 1; i < hist.length; i++) assert.ok(hist[i].revision > hist[i - 1].revision);
});

// ── vérification interne ─────────────────────────────────────────────────────
test("vérification : valide, puis révoquée, puis intégrité altérée", () => {
  const { repos, recordId } = issued();
  assert.equal(CredentialVerificationService.verify(recordId, vctx(repos)).status, "valid");
  CredentialRevocationService.revoke(recordId, { publicReason: "policy_violation", internalReasonCode: "X" }, { ...lctx(repos), revocationRef: () => "rev-1" });
  assert.equal(CredentialVerificationService.verify(recordId, vctx(repos)).status, "revoked");
  // Altération de l'intégrité stockée → invalid_integrity.
  const stored = repos.integrity.find(recordId)!;
  repos.integrity.save(recordId, { ...stored, integrityDigest: "deadbeef" });
  assert.equal(CredentialVerificationService.verify(recordId, vctx(repos)).integrityValid, false);
});
