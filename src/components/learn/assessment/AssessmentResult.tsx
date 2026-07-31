import type { AssessmentResultViewModel } from "@/lib/runtime/ui/view-models";
import { quizT } from "@/lib/runtime/ui/assessment/quiz-i18n";

/**
 * Résultat de quiz (Sprint J, enrichi K3A). Affiche le score PUBLIC (corrigé serveur) et une rétroaction
 * PUBLIQUE traduite par clé i18n (repli français). Aucune bonne réponse, aucune explication privée.
 */
export function AssessmentResult({ model }: { model: AssessmentResultViewModel }) {
  const hasCounts = typeof model.correctCount === "number" && typeof model.totalQuestions === "number";
  return (
    <section aria-labelledby="result-title" className="mx-auto max-w-xl rounded-xl border border-[color:var(--border-gold)] bg-white p-6 text-center">
      <h1 id="result-title" className="text-xl font-bold text-[color:var(--color-navy)]">{quizT("quiz.result_title")}</h1>
      <p className={`mt-3 text-4xl font-bold ${model.passed ? "text-green-700" : "text-amber-700"}`}>{model.scorePercent}%</p>
      <p className="mt-1 text-sm font-medium" role="status" aria-live="polite">{model.passed ? quizT("quiz.passed") : quizT("quiz.failed")}</p>

      {hasCounts && (
        <p className="mt-2 text-sm text-[color:var(--color-body)]">
          {quizT("quiz.correct_count")} : {model.correctCount} / {model.totalQuestions}
        </p>
      )}

      {model.feedbackKeys.length > 0 && (
        <ul className="mt-4 space-y-1 text-left text-sm text-[color:var(--color-body)]">
          {model.feedbackKeys.map((f, i) => <li key={i}>• {quizT(f)}</li>)}
        </ul>
      )}

      <div className="mt-4 grid gap-4 text-left sm:grid-cols-2">
        <div>
          <h2 className="text-xs font-semibold uppercase text-[#5a6a82]">{quizT("quiz.strengths")}</h2>
          <ul className="mt-1 text-sm text-[color:var(--color-body)]">{model.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase text-[#5a6a82]">{quizT("quiz.to_review")}</h2>
          <ul className="mt-1 text-sm text-[color:var(--color-body)]">{model.toReview.map((s, i) => <li key={i}>{s}</li>)}</ul>
        </div>
      </div>

      {model.competencies && model.competencies.length > 0 && (
        <div className="mt-4 text-left">
          <h2 className="text-xs font-semibold uppercase text-[#5a6a82]">{quizT("quiz.competencies")}</h2>
          <ul className="mt-1 flex flex-wrap gap-2">
            {model.competencies.map((c, i) => (
              <li key={i} className="rounded-full border border-[color:var(--border-gold)] px-2 py-0.5 text-xs text-[color:var(--color-body)]">{c}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
