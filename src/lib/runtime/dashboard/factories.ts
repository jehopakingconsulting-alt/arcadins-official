/**
 * Runtime — Dashboard Étudiant : Factories (Sprint D).
 *
 * Crée un dashboard « vivant » branché sur un `RuntimeStore` (Sprint A) : à chaque changement d'état,
 * la vue est recalculée et l'événement `refreshed` est émis. PUR, aucune UI, aucune écriture.
 */
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type { RuntimeStore } from "../store.ts";
import type { Awards } from "../persistence/types.ts";
import type { StudentDashboardState } from "./types.ts";
import { StudentDashboardController } from "./state.ts";
import { createDashboardHooks, type DashboardHooks } from "./hooks.ts";

export interface StudentDashboard {
  hooks: DashboardHooks;
  /** Vue courante recalculée à la demande. */
  getState(now?: Date): StudentDashboardState;
  /** Met à jour les récompenses (badges/certificats) prises en compte par le dashboard. */
  setAwards(awards: Awards): void;
  /** Se désabonne du store. */
  dispose(): void;
}

export interface StudentDashboardOptions {
  curriculum: ProgramCurriculumV2;
  store: RuntimeStore;
  awards?: Awards;
  currentRef?: () => string | undefined;
}

/** Crée un dashboard étudiant vivant (recalcul + hooks à chaque changement d'état). */
export function createStudentDashboard(options: StudentDashboardOptions): StudentDashboard {
  const { curriculum, store } = options;
  const hooks = createDashboardHooks();
  let awards: Awards = options.awards ?? { badges: [], certificates: [] };

  const build = (now?: Date): StudentDashboardState =>
    StudentDashboardController.build(curriculum, store.getState(), {
      awards,
      now,
      currentRef: options.currentRef?.(),
    });

  const unsubscribe = store.subscribe(() => {
    hooks.emit("refreshed", { state: build() });
  });

  return {
    hooks,
    getState: (now) => build(now),
    setAwards: (a) => {
      awards = a;
    },
    dispose: () => unsubscribe(),
  };
}
