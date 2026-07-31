"use client";
import { useState } from "react";
import type { StudentPreviewBundle } from "@/lib/runtime/ui/view-models";
import { DEMO_DATA_LABEL } from "@/lib/runtime/ui/config";
import { StudentDashboard } from "./dashboard/StudentDashboard";
import { LearningJourney } from "./journey/LearningJourney";
import { LessonPlayer } from "./player/LessonPlayer";
import { AssessmentPlayer } from "./assessment/AssessmentPlayer";
import { ProgressDashboard } from "./progress/ProgressDashboard";
import { CredentialsPanel } from "./certification/CredentialsPanel";

export type { StudentPreviewBundle };

type View = "dashboard" | "journey" | "lesson" | "assessment" | "progress" | "certificates";
const NAV: { id: View; label: string }[] = [
  { id: "dashboard", label: "Tableau de bord" },
  { id: "journey", label: "Parcours" },
  { id: "lesson", label: "Leçon" },
  { id: "assessment", label: "Quiz" },
  { id: "progress", label: "Progression" },
  { id: "certificates", label: "Attestations" },
];

/**
 * Coquille de l'expérience étudiante (Sprint J). Barre supérieure, navigation desktop/mobile, identité fictive,
 * bouton reprendre, changement de vue. Données ENTIÈREMENT de démonstration. Aucune écriture réelle.
 */
export function StudentLearningShell({ bundle }: { bundle: StudentPreviewBundle }) {
  const [view, setView] = useState<View>("dashboard");

  return (
    <div id="student-experience" className="relative z-[1000] min-h-screen bg-[color:var(--color-off-white)] text-[color:var(--color-body)]">
      <a href="#learn-main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[1001] focus:rounded focus:bg-[color:var(--color-navy)] focus:px-3 focus:py-2 focus:text-[color:var(--color-off-white)]">
        Aller au contenu principal
      </a>

      <header className="border-b border-[color:var(--border-gold)] bg-[color:var(--color-navy)] text-[color:var(--color-off-white)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
          <span className="text-lg font-bold tracking-wide text-[color:var(--color-gold)]">ARCADINS</span>
          <span className="hidden text-sm text-[color:var(--color-gold-light)] sm:inline">{bundle.dashboard.program?.programTitle}</span>
          <span className="rounded bg-[color:var(--color-gold)]/20 px-2 py-0.5 text-xs font-semibold text-[color:var(--color-gold-light)]">{DEMO_DATA_LABEL}</span>
          <div className="ml-auto flex items-center gap-3">
            <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--color-gold)] text-sm font-bold text-[color:var(--color-navy)]">{bundle.dashboard.identity.initials}</span>
            <span className="hidden text-sm sm:inline">{bundle.dashboard.identity.displayName}</span>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 lg:flex-row">
        <nav aria-label="Navigation de l'apprentissage" className="lg:w-56 lg:flex-shrink-0">
          <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
            {NAV.map((n) => (
              <li key={n.id} className="flex-shrink-0">
                <button
                  type="button"
                  aria-current={view === n.id ? "page" : undefined}
                  onClick={() => setView(n.id)}
                  className={`min-h-11 w-full whitespace-nowrap rounded-lg px-4 py-2 text-left text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)] ${view === n.id ? "bg-[color:var(--color-navy)] text-[color:var(--color-off-white)]" : "bg-white text-[color:var(--color-navy)] border border-[color:var(--border-gold)]"}`}
                >
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <main id="learn-main" className="min-w-0 flex-1">
          {view === "dashboard" && <StudentDashboard model={bundle.dashboard} calendar={bundle.calendar} onResume={() => setView("lesson")} />}
          {view === "journey" && <LearningJourney model={bundle.journey} onOpenLesson={() => setView("lesson")} />}
          {view === "lesson" && <LessonPlayer model={bundle.lesson} notes={bundle.notes} bookmarks={bundle.bookmarks} onNavigate={() => setView("lesson")} />}
          {view === "assessment" && <AssessmentPlayer model={bundle.assessment} demoResult={bundle.assessmentResult} />}
          {view === "progress" && <ProgressDashboard model={bundle.progress} />}
          {view === "certificates" && <CredentialsPanel credentials={bundle.credentials} badges={bundle.badges} />}
        </main>
      </div>
    </div>
  );
}
