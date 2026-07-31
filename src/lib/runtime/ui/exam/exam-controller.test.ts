import { test } from "node:test";
import assert from "node:assert/strict";
import type { GradingRule, PrivateQuestion, QuestionType } from "../../assessment/types.ts";
import { InMemoryQuestionBank } from "../../assessment/question-bank.ts";
import type { ExamEligibilityContext, ExamEligibilityRule, FinalExamDefinition, FinalExamSection, FinalExamVersion } from "../../exam/types.ts";
import { DEFAULT_EXAM_ACCOMMODATION_POLICY, DEFAULT_EXAM_GRADING_POLICY, DEFAULT_EXAM_NAVIGATION_POLICY, DEFAULT_EXAM_RETAKE_POLICY } from "../../exam/config.ts";
import { createExamController, type ExamControllerOptions } from "./exam-controller.ts";
import { createExamRuntimeStore, type ExamProgressEvent } from "./exam-runtime-store.ts";

const START = new Date("2026-10-01T09:00:00Z");
const HOUR = 3600;

const VERSION: FinalExamVersion = {
  examVersion: 1, questionsVersion: 1, bankVersion: 1, rubricsVersion: 1, gradingVersion: 1,
  eligibilityVersion: 1, navigationVersion: 1, accommodationVersion: 1, passThresholdVersion: 1,
};

function q(id: string, sectionId: string, type: QuestionType, grading: GradingRule, points = 2, options: string[] = ["Bonne", "Autre"]): PrivateQuestion {
  return { id, version: 1, type, difficulty: "easy", prompt: `Question ${id}`, options: options.map((label, i) => ({ id: `o${i}`, label })), points, grading, competencyId: `c-${sectionId}`, moduleId: sectionId, status: "active", privateExplanation: "privé", feedbackOnError: "privé" };
}

/** Banque auto-corrigeable : bonne réponse connue = "o0". */
function autoBank(): InMemoryQuestionBank {
  return new InMemoryQuestionBank([
    q("1-a", "1", "single", { kind: "single", correctOptionId: "o0" }),
    q("1-b", "1", "single", { kind: "single", correctOptionId: "o0" }),
    q("2-a", "2", "single", { kind: "single", correctOptionId: "o0" }),
    q("2-b", "2", "single", { kind: "single", correctOptionId: "o0" }),
  ]);
}

/** Banque à révision humaine : une question structurée manuelle. */
function manualBank(): InMemoryQuestionBank {
  return new InMemoryQuestionBank([
    q("1-a", "1", "structured_text", { kind: "manual" }, 4, []),
    q("1-b", "1", "single", { kind: "single", correctOptionId: "o0" }),
    q("2-a", "2", "single", { kind: "single", correctOptionId: "o0" }),
    q("2-b", "2", "single", { kind: "single", correctOptionId: "o0" }),
  ]);
}

function rule(): ExamEligibilityRule {
  return { requireActiveEnrollment: true, requireProgramAccessible: true, requiredModuleIds: ["1", "2"], minimumProgressPercent: 80, requiredPassedQuizIds: [], requireFinalProjectSubmitted: false, requireFinalProjectApproved: false, forbidAdministrativeHold: true, minimumAvailableAttempts: 1, mandatoryCooldownSeconds: 0, requireExamWindowOpen: true, requiredPrerequisiteSkillIds: [], version: 1 };
}

function eligibleCtx(over: Partial<ExamEligibilityContext> = {}): ExamEligibilityContext {
  return { enrollmentActive: true, programAccessible: true, completedModuleIds: ["1", "2"], progressPercent: 100, passedQuizIds: [], finalProjectSubmitted: true, finalProjectApproved: true, administrativeHold: false, availableAttempts: 2, lastAttemptCompletedAt: null, examWindowOpen: true, satisfiedPrerequisiteSkillIds: [], specialApproval: null, ...over };
}

function def(over: Partial<FinalExamDefinition> = {}): FinalExamDefinition {
  const sections: FinalExamSection[] = [
    { id: "1", titleKey: "exam.section.fundamentals", selection: { count: 2, moduleId: "1" }, weight: 1 },
    { id: "2", titleKey: "exam.section.strategy", selection: { count: 2, moduleId: "2" }, weight: 1 },
  ];
  return { examId: "exam-test", programId: "p", version: VERSION, status: "active", sections, durationLimitSeconds: HOUR, passThresholdPercent: 70, navigation: { ...DEFAULT_EXAM_NAVIGATION_POLICY, mode: "sequential", allowBacktrack: true, allowPartialSubmission: true }, retake: { ...DEFAULT_EXAM_RETAKE_POLICY }, grading: { ...DEFAULT_EXAM_GRADING_POLICY }, eligibilityRule: rule(), accommodationPolicy: { ...DEFAULT_EXAM_ACCOMMODATION_POLICY }, humanReviewRequired: false, activatedAt: "2026-01-01T00:00:00Z", retiredAt: null, ...over };
}

function opts(over: Partial<ExamControllerOptions> = {}): ExamControllerOptions {
  return { definition: def(), bank: autoBank(), learnerRef: "secret-learner-1", attemptNumber: 1, eligibilityContext: eligibleCtx(), now: () => START, seed: 42, ...over };
}

const FORBIDDEN = /correctOptionId|correctAnswer|answerKey|"grading"|privateExplanation|reviewerNotes|integritySignals|internalDecisionReason|certificateId|"secret"|checksum.*private/i;

// ── Admissibilité ────────────────────────────────────────────────────────────
test("admissible : canStart true", () => {
  const c = createExamController(opts());
  const e = c.checkEligibility();
  assert.equal(e.status, "eligible");
  assert.equal(e.canStart, true);
});

test("non admissible (inscription inactive) : canStart false, raison publique", () => {
  const c = createExamController(opts({ eligibilityContext: eligibleCtx({ enrollmentActive: false }) }));
  const e = c.checkEligibility();
  assert.equal(e.canStart, false);
  assert.notEqual(e.status, "eligible");
  assert.ok(e.reasonKeys.length > 0);
});

test("prérequis incomplets (progression insuffisante) : non admissible", () => {
  const c = createExamController(opts({ eligibilityContext: eligibleCtx({ progressPercent: 40 }) }));
  const e = c.checkEligibility();
  assert.equal(e.canStart, false);
});

// ── Création / version figée / session publique ──────────────────────────────
test("création de tentative + session publique nettoyée (aucune bonne réponse)", () => {
  const c = createExamController(opts());
  c.checkEligibility();
  const s = c.createExamAttempt();
  assert.ok(s.sections.length === 2);
  const json = JSON.stringify(s);
  assert.ok(!FORBIDDEN.test(json), "aucune clé privée dans la session publique");
  assert.ok(!json.includes("secret-learner-1"), "learnerRef brut jamais exposé");
});

test("version FIGÉE au démarrage : une modification ultérieure ne rétroagit pas", () => {
  const c = createExamController(opts());
  c.checkEligibility();
  c.createExamAttempt();
  c.startExam();
  const snap = c.snapshot();
  assert.equal(snap.attempt!.frozenVersion.examVersion, 1);
  // La définition source pourrait changer ensuite ; la tentative garde sa version figée.
  assert.deepEqual(snap.attempt!.frozenVersion, VERSION);
});

test("création rejetée si non admissible", () => {
  const c = createExamController(opts({ eligibilityContext: eligibleCtx({ enrollmentActive: false }) }));
  c.checkEligibility();
  assert.throws(() => c.createExamAttempt(), /NOT_ELIGIBLE/);
});

// ── Chronomètre autoritaire ──────────────────────────────────────────────────
test("chronomètre autoritaire : horloge injectée, non le navigateur", () => {
  let t = START.getTime();
  const c = createExamController(opts({ now: () => new Date(t) }));
  c.checkEligibility();
  c.startExam();
  t += 600_000; // +10 min (horloge serveur)
  const timer = c.getTimer()!;
  assert.equal(timer.remainingSeconds, HOUR - 600);
  assert.equal(timer.expired, false);
});

test("expiration → auto-soumission (autorité serveur)", () => {
  let t = START.getTime();
  const c = createExamController(opts({ now: () => new Date(t) }));
  c.checkEligibility();
  c.startExam();
  c.selectAnswer("1-a", "o0");
  t += (HOUR + 30) * 1000;
  const { expired, result } = c.handleExpiration();
  assert.equal(expired, true);
  assert.ok(result);
});

// ── Navigation contrôlée ─────────────────────────────────────────────────────
test("navigation : refus de retour arrière (sans mutation)", () => {
  const c = createExamController(opts({ definition: def({ navigation: { ...DEFAULT_EXAM_NAVIGATION_POLICY, mode: "sequential", allowBacktrack: false } }) }));
  c.checkEligibility();
  c.startExam();
  const fwd = c.navigateToSection("2");
  assert.equal(fwd.ok, true);
  const back = c.navigateToSection("1");
  assert.equal(back.ok, false);
  assert.ok(back.reasonCodes.includes("BACKTRACK_FORBIDDEN"));
  assert.equal(back.currentSectionId, "2", "section courante inchangée après refus");
});

// ── Réponses / intégrité ─────────────────────────────────────────────────────
test("réponse enregistrée puis modifiée (révisions côté moteur)", () => {
  const c = createExamController(opts());
  c.checkEligibility();
  c.startExam();
  let s = c.selectAnswer("1-a", "o1");
  assert.equal(s.answered, 1);
  s = c.updateAnswer("1-a", "o0");
  assert.equal(s.answered, 1);
});

test("question étrangère rejetée (réponse non enregistrée)", () => {
  const c = createExamController(opts());
  c.checkEligibility();
  c.startExam();
  const s = c.selectAnswer("question-inexistante", "o0");
  assert.equal(s.answered, 0);
});

test("réponse après soumission rejetée (immuabilité)", () => {
  const c = createExamController(opts());
  c.checkEligibility();
  c.startExam();
  for (const id of ["1-a", "1-b", "2-a", "2-b"]) c.selectAnswer(id, "o0");
  c.submitExam();
  const s = c.selectAnswer("1-a", "o1");
  assert.equal(s.status !== "active", true, "session soumise n'est plus active");
});

// ── Correction / résultats ───────────────────────────────────────────────────
function answerAll(c: ReturnType<typeof createExamController>, value: string) {
  for (const id of ["1-a", "1-b", "2-a", "2-b"]) c.selectAnswer(id, value);
}

test("correction automatique : tout juste → réussite provisoire 100%", () => {
  const c = createExamController(opts());
  c.checkEligibility();
  c.startExam();
  answerAll(c, "o0");
  const { result } = c.submitExam();
  assert.equal(result.scorePercent, 100);
  assert.equal(result.passedProvisional, true);
  assert.equal(result.requiresManualReview, false);
});

test("correction automatique : tout faux → échec provisoire", () => {
  const c = createExamController(opts());
  c.checkEligibility();
  c.startExam();
  answerAll(c, "o1");
  const { result } = c.submitExam();
  assert.equal(result.passedProvisional, false);
});

test("révision manuelle requise → provisoire, jamais réussi automatiquement", () => {
  const c = createExamController(opts({ bank: manualBank() }));
  c.checkEligibility();
  c.startExam();
  c.selectAnswer("1-a", "une dissertation");
  for (const id of ["1-b", "2-a", "2-b"]) c.selectAnswer(id, "o0");
  const { result } = c.submitExam();
  assert.equal(result.requiresManualReview, true);
  assert.equal(c.getPhase(), "manual_review_required");
  const review = c.getReviewStatus();
  assert.notEqual(review.status, "not_required");
});

// ── Idempotence / anti-falsification ─────────────────────────────────────────
test("double soumission idempotente : un seul résultat, une seule progression", () => {
  const events: ExamProgressEvent[] = [];
  const c = createExamController(opts({ onExamEvent: (e) => events.push(e) }));
  c.checkEligibility();
  c.startExam();
  answerAll(c, "o0");
  const a = c.submitExam();
  const b = c.submitExam();
  assert.deepEqual(a.result, b.result);
  assert.equal(events.filter((e) => e.type === "FINAL_EXAM_SUBMITTED").length, 1);
});

test("le client ne peut PAS imposer score/passed : score = moteur", () => {
  const events: ExamProgressEvent[] = [];
  const c = createExamController(opts({ onExamEvent: (e) => events.push(e) }));
  c.checkEligibility();
  c.startExam();
  answerAll(c, "o1"); // tout faux
  const { result } = c.submitExam();
  assert.equal(result.passedProvisional, false);
  const ev = events.find((e) => e.type === "FINAL_EXAM_SUBMITTED")!;
  assert.equal(ev.type === "FINAL_EXAM_SUBMITTED" && ev.passedProvisional, false);
  // Aucune API pour fixer score/passed/learnerId/attemptId :
  const api = c as unknown as Record<string, unknown>;
  for (const k of ["setScore", "setPassed", "setLearnerId", "setAttemptId", "setDuration"]) assert.equal(api[k], undefined);
});

// ── Décision finale / certification ──────────────────────────────────────────
test("décision finale (auto-gradé réussi) : passed + admissible certification, AUCUN certificat émis", () => {
  const events: ExamProgressEvent[] = [];
  const store = createExamRuntimeStore();
  const c = createExamController(opts({ onExamEvent: (e) => store.dispatch(e) && events.push(e) }));
  c.checkEligibility();
  c.startExam();
  answerAll(c, "o0");
  c.submitExam();
  // Avant finalisation : non admissible au certificat.
  assert.equal(c.getFinalDecisionStatus()!.certificateEligibility, false);
  const decision = c.finalize()!;
  assert.equal(decision.decided, true);
  assert.equal(decision.passed, true);
  assert.equal(decision.certificateEligibility, true);
  // Progression (tranche examen dédiée) mise à jour.
  assert.equal(store.getState().status, "passed");
  assert.equal(store.getState().certificateEligibility, true);
  // AUCUN certificat/badge émis nulle part.
  assert.ok(!/certificateId|credential|badge|"pdf"|qrImage/i.test(JSON.stringify({ decision, store: store.getState() })));
});

test("décision finale échouée : passed=false, non admissible", () => {
  const c = createExamController(opts());
  c.checkEligibility();
  c.startExam();
  answerAll(c, "o1");
  c.submitExam();
  const decision = c.finalize()!;
  assert.equal(decision.passed, false);
  assert.equal(decision.certificateEligibility, false);
});

test("finalisation idempotente", () => {
  const events: ExamProgressEvent[] = [];
  const c = createExamController(opts({ onExamEvent: (e) => events.push(e) }));
  c.checkEligibility();
  c.startExam();
  answerAll(c, "o0");
  c.submitExam();
  c.finalize();
  c.finalize();
  assert.equal(events.filter((e) => e.type === "FINAL_EXAM_DECIDED").length, 1);
});

// ── Reprise ──────────────────────────────────────────────────────────────────
test("reprise après snapshot/hydrate : tentative, version, réponses, temps conservés", () => {
  let t = START.getTime();
  const c1 = createExamController(opts({ now: () => new Date(t) }));
  c1.checkEligibility();
  c1.startExam();
  c1.selectAnswer("1-a", "o0");
  c1.flagQuestionForReview("1-b", true);
  t += 300_000; // 5 min écoulées
  const snap = c1.snapshot();

  const c2 = createExamController(opts({ now: () => new Date(t) }));
  c2.hydrate(snap);
  assert.equal(c2.snapshot().attempt!.id, snap.attempt!.id, "même tentative (pas de nouvelle)");
  assert.deepEqual(c2.getFlaggedQuestions(), ["1-b"]);
  const s = c2.getPublicSession()!;
  assert.equal(s.answered, 1, "réponse conservée");
  const timer = c2.getTimer()!;
  assert.equal(timer.remainingSeconds, HOUR - 300, "temps autoritaire restauré (non réinitialisé)");
});

// ── Déterminisme / généricité / anti-fuite ───────────────────────────────────
test("déterminisme : même graine → même sélection publique", () => {
  const a = (() => { const c = createExamController(opts()); c.checkEligibility(); return c.createExamAttempt(); })();
  const b = (() => { const c = createExamController(opts()); c.checkEligibility(); return c.createExamAttempt(); })();
  const ids = (s: typeof a) => s.sections.flatMap((sec) => sec.questions.map((q) => q.questionId));
  assert.deepEqual(ids(a), ids(b));
});

test("généricité : programme synthétique arbitraire", () => {
  const genDef = def({ examId: "gen", programId: "synthetic" });
  const c = createExamController(opts({ definition: genDef }));
  c.checkEligibility();
  c.startExam();
  answerAll(c, "o0");
  const { result } = c.submitExam();
  assert.ok(!FORBIDDEN.test(JSON.stringify(result)));
});

test("aucune bonne réponse exposée sur toute la surface publique", () => {
  const c = createExamController(opts());
  c.checkEligibility();
  const surfaces: unknown[] = [c.createExamAttempt()];
  c.startExam();
  c.selectAnswer("1-a", "o0");
  surfaces.push(c.getPublicSession(), c.getTimer());
  answerAll(c, "o0");
  const { result } = c.submitExam();
  surfaces.push(result, c.getReviewStatus(), c.finalize());
  assert.ok(!FORBIDDEN.test(JSON.stringify(surfaces)));
});
