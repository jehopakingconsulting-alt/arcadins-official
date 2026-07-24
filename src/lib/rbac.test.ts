import { test } from "node:test";
import assert from "node:assert/strict";
import { hasPermission, canAccessAdmin, permissionsForRole } from "./rbac.ts";

test("un rôle inconnu ou nul n'a aucune permission", () => {
  assert.deepEqual(permissionsForRole(null), []);
  assert.deepEqual(permissionsForRole(undefined), []);
  assert.deepEqual(permissionsForRole("inexistant"), []);
});

test("student et tutor n'accèdent pas à l'admin", () => {
  assert.equal(canAccessAdmin("student"), false);
  assert.equal(canAccessAdmin("tutor"), false);
});

test("admin possède toutes les permissions clés", () => {
  for (const p of [
    "admin.access", "tutoring_requests.view", "tutor_applications.view",
    "contacts.view", "enrollments.view", "referrals.view", "content.manage", "users.manage",
  ] as const) {
    assert.equal(hasPermission("admin", p), true);
  }
});

test("support voit tutorat + contacts, mais pas la finance ni les candidatures tuteur", () => {
  assert.equal(canAccessAdmin("support"), true);
  assert.equal(hasPermission("support", "tutoring_requests.view"), true);
  assert.equal(hasPermission("support", "contacts.view"), true);
  assert.equal(hasPermission("support", "enrollments.view"), false);
  assert.equal(hasPermission("support", "tutor_applications.view"), false);
});

test("finance_manager voit inscriptions + parrainage, pas les contacts", () => {
  assert.equal(hasPermission("finance_manager", "enrollments.view"), true);
  assert.equal(hasPermission("finance_manager", "referrals.view"), true);
  assert.equal(hasPermission("finance_manager", "contacts.view"), false);
});

test("content_manager gère contenu + candidatures tuteur, sans finance", () => {
  assert.equal(hasPermission("content_manager", "content.manage"), true);
  assert.equal(hasPermission("content_manager", "tutor_applications.view"), true);
  assert.equal(hasPermission("content_manager", "enrollments.view"), false);
});
