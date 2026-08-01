/**
 * Runtime — UI : assemblage du bundle étudiant à partir du CONTENU ACADÉMIQUE RÉEL (Sprint K1).
 *
 * Produit un `StudentPreviewBundle` où le PARCOURS, le LECTEUR de leçon, la PROGRESSION et le focus du tableau de
 * bord proviennent d'un `ProgramCurriculumV2` réel (générique). Les parties non encore branchées à leur moteur
 * (évaluation, badges, certificats, notifications, calendrier, recommandations) restent en démo FICTIVE jusqu'à
 * leur sous-sprint dédié (K3–K5). Identité étudiante toujours fictive (preview). Aucune donnée réelle.
 */
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type { StudentPreviewBundle } from "./view-models.ts";
import type { ProgressOverlay } from "./content-mappers.ts";
import {
  academicDashboardFocus,
  firstAccessibleLessonId,
  toContentProgress,
  toJourneyViewModel,
  toLessonPlayerViewModel,
  toProgramOverview,
} from "./content-mappers.ts";
import {
  demoAssessment, demoAssessmentResult, demoBadges, demoBookmarks, demoCalendar, demoCredentials,
  demoDashboard, demoLesson, demoNotes, demoNotifications, demoRecommendations,
} from "./demo-data.ts";

export function buildAcademicStudentBundle(curriculum: ProgramCurriculumV2, overlay: ProgressOverlay = {}): StudentPreviewBundle {
  const focus = academicDashboardFocus(curriculum, overlay);
  const entryLessonId = firstAccessibleLessonId(curriculum, overlay);
  const lesson = (entryLessonId && toLessonPlayerViewModel(curriculum, entryLessonId, overlay)) || demoLesson();
  const progress = toContentProgress(curriculum, overlay);

  const base = demoDashboard();
  const dashboard: StudentPreviewBundle["dashboard"] = {
    ...base,
    program: toProgramOverview(curriculum),
    overallPercent: focus.overallPercent,
    weeklyPercent: 0,
    currentModuleTitle: focus.currentModuleTitle,
    nextLessonTitle: focus.nextLessonTitle,
    totalStudyMinutes: 0,
    averageScorePercent: null,
    competencies: progress.competencies,
    // Parties « soft » (recommandations/notifications/badges/certificats) restent démo jusqu'à K4–K5.
    recommendations: demoRecommendations(),
    badges: demoBadges(),
    credentials: demoCredentials(),
    notifications: demoNotifications(),
    recentActivity: [],
  };

  return {
    dashboard,
    calendar: demoCalendar(),
    journey: toJourneyViewModel(curriculum, overlay),
    lesson,
    notes: demoNotes(),
    bookmarks: demoBookmarks(),
    assessment: demoAssessment(),
    assessmentResult: demoAssessmentResult(),
    progress,
    credentials: demoCredentials(),
    badges: demoBadges(),
  };
}
