/**
 * Runtime — Server : FinalExamApplicationService (Sprint I).
 *
 * Compose le moteur d'examen final (Sprint G) avec la persistance. Le CHRONOMÈTRE est autoritaire côté serveur :
 * `ctx.now = env.now` (horloge serveur injectée) — l'heure du navigateur n'est jamais la source de vérité.
 * L'état privé (sections figées, barème) reste serveur ; le client ne reçoit que la session publique.
 */
import type { ServiceEnv } from "./service-env.ts";
import { audit, requireAuthorized } from "./service-env.ts";
import { AcademicNotFoundError, AcademicAuthorizationError, AcademicValidationError } from "../integration/errors.ts";
import type { ExamSessionRow } from "../repositories/contracts.ts";
import type { ExamAttempt, ExamSession, FinalExamDefinition, ExamEligibilityContext, StudentResponse } from "../../runtime/exam/types.ts";
import type { QuestionBank } from "../../runtime/assessment/question-bank.ts";
import { FinalExamEngine } from "../../runtime/exam/final-exam-engine.ts";
import { ExamEligibilityEngine } from "../../runtime/exam/eligibility-engine.ts";
import { createExamContext } from "../../runtime/exam/config.ts";
import { containsForbiddenKeys } from "../../runtime/exam/secure-exam-serializer.ts";

function learner(env: ServiceEnv): string {
  if (!env.ctx.learnerId) throw new AcademicValidationError({ correlationId: env.ctx.correlationId, reasonCodes: ["NO_LEARNER"] });
  return env.ctx.learnerId;
}
function examCtx(env: ServiceEnv, seed: number) {
  return createExamContext({ now: env.now, seed, idFactory: env.idFactory });
}

export const FinalExamApplicationService = {
  /** Vérifie l'admissibilité (serveur), crée puis démarre la session unique. */
  async startExam(env: ServiceEnv, definition: FinalExamDefinition, bank: QuestionBank, eligibilityContext: ExamEligibilityContext, seed: number, commandId: string): Promise<{ session: ExamSession }> {
    requireAuthorized(env, { programId: definition.programId, requiresFeature: "finalExam" });
    const learnerId = learner(env);
    const cctx = examCtx(env, seed);
    const eligibility = ExamEligibilityEngine.evaluate(definition.eligibilityRule, eligibilityContext, env.now);
    audit(env, "exam.eligibility_checked", { resourceId: definition.examId, reasonCodes: eligibility.reasonCodes });
    if (!ExamEligibilityEngine.isAdmissible(eligibility)) throw new AcademicAuthorizationError({ correlationId: env.ctx.correlationId, reasonCodes: eligibility.reasonCodes });

    const created = FinalExamEngine.createSession({ definition, bank, learnerRef: learnerId, attemptNumber: 1, eligibility }, commandId, cctx);
    const started = FinalExamEngine.start(created.attempt, `${commandId}:start`, examCtx(env, seed));
    await persistSession(env, started.attempt, definition);
    audit(env, "exam.started", { resourceId: started.attempt.sessionId });
    if (containsForbiddenKeys(started.session)) throw new AcademicValidationError({ correlationId: env.ctx.correlationId, reasonCodes: ["ANSWER_LEAK"] });
    return { session: started.session };
  },

  async saveAnswer(env: ServiceEnv, sessionId: string, response: StudentResponse, commandId: string): Promise<ExamSession> {
    requireAuthorized(env, { requiresFeature: "finalExam" });
    const { attempt, definition } = await loadSession(env, sessionId);
    const r = FinalExamEngine.saveAnswer(attempt, response, commandId, examCtx(env, definition ? 1 : 1));
    await persistSession(env, r.attempt, definition);
    return r.session;
  },

  /** Soumission finale : le chronomètre serveur (`env.now`) décide de l'expiration/auto-soumission. */
  async submit(env: ServiceEnv, sessionId: string, commandId: string): Promise<{ session: ExamSession; requiresManualReview: boolean }> {
    requireAuthorized(env, { requiresFeature: "finalExam" });
    const { attempt, definition } = await loadSession(env, sessionId);
    const r = FinalExamEngine.submit(attempt, commandId, examCtx(env, 1));
    await persistSession(env, r.attempt, definition);
    const requiresManualReview = r.attempt.provisionalResult?.gradingResult.requiresManualReview ?? false;
    await env.repos.examSubmissions.save(
      { id: env.idFactory(), ownerLearnerId: learner(env), programId: definition.programId, sessionId, finalStatus: r.attempt.status, passed: r.attempt.provisionalResult?.gradingResult.passedAutomatically ?? false, version: 0, updatedAt: env.now.toISOString() },
      null,
    ).catch(() => undefined);
    audit(env, "exam.submitted", { resourceId: sessionId });
    if (containsForbiddenKeys(r.session)) throw new AcademicValidationError({ correlationId: env.ctx.correlationId, reasonCodes: ["ANSWER_LEAK"] });
    return { session: r.session, requiresManualReview };
  },
};

async function persistSession(env: ServiceEnv, attempt: ExamAttempt, definition: FinalExamDefinition): Promise<void> {
  const existing = await env.repos.examSessions.findBySessionId(attempt.sessionId);
  const row: ExamSessionRow = {
    id: attempt.sessionId, sessionId: attempt.sessionId, ownerLearnerId: attempt.learnerRef, programId: definition.programId,
    examId: attempt.examId, status: attempt.status, privateStateJson: JSON.stringify({ attempt, definition }),
    version: existing?.version ?? 0, updatedAt: env.now.toISOString(),
  };
  await env.repos.examSessions.save(row, existing ? existing.version : null);
}

async function loadSession(env: ServiceEnv, sessionId: string): Promise<{ attempt: ExamAttempt; definition: FinalExamDefinition }> {
  const row = await env.repos.examSessions.findBySessionId(sessionId);
  if (!row) throw new AcademicNotFoundError({ correlationId: env.ctx.correlationId, reasonCodes: ["SESSION_NOT_FOUND"] });
  if (row.ownerLearnerId !== env.ctx.learnerId && !env.ctx.roles.includes("administrator") && !env.ctx.roles.includes("server_service")) {
    throw new AcademicAuthorizationError({ correlationId: env.ctx.correlationId, reasonCodes: ["RESOURCE_NOT_OWNED"] });
  }
  return JSON.parse(row.privateStateJson) as { attempt: ExamAttempt; definition: FinalExamDefinition };
}
