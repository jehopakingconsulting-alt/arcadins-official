import type { ResourceViewModel } from "@/lib/runtime/ui/view-models";
import { EmptyState } from "@/components/learn/EmptyState";

/** Ressources de la leçon (Sprint J). Placeholders uniquement — aucun vrai téléchargement. */
export function ResourcesPanel({ resources }: { resources: ResourceViewModel[] }) {
  return (
    <section aria-labelledby="resources-title">
      <h2 id="resources-title" className="text-sm font-semibold text-[color:var(--color-navy)]">Ressources</h2>
      {resources.length === 0 ? (
        <div className="mt-2"><EmptyState title="Aucune ressource" /></div>
      ) : (
        <ul className="mt-2 space-y-2">
          {resources.map((r) => (
            <li key={r.id}>
              <button type="button" aria-label={`${r.labelKey} (aperçu de démonstration, aucun téléchargement)`} className="flex w-full items-center gap-2 rounded-lg border border-[color:var(--border-gold)] px-3 py-2 text-left text-sm text-[color:var(--color-body)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)]">
                <span aria-hidden="true">📄</span>
                <span>{r.labelKey}</span>
                <span className="ml-auto text-xs text-[#5a6a82]">{r.kind} · démo</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
