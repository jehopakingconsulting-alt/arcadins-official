import type { LessonJourneyItemViewModel } from "@/lib/runtime/ui/view-models";
import { LockedReason } from "./LockedReason";

const STATUS_STYLE: Record<string, { icon: string; label: string }> = {
  not_started: { icon: "○", label: "Non commencé" },
  available: { icon: "◐", label: "Disponible" },
  in_progress: { icon: "◑", label: "En cours" },
  completed: { icon: "✓", label: "Terminé" },
  locked: { icon: "🔒", label: "Verrouillé" },
  needs_review: { icon: "↻", label: "À réviser" },
  submitted: { icon: "▶", label: "Soumis" },
  grading: { icon: "…", label: "En correction" },
  passed: { icon: "★", label: "Réussi" },
  failed: { icon: "✗", label: "Échoué" },
  expired: { icon: "⌛", label: "Expiré" },
};

/** Élément « leçon » du parcours (Sprint J). Le statut/verrouillage provient du view model. */
export function LessonJourneyItem({ lesson, onOpen }: { lesson: LessonJourneyItemViewModel; onOpen?: (id: string) => void }) {
  const s = STATUS_STYLE[lesson.status] ?? STATUS_STYLE.not_started;
  const locked = lesson.status === "locked";
  return (
    <li>
      <button
        type="button"
        disabled={locked}
        onClick={() => onOpen?.(lesson.lessonId)}
        aria-label={`${lesson.titleKey} — ${s.label}`}
        className="flex w-full items-center justify-between gap-3 rounded-lg border border-[color:var(--border-gold)] bg-white px-3 py-2 text-left text-sm disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)]"
      >
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="text-[color:var(--color-gold)]">{s.icon}</span>
          <span className="text-[color:var(--color-body)]">{lesson.titleKey}</span>
        </span>
        <span className="text-xs text-[color:var(--color-muted)]">{s.label}</span>
      </button>
      {locked && <div className="mt-1"><LockedReason reasonCode={lesson.lockedReasonCode} /></div>}
    </li>
  );
}
