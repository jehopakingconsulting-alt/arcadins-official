/**
 * Scoring interne ARCADINS — source unique de vérité.
 *
 * IMPORTANT : ces utilitaires ne concernent QUE les évaluations internes de la
 * plateforme (quiz de modules, examens blancs), exprimées en pourcentage sur 100.
 * Ils ne doivent JAMAIS servir à représenter un résultat officiel TEF / TCF ni un
 * niveau CECRL / NCLC (CLB) : ces échelles officielles sont des libellés distincts
 * (ex. « B2 », « CLB 7 ») affichés tels quels, sans conversion ni pourcentage.
 */

/** Note de passage interne, en pourcentage (sur 100). */
export const PASSING_SCORE = 65;

/** L'échelle interne de référence : tout score est ramené sur 100. */
export const MAX_SCORE = 100;

/**
 * Convertit un score brut en pourcentage entier (0–100).
 * Protège contre un `maxScore` nul ou négatif (retourne 0) — ce qui évite les
 * affichages incohérents du type « 70/10 » ou une division par zéro.
 */
export function toPercent(score: number, maxScore: number): number {
  if (!maxScore || maxScore <= 0) return 0;
  const pct = Math.round((score / maxScore) * 100);
  return Math.max(0, Math.min(100, pct));
}

/**
 * Formate un score interne de façon cohérente : « 12/20 (60%) ».
 * Un seul endroit décide de la présentation, partout dans l'application.
 */
export function formatScore(score: number, maxScore: number): string {
  return `${score}/${maxScore} (${toPercent(score, maxScore)}%)`;
}

/** Un score interne atteint-il la note de passage ? */
export function isPassing(score: number, maxScore: number): boolean {
  return toPercent(score, maxScore) >= PASSING_SCORE;
}
