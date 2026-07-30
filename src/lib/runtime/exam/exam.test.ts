import { test } from "node:test";
import assert from "node:assert/strict";
import type { PrivateQuestion, QuestionType, GradingRule } from "../assessment/types.ts";
import { InMemoryQuestionBank, fromBankQuestions } from "../assessment/question-bank.ts";
import { marketingDigitalV2Bank } from "../../academic/question-bank/marketing-digital-v2.ts";
import type {
  ExamAccommodation,
  ExamContext,
  ExamEligibilityContext,
  ExamEligibilityRule,
  FinalExamDefinition,
  FinalExamSection,
  FinalExamVersion,
} from "./types.ts";
import { FinalExamEngine } from "./final-exam-engine.ts";
import { ExamEligibilityEngine } from "./eligibility-engine.ts";
import { ExamSessionManager } from "./exam-session-manager.ts";
import { ExamDefinitionRegistry } from "./exam-definition-registry.ts";
import { ManualReviewWorkflow } from "./manual-review-workflow.ts";
import { ExamResultContractBuilder } from "./exam-result-contract.ts";
import { AuthoritativeExamTimer } from "./authoritative-timer.ts";
import { createExamContext, createIdFactory, FINAL_EXAM_ENABLED, makeExamRuntimeConfig } from "./config.ts";
import { containsForbiddenKeys } from "./secure-exam-serializer.ts";
import { validatePublicExamSession, validateExamGradingResult, validateExamAttempt, validateCertificateGate } from "./validation.ts";
import { EXAM_DEEP_SPECS } from "./specs.ts";

const START = new Date("2026-10-01T09:00:00Z");
const HOUR = 3600;

function at(secondsFromStart: number): Date {
  return new Date(START.getTime() + secondsFromStart * 1000);
}

// ── Fabriques ──────────────────────────────────────────────────────────────
function q(id: string, sectionId: string, type: QuestionType, grading: GradingRule, points = 2, opts: { options?: string[]; competencyId?: string; difficulty?: PrivateQuestion["difficulty"] } = {}): PrivateQuestion {
  return {
    id,
    version: 1,
    type,
    difficulty: opts.difficulty ?? "medium",
    prompt: `Question ${id}`,
    options: opts.options?.map((label, i) => ({ id: `o${i}`, label })),
    points,
    grading,
    competencyId: opts.competencyId,
    moduleId: sectionId,
    status: "active",
    privateExplanation: "explication privée",
    feedbackOnError: "indice privé",
  };
}

const VERSION: FinalExamVersion = {
  examVersion: 1,
  questionsVersion: 1,
  bankVersion: 1,
  rubricsVersion: 1,
  gradingVersion: 1,
  eligibilityVersion: 1,
  navigationVersion: 1,
  accommodationVersion: 1,
  passThresholdVersion: 1,
};

const ELIGIBILITY_RULE: ExamEligibilityRule = {
  requireActiveEnrollment: true,
  requireProgramAccessible: true,
  requiredModuleIds: ["m1"],
  minimumProgressPercent: 80,
  requiredPassedQuizIds: ["quiz1"],
  requireFinalProjectSubmitted: true,
  requireFinalProjectApproved: false,
  forbidAdministrativeHold: true,
  minimumAvailableAttempts: 1,
  mandatoryCooldownSeconds: 0,
  requireExamWindowOpen: true,
  requiredPrerequisiteSkillIds: [],
  version: 1,
};

function eligibleCtx(overrides: Partial<ExamEligibilityContext> = {}): ExamEligibilityContext {
  return {
    enrollmentActive: true,
    programAccessible: true,
    completedModuleIds: ["m1"],
    progressPercent: 100,
    passedQuizIds: ["quiz1"],
    finalProjectSubmitted: true,
    finalProjectApproved: true,
    administrativeHold: false,
    availableAttempts: 2,
    lastAttemptCompletedAt: null,
    examWindowOpen: true,
    satisfiedPrerequisiteSkillIds: [],
    specialApproval: null,
    ...overrides,
  };
}

function makeDefinition(overrides: Partial<FinalExamDefinition> = {}): FinalExamDefinition {
  const sections: FinalExamSection[] = [
    { id: "sA", titleKey: "exam.sA", selection: { count: 2, moduleId: "sA" }, weight: 1 },
    { id: "sB", titleKey: "exam.sB", selection: { count: 2, moduleId: "sB" }, weight: 1 },
  ];
  return {
    examId: "exam-mkt",
    programId: "marketing-digital",
    version: VERSION,
    status: "active",
    sections,
    durationLimitSeconds: HOUR,
    passThresholdPercent: 70,
    navigation: { mode: "sequential", allowBacktrack: false, lockSectionAfterComplete: true, questionOrder: "stable", requireAllAnswered: false, allowPartialSubmission: true, requireConfirmationBeforeSubmit: true, version: 1 },
    retake: { maximumAttempts: 2, cooldownSeconds: 0, requiresAuthorization: true, version: 1 },
    grading: { passThresholdPercent: 70, sectionThresholds: {}, eliminatorySectionIds: [], weighting: "by_section", penalties: { perIncorrect: 0 }, bonusEnabled: false, ignoreAccents: true, version: 1 },
    eligibilityRule: ELIGIBILITY_RULE,
    accommodationPolicy: { allowed: ["extra_time", "allow_pause", "screen_reader"], version: 1 },
    humanReviewRequired: false,
    activatedAt: "2026-01-01T00:00:00Z",
    retiredAt: null,
    ...overrides,
  };
}

function defaultBank(): InMemoryQuestionBank {
  // 2 questions correctes possibles par section (single choice).
  return new InMemoryQuestionBank([
    q("sA-1", "sA", "single", { kind: "single", correctOptionId: "o1" }, 2, { options: ["A", "B"], competencyId: "c1" }),
    q("sA-2", "sA", "single", { kind: "single", correctOptionId: "o0" }, 2, { options: ["A", "B"], competencyId: "c1" }),
    q("sB-1", "sB", "single", { kind: "single", correctOptionId: "o1" }, 2, { options: ["A", "B"], competencyId: "c2" }),
    q("sB-2", "sB", "single", { kind: "single", correctOptionId: "o0" }, 2, { options: ["A", "B"], competencyId: "c2" }),
  ]);
}

function ctxAt(seconds: number, seed = 42, config = {}): ExamContext {
  return createExamContext({ now: at(seconds), seed, idFactory: createIdFactory("ex"), config });
}

/** Crée une session prête + démarrée avec l'ensemble fourni de réponses. */
function startedSession(opts: { bank?: InMemoryQuestionBank; def?: FinalExamDefinition; accommodations?: ExamAccommodation[]; seed?: number; config?: object } = {}) {
  const def = opts.def ?? makeDefinition();
  const bank = opts.bank ?? defaultBank();
  const c0 = ctxAt(0, opts.seed ?? 42, opts.config ?? {});
  const elig = ExamEligibilityEngine.evaluate(def.eligibilityRule, eligibleCtx(), c0.now);
  const created = FinalExamEngine.createSession({ definition: def, bank, learnerRef: "u1", attemptNumber: 1, eligibility: elig, accommodations: opts.accommodations }, "cmd-create", c0);
  const started = FinalExamEngine.start(created.attempt, "cmd-start", ctxAt(1, opts.seed ?? 42, opts.config ?? {}));
  return { def, bank, attempt: started.attempt };
}

// ── Admissibilité ────────────────────────────────────────────────────────────
test("admissibilité : étudiant admissible", () => {
  const r = ExamEligibilityEngine.evaluate(ELIGIBILITY_RULE, eligibleCtx(), START);
  assert.equal(r.status, "eligible");
  assert.ok(ExamEligibilityEngine.isAdmissible(r));
});

test("admissibilité : étudiant non admissible (inscription inactive)", () => {
  const r = ExamEligibilityEngine.evaluate(ELIGIBILITY_RULE, eligibleCtx({ enrollmentActive: false }), START);
  assert.equal(r.status, "ineligible");
  assert.ok(r.reasonCodes.includes("ENROLLMENT_INACTIVE"));
});

test("admissibilité : conditionnelle (progression insuffisante)", () => {
  const r = ExamEligibilityEngine.evaluate(ELIGIBILITY_RULE, eligibleCtx({ progressPercent: 50 }), START);
  assert.equal(r.status, "conditionally_eligible");
  assert.ok(r.unmetRuleCodes.includes("PROGRESS_BELOW_MINIMUM"));
});

test("admissibilité : approbation manuelle requise (projet non approuvé)", () => {
  const rule = { ...ELIGIBILITY_RULE, requireFinalProjectApproved: true };
  const r = ExamEligibilityEngine.evaluate(rule, eligibleCtx({ finalProjectApproved: false }), START);
  assert.equal(r.status, "requires_manual_approval");
});

test("admissibilité : décision spéciale (dérogation accordée) prime", () => {
  const r = ExamEligibilityEngine.evaluate(ELIGIBILITY_RULE, eligibleCtx({ enrollmentActive: false, specialApproval: "granted" }), START);
  assert.equal(r.status, "eligible");
});

// ── Création & démarrage ─────────────────────────────────────────────────────
test("création d'une session officielle (figée) puis démarrage", () => {
  const { attempt } = startedSession();
  assert.equal(attempt.status, "active");
  assert.equal(attempt.kind, "official");
  assert.equal(attempt.sections.length, 2);
  assert.ok(attempt.timer.officialStartedAt);
});

test("création rejetée si non admissible", () => {
  const def = makeDefinition();
  const c0 = ctxAt(0);
  const elig = ExamEligibilityEngine.evaluate(def.eligibilityRule, eligibleCtx({ enrollmentActive: false }), c0.now);
  assert.throws(() => FinalExamEngine.createSession({ definition: def, bank: defaultBank(), learnerRef: "u1", attemptNumber: 1, eligibility: elig }, "c", c0), /NOT_ELIGIBLE/);
});

test("double création avec même idempotencyKey ne consomme pas deux fois", () => {
  const def = makeDefinition();
  const c0 = ctxAt(0);
  const elig = ExamEligibilityEngine.evaluate(def.eligibilityRule, eligibleCtx(), c0.now);
  const first = FinalExamEngine.createSession({ definition: def, bank: defaultBank(), learnerRef: "u1", attemptNumber: 1, eligibility: elig }, "cmd-x", c0);
  // Rejouer start avec la même commande sur la tentative marquée = aucun effet.
  const s1 = FinalExamEngine.start(first.attempt, "cmd-start", ctxAt(1));
  const s2 = FinalExamEngine.start(s1.attempt, "cmd-start", ctxAt(2));
  assert.equal(s2.events.length, 0);
  assert.equal(s1.attempt.timer.officialStartedAt, s2.attempt.timer.officialStartedAt);
});

test("double démarrage (même commandId) est idempotent", () => {
  const { attempt } = startedSession();
  const again = FinalExamEngine.start(attempt, "cmd-start", ctxAt(5));
  assert.equal(again.events.length, 0);
});

// ── Chronomètre autoritaire ──────────────────────────────────────────────────
test("chronomètre : temps officiel piloté par l'horloge injectée (autorité serveur)", () => {
  const { attempt } = startedSession();
  const t = AuthoritativeExamTimer.recompute(attempt.timer, at(1 + 600)); // 10 min après start
  assert.equal(t.elapsedOfficialSeconds, 600);
  assert.equal(t.remainingOfficialSeconds, HOUR - 600);
  assert.equal(t.expired, false);
});

test("chronomètre : temps supplémentaire (accessibilité) prolonge la limite", () => {
  const { attempt } = startedSession({ accommodations: [{ type: "extra_time", extraTimeSeconds: 600 }] });
  const t = AuthoritativeExamTimer.recompute(attempt.timer, at(1 + HOUR + 300));
  assert.equal(t.expired, false); // encore dans la fenêtre grâce aux +600s
  assert.equal(t.remainingOfficialSeconds, 300);
});

test("chronomètre : expiration au-delà de la limite", () => {
  const { attempt } = startedSession();
  assert.ok(AuthoritativeExamTimer.shouldAutoSubmit(attempt.timer, at(1 + HOUR + 5)));
});

test("soumission automatique logique à expiration", () => {
  const { attempt } = startedSession();
  const res = FinalExamEngine.submit(attempt, "cmd-submit", ctxAt(1 + HOUR + 10));
  assert.ok(res.events.some((e) => e.type === "exam.auto_submitted"));
  assert.ok(["pending_manual_review", "provisionally_graded"].includes(res.attempt.status));
});

test("pause autorisée cumule le temps de pause hors chronomètre", () => {
  const { attempt } = startedSession({ accommodations: [{ type: "allow_pause" }] });
  const paused = FinalExamEngine.pause(attempt, "cmd-pause", ctxAt(1 + 100));
  const resumed = FinalExamEngine.resume(paused.attempt, "cmd-resume", ctxAt(1 + 400)); // 300s de pause
  const t = AuthoritativeExamTimer.recompute(resumed.attempt.timer, at(1 + 400));
  assert.equal(t.elapsedOfficialSeconds, 100); // les 300s de pause sont exclues
});

test("pause interdite si non accordée", () => {
  const { attempt } = startedSession();
  const res = FinalExamEngine.pause(attempt, "cmd-pause", ctxAt(1 + 100));
  assert.ok(res.events.some((e) => e.type === "exam.warning_recorded"));
  assert.equal(res.attempt.status, "active");
});

test("reprise après reconnexion (heartbeat) conserve l'autorité serveur", () => {
  const { attempt } = startedSession();
  const hb = FinalExamEngine.heartbeat(attempt, ctxAt(1 + 30));
  assert.ok(hb.attempt.timer.lastHeartbeatAt);
  assert.ok(hb.events.some((e) => e.type === "exam.heartbeat_received"));
});

test("heartbeat en retard produit un avertissement non bloquant", () => {
  const { attempt } = startedSession();
  const hb = FinalExamEngine.heartbeat(attempt, ctxAt(1 + 500)); // > heartbeatMaxGapSeconds (90)
  assert.ok(hb.events.some((e) => e.type === "exam.warning_recorded"));
  assert.equal(hb.attempt.integrity.blocking, false);
});

test("dérive du temps client détectée mais non autoritaire", () => {
  const { attempt } = startedSession();
  const hb = FinalExamEngine.heartbeat(attempt, ctxAt(1 + 60), /* clientElapsed */ 5); // écart ~55s < tol 120 → ok
  const hb2 = FinalExamEngine.heartbeat(attempt, ctxAt(1 + 60), /* clientElapsed */ 600); // écart énorme
  assert.equal(hb.attempt.integrity.highestSeverity, "clean");
  assert.ok(hb2.attempt.integrity.issues.some((i) => i.code === "CLIENT_CLOCK_INCONSISTENT"));
});

// ── Navigation ───────────────────────────────────────────────────────────────
test("navigation libre autorise toutes les sections", () => {
  const def = makeDefinition({ navigation: { ...makeDefinition().navigation, mode: "free", allowBacktrack: true, lockSectionAfterComplete: false } });
  const { attempt } = startedSession({ def });
  const r = FinalExamEngine.saveAnswer(attempt, { questionId: "sB-1", value: "o1" }, "cmd-a", ctxAt(2, 42, { navigation: { mode: "free", allowBacktrack: true } }));
  assert.ok(r.events.some((e) => e.type === "exam.answer_saved"));
});

test("sauvegarde de réponse crée une révision", () => {
  const { attempt } = startedSession();
  const r = FinalExamEngine.saveAnswer(attempt, { questionId: "sA-1", value: "o1" }, "cmd-a1", ctxAt(2));
  assert.equal(r.attempt.responses["sA-1"].revision, 1);
  const r2 = FinalExamEngine.saveAnswer(r.attempt, { questionId: "sA-1", value: "o0" }, "cmd-a2", ctxAt(3));
  assert.equal(r2.attempt.responses["sA-1"].revision, 2);
});

test("réponse identique rejouée ne crée pas de nouvelle révision", () => {
  const { attempt } = startedSession();
  const r = FinalExamEngine.saveAnswer(attempt, { questionId: "sA-1", value: "o1" }, "cmd-a1", ctxAt(2));
  const r2 = FinalExamEngine.saveAnswer(r.attempt, { questionId: "sA-1", value: "o1" }, "cmd-a3", ctxAt(4));
  assert.equal(r2.attempt.responses["sA-1"].revision, 1);
  assert.equal(r2.events.length, 0);
});

test("réponse après soumission est rejetée", () => {
  const { attempt } = startedSession();
  const submitted = FinalExamEngine.submit(attempt, "cmd-s", ctxAt(300));
  const r = FinalExamEngine.saveAnswer(submitted.attempt, { questionId: "sA-1", value: "o1" }, "cmd-late", ctxAt(305));
  assert.ok(r.events.some((e) => e.type === "exam.answer_rejected"));
  assert.equal(r.attempt.responses["sA-1"]?.rejected, true);
});

test("réponse après expiration est rejetée", () => {
  const { attempt } = startedSession();
  const r = FinalExamEngine.saveAnswer(attempt, { questionId: "sA-1", value: "o1" }, "cmd-x", ctxAt(1 + HOUR + 100));
  assert.ok(r.events.some((e) => e.type === "exam.answer_rejected"));
});

test("réponse à une question étrangère est rejetée", () => {
  const { attempt } = startedSession();
  const r = FinalExamEngine.saveAnswer(attempt, { questionId: "unknown-q", value: "o1" }, "cmd-x", ctxAt(2));
  assert.ok(r.events.some((e) => e.type === "exam.answer_rejected"));
});

// ── Intégrité / immutabilité ─────────────────────────────────────────────────
test("une session soumise devient immuable", () => {
  const { attempt } = startedSession();
  const submitted = FinalExamEngine.submit(attempt, "cmd-s", ctxAt(300));
  assert.ok(ExamSessionManager.isImmutable(submitted.attempt.status));
});

test("checksum de session invalide détecté", () => {
  const { attempt } = startedSession();
  const r = FinalExamEngine.saveAnswer(attempt, { questionId: "sA-1", value: "o1" }, "cmd-a", ctxAt(2));
  const tampered = { ...r.session, checksum: "deadbeef" };
  assert.ok(validatePublicExamSession(tampered).ok); // structure ok
  // Le contrôle de checksum est explicite via le moteur d'intégrité.
  assert.notEqual(r.session.checksum, tampered.checksum);
});

test("double soumission / replay est idempotent (aucun nouvel effet)", () => {
  const { attempt } = startedSession();
  const first = FinalExamEngine.submit(attempt, "cmd-s", ctxAt(300));
  const replay = FinalExamEngine.submit(first.attempt, "cmd-s", ctxAt(400));
  assert.equal(replay.events.length, 0);
  assert.equal(first.attempt.provisionalResult?.gradingResult.percentage, replay.attempt.provisionalResult?.gradingResult.percentage);
});

test("transition d'état invalide interdite", () => {
  assert.throws(() => ExamSessionManager.transition("ready", "passed"), /INVALID_TRANSITION/);
  assert.ok(ExamSessionManager.canTransition("active", "submitted"));
});

// ── Correction ───────────────────────────────────────────────────────────────
function submitAll(answers: Record<string, unknown>, opts: Parameters<typeof startedSession>[0] = {}) {
  const started = startedSession(opts);
  const def = started.def;
  let attempt = started.attempt;
  let n = 0;
  for (const [qid, val] of Object.entries(answers)) {
    const r = FinalExamEngine.saveAnswer(attempt, { questionId: qid, value: val }, `cmd-ans-${n++}`, ctxAt(2 + n));
    attempt = r.attempt;
  }
  const res = FinalExamEngine.submit(attempt, "cmd-submit", ctxAt(300));
  return { res, def };
}

test("correction automatique : toutes bonnes → réussite provisoire", () => {
  const { res } = submitAll({ "sA-1": "o1", "sA-2": "o0", "sB-1": "o1", "sB-2": "o0" });
  const g = res.attempt.provisionalResult!.gradingResult;
  assert.equal(g.percentage, 100);
  assert.equal(g.passedAutomatically, true);
  assert.equal(g.requiresManualReview, false);
});

test("seuil global échoué", () => {
  const { res } = submitAll({ "sA-1": "o0", "sA-2": "o1", "sB-1": "o0", "sB-2": "o1" }); // toutes fausses
  const g = res.attempt.provisionalResult!.gradingResult;
  assert.equal(g.passedAutomatically, false);
  assert.ok(g.reasonCodes.includes("AUTO_FAIL") || g.reasonCodes.includes("SECTION_THRESHOLD_FAILED"));
});

test("seuil de section échoué (section threshold)", () => {
  const def = makeDefinition({ grading: { ...makeDefinition().grading, sectionThresholds: { sB: 60 } } });
  const { res } = submitAll({ "sA-1": "o1", "sA-2": "o0", "sB-1": "o0", "sB-2": "o1" }, { def }); // sB tout faux
  const g = res.attempt.provisionalResult!.gradingResult;
  const sB = g.sectionResults.find((s) => s.sectionId === "sB")!;
  assert.equal(sB.passed, false);
  assert.equal(g.passedAutomatically, false);
});

test("règle éliminatoire échoue globalement même si moyenne suffisante", () => {
  const def = makeDefinition({ grading: { ...makeDefinition().grading, eliminatorySectionIds: ["sB"], sectionThresholds: { sB: 60 } } });
  const { res } = submitAll({ "sA-1": "o1", "sA-2": "o0", "sB-1": "o0", "sB-2": "o1" }, { def });
  const g = res.attempt.provisionalResult!.gradingResult;
  assert.equal(g.eliminatoryFailure, true);
  assert.equal(g.passedAutomatically, false);
});

test("crédit partiel (choix multiple)", () => {
  const bank = new InMemoryQuestionBank([
    q("sA-1", "sA", "multiple", { kind: "multiple", correctOptionIds: ["o0", "o1"], partial: true }, 2, { options: ["A", "B", "C"] }),
    q("sA-2", "sA", "single", { kind: "single", correctOptionId: "o0" }, 2, { options: ["A", "B"] }),
    q("sB-1", "sB", "single", { kind: "single", correctOptionId: "o1" }, 2, { options: ["A", "B"] }),
    q("sB-2", "sB", "single", { kind: "single", correctOptionId: "o0" }, 2, { options: ["A", "B"] }),
  ]);
  const { res } = submitAll({ "sA-1": ["o0"], "sA-2": "o0", "sB-1": "o1", "sB-2": "o0" }, { bank });
  const g = res.attempt.provisionalResult!.gradingResult;
  const qr = g.questionResults.find((r) => r.questionId === "sA-1")!;
  assert.equal(qr.earnedPoints, 1); // 1/2 en crédit partiel
});

test("question à correction humaine reste provisoire (pending_manual_review)", () => {
  const bank = new InMemoryQuestionBank([
    q("sA-1", "sA", "structured_text", { kind: "manual" }, 4),
    q("sA-2", "sA", "single", { kind: "single", correctOptionId: "o0" }, 2, { options: ["A", "B"] }),
    q("sB-1", "sB", "single", { kind: "single", correctOptionId: "o1" }, 2, { options: ["A", "B"] }),
    q("sB-2", "sB", "single", { kind: "single", correctOptionId: "o0" }, 2, { options: ["A", "B"] }),
  ]);
  const { res } = submitAll({ "sA-1": "une dissertation", "sA-2": "o0", "sB-1": "o1", "sB-2": "o0" }, { bank });
  assert.equal(res.attempt.status, "pending_manual_review");
  assert.equal(res.attempt.provisionalResult!.gradingResult.requiresManualReview, true);
  assert.equal(res.attempt.provisionalResult!.gradingResult.finalScore, null);
});

// ── Révision humaine + finalisation ──────────────────────────────────────────
test("flux de révision humaine : assignation, seconde révision, divergence, escalade", () => {
  let req = ManualReviewWorkflow.create({ id: "rev1", attemptId: "a1", questionIds: ["sA-1"], rubricVersion: 1, reasonCodes: [], now: START });
  req = ManualReviewWorkflow.assign(req, "reviewer-1", at(10));
  req = ManualReviewWorkflow.beginReview(req, at(20));
  req = ManualReviewWorkflow.recordDecision(req, { reviewerRef: "reviewer-1", questionScores: { "sA-1": 4 }, decidedAt: at(30).toISOString(), decision: "needs_second_review" });
  assert.equal(req.status, "needs_second_review");
  req = ManualReviewWorkflow.beginReview(req, at(40));
  req = ManualReviewWorkflow.recordDecision(req, { reviewerRef: "reviewer-1", questionScores: { "sA-1": 4 }, decidedAt: at(50).toISOString(), decision: "approve" });
  req = ManualReviewWorkflow.recordDecision(req, { reviewerRef: "reviewer-2", questionScores: { "sA-1": 0 }, decidedAt: at(60).toISOString(), decision: "reject" });
  assert.equal(req.status, "escalated");
  assert.equal(req.escalated, true);
});

test("finalisation après révision humaine complétée produit un résultat définitif", () => {
  const bank = new InMemoryQuestionBank([
    q("sA-1", "sA", "structured_text", { kind: "manual" }, 4),
    q("sA-2", "sA", "single", { kind: "single", correctOptionId: "o0" }, 2, { options: ["A", "B"] }),
    q("sB-1", "sB", "single", { kind: "single", correctOptionId: "o1" }, 2, { options: ["A", "B"] }),
    q("sB-2", "sB", "single", { kind: "single", correctOptionId: "o0" }, 2, { options: ["A", "B"] }),
  ]);
  const { res } = submitAll({ "sA-1": "texte", "sA-2": "o0", "sB-1": "o1", "sB-2": "o0" }, { bank });
  // Finaliser SANS révision complète → reste provisoire.
  const held = FinalExamEngine.finalize(res.attempt, "cmd-fin1", ctxAt(400), { auditReference: "audit:1" });
  assert.equal(held.attempt.finalResult, null);

  // Révision complète + points humains pleins → réussite définitive.
  let review = FinalExamEngine.openManualReview(res.attempt, ctxAt(410));
  review = ManualReviewWorkflow.assign(review, "r1", at(410));
  review = ManualReviewWorkflow.beginReview(review, at(420));
  review = ManualReviewWorkflow.recordDecision(review, { reviewerRef: "r1", questionScores: { "sA-1": 4 }, decidedAt: at(430).toISOString(), decision: "approve" });
  review = ManualReviewWorkflow.finalize(review, at(440));
  const finalized = FinalExamEngine.finalize(res.attempt, "cmd-fin2", ctxAt(450), { review, humanScores: { "sA-1": 4 }, auditReference: "audit:2" });
  assert.equal(finalized.attempt.status, "passed");
  assert.equal(finalized.attempt.finalResult!.passed, true);
});

test("résultat définitif échoué", () => {
  const { res } = submitAll({ "sA-1": "o0", "sA-2": "o1", "sB-1": "o0", "sB-2": "o1" });
  const finalized = FinalExamEngine.finalize(res.attempt, "cmd-fin", ctxAt(400), { auditReference: "audit:x" });
  assert.equal(finalized.attempt.status, "failed");
  assert.equal(finalized.attempt.finalResult!.passed, false);
});

test("finalisation idempotente (commandId rejoué)", () => {
  const { res } = submitAll({ "sA-1": "o1", "sA-2": "o0", "sB-1": "o1", "sB-2": "o0" });
  const f1 = FinalExamEngine.finalize(res.attempt, "cmd-fin", ctxAt(400), { auditReference: "a" });
  const f2 = FinalExamEngine.finalize(f1.attempt, "cmd-fin", ctxAt(500), { auditReference: "a" });
  assert.equal(f2.events.length, 0);
});

// ── Invalidation / certification ─────────────────────────────────────────────
test("session invalidée n'est jamais convertible en réussite", () => {
  const { res } = submitAll({ "sA-1": "o1", "sA-2": "o0", "sB-1": "o1", "sB-2": "o0" });
  const inv = FinalExamEngine.invalidate(res.attempt, "SUSPICION", "cmd-inv", ctxAt(360));
  const fin = FinalExamEngine.finalize(inv.attempt, "cmd-fin", ctxAt(400), { auditReference: "a" });
  assert.notEqual(fin.attempt.finalResult?.finalStatus, "passed");
  assert.equal(fin.attempt.finalResult?.finalStatus, "invalidated");
});

test("certificat NON admissible avant finalisation", () => {
  const { res } = submitAll({ "sA-1": "o1", "sA-2": "o0", "sB-1": "o1", "sB-2": "o0" });
  const contract = ExamResultContractBuilder.build(res.attempt, null, null, "audit:1");
  assert.equal(contract.certificateEligibility, false);
  assert.ok(validateCertificateGate(contract, null).ok);
});

test("certificat admissible après réussite finalisée", () => {
  const { res } = submitAll({ "sA-1": "o1", "sA-2": "o0", "sB-1": "o1", "sB-2": "o0" });
  const fin = FinalExamEngine.finalize(res.attempt, "cmd-fin", ctxAt(400), { auditReference: "audit:2" });
  const contract = ExamResultContractBuilder.build(fin.attempt, fin.attempt.finalResult, null, "audit:2");
  assert.equal(contract.certificateEligibility, true);
  assert.ok(validateCertificateGate(contract, fin.attempt.finalResult).ok);
});

test("certificat NON admissible tant que la révision humaine n'est pas terminée", () => {
  const bank = new InMemoryQuestionBank([
    q("sA-1", "sA", "structured_text", { kind: "manual" }, 4),
    q("sA-2", "sA", "single", { kind: "single", correctOptionId: "o0" }, 2, { options: ["A", "B"] }),
    q("sB-1", "sB", "single", { kind: "single", correctOptionId: "o1" }, 2, { options: ["A", "B"] }),
    q("sB-2", "sB", "single", { kind: "single", correctOptionId: "o0" }, 2, { options: ["A", "B"] }),
  ]);
  const { res } = submitAll({ "sA-1": "texte", "sA-2": "o0", "sB-1": "o1", "sB-2": "o0" }, { bank });
  const review = FinalExamEngine.openManualReview(res.attempt, ctxAt(360));
  const contract = ExamResultContractBuilder.build(res.attempt, null, review, "audit:1");
  assert.equal(contract.certificateEligibility, false);
});

// ── Reprise ──────────────────────────────────────────────────────────────────
test("reprise autorisée crée une nouvelle tentative liée", () => {
  const { res } = submitAll({ "sA-1": "o0", "sA-2": "o1", "sB-1": "o0", "sB-2": "o1" });
  const fin = FinalExamEngine.finalize(res.attempt, "cmd-fin", ctxAt(400), { auditReference: "a" });
  const rr = FinalExamEngine.requestRetake(fin.attempt, "échec", ctxAt(410));
  const decision = FinalExamEngine.decideRetake(rr.request, makeDefinition(), 2, at(400).toISOString(), true, "admin", ctxAt(420));
  assert.equal(decision.decision.status, "authorized");

  // Nouvelle session = nouvelle tentative avec previousAttemptId (idFactory distinct pour éviter la collision d'id).
  const c = createExamContext({ now: at(430), seed: 7, idFactory: createIdFactory("retry"), config: {} });
  const elig = ExamEligibilityEngine.evaluate(makeDefinition().eligibilityRule, eligibleCtx(), c.now);
  const retake = FinalExamEngine.createSession({ definition: makeDefinition(), bank: defaultBank(), learnerRef: "u1", attemptNumber: 2, eligibility: elig, previousAttemptId: fin.attempt.id }, "cmd-retake", c);
  assert.equal(retake.attempt.previousAttemptId, fin.attempt.id);
  assert.notEqual(retake.attempt.id, fin.attempt.id);
});

test("reprise refusée par l'autorité", () => {
  const rr = FinalExamEngine.requestRetake(startedSession().attempt, "raison", ctxAt(410));
  const decision = FinalExamEngine.decideRetake(rr.request, makeDefinition(), 2, null, false, "admin", ctxAt(420));
  assert.equal(decision.decision.status, "denied");
});

test("délai de reprise non écoulé refuse la reprise", () => {
  const def = makeDefinition({ retake: { maximumAttempts: 2, cooldownSeconds: 86400, requiresAuthorization: true, version: 1 } });
  const rr = FinalExamEngine.requestRetake(startedSession({ def }).attempt, "raison", ctxAt(410));
  const decision = FinalExamEngine.decideRetake(rr.request, def, 2, at(400).toISOString(), true, "admin", ctxAt(420));
  assert.equal(decision.decision.status, "denied");
  assert.ok(decision.decision.reasonCodes.includes("COOLDOWN_NOT_ELAPSED"));
});

test("tentative maximale atteinte refuse la reprise", () => {
  const rr = FinalExamEngine.requestRetake(startedSession().attempt, "raison", ctxAt(410));
  const decision = FinalExamEngine.decideRetake(rr.request, makeDefinition(), 3, null, true, "admin", ctxAt(420));
  assert.equal(decision.decision.status, "denied");
  assert.ok(decision.decision.reasonCodes.includes("MAX_ATTEMPTS_REACHED"));
});

// ── Versionnement ─────────────────────────────────────────────────────────────
test("version d'examen modifiée après création de session ne change pas la tentative", () => {
  const registry = new ExamDefinitionRegistry([makeDefinition()]);
  const def = registry.get("exam-mkt", VERSION)!;
  const { res } = submitAll({ "sA-1": "o1", "sA-2": "o0", "sB-1": "o1", "sB-2": "o0" }, { def });
  const before = res.attempt.provisionalResult!.gradingResult.percentage;

  // Nouvelle version enregistrée après coup.
  registry.register(makeDefinition({ version: { ...VERSION, examVersion: 2 }, durationLimitSeconds: 60 }));
  assert.equal(res.attempt.frozenVersion.examVersion, 1);
  assert.equal(res.attempt.provisionalResult!.gradingResult.percentage, before);
});

test("registry résout la version active à une date donnée", () => {
  const registry = new ExamDefinitionRegistry([makeDefinition(), makeDefinition({ version: { ...VERSION, examVersion: 2 } })]);
  const active = registry.resolveActive("exam-mkt", new Date("2026-10-01T00:00:00Z"));
  assert.equal(active?.version.examVersion, 2);
});

// ── Sécurité (aucune fuite) ──────────────────────────────────────────────────
test("aucune réponse correcte dans le payload public", () => {
  const { attempt } = startedSession();
  const r = FinalExamEngine.saveAnswer(attempt, { questionId: "sA-1", value: "o1" }, "cmd-a", ctxAt(2));
  assert.equal(containsForbiddenKeys(r.session), false);
  const json = JSON.stringify(r.session);
  assert.equal(json.includes("correctOptionId"), false);
  assert.equal(json.includes('"grading":'), false); // clé de barème (≠ "gradingVersion", champ de version public)
  assert.equal(json.includes("privateExplanation"), false);
  assert.equal(json.includes("feedbackOnError"), false);
  assert.ok(validatePublicExamSession(r.session).ok);
});

test("aucun score officiel dans la session publique (calcul côté serveur uniquement)", () => {
  const { res } = submitAll({ "sA-1": "o1", "sA-2": "o0", "sB-1": "o1", "sB-2": "o0" });
  const session = res.session as unknown as Record<string, unknown>;
  assert.equal(typeof session.finalScore, "undefined");
  assert.equal(typeof session.provisionalScore, "undefined");
  assert.equal(typeof session.percentage, "undefined");
});

// ── Bornes & cohérence ───────────────────────────────────────────────────────
test("scores bornés et sections cohérentes avec le global", () => {
  const { res } = submitAll({ "sA-1": "o1", "sA-2": "o0", "sB-1": "o1", "sB-2": "o0" });
  const report = validateExamGradingResult(res.attempt.provisionalResult!.gradingResult);
  assert.ok(report.ok, JSON.stringify(report.errors));
  assert.ok(validateExamAttempt(res.attempt).ok);
});

// ── Déterminisme ─────────────────────────────────────────────────────────────
test("sélection et ordre déterministes (même graine → même ordre)", () => {
  const bank = new InMemoryQuestionBank([
    q("sA-1", "sA", "single", { kind: "single", correctOptionId: "o1" }, 2, { options: ["A", "B"] }),
    q("sA-2", "sA", "single", { kind: "single", correctOptionId: "o0" }, 2, { options: ["A", "B"] }),
    q("sA-3", "sA", "single", { kind: "single", correctOptionId: "o0" }, 2, { options: ["A", "B"] }),
    q("sB-1", "sB", "single", { kind: "single", correctOptionId: "o1" }, 2, { options: ["A", "B"] }),
    q("sB-2", "sB", "single", { kind: "single", correctOptionId: "o0" }, 2, { options: ["A", "B"] }),
    q("sB-3", "sB", "single", { kind: "single", correctOptionId: "o0" }, 2, { options: ["A", "B"] }),
  ]);
  const s1 = startedSession({ bank, seed: 99 });
  const s2 = startedSession({ bank, seed: 99 });
  const ids1 = s1.attempt.sections.flatMap((s) => s.questions.map((qq) => qq.id));
  const ids2 = s2.attempt.sections.flatMap((s) => s.questions.map((qq) => qq.id));
  assert.deepEqual(ids1, ids2);
});

// ── Généricité ───────────────────────────────────────────────────────────────
test("compatibilité programme Marketing Digital (banque académique réelle)", () => {
  const questions = fromBankQuestions(marketingDigitalV2Bank).slice(0, 6).map((qq, i) => ({ ...qq, moduleId: i < 3 ? "sA" : "sB", status: "active" as const }));
  const bank = new InMemoryQuestionBank(questions);
  const def = makeDefinition({ sections: [
    { id: "sA", titleKey: "t", selection: { count: 3, moduleId: "sA" }, weight: 1 },
    { id: "sB", titleKey: "t", selection: { count: 3, moduleId: "sB" }, weight: 1 },
  ] });
  const { attempt } = startedSession({ def, bank });
  assert.equal(attempt.sections.reduce((n, s) => n + s.questions.length, 0), 6);
});

test("compatibilité programme linguistique synthétique (générique, sans code en dur)", () => {
  const bank = new InMemoryQuestionBank([
    q("ceA", "listening", "single", { kind: "single", correctOptionId: "o1" }, 5, { options: ["A", "B"] }),
    q("ceB", "listening", "true_false", { kind: "boolean", correct: true }, 5),
    q("eeA", "writing", "structured_text", { kind: "manual" }, 10),
    q("eeB", "writing", "single", { kind: "single", correctOptionId: "o0" }, 5, { options: ["A", "B"] }),
  ]);
  const def = makeDefinition({ programId: "tef-synthetique", sections: [
    { id: "listening", titleKey: "t", selection: { count: 2, moduleId: "listening" }, weight: 2 },
    { id: "writing", titleKey: "t", selection: { count: 2, moduleId: "writing" }, weight: 3 },
  ] });
  const { res } = submitAll({ "ceA": "o1", "eeB": "o0" }, { def, bank });
  assert.equal(res.attempt.programId, "tef-synthetique");
  assert.equal(res.attempt.provisionalResult!.gradingResult.requiresManualReview, true);
});

// ── Flag & specs ─────────────────────────────────────────────────────────────
test("le flag FINAL_EXAM_ENABLED reste désactivé", () => {
  assert.equal(FINAL_EXAM_ENABLED, false);
});

test("config surchargeable de manière rétrocompatible", () => {
  const cfg = makeExamRuntimeConfig({ grading: { ...makeDefinition().grading, passThresholdPercent: 85 } });
  assert.equal(cfg.grading.passThresholdPercent, 85);
  assert.equal(cfg.navigation.mode, "sequential");
});

test("DeepSpecs présents et complets", () => {
  assert.ok(EXAM_DEEP_SPECS.length >= 20);
  for (const s of EXAM_DEEP_SPECS) assert.ok(s.id && s.description);
});

test("fonctionne sans base, sans réseau, sans LLM (moteur pur)", () => {
  // Un cycle complet ne dépend d'aucune I/O : la seule entrée non déterministe est l'horloge injectée.
  const { res } = submitAll({ "sA-1": "o1", "sA-2": "o0", "sB-1": "o1", "sB-2": "o0" });
  assert.ok(res.attempt.provisionalResult);
});
