"use client";
import type { ExamFinalDecisionViewModel } from "@/lib/runtime/ui/exam/exam-view-models";
import { examT } from "@/lib/runtime/ui/exam/exam-i18n";

/**
 * Statut de DÉCISION FINALE (Sprint K3B). Distingue clairement : décision en attente, réussi, échoué,
 * admissible à la certification (attestation NON encore émise). Aucun certificat/badge n'est généré ici.
 */
export function FinalDecisionStatus({ decision }: { decision: ExamFinalDecisionViewModel }) {
  return (
    <section aria-labelledby="exam-decision-title" className="mx-auto max-w-xl space-y-3 rounded-xl border border-[color:var(--border-gold)] bg-white p-6 text-center">
      <h2 id="exam-decision-title" className="text-lg font-bold text-[color:var(--color-navy)]">{examT("exam.decision.title")}</h2>
      {!decision.decided ? (
        <p className="text-sm text-[color:var(--color-body)]" role="status">{examT("exam.decision.pending")}</p>
      ) : (
        <>
          <p className={`text-2xl font-bold ${decision.passed ? "text-green-700" : "text-amber-700"}`} aria-live="polite">
            {decision.passed ? examT("exam.decision.passed") : examT("exam.decision.failed")}
            {decision.scorePercent !== null ? ` — ${decision.scorePercent}%` : ""}
          </p>
          <p className="text-sm text-[color:var(--color-body)]">{examT(decision.nextMilestoneKey)}</p>
          {decision.certificateEligibility && (
            <p data-testid="certificate-eligibility" className="rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-800">
              {examT("exam.next.certificate_available")}
            </p>
          )}
        </>
      )}
    </section>
  );
}
