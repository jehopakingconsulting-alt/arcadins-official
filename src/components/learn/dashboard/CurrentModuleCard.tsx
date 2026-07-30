/** Carte « module en cours » (Sprint J). */
export function CurrentModuleCard({ title }: { title: string | null }) {
  return (
    <section aria-labelledby="current-module-title" className="rounded-xl border border-[color:var(--border-gold)] bg-white p-5">
      <h2 id="current-module-title" className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-muted)]">Module en cours</h2>
      <p className="mt-2 text-lg font-semibold text-[color:var(--color-navy)]">{title ?? "Aucun module en cours"}</p>
    </section>
  );
}
