/**
 * Runtime — Dashboard Étudiant : StudentDashboardController + StudentDashboardState (Sprint D).
 *
 * Assemble PUREMENT la vue complète du dashboard à partir des contrôleurs (qui délèguent à A/B/C).
 */
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type { RuntimeState } from "../types.ts";
import type { Awards } from "../persistence/types.ts";
import type { StudentDashboardState } from "./types.ts";
import {
  CertificationStatus,
  CourseOverview,
  LearningCalendar,
  LearningSummary,
  RecentActivity,
  StudentAchievements,
  StudentNotifications,
  StudentProgress,
  StudentRecommendations,
  StudentStatistics,
  StudentTimeline,
  UpcomingLessons,
} from "./controllers.ts";

const EMPTY_AWARDS: Awards = { badges: [], certificates: [] };

export interface DashboardBuildOptions {
  awards?: Awards;
  now?: Date;
  /** Leçon courante (pour marquer la timeline) — typiquement `player.currentRefValue()`. */
  currentRef?: string;
}

export const StudentDashboardController = {
  /** Construit l'état complet du dashboard étudiant (lecture pure). */
  build(curriculum: ProgramCurriculumV2, state: RuntimeState, options: DashboardBuildOptions = {}): StudentDashboardState {
    const awards = options.awards ?? EMPTY_AWARDS;
    const now = options.now ?? new Date();
    return {
      generatedAt: now.toISOString(),
      programSlug: curriculum.slug,
      summary: LearningSummary.build(curriculum, state, now),
      statistics: StudentStatistics.build(curriculum, state, awards, now),
      progress: StudentProgress.build(curriculum, state, now),
      timeline: StudentTimeline.build(curriculum, state, options.currentRef),
      achievements: StudentAchievements.build(curriculum, state, awards, undefined, now),
      recommendations: StudentRecommendations.build(curriculum, state),
      notifications: StudentNotifications.build(curriculum, state, awards, now),
      calendar: LearningCalendar.build(state),
      upcoming: UpcomingLessons.build(curriculum, state),
      recentActivity: RecentActivity.build(state),
      courseOverview: CourseOverview.build(curriculum, state),
      certification: CertificationStatus.build(curriculum, state, awards),
    };
  },
};
