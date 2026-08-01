/** État « fonctionnalité désactivée » (Sprint J). Affiché quand un provider renvoie `feature_disabled`. */
export function FeatureDisabledState({ label = "Cette section n'est pas encore disponible." }: { label?: string }) {
  return (
    <div role="status" className="mx-auto max-w-md rounded-xl border border-[color:var(--border-gold)] bg-[color:var(--color-off-white)] p-8 text-center">
      <p className="text-sm font-medium text-[color:var(--color-body)]">{label}</p>
    </div>
  );
}
