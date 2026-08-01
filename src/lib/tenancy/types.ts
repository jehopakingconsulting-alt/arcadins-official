/**
 * ARCADINS — Frontière MULTI-TENANT (seam S5.5). Rétro-compatible : un tenant « root »
 * unique = comportement mono-tenant actuel. Prépare white-label / entreprise / université /
 * gouvernement / marketplace. AUCUNE logique métier tenant ici — seulement la frontière.
 * PUR / node-testable. Imports RELATIFS uniquement.
 */

export type TenantKind = "root" | "white_label" | "enterprise" | "university" | "government" | "partner";
export type TenantStatus = "active" | "suspended" | "archived";

/** Personnalisation d'un tenant (white-label) — vide pour root. */
export interface TenantBranding {
  displayName?: string;
  logoUrl?: string;
  primaryColor?: string;
  accentColor?: string;
}

export interface Tenant {
  id: string;
  slug: string;
  name: string;
  kind: TenantKind;
  primaryDomain?: string | null;
  branding: TenantBranding;
  status: TenantStatus;
}

/** Contexte tenant résolu pour une requête (aujourd'hui : toujours root). */
export interface TenantContext {
  tenant: Tenant;
  isRoot: boolean;
}
