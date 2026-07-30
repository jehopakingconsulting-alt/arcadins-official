/**
 * Runtime — Journey : RecommendationEngine (Sprint E).
 *
 * Génère des recommandations classées par priorité, TOUTES explicables (reasonCodes) et DÉTERMINISTES.
 * Ne recommande jamais un contenu inaccessible. Tri stable ; un recommandeur avancé injectable (désactivé par défaut).
 */
import type {
  JourneyContext,
  JourneyRecommendation,
  MasteryProfile,
  RemediationPlan,
  ReviewItem,
} from "./types.ts";
import { LessonEngine } from "../lesson-engine.ts";
import { LearningPathEngine } from "../learning-path-engine.ts";
import { UnlockRules } from "../unlock-rules.ts";
import { CompletionCalculator } from "../completion-calculator.ts";
import { orderedModules, findLesson, clamp } from "../helpers.ts";
import { MasteryEngine } from "./mastery-engine.ts";

export const RecommendationEngine = {
  build(
    ctx: JourneyContext,
    input: { profile: MasteryProfile; reviews: ReviewItem[]; remediations: RemediationPlan[] },
  ): JourneyRecommendation[] {
    const { curriculum, state, config } = ctx;
    const recs: JourneyRecommendation[] = [];
    const lessonMinutes = (ref: string) => (findLesson(curriculum, ref)?.durationMinutes ?? config.defaults.lessonMinutes);

    // Reprise / continuer
    const resume = LessonEngine.continueWhereILeftOff(curriculum, state);
    if (resume && LessonEngine.isAccessible(state, resume)) {
      const inProgress = LessonEngine.stateOf(state, resume) === "in_progress";
      recs.push(rec({
        type: inProgress ? "continue" : "resume",
        priority: inProgress ? 60 : 58,
        targetType: "lesson",
        targetId: resume,
        reasonCodes: [inProgress ? "IN_PROGRESS" : "RECENTLY_VIEWED"],
        confidence: 0.9,
        estimatedMinutes: lessonMinutes(resume),
        mandatory: false,
      }));
    }

    // Prochaine leçon
    const next = LearningPathEngine.nextLesson(curriculum, state);
    if (next && next !== resume && LessonEngine.isAccessible(state, next)) {
      recs.push(rec({
        type: "start-next",
        priority: 50,
        targetType: "lesson",
        targetId: next,
        reasonCodes: ["NEXT_IN_PATH"],
        confidence: 0.85,
        estimatedMinutes: lessonMinutes(next),
        mandatory: false,
      }));
    }

    // Prérequis obligatoire (prochain module verrouillé)
    const lockedModule = LearningPathEngine.nextLockedModule(curriculum, state);
    if (lockedModule !== null) {
      const mods = orderedModules(curriculum);
      const pos = mods.findIndex((m) => m.index === lockedModule);
      const required = mods[pos - 1];
      if (required) {
        recs.push(rec({
          type: "complete-prerequisite",
          priority: 90,
          targetType: "module",
          targetId: String(required.index),
          reasonCodes: ["MANDATORY_PREREQ"],
          confidence: 1,
          estimatedMinutes: config.defaults.lessonMinutes,
          mandatory: true,
        }));
      }
    }

    // Projet / évaluation en attente pour les modules ouverts
    for (const m of orderedModules(curriculum)) {
      if (!UnlockRules.isModuleUnlocked(curriculum, state, m.index)) continue;
      const allLessonsPassed = CompletionCalculator.moduleLessonsAllPassed(curriculum, state, m.index);
      if (allLessonsPassed && !CompletionCalculator.moduleSummativePassed(state, m.index)) {
        recs.push(rec({
          type: "prepare-assessment",
          priority: 80,
          targetType: "assessment",
          targetId: String(m.index),
          reasonCodes: ["READY_FOR_SUMMATIVE"],
          confidence: 0.8,
          estimatedMinutes: config.defaults.lessonMinutes,
          mandatory: false,
        }));
      }
      if (allLessonsPassed && !CompletionCalculator.modulePracticalSubmitted(state, m.index)) {
        recs.push(rec({
          type: "finish-project",
          priority: 78,
          targetType: "project",
          targetId: String(m.index),
          reasonCodes: ["PROJECT_PENDING"],
          confidence: 0.75,
          estimatedMinutes: config.defaults.lessonMinutes,
          mandatory: false,
        }));
      }
    }

    // Remédiation (redo activity) — hors remédiation épuisée (sortie encadrée gérée ailleurs)
    for (const plan of input.remediations) {
      if (plan.exhausted) continue;
      recs.push(rec({
        type: "redo-activity",
        priority: 75,
        targetType: plan.targetType,
        targetId: plan.targetId,
        reasonCodes: plan.reasonCodes,
        confidence: 0.7,
        estimatedMinutes: config.defaults.remediationMinutes,
        mandatory: false,
      }));
    }

    // Révisions échues
    for (const item of input.reviews.filter((r) => r.overdue)) {
      recs.push(rec({
        type: "review",
        priority: 70 + Math.min(20, item.priority - 100),
        targetType: "skill",
        targetId: item.targetId,
        reasonCodes: ["OVERDUE_REVIEW"],
        confidence: 0.8,
        estimatedMinutes: config.defaults.reviewMinutes,
        mandatory: false,
        expiresAt: undefined,
      }));
    }

    // Renforcement des compétences faibles
    for (const skill of MasteryEngine.weakSkills(input.profile)) {
      recs.push(rec({
        type: "strengthen-skill",
        priority: 40 + Math.round((1 - skill.score) * 10),
        targetType: "skill",
        targetId: skill.skillId,
        reasonCodes: ["WEAK_SKILL"],
        confidence: clamp(0.5 + (1 - skill.score) * 0.4, 0, 1),
        estimatedMinutes: config.defaults.reviewMinutes,
        mandatory: false,
      }));
    }

    // Tri stable + plafonnement.
    recs.sort(compareRecommendations);
    const limited = recs.slice(0, config.recommendation.maxItems);
    return config.advancedRecommender ? config.advancedRecommender.rank(limited) : limited;
  },
};

/** Comparateur STABLE : obligatoire → échéance proche → priorité → confiance → id. */
export function compareRecommendations(a: JourneyRecommendation, b: JourneyRecommendation): number {
  if (a.mandatory !== b.mandatory) return a.mandatory ? -1 : 1;
  const ea = a.expiresAt ?? "~"; // "~" trie après toute date ISO
  const eb = b.expiresAt ?? "~";
  if (ea !== eb) return ea < eb ? -1 : 1;
  if (a.priority !== b.priority) return b.priority - a.priority;
  if (a.confidence !== b.confidence) return b.confidence - a.confidence;
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
}

function rec(p: Omit<JourneyRecommendation, "id" | "titleKey" | "descriptionKey">): JourneyRecommendation {
  const id = `rec-${p.type}-${p.targetType}-${p.targetId}`;
  return {
    id,
    titleKey: `journey.rec.${p.type}.title`,
    descriptionKey: `journey.rec.${p.type}.description`,
    ...p,
  };
}
