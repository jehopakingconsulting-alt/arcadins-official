/**
 * Runtime — Journey : GoalEngine (Sprint E).
 *
 * Gère des objectifs pédagogiques GÉNÉRIQUES (leçon, module, maîtrise, évaluation, projet, programme),
 * avec état, progression calculée, seuil, date cible, raisons de blocage et prochaine action. Déterministe.
 */
import type { GoalProgress, GoalStatus, JourneyContext, JourneyGoal, MasteryProfile } from "./types.ts";
import { CompletionCalculator } from "../completion-calculator.ts";
import { ProgressCalculator } from "../progress-calculator.ts";
import { LearningPathEngine } from "../learning-path-engine.ts";
import { UnlockRules } from "../unlock-rules.ts";
import { clamp, round } from "../helpers.ts";

/** Objectif implicite par défaut : terminer le programme. */
function programGoal(): JourneyGoal {
  return { id: "goal-program", type: "complete-program", targetType: "program", threshold: 100 };
}

export const GoalEngine = {
  build(ctx: JourneyContext, profile: MasteryProfile): GoalProgress[] {
    const goals = [...ctx.config.goals, programGoal()];
    return goals.map((g) => evaluate(ctx, g, profile));
  },

  /** Objectif courant : le premier objectif non complété (hors objectif programme placé en dernier). */
  current(goals: GoalProgress[]): GoalProgress | null {
    return goals.find((g) => g.status !== "completed") ?? null;
  },
};

function evaluate(ctx: JourneyContext, goal: JourneyGoal, profile: MasteryProfile): GoalProgress {
  const { curriculum, state, now } = ctx;
  const nextRef = LearningPathEngine.nextLesson(curriculum, state);
  const blockedReasons: string[] = [];
  let progress = 0;
  let completed = false;
  let blocked = false;
  const threshold = goal.threshold ?? null;

  switch (goal.type) {
    case "complete-program":
      progress = ProgressCalculator.programPercent(curriculum, state);
      completed = LearningPathEngine.isProgramComplete(curriculum, state);
      break;
    case "complete-module": {
      const idx = Number(goal.targetId);
      progress = ProgressCalculator.modulePercent(curriculum, state, idx);
      completed = CompletionCalculator.isModulePassed(curriculum, state, idx);
      if (!UnlockRules.isModuleUnlocked(curriculum, state, idx)) {
        blocked = true;
        blockedReasons.push("MODULE_LOCKED");
      }
      break;
    }
    case "complete-lesson": {
      completed = CompletionCalculator.isLessonPassed(state, String(goal.targetId));
      progress = completed ? 100 : CompletionCalculator.isLessonCompleted(state, String(goal.targetId)) ? 50 : 0;
      break;
    }
    case "reach-mastery": {
      const skill = profile.skills.find((s) => s.skillId === goal.targetId);
      const target = threshold ?? 0.85;
      progress = skill ? round(clamp((skill.score / target) * 100, 0, 100)) : 0;
      completed = !!skill && skill.score >= target;
      break;
    }
    case "pass-assessment": {
      const idx = Number(goal.targetId);
      completed = CompletionCalculator.moduleSummativePassed(state, idx);
      progress = completed ? 100 : 0;
      break;
    }
    case "submit-project": {
      const idx = Number(goal.targetId);
      completed = CompletionCalculator.modulePracticalSubmitted(state, idx);
      progress = completed ? 100 : 0;
      break;
    }
  }

  const expired = !completed && goal.targetDate ? new Date(goal.targetDate).getTime() < now.getTime() : false;
  const status: GoalStatus = completed
    ? "completed"
    : expired
      ? "expired"
      : blocked
        ? "blocked"
        : progress > 0
          ? "in_progress"
          : "not_started";
  if (expired) blockedReasons.push("PAST_TARGET_DATE");

  return {
    goalId: goal.id,
    status,
    progress,
    threshold,
    targetDate: goal.targetDate ?? null,
    blockedReasons,
    nextAction: completed || !nextRef ? undefined : { type: "start-next", targetType: "lesson", targetId: nextRef },
  };
}
