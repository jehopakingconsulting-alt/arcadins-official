"use client";
/**
 * Hook React d'orchestration de complétion (Sprint K3C).
 *
 * Enveloppe le store de complétion (pur). Consolide une fois l'entrée fournie et expose UNIQUEMENT le
 * ViewModel PUBLIC (nettoyé) + l'indicateur d'admissibilité à la certification. Aucune décision/score/réussite
 * calculés dans React : tout provient de l'orchestrateur pur.
 */
import { useMemo, useSyncExternalStore } from "react";
import { createCompletionStore } from "@/lib/runtime/ui/completion/completion-store";
import { toCompletionViewModel, type AssessmentCompletionViewModel } from "@/lib/runtime/ui/completion/completion-view-models";
import type { CompletionInput } from "@/lib/runtime/ui/completion/completion-types";

export function useAssessmentCompletion(input: CompletionInput): AssessmentCompletionViewModel {
  // Store créé + consolidé UNE fois (consolidation idempotente : rejouer la même commande est sans effet).
  const store = useMemo(() => {
    const s = createCompletionStore();
    let n = 0;
    s.consolidate(input, "consolidate:preview", { now: () => new Date(), idFactory: () => `k3c-${n++}` });
    return s;
  }, [input]);

  const state = useSyncExternalStore(store.subscribe, store.getState, store.getState);
  return useMemo(() => toCompletionViewModel(state, input), [state, input]);
}
