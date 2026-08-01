/**
 * Runtime — Integration : AcademicRateLimitService (Sprint I).
 *
 * Limitation par fenêtre glissante, via un `RateLimitStore` INJECTÉ (adapter mémoire pour tests uniquement).
 * Aucun service externe payant. Horloge injectée.
 */
import type { RateLimitPolicy } from "./config.ts";
import { DEFAULT_RATE_LIMITS } from "./config.ts";
import type { RateLimitDecision } from "./types.ts";

export interface RateLimitStore {
  /** Retourne les horodatages (ms) des requêtes dans la fenêtre pour une clé, puis enregistre `now`. */
  hit(key: string, windowSeconds: number, nowMs: number): number[];
}

/** Adapter mémoire (tests) : conserve les horodatages par clé. */
export function createInMemoryRateLimitStore(): RateLimitStore {
  const buckets = new Map<string, number[]>();
  return {
    hit(key, windowSeconds, nowMs) {
      const cutoff = nowMs - windowSeconds * 1000;
      const kept = (buckets.get(key) ?? []).filter((t) => t > cutoff);
      kept.push(nowMs);
      buckets.set(key, kept);
      return kept;
    },
  };
}

export const AcademicRateLimitService = {
  policyFor(action: string, overrides: Record<string, RateLimitPolicy> = {}): RateLimitPolicy {
    return overrides[action] ?? DEFAULT_RATE_LIMITS[action] ?? { windowSeconds: 60, max: 60 };
  },

  check(store: RateLimitStore, action: string, subjectKey: string, now: Date, overrides?: Record<string, RateLimitPolicy>): RateLimitDecision {
    const policy = AcademicRateLimitService.policyFor(action, overrides);
    const key = `${action}:${subjectKey}`;
    const hits = store.hit(key, policy.windowSeconds, now.getTime());
    const count = hits.length;
    if (count > policy.max) {
      const oldest = hits[0];
      const retryAfterSeconds = Math.max(1, Math.ceil((oldest + policy.windowSeconds * 1000 - now.getTime()) / 1000));
      return { allowed: false, key, window: policy.windowSeconds, count, limit: policy.max, retryAfterSeconds, reasonCode: "RATE_LIMITED" };
    }
    return { allowed: true, key, window: policy.windowSeconds, count, limit: policy.max, retryAfterSeconds: 0, reasonCode: null };
  },
};
