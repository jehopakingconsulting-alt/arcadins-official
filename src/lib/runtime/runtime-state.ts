/**
 * Runtime étudiant — RuntimeState : construction de l'état initial + reducer PUR (Sprint A).
 *
 * `applyEvent` est une fonction pure : (state, event) → nouvel état immuable. Aucune écriture base,
 * aucun effet de bord. Le journal d'événements permet le recalcul et l'audit.
 */
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type { LearningEvent, LessonProgress, ModuleProgress, RuntimeState } from "./types.ts";
import { RUNTIME_THRESHOLDS } from "./config.ts";
import { orderedModules } from "./helpers.ts";
import { StudySessionManager } from "./study-session-manager.ts";
import { BookmarkManager } from "./bookmark-manager.ts";
import { NoteManager } from "./note-manager.ts";
import { UnlockRules } from "./unlock-rules.ts";

/** Construit l'état initial : premier module ouvert (leçons « available »), le reste verrouillé. */
export function buildInitialState(curriculum: ProgramCurriculumV2): RuntimeState {
  const mods = orderedModules(curriculum);
  const lessons: Record<string, LessonProgress> = {};
  const modules: Record<number, ModuleProgress> = {};

  mods.forEach((m, pos) => {
    modules[m.index] = { moduleIndex: m.index, state: pos === 0 ? "available" : "locked", practicalSubmitted: false };
    m.lessons.forEach((l) => {
      lessons[l.id] = { lessonRef: l.id, moduleIndex: m.index, state: pos === 0 ? "available" : "locked" };
    });
  });

  return {
    programSlug: curriculum.slug,
    programVersion: curriculum.programVersion,
    lessons,
    modules,
    notes: {},
    bookmarks: [],
    study: StudySessionManager.empty(),
    events: [],
  };
}

/** Applique un événement à l'état (pur). Recompute les états dérivés à la fin. */
export function applyEvent(curriculum: ProgramCurriculumV2, state: RuntimeState, event: LearningEvent): RuntimeState {
  let next: RuntimeState = { ...state, events: [...state.events, event] };

  switch (event.type) {
    case "LESSON_VIEWED": {
      next = patchLesson(next, event.lessonRef, (lp) => ({
        ...lp,
        state: lp.state === "available" ? "in_progress" : lp.state,
      }));
      next = { ...next, bookmarks: BookmarkManager.pushHistory(next.bookmarks, event.lessonRef, event.at) };
      break;
    }
    case "LESSON_POSITION": {
      next = patchLesson(next, event.lessonRef, (lp) => ({ ...lp, lastPositionSeconds: event.seconds }));
      break;
    }
    case "LESSON_COMPLETED": {
      next = patchLesson(next, event.lessonRef, (lp) => {
        const passed = typeof lp.quizScore === "number" && lp.quizScore >= RUNTIME_THRESHOLDS.lessonQuizPass;
        return { ...lp, completedAt: event.at, state: passed ? "passed" : "completed" };
      });
      break;
    }
    case "QUIZ_SUBMITTED": {
      next = patchLesson(next, event.lessonRef, (lp) => ({
        ...lp,
        quizScore: event.score,
        state: event.passed ? "passed" : lp.completedAt ? "needs_review" : lp.state,
      }));
      break;
    }
    case "SUMMATIVE_SUBMITTED": {
      next = patchModule(next, event.moduleIndex, (mp) => ({ ...mp, summativeScore: event.score }));
      break;
    }
    case "PRACTICAL_SUBMITTED": {
      next = patchModule(next, event.moduleIndex, (mp) => ({ ...mp, practicalSubmitted: true }));
      break;
    }
    case "STUDY_TIME": {
      next = { ...next, study: StudySessionManager.addSeconds(next.study, event.lessonRef, event.seconds, event.day) };
      break;
    }
    case "NOTE_SAVED": {
      next = { ...next, notes: NoteManager.save(next.notes, event.lessonRef, event.body, event.at) };
      break;
    }
    case "BOOKMARK_TOGGLED": {
      next = { ...next, bookmarks: BookmarkManager.toggle(next.bookmarks, event.lessonRef, event.kind, event.on, event.at) };
      break;
    }
    case "MODULE_UNLOCKED":
      // Informationnel : le recalcul ci-dessous gère l'état réel.
      break;
  }

  return recomputeStates(curriculum, next);
}

/** Applique une liste d'événements en séquence. */
export function applyEvents(curriculum: ProgramCurriculumV2, state: RuntimeState, events: LearningEvent[]): RuntimeState {
  return events.reduce((acc, e) => applyEvent(curriculum, acc, e), state);
}

/** Met à jour immutablement la progression d'une leçon (crée l'entrée si absente). */
function patchLesson(state: RuntimeState, lessonRef: string, fn: (lp: LessonProgress) => LessonProgress): RuntimeState {
  const current: LessonProgress =
    state.lessons[lessonRef] ?? { lessonRef, moduleIndex: -1, state: "available" };
  return { ...state, lessons: { ...state.lessons, [lessonRef]: fn(current) } };
}

/** Met à jour immutablement la progression d'un module (crée l'entrée si absente). */
function patchModule(state: RuntimeState, moduleIndex: number, fn: (mp: ModuleProgress) => ModuleProgress): RuntimeState {
  const current: ModuleProgress =
    state.modules[moduleIndex] ?? { moduleIndex, state: "available", practicalSubmitted: false };
  return { ...state, modules: { ...state.modules, [moduleIndex]: fn(current) } };
}

/** Recompute les états dérivés des modules et débloque les leçons des modules nouvellement ouverts. */
export function recomputeStates(curriculum: ProgramCurriculumV2, state: RuntimeState): RuntimeState {
  const modules: Record<number, ModuleProgress> = { ...state.modules };
  const lessons: Record<string, LessonProgress> = { ...state.lessons };

  for (const m of curriculum.modules) {
    const derived = UnlockRules.deriveModuleState(curriculum, state, m.index);
    modules[m.index] = { ...(modules[m.index] ?? { moduleIndex: m.index, practicalSubmitted: false }), state: derived };

    const unlocked = derived !== "locked";
    for (const l of m.lessons) {
      const lp = lessons[l.id] ?? { lessonRef: l.id, moduleIndex: m.index, state: "locked" as const };
      // Débloquer les leçons d'un module ouvert restées « locked ».
      if (unlocked && lp.state === "locked") lessons[l.id] = { ...lp, state: "available" };
      // Reverrouiller si le module redevient verrouillé (rare, cohérence).
      else if (!unlocked && lp.state === "available") lessons[l.id] = { ...lp, state: "locked" };
      else lessons[l.id] = lp;
    }
  }

  return { ...state, modules, lessons };
}
