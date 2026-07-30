import type { ProgressViewModel } from "@/lib/runtime/ui/view-models";

/** Progression par module (Sprint J). Valeurs fournies par le view model (aucun calcul officiel). */
export function ModuleProgress({ modules }: { modules: ProgressViewModel["modules"] }) {
  return (
    <section aria-labelledby="module-progress-title" className="rounded-xl border border-[color:var(--border-gold)] bg-white p-5">
      <h2 id="module-progress-title" className="text-sm font-semibold text-[color:var(--color-navy)]">Progression par module</h2>
      <ul className="mt-3 space-y-2">
        {modules.map((m) => (
          <li key={m.moduleId}>
            <div className="flex justify-between text-xs text-[color:var(--color-muted)]"><span>{m.titleKey}</span><span>{m.percent}%{m.completed ? " ✓" : ""}</span></div>
            <div role="progressbar" aria-label={`${m.titleKey} : ${m.percent}%`} aria-valuenow={m.percent} aria-valuemin={0} aria-valuemax={100} className="mt-1 h-2 w-full overflow-hidden rounded-full bg-[color:var(--color-navy-light)]/15">
              <div className="h-full rounded-full bg-[color:var(--color-gold)]" style={{ width: `${m.percent}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
