"use client";
/**
 * Panneau de complétion d'évaluation (Sprint K3C). Consomme UNIQUEMENT le ViewModel PUBLIC. Distingue
 * clairement provisoire vs définitif ; affiche compétences, révision, reprise, prochaine action et
 * admissibilité à la certification, avec l'avertissement « aucun certificat émis ». Accessible (titres,
 * aria-live, pas de statut par la seule couleur).
 */
import type { AssessmentCompletionViewModel } from "@/lib/runtime/ui/completion/completion-view-models";
import { completionT } from "@/lib/runtime/ui/completion/completion-i18n";

export function AssessmentCompletionPanel({ vm }: { vm: AssessmentCompletionViewModel }) {
  const decisionLabel = vm.decisionKind === "final" ? completionT("completion.decision.final") : vm.decisionKind === "provisional" ? completionT("completion.decision.provisional") : completionT("completion.decision.none");
  const passLabel = vm.passed === null ? null : vm.passed ? "✓ " + completionT("completion.status.final_pass") : completionT("completion.status.final_fail");

  return (
    <section id="completion-panel" aria-labelledby="completion-title" className="mx-auto max-w-2xl space-y-6 rounded-xl border border-[color:var(--border-gold)] bg-white p-6">
      <header className="space-y-1">
        <h1 id="completion-title" className="text-xl font-bold text-[color:var(--color-navy)]">{completionT("completion.title")}</h1>
        <p className="text-sm text-[#5a6a82]">{completionT(vm.programTitleKey)}</p>
      </header>

      <div className="rounded-lg bg-[color:var(--color-navy)]/5 p-4" role="status" aria-live="polite">
        <p className="text-xs font-semibold uppercase text-[#5a6a82]">{decisionLabel}</p>
        <p className="mt-1 text-lg font-bold text-[color:var(--color-navy)]" data-testid="completion-status">{completionT(`completion.status.${vm.status}`)}</p>
        {vm.scorePercent !== null && <p className="mt-1 text-sm text-[color:var(--color-body)]">{completionT("completion.score")} : {vm.scorePercent}%</p>}
        {passLabel && <p className={`mt-1 text-sm font-semibold ${vm.passed ? "text-green-800" : "text-amber-800"}`}>{passLabel}</p>}
      </div>

      {vm.publicReasonKeys.length > 0 && (
        <ul className="space-y-1 text-sm text-[color:var(--color-body)]">
          {vm.publicReasonKeys.map((k, i) => <li key={i}>• {completionT(k)}</li>)}
        </ul>
      )}

      {vm.competencies.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold uppercase text-[#5a6a82]">{completionT("completion.competencies")} ({vm.acquiredCount}/{vm.totalCompetencies})</h2>
          <ul className="mt-2 space-y-1">
            {vm.competencies.map((c) => (
              <li key={c.competencyId} className="flex items-center justify-between rounded-lg border border-[color:var(--border-gold)] px-3 py-1.5 text-sm">
                <span className="font-medium text-[color:var(--color-navy)]">{c.competencyId}</span>
                <span className="text-[color:var(--color-body)]">{c.scorePercent}% / {c.thresholdPercent}% — {c.acquired ? completionT("completion.acquired") : completionT("completion.not_acquired")}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {vm.remainingRequirementKeys.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold uppercase text-[#5a6a82]">{completionT("completion.remaining")}</h2>
          <ul className="mt-1 text-sm text-[color:var(--color-body)]">{vm.remainingRequirementKeys.map((k, i) => <li key={i}>• {completionT(k)}</li>)}</ul>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <h2 className="text-xs font-semibold uppercase text-[#5a6a82]">{completionT("completion.review")}</h2>
          <p className="mt-1 text-sm text-[color:var(--color-body)]">{completionT(vm.reviewStatusKey)}</p>
        </div>
        {vm.retake && (
          <div>
            <h2 className="text-xs font-semibold uppercase text-[#5a6a82]">{completionT("completion.retake")}</h2>
            <p className="mt-1 text-sm text-[color:var(--color-body)]" data-testid="completion-retake">{completionT(vm.retake.reasonKey)}{vm.retake.available ? ` (${vm.retake.attemptsRemaining})` : ""}</p>
          </div>
        )}
      </div>

      <div className="rounded-lg border border-[color:var(--border-gold)] p-4">
        <h2 className="text-xs font-semibold uppercase text-[#5a6a82]">{completionT("completion.next")}</h2>
        <p className="mt-1 text-sm font-medium text-[color:var(--color-navy)]" data-testid="completion-next">{completionT(vm.nextActionKey)}</p>
      </div>

      <div className="rounded-lg bg-[color:var(--color-off-white)] p-4">
        <h2 className="text-xs font-semibold uppercase text-[#5a6a82]">{completionT("completion.certification")}</h2>
        {vm.certificationEligibility ? (
          <p className="mt-1 text-sm font-medium text-green-800" data-testid="completion-cert-eligible">{completionT("completion.status.final_pass")} — {completionT("completion.certification")} : admissible.</p>
        ) : (
          <p className="mt-1 text-sm text-[color:var(--color-body)]">{completionT("completion.certification")} : non admissible.</p>
        )}
        <p className="mt-2 text-xs text-[#5a6a82]">{completionT(vm.noCertificateNoticeKey)}</p>
      </div>
    </section>
  );
}
