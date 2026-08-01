/**
 * Runtime — Assessment : AttemptManager (Sprint F).
 *
 * Cycle de vie PUR d'une tentative + construction de la session PUBLIQUE (sans réponses). Immuable.
 */
import type {
  AssessmentAttempt,
  AssessmentPolicy,
  AssessmentSession,
  AttemptStatus,
  PrivateQuestion,
} from "./types.ts";
import { toPublicQuestions } from "./public-serializer.ts";
import { sessionChecksum } from "./assessment-integrity.ts";
import { AssessmentPolicyEngine } from "./assessment-policy-engine.ts";

export interface CreateAttemptInput {
  id: string;
  assessmentId: string;
  learnerRef: string;
  programId: string;
  moduleId?: string;
  lessonId?: string;
  attemptNumber: number;
  policy: AssessmentPolicy;
  seed: number;
  questions: PrivateQuestion[];
  previousAttemptId?: string | null;
  now: Date;
}

export const AttemptManager = {
  /** Crée une tentative « in_progress » avec questions figées (copie profonde). */
  create(input: CreateAttemptInput): AssessmentAttempt {
    const startedAt = input.now.toISOString();
    const expiresAt = AssessmentPolicyEngine.expiryOf(startedAt, input.policy);
    return {
      id: input.id,
      assessmentId: input.assessmentId,
      learnerRef: input.learnerRef,
      programId: input.programId,
      moduleId: input.moduleId,
      lessonId: input.lessonId,
      attemptNumber: input.attemptNumber,
      maxAttempts: input.policy.attempts.maxAttempts,
      remainingAttempts: Math.max(0, input.policy.attempts.maxAttempts - input.attemptNumber),
      status: "in_progress",
      startedAt,
      submittedAt: null,
      completedAt: null,
      expiresAt,
      durationLimitSeconds: input.policy.timing.durationLimitSeconds,
      elapsedSeconds: 0,
      previousAttemptId: input.previousAttemptId ?? null,
      submittedCommandId: null,
      policyVersion: input.policy.version,
      seed: input.seed,
      questions: input.questions.map((q) => structuredClone(q)), // figées (versionnées)
      responses: {},
      result: null,
    };
  },

  withStatus(attempt: AssessmentAttempt, status: AttemptStatus): AssessmentAttempt {
    return { ...attempt, status };
  },

  /** Construit la session publique (aucune réponse correcte, checksum inclus). */
  buildSession(attempt: AssessmentAttempt, now: Date): AssessmentSession {
    const publicQuestions = toPublicQuestions(attempt.questions);
    const order = attempt.questions.map((q) => q.id);
    const base: Omit<AssessmentSession, "checksum"> = {
      assessmentId: attempt.assessmentId,
      attemptId: attempt.id,
      learnerRefOpaque: attempt.learnerRef,
      programId: attempt.programId,
      moduleId: attempt.moduleId,
      lessonId: attempt.lessonId,
      status: attempt.status,
      publicQuestions,
      responses: { ...attempt.responses },
      navigationState: { currentIndex: 0, visited: [], order },
      timingState: { startedAt: attempt.startedAt, expiresAt: attempt.expiresAt, elapsedSeconds: AssessmentPolicyEngine.elapsedSeconds(attempt.startedAt, now) },
      progress: { answered: Object.keys(attempt.responses).length, total: publicQuestions.length },
      integrityState: { checksum: "", version: attempt.policyVersion, warnings: [] },
      version: attempt.policyVersion,
      createdAt: attempt.startedAt ?? now.toISOString(),
      updatedAt: now.toISOString(),
    };
    const checksum = sessionChecksum(base);
    return { ...base, checksum, integrityState: { ...base.integrityState, checksum } };
  },
};
