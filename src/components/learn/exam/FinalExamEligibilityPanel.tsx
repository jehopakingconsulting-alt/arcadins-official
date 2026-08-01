"use client";
import type { ExamEligibilityViewModel } from "@/lib/runtime/ui/exam/exam-view-models";
import { examT } from "@/lib/runtime/ui/exam/exam-i18n";

/**
 * Panneau d'admissibilité à l'examen final (Sprint K3B). Affiche un statut PUBLIC explicable. En cas de
 * non-admissibilité, montre une raison claire sans exposer d'information interne sensible.
 */
export function FinalExamEligibilityPanel({ eligibility }: { eligibility: ExamEligibilityViewModel }) {
  return (
    <section aria-labelledby="exam-eligibility-title" className="rounded-xl border border-[color:var(--border-gold)] bg-white p-6">
      <h2 id="exam-eligibility-title" className="text-lg font-bold text-[color:var(--color-navy)]">{examT("exam.eligibility.title")}</h2>
      <p className="mt-2 text-sm text-[color:var(--color-body)]" role="status">{examT(`exam.eligibility.${eligibility.status}`)}</p>
      {!eligibility.canStart && eligibility.reasonKeys.length > 0 && (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[#5a6a82]">
          {eligibility.reasonKeys.map((k, i) => <li key={i}>{examT(k)}</li>)}
        </ul>
      )}
    </section>
  );
}
