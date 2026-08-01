/**
 * Runtime — Journey : JourneyEngine (Sprint E).
 *
 * Façade du moteur pédagogique. Analyse progression, compétences, prérequis et historique, puis produit un
 * plan d'apprentissage et des recommandations EXPLICABLES. PUR et DÉTERMINISTE (horloge injectée), sans jamais
 * modifier l'état d'entrée ni la base de données.
 */
import type {
  JourneyAction,
  JourneyContext,
  JourneyEngineResult,
  JourneyEvent,
  LearningJourneyState,
  RecommendationReason,
  UnlockDecision,
} from "./types.ts";
import { MasteryEngine } from "./mastery-engine.ts";
import { ReviewScheduler } from "./review-scheduler.ts";
import { RemediationEngine } from "./remediation-engine.ts";
import { GoalEngine } from "./goal-engine.ts";
import { RecommendationEngine } from "./recommendation-engine.ts";
import { StudyPlanner } from "./study-planner.ts";
import { PrerequisiteEngine } from "./prerequisite-engine.ts";
import { JourneyEvents } from "./journey-events.ts";
import { validateJourneyState } from "./validation.ts";
import { LessonEngine } from "../lesson-engine.ts";
import { LearningPathEngine } from "../learning-path-engine.ts";
import { UnlockRules } from "../unlock-rules.ts";
import { orderedModules } from "../helpers.ts";

const JOURNEY_STATE_VERSION = 1;

export const JourneyEngine = {
  /** Génère l'état de parcours complet (lecture seule, immuable). */
  generate(ctx: JourneyContext): JourneyEngineResult {
    const at = ctx.now.toISOString();

    const profile = MasteryEngine.build(ctx);
    const reviewSchedule = ReviewScheduler.schedule(ctx, profile);
    const remediations = RemediationEngine.build(ctx);
    const goals = GoalEngine.build(ctx, profile);
    const currentGoal = GoalEngine.current(goals);
    const recommendations = RecommendationEngine.build(ctx, { profile, reviews: reviewSchedule.items, remediations });

    const currentLesson = LessonEngine.continueWhereILeftOff(ctx.curriculum, ctx.state) ?? LearningPathEngine.nextLesson(ctx.curriculum, ctx.state) ?? null;
    const currentModule = currentLesson ? LessonEngine.moduleIndexOf(ctx.curriculum, currentLesson) : null;

    const availableActions = dedupeActions(recommendations.map((r) => ({ type: r.type, targetType: r.targetType, targetId: r.targetId })));
    const blockedActions = buildBlockedActions(ctx, profile);

    const dailyPlan = StudyPlanner.buildDaily(ctx, reviewSchedule.items, remediations);
    const weeklyPlan = StudyPlanner.buildWeekly(ctx, reviewSchedule.items, remediations);
    const estimatedCompletion = StudyPlanner.estimateCompletion(ctx);

    const reasonCodes = new Set<string>();
    for (const r of recommendations) for (const c of r.reasonCodes) reasonCodes.add(c);
    const recommendationReasons: RecommendationReason[] = [...reasonCodes].sort().map((code) => ({ code }));

    const state: LearningJourneyState = {
      version: JOURNEY_STATE_VERSION,
      generatedAt: at,
      programSlug: ctx.curriculum.slug,
      currentGoal,
      currentModule,
      currentLesson,
      nextRecommendedAction: recommendations[0] ?? null,
      availableActions,
      blockedActions,
      activeRemediations: remediations,
      reviewQueue: reviewSchedule.items,
      masterySummary: profile,
      dailyPlan,
      weeklyPlan,
      estimatedCompletion,
      recommendations,
      recommendationReasons,
      goals,
    };

    const events = buildEvents(at, state);
    const validation = validateJourneyState(ctx, state);
    return { state, events, validation };
  },
};

function dedupeActions(actions: JourneyAction[]): JourneyAction[] {
  const seen = new Set<string>();
  const out: JourneyAction[] = [];
  for (const a of actions) {
    const k = `${a.type}:${a.targetType}:${a.targetId}`;
    if (!seen.has(k)) {
      seen.add(k);
      out.push(a);
    }
  }
  return out;
}

function buildBlockedActions(ctx: JourneyContext, profile: ReturnType<typeof MasteryEngine.build>): UnlockDecision[] {
  const out: UnlockDecision[] = [];
  for (const m of orderedModules(ctx.curriculum)) {
    if (!UnlockRules.isModuleUnlocked(ctx.curriculum, ctx.state, m.index)) {
      out.push(PrerequisiteEngine.unlockDecision(ctx, "module", String(m.index), profile));
    }
  }
  return out;
}

function buildEvents(at: string, state: LearningJourneyState): JourneyEvent[] {
  const events: JourneyEvent[] = [JourneyEvents.generated(at, { programSlug: state.programSlug })];
  events.push(JourneyEvents.masteryUpdated(at, state.masterySummary.skills.length));
  for (const r of state.recommendations) events.push(JourneyEvents.recommendationCreated(at, r.id, r.type));
  for (const item of state.reviewQueue) events.push(JourneyEvents.reviewScheduled(at, item.id, item.dueAt));
  for (const rp of state.activeRemediations) events.push(JourneyEvents.remediationStarted(at, rp.targetId, rp.attempt));
  for (const b of state.blockedActions) if (b.mandatoryBlocked) events.push(JourneyEvents.prerequisiteFailed(at, b.targetId, b.reasonCodes));
  for (const g of state.goals) events.push(JourneyEvents.goalUpdated(at, g.goalId, g.status));
  events.push(JourneyEvents.planGenerated(at, state.dailyPlan.totalMinutes));
  return events;
}
