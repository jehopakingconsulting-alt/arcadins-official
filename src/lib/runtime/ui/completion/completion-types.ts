/**
 * Runtime — UI/Completion : contrats de l'orchestration d'évaluation (Sprint K3C).
 *
 * K3C ORCHESTRE (ne réécrit rien) : résultats de quiz formatifs (K3A), résultat d'examen final (G/K3B),
 * révision manuelle (G), reprises (G), progression (A/K2A) → décision provisoire puis DÉFINITIVE, contrat
 * public nettoyé, et contrat de transfert vers K4 (NON émetteur : aucun certificat/badge/PDF/QR).
 *
 * PUR / node-testable. Aucune donnée privée dans les contrats PUBLICS ; les raisons INTERNES sont séparées.
 */
import type { CompetencyAssessmentResult } from "../../assessment/types.ts";

/** États de complétion (machine à états explicite). */
export type CompletionStatus =
  | "not_started"
  | "quiz_requirements_pending"
  | "quiz_requirements_completed"
  | "final_exam_not_eligible"
  | "final_exam_eligible"
  | "final_exam_in_progress"
  | "final_exam_submitted"
  | "provisional_pass"
  | "provisional_fail"
  | "manual_review_pending"
  | "manual_review_in_progress"
  | "manual_review_completed"
  | "retake_available"
  | "retake_exhausted"
  | "final_pass"
  | "final_fail"
  | "suspended"
  | "expired"
  | "administratively_blocked";

/** Résultat d'un quiz obligatoire (agrégat PUBLIC issu de K3A ; jamais de bonne réponse). */
export interface QuizRequirementResult {
  quizId: string;
  required: boolean;
  attempted: boolean;
  passed: boolean;
  scorePercent: number;
  competencies: string[];
}

/** Niveau de compétence PUBLIC (sous-ensemble sûr de CompetencyAssessmentResult). */
export interface PublicCompetencyOutcome {
  competencyId: string;
  score: number; // 0..1 (public autorisé)
  level: CompetencyAssessmentResult["provisionalLevel"];
  needsRemediation: boolean;
}

/** Résultat d'examen final (agrégat PUBLIC issu de G/K3B ; aucune donnée privée). */
export interface ExamOutcomeInput {
  eligible: boolean;
  eligibilityStatus: string; // statut public d'admissibilité
  status: "not_started" | "in_progress" | "submitted" | "provisionally_graded" | "pending_manual_review" | "finalized";
  provisionalPassed: boolean | null;
  requiresManualReview: boolean;
  percentage: number | null; // score public autorisé
  eliminatoryFailure: boolean;
  finalStatus: string | null; // ExamDecisionStatus quand décidé
  finalPassed: boolean | null;
  certificateEligibility: boolean; // via ExamResultContract UNIQUEMENT
  competencies: PublicCompetencyOutcome[];
  attemptsUsed: number;
  maxAttempts: number;
  lastCompletedAt: string | null;
  cooldownSeconds: number;
  expired: boolean;
  suspended: boolean;
  administrativeHold: boolean;
  attemptId: string | null;
}

/** Versions FIGÉES au moment d'une décision (aucune modification rétroactive). */
export interface CompletionVersions {
  quizEngineVersion: number;
  examEngineVersion: number;
  reviewPolicyVersion: number;
  runtimeVersion: number;
  contractVersion: number;
}

/** Contrat d'ENTRÉE de la consolidation (déjà autorisé en amont). */
export interface CompletionInput {
  learnerRefOpaque: string; // jamais l'identité réelle
  programSlug: string;
  programTitleKey: string;
  curriculumVersion: string;
  policyVersion: number;
  quizzes: QuizRequirementResult[];
  exam: ExamOutcomeInput;
  /** État PUBLIC de révision (le workflow privé reste côté moteur/orchestrateur). */
  reviewStatus: import("../../exam/types.ts").ManualReviewStatus | "not_required";
  reviewComplete: boolean;
  versions: CompletionVersions;
}

/** Décision PROVISOIRE (jamais définitive, ne débloque jamais la certification). */
export interface ProvisionalDecision {
  provisionalId: string;
  status: "provisional_pass" | "provisional_fail" | "pending_manual_review";
  scorePercent: number | null;
  recordedAt: string;
  publicReasonKeys: string[];
}

/** Décision DÉFINITIVE : immuable, versionnée, référencée. Raisons INTERNES exclues (séparées). */
export interface FinalDecision {
  decisionId: string;
  finalStatus: "final_pass" | "final_fail" | "invalidated" | "expired";
  passed: boolean;
  decidedAt: string;
  policyVersion: number;
  curriculumVersion: string;
  quizEngineVersion: number;
  examEngineVersion: number;
  reviewPolicyVersion: number;
  runtimeVersion: number;
  contractVersion: number;
  publicReasonKeys: string[];
  certificationEligibility: boolean;
  examAttemptId: string | null;
}

/** Résultat d'évaluation des reprises (motif public + motif interne séparés). */
export interface RetakeOutcome {
  allowed: boolean;
  attemptsUsed: number;
  attemptsRemaining: number;
  cooldownUntil: string | null;
  exhausted: boolean;
  publicReasonKey: string;
  internalReasonCodes: string[];
}
