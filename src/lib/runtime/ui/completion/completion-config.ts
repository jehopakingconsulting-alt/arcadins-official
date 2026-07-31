/**
 * Runtime — UI/Completion : configuration + politique injectée + scénarios de démonstration (Sprint K3C).
 *
 * SÛR CÔTÉ CLIENT (aucune banque privée). La politique de résultat est INJECTÉE (pas de règle codée en dur
 * propre à Marketing Digital v2). Les scénarios sont synthétiques, déterministes, réservés à la preview/tests.
 */
import type { CompletionInput, CompletionVersions } from "./completion-types.ts";

/**
 * FLAG dédié à l'orchestration de complétion. RESTE `false`. Rendu uniquement dans une preview locale gardée.
 */
export const ASSESSMENT_COMPLETION_RUNTIME_ENABLED = false as const;

/** Politique de résultat (déterministe, injectée). */
export interface ResultPolicyConfig {
  requireAllMandatoryQuizzes: boolean;
  minCompetencyScore: number; // 0..1 (seuil minimal par compétence)
  requireExamPass: boolean;
  treatEliminatoryAsFail: boolean;
}

export const DEFAULT_RESULT_POLICY: ResultPolicyConfig = {
  requireAllMandatoryQuizzes: true,
  minCompetencyScore: 0.5,
  requireExamPass: true,
  treatEliminatoryAsFail: true,
};

export const DEFAULT_COMPLETION_VERSIONS: CompletionVersions = {
  quizEngineVersion: 1,
  examEngineVersion: 1,
  reviewPolicyVersion: 1,
  runtimeVersion: 1,
  contractVersion: 1,
};

/** Scénarios déterministes exposés en preview (états représentatifs). */
export type CompletionScenario =
  | "quiz_pending"
  | "exam_not_eligible"
  | "provisional_pass"
  | "provisional_fail"
  | "manual_review_pending"
  | "retake_available"
  | "retake_exhausted"
  | "final_pass"
  | "final_fail"
  | "suspended";

const BASE_VERSIONS = DEFAULT_COMPLETION_VERSIONS;

function baseInput(): CompletionInput {
  return {
    learnerRefOpaque: "opaque-demo",
    programSlug: "marketing-digital",
    programTitleKey: "completion.program.title",
    curriculumVersion: "v2",
    policyVersion: 1,
    quizzes: [
      { quizId: "q-m1", required: true, attempted: true, passed: true, scorePercent: 82, competencies: ["C1"] },
      { quizId: "q-m2", required: true, attempted: true, passed: true, scorePercent: 76, competencies: ["C2"] },
    ],
    exam: {
      eligible: true,
      eligibilityStatus: "eligible",
      status: "finalized",
      provisionalPassed: true,
      requiresManualReview: false,
      percentage: 84,
      eliminatoryFailure: false,
      finalStatus: "passed",
      finalPassed: true,
      certificateEligibility: true,
      competencies: [
        { competencyId: "C1", score: 0.85, level: "strong", needsRemediation: false },
        { competencyId: "C2", score: 0.7, level: "strong", needsRemediation: false },
      ],
      attemptsUsed: 1,
      maxAttempts: 2,
      lastCompletedAt: null,
      cooldownSeconds: 0,
      expired: false,
      suspended: false,
      administrativeHold: false,
      attemptId: "att-demo-1",
    },
    reviewStatus: "not_required",
    reviewComplete: true,
    versions: BASE_VERSIONS,
  };
}

/** Construit un CompletionInput synthétique déterministe pour un scénario donné. */
export function buildScenarioInput(scenario: CompletionScenario): CompletionInput {
  const input = baseInput();
  switch (scenario) {
    case "quiz_pending":
      input.quizzes[1] = { ...input.quizzes[1], passed: false, attempted: false, scorePercent: 0 };
      input.exam = { ...input.exam, eligible: false, eligibilityStatus: "not_eligible", status: "not_started", provisionalPassed: null, finalStatus: null, finalPassed: null, certificateEligibility: false, percentage: null };
      input.reviewComplete = false;
      return input;
    case "exam_not_eligible":
      input.exam = { ...input.exam, eligible: false, eligibilityStatus: "not_eligible", status: "not_started", provisionalPassed: null, finalStatus: null, finalPassed: null, certificateEligibility: false, percentage: null };
      input.reviewComplete = false;
      return input;
    case "provisional_pass":
      input.exam = { ...input.exam, status: "provisionally_graded", finalStatus: null, finalPassed: null, certificateEligibility: false };
      input.reviewComplete = false;
      return input;
    case "provisional_fail":
      input.exam = { ...input.exam, status: "provisionally_graded", provisionalPassed: false, percentage: 52, finalStatus: null, finalPassed: null, certificateEligibility: false };
      input.reviewComplete = false;
      return input;
    case "manual_review_pending":
      input.exam = { ...input.exam, status: "pending_manual_review", requiresManualReview: true, provisionalPassed: null, finalStatus: null, finalPassed: null, certificateEligibility: false };
      input.reviewStatus = "pending_assignment";
      input.reviewComplete = false;
      return input;
    case "retake_available":
      input.exam = { ...input.exam, status: "finalized", provisionalPassed: false, finalStatus: "failed", finalPassed: false, percentage: 58, certificateEligibility: false, attemptsUsed: 1, maxAttempts: 2 };
      return input;
    case "retake_exhausted":
      input.exam = { ...input.exam, status: "finalized", provisionalPassed: false, finalStatus: "failed", finalPassed: false, percentage: 49, certificateEligibility: false, attemptsUsed: 2, maxAttempts: 2 };
      return input;
    case "final_pass":
      return input; // base = réussite finale
    case "final_fail":
      input.exam = { ...input.exam, provisionalPassed: false, finalStatus: "failed", finalPassed: false, percentage: 44, certificateEligibility: false, attemptsUsed: 2, maxAttempts: 2 };
      return input;
    case "suspended":
      input.exam = { ...input.exam, eligible: false, eligibilityStatus: "suspended", suspended: true, status: "not_started", provisionalPassed: null, finalStatus: null, finalPassed: null, certificateEligibility: false, percentage: null };
      input.reviewComplete = false;
      return input;
    default:
      return input;
  }
}

export const ALL_SCENARIOS: CompletionScenario[] = [
  "quiz_pending", "exam_not_eligible", "provisional_pass", "provisional_fail",
  "manual_review_pending", "retake_available", "retake_exhausted", "final_pass", "final_fail", "suspended",
];
