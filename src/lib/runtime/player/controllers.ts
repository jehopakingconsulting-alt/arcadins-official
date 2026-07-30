/**
 * Runtime — Learning Player : contrôleurs PURS (Sprint C).
 *
 * Chaque contrôleur DÉLÈGUE au Runtime (Sprint A) — aucune logique métier dupliquée. Ils produisent des
 * vues (données) que l'UI future consommera, et des « commandes » (événements) que le LessonPlayer dispatche.
 */
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type { LearningEvent, LessonState, RuntimeState } from "../types.ts";
import { LessonEngine } from "../lesson-engine.ts";
import { LearningEvents } from "../learning-events.ts";
import { BookmarkManager } from "../bookmark-manager.ts";
import { NoteManager } from "../note-manager.ts";
import { orderedModules, clamp, round } from "../helpers.ts";
import { LessonRenderer, DefaultResourceProvider, type ResourceProvider } from "./renderer.ts";
import type { LessonProgressModel, LessonView, TimelineEntry } from "./types.ts";

const DEFAULT_LESSON_MINUTES = 60;

// ── LessonStateController ──
export const LessonStateController = {
  stateOf(state: RuntimeState, lessonRef: string): LessonState {
    return LessonEngine.stateOf(state, lessonRef);
  },
  isAccessible(state: RuntimeState, lessonRef: string): boolean {
    return LessonEngine.isAccessible(state, lessonRef);
  },
  /** Construit la vue complète d'une leçon pour le Player. */
  viewModel(
    curriculum: ProgramCurriculumV2,
    state: RuntimeState,
    lessonRef: string,
    resourceProvider: ResourceProvider = DefaultResourceProvider,
  ): LessonView | null {
    const lesson = LessonEngine.get(curriculum, lessonRef);
    if (!lesson) return null;
    const prevRef = LessonEngine.prev(curriculum, lessonRef);
    const nextRef = LessonEngine.next(curriculum, lessonRef);
    return {
      lessonRef,
      moduleIndex: LessonEngine.moduleIndexOf(curriculum, lessonRef),
      title: lesson.title,
      state: LessonEngine.stateOf(state, lessonRef),
      accessible: LessonEngine.isAccessible(state, lessonRef),
      durationMinutes: lesson.durationMinutes ?? DEFAULT_LESSON_MINUTES,
      resumePositionSeconds: LessonEngine.resumePosition(state, lessonRef),
      isFavorite: BookmarkManager.has(state.bookmarks, lessonRef, "favorite"),
      note: NoteManager.get(state.notes, lessonRef)?.body ?? null,
      blocks: LessonRenderer.toBlocks(lesson),
      resources: resourceProvider.resources(lesson),
      downloads: resourceProvider.downloads(lesson),
      hasPrev: !!prevRef,
      hasNext: !!nextRef,
      prevRef,
      nextRef,
    };
  },
};

// ── ResumeController ──
export const ResumeController = {
  resumePosition(state: RuntimeState, lessonRef: string): number {
    return LessonEngine.resumePosition(state, lessonRef);
  },
  continueWhereILeftOff(curriculum: ProgramCurriculumV2, state: RuntimeState): string | undefined {
    return LessonEngine.continueWhereILeftOff(curriculum, state);
  },
};

// ── BookmarkController (commandes) ──
export const BookmarkController = {
  isFavorite(state: RuntimeState, lessonRef: string): boolean {
    return BookmarkManager.has(state.bookmarks, lessonRef, "favorite");
  },
  /** Commande : (dés)active un favori → événement à dispatcher. */
  toggle(state: RuntimeState, lessonRef: string, at?: string): LearningEvent {
    const on = !BookmarkManager.has(state.bookmarks, lessonRef, "favorite");
    return LearningEvents.bookmarkToggled(lessonRef, "favorite", on, at);
  },
};

// ── NotesController (commandes) ──
export const NotesController = {
  get(state: RuntimeState, lessonRef: string): string | null {
    return NoteManager.get(state.notes, lessonRef)?.body ?? null;
  },
  /** Commande : enregistre une note → événement à dispatcher. */
  save(lessonRef: string, body: string, at?: string): LearningEvent {
    return LearningEvents.noteSaved(lessonRef, body, at);
  },
};

// ── CompletionController (commandes) ──
export const CompletionController = {
  canComplete(state: RuntimeState, lessonRef: string): boolean {
    return LessonEngine.isAccessible(state, lessonRef);
  },
  /** Commande : marque terminé → événement à dispatcher (si accessible). */
  markComplete(state: RuntimeState, lessonRef: string, at?: string): LearningEvent | null {
    if (!CompletionController.canComplete(state, lessonRef)) return null;
    return LearningEvents.lessonCompleted(lessonRef, at);
  },
};

// ── LessonNavigator ──
export const LessonNavigator = {
  next(curriculum: ProgramCurriculumV2, lessonRef: string): string | undefined {
    return LessonEngine.next(curriculum, lessonRef);
  },
  prev(curriculum: ProgramCurriculumV2, lessonRef: string): string | undefined {
    return LessonEngine.prev(curriculum, lessonRef);
  },
  /** Prochaine leçon ACCESSIBLE dans la séquence (saute les leçons verrouillées). */
  nextAccessible(curriculum: ProgramCurriculumV2, state: RuntimeState, lessonRef: string): string | undefined {
    const seq = LessonEngine.sequence(curriculum);
    let i = seq.indexOf(lessonRef);
    for (i = i + 1; i >= 0 && i < seq.length; i++) {
      if (LessonEngine.isAccessible(state, seq[i])) return seq[i];
    }
    return undefined;
  },
};

// ── LessonTimeline ──
export const LessonTimeline = {
  build(curriculum: ProgramCurriculumV2, state: RuntimeState, currentRef?: string): TimelineEntry[] {
    return orderedModules(curriculum).flatMap((m) =>
      m.lessons.map((l) => ({
        lessonRef: l.id,
        moduleIndex: m.index,
        title: l.title,
        state: LessonEngine.stateOf(state, l.id),
        isCurrent: l.id === currentRef,
      })),
    );
  },
};

// ── LessonProgressBar ──
export const LessonProgressBar = {
  model(curriculum: ProgramCurriculumV2, state: RuntimeState, lessonRef: string): LessonProgressModel {
    const lesson = LessonEngine.get(curriculum, lessonRef);
    const durationSeconds = (lesson?.durationMinutes ?? DEFAULT_LESSON_MINUTES) * 60;
    const positionSeconds = LessonEngine.resumePosition(state, lessonRef);
    return {
      lessonRef,
      positionSeconds,
      durationSeconds,
      positionPercent: durationSeconds > 0 ? round(clamp((positionSeconds / durationSeconds) * 100, 0, 100)) : 0,
      state: LessonEngine.stateOf(state, lessonRef),
    };
  },
};
