/**
 * Runtime — Repositories : évaluations formatives Supabase (Sprint I). Aucune logique métier.
 * Le `privateStateJson` (barème/questions figées) n'est jamais exposé au client par ce repository.
 */
import type { AcademicDbClient } from "./supabase-client-factory.ts";
import { makeVersionedRepo } from "./mappers.ts";
import type {
  AssessmentAttemptRepository, AssessmentAttemptRow, AssessmentSubmissionRepository, AssessmentSubmissionRow,
} from "./contracts.ts";

export function createSupabaseAssessmentRepositories(db: AcademicDbClient): {
  assessmentAttempts: AssessmentAttemptRepository; assessmentSubmissions: AssessmentSubmissionRepository;
} {
  const at = makeVersionedRepo<AssessmentAttemptRow>(db, "assessment_attempts_v2");
  const sub = makeVersionedRepo<AssessmentSubmissionRow>(db, "assessment_submissions_v2");
  return {
    assessmentAttempts: {
      get: at.get, save: at.save,
      listByLearner: (l) => at.where({ owner_learner_id: l }),
      findByAttemptId: async (attemptId) => (await at.where({ attempt_id: attemptId }))[0] ?? null,
    },
    assessmentSubmissions: {
      save: sub.save,
      findByAttempt: async (attemptId) => (await sub.where({ attempt_id: attemptId }))[0] ?? null,
    },
  };
}
