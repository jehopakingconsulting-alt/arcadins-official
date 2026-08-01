import type { LessonPlayerViewModel } from "@/lib/runtime/ui/view-models";

/** En-tête de leçon (titre, module, semaine, durée, objectifs) (Sprint J). */
export function LessonHeader({ model }: { model: LessonPlayerViewModel }) {
  return (
    <header className="border-b border-[color:var(--border-gold)] pb-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#6f5714]">{model.moduleTitleKey}{model.week ? ` · Semaine ${model.week}` : ""}</p>
      <h1 className="mt-1 text-2xl font-bold text-[color:var(--color-navy)]">{model.titleKey}</h1>
      <p className="mt-1 text-sm text-[#5a6a82]">Durée estimée : {model.estimatedMinutes} min</p>
      {model.objectives.length > 0 && (
        <div className="mt-3">
          <h2 className="text-xs font-semibold uppercase text-[#5a6a82]">Objectifs</h2>
          <ul className="mt-1 list-disc pl-5 text-sm text-[color:var(--color-body)]">
            {model.objectives.map((o, i) => <li key={i}>{o}</li>)}
          </ul>
        </div>
      )}
    </header>
  );
}
