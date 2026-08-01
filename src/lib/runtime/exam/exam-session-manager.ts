/**
 * Runtime — Exam : ExamSessionManager (Sprint G).
 *
 * Machine à états du cycle de vie d'une session d'examen. Transitions invalides INTERDITES. PUR.
 * Ne décide pas des règles métier (chronomètre, correction) — il garantit uniquement la légalité des transitions
 * et l'immutabilité d'une session soumise.
 */
import type { ExamSessionStatus } from "./types.ts";

/** Transitions autorisées (source → cibles). Toute transition absente est interdite. */
const TRANSITIONS: Record<ExamSessionStatus, ExamSessionStatus[]> = {
  created: ["eligibility_verified", "cancelled"],
  eligibility_verified: ["ready", "cancelled", "invalidated"],
  ready: ["active", "cancelled", "expired", "invalidated"],
  active: ["paused", "disconnected", "submitted", "expired", "abandoned", "invalidated"],
  paused: ["resumed", "active", "expired", "abandoned", "invalidated"],
  disconnected: ["resumed", "active", "expired", "abandoned", "invalidated"],
  resumed: ["active", "paused", "disconnected", "submitted", "expired", "abandoned", "invalidated"],
  submitted: ["grading", "invalidated"],
  grading: ["pending_manual_review", "provisionally_graded", "finalized", "invalidated"],
  pending_manual_review: ["provisionally_graded", "finalized", "invalidated"],
  provisionally_graded: ["finalized", "invalidated"],
  finalized: ["passed", "failed", "invalidated"],
  // États terminaux.
  passed: [],
  failed: [],
  abandoned: [],
  expired: ["submitted", "grading", "invalidated"], // expiration → auto-soumission logique possible
  invalidated: [],
  cancelled: [],
};

/** États après lesquels la session (les réponses) devient IMMUABLE. */
const IMMUTABLE_AFTER: ExamSessionStatus[] = [
  "submitted",
  "grading",
  "pending_manual_review",
  "provisionally_graded",
  "finalized",
  "passed",
  "failed",
  "invalidated",
  "cancelled",
  "abandoned",
];

const TERMINAL: ExamSessionStatus[] = ["passed", "failed", "abandoned", "invalidated", "cancelled"];

export const ExamSessionManager = {
  canTransition(from: ExamSessionStatus, to: ExamSessionStatus): boolean {
    if (from === to) return true; // no-op idempotent
    return TRANSITIONS[from]?.includes(to) ?? false;
  },

  /** Transition stricte : lève une erreur explicite si interdite. */
  transition(from: ExamSessionStatus, to: ExamSessionStatus): ExamSessionStatus {
    if (from === to) return to;
    if (!ExamSessionManager.canTransition(from, to)) {
      throw new Error(`INVALID_TRANSITION:${from}->${to}`);
    }
    return to;
  },

  /** Les réponses sont-elles immuables dans cet état ? */
  isImmutable(status: ExamSessionStatus): boolean {
    return IMMUTABLE_AFTER.includes(status);
  },

  isTerminal(status: ExamSessionStatus): boolean {
    return TERMINAL.includes(status);
  },

  allowedTargets(from: ExamSessionStatus): ExamSessionStatus[] {
    return [...(TRANSITIONS[from] ?? [])];
  },
};

export { TRANSITIONS as EXAM_TRANSITIONS };
