import type { Lang } from "@/lib/i18n";
import type { Lesson } from "@/types/lesson";
import type { CourseTranslation, LessonTranslation, TranslationStore } from "./types";
import { marketingDigitalTranslations } from "./marketing-digital";
import { informatiqueTranslations } from "./informatique";
import { francaisAffairesTranslations } from "./francais-affaires";
import { entrepreneuriatTranslations } from "./entrepreneuriat";

/**
 * Registry of available translations, keyed by language then course slug.
 * Courses are added here as their translation files are completed; anything
 * missing simply falls back to the canonical French content.
 */
const STORE: TranslationStore = {};

function register(slug: string, byLang: Partial<Record<Lang, CourseTranslation>>) {
  for (const [lang, course] of Object.entries(byLang) as [Lang, CourseTranslation][]) {
    if (!STORE[lang]) STORE[lang] = {};
    STORE[lang]![slug] = course;
  }
}

register("marketing-digital", marketingDigitalTranslations);
register("informatique", informatiqueTranslations);
register("francais-affaires", francaisAffairesTranslations);
register("entrepreneuriat", entrepreneuriatTranslations);

function mergeLesson(fr: Lesson, t?: LessonTranslation): Lesson {
  if (!t) return fr;
  return {
    title: t.title ?? fr.title,
    objectives: fr.objectives.map((o, i) => t.objectives?.[i] ?? o),
    content: fr.content.map((c, i) => t.content?.[i] ?? c),
    caseStudy: fr.caseStudy && {
      title: t.caseStudy?.title ?? fr.caseStudy.title,
      body: fr.caseStudy.body.map((b, i) => t.caseStudy?.body?.[i] ?? b),
    },
    exercise: fr.exercise && {
      title: t.exercise?.title ?? fr.exercise.title,
      prompt: fr.exercise.prompt.map((p, i) => t.exercise?.prompt?.[i] ?? p),
      deliverables: fr.exercise.deliverables.map((d, i) => t.exercise?.deliverables?.[i] ?? d),
    },
    keyTakeaways: fr.keyTakeaways.map((k, i) => t.keyTakeaways?.[i] ?? k),
    resources: fr.resources.map((r, i) => ({ label: t.resourceLabels?.[i] ?? r.label, url: r.url })),
    quiz: fr.quiz.map((q, i) => {
      const qt = t.quiz?.[i];
      if (!qt) return q;
      return {
        question: qt.question ?? q.question,
        options: (qt.options ?? q.options) as [string, string, string, string],
        correctIndex: q.correctIndex,
        explanation: qt.explanation ?? q.explanation,
      };
    }),
  };
}

/** Resolve a full course's lessons into the requested language. */
export function resolveCourse(lessons: Lesson[], lang: Lang, slug: string): Lesson[] {
  if (lang === "fr") return lessons;
  const course = STORE[lang]?.[slug];
  if (!course) return lessons;
  return lessons.map((lesson, i) => mergeLesson(lesson, course[i]));
}
