/**
 * ARCADINS — Composition de droits PURE. Transforme une liste de grants composables
 * en un droit unique normalisé. Déterministe, aucune I/O. Imports RELATIFS.
 */
import type { AccessModel, ComposedEntitlement, EntitlementGrant, SupportLevel } from "./types.ts";
import { SUPPORT_RANK } from "./types.ts";

/** Compose une liste de grants (package + add-ons + licence) en un droit unique. */
export function composeEntitlements(grants: readonly EntitlementGrant[]): ComposedEntitlement {
  const products = new Set<string>();
  const resources = new Set<string>();
  let accessModel: AccessModel = "limited";
  let maxWeeks = 0;
  let mockAttempts = 0;
  let coachingHours = 0;
  let tutoringSessions = 0;
  let aiUnlimited = false;
  let aiPerMonth = 0;
  let support: SupportLevel = "standard";

  for (const g of grants) {
    switch (g.type) {
      case "product_access":
        if (g.productSlug) products.add(g.productSlug);
        if (g.accessModel === "lifetime") accessModel = "lifetime";
        else if (typeof g.weeks === "number") maxWeeks = Math.max(maxWeeks, g.weeks);
        break;
      case "bundle_products":
        for (const s of g.productSlugs) products.add(s);
        break;
      case "mock_exam_pack":
        mockAttempts += g.attempts;
        break;
      case "coaching_hours":
        coachingHours += g.hours;
        break;
      case "tutoring_sessions":
        tutoringSessions += g.sessions;
        break;
      case "ai_assistant":
        if (g.quota === "unlimited") aiUnlimited = true;
        else aiPerMonth += g.quota;
        break;
      case "downloadable_resources":
        resources.add(g.scope);
        break;
      case "support_level":
        if (SUPPORT_RANK[g.level] > SUPPORT_RANK[support]) support = g.level;
        break;
    }
  }

  const aiAssistant: ComposedEntitlement["aiAssistant"] =
    aiUnlimited ? "unlimited" : aiPerMonth > 0 ? { perMonth: aiPerMonth } : "none";

  return {
    productSlugs: [...products].sort(),
    accessModel,
    accessWeeks: accessModel === "lifetime" ? null : maxWeeks,
    mockAttempts,
    coachingHours,
    tutoringSessions,
    aiAssistant,
    downloadableResources: [...resources].sort(),
    supportLevel: support,
  };
}

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/** Date d'expiration d'accès à partir d'un droit composé (null = accès à vie). */
export function accessExpiry(entitlement: ComposedEntitlement, startsAt: Date): string | null {
  if (entitlement.accessModel === "lifetime" || entitlement.accessWeeks == null) return null;
  return new Date(startsAt.getTime() + entitlement.accessWeeks * WEEK_MS).toISOString();
}
