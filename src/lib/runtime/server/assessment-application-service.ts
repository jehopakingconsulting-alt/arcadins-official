/**
 * Runtime — Server : AssessmentApplicationService (Sprint I).
 *
 * Compose le moteur d'évaluation formative (Sprint F) avec la persistance. La DÉFINITION privée (barème,
 * questions figées) est stockée serveur (`privateStateJson`) ; le client ne reçoit QUE la session publique.
 * La correction est faite côté serveur. Aucune clé de correction n'atteint le client.
 */
import type { ServiceEnv } from "./service-env.ts";
import { audit, requireAuthorized } from "./service-env.ts";
import { AcademicNotFoundError, AcademicValidationError } from "../integration/errors.ts";
import type { AssessmentAttemptRow } from "../repositories/contracts.ts";
import type { AssessmentDefinition, AssessmentAttempt, AssessmentSession, StudentResponse } from "../../runtime/assessment/types.ts";
import { InMemoryQuestionBank } from "../../runtime/assessment/question-bank.ts";
import type { PrivateQuestion } from "../../runtime/assessment/types.ts";
import { AssessmentEngine } from "../../runtime/assessment/assessment-engine.ts";
import { AttemptManager } from "../../runtime/assessment/attempt-manager.ts";
import { createAssessmentContext } from "../../runtime/assessment/config.ts";
import { containsForbiddenKeys } from "../../runtime/assessment/public-serializer.ts";

function learner(env: ServiceEnv): string {
  if (!env.ctx.learnerId) throw new AcademicValidationError({ correlationId: env.ctx.correlationId, reasonCodes: ["NO_LEARNER"] });
  return env.ctx.learnerId;
}

export const AssessmentApplicationService = {
  /** Crée une tentative : sélectionne les questions (serveur), persiste l'état privé, renvoie la session publique. */
  async createAttempt(env: ServiceEnv, def: AssessmentDefinition, questions: PrivateQuestion[], seed: number): Promise<{ session: AssessmentSession; attemptId: string }> {
    requireAuthorized(env, { programId: def.programId, requiresFeature: "formativeAssessment" });
    const learnerId = learner(env);
    const bank = new InMemoryQuestionBank(questions);
    const ctx = createAssessmentContext({ now: env.now, seed, idFactory: env.idFactory });
    const res = AssessmentEngine.createAttempt({ definition: def, bank, learnerRef: learnerId, priorAttempts: 0, ctx });
    await persistAttempt(env, res.attempt, def);
    audit(env, "assessment.started", { resourceId: res.attempt.id });
    // Garde de sécurité : la session publique ne doit jamais contenir de barème.
    if (containsForbiddenKeys(res.session)) throw new AcademicValidationError({ correlationId: env.ctx.correlationId, reasonCodes: ["ANSWER_LEAK"] });
    return { session: res.session, attemptId: res.attempt.id };
  },

  async saveAnswer(env: ServiceEnv, attemptId: string, response: StudentResponse): Promise<AssessmentSession> {
    requireAuthorized(env, { requiresFeature: "formativeAssessment" });
    const { attempt, def, session } = await loadAttempt(env, attemptId);
    const ctx = createAssessmentContext({ now: env.now, seed: attempt.seed, idFactory: env.idFactory });
    const r = AssessmentEngine.saveAnswer(attempt, session, response, ctx);
    await persistAttempt(env, r.attempt, def);
    audit(env, "assessment.answer_saved", { resourceId: attemptId });
    return r.session;
  },

  /** Soumet et corrige CÔTÉ SERVEUR. Le résultat public ne contient jamais les bonnes réponses. */
  async submit(env: ServiceEnv, attemptId: string, commandId: string): Promise<{ session: AssessmentSession; percentage: number; passed: boolean }> {
    requireAuthorized(env, { requiresFeature: "formativeAssessment" });
    const { attempt, def, session } = await loadAttempt(env, attemptId);
    const ctx = createAssessmentContext({ now: env.now, seed: attempt.seed, idFactory: env.idFactory });
    const r = AssessmentEngine.submit(attempt, session, commandId, ctx);
    await persistAttempt(env, r.attempt, def);
    if (r.result) {
      await env.repos.assessmentSubmissions.save(
        { id: env.idFactory(), ownerLearnerId: learner(env), programId: def.programId, attemptId, percentage: r.result.percentage, passed: r.result.passed, version: 0, updatedAt: env.now.toISOString() },
        null,
      ).catch(() => undefined);
      audit(env, "assessment.graded", { resourceId: attemptId, metadata: { percentage: r.result.percentage } });
    }
    if (containsForbiddenKeys(r.session)) throw new AcademicValidationError({ correlationId: env.ctx.correlationId, reasonCodes: ["ANSWER_LEAK"] });
    return { session: r.session, percentage: r.result?.percentage ?? 0, passed: r.result?.passed ?? false };
  },
};

async function persistAttempt(env: ServiceEnv, attempt: AssessmentAttempt, def: AssessmentDefinition): Promise<void> {
  const existing = await env.repos.assessmentAttempts.findByAttemptId(attempt.id);
  const row: AssessmentAttemptRow = {
    id: attempt.id, attemptId: attempt.id, ownerLearnerId: attempt.learnerRef, programId: def.programId,
    assessmentId: def.id, status: attempt.status, privateStateJson: JSON.stringify({ attempt, def }), submittedCommandId: attempt.submittedCommandId,
    version: existing?.version ?? 0, updatedAt: env.now.toISOString(),
  };
  await env.repos.assessmentAttempts.save(row, existing ? existing.version : null);
}

async function loadAttempt(env: ServiceEnv, attemptId: string): Promise<{ attempt: AssessmentAttempt; def: AssessmentDefinition; session: AssessmentSession }> {
  const row = await env.repos.assessmentAttempts.findByAttemptId(attemptId);
  if (!row) throw new AcademicNotFoundError({ correlationId: env.ctx.correlationId, reasonCodes: ["ATTEMPT_NOT_FOUND"] });
  if (row.ownerLearnerId !== env.ctx.learnerId && !env.ctx.roles.includes("administrator") && !env.ctx.roles.includes("server_service")) {
    throw new AcademicValidationError({ correlationId: env.ctx.correlationId, reasonCodes: ["RESOURCE_NOT_OWNED"] });
  }
  const parsed = JSON.parse(row.privateStateJson) as { attempt: AssessmentAttempt; def: AssessmentDefinition };
  const session = AttemptManager.buildSession(parsed.attempt, env.now);
  return { attempt: parsed.attempt, def: parsed.def, session };
}
