/**
 * Runtime — UI/Exam : view models PUBLICS de l'examen final (Sprint K3B).
 *
 * Ne transportent QUE des données autorisées : aucune bonne réponse, aucun barème, aucune note privée, aucun
 * signal d'intégrité interne, aucun checksum privé. Garde `ensureCleanExam` (défense en profondeur, testable)
 * via `containsForbiddenKeys` (Sprint G). Imports RELATIFS (.ts) : exécutables par le runner Node.
 */
import type {
  ExamEligibilityResult,
  ExamFinalResult,
  ExamProvisionalResult,
  ExamPublicTimer,
  ExamResultContract,
  ExamSession,
} from "../../exam/types.ts";
import type { ManualReviewStatus } from "../../exam/types.ts";
import type { PublicQuestion } from "../../assessment/types.ts";
import { containsForbiddenKeys } from "../../exam/secure-exam-serializer.ts";
import type { PublicQuestionViewModel } from "../view-models.ts";
import type { PublicQuestionKind } from "../types.ts";

// ── Phases d'interface (sous-ensemble utile des états obligatoires §11) ──────
export type ExamRuntimePhase =
  | "eligibility_checking"
  | "eligible"
  | "not_eligible"
  | "instructions"
  | "ready_to_start"
  | "in_progress"
  | "submitting"
  | "submitted"
  | "grading"
  | "manual_review_required"
  | "provisional_result"
  | "decision_final"
  | "expired"
  | "feature_disabled"
  | "error";

export type ExamEligibilityPublicStatus =
  | "eligible"
  | "not_eligible"
  | "already_passed"
  | "attempts_exhausted"
  | "expired"
  | "suspended"
  | "administrative_hold"
  | "feature_disabled"
  | "unknown";

export interface ExamEligibilityViewModel {
  status: ExamEligibilityPublicStatus;
  canStart: boolean;
  reasonKeys: string[]; // raisons PUBLIQUES explicables (clés i18n), jamais d'info interne sensible
}

export interface ExamPublicQuestionViewModel extends PublicQuestionViewModel {
  sectionId: string;
}

export interface ExamSectionViewModel {
  id: string;
  titleKey: string;
  locked: boolean;
  sequential: boolean;
  questions: ExamPublicQuestionViewModel[];
}

export interface ExamTimerViewModel {
  officialStartedAt: string | null;
  remainingSeconds: number;
  expired: boolean;
  inGracePeriod: boolean;
  warning: boolean; // temps faible (affichage), calculé à partir du temps AUTORITAIRE
}

export interface ExamSessionViewModel {
  examId: string;
  attemptId: string;
  status: string;
  sections: ExamSectionViewModel[];
  currentSectionId: string | null;
  navigationMode: "free" | "sequential";
  allowBacktrack: boolean;
  answered: number;
  total: number;
  timer: ExamTimerViewModel;
}

export interface ExamProvisionalResultViewModel {
  attemptNumber: number | null;
  submittedAt: string | null;
  receiptStatus: "received";
  scorePercent: number; // score PROVISOIRE autorisé (corrigé serveur)
  passedProvisional: boolean; // réussite AUTOMATIQUE provisoire (jamais définitive)
  requiresManualReview: boolean;
  sectionSummaries: { sectionId: string; percent: number; passed: boolean }[];
  reasonKeys: string[];
}

export interface ExamReviewStatusViewModel {
  status: ManualReviewStatus | "not_required";
  labelKey: string;
}

export interface ExamFinalDecisionViewModel {
  finalStatus: string; // ExamDecisionStatus
  decided: boolean;
  passed: boolean | null; // null tant que la décision n'est pas disponible
  scorePercent: number | null;
  certificateEligibility: boolean; // via ExamResultContract UNIQUEMENT ; aucun certificat émis
  reviewStatus: ManualReviewStatus | "not_required";
  finalizedAt: string | null;
  nextMilestoneKey: string;
}

// ── Garde anti-fuite ─────────────────────────────────────────────────────────
export function ensureCleanExam<T>(vm: T): T {
  if (containsForbiddenKeys(vm)) throw new Error("EXAM_VM_LEAK");
  return vm;
}

function mapKind(type: PublicQuestion["type"]): PublicQuestionKind {
  switch (type) {
    case "multiple":
      return "multiple";
    case "true_false":
      return "true_false";
    case "short_answer":
      return "short_answer";
    case "matching":
      return "matching";
    case "ordering":
      return "ordering";
    case "structured_text":
    case "file_reference":
      return "case";
    default:
      return "single";
  }
}

// ── Mappers ──────────────────────────────────────────────────────────────────
export function toExamEligibilityViewModel(r: ExamEligibilityResult, isAdmissible: boolean): ExamEligibilityViewModel {
  const codes = new Set([...r.reasonCodes, ...r.unmetRuleCodes]);
  let status: ExamEligibilityPublicStatus;
  if (r.status === "eligible") status = "eligible";
  else if (codes.has("ADMINISTRATIVE_HOLD") || codes.has("ADMIN_HOLD")) status = "administrative_hold";
  else if ([...codes].some((c) => /ATTEMPT|MAX_ATTEMPTS|EXHAUST/i.test(c))) status = "attempts_exhausted";
  else if ([...codes].some((c) => /WINDOW|EXPIRED|CLOSED/i.test(c))) status = "expired";
  else if ([...codes].some((c) => /SUSPEND/i.test(c))) status = "suspended";
  else if ([...codes].some((c) => /ALREADY_PASSED|PASSED/i.test(c))) status = "already_passed";
  else if (r.status === "ineligible" || r.status === "conditionally_eligible" || r.status === "requires_manual_approval") status = "not_eligible";
  else status = "unknown";
  return ensureCleanExam({
    status,
    canStart: isAdmissible && status === "eligible",
    reasonKeys: [...codes].map((c) => `exam.eligibility.reason.${c.toLowerCase()}`),
  });
}

export function toExamTimerViewModel(t: ExamPublicTimer, warningThresholdSeconds = 300): ExamTimerViewModel {
  return {
    officialStartedAt: t.officialStartedAt,
    remainingSeconds: Math.max(0, t.remainingOfficialSeconds),
    expired: t.expired,
    inGracePeriod: t.inGracePeriod,
    warning: !t.expired && t.remainingOfficialSeconds <= warningThresholdSeconds,
  };
}

export function toExamSessionViewModel(session: ExamSession): ExamSessionViewModel {
  const sections: ExamSectionViewModel[] = session.sections.map((s) => ({
    id: s.id,
    titleKey: s.titleKey,
    locked: s.locked,
    sequential: s.sequential,
    questions: s.questions.map((q) => ({
      questionId: q.id,
      sectionId: s.id,
      kind: mapKind(q.type),
      prompt: q.prompt,
      options: q.options ? q.options.map((o) => ({ id: o.id, label: o.label })) : undefined,
      points: q.points,
    })),
  }));
  return ensureCleanExam({
    examId: session.examId,
    attemptId: session.attemptId,
    status: session.status,
    sections,
    currentSectionId: session.navigation.currentSectionId,
    navigationMode: session.navigation.mode,
    allowBacktrack: session.navigation.allowBacktrack,
    answered: session.progress.answered,
    total: session.progress.total,
    timer: toExamTimerViewModel(session.timer),
  });
}

export function toExamProvisionalResultViewModel(pr: ExamProvisionalResult, attemptNumber: number | null): ExamProvisionalResultViewModel {
  const g = pr.gradingResult;
  return ensureCleanExam({
    attemptNumber,
    submittedAt: pr.createdAt,
    receiptStatus: "received" as const,
    scorePercent: Math.round(g.percentage),
    passedProvisional: g.passedAutomatically,
    requiresManualReview: g.requiresManualReview,
    sectionSummaries: g.sectionResults.map((s) => ({ sectionId: s.sectionId, percent: Math.round(s.percentage), passed: s.passed })),
    reasonKeys: pr.reasonCodes.map((c) => `exam.result.reason.${c.toLowerCase()}`),
  });
}

export function toExamReviewStatusViewModel(status: ManualReviewStatus | "not_required"): ExamReviewStatusViewModel {
  return { status, labelKey: `exam.review.status.${status}` };
}

export function toExamFinalDecisionViewModel(contract: ExamResultContract, finalResult: ExamFinalResult | null): ExamFinalDecisionViewModel {
  const decided = finalResult !== null && contract.finalizedAt !== null;
  const passed = decided ? contract.passed : null;
  const nextMilestoneKey = !decided
    ? "exam.next.decision_pending"
    : contract.passed
      ? contract.certificateEligibility
        ? "exam.next.certificate_available"
        : "exam.next.passed"
      : "exam.next.retake";
  return ensureCleanExam({
    finalStatus: contract.finalStatus,
    decided,
    passed,
    scorePercent: decided && finalResult ? Math.round(finalResult.percentage) : null,
    certificateEligibility: contract.certificateEligibility,
    reviewStatus: contract.reviewStatus,
    finalizedAt: contract.finalizedAt,
    nextMilestoneKey,
  });
}
