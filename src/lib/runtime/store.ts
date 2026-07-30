/**
 * Runtime étudiant — Store (Sprint A).
 *
 * Store PUR, agnostique du framework (pas de React, pas de zustand). Détient un `RuntimeState`,
 * applique les événements via le reducer, notifie les abonnés et déclenche les hooks de cycle de vie.
 */
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type { LearningEvent, RuntimeState } from "./types.ts";
import { applyEvent, buildInitialState } from "./runtime-state.ts";
import { createRuntimeHooks, type RuntimeHooks } from "./runtime-hooks.ts";
import { UnlockRules } from "./unlock-rules.ts";
import { orderedModules } from "./helpers.ts";

export interface RuntimeStore {
  getState(): RuntimeState;
  dispatch(event: LearningEvent): RuntimeState;
  subscribe(listener: (state: RuntimeState) => void): () => void;
  hooks: RuntimeHooks;
}

/** Crée un store runtime pour un programme (état initial ou repris). */
export function createRuntimeStore(curriculum: ProgramCurriculumV2, initial?: RuntimeState): RuntimeStore {
  let state: RuntimeState = initial ?? buildInitialState(curriculum);
  const listeners = new Set<(s: RuntimeState) => void>();
  const hooks = createRuntimeHooks();

  return {
    getState: () => state,
    hooks,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    dispatch(event) {
      const prev = state;
      const next = applyEvent(curriculum, prev, event);
      state = next;

      // Hooks de cycle de vie (dérivés de l'événement + diff d'états).
      hooks.emit("stateChanged", { prev, next, event });
      emitSemanticHooks(curriculum, prev, next, event, hooks);

      listeners.forEach((l) => l(next));
      return next;
    },
  };
}

function emitSemanticHooks(
  curriculum: ProgramCurriculumV2,
  prev: RuntimeState,
  next: RuntimeState,
  event: LearningEvent,
  hooks: RuntimeHooks,
): void {
  if (event.type === "LESSON_COMPLETED") hooks.emit("lessonCompleted", { lessonRef: event.lessonRef });
  if (event.type === "QUIZ_SUBMITTED")
    hooks.emit("quizSubmitted", { lessonRef: event.lessonRef, score: event.score, passed: event.passed });
  if (event.type === "SUMMATIVE_SUBMITTED")
    hooks.emit("summativeSubmitted", { moduleIndex: event.moduleIndex, score: event.score, passed: event.passed });
  if (event.type === "PRACTICAL_SUBMITTED") hooks.emit("practicalSubmitted", { moduleIndex: event.moduleIndex });

  // Détecte les modules nouvellement débloqués (locked → non-locked).
  for (const m of orderedModules(curriculum)) {
    const before = UnlockRules.isModuleUnlocked(curriculum, prev, m.index);
    const after = UnlockRules.isModuleUnlocked(curriculum, next, m.index);
    if (!before && after) hooks.emit("moduleUnlocked", { moduleIndex: m.index });
  }
}
