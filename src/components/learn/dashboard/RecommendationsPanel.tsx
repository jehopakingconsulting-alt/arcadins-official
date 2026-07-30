import type { RecommendationViewModel } from "@/lib/runtime/ui/view-models";
import { EmptyState } from "@/components/learn/EmptyState";

/** Recommandations EXPLICABLES (Sprint J). Chaque item affiche sa raison. Aucun LLM. */
export function RecommendationsPanel({ items }: { items: RecommendationViewModel[] }) {
  return (
    <section aria-labelledby="reco-title" className="rounded-xl border border-[color:var(--border-gold)] bg-white p-5">
      <h2 id="reco-title" className="text-sm font-semibold text-[color:var(--color-navy)]">Recommandations</h2>
      {items.length === 0 ? (
        <div className="mt-3"><EmptyState title="Aucune recommandation" /></div>
      ) : (
        <ul className="mt-3 space-y-3">
          {items.map((r) => (
            <li key={r.id} className="rounded-lg border border-[color:var(--border-gold)] p-3">
              <p className="text-sm font-medium text-[color:var(--color-navy)]">{r.labelKey}</p>
              <p className="mt-1 text-xs text-[color:var(--color-muted)]">Pourquoi : {r.reasonKey}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
