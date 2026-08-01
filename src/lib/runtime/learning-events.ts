/**
 * Runtime étudiant — LearningEvents (Sprint A).
 *
 * Fabriques d'événements purs. Aucun effet de bord : ces fonctions créent des objets immuables
 * qui seront appliqués à l'état par le reducer (`runtime-state.ts`).
 */
import type {
  LearningEvent,
  LessonViewedEvent,
  LessonPositionEvent,
  LessonCompletedEvent,
  QuizSubmittedEvent,
  SummativeSubmittedEvent,
  PracticalSubmittedEvent,
  StudyTimeEvent,
  NoteSavedEvent,
  BookmarkToggledEvent,
  ModuleUnlockedEvent,
} from "./types.ts";
import { isoDay } from "./helpers.ts";

function now(at?: string): string {
  return at ?? new Date().toISOString();
}

export const LearningEvents = {
  lessonViewed(lessonRef: string, at?: string): LessonViewedEvent {
    return { type: "LESSON_VIEWED", lessonRef, at: now(at) };
  },
  lessonPosition(lessonRef: string, seconds: number, at?: string): LessonPositionEvent {
    return { type: "LESSON_POSITION", lessonRef, seconds: Math.max(0, seconds), at: now(at) };
  },
  lessonCompleted(lessonRef: string, at?: string): LessonCompletedEvent {
    return { type: "LESSON_COMPLETED", lessonRef, at: now(at) };
  },
  quizSubmitted(lessonRef: string, quizId: string, score: number, passed: boolean, at?: string): QuizSubmittedEvent {
    return { type: "QUIZ_SUBMITTED", lessonRef, quizId, score, passed, at: now(at) };
  },
  summativeSubmitted(moduleIndex: number, score: number, passed: boolean, at?: string): SummativeSubmittedEvent {
    return { type: "SUMMATIVE_SUBMITTED", moduleIndex, score, passed, at: now(at) };
  },
  practicalSubmitted(moduleIndex: number, at?: string): PracticalSubmittedEvent {
    return { type: "PRACTICAL_SUBMITTED", moduleIndex, at: now(at) };
  },
  studyTime(lessonRef: string, seconds: number, at?: string): StudyTimeEvent {
    const when = now(at);
    return { type: "STUDY_TIME", lessonRef, seconds: Math.max(0, seconds), day: isoDay(when), at: when };
  },
  noteSaved(lessonRef: string, body: string, at?: string): NoteSavedEvent {
    return { type: "NOTE_SAVED", lessonRef, body, at: now(at) };
  },
  bookmarkToggled(lessonRef: string, kind: "favorite" | "history", on: boolean, at?: string): BookmarkToggledEvent {
    return { type: "BOOKMARK_TOGGLED", lessonRef, kind, on, at: now(at) };
  },
  moduleUnlocked(moduleIndex: number, at?: string): ModuleUnlockedEvent {
    return { type: "MODULE_UNLOCKED", moduleIndex, at: now(at) };
  },
};

/** Trie une liste d'événements par horodatage croissant (stable). */
export function sortEvents(events: LearningEvent[]): LearningEvent[] {
  return [...events].sort((a, b) => (a.at < b.at ? -1 : a.at > b.at ? 1 : 0));
}
