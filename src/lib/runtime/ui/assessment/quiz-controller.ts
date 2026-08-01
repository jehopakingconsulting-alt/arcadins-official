/**
 * Runtime — UI/Assessment : contrôleur de quiz formatif (Sprint K3A).
 *
 * FAÇADE PURE qui orchestre le moteur d'évaluation du Sprint F pour l'expérience étudiante. La tentative
 * PRIVÉE (questions figées + barème + réponses) vit dans la CLÔTURE de ce contrôleur : elle ne quitte jamais
 * le module, n'entre jamais dans l'état/les props React, ni dans le DOM. Seules des vues PUBLIQUES nettoyées
 * (session sans réponses, résultat corrigé serveur) sortent. La correction, le score et la réussite sont
 * calculés PAR LE MOTEUR (jamais dans React, jamais d'après une valeur envoyée par le client).
 *
 * Imports RELATIFS (.ts) : ce module reste exécutable par le runner Node (`node --test`).
 */
import { AssessmentEngine } from "../../assessment/assessment-engine.ts";
import { createAssessmentContext } from "../../assessment/config.ts";
import { createIdFactory } from "../../assessment/config.ts";
import type {
  AssessmentAttempt,
  AssessmentContext,
  AssessmentDefinition,
  AssessmentEngineResult,
  AssessmentPolicy,
  AssessmentSession,
} from "../../assessment/types.ts";
import type { QuestionBank } from "../../assessment/question-bank.ts";
import { LearningEvents } from "../../learning-events.ts";
import type { QuizSubmittedEvent } from "../../types.ts";
import { toAssessmentViewModel } from "../mappers.ts";
import { containsForbiddenUiKeys } from "../validation.ts";
import type { AssessmentResultViewModel, AssessmentViewModel } from "../view-models.ts";

export type QuizPhase = "ready" | "in_progress" | "submitting" | "submitted";
export type QuizResultStatus = "passed" | "failed" | "manual_review" | "expired";

/** Résultat PUBLIC d'un quiz : score corrigé serveur, aucune bonne réponse, aucune donnée privée. */
export interface PublicQuizResult extends AssessmentResultViewModel {
  status: QuizResultStatus;
  correctCount: number;
  totalQuestions: number;
  competencies: string[];
  retryAvailable: boolean;
  requiresManualReview: boolean;
}

export interface QuizStateSnapshot {
  phase: QuizPhase;
  answered: number;
  total: number;
  attemptsMade: number;
  attemptsRemaining: number;
  retryAvailable: boolean;
}

export type RetryOutcome =
  | { ok: true; session: AssessmentViewModel }
  | { ok: false; reasonCode: string };

export interface QuizControllerOptions {
  definition: AssessmentDefinition;
  bank: QuestionBank;
  /** Référence apprenant SERVEUR-AUTORITAIRE (fixée à la construction, jamais imposée par le client). */
  learnerRef: string;
  /** Leçon dont la progression est mise à jour après une soumission valide. */
  lessonRef: string;
  quizId: string;
  /** Horloge INJECTÉE (jamais `Date.now()` en dur). */
  now: () => Date;
  seed: number;
  idFactory?: () => string;
  policy?: AssessmentPolicy;
  ignoreAccents?: boolean;
  /** Effet de progression : dispatché UNE seule fois par commande de soumission. */
  onProgress?: (event: QuizSubmittedEvent) => void;
}

export interface QuizController {
  startQuiz(): AssessmentViewModel;
  selectAnswer(questionId: string, value: unknown): AssessmentViewModel;
  updateAnswer(questionId: string, value: unknown): AssessmentViewModel;
  submitQuiz(commandId?: string): { session: AssessmentViewModel; result: PublicQuizResult };
  retryQuiz(): RetryOutcome;
  abandonQuiz(): void;
  getPublicSession(): AssessmentViewModel | null;
  getPublicResult(): PublicQuizResult | null;
  getQuizState(): QuizStateSnapshot;
}

export function createQuizController(opts: QuizControllerOptions): QuizController {
  const idFactory = opts.idFactory ?? createIdFactory("att");
  const dispatched = new Set<string>();

  // ── état PRIVÉ (clôture) : ne sort jamais ──────────────────────────────
  let attempt: AssessmentAttempt | null = null;
  let session: AssessmentSession | null = null;
  let phase: QuizPhase = "ready";
  let publicResult: PublicQuizResult | null = null;
  let attemptsMade = 0;

  const ctx = (): AssessmentContext =>
    createAssessmentContext({
      now: opts.now(),
      seed: opts.seed,
      idFactory,
      config: { policy: opts.policy, ignoreAccents: opts.ignoreAccents },
    });

  const publicSession = (): AssessmentViewModel => {
    if (!session) throw new Error("QUIZ_NOT_STARTED");
    return toAssessmentViewModel(session); // déjà nettoyé (mapper) : aucune bonne réponse.
  };

  const requireStarted = (): void => {
    if (!attempt || !session) throw new Error("QUIZ_NOT_STARTED");
  };

  const startQuiz = (): AssessmentViewModel => {
    if (attempt && session && phase === "in_progress") return publicSession(); // idempotent
    const res = AssessmentEngine.createAttempt({
      definition: opts.definition,
      bank: opts.bank,
      learnerRef: opts.learnerRef,
      priorAttempts: attemptsMade,
      ctx: ctx(),
    });
    attempt = res.attempt;
    session = res.session;
    attemptsMade += 1;
    publicResult = null;
    phase = "in_progress";
    return publicSession();
  };

  const writeAnswer = (questionId: string, value: unknown): AssessmentViewModel => {
    requireStarted();
    if (phase !== "in_progress") throw new Error("QUIZ_NOT_EDITABLE");
    const res = AssessmentEngine.saveAnswer(attempt!, session!, { questionId, value }, ctx());
    attempt = res.attempt;
    session = res.session;
    return publicSession();
  };

  const submitQuiz = (commandId?: string): { session: AssessmentViewModel; result: PublicQuizResult } => {
    requireStarted();
    if (phase === "submitted" && publicResult) {
      return { session: publicSession(), result: publicResult }; // déjà soumis : renvoi immuable
    }
    phase = "submitting";
    // Commande STABLE par tentative → idempotence garantie par le moteur (même résultat, aucun ré-effet).
    const cmd = commandId ?? `submit:${attempt!.id}`;
    const res = AssessmentEngine.submit(attempt!, session!, cmd, ctx());
    attempt = res.attempt;
    session = res.session;
    publicResult = toPublicResult(res, attempt!);

    // Progression : uniquement après une correction FINALE (auto-gradée), et une seule fois par commande.
    if (res.result && !res.result.requiresManualReview && opts.onProgress && !dispatched.has(cmd)) {
      dispatched.add(cmd);
      opts.onProgress(
        LearningEvents.quizSubmitted(
          opts.lessonRef,
          opts.quizId,
          Math.round(res.result.percentage),
          res.result.passed,
          opts.now().toISOString(),
        ),
      );
    }
    phase = "submitted";
    return { session: publicSession(), result: publicResult };
  };

  const retryQuiz = (): RetryOutcome => {
    if (publicResult?.passed) return { ok: false, reasonCode: "ALREADY_PASSED" };
    try {
      const res = AssessmentEngine.createAttempt({
        definition: opts.definition,
        bank: opts.bank,
        learnerRef: opts.learnerRef,
        priorAttempts: attemptsMade,
        ctx: ctx(),
        previousAttemptId: attempt?.id ?? null,
        lastCompletedAt: attempt?.completedAt ?? null,
      });
      attempt = res.attempt;
      session = res.session;
      attemptsMade += 1;
      publicResult = null;
      phase = "in_progress";
      return { ok: true, session: publicSession() };
    } catch (e) {
      return { ok: false, reasonCode: parseReason(e) };
    }
  };

  const abandonQuiz = (): void => {
    // Abandon non destructif : on repasse en état neutre sans dispatch de progression.
    if (opts.policy && opts.policy.navigation.allowPause === false) throw new Error("ABANDON_NOT_ALLOWED");
    attempt = null;
    session = null;
    publicResult = null;
    phase = "ready";
  };

  const getQuizState = (): QuizStateSnapshot => ({
    phase,
    answered: session?.progress.answered ?? 0,
    total: session?.progress.total ?? 0,
    attemptsMade,
    attemptsRemaining: attempt?.remainingAttempts ?? 0,
    retryAvailable: !!attempt && attempt.remainingAttempts > 0 && !publicResult?.passed,
  });

  return {
    startQuiz,
    selectAnswer: writeAnswer,
    updateAnswer: writeAnswer,
    submitQuiz,
    retryQuiz,
    abandonQuiz,
    getPublicSession: () => (session ? publicSession() : null),
    getPublicResult: () => publicResult,
    getQuizState,
  };
}

/** Construit un résultat PUBLIC nettoyé à partir de la sortie du moteur. Aucune clé privée n'est tolérée. */
function toPublicResult(res: AssessmentEngineResult, attempt: AssessmentAttempt): PublicQuizResult {
  const r = res.result;
  if (!r) {
    // Aucune correction (tentative expirée / rejetée) : résultat public minimal, aucune divulgation.
    const expired: PublicQuizResult = {
      status: "expired",
      scorePercent: 0,
      passed: false,
      correctCount: 0,
      totalQuestions: attempt.questions.length,
      competencies: [],
      feedbackKeys: ["assessment.feedback.expired"],
      strengths: [],
      toReview: [],
      recommendations: [],
      nextStepKey: "quiz.next.retry",
      retryAvailable: attempt.remainingAttempts > 0,
      requiresManualReview: false,
    };
    return assertClean(expired);
  }
  const fb = res.feedback;
  const correctCount = r.questionResults.filter((q) => q.correct === true).length;
  const status: QuizResultStatus = r.requiresManualReview ? "manual_review" : r.passed ? "passed" : "failed";
  const result: PublicQuizResult = {
    status,
    scorePercent: Math.round(r.percentage),
    passed: r.passed,
    correctCount,
    totalQuestions: r.questionResults.length,
    competencies: r.competencyResults.map((c) => c.competencyId),
    feedbackKeys: fb?.messageKeys ?? [],
    strengths: fb?.strengths ?? [],
    toReview: fb?.toReview ?? [],
    recommendations: [], // recommandations enrichies : Sprint K5
    nextStepKey: r.passed ? "quiz.next.continue" : "quiz.next.retry",
    retryAvailable: attempt.remainingAttempts > 0 && !r.passed,
    requiresManualReview: r.requiresManualReview,
  };
  return assertClean(result);
}

function assertClean(result: PublicQuizResult): PublicQuizResult {
  if (containsForbiddenUiKeys(result)) throw new Error("QUIZ_RESULT_LEAK");
  return result;
}

function parseReason(e: unknown): string {
  const msg = e instanceof Error ? e.message : String(e);
  const m = /^ATTEMPT_NOT_ALLOWED:(.+)$/.exec(msg);
  if (m) return m[1];
  if (/INSUFFICIENT_BANK/.test(msg)) return "INSUFFICIENT_BANK";
  return "RETRY_BLOCKED";
}
