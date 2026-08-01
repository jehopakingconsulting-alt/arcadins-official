/**
 * Runtime — Assessment Engine : types & interfaces (Sprint F).
 *
 * Moteur générique et SÉCURISÉ de quiz / évaluations formatives. Séparation stricte :
 *   PrivateQuestion (avec barème/réponses) ≠ PublicQuestion (sérialisée, sans réponses).
 * Déterministe (horloge/ids/seed injectés), idempotent, versionné. Aucune UI, aucune base, aucun réseau.
 */

// ─────────────────────────── Questions ───────────────────────────
export type QuestionType =
  | "single"
  | "multiple"
  | "true_false"
  | "short_answer"
  | "numeric"
  | "matching"
  | "ordering"
  | "structured_text"
  | "file_reference";

export type QuestionDifficulty = "easy" | "medium" | "hard";
export type QuestionStatus = "active" | "archived" | "invalid";

export interface QuestionOption {
  id: string;
  label: string;
}

/** Règle de correction PRIVÉE (ne quitte jamais le serveur). */
export type GradingRule =
  | { kind: "single"; correctOptionId: string }
  | { kind: "boolean"; correct: boolean }
  | { kind: "multiple"; correctOptionIds: string[]; partial: boolean }
  | { kind: "matching"; pairs: [string, string][]; partial: boolean }
  | { kind: "ordering"; order: string[]; partial: boolean }
  | { kind: "text"; accepted: string[]; caseSensitive?: boolean; accentSensitive?: boolean }
  | { kind: "numeric"; value: number; tolerance: number }
  | { kind: "keyword"; keywords: string[]; minMatches: number }
  | { kind: "manual" };

/** Question COMPLÈTE et privée (barème inclus). */
export interface PrivateQuestion {
  id: string;
  version: number;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  prompt: string;
  options?: QuestionOption[];
  points: number;
  grading: GradingRule;
  competencyId?: string;
  moduleId?: string;
  lessonId?: string;
  tags?: string[];
  status: QuestionStatus;
  /** Explication privée / rétroaction d'erreur — jamais exposées telles quelles au client. */
  privateExplanation?: string;
  feedbackOnError?: string;
}

/** Question PUBLIQUE sérialisée (aucune réponse, aucun barème, aucune explication privée). */
export interface PublicQuestion {
  id: string;
  version: number;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  prompt: string;
  options?: QuestionOption[];
  points: number;
  tags?: string[];
}

// ─────────────────────────── Réponses ───────────────────────────
export interface StudentResponse {
  questionId: string;
  value: unknown;
}
export interface NormalizedResponse {
  questionId: string;
  type: QuestionType;
  value: unknown;
  empty: boolean;
  malformed: boolean;
}

// ─────────────────────────── Sélection ───────────────────────────
export interface QuestionSelectionRule {
  count: number;
  competencyIds?: string[];
  difficultyDistribution?: Partial<Record<QuestionDifficulty, number>>;
  typeDistribution?: Partial<Record<QuestionType, number>>;
  excludeIds?: string[];
  moduleId?: string;
  lessonId?: string;
}

// ─────────────────────────── Politiques ───────────────────────────
export type FeedbackPolicy =
  | "immediate"
  | "after_submission"
  | "after_deadline"
  | "after_all_attempts"
  | "instructor_release"
  | "no_answer_disclosure";

export interface AttemptLimit {
  maxAttempts: number;
  cooldownSeconds: number;
}
export interface TimingPolicy {
  durationLimitSeconds: number | null;
  lateSubmission: "reject" | "accept_flagged";
  extraTimeSeconds: number; // accessibilité
}
export interface NavigationPolicy {
  order: "stable" | "shuffle";
  allowBacktrack: boolean;
  sequential: boolean;
  allowPause: boolean;
  autosave: boolean;
  requireAllAnswered: boolean;
}
export interface AssessmentPolicy {
  passThresholdPercent: number;
  attempts: AttemptLimit;
  timing: TimingPolicy;
  navigation: NavigationPolicy;
  feedback: FeedbackPolicy;
  version: number;
}

export interface AssessmentDefinition {
  id: string;
  programId: string;
  moduleId?: string;
  lessonId?: string;
  version: number;
  selection: QuestionSelectionRule;
}

// ─────────────────────────── Contexte / config ───────────────────────────
export interface AssessmentConfig {
  policy: AssessmentPolicy;
  /** Accents ignorés à la correction texte par défaut ? */
  ignoreAccents: boolean;
}
export interface AssessmentContext {
  now: Date; // horloge INJECTÉE
  seed: number; // graine de sélection INJECTÉE
  idFactory: () => string; // générateur d'identifiants INJECTÉ
  config: AssessmentConfig;
}

// ─────────────────────────── Tentative / session ───────────────────────────
export type AttemptStatus =
  | "created"
  | "ready"
  | "in_progress"
  | "paused"
  | "submitted"
  | "graded"
  | "completed"
  | "failed"
  | "abandoned"
  | "expired"
  | "invalidated";
export type AssessmentStatus = "open" | "closed";

/** Tentative PRIVÉE (serveur) : contient les questions figées + barème. Ne va jamais au client tel quel. */
export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  learnerRef: string;
  programId: string;
  moduleId?: string;
  lessonId?: string;
  attemptNumber: number;
  maxAttempts: number;
  remainingAttempts: number;
  status: AttemptStatus;
  startedAt: string | null;
  submittedAt: string | null;
  completedAt: string | null;
  expiresAt: string | null;
  durationLimitSeconds: number | null;
  elapsedSeconds: number;
  previousAttemptId: string | null;
  submittedCommandId: string | null; // idempotence
  policyVersion: number;
  seed: number;
  /** Questions figées (versionnées) : la correction utilise CELLES-CI, pas la banque vivante. */
  questions: PrivateQuestion[];
  responses: Record<string, unknown>;
  result: GradingResult | null;
}

export interface NavigationState {
  currentIndex: number;
  visited: string[];
  order: string[];
}
export interface TimingState {
  startedAt: string | null;
  expiresAt: string | null;
  elapsedSeconds: number;
}
export interface IntegrityState {
  checksum: string;
  version: number;
  warnings: string[];
}
/** Session PUBLIQUE sérialisable (aucune réponse correcte, aucun barème). */
export interface AssessmentSession {
  assessmentId: string;
  attemptId: string;
  learnerRefOpaque: string;
  programId: string;
  moduleId?: string;
  lessonId?: string;
  status: AttemptStatus;
  publicQuestions: PublicQuestion[];
  responses: Record<string, unknown>;
  navigationState: NavigationState;
  timingState: TimingState;
  progress: { answered: number; total: number };
  integrityState: IntegrityState;
  version: number;
  checksum: string;
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────── Résultats ───────────────────────────
export type GradingStatus = "graded" | "pending_manual_review";
export interface QuestionGradingResult {
  questionId: string;
  earnedPoints: number;
  maximumPoints: number;
  correct: boolean | null; // null si révision manuelle
  gradingStatus: GradingStatus;
  reasonCodes: string[];
}
export interface CompetencyAssessmentResult {
  competencyId: string;
  questionsAssessed: number;
  earnedPoints: number;
  maximumPoints: number;
  score: number; // 0..1
  provisionalLevel: "insufficient" | "fragile" | "strong";
  confidence: number;
  needsRemediation: boolean;
  hasEvidence: boolean;
}
export interface GradingResult {
  rawScore: number;
  earnedPoints: number;
  maximumPoints: number;
  percentage: number;
  passed: boolean;
  gradingStatus: GradingStatus;
  questionResults: QuestionGradingResult[];
  competencyResults: CompetencyAssessmentResult[];
  requiresManualReview: boolean;
  provisional: boolean;
}

// ─────────────────────────── Rétroaction ───────────────────────────
export interface AssessmentFeedback {
  policy: FeedbackPolicy;
  released: boolean;
  resultSummaryKey: string;
  strengths: string[]; // competencyIds
  toReview: string[]; // competencyIds / lessonIds
  fragileCompetencies: string[];
  recommendationReasonCodes: string[];
  relatedLessonIds: string[];
  messageKeys: string[];
  disclosesAnswers: false; // invariant de type : jamais de divulgation de réponse ici
}

// ─────────────────────────── Intégrité ───────────────────────────
export type IntegrityCode =
  | "ALREADY_SUBMITTED"
  | "UNKNOWN_QUESTION"
  | "MODIFIED_AFTER_SUBMISSION"
  | "INCONSISTENT_DURATION"
  | "DUPLICATE_RESPONSE"
  | "MALFORMED_PAYLOAD"
  | "VERSION_CHANGED"
  | "EXPIRED"
  | "FOREIGN_CONTEXT"
  | "ORDER_ALTERED"
  | "INVALID_CHECKSUM"
  | "REPLAYED_COMMAND";
export interface IntegrityIssue {
  code: IntegrityCode;
  message: string;
}
export interface IntegrityCheck {
  ok: boolean;
  issues: IntegrityIssue[];
}
export interface ManualReviewRequest {
  attemptId: string;
  questionIds: string[];
  reasonCodes: string[];
}

// ─────────────────────────── Événements / résultat moteur ───────────────────────────
export type AssessmentEventType =
  | "assessment.attempt_created"
  | "assessment.started"
  | "assessment.answer_saved"
  | "assessment.paused"
  | "assessment.resumed"
  | "assessment.submitted"
  | "assessment.graded"
  | "assessment.completed"
  | "assessment.failed"
  | "assessment.abandoned"
  | "assessment.expired"
  | "assessment.manual_review_required"
  | "assessment.feedback_released"
  | "assessment.integrity_warning";
export interface AssessmentEvent {
  type: AssessmentEventType;
  at: string;
  payload: Record<string, unknown>;
}

/** Signal (contrat d'échange) transmis au Journey Engine — sans dupliquer le MasteryEngine. */
export interface CompetencySignal {
  competencyId: string;
  score: number; // 0..1
  passed: boolean;
  evidenceCount: number;
  needsRemediation: boolean;
}
export interface AssessmentEngineResult {
  attempt: AssessmentAttempt;
  session: AssessmentSession;
  result: GradingResult | null;
  feedback: AssessmentFeedback | null;
  competencySignals: CompetencySignal[];
  events: AssessmentEvent[];
}

export interface AssessmentValidationIssue {
  level: "error" | "warning";
  code: string;
  message: string;
}
export interface AssessmentValidationReport {
  ok: boolean;
  errors: AssessmentValidationIssue[];
  warnings: AssessmentValidationIssue[];
}
