import type { JourneyViewModel } from "@/lib/runtime/ui/view-models";
import { ModuleJourneyCard } from "./ModuleJourneyCard";

/**
 * Parcours d'apprentissage complet (24 semaines) (Sprint J). Le verrouillage/statut provient du moteur,
 * jamais du composant.
 */
export function LearningJourney({ model, onOpenLesson }: { model: JourneyViewModel; onOpenLesson?: (id: string) => void }) {
  return (
    <section aria-labelledby="journey-title" className="space-y-4">
      <div>
        <h1 id="journey-title" className="text-xl font-bold text-[color:var(--color-navy)]">Parcours — {model.program.programTitle}</h1>
        <p className="mt-1 text-sm text-[color:var(--color-muted)]">{model.program.totalModules} modules · {model.program.totalWeeks} semaines</p>
      </div>
      <div className="space-y-3">
        {model.modules.map((m) => (
          <ModuleJourneyCard key={m.moduleId} module={m} defaultOpen={m.status === "in_progress"} onOpenLesson={onOpenLesson} />
        ))}
      </div>
    </section>
  );
}
