/**
 * Runtime étudiant — ProgressCalculator (Sprint A).
 *
 * Calcule, de façon PURE, les agrégats de progression d'un programme pour un étudiant.
 * `now` est injectable pour des tests déterministes.
 */
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type { ProgramProgressView, RuntimeState } from "./types.ts";
import { CompletionCalculator } from "./completion-calculator.ts";
import { TimeTracker } from "./time-tracker.ts";
import { RUNTIME_THRESHOLDS } from "./config.ts";
import { round, isoDay } from "./helpers.ts";

const DAY_MS = 24 * 60 * 60 * 1000;

export const ProgressCalculator = {
  /** Pourcentage global de complétion (leçons complétées / total). */
  programPercent(curriculum: ProgramCurriculumV2, state: RuntimeState): number {
    const { completed, total } = CompletionCalculator.lessonCompletionCount(curriculum, state);
    return total === 0 ? 0 : round((completed / total) * 100);
  },

  /** Pourcentage de complétion d'un module. */
  modulePercent(curriculum: ProgramCurriculumV2, state: RuntimeState, moduleIndex: number): number {
    const mod = curriculum.modules.find((m) => m.index === moduleIndex);
    if (!mod || mod.lessons.length === 0) return 0;
    const done = mod.lessons.filter((l) => CompletionCalculator.isLessonCompleted(state, l.id)).length;
    return round((done / mod.lessons.length) * 100);
  },

  /** Part des leçons complétées durant les 7 derniers jours (relative au total). */
  weeklyPercent(curriculum: ProgramCurriculumV2, state: RuntimeState, now: Date = new Date()): number {
    return completedShareSince(curriculum, state, new Date(now.getTime() - 7 * DAY_MS));
  },

  /** Part des leçons complétées aujourd'hui (relative au total). */
  dailyPercent(curriculum: ProgramCurriculumV2, state: RuntimeState, now: Date = new Date()): number {
    const today = isoDay(now);
    const total = curriculum.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    if (total === 0) return 0;
    const count = Object.values(state.lessons).filter(
      (lp) => lp.completedAt && isoDay(lp.completedAt) === today,
    ).length;
    return round((count / total) * 100);
  },

  /** Score moyen sur tous les scores enregistrés (quiz + sommatifs). null si aucun. */
  averageScore(state: RuntimeState): number | null {
    const scores: number[] = [];
    for (const lp of Object.values(state.lessons)) if (typeof lp.quizScore === "number") scores.push(lp.quizScore);
    for (const mp of Object.values(state.modules)) if (typeof mp.summativeScore === "number") scores.push(mp.summativeScore);
    if (scores.length === 0) return null;
    return round(scores.reduce((a, b) => a + b, 0) / scores.length);
  },

  /** Compétences acquises = union des compétences des modules validés. */
  competenciesAcquired(curriculum: ProgramCurriculumV2, state: RuntimeState): string[] {
    const acc = new Set<string>();
    for (const m of curriculum.modules) {
      if (CompletionCalculator.isModulePassed(curriculum, state, m.index)) {
        for (const c of m.competencies) acc.add(c);
      }
    }
    return [...acc].sort();
  },

  /** Niveau atteint (libellé dérivé du pourcentage global). */
  level(curriculum: ProgramCurriculumV2, state: RuntimeState): string | null {
    const p = ProgressCalculator.programPercent(curriculum, state);
    if (p === 0) return null;
    if (p < 25) return "Débutant";
    if (p < 50) return "Intermédiaire";
    if (p < 75) return "Avancé";
    if (p < 100) return "Confirmé";
    return "Certifiable";
  },

  /** Éligibilité (interne) à l'attestation : tous les modules validés + note moyenne ≥ seuil global. */
  eligibleForCertificate(curriculum: ProgramCurriculumV2, state: RuntimeState): boolean {
    const allPassed = curriculum.modules.every((m) => CompletionCalculator.isModulePassed(curriculum, state, m.index));
    const avg = ProgressCalculator.averageScore(state);
    return allPassed && avg !== null && avg >= RUNTIME_THRESHOLDS.globalPass;
  },

  /** Vue complète des agrégats du programme. */
  programProgressView(curriculum: ProgramCurriculumV2, state: RuntimeState, now: Date = new Date()): ProgramProgressView {
    const { completed, total } = CompletionCalculator.lessonCompletionCount(curriculum, state);
    return {
      programSlug: curriculum.slug,
      percent: ProgressCalculator.programPercent(curriculum, state),
      weeklyPercent: ProgressCalculator.weeklyPercent(curriculum, state, now),
      dailyPercent: ProgressCalculator.dailyPercent(curriculum, state, now),
      averageScore: ProgressCalculator.averageScore(state),
      timeSpentSeconds: TimeTracker.timeSpentSeconds(state),
      estimatedRemainingSeconds: TimeTracker.estimatedRemainingSeconds(curriculum, state),
      competenciesAcquired: ProgressCalculator.competenciesAcquired(curriculum, state),
      level: ProgressCalculator.level(curriculum, state),
      eligibleForCertificate: ProgressCalculator.eligibleForCertificate(curriculum, state),
      lessonsTotal: total,
      lessonsCompleted: completed,
    };
  },
};

function completedShareSince(curriculum: ProgramCurriculumV2, state: RuntimeState, since: Date): number {
  const total = curriculum.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  if (total === 0) return 0;
  const count = Object.values(state.lessons).filter(
    (lp) => lp.completedAt && new Date(lp.completedAt).getTime() >= since.getTime(),
  ).length;
  return round((count / total) * 100);
}
