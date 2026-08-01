"use client";
import type { LessonPlayerViewModel } from "@/lib/runtime/ui/view-models";

/**
 * Contrôles de leçon (Sprint J). « Marquer terminé » n'est ACTIVÉ que si le serveur l'autorise
 * (`canMarkComplete`) : le composant ne décide jamais de la réussite.
 */
export function LessonControls({ model, onPrev, onNext, onRequestValidation, onComplete }: {
  model: LessonPlayerViewModel;
  onPrev?: () => void;
  onNext?: () => void;
  onRequestValidation?: () => void;
  onComplete?: () => void;
}) {
  const btn = "inline-flex min-h-11 items-center rounded-lg px-4 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)] disabled:opacity-50";
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--border-gold)] pt-4">
      <div className="flex gap-2">
        <button type="button" onClick={onPrev} disabled={!model.previousLessonId} className={`${btn} border border-[color:var(--border-gold)] text-[color:var(--color-navy)]`}>← Précédent</button>
        <button type="button" onClick={onNext} disabled={!model.nextLessonId} className={`${btn} border border-[color:var(--border-gold)] text-[color:var(--color-navy)]`}>Suivant →</button>
      </div>
      <div className="flex gap-2">
        {model.canRequestValidation && (
          <button type="button" onClick={onRequestValidation} className={`${btn} bg-[color:var(--color-navy)] text-[color:var(--color-off-white)]`}>Demander la validation</button>
        )}
        <button
          type="button"
          onClick={onComplete}
          disabled={!model.canMarkComplete}
          aria-describedby={!model.canMarkComplete ? "complete-hint" : undefined}
          className={`${btn} bg-[color:var(--color-gold)] text-[color:var(--color-navy)]`}
        >
          Marquer comme terminé
        </button>
        {!model.canMarkComplete && <span id="complete-hint" className="sr-only">La complétion sera autorisée par le serveur une fois les critères remplis.</span>}
      </div>
    </div>
  );
}
