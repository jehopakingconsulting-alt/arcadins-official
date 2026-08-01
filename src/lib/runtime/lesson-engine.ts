/**
 * Runtime étudiant — LessonEngine (Sprint A).
 *
 * Résolution PURE des leçons : accès, navigation séquentielle, reprise (« continuer où j'étais »).
 * Ne rend aucune UI ; fournit les données que le futur Player consommera.
 */
import type { ProgramCurriculumV2, LessonV2 } from "@/lib/academic/types";
import type { LessonState, RuntimeState } from "./types.ts";
import { allLessons, findLesson, findModuleOfLesson } from "./helpers.ts";
import { BookmarkManager } from "./bookmark-manager.ts";

export const LessonEngine = {
  /** Récupère la leçon (contenu). */
  get(curriculum: ProgramCurriculumV2, lessonRef: string): LessonV2 | undefined {
    return findLesson(curriculum, lessonRef);
  },

  /** Séquence globale des ids de leçons (ordre modules puis leçons). */
  sequence(curriculum: ProgramCurriculumV2): string[] {
    return [...curriculum.modules]
      .sort((a, b) => a.index - b.index)
      .flatMap((m) => m.lessons.map((l) => l.id));
  },

  /** Id de la leçon suivante dans la séquence (ou undefined). */
  next(curriculum: ProgramCurriculumV2, lessonRef: string): string | undefined {
    const seq = LessonEngine.sequence(curriculum);
    const i = seq.indexOf(lessonRef);
    return i >= 0 && i < seq.length - 1 ? seq[i + 1] : undefined;
  },

  /** Id de la leçon précédente dans la séquence (ou undefined). */
  prev(curriculum: ProgramCurriculumV2, lessonRef: string): string | undefined {
    const seq = LessonEngine.sequence(curriculum);
    const i = seq.indexOf(lessonRef);
    return i > 0 ? seq[i - 1] : undefined;
  },

  /** État d'une leçon (défaut « locked » si inconnu). */
  stateOf(state: RuntimeState, lessonRef: string): LessonState {
    return state.lessons[lessonRef]?.state ?? "locked";
  },

  /** La leçon est-elle accessible (non verrouillée) ? */
  isAccessible(state: RuntimeState, lessonRef: string): boolean {
    return LessonEngine.stateOf(state, lessonRef) !== "locked";
  },

  /** Position de reprise (secondes) pour « continuer où j'étais ». */
  resumePosition(state: RuntimeState, lessonRef: string): number {
    return state.lessons[lessonRef]?.lastPositionSeconds ?? 0;
  },

  /**
   * « Continuer où j'étais » : la dernière leçon consultée (historique) encore accessible,
   * sinon la première leçon disponible non complétée.
   */
  continueWhereILeftOff(curriculum: ProgramCurriculumV2, state: RuntimeState): string | undefined {
    const history = BookmarkManager.history(state.bookmarks);
    const lastViewed = history.find((h) => LessonEngine.isAccessible(state, h.lessonRef));
    if (lastViewed) return lastViewed.lessonRef;

    const firstAvailable = allLessons(curriculum).find((l) => {
      const st = LessonEngine.stateOf(state, l.id);
      return st === "available" || st === "in_progress";
    });
    return firstAvailable?.id;
  },

  /** Index du module contenant la leçon (ou -1). */
  moduleIndexOf(curriculum: ProgramCurriculumV2, lessonRef: string): number {
    return findModuleOfLesson(curriculum, lessonRef)?.index ?? -1;
  },
};
