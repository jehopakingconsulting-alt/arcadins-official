"use client";
/**
 * Wrapper de PREVIEW de la complétion (Sprint K3C). Rend un scénario DÉTERMINISTE synthétique via
 * l'orchestrateur pur. FRONTIÈRE CLIENT SÛRE : aucune banque privée, aucun curriculum complet, aucune donnée
 * réelle. Un sélecteur permet de naviguer entre les scénarios (états représentatifs). Aucun certificat émis.
 */
import { useState } from "react";
import { ALL_SCENARIOS, buildScenarioInput, type CompletionScenario } from "@/lib/runtime/ui/completion/completion-config";
import { completionT } from "@/lib/runtime/ui/completion/completion-i18n";
import { useAssessmentCompletion } from "@/hooks/learn/useAssessmentCompletion";
import { AssessmentCompletionPanel } from "./AssessmentCompletionPanel";

function ScenarioView({ scenario }: { scenario: CompletionScenario }) {
  const vm = useAssessmentCompletion(buildScenarioInput(scenario));
  return <AssessmentCompletionPanel vm={vm} />;
}

export function AssessmentCompletionPreview({ initialScenario = "final_pass" }: { initialScenario?: CompletionScenario }) {
  const [scenario, setScenario] = useState<CompletionScenario>(initialScenario);
  return (
    <div id="completion-preview" className="relative z-[1000] min-h-screen bg-[color:var(--color-off-white)] px-4 pb-8 pt-24">
      <div className="mx-auto max-w-2xl space-y-6">
        <p className="rounded-lg bg-[color:var(--color-navy)]/5 px-3 py-2 text-center text-xs font-medium text-[#5a6a82]">
          {"Bilan d'évaluation — scénarios de démonstration, données synthétiques, aucun certificat émis."}
        </p>
        <nav aria-label="Scénarios" className="flex flex-wrap gap-2">
          {ALL_SCENARIOS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setScenario(s)}
              aria-current={s === scenario ? "true" : undefined}
              className={`min-h-11 rounded-lg border px-3 py-1.5 text-xs font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)] ${s === scenario ? "border-[color:var(--color-gold)] bg-[color:var(--color-gold)]/15 text-[color:var(--color-navy)]" : "border-[color:var(--border-gold)] text-[color:var(--color-navy)]"}`}
            >
              {completionT(`completion.status.${statusForScenario(s)}`)}
            </button>
          ))}
        </nav>
        {/* clé = scénario : remonte proprement le hook (nouvelle consolidation) à chaque changement */}
        <ScenarioView key={scenario} scenario={scenario} />
      </div>
    </div>
  );
}

/** Étiquette lisible du bouton (statut attendu par scénario, à titre indicatif). */
function statusForScenario(s: CompletionScenario): string {
  const map: Record<CompletionScenario, string> = {
    quiz_pending: "quiz_requirements_pending",
    exam_not_eligible: "final_exam_not_eligible",
    provisional_pass: "provisional_pass",
    provisional_fail: "provisional_fail",
    manual_review_pending: "manual_review_pending",
    retake_available: "retake_available",
    retake_exhausted: "retake_exhausted",
    final_pass: "final_pass",
    final_fail: "final_fail",
    suspended: "suspended",
  };
  return map[s];
}
