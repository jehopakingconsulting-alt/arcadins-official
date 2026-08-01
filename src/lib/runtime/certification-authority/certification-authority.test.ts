import { test } from "node:test";
import assert from "node:assert/strict";
import { CertificationAuthorizationService, type AuthorizeContext } from "./authorization-service.ts";
import { createInMemoryRepositories } from "./repositories.ts";
import { defaultPolicyRegistry, CertificationPolicyRegistry } from "./policy-registry.ts";
import { createDeterministicIdProvider } from "./id-generator.ts";
import { createTestIntegrityProvider } from "./integrity.ts";
import { validateCertificationHandoffContract, computeIdempotencyKey, type CertificationHandoffInput } from "./handoff-contract.ts";
import { evaluateLegacyEmission } from "./legacy-emission-gate.ts";
import { AUTHORITY_TRANSITIONS, canTransition, transition } from "./authority-state-machine.ts";
import { toCertificationAuthorizationViewModel } from "./view-models.ts";
import { inspectClientSafe } from "../ui/security/ensure-client-safe.ts";
import { CERTIFICATION_AUTHORITY_FLAGS } from "./flags.ts";

const NOW = new Date("2026-11-15T10:00:00Z");

function validHandoff(over: Partial<CertificationHandoffInput> = {}): CertificationHandoffInput {
  const base = {
    contractVersion: 1, handoffId: "hoff-1", learnerReference: "opaque-L1", programReference: "marketing-digital",
    curriculumVersion: "v2", finalDecisionId: "dec-1", finalDecisionVersion: 1, resultIntegrityReference: "k3c:dec-1:1:1",
    certificationEligibility: true, eligibilityDecidedAt: "2026-11-15T09:00:00Z", issuerCode: "ARCADINS-PENDING",
    credentialTypeRequested: "completion_certificate" as const, locale: "fr", idempotencyKey: "", metadata: {},
  };
  const merged = { ...base, ...over } as CertificationHandoffInput;
  if (!merged.idempotencyKey) merged.idempotencyKey = computeIdempotencyKey({ learnerReference: merged.learnerReference, programReference: merged.programReference, finalDecisionId: merged.finalDecisionId, credentialType: merged.credentialTypeRequested, policyVersion: 1 });
  return merged;
}
function ctx(over: Partial<AuthorizeContext> = {}): AuthorizeContext {
  return { now: () => NOW, ids: createDeterministicIdProvider(), policyRegistry: defaultPolicyRegistry(), repos: createInMemoryRepositories(), integrity: createTestIntegrityProvider(), featureEnabled: true, ...over };
}
const FORBIDDEN = /certificateId|badgeId|"certificate"|"badge"|"pdf"|qrImage|"qr"|signature|signingKey|verificationUrl|documentUrl|"image"|"file"|"email"|reviewerNotes|internalDecisionReason|privateScoreBreakdown|answerKey|PRIVATE_K4A_/i;

// ── A. handoff valide ────────────────────────────────────────────────────────
test("A/J. handoff valide → issuance_authorized, aucune émission", () => {
  const c = ctx();
  const r = CertificationAuthorizationService.authorize(validHandoff(), c);
  assert.equal(r.decision, "issuance_allowed");
  assert.equal(r.state, "issuance_authorized");
  assert.equal(r.emitted, false);
  assert.ok(r.authorizationReference);
});

// ── B/C. provisoire / inéligible rejeté ──────────────────────────────────────
test("B/C. handoff inéligible (certificationEligibility=false) rejeté", () => {
  const r = CertificationAuthorizationService.authorize(validHandoff({ certificationEligibility: false }), ctx());
  assert.equal(r.decision, "denied");
  assert.equal(r.errorCode, "ineligible");
});

// ── D. version inconnue ──────────────────────────────────────────────────────
test("D. version de contrat non supportée rejetée", () => {
  const r = CertificationAuthorizationService.authorize(validHandoff({ contractVersion: 2 }), ctx());
  assert.equal(r.errorCode, "unsupported_contract_version");
});

// ── E. clé interdite ─────────────────────────────────────────────────────────
test("E. clé interdite (answerKey) rejetée (tampered)", () => {
  const bad = { ...validHandoff(), answerKey: ["x"] } as unknown;
  assert.equal(validateCertificationHandoffContract(bad).status, "tampered");
  const r = CertificationAuthorizationService.authorize(bad, ctx());
  assert.equal(r.errorCode, "invalid_handoff");
});

// ── F. propriété inconnue ────────────────────────────────────────────────────
test("F. propriété inconnue rejetée (malformed)", () => {
  const bad = { ...validHandoff(), surprise: 1 } as unknown;
  assert.equal(validateCertificationHandoffContract(bad).status, "malformed");
});

// ── G. issuer non autorisé ───────────────────────────────────────────────────
test("G. issuer non autorisé", () => {
  const r = CertificationAuthorizationService.authorize(validHandoff({ issuerCode: "UNKNOWN-ISSUER" }), ctx());
  assert.equal(r.errorCode, "issuer_not_allowed");
});

// ── H. credentialType non autorisé ───────────────────────────────────────────
test("H. credentialType non autorisé", () => {
  const r = CertificationAuthorizationService.authorize(validHandoff({ credentialTypeRequested: "competency_badge" }), ctx());
  assert.equal(r.errorCode, "credential_type_not_allowed");
});

// ── I. blocage administratif ─────────────────────────────────────────────────
test("I. blocage administratif", () => {
  const r = CertificationAuthorizationService.authorize(validHandoff(), ctx({ administrativeBlock: true }));
  assert.equal(r.errorCode, "administratively_blocked");
  assert.equal(r.state, "administratively_blocked");
});

// ── K/Y. idempotence / replay ────────────────────────────────────────────────
test("K/Y. autorisation idempotente : 2ᵉ appel réutilise la même autorisation", () => {
  const c = ctx();
  const a = CertificationAuthorizationService.authorize(validHandoff(), c);
  const b = CertificationAuthorizationService.authorize(validHandoff(), c);
  assert.equal(a.authorizationReference, b.authorizationReference);
  assert.equal(c.repos.authorizations.history().length, 1, "un seul enregistrement");
});

// ── L. double requête concurrente ────────────────────────────────────────────
test("L. concurrence : deux autorisations → une seule acceptée", () => {
  const c = ctx();
  const a = CertificationAuthorizationService.authorize(validHandoff({ handoffId: "h-a" }), c);
  const b = CertificationAuthorizationService.authorize(validHandoff({ handoffId: "h-b" }), c); // même idempotencyKey
  assert.equal(a.authorizationReference, b.authorizationReference);
  assert.equal(c.repos.authorizations.history().length, 1);
});

// ── M/N. policy modifiée après autorisation → historique immuable ────────────
test("M/N. modification de policy après autorisation ne change pas l'autorisation existante", () => {
  const c = ctx();
  const first = CertificationAuthorizationService.authorize(validHandoff(), c);
  // Nouvelle version de policy enregistrée après coup.
  (c.policyRegistry as CertificationPolicyRegistry).register({ issuerCode: "ARCADINS-PENDING", credentialType: "completion_certificate", programReference: "*", curriculumVersion: "*", showPublicScore: true, validityDays: 30, allowReplacement: false, allowRevocation: false, allowRetake: false, allowAppeal: false, locales: ["fr"], publicMentionsKey: "x", version: 2 });
  const again = CertificationAuthorizationService.authorize(validHandoff(), c);
  assert.equal(again.authorizationReference, first.authorizationReference, "même autorisation (figée)");
  assert.equal(c.repos.authorizations.findById(first.authorizationReference!)!.policyVersion, 1, "policyVersion figée à 1");
});

// ── O/P. voie legacy OFF, non émettrice ──────────────────────────────────────
test("O/P. legacy OFF : aucune émission, statut contrôlé", () => {
  const d = evaluateLegacyEmission({ legacyEnabled: false, authorityEnabled: false });
  assert.equal(d.allowed, false);
  assert.equal(d.body.status, "emission_disabled");
  assert.equal(d.body.emitted, false);
  assert.equal(d.httpStatus, 200); // pas de 500 : pas de régression brutale
  const d2 = evaluateLegacyEmission({ legacyEnabled: false, authorityEnabled: true });
  assert.equal(d2.body.status, "authority_required");
  assert.equal(d2.body.emitted, false);
});

// ── feature_disabled (fail-closed) ───────────────────────────────────────────
test("fail-closed : autorité OFF → feature_disabled, aucune émission", () => {
  const r = CertificationAuthorizationService.authorize(validHandoff(), ctx({ featureEnabled: false }));
  assert.equal(r.errorCode, "feature_disabled");
  assert.equal(r.emitted, false);
});

// ── Q-T/U/V. non-émission + aucune fuite ─────────────────────────────────────
test("Q-T. aucun certificat/badge/PDF/QR/signature dans le résultat, l'audit ou les repos", () => {
  const c = ctx();
  const r = CertificationAuthorizationService.authorize(validHandoff(), c);
  const vm = toCertificationAuthorizationViewModel(r);
  const dump = JSON.stringify({ r, vm, audit: c.repos.audit.all(), auths: c.repos.authorizations.history(), creds: [] });
  assert.ok(!FORBIDDEN.test(dump), "aucun artefact d'émission / valeur privée");
  assert.ok(!/PDFDocument|toDataURL|qrcode/i.test(dump));
});

test("U/V. erreurs et ViewModel public-safe (aucun secret / score privé / note interne)", () => {
  const c = ctx();
  const denied = CertificationAuthorizationService.authorize(validHandoff({ certificationEligibility: false }), c);
  assert.equal(inspectClientSafe(denied).safe, true);
  const vm = toCertificationAuthorizationViewModel(denied);
  assert.equal(inspectClientSafe(vm).safe, true);
  assert.equal(vm.certificateEmitted, false);
});

// ── Sentinelles hostiles ─────────────────────────────────────────────────────
test("sentinelles privées hostiles rejetées et jamais recopiées", () => {
  const hostile = { ...validHandoff(), reviewerNotes: "PRIVATE_K4A_REVIEW_NOTE", signingKey: "PRIVATE_K4A_SIGNING_KEY" } as unknown;
  const c = ctx();
  const r = CertificationAuthorizationService.authorize(hostile, c);
  assert.equal(r.decision, "denied");
  const dump = JSON.stringify({ r, audit: c.repos.audit.all() });
  for (const s of ["PRIVATE_K4A_REVIEW_NOTE", "PRIVATE_K4A_SIGNING_KEY", "PRIVATE_K4A_HANDOFF_SECRET", "PRIVATE_K4A_POLICY_INTERNAL", "PRIVATE_K4A_SCORE_BREAKDOWN", "PRIVATE_K4A_INTEGRITY_SIGNAL"]) {
    assert.ok(!dump.includes(s), `sentinelle ${s} exposée`);
  }
});

// ── Z. audit complet ─────────────────────────────────────────────────────────
test("Z. audit complet (réception + résolution policy + autorisation)", () => {
  const c = ctx();
  CertificationAuthorizationService.authorize(validHandoff(), c);
  const ops = c.repos.audit.all().map((e) => e.operation);
  assert.ok(ops.includes("HANDOFF_RECEIVED"));
  assert.ok(ops.includes("POLICY_VERSION_RESOLVED"));
  assert.ok(ops.includes("AUTHORIZATION_CREATED"));
  // Audit sans donnée privée.
  assert.ok(!FORBIDDEN.test(JSON.stringify(c.repos.audit.all())));
});

// ── State machine : transitions valides / invalides ──────────────────────────
test("state machine : transitions valides autorisées", () => {
  assert.ok(canTransition("received", "validating"));
  assert.ok(canTransition("validating", "eligible"));
  assert.ok(canTransition("eligible", "issuance_pending"));
  assert.ok(canTransition("issuance_authorized", "issuance_in_progress"));
  assert.ok(canTransition("issuance_failed", "issuance_pending"));
});
test("state machine : transitions INTERDITES rejetées", () => {
  for (const [from, to] of [["received", "issued"], ["rejected", "issued"], ["revoked", "issued"], ["issued", "issuance_pending"], ["eligible", "issuance_authorized"], ["replaced", "issued"], ["issuance_failed", "issued"]] as const) {
    assert.equal(canTransition(from, to), false, `${from}->${to} devrait être interdit`);
    assert.throws(() => transition(from, to), /INVALID_TRANSITION/);
  }
  // rejected / replaced / administratively_blocked sont terminaux.
  assert.equal(AUTHORITY_TRANSITIONS.rejected.length, 0);
  assert.equal(AUTHORITY_TRANSITIONS.replaced.length, 0);
});

// ── déterminisme ─────────────────────────────────────────────────────────────
test("déterminisme : mêmes entrées + ids injectés → même autorizationId", () => {
  const a = CertificationAuthorizationService.authorize(validHandoff(), ctx());
  const b = CertificationAuthorizationService.authorize(validHandoff(), ctx());
  assert.equal(a.authorizationReference, b.authorizationReference);
});

// ── flags tous false ─────────────────────────────────────────────────────────
test("tous les flags K4A restent false", () => {
  for (const [k, v] of Object.entries(CERTIFICATION_AUTHORITY_FLAGS)) assert.equal(v, false, `${k} doit être false`);
});
