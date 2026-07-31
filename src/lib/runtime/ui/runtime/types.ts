/**
 * Runtime — UI/Runtime : types de la couche de données runtime étudiant (Sprint K2A).
 *
 * Couche INTERNE : fournit les données de progression au runtime. Réutilise l'état et les moteurs PURS du
 * Sprint A (`RuntimeState`, `ProgressCalculator`, `UnlockRules`) — aucune duplication de logique métier.
 * Aucune UI, aucun dashboard, aucune navigation ici.
 */
import type {
  LearningEvent,
  LessonState,
  ModuleState,
  ProgramProgressView,
  RuntimeState,
} from "../../types.ts";

export type { LearningEvent, LessonState, ModuleState, ProgramProgressView, RuntimeState };

/** Progression dérivée d'une leçon (état + pourcentage). */
export interface RuntimeLessonDerived {
  lessonId: string;
  moduleIndex: number;
  state: LessonState;
  percent: number;
}

/** Progression dérivée d'un module (état, pourcentage, déblocage, raison). */
export interface RuntimeModuleDerived {
  moduleIndex: number;
  state: ModuleState;
  percent: number;
  unlocked: boolean;
  lockedReason: string | null;
}

/** Feed complet de données runtime (résultat du moteur, mémoïsé par le cache). */
export interface RuntimeDerived {
  program: ProgramProgressView;
  modules: RuntimeModuleDerived[];
  lessons: RuntimeLessonDerived[];
  currentLessonId: string | null;
  nextLessonId: string | null;
  computedAtDay: string; // jour ISO du calcul (impacte weekly/daily)
}

/** Instantané sérialisable de l'état runtime (persistance/synchronisation future). */
export interface RuntimeSnapshot {
  snapshotVersion: number;
  programSlug: string;
  programVersion: string;
  state: RuntimeState;
  checksum: string;
}
