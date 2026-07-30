/**
 * Runtime — Repositories : examens finaux Supabase (Sprint I). Aucune logique métier.
 * Le `privateStateJson` (sections figées, barème) reste serveur.
 */
import type { AcademicDbClient } from "./supabase-client-factory.ts";
import { makeVersionedRepo } from "./mappers.ts";
import type {
  ExamSessionRepository, ExamSessionRow, ExamSubmissionRepository, ExamSubmissionRow, FinalProjectRepository, FinalProjectRow,
} from "./contracts.ts";

export function createSupabaseExamRepositories(db: AcademicDbClient): {
  examSessions: ExamSessionRepository; examSubmissions: ExamSubmissionRepository; finalProjects: FinalProjectRepository;
} {
  const es = makeVersionedRepo<ExamSessionRow>(db, "exam_runtime_sessions");
  const sub = makeVersionedRepo<ExamSubmissionRow>(db, "exam_submissions_v2");
  const fp = makeVersionedRepo<FinalProjectRow>(db, "final_projects_v2");
  return {
    examSessions: {
      get: es.get, save: es.save,
      listByLearner: (l) => es.where({ owner_learner_id: l }),
      findBySessionId: async (sessionId) => (await es.where({ session_id: sessionId }))[0] ?? null,
    },
    examSubmissions: { save: sub.save, findBySession: async (sessionId) => (await sub.where({ session_id: sessionId }))[0] ?? null },
    finalProjects: { get: fp.get, save: fp.save },
  };
}
