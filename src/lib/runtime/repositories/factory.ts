/**
 * Runtime — Repositories : AcademicRepositoryFactory (Sprint I).
 *
 * Sélectionne l'implémentation des repositories. Quand la persistance est désactivée (flag OFF), on renvoie des
 * repositories EN MÉMOIRE inertes (jamais Supabase). L'implémentation Supabase est assemblée à partir d'un
 * `AcademicDbClient` INJECTÉ — jamais d'accès direct au SDK ici.
 */
import { ACADEMIC_PERSISTENCE_ENABLED } from "../integration/config.ts";
import type { AcademicRepositories } from "./contracts.ts";
import type { AcademicDbClient } from "./supabase-client-factory.ts";
import { createInMemoryRepositories } from "./in-memory.ts";
import { createSupabaseProgramRepositories } from "./supabase-program-repository.ts";
import { createSupabaseEnrollmentRepository } from "./supabase-enrollment-repository.ts";
import { createSupabaseProgressRepositories } from "./supabase-progress-repository.ts";
import { createSupabaseAssessmentRepositories } from "./supabase-assessment-repository.ts";
import { createSupabaseExamRepositories } from "./supabase-exam-repository.ts";
import { createSupabaseCertificationRepositories } from "./supabase-certification-repository.ts";
import { createSupabaseAuditRepository, createSupabaseIdempotencyRepository } from "./supabase-audit-repository.ts";

export type RepositoryMode = "memory" | "supabase";

/** Assemble des repositories Supabase à partir d'un client DB abstrait injecté. */
export function createSupabaseRepositories(db: AcademicDbClient): AcademicRepositories {
  const program = createSupabaseProgramRepositories(db);
  const progress = createSupabaseProgressRepositories(db);
  const assessment = createSupabaseAssessmentRepositories(db);
  const exam = createSupabaseExamRepositories(db);
  const certification = createSupabaseCertificationRepositories(db);
  return {
    programs: program.programs,
    programVersions: program.programVersions,
    modules: program.modules,
    lessons: program.lessons,
    rubrics: program.rubrics,
    enrollments: createSupabaseEnrollmentRepository(db),
    lessonProgress: progress.lessonProgress,
    moduleProgress: progress.moduleProgress,
    studySessions: progress.studySessions,
    bookmarks: progress.bookmarks,
    notes: progress.notes,
    learningEvents: progress.learningEvents,
    assessmentAttempts: assessment.assessmentAttempts,
    assessmentSubmissions: assessment.assessmentSubmissions,
    examSessions: exam.examSessions,
    examSubmissions: exam.examSubmissions,
    finalProjects: exam.finalProjects,
    credentials: certification.credentials,
    credentialVersions: certification.credentialVersions,
    credentialVerifications: certification.credentialVerifications,
    badges: certification.badges,
    audit: createSupabaseAuditRepository(db),
    commandIdempotency: createSupabaseIdempotencyRepository(db),
  };
}

export interface RepositoryFactoryOptions {
  mode?: RepositoryMode;
  db?: AcademicDbClient;
  persistenceEnabled?: boolean;
}

export const AcademicRepositoryFactory = {
  /**
   * Retourne les repositories. Si la persistance est désactivée, on ne branche JAMAIS Supabase : repositories
   * en mémoire inertes. En mode supabase, un `db` client doit être fourni.
   */
  create(opts: RepositoryFactoryOptions = {}): AcademicRepositories {
    const enabled = opts.persistenceEnabled ?? ACADEMIC_PERSISTENCE_ENABLED;
    if (!enabled || opts.mode !== "supabase") return createInMemoryRepositories();
    if (!opts.db) throw new Error("SUPABASE_DB_CLIENT_REQUIRED");
    return createSupabaseRepositories(opts.db);
  },
};
