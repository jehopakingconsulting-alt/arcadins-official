/**
 * Runtime étudiant — CompletionCalculator (Sprint A).
 *
 * Dérive, de façon PURE, l'état d'achèvement des leçons et des modules à partir de `RuntimeState`
 * et du cursus. Aucune écriture, aucun effet de bord.
 */
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type { RuntimeState } from "./types.ts";
import { RUNTIME_THRESHOLDS } from "./config.ts";
import { findModule } from "./helpers.ts";

export const CompletionCalculator = {
  /** La leçon a-t-elle été consultée/complétée (contenu vu + activité) ? */
  isLessonCompleted(state: RuntimeState, lessonRef: string): boolean {
    const lp = state.lessons[lessonRef];
    return !!lp && (lp.state === "completed" || lp.state === "passed");
  },

  /** La leçon est-elle « réussie » (quiz formatif soumis avec succès) ? */
  isLessonPassed(state: RuntimeState, lessonRef: string): boolean {
    const lp = state.lessons[lessonRef];
    if (!lp) return false;
    if (lp.state === "passed") return true;
    return typeof lp.quizScore === "number" && lp.quizScore >= RUNTIME_THRESHOLDS.lessonQuizPass;
  },

  /** Toutes les leçons du module sont-elles réussies ? */
  moduleLessonsAllPassed(curriculum: ProgramCurriculumV2, state: RuntimeState, moduleIndex: number): boolean {
    const mod = findModule(curriculum, moduleIndex);
    if (!mod || mod.lessons.length === 0) return false;
    return mod.lessons.every((l) => CompletionCalculator.isLessonPassed(state, l.id));
  },

  /** Le sommatif du module est-il réussi (≥ seuil) ? */
  moduleSummativePassed(state: RuntimeState, moduleIndex: number): boolean {
    const mp = state.modules[moduleIndex];
    return !!mp && typeof mp.summativeScore === "number" && mp.summativeScore >= RUNTIME_THRESHOLDS.summativePass;
  },

  /** Le travail pratique du module a-t-il été soumis ? */
  modulePracticalSubmitted(state: RuntimeState, moduleIndex: number): boolean {
    return !!state.modules[moduleIndex]?.practicalSubmitted;
  },

  /**
   * Le module est-il « validé » (règles v2) : toutes leçons réussies + sommatif ≥ 70 % + TP soumis.
   */
  isModulePassed(curriculum: ProgramCurriculumV2, state: RuntimeState, moduleIndex: number): boolean {
    return (
      CompletionCalculator.moduleLessonsAllPassed(curriculum, state, moduleIndex) &&
      CompletionCalculator.moduleSummativePassed(state, moduleIndex) &&
      CompletionCalculator.modulePracticalSubmitted(state, moduleIndex)
    );
  },

  /** Nombre de leçons complétées sur le total du cursus. */
  lessonCompletionCount(curriculum: ProgramCurriculumV2, state: RuntimeState): { completed: number; total: number } {
    const total = curriculum.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const completed = curriculum.modules
      .flatMap((m) => m.lessons)
      .filter((l) => CompletionCalculator.isLessonCompleted(state, l.id)).length;
    return { completed, total };
  },
};
