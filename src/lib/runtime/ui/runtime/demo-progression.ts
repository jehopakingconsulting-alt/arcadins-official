/**
 * Runtime — UI/Runtime : progression de DÉMONSTRATION (Sprint K2C).
 *
 * Construit un état runtime FICTIF et déterministe (quelques leçons du module 1 complétées, une en cours, du
 * temps d'étude) afin que la visualisation de progression affiche des données réelles issues du moteur — sans
 * aucune donnée réelle ni écriture. PUR (horloge fixe injectée). N'ajoute AUCUNE logique métier : réutilise le
 * reducer/moteur des Sprints A + K2A.
 */
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type { RuntimeState } from "./types.ts";
import type { StudentRuntime } from "./student-runtime.ts";
import { createStudentRuntime } from "./student-runtime.ts";
import { LearningEvents } from "../../learning-events.ts";

const D = "2026-12-01T09:00:00Z";
const FIXED_NOW = new Date("2026-12-02T09:00:00Z");

/** Runtime de démonstration seedé (déterministe) — horloge fixe pour un rendu stable. */
export function buildSeededRuntime(curriculum: ProgramCurriculumV2): StudentRuntime {
  const rt = createStudentRuntime(curriculum, { now: () => FIXED_NOW });
  const lessons = curriculum.modules[0]?.lessons ?? [];
  const l0 = lessons[0]?.id;
  const l1 = lessons[1]?.id;
  const l2 = lessons[2]?.id;

  const events = [
    ...(l0 ? [LearningEvents.lessonViewed(l0, D), LearningEvents.quizSubmitted(l0, "q", 82, true, D), LearningEvents.lessonCompleted(l0, D), LearningEvents.studyTime(l0, 3600, D)] : []),
    ...(l1 ? [LearningEvents.lessonViewed(l1, D), LearningEvents.lessonCompleted(l1, D), LearningEvents.studyTime(l1, 1800, D)] : []),
    ...(l2 ? [LearningEvents.lessonViewed(l2, D), LearningEvents.studyTime(l2, 600, D)] : []),
  ];
  if (events.length > 0) rt.dispatch(events);
  return rt;
}

/** État seedé seul (utile pour les tests / reprise). */
export function seededProgressionState(curriculum: ProgramCurriculumV2): RuntimeState {
  return buildSeededRuntime(curriculum).getState();
}
