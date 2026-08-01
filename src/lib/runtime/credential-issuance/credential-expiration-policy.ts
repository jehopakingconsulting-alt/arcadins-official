/**
 * Runtime — Credential Issuance : politique d'EXPIRATION (Sprint K4B, §18).
 *
 * Horloge INJECTÉE (jamais `Date.now()` dans la logique métier). Versionnée. Déterministe.
 */
export type ExpirationRule =
  | { kind: "never" }
  | { kind: "fixed_duration_days"; days: number; from: "issuedAt" | "validFrom" }
  | { kind: "absolute_date"; date: string };

export interface CredentialExpirationPolicy {
  rule: ExpirationRule;
  version: number;
}

export const NEVER_EXPIRES: CredentialExpirationPolicy = { rule: { kind: "never" }, version: 1 };

/** Calcule la date d'expiration (ISO) ou `null` si sans expiration. */
export function computeExpiresAt(policy: CredentialExpirationPolicy, times: { issuedAt: string; validFrom: string }): string | null {
  const r = policy.rule;
  if (r.kind === "never") return null;
  if (r.kind === "absolute_date") return r.date;
  const base = r.from === "validFrom" ? times.validFrom : times.issuedAt;
  return new Date(new Date(base).getTime() + r.days * 24 * 60 * 60 * 1000).toISOString();
}

/** Le credential est-il expiré à l'instant `now` (horloge injectée) ? */
export function isExpiredAt(expiresAt: string | null, now: Date): boolean {
  if (expiresAt === null) return false;
  return now.getTime() >= new Date(expiresAt).getTime();
}
