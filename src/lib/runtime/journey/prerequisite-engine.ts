/**
 * Runtime — Journey : PrerequisiteEngine (Sprint E).
 *
 * Prérequis GÉNÉRIQUES pilotés par la structure du curriculum (module N requiert N-1 validé) + règles
 * déclaratives injectées. Fournit conditions satisfaites/manquantes, distingue blocage obligatoire vs
 * recommandation facultative, et détecte les cycles/dépendances impossibles.
 */
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type {
  JourneyContext,
  MasteryProfile,
  PrerequisiteCondition,
  PrerequisiteResult,
  PrerequisiteRule,
  UnlockDecision,
} from "./types.ts";
import { CompletionCalculator } from "../completion-calculator.ts";
import { orderedModules } from "../helpers.ts";

function keyOf(c: { targetType: string; targetId: string }): string {
  return `${c.targetType}:${c.targetId}`;
}

export const PrerequisiteEngine = {
  /** Règles de prérequis effectives : chaîne de modules (générique) + règles injectées. */
  effectiveRules(curriculum: ProgramCurriculumV2, extra: PrerequisiteRule[] = []): PrerequisiteRule[] {
    const chain: PrerequisiteRule[] = [];
    const mods = orderedModules(curriculum);
    for (let i = 1; i < mods.length; i++) {
      chain.push({
        id: `prq-module-${mods[i].index}`,
        targetType: "module",
        targetId: String(mods[i].index),
        requires: [{ targetType: "module", targetId: String(mods[i - 1].index) }],
        mandatory: true,
      });
    }
    return [...chain, ...extra];
  },

  /** Détecte un cycle dans le graphe de prérequis (dépendance impossible). */
  detectCycle(rules: PrerequisiteRule[]): { hasCycle: boolean; nodes: string[] } {
    const graph = new Map<string, string[]>();
    for (const r of rules) graph.set(keyOf(r), r.requires.map(keyOf));
    const state = new Map<string, 0 | 1 | 2>(); // 0=blanc,1=gris,2=noir
    const cyclePath: string[] = [];
    let found = false;

    const dfs = (node: string): void => {
      if (found) return;
      state.set(node, 1);
      for (const dep of graph.get(node) ?? []) {
        const st = state.get(dep) ?? 0;
        if (st === 1) {
          found = true;
          cyclePath.push(dep);
          return;
        }
        if (st === 0 && graph.has(dep)) dfs(dep);
      }
      state.set(node, 2);
    };

    for (const node of graph.keys()) if ((state.get(node) ?? 0) === 0) dfs(node);
    return { hasCycle: found, nodes: cyclePath };
  },

  /** Une condition est-elle satisfaite au regard de l'état/maîtrise ? */
  isConditionMet(ctx: JourneyContext, cond: PrerequisiteCondition, profile?: MasteryProfile): boolean {
    const { curriculum, state, config } = ctx;
    if (cond.targetType === "module") return CompletionCalculator.isModulePassed(curriculum, state, Number(cond.targetId));
    if (cond.targetType === "lesson") return CompletionCalculator.isLessonPassed(state, cond.targetId);
    if (cond.targetType === "skill") {
      const skill = profile?.skills.find((s) => s.skillId === cond.targetId);
      return !!skill && skill.score >= config.mastery.thresholds.passed;
    }
    return false;
  },

  /** Évalue les prérequis d'une cible : conditions satisfaites/manquantes + explication. */
  evaluate(
    ctx: JourneyContext,
    targetType: PrerequisiteRule["targetType"],
    targetId: string,
    profile?: MasteryProfile,
  ): PrerequisiteResult {
    const rules = PrerequisiteEngine.effectiveRules(ctx.curriculum, ctx.config.rules.filter((r) => r.family === "prerequisite").map(toPrereqRule));
    const applicable = rules.filter((r) => r.targetType === targetType && r.targetId === targetId);
    const satisfied: PrerequisiteCondition[] = [];
    const missing: PrerequisiteCondition[] = [];
    for (const rule of applicable) {
      for (const cond of rule.requires) {
        (PrerequisiteEngine.isConditionMet(ctx, cond, profile) ? satisfied : missing).push(cond);
      }
    }
    const ok = missing.length === 0;
    return {
      targetType,
      targetId,
      satisfied: ok,
      satisfiedConditions: satisfied,
      missingConditions: missing,
      reasonCodes: ok ? ["PREREQ_MET"] : ["PREREQ_MISSING"],
    };
  },

  /** Décision de déblocage d'une cible (obligatoire vs facultatif). */
  unlockDecision(
    ctx: JourneyContext,
    targetType: PrerequisiteRule["targetType"],
    targetId: string,
    profile?: MasteryProfile,
  ): UnlockDecision {
    const res = PrerequisiteEngine.evaluate(ctx, targetType, targetId, profile);
    const optional = ctx.config.optionalTargetIds.includes(targetId);
    const mandatoryBlocked = !res.satisfied && !optional;
    return {
      targetType,
      targetId,
      unlocked: res.satisfied || optional,
      mandatoryBlocked,
      reasonCodes: res.satisfied ? ["UNLOCKED"] : optional ? ["OPTIONAL_UNLOCKED"] : ["LOCKED_PREREQ"],
    };
  },
};

function toPrereqRule(r: { data: Record<string, unknown>; id: string }): PrerequisiteRule {
  const d = r.data as Partial<PrerequisiteRule>;
  return {
    id: r.id,
    targetType: (d.targetType ?? "module") as PrerequisiteRule["targetType"],
    targetId: String(d.targetId ?? ""),
    requires: (d.requires ?? []) as PrerequisiteCondition[],
    mandatory: d.mandatory ?? true,
  };
}
