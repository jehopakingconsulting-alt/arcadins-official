/**
 * Runtime — UI/Runtime : StudentRuntime (façade, Sprint K2A).
 *
 * Assemble : AcademicRepository (contenu + snapshot), store PUR du Sprint A (state management + reducer),
 * RuntimeEngine (calcul de progression) et ProgressCache. Fournit le FEED de données au runtime, applique les
 * événements (synchronisation), et sérialise/reprend l'état. Aucune UI, aucune I/O, aucune API réelle.
 *
 * `now` est INJECTÉ (défaut : horloge système) pour rester déterministe et testable.
 */
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type { LearningEvent, RuntimeDerived, RuntimeSnapshot, RuntimeState } from "./types.ts";
import { createAcademicRepository, type AcademicRepository } from "./academic-repository.ts";
import { createProgressCache, type ProgressCache } from "./progress-cache.ts";
import { createRuntimeStore, type RuntimeStore } from "../../store.ts";
import { sortEvents } from "../../learning-events.ts";

export interface StudentRuntimeOptions {
  initialState?: RuntimeState;
  now?: () => Date;
}

export interface StudentRuntime {
  readonly repository: AcademicRepository;
  /** Store PUR courant (Sprint A) — remplacé lors d'un `hydrate`. */
  getStore(): RuntimeStore;
  getState(): RuntimeState;
  /** Feed dérivé mémoïsé de l'état COURANT (progression, statuts, leçon courante/suivante). */
  getDerived(): RuntimeDerived;
  /** Feed dérivé mémoïsé pour un état DONNÉ (utilisé par le provider React). */
  getDerivedFor(state: RuntimeState): RuntimeDerived;
  /** Applique un ou plusieurs événements (triés) ; renvoie le nouvel état. */
  dispatch(events: LearningEvent | LearningEvent[]): RuntimeState;
  subscribe(listener: (state: RuntimeState) => void): () => void;
  /** Sérialise l'état courant en instantané intègre. */
  snapshot(): RuntimeSnapshot;
  /** Remplace l'état courant par celui d'un instantané (checksum vérifié). */
  hydrate(snapshot: RuntimeSnapshot): RuntimeState;
}

export function createStudentRuntime(curriculum: ProgramCurriculumV2, opts: StudentRuntimeOptions = {}): StudentRuntime {
  const now = opts.now ?? (() => new Date());
  const repository = createAcademicRepository(curriculum);
  const cache: ProgressCache = createProgressCache();

  // La façade possède ses propres abonnés ; le store interne peut être remplacé (hydrate) sans les perdre.
  const listeners = new Set<(s: RuntimeState) => void>();
  let store: RuntimeStore = createRuntimeStore(curriculum, opts.initialState);
  let unsubStore = store.subscribe((s) => listeners.forEach((l) => l(s)));

  const getDerivedFor = (state: RuntimeState): RuntimeDerived => cache.get(curriculum, state, now());

  return {
    repository,
    getStore: () => store,
    getState: () => store.getState(),
    getDerived: () => getDerivedFor(store.getState()),
    getDerivedFor,
    dispatch(events) {
      const list = Array.isArray(events) ? sortEvents(events) : [events];
      let state = store.getState();
      for (const e of list) state = store.dispatch(e);
      return state;
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    snapshot: () => repository.snapshot(store.getState()),
    hydrate(snapshot) {
      const restored = repository.hydrate(snapshot); // valide checksum + programme
      cache.invalidate();
      unsubStore();
      store = createRuntimeStore(curriculum, restored);
      unsubStore = store.subscribe((s) => listeners.forEach((l) => l(s)));
      listeners.forEach((l) => l(restored));
      return restored;
    },
  };
}
