/**
 * Runtime — Exam : FinalExamEngine (façade principale, Sprint G).
 *
 * Orchestration PURE et sécurisée du cycle de vie d'un examen final : admissibilité, création de session,
 * démarrage, sauvegarde, pause/reprise, heartbeat, soumission (finale, irréversible), correction automatique,
 * ouverture de révision humaine, finalisation, invalidation, abandon, expiration/auto-soumission, reprise.
 *
 * DÉTERMINISTE (horloge/seed/ids injectés) et IDEMPOTENT (commandId sur les commandes critiques). Jamais
 * d'accès Supabase/réseau. Ne modifie jamais la progression académique : renvoie état + événements d'audit.
 */
import type {
  ExamAccommodation,
  ExamAttempt,
  ExamContext,
  ExamEligibilityContext,
  ExamEligibilityResult,
  ExamEngineResult,
  ExamRetakeDecision,
  ExamRetakeRequest,
  FinalExamDefinition,
  ManualReviewRequest,
  StudentResponse,
} from "./types.ts";
import type { QuestionBank } from "../assessment/question-bank.ts";
import { ExamEligibilityEngine } from "./eligibility-engine.ts";
import { ExamAttemptManager } from "./exam-attempt-manager.ts";
import { ExamSessionManager } from "./exam-session-manager.ts";
import { AuthoritativeExamTimer } from "./authoritative-timer.ts";
import { ExamResponseManager } from "./response-manager.ts";
import { ExamNavigationPolicyEngine } from "./navigation-policy-engine.ts";
import { ExamIntegrityEngine, mergeIntegrity } from "./exam-integrity-engine.ts";
import { FinalExamGradingEngine } from "./final-exam-grading-engine.ts";
import { FinalDecisionEngine } from "./final-decision-engine.ts";
import { ManualReviewWorkflow } from "./manual-review-workflow.ts";
import { ExamAccommodationPolicyEngine } from "./accommodation-policy.ts";
import { ExamAuditEvents } from "./exam-audit-events.ts";
import { buildExamSession } from "./secure-exam-serializer.ts";

export interface CreateSessionParams {
  definition: FinalExamDefinition;
  bank: QuestionBank;
  learnerRef: string;
  attemptNumber: number;
  eligibility: ExamEligibilityResult;
  accommodations?: ExamAccommodation[];
  previousAttemptId?: string | null;
  retakeReason?: string | null;
  retakeAuthorizedBy?: string | null;
}

/** Construit la session publique à partir du contexte de navigation. */
function toSession(attempt: ExamAttempt, ctx: ExamContext): ExamEngineResult["session"] {
  const currentSectionId = attempt.sections.find((s) => !s.locked)?.id ?? attempt.sections[0]?.id ?? null;
  // Navigation FIGÉE de la tentative (versionnement) — jamais la config ambiante.
  return buildExamSession(attempt, ctx.now, currentSectionId, attempt.navigationPolicy.mode, attempt.navigationPolicy.allowBacktrack);
}

/** Renvoie l'attempt inchangé + session, avec des événements donnés (helper de sortie). */
function result(attempt: ExamAttempt, ctx: ExamContext, events: ExamEngineResult["events"]): ExamEngineResult {
  return { attempt, session: toSession(attempt, ctx), events };
}

/** Idempotence : la commande a-t-elle déjà été traitée ? */
function alreadyProcessed(attempt: ExamAttempt, commandId: string): boolean {
  return Object.prototype.hasOwnProperty.call(attempt.processedCommands, commandId);
}
function markProcessed(attempt: ExamAttempt, commandId: string, op: string): ExamAttempt {
  return { ...attempt, processedCommands: { ...attempt.processedCommands, [commandId]: op } };
}

export const FinalExamEngine = {
  // ─────────────────────── Admissibilité ───────────────────────
  checkEligibility(definition: FinalExamDefinition, eligibilityCtx: ExamEligibilityContext, ctx: ExamContext): { result: ExamEligibilityResult; events: ExamEngineResult["events"] } {
    const evaluated = ExamEligibilityEngine.evaluate(definition.eligibilityRule, eligibilityCtx, ctx.now);
    return { result: evaluated, events: [ExamAuditEvents.eligibilityChecked(ctx.now.toISOString(), definition.examId, evaluated.status, evaluated.reasonCodes)] };
  },

  // ─────────────────────── Création de session ───────────────────────
  createSession(params: CreateSessionParams, commandId: string, ctx: ExamContext): ExamEngineResult {
    if (!ExamEligibilityEngine.isAdmissible(params.eligibility)) {
      throw new Error(`NOT_ELIGIBLE:${params.eligibility.status}`);
    }
    const { accepted } = ExamAccommodationPolicyEngine.filterAllowed(params.definition.accommodationPolicy, params.accommodations ?? []);

    const attempt0 = ExamAttemptManager.create({
      id: ctx.idFactory(),
      sessionId: ctx.idFactory(),
      definition: params.definition,
      bank: params.bank,
      learnerRef: params.learnerRef,
      attemptNumber: params.attemptNumber,
      previousAttemptId: params.previousAttemptId ?? null,
      retakeReason: params.retakeReason ?? null,
      retakeAuthorizedBy: params.retakeAuthorizedBy ?? null,
      accommodations: accepted,
      seed: ctx.seed,
      now: ctx.now,
      gracePeriodSeconds: ctx.config.gracePeriodSeconds,
    });
    // created → eligibility_verified → ready
    const verified = ExamAttemptManager.withStatus(attempt0, "eligibility_verified", ctx.now);
    const ready = ExamAttemptManager.withStatus(verified, "ready", ctx.now);
    const marked = markProcessed(ready, commandId, "createSession");
    const at = ctx.now.toISOString();
    return result(marked, ctx, [ExamAuditEvents.sessionCreated(at, marked.sessionId, marked.id)]);
  },

  // ─────────────────────── Démarrage ───────────────────────
  start(attempt: ExamAttempt, commandId: string, ctx: ExamContext): ExamEngineResult {
    if (alreadyProcessed(attempt, commandId)) return result(attempt, ctx, []);
    ExamSessionManager.transition(attempt.status, "active");
    const started = ExamAttemptManager.start(attempt, ctx.now);
    const marked = markProcessed(started, commandId, "start");
    return result(marked, ctx, [ExamAuditEvents.started(ctx.now.toISOString(), marked.sessionId)]);
  },

  // ─────────────────────── Sauvegarde de réponse ───────────────────────
  saveAnswer(attempt: ExamAttempt, response: StudentResponse, commandId: string, ctx: ExamContext): ExamEngineResult {
    if (alreadyProcessed(attempt, commandId)) return result(attempt, ctx, []);
    const timer = AuthoritativeExamTimer.recompute(attempt.timer, ctx.now);
    const expired = timer.expired;
    const at = ctx.now.toISOString();

    const issues = ExamIntegrityEngine.checkAnswer(attempt, attempt.sections, response, expired);
    const blocking = issues.filter((i) => i.severity === "blocking");
    if (blocking.length > 0) {
      const responses = ExamResponseManager.reject(attempt.responses, response.questionId, response.value, blocking.map((i) => i.code), ctx.now);
      const next = markProcessed({ ...attempt, timer, responses, integrity: mergeIntegrity(attempt.integrity, issues), updatedAt: at }, commandId, "saveAnswer:rejected");
      return result(next, ctx, [ExamAuditEvents.answerRejected(at, next.sessionId, response.questionId, blocking.map((i) => i.code))]);
    }

    const nav = ExamNavigationPolicyEngine.canModifyAnswer(attempt.sections, response.questionId);
    if (!nav.allowed) {
      const responses = ExamResponseManager.reject(attempt.responses, response.questionId, response.value, nav.reasonCodes, ctx.now);
      const next = markProcessed({ ...attempt, timer, responses, updatedAt: at }, commandId, "saveAnswer:rejected");
      return result(next, ctx, [ExamAuditEvents.answerRejected(at, next.sessionId, response.questionId, nav.reasonCodes)]);
    }

    const saved = ExamResponseManager.save(attempt.responses, attempt.responseHistory, response.questionId, response.value, ctx.now);
    const integrity = issues.length > 0 ? mergeIntegrity(attempt.integrity, issues) : attempt.integrity;
    const next = markProcessed({ ...attempt, timer, responses: saved.responses, responseHistory: saved.history, integrity, updatedAt: at }, commandId, "saveAnswer");
    const revision = saved.responses[response.questionId]?.revision ?? 0;
    const events = saved.changed ? [ExamAuditEvents.answerSaved(at, next.sessionId, response.questionId, revision)] : [];
    return result(next, ctx, events);
  },

  // ─────────────────────── Pause / reprise ───────────────────────
  pause(attempt: ExamAttempt, commandId: string, ctx: ExamContext): ExamEngineResult {
    if (alreadyProcessed(attempt, commandId)) return result(attempt, ctx, []);
    if (attempt.timer.allowedPauseSeconds <= 0) {
      const warned = markProcessed({ ...attempt, integrity: mergeIntegrity(attempt.integrity, [{ code: "NAVIGATION_FORBIDDEN", severity: "warning", message: "Pause non autorisée." }]) }, commandId, "pause:forbidden");
      return result(warned, ctx, [ExamAuditEvents.warningRecorded(ctx.now.toISOString(), warned.sessionId, ["PAUSE_NOT_ALLOWED"])]);
    }
    ExamSessionManager.transition(attempt.status, "paused");
    const timer = AuthoritativeExamTimer.pause(attempt.timer, ctx.now);
    const next = markProcessed({ ...attempt, status: "paused", timer, updatedAt: ctx.now.toISOString() }, commandId, "pause");
    return result(next, ctx, [ExamAuditEvents.paused(ctx.now.toISOString(), next.sessionId)]);
  },

  resume(attempt: ExamAttempt, commandId: string, ctx: ExamContext): ExamEngineResult {
    if (alreadyProcessed(attempt, commandId)) return result(attempt, ctx, []);
    ExamSessionManager.transition(attempt.status, "resumed");
    const timer = AuthoritativeExamTimer.resume(attempt.timer, ctx.now);
    const next = markProcessed({ ...attempt, status: "active", timer, updatedAt: ctx.now.toISOString() }, commandId, "resume");
    return result(next, ctx, [ExamAuditEvents.resumed(ctx.now.toISOString(), next.sessionId)]);
  },

  // ─────────────────────── Heartbeat ───────────────────────
  heartbeat(attempt: ExamAttempt, ctx: ExamContext, clientElapsedSeconds?: number): ExamEngineResult {
    const gap = AuthoritativeExamTimer.heartbeatGapSeconds(attempt.timer, ctx.now);
    const timer = AuthoritativeExamTimer.heartbeat(attempt.timer, ctx.now);
    const at = ctx.now.toISOString();
    const issues = [
      ...ExamIntegrityEngine.checkHeartbeat(gap, ctx.config.heartbeatMaxGapSeconds),
      ...(clientElapsedSeconds !== undefined ? ExamIntegrityEngine.checkClientDrift(AuthoritativeExamTimer.clientDriftSeconds(attempt.timer, clientElapsedSeconds, ctx.now), ctx.config.clockDriftToleranceSeconds) : []),
    ];
    const integrity = issues.length > 0 ? mergeIntegrity(attempt.integrity, issues) : attempt.integrity;
    const next = { ...attempt, timer, integrity, updatedAt: at };
    const events = [ExamAuditEvents.heartbeatReceived(at, next.sessionId, gap), ...(issues.length > 0 ? [ExamAuditEvents.warningRecorded(at, next.sessionId, issues.map((i) => i.code))] : [])];
    return result(next, ctx, events);
  },

  // ─────────────────────── Soumission (irréversible) + correction automatique ───────────────────────
  submit(attempt: ExamAttempt, commandId: string, ctx: ExamContext): ExamEngineResult {
    if (alreadyProcessed(attempt, commandId)) return result(attempt, ctx, []); // idempotent : aucun nouvel effet
    const at = ctx.now.toISOString();
    const recomputed = AuthoritativeExamTimer.recompute(attempt.timer, ctx.now);
    const auto = recomputed.expired;

    // Verrouille toutes les sections, gèle le chronomètre.
    const lockedSections = attempt.sections.map((s) => ({ ...s, locked: true }));
    const timer = AuthoritativeExamTimer.markSubmitted(recomputed, ctx.now);

    ExamSessionManager.transition(attempt.status, "submitted");
    const submitted: ExamAttempt = { ...attempt, sections: lockedSections, timer, status: "submitted", updatedAt: at };

    // grading — utilise la politique FIGÉE de la tentative (versionnement), pas la config ambiante.
    const grading = FinalExamGradingEngine.grade(submitted.sections, submitted.responses, submitted.gradingPolicy);
    const provisional = FinalDecisionEngine.buildProvisional(submitted, grading, ctx.now);
    const status = grading.requiresManualReview ? "pending_manual_review" : "provisionally_graded";
    const graded: ExamAttempt = { ...submitted, status: "grading", provisionalResult: provisional };
    const final = markProcessed({ ...graded, status }, commandId, auto ? "submit:auto" : "submit");

    const events: ExamEngineResult["events"] = [];
    if (auto) events.push(ExamAuditEvents.expired(at, final.sessionId), ExamAuditEvents.autoSubmitted(at, final.sessionId));
    events.push(ExamAuditEvents.submitted(at, final.sessionId, commandId), ExamAuditEvents.gradingStarted(at, final.sessionId), ExamAuditEvents.automaticGradingCompleted(at, final.sessionId, grading.percentage), ExamAuditEvents.provisionalResultCreated(at, final.sessionId, grading.passedAutomatically ? "provisional_pass" : "provisional_fail"));
    if (grading.requiresManualReview) events.push(ExamAuditEvents.manualReviewRequested(at, final.sessionId, grading.questionResults.filter((r) => r.gradingStatus === "pending_manual_review").map((r) => r.questionId)));
    return result(final, ctx, events);
  },

  /** Ouvre une demande de révision humaine à partir du résultat provisoire (aucune UI). */
  openManualReview(attempt: ExamAttempt, ctx: ExamContext): ManualReviewRequest {
    const pendingIds = attempt.provisionalResult?.gradingResult.questionResults.filter((r) => r.gradingStatus === "pending_manual_review").map((r) => r.questionId) ?? [];
    return ManualReviewWorkflow.create({ id: ctx.idFactory(), attemptId: attempt.id, questionIds: pendingIds, rubricVersion: attempt.frozenVersion.rubricsVersion, reasonCodes: ["MANUAL_REVIEW_PENDING"], now: ctx.now });
  },

  // ─────────────────────── Finalisation ───────────────────────
  finalize(
    attempt: ExamAttempt,
    commandId: string,
    ctx: ExamContext,
    opts: { review?: ManualReviewRequest | null; humanScores?: Record<string, number>; administrativeOverride?: "pass" | "fail" | "requires_review" | null; auditReference: string },
  ): ExamEngineResult {
    if (alreadyProcessed(attempt, commandId)) return result(attempt, ctx, []);
    if (!attempt.provisionalResult) throw new Error("NO_PROVISIONAL_RESULT");
    const at = ctx.now.toISOString();

    const decided = FinalDecisionEngine.finalize({
      attempt,
      provisional: attempt.provisionalResult,
      policy: attempt.gradingPolicy,
      review: opts.review ?? null,
      humanScores: opts.humanScores ?? {},
      administrativeOverride: opts.administrativeOverride ?? null,
      now: ctx.now,
      auditReference: opts.auditReference,
    });

    // Résultat encore provisoire (révision incomplète / administrative) : ne pas finaliser.
    if (!decided.finalResult) {
      const held = markProcessed({ ...attempt, updatedAt: at }, commandId, "finalize:held");
      return result(held, ctx, [ExamAuditEvents.provisionalResultCreated(at, held.sessionId, decided.decision)]);
    }

    // grading/pending → finalized → passed|failed (ou terminal invalidated/cancelled).
    let status = attempt.status;
    const events: ExamEngineResult["events"] = [ExamAuditEvents.manualReviewCompleted(at, attempt.sessionId, opts.review?.status ?? "not_required")];
    if (decided.finalResult.finalStatus === "passed" || decided.finalResult.finalStatus === "failed") {
      status = ExamSessionManager.transition(status, "finalized");
      status = ExamSessionManager.transition(status, decided.finalResult.finalStatus);
      events.push(ExamAuditEvents.finalResultCreated(at, attempt.sessionId, decided.finalResult.finalStatus));
      events.push(decided.finalResult.passed ? ExamAuditEvents.passed(at, attempt.sessionId) : ExamAuditEvents.failed(at, attempt.sessionId));
    } else {
      // invalidated / cancelled : statut terminal via transition légale.
      status = ExamSessionManager.transition(status, decided.finalResult.finalStatus === "invalidated" ? "invalidated" : "invalidated");
      events.push(ExamAuditEvents.finalResultCreated(at, attempt.sessionId, decided.finalResult.finalStatus));
    }

    const finalized = markProcessed({ ...attempt, status, finalResult: decided.finalResult, updatedAt: at }, commandId, "finalize");
    return result(finalized, ctx, events);
  },

  // ─────────────────────── Invalidation / abandon / annulation ───────────────────────
  invalidate(attempt: ExamAttempt, reason: string, commandId: string, ctx: ExamContext): ExamEngineResult {
    if (alreadyProcessed(attempt, commandId)) return result(attempt, ctx, []);
    const status = ExamSessionManager.transition(attempt.status, "invalidated");
    const next = markProcessed({ ...attempt, status, lifecycle: "invalidated", invalidationReason: reason, updatedAt: ctx.now.toISOString() }, commandId, "invalidate");
    return result(next, ctx, [ExamAuditEvents.invalidated(ctx.now.toISOString(), next.sessionId, reason)]);
  },

  abandon(attempt: ExamAttempt, commandId: string, ctx: ExamContext): ExamEngineResult {
    if (alreadyProcessed(attempt, commandId)) return result(attempt, ctx, []);
    const status = ExamSessionManager.transition(attempt.status, "abandoned");
    const next = markProcessed({ ...attempt, status, updatedAt: ctx.now.toISOString() }, commandId, "abandon");
    return result(next, ctx, [ExamAuditEvents.warningRecorded(ctx.now.toISOString(), next.sessionId, ["ABANDONED"])]);
  },

  cancel(attempt: ExamAttempt, reason: string, commandId: string, ctx: ExamContext): ExamEngineResult {
    if (alreadyProcessed(attempt, commandId)) return result(attempt, ctx, []);
    const status = ExamSessionManager.transition(attempt.status, "cancelled");
    const next = markProcessed({ ...attempt, status, lifecycle: "cancelled", cancellationReason: reason, updatedAt: ctx.now.toISOString() }, commandId, "cancel");
    return result(next, ctx, [ExamAuditEvents.cancelled(ctx.now.toISOString(), next.sessionId, reason)]);
  },

  // ─────────────────────── Reprise ───────────────────────
  requestRetake(attempt: ExamAttempt, reason: string, ctx: ExamContext): { request: ExamRetakeRequest; events: ExamEngineResult["events"] } {
    const request: ExamRetakeRequest = { id: ctx.idFactory(), attemptId: attempt.id, learnerRef: attempt.learnerRef, reason, requestedAt: ctx.now.toISOString() };
    return { request, events: [ExamAuditEvents.retakeRequested(ctx.now.toISOString(), attempt.id, request.id)] };
  },

  decideRetake(
    request: ExamRetakeRequest,
    definition: FinalExamDefinition,
    attemptNumber: number,
    lastCompletedAt: string | null,
    authorize: boolean,
    authorizedBy: string | null,
    ctx: ExamContext,
  ): { decision: ExamRetakeDecision; events: ExamEngineResult["events"] } {
    const gate = ExamAttemptManager.canRetake(definition.retake, attemptNumber, lastCompletedAt, ctx.now);
    const at = ctx.now.toISOString();
    if (!authorize || !gate.allowed) {
      const reasonCodes = authorize ? gate.reasonCodes : ["RETAKE_DENIED_BY_AUTHORITY"];
      return { decision: { requestId: request.id, status: "denied", authorizedBy, cooldownUntil: null, reasonCodes, decidedAt: at }, events: [ExamAuditEvents.retakeDenied(at, request.id, reasonCodes)] };
    }
    const cooldownUntil = definition.retake.cooldownSeconds > 0 && lastCompletedAt ? new Date(new Date(lastCompletedAt).getTime() + definition.retake.cooldownSeconds * 1000).toISOString() : null;
    return { decision: { requestId: request.id, status: "authorized", authorizedBy, cooldownUntil, reasonCodes: ["RETAKE_AUTHORIZED"], decidedAt: at }, events: [ExamAuditEvents.retakeAuthorized(at, request.id)] };
  },
};
