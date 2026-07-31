import type { AssessmentResultViewModel } from "@/lib/runtime/ui/view-models";

/**
 * Résultat de quiz (Sprint J). Affiche le score PUBLIC (corrigé serveur) et une rétroaction PUBLIQUE.
 * Aucune bonne réponse, aucune explication privée.
 */
export function AssessmentResult({ model }: { model: AssessmentResultViewModel }) {
  return (
    <section aria-labelledby="result-title" className="mx-auto max-w-xl rounded-xl border border-[color:var(--border-gold)] bg-white p-6 text-center">
      <h1 id="result-title" className="text-xl font-bold text-[color:var(--color-navy)]">Résultat</h1>
      <p className={`mt-3 text-4xl font-bold ${model.passed ? "text-green-700" : "text-amber-700"}`}>{model.scorePercent}%</p>
      <p className="mt-1 text-sm font-medium" aria-live="polite">{model.passed ? "Réussi" : "À retravailler"}</p>

      {model.feedbackKeys.length > 0 && (
        <ul className="mt-4 space-y-1 text-left text-sm text-[color:var(--color-body)]">
          {model.feedbackKeys.map((f, i) => <li key={i}>• {f}</li>)}
        </ul>
      )}
      <div className="mt-4 grid gap-4 text-left sm:grid-cols-2">
        <div>
          <h2 className="text-xs font-semibold uppercase text-[#5a6a82]">Points forts</h2>
          <ul className="mt-1 text-sm text-[color:var(--color-body)]">{model.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase text-[#5a6a82]">À revoir</h2>
          <ul className="mt-1 text-sm text-[color:var(--color-body)]">{model.toReview.map((s, i) => <li key={i}>{s}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}
