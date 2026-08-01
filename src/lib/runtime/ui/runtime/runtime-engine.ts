/**
 * Runtime — UI/Runtime : RuntimeEngine (Sprint K2A).
 *
 * Calcule le FEED de progression (`RuntimeDerived`) à partir de (curriculum, état, horloge). RÉUTILISE les moteurs
 * PURS du Sprint A (`ProgressCalculator`, `UnlockRules`) — aucune règle métier dupliquée. Déterministe.
 */
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type { LessonState, RuntimeDerived, RuntimeLessonDerived, RuntimeModuleDerived, RuntimeState } from "./types.ts";
import { ProgressCalculator } from "../../progress-calculator.ts";
import { UnlockRules } from "../../unlock-rules.ts";
import { orderedModules, isoDay } from "../../helpers.ts";

/** Pourcentage indicatif dérivé de l'état d'une leçon (le contenu est « fait » quand complété/réussi). */
function lessonPercentFromState(s: LessonState): number {
  switch (s) {
    case "completed":
    case "passed":
    case "needs_review":
      return 100;
    case "in_progress":
      return 50;
    default:
      return 0; // locked / available
  }
}

export const RuntimeEngine = {
  derive(curriculum: ProgramCurriculumV2, state: RuntimeState, now: Date): RuntimeDerived {
    const modules: RuntimeModuleDerived[] = orderedModules(curriculum).map((m) => {
      const unlocked = UnlockRules.isModuleUnlocked(curriculum, state, m.index);
      return {
        moduleIndex: m.index,
        state: UnlockRules.deriveModuleState(curriculum, state, m.index),
        percent: ProgressCalculator.modulePercent(curriculum, state, m.index),
        unlocked,
        lockedReason: unlocked ? null : UnlockRules.lockedReason(curriculum, state, m.index) ?? null,
      };
    });

    const lessons: RuntimeLessonDerived[] = curriculum.modules.flatMap((m) =>
      m.lessons.map((l): RuntimeLessonDerived => {
        const lp = state.lessons[l.id];
        const st: LessonState = lp?.state ?? "locked";
        return { lessonId: l.id, moduleIndex: m.index, state: st, percent: lessonPercentFromState(st) };
      }),
    );

    const currentLessonId =
      lessons.find((l) => l.state === "in_progress")?.lessonId ??
      lessons.find((l) => l.state === "available")?.lessonId ??
      null;
    const currentIdx = currentLessonId ? lessons.findIndex((l) => l.lessonId === currentLessonId) : -1;
    const nextLessonId =
      currentIdx >= 0
        ? lessons.slice(currentIdx + 1).find((l) => l.state === "available" || l.state === "in_progress")?.lessonId ?? null
        : null;

    return {
      program: ProgressCalculator.programProgressView(curriculum, state, now),
      modules,
      lessons,
      currentLessonId,
      nextLessonId,
      computedAtDay: isoDay(now),
    };
  },
};
