/**
 * Runtime — Assessment : PartialCreditEngine (Sprint F).
 *
 * Crédits partiels PURS, sans double comptage, toujours bornés : 0 ≤ earned ≤ maximumPoints.
 */

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}
function round(n: number): number {
  return Math.round(n * 1000) / 1000;
}

export const PartialCreditEngine = {
  /** Choix multiple : crédit total ou partiel (bonnes − mauvaises) / total. */
  multiple(correct: string[], response: string[], points: number, partial: boolean): number {
    const C = new Set(correct);
    const R = new Set(response);
    if (!partial) {
      const equal = C.size === R.size && [...C].every((x) => R.has(x));
      return equal ? points : 0;
    }
    if (C.size === 0) return 0;
    let good = 0;
    let bad = 0;
    for (const r of R) {
      if (C.has(r)) good++;
      else bad++;
    }
    return round(clamp(((good - bad) / C.size) * points, 0, points));
  },

  /** Association : fraction de paires exactes. */
  matching(pairs: [string, string][], response: [string, string][], points: number, partial: boolean): number {
    if (pairs.length === 0) return 0;
    const key = (p: [string, string]) => `${p[0]}|${p[1]}`;
    const correctSet = new Set(pairs.map(key));
    const matched = response.filter((p) => correctSet.has(key(p))).length;
    if (!partial) return matched === pairs.length && response.length === pairs.length ? points : 0;
    return round(clamp((matched / pairs.length) * points, 0, points));
  },

  /** Classement : fraction de positions correctes. */
  ordering(order: string[], response: string[], points: number, partial: boolean): number {
    if (order.length === 0) return 0;
    let correct = 0;
    for (let i = 0; i < order.length; i++) if (response[i] === order[i]) correct++;
    if (!partial) return correct === order.length && response.length === order.length ? points : 0;
    return round(clamp((correct / order.length) * points, 0, points));
  },
};
