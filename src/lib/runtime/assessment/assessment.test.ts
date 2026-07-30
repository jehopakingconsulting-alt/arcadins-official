import { test } from "node:test";
import assert from "node:assert/strict";
import { marketingDigitalV2Bank } from "../../academic/question-bank/marketing-digital-v2.ts";
import type { AssessmentConfig, AssessmentDefinition, GradingRule, PrivateQuestion, QuestionType } from "./types.ts";
import { InMemoryQuestionBank, fromBankQuestions } from "./question-bank.ts";
import { QuestionSelector } from "./question-selector.ts";
import { AssessmentEngine } from "./assessment-engine.ts";
import { createAssessmentContext, createIdFactory, makeAssessmentConfig, FORMATIVE_ASSESSMENT_ENABLED } from "./config.ts";
import { toPublicQuestion, containsForbiddenKeys, toPublicQuestions } from "./public-serializer.ts";
import { validatePublicSession, validateGradingResult } from "./validation.ts";
import { AssessmentIntegrity } from "./assessment-integrity.ts";
import { ASSESSMENT_DEEP_SPECS } from "./specs.ts";

const NOW = new Date("2026-09-01T10:00:00Z");

function q(
  id: string,
  type: QuestionType,
  grading: GradingRule,
  points = 1,
  opts: { options?: string[]; competencyId?: string; lessonId?: string; status?: PrivateQuestion["status"]; difficulty?: PrivateQuestion["difficulty"] } = {},
): PrivateQuestion {
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
    lessonId: opts.lessonId,
    status: opts.status ?? "active",
    privateExplanation: "explication privée",
    feedbackOnError: "indice privé",
  };
}

function runQuiz(questions: PrivateQuestion[], answers: Record<string, unknown>, cfg?: Partial<AssessmentConfig>) {
  const bank = new InMemoryQuestionBank(questions);
  const def: AssessmentDefinition = { id: "as1", programId: "p", version: 1, selection: { count: questions.length } };
  const ctx = createAssessmentContext({ now: NOW, seed: 7, idFactory: createIdFactory("att"), config: cfg });
  let { attempt, session } = AssessmentEngine.createAttempt({ definition: def, bank, learnerRef: "u1", priorAttempts: 0, ctx });
  for (const [qid, val] of Object.entries(answers)) {
    const r = AssessmentEngine.saveAnswer(attempt, session, { questionId: qid, value: val }, ctx);
    attempt = r.attempt;
    session = r.session;
  }
  return { ...AssessmentEngine.submit(attempt, session, "cmd-1", ctx), ctx, bank, def };
}

// ── Types de questions ──
test("choix unique : correct / incorrect", () => {
  const questions = [q("q1", "single", { kind: "single", correctOptionId: "o1" }, 1, { options: ["A", "B"] })];
  assert.equal(runQuiz(questions, { q1: "o1" }).result!.passed, true);
  assert.equal(runQuiz(questions, { q1: "o0" }).result!.passed, false);
});

test("choix multiple : crédit total puis partiel", () => {
  const questions = [q("q1", "multiple", { kind: "multiple", correctOptionIds: ["o0", "o1"], partial: true }, 2, { options: ["A", "B", "C"] })];
  assert.equal(runQuiz(questions, { q1: ["o0", "o1"] }).result!.earnedPoints, 2);
  assert.equal(runQuiz(questions, { q1: ["o0"] }).result!.earnedPoints, 1);
  assert.equal(runQuiz(questions, { q1: ["o0", "o2"] }).result!.earnedPoints, 0);
});

test("vrai/faux", () => {
  const questions = [q("q1", "true_false", { kind: "boolean", correct: true }, 1)];
  assert.equal(runQuiz(questions, { q1: "true" }).result!.passed, true);
  assert.equal(runQuiz(questions, { q1: false }).result!.passed, false);
});

test("réponse courte : casse et accents ignorés", () => {
  const questions = [q("q1", "short_answer", { kind: "text", accepted: ["Réponse"] }, 1)];
  assert.equal(runQuiz(questions, { q1: "  reponse " }).result!.passed, true);
});

test("réponse numérique avec tolérance", () => {
  const questions = [q("q1", "numeric", { kind: "numeric", value: 10, tolerance: 0.5 }, 1)];
  assert.equal(runQuiz(questions, { q1: 10.3 }).result!.passed, true);
  assert.equal(runQuiz(questions, { q1: 12 }).result!.passed, false);
});

test("association : crédit partiel", () => {
  const questions = [q("q1", "matching", { kind: "matching", pairs: [["a", "1"], ["b", "2"]], partial: true }, 2)];
  assert.equal(runQuiz(questions, { q1: [["a", "1"]] }).result!.earnedPoints, 1);
});

test("classement : crédit partiel par position", () => {
  const questions = [q("q1", "ordering", { kind: "ordering", order: ["x", "y", "z"], partial: true }, 3)];
  assert.equal(runQuiz(questions, { q1: ["x", "z", "y"] }).result!.earnedPoints, 1);
});

test("révision manuelle : statut pending, résultat provisoire", () => {
  const questions = [q("q1", "structured_text", { kind: "manual" }, 5)];
  const r = runQuiz(questions, { q1: "un long texte" }).result!;
  assert.equal(r.requiresManualReview, true);
  assert.equal(r.provisional, true);
  assert.equal(r.questionResults[0].gradingStatus, "pending_manual_review");
  assert.equal(r.questionResults[0].correct, null);
});

// ── Résultats & bornes ──
test("tentative réussie et échouée (seuil 70%)", () => {
  const questions = [
    q("q1", "single", { kind: "single", correctOptionId: "o0" }, 1, { options: ["A", "B"] }),
    q("q2", "single", { kind: "single", correctOptionId: "o0" }, 1, { options: ["A", "B"] }),
  ];
  assert.equal(runQuiz(questions, { q1: "o0", q2: "o0" }).result!.passed, true);
  assert.equal(runQuiz(questions, { q1: "o0", q2: "o1" }).result!.passed, false);
  const r = runQuiz(questions, { q1: "o0", q2: "o0" }).result!;
  assert.equal(validateGradingResult(r).ok, true);
});

test("soumission vide et réponse mal formée", () => {
  const questions = [q("q1", "single", { kind: "single", correctOptionId: "o0" }, 1, { options: ["A", "B"] })];
  assert.equal(runQuiz(questions, {}).result!.earnedPoints, 0); // vide
  assert.equal(runQuiz(questions, { q1: { weird: true } }).result!.earnedPoints, 0); // mal formé
});

// ── Intégrité ──
test("réponse à une question étrangère : rejetée (non enregistrée)", () => {
  const questions = [q("q1", "single", { kind: "single", correctOptionId: "o0" }, 1, { options: ["A", "B"] })];
  const bank = new InMemoryQuestionBank(questions);
  const def: AssessmentDefinition = { id: "as1", programId: "p", version: 1, selection: { count: 1 } };
  const ctx = createAssessmentContext({ now: NOW, seed: 1 });
  const { attempt, session } = AssessmentEngine.createAttempt({ definition: def, bank, learnerRef: "u1", priorAttempts: 0, ctx });
  const r = AssessmentEngine.saveAnswer(attempt, session, { questionId: "etranger", value: "o0" }, ctx);
  assert.equal(Object.keys(r.attempt.responses).length, 0);
  assert.equal(r.events[0].type, "assessment.integrity_warning");
});

test("double soumission / replay : idempotent, une seule notation", () => {
  const questions = [q("q1", "single", { kind: "single", correctOptionId: "o0" }, 1, { options: ["A", "B"] })];
  const bank = new InMemoryQuestionBank(questions);
  const def: AssessmentDefinition = { id: "as1", programId: "p", version: 1, selection: { count: 1 } };
  const ctx = createAssessmentContext({ now: NOW, seed: 1 });
  let { attempt, session } = AssessmentEngine.createAttempt({ definition: def, bank, learnerRef: "u1", priorAttempts: 0, ctx });
  ({ attempt, session } = AssessmentEngine.saveAnswer(attempt, session, { questionId: "q1", value: "o0" }, ctx));
  const first = AssessmentEngine.submit(attempt, session, "cmd-1", ctx);
  const second = AssessmentEngine.submit(first.attempt, first.session, "cmd-1", ctx);
  assert.deepEqual(second.result, first.result);
  assert.equal(second.events.length, 0); // aucun événement dupliqué
  assert.equal(AssessmentIntegrity.isReplay(first.attempt, "cmd-1"), true);
});

test("tentative expirée : rejet de la soumission tardive", () => {
  const cfg = makeAssessmentConfig({ policy: makeAssessmentConfig().policy });
  const questions = [q("q1", "single", { kind: "single", correctOptionId: "o0" }, 1, { options: ["A", "B"] })];
  const bank = new InMemoryQuestionBank(questions);
  const def: AssessmentDefinition = { id: "as1", programId: "p", version: 1, selection: { count: 1 } };
  const startCtx = createAssessmentContext({ now: NOW, seed: 1, config: { policy: { ...cfg.policy, timing: { durationLimitSeconds: 60, lateSubmission: "reject", extraTimeSeconds: 0 } } } });
  const { attempt, session } = AssessmentEngine.createAttempt({ definition: def, bank, learnerRef: "u1", priorAttempts: 0, ctx: startCtx });
  const lateCtx = createAssessmentContext({ now: new Date(NOW.getTime() + 120_000), seed: 1, config: startCtx.config });
  const r = AssessmentEngine.submit(attempt, session, "cmd-1", lateCtx);
  assert.equal(r.attempt.status, "expired");
  assert.equal(r.result, null);
});

test("abandon : statut abandoned", () => {
  const questions = [q("q1", "single", { kind: "single", correctOptionId: "o0" }, 1, { options: ["A", "B"] })];
  const bank = new InMemoryQuestionBank(questions);
  const def: AssessmentDefinition = { id: "as1", programId: "p", version: 1, selection: { count: 1 } };
  const ctx = createAssessmentContext({ now: NOW, seed: 1 });
  const { attempt } = AssessmentEngine.createAttempt({ definition: def, bank, learnerRef: "u1", priorAttempts: 0, ctx });
  assert.equal(AssessmentEngine.abandon(attempt, ctx).attempt.status, "abandoned");
});

// ── Tentatives / reprises ──
test("dépassement du nombre de tentatives : refusé", () => {
  const questions = [q("q1", "single", { kind: "single", correctOptionId: "o0" }, 1, { options: ["A", "B"] })];
  const bank = new InMemoryQuestionBank(questions);
  const def: AssessmentDefinition = { id: "as1", programId: "p", version: 1, selection: { count: 1 } };
  const ctx = createAssessmentContext({ now: NOW, seed: 1 }); // maxAttempts défaut = 3
  assert.throws(() => AssessmentEngine.createAttempt({ definition: def, bank, learnerRef: "u1", priorAttempts: 3, ctx }));
});

test("délai entre reprises : refusé si cooldown actif", () => {
  const questions = [q("q1", "single", { kind: "single", correctOptionId: "o0" }, 1, { options: ["A", "B"] })];
  const bank = new InMemoryQuestionBank(questions);
  const def: AssessmentDefinition = { id: "as1", programId: "p", version: 1, selection: { count: 1 } };
  const ctx = createAssessmentContext({ now: NOW, seed: 1, config: { policy: { ...makeAssessmentConfig().policy, attempts: { maxAttempts: 3, cooldownSeconds: 3600 } } } });
  assert.throws(() => AssessmentEngine.createAttempt({ definition: def, bank, learnerRef: "u1", priorAttempts: 1, ctx, lastCompletedAt: NOW.toISOString() }));
});

test("pause autorisée puis interdite", () => {
  const questions = [q("q1", "single", { kind: "single", correctOptionId: "o0" }, 1, { options: ["A", "B"] })];
  const bank = new InMemoryQuestionBank(questions);
  const def: AssessmentDefinition = { id: "as1", programId: "p", version: 1, selection: { count: 1 } };
  const allowed = createAssessmentContext({ now: NOW, seed: 1 });
  const a1 = AssessmentEngine.createAttempt({ definition: def, bank, learnerRef: "u1", priorAttempts: 0, ctx: allowed });
  assert.equal(AssessmentEngine.pause(a1.attempt, a1.session, allowed).attempt.status, "paused");

  const forbidden = createAssessmentContext({ now: NOW, seed: 1, config: { policy: { ...makeAssessmentConfig().policy, navigation: { ...makeAssessmentConfig().policy.navigation, allowPause: false } } } });
  const a2 = AssessmentEngine.createAttempt({ definition: def, bank, learnerRef: "u1", priorAttempts: 0, ctx: forbidden });
  assert.equal(AssessmentEngine.pause(a2.attempt, a2.session, forbidden).events[0].type, "assessment.integrity_warning");
});

// ── Sélection ──
test("sélection déterministe : même graine → même sélection", () => {
  const questions = Array.from({ length: 10 }, (_, i) => q(`q${i}`, "single", { kind: "single", correctOptionId: "o0" }, 1, { options: ["A", "B"] }));
  const bank = new InMemoryQuestionBank(questions);
  const rule = { count: 4 };
  assert.deepEqual(QuestionSelector.select(bank, rule, 42).map((x) => x.id), QuestionSelector.select(bank, rule, 42).map((x) => x.id));
});

test("distribution par difficulté + exclusion des questions vues", () => {
  const questions = [
    q("e1", "single", { kind: "single", correctOptionId: "o0" }, 1, { options: ["A"], difficulty: "easy" }),
    q("h1", "single", { kind: "single", correctOptionId: "o0" }, 1, { options: ["A"], difficulty: "hard" }),
    q("h2", "single", { kind: "single", correctOptionId: "o0" }, 1, { options: ["A"], difficulty: "hard" }),
  ];
  const bank = new InMemoryQuestionBank(questions);
  const picked = QuestionSelector.select(bank, { count: 2, difficultyDistribution: { easy: 1, hard: 1 } }, 3);
  assert.equal(picked.length, 2);
  assert.ok(picked.some((x) => x.difficulty === "easy") && picked.some((x) => x.difficulty === "hard"));
  const excluded = QuestionSelector.select(bank, { count: 3, excludeIds: ["h1", "h2"] }, 3);
  assert.ok(!excluded.some((x) => x.id === "h1" || x.id === "h2"));
});

test("banque insuffisante : createAttempt échoue ; question archivée exclue", () => {
  const questions = [q("q1", "single", { kind: "single", correctOptionId: "o0" }, 1, { options: ["A"] }), q("q2", "single", { kind: "single", correctOptionId: "o0" }, 1, { options: ["A"], status: "archived" })];
  const bank = new InMemoryQuestionBank(questions);
  assert.equal(bank.all().length, 1); // archivée exclue
  const def: AssessmentDefinition = { id: "as1", programId: "p", version: 1, selection: { count: 5 } };
  assert.throws(() => AssessmentEngine.createAttempt({ definition: def, bank, learnerRef: "u1", priorAttempts: 0, ctx: createAssessmentContext({ now: NOW, seed: 1 }) }), /INSUFFICIENT_BANK/);
});

// ── Versionnement ──
test("version figée : modifier la banque après coup ne change pas le résultat", () => {
  const original = q("q1", "single", { kind: "single", correctOptionId: "o0" }, 1, { options: ["A", "B"] });
  const bank = new InMemoryQuestionBank([original]);
  const def: AssessmentDefinition = { id: "as1", programId: "p", version: 1, selection: { count: 1 } };
  const ctx = createAssessmentContext({ now: NOW, seed: 1 });
  let { attempt, session } = AssessmentEngine.createAttempt({ definition: def, bank, learnerRef: "u1", priorAttempts: 0, ctx });
  ({ attempt, session } = AssessmentEngine.saveAnswer(attempt, session, { questionId: "q1", value: "o0" }, ctx));
  // La banque change (nouvelle bonne réponse + version).
  original.grading = { kind: "single", correctOptionId: "o1" };
  original.version = 2;
  const r = AssessmentEngine.submit(attempt, session, "cmd-1", ctx);
  assert.equal(r.result!.passed, true); // corrigé sur la question FIGÉE (o0 correct)
  assert.equal(AssessmentIntegrity.checkVersions(attempt, (id) => (id === "q1" ? original : undefined)).ok, false);
});

// ── Confidentialité ──
test("aucune réponse correcte dans la question/session publique", () => {
  const priv = q("q1", "single", { kind: "single", correctOptionId: "o1" }, 1, { options: ["A", "B"] });
  const pub = toPublicQuestion(priv);
  assert.equal(containsForbiddenKeys(pub), false);
  assert.equal(JSON.stringify(pub).includes("correctOptionId"), false);

  const { session } = runQuiz([priv], { q1: "o0" });
  assert.equal(containsForbiddenKeys(session), false);
  assert.equal(validatePublicSession(session).ok, true);
  assert.equal(JSON.stringify(session).includes("correctOptionId"), false);
  assert.equal(JSON.stringify(session).includes("grading"), false);
});

// ── Rétroaction ──
test("rétroaction : immédiate vs instructor_release", () => {
  const questions = [q("q1", "single", { kind: "single", correctOptionId: "o0" }, 1, { options: ["A", "B"], competencyId: "C1", lessonId: "L1" })];
  const immediate = runQuiz(questions, { q1: "o1" }, { policy: { ...makeAssessmentConfig().policy, feedback: "immediate" } });
  assert.equal(immediate.feedback!.released, true);
  assert.equal(immediate.feedback!.disclosesAnswers, false);

  const held = runQuiz(questions, { q1: "o1" }, { policy: { ...makeAssessmentConfig().policy, feedback: "instructor_release" } });
  assert.equal(held.feedback!.released, false);
});

// ── Compétences / Journey ──
test("agrégation par compétence + signaux vers le Journey", () => {
  const questions = [
    q("q1", "single", { kind: "single", correctOptionId: "o0" }, 1, { options: ["A", "B"], competencyId: "C1" }),
    q("q2", "single", { kind: "single", correctOptionId: "o0" }, 1, { options: ["A", "B"], competencyId: "C1" }),
  ];
  const r = runQuiz(questions, { q1: "o0", q2: "o1" });
  const comp = r.result!.competencyResults.find((c) => c.competencyId === "C1")!;
  assert.equal(comp.questionsAssessed, 2);
  assert.equal(comp.score, 0.5);
  const signal = r.competencySignals.find((s) => s.competencyId === "C1")!;
  assert.equal(signal.evidenceCount, 2);
  assert.equal(signal.needsRemediation, true);
});

// ── Compatibilité programmes ──
test("compatibilité : banque Marketing Digital (adaptateur) + générique", () => {
  const bank = new InMemoryQuestionBank(fromBankQuestions(marketingDigitalV2Bank));
  assert.ok(bank.integrity().ok, JSON.stringify(bank.integrity().issues));
  const def: AssessmentDefinition = { id: "mkt-quiz", programId: "marketing-digital", version: 1, selection: { count: 5 } };
  const ctx = createAssessmentContext({ now: NOW, seed: 9 });
  const { attempt, session } = AssessmentEngine.createAttempt({ definition: def, bank, learnerRef: "u1", priorAttempts: 0, ctx });
  assert.equal(attempt.questions.length, 5);
  assert.equal(containsForbiddenKeys(session), false);
  assert.equal(JSON.stringify(toPublicQuestions(attempt.questions)).includes("grading"), false);
});

// ── Divers ──
test("le flag FORMATIVE_ASSESSMENT_ENABLED est désactivé", () => {
  assert.equal(FORMATIVE_ASSESSMENT_ENABLED, false);
});

test("les DeepSpecs de l'assessment sont documentées (>= 14)", () => {
  assert.ok(ASSESSMENT_DEEP_SPECS.length >= 14);
  assert.ok(ASSESSMENT_DEEP_SPECS.every((s) => s.id && s.description));
});
