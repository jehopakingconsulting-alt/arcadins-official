/**
 * Runtime — UI/Runtime : LearningNavigator (Sprint K2B).
 *
 * Contrôleur de navigation pédagogique au-dessus d'un `StudentRuntime` (K2A). Chaque action calcule l'état de
 * navigation via `NavigationEngine`, applique l'événement runtime approprié (LESSON_VIEWED) et renvoie le nouvel
 * état. Respecte le verrouillage : naviguer vers une leçon verrouillée est refusé (aucune mutation). PUR (hors le
 * dispatch qui passe par le store immuable). Aucune UI.
 */
import type { StudentRuntime } from "./student-runtime.ts";
import type { NavigationState } from "./navigation-engine.ts";
import { NavigationEngine } from "./navigation-engine.ts";
import { LearningEvents } from "../../learning-events.ts";

export interface NavigationResult {
  moved: boolean;
  lessonId: string | null;
  reasonCode: string | null;
  navigation: NavigationState;
}

export interface LearningNavigator {
  getState(): NavigationState;
  goToLesson(lessonId: string, at?: string): NavigationResult;
  goNext(at?: string): NavigationResult;
  goPrevious(at?: string): NavigationResult;
  /** Reprise automatique de la dernière leçon consultée non terminée. */
  resume(at?: string): NavigationResult;
}

export function createLearningNavigator(runtime: StudentRuntime): LearningNavigator {
  const curriculum = runtime.repository.getCurriculum();

  const state = (): NavigationState => NavigationEngine.computeState(curriculum, runtime.getState(), runtime.getDerived());

  const move = (lessonId: string | null, at?: string): NavigationResult => {
    if (!lessonId) return { moved: false, lessonId: null, reasonCode: "NO_TARGET", navigation: state() };
    const known = NavigationEngine.orderedLessons(curriculum).some((f) => f.lessonId === lessonId);
    if (!known) return { moved: false, lessonId, reasonCode: "UNKNOWN_LESSON", navigation: state() };
    if (!NavigationEngine.isAccessible(runtime.getState(), lessonId)) {
      return { moved: false, lessonId, reasonCode: "LESSON_LOCKED", navigation: state() };
    }
    runtime.dispatch(LearningEvents.lessonViewed(lessonId, at));
    return { moved: true, lessonId, reasonCode: null, navigation: state() };
  };

  return {
    getState: state,
    goToLesson: (lessonId, at) => move(lessonId, at),
    goNext(at) {
      const nav = state();
      return nav.canGoNext ? move(nav.nextLessonId, at) : { moved: false, lessonId: nav.nextLessonId, reasonCode: nav.nextLessonId ? "NEXT_LOCKED" : "NO_NEXT", navigation: nav };
    },
    goPrevious(at) {
      const nav = state();
      return nav.canGoPrevious ? move(nav.previousLessonId, at) : { moved: false, lessonId: nav.previousLessonId, reasonCode: "NO_PREVIOUS", navigation: nav };
    },
    resume(at) {
      const nav = state();
      return move(nav.resumeLessonId, at);
    },
  };
}
