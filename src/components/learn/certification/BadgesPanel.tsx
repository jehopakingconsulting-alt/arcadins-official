import type { BadgeViewModel } from "@/lib/runtime/ui/view-models";
import { EmptyState } from "@/components/learn/EmptyState";

/** Panneau de badges (obtenus / verrouillés) (Sprint J). Aucun badge émis côté client. */
export function BadgesPanel({ badges }: { badges: BadgeViewModel[] }) {
  return (
    <section aria-labelledby="badges-title" className="rounded-xl border border-[color:var(--border-gold)] bg-white p-5">
      <h2 id="badges-title" className="text-sm font-semibold text-[color:var(--color-navy)]">Badges</h2>
      {badges.length === 0 ? (
        <div className="mt-3"><EmptyState title="Aucun badge" /></div>
      ) : (
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {badges.map((b) => (
            <li key={b.badgeDefinitionId} className={`rounded-lg border p-3 ${b.obtained ? "border-[color:var(--color-gold)] bg-[color:var(--color-gold-pale)]/30" : "border-dashed border-[color:var(--border-gold)] bg-[color:var(--color-off-white)]"}`}>
              <div className="flex items-center gap-2">
                <span aria-hidden="true">{b.obtained ? "🏅" : "🔒"}</span>
                <p className="font-semibold text-[color:var(--color-navy)]">{b.titleKey}</p>
              </div>
              <p className="mt-1 text-xs text-[#5a6a82]">{b.descriptionKey}</p>
              <p className="mt-1 text-xs text-[#5a6a82]">Critère : {b.criteriaKey}</p>
              {b.obtained ? (
                <p className="mt-1 text-xs text-green-700">Obtenu{b.obtainedAt ? ` le ${b.obtainedAt.slice(0, 10)}` : ""}</p>
              ) : (
                <div role="progressbar" aria-label={`Progression du badge : ${b.progressPercent}%`} aria-valuenow={b.progressPercent} aria-valuemin={0} aria-valuemax={100} className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[color:var(--color-navy-light)]/15">
                  <div className="h-full rounded-full bg-[color:var(--color-gold)]" style={{ width: `${b.progressPercent}%` }} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
