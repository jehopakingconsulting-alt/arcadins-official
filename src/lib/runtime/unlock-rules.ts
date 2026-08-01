/**
 * Runtime étudiant — UnlockRules (Sprint A).
 *
 * Règles PURES de déblocage progressif :
 *  - Le module 1 (premier index) est toujours débloqué.
 *  - Le module N+1 est débloqué ⇔ le module N est « validé » (voir CompletionCalculator).
 *  - Sinon il est verrouillé.
 *  - En cas d'échec du sommatif, l'état passe en « needs_review ».
 */
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type { ModuleState, RuntimeState } from "./types.ts";
import { CompletionCalculator } from "./completion-calculator.ts";
import { orderedModules } from "./helpers.ts";

export const UnlockRules = {
  /** Le module est-il débloqué (accessible) ? */
  isModuleUnlocked(curriculum: ProgramCurriculumV2, state: RuntimeState, moduleIndex: number): boolean {
    const mods = orderedModules(curriculum);
    const pos = mods.findIndex((m) => m.index === moduleIndex);
    if (pos < 0) return false;
    if (pos === 0) return true; // premier module toujours ouvert
    const prev = mods[pos - 1];
    return CompletionCalculator.isModulePassed(curriculum, state, prev.index);
  },

  /** Raison du verrouillage (ou undefined si débloqué). */
  lockedReason(curriculum: ProgramCurriculumV2, state: RuntimeState, moduleIndex: number): string | undefined {
    if (UnlockRules.isModuleUnlocked(curriculum, state, moduleIndex)) return undefined;
    const mods = orderedModules(curriculum);
    const pos = mods.findIndex((m) => m.index === moduleIndex);
    const prev = mods[pos - 1];
    return `Terminez d'abord le module ${prev.index} (leçons réussies + sommatif ≥ 70 % + travail pratique soumis).`;
  },

  /** État dérivé d'un module (locked/available/in_progress/passed/needs_review). */
  deriveModuleState(curriculum: ProgramCurriculumV2, state: RuntimeState, moduleIndex: number): ModuleState {
    if (!UnlockRules.isModuleUnlocked(curriculum, state, moduleIndex)) return "locked";
    if (CompletionCalculator.isModulePassed(curriculum, state, moduleIndex)) return "passed";

    const mp = state.modules[moduleIndex];
    // Échec du sommatif → révision.
    if (mp && typeof mp.summativeScore === "number" && !CompletionCalculator.moduleSummativePassed(state, moduleIndex)) {
      return "needs_review";
    }
    // Une activité a commencé (au moins une leçon vue/complétée) → in_progress.
    const mod = curriculum.modules.find((m) => m.index === moduleIndex);
    const started = mod?.lessons.some((l) => {
      const lp = state.lessons[l.id];
      return lp && lp.state !== "locked" && lp.state !== "available";
    });
    return started ? "in_progress" : "available";
  },

  /** Liste des index de modules débloqués mais pas encore validés (à travailler). */
  unlockedPending(curriculum: ProgramCurriculumV2, state: RuntimeState): number[] {
    return orderedModules(curriculum)
      .map((m) => m.index)
      .filter(
        (idx) =>
          UnlockRules.isModuleUnlocked(curriculum, state, idx) &&
          !CompletionCalculator.isModulePassed(curriculum, state, idx),
      );
  },
};
