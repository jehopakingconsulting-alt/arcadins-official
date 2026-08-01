/**
 * Runtime étudiant — ProgressEngine (Sprint A).
 *
 * Façade PURE de haut niveau : chaque action produit un nouvel état via `applyEvent`.
 * Combine LearningEvents + reducer + calculateurs. Aucune écriture base.
 */
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type { ProgramProgressView, RuntimeState } from "./types.ts";
import { LearningEvents } from "./learning-events.ts";
import { applyEvent, buildInitialState } from "./runtime-state.ts";
import { ProgressCalculator } from "./progress-calculator.ts";

export const ProgressEngine = {
  /** État initial d'un étudiant sur un programme. */
  init(curriculum: ProgramCurriculumV2): RuntimeState {
    return buildInitialState(curriculum);
  },

  // ── Actions (renvoient un nouvel état) ──
  openLesson(curriculum: ProgramCurriculumV2, state: RuntimeState, lessonRef: string, at?: string): RuntimeState {
    return applyEvent(curriculum, state, LearningEvents.lessonViewed(lessonRef, at));
  },
  setPosition(curriculum: ProgramCurriculumV2, state: RuntimeState, lessonRef: string, seconds: number, at?: string): RuntimeState {
    return applyEvent(curriculum, state, LearningEvents.lessonPosition(lessonRef, seconds, at));
  },
  markLessonComplete(curriculum: ProgramCurriculumV2, state: RuntimeState, lessonRef: string, at?: string): RuntimeState {
    return applyEvent(curriculum, state, LearningEvents.lessonCompleted(lessonRef, at));
  },
  submitQuiz(
    curriculum: ProgramCurriculumV2,
    state: RuntimeState,
    lessonRef: string,
    quizId: string,
    score: number,
    passed: boolean,
    at?: string,
  ): RuntimeState {
    return applyEvent(curriculum, state, LearningEvents.quizSubmitted(lessonRef, quizId, score, passed, at));
  },
  submitSummative(curriculum: ProgramCurriculumV2, state: RuntimeState, moduleIndex: number, score: number, passed: boolean, at?: string): RuntimeState {
    return applyEvent(curriculum, state, LearningEvents.summativeSubmitted(moduleIndex, score, passed, at));
  },
  submitPractical(curriculum: ProgramCurriculumV2, state: RuntimeState, moduleIndex: number, at?: string): RuntimeState {
    return applyEvent(curriculum, state, LearningEvents.practicalSubmitted(moduleIndex, at));
  },
  recordStudyTime(curriculum: ProgramCurriculumV2, state: RuntimeState, lessonRef: string, seconds: number, at?: string): RuntimeState {
    return applyEvent(curriculum, state, LearningEvents.studyTime(lessonRef, seconds, at));
  },
  saveNote(curriculum: ProgramCurriculumV2, state: RuntimeState, lessonRef: string, body: string, at?: string): RuntimeState {
    return applyEvent(curriculum, state, LearningEvents.noteSaved(lessonRef, body, at));
  },
  toggleBookmark(curriculum: ProgramCurriculumV2, state: RuntimeState, lessonRef: string, on: boolean, at?: string): RuntimeState {
    return applyEvent(curriculum, state, LearningEvents.bookmarkToggled(lessonRef, "favorite", on, at));
  },

  // ── Lecture ──
  progress(curriculum: ProgramCurriculumV2, state: RuntimeState, now?: Date): ProgramProgressView {
    return ProgressCalculator.programProgressView(curriculum, state, now);
  },
};
