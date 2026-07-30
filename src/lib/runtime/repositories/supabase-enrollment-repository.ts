/**
 * Runtime — Repositories : inscriptions Supabase (Sprint I). Aucune logique métier.
 */
import type { AcademicDbClient } from "./supabase-client-factory.ts";
import { makeVersionedRepo } from "./mappers.ts";
import type { EnrollmentRepository, EnrollmentRow } from "./contracts.ts";

export function createSupabaseEnrollmentRepository(db: AcademicDbClient): EnrollmentRepository {
  const repo = makeVersionedRepo<EnrollmentRow>(db, "enrollments");
  return {
    get: repo.get,
    save: repo.save,
    findByUserAndProgram: async (userId, programId) => (await repo.where({ user_id: userId, program_id: programId }))[0] ?? null,
  };
}
