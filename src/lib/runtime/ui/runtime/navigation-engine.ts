/**
 * Runtime — UI/Runtime : NavigationEngine (Sprint K2B).
 *
 * Moteur PUR de navigation pédagogique. À partir de (curriculum, état runtime, feed dérivé), il calcule les états
 * permettant à une future interface de naviguer correctement : précédent / suivant, reprise, prochaine étape,
 * verrouillage/déverrouillage. AUCUNE UI, aucun effet de bord. Réutilise l'état/les moteurs des Sprints A + K2A.
 */
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type { LessonState, RuntimeDerived, RuntimeState } from "./types.ts";

export interface FlatLesson {
  lessonId: string;
  moduleIndex: number;
}

export type NextStepKind = "start" | "continue" | "next_lesson" | "module_locked" | "program_complete" | "none";

export interface NextStep {
  kind: NextStepKind;
  lessonId: string | null;
  moduleIndex: number | null;
  reasonCode: string | null;
}

export interface NavigationState {
  currentLessonId: string | null;
  currentIndex: number; // position 0-based dans l'ordre plat, -1 si aucune
  previousLessonId: string | null;
  nextLessonId: string | null;
  canGoPrevious: boolean;
  canGoNext: boolean;
  /** Point de reprise (dernière leçon consultée non terminée) — reprise automatique après interruption. */
  resumeLessonId: string | null;
  nextStep: NextStep;
  totalLessons: number;
}

/** Ordre plat des leçons du programme (séquence pédagogique). */
export function orderedLessons(curriculum: ProgramCurriculumV2): FlatLesson[] {
  return curriculum.modules.flatMap((m) => m.lessons.map((l) => ({ lessonId: l.id, moduleIndex: m.index })));
}

function lessonStateOf(state: RuntimeState, lessonId: string): LessonState {
  return state.lessons[lessonId]?.state ?? "locked";
}
function isAccessible(state: RuntimeState, lessonId: string): boolean {
  return lessonStateOf(state, lessonId) !== "locked";
}
function isFinished(s: LessonState): boolean {
  return s === "completed" || s === "passed";
}

/** Leçon ACTIVE (celle que l'apprenant vient d'ouvrir) = dernière consultée accessible. */
function resolveActive(state: RuntimeState, flat: FlatLesson[], derived: RuntimeDerived): string | null {
  for (let i = state.events.length - 1; i >= 0; i--) {
    const e = state.events[i];
    if (e.type === "LESSON_VIEWED" && isAccessible(state, e.lessonRef)) return e.lessonRef;
  }
  return derived.currentLessonId
    ?? flat.find((f) => lessonStateOf(state, f.lessonId) === "available")?.lessonId
    ?? null;
}

/** Dernière leçon CONSULTÉE et non terminée (reprise), déduite du journal d'événements. */
function resolveResume(state: RuntimeState, flat: FlatLesson[]): string | null {
  for (let i = state.events.length - 1; i >= 0; i--) {
    const e = state.events[i];
    if (e.type === "LESSON_VIEWED" || e.type === "LESSON_POSITION") {
      const st = lessonStateOf(state, e.lessonRef);
      if (st !== "locked" && !isFinished(st)) return e.lessonRef;
    }
  }
  // Sinon : première leçon en cours, puis première disponible.
  return flat.find((f) => lessonStateOf(state, f.lessonId) === "in_progress")?.lessonId
    ?? flat.find((f) => lessonStateOf(state, f.lessonId) === "available")?.lessonId
    ?? null;
}

export const NavigationEngine = {
  orderedLessons,
  isAccessible,

  computeState(curriculum: ProgramCurriculumV2, state: RuntimeState, derived: RuntimeDerived): NavigationState {
    const flat = orderedLessons(curriculum);
    const total = flat.length;
    const current = resolveActive(state, flat, derived);
    const currentIndex = current ? flat.findIndex((f) => f.lessonId === current) : -1;

    const previous = currentIndex > 0 ? flat[currentIndex - 1] : null;
    const next = currentIndex >= 0 && currentIndex < total - 1 ? flat[currentIndex + 1] : null;
    const canGoPrevious = !!previous && isAccessible(state, previous.lessonId);
    const canGoNext = !!next && isAccessible(state, next.lessonId);

    return {
      currentLessonId: current,
      currentIndex,
      previousLessonId: previous?.lessonId ?? null,
      nextLessonId: next?.lessonId ?? null,
      canGoPrevious,
      canGoNext,
      resumeLessonId: resolveResume(state, flat),
      nextStep: computeNextStep(state, derived, flat, current, next),
      totalLessons: total,
    };
  },
};

function computeNextStep(
  state: RuntimeState,
  derived: RuntimeDerived,
  flat: FlatLesson[],
  currentId: string | null,
  next: FlatLesson | null,
): NextStep {
  const allFinished = flat.length > 0 && flat.every((f) => isFinished(lessonStateOf(state, f.lessonId)));
  if (allFinished) return { kind: "program_complete", lessonId: null, moduleIndex: null, reasonCode: "ALL_LESSONS_COMPLETE" };

  if (currentId) {
    const st = lessonStateOf(state, currentId);
    if (st === "in_progress") return { kind: "continue", lessonId: currentId, moduleIndex: null, reasonCode: null };
    if (st === "available") return { kind: "start", lessonId: currentId, moduleIndex: null, reasonCode: null };
  }

  if (next) {
    if (isAccessible(state, next.lessonId)) return { kind: "next_lesson", lessonId: next.lessonId, moduleIndex: next.moduleIndex, reasonCode: null };
    const mod = derived.modules.find((m) => m.moduleIndex === next.moduleIndex);
    return { kind: "module_locked", lessonId: null, moduleIndex: next.moduleIndex, reasonCode: mod?.lockedReason ? "MODULE_LOCKED" : "MODULE_LOCKED" };
  }
  return { kind: "none", lessonId: null, moduleIndex: null, reasonCode: null };
}
