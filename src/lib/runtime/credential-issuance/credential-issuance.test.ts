import { test } from "node:test";
import assert from "node:assert/strict";
// K4A (autorité) → produit un AuthorizationResult réel.
import { CertificationAuthorizationService } from "../certification-authority/authorization-service.ts";
import { createInMemoryRepositories as k4aRepos } from "../certification-authority/repositories.ts";
import { defaultPolicyRegistry } from "../certification-authority/policy-registry.ts";
import { createDeterministicIdProvider } from "../certification-authority/id-generator.ts";
import { createTestIntegrityProvider as k4aIntegrity } from "../certification-authority/integrity.ts";
import { computeIdempotencyKey, type CertificationHandoffInput } from "../certification-authority/handoff-contract.ts";
import type { AuthorizationResult } from "../certification-authority/authority-types.ts";
// K4B (noyau d'émission).
import { CredentialIssuanceService, type IssuanceContext, type IssuanceHandoffData } from "./credential-issuance-service.ts";
import { createInMemoryCredentialRepositories } from "./credential-repositories.ts";
import { createSha256IntegrityProvider } from "./integrity-provider.ts";
import { createDeterministicTestSigningProvider, createDisabledSigningProvider } from "./signing-provider.ts";
import { createDeterministicCredentialIdProvider } from "./credential-id-generator.ts";
import { buildCanonicalCredentialPayload, serializeCanonical } from "./canonical-payload.ts";
import { toCredentialIssuanceViewModel } from "./credential-view-models.ts";
import { inspectClientSafe } from "../ui/security/ensure-client-safe.ts";
import { CERTIFICATION_AUTHORITY_FLAGS } from "../certification-authority/flags.ts";
import { evaluateLegacyEmission } from "../certification-authority/legacy-emission-gate.ts";

const NOW = new Date("2026-12-01T10:00:00Z");
const HANDOFF: IssuanceHandoffData = { handoffId: "hoff-1", learnerReference: "opaque-L1", programReference: "marketing-digital", curriculumVersion: "v2", finalDecisionId: "dec-1", finalDecisionVersion: 1, issuerCode: "ARCADINS-PENDING", credentialType: "completion_certificate", locale: "fr" };

function authorization(): AuthorizationResult {
  const h: CertificationHandoffInput = {
    contractVersion: 1, handoffId: "hoff-1", learnerReference: "opaque-L1", programReference: "marketing-digital", curriculumVersion: "v2",
    finalDecisionId: "dec-1", finalDecisionVersion: 1, resultIntegrityReference: "k3c:dec-1:1:1", certificationEligibility: true,
    eligibilityDecidedAt: "2026-12-01T09:00:00Z", issuerCode: "ARCADINS-PENDING", credentialTypeRequested: "completion_certificate",
    locale: "fr", idempotencyKey: computeIdempotencyKey({ learnerReference: "opaque-L1", programReference: "marketing-digital", finalDecisionId: "dec-1", credentialType: "completion_certificate", policyVersion: 1 }), metadata: {},
  };
  return CertificationAuthorizationService.authorize(h, { now: () => NOW, ids: createDeterministicIdProvider(), policyRegistry: defaultPolicyRegistry(), repos: k4aRepos(), integrity: k4aIntegrity(), featureEnabled: true });
}
function ctx(over: Partial<IssuanceContext> = {}): IssuanceContext {
  return { now: () => NOW, ids: createDeterministicCredentialIdProvider(), integrity: createSha256IntegrityProvider(), signing: createDeterministicTestSigningProvider(), repos: createInMemoryCredentialRepositories(), featureEnabled: true, ...over };
}
const FORBIDDEN = /"pdf"|qrImage|"qr"|documentUrl|verificationUrl|"image"|"file"|"email"|reviewerNotes|answerKey|correctOptionId|privateScoreBreakdown|signatureValue|privateKey|PRIVATE_K4B_/i;

// ── A/B/C. émission / autorisation / fail-closed ─────────────────────────────
test("A. autorisation valide → CredentialRecord créé (active), aucun document", () => {
  const r = CredentialIssuanceService.issue({ authorization: authorization(), handoff: HANDOFF, policyVersion: 1 }, ctx());
  assert.equal(r.status, "active");
  assert.ok(r.credentialRecordId);
  assert.equal(r.documentEmitted, false);
  assert.ok(r.integrityReference?.startsWith("k4b-integrity:SHA-256:"));
});
test("B. autorisation invalide (denied) → refus not_authorized", () => {
  const bad: AuthorizationResult = { ...authorization(), decision: "denied", state: "rejected", authorizationReference: null };
  const r = CredentialIssuanceService.issue({ authorization: bad, handoff: HANDOFF, policyVersion: 1 }, ctx());
  assert.equal(r.errorCode, "not_authorized");
});
test("C. flag OFF → fail-closed feature_disabled", () => {
  const r = CredentialIssuanceService.issue({ authorization: authorization(), handoff: HANDOFF, policyVersion: 1 }, ctx({ featureEnabled: false }));
  assert.equal(r.errorCode, "feature_disabled");
  assert.equal(r.documentEmitted, false);
});

// ── D/E. idempotence / concurrence ───────────────────────────────────────────
test("D/Y. émission idempotente : 2ᵉ appel → même record (reused)", () => {
  const c = ctx();
  const a = CredentialIssuanceService.issue({ authorization: authorization(), handoff: HANDOFF, policyVersion: 1 }, c);
  const b = CredentialIssuanceService.issue({ authorization: authorization(), handoff: HANDOFF, policyVersion: 1 }, c);
  assert.equal(a.credentialRecordId, b.credentialRecordId);
  assert.equal(b.reused, true);
  assert.equal(c.repos.all().length, 1);
});
test("E. concurrence → un seul record", () => {
  const c = ctx();
  CredentialIssuanceService.issue({ authorization: authorization(), handoff: HANDOFF, policyVersion: 1 }, c);
  CredentialIssuanceService.issue({ authorization: authorization(), handoff: HANDOFF, policyVersion: 1 }, c);
  assert.equal(c.repos.all().length, 1);
});

// ── F/G/H/I. payload canonique + intégrité ───────────────────────────────────
test("F/G/H. payload canonique déterministe + checksum identique", () => {
  const c = ctx();
  const r = CredentialIssuanceService.issue({ authorization: authorization(), handoff: HANDOFF, policyVersion: 1 }, c);
  const rec = c.repos.findById(r.credentialRecordId!)!;
  const p1 = serializeCanonical(buildCanonicalCredentialPayload(rec, "SHA-256"));
  const p2 = serializeCanonical(buildCanonicalCredentialPayload(rec, "SHA-256"));
  assert.equal(p1, p2);
  assert.equal(c.integrity.compute(buildCanonicalCredentialPayload(rec, "SHA-256")).integrityDigest, createSha256IntegrityProvider().compute(buildCanonicalCredentialPayload(rec, "SHA-256")).integrityDigest);
});

// ── J/K/L. signature TEST ONLY ───────────────────────────────────────────────
test("J. signature de test valide ; K. signature falsifiée détectée ; L. clé absente des surfaces", () => {
  const signing = createDeterministicTestSigningProvider();
  const env = signing.sign("digest-abc", { signedAt: NOW.toISOString() })!;
  assert.equal(env.testOnly, true);
  assert.equal(env.environment, "test");
  assert.equal(signing.verify("digest-abc", env), true);
  assert.equal(signing.verify("digest-xyz", env), false); // falsifié
  const disabled = createDisabledSigningProvider();
  assert.equal(disabled.sign("d", { signedAt: NOW.toISOString() }), null); // par défaut : ne signe pas
});

// ── AA-AG/AD-AF. non-émission documentaire ───────────────────────────────────
test("AA-AG. aucun PDF/QR/image/URL/email/secret dans résultat, VM, audit, repos", () => {
  const c = ctx();
  const r = CredentialIssuanceService.issue({ authorization: authorization(), handoff: HANDOFF, policyVersion: 1 }, c);
  const vm = toCredentialIssuanceViewModel(r);
  const dump = JSON.stringify({ r, vm, audit: c.repos.audit.all(), records: c.repos.all() });
  assert.ok(!FORBIDDEN.test(dump), "aucun artefact documentaire / valeur privée");
  assert.ok(!/PDFDocument|jspdf|qrcode|toDataURL/i.test(dump));
  assert.equal(inspectClientSafe(vm).safe, true);
  assert.equal(vm.certificateEmitted, false);
});

// ── AM/AN/AO. legacy bloqué + flags false ────────────────────────────────────
test("AM/AN. voie legacy toujours bloquée (non émettrice)", () => {
  const d = evaluateLegacyEmission();
  assert.equal(d.allowed, false);
  assert.equal(d.body.emitted, false);
});
test("AO. tous les flags de certification restent false", () => {
  for (const [k, v] of Object.entries(CERTIFICATION_AUTHORITY_FLAGS)) assert.equal(v, false, `${k} doit être false`);
});
