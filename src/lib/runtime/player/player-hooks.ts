/**
 * Runtime — Learning Player : hooks de cycle de vie (Sprint C).
 *
 * ⚠️ Ce ne sont PAS des hooks React. Bus d'abonnement PUR pour les événements du Player
 * (leçon ouverte, position, terminée, note, favori, ressource ouverte).
 */
export type PlayerHookName =
  | "lessonOpened"
  | "positionChanged"
  | "lessonCompleted"
  | "noteSaved"
  | "favoriteToggled"
  | "resourceOpened";

export interface PlayerHookPayload {
  lessonOpened: { lessonRef: string };
  positionChanged: { lessonRef: string; seconds: number };
  lessonCompleted: { lessonRef: string };
  noteSaved: { lessonRef: string };
  favoriteToggled: { lessonRef: string; on: boolean };
  resourceOpened: { lessonRef: string; resourceId: string };
}

type Handler<K extends PlayerHookName> = (payload: PlayerHookPayload[K]) => void;

export interface PlayerHooks {
  on<K extends PlayerHookName>(name: K, handler: Handler<K>): () => void;
  off<K extends PlayerHookName>(name: K, handler: Handler<K>): void;
  emit<K extends PlayerHookName>(name: K, payload: PlayerHookPayload[K]): void;
}

export function createPlayerHooks(): PlayerHooks {
  const handlers = new Map<PlayerHookName, Set<(payload: unknown) => void>>();
  const hooks: PlayerHooks = {
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
