/**
 * Runtime étudiant — TimeTracker (Sprint A).
 *
 * Estime le temps restant de façon PURE à partir des durées de leçons (`durationMinutes`)
 * et de l'état d'achèvement. Aucune horloge externe, aucun effet de bord.
 */
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type { RuntimeState } from "./types.ts";
import { CompletionCalculator } from "./completion-calculator.ts";
import { allLessons } from "./helpers.ts";

/** Durée par défaut d'une leçon si `durationMinutes` est absent (minutes). */
const DEFAULT_LESSON_MINUTES = 60;

export const TimeTracker = {
  /** Durée totale estimée du programme (secondes), d'après les durées de leçons. */
  totalEstimatedSeconds(curriculum: ProgramCurriculumV2): number {
    return allLessons(curriculum).reduce((acc, l) => acc + (l.durationMinutes ?? DEFAULT_LESSON_MINUTES) * 60, 0);
  },

  /** Temps déjà passé (secondes), mesuré par les heartbeats. */
  timeSpentSeconds(state: RuntimeState): number {
    return state.study.totalSeconds;
  },

  /** Temps restant estimé (secondes) = somme des durées des leçons non complétées. */
  estimatedRemainingSeconds(curriculum: ProgramCurriculumV2, state: RuntimeState): number {
    return allLessons(curriculum)
      .filter((l) => !CompletionCalculator.isLessonCompleted(state, l.id))
      .reduce((acc, l) => acc + (l.durationMinutes ?? DEFAULT_LESSON_MINUTES) * 60, 0);
  },
};
