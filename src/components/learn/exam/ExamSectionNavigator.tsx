"use client";
import type { ExamSectionViewModel } from "@/lib/runtime/ui/exam/exam-view-models";
import { examT } from "@/lib/runtime/ui/exam/exam-i18n";

/**
 * Navigateur de sections (Sprint K3B). La navigation est validée SERVEUR (politique figée) : ce composant ne
 * fait qu'émettre l'intention ; un refus est affiché sans changer de section.
 */
export function ExamSectionNavigator({
  sections,
  currentSectionId,
  onNavigate,
  navReason,
}: {
  sections: ExamSectionViewModel[];
  currentSectionId: string | null;
  onNavigate: (sectionId: string) => void;
  navReason: string | null;
}) {
  return (
    <nav aria-label="Sections de l'examen" className="space-y-2">
      <ul className="flex flex-wrap gap-2">
        {sections.map((s) => {
          const current = s.id === currentSectionId;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => onNavigate(s.id)}
                aria-current={current ? "step" : undefined}
                disabled={s.locked}
                className={`inline-flex min-h-11 items-center rounded-lg border px-3 py-1.5 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)] disabled:opacity-50 ${current ? "border-[color:var(--color-gold)] bg-[color:var(--color-gold)]/15 text-[color:var(--color-navy)]" : "border-[color:var(--border-gold)] text-[color:var(--color-navy)]"}`}
              >
                {examT("exam.section")} : {examT(s.titleKey)}{s.locked ? " 🔒" : ""}
              </button>
            </li>
          );
        })}
      </ul>
      {navReason && <p role="status" className="text-xs text-amber-700">{examT("exam.navigation_blocked")}</p>}
    </nav>
  );
}
