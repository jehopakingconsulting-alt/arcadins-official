/**
 * Runtime — Journey : validation d'invariants (Sprint E).
 */
import type { JourneyContext, JourneyValidationReport, JourneyValidationIssue, LearningJourneyState } from "./types.ts";
import { LessonEngine } from "../lesson-engine.ts";
import { PrerequisiteEngine } from "./prerequisite-engine.ts";
import { compareRecommendations } from "./recommendation-engine.ts";

/** Valide la cohérence d'un état de parcours au regard du contexte. */
export function validateJourneyState(ctx: JourneyContext, s: LearningJourneyState): JourneyValidationReport {
  const errors: JourneyValidationIssue[] = [];
  const warnings: JourneyValidationIssue[] = [];
  const err = (code: string, message: string) => errors.push({ level: "error", code, message });

  // 1) Cohérence programme.
  if (s.programSlug !== ctx.curriculum.slug) err("SLUG", "programSlug incohérent avec le cursus.");

  // 2) Aucun cycle de prérequis.
  const rules = PrerequisiteEngine.effectiveRules(
    ctx.curriculum,
    ctx.config.rules.filter((r) => r.family === "prerequisite").map((r) => ({
      id: r.id,
      targetType: (r.data.targetType as never) ?? "module",
      targetId: String(r.data.targetId ?? ""),
      requires: (r.data.requires as never) ?? [],
      mandatory: (r.data.mandatory as boolean) ?? true,
    })),
  );
  if (PrerequisiteEngine.detectCycle(rules).hasCycle) err("PREREQ_CYCLE", "Cycle de prérequis détecté.");

  // 3) Tri stable des recommandations (obligatoire d'abord).
  const sorted = [...s.recommendations].sort(compareRecommendations);
  if (JSON.stringify(sorted.map((r) => r.id)) !== JSON.stringify(s.recommendations.map((r) => r.id))) {
    err("REC_ORDER", "Recommandations non triées de façon stable.");
  }

  // 4) Aucune recommandation vers un contenu inaccessible (leçon).
  for (const r of s.recommendations) {
    if (r.targetType === "lesson" && !LessonEngine.isAccessible(ctx.state, r.targetId)) {
      err("REC_INACCESSIBLE", `Recommandation vers une leçon inaccessible : ${r.targetId}.`);
    }
  }

  // 5) Explicabilité : chaque recommandation porte au moins un reasonCode.
  for (const r of s.recommendations) if (r.reasonCodes.length === 0) err("REC_UNEXPLAINED", `Recommandation sans raison : ${r.id}.`);

  // 6) Charge : aucun jour ne dépasse sa capacité.
  const days = [s.dailyPlan, ...s.weeklyPlan.days];
  for (const d of days) if (d.totalMinutes > d.capacityMinutes) err("OVER_CAPACITY", `Charge du ${d.day} dépasse la capacité.`);

  // 7) Objectifs : progression bornée 0..100.
  for (const g of s.goals) if (g.progress < 0 || g.progress > 100) err("GOAL_PROGRESS", `Objectif ${g.goalId} hors bornes.`);

  // 8) Remédiations bornées.
  for (const rp of s.activeRemediations) if (rp.attempt > rp.maxAttempts + 1) warnings.push({ level: "warning", code: "REMEDIATION_OVER", message: `Remédiation ${rp.targetId} au-delà de la limite.` });

  return { ok: errors.length === 0, errors, warnings };
}
