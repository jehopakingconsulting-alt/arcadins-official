/** État vide (aucune donnée) (Sprint J). */
export function EmptyState({ title = "Rien à afficher pour l'instant", hint }: { title?: string; hint?: string }) {
  return (
    <div className="mx-auto max-w-md rounded-xl border border-[color:var(--border-gold)] bg-[color:var(--color-off-white)] p-8 text-center">
      <p className="text-sm font-semibold text-[color:var(--color-body)]">{title}</p>
      {hint && <p className="mt-1 text-xs text-[#5a6a82]">{hint}</p>}
    </div>
  );
}
