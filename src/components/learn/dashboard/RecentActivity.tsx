import type { ActivityViewModel } from "@/lib/runtime/ui/view-models";
import { EmptyState } from "@/components/learn/EmptyState";

/** Historique récent (Sprint J). */
export function RecentActivity({ items }: { items: ActivityViewModel[] }) {
  return (
    <section aria-labelledby="recent-activity-title" className="rounded-xl border border-[color:var(--border-gold)] bg-white p-5">
      <h2 id="recent-activity-title" className="text-sm font-semibold text-[color:var(--color-navy)]">Activité récente</h2>
      {items.length === 0 ? (
        <div className="mt-3"><EmptyState title="Aucune activité récente" /></div>
      ) : (
        <ul className="mt-3 space-y-2">
          {items.map((a) => (
            <li key={a.id} className="flex items-center justify-between text-sm">
              <span className="text-[color:var(--color-body)]">{a.labelKey}</span>
              <time dateTime={a.at} className="text-xs text-[#5a6a82]">{a.at.slice(0, 10)}</time>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
