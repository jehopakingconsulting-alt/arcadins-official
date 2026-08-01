/**
 * Runtime — Repositories : programme/référentiel Supabase (Sprint I).
 * Lecture seule sur les tables de contenu. Aucune logique métier.
 */
import type { AcademicDbClient } from "./supabase-client-factory.ts";
import { makeReadRepo } from "./mappers.ts";
import type {
  LessonRepository, LessonRow, ModuleRepository, ModuleRow, ProgramRepository, ProgramRow,
  ProgramVersionRepository, ProgramVersionRow, RubricRepository, RubricRow,
} from "./contracts.ts";

export function createSupabaseProgramRepositories(db: AcademicDbClient): {
  programs: ProgramRepository; programVersions: ProgramVersionRepository; modules: ModuleRepository; lessons: LessonRepository; rubrics: RubricRepository;
} {
  const programs = makeReadRepo<ProgramRow>(db, "programs");
  const programVersions = makeReadRepo<ProgramVersionRow>(db, "program_versions");
  const modules = makeReadRepo<ModuleRow>(db, "modules");
  const lessons = makeReadRepo<LessonRow>(db, "lessons");
  const rubrics = makeReadRepo<RubricRow>(db, "rubrics");
  return {
    programs: { get: programs.get },
    programVersions: { get: programVersions.get },
    modules: { get: modules.get, listByProgramVersion: (pv) => modules.where({ program_version_id: pv }) },
    lessons: { get: lessons.get, listByModule: (m) => lessons.where({ module_id: m }) },
    rubrics: { get: rubrics.get },
  };
}
