/**
 * ARCADINS — État de TENTATIVE d'évaluation, PUR & déterministe (S5).
 * Opère UNIQUEMENT sur des questions PUBLIQUES (PublicQuestionViewModel — AUCUNE bonne
 * réponse). Suit navigation + réponses ; produit une soumission à corriger CÔTÉ SERVEUR
 * par le moteur existant (AssessmentEngine). Aucune correction ici : la clé de barème ne
 * transite jamais par le client. Immutable. Imports RELATIFS (node-testable).
 */
import type { PublicQuestionViewModel } from "../runtime/ui/view-models.ts";

export type AnswerValue = string | string[]; // single/true_false/short → string ; multiple/ordering → string[]

export interface AttemptState {
  questions: PublicQuestionViewModel[];
  currentIndex: number;
  answers: Record<string, AnswerValue>;
}

export interface SubmissionItem { questionId: string; value: AnswerValue }

export function createAttempt(questions: PublicQuestionViewModel[]): AttemptState {
  return { questions, currentIndex: 0, answers: {} };
}

export function setAnswer(state: AttemptState, questionId: string, value: AnswerValue): AttemptState {
  return { ...state, answers: { ...state.answers, [questionId]: value } };
}

/** Coche/décoche une option (questions à choix multiples). Déterministe (ordre stable). */
export function toggleAnswer(state: AttemptState, questionId: string, optionId: string): AttemptState {
  const prev = state.answers[questionId];
  const arr = Array.isArray(prev) ? prev : prev ? [prev] : [];
  const next = arr.includes(optionId) ? arr.filter((o) => o !== optionId) : [...arr, optionId];
  return setAnswer(state, questionId, next);
}

export function goTo(state: AttemptState, index: number): AttemptState {
  const clamped = Math.max(0, Math.min(index, state.questions.length - 1));
  return { ...state, currentIndex: clamped };
}
export function nextQuestion(state: AttemptState): AttemptState { return goTo(state, state.currentIndex + 1); }
export function prevQuestion(state: AttemptState): AttemptState { return goTo(state, state.currentIndex - 1); }

export function isAnswered(state: AttemptState, questionId: string): boolean {
  const v = state.answers[questionId];
  if (v == null) return false;
  return Array.isArray(v) ? v.length > 0 : v.trim().length > 0;
}

export function answeredCount(state: AttemptState): number {
  return state.questions.filter((q) => isAnswered(state, q.questionId)).length;
}

export function isComplete(state: AttemptState): boolean {
  return state.questions.length > 0 && answeredCount(state) === state.questions.length;
}

export function progressPercent(state: AttemptState): number {
  if (state.questions.length === 0) return 0;
  return Math.round((answeredCount(state) / state.questions.length) * 100);
}

/** Soumission à envoyer au serveur pour correction (AUCUN barème présent). */
export function toSubmission(state: AttemptState): SubmissionItem[] {
  return state.questions
    .filter((q) => isAnswered(state, q.questionId))
    .map((q) => ({ questionId: q.questionId, value: state.answers[q.questionId] }));
}
