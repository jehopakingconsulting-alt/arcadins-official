/**
 * Runtime — UI/Runtime : ProgressCache (Sprint K2A).
 *
 * Mémoïse le feed dérivé (`RuntimeDerived`) par clé d'état + jour, pour éviter tout recalcul superflu. PUR.
 * La clé combine le checksum de l'état et le jour ISO (les agrégats hebdo/quotidien dépendent de la date).
 */
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type { RuntimeDerived, RuntimeState } from "./types.ts";
import { RuntimeEngine } from "./runtime-engine.ts";
import { stateChecksum } from "./academic-repository.ts";
import { isoDay } from "../../helpers.ts";

export interface ProgressCache {
  get(curriculum: ProgramCurriculumV2, state: RuntimeState, now: Date): RuntimeDerived;
  invalidate(): void;
  size(): number;
}

export function createProgressCache(maxEntries = 8): ProgressCache {
  const store = new Map<string, RuntimeDerived>();
  return {
    get(curriculum, state, now) {
      const key = `${state.programSlug}:${stateChecksum(state)}:${isoDay(now)}`;
      const hit = store.get(key);
      if (hit) return hit;
      const derived = RuntimeEngine.derive(curriculum, state, now);
      store.set(key, derived);
      // Éviction LRU simple (Map conserve l'ordre d'insertion).
      if (store.size > maxEntries) {
        const oldest = store.keys().next().value as string | undefined;
        if (oldest) store.delete(oldest);
      }
      return derived;
    },
    invalidate() {
      store.clear();
    },
    size: () => store.size,
  };
}
