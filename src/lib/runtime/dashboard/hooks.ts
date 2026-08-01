/**
 * Runtime — Dashboard Étudiant : DashboardHooks (Sprint D).
 *
 * ⚠️ Pas des hooks React. Bus d'abonnement PUR aux événements du dashboard (rafraîchi, notification, objectif atteint).
 */
import type { StudentDashboardState } from "./types.ts";

export type DashboardHookName = "refreshed" | "notification" | "objectiveReached";

export interface DashboardHookPayload {
  refreshed: { state: StudentDashboardState };
  notification: { id: string; message: string };
  objectiveReached: { moduleIndex?: number; lessonRef?: string };
}

type Handler<K extends DashboardHookName> = (payload: DashboardHookPayload[K]) => void;

export interface DashboardHooks {
  on<K extends DashboardHookName>(name: K, handler: Handler<K>): () => void;
  off<K extends DashboardHookName>(name: K, handler: Handler<K>): void;
  emit<K extends DashboardHookName>(name: K, payload: DashboardHookPayload[K]): void;
}

export function createDashboardHooks(): DashboardHooks {
  const handlers = new Map<DashboardHookName, Set<(payload: unknown) => void>>();
  const hooks: DashboardHooks = {
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
