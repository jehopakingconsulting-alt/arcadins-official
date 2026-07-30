/**
 * Runtime — Assessment : QuestionSelector (Sprint F).
 *
 * Sélection DÉTERMINISTE des questions (graine injectée). À graine et état identiques, la sélection est identique.
 * Gère nombre demandé, compétences ciblées, distribution par difficulté/type, exclusions.
 */
import type { PrivateQuestion, QuestionDifficulty, QuestionSelectionRule, QuestionType } from "./types.ts";
import type { QuestionBank } from "./question-bank.ts";
import { createRng } from "./config.ts";

/** Mélange déterministe (Fisher-Yates) piloté par une graine. */
function seededShuffle<T>(items: T[], seed: number): T[] {
  const rng = createRng(seed);
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const QuestionSelector = {
  select(bank: QuestionBank, rule: QuestionSelectionRule, seed: number): PrivateQuestion[] {
    const pool = bank.find({
      moduleId: rule.moduleId,
      lessonId: rule.lessonId,
      competencyIds: rule.competencyIds,
      excludeIds: rule.excludeIds,
    });

    // Tri de base stable par id (déterminisme avant mélange).
    const base = [...pool].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
    const shuffled = seededShuffle(base, seed);

    // Distribution par difficulté (si demandée), sinon par type, sinon simple prise.
    let picked: PrivateQuestion[] = [];
    if (rule.difficultyDistribution) {
      picked = pickByDistribution(shuffled, rule.difficultyDistribution, (q) => q.difficulty);
    } else if (rule.typeDistribution) {
      picked = pickByDistribution(shuffled, rule.typeDistribution, (q) => q.type);
    }

    // Complète jusqu'au nombre demandé avec les questions restantes (déterministe).
    const chosen = new Set(picked.map((q) => q.id));
    for (const q of shuffled) {
      if (picked.length >= rule.count) break;
      if (!chosen.has(q.id)) {
        picked.push(q);
        chosen.add(q.id);
      }
    }

    return picked.slice(0, rule.count);
  },

  /** Nombre de questions disponibles pour une règle (utile pour détecter une banque insuffisante). */
  available(bank: QuestionBank, rule: QuestionSelectionRule): number {
    return bank.find({ moduleId: rule.moduleId, lessonId: rule.lessonId, competencyIds: rule.competencyIds, excludeIds: rule.excludeIds })
      .length;
  },
};

function pickByDistribution<K extends QuestionDifficulty | QuestionType>(
  shuffled: PrivateQuestion[],
  distribution: Partial<Record<K, number>>,
  keyOf: (q: PrivateQuestion) => K,
): PrivateQuestion[] {
  const out: PrivateQuestion[] = [];
  for (const key of Object.keys(distribution) as K[]) {
    const need = distribution[key] ?? 0;
    let taken = 0;
    for (const q of shuffled) {
      if (taken >= need) break;
      if (keyOf(q) === key && !out.includes(q)) {
        out.push(q);
        taken++;
      }
    }
  }
  return out;
}
