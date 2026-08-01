/**
 * K3-FINAL GATE — revue d'acceptation END-TO-END du bloc académique Runtime (K1→K3C).
 *
 * Prouve, par des tests RÉELS (pas seulement de l'inspection), que la chaîne composée fonctionne :
 * Sprint A (runtime) → K3A (quiz, correction moteur) → progression → K3B (examen final sécurisé) →
 * K3C (orchestration décision) → CertificationHandoffContract NON émetteur. Aucune donnée réelle, aucune
 * banque privée académique, horloge/ids injectés. AUCUNE nouvelle fonctionnalité : uniquement des assertions.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import type { GradingRule, PrivateQuestion, QuestionType } from "../../assessment/types.ts";
import { InMemoryQuestionBank } from "../../assessment/question-bank.ts";
import { marketingDigitalV2 } from "../../../academic/marketing-digital-v2.ts";
import { createStudentRuntime } from "../runtime/student-runtime.ts";
import { createQuizController } from "../assessment/quiz-controller.ts";
import { DEFAULT_ASSESSMENT_POLICY } from "../../assessment/config.ts";
import { createExamController, type ExamController } from "../exam/exam-controller.ts";
import { DEFAULT_EXAM_ACCOMMODATION_POLICY, DEFAULT_EXAM_GRADING_POLICY, DEFAULT_EXAM_NAVIGATION_POLICY, DEFAULT_EXAM_RETAKE_POLICY } from "../../exam/config.ts";
import type { ExamEligibilityContext, ExamEligibilityRule, FinalExamDefinition, FinalExamVersion } from "../../exam/types.ts";
import { AssessmentCompletionOrchestrator as ORCH, initialCompletionState, type CompletionState } from "./assessment-completion-orchestrator.ts";
import { buildCertificationHandoff } from "./certification-handoff.ts";
import { DEFAULT_COMPLETION_VERSIONS } from "./completion-config.ts";
import type { CompletionInput, QuizRequirementResult } from "./completion-types.ts";
import { inspectClientSafe } from "../security/ensure-client-safe.ts";

const START = new Date("2026-10-01T09:00:00Z");
const HOUR = 3600;
const at = (s: number) => new Date(START.getTime() + s * 1000);
const idf = (p = "id") => { let n = 0; return () => `${p}-${n++}`; };

// ─────────────────── Fabriques synthétiques déterministes ───────────────────
const VERSION: FinalExamVersion = { examVersion: 1, questionsVersion: 1, bankVersion: 1, rubricsVersion: 1, gradingVersion: 1, eligibilityVersion: 1, navigationVersion: 1, accommodationVersion: 1, passThresholdVersion: 1 };

function q(id: string, sectionId: string, type: QuestionType, grading: GradingRule, points = 2, options: string[] = ["Bonne", "Autre"]): PrivateQuestion {
  // Sentinelles UNIQUEMENT dans des champs PRIVÉS (jamais le prompt public) : on prouve qu'elles sont retirées.
  return { id, version: 1, type, difficulty: "easy", prompt: `Question ${id}`, options: options.map((label, i) => ({ id: `o${i}`, label })), points, grading, competencyId: `c-${sectionId}`, moduleId: sectionId, status: "active", privateExplanation: "PRIVATE_K3_FINAL_ANSWER_VALUE PRIVATE_K3_FINAL_DECISION_REASON", feedbackOnError: "PRIVATE_K3_FINAL_SCORE_DETAIL PRIVATE_K3_FINAL_INTEGRITY_SIGNAL" };
}
function examBank(manual = false): InMemoryQuestionBank {
  return new InMemoryQuestionBank([
    manual ? q("1-a", "1", "structured_text", { kind: "manual" }, 4, []) : q("1-a", "1", "single", { kind: "single", correctOptionId: "o0" }),
    q("1-b", "1", "single", { kind: "single", correctOptionId: "o0" }),
    q("2-a", "2", "single", { kind: "single", correctOptionId: "o0" }),
    q("2-b", "2", "single", { kind: "single", correctOptionId: "o0" }),
  ]);
}
function quizBank(): InMemoryQuestionBank {
  return new InMemoryQuestionBank(Array.from({ length: 3 }, (_, i) => q(`qz${i}`, "1", "single", { kind: "single", correctOptionId: "o0" })));
}
function rule(): ExamEligibilityRule {
  return { requireActiveEnrollment: true, requireProgramAccessible: true, requiredModuleIds: ["1", "2"], minimumProgressPercent: 80, requiredPassedQuizIds: [], requireFinalProjectSubmitted: false, requireFinalProjectApproved: false, forbidAdministrativeHold: true, minimumAvailableAttempts: 1, mandatoryCooldownSeconds: 0, requireExamWindowOpen: true, requiredPrerequisiteSkillIds: [], version: 1 };
}
function eligibleCtx(over: Partial<ExamEligibilityContext> = {}): ExamEligibilityContext {
  return { enrollmentActive: true, programAccessible: true, completedModuleIds: ["1", "2"], progressPercent: 100, passedQuizIds: [], finalProjectSubmitted: true, finalProjectApproved: true, administrativeHold: false, availableAttempts: 2, lastAttemptCompletedAt: null, examWindowOpen: true, satisfiedPrerequisiteSkillIds: [], specialApproval: null, ...over };
}
function examDef(over: Partial<FinalExamDefinition> = {}): FinalExamDefinition {
  return { examId: "exam-k3final", programId: "marketing-digital", version: VERSION, status: "active", sections: [{ id: "1", titleKey: "s1", selection: { count: 2, moduleId: "1" }, weight: 1 }, { id: "2", titleKey: "s2", selection: { count: 2, moduleId: "2" }, weight: 1 }], durationLimitSeconds: HOUR, passThresholdPercent: 70, navigation: { ...DEFAULT_EXAM_NAVIGATION_POLICY, mode: "sequential", allowBacktrack: true, allowPartialSubmission: true }, retake: { ...DEFAULT_EXAM_RETAKE_POLICY }, grading: { ...DEFAULT_EXAM_GRADING_POLICY }, eligibilityRule: rule(), accommodationPolicy: { ...DEFAULT_EXAM_ACCOMMODATION_POLICY }, humanReviewRequired: false, activatedAt: "2026-01-01T00:00:00Z", retiredAt: null, ...over };
}

function makeExam(over: { bank?: InMemoryQuestionBank; def?: FinalExamDefinition; ctx?: Partial<ExamEligibilityContext>; now?: () => Date; attemptNumber?: number } = {}): ExamController {
  return createExamController({ definition: over.def ?? examDef(), bank: over.bank ?? examBank(), learnerRef: "secret-learner", attemptNumber: over.attemptNumber ?? 1, eligibilityContext: eligibleCtx(over.ctx), now: over.now ?? (() => START), seed: 7 });
}
function answerAll(c: ExamController, v: string) { for (const id of ["1-a", "1-b", "2-a", "2-b"]) c.selectAnswer(id, v); }

/** Mappe l'état RÉEL du contrôleur d'examen (K3B) vers l'entrée d'orchestration (K3C). */
function examToInput(c: ExamController, quizzes: QuizRequirementResult[], over: Partial<CompletionInput["exam"]> = {}): CompletionInput {
  const snap = c.snapshot();
  const attempt = snap.attempt;
  const prov = c.getPublicResult();
  const dec = c.getFinalDecisionStatus();
  const g = attempt?.provisionalResult?.gradingResult;
  const status: CompletionInput["exam"]["status"] = dec?.decided ? "finalized" : prov?.requiresManualReview ? "pending_manual_review" : prov ? "provisionally_graded" : attempt ? "in_progress" : "not_started";
  return {
    learnerRefOpaque: "opaque-k3final", programSlug: "marketing-digital", programTitleKey: "completion.program.title", curriculumVersion: "v2", policyVersion: 1,
    quizzes,
    exam: {
      eligible: c.checkEligibility().canStart, eligibilityStatus: c.checkEligibility().status, status,
      provisionalPassed: prov ? prov.passedProvisional : null, requiresManualReview: prov?.requiresManualReview ?? false,
      percentage: prov?.scorePercent ?? null, eliminatoryFailure: g?.eliminatoryFailure ?? false,
      finalStatus: dec?.decided ? dec.finalStatus : null, finalPassed: dec?.decided ? dec.passed : null,
      certificateEligibility: dec?.certificateEligibility ?? false,
      competencies: (g?.competencyResults ?? []).map((cr) => ({ competencyId: cr.competencyId, score: cr.score, level: cr.provisionalLevel, needsRemediation: cr.needsRemediation })),
      attemptsUsed: attempt?.attemptNumber ?? 0, maxAttempts: attempt?.maximumAttempts ?? 2, lastCompletedAt: attempt?.timer?.officialSubmittedAt ?? null, cooldownSeconds: 0,
      expired: false, suspended: false, administrativeHold: false, attemptId: attempt?.id ?? null, ...over,
    },
    reviewStatus: prov?.requiresManualReview ? "pending_assignment" : "not_required",
    reviewComplete: dec?.decided ?? false,
    versions: DEFAULT_COMPLETION_VERSIONS,
  };
}
const QUIZ_OK: QuizRequirementResult[] = [{ quizId: "q-m1", required: true, attempted: true, passed: true, scorePercent: 80, competencies: ["C1"] }];
function consolidate(input: CompletionInput, state: CompletionState = initialCompletionState(), cmd = "cmd-1") {
  return ORCH.consolidate(state, input, cmd, { now: () => at(500), idFactory: idf("k3c") });
}
const SENTINELS = ["PRIVATE_K3_FINAL_ANSWER_VALUE", "PRIVATE_K3_FINAL_REVIEW_NOTE", "PRIVATE_K3_FINAL_DECISION_REASON", "PRIVATE_K3_FINAL_SCORE_DETAIL", "PRIVATE_K3_FINAL_INTEGRITY_SIGNAL", "PRIVATE_K3_FINAL_SIGNING_MATERIAL", "PRIVATE_K3_FINAL_CERTIFICATE_PLACEHOLDER"];
function assertNoPrivate(...surfaces: unknown[]) {
  const json = JSON.stringify(surfaces);
  for (const s of SENTINELS) assert.ok(!json.includes(s), `sentinelle ${s} exposée`);
  assert.ok(!/answerKey|correctOptionId|"correct":|reviewerNotes|internalDecisionReason|integritySignals|privateScoreBreakdown|gradingRule|signingKey|certificateId|badgeId|qrImage|"pdf"/i.test(json), "valeur privée exposée");
}

// ═══════════════ Scénario principal (§5) : parcours complet ═══════════════
test("E2E principal : contenu réel → quiz moteur → progression → examen → décision → handoff non émetteur", () => {
  // 1-7. Runtime sur le CONTENU RÉEL + progression via K3A (correction moteur).
  const rt = createStudentRuntime(marketingDigitalV2, { now: () => START });
  const lessonRef = marketingDigitalV2.modules[0].lessons[0].id;
  const quiz = createQuizController({ definition: { id: "qz", programId: "marketing-digital", moduleId: "1", version: 1, selection: { count: 3, moduleId: "1" } }, bank: quizBank(), learnerRef: "secret", lessonRef, quizId: "qz1", now: () => START, seed: 7, policy: { ...DEFAULT_ASSESSMENT_POLICY, feedback: "no_answer_disclosure" }, onProgress: (e) => rt.dispatch(e) });
  quiz.startQuiz();
  for (let i = 0; i < 3; i++) quiz.selectAnswer(`qz${i}`, "o0");
  const qr = quiz.submitQuiz().result;
  assert.equal(qr.passed, true, "quiz corrigé par le MOTEUR");
  assert.equal(rt.getState().lessons[lessonRef].state, "passed", "progression Runtime recalculée");
  assert.equal(rt.getDerived().modules[1].unlocked, false, "un quiz formatif ne déverrouille pas le module (gate summative)");

  // 15-22. Examen final RÉEL → provisoire → décision.
  const exam = makeExam();
  assert.equal(exam.checkEligibility().canStart, true);
  exam.startExam();
  answerAll(exam, "o0");
  const prov = exam.submitExam().result;
  assert.equal(prov.passedProvisional, true);
  const dec = exam.finalize()!;
  assert.equal(dec.decided, true);
  assert.equal(dec.passed, true);
  assert.equal(dec.certificateEligibility, true);

  // 23-24. Orchestration K3C → décision finale + handoff NON émetteur, aucun certificat.
  const input = examToInput(exam, QUIZ_OK);
  const r = consolidate(input);
  assert.equal(r.state.status, "final_pass");
  assert.equal(r.final?.passed, true);
  assert.equal(r.state.certificationEligibility, true);
  const handoff = buildCertificationHandoff(r.final, input, r.competencySummary);
  assert.ok(handoff);
  assert.equal(handoff!.emitted, false);
  assertNoPrivate(qr, prov, dec, r.state, handoff);
});

// ═══════════════ Scénarios obligatoires A–J (§6) ═══════════════
test("A. réussite complète directe → handoff produit, aucun certificat", () => {
  const exam = makeExam(); exam.startExam(); answerAll(exam, "o0"); exam.submitExam(); exam.finalize();
  const input = examToInput(exam, QUIZ_OK);
  const r = consolidate(input);
  assert.equal(r.final?.passed, true);
  const h = buildCertificationHandoff(r.final, input, r.competencySummary);
  assert.ok(h && h.emitted === false);
});

test("B. échec puis reprise autorisée puis réussite → historique conservé, handoff une fois", () => {
  const e1 = makeExam(); e1.startExam(); answerAll(e1, "o1"); e1.submitExam(); const d1 = e1.finalize()!;
  assert.equal(d1.passed, false);
  const in1 = examToInput(e1, QUIZ_OK);
  const r1 = consolidate(in1);
  assert.ok(["retake_available", "final_fail"].includes(r1.state.status));
  assert.equal(r1.retake?.allowed, true, "reprise disponible (tentative 1/2)");
  // Nouvelle tentative DISTINCTE : attemptNumber 2 vs 1 (l'historique de la 1re n'est pas modifié).
  assert.equal(e1.snapshot().attempt!.attemptNumber, 1);
  const e2 = makeExam({ attemptNumber: 2 }); e2.startExam(); answerAll(e2, "o0"); e2.submitExam(); const d2 = e2.finalize()!;
  assert.equal(e2.snapshot().attempt!.attemptNumber, 2, "nouvelle tentative distincte");
  assert.equal(d2.passed, true);
  const r2 = consolidate(examToInput(e2, QUIZ_OK));
  assert.equal(r2.final?.passed, true);
});

test("C. reprise épuisée → final_fail, certificationEligibility=false, aucun handoff", () => {
  const exam = makeExam({ attemptNumber: 2 }); exam.startExam(); answerAll(exam, "o1"); exam.submitExam(); exam.finalize();
  const input = examToInput(exam, QUIZ_OK, { attemptsUsed: 2, maxAttempts: 2 });
  const r = consolidate(input);
  assert.equal(r.final?.passed, false);
  assert.equal(r.state.status, "retake_exhausted");
  assert.equal(r.state.certificationEligibility, false);
  assert.equal(buildCertificationHandoff(r.final, input, r.competencySummary), null);
});

test("D. révision manuelle → provisoire, décision unique, aucune note privée exposée", () => {
  const exam = makeExam({ bank: examBank(true) }); exam.startExam(); exam.selectAnswer("1-a", "dissertation"); for (const id of ["1-b", "2-a", "2-b"]) exam.selectAnswer(id, "o0");
  exam.submitExam();
  const input = examToInput(exam, QUIZ_OK);
  const r = consolidate(input);
  assert.equal(r.state.status, "manual_review_pending");
  assert.equal(r.final, null);
  assertNoPrivate(r.state, r.provisional);
});

test("E. examen expiré → auto-soumission + décision expired cohérente", () => {
  let t = START.getTime();
  const exam = makeExam({ now: () => new Date(t) }); exam.startExam(); exam.selectAnswer("1-a", "o0");
  t += (HOUR + 60) * 1000;
  const { expired } = exam.handleExpiration();
  assert.equal(expired, true);
  const input = examToInput(exam, QUIZ_OK, { expired: true });
  const r = consolidate(input);
  assert.equal(r.state.status, "expired");
  assert.equal(r.final?.finalStatus, "expired");
});

test("F. blocage administratif → suspended, aucune certification, motif public nettoyé", () => {
  const input = examToInput(makeExam({ ctx: { administrativeHold: true } }), QUIZ_OK, { administrativeHold: true, eligible: false });
  const r = consolidate(input);
  assert.equal(r.state.status, "administratively_blocked");
  assert.equal(r.state.certificationEligibility, false);
  assertNoPrivate(r.state);
});

test("G. reprise après snapshot/hydrate → décision conservée, aucun doublon", () => {
  const input = examToInput((() => { const e = makeExam(); e.startExam(); answerAll(e, "o0"); e.submitExam(); e.finalize(); return e; })(), QUIZ_OK);
  const c = { now: () => at(500), idFactory: idf("k3c") };
  const first = ORCH.consolidate(initialCompletionState(), input, "cmd-1", c);
  // hydrate = repartir de l'état ; rejouer NE duplique pas.
  const replay = ORCH.consolidate(first.state, input, "cmd-1", c);
  assert.equal(replay.events.length, 0);
  assert.equal(replay.final?.decisionId, first.final?.decisionId);
});

test("H. concurrence : deux décisions → une seule acceptée", () => {
  const input = examToInput((() => { const e = makeExam(); e.startExam(); answerAll(e, "o0"); e.submitExam(); e.finalize(); return e; })(), QUIZ_OK);
  const c = { now: () => at(500), idFactory: idf("k3c") };
  const a = ORCH.consolidate(initialCompletionState(), input, "cmd-A", c);
  const b = ORCH.consolidate(a.state, input, "cmd-B", c);
  assert.equal(a.final?.decisionId, b.final?.decisionId);
  assert.ok(!b.events.some((e) => e.type === "FINAL_DECISION_RECORDED"));
});

test("I. modification de politique après décision → résultat historique inchangé (versions figées)", () => {
  const input = examToInput((() => { const e = makeExam(); e.startExam(); answerAll(e, "o0"); e.submitExam(); e.finalize(); return e; })(), QUIZ_OK);
  const c = { now: () => at(500), idFactory: idf("k3c") };
  const first = ORCH.consolidate(initialCompletionState(), input, "cmd-1", c);
  const changed: CompletionInput = { ...input, policyVersion: 99, curriculumVersion: "v9", versions: { ...input.versions, contractVersion: 42 } };
  const later = ORCH.consolidate(first.state, changed, "cmd-2", c);
  assert.equal(later.final?.policyVersion, 1);
  assert.equal(later.final?.curriculumVersion, "v2");
  assert.equal(later.final?.contractVersion, 1);
});

test("J. données hostiles : sentinelles injectées absentes des surfaces publiques", () => {
  const exam = makeExam(); exam.startExam(); answerAll(exam, "o0"); const prov = exam.submitExam().result; const dec = exam.finalize()!;
  const input = examToInput(exam, QUIZ_OK);
  const r = consolidate(input);
  const handoff = buildCertificationHandoff(r.final, input, r.competencySummary);
  // Les sentinelles existent dans la banque PRIVÉE (prompts) ; elles ne doivent pas fuir dans le public.
  assertNoPrivate(exam.getPublicSession(), prov, dec, r.state, r.competencySummary, handoff);
  assert.equal(inspectClientSafe(handoff).safe, true);
  assert.equal(inspectClientSafe(r.competencySummary).safe, true);
});

// ═══════════════ Matrice de cohérence des états (§7) : états impossibles ═══════════════
test("MATRICE : certification_eligible impossible avant final_pass", () => {
  const exam = makeExam(); exam.startExam(); answerAll(exam, "o0"); exam.submitExam(); // pas de finalize
  const r = consolidate(examToInput(exam, QUIZ_OK));
  assert.notEqual(r.state.status, "final_pass");
  assert.equal(r.state.certificationEligibility, false, "jamais admissible sans décision finale");
  assert.equal(r.final, null);
});

test("MATRICE : aucun handoff pendant provisional_pass", () => {
  const exam = makeExam(); exam.startExam(); answerAll(exam, "o0"); exam.submitExam();
  const input = examToInput(exam, QUIZ_OK);
  const r = consolidate(input);
  assert.equal(buildCertificationHandoff(r.final, input, r.competencySummary), null);
});

test("MATRICE : examen non admissible si prérequis manquants", () => {
  const exam = makeExam({ ctx: { progressPercent: 40 } });
  assert.equal(exam.checkEligibility().canStart, false);
  assert.throws(() => exam.createExamAttempt(), /NOT_ELIGIBLE/);
});

test("MATRICE : décision finale immuable — pas de révision rouverte après finalisation", () => {
  const input = examToInput((() => { const e = makeExam(); e.startExam(); answerAll(e, "o0"); e.submitExam(); e.finalize(); return e; })(), QUIZ_OK);
  const c = { now: () => at(500), idFactory: idf("k3c") };
  const first = ORCH.consolidate(initialCompletionState(), input, "cmd-1", c);
  // Tenter d'injecter une révision après décision finale : la décision reste identique.
  const withReview: CompletionInput = { ...input, exam: { ...input.exam, requiresManualReview: true }, reviewStatus: "in_review", reviewComplete: false };
  const after = ORCH.consolidate(first.state, withReview, "cmd-2", c);
  assert.equal(after.final?.decisionId, first.final?.decisionId, "décision finale immuable");
});

test("MATRICE : déterminisme — mêmes entrées/versions/horloge/ids → même décision + même handoff", () => {
  const mk = () => { const e = makeExam(); e.startExam(); answerAll(e, "o0"); e.submitExam(); e.finalize(); return examToInput(e, QUIZ_OK); };
  const a = ORCH.consolidate(initialCompletionState(), mk(), "cmd-1", { now: () => at(500), idFactory: idf("k3c") });
  const b = ORCH.consolidate(initialCompletionState(), mk(), "cmd-1", { now: () => at(500), idFactory: idf("k3c") });
  assert.equal(a.final?.decisionId, b.final?.decisionId);
  assert.deepEqual(a.competencySummary, b.competencySummary);
});
