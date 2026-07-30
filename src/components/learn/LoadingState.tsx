/** État de chargement + squelette accessible (Sprint J). */
export function LoadingState({ label = "Chargement…", rows = 3 }: { label?: string; rows?: number }) {
  return (
    <div role="status" aria-busy="true" aria-live="polite" className="space-y-3">
      <span className="sr-only">{label}</span>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-16 w-full animate-pulse rounded-xl bg-[color:var(--color-navy-light)]/10" />
      ))}
    </div>
  );
}
