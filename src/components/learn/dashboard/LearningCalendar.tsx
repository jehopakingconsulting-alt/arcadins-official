"use client";
import { useState } from "react";
import type { CalendarViewModel } from "@/lib/runtime/ui/view-models";

/** Calendrier d'apprentissage (vue semaine/mois) (Sprint J). Aucune intégration Google Calendar. */
export function LearningCalendar({ model }: { model: CalendarViewModel }) {
  const [view, setView] = useState<"week" | "month">("week");
  const now = "2026-12-01";
  const events = view === "week" ? model.events.filter((e) => e.at.slice(0, 7) === now.slice(0, 7)) : model.events;
  return (
    <section aria-labelledby="calendar-title" className="rounded-xl border border-[color:var(--border-gold)] bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 id="calendar-title" className="text-sm font-semibold text-[color:var(--color-navy)]">Calendrier</h2>
        <div role="group" aria-label="Vue du calendrier" className="flex gap-1">
          {(["week", "month"] as const).map((v) => (
            <button key={v} type="button" onClick={() => setView(v)} aria-pressed={view === v}
              className={`min-h-9 rounded px-3 py-1 text-xs font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)] ${view === v ? "bg-[color:var(--color-navy)] text-[color:var(--color-off-white)]" : "text-[#5a6a82]"}`}>
              {v === "week" ? "Semaine" : "Mois"}
            </button>
          ))}
        </div>
      </div>
      <ul className="mt-3 space-y-2">
        {events.map((e) => (
          <li key={e.id} className="flex items-center justify-between rounded-lg border border-[color:var(--border-gold)] px-3 py-2 text-sm">
            <span className="text-[color:var(--color-body)]">{e.labelKey}</span>
            <time dateTime={e.at} className="text-xs text-[#5a6a82]">{e.at.slice(0, 10)}</time>
          </li>
        ))}
      </ul>
    </section>
  );
}
