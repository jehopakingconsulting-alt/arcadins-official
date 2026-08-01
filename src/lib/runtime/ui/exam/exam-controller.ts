/**
 * Runtime — UI/Exam : contrôleur d'examen final SÉCURISÉ (Sprint K3B).
 *
 * FAÇADE PURE orchestrant le moteur du Sprint G pour l'expérience étudiante. La tentative PRIVÉE (questions
 * figées, barème, réponses, intégrité, résultats) vit dans la CLÔTURE : elle ne quitte jamais le module, ni
 * React/DOM/props/session/__NEXT_DATA__. Seules des vues PUBLIQUES nettoyées sortent. Correction, score,
 * réussite et décision = MOTEUR (jamais React, jamais d'après une valeur envoyée par le client). Le
 * chronomètre autoritaire est l'horloge injectée. Imports RELATIFS (.ts) : exécutables par le runner Node.
 */
import { FinalExamEngine } from "../../exam/final-exam-engine.ts";
import { ExamEligibilityEngine } from "../../exam/eligibility-engine.ts";
import { AuthoritativeExamTimer } from "../../exam/authoritative-timer.ts";
import { ExamNavigationPolicyEngine } from "../../exam/navigation-policy-engine.ts";
import { ExamResultContractBuilder } from "../../exam/exam-result-contract.ts";
import { createExamContext, createIdFactory } from "../../exam/config.ts";
import type {
  ExamAccommodation,
  ExamAttempt,
  ExamContext,
  ExamEligibilityContext,
  ExamEligibilityResult,
  ExamSession,
  FinalExamDefinition,
  ManualReviewStatus,
} from "../../exam/types.ts";
import type { QuestionBank } from "../../assessment/question-bank.ts";
import type { StudentResponse } from "../../assessment/types.ts";
import type { ExamProgressEvent } from "./exam-runtime-store.ts";
import {
  ensureCleanExam,
  toExamEligibilityViewModel,
  toExamFinalDecisionViewModel,
  toExamProvisionalResultViewModel,
  toExamReviewStatusViewModel,
  toExamSessionViewModel,
  type ExamEligibilityViewModel,
  type ExamFinalDecisionViewModel,
  type ExamProvisionalResultViewModel,
  type ExamReviewStatusViewModel,
  type ExamRuntimePhase,
  type ExamSessionViewModel,
  type ExamTimerViewModel,
} from "./exam-view-models.ts";

export interface NavigationOutcome {
  ok: boolean;
  reasonCodes: string[];
  currentSectionId: string | null;
}

export interface ExamControllerOptions {
  definition: FinalExamDefinition;
  bank: QuestionBank;
  /** Référence apprenant SERVEUR-AUTORITAIRE (fixée à la construction). */
  learnerRef: string;
  attemptNumber?: number;
  eligibilityContext: ExamEligibilityContext;
  /** Horloge INJECTÉE — seule autorité temporelle. */
  now: () => Date;
  seed: number;
  idFactory?: () => string;
  accommodations?: ExamAccommodation[];
  auditReference?: string;
  previousAttemptId?: string | null;
  /** Effet de progression (tranche examen dédiée) : dispatché UNE fois par commande. */
  onExamEvent?: (event: ExamProgressEvent) => void;
}

export interface ExamController {
  checkEligibility(): ExamEligibilityViewModel;
  createExamAttempt(): ExamSessionViewModel;
  startExam(): ExamSessionViewModel;
  resumeExam(): ExamSessionViewModel;
  heartbeat(clientElapsedSeconds?: number): void;
  getPublicSession(): ExamSessionViewModel | null;
  getTimer(): ExamTimerViewModel | null;
  selectAnswer(questionId: string, value: unknown): ExamSessionViewModel;
  updateAnswer(questionId: string, value: unknown): ExamSessionViewModel;
  clearAnswer(questionId: string): ExamSessionViewModel;
  navigateToSection(sectionId: string): NavigationOutcome;
  navigateToQuestion(sectionId: string): NavigationOutcome;
  flagQuestionForReview(questionId: string, on: boolean): string[];
  getFlaggedQuestions(): string[];
  saveCheckpoint(): { savedAt: string };
  submitExam(): { session: ExamSessionViewModel; result: ExamProvisionalResultViewModel };
  handleExpiration(): { expired: boolean; result: ExamProvisionalResultViewModel | null };
  finalize(): ExamFinalDecisionViewModel | null;
  getPublicResult(): ExamProvisionalResultViewModel | null;
  getReviewStatus(): ExamReviewStatusViewModel;
  getFinalDecisionStatus(): ExamFinalDecisionViewModel | null;
  getPhase(): ExamRuntimePhase;
  snapshot(): ExamControllerSnapshot;
  hydrate(snapshot: ExamControllerSnapshot): void;
}

export interface ExamControllerSnapshot {
  version: number;
  attempt: ExamAttempt | null;
  session: ExamSession | null;
  eligibility: ExamEligibilityResult | null;
  currentSectionId: string | null;
  flagged: string[];
}

const SNAPSHOT_VERSION = 1;

export function createExamController(opts: ExamControllerOptions): ExamController {
  const idFactory = opts.idFactory ?? createIdFactory("ex");
  const auditReference = opts.auditReference ?? "audit:runtime-preview";
  const attemptNumber = opts.attemptNumber ?? 1;
  const dispatched = new Set<string>();

  // ── état PRIVÉ (clôture) ────────────────────────────────────────────────
  let attempt: ExamAttempt | null = null;
  let session: ExamSession | null = null;
  let eligibility: ExamEligibilityResult | null = null;
  let currentSectionId: string | null = null;
  const flagged = new Set<string>();

  const ctx = (): ExamContext =>
    createExamContext({ now: opts.now(), seed: opts.seed, idFactory, config: { navigation: opts.definition.navigation } });

  const publicSession = (): ExamSessionViewModel => {
    if (!session) throw new Error("EXAM_NOT_STARTED");
    return toExamSessionViewModel(session);
  };

  const timerVm = (): ExamTimerViewModel | null => {
    if (!attempt) return null;
    const t = AuthoritativeExamTimer.recompute(attempt.timer, opts.now());
    return ensureCleanExam({
      officialStartedAt: t.officialStartedAt,
      remainingSeconds: Math.max(0, t.remainingOfficialSeconds),
      expired: t.expired,
      inGracePeriod: t.inGracePeriod,
      warning: !t.expired && t.remainingOfficialSeconds <= 300,
    });
  };

  const checkEligibility = (): ExamEligibilityViewModel => {
    eligibility = ExamEligibilityEngine.evaluate(opts.definition.eligibilityRule, opts.eligibilityContext, opts.now());
    return toExamEligibilityViewModel(eligibility, ExamEligibilityEngine.isAdmissible(eligibility));
  };

  const createExamAttempt = (): ExamSessionViewModel => {
    if (!eligibility) checkEligibility();
    const created = FinalExamEngine.createSession(
      {
        definition: opts.definition,
        bank: opts.bank,
        learnerRef: opts.learnerRef,
        attemptNumber,
        eligibility: eligibility!,
        accommodations: opts.accommodations,
        previousAttemptId: opts.previousAttemptId ?? undefined,
      },
      `create:${attemptNumber}`,
      ctx(),
    );
    attempt = created.attempt;
    session = created.session;
    currentSectionId = attempt.sections[0]?.id ?? null;
    return publicSession();
  };

  const startExam = (): ExamSessionViewModel => {
    if (!attempt) createExamAttempt();
    const res = FinalExamEngine.start(attempt!, `start:${attempt!.id}`, ctx());
    attempt = res.attempt;
    session = res.session;
    if (!currentSectionId) currentSectionId = attempt.sections[0]?.id ?? null;
    return publicSession();
  };

  const resumeExam = (): ExamSessionViewModel => {
    if (!attempt) throw new Error("EXAM_NOT_STARTED");
    const res = FinalExamEngine.resume(attempt, `resume:${attempt.id}:${opts.now().toISOString()}`, ctx());
    attempt = res.attempt;
    session = res.session;
    return publicSession();
  };

  const heartbeat = (clientElapsedSeconds?: number): void => {
    if (!attempt) return;
    const res = FinalExamEngine.heartbeat(attempt, ctx(), clientElapsedSeconds);
    attempt = res.attempt;
    session = res.session;
  };

  const writeAnswer = (questionId: string, value: unknown): ExamSessionViewModel => {
    if (!attempt || !session) throw new Error("EXAM_NOT_STARTED");
    const response: StudentResponse = { questionId, value };
    const res = FinalExamEngine.saveAnswer(attempt, response, `answer:${attempt.id}:${questionId}:${opts.now().toISOString()}`, ctx());
    attempt = res.attempt;
    session = res.session;
    return publicSession();
  };

  const navigate = (sectionId: string): NavigationOutcome => {
    if (!attempt) return { ok: false, reasonCodes: ["EXAM_NOT_STARTED"], currentSectionId };
    // Décision SERVEUR-AUTORITAIRE : politique + sections FIGÉES ; aucune mutation en cas de refus.
    const check = ExamNavigationPolicyEngine.canAccessSection(attempt.navigationPolicy, attempt.sections, currentSectionId, sectionId);
    if (!check.allowed) return { ok: false, reasonCodes: check.reasonCodes, currentSectionId };
    currentSectionId = sectionId;
    return { ok: true, reasonCodes: [], currentSectionId };
  };

  const submitExam = (): { session: ExamSessionViewModel; result: ExamProvisionalResultViewModel } => {
    if (!attempt || !session) throw new Error("EXAM_NOT_STARTED");
    const cmd = `submit:${attempt.id}`;
    const res = FinalExamEngine.submit(attempt, cmd, ctx());
    attempt = res.attempt;
    session = res.session;
    const pr = attempt.provisionalResult;
    if (!pr) throw new Error("EXAM_SUBMIT_NO_RESULT");
    const vm = toExamProvisionalResultViewModel(pr, attempt.attemptNumber);
    if (opts.onExamEvent && !dispatched.has(cmd)) {
      dispatched.add(cmd);
      opts.onExamEvent({
        type: "FINAL_EXAM_SUBMITTED",
        attemptId: attempt.id,
        examId: attempt.examId,
        scorePercent: vm.scorePercent,
        passedProvisional: vm.passedProvisional,
        requiresManualReview: vm.requiresManualReview,
        at: opts.now().toISOString(),
      });
    }
    return { session: publicSession(), result: vm };
  };

  const handleExpiration = (): { expired: boolean; result: ExamProvisionalResultViewModel | null } => {
    if (!attempt) return { expired: false, result: null };
    if (!AuthoritativeExamTimer.shouldAutoSubmit(attempt.timer, opts.now())) return { expired: false, result: null };
    const { result } = submitExam(); // auto-soumission logique, autorité serveur
    return { expired: true, result };
  };

  const finalize = (): ExamFinalDecisionViewModel | null => {
    if (!attempt) return null;
    const cmd = `finalize:${attempt.id}`;
    const res = FinalExamEngine.finalize(attempt, cmd, ctx(), { auditReference });
    attempt = res.attempt;
    session = res.session;
    const contract = ExamResultContractBuilder.build(attempt, attempt.finalResult, null, auditReference);
    const vm = toExamFinalDecisionViewModel(contract, attempt.finalResult);
    if (vm.decided && opts.onExamEvent && !dispatched.has(cmd)) {
      dispatched.add(cmd);
      opts.onExamEvent({
        type: "FINAL_EXAM_DECIDED",
        finalStatus: vm.finalStatus,
        passed: vm.passed ?? false,
        scorePercent: vm.scorePercent ?? 0,
        certificateEligibility: vm.certificateEligibility,
        reviewStatus: vm.reviewStatus,
        at: opts.now().toISOString(),
      });
    }
    return vm;
  };

  const getReviewStatus = (): ExamReviewStatusViewModel => {
    const requires = attempt?.provisionalResult?.gradingResult.requiresManualReview ?? false;
    const finalized = attempt?.finalResult !== null && attempt?.finalResult !== undefined;
    let status: ManualReviewStatus | "not_required" = "not_required";
    if (finalized) status = attempt!.finalResult!.reviewStatus;
    else if (requires) status = "pending_assignment";
    return toExamReviewStatusViewModel(status);
  };

  const getFinalDecisionStatus = (): ExamFinalDecisionViewModel | null => {
    if (!attempt) return null;
    const contract = ExamResultContractBuilder.build(attempt, attempt.finalResult, null, auditReference);
    return toExamFinalDecisionViewModel(contract, attempt.finalResult);
  };

  const getPhase = (): ExamRuntimePhase => {
    if (!eligibility) return "eligibility_checking";
    if (!ExamEligibilityEngine.isAdmissible(eligibility)) return "not_eligible";
    if (!attempt) return "ready_to_start";
    if (attempt.finalResult) return "decision_final";
    if (attempt.provisionalResult) {
      return attempt.provisionalResult.gradingResult.requiresManualReview ? "manual_review_required" : "provisional_result";
    }
    const t = AuthoritativeExamTimer.recompute(attempt.timer, opts.now());
    if (t.expired) return "expired";
    if (attempt.status === "active" || attempt.status === "resumed") return "in_progress";
    return "ready_to_start";
  };

  return {
    checkEligibility,
    createExamAttempt,
    startExam,
    resumeExam,
    heartbeat,
    getPublicSession: () => (session ? publicSession() : null),
    getTimer: timerVm,
    selectAnswer: writeAnswer,
    updateAnswer: writeAnswer,
    clearAnswer: (questionId) => writeAnswer(questionId, null),
    navigateToSection: navigate,
    navigateToQuestion: navigate,
    flagQuestionForReview: (questionId, on) => {
      if (on) flagged.add(questionId);
      else flagged.delete(questionId);
      return [...flagged];
    },
    getFlaggedQuestions: () => [...flagged],
    saveCheckpoint: () => {
      heartbeat();
      return { savedAt: opts.now().toISOString() };
    },
    submitExam,
    handleExpiration,
    finalize,
    getPublicResult: () => (attempt?.provisionalResult ? toExamProvisionalResultViewModel(attempt.provisionalResult, attempt.attemptNumber) : null),
    getReviewStatus,
    getFinalDecisionStatus,
    getPhase,
    snapshot: () => ({ version: SNAPSHOT_VERSION, attempt, session, eligibility, currentSectionId, flagged: [...flagged] }),
    hydrate: (snap) => {
      if (snap.version !== SNAPSHOT_VERSION) throw new Error("EXAM_SNAPSHOT_VERSION_MISMATCH");
      attempt = snap.attempt;
      session = snap.session;
      eligibility = snap.eligibility;
      currentSectionId = snap.currentSectionId;
      flagged.clear();
      snap.flagged.forEach((q) => flagged.add(q));
    },
  };
}
