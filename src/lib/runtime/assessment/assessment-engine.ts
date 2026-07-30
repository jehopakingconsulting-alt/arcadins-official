/**
 * Runtime — Assessment : AssessmentEngine (façade, Sprint F).
 *
 * Orchestration PURE : créer une tentative, enregistrer des réponses, soumettre (correction serveur),
 * finaliser/abandonner, produire événements + rétroaction + signaux de compétence. DÉTERMINISTE et IDEMPOTENT.
 * Ne modifie jamais la progression académique directement : renvoie résultats/signaux/événements à traiter en aval.
 */
import type {
  AssessmentAttempt,
  AssessmentContext,
  AssessmentDefinition,
  AssessmentEngineResult,
  AssessmentEvent,
  AssessmentSession,
  StudentResponse,
} from "./types.ts";
import type { QuestionBank } from "./question-bank.ts";
import { QuestionSelector } from "./question-selector.ts";
import { AttemptManager } from "./attempt-manager.ts";
import { AssessmentPolicyEngine } from "./assessment-policy-engine.ts";
import { AssessmentIntegrity } from "./assessment-integrity.ts";
import { AnswerNormalizer } from "./answer-normalizer.ts";
import { GradingEngine } from "./grading-engine.ts";
import { CompetencyAssessmentEngine } from "./competency-assessment-engine.ts";
import { FeedbackEngine } from "./feedback-engine.ts";
import { AssessmentEvents } from "./assessment-events.ts";

export interface CreateAttemptParams {
  definition: AssessmentDefinition;
  bank: QuestionBank;
  learnerRef: string;
  priorAttempts: number;
  ctx: AssessmentContext;
  previousAttemptId?: string | null;
  lastCompletedAt?: string | null;
}

export const AssessmentEngine = {
  /** Crée et démarre une tentative (throw si tentatives dépassées, délai actif ou banque insuffisante). */
  createAttempt(params: CreateAttemptParams): AssessmentEngineResult {
    const { definition, bank, ctx } = params;
    const policy = ctx.config.policy;
    const attemptNumber = params.priorAttempts + 1;

    const gate = AssessmentPolicyEngine.canAttempt(policy, attemptNumber, params.lastCompletedAt ?? null, ctx.now);
    if (!gate.allowed) throw new Error(`ATTEMPT_NOT_ALLOWED:${gate.reason}`);

    const questions = QuestionSelector.select(bank, definition.selection, ctx.seed);
    if (questions.length < definition.selection.count) throw new Error("INSUFFICIENT_BANK");

    const attempt = AttemptManager.create({
      id: ctx.idFactory(),
      assessmentId: definition.id,
      learnerRef: params.learnerRef,
      programId: definition.programId,
      moduleId: definition.moduleId,
      lessonId: definition.lessonId,
      attemptNumber,
      policy,
      seed: ctx.seed,
      questions,
      previousAttemptId: params.previousAttemptId ?? null,
      now: ctx.now,
    });
    const session = AttemptManager.buildSession(attempt, ctx.now);
    const at = ctx.now.toISOString();
    const events = [AssessmentEvents.attemptCreated(at, attempt.id, attempt.attemptNumber), AssessmentEvents.started(at, attempt.id)];
    return { attempt, session, result: null, feedback: null, competencySignals: [], events };
  },

  /** Enregistre une réponse (rejet si soumise/question étrangère/mal formée). */
  saveAnswer(attempt: AssessmentAttempt, session: AssessmentSession, response: StudentResponse, ctx: AssessmentContext): { attempt: AssessmentAttempt; session: AssessmentSession; events: AssessmentEvent[] } {
    const at = ctx.now.toISOString();
    const check = AssessmentIntegrity.checkAnswer(attempt, response);
    if (!check.ok) {
      return { attempt, session, events: [AssessmentEvents.integrityWarning(at, attempt.id, check.issues.map((i) => i.code))] };
    }
    const nextAttempt: AssessmentAttempt = { ...attempt, responses: { ...attempt.responses, [response.questionId]: response.value } };
    const nextSession = AttemptManager.buildSession(nextAttempt, ctx.now);
    return { attempt: nextAttempt, session: nextSession, events: [AssessmentEvents.answerSaved(at, attempt.id, response.questionId)] };
  },

  /** Met en pause (si autorisé). */
  pause(attempt: AssessmentAttempt, session: AssessmentSession, ctx: AssessmentContext) {
    const at = ctx.now.toISOString();
    if (!ctx.config.policy.navigation.allowPause) return { attempt, session, events: [AssessmentEvents.integrityWarning(at, attempt.id, ["PAUSE_NOT_ALLOWED"])] };
    const next = AttemptManager.withStatus(attempt, "paused");
    return { attempt: next, session: AttemptManager.buildSession(next, ctx.now), events: [AssessmentEvents.paused(at, attempt.id)] };
  },
  resume(attempt: AssessmentAttempt, _session: AssessmentSession, ctx: AssessmentContext) {
    const at = ctx.now.toISOString();
    const next = AttemptManager.withStatus(attempt, "in_progress");
    return { attempt: next, session: AttemptManager.buildSession(next, ctx.now), events: [AssessmentEvents.resumed(at, attempt.id)] };
  },

  /** Abandonne la tentative. */
  abandon(attempt: AssessmentAttempt, ctx: AssessmentContext) {
    const at = ctx.now.toISOString();
    const next = AttemptManager.withStatus(attempt, "abandoned");
    return { attempt: next, session: AttemptManager.buildSession(next, ctx.now), events: [AssessmentEvents.abandoned(at, attempt.id)] };
  },

  /**
   * Soumet et corrige (côté serveur). IDEMPOTENT : rejouer la même `commandId` ne recrée pas de résultat,
   * ne consomme pas de tentative et ne duplique pas les événements critiques.
   */
  submit(attempt: AssessmentAttempt, session: AssessmentSession, commandId: string, ctx: AssessmentContext): AssessmentEngineResult {
    const at = ctx.now.toISOString();
    const policy = ctx.config.policy;

    // Idempotence : même commande déjà traitée → renvoyer le résultat existant sans effet de bord.
    if (attempt.submittedCommandId === commandId && attempt.result) {
      return { attempt, session, result: attempt.result, feedback: rebuildFeedback(attempt, ctx), competencySignals: CompetencyAssessmentEngine.toSignals(attempt.result.competencyResults), events: [] };
    }

    const integrity = AssessmentIntegrity.checkSubmission(attempt, commandId, ctx.now);
    if (!integrity.ok && integrity.issues.some((i) => i.code === "ALREADY_SUBMITTED")) {
      return { attempt, session, result: attempt.result, feedback: null, competencySignals: [], events: [AssessmentEvents.integrityWarning(at, attempt.id, integrity.issues.map((i) => i.code))] };
    }

    // Expiration (politique de soumission tardive).
    if (AssessmentPolicyEngine.isExpired(attempt.expiresAt, ctx.now) && policy.timing.lateSubmission === "reject") {
      const expired = { ...AttemptManager.withStatus(attempt, "expired"), submittedAt: at };
      return { attempt: expired, session: AttemptManager.buildSession(expired, ctx.now), result: null, feedback: null, competencySignals: [], events: [AssessmentEvents.expired(at, attempt.id)] };
    }

    // Correction serveur (utilise les questions FIGÉES de la tentative).
    const normalized = attempt.questions.map((q) => AnswerNormalizer.normalize(q, attempt.responses[q.id] !== undefined ? { questionId: q.id, value: attempt.responses[q.id] } : undefined));
    const result = GradingEngine.gradeAttempt(attempt.questions, normalized, policy, ctx.config.ignoreAccents);
    const competencySignals = CompetencyAssessmentEngine.toSignals(result.competencyResults);

    const status = result.requiresManualReview ? "submitted" : "completed";
    const gradedAttempt: AssessmentAttempt = {
      ...attempt,
      status,
      submittedAt: at,
      completedAt: result.requiresManualReview ? null : at,
      submittedCommandId: commandId,
      elapsedSeconds: AssessmentPolicyEngine.elapsedSeconds(attempt.startedAt, ctx.now),
      result,
    };

    const feedback = FeedbackEngine.build(result, attempt.questions, {
      policy: policy.feedback,
      expired: AssessmentPolicyEngine.isExpired(attempt.expiresAt, ctx.now),
      remainingAttempts: attempt.remainingAttempts,
    });

    const events: AssessmentEvent[] = [AssessmentEvents.submitted(at, attempt.id, commandId)];
    if (result.requiresManualReview) {
      events.push(AssessmentEvents.manualReviewRequired(at, attempt.id, result.questionResults.filter((r) => r.gradingStatus === "pending_manual_review").map((r) => r.questionId)));
    } else {
      events.push(AssessmentEvents.graded(at, attempt.id, result.percentage));
      events.push(result.passed ? AssessmentEvents.completed(at, attempt.id, true) : AssessmentEvents.failed(at, attempt.id));
    }
    if (feedback.released) events.push(AssessmentEvents.feedbackReleased(at, attempt.id));

    return { attempt: gradedAttempt, session: AttemptManager.buildSession(gradedAttempt, ctx.now), result, feedback, competencySignals, events };
  },
};

function rebuildFeedback(attempt: AssessmentAttempt, ctx: AssessmentContext) {
  if (!attempt.result) return null;
  return FeedbackEngine.build(attempt.result, attempt.questions, {
    policy: ctx.config.policy.feedback,
    expired: AssessmentPolicyEngine.isExpired(attempt.expiresAt, ctx.now),
    remainingAttempts: attempt.remainingAttempts,
  });
}
