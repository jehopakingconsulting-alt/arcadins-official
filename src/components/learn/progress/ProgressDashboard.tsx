import type { ProgressViewModel } from "@/lib/runtime/ui/view-models";
import { ProgressOverview } from "@/components/learn/dashboard/ProgressOverview";
import { ModuleProgress } from "./ModuleProgress";
import { CompetencyProgress } from "./CompetencyProgress";
import { StudyTimeSummary } from "./StudyTimeSummary";
import { RecommendationsPanel } from "@/components/learn/dashboard/RecommendationsPanel";

/** Tableau de progression détaillé (Sprint J). Read-only ; statistiques fournies par le view model. */
export function ProgressDashboard({ model }: { model: ProgressViewModel }) {
  const weeklyAvg = model.weeks.length > 0 ? Math.round(model.weeks.reduce((a, w) => a + w.percent, 0) / model.weeks.length) : 0;
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-[color:var(--color-navy)]">Ma progression</h1>
      <ProgressOverview overallPercent={model.overallPercent} weeklyPercent={weeklyAvg} />
      <StudyTimeSummary minutes={model.studyMinutes} streakDays={model.streakDays} lessonsCompleted={model.lessonsCompleted} quizzesPassed={model.quizzesPassed} />
      <div className="grid gap-6 lg:grid-cols-2">
        <ModuleProgress modules={model.modules} />
        <CompetencyProgress competencies={model.competencies} />
      </div>
      <RecommendationsPanel items={model.recommendations} />
    </div>
  );
}
