/**
 * ARCADINS — Résolution du contexte tenant, PURE. Reflète `current_tenant()` (SQL) :
 * défaut = ROOT (mono-tenant, comportement identique à aujourd'hui). La résolution par
 * domaine/slug prépare le multi-tenant SANS l'activer. Aucune I/O. Imports RELATIFS.
 */
import type { Tenant, TenantContext } from "./types.ts";

/** UUID déterministe du tenant root (identique au seed SQL de 0012). */
export const ROOT_TENANT_ID = "00000000-0000-0000-0000-000000000001";

export const ROOT_TENANT: Tenant = {
  id: ROOT_TENANT_ID,
  slug: "root",
  name: "ARCADINS",
  kind: "root",
  primaryDomain: null,
  branding: {},
  status: "active",
};

export function isRoot(tenant: Tenant): boolean {
  return tenant.id === ROOT_TENANT_ID;
}

/** Contexte par défaut : ROOT. Utilisé partout tant que le multi-tenant n'est pas activé. */
export function rootContext(): TenantContext {
  return { tenant: ROOT_TENANT, isRoot: true };
}

function toContext(tenant: Tenant | undefined | null): TenantContext {
  if (!tenant || tenant.status !== "active") return rootContext();
  return { tenant, isRoot: isRoot(tenant) };
}

/**
 * Résout le tenant d'une requête. Ordre : domaine exact → slug → ROOT (repli sûr).
 * `tenants` vide ⇒ ROOT. Un tenant inconnu/inactif ⇒ ROOT (jamais d'échec dur).
 * PUR : la source des tenants (DB) est fournie par l'appelant.
 */
export function resolveTenant(
  input: { domain?: string | null; slug?: string | null },
  tenants: readonly Tenant[] = [],
): TenantContext {
  const domain = input.domain?.toLowerCase().trim();
  const slug = input.slug?.toLowerCase().trim();
  if (domain) {
    const byDomain = tenants.find((t) => t.primaryDomain?.toLowerCase() === domain);
    if (byDomain) return toContext(byDomain);
  }
  if (slug) {
    const bySlug = tenants.find((t) => t.slug.toLowerCase() === slug);
    if (bySlug) return toContext(bySlug);
  }
  return rootContext();
}
