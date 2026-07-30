import type { CompetencyViewModel } from "@/lib/runtime/ui/view-models";

const LEVEL_LABEL: Record<CompetencyViewModel["level"], string> = {
  insufficient: "Insuffisant",
  fragile: "Fragile",
  strong: "Solide",
};

/** Progression par compétence (Sprint J). */
export function CompetencyProgress({ competencies }: { competencies: CompetencyViewModel[] }) {
  return (
    <section aria-labelledby="competency-title" className="rounded-xl border border-[color:var(--border-gold)] bg-white p-5">
      <h2 id="competency-title" className="text-sm font-semibold text-[color:var(--color-navy)]">Compétences</h2>
      <ul className="mt-3 space-y-3">
        {competencies.map((c) => (
          <li key={c.code}>
            <div className="flex justify-between text-xs text-[color:var(--color-muted)]"><span>{c.labelKey}</span><span>{LEVEL_LABEL[c.level]} · {c.percent}%</span></div>
            <div role="progressbar" aria-label={`${c.labelKey} : ${c.percent}%`} aria-valuenow={c.percent} aria-valuemin={0} aria-valuemax={100} className="mt-1 h-2 w-full overflow-hidden rounded-full bg-[color:var(--color-navy-light)]/15">
              <div className="h-full rounded-full bg-[color:var(--color-gold)]" style={{ width: `${c.percent}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
