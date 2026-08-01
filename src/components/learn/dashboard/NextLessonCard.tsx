"use client";
/** Carte « prochaine leçon » + bouton reprendre (Sprint J). Aucune écriture réelle en preview. */
export function NextLessonCard({ title, onResume }: { title: string | null; onResume?: () => void }) {
  return (
    <section aria-labelledby="next-lesson-title" className="rounded-xl border border-[color:var(--border-gold)] bg-[color:var(--color-navy)] p-5 text-[color:var(--color-off-white)]">
      <h2 id="next-lesson-title" className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-gold-light)]">Prochaine leçon</h2>
      <p className="mt-2 text-lg font-semibold">{title ?? "À déterminer"}</p>
      <button
        type="button"
        onClick={onResume}
        disabled={!title}
        className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-[color:var(--color-gold)] px-4 py-2 text-sm font-semibold text-[color:var(--color-navy)] disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-off-white)]"
      >
        Reprendre
      </button>
    </section>
  );
}
