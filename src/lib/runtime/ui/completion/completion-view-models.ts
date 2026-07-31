/**
 * Runtime — UI/Completion : view model PUBLIC de complétion (Sprint K3C).
 *
 * Ne transporte QUE des données autorisées : statut, score public, compétences publiques, statut de révision,
 * statut de reprise, prochaine action, admissibilité à la certification + avertissement « aucun certificat
 * émis ». JAMAIS : GradingResult interne, tentative privée, barème, note de réviseur, raison interne, signaux.
 * Validé par `ensureClientSafePayload`.
 */
import type { CompletionInput } from "./completion-types.ts";
import type { CompletionState } from "./assessment-completion-orchestrator.ts";
import type { CompetencySummaryItem } from "./competency-aggregation.ts";
import { ensureClientSafePayload } from "../security/ensure-client-safe.ts";

export interface AssessmentCompletionViewModel {
  programTitleKey: string;
  status: string;
  decisionKind: "none" | "provisional" | "final";
  scorePercent: number | null;
  passed: boolean | null; // null tant que non définitif
  publicReasonKeys: string[];
  competencies: CompetencySummaryItem[];
  acquiredCount: number;
  totalCompetencies: number;
  remainingRequirementKeys: string[];
  reviewStatusKey: string;
  retake: { available: boolean; exhausted: boolean; attemptsRemaining: number; reasonKey: string } | null;
  nextActionKey: string;
  certificationEligibility: boolean;
  certificateEmitted: false; // invariant public : aucun certificat émis à ce stade
  noCertificateNoticeKey: string;
}

function nextAction(state: CompletionState): string {
  if (state.final) return state.final.passed ? "completion.next.completed" : state.retake?.allowed ? "completion.next.retake" : "completion.next.review_material";
  switch (state.status) {
    case "quiz_requirements_pending": return "completion.next.finish_quizzes";
    case "final_exam_eligible": return "completion.next.start_exam";
    case "final_exam_not_eligible": return "completion.next.meet_requirements";
    case "manual_review_pending":
    case "manual_review_in_progress": return "completion.next.await_review";
    case "provisional_pass": return "completion.next.await_decision";
    case "provisional_fail": return "completion.next.review_material";
    case "suspended":
    case "administratively_blocked": return "completion.next.contact_admin";
    default: return "completion.next.continue";
  }
}

export function toCompletionViewModel(state: CompletionState, input: CompletionInput): AssessmentCompletionViewModel {
  const decisionKind: "none" | "provisional" | "final" = state.final ? "final" : state.provisional ? "provisional" : "none";
  const scorePercent = state.final ? (input.exam.percentage ?? null) : state.provisional?.scorePercent ?? null;
  const passed = state.final ? state.final.passed : null;
  const publicReasonKeys = state.final ? state.final.publicReasonKeys : state.provisional?.publicReasonKeys ?? [];
  const items = state.competencySummary?.items ?? [];

  return ensureClientSafePayload({
    programTitleKey: input.programTitleKey,
    status: state.status,
    decisionKind,
    scorePercent: scorePercent === null ? null : Math.round(scorePercent),
    passed,
    publicReasonKeys,
    competencies: items,
    acquiredCount: state.competencySummary?.acquiredIds.length ?? 0,
    totalCompetencies: items.length,
    remainingRequirementKeys: state.competencySummary?.remainingRequirementKeys ?? [],
    reviewStatusKey: `exam.review.status.${state.reviewStatus}`,
    retake: state.retake
      ? { available: state.retake.allowed, exhausted: state.retake.exhausted, attemptsRemaining: state.retake.attemptsRemaining, reasonKey: state.retake.publicReasonKey }
      : null,
    nextActionKey: nextAction(state),
    certificationEligibility: state.certificationEligibility,
    certificateEmitted: false as const,
    noCertificateNoticeKey: "completion.notice.no_certificate_yet",
  });
}
