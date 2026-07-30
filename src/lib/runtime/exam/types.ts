/**
 * Runtime — Secure Final Exam Engine : types & interfaces (Sprint G).
 *
 * Moteur GÉNÉRIQUE et SÉCURISÉ des examens finaux / sommatifs officiels internes d'ARCADINS.
 * Distinct du Sprint F (quiz / formatif) : session strictement verrouillée, admissibilité préalable,
 * tentative officielle, chronomètre autoritaire (horloge injectée), soumission finale irréversible,
 * correction hybride automatique/humaine, résultat PROVISOIRE distinct du résultat DÉFINITIF,
 * validation finale obligatoire avant transmission à la certification.
 *
 * Réutilise par COMPOSITION les contrats du Sprint F : PrivateQuestion / PublicQuestion / GradingRule /
 * NormalizedResponse / QuestionGradingResult / StudentResponse, la garde `containsForbiddenKeys`,
 * le GradingEngine et l'AnswerNormalizer. Aucune UI, aucune base, aucun réseau, aucun LLM.
 */
import type {
  CompetencyAssessmentResult,
  CompetencySignal,
  GradingRule,
  NormalizedResponse,
  PrivateQuestion,
  PublicQuestion,
  QuestionDifficulty,
  QuestionGradingResult,
  QuestionType,
  StudentResponse,
} from "../assessment/types.ts";

// Ré-export des contrats partagés (le moteur d'examen n'invente pas un second modèle de question).
export type {
  CompetencyAssessmentResult,
  CompetencySignal,
  GradingRule,
  NormalizedResponse,
  PrivateQuestion,
  PublicQuestion,
  QuestionDifficulty,
  QuestionGradingResult,
  QuestionType,
  StudentResponse,
};

// ─────────────────────────── Admissibilité ───────────────────────────
/** Règles configurables d'admissibilité (aucune propre à un programme codée en dur). */
export interface ExamEligibilityRule {
  requireActiveEnrollment: boolean;
  requireProgramAccessible: boolean;
  requiredModuleIds: string[];
  minimumProgressPercent: number;
  requiredPassedQuizIds: string[];
  requireFinalProjectSubmitted: boolean;
  requireFinalProjectApproved: boolean;
  forbidAdministrativeHold: boolean;
  minimumAvailableAttempts: number;
  mandatoryCooldownSeconds: number;
  requireExamWindowOpen: boolean;
  requiredPrerequisiteSkillIds: string[];
  /** Version de l'ensemble de règles (figée dans la session). */
  version: number;
}

/** Faits observés sur l'apprenant (fournis par l'appelant — jamais lus depuis une base ici). */
export interface ExamEligibilityContext {
  enrollmentActive: boolean;
  programAccessible: boolean;
  completedModuleIds: string[];
  progressPercent: number;
  passedQuizIds: string[];
  finalProjectSubmitted: boolean;
  finalProjectApproved: boolean;
  administrativeHold: boolean;
  availableAttempts: number;
  lastAttemptCompletedAt: string | null;
  examWindowOpen: boolean;
  satisfiedPrerequisiteSkillIds: string[];
  /** Décision spéciale d'un tuteur/administrateur (dérogation explicite). */
  specialApproval?: "granted" | "denied" | null;
}

export type ExamEligibilityStatus =
  | "eligible"
  | "ineligible"
  | "conditionally_eligible"
  | "requires_manual_approval";

export interface ExamEligibilityResult {
  status: ExamEligibilityStatus;
  reasonCodes: string[];
  unmetRuleCodes: string[];
  ruleVersion: number;
  checkedAt: string;
}

// ─────────────────────────── Définition & versions ───────────────────────────
export type ExamDefinitionStatus = "draft" | "active" | "retired";

/** Règle de sélection de questions d'une section (déterministe, graine injectée). */
export interface ExamQuestionSelection {
  count: number;
  competencyIds?: string[];
  difficultyDistribution?: Partial<Record<QuestionDifficulty, number>>;
  typeDistribution?: Partial<Record<QuestionType, number>>;
  excludeIds?: string[];
  moduleId?: string;
  lessonId?: string;
}

export interface FinalExamQuestionReference {
  questionId: string;
  /** Poids relatif de la question dans sa section (défaut : points de la question). */
  weight?: number;
}

export interface FinalExamSection {
  id: string;
  titleKey: string;
  selection: ExamQuestionSelection;
  /** Poids relatif de la section dans le score global pondéré. */
  weight: number;
  /** Seuil minimal propre à la section (0..100) — optionnel. */
  minSectionPercent?: number;
  /** Section éliminatoire : l'échec de section entraîne l'échec global. */
  eliminatory?: boolean;
  /** Section chronométrée indépendamment (secondes) — optionnel. */
  durationLimitSeconds?: number;
  /** Navigation séquentielle imposée dans la section. */
  sequential?: boolean;
  /** Verrouiller la section une fois validée (retour interdit). */
  lockAfterComplete?: boolean;
}

/** Empreinte de version figée dans la session (aucune modification rétroactive possible). */
export interface FinalExamVersion {
  examVersion: number;
  questionsVersion: number;
  bankVersion: number;
  rubricsVersion: number;
  gradingVersion: number;
  eligibilityVersion: number;
  navigationVersion: number;
  accommodationVersion: number;
  passThresholdVersion: number;
}

export interface FinalExamDefinition {
  examId: string;
  programId: string;
  version: FinalExamVersion;
  status: ExamDefinitionStatus;
  sections: FinalExamSection[];
  durationLimitSeconds: number;
  passThresholdPercent: number;
  navigation: ExamNavigationPolicy;
  retake: ExamRetakePolicy;
  grading: ExamGradingPolicy;
  eligibilityRule: ExamEligibilityRule;
  accommodationPolicy: ExamAccommodationPolicy;
  humanReviewRequired: boolean;
  activatedAt: string | null;
  retiredAt: string | null;
}

// ─────────────────────────── Politiques ───────────────────────────
export type ExamNavigationMode = "free" | "sequential";
export interface ExamNavigationPolicy {
  mode: ExamNavigationMode;
  allowBacktrack: boolean;
  lockSectionAfterComplete: boolean;
  questionOrder: "stable" | "shuffle";
  requireAllAnswered: boolean;
  allowPartialSubmission: boolean;
  requireConfirmationBeforeSubmit: boolean;
  version: number;
}

export interface ExamRetakePolicy {
  maximumAttempts: number;
  cooldownSeconds: number;
  requiresAuthorization: boolean;
  version: number;
}

export type WeightingMode = "by_question" | "by_section";
export interface ExamPenaltyRule {
  /** Pénalité (points) par réponse incorrecte — 0 = désactivé (défaut). */
  perIncorrect: number;
}
export interface ExamGradingPolicy {
  passThresholdPercent: number;
  sectionThresholds: Record<string, number>;
  eliminatorySectionIds: string[];
  weighting: WeightingMode;
  penalties: ExamPenaltyRule;
  /** Bonus désactivé par défaut. */
  bonusEnabled: boolean;
  ignoreAccents: boolean;
  version: number;
}

export type ExamAccommodationType =
  | "extra_time"
  | "allow_pause"
  | "screen_reader"
  | "alternative_format"
  | "text_size"
  | "contrast"
  | "keyboard_only"
  | "human_assistance"
  | "section_exemption"
  | "language_adaptation";

export interface ExamAccommodation {
  type: ExamAccommodationType;
  /** Secondes de temps supplémentaire (type extra_time). */
  extraTimeSeconds?: number;
  /** Section exemptée (type section_exemption). */
  sectionId?: string;
  /** Détail opaque non nominatif (ex. code de format), jamais de PII inutile. */
  detail?: string;
}
export interface ExamAccommodationPolicy {
  allowed: ExamAccommodationType[];
  version: number;
}

// ─────────────────────────── Contexte / config ───────────────────────────
export interface ExamRuntimeConfig {
  grading: ExamGradingPolicy;
  navigation: ExamNavigationPolicy;
  retake: ExamRetakePolicy;
  /** Fenêtre de tolérance de soumission tardive (secondes) après expiration stricte. */
  gracePeriodSeconds: number;
  /** Tolérance de dérive d'horloge client acceptée avant avertissement (secondes). */
  clockDriftToleranceSeconds: number;
  /** Délai maximal entre deux heartbeats avant avertissement (secondes). */
  heartbeatMaxGapSeconds: number;
}
export interface ExamContext {
  now: Date; // horloge INJECTÉE — seule autorité temporelle
  seed: number; // graine de sélection INJECTÉE
  idFactory: () => string; // fabrique d'identifiants INJECTÉE
  config: ExamRuntimeConfig;
}

// ─────────────────────────── Chronomètre autoritaire ───────────────────────────
export interface ExamTimerState {
  officialStartedAt: string | null;
  lastHeartbeatAt: string | null;
  officialSubmittedAt: string | null;
  durationLimitSeconds: number;
  extraTimeSeconds: number;
  gracePeriodSeconds: number;
  allowedPauseSeconds: number;
  totalPausedSeconds: number;
  pausedSince: string | null;
  elapsedOfficialSeconds: number;
  remainingOfficialSeconds: number;
  expired: boolean;
  inGracePeriod: boolean;
}

// ─────────────────────────── Tentative (privée) ───────────────────────────
export type ExamSessionStatus =
  | "created"
  | "eligibility_verified"
  | "ready"
  | "active"
  | "paused"
  | "disconnected"
  | "resumed"
  | "submitted"
  | "grading"
  | "pending_manual_review"
  | "provisionally_graded"
  | "finalized"
  | "passed"
  | "failed"
  | "abandoned"
  | "expired"
  | "invalidated"
  | "cancelled";

export type ExamAttemptStatus = "official" | "practice";
export type ExamAttemptLifecycle = "active" | "completed" | "invalidated" | "cancelled";

/** Section figée d'une tentative : questions PRIVÉES (barème inclus) — ne quitte jamais le serveur. */
export interface ExamFrozenSection {
  id: string;
  titleKey: string;
  weight: number;
  minSectionPercent?: number;
  eliminatory: boolean;
  durationLimitSeconds?: number;
  sequential: boolean;
  lockAfterComplete: boolean;
  questions: PrivateQuestion[];
  locked: boolean;
}

/** Révision d'une réponse (historique horodaté, autorité serveur). */
export interface ExamResponseRevision {
  revision: number;
  value: unknown;
  savedAt: string;
  checksum: string;
}
export interface ExamResponse {
  questionId: string;
  value: unknown;
  revision: number;
  savedAt: string;
  checksum: string;
  rejected: boolean;
  rejectReasonCodes: string[];
}

/**
 * Tentative PRIVÉE (serveur). Contient les sections figées, le barème, le chronomètre autoritaire,
 * les réponses officielles et le résultat. Ne va JAMAIS au client tel quel.
 */
export interface ExamAttempt {
  id: string;
  sessionId: string;
  examId: string;
  programId: string;
  learnerRef: string;
  attemptNumber: number;
  maximumAttempts: number;
  remainingAttempts: number;
  kind: ExamAttemptStatus;
  lifecycle: ExamAttemptLifecycle;
  previousAttemptId: string | null;
  retakeReason: string | null;
  retakeAuthorizedBy: string | null;
  cooldownUntil: string | null;
  specialAccommodation: ExamAccommodation[];
  invalidationReason: string | null;
  cancellationReason: string | null;
  status: ExamSessionStatus;
  frozenVersion: FinalExamVersion;
  /** Politiques FIGÉES à la création (versionnement) : une modification ultérieure n'affecte pas cette tentative. */
  gradingPolicy: ExamGradingPolicy;
  navigationPolicy: ExamNavigationPolicy;
  retakePolicy: ExamRetakePolicy;
  passThresholdPercent: number;
  sections: ExamFrozenSection[];
  timer: ExamTimerState;
  responses: Record<string, ExamResponse>;
  responseHistory: Record<string, ExamResponseRevision[]>;
  provisionalResult: ExamProvisionalResult | null;
  finalResult: ExamFinalResult | null;
  integrity: ExamIntegrityStatus;
  /** Journal des commandes déjà traitées (idempotence). commandId → statut logique. */
  processedCommands: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────── Session publique ───────────────────────────
export interface ExamPublicSection {
  id: string;
  titleKey: string;
  weight: number;
  sequential: boolean;
  locked: boolean;
  questions: PublicQuestion[];
}
export interface ExamPublicTimer {
  officialStartedAt: string | null;
  remainingOfficialSeconds: number;
  expired: boolean;
  inGracePeriod: boolean;
}
export interface ExamNavigationView {
  mode: ExamNavigationMode;
  currentSectionId: string | null;
  allowBacktrack: boolean;
}
/** Session PUBLIQUE sérialisable — aucune réponse correcte, aucun barème, aucune donnée privée. */
export interface ExamSession {
  sessionId: string;
  attemptId: string;
  examId: string;
  programId: string;
  learnerRefOpaque: string;
  status: ExamSessionStatus;
  sections: ExamPublicSection[];
  responses: Record<string, unknown>;
  navigation: ExamNavigationView;
  timer: ExamPublicTimer;
  progress: { answered: number; total: number };
  frozenVersion: FinalExamVersion;
  integrityStatus: ExamIntegritySeverity;
  checksum: string;
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────── Correction & résultats ───────────────────────────
export interface ExamSectionResult {
  sectionId: string;
  earnedPoints: number;
  maximumPoints: number;
  weightedScore: number; // 0..1
  percentage: number;
  passed: boolean;
  eliminatory: boolean;
  requiresManualReview: boolean;
}

export type ExamGradingStatus = "graded" | "pending_manual_review" | "incomplete";

export interface ExamGradingResult {
  automaticScore: number;
  manualScorePending: number;
  provisionalScore: number;
  finalScore: number | null;
  maximumPoints: number;
  percentage: number;
  sectionResults: ExamSectionResult[];
  competencyResults: CompetencyAssessmentResult[];
  questionResults: QuestionGradingResult[];
  passedAutomatically: boolean;
  requiresManualReview: boolean;
  gradingStatus: ExamGradingStatus;
  eliminatoryFailure: boolean;
  reasonCodes: string[];
}

export interface ExamProvisionalResult {
  attemptId: string;
  gradingResult: ExamGradingResult;
  provisional: true;
  createdAt: string;
  reasonCodes: string[];
}

export type ExamDecisionStatus =
  | "pending"
  | "provisional_pass"
  | "provisional_fail"
  | "passed"
  | "failed"
  | "invalidated"
  | "cancelled"
  | "requires_administrative_review";

export interface ExamFinalResult {
  attemptId: string;
  finalStatus: ExamDecisionStatus;
  finalScore: number;
  percentage: number;
  passed: boolean;
  sectionResults: ExamSectionResult[];
  competencyResults: CompetencyAssessmentResult[];
  integrityStatus: ExamIntegritySeverity;
  reviewStatus: ManualReviewStatus | "not_required";
  finalizedAt: string;
  reasonCodes: string[];
}

// ─────────────────────────── Révision humaine ───────────────────────────
export type ManualReviewStatus =
  | "pending_assignment"
  | "assigned"
  | "in_review"
  | "needs_second_review"
  | "escalated"
  | "approved"
  | "rejected"
  | "finalized";

export interface ManualReviewAssignment {
  reviewerRef: string;
  assignedAt: string;
}
export interface ManualReviewDecision {
  reviewerRef: string;
  questionScores: Record<string, number>;
  privateComment?: string;
  studentComment?: string;
  decidedAt: string;
  decision: "approve" | "reject" | "needs_second_review";
}
export interface ManualReviewRequest {
  id: string;
  attemptId: string;
  questionIds: string[];
  rubricVersion: number;
  status: ManualReviewStatus;
  assignments: ManualReviewAssignment[];
  decisions: ManualReviewDecision[];
  escalated: boolean;
  reasonCodes: string[];
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────── Intégrité ───────────────────────────
export type ExamIntegritySeverity = "clean" | "informational" | "warning" | "suspicious" | "blocking";
export type ExamIntegrityCode =
  | "SESSION_NOT_FOUND"
  | "FOREIGN_LEARNER"
  | "VERSION_MISMATCH"
  | "ORDER_ALTERED"
  | "INVALID_CHECKSUM"
  | "REPLAYED_COMMAND"
  | "DOUBLE_SUBMISSION"
  | "ANSWER_AFTER_EXPIRY"
  | "ANSWER_AFTER_SUBMISSION"
  | "CLIENT_CLOCK_INCONSISTENT"
  | "ABNORMAL_HEARTBEAT"
  | "ATTEMPTS_EXCEEDED"
  | "NAVIGATION_FORBIDDEN"
  | "CONTEXT_SWITCH"
  | "OVERSIZED_PAYLOAD"
  | "UNAUTHORIZED_QUESTION"
  | "SECTION_NOT_ACCESSIBLE"
  | "INCOMPATIBLE_CONCURRENT_SESSION"
  | "MALFORMED_PAYLOAD";
export interface ExamIntegrityIssue {
  code: ExamIntegrityCode;
  severity: ExamIntegritySeverity;
  message: string;
}
export interface ExamIntegrityStatus {
  highestSeverity: ExamIntegritySeverity;
  blocking: boolean;
  issues: ExamIntegrityIssue[];
}

// ─────────────────────────── Reprise ───────────────────────────
export interface ExamRetakeRequest {
  id: string;
  attemptId: string;
  learnerRef: string;
  reason: string;
  requestedAt: string;
}
export type ExamRetakeStatus = "authorized" | "denied";
export interface ExamRetakeDecision {
  requestId: string;
  status: ExamRetakeStatus;
  authorizedBy: string | null;
  cooldownUntil: string | null;
  reasonCodes: string[];
  decidedAt: string;
}

// ─────────────────────────── Audit ───────────────────────────
export type ExamAuditEventType =
  | "exam.eligibility_checked"
  | "exam.session_created"
  | "exam.started"
  | "exam.answer_saved"
  | "exam.answer_rejected"
  | "exam.paused"
  | "exam.resumed"
  | "exam.heartbeat_received"
  | "exam.warning_recorded"
  | "exam.expired"
  | "exam.auto_submitted"
  | "exam.submitted"
  | "exam.grading_started"
  | "exam.automatic_grading_completed"
  | "exam.manual_review_requested"
  | "exam.manual_review_completed"
  | "exam.provisional_result_created"
  | "exam.final_result_created"
  | "exam.passed"
  | "exam.failed"
  | "exam.invalidated"
  | "exam.cancelled"
  | "exam.retake_requested"
  | "exam.retake_authorized"
  | "exam.retake_denied";
export interface ExamAuditEvent {
  type: ExamAuditEventType;
  at: string;
  payload: Record<string, unknown>;
}

// ─────────────────────────── Contrat de résultat (→ certification) ───────────────────────────
export interface ExamResultContract {
  learnerReference: string;
  programId: string;
  examId: string;
  examVersion: FinalExamVersion;
  attemptId: string;
  finalStatus: ExamDecisionStatus;
  finalScore: number;
  passed: boolean;
  finalizedAt: string | null;
  sectionResults: ExamSectionResult[];
  integrityStatus: ExamIntegritySeverity;
  reviewStatus: ManualReviewStatus | "not_required";
  /** Faux tant que le résultat n'est pas DÉFINITIF, valide et réussi. */
  certificateEligibility: boolean;
  reasonCodes: string[];
  auditReference: string;
}

// ─────────────────────────── Résultat moteur / validation ───────────────────────────
export interface ExamEngineResult {
  attempt: ExamAttempt;
  session: ExamSession;
  events: ExamAuditEvent[];
}

export interface ExamValidationIssue {
  level: "error" | "warning";
  code: string;
  message: string;
}
export interface ExamValidationReport {
  ok: boolean;
  errors: ExamValidationIssue[];
  warnings: ExamValidationIssue[];
}
