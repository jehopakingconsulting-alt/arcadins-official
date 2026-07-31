/**
 * Runtime — UI/Exam : tranche de progression d'examen DÉDIÉE (Sprint K3B).
 *
 * L'examen final est de niveau PROGRAMME : sa progression est distincte de l'état leçon/module du Sprint A.
 * Ce store PUR (horloge injectée via `at`) enregistre le cycle de vie public de l'examen — soumis, en
 * correction, révision manuelle, provisoire, décision finale, admissibilité à la certification — SANS jamais
 * écrire dans le `RuntimeState` du Sprint A ni émettre de certificat/badge. snapshot/hydrate pour la reprise.
 */
import type { ManualReviewStatus } from "../../exam/types.ts";

export type ExamProgressStatus =
  | "not_submitted"
  | "submitted"
  | "grading"
  | "pending_manual_review"
  | "provisional"
  | "passed"
  | "failed"
  | "invalidated";

export interface ExamProgressState {
  attemptId: string | null;
  examId: string | null;
  status: ExamProgressStatus;
  publicScorePercent: number | null; // provisoire OU final autorisé
  passed: boolean | null; // uniquement quand la décision est réellement disponible
  certificateEligibility: boolean; // via contrat UNIQUEMENT ; aucun certificat émis
  reviewStatus: ManualReviewStatus | "not_required";
  submittedAt: string | null;
  decidedAt: string | null;
}

export type ExamProgressEvent =
  | { type: "FINAL_EXAM_SUBMITTED"; attemptId: string; examId: string; scorePercent: number; passedProvisional: boolean; requiresManualReview: boolean; at: string }
  | { type: "FINAL_EXAM_REVIEW_UPDATED"; reviewStatus: ManualReviewStatus | "not_required"; at: string }
  | { type: "FINAL_EXAM_DECIDED"; finalStatus: string; passed: boolean; scorePercent: number; certificateEligibility: boolean; reviewStatus: ManualReviewStatus | "not_required"; at: string };

export const EXAM_PROGRESS_SNAPSHOT_VERSION = 1;

export function initialExamProgress(): ExamProgressState {
  return {
    attemptId: null,
    examId: null,
    status: "not_submitted",
    publicScorePercent: null,
    passed: null,
    certificateEligibility: false,
    reviewStatus: "not_required",
    submittedAt: null,
    decidedAt: null,
  };
}

/** Reducer PUR : la progression n'avance jamais au-delà de ce que le moteur autorise. */
export function applyExamProgress(state: ExamProgressState, event: ExamProgressEvent): ExamProgressState {
  switch (event.type) {
    case "FINAL_EXAM_SUBMITTED":
      return {
        ...state,
        attemptId: event.attemptId,
        examId: event.examId,
        // Réussite/échec NON déclarés ici : seule une décision finale peut trancher.
        status: event.requiresManualReview ? "pending_manual_review" : "provisional",
        publicScorePercent: event.scorePercent,
        passed: null,
        reviewStatus: event.requiresManualReview ? "pending_assignment" : "not_required",
        submittedAt: event.at,
      };
    case "FINAL_EXAM_REVIEW_UPDATED":
      return { ...state, reviewStatus: event.reviewStatus };
    case "FINAL_EXAM_DECIDED":
      return {
        ...state,
        status: event.finalStatus === "passed" ? "passed" : event.finalStatus === "invalidated" ? "invalidated" : event.finalStatus === "failed" ? "failed" : state.status,
        passed: event.passed,
        publicScorePercent: event.scorePercent,
        certificateEligibility: event.certificateEligibility,
        reviewStatus: event.reviewStatus,
        decidedAt: event.at,
      };
    default:
      return state;
  }
}

export interface ExamRuntimeStore {
  getState(): ExamProgressState;
  dispatch(event: ExamProgressEvent): ExamProgressState;
  subscribe(listener: () => void): () => void;
  snapshot(): { version: number; state: ExamProgressState };
  hydrate(snapshot: { version: number; state: ExamProgressState }): ExamProgressState;
}

export function createExamRuntimeStore(initial: ExamProgressState = initialExamProgress()): ExamRuntimeStore {
  let state = initial;
  const listeners = new Set<() => void>();
  const emit = () => listeners.forEach((l) => l());
  return {
    getState: () => state,
    dispatch(event) {
      state = applyExamProgress(state, event);
      emit();
      return state;
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    snapshot: () => ({ version: EXAM_PROGRESS_SNAPSHOT_VERSION, state }),
    hydrate(snapshot) {
      if (snapshot.version !== EXAM_PROGRESS_SNAPSHOT_VERSION) throw new Error("EXAM_PROGRESS_SNAPSHOT_VERSION_MISMATCH");
      state = snapshot.state;
      emit();
      return state;
    },
  };
}
