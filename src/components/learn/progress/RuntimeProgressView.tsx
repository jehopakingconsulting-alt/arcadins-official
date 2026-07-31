"use client";
/**
 * Composant de LECTURE (Sprint K2C) : visualise la progression académique RÉELLE issue du Runtime.
 *
 * CONSOMME uniquement les données déjà produites par `RuntimeProvider` (K2A) et le moteur de navigation (K2B).
 * AUCUNE logique métier : le pourcentage, les états, la leçon courante, le temps et le résumé sont calculés en
 * amont. Read-only : aucune action mutante. Aucun quiz/note/certificat/badge/notification/calendrier ici.
 */
import { useRuntimeContext } from "@/lib/runtime/ui/runtime/RuntimeProvider";
import { useLearningNavigation } from "@/hooks/learn/useLearningNavigation";

function Bar({ label, percent }: { label: string; percent: number }) {
  const p = Math.max(0, Math.min(100, Math.round(percent)));
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-[#5a6a82]"><span>{label}</span><span aria-hidden="true">{p}%</span></div>
      <div role="progressbar" aria-label={`${label} : ${p}%`} aria-valuenow={p} aria-valuemin={0} aria-valuemax={100} className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-[color:var(--color-navy-light)]/15">
        <div className="h-full rounded-full bg-[color:var(--color-gold)]" style={{ width: `${p}%` }} />
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h} h ${m} min` : `${m} min`;
}

export function RuntimeProgressView() {
  const { runtime, derived } = useRuntimeContext();
  const { navigation } = useLearningNavigation();
  const curriculum = runtime.repository.getCurriculum();

  // Glue d'affichage (aucune règle métier) : module de la leçon courante + module suivant.
  const currentModuleIndex =
    derived.lessons.find((l) => l.lessonId === navigation.currentLessonId)?.moduleIndex ??
    derived.modules.find((m) => m.state === "in_progress")?.moduleIndex ??
    curriculum.modules[0]?.index ??
    null;
  const currentModule = curriculum.modules.find((m) => m.index === currentModuleIndex) ?? null;
  const nextModule = currentModuleIndex != null ? curriculum.modules.find((m) => m.index > currentModuleIndex) ?? null : null;

  const p = derived.program;

  return (
    <section aria-labelledby="runtime-progress-title" className="mx-auto max-w-3xl space-y-6 p-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#6f5714]">{curriculum.title}</p>
        <h1 id="runtime-progress-title" className="mt-1 text-xl font-bold text-[color:var(--color-navy)]">Ma progression</h1>
        <p className="mt-1 rounded bg-[color:var(--color-gold)]/15 px-2 py-0.5 text-xs font-medium text-[#6f5714] inline-block">Progression de démonstration</p>
      </div>

      <div className="rounded-xl border border-[color:var(--border-gold)] bg-white p-5 space-y-4">
        <Bar label="Avancement global" percent={p.percent} />
        <Bar label="Cette semaine" percent={p.weeklyPercent} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-[color:var(--border-gold)] bg-white p-5">
          <h2 className="text-xs font-semibold uppercase text-[#5a6a82]">Module actuel</h2>
          <p className="mt-2 text-lg font-semibold text-[color:var(--color-navy)]">{currentModule ? `Module ${currentModule.index} — ${currentModule.title}` : "—"}</p>
          {currentModuleIndex != null && (
            <div className="mt-3"><Bar label="Progression du module" percent={derived.modules.find((m) => m.moduleIndex === currentModuleIndex)?.percent ?? 0} /></div>
          )}
        </div>
        <div className="rounded-xl border border-[color:var(--border-gold)] bg-[color:var(--color-off-white)] p-5">
          <h2 className="text-xs font-semibold uppercase text-[#5a6a82]">Prochain module</h2>
          <p className="mt-2 text-lg font-semibold text-[color:var(--color-navy)]">{nextModule ? `Module ${nextModule.index} — ${nextModule.title}` : "Programme terminé"}</p>
          {nextModule && <p className="mt-1 text-xs text-[#5a6a82]">Débloqué à la validation du module {currentModule?.index ?? nextModule.index - 1}.</p>}
        </div>
      </div>

      <div className="rounded-xl border border-[color:var(--border-gold)] bg-white p-5">
        <h2 className="text-sm font-semibold text-[color:var(--color-navy)]">Résumé pédagogique</h2>
        <dl className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div><dt className="text-xs text-[#5a6a82]">Temps étudié</dt><dd className="text-lg font-semibold text-[color:var(--color-navy)]">{formatTime(p.timeSpentSeconds)}</dd></div>
          <div><dt className="text-xs text-[#5a6a82]">Leçons terminées</dt><dd className="text-lg font-semibold text-[color:var(--color-navy)]">{p.lessonsCompleted} / {p.lessonsTotal}</dd></div>
          <div><dt className="text-xs text-[#5a6a82]">Niveau</dt><dd className="text-lg font-semibold text-[color:var(--color-navy)]">{p.level ?? "—"}</dd></div>
          <div><dt className="text-xs text-[#5a6a82]">Compétences</dt><dd className="text-lg font-semibold text-[color:var(--color-navy)]">{p.competenciesAcquired.length}</dd></div>
        </dl>
      </div>

      <div className="rounded-xl border border-[color:var(--border-gold)] bg-white p-5">
        <h2 className="text-sm font-semibold text-[color:var(--color-navy)]">Progression par module</h2>
        <ul className="mt-3 space-y-2">
          {derived.modules.map((m) => {
            const title = curriculum.modules.find((cm) => cm.index === m.moduleIndex)?.title ?? `Module ${m.moduleIndex}`;
            return (
              <li key={m.moduleIndex}>
                <div className="flex items-center justify-between text-xs text-[#5a6a82]">
                  <span>Module {m.moduleIndex} — {title}</span>
                  <span>{m.unlocked ? `${Math.round(m.percent)}%` : "🔒 Verrouillé"}</span>
                </div>
                <div role="progressbar" aria-label={`Module ${m.moduleIndex} : ${Math.round(m.percent)}%`} aria-valuenow={Math.round(m.percent)} aria-valuemin={0} aria-valuemax={100} className="mt-1 h-2 w-full overflow-hidden rounded-full bg-[color:var(--color-navy-light)]/15">
                  <div className="h-full rounded-full bg-[color:var(--color-gold)]" style={{ width: `${Math.round(m.percent)}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
