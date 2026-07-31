import { test } from "node:test";
import assert from "node:assert/strict";
import type { AssessmentPolicy, GradingRule, PrivateQuestion, QuestionType } from "../../assessment/types.ts";
import type { QuizSubmittedEvent } from "../../types.ts";
import { InMemoryQuestionBank } from "../../assessment/question-bank.ts";
import { DEFAULT_ASSESSMENT_POLICY } from "../../assessment/config.ts";
import { marketingDigitalV2 } from "../../../academic/marketing-digital-v2.ts";
import { createStudentRuntime } from "../runtime/student-runtime.ts";
import { createQuizController, type QuizControllerOptions } from "./quiz-controller.ts";

// ── Fabriques déterministes ────────────────────────────────────────────────
function q(id: string, type: QuestionType, grading: GradingRule, opts: { options?: string[]; competencyId?: string; moduleId?: string; points?: number } = {}): PrivateQuestion {
  return {
    id,
    version: 1,
    type,
    difficulty: "medium",
    prompt: `Question ${id}`,
    options: opts.options?.map((label, i) => ({ id: `o${i}`, label })),
    points: opts.points ?? 1,
    grading,
    competencyId: opts.competencyId ?? "C1",
    moduleId: opts.moduleId ?? "1",
    status: "active",
    privateExplanation: "explication privée",
    feedbackOnError: "indice privé",
  };
}

/** 5 questions à choix unique de module "1", réponse correcte connue = "o0". */
function bank5(): InMemoryQuestionBank {
  return new InMemoryQuestionBank(
    Array.from({ length: 5 }, (_, i) =>
      q(`q${i}`, "single", { kind: "single", correctOptionId: "o0" }, { options: ["Bonne", "Mauvaise"], competencyId: `C${i}` }),
    ),
  );
}

function policy(overrides: Partial<AssessmentPolicy> = {}): AssessmentPolicy {
  return {
    ...DEFAULT_ASSESSMENT_POLICY,
    feedback: "no_answer_disclosure",
    ...overrides,
    attempts: { ...DEFAULT_ASSESSMENT_POLICY.attempts, ...(overrides.attempts ?? {}) },
    timing: { ...DEFAULT_ASSESSMENT_POLICY.timing, ...(overrides.timing ?? {}) },
    navigation: { ...DEFAULT_ASSESSMENT_POLICY.navigation, ...(overrides.navigation ?? {}) },
  };
}

const NOW = new Date("2026-09-01T10:00:00Z");
function baseOpts(over: Partial<QuizControllerOptions> = {}): QuizControllerOptions {
  return {
    definition: { id: "quiz-1", programId: "p", moduleId: "1", version: 1, selection: { count: 5, moduleId: "1" } },
    bank: bank5(),
    learnerRef: "secret-learner-42",
    lessonRef: "lesson-a",
    quizId: "quiz-1",
    now: () => NOW,
    seed: 7,
    policy: policy(),
    ...over,
  };
}

const FORBIDDEN = /correctOptionId|correctOptionIds|"grading"|privateExplanation|feedbackOnError|"accepted"|"correct":/;

// ── Session publique & anti-fuite ──────────────────────────────────────────
test("session publique : créée, questions publiques, AUCUNE clé privée", () => {
  const c = createQuizController(baseOpts());
  const s = c.startQuiz();
  assert.equal(s.total, 5);
  assert.equal(s.questions.length, 5);
  const json = JSON.stringify(s);
  assert.ok(!FORBIDDEN.test(json), "aucune bonne réponse / barème dans la session publique");
  // Aucune option ne porte de marqueur « correct ».
  for (const q of s.questions) for (const o of q.options ?? []) assert.deepEqual(Object.keys(o).sort(), ["id", "label"]);
});

test("session publique : ne divulgue pas la référence apprenant brute", () => {
  const c = createQuizController(baseOpts());
  const json = JSON.stringify(c.startQuiz());
  assert.ok(!json.includes("secret-learner-42"), "learnerRef brut jamais exposé");
});

// ── Saisie / modification ──────────────────────────────────────────────────
test("sélection puis modification d'une réponse", () => {
  const c = createQuizController(baseOpts());
  c.startQuiz();
  let s = c.selectAnswer("q0", "o1");
  assert.equal(s.answered, 1);
  s = c.updateAnswer("q0", "o0"); // modifie
  assert.equal(s.answered, 1);
  assert.ok(!FORBIDDEN.test(JSON.stringify(s)));
});

// ── Correction serveur : réussite / échec / incomplet ──────────────────────
test("soumission complète correcte → réussi (100%)", () => {
  const c = createQuizController(baseOpts());
  c.startQuiz();
  for (let i = 0; i < 5; i++) c.selectAnswer(`q${i}`, "o0");
  const { result } = c.submitQuiz();
  assert.equal(result.passed, true);
  assert.equal(result.scorePercent, 100);
  assert.equal(result.correctCount, 5);
  assert.equal(result.totalQuestions, 5);
  assert.equal(result.status, "passed");
});

test("soumission toutes mauvaises → échec (0%)", () => {
  const c = createQuizController(baseOpts());
  c.startQuiz();
  for (let i = 0; i < 5; i++) c.selectAnswer(`q${i}`, "o1");
  const { result } = c.submitQuiz();
  assert.equal(result.passed, false);
  assert.equal(result.scorePercent, 0);
  assert.equal(result.status, "failed");
  assert.equal(result.retryAvailable, true);
});

test("soumission incomplète → questions non répondues comptées fausses", () => {
  const c = createQuizController(baseOpts());
  c.startQuiz();
  c.selectAnswer("q0", "o0"); // une seule bonne réponse sur 5
  const { result } = c.submitQuiz();
  assert.equal(result.scorePercent, 20);
  assert.equal(result.passed, false);
});

test("crédit partiel (choix multiple)", () => {
  const b = new InMemoryQuestionBank([
    q("m0", "multiple", { kind: "multiple", correctOptionIds: ["o0", "o1"], partial: true }, { options: ["A", "B", "C"], points: 2 }),
  ]);
  const c = createQuizController(baseOpts({ bank: b, definition: { id: "q", programId: "p", moduleId: "1", version: 1, selection: { count: 1, moduleId: "1" } } }));
  c.startQuiz();
  c.selectAnswer("m0", ["o0"]); // moitié
  const { result } = c.submitQuiz();
  assert.equal(result.scorePercent, 50);
});

test("rétroaction PUBLIQUE présente, jamais de divulgation de réponse", () => {
  const c = createQuizController(baseOpts());
  c.startQuiz();
  for (let i = 0; i < 5; i++) c.selectAnswer(`q${i}`, "o0");
  const { result } = c.submitQuiz();
  assert.ok(result.feedbackKeys.length > 0);
  assert.ok(!FORBIDDEN.test(JSON.stringify(result)), "résultat public sans clé privée");
});

// ── Reprise ────────────────────────────────────────────────────────────────
test("reprise autorisée après échec (tentatives restantes)", () => {
  const c = createQuizController(baseOpts());
  c.startQuiz();
  c.selectAnswer("q0", "o1");
  c.submitQuiz();
  const r = c.retryQuiz();
  assert.equal(r.ok, true);
  assert.equal(c.getQuizState().phase, "in_progress");
});

test("reprise refusée quand tentatives épuisées", () => {
  const c = createQuizController(baseOpts({ policy: policy({ attempts: { maxAttempts: 1, cooldownSeconds: 0 } }) }));
  c.startQuiz();
  c.selectAnswer("q0", "o1");
  c.submitQuiz();
  const r = c.retryQuiz();
  assert.equal(r.ok, false);
  if (!r.ok) assert.match(r.reasonCode, /ATTEMPT|MAX|LIMIT|EXCEED/i);
});

test("reprise refusée après réussite (ALREADY_PASSED)", () => {
  const c = createQuizController(baseOpts());
  c.startQuiz();
  for (let i = 0; i < 5; i++) c.selectAnswer(`q${i}`, "o0");
  c.submitQuiz();
  const r = c.retryQuiz();
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.reasonCode, "ALREADY_PASSED");
});

// ── Expiration ─────────────────────────────────────────────────────────────
test("tentative expirée → refusée (aucune correction, statut expired)", () => {
  let t = new Date("2026-09-01T10:00:00Z").getTime();
  const c = createQuizController(baseOpts({ now: () => new Date(t), policy: policy({ timing: { durationLimitSeconds: 60, lateSubmission: "reject", extraTimeSeconds: 0 } }) }));
  c.startQuiz();
  c.selectAnswer("q0", "o0");
  t += 120_000; // +2 min > limite
  const { result } = c.submitQuiz();
  assert.equal(result.status, "expired");
  assert.equal(result.passed, false);
});

// ── Idempotence / double soumission ────────────────────────────────────────
test("idempotence : double soumission → un seul résultat, une seule progression", () => {
  const events: QuizSubmittedEvent[] = [];
  const c = createQuizController(baseOpts({ onProgress: (e) => events.push(e) }));
  c.startQuiz();
  for (let i = 0; i < 5; i++) c.selectAnswer(`q${i}`, "o0");
  const a = c.submitQuiz();
  const b = c.submitQuiz(); // re-soumission
  assert.deepEqual(a.result, b.result, "résultat immuable");
  assert.equal(events.length, 1, "progression dispatchée une seule fois");
});

// ── Anti-falsification ─────────────────────────────────────────────────────
test("le client ne peut PAS imposer son score : score = moteur", () => {
  const events: QuizSubmittedEvent[] = [];
  const c = createQuizController(baseOpts({ onProgress: (e) => events.push(e) }));
  c.startQuiz();
  // Réponses volontairement fausses : le client ne peut rien « déclarer ».
  for (let i = 0; i < 5; i++) c.selectAnswer(`q${i}`, "o1");
  const { result } = c.submitQuiz();
  assert.equal(result.scorePercent, 0);
  assert.equal(result.passed, false);
  assert.equal(events[0].score, 0, "la progression porte le score MOTEUR, pas un score client");
  // Aucune API pour fixer score/passed :
  assert.equal((c as unknown as Record<string, unknown>).setScore, undefined);
});

test("question étrangère (id falsifié) rejetée par le moteur : réponse NON enregistrée", () => {
  const c = createQuizController(baseOpts());
  c.startQuiz();
  const s = c.selectAnswer("question-inexistante", "o0"); // contrôle d'intégrité du moteur → ignorée
  assert.equal(s.answered, 0, "une réponse à une question étrangère n'est jamais enregistrée");
  assert.equal(c.getQuizState().answered, 0);
});

// ── Progression (moteurs A + K2A) ──────────────────────────────────────────
test("progression après réussite : leçon passée, quizScore enregistré", () => {
  const rt = createStudentRuntime(marketingDigitalV2, { now: () => NOW });
  const lessonRef = marketingDigitalV2.modules[0].lessons[0].id;
  const c = createQuizController(baseOpts({ lessonRef, onProgress: (e) => rt.dispatch(e) }));
  c.startQuiz();
  for (let i = 0; i < 5; i++) c.selectAnswer(`q${i}`, "o0");
  c.submitQuiz();
  const st = rt.getState().lessons[lessonRef];
  assert.equal(st.quizScore, 100);
  assert.equal(st.state, "passed");
});

test("progression après échec : quizScore enregistré, leçon non passée", () => {
  const rt = createStudentRuntime(marketingDigitalV2, { now: () => NOW });
  const lessonRef = marketingDigitalV2.modules[0].lessons[0].id;
  const c = createQuizController(baseOpts({ lessonRef, onProgress: (e) => rt.dispatch(e) }));
  c.startQuiz();
  for (let i = 0; i < 5; i++) c.selectAnswer(`q${i}`, "o1");
  c.submitQuiz();
  const st = rt.getState().lessons[lessonRef];
  assert.equal(st.quizScore, 0);
  assert.notEqual(st.state, "passed");
});

test("un quiz formatif réussi NE déverrouille PAS le module suivant (gate summative)", () => {
  const rt = createStudentRuntime(marketingDigitalV2, { now: () => NOW });
  const lessonRef = marketingDigitalV2.modules[0].lessons[0].id;
  const c = createQuizController(baseOpts({ lessonRef, onProgress: (e) => rt.dispatch(e) }));
  c.startQuiz();
  for (let i = 0; i < 5; i++) c.selectAnswer(`q${i}`, "o0");
  c.submitQuiz();
  const d = rt.getDerived();
  assert.equal(d.modules[1].unlocked, false, "module 2 reste verrouillé après un simple quiz formatif");
});

test("reprise après snapshot/hydratation : progression conservée", () => {
  const rt = createStudentRuntime(marketingDigitalV2, { now: () => NOW });
  const lessonRef = marketingDigitalV2.modules[0].lessons[0].id;
  const c = createQuizController(baseOpts({ lessonRef, onProgress: (e) => rt.dispatch(e) }));
  c.startQuiz();
  for (let i = 0; i < 5; i++) c.selectAnswer(`q${i}`, "o0");
  c.submitQuiz();
  const snap = rt.snapshot();
  const rt2 = createStudentRuntime(marketingDigitalV2, { now: () => NOW });
  rt2.hydrate(snap);
  assert.equal(rt2.getState().lessons[lessonRef].quizScore, 100);
});

// ── Déterminisme / généricité ──────────────────────────────────────────────
test("déterminisme : même graine → même sélection publique", () => {
  const a = createQuizController(baseOpts()).startQuiz();
  const b = createQuizController(baseOpts()).startQuiz();
  assert.deepEqual(a.questions.map((x) => x.questionId), b.questions.map((x) => x.questionId));
});

test("généricité : fonctionne sur un programme synthétique arbitraire", () => {
  const b = new InMemoryQuestionBank(
    Array.from({ length: 3 }, (_, i) => q(`z${i}`, "true_false", { kind: "boolean", correct: true }, { moduleId: "42", competencyId: `K${i}` })),
  );
  const c = createQuizController(baseOpts({ bank: b, definition: { id: "gz", programId: "synthetic", moduleId: "42", version: 1, selection: { count: 3, moduleId: "42" } } }));
  c.startQuiz();
  for (let i = 0; i < 3; i++) c.selectAnswer(`z${i}`, "true");
  const { result } = c.submitQuiz();
  assert.equal(result.passed, true);
  assert.ok(!FORBIDDEN.test(JSON.stringify(result)));
});

test("état du quiz : getQuizState reflète phase/compteurs", () => {
  const c = createQuizController(baseOpts());
  assert.equal(c.getQuizState().phase, "ready");
  c.startQuiz();
  c.selectAnswer("q0", "o0");
  const s = c.getQuizState();
  assert.equal(s.phase, "in_progress");
  assert.equal(s.answered, 1);
  assert.equal(s.total, 5);
});
