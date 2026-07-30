import type { BookmarkViewModel } from "@/lib/runtime/ui/view-models";
import { EmptyState } from "@/components/learn/EmptyState";

/** Panneau de favoris (Sprint J). Navigation vers la ressource ; suppression simulée en preview. */
export function BookmarksPanel({ bookmarks, onOpen }: { bookmarks: BookmarkViewModel[]; onOpen?: (lessonId: string) => void }) {
  return (
    <section aria-labelledby="bookmarks-title">
      <h2 id="bookmarks-title" className="text-sm font-semibold text-[color:var(--color-navy)]">Favoris</h2>
      {bookmarks.length === 0 ? (
        <div className="mt-2"><EmptyState title="Aucun favori" /></div>
      ) : (
        <ul className="mt-2 space-y-2">
          {bookmarks.map((b) => (
            <li key={b.id}>
              <button type="button" onClick={() => onOpen?.(b.lessonId)} className="flex w-full items-center gap-2 rounded-lg border border-[color:var(--border-gold)] px-3 py-2 text-left text-sm text-[color:var(--color-body)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)]">
                <span aria-hidden="true">★</span>
                <span>{b.lessonTitleKey}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
