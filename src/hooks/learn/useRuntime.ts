"use client";
/**
 * Hooks — runtime étudiant (Sprint K2A). Lecture du contexte runtime : état, feed dérivé, dispatch.
 * Ces hooks NE rendent aucune UI ; ils exposent uniquement les données du runtime aux composants (K2B+).
 */
import type { LearningEvent, RuntimeDerived, RuntimeState } from "@/lib/runtime/ui/runtime/types";
import { useRuntimeContext } from "@/lib/runtime/ui/runtime/RuntimeProvider";

export function useRuntimeState(): RuntimeState {
  return useRuntimeContext().state;
}

export function useRuntimeDerived(): RuntimeDerived {
  return useRuntimeContext().derived;
}

export function useRuntimeDispatch(): (events: LearningEvent | LearningEvent[]) => void {
  return useRuntimeContext().dispatch;
}
