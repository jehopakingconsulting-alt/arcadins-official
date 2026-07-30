/**
 * Runtime — Assessment : CompetencyAssessmentEngine (Sprint F).
 *
 * Agrège les résultats par compétence et fournit un CONTRAT d'échange (`CompetencySignal`) destiné au
 * Journey Engine (Sprint E) — SANS dupliquer le MasteryEngine. Déterministe.
 */
import type {
  AssessmentPolicy,
  CompetencyAssessmentResult,
  CompetencySignal,
  PrivateQuestion,
  QuestionGradingResult,
} from "./types.ts";

function round(n: number): number {
  return Math.round(n * 1000) / 1000;
}

export const CompetencyAssessmentEngine = {
  aggregate(questions: PrivateQuestion[], results: QuestionGradingResult[], policy: AssessmentPolicy): CompetencyAssessmentResult[] {
    const passFraction = policy.passThresholdPercent / 100;
    const byComp = new Map<string, { earned: number; max: number; count: number }>();
    const resById = new Map(results.map((r) => [r.questionId, r]));

    for (const q of questions) {
      const comp = q.competencyId;
      if (!comp) continue;
      const r = resById.get(q.id);
      if (!r) continue;
      const acc = byComp.get(comp) ?? { earned: 0, max: 0, count: 0 };
      acc.earned += r.earnedPoints;
      acc.max += r.maximumPoints;
      acc.count += 1;
      byComp.set(comp, acc);
    }

    return [...byComp.entries()]
      .sort((a, b) => (a[0] < b[0] ? -1 : 1))
      .map(([competencyId, acc]): CompetencyAssessmentResult => {
        const score = acc.max > 0 ? round(acc.earned / acc.max) : 0;
        const provisionalLevel = score >= passFraction ? "strong" : score > 0 ? "fragile" : "insufficient";
        return {
          competencyId,
          questionsAssessed: acc.count,
          earnedPoints: round(acc.earned),
          maximumPoints: round(acc.max),
          score,
          provisionalLevel,
          confidence: round(Math.min(1, acc.count / 3)),
          needsRemediation: score < passFraction,
          hasEvidence: acc.count > 0,
        };
      });
  },

  /** Contrat d'échange vers le Journey Engine (aucune dépendance au MasteryEngine). */
  toSignals(competencyResults: CompetencyAssessmentResult[]): CompetencySignal[] {
    return competencyResults.map((c) => ({
      competencyId: c.competencyId,
      score: c.score,
      passed: c.provisionalLevel === "strong",
      evidenceCount: c.questionsAssessed,
      needsRemediation: c.needsRemediation,
    }));
  },
};
