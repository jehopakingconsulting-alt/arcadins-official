import { test } from "node:test";
import assert from "node:assert/strict";
import { STUDENT_LEARNING_UI_ENABLED, isStudentPreviewAccessible, CREDENTIAL_DOCUMENT_TITLE } from "./config.ts";
import { containsForbiddenUiKeys, validateViewModel, assertDemoOnly } from "./validation.ts";
import { toAssessmentViewModel, ensureClean, maskId } from "./mappers.ts";
import { createDemoStudentDataProvider, createDisabledStudentDataProvider, createMockStudentDataProvider } from "./providers.ts";
import {
  demoDashboard, demoJourney, demoLesson, demoAssessment, demoAssessmentResult, demoProgress, demoCalendar,
  demoBadges, demoCredentials, demoNotifications, demoNotes, demoBookmarks,
} from "./demo-data.ts";
import type { AssessmentSession } from "../assessment/types.ts";

// ── Sécurité : aucune donnée privée dans les view models ──
test("garde: containsForbiddenUiKeys détecte les clés privées", () => {
  assert.equal(containsForbiddenUiKeys({ prompt: "x", correctOptionId: "o1" }), true);
  assert.equal(containsForbiddenUiKeys({ nested: { grading: {} } }), true);
  assert.equal(containsForbiddenUiKeys({ privateState: "x" }), true);
  assert.equal(containsForbiddenUiKeys({ prompt: "x", options: [{ id: "o0", label: "A" }] }), false);
});

test("tous les view models de démonstration passent la validation (aucune fuite)", () => {
  for (const vm of [demoDashboard(), demoJourney(), demoLesson(), demoAssessment(), demoAssessmentResult(), demoProgress(), demoCalendar(), demoBadges(), demoCredentials(), demoNotifications(), demoNotes(), demoBookmarks()]) {
    const report = validateViewModel(vm);
    assert.ok(report.ok, JSON.stringify(report.issues));
  }
});

test("le quiz de démonstration n'expose aucune bonne réponse", () => {
  const blob = JSON.stringify(demoAssessment());
  assert.equal(blob.includes("correctOptionId"), false);
  assert.equal(blob.includes("grading"), false);
  assert.equal(blob.includes("correctAnswer"), false);
});

test("ensureClean laisse passer un VM propre et rejette un VM avec fuite", () => {
  assert.doesNotThrow(() => ensureClean({ prompt: "ok" }));
  assert.throws(() => ensureClean({ correctAnswer: "o1" }), /UI_VIEW_MODEL_LEAK/);
});

// ── Mappers ──
test("toAssessmentViewModel produit un VM public sans barème", () => {
  const session: AssessmentSession = {
    assessmentId: "A1", attemptId: "att1", learnerRefOpaque: "L1", programId: "P1", status: "in_progress",
    publicQuestions: [{ id: "q1", version: 1, type: "single", difficulty: "medium", prompt: "Q ?", options: [{ id: "o0", label: "A" }, { id: "o1", label: "B" }], points: 1 }],
    responses: {}, navigationState: { currentIndex: 0, visited: [], order: ["q1"] },
    timingState: { startedAt: null, expiresAt: null, elapsedSeconds: 0 }, progress: { answered: 0, total: 1 },
    integrityState: { checksum: "x", version: 1, warnings: [] }, version: 1, checksum: "x", createdAt: "", updatedAt: "",
  };
  const vm = toAssessmentViewModel(session);
  assert.equal(vm.questions[0].kind, "single");
  assert.equal(containsForbiddenUiKeys(vm), false);
});

test("maskId masque l'identifiant public", () => {
  assert.equal(maskId("ABCDEF123456").startsWith("ABC"), true);
  assert.equal(maskId("ABCDEF123456").includes("••••"), true);
  assert.equal(maskId("short"), "••••");
});

// ── Providers ──
test("provider démo: succès + demo=true", async () => {
  const p = createDemoStudentDataProvider();
  const r = await p.getDashboard();
  assert.equal(r.state, "success");
  assert.equal(r.demo, true);
  assert.ok(r.data);
});

test("provider désactivé: feature_disabled + aucune donnée", async () => {
  const p = createDisabledStudentDataProvider();
  const r = await p.getJourney();
  assert.equal(r.state, "feature_disabled");
  assert.equal(r.data, null);
});

test("provider mock: état injecté (loading/error)", async () => {
  const p = createMockStudentDataProvider({ getProgress: { state: "error", data: null, demo: true, errorCode: "X" } });
  const r = await p.getProgress();
  assert.equal(r.state, "error");
  const dash = await p.getDashboard(); // non surchargé → démo
  assert.equal(dash.state, "success");
});

test("assertDemoOnly rejette des données non-démo", () => {
  assert.throws(() => assertDemoOnly({ demo: false, data: {} }), /REAL_DATA_FORBIDDEN/);
  assert.doesNotThrow(() => assertDemoOnly({ demo: true, data: {} }));
});

// ── Données de démonstration : fictives ──
test("l'identité de démonstration est fictive (aucun nom réel)", () => {
  const d = demoDashboard();
  assert.equal(d.identity.demo, true);
  assert.equal(d.identity.displayName, "Étudiant Démo");
});

test("le certificat porte l'intitulé ARCADINS, aucune reconnaissance gouvernementale", () => {
  assert.equal(CREDENTIAL_DOCUMENT_TITLE, "Attestation de réussite ARCADINS");
  const blob = JSON.stringify(demoCredentials()).toLowerCase();
  for (const claim of ["gouvernement", "diplôme d'état", "ministériel", "accréditation officielle"]) assert.equal(blob.includes(claim), false);
});

test("le parcours de démonstration expose des statuts (verrouillage fourni par la donnée)", () => {
  const j = demoJourney();
  const locked = j.modules.find((m) => m.status === "locked");
  assert.ok(locked);
  const lockedLesson = locked!.weeks[0].lessons[0];
  assert.equal(lockedLesson.lockedReasonCode, "PREREQUISITE_MODULE_INCOMPLETE");
});

// ── Flags ──
test("le flag STUDENT_LEARNING_UI_ENABLED reste OFF", () => {
  assert.equal(STUDENT_LEARNING_UI_ENABLED, false);
});
test("la preview est inaccessible par défaut (flag preview OFF)", () => {
  assert.equal(isStudentPreviewAccessible(), false);
  assert.equal(isStudentPreviewAccessible({ preview: true }), true);
});

test("le renderer tolère un bloc de type inconnu (fallback sûr côté données)", () => {
  const unknown = demoLesson().blocks.find((b) => b.type === "unknown_block_type");
  assert.ok(unknown);
});
