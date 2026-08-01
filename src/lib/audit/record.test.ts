import { test } from "node:test";
import assert from "node:assert/strict";
import { buildAuditRecord } from "./record.ts";

test("audit: construit une ligne complète et normalisée", () => {
  const rec = buildAuditRecord({
    action: "role.change",
    actor: { id: "u1", email: "  Admin@Example.COM ", role: "admin" },
    targetType: "profile",
    targetId: "u2",
    metadata: { from: "student", to: "tutor" },
    context: { ip: "203.0.113.7", userAgent: "Mozilla/5.0" },
  });
  assert.equal(rec.action, "role.change");
  assert.equal(rec.actor_id, "u1");
  assert.equal(rec.actor_email, "admin@example.com"); // trim + lowercase
  assert.equal(rec.actor_role, "admin");
  assert.equal(rec.target_type, "profile");
  assert.equal(rec.target_id, "u2");
  assert.equal(rec.ip, "203.0.113.7");
  assert.deepEqual(rec.metadata, { from: "student", to: "tutor" });
});

test("audit: valeurs manquantes → null, metadata par défaut {}", () => {
  const rec = buildAuditRecord({ action: "admin.login" });
  assert.equal(rec.actor_id, null);
  assert.equal(rec.actor_email, null);
  assert.equal(rec.actor_role, null);
  assert.equal(rec.target_type, null);
  assert.equal(rec.target_id, null);
  assert.equal(rec.ip, null);
  assert.equal(rec.user_agent, null);
  assert.deepEqual(rec.metadata, {});
});

test("audit: chaînes vides/espaces → null", () => {
  const rec = buildAuditRecord({ action: "data.export", actor: { id: "  ", email: "" }, targetId: "   " });
  assert.equal(rec.actor_id, null);
  assert.equal(rec.actor_email, null);
  assert.equal(rec.target_id, null);
});

test("audit: action vide rejetée", () => {
  assert.throws(() => buildAuditRecord({ action: "   " }), /action/);
});
