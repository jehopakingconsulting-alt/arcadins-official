"use client";
/** État d'erreur récupérable avec action « réessayer » (Sprint J). */
export function ErrorState({ label = "Une erreur est survenue.", onRetry }: { label?: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="mx-auto max-w-md rounded-xl border border-red-300 bg-red-50 p-6 text-center">
      <p className="text-sm font-medium text-red-800">{label}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 inline-flex min-h-11 items-center rounded-lg bg-[color:var(--color-navy)] px-4 py-2 text-sm font-semibold text-[color:var(--color-off-white)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)]"
        >
          Réessayer
        </button>
      )}
    </div>
  );
}
