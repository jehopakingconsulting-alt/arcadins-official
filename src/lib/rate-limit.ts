// ============================================================================
// Limiteur de débit (anti-spam / anti-soumissions multiples).
//
// Deux implémentations :
//   • `rateLimit`        — fenêtre en MÉMOIRE (mono-process). Repli + tests.
//   • `enforceRateLimit` — magasin PARTAGÉ Upstash Redis (REST) si configuré,
//     compatible serverless / edge / node, SANS mémoire locale et SANS dépendance
//     (via `fetch`). Repli automatique sur la mémoire si Upstash absent/indispo.
//
// Config (aucune clé en dur) :
//   UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
// ============================================================================

interface Bucket { count: number; resetAt: number; }
const buckets = new Map<string, Bucket>();

export interface RateLimitResult { allowed: boolean; retryAfterMs: number }

/** Limiteur en mémoire (mono-process) — repli et base de tests. */
export function rateLimit(key: string, max: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || now >= b.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterMs: 0 };
  }
  if (b.count >= max) return { allowed: false, retryAfterMs: b.resetAt - now };
  b.count += 1;
  return { allowed: true, retryAfterMs: 0 };
}

/** À usage de test : réinitialise l'état mémoire. */
export function _resetRateLimit() { buckets.clear(); }

/**
 * Limiteur distribué (Upstash Redis REST) avec repli mémoire.
 * Fenêtre fixe : INCR + PEXPIRE. Fail-open (repli mémoire) si Upstash échoue,
 * pour ne pas bloquer les utilisateurs légitimes pendant un incident Redis.
 */
export async function enforceRateLimit(key: string, max: number, windowMs: number): Promise<RateLimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return rateLimit(key, max, windowMs); // repli mémoire (dev/mono-instance)

  try {
    const res = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify([["INCR", key], ["PTTL", key]]),
      // évite les blocages en cas d'incident réseau
      signal: AbortSignal.timeout(1500),
    });
    if (!res.ok) return rateLimit(key, max, windowMs);
    const out = (await res.json()) as Array<{ result: number }>;
    const count = out[0]?.result ?? 1;
    let ttl = out[1]?.result ?? -1;
    if (count === 1 || ttl < 0) {
      await fetch(`${url}/pexpire/${encodeURIComponent(key)}/${windowMs}`, {
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(1500),
      });
      ttl = windowMs;
    }
    return count <= max ? { allowed: true, retryAfterMs: 0 } : { allowed: false, retryAfterMs: ttl };
  } catch {
    return rateLimit(key, max, windowMs); // fail-open contrôlé
  }
}
