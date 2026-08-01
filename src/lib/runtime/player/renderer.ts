/**
 * Runtime — Learning Player : LessonRenderer (Sprint C).
 *
 * Transforme une `LessonV2` (contenu générique) en une liste de `RenderBlock` agnostiques du framework.
 * Ne rend AUCUNE UI. Ne manipule AUCUNE bonne réponse (le quiz n'est que référencé — Sprint D).
 */
import type { LessonV2 } from "@/lib/academic/types";
import type { RenderBlock, ResourceItem, DownloadItem } from "./types.ts";

export const LessonRenderer = {
  /** Construit les blocs de rendu d'une leçon, dans l'ordre pédagogique. */
  toBlocks(lesson: LessonV2): RenderBlock[] {
    const blocks: RenderBlock[] = [];

    if (lesson.introduction) blocks.push({ type: "introduction", text: lesson.introduction });

    if (lesson.sections && lesson.sections.length > 0) {
      for (const s of lesson.sections) blocks.push({ type: "section", heading: s.heading, body: s.body });
    } else {
      for (const p of lesson.content ?? []) blocks.push({ type: "paragraph", text: p });
    }

    for (const d of lesson.definitions ?? []) blocks.push({ type: "definition", term: d.term, definition: d.definition });
    for (const ex of lesson.examples ?? []) blocks.push({ type: "example", text: ex });
    if (lesson.commonError) blocks.push({ type: "commonError", title: lesson.commonError.title, body: lesson.commonError.body });
    if (lesson.vigilancePoint) blocks.push({ type: "vigilance", title: lesson.vigilancePoint.title, body: lesson.vigilancePoint.body });
    if (lesson.caseStudy) {
      blocks.push({
        type: "caseStudy",
        title: lesson.caseStudy.title,
        region: lesson.caseStudy.region,
        body: lesson.caseStudy.body,
        isFictional: lesson.caseStudy.isFictional,
      });
    }
    for (const f of lesson.formulas ?? []) blocks.push({ type: "formula", name: f.name, expression: f.expression, example: f.example });

    const activity = lesson.activity ?? lesson.exercise;
    if (activity) blocks.push({ type: "activity", title: activity.title, prompt: activity.prompt, deliverables: activity.deliverables });

    if (lesson.keyTakeaways && lesson.keyTakeaways.length > 0) blocks.push({ type: "keyTakeaways", items: lesson.keyTakeaways });
    if (lesson.summary) blocks.push({ type: "summary", text: lesson.summary });

    if (lesson.quiz) blocks.push({ type: "quizRef", quizId: lesson.quiz.id, questionCount: lesson.quiz.questionIds.length });

    return blocks;
  },
};

/** Fournit ressources et téléchargements d'une leçon (injectable pour brancher le Storage plus tard). */
export interface ResourceProvider {
  resources(lesson: LessonV2): ResourceItem[];
  downloads(lesson: LessonV2): DownloadItem[];
}

/** Provider par défaut : dérive les ressources des `resources` de la leçon ; aucun téléchargement. */
export const DefaultResourceProvider: ResourceProvider = {
  resources(lesson: LessonV2): ResourceItem[] {
    return (lesson.resources ?? []).map((label, i) => ({ id: `${lesson.id}-res-${i}`, kind: "link", label }));
  },
  downloads(): DownloadItem[] {
    return [];
  },
};
