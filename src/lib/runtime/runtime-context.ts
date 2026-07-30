/**
 * Runtime étudiant — RuntimeContext (Sprint A).
 *
 * ⚠️ Ce n'est PAS un React Context. C'est un objet-contexte PUR qui regroupe le cursus, le store,
 * les hooks de cycle de vie et les moteurs (progression, leçons, parcours) en un point d'accès unique.
 * Le futur `RuntimeProvider` React consommera ce contexte, sans le remplacer.
 */
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type { ProgramProgressView, ModulePathNode, RuntimeState } from "./types.ts";
import { createRuntimeStore, type RuntimeStore } from "./store.ts";
import { ProgressCalculator } from "./progress-calculator.ts";
import { LearningPathEngine } from "./learning-path-engine.ts";
import { LessonEngine } from "./lesson-engine.ts";

export interface RuntimeContext {
  curriculum: ProgramCurriculumV2;
  store: RuntimeStore;
  /** Vues dérivées (lecture) — recalculées à la demande à partir de l'état courant. */
  select: {
    state(): RuntimeState;
    progress(now?: Date): ProgramProgressView;
    path(): ModulePathNode[];
    nextLesson(): string | undefined;
    continueWhereILeftOff(): string | undefined;
    isProgramComplete(): boolean;
  };
}

/** Crée le contexte runtime pour un programme (état initial ou repris). */
export function createRuntimeContext(options: {
  curriculum: ProgramCurriculumV2;
  initialState?: RuntimeState;
}): RuntimeContext {
  const { curriculum, initialState } = options;
  const store = createRuntimeStore(curriculum, initialState);

  return {
    curriculum,
    store,
    select: {
      state: () => store.getState(),
      progress: (now) => ProgressCalculator.programProgressView(curriculum, store.getState(), now),
      path: () => LearningPathEngine.buildPath(curriculum, store.getState()),
      nextLesson: () => LearningPathEngine.nextLesson(curriculum, store.getState()),
      continueWhereILeftOff: () => LessonEngine.continueWhereILeftOff(curriculum, store.getState()),
      isProgramComplete: () => LearningPathEngine.isProgramComplete(curriculum, store.getState()),
    },
  };
}
