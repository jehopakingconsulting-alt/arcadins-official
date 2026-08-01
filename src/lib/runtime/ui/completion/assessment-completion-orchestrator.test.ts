import { test } from "node:test";
import assert from "node:assert/strict";
import { AssessmentCompletionOrchestrator as O, initialCompletionState, type ConsolidateContext } from "./assessment-completion-orchestrator.ts";
import { buildScenarioInput, DEFAULT_RESULT_POLICY } from "./completion-config.ts";
import { createCompletionStore } from "./completion-store.ts";
import { toCompletionViewModel } from "./completion-view-models.ts";
import { buildCertificationHandoff } from "./certification-handoff.ts";
import { inspectClientSafe } from "../security/ensure-client-safe.ts";
import type { CompletionInput } from "./completion-types.ts";

const NOW = new Date("2026-11-01T10:00:00Z");
function idf() { let n = 0; return () => `id-${n++}`; }
function ctx(over: Partial<ConsolidateContext> = {}): ConsolidateContext {
  return { now: () => NOW, idFactory: idf(), config: DEFAULT_RESULT_POLICY, ...over };
}
function run(input: CompletionInput, commandId = "cmd-1", c = ctx()) {
  return O.consolidate(initialCompletionState(), input, commandId, c);
}

// ── Scénarios de base ────────────────────────────────────────────────────────
test("quiz incomplets → quiz_requirements_pending, aucune décision finale", () => {
  const r = run(buildScenarioInput("quiz_pending"));
  assert.equal(r.state.status, "quiz_requirements_pending");
  assert.equal(r.final, null);
});

test("examen non admissible → final_exam_not_eligible", () => {
  const r = run(buildScenarioInput("exam_not_eligible"));
  assert.equal(r.state.status, "final_exam_not_eligible");
  assert.equal(r.final, null);
});

test("réussite provisoire (jamais finale, aucune certification)", () => {
  const r = run(buildScenarioInput("provisional_pass"));
  assert.equal(r.state.status, "provisional_pass");
  assert.equal(r.provisional?.status, "provisional_pass");
  assert.equal(r.final, null);
  assert.equal(r.state.certificationEligibility, false);
});

test("échec provisoire", () => {
  const r = run(buildScenarioInput("provisional_fail"));
  assert.equal(r.provisional?.status, "provisional_fail");
  assert.equal(r.final, null);
});

test("révision manuelle requise → manual_review_pending, provisoire = pending_manual_review", () => {
  const r = run(buildScenarioInput("manual_review_pending"));
  assert.equal(r.state.status, "manual_review_pending");
  assert.equal(r.provisional?.status, "pending_manual_review");
  assert.equal(r.final, null);
  assert.ok(r.events.some((e) => e.type === "MANUAL_REVIEW_OPENED"));
});

test("décision finale RÉUSSIE + admissible certification, AUCUN certificat émis", () => {
  const r = run(buildScenarioInput("final_pass"));
  assert.equal(r.state.status, "final_pass");
  assert.equal(r.final?.passed, true);
  assert.equal(r.state.certificationEligibility, true);
  assert.ok(r.events.some((e) => e.type === "PROGRAM_ASSESSMENT_PASSED"));
  // Aucun certificat/badge nulle part.
  assert.ok(!/certificateId|"badge"|"pdf"|qrImage|credential/i.test(JSON.stringify(r.state)));
});

test("décision finale ÉCHOUÉE + reprises épuisées", () => {
  const r = run(buildScenarioInput("retake_exhausted"));
  assert.equal(r.final?.passed, false);
  assert.equal(r.state.status, "retake_exhausted");
  assert.equal(r.retake?.exhausted, true);
  assert.ok(r.events.some((e) => e.type === "RETAKE_EXHAUSTED"));
});

test("échec final avec reprise disponible → retake_available", () => {
  const r = run(buildScenarioInput("retake_available"));
  assert.equal(r.final?.passed, false);
  assert.equal(r.state.status, "retake_available");
  assert.equal(r.retake?.allowed, true);
  assert.ok(r.events.some((e) => e.type === "RETAKE_GRANTED"));
});

test("suspendu → suspended", () => {
  const r = run(buildScenarioInput("suspended"));
  assert.equal(r.state.status, "suspended");
  assert.equal(r.final, null);
});

// ── Idempotence / immutabilité / concurrence ────────────────────────────────
test("idempotence : même commandId → aucun nouvel événement, même final", () => {
  const c = ctx();
  const first = O.consolidate(initialCompletionState(), buildScenarioInput("final_pass"), "cmd-x", c);
  const replay = O.consolidate(first.state, buildScenarioInput("final_pass"), "cmd-x", c);
  assert.equal(replay.events.length, 0);
  assert.deepEqual(replay.final, first.final);
});

test("décision finale IMMUABLE : une seconde consolidation ne la reconstruit pas", () => {
  const c = ctx();
  const first = O.consolidate(initialCompletionState(), buildScenarioInput("final_pass"), "cmd-a", c);
  const again = O.consolidate(first.state, buildScenarioInput("final_pass"), "cmd-b", c);
  assert.equal(again.final?.decisionId, first.final?.decisionId, "même decisionId");
  assert.ok(!again.events.some((e) => e.type === "FINAL_DECISION_RECORDED"), "aucune nouvelle décision finale");
});

test("concurrence (store) : une seule décision finale acceptée", () => {
  const store = createCompletionStore();
  const c = ctx();
  const a = store.consolidate(buildScenarioInput("final_pass"), "cmd-1", c);
  const b = store.consolidate(buildScenarioInput("final_pass"), "cmd-2", c);
  assert.equal(a.final?.decisionId, b.final?.decisionId);
  assert.equal(store.getState().events.filter((e) => e.type === "FINAL_DECISION_RECORDED").length, 1);
});

test("versionnage FIGÉ : un changement de politique ne modifie pas une décision existante", () => {
  const c = ctx();
  const v1 = buildScenarioInput("final_pass"); // policyVersion 1
  const first = O.consolidate(initialCompletionState(), v1, "cmd-1", c);
  const v2: CompletionInput = { ...v1, policyVersion: 2, versions: { ...v1.versions, contractVersion: 9 } };
  const later = O.consolidate(first.state, v2, "cmd-2", c);
  assert.equal(later.final?.policyVersion, 1, "policyVersion figée à la 1re décision");
  assert.equal(later.final?.contractVersion, 1);
});

// ── Contrat de transfert K4 ─────────────────────────────────────────────────
test("contrat K4 produit APRÈS réussite finale uniquement", () => {
  const r = run(buildScenarioInput("final_pass"));
  const handoff = buildCertificationHandoff(r.final, buildScenarioInput("final_pass"), r.competencySummary);
  assert.ok(handoff);
  assert.equal(handoff!.passed, true);
  assert.equal(handoff!.emitted, false);
  assert.ok(!/certificateId|signature|signingKey|"pdf"|qrImage/i.test(JSON.stringify(handoff)));
});

test("aucun contrat K4 sur résultat provisoire", () => {
  const r = run(buildScenarioInput("provisional_pass"));
  assert.equal(buildCertificationHandoff(r.final, buildScenarioInput("provisional_pass"), r.competencySummary), null);
});

test("aucun contrat K4 après échec final", () => {
  const r = run(buildScenarioInput("final_fail"));
  assert.equal(buildCertificationHandoff(r.final, buildScenarioInput("final_fail"), r.competencySummary), null);
});

// ── ViewModel public / sécurité ─────────────────────────────────────────────
test("ViewModel public : aucune donnée privée, certificateEmitted=false", () => {
  const r = run(buildScenarioInput("final_pass"));
  const vm = toCompletionViewModel(r.state, buildScenarioInput("final_pass"));
  assert.equal(vm.certificateEmitted, false);
  assert.equal(inspectClientSafe(vm).safe, true);
  // Les raisons INTERNES ne sont pas publiées.
  assert.ok(!JSON.stringify(vm).includes("FINAL_PASS"));
  assert.ok(r.state.internalReasonCodes.includes("FINAL_PASS"), "les codes internes existent côté état, hors VM");
});

test("agrégation des compétences : acquises vs non acquises", () => {
  const input = buildScenarioInput("final_pass");
  input.exam.competencies[1] = { competencyId: "C2", score: 0.3, level: "insufficient", needsRemediation: true };
  const r = O.consolidate(initialCompletionState(), input, "cmd-1", ctx());
  assert.deepEqual(r.competencySummary?.acquiredIds, ["C1"]);
  assert.deepEqual(r.competencySummary?.notAcquiredIds, ["C2"]);
});

test("compétence éliminatoire / seuil : sous le seuil → non acquise", () => {
  const input = buildScenarioInput("provisional_pass");
  input.exam.competencies = [{ competencyId: "C1", score: 0.4, level: "fragile", needsRemediation: false }];
  const r = O.consolidate(initialCompletionState(), input, "cmd-1", ctx());
  assert.equal(r.competencySummary?.items[0].acquired, false);
});

// ── Événements Runtime ──────────────────────────────────────────────────────
test("événements : provisoire + final + certification, nettoyés", () => {
  const r = run(buildScenarioInput("final_pass"));
  const types = r.events.map((e) => e.type);
  assert.ok(types.includes("PROVISIONAL_DECISION_RECORDED"));
  assert.ok(types.includes("FINAL_DECISION_RECORDED"));
  assert.ok(types.includes("CERTIFICATION_ELIGIBILITY_UPDATED"));
  assert.ok(!/reviewerNotes|internalDecisionReason|integritySignals|FINAL_PASS/.test(JSON.stringify(r.events)));
});

// ── Snapshot / hydrate / déterminisme ───────────────────────────────────────
test("snapshot/hydrate : reprise identique", () => {
  const store = createCompletionStore();
  store.consolidate(buildScenarioInput("final_pass"), "cmd-1", ctx());
  const snap = store.snapshot();
  const store2 = createCompletionStore();
  store2.hydrate(snap);
  assert.deepEqual(store2.getState(), store.getState());
});

test("déterminisme : même entrée + même contexte → même decisionId", () => {
  const a = run(buildScenarioInput("final_pass"), "cmd-1");
  const b = run(buildScenarioInput("final_pass"), "cmd-1");
  assert.equal(a.final?.decisionId, b.final?.decisionId);
});

test("généricité : programme synthétique arbitraire", () => {
  const input: CompletionInput = { ...buildScenarioInput("final_pass"), programSlug: "synthetic-program", curriculumVersion: "vX" };
  const r = run(input);
  assert.equal(r.state.status, "final_pass");
  assert.equal(r.final?.curriculumVersion, "vX");
});

test("aucune mutation des résultats sources (input inchangé)", () => {
  const input = buildScenarioInput("final_pass");
  const copy = JSON.parse(JSON.stringify(input));
  run(input);
  assert.deepEqual(input, copy);
});

test("score public arrondi", () => {
  const input = buildScenarioInput("provisional_pass");
  input.exam.percentage = 83.6;
  const r = O.consolidate(initialCompletionState(), input, "cmd-1", ctx());
  const vm = toCompletionViewModel(r.state, input);
  assert.equal(vm.scorePercent, 84);
});

test("examen expiré → statut expired + décision finale expired", () => {
  const input = buildScenarioInput("provisional_fail");
  input.exam.expired = true;
  const r = O.consolidate(initialCompletionState(), input, "cmd-1", ctx());
  assert.equal(r.state.status, "expired");
  assert.equal(r.final?.finalStatus, "expired");
});
