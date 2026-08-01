/**
 * Runtime étudiant — types & interfaces (Sprint A).
 *
 * Modèle d'état PUR (aucune dépendance React, aucune écriture base). Générique : s'applique à tout
 * `ProgramCurriculumV2` (marketing pilote comme futurs TEF/TCF/DELF), le contenu étant injecté.
 */

export type LessonState =
  | "locked"
  | "available"
  | "in_progress"
  | "completed"
  | "passed"
  | "needs_review";

export type ModuleState = "locked" | "available" | "in_progress" | "passed" | "needs_review";

/** Progression d'une leçon (identifiée par son `id` stable = lessonRef). */
export interface LessonProgress {
  lessonRef: string;
  moduleIndex: number;
  state: LessonState;
  /** Position de reprise (secondes) pour « continuer où j'étais ». */
  lastPositionSeconds?: number;
  completedAt?: string; // ISO
  /** Dernier score de quiz formatif (0..100), le cas échéant. */
  quizScore?: number;
}

/** Progression d'un module. */
export interface ModuleProgress {
  moduleIndex: number;
  state: ModuleState;
  /** Score du sommatif de module (0..100). */
  summativeScore?: number;
  /** Le travail pratique du module a-t-il été soumis ? */
  practicalSubmitted: boolean;
}

/** Note personnelle attachée à une leçon. */
export interface StudentNote {
  lessonRef: string;
  body: string;
  updatedAt: string; // ISO
}

/** Favori ou entrée d'historique. */
export interface Bookmark {
  lessonRef: string;
  kind: "favorite" | "history";
  at: string; // ISO
}

/** Temps d'étude cumulé. */
export interface StudyTime {
  /** Secondes cumulées par leçon. */
  byLesson: Record<string, number>;
  /** Secondes cumulées par jour (clé = YYYY-MM-DD). */
  byDay: Record<string, number>;
  /** Total en secondes. */
  totalSeconds: number;
}

/** État complet du runtime pour UN étudiant sur UN programme (pur, sérialisable). */
export interface RuntimeState {
  programSlug: string;
  programVersion: string;
  lessons: Record<string, LessonProgress>;
  modules: Record<number, ModuleProgress>;
  notes: Record<string, StudentNote>;
  bookmarks: Bookmark[];
  study: StudyTime;
  /** Journal d'événements append-only (audit & recalcul). */
  events: LearningEvent[];
}

// ─────────────────────────── Événements ───────────────────────────

export type LearningEventType =
  | "LESSON_VIEWED"
  | "LESSON_POSITION"
  | "LESSON_COMPLETED"
  | "QUIZ_SUBMITTED"
  | "SUMMATIVE_SUBMITTED"
  | "PRACTICAL_SUBMITTED"
  | "STUDY_TIME"
  | "NOTE_SAVED"
  | "BOOKMARK_TOGGLED"
  | "MODULE_UNLOCKED";

export interface BaseEvent {
  type: LearningEventType;
  at: string; // ISO
}

export interface LessonViewedEvent extends BaseEvent {
  type: "LESSON_VIEWED";
  lessonRef: string;
}
export interface LessonPositionEvent extends BaseEvent {
  type: "LESSON_POSITION";
  lessonRef: string;
  seconds: number;
}
export interface LessonCompletedEvent extends BaseEvent {
  type: "LESSON_COMPLETED";
  lessonRef: string;
}
export interface QuizSubmittedEvent extends BaseEvent {
  type: "QUIZ_SUBMITTED";
  lessonRef: string;
  quizId: string;
  score: number; // 0..100
  passed: boolean;
}
export interface SummativeSubmittedEvent extends BaseEvent {
  type: "SUMMATIVE_SUBMITTED";
  moduleIndex: number;
  score: number; // 0..100
  passed: boolean;
}
export interface PracticalSubmittedEvent extends BaseEvent {
  type: "PRACTICAL_SUBMITTED";
  moduleIndex: number;
}
export interface StudyTimeEvent extends BaseEvent {
  type: "STUDY_TIME";
  lessonRef: string;
  seconds: number;
  day: string; // YYYY-MM-DD
}
export interface NoteSavedEvent extends BaseEvent {
  type: "NOTE_SAVED";
  lessonRef: string;
  body: string;
}
export interface BookmarkToggledEvent extends BaseEvent {
  type: "BOOKMARK_TOGGLED";
  lessonRef: string;
  kind: "favorite" | "history";
  on: boolean;
}
export interface ModuleUnlockedEvent extends BaseEvent {
  type: "MODULE_UNLOCKED";
  moduleIndex: number;
}

export type LearningEvent =
  | LessonViewedEvent
  | LessonPositionEvent
  | LessonCompletedEvent
  | QuizSubmittedEvent
  | SummativeSubmittedEvent
  | PracticalSubmittedEvent
  | StudyTimeEvent
  | NoteSavedEvent
  | BookmarkToggledEvent
  | ModuleUnlockedEvent;

// ─────────────────────────── Vues calculées ───────────────────────────

/** Vue de progression d'un module (dérivée). */
export interface ModulePathNode {
  moduleIndex: number;
  title: string;
  state: ModuleState;
  percent: number;
  /** Raison du verrouillage, le cas échéant. */
  lockedReason?: string;
}

/** Agrégats de progression d'un programme (dérivés). */
export interface ProgramProgressView {
  programSlug: string;
  percent: number;
  weeklyPercent: number;
  dailyPercent: number;
  averageScore: number | null;
  timeSpentSeconds: number;
  estimatedRemainingSeconds: number;
  competenciesAcquired: string[];
  level: string | null;
  eligibleForCertificate: boolean;
  lessonsTotal: number;
  lessonsCompleted: number;
}

/** Résultat de validation d'invariants du runtime. */
export interface RuntimeValidationIssue {
  level: "error" | "warning";
  code: string;
  message: string;
}
export interface RuntimeValidationReport {
  ok: boolean;
  errors: RuntimeValidationIssue[];
  warnings: RuntimeValidationIssue[];
}
