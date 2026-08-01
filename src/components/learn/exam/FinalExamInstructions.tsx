"use client";
import { examT } from "@/lib/runtime/ui/exam/exam-i18n";

/**
 * Instructions + acceptation OBLIGATOIRE des règles + démarrage (Sprint K3B). Le bouton de démarrage reste
 * désactivé tant que l'étudiant n'a pas accepté les règles.
 */
export function FinalExamInstructions({
  acknowledged,
  onAcknowledge,
  onStart,
}: {
  acknowledged: boolean;
  onAcknowledge: (v: boolean) => void;
  onStart: () => void;
}) {
  return (
    <section aria-labelledby="exam-instructions-title" className="rounded-xl border border-[color:var(--border-gold)] bg-white p-6">
      <h2 id="exam-instructions-title" className="text-lg font-bold text-[color:var(--color-navy)]">{examT("exam.instructions.title")}</h2>
      <p className="mt-2 text-sm text-[color:var(--color-body)]">{examT("exam.instructions.body")}</p>
      <label className="mt-4 flex items-start gap-2 text-sm text-[color:var(--color-navy)]">
        <input
          type="checkbox"
          checked={acknowledged}
          onChange={(e) => onAcknowledge(e.target.checked)}
          className="mt-0.5 h-4 w-4"
          aria-describedby="exam-instructions-title"
        />
        <span>{examT("exam.acknowledge")}</span>
      </label>
      <button
        type="button"
        onClick={onStart}
        disabled={!acknowledged}
        className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-[color:var(--color-gold)] px-5 py-2 text-sm font-semibold text-[color:var(--color-navy)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)] disabled:opacity-50"
      >
        {examT("exam.start")}
      </button>
    </section>
  );
}
