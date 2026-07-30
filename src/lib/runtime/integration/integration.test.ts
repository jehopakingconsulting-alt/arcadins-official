import { test } from "node:test";
import assert from "node:assert/strict";
// Integration core
import type { AcademicFeatureFlags } from "./config.ts";
import { ACADEMIC_PERSISTENCE_ENABLED, isAcademicPersistenceEnabled } from "./config.ts";
import type { ServerIdentity } from "./types.ts";
import { buildAcademicRequestContext, buildContextIgnoringClientIdentity } from "./request-context.ts";
import { AcademicAuthorizationService } from "./authorization-service.ts";
import { AcademicIdempotencyService } from "./idempotency-service.ts";
import { AcademicConcurrencyService } from "./concurrency-service.ts";
import { AcademicRateLimitService, createInMemoryRateLimitStore } from "./rate-limit-service.ts";
import { AcademicAuditService, redact } from "./audit-service.ts";
import { AcademicAuthenticationError, AcademicValidationError, AcademicFeatureDisabledError } from "./errors.ts";
import { AcademicTransactionManager, createInMemoryExecutor, ConcurrencyConflict, raiseConflict } from "./transaction-manager.ts";
// Repositories
import { createInMemoryRepositories } from "../repositories/in-memory.ts";
import { createMockDbClient, createNoopDbClient } from "../repositories/supabase-client-factory.ts";
import { createSupabaseEnrollmentRepository } from "../repositories/supabase-enrollment-repository.ts";
import { AcademicRepositoryFactory } from "../repositories/factory.ts";
// Server services
import { createServiceEnv } from "../server/service-env.ts";
import { LessonApplicationService } from "../server/lesson-application-service.ts";
import { AssessmentApplicationService } from "../server/assessment-application-service.ts";
import { FinalExamApplicationService } from "../server/final-exam-application-service.ts";
import { CertificationApplicationService } from "../server/certification-application-service.ts";
import { StudentDashboardQueryService } from "../server/student-dashboard-query-service.ts";
// Engines / fixtures
import type { PrivateQuestion, QuestionType, GradingRule } from "../assessment/types.ts";
import type { FinalExamDefinition, ExamEligibilityContext, ExamEligibilityRule, FinalExamVersion } from "../exam/types.ts";
import { InMemoryQuestionBank } from "../assessment/question-bank.ts";
import { createInMemoryRepositories as createCertRepos } from "../certification/in-memory-repository.ts";
import { createCertificationContext, defaultAchievementAttestationPolicy } from "../certification/config.ts";
import { createDefaultHashProvider, createTestSigner } from "../certification/credential-integrity-engine.ts";
import type { CredentialIssuanceRequest, CredentialEligibilityContext } from "../certification/types.ts";

const NOW = new Date("2026-12-01T09:00:00Z");
const FLAGS_ON: AcademicFeatureFlags = { learningRuntime: true, academicPersistence: true, formativeAssessment: true, finalExam: true, certificationEngine: true };
const FLAGS_OFF: AcademicFeatureFlags = { learningRuntime: false, academicPersistence: false, formativeAssessment: false, finalExam: false, certificationEngine: false };

let counter = 0;
function idf(prefix = "id") {
  let n = 0;
  return () => `${prefix}-${counter++}-${n++}`;
}
function identity(overrides: Partial<ServerIdentity> = {}): ServerIdentity {
  return { authenticatedUserId: "U1", learnerId: "L1", enrollmentId: "E1", programId: "P1", programVersionId: "PV1", roles: ["learner"], permissions: [], enrollmentStatus: "active", accessExpiresAt: null, ...overrides };
}
function ctxOf(overrides: Partial<ServerIdentity> = {}, flags = FLAGS_ON) {
  return buildAcademicRequestContext({ identity: identity(overrides), now: NOW, idFactory: idf("ctx"), featureFlags: flags });
}
function envOf(overrides: Partial<ServerIdentity> = {}, flags = FLAGS_ON) {
  const repos = createInMemoryRepositories();
  const env = createServiceEnv({ ctx: ctxOf(overrides, flags), repos, now: NOW, idFactory: idf("e") });
  return { env, repos };
}

// ─────────────────────────── AUTHORIZATION ───────────────────────────
test("auth: requête non authentifiée refusée", () => {
  const d = AcademicAuthorizationService.authorize(ctxOf({ authenticatedUserId: null }), {});
  assert.equal(d.status, "unauthenticated");
});
test("auth: enrollment absent", () => {
  const d = AcademicAuthorizationService.checkEnrollmentAccess(ctxOf({ enrollmentId: null }), NOW);
  assert.equal(d.status, "enrollment_missing");
});
test("auth: enrollment inactif", () => {
  const d = AcademicAuthorizationService.checkEnrollmentAccess(ctxOf({ enrollmentStatus: "inactive" }), NOW);
  assert.equal(d.status, "enrollment_inactive");
});
test("auth: accès expiré", () => {
  const d = AcademicAuthorizationService.checkEnrollmentAccess(ctxOf({ accessExpiresAt: "2020-01-01T00:00:00Z" }), NOW);
  assert.equal(d.status, "access_expired");
});
test("auth: mauvais programme", () => {
  const d = AcademicAuthorizationService.authorize(ctxOf({ programId: "P1" }), { programId: "P2" });
  assert.equal(d.status, "program_mismatch");
});
test("auth: ressource d'un autre étudiant refusée", () => {
  const d = AcademicAuthorizationService.authorize(ctxOf({ learnerId: "L1" }), { ownerLearnerId: "L2" });
  assert.equal(d.status, "resource_not_owned");
});
test("auth: tuteur non assigné refusé, tuteur assigné autorisé", () => {
  const tutor = ctxOf({ roles: ["tutor"], learnerId: null });
  assert.equal(AcademicAuthorizationService.authorize(tutor, { ownerLearnerId: "L9" }).status, "resource_not_owned");
  assert.equal(AcademicAuthorizationService.authorize(tutor, { ownerLearnerId: "L9", assignedLearnerIds: ["L9"] }).allowed, true);
});
test("auth: admin autorisé", () => {
  const d = AcademicAuthorizationService.authorize(ctxOf({ roles: ["administrator"] }), { ownerLearnerId: "L2" });
  assert.equal(d.allowed, true);
});
test("auth: feature flag désactivé refusé", () => {
  const d = AcademicAuthorizationService.authorize(ctxOf({}, FLAGS_OFF), {});
  assert.equal(d.status, "feature_disabled");
});

// ─────────────────────────── REQUEST CONTEXT ───────────────────────────
test("le client ne peut pas imposer learnerId / roles", () => {
  const ctx = buildContextIgnoringClientIdentity({
    identity: identity({ learnerId: "REAL", roles: ["learner"] }),
    clientClaimedIdentity: { learnerId: "HACKED", roles: ["administrator"] },
    now: NOW, idFactory: idf("c"), featureFlags: FLAGS_ON,
  });
  assert.equal(ctx.learnerId, "REAL");
  assert.deepEqual(ctx.roles, ["learner"]);
  assert.equal(ctx.serverTimestamp, NOW.toISOString());
});
test("les indices client (ip/userAgent) sont hachés, jamais bruts", () => {
  const ctx = buildAcademicRequestContext({ identity: identity(), now: NOW, idFactory: idf("c"), hints: { ip: "203.0.113.7", userAgent: "Mozilla/5.0" }, featureFlags: FLAGS_ON });
  assert.notEqual(ctx.ipHash, "203.0.113.7");
  assert.ok(ctx.ipHash && ctx.userAgentHash);
});

// ─────────────────────────── IDEMPOTENCE ───────────────────────────
function beginInput(over: Record<string, unknown> = {}) {
  return { commandId: "c1", idempotencyKey: "k1", commandType: "assessment.submit", actorId: "U1", resourceId: "r1", payload: { a: 1 }, now: NOW, ...over };
}
test("idempotence: même clé + même payload → replay après succès", () => {
  const repo = createInMemoryRepositories().commandIdempotency;
  const first = AcademicIdempotencyService.begin(repo, beginInput());
  assert.equal(first.kind, "fresh");
  AcademicIdempotencyService.succeed(repo, first.record, "res-1", NOW);
  const again = AcademicIdempotencyService.begin(repo, beginInput());
  assert.equal(again.kind, "replay");
  assert.equal(again.record.resultReference, "res-1");
});
test("idempotence: même clé + payload différent → conflit", () => {
  const repo = createInMemoryRepositories().commandIdempotency;
  AcademicIdempotencyService.begin(repo, beginInput());
  const conflict = AcademicIdempotencyService.begin(repo, beginInput({ payload: { a: 2 } }));
  assert.equal(conflict.kind, "conflict");
});
test("idempotence: commande en cours → in_progress", () => {
  const repo = createInMemoryRepositories().commandIdempotency;
  const first = AcademicIdempotencyService.begin(repo, beginInput());
  AcademicIdempotencyService.markProcessing(repo, first.record);
  const again = AcademicIdempotencyService.begin(repo, beginInput());
  assert.equal(again.kind, "in_progress");
});
test("idempotence: échec retryable rejoué relance une tentative", () => {
  const repo = createInMemoryRepositories().commandIdempotency;
  const first = AcademicIdempotencyService.begin(repo, beginInput());
  AcademicIdempotencyService.fail(repo, first.record, true, NOW);
  const retry = AcademicIdempotencyService.begin(repo, beginInput());
  assert.equal(retry.kind, "fresh");
  assert.equal(retry.record.retryCount, 1);
});
test("idempotence: échec final rejoué → conflit", () => {
  const repo = createInMemoryRepositories().commandIdempotency;
  const first = AcademicIdempotencyService.begin(repo, beginInput());
  AcademicIdempotencyService.fail(repo, first.record, false, NOW);
  assert.equal(AcademicIdempotencyService.begin(repo, beginInput()).kind, "conflict");
});
test("idempotence: expiration → nouvelle commande", () => {
  const repo = createInMemoryRepositories().commandIdempotency;
  AcademicIdempotencyService.begin(repo, beginInput());
  const later = new Date(NOW.getTime() + 48 * 3600 * 1000);
  assert.equal(AcademicIdempotencyService.begin(repo, beginInput({ now: later })).kind, "fresh");
});

// ─────────────────────────── CONCURRENCY ───────────────────────────
test("concurrence: version attendue correcte avance, incorrecte = conflit", () => {
  const ok = AcademicConcurrencyService.checkAndAdvance({ version: 3, updatedAt: "" }, 3);
  assert.equal(ok.status, "ok");
  assert.equal(ok.nextVersion, 4);
  const conflict = AcademicConcurrencyService.checkAndAdvance({ version: 3, updatedAt: "" }, 2);
  assert.equal(conflict.status, "conflict");
  assert.equal(conflict.reloadRequired, true);
});
test("concurrence: retry borné", async () => {
  let attempts = 0;
  const res = await AcademicTransactionManager.execute(createInMemoryExecutor(), { maxRetries: 2, critical: true }, async () => {
    attempts++;
    if (attempts < 2) raiseConflict(["X"]);
    return "done";
  });
  assert.equal(res, "done");
  assert.equal(attempts, 2);
});
test("concurrence: conflit persistant propage après retries", async () => {
  await assert.rejects(
    AcademicTransactionManager.execute(createInMemoryExecutor(), { maxRetries: 1, critical: true }, async () => raiseConflict(["X"])),
    (e) => e instanceof ConcurrencyConflict,
  );
});
test("transaction: l'exécuteur mémoire n'affirme pas d'atomicité distribuée", () => {
  assert.equal(createInMemoryExecutor().atomicityGuaranteed, false);
});

// ─────────────────────────── RATE LIMIT ───────────────────────────
test("rate limit: dépassement bloque avec retryAfter", () => {
  const store = createInMemoryRateLimitStore();
  let last;
  for (let i = 0; i < 11; i++) last = AcademicRateLimitService.check(store, "quiz.start", "U1", NOW);
  assert.equal(last!.allowed, false);
  assert.ok(last!.retryAfterSeconds > 0);
});

// ─────────────────────────── ERRORS ───────────────────────────
test("erreurs: réponse publique sans internalMessage/stack, métadonnées filtrées", () => {
  const err = new AcademicValidationError({ correlationId: "corr-1", metadata: { email: "x@y.z", field: "percent" }, reasonCodes: ["BAD"] });
  const failure = err.toApiFailure();
  const blob = JSON.stringify(failure);
  assert.equal(blob.includes("x@y.z"), false);
  assert.equal(blob.includes("internalMessage"), false);
  assert.equal(failure.error.httpStatus, 400);
  assert.equal(failure.correlationId, "corr-1");
});
test("erreurs: auth = 401", () => {
  assert.equal(new AcademicAuthenticationError().httpStatus, 401);
});

// ─────────────────────────── REPOSITORIES ───────────────────────────
test("repo in-memory: contrôle optimiste (conflit de version)", async () => {
  const repos = createInMemoryRepositories();
  const row = { id: "N1", noteId: "N1", ownerLearnerId: "L1", programId: "P1", lessonId: "les1", body: "x", version: 0, updatedAt: NOW.toISOString() };
  const saved = await repos.notes.save(row, null);
  assert.equal(saved.version, 1);
  await assert.rejects(repos.notes.save(saved, 0)); // mauvaise version attendue
  const ok = await repos.notes.save(saved, 1);
  assert.equal(ok.version, 2);
});
test("repo supabase (mock): mapping DB↔domaine + save/find", async () => {
  const db = createMockDbClient();
  const repo = createSupabaseEnrollmentRepository(db);
  const saved = await repo.save({ id: "EN1", userId: "U1", learnerId: "L1", programId: "P1", programVersionId: "PV1", status: "active", accessExpiresAt: null, version: 0, updatedAt: NOW.toISOString() }, null);
  assert.equal(saved.version, 1);
  // La ligne DB est en snake_case.
  const raw = db.dump("enrollments")[0];
  assert.ok("user_id" in raw && "program_version_id" in raw);
  const found = await repo.findByUserAndProgram("U1", "P1");
  assert.equal(found?.id, "EN1");
});
test("repo: not found renvoie null", async () => {
  const repos = createInMemoryRepositories();
  assert.equal(await repos.lessonProgress.get("nope"), null);
});
test("factory: persistance OFF ne branche jamais Supabase (mémoire)", () => {
  const repos = AcademicRepositoryFactory.create({ persistenceEnabled: false, mode: "supabase", db: createMockDbClient() });
  assert.ok(repos.commandIdempotency);
});

// ─────────────────────────── LESSONS ───────────────────────────
test("lessons: start → progress → complete refusé puis autorisé (serveur autoritaire)", async () => {
  const { env } = envOf();
  await LessonApplicationService.startLesson(env, "les1");
  await LessonApplicationService.saveProgress(env, "les1", { percent: 40, timeDeltaSeconds: 120 });
  const denied = await LessonApplicationService.completeLesson(env, "les1", { serverPercent: 40, requiredExercisePassed: false });
  assert.equal(denied.status, "denied");
  const ok = await LessonApplicationService.completeLesson(env, "les1", { serverPercent: 100, requiredExercisePassed: true });
  assert.equal(ok.status, "completed");
  assert.equal(ok.progress.completed, true);
});
test("lessons: le client ne peut pas forcer un pourcentage hors bornes", async () => {
  const { env } = envOf();
  await LessonApplicationService.startLesson(env, "les1");
  const saved = await LessonApplicationService.saveProgress(env, "les1", { percent: 9999, timeDeltaSeconds: -50 });
  // temps borné à ≥0 (delta négatif ignoré) ; le pourcentage n'est pas stocké comme complétion.
  assert.equal(saved.timeSpentSeconds, 0);
  assert.equal(saved.completed, false);
});
test("lessons: note/bookmark d'un autre apprenant non supprimables", async () => {
  const { env, repos } = envOf();
  const noteId = await LessonApplicationService.addNote(env, { lessonId: "les1", body: "hello" });
  // Un autre apprenant (contexte différent) tente la suppression.
  const other = createServiceEnv({ ctx: ctxOf({ learnerId: "L2" }), repos, now: NOW, idFactory: idf("o") });
  await LessonApplicationService.removeNote(other, noteId);
  assert.equal((await repos.notes.listByLearner("L1")).length, 1); // toujours présente
});
test("lessons: flag OFF → feature disabled", async () => {
  const { env } = envOf({}, FLAGS_OFF);
  await assert.rejects(LessonApplicationService.startLesson(env, "les1"), (e) => e instanceof AcademicFeatureDisabledError);
});

// ─────────────────────────── ASSESSMENTS ───────────────────────────
function q(id: string, correct: string): PrivateQuestion {
  return { id, version: 1, type: "single" as QuestionType, difficulty: "medium", prompt: id, options: [{ id: "o0", label: "A" }, { id: "o1", label: "B" }], points: 1, grading: { kind: "single", correctOptionId: correct } as GradingRule, competencyId: "c1", moduleId: "m1", status: "active", privateExplanation: "secret" };
}
test("assessments: création → session publique SANS bonnes réponses", async () => {
  const { env } = envOf();
  const def = { id: "a1", programId: "P1", version: 1, selection: { count: 2 } };
  const { session, attemptId } = await AssessmentApplicationService.createAttempt(env, def, [q("q1", "o1"), q("q2", "o0")], 7);
  const blob = JSON.stringify(session);
  assert.equal(blob.includes("correctOptionId"), false);
  assert.equal(blob.includes("secret"), false);
  assert.ok(attemptId);
});
test("assessments: correction SERVEUR (score calculé côté serveur), reprise idempotente", async () => {
  const { env } = envOf();
  const def = { id: "a1", programId: "P1", version: 1, selection: { count: 2 } };
  const { attemptId } = await AssessmentApplicationService.createAttempt(env, def, [q("q1", "o1"), q("q2", "o0")], 7);
  await AssessmentApplicationService.saveAnswer(env, attemptId, { questionId: "q1", value: "o1" });
  await AssessmentApplicationService.saveAnswer(env, attemptId, { questionId: "q2", value: "o0" });
  const r1 = await AssessmentApplicationService.submit(env, attemptId, "cmd-sub");
  assert.equal(r1.percentage, 100);
  assert.equal(r1.passed, true);
  const r2 = await AssessmentApplicationService.submit(env, attemptId, "cmd-sub"); // rejeu
  assert.equal(r2.percentage, 100);
});

// ─────────────────────────── EXAMS ───────────────────────────
const EXAM_VERSION: FinalExamVersion = { examVersion: 1, questionsVersion: 1, bankVersion: 1, rubricsVersion: 1, gradingVersion: 1, eligibilityVersion: 1, navigationVersion: 1, accommodationVersion: 1, passThresholdVersion: 1 };
const EXAM_RULE: ExamEligibilityRule = { requireActiveEnrollment: false, requireProgramAccessible: false, requiredModuleIds: [], minimumProgressPercent: 0, requiredPassedQuizIds: [], requireFinalProjectSubmitted: false, requireFinalProjectApproved: false, forbidAdministrativeHold: false, minimumAvailableAttempts: 0, mandatoryCooldownSeconds: 0, requireExamWindowOpen: false, requiredPrerequisiteSkillIds: [], version: 1 };
function examDef(): FinalExamDefinition {
  return {
    examId: "EX1", programId: "P1", version: EXAM_VERSION, status: "active",
    sections: [{ id: "sA", titleKey: "t", selection: { count: 1, moduleId: "sA" }, weight: 1 }],
    durationLimitSeconds: 3600, passThresholdPercent: 70,
    navigation: { mode: "sequential", allowBacktrack: false, lockSectionAfterComplete: true, questionOrder: "stable", requireAllAnswered: false, allowPartialSubmission: true, requireConfirmationBeforeSubmit: true, version: 1 },
    retake: { maximumAttempts: 2, cooldownSeconds: 0, requiresAuthorization: true, version: 1 },
    grading: { passThresholdPercent: 70, sectionThresholds: {}, eliminatorySectionIds: [], weighting: "by_section", penalties: { perIncorrect: 0 }, bonusEnabled: false, ignoreAccents: true, version: 1 },
    eligibilityRule: EXAM_RULE, accommodationPolicy: { allowed: [], version: 1 }, humanReviewRequired: false, activatedAt: "2026-01-01T00:00:00Z", retiredAt: null,
  };
}
function examEligCtx(): ExamEligibilityContext {
  return { enrollmentActive: true, programAccessible: true, completedModuleIds: [], progressPercent: 100, passedQuizIds: [], finalProjectSubmitted: true, finalProjectApproved: true, administrativeHold: false, availableAttempts: 2, lastAttemptCompletedAt: null, examWindowOpen: true, satisfiedPrerequisiteSkillIds: [], specialApproval: null };
}
test("exams: le chronomètre officiel est fondé sur l'horloge SERVEUR (pas le navigateur)", async () => {
  const { env } = envOf();
  const bank = new InMemoryQuestionBank([q("sA-1", "o1")].map((x) => ({ ...x, moduleId: "sA" })));
  const { session } = await FinalExamApplicationService.startExam(env, examDef(), bank, examEligCtx(), 5, "cmd-start");
  assert.equal(session.timer.officialStartedAt, NOW.toISOString());
});
test("exams: soumission tardive expire via l'horloge serveur (auto-submit)", async () => {
  const { env, repos } = envOf();
  const bank = new InMemoryQuestionBank([q("sA-1", "o1")].map((x) => ({ ...x, moduleId: "sA" })));
  await FinalExamApplicationService.startExam(env, examDef(), bank, examEligCtx(), 5, "cmd-start");
  const sessionId = (await repos.examSessions.listByLearner("L1"))[0].sessionId;
  const later = createServiceEnv({ ctx: ctxOf(), repos, now: new Date(NOW.getTime() + 3700 * 1000), idFactory: idf("l") });
  const r = await FinalExamApplicationService.submit(later, sessionId, "cmd-sub");
  assert.ok(["submitted", "provisionally_graded", "pending_manual_review"].includes(r.session.status));
});

// ─────────────────────────── CERTIFICATION ───────────────────────────
function issuanceRequest(): CredentialIssuanceRequest {
  const fr = {
    learnerReference: "L1", programId: "P1", examId: "EX1", examVersion: EXAM_VERSION, attemptId: "att-1",
    finalStatus: "passed" as const, finalScore: 2, passed: true, finalizedAt: "2026-11-30T10:00:00Z",
    sectionResults: [{ sectionId: "sA", earnedPoints: 2, maximumPoints: 2, weightedScore: 1, percentage: 100, passed: true, eliminatory: false, requiresManualReview: false }],
    integrityStatus: "clean" as const, reviewStatus: "not_required" as const, certificateEligibility: true, reasonCodes: ["FINAL_PASS"], auditReference: "a",
  };
  const eligibilityContext: CredentialEligibilityContext = { finalResult: fr, learnerDisplayName: "Jean Exemple", learnerReference: "L1", programAdmissibleForIssuance: true, fullProgressCompleted: true, finalProjectValidated: true, administrativeDebtBlocking: false, documentTitleAuthorized: true, specialApproval: null, existingActiveIssuanceKey: null };
  return { commandId: "cmd-issue", credentialType: "achievement_attestation", policy: defaultAchievementAttestationPolicy("P1"), eligibilityContext, language: "fr", issuerName: "ARCADINS", issuerDisplayName: "ARCADINS", authorizedSignatoryReferences: ["sig"], programTitle: "P1 Title", programVersion: 1 };
}
test("certification: émission serveur puis miroir en persistance académique", async () => {
  const { env, repos } = envOf();
  const cctx = createCertificationContext({ now: NOW, hashProvider: createDefaultHashProvider(), signer: createTestSigner({ keyId: "k1", secret: "S" }) });
  const credRepos = createCertRepos();
  const res = await CertificationApplicationService.issue(env, issuanceRequest(), cctx, credRepos);
  assert.ok(res.publicView);
  assert.equal(res.issued, true);
  assert.equal((await repos.credentials.listByLearner("L1")).length, 1);
});
test("certification: double émission (même réussite) ne crée pas de second credential", async () => {
  const { env, repos } = envOf();
  const cctx = createCertificationContext({ now: NOW, hashProvider: createDefaultHashProvider(), signer: createTestSigner({ keyId: "k1", secret: "S" }) });
  const credRepos = createCertRepos();
  await CertificationApplicationService.issue(env, issuanceRequest(), cctx, credRepos);
  await CertificationApplicationService.issue(env, { ...issuanceRequest(), commandId: "cmd-2" }, cctx, credRepos);
  assert.equal((await repos.credentials.listByLearner("L1")).length, 1);
});

// ─────────────────────────── DASHBOARD (read-only) ───────────────────────────
test("dashboard: agrège la progression de l'apprenant courant uniquement", async () => {
  const { env } = envOf();
  await LessonApplicationService.startLesson(env, "les1");
  const view = await StudentDashboardQueryService.build(env);
  assert.equal(view.learnerId, "L1");
  assert.ok(Array.isArray(view.modules));
});

// ─────────────────────────── SÉCURITÉ ───────────────────────────
test("sécurité: le flag global est OFF et gate la persistance", () => {
  assert.equal(ACADEMIC_PERSISTENCE_ENABLED, false);
  assert.equal(isAcademicPersistenceEnabled(FLAGS_OFF), false);
});
test("sécurité: client no-op refuse toute opération (pas de service-role côté client)", () => {
  const db = createNoopDbClient();
  assert.throws(() => db.select("t", {}), /ACADEMIC_PERSISTENCE_DISABLED/);
});
test("sécurité: audit redacte les bonnes réponses / secrets", () => {
  const redacted = redact({ correctOptionId: "o1", token: "abc", nested: { secret: "x", ok: 1 } }) as Record<string, unknown>;
  assert.equal(redacted.correctOptionId, "[redacted]");
  assert.equal(redacted.token, "[redacted]");
  assert.equal((redacted.nested as Record<string, unknown>).secret, "[redacted]");
  const ev = AcademicAuditService.event("assessment.graded", { at: NOW.toISOString(), actorId: "U1", correlationId: "c", metadata: { correctOptionId: "o1", percentage: 80 } });
  assert.equal(AcademicAuditService.isClean(ev), true);
});
test("sécurité: aucune source de vérité client — score/progression calculés serveur", async () => {
  // completeLesson ignore toute prétention client ; seule l'évidence serveur décide.
  const { env } = envOf();
  await LessonApplicationService.startLesson(env, "les1");
  const denied = await LessonApplicationService.completeLesson(env, "les1", { serverPercent: 0, requiredExercisePassed: true });
  assert.equal(denied.status, "denied");
});
