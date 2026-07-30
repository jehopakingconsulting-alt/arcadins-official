/** Barre de progression de leçon (Sprint J). */
export function LessonProgress({ percent }: { percent: number }) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div role="progressbar" aria-label={`Progression de la leçon : ${clamped}%`} aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100} className="h-1.5 w-full overflow-hidden rounded-full bg-[color:var(--color-navy-light)]/15">
      <div className="h-full rounded-full bg-[color:var(--color-gold)]" style={{ width: `${clamped}%` }} />
    </div>
  );
}
