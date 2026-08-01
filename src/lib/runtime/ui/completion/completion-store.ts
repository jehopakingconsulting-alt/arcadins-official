/**
 * Runtime — UI/Completion : store DÉDIÉ de complétion (Sprint K3C).
 *
 * Persiste l'état d'orchestration (pur) et notifie les abonnés. snapshot/hydrate pour la reprise. Ne touche
 * PAS le RuntimeState du Sprint A. Toute mutation passe par l'orchestrateur pur (idempotent).
 */
import { AssessmentCompletionOrchestrator, COMPLETION_STATE_VERSION, initialCompletionState, type CompletionState, type ConsolidateContext, type ConsolidateResult } from "./assessment-completion-orchestrator.ts";
import type { CompletionInput } from "./completion-types.ts";

export interface CompletionStore {
  getState(): CompletionState;
  consolidate(input: CompletionInput, commandId: string, ctx: ConsolidateContext): ConsolidateResult;
  subscribe(listener: () => void): () => void;
  snapshot(): { version: number; state: CompletionState };
  hydrate(snapshot: { version: number; state: CompletionState }): CompletionState;
}

export function createCompletionStore(initial: CompletionState = initialCompletionState()): CompletionStore {
  let state = initial;
  const listeners = new Set<() => void>();
  const emit = () => listeners.forEach((l) => l());
  return {
    getState: () => state,
    consolidate(input, commandId, ctx) {
      const result = AssessmentCompletionOrchestrator.consolidate(state, input, commandId, ctx);
      if (result.events.length > 0) {
        state = result.state;
        emit();
      }
      return result;
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    snapshot: () => ({ version: COMPLETION_STATE_VERSION, state }),
    hydrate(snapshot) {
      if (snapshot.version !== COMPLETION_STATE_VERSION) throw new Error("COMPLETION_SNAPSHOT_VERSION_MISMATCH");
      state = snapshot.state;
      emit();
      return state;
    },
  };
}
