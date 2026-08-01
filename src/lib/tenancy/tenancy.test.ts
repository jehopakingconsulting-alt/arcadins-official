import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveTenant, rootContext, isRoot, ROOT_TENANT, ROOT_TENANT_ID } from "./context.ts";
import type { Tenant } from "./types.ts";

const acme: Tenant = { id: "t-acme", slug: "acme-univ", name: "ACME University", kind: "university", primaryDomain: "learn.acme.edu", branding: { displayName: "ACME Learn", primaryColor: "#003" }, status: "active" };
const suspended: Tenant = { ...acme, id: "t-sus", slug: "sus", primaryDomain: "sus.example", status: "suspended" };

test("défaut = ROOT (rétro-compatibilité mono-tenant)", () => {
  assert.equal(rootContext().tenant.id, ROOT_TENANT_ID);
  assert.equal(rootContext().isRoot, true);
  assert.equal(isRoot(ROOT_TENANT), true);
});

test("aucun tenant fourni → ROOT", () => {
  assert.equal(resolveTenant({ domain: "learn.acme.edu" }, []).tenant.id, ROOT_TENANT_ID);
  assert.equal(resolveTenant({}, [acme]).tenant.id, ROOT_TENANT_ID);
});

test("résolution par domaine (prioritaire) puis slug", () => {
  const byDomain = resolveTenant({ domain: "LEARN.ACME.EDU" }, [acme]);
  assert.equal(byDomain.tenant.id, "t-acme");
  assert.equal(byDomain.isRoot, false);
  const bySlug = resolveTenant({ slug: "acme-univ" }, [acme]);
  assert.equal(bySlug.tenant.id, "t-acme");
});

test("tenant inconnu ou inactif → ROOT (repli sûr, jamais d'échec)", () => {
  assert.equal(resolveTenant({ domain: "unknown.example" }, [acme]).tenant.id, ROOT_TENANT_ID);
  assert.equal(resolveTenant({ domain: "sus.example" }, [suspended]).tenant.id, ROOT_TENANT_ID, "suspendu → root");
});
