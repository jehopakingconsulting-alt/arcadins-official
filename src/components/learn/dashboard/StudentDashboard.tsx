import type { StudentDashboardViewModel } from "@/lib/runtime/ui/view-models";
import { ProgressOverview } from "./ProgressOverview";
import { CurrentModuleCard } from "./CurrentModuleCard";
import { NextLessonCard } from "./NextLessonCard";
import { RecentActivity } from "./RecentActivity";
import { StudentStatistics } from "./StudentStatistics";
import { LearningCalendar } from "./LearningCalendar";
import { RecommendationsPanel } from "./RecommendationsPanel";
import { NotificationsPanel } from "./NotificationsPanel";
import { EmptyState } from "@/components/learn/EmptyState";
import type { CalendarViewModel } from "@/lib/runtime/ui/view-models";

/**
 * Tableau de bord étudiant (Sprint J). Compose des cartes read-only à partir du view model.
 * Aucun calcul officiel (score/progression/déblocage) : tout provient du modèle.
 */
export function StudentDashboard({ model, calendar, onResume }: { model: StudentDashboardViewModel; calendar: CalendarViewModel; onResume?: () => void }) {
  if (model.enrollmentStatus === "none") return <EmptyState title="Aucune formation active" hint="Inscrivez-vous à une formation pour commencer." />;

  const expired = model.enrollmentStatus === "expired";
  const suspended = model.enrollmentStatus === "suspended";

  return (
    <div className="space-y-6">
      <header className="rounded-xl border border-[color:var(--border-gold)] bg-[color:var(--color-off-white)] p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#6f5714]">{model.program?.programTitle ?? "Formation"}</p>
        <h1 className="mt-1 text-xl font-bold text-[color:var(--color-navy)]">Bonjour, {model.identity.displayName}</h1>
        {expired && <p role="alert" className="mt-2 rounded bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">Votre accès a expiré.</p>}
        {suspended && <p role="alert" className="mt-2 rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-800">Votre inscription est suspendue.</p>}
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ProgressOverview overallPercent={model.overallPercent} weeklyPercent={model.weeklyPercent} />
          <div className="grid gap-6 sm:grid-cols-2">
            <CurrentModuleCard title={model.currentModuleTitle} />
            <NextLessonCard title={model.nextLessonTitle} onResume={onResume} />
          </div>
          <StudentStatistics studyMinutes={model.totalStudyMinutes} averageScorePercent={model.averageScorePercent} competencies={model.competencies} />
          <LearningCalendar model={calendar} />
          <RecentActivity items={model.recentActivity} />
        </div>
        <div className="space-y-6">
          <RecommendationsPanel items={model.recommendations} />
          <NotificationsPanel items={model.notifications} />
        </div>
      </div>
    </div>
  );
}
