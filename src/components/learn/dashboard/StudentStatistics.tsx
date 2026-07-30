import type { CompetencyViewModel } from "@/lib/runtime/ui/view-models";

/** Statistiques étudiantes (temps, score moyen autorisé, compétences) (Sprint J). Aucun calcul officiel ici. */
export function StudentStatistics({ studyMinutes, averageScorePercent, competencies }: { studyMinutes: number; averageScorePercent: number | null; competencies: CompetencyViewModel[] }) {
  const hours = Math.floor(studyMinutes / 60);
  const mins = studyMinutes % 60;
  return (
    <section aria-labelledby="stats-title" className="rounded-xl border border-[color:var(--border-gold)] bg-white p-5">
      <h2 id="stats-title" className="text-sm font-semibold text-[color:var(--color-navy)]">Statistiques</h2>
      <dl className="mt-3 grid grid-cols-2 gap-4">
        <div>
          <dt className="text-xs text-[color:var(--color-muted)]">Temps d&apos;étude</dt>
          <dd className="text-lg font-semibold text-[color:var(--color-navy)]">{hours}h {mins}min</dd>
        </div>
        <div>
          <dt className="text-xs text-[color:var(--color-muted)]">Score moyen</dt>
          <dd className="text-lg font-semibold text-[color:var(--color-navy)]">{averageScorePercent != null ? `${averageScorePercent}%` : "—"}</dd>
        </div>
      </dl>
      {competencies.length > 0 && (
        <ul className="mt-4 space-y-2">
          {competencies.map((c) => (
            <li key={c.code} className="text-sm">
              <div className="flex justify-between text-xs text-[color:var(--color-muted)]"><span>{c.labelKey}</span><span>{c.percent}%</span></div>
              <div role="progressbar" aria-label={`${c.labelKey} : ${c.percent}%`} aria-valuenow={c.percent} aria-valuemin={0} aria-valuemax={100} className="mt-1 h-2 w-full overflow-hidden rounded-full bg-[color:var(--color-navy-light)]/15">
                <div className="h-full rounded-full bg-[color:var(--color-gold)]" style={{ width: `${c.percent}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
