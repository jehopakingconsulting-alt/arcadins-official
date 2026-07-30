/**
 * Runtime — Exam : ManualReviewWorkflow (Sprint G).
 *
 * Correction HUMAINE sans interface : création d'une demande, assignation abstraite, rubrique versionnée,
 * score proposé, commentaires (privé / étudiant), décision, seconde révision, divergence, escalade, approbation,
 * rejet, réouverture contrôlée. PUR et immuable. Ne divulgue jamais de réponse correcte.
 */
import type {
  ManualReviewDecision,
  ManualReviewRequest,
  ManualReviewStatus,
} from "./types.ts";

/** Transitions autorisées du flux de révision. */
const REVIEW_TRANSITIONS: Record<ManualReviewStatus, ManualReviewStatus[]> = {
  pending_assignment: ["assigned"],
  assigned: ["in_review", "pending_assignment"],
  in_review: ["approved", "rejected", "needs_second_review", "escalated"],
  needs_second_review: ["in_review", "approved", "rejected", "escalated"],
  escalated: ["approved", "rejected", "finalized"],
  // Une divergence détectée par un second correcteur peut faire basculer approved/rejected vers escalated.
  approved: ["finalized", "in_review", "escalated", "rejected"],
  rejected: ["finalized", "in_review", "escalated", "approved"],
  finalized: [],
};

function canTransition(from: ManualReviewStatus, to: ManualReviewStatus): boolean {
  return from === to || (REVIEW_TRANSITIONS[from]?.includes(to) ?? false);
}

export const ManualReviewWorkflow = {
  create(input: { id: string; attemptId: string; questionIds: string[]; rubricVersion: number; reasonCodes: string[]; now: Date }): ManualReviewRequest {
    const at = input.now.toISOString();
    return {
      id: input.id,
      attemptId: input.attemptId,
      questionIds: [...input.questionIds],
      rubricVersion: input.rubricVersion,
      status: "pending_assignment",
      assignments: [],
      decisions: [],
      escalated: false,
      reasonCodes: [...input.reasonCodes],
      createdAt: at,
      updatedAt: at,
    };
  },

  assign(request: ManualReviewRequest, reviewerRef: string, now: Date): ManualReviewRequest {
    guard(request.status, "assigned");
    return {
      ...request,
      status: "assigned",
      assignments: [...request.assignments, { reviewerRef, assignedAt: now.toISOString() }],
      updatedAt: now.toISOString(),
    };
  },

  beginReview(request: ManualReviewRequest, now: Date): ManualReviewRequest {
    guard(request.status, "in_review");
    return { ...request, status: "in_review", updatedAt: now.toISOString() };
  },

  /** Enregistre une décision de correcteur (score proposé + commentaires). */
  recordDecision(request: ManualReviewRequest, decision: ManualReviewDecision): ManualReviewRequest {
    const decisions = [...request.decisions, decision];
    let status: ManualReviewStatus = request.status;
    let escalated = request.escalated;

    if (decision.decision === "needs_second_review") {
      status = "needs_second_review";
    } else if (decisions.length >= 2) {
      // Divergence entre correcteurs → escalade ; convergence → statut proposé par la dernière décision.
      const diverged = hasDivergence(decisions);
      if (diverged) {
        status = "escalated";
        escalated = true;
      } else {
        status = decision.decision === "approve" ? "approved" : "rejected";
      }
    } else {
      status = decision.decision === "approve" ? "approved" : "rejected";
    }

    guard(request.status, status);
    return { ...request, status, escalated, decisions, updatedAt: decision.decidedAt };
  },

  escalate(request: ManualReviewRequest, now: Date): ManualReviewRequest {
    guard(request.status, "escalated");
    return { ...request, status: "escalated", escalated: true, updatedAt: now.toISOString() };
  },

  finalize(request: ManualReviewRequest, now: Date): ManualReviewRequest {
    guard(request.status, "finalized");
    return { ...request, status: "finalized", updatedAt: now.toISOString() };
  },

  /** Réouverture contrôlée (revient en révision depuis approved/rejected). */
  reopen(request: ManualReviewRequest, now: Date): ManualReviewRequest {
    guard(request.status, "in_review");
    return { ...request, status: "in_review", updatedAt: now.toISOString() };
  },

  /** Score humain agrégé (dernière décision non divergente fait foi), borné à ≥ 0. */
  resolvedScores(request: ManualReviewRequest): Record<string, number> {
    const last = request.decisions[request.decisions.length - 1];
    if (!last) return {};
    const out: Record<string, number> = {};
    for (const [qid, score] of Object.entries(last.questionScores)) out[qid] = Math.max(0, score);
    return out;
  },

  isComplete(request: ManualReviewRequest): boolean {
    return request.status === "finalized" || request.status === "approved" || request.status === "rejected";
  },

  canTransition,
};

function guard(from: ManualReviewStatus, to: ManualReviewStatus): void {
  if (!canTransition(from, to)) throw new Error(`INVALID_REVIEW_TRANSITION:${from}->${to}`);
}

/** Divergence : deux décisions finales (approve/reject) opposées. */
function hasDivergence(decisions: ManualReviewDecision[]): boolean {
  const finals = decisions.filter((d) => d.decision === "approve" || d.decision === "reject").map((d) => d.decision);
  return finals.includes("approve") && finals.includes("reject");
}
