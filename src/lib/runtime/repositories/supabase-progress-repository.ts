/**
 * Runtime — Repositories : progression & activité Supabase (Sprint I). Aucune logique métier.
 */
import type { AcademicDbClient } from "./supabase-client-factory.ts";
import { makeVersionedRepo } from "./mappers.ts";
import type {
  BookmarkRepository, BookmarkRow, LearnerNoteRepository, LearnerNoteRow, LearningEventRepository, LearningEventRow,
  LessonProgressRepository, LessonProgressRow, ModuleProgressRepository, ModuleProgressRow,
  StudySessionRepository, StudySessionRow,
} from "./contracts.ts";
import { rowToDomain } from "./mappers.ts";

export function createSupabaseProgressRepositories(db: AcademicDbClient): {
  lessonProgress: LessonProgressRepository; moduleProgress: ModuleProgressRepository;
  studySessions: StudySessionRepository; bookmarks: BookmarkRepository; notes: LearnerNoteRepository; learningEvents: LearningEventRepository;
} {
  const lp = makeVersionedRepo<LessonProgressRow>(db, "lesson_progress_v2");
  const mp = makeVersionedRepo<ModuleProgressRow>(db, "module_progress_v2");
  const ss = makeVersionedRepo<StudySessionRow>(db, "study_sessions");
  const bm = makeVersionedRepo<BookmarkRow>(db, "bookmarks");
  const nt = makeVersionedRepo<LearnerNoteRow>(db, "learner_notes");

  return {
    lessonProgress: {
      get: lp.get, save: lp.save,
      listByLearner: (l) => lp.where({ owner_learner_id: l }),
      findByLesson: async (l, lessonId) => (await lp.where({ owner_learner_id: l, lesson_id: lessonId }))[0] ?? null,
    },
    moduleProgress: {
      get: mp.get, save: mp.save,
      listByLearner: (l) => mp.where({ owner_learner_id: l }),
      findByModule: async (l, moduleId) => (await mp.where({ owner_learner_id: l, module_id: moduleId }))[0] ?? null,
    },
    studySessions: { save: ss.save, listByLearner: (l) => ss.where({ owner_learner_id: l }) },
    bookmarks: { save: bm.save, listByLearner: (l) => bm.where({ owner_learner_id: l }), remove: (id, learnerId) => bm.remove({ id, owner_learner_id: learnerId }) },
    notes: { save: nt.save, listByLearner: (l) => nt.where({ owner_learner_id: l }), remove: (id, learnerId) => nt.remove({ id, owner_learner_id: learnerId }) },
    learningEvents: {
      append: async (row) => void (await db.insert("learning_events", { ...row })),
      listByLearner: async (l) => (await db.select("learning_events", { owner_learner_id: l })).map((r) => rowToDomain<LearningEventRow>(r)),
    },
  };
}
