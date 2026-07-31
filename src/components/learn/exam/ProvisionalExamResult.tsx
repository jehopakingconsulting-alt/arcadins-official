"use client";
import type { ExamProvisionalResultViewModel, ExamReviewStatusViewModel } from "@/lib/runtime/ui/exam/exam-view-models";
import { examT } from "@/lib/runtime/ui/exam/exam-i18n";

/**
 * Reçu de soumission + résultat PROVISOIRE + statut de révision manuelle (Sprint K3B). Affiche uniquement ce
 * que le contrat autorise : jamais de bonne réponse, jamais de note privée. La réussite reste PROVISOIRE.
 */
export function ProvisionalExamResult({
  result,
  review,
  canFinalize,
  onFinalize,
}: {
  result: ExamProvisionalResultViewModel;
  review: ExamReviewStatusViewModel | null;
  canFinalize: boolean;
  onFinalize: () => void;
}) {
  return (
    <section aria-labelledby="exam-provisional-title" className="mx-auto max-w-xl space-y-4 rounded-xl border border-[color:var(--border-gold)] bg-white p-6">
      <div className="text-center">
        <p className="text-sm font-semibold text-green-700" role="status">{examT("exam.receipt.received")}</p>
        <h2 id="exam-provisional-title" className="mt-2 text-lg font-bold text-[color:var(--color-navy)]">{examT("exam.result.provisional_title")}</h2>
        <p className="mt-1 text-4xl font-bold text-[color:var(--color-navy)]">{result.scorePercent}%</p>
        <p className="mt-1 text-sm font-medium" aria-live="polite">
          {result.requiresManualReview ? examT("exam.result.manual_review") : result.passedProvisional ? examT("exam.result.passed_provisional") : examT("exam.result.failed_provisional")}
        </p>
      </div>
      <p className="rounded-lg bg-[color:var(--color-navy)]/5 px-3 py-2 text-center text-xs text-[#5a6a82]">{examT("exam.result.provisional_note")}</p>

      <ul className="space-y-1 text-sm text-[color:var(--color-body)]">
        {result.sectionSummaries.map((s) => (
          <li key={s.sectionId} className="flex justify-between">
            <span>{examT("exam.section")} {s.sectionId}</span>
            <span>{s.percent}% — {s.passed ? examT("exam.result.passed_provisional") : examT("exam.result.failed_provisional")}</span>
          </li>
        ))}
      </ul>

      {review && (
        <p className="text-sm text-[#5a6a82]" role="status">{examT(review.labelKey)}</p>
      )}

      {canFinalize && (
        <button
          type="button"
          onClick={onFinalize}
          className="inline-flex min-h-11 items-center rounded-lg border border-[color:var(--border-gold)] px-4 py-2 text-sm font-semibold text-[color:var(--color-navy)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)]"
        >
          {examT("exam.decision.title")}
        </button>
      )}
    </section>
  );
}
