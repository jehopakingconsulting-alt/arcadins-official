import type { Lang } from "@/lib/i18n";

/**
 * Translation overlay. French lives in the canonical lesson files; these
 * objects override individual fields per language, by index. Any field left
 * undefined falls back to the French source automatically.
 */
export interface QuizTranslation {
  question?: string;
  options?: [string, string, string, string];
  explanation?: string;
}

export interface CaseStudyTranslation {
  title?: string;
  body?: string[];
}

export interface ExerciseTranslation {
  title?: string;
  prompt?: string[];
  deliverables?: string[];
}

export interface LessonTranslation {
  title?: string;
  objectives?: string[];
  content?: string[];
  caseStudy?: CaseStudyTranslation;
  exercise?: ExerciseTranslation;
  keyTakeaways?: string[];
  resourceLabels?: string[];
  quiz?: QuizTranslation[];
}

/** One entry per module, in the same order as the canonical French array. */
export type CourseTranslation = LessonTranslation[];

/** translations[lang][courseSlug] -> per-module overlays */
export type TranslationStore = Partial<Record<Lang, Record<string, CourseTranslation>>>;
