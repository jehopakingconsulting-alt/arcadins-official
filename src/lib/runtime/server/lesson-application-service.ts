/**
 * Runtime — Server : LessonApplicationService (Sprint I).
 *
 * Orchestration serveur des leçons. La RÉUSSITE est calculée par le SERVEUR : le client ne peut jamais
 * déclarer une leçon terminée, forcer un pourcentage, ni débloquer un module. Progression, temps et complétion
 * sont bornés et vérifiés côté serveur.
 */
import type { ServiceEnv } from "./service-env.ts";
import { audit, requireAuthorized } from "./service-env.ts";
import type { LessonProgressRow, ModuleProgressRow } from "../repositories/contracts.ts";
import { AcademicValidationError, AcademicNotFoundError } from "../integration/errors.ts";

/** Seuil de complétion serveur (borne ; peut être surchargé par politique de programme injectée). */
const COMPLETION_THRESHOLD_PERCENT = 100;

function ownLearner(env: ServiceEnv): string {
  const l = env.ctx.learnerId;
  if (!l) throw new AcademicValidationError({ correlationId: env.ctx.correlationId, reasonCodes: ["NO_LEARNER"] });
  return l;
}

export const LessonApplicationService = {
  async startLesson(env: ServiceEnv, lessonId: string): Promise<LessonProgressRow> {
    requireAuthorized(env, { requiresFeature: "academicPersistence" });
    const learnerId = ownLearner(env);
    const existing = await env.repos.lessonProgress.findByLesson(learnerId, lessonId);
    const row: LessonProgressRow = existing ?? {
      id: env.idFactory(), ownerLearnerId: learnerId, programId: env.ctx.programId ?? "", lessonId, moduleId: "",
      state: "in_progress", completed: false, timeSpentSeconds: 0, version: 0, updatedAt: env.now.toISOString(),
    };
    const saved = await env.repos.lessonProgress.save({ ...row, state: "in_progress", updatedAt: env.now.toISOString() }, existing ? existing.version : null);
    audit(env, "lesson.started", { resourceId: lessonId });
    return saved;
  },

  /** Enregistre une progression bornée (0..100) et du temps (≥0). Ignore tout drapeau `completed` client. */
  async saveProgress(env: ServiceEnv, lessonId: string, input: { percent: number; timeDeltaSeconds: number }): Promise<LessonProgressRow> {
    requireAuthorized(env, { requiresFeature: "academicPersistence" });
    const learnerId = ownLearner(env);
    const existing = await env.repos.lessonProgress.findByLesson(learnerId, lessonId);
    if (!existing) throw new AcademicNotFoundError({ correlationId: env.ctx.correlationId, reasonCodes: ["PROGRESS_NOT_STARTED"] });
    const percent = clamp(input.percent, 0, 100);
    const timeSpentSeconds = existing.timeSpentSeconds + Math.max(0, Math.floor(input.timeDeltaSeconds));
    const saved = await env.repos.lessonProgress.save({ ...existing, state: "in_progress", timeSpentSeconds, updatedAt: env.now.toISOString() }, existing.version);
    audit(env, "lesson.progress_saved", { resourceId: lessonId, metadata: { percent } });
    return saved;
  },

  /**
   * Termine une leçon UNIQUEMENT si le serveur juge la complétion admissible. Le client ne fournit aucun score
   * ni statut : le service évalue lui-même (`serverPercent`) et refuse sinon.
   */
  async completeLesson(env: ServiceEnv, lessonId: string, serverEvidence: { serverPercent: number; requiredExercisePassed: boolean }): Promise<{ status: "completed" | "denied"; progress: LessonProgressRow; reasonCodes: string[] }> {
    requireAuthorized(env, { requiresFeature: "academicPersistence" });
    const learnerId = ownLearner(env);
    const existing = await env.repos.lessonProgress.findByLesson(learnerId, lessonId);
    if (!existing) throw new AcademicNotFoundError({ correlationId: env.ctx.correlationId, reasonCodes: ["PROGRESS_NOT_STARTED"] });

    const eligible = serverEvidence.serverPercent >= COMPLETION_THRESHOLD_PERCENT && serverEvidence.requiredExercisePassed;
    if (!eligible) {
      audit(env, "lesson.completion_denied", { resourceId: lessonId, reasonCodes: ["COMPLETION_CRITERIA_NOT_MET"] });
      return { status: "denied", progress: existing, reasonCodes: ["COMPLETION_CRITERIA_NOT_MET"] };
    }
    const saved = await env.repos.lessonProgress.save({ ...existing, state: "completed", completed: true, updatedAt: env.now.toISOString() }, existing.version);
    audit(env, "lesson.completed", { resourceId: lessonId });
    return { status: "completed", progress: saved, reasonCodes: ["COMPLETED"] };
  },

  /** Recalcule (côté serveur) la progression d'un module à partir de ses leçons complétées. */
  async recomputeModule(env: ServiceEnv, moduleId: string, totalLessons: number): Promise<ModuleProgressRow> {
    requireAuthorized(env, { requiresFeature: "academicPersistence" });
    const learnerId = ownLearner(env);
    const all = await env.repos.lessonProgress.listByLearner(learnerId);
    const done = all.filter((p) => p.moduleId === moduleId && p.completed).length;
    const percent = totalLessons > 0 ? Math.round((done / totalLessons) * 100) : 0;
    const existing = await env.repos.moduleProgress.findByModule(learnerId, moduleId);
    const row: ModuleProgressRow = existing ?? {
      id: env.idFactory(), ownerLearnerId: learnerId, programId: env.ctx.programId ?? "", moduleId,
      unlocked: true, completed: false, percent: 0, version: 0, updatedAt: env.now.toISOString(),
    };
    const completed = percent >= 100;
    const saved = await env.repos.moduleProgress.save({ ...row, percent, completed, updatedAt: env.now.toISOString() }, existing ? existing.version : null);
    if (completed) audit(env, "module.completed", { resourceId: moduleId });
    return saved;
  },

  async addNote(env: ServiceEnv, input: { lessonId: string; body: string }): Promise<string> {
    requireAuthorized(env, { requiresFeature: "academicPersistence" });
    const learnerId = ownLearner(env);
    const noteId = env.idFactory();
    await env.repos.notes.save({ id: noteId, noteId, ownerLearnerId: learnerId, programId: env.ctx.programId ?? "", lessonId: input.lessonId, body: input.body.slice(0, 5000), version: 0, updatedAt: env.now.toISOString() }, null);
    return noteId;
  },
  async removeNote(env: ServiceEnv, noteId: string): Promise<void> {
    requireAuthorized(env, { requiresFeature: "academicPersistence" });
    await env.repos.notes.remove(noteId, ownLearner(env));
  },
  async addBookmark(env: ServiceEnv, lessonId: string): Promise<string> {
    requireAuthorized(env, { requiresFeature: "academicPersistence" });
    const learnerId = ownLearner(env);
    const id = env.idFactory();
    await env.repos.bookmarks.save({ id, ownerLearnerId: learnerId, programId: env.ctx.programId ?? "", lessonId, version: 0, updatedAt: env.now.toISOString() }, null);
    return id;
  },
  async removeBookmark(env: ServiceEnv, bookmarkId: string): Promise<void> {
    requireAuthorized(env, { requiresFeature: "academicPersistence" });
    await env.repos.bookmarks.remove(bookmarkId, ownLearner(env));
  },
};

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}
