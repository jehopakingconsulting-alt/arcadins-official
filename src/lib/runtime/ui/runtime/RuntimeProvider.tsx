"use client";
/**
 * Runtime — UI/Runtime : RuntimeProvider (Sprint K2A).
 *
 * Contexte React exposant le runtime étudiant (état + feed dérivé + dispatch) via `useSyncExternalStore`
 * (rendu concurrent-safe). Ce provider N'EST monté nulle part au K2A : il fournit uniquement l'architecture
 * interne. Le branchement à l'UI (dashboard/parcours/lecteur) est réservé aux sous-sprints K2B/K2C.
 */
import { createContext, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";
import type { LearningEvent, RuntimeDerived, RuntimeState } from "./types.ts";
import type { StudentRuntime } from "./student-runtime.ts";

export interface RuntimeContextValue {
  state: RuntimeState;
  derived: RuntimeDerived;
  dispatch: (events: LearningEvent | LearningEvent[]) => void;
  runtime: StudentRuntime;
}

const RuntimeContext = createContext<RuntimeContextValue | null>(null);

export function RuntimeProvider({ runtime, children }: { runtime: StudentRuntime; children: ReactNode }) {
  const state = useSyncExternalStore(
    (onChange) => runtime.subscribe(() => onChange()),
    () => runtime.getState(),
    () => runtime.getState(),
  );
  // Le feed dérivé est mémoïsé par le cache runtime ; on ne recalcule un objet React que si l'état change.
  const derived = useMemo(() => runtime.getDerivedFor(state), [runtime, state]);

  const value = useMemo<RuntimeContextValue>(
    () => ({ state, derived, dispatch: (e) => runtime.dispatch(e), runtime }),
    [state, derived, runtime],
  );
  return <RuntimeContext.Provider value={value}>{children}</RuntimeContext.Provider>;
}

export function useRuntimeContext(): RuntimeContextValue {
  const ctx = useContext(RuntimeContext);
  if (!ctx) throw new Error("useRuntimeContext must be used within <RuntimeProvider>");
  return ctx;
}
