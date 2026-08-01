/**
 * Runtime — Persistence : RuntimeHydration (Sprint B).
 *
 * Reconstruit un `RuntimeState` (cerveau) à partir d'un instantané, en recalculant les états dérivés
 * pour garantir la cohérence (déblocages). Peut aussi rejouer un journal d'événements (résolution de conflit).
 */
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type { LearningEvent, RuntimeState } from "../types.ts";
import { buildInitialState, recomputeStates, applyEvents } from "../runtime-state.ts";
import type { LearningSnapshot } from "./types.ts";

export const RuntimeHydration = {
  /** État de départ « frais » (aucun instantané). */
  fresh(curriculum: ProgramCurriculumV2): RuntimeState {
    return buildInitialState(curriculum);
  },

  /**
   * Hydrate depuis un instantané : reprend l'état stocké et **recalcule les états dérivés**
   * (au cas où le cursus a évolué). Si l'instantané est null, renvoie un état frais.
   */
  fromSnapshot(curriculum: ProgramCurriculumV2, snapshot: LearningSnapshot | null): RuntimeState {
    if (!snapshot) return RuntimeHydration.fresh(curriculum);
    // Garde-fou : programme cohérent, sinon on repart à neuf.
    if (snapshot.state.programSlug !== curriculum.slug) return RuntimeHydration.fresh(curriculum);
    return recomputeStates(curriculum, snapshot.state);
  },

  /**
   * Reconstruit l'état par **rejeu** d'un journal d'événements depuis l'état initial (déterministe).
   * Utilisé pour la résolution de conflit multi-device.
   */
  replay(curriculum: ProgramCurriculumV2, events: LearningEvent[]): RuntimeState {
    return applyEvents(curriculum, buildInitialState(curriculum), events);
  },
};
