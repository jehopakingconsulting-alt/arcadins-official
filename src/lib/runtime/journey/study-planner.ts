/**
 * Runtime — Journey : StudyPlanner (Sprint E).
 *
 * Construit des plans quotidien/hebdomadaire réalistes, alternant nouveaux apprentissages / pratique / révision,
 * dans la limite de la CAPACITÉ configurée (jamais dépassée). Déterministe (horloge injectée).
 */
import type {
  DailyStudyPlan,
  JourneyContext,
  RemediationPlan,
  ReviewItem,
  StudySessionPlan,
  WeeklyStudyPlan,
} from "./types.ts";
import { LessonEngine } from "../lesson-engine.ts";
import { CompletionCalculator } from "../completion-calculator.ts";
import { TimeTracker } from "../time-tracker.ts";
import { findLesson, isoDay } from "../helpers.ts";

const DAY_MS = 24 * 60 * 60 * 1000;

/** Sessions candidates ordonnées : révisions échues → remédiations → nouvelles leçons accessibles. */
function candidateSessions(ctx: JourneyContext, reviews: ReviewItem[], remediations: RemediationPlan[]): StudySessionPlan[] {
  const { curriculum, state, config } = ctx;
  const out: StudySessionPlan[] = [];

  for (const r of reviews.filter((x) => x.overdue)) {
    out.push({ kind: "review", targetType: "skill", targetId: r.targetId, estimatedMinutes: config.defaults.reviewMinutes, reasonCodes: ["OVERDUE_REVIEW"] });
  }
  for (const p of remediations.filter((x) => !x.exhausted)) {
    out.push({ kind: "practice", targetType: p.targetType, targetId: p.targetId, estimatedMinutes: config.defaults.remediationMinutes, reasonCodes: p.reasonCodes });
  }
  for (const ref of LessonEngine.sequence(curriculum)) {
    const st = LessonEngine.stateOf(state, ref);
    if ((st === "available" || st === "in_progress") && !CompletionCalculator.isLessonCompleted(state, ref)) {
      out.push({
        kind: "new",
        targetType: "lesson",
        targetId: ref,
        estimatedMinutes: findLesson(curriculum, ref)?.durationMinutes ?? config.defaults.lessonMinutes,
        reasonCodes: ["NEW_CONTENT"],
      });
    }
  }
  return out;
}

/** Remplit une journée depuis une file, sans dépasser la capacité (session partielle si nécessaire). */
function fillDay(day: string, capacity: number, queue: StudySessionPlan[]): DailyStudyPlan {
  const sessions: StudySessionPlan[] = [];
  let total = 0;
  while (queue.length > 0 && total < capacity) {
    const remaining = capacity - total;
    const next = queue[0];
    const minutes = Math.min(next.estimatedMinutes, remaining);
    sessions.push({ ...next, estimatedMinutes: minutes });
    total += minutes;
    if (minutes >= next.estimatedMinutes) queue.shift(); // session terminée
    else queue[0] = { ...next, estimatedMinutes: next.estimatedMinutes - minutes }; // reste pour un prochain jour
  }
  return { day, sessions, totalMinutes: total, capacityMinutes: capacity };
}

export const StudyPlanner = {
  /** Plan du jour (déterministe). */
  buildDaily(ctx: JourneyContext, reviews: ReviewItem[], remediations: RemediationPlan[]): DailyStudyPlan {
    const capacity = ctx.config.workload.dailyMinutes;
    const queue = candidateSessions(ctx, reviews, remediations);
    return fillDay(isoDay(ctx.now), capacity, queue);
  },

  /** Plan hebdomadaire (7 jours) : jours actifs remplis, jours inactifs vides ; s'arrête à la date cible. */
  buildWeekly(ctx: JourneyContext, reviews: ReviewItem[], remediations: RemediationPlan[]): WeeklyStudyPlan {
    const capacity = ctx.config.workload.dailyMinutes;
    const active = new Set(ctx.config.workload.activeDays);
    const queue = candidateSessions(ctx, reviews, remediations);
    const targetDate = targetDateOf(ctx);
    const days: DailyStudyPlan[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(ctx.now.getTime() + i * DAY_MS);
      if (targetDate && date.getTime() > new Date(targetDate).getTime()) break;
      const day = isoDay(date);
      days.push(active.has(date.getUTCDay()) ? fillDay(day, capacity, queue) : { day, sessions: [], totalMinutes: 0, capacityMinutes: 0 });
    }
    return { days, targetDate, generatedAt: ctx.now.toISOString() };
  },

  /** Estimation du temps restant et de la complétion. */
  estimateCompletion(ctx: JourneyContext): { remainingMinutes: number; estimatedDays: number; targetDate: string | null } {
    const remainingMinutes = Math.round(TimeTracker.estimatedRemainingSeconds(ctx.curriculum, ctx.state) / 60);
    const perDay = Math.max(1, ctx.config.workload.dailyMinutes);
    return { remainingMinutes, estimatedDays: Math.ceil(remainingMinutes / perDay), targetDate: targetDateOf(ctx) };
  },
};

function targetDateOf(ctx: JourneyContext): string | null {
  const g = ctx.config.goals.find((x) => x.type === "complete-program" && x.targetDate);
  return g?.targetDate ?? null;
}
