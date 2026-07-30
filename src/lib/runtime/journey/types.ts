/**
 * Runtime — Learning Journey Engine : types & interfaces (Sprint E).
 *
 * Moteur pédagogique GÉNÉRIQUE, déterministe et explicable. Aucune logique propre à un programme :
 * les différences pédagogiques viennent de `JourneyConfig` (injectée). Aucune UI, aucune base, aucun réseau.
 */
import type { RuntimeState } from "../types.ts";
import type { ProgramCurriculumV2 } from "@/lib/academic/types";

export type TargetType = "lesson" | "module" | "skill" | "assessment" | "project" | "program";

// ─────────────────────────── Maîtrise ───────────────────────────
export type MasteryLevel = "unknown" | "exposed" | "practiced" | "passed" | "mastered";
export type MasteryStrength = "strong" | "fragile" | "insufficient";

export interface MasterySignals {
  lessonsTotal: number;
  lessonsCompleted: number;
  lessonsPassed: number;
  modulesTotal: number;
  summativesPassed: number;
  practicalsSubmitted: number;
  tutorValidated: boolean;
}
export interface SkillMastery {
  skillId: string;
  level: MasteryLevel;
  /** Score normalisé 0..1 (déterministe). */
  score: number;
  strength: MasteryStrength;
  lastSuccessAt: string | null;
  signals: MasterySignals;
}
export interface MasteryProfile {
  skills: SkillMastery[];
  generatedAt: string;
}

// ─────────────────────────── Prérequis / déblocage ───────────────────────────
export interface PrerequisiteCondition {
  targetType: TargetType;
  targetId: string;
}
export interface PrerequisiteRule {
  id: string;
  targetType: TargetType;
  targetId: string;
  requires: PrerequisiteCondition[];
  mandatory: boolean;
}
export interface PrerequisiteResult {
  targetType: TargetType;
  targetId: string;
  satisfied: boolean;
  satisfiedConditions: PrerequisiteCondition[];
  missingConditions: PrerequisiteCondition[];
  reasonCodes: string[];
}
export interface UnlockDecision {
  targetType: TargetType;
  targetId: string;
  unlocked: boolean;
  mandatoryBlocked: boolean;
  reasonCodes: string[];
}

// ─────────────────────────── Recommandations ───────────────────────────
export type RecommendationType =
  | "continue"
  | "resume"
  | "review"
  | "redo-activity"
  | "strengthen-skill"
  | "complete-prerequisite"
  | "start-next"
  | "finish-project"
  | "prepare-assessment";

export interface RecommendationReason {
  code: string;
  detail?: string;
}
export interface JourneyRecommendation {
  id: string;
  type: RecommendationType;
  priority: number; // plus élevé = plus prioritaire
  titleKey: string;
  descriptionKey: string;
  targetType: TargetType;
  targetId: string;
  reasonCodes: string[];
  confidence: number; // 0..1
  estimatedMinutes: number;
  mandatory: boolean;
  expiresAt?: string;
}
export interface JourneyAction {
  type: RecommendationType;
  targetType: TargetType;
  targetId: string;
}

// ─────────────────────────── Remédiation ───────────────────────────
export type RemediationAction = "review-lesson" | "redo-activity" | "study-resource" | "contact-tutor";
export interface RemediationStep {
  action: RemediationAction;
  targetType: TargetType;
  targetId: string;
  reasonCodes: string[];
}
export interface RemediationPlan {
  targetType: TargetType;
  targetId: string;
  attempt: number;
  maxAttempts: number;
  exhausted: boolean;
  steps: RemediationStep[];
  reasonCodes: string[];
}

// ─────────────────────────── Révision espacée ───────────────────────────
export interface ReviewItem {
  id: string;
  targetType: "skill" | "lesson";
  targetId: string;
  dueAt: string;
  intervalDays: number;
  repetitionCount: number;
  easeFactor: number;
  priority: number;
  reason: string;
  relatedSkillIds: string[];
  relatedLessonIds: string[];
  overdue: boolean;
}
export interface ReviewSchedule {
  items: ReviewItem[];
  generatedAt: string;
}

// ─────────────────────────── Plans d'étude ───────────────────────────
export type StudyKind = "new" | "practice" | "review";
export interface StudySessionPlan {
  kind: StudyKind;
  targetType: TargetType;
  targetId: string;
  estimatedMinutes: number;
  reasonCodes: string[];
}
export interface DailyStudyPlan {
  day: string; // YYYY-MM-DD
  sessions: StudySessionPlan[];
  totalMinutes: number;
  capacityMinutes: number;
}
export interface WeeklyStudyPlan {
  days: DailyStudyPlan[];
  targetDate: string | null;
  generatedAt: string;
}

// ─────────────────────────── Objectifs ───────────────────────────
export type GoalType =
  | "complete-lesson"
  | "complete-module"
  | "reach-mastery"
  | "pass-assessment"
  | "submit-project"
  | "complete-program";
export type GoalStatus = "not_started" | "in_progress" | "blocked" | "completed" | "expired";
export interface JourneyGoal {
  id: string;
  type: GoalType;
  targetType?: TargetType;
  targetId?: string;
  threshold?: number; // ex: seuil de maîtrise 0..1 ou % 0..100
  targetDate?: string; // ISO
  subgoals?: string[];
}
export interface GoalProgress {
  goalId: string;
  status: GoalStatus;
  progress: number; // 0..100
  threshold: number | null;
  targetDate: string | null;
  blockedReasons: string[];
  nextAction?: JourneyAction;
}

// ─────────────────────────── Règles déclaratives ───────────────────────────
export type JourneyRuleFamily =
  | "prerequisite"
  | "unlock"
  | "sequencing"
  | "mastery"
  | "remediation"
  | "review"
  | "workload"
  | "recommendation"
  | "goal"
  | "completion";
export interface JourneyRule {
  id: string;
  family: JourneyRuleFamily;
  /** Données pilotées par le curriculum/la config (jamais des modules codés en dur). */
  data: Record<string, unknown>;
}

// ─────────────────────────── Événements ───────────────────────────
export type JourneyEventType =
  | "journey.generated"
  | "recommendation.created"
  | "recommendation.accepted"
  | "recommendation.dismissed"
  | "prerequisite.failed"
  | "content.unlocked"
  | "mastery.updated"
  | "remediation.started"
  | "remediation.completed"
  | "review.scheduled"
  | "review.completed"
  | "goal.updated"
  | "plan.generated";
export interface JourneyEvent {
  type: JourneyEventType;
  at: string; // ISO
  payload: Record<string, unknown>;
}

// ─────────────────────────── Configuration / contexte ───────────────────────────
export interface AdvancedRecommender {
  /** Interface injectable future (désactivée par défaut). Aucune implémentation LLM ici. */
  rank(recommendations: JourneyRecommendation[]): JourneyRecommendation[];
}
export interface JourneyConfig {
  workload: { dailyMinutes: number; weeklyMinutes?: number; activeDays: number[] };
  mastery: {
    weights: { lessonCompleted: number; lessonPassed: number; summative: number; practical: number; tutor: number };
    thresholds: { practiced: number; passed: number; mastered: number };
    freshnessDays: number;
  };
  review: { baseIntervalDays: number; easeStart: number; minEase: number; intervalMultiplier: number };
  remediation: { maxAttempts: number };
  recommendation: { maxItems: number };
  defaults: { lessonMinutes: number; reviewMinutes: number; remediationMinutes: number };
  /** Cibles facultatives (ids de leçons/modules non obligatoires). */
  optionalTargetIds: string[];
  goals: JourneyGoal[];
  rules: JourneyRule[];
  /** Recommandeur avancé injectable (null = désactivé). */
  advancedRecommender: AdvancedRecommender | null;
}
export interface JourneyContext {
  curriculum: ProgramCurriculumV2;
  state: RuntimeState;
  config: JourneyConfig;
  now: Date; // horloge INJECTÉE (déterminisme)
  /** Compétences/leçons validées par un tuteur (ids). */
  tutorValidatedSkillIds?: string[];
  /** Badges obtenus (facultatif, non requis par le moteur). */
  ownedBadges?: string[];
}

// ─────────────────────────── État & résultat ───────────────────────────
export interface LearningJourneyState {
  version: number;
  generatedAt: string;
  programSlug: string;
  currentGoal: GoalProgress | null;
  currentModule: number | null;
  currentLesson: string | null;
  nextRecommendedAction: JourneyRecommendation | null;
  availableActions: JourneyAction[];
  blockedActions: UnlockDecision[];
  activeRemediations: RemediationPlan[];
  reviewQueue: ReviewItem[];
  masterySummary: MasteryProfile;
  dailyPlan: DailyStudyPlan;
  weeklyPlan: WeeklyStudyPlan;
  estimatedCompletion: { remainingMinutes: number; estimatedDays: number; targetDate: string | null };
  recommendations: JourneyRecommendation[];
  recommendationReasons: RecommendationReason[];
  goals: GoalProgress[];
}

export interface JourneyValidationIssue {
  level: "error" | "warning";
  code: string;
  message: string;
}
export interface JourneyValidationReport {
  ok: boolean;
  errors: JourneyValidationIssue[];
  warnings: JourneyValidationIssue[];
}
export interface JourneyEngineResult {
  state: LearningJourneyState;
  events: JourneyEvent[];
  validation: JourneyValidationReport;
}
