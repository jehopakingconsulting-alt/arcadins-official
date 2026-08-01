/**
 * Runtime étudiant — helpers purs (Sprint A).
 */
import type { ProgramCurriculumV2, ModuleV2, LessonV2 } from "@/lib/academic/types";

/** Jour ISO (YYYY-MM-DD) à partir d'une date ISO ou d'un Date. */
export function isoDay(input: string | Date): string {
  const d = typeof input === "string" ? new Date(input) : input;
  return d.toISOString().slice(0, 10);
}

/** Clamp d'un nombre entre min et max. */
export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/** Arrondi à `d` décimales (défaut 1). */
export function round(n: number, d = 1): number {
  const f = 10 ** d;
  return Math.round(n * f) / f;
}

/** Toutes les leçons du cursus, à plat. */
export function allLessons(curriculum: ProgramCurriculumV2): LessonV2[] {
  return curriculum.modules.flatMap((m) => m.lessons);
}

/** Retrouve une leçon par son id (lessonRef). */
export function findLesson(curriculum: ProgramCurriculumV2, lessonRef: string): LessonV2 | undefined {
  return allLessons(curriculum).find((l) => l.id === lessonRef);
}

/** Retrouve le module contenant une leçon. */
export function findModuleOfLesson(curriculum: ProgramCurriculumV2, lessonRef: string): ModuleV2 | undefined {
  return curriculum.modules.find((m) => m.lessons.some((l) => l.id === lessonRef));
}

/** Retrouve un module par son index. */
export function findModule(curriculum: ProgramCurriculumV2, moduleIndex: number): ModuleV2 | undefined {
  return curriculum.modules.find((m) => m.index === moduleIndex);
}

/** Modules triés par index croissant. */
export function orderedModules(curriculum: ProgramCurriculumV2): ModuleV2[] {
  return [...curriculum.modules].sort((a, b) => a.index - b.index);
}
