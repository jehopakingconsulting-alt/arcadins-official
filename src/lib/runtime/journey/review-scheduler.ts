/**
 * Runtime — Journey : ReviewScheduler (Sprint E).
 *
 * Révision espacée GÉNÉRIQUE, configurable et DÉTERMINISTE (inspirée d'une répétition espacée, sans prétendre
 * à une optimisation scientifique garantie). Aucune horloge interne : la date de référence vient du contexte.
 */
import type { JourneyConfig, JourneyContext, MasteryProfile, ReviewItem, ReviewSchedule } from "./types.ts";
import { CompletionCalculator } from "../completion-calculator.ts";

const DAY_MS = 24 * 60 * 60 * 1000;

function addDays(iso: string, days: number): string {
  return new Date(new Date(iso).getTime() + days * DAY_MS).toISOString();
}
function diffDays(a: number, b: number): number {
  return Math.floor((a - b) / DAY_MS);
}

export const ReviewScheduler = {
  /** Calcul déterministe du prochain intervalle (0..1 quality) — utilitaire réutilisable. */
  nextInterval(prev: { intervalDays: number; repetitionCount: number; easeFactor: number }, quality: number, config: JourneyConfig): {
    intervalDays: number;
    repetitionCount: number;
    easeFactor: number;
  } {
    const q = Math.max(0, Math.min(1, quality));
    const ease = Math.max(config.review.minEase, prev.easeFactor + (q - 0.6));
    if (q < 0.6) return { intervalDays: config.review.baseIntervalDays, repetitionCount: 0, easeFactor: ease };
    const repetitionCount = prev.repetitionCount + 1;
    const intervalDays =
      repetitionCount <= 1
        ? config.review.baseIntervalDays
        : Math.round(prev.intervalDays * config.review.intervalMultiplier * (ease / config.review.easeStart));
    return { intervalDays, repetitionCount, easeFactor: Number(ease.toFixed(3)) };
  },

  /** Construit la file de révision pour les compétences réussies. */
  schedule(ctx: JourneyContext, profile: MasteryProfile): ReviewSchedule {
    const nowMs = ctx.now.getTime();
    const items: ReviewItem[] = [];

    for (const skill of profile.skills) {
      if ((skill.level !== "passed" && skill.level !== "mastered") || !skill.lastSuccessAt) continue;
      const intervalDays = ctx.config.review.baseIntervalDays;
      const dueAt = addDays(skill.lastSuccessAt, intervalDays);
      const overdue = new Date(dueAt).getTime() <= nowMs;
      const overdueDays = overdue ? diffDays(nowMs, new Date(dueAt).getTime()) : 0;
      const relatedLessonIds = ctx.curriculum.modules
        .filter((m) => m.competencies.includes(skill.skillId))
        .flatMap((m) => m.lessons)
        .filter((l) => CompletionCalculator.isLessonPassed(ctx.state, l.id))
        .map((l) => l.id);

      items.push({
        id: `rev-${skill.skillId}`,
        targetType: "skill",
        targetId: skill.skillId,
        dueAt,
        intervalDays,
        repetitionCount: 0,
        easeFactor: ctx.config.review.easeStart,
        priority: overdue ? 100 + overdueDays : Math.max(0, 10 - diffDays(new Date(dueAt).getTime(), nowMs)),
        reason: "spaced-review",
        relatedSkillIds: [skill.skillId],
        relatedLessonIds,
        overdue,
      });
    }

    // Tri stable : dûs en premier (priorité décroissante), puis par id.
    items.sort((a, b) => b.priority - a.priority || (a.id < b.id ? -1 : 1));
    return { items, generatedAt: ctx.now.toISOString() };
  },

  /** Sous-ensemble des révisions échues (dues). */
  overdue(schedule: ReviewSchedule): ReviewItem[] {
    return schedule.items.filter((i) => i.overdue);
  },
};
