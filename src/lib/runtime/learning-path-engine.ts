/**
 * Runtime étudiant — LearningPathEngine (Sprint A).
 *
 * Construit, de façon PURE, le parcours d'apprentissage : état de chaque module (verrouillé/ouvert/validé),
 * prochaine étape à travailler, prochain module déblocable.
 */
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type { ModulePathNode, RuntimeState } from "./types.ts";
import { UnlockRules } from "./unlock-rules.ts";
import { CompletionCalculator } from "./completion-calculator.ts";
import { ProgressCalculator } from "./progress-calculator.ts";
import { orderedModules } from "./helpers.ts";
import { LessonEngine } from "./lesson-engine.ts";

export const LearningPathEngine = {
  /** Parcours complet : un nœud par module, avec état, pourcentage et raison de verrouillage. */
  buildPath(curriculum: ProgramCurriculumV2, state: RuntimeState): ModulePathNode[] {
    return orderedModules(curriculum).map((m) => ({
      moduleIndex: m.index,
      title: m.title,
      state: UnlockRules.deriveModuleState(curriculum, state, m.index),
      percent: ProgressCalculator.modulePercent(curriculum, state, m.index),
      lockedReason: UnlockRules.lockedReason(curriculum, state, m.index),
    }));
  },

  /** Prochain module à débloquer (premier verrouillé) — ou null si tout est ouvert. */
  nextLockedModule(curriculum: ProgramCurriculumV2, state: RuntimeState): number | null {
    const locked = orderedModules(curriculum).find(
      (m) => !UnlockRules.isModuleUnlocked(curriculum, state, m.index),
    );
    return locked ? locked.index : null;
  },

  /** Prochaine leçon à travailler : première leçon non réussie d'un module ouvert non validé. */
  nextLesson(curriculum: ProgramCurriculumV2, state: RuntimeState): string | undefined {
    for (const m of orderedModules(curriculum)) {
      if (!UnlockRules.isModuleUnlocked(curriculum, state, m.index)) continue;
      if (CompletionCalculator.isModulePassed(curriculum, state, m.index)) continue;
      const lesson = m.lessons.find((l) => !CompletionCalculator.isLessonPassed(state, l.id));
      if (lesson) return lesson.id;
    }
    // À défaut, « continuer où j'étais ».
    return LessonEngine.continueWhereILeftOff(curriculum, state);
  },

  /** Le programme est-il entièrement validé ? */
  isProgramComplete(curriculum: ProgramCurriculumV2, state: RuntimeState): boolean {
    return curriculum.modules.every((m) => CompletionCalculator.isModulePassed(curriculum, state, m.index));
  },
};
