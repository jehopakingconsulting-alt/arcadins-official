/**
 * Runtime étudiant — RuntimeHooks (Sprint A).
 *
 * ⚠️ Ce ne sont PAS des hooks React. Ce sont des hooks de CYCLE DE VIE (callbacks) purs,
 * un simple bus d'abonnement, sans dépendance UI. Les hooks React viendront dans un sprint UI ultérieur.
 */
import type { LearningEvent, RuntimeState } from "./types.ts";

export type RuntimeHookName =
  | "stateChanged"
  | "lessonCompleted"
  | "quizSubmitted"
  | "summativeSubmitted"
  | "practicalSubmitted"
  | "moduleUnlocked";

export interface RuntimeHookPayload {
  stateChanged: { prev: RuntimeState; next: RuntimeState; event: LearningEvent };
  lessonCompleted: { lessonRef: string };
  quizSubmitted: { lessonRef: string; score: number; passed: boolean };
  summativeSubmitted: { moduleIndex: number; score: number; passed: boolean };
  practicalSubmitted: { moduleIndex: number };
  moduleUnlocked: { moduleIndex: number };
}

type Handler<K extends RuntimeHookName> = (payload: RuntimeHookPayload[K]) => void;

export interface RuntimeHooks {
  on<K extends RuntimeHookName>(name: K, handler: Handler<K>): () => void;
  off<K extends RuntimeHookName>(name: K, handler: Handler<K>): void;
  emit<K extends RuntimeHookName>(name: K, payload: RuntimeHookPayload[K]): void;
}

/** Crée un bus de hooks de cycle de vie (pur, synchrone). */
export function createRuntimeHooks(): RuntimeHooks {
  // Registre interne non typé (les frontières publiques restent typées via l'interface).
  const handlers = new Map<RuntimeHookName, Set<(payload: unknown) => void>>();

  const hooks: RuntimeHooks = {
    on(name, handler) {
      const set = handlers.get(name) ?? new Set();
      set.add(handler as (payload: unknown) => void);
      handlers.set(name, set);
      return () => hooks.off(name, handler);
    },
    off(name, handler) {
      handlers.get(name)?.delete(handler as (payload: unknown) => void);
    },
    emit(name, payload) {
      handlers.get(name)?.forEach((h) => h(payload));
    },
  };
  return hooks;
}
