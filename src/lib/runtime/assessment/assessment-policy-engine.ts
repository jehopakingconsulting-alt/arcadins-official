/**
 * Runtime — Assessment : AssessmentPolicyEngine (Sprint F).
 *
 * Résolution des politiques (seuils, tentatives, temps, navigation, divulgation) — PUR et déterministe.
 */
import type { AssessmentPolicy } from "./types.ts";

export const AssessmentPolicyEngine = {
  /** Date d'expiration d'une tentative (avec temps supplémentaire d'accessibilité). */
  expiryOf(startedAt: string, policy: AssessmentPolicy): string | null {
    if (policy.timing.durationLimitSeconds == null) return null;
    const totalSeconds = policy.timing.durationLimitSeconds + policy.timing.extraTimeSeconds;
    return new Date(new Date(startedAt).getTime() + totalSeconds * 1000).toISOString();
  },

  /** Une nouvelle tentative est-elle permise ? (nombre + délai de reprise) */
  canAttempt(policy: AssessmentPolicy, attemptNumber: number, lastCompletedAt: string | null, now: Date): { allowed: boolean; reason?: string } {
    if (attemptNumber > policy.attempts.maxAttempts) return { allowed: false, reason: "MAX_ATTEMPTS_EXCEEDED" };
    if (lastCompletedAt && policy.attempts.cooldownSeconds > 0) {
      const elapsed = (now.getTime() - new Date(lastCompletedAt).getTime()) / 1000;
      if (elapsed < policy.attempts.cooldownSeconds) return { allowed: false, reason: "COOLDOWN_ACTIVE" };
    }
    return { allowed: true };
  },

  /** La tentative est-elle expirée à `now` ? */
  isExpired(expiresAt: string | null, now: Date): boolean {
    return !!expiresAt && now.getTime() > new Date(expiresAt).getTime();
  },

  /** Temps écoulé (secondes) borné à 0. */
  elapsedSeconds(startedAt: string | null, now: Date): number {
    if (!startedAt) return 0;
    return Math.max(0, Math.floor((now.getTime() - new Date(startedAt).getTime()) / 1000));
  },
};
