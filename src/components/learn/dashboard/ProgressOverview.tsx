/** Vue d'ensemble de la progression globale/hebdomadaire (Sprint J). Données fournies par le view model. */
function Bar({ label, percent }: { label: string; percent: number }) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-[#5a6a82]">
        <span>{label}</span>
        <span aria-hidden="true">{clamped}%</span>
      </div>
      <div
        role="progressbar"
        aria-label={`${label} : ${clamped}%`}
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-[color:var(--color-navy-light)]/15"
      >
        <div className="h-full rounded-full bg-[color:var(--color-gold)]" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}

export function ProgressOverview({ overallPercent, weeklyPercent }: { overallPercent: number; weeklyPercent: number }) {
  return (
    <section aria-labelledby="progress-overview-title" className="rounded-xl border border-[color:var(--border-gold)] bg-white p-5">
      <h2 id="progress-overview-title" className="text-sm font-semibold text-[color:var(--color-navy)]">Progression</h2>
      <div className="mt-4 space-y-4">
        <Bar label="Progression globale" percent={overallPercent} />
        <Bar label="Cette semaine" percent={weeklyPercent} />
      </div>
    </section>
  );
}
