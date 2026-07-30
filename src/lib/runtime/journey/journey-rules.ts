/**
 * Runtime — Journey : JourneyRules (Sprint E).
 *
 * Système DÉCLARATIF de règles pédagogiques, piloté par les données du curriculum (jamais des modules codés
 * un par un). Les règles par défaut se dérivent de la structure ; la config peut en ajouter/surcharger.
 */
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type { JourneyRule } from "./types.ts";
import { orderedModules } from "../helpers.ts";

/** Construit les règles par défaut à partir du curriculum (générique). */
export function buildDefaultRules(curriculum: ProgramCurriculumV2): JourneyRule[] {
  const rules: JourneyRule[] = [];
  const mods = orderedModules(curriculum);

  // Prérequis + séquençage : chaque module dépend du précédent.
  for (let i = 1; i < mods.length; i++) {
    rules.push({
      id: `rule-prereq-m${mods[i].index}`,
      family: "prerequisite",
      data: { targetType: "module", targetId: String(mods[i].index), requires: [{ targetType: "module", targetId: String(mods[i - 1].index) }], mandatory: true },
    });
    rules.push({
      id: `rule-seq-m${mods[i].index}`,
      family: "sequencing",
      data: { after: String(mods[i - 1].index), then: String(mods[i].index) },
    });
  }

  // Complétion de module : leçons réussies + sommatif + TP.
  for (const m of mods) {
    rules.push({
      id: `rule-completion-m${m.index}`,
      family: "completion",
      data: { targetType: "module", targetId: String(m.index), needs: ["lessons-passed", "summative-passed", "practical-submitted"] },
    });
  }
  return rules;
}

/** Fusionne règles par défaut (curriculum) et règles injectées (config). Les règles config priment par id. */
export function mergeRules(defaults: JourneyRule[], injected: JourneyRule[]): JourneyRule[] {
  const byId = new Map<string, JourneyRule>();
  for (const r of defaults) byId.set(r.id, r);
  for (const r of injected) byId.set(r.id, r);
  return [...byId.values()].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}
