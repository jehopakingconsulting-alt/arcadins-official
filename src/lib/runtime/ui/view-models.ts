/**
 * Runtime — UI : view models (Sprint J).
 *
 * Modèles de vue STABLES consommés par React. Aucun objet métier complexe n'est envoyé directement aux composants.
 * Aucun champ privé (bonne réponse, barème, état privé, secret) ne doit jamais figurer ici.
 */
import type { ContentBlock, EnrollmentUiStatus, JourneyStatus, PublicQuestionKind } from "./types.ts";

export interface StudentIdentityViewModel {
  displayName: string;
  initials: string;
  demo: true; // en preview, toujours fictif
}

export interface ProgramOverviewViewModel {
  programId: string;
  programTitle: string;
  totalWeeks: number;
  totalModules: number;
  passThresholdPercent: number;
}

export interface StudentDashboardViewModel {
  identity: StudentIdentityViewModel;
  program: ProgramOverviewViewModel | null;
  enrollmentStatus: EnrollmentUiStatus;
  welcomeMessageKey: string;
  overallPercent: number;
  weeklyPercent: number;
  currentModuleTitle: string | null;
  nextLessonTitle: string | null;
  lastActivityAt: string | null;
  totalStudyMinutes: number;
  averageScorePercent: number | null; // score MOYEN autorisé (public), jamais un barème
  competencies: CompetencyViewModel[];
  goals: GoalViewModel[];
  recommendations: RecommendationViewModel[];
  badges: BadgeViewModel[];
  credentials: CredentialViewModel[];
  notifications: NotificationViewModel[];
  recentActivity: ActivityViewModel[];
  accessExpiresAt: string | null;
}

export interface CompetencyViewModel {
  code: string;
  labelKey: string;
  percent: number;
  level: "insufficient" | "fragile" | "strong";
}
export interface GoalViewModel {
  id: string;
  labelKey: string;
  percent: number;
  dueAt: string | null;
}
export interface ActivityViewModel {
  id: string;
  type: string;
  at: string;
  labelKey: string;
}

export interface JourneyViewModel {
  program: ProgramOverviewViewModel;
  modules: ModuleViewModel[];
  currentLessonId: string | null;
}
export interface ModuleViewModel {
  moduleId: string;
  index: number;
  titleKey: string;
  status: JourneyStatus;
  percent: number;
  weeks: WeekViewModel[];
}
export interface WeekViewModel {
  week: number;
  titleKey: string;
  status: JourneyStatus;
  lessons: LessonJourneyItemViewModel[];
}
export interface LessonJourneyItemViewModel {
  lessonId: string;
  titleKey: string;
  status: JourneyStatus;
  percent: number;
  /** Raison de verrouillage FOURNIE par le moteur (jamais calculée par le composant). */
  lockedReasonCode: string | null;
}

export interface LessonPlayerViewModel {
  lessonId: string;
  titleKey: string;
  moduleTitleKey: string;
  week: number | null;
  estimatedMinutes: number;
  objectives: string[];
  blocks: ContentBlock[];
  resources: ResourceViewModel[];
  progressPercent: number;
  canRequestValidation: boolean;
  /** Le SERVEUR décide si « marquer terminé » est autorisé ; le composant ne fait qu'afficher. */
  canMarkComplete: boolean;
  previousLessonId: string | null;
  nextLessonId: string | null;
}
export interface ResourceViewModel {
  id: string;
  labelKey: string;
  kind: "pdf" | "video" | "audio" | "link" | "download";
  /** Placeholder uniquement — aucun vrai téléchargement dans ce Sprint. */
  placeholder: true;
}

export interface NoteViewModel {
  id: string;
  lessonId: string;
  body: string;
  updatedAt: string;
}
export interface BookmarkViewModel {
  id: string;
  lessonId: string;
  lessonTitleKey: string;
}

export interface AssessmentIntroViewModel {
  assessmentId: string;
  titleKey: string;
  instructionsKey: string;
  questionCount: number;
  indicativeMinutes: number;
  difficultyKey: string;
  attemptNumber: number;
  maxAttempts: number;
}
export interface PublicQuestionViewModel {
  questionId: string;
  kind: PublicQuestionKind;
  prompt: string;
  options?: { id: string; label: string }[];
  points: number; // valeur affichable, jamais le barème de correction
}
export interface AssessmentViewModel {
  assessmentId: string;
  attemptId: string;
  questions: PublicQuestionViewModel[]; // AUCUNE bonne réponse
  answered: number;
  total: number;
  currentIndex: number;
}
export interface AssessmentResultViewModel {
  scorePercent: number; // score PUBLIC autorisé (corrigé serveur)
  passed: boolean;
  feedbackKeys: string[]; // rétroaction publique, jamais de divulgation de réponse
  strengths: string[];
  toReview: string[];
  recommendations: RecommendationViewModel[];
  nextStepKey: string | null;
}

export interface ProgressViewModel {
  overallPercent: number;
  modules: { moduleId: string; titleKey: string; percent: number; completed: boolean }[];
  weeks: { week: number; percent: number }[];
  lessonsCompleted: number;
  quizzesPassed: number;
  projects: number;
  competencies: CompetencyViewModel[];
  studyMinutes: number;
  streakDays: number;
  goals: GoalViewModel[];
  deadlines: CalendarEventViewModel[];
  recommendations: RecommendationViewModel[];
}

export interface CalendarEventViewModel {
  id: string;
  labelKey: string;
  at: string;
  kind: "lesson" | "review" | "quiz" | "project" | "exam" | "event";
  status: JourneyStatus;
}
export interface CalendarViewModel {
  events: CalendarEventViewModel[];
}

export interface RecommendationViewModel {
  id: string;
  kind: "continue_lesson" | "review_competency" | "redo_exercise" | "retry_quiz" | "view_resource" | "next_module" | "contact_tutor" | "prepare_project";
  labelKey: string;
  reasonKey: string; // raison explicable, jamais générée par LLM
  targetId: string | null;
}

export interface BadgeViewModel {
  badgeDefinitionId: string;
  titleKey: string;
  descriptionKey: string;
  obtained: boolean;
  criteriaKey: string;
  obtainedAt: string | null;
  progressPercent: number;
}
export interface CredentialViewModel {
  publicVerificationIdMasked: string; // masqué à l'affichage
  documentTitle: string; // « Attestation de réussite ARCADINS »
  status: "issued" | "active" | "suspended" | "revoked" | "replaced" | "expired" | "not_issued";
  issuedAt: string | null;
  version: number;
  replacementReference: string | null;
}

export interface NotificationViewModel {
  id: string;
  kind: "lesson_available" | "module_unlocked" | "quiz_retry" | "deadline_soon" | "project_submitted" | "exam_available" | "badge_obtained" | "credential_available" | "access_expiring" | "admin_action_required";
  labelKey: string;
  at: string;
  read: boolean;
}

/** Regroupement des view models consommés par la coquille étudiante (preview / rendu complet). */
export interface StudentPreviewBundle {
  dashboard: StudentDashboardViewModel;
  calendar: CalendarViewModel;
  journey: JourneyViewModel;
  lesson: LessonPlayerViewModel;
  notes: NoteViewModel[];
  bookmarks: BookmarkViewModel[];
  assessment: AssessmentViewModel;
  assessmentResult: AssessmentResultViewModel;
  progress: ProgressViewModel;
  credentials: CredentialViewModel[];
  badges: BadgeViewModel[];
}
