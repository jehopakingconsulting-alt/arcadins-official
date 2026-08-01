/**
 * Runtime — Dashboard Étudiant : types & interfaces (Sprint D).
 *
 * Couche de LECTURE (agrégation) : elle ne fait que composer des données déjà produites par le Runtime (A),
 * la Persistence (B) et le Player (C). Aucune UI, aucune logique métier nouvelle. Totalement GÉNÉRIQUE
 * (Marketing, TEF, TCF, DELF, tout futur programme).
 */
import type { ModuleState } from "../types.ts";
import type { TimelineEntry } from "../player/types.ts";
import type { CertificateRecord } from "../persistence/types.ts";

// ── Statistiques ──
export interface StudentStatisticsView {
  timeTotalSeconds: number;
  timeTodaySeconds: number;
  averageScore: number | null;
  lessonsCompleted: number;
  lessonsTotal: number;
  modulesPassed: number;
  modulesTotal: number;
  badgesOwned: number;
  badgesRemaining: number;
}

// ── Progression ──
export interface ModuleProgressItem {
  moduleIndex: number;
  title: string;
  percent: number;
  state: ModuleState;
}
export interface StudentProgressView {
  globalPercent: number;
  weeklyPercent: number;
  dailyPercent: number;
  level: string | null;
  modules: ModuleProgressItem[];
}

// ── Réalisations / badges ──
export interface BadgeStatus {
  code: string;
  label: string;
  description: string;
  owned: boolean;
  eligible: boolean;
}
export interface StudentAchievementsView {
  owned: BadgeStatus[];
  remaining: BadgeStatus[];
}

// ── Recommandations ──
export type RecommendationKind = "continue" | "next-lesson" | "review" | "next-objective";
export interface Recommendation {
  kind: RecommendationKind;
  label: string;
  lessonRef?: string;
  moduleIndex?: number;
}

// ── Notifications (in-app, dérivées — PAS le moteur d'e-mails) ──
export type DashboardNotificationKind = "module-unlocked" | "needs-review" | "exam-ready" | "badge-available" | "certificate-eligible";
export interface DashboardNotification {
  id: string;
  kind: DashboardNotificationKind;
  message: string;
}

// ── Calendrier / activité ──
export interface CalendarEntry {
  day: string; // YYYY-MM-DD
  studySeconds: number;
  lessonsCompleted: number;
}
export interface UpcomingLesson {
  lessonRef: string;
  moduleIndex: number;
  title: string;
}
export type ActivityType =
  | "lesson_viewed"
  | "lesson_completed"
  | "quiz_submitted"
  | "summative_submitted"
  | "practical_submitted"
  | "note_saved"
  | "bookmark_toggled";
export interface ActivityItem {
  type: ActivityType;
  at: string; // ISO
  lessonRef?: string;
  moduleIndex?: number;
  label: string;
}

// ── Résumé / cours / certification ──
export interface LearningSummaryView {
  resumeLessonRef?: string;
  globalPercent: number;
  timeTotalSeconds: number;
  timeTodaySeconds: number;
  estimatedRemainingSeconds: number;
  nextObjective?: Recommendation;
}
export interface CourseOverviewItem {
  programSlug: string;
  title: string;
  percent: number;
  active: boolean;
  completed: boolean;
}
export interface AvailableExam {
  examId: string;
  title: string;
}
export interface CertificationStatusView {
  eligible: boolean;
  status: "locked" | "eligible";
  certificates: CertificateRecord[];
  examsAvailable: AvailableExam[];
}

// ── Vue d'ensemble ──
export interface StudentDashboardState {
  generatedAt: string; // ISO
  programSlug: string;
  summary: LearningSummaryView;
  statistics: StudentStatisticsView;
  progress: StudentProgressView;
  timeline: TimelineEntry[];
  achievements: StudentAchievementsView;
  recommendations: Recommendation[];
  notifications: DashboardNotification[];
  calendar: CalendarEntry[];
  upcoming: UpcomingLesson[];
  recentActivity: ActivityItem[];
  courseOverview: CourseOverviewItem;
  certification: CertificationStatusView;
}

// ── Validation ──
export interface DashboardIssue {
  level: "error" | "warning";
  code: string;
  message: string;
}
export interface DashboardValidationReport {
  ok: boolean;
  errors: DashboardIssue[];
  warnings: DashboardIssue[];
}
