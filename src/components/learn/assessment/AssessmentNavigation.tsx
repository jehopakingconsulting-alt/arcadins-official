"use client";
/** Navigation entre questions + barre de progression (Sprint J). */
export function AssessmentNavigation({ index, total, answered, onPrev, onNext, onSubmit, canSubmit }: {
  index: number; total: number; answered: number; onPrev?: () => void; onNext?: () => void; onSubmit?: () => void; canSubmit: boolean;
}) {
  const percent = total > 0 ? Math.round((answered / total) * 100) : 0;
  const btn = "inline-flex min-h-11 items-center rounded-lg px-4 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)] disabled:opacity-50";
  return (
    <div className="space-y-3">
      <div role="progressbar" aria-label={`Réponses : ${answered} sur ${total}`} aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} className="h-2 w-full overflow-hidden rounded-full bg-[color:var(--color-navy-light)]/15">
        <div className="h-full rounded-full bg-[color:var(--color-gold)]" style={{ width: `${percent}%` }} />
      </div>
      <div className="flex items-center justify-between">
        <button type="button" onClick={onPrev} disabled={index === 0} className={`${btn} border border-[color:var(--border-gold)] text-[color:var(--color-navy)]`}>← Précédent</button>
        <span className="text-xs text-[#5a6a82]" aria-live="polite">Question {index + 1} / {total}</span>
        {index < total - 1 ? (
          <button type="button" onClick={onNext} className={`${btn} bg-[color:var(--color-navy)] text-[color:var(--color-off-white)]`}>Suivant →</button>
        ) : (
          <button type="button" onClick={onSubmit} disabled={!canSubmit} className={`${btn} bg-[color:var(--color-gold)] text-[color:var(--color-navy)]`}>Soumettre</button>
        )}
      </div>
    </div>
  );
}
