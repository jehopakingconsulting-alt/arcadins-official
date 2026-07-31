"use client";
/**
 * Hook — navigation pédagogique (Sprint K2B). Synchronise le moteur de navigation avec le `RuntimeProvider`
 * (K2A) : recalcule l'état de navigation à chaque changement d'état runtime et expose les actions (précédent /
 * suivant / reprise / aller à). AUCUNE UI complexe — ce hook ne fait que fournir états + actions à une future
 * interface. Les actions passent par le dispatch immuable du runtime.
 */
import { useCallback, useMemo } from "react";
import type { NavigationResult } from "@/lib/runtime/ui/runtime/learning-navigator";
import { createLearningNavigator } from "@/lib/runtime/ui/runtime/learning-navigator";
import type { NavigationState } from "@/lib/runtime/ui/runtime/navigation-engine";
import { NavigationEngine } from "@/lib/runtime/ui/runtime/navigation-engine";
import { useRuntimeContext } from "@/lib/runtime/ui/runtime/RuntimeProvider";

export interface LearningNavigation {
  navigation: NavigationState;
  goToLesson: (lessonId: string) => NavigationResult;
  goNext: () => NavigationResult;
  goPrevious: () => NavigationResult;
  resume: () => NavigationResult;
}

export function useLearningNavigation(): LearningNavigation {
  const { runtime, state, derived } = useRuntimeContext();
  const navigator = useMemo(() => createLearningNavigator(runtime), [runtime]);

  // Recalculé quand l'état/feed runtime change (synchronisation avec le provider).
  const navigation = useMemo(
    () => NavigationEngine.computeState(runtime.repository.getCurriculum(), state, derived),
    [runtime, state, derived],
  );

  const goToLesson = useCallback((lessonId: string) => navigator.goToLesson(lessonId), [navigator]);
  const goNext = useCallback(() => navigator.goNext(), [navigator]);
  const goPrevious = useCallback(() => navigator.goPrevious(), [navigator]);
  const resume = useCallback(() => navigator.resume(), [navigator]);

  return { navigation, goToLesson, goNext, goPrevious, resume };
}
