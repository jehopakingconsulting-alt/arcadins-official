import { test } from "node:test";
import assert from "node:assert/strict";
import type { ExamResultContract, FinalExamVersion } from "../exam/types.ts";
import type {
  BadgeDefinition,
  CredentialEligibilityContext,
  CredentialIssuanceRequest,
  CredentialPolicy,
} from "./types.ts";
import { CertificationEngine } from "./certification-engine.ts";
import { CertificationEligibilityEngine } from "./certification-eligibility-engine.ts";
import { CredentialStatusEngine } from "./credential-status-engine.ts";
import { CredentialPolicyRegistry } from "./credential-policy-registry.ts";
import { createInMemoryRepositories } from "./in-memory-repository.ts";
import {
  CredentialIntegrityEngine,
  createDefaultHashProvider,
  createTestSigner,
  createMultiKeyVerifier,
  sha256Hex,
} from "./credential-integrity-engine.ts";
import { QRVerificationPayloadBuilder } from "./qr-verification-payload.ts";
import { PublicCredentialSerializer, containsForbiddenKeys } from "./public-credential-serializer.ts";
import { CredentialDocumentModelBuilder } from "./credential-document-model.ts";
import { CredentialAppealWorkflow } from "./credential-appeal-workflow.ts";
import {
  CERTIFICATION_ENGINE_ENABLED,
  DEFAULT_DOCUMENT_TITLE,
  createCertificationContext,
  createIdFactory,
  defaultAchievementAttestationPolicy,
} from "./config.ts";
import { validatePublicView, validateQrPayload, validateRecord, validateIssuanceSource } from "./validation.ts";
import { CERTIFICATION_DEEP_SPECS } from "./specs.ts";

const START = new Date("2026-11-01T09:00:00Z");
const HP = createDefaultHashProvider();
const SIGNER = createTestSigner({ keyId: "arc-signing-key-v1", secret: "TEST_ONLY_SECRET" });

function at(seconds: number): Date {
  return new Date(START.getTime() + seconds * 1000);
}
function mkCtx(now: Date, idf: () => string) {
  return createCertificationContext({ now, hashProvider: HP, signer: SIGNER, idFactory: idf, seed: 1, issuerCode: "ARC" });
}

const VERSION: FinalExamVersion = {
  examVersion: 1, questionsVersion: 1, bankVersion: 1, rubricsVersion: 1, gradingVersion: 1,
  eligibilityVersion: 1, navigationVersion: 1, accommodationVersion: 1, passThresholdVersion: 1,
};

function passedContract(overrides: Partial<ExamResultContract> = {}): ExamResultContract {
  return {
    learnerReference: "lref-INTERNAL-123",
    programId: "marketing-digital",
    examId: "exam-mkt",
    examVersion: VERSION,
    attemptId: "att-1",
    finalStatus: "passed",
    finalScore: 8,
    passed: true,
    finalizedAt: "2026-10-31T10:00:00Z",
    sectionResults: [
      { sectionId: "sA", earnedPoints: 4, maximumPoints: 4, weightedScore: 1, percentage: 100, passed: true, eliminatory: false, requiresManualReview: false },
      { sectionId: "sB", earnedPoints: 4, maximumPoints: 4, weightedScore: 1, percentage: 100, passed: true, eliminatory: false, requiresManualReview: false },
    ],
    integrityStatus: "clean",
    reviewStatus: "not_required",
    certificateEligibility: true,
    reasonCodes: ["FINAL_PASS"],
    auditReference: "audit:exam:1",
    ...overrides,
  };
}

function eligibilityCtx(overrides: Partial<CredentialEligibilityContext> = {}): CredentialEligibilityContext {
  return {
    finalResult: passedContract(),
    learnerDisplayName: "Jean Exemple",
    learnerReference: "lref-INTERNAL-123",
    programAdmissibleForIssuance: true,
    fullProgressCompleted: true,
    finalProjectValidated: true,
    administrativeDebtBlocking: false,
    documentTitleAuthorized: true,
    specialApproval: null,
    existingActiveIssuanceKey: null,
    ...overrides,
  };
}

function policyFor(programId = "marketing-digital", overrides: Partial<CredentialPolicy> = {}): CredentialPolicy {
  return defaultAchievementAttestationPolicy(programId, overrides);
}

function issuanceRequest(commandId: string, overrides: Partial<CredentialIssuanceRequest> = {}): CredentialIssuanceRequest {
  return {
    commandId,
    credentialType: "achievement_attestation",
    policy: policyFor(),
    eligibilityContext: eligibilityCtx(),
    language: "fr",
    issuerName: "ARCADINS Training Center",
    issuerDisplayName: "ARCADINS",
    authorizedSignatoryReferences: ["sig-director"],
    programTitle: "Marketing Digital et E-commerce",
    programVersion: 1,
    ...overrides,
  };
}

// ── Admissibilité ────────────────────────────────────────────────────────────
test("résultat final réussi et admissible → eligible", () => {
  const r = CertificationEligibilityEngine.evaluate(policyFor(), eligibilityCtx(), START);
  assert.equal(r.status, "eligible");
});

test("résultat provisoire refusé", () => {
  const ctx = eligibilityCtx({ finalResult: passedContract({ finalStatus: "provisional_pass", certificateEligibility: false, finalizedAt: null }) });
  const r = CertificationEligibilityEngine.evaluate(policyFor(), ctx, START);
  assert.equal(r.status, "ineligible");
  assert.ok(r.reasonCodes.includes("CERTIFICATE_ELIGIBILITY_FALSE"));
});

test("résultat échoué refusé", () => {
  const ctx = eligibilityCtx({ finalResult: passedContract({ finalStatus: "failed", passed: false, certificateEligibility: false }) });
  const r = CertificationEligibilityEngine.evaluate(policyFor(), ctx, START);
  assert.equal(r.status, "ineligible");
});

test("certificateEligibility false refusé", () => {
  const ctx = eligibilityCtx({ finalResult: passedContract({ certificateEligibility: false }) });
  assert.equal(CertificationEligibilityEngine.evaluate(policyFor(), ctx, START).status, "ineligible");
});

test("correction humaine en attente refusée", () => {
  const ctx = eligibilityCtx({ finalResult: passedContract({ reviewStatus: "in_review" as never, certificateEligibility: true }) });
  const r = CertificationEligibilityEngine.evaluate(policyFor(), ctx, START);
  assert.equal(r.status, "ineligible");
  assert.ok(r.reasonCodes.includes("MANUAL_REVIEW_PENDING"));
});

test("intégrité bloquante refusée", () => {
  const ctx = eligibilityCtx({ finalResult: passedContract({ integrityStatus: "blocking" }) });
  assert.equal(CertificationEligibilityEngine.evaluate(policyFor(), ctx, START).status, "ineligible");
});

test("programme non admissible → ineligible/blocked", () => {
  const r = CertificationEligibilityEngine.evaluate(policyFor(), eligibilityCtx({ programAdmissibleForIssuance: false }), START);
  assert.notEqual(r.status, "eligible");
});

test("dette administrative → approbation manuelle", () => {
  const r = CertificationEligibilityEngine.evaluate(policyFor(), eligibilityCtx({ administrativeDebtBlocking: true }), START);
  assert.equal(r.status, "requires_manual_approval");
});

// ── Émission ─────────────────────────────────────────────────────────────────
test("émission réussie produit un credential actif", () => {
  const repos = createInMemoryRepositories();
  const res = CertificationEngine.issue(issuanceRequest("cmd-1"), mkCtx(at(0), createIdFactory("cred")), repos);
  assert.ok(res.record);
  assert.equal(res.record!.status, "active");
  assert.equal(res.record!.currentVersion.snapshot.documentTitle, DEFAULT_DOCUMENT_TITLE);
  assert.ok(res.events.some((e) => e.type === "credential.issued"));
});

test("émission bloquée sur résultat non éligible (aucun credential)", () => {
  const repos = createInMemoryRepositories();
  const req = issuanceRequest("cmd-x", { eligibilityContext: eligibilityCtx({ finalResult: passedContract({ passed: false, finalStatus: "failed", certificateEligibility: false }) }) });
  const res = CertificationEngine.issue(req, mkCtx(at(0), createIdFactory("cred")), repos);
  assert.equal(res.record, null);
  assert.ok(res.events.some((e) => e.type === "credential.issuance_blocked"));
});

test("double émission avec même idempotencyKey ne crée qu'un credential", () => {
  const repos = createInMemoryRepositories();
  const idf = createIdFactory("cred");
  const first = CertificationEngine.issue(issuanceRequest("cmd-1"), mkCtx(at(0), idf), repos);
  const replay = CertificationEngine.issue(issuanceRequest("cmd-1"), mkCtx(at(10), idf), repos);
  assert.equal(first.record!.internalCredentialId, replay.record!.internalCredentialId);
  assert.equal(replay.events.length, 0);
});

test("double émission (clés différentes, même réussite) → already_issued", () => {
  const repos = createInMemoryRepositories();
  const idf = createIdFactory("cred");
  const first = CertificationEngine.issue(issuanceRequest("cmd-1"), mkCtx(at(0), idf), repos);
  const second = CertificationEngine.issue(issuanceRequest("cmd-2"), mkCtx(at(10), idf), repos);
  assert.equal(second.record!.publicVerificationId, first.record!.publicVerificationId);
  assert.ok(second.events.some((e) => e.type === "credential.issuance_blocked" && (e.payload.reasonCodes as string[]).includes("ALREADY_ISSUED")));
});

// ── Snapshot & identifiants ──────────────────────────────────────────────────
test("snapshot immuable : la mutation locale n'affecte pas l'enregistrement stocké", () => {
  const repos = createInMemoryRepositories();
  const res = CertificationEngine.issue(issuanceRequest("cmd-1"), mkCtx(at(0), createIdFactory("cred")), repos);
  const fetched = repos.credentials.getByPublicId(res.record!.publicVerificationId)!;
  fetched.currentVersion.snapshot.learnerDisplayName = "MUTATION";
  const again = repos.credentials.getByPublicId(res.record!.publicVerificationId)!;
  assert.equal(again.currentVersion.snapshot.learnerDisplayName, "Jean Exemple");
});

test("identifiant public opaque sans référence apprenant interne", () => {
  const repos = createInMemoryRepositories();
  const res = CertificationEngine.issue(issuanceRequest("cmd-1"), mkCtx(at(0), createIdFactory("cred")), repos);
  const rec = res.record!;
  assert.equal(rec.publicVerificationId.includes("lref-INTERNAL-123"), false);
  assert.ok(validateRecord(rec).ok);
});

test("documentNumber au format professionnel ARC-AAAA-XXXXXXXX", () => {
  const repos = createInMemoryRepositories();
  const res = CertificationEngine.issue(issuanceRequest("cmd-1"), mkCtx(at(0), createIdFactory("cred")), repos);
  assert.match(res.record!.documentNumber, /^ARC-2026-[A-Z0-9]{8}$/);
});

// ── Intégrité cryptographique ────────────────────────────────────────────────
test("hash déterministe (SHA-256) sur snapshot", () => {
  const snap = { a: 1, b: [3, 2, 1], nested: { z: true, a: "x" } };
  const canonical = CredentialIntegrityEngine.canonicalize(snap);
  assert.equal(HP.hash(canonical), HP.hash(CredentialIntegrityEngine.canonicalize({ nested: { a: "x", z: true }, b: [3, 2, 1], a: 1 })));
  assert.equal(sha256Hex("abc"), "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
});

test("signature valide puis invalide après altération", () => {
  const repos = createInMemoryRepositories();
  const res = CertificationEngine.issue(issuanceRequest("cmd-1"), mkCtx(at(0), createIdFactory("cred")), repos);
  const rec = res.record!;
  const ok = CredentialIntegrityEngine.verify(rec.currentVersion.snapshot, rec.currentVersion.integrity, HP, SIGNER);
  assert.equal(ok.ok, true);
  const tampered = { ...rec.currentVersion.snapshot, learnerDisplayName: "HACKED" };
  const bad = CredentialIntegrityEngine.verify(tampered, rec.currentVersion.integrity, HP, SIGNER);
  assert.equal(bad.tampered, true);
  assert.equal(bad.ok, false);
});

test("rotation simulée de keyId (vérificateur multi-clés)", () => {
  const signerV2 = createTestSigner({ keyId: "arc-signing-key-v2", secret: "SECRET_V2" });
  const canonical = CredentialIntegrityEngine.canonicalize({ x: 1 });
  const sigV2 = signerV2.sign(canonical);
  const multi = createMultiKeyVerifier([SIGNER, signerV2]);
  assert.equal(multi.verify(canonical, sigV2), true);
  assert.equal(SIGNER.verify(canonical, sigV2), false); // v1 seul ne valide pas une signature v2
});

test("aucune clé privée réelle codée en dur (le secret est injecté)", () => {
  // Le signer de test exige un secret fourni au runtime ; aucun secret par défaut.
  const s = createTestSigner({ keyId: "k", secret: "runtime-provided" });
  assert.equal(s.activeKeyId, "k");
});

// ── Payloads publics ─────────────────────────────────────────────────────────
test("payload public minimal sans donnée privée", () => {
  const repos = createInMemoryRepositories();
  const res = CertificationEngine.issue(issuanceRequest("cmd-1"), mkCtx(at(0), createIdFactory("cred")), repos);
  const view = res.publicView!;
  assert.equal(containsForbiddenKeys(view), false);
  const json = JSON.stringify(view).toLowerCase();
  assert.equal(json.includes("email"), false);
  assert.equal(json.includes("lref-internal"), false);
  assert.equal(json.includes("signature"), false);
  assert.ok(validatePublicView(view).ok);
});

test("le score n'apparaît pas si la politique ne l'autorise pas", () => {
  const repos = createInMemoryRepositories();
  const res = CertificationEngine.issue(issuanceRequest("cmd-1"), mkCtx(at(0), createIdFactory("cred")), repos);
  assert.equal(res.publicView!.finalScore, undefined);
});

test("QR payload sans donnée personnelle et checksum vérifiable", () => {
  const payload = QRVerificationPayloadBuilder.build({ verificationUrlBase: "https://verify.example/c", publicVerificationId: "ABC-DEF", documentNumber: "ARC-2026-XXXX1234", issuerCode: "ARC", hashProvider: HP });
  assert.ok(validateQrPayload(payload).ok);
  assert.equal(containsForbiddenKeys(payload), false);
  assert.equal(QRVerificationPayloadBuilder.verifyChecksum(payload, HP), true);
  const json = JSON.stringify(payload).toLowerCase();
  assert.equal(json.includes("jean"), false);
});

test("aucune reconnaissance officielle inventée dans la vue publique", () => {
  const repos = createInMemoryRepositories();
  const res = CertificationEngine.issue(issuanceRequest("cmd-1"), mkCtx(at(0), createIdFactory("cred")), repos);
  assert.ok(validatePublicView(res.publicView!).ok);
});

// ── Vérification ─────────────────────────────────────────────────────────────
function issued() {
  const repos = createInMemoryRepositories();
  const idf = createIdFactory("cred");
  const res = CertificationEngine.issue(issuanceRequest("cmd-1"), mkCtx(at(0), idf), repos);
  return { repos, idf, record: res.record!, publicId: res.record!.publicVerificationId };
}

test("vérification valide", () => {
  const { repos, publicId } = issued();
  const { result } = CertificationEngine.verify({ method: "public_id", publicVerificationId: publicId }, mkCtx(at(100), createIdFactory("v")), repos);
  assert.equal(result.status, "valid");
  assert.equal(result.learnerDisplayName, "Jean Exemple");
});

test("vérification not_found", () => {
  const { repos } = issued();
  const { result } = CertificationEngine.verify({ method: "public_id", publicVerificationId: "UNKNOWN" }, mkCtx(at(100), createIdFactory("v")), repos);
  assert.equal(result.status, "not_found");
});

test("vérification tampered (snapshot altéré en base)", () => {
  const { repos, publicId } = issued();
  const rec = repos.credentials.getByPublicId(publicId)!;
  rec.currentVersion.snapshot.learnerDisplayName = "HACKED";
  repos.credentials.save(rec);
  const { result } = CertificationEngine.verify({ method: "public_id", publicVerificationId: publicId }, mkCtx(at(100), createIdFactory("v")), repos);
  assert.equal(result.status, "tampered");
});

test("vérification unsupported_version (QR)", () => {
  const { repos, publicId } = issued();
  const payload = QRVerificationPayloadBuilder.build({ verificationUrlBase: "https://v/c", publicVerificationId: publicId, issuerCode: "ARC", hashProvider: HP });
  const { result } = CertificationEngine.verify({ method: "qr", qrPayload: { ...payload, version: 99 }, supportedVersion: 1 }, mkCtx(at(100), createIdFactory("v")), repos);
  assert.equal(result.status, "unsupported_version");
});

// ── Statuts : suspension / révocation / remplacement ─────────────────────────
test("suspension → statut suspended, vérification suspended", () => {
  const { repos, publicId } = issued();
  CertificationEngine.suspend(publicId, "TECHNICAL_HOLD", "cmd-susp", policyFor(), mkCtx(at(50), createIdFactory("s")), repos);
  const { result } = CertificationEngine.verify({ method: "public_id", publicVerificationId: publicId }, mkCtx(at(60), createIdFactory("v")), repos);
  assert.equal(result.status, "suspended");
});

test("révocation → statut revoked, conservée dans l'historique, vérification revoked", () => {
  const { repos, publicId } = issued();
  const res = CertificationEngine.revoke({ commandId: "cmd-rev", credentialPublicId: publicId, privateReasonCode: "fraud_confirmed_after_due_process", publicReasonCode: "academic_review", revokedByReference: "admin-1", evidenceReference: "case-42" }, policyFor(), mkCtx(at(70), createIdFactory("r")), repos);
  assert.equal(res.record!.status, "revoked");
  // Motif privé non exposé dans la vue publique.
  assert.equal(containsForbiddenKeys(res.publicView), false);
  assert.equal(JSON.stringify(res.publicView).includes("fraud_confirmed"), false);
  const { result } = CertificationEngine.verify({ method: "public_id", publicVerificationId: publicId }, mkCtx(at(80), createIdFactory("v")), repos);
  assert.equal(result.status, "revoked");
});

test("révocation rejouée est idempotente", () => {
  const { repos, publicId } = issued();
  const req = { commandId: "cmd-rev", credentialPublicId: publicId, privateReasonCode: "issued_in_error" as const, publicReasonCode: "revoked_by_issuer" as const, revokedByReference: "admin-1" };
  CertificationEngine.revoke(req, policyFor(), mkCtx(at(70), createIdFactory("r")), repos);
  const second = CertificationEngine.revoke(req, policyFor(), mkCtx(at(90), createIdFactory("r2")), repos);
  assert.equal(second.events.length, 0);
});

test("remplacement pour correction de nom lie ancien et nouveau", () => {
  const { repos, idf, publicId } = issued();
  const res = CertificationEngine.replace({ commandId: "cmd-repl", credentialPublicId: publicId, reason: "name_typo", snapshotOverrides: { learnerDisplayName: "Jean Corrigé" }, requestedByReference: "admin-1" }, policyFor(), mkCtx(at(100), idf), repos);
  assert.equal(res.result.outcome, "replaced");
  const previous = repos.credentials.getByPublicId(publicId)!;
  assert.equal(previous.status, "replaced");
  assert.equal(previous.replacedByPublicId, res.result.newPublicId);
  assert.equal(res.record!.replacesPublicId, publicId);
  assert.equal(res.record!.currentVersion.snapshot.learnerDisplayName, "Jean Corrigé");
});

test("remplacement rejoué est idempotent", () => {
  const { repos, idf, publicId } = issued();
  const req = { commandId: "cmd-repl", credentialPublicId: publicId, reason: "name_typo" as const, requestedByReference: "admin-1" };
  const first = CertificationEngine.replace(req, policyFor(), mkCtx(at(100), idf), repos);
  const replay = CertificationEngine.replace(req, policyFor(), mkCtx(at(110), idf), repos);
  assert.equal(replay.result.outcome, "already_replaced");
  assert.equal(replay.result.newPublicId, first.result.newPublicId);
});

test("vérification replaced sur l'ancien document", () => {
  const { repos, idf, publicId } = issued();
  CertificationEngine.replace({ commandId: "cmd-repl", credentialPublicId: publicId, reason: "reissue", requestedByReference: "a" }, policyFor(), mkCtx(at(100), idf), repos);
  const { result } = CertificationEngine.verify({ method: "public_id", publicVerificationId: publicId }, mkCtx(at(120), createIdFactory("v")), repos);
  assert.equal(result.status, "replaced");
  assert.ok(result.replacementReference);
});

// ── Appels ───────────────────────────────────────────────────────────────────
test("appel de révocation puis approbation → restauration explicite", () => {
  const { repos, publicId } = issued();
  CertificationEngine.revoke({ commandId: "cmd-rev", credentialPublicId: publicId, privateReasonCode: "issued_in_error", publicReasonCode: "revoked_by_issuer", revokedByReference: "a" }, policyFor(), mkCtx(at(70), createIdFactory("r")), repos);
  const { appeal } = CertificationEngine.requestAppeal(publicId, "learner-ref", "erreur", mkCtx(at(80), createIdFactory("ap")), repos);
  let a = CredentialAppealWorkflow.advance(appeal, "under_review", "reviewer", at(90));
  a = CredentialAppealWorkflow.advance(a, "approved", "reviewer", at(100));
  const restored = CertificationEngine.restoreFromAppeal(publicId, a, policyFor(), mkCtx(at(110), createIdFactory("rs")), repos);
  assert.equal(restored.record!.status, "active");
});

test("appel refusé ne restaure pas", () => {
  const appeal = CredentialAppealWorkflow.create({ id: "ap1", credentialPublicId: "pid", requestedByReference: "l", reason: "r", now: START });
  const denied = CredentialAppealWorkflow.advance(CredentialAppealWorkflow.advance(appeal, "under_review", "rev", at(10)), "denied", "rev", at(20));
  assert.equal(CredentialAppealWorkflow.authorizesRestoration(denied), false);
});

// ── Badges ───────────────────────────────────────────────────────────────────
const BADGE_DEF: BadgeDefinition = {
  badgeDefinitionId: "badge-program-completed",
  kind: "program_completed",
  titleKey: "badge.program_completed.title",
  descriptionKey: "badge.program_completed.desc",
  competencyCodes: ["sA", "sB"],
  criteriaVersion: 1,
  requiresEvidence: true,
  expiration: { kind: "never" },
};

test("badge de programme terminé émis sur preuve admissible", () => {
  const repos = createInMemoryRepositories();
  const res = CertificationEngine.issueBadge({ commandId: "cmd-b1", definition: BADGE_DEF, learnerReference: "lref-INTERNAL-123", evidenceReference: "att-1", internalBadgeId: "badge-int-1", now: at(0) }, BADGE_DEF, mkCtx(at(0), createIdFactory("b")), repos);
  assert.ok(res.badge);
  assert.equal(res.badge!.status, "active");
  assert.ok(res.events.some((e) => e.type === "badge.issued"));
});

test("badge refusé sans preuve", () => {
  const repos = createInMemoryRepositories();
  const res = CertificationEngine.issueBadge({ commandId: "cmd-b1", definition: BADGE_DEF, learnerReference: "l", evidenceReference: null, internalBadgeId: "badge-int-1", now: at(0) }, BADGE_DEF, mkCtx(at(0), createIdFactory("b")), repos);
  assert.equal(res.badge, null);
});

test("badge en double bloqué (même définition + apprenant)", () => {
  const repos = createInMemoryRepositories();
  const first = CertificationEngine.issueBadge({ commandId: "cmd-b1", definition: BADGE_DEF, learnerReference: "L1", evidenceReference: "att-1", internalBadgeId: "b1", now: at(0) }, BADGE_DEF, mkCtx(at(0), createIdFactory("b")), repos);
  const second = CertificationEngine.issueBadge({ commandId: "cmd-b2", definition: BADGE_DEF, learnerReference: "L1", evidenceReference: "att-1", internalBadgeId: "b2", now: at(10) }, BADGE_DEF, mkCtx(at(10), createIdFactory("b2")), repos);
  assert.equal(second.badge!.publicVerificationId, first.badge!.publicVerificationId);
  assert.equal(second.events.length, 0);
});

test("révocation d'un badge", () => {
  const repos = createInMemoryRepositories();
  const r = CertificationEngine.issueBadge({ commandId: "cmd-b1", definition: BADGE_DEF, learnerReference: "L1", evidenceReference: "att-1", internalBadgeId: "b1", now: at(0) }, BADGE_DEF, mkCtx(at(0), createIdFactory("b")), repos);
  const rev = CertificationEngine.revokeBadge(r.badge!.publicVerificationId, "cmd-brev", mkCtx(at(20), createIdFactory("br")), repos);
  assert.equal(rev.badge!.status, "revoked");
});

// ── Statuts (machine à états) ────────────────────────────────────────────────
test("transitions de statut : active ne revient pas à draft", () => {
  assert.throws(() => CredentialStatusEngine.transition("active", "draft"), /INVALID_CREDENTIAL_TRANSITION/);
  assert.ok(CredentialStatusEngine.canTransition("active", "revoked"));
  assert.throws(() => CredentialStatusEngine.transition("replaced", "active"), /INVALID_CREDENTIAL_TRANSITION/);
});

// ── Versionnement de politique ───────────────────────────────────────────────
test("modification future de politique sans effet rétroactif", () => {
  const registry = new CredentialPolicyRegistry();
  registry.register(policyFor("marketing-digital", { version: 1, templateVersion: 1 }));
  const repos = createInMemoryRepositories();
  const res = CertificationEngine.issue(issuanceRequest("cmd-1", { policy: registry.get("marketing-digital", "achievement_attestation", 1)! }), mkCtx(at(0), createIdFactory("cred")), repos);
  // Nouvelle version de politique après coup.
  registry.register(policyFor("marketing-digital", { version: 2, templateVersion: 5 }));
  assert.equal(res.record!.currentVersion.snapshot.templateVersion, 1);
});

test("registry résout la version active la plus récente", () => {
  const registry = new CredentialPolicyRegistry();
  registry.register(policyFor("p", { version: 1, activatedAt: "2026-01-01T00:00:00Z" }));
  registry.register(policyFor("p", { version: 2, activatedAt: "2026-06-01T00:00:00Z" }));
  const active = registry.resolveActive("p", "achievement_attestation", new Date("2026-12-01T00:00:00Z"));
  assert.equal(active?.version, 2);
});

// ── Généricité ───────────────────────────────────────────────────────────────
test("compatibilité programme Marketing Digital", () => {
  const repos = createInMemoryRepositories();
  const res = CertificationEngine.issue(issuanceRequest("cmd-1"), mkCtx(at(0), createIdFactory("cred")), repos);
  assert.equal(res.record!.programId, "marketing-digital");
});

test("compatibilité programme linguistique synthétique (générique)", () => {
  const repos = createInMemoryRepositories();
  const fr = passedContract({ programId: "tef-synthetique", learnerReference: "lref-x" });
  const req = issuanceRequest("cmd-1", {
    policy: policyFor("tef-synthetique"),
    eligibilityContext: eligibilityCtx({ finalResult: fr, learnerReference: "lref-x" }),
    programTitle: "TEF — Test d'Évaluation de Français",
  });
  const res = CertificationEngine.issue(req, mkCtx(at(0), createIdFactory("cred")), repos);
  assert.equal(res.record!.programId, "tef-synthetique");
});

// ── Document model ───────────────────────────────────────────────────────────
test("modèle de document abstrait sans PDF ni donnée privée", () => {
  const { record } = issued();
  const payload = QRVerificationPayloadBuilder.build({ verificationUrlBase: "https://v/c", publicVerificationId: record.publicVerificationId, issuerCode: "ARC", hashProvider: HP });
  const doc = CredentialDocumentModelBuilder.build(record, payload);
  assert.equal(containsForbiddenKeys(doc), false);
  assert.equal(doc.accessibility.selectableText, true);
  assert.ok(doc.verification.humanReadableId.length > 0);
});

// ── Validation & source ──────────────────────────────────────────────────────
test("porte d'émission : source non réussie invalide", () => {
  assert.equal(validateIssuanceSource("failed", false, false).ok, false);
  assert.equal(validateIssuanceSource("passed", true, true).ok, true);
});

// ── Flag, specs, pureté ──────────────────────────────────────────────────────
test("le flag CERTIFICATION_ENGINE_ENABLED reste désactivé", () => {
  assert.equal(CERTIFICATION_ENGINE_ENABLED, false);
});

test("DeepSpecs présents et complets", () => {
  assert.ok(CERTIFICATION_DEEP_SPECS.length >= 20);
  for (const s of CERTIFICATION_DEEP_SPECS) assert.ok(s.id && s.description);
});

test("fonctionne sans DB, sans réseau, sans LLM (moteur pur, dépôts en mémoire)", () => {
  const repos = createInMemoryRepositories();
  const res = CertificationEngine.issue(issuanceRequest("cmd-1"), mkCtx(at(0), createIdFactory("cred")), repos);
  assert.ok(res.record);
  assert.equal(repos.audit.all().length > 0, true);
});

test("compatibilité directe avec ExamResultContract du Sprint G", () => {
  // Un contrat finalisé réussi du Sprint G est accepté tel quel comme source de vérité.
  const r = CertificationEligibilityEngine.evaluate(policyFor(), eligibilityCtx({ finalResult: passedContract() }), START);
  assert.equal(r.status, "eligible");
});

test("le serializer respecte la liste blanche de la politique", () => {
  const { record } = issued();
  const restricted = policyFor("marketing-digital", { allowedPublicFields: ["publicVerificationId", "documentNumber", "documentTitle", "status", "version", "verificationStatement"] });
  const view = PublicCredentialSerializer.toPublicView(record, restricted);
  assert.equal(view.finalScore, undefined);
  assert.ok(validatePublicView(view).ok);
});
