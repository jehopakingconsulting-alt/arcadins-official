/**
 * Runtime — UI/Completion : agrégation PUBLIQUE des compétences (Sprint K3C).
 *
 * Produit un résumé sûr : compétence, statut, score public, seuil, acquise/non acquise, recommandation. Ne
 * réécrit pas la correction (consomme les niveaux déjà produits par G/K3B). N'expose jamais barème/réponses.
 */
import type { CompletionInput } from "./completion-types.ts";
import type { ResultPolicyConfig } from "./completion-config.ts";

export interface CompetencySummaryItem {
  competencyId: string;
  scorePercent: number; // public autorisé (arrondi)
  thresholdPercent: number;
  acquired: boolean;
  needsRemediation: boolean;
  recommendationKey: string | null;
}

export interface CompetencySummary {
  items: CompetencySummaryItem[];
  acquiredIds: string[];
  notAcquiredIds: string[];
  remainingRequirementKeys: string[];
}

export function aggregateCompetencies(input: CompletionInput, config: ResultPolicyConfig): CompetencySummary {
  const thresholdPercent = Math.round(config.minCompetencyScore * 100);
  const items: CompetencySummaryItem[] = input.exam.competencies
    .map((c) => {
      const scorePercent = Math.round(c.score * 100);
      const acquired = c.score >= config.minCompetencyScore && !c.needsRemediation;
      return {
        competencyId: c.competencyId,
        scorePercent,
        thresholdPercent,
        acquired,
        needsRemediation: c.needsRemediation,
        recommendationKey: acquired ? null : "completion.competency.review",
      };
    })
    .sort((a, b) => a.competencyId.localeCompare(b.competencyId));

  const acquiredIds = items.filter((i) => i.acquired).map((i) => i.competencyId);
  const notAcquiredIds = items.filter((i) => !i.acquired).map((i) => i.competencyId);
  const remainingRequirementKeys: string[] = [];
  if (notAcquiredIds.length > 0) remainingRequirementKeys.push("completion.remaining.competencies");
  if (input.quizzes.some((q) => q.required && !q.passed)) remainingRequirementKeys.push("completion.remaining.quizzes");

  return { items, acquiredIds, notAcquiredIds, remainingRequirementKeys };
}
