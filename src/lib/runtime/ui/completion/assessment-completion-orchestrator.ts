/**
 * Runtime — UI/Completion : orchestrateur de complétion d'évaluation (Sprint K3C).
 *
 * COMPOSE les moteurs existants (quiz K3A, examen G/K3B, révision manuelle G) — ne réécrit AUCUNE correction.
 * `consolidate` est une transition PURE (état + entrée + commandId → nouvel état + événements). Idempotent par
 * commandId ; décision finale IMMUABLE et VERSIONNÉE ; concurrence : une seule décision finale acceptée.
 *
 * PUR / node-testable. Imports RELATIFS.
 */
import type { CompletionEvent } from "./completion-events.ts";
import { CompletionEvents } from "./completion-events.ts";
import type { CompletionInput, CompletionStatus, FinalDecision, ProvisionalDecision, RetakeOutcome } from "./completion-types.ts";
import type { ResultPolicyConfig } from "./completion-config.ts";
import { DEFAULT_RESULT_POLICY } from "./completion-config.ts";
import { computeCompletionStatus, deriveFinal, evaluateProvisional, isFinalAvailable } from "./result-policy.ts";
import { evaluateRetake } from "./retake-policy-evaluator.ts";
import { aggregateCompetencies, type CompetencySummary } from "./competency-aggregation.ts";

export interface CompletionState {
  status: CompletionStatus;
  provisional: ProvisionalDecision | null;
  final: FinalDecision | null;
  reviewStatus: import("../../exam/types.ts").ManualReviewStatus | "not_required";
  retake: RetakeOutcome | null;
  certificationEligibility: boolean;
  competencySummary: CompetencySummary | null;
  /** Codes d'audit INTERNES — jamais publiés côté client. */
  internalReasonCodes: string[];
  events: CompletionEvent[];
  /** Journal d'idempotence : commandId → identifiant logique produit. */
  processedCommands: Record<string, string>;
  version: number;
}

export interface ConsolidateContext {
  now: () => Date;
  idFactory: () => string;
  config?: ResultPolicyConfig;
}

export interface ConsolidateResult {
  state: CompletionState;
  events: CompletionEvent[];
  provisional: ProvisionalDecision | null;
  final: FinalDecision | null;
  retake: RetakeOutcome | null;
  competencySummary: CompetencySummary | null;
}

export const COMPLETION_STATE_VERSION = 1;

export function initialCompletionState(): CompletionState {
  return {
    status: "not_started",
    provisional: null,
    final: null,
    reviewStatus: "not_required",
    retake: null,
    certificationEligibility: false,
    competencySummary: null,
    internalReasonCodes: [],
    events: [],
    processedCommands: {},
    version: COMPLETION_STATE_VERSION,
  };
}

export const AssessmentCompletionOrchestrator = {
  /** Consolidation PURE et idempotente. */
  consolidate(state: CompletionState, input: CompletionInput, commandId: string, ctx: ConsolidateContext): ConsolidateResult {
    // Idempotence : commande déjà traitée → aucun effet, aucun nouvel événement.
    if (state.processedCommands[commandId]) {
      return { state, events: [], provisional: state.provisional, final: state.final, retake: state.retake, competencySummary: state.competencySummary };
    }

    const config = ctx.config ?? DEFAULT_RESULT_POLICY;
    const at = ctx.now().toISOString();
    const newEvents: CompletionEvent[] = [];

    const retake = evaluateRetake(input, ctx.now());
    const competencySummary = aggregateCompetencies(input, config);
    const hasFinal = isFinalAvailable(input);

    // ── Décision provisoire (enregistrée une seule fois) ────────────────────
    let provisional = state.provisional;
    const internal = new Set(state.internalReasonCodes);
    if (!provisional && (input.exam.status === "provisionally_graded" || input.exam.status === "pending_manual_review" || input.exam.status === "finalized")) {
      const p = evaluateProvisional(input, config);
      provisional = { provisionalId: ctx.idFactory(), status: p.status, scorePercent: p.scorePercent, recordedAt: at, publicReasonKeys: p.publicReasonKeys };
      p.internalReasonCodes.forEach((c) => internal.add(c));
      newEvents.push(CompletionEvents.provisionalRecorded(at, provisional.provisionalId, provisional.status, provisional.scorePercent));
    }

    // ── Révision manuelle ───────────────────────────────────────────────────
    const reviewStatus = input.reviewStatus;
    if (input.exam.requiresManualReview && state.reviewStatus === "not_required" && reviewStatus !== "not_required") {
      newEvents.push(CompletionEvents.manualReviewOpened(at, reviewStatus));
    }
    if (input.reviewComplete && state.reviewStatus !== "finalized" && (reviewStatus === "finalized" || reviewStatus === "approved" || reviewStatus === "rejected")) {
      newEvents.push(CompletionEvents.manualReviewCompleted(at, reviewStatus));
    }

    // ── Décision finale (IMMUABLE : construite une seule fois) ───────────────
    let final = state.final;
    let certificationEligibility = state.certificationEligibility;
    if (!final && hasFinal) {
      const f = deriveFinal(input);
      f.internalReasonCodes.forEach((c) => internal.add(c));
      certificationEligibility = f.passed && input.exam.certificateEligibility;
      final = {
        decisionId: ctx.idFactory(),
        finalStatus: f.finalStatus,
        passed: f.passed,
        decidedAt: at,
        policyVersion: input.policyVersion,
        curriculumVersion: input.curriculumVersion,
        quizEngineVersion: input.versions.quizEngineVersion,
        examEngineVersion: input.versions.examEngineVersion,
        reviewPolicyVersion: input.versions.reviewPolicyVersion,
        runtimeVersion: input.versions.runtimeVersion,
        contractVersion: input.versions.contractVersion,
        publicReasonKeys: f.publicReasonKeys,
        certificationEligibility,
        examAttemptId: input.exam.attemptId,
      };
      newEvents.push(CompletionEvents.finalDecisionRecorded(at, final.decisionId, final.finalStatus, final.passed));
      newEvents.push(final.passed ? CompletionEvents.programPassed(at, final.decisionId) : CompletionEvents.programFailed(at, final.decisionId));
      newEvents.push(CompletionEvents.certificationEligibilityUpdated(at, certificationEligibility));
    }

    // ── Reprise (événements informatifs après échec final) ──────────────────
    if (final && !final.passed) {
      if (retake.exhausted && !state.processedCommands[`retake-exhausted:${final.decisionId}`]) newEvents.push(CompletionEvents.retakeExhausted(at));
      else if (retake.allowed) newEvents.push(CompletionEvents.retakeGranted(at, retake.attemptsRemaining));
    }

    const status = computeCompletionStatus(input, config, final !== null, retake.exhausted, retake.allowed);
    newEvents.push(CompletionEvents.completionUpdated(at, status));

    const nextState: CompletionState = {
      ...state,
      status,
      provisional,
      final,
      reviewStatus,
      retake,
      certificationEligibility,
      competencySummary,
      internalReasonCodes: [...internal],
      events: [...state.events, ...newEvents],
      processedCommands: { ...state.processedCommands, [commandId]: final?.decisionId ?? provisional?.provisionalId ?? status },
      version: COMPLETION_STATE_VERSION,
    };

    return { state: nextState, events: newEvents, provisional, final, retake, competencySummary };
  },
};
