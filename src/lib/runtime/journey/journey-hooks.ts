/**
 * Runtime — Learning Journey Engine : hooks de cycle de vie (Sprint E).
 *
 * ⚠️ Pas des hooks React. Bus d'abonnement PUR, avec implémentations no-op sûres par défaut.
 */
export type JourneyHookName =
  | "beforeJourneyGeneration"
  | "afterJourneyGeneration"
  | "beforeRecommendation"
  | "afterRecommendation"
  | "onUnlock"
  | "onRemediation"
  | "onReviewScheduled"
  | "onGoalChanged";

type AnyHandler = (payload: unknown) => void;

export interface JourneyHooks {
  on(name: JourneyHookName, handler: AnyHandler): () => void;
  off(name: JourneyHookName, handler: AnyHandler): void;
  emit(name: JourneyHookName, payload?: unknown): void;
}

/** Bus de hooks (no-op sûr par défaut : émettre sans abonné ne fait rien). */
export function createJourneyHooks(): JourneyHooks {
  const handlers = new Map<JourneyHookName, Set<AnyHandler>>();
  const hooks: JourneyHooks = {
    on(name, handler) {
      const set = handlers.get(name) ?? new Set();
      set.add(handler);
      handlers.set(name, set);
      return () => hooks.off(name, handler);
    },
    off(name, handler) {
      handlers.get(name)?.delete(handler);
    },
    emit(name, payload) {
      handlers.get(name)?.forEach((h) => h(payload));
    },
  };
  return hooks;
}
