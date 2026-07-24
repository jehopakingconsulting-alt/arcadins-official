// Limiteur de débit en mémoire (anti-spam / anti-soumissions multiples).
// Suffisant pour un process ; pour un déploiement multi-instances, remplacer
// par un magasin partagé (Upstash/Redis) — point noté pour le staging.

interface Bucket { count: number; resetAt: number; }
const buckets = new Map<string, Bucket>();

export interface RateLimitResult { allowed: boolean; retryAfterMs: number; }

/**
 * @param key    identifiant (ex. `tutoring:<ip>`)
 * @param max    nombre d'actions autorisées dans la fenêtre
 * @param windowMs durée de la fenêtre en millisecondes
 */
export function rateLimit(key: string, max: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || now >= b.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterMs: 0 };
  }
  if (b.count >= max) {
    return { allowed: false, retryAfterMs: b.resetAt - now };
  }
  b.count += 1;
  return { allowed: true, retryAfterMs: 0 };
}

/** À usage de test : réinitialise l'état. */
export function _resetRateLimit() { buckets.clear(); }
