"use client";
import { useState } from "react";
import type { ModuleViewModel } from "@/lib/runtime/ui/view-models";
import { WeekJourney } from "./WeekJourney";

/** Carte « module » du parcours, dépliable (Sprint J). */
export function ModuleJourneyCard({ module, defaultOpen = false, onOpenLesson }: { module: ModuleViewModel; defaultOpen?: boolean; onOpenLesson?: (id: string) => void }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `module-panel-${module.moduleId}`;
  return (
    <section className="rounded-xl border border-[color:var(--border-gold)] bg-[color:var(--color-off-white)]">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)]"
        >
          <span className="font-semibold text-[color:var(--color-navy)]">Module {module.index} — {module.titleKey}</span>
          <span className="flex items-center gap-2 text-xs text-[color:var(--color-muted)]">
            <span>{module.percent}%</span>
            <span aria-hidden="true">{open ? "▲" : "▼"}</span>
          </span>
        </button>
      </h3>
      {open && (
        <div id={panelId} className="space-y-4 border-t border-[color:var(--border-gold)] p-4">
          {module.weeks.map((w) => <WeekJourney key={w.week} week={w} onOpenLesson={onOpenLesson} />)}
        </div>
      )}
    </section>
  );
}
