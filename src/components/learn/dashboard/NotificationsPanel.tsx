import type { NotificationViewModel } from "@/lib/runtime/ui/view-models";
import { EmptyState } from "@/components/learn/EmptyState";

/** Notifications in-app dérivées (Sprint J). Aucun email ni notification externe. */
export function NotificationsPanel({ items }: { items: NotificationViewModel[] }) {
  return (
    <section aria-labelledby="notif-title" className="rounded-xl border border-[color:var(--border-gold)] bg-white p-5">
      <h2 id="notif-title" className="text-sm font-semibold text-[color:var(--color-navy)]">Notifications</h2>
      {items.length === 0 ? (
        <div className="mt-3"><EmptyState title="Aucune notification" /></div>
      ) : (
        <ul className="mt-3 space-y-2">
          {items.map((n) => (
            <li key={n.id} className="flex items-center gap-2 text-sm">
              <span aria-hidden="true" className={`h-2 w-2 rounded-full ${n.read ? "bg-[color:var(--color-muted)]" : "bg-[color:var(--color-gold)]"}`} />
              <span className={n.read ? "text-[color:var(--color-muted)]" : "text-[color:var(--color-body)]"}>{n.labelKey}</span>
              {!n.read && <span className="sr-only">(non lue)</span>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
