/**
 * Runtime — Server : StudentDashboardQueryService (Sprint I).
 *
 * Modèle de LECTURE consolidé (read-only). Aucune logique métier ni écriture : agrège la progression, l'activité,
 * les quiz/examens (scores autorisés uniquement), badges et certificats de l'apprenant courant. Ne renvoie jamais
 * de donnée d'un autre étudiant, ni de bonne réponse, ni de score privé non autorisé.
 */
import type { ServiceEnv } from "./service-env.ts";
import { requireAuthorized } from "./service-env.ts";
import { AcademicValidationError } from "../integration/errors.ts";

export interface StudentDashboardView {
  learnerId: string;
  programId: string | null;
  overallPercent: number;
  modules: { moduleId: string; percent: number; completed: boolean }[];
  currentLessonId: string | null;
  nextLessonId: string | null;
  totalTimeSeconds: number;
  recentActivity: { type: string; at: string }[];
  assessments: { attemptId: string; percentage: number; passed: boolean }[];
  exams: { sessionId: string; finalStatus: string; passed: boolean }[];
  badges: { publicVerificationId: string; status: string }[];
  credentials: { publicVerificationId: string; documentNumber: string; status: string }[];
}

export const StudentDashboardQueryService = {
  async build(env: ServiceEnv): Promise<StudentDashboardView> {
    requireAuthorized(env, { requiresFeature: "academicPersistence" });
    const learnerId = env.ctx.learnerId;
    if (!learnerId) throw new AcademicValidationError({ correlationId: env.ctx.correlationId, reasonCodes: ["NO_LEARNER"] });

    const [lessonProgress, moduleProgress, attempts, sessions, badges, credentials, studySessions, events] = await Promise.all([
      env.repos.lessonProgress.listByLearner(learnerId),
      env.repos.moduleProgress.listByLearner(learnerId),
      env.repos.assessmentAttempts.listByLearner(learnerId),
      env.repos.examSessions.listByLearner(learnerId),
      env.repos.badges.listByLearner(learnerId),
      env.repos.credentials.listByLearner(learnerId),
      env.repos.studySessions.listByLearner(learnerId),
      env.repos.learningEvents.listByLearner(learnerId),
    ]);

    const assessments = await Promise.all(
      attempts.map(async (a) => {
        const sub = await env.repos.assessmentSubmissions.findByAttempt(a.attemptId);
        return { attemptId: a.attemptId, percentage: sub?.percentage ?? 0, passed: sub?.passed ?? false };
      }),
    );

    const modules = moduleProgress.map((m) => ({ moduleId: m.moduleId, percent: m.percent, completed: m.completed }));
    const overallPercent = modules.length > 0 ? Math.round(modules.reduce((a, m) => a + m.percent, 0) / modules.length) : 0;
    const inProgress = lessonProgress.filter((l) => !l.completed).sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
    const totalTimeSeconds = lessonProgress.reduce((a, l) => a + l.timeSpentSeconds, 0) + studySessions.reduce((a, s) => a + s.seconds, 0);

    return {
      learnerId,
      programId: env.ctx.programId,
      overallPercent,
      modules,
      currentLessonId: inProgress[0]?.lessonId ?? null,
      nextLessonId: inProgress[1]?.lessonId ?? null,
      totalTimeSeconds,
      recentActivity: events.slice(-10).map((e) => ({ type: e.type, at: e.at })),
      assessments,
      exams: sessions.map((s) => ({ sessionId: s.sessionId, finalStatus: s.status, passed: false })),
      badges: badges.map((b) => ({ publicVerificationId: b.publicVerificationId, status: b.status })),
      credentials: credentials.map((c) => ({ publicVerificationId: c.publicVerificationId, documentNumber: c.documentNumber, status: c.status })),
    };
  },
};
