import { test } from "node:test";
import assert from "node:assert/strict";
import { Report } from "./lib.mjs";
import { transformAll } from "./transform.mjs";
import { resolveScope, filterByUser } from "./import-core.mjs";

// Jeu de données transformé réaliste (mêmes fixtures que transform.test.mjs).
const sample = () => ({
  users: [
    { id: 1, email: "admin@ex.com", nom: "A", prenom: "X", role: "admin", password_hash: "$2a$10$aaaaaaaaaaaaaaaaaaaaaa", created_at: "2026-06-01 10:00:00" },
    { id: 2, email: "learner@ex.com", nom: "B", prenom: "Y", role: "apprenant", password_hash: "$2a$10$bbbbbbbbbbbbbbbbbbbbbb", created_at: "2026-06-05 10:00:00", payment_confirmed: 1, payment_method: "paypal", referred_by: 1 },
    { id: 4, email: "lead@ex.com", nom: "L", prenom: "Z", role: "prospect", created_at: "2026-06-02 10:00:00" },
  ],
  prospects: [{ id: 1, email: "p@ex.com", nom: "P", prenom: "Q", created_at: "2026-06-04 10:00:00" }],
  tests: [
    { id: 1, user_id: 2, test_type: "final", score: 80, passed: 1, created_at: "2026-06-06 10:00:00" },
    { id: 3, user_id: 4, test_type: "trial", score: 55, created_at: "2026-06-05 09:00:00" },
  ],
  modules: [{ id: 1, user_id: 2, module_number: 1, status: "done", completed_at: "2026-06-07 10:00:00" }],
  certificates: [{ id: 1, user_id: 2, certificate_number: "ARC-1", nom: "B", prenom: "Y", score: 82, issued_at: "2026-06-08 10:00:00", pdf_path: "x.pdf" }],
  affiliate_commissions: [{ id: 1, referrer_id: 1, referred_user_id: 2, plan: "essential", amount: 25.5, status: "paid", created_at: "2026-06-09 10:00:00" }],
  admin_settings: [{ key: "passing_score_final", value: "70" }],
});

const build = () => transformAll(sample(), new Report());

// ── resolveScope : garde-fou de sécurité ────────────────────────────────────
test("resolveScope : dry-run sans cible → mode complet (comportement inchangé)", () => {
  assert.deepEqual(resolveScope({ willWrite: false, all: false, userId: null }), { mode: "all" });
});

test("resolveScope : IMPORT RÉEL sans cible → REFUSÉ", () => {
  const r = resolveScope({ willWrite: true, all: false, userId: null });
  assert.ok(r.error, "un import réel sans --user-id ni --all doit être refusé");
});

test("resolveScope : import réel complet exige --all explicite", () => {
  assert.deepEqual(resolveScope({ willWrite: true, all: true, userId: null }), { mode: "all" });
});

test("resolveScope : --user-id valide → mode pilote", () => {
  assert.deepEqual(resolveScope({ willWrite: true, all: false, userId: "2" }), { mode: "user", userId: 2 });
});

test("resolveScope : --user-id invalide → erreur", () => {
  assert.ok(resolveScope({ willWrite: true, userId: "abc" }).error);
  assert.ok(resolveScope({ willWrite: true, userId: "-1" }).error);
  assert.ok(resolveScope({ willWrite: true, userId: "0" }).error);
});

// ── filterByUser : périmètre strictement limité à un compte ──────────────────
test("filterByUser : ne conserve qu'un seul compte et ses données", () => {
  const out = filterByUser(build(), 2);
  assert.equal(out.authUsers.length, 1);
  assert.equal(out.authUsers[0].legacy_id, 2);
  assert.equal(out.learners.length, 1);
  assert.equal(out.payments.length, 1, "paiement du compte 2 conservé");
  assert.equal(out.modules.length, 1);
  assert.equal(out.certificates.length, 1);
  // seul le test de type 'account' du compte 2 (le test prospect id4 est exclu)
  assert.equal(out.tests.length, 1);
  assert.equal(out.tests[0].user_legacy_id, 2);
});

test("filterByUser : exclut prospects, réglages et journaux du périmètre pilote", () => {
  const out = filterByUser(build(), 2);
  assert.equal(out.prospects.length, 0);
  assert.equal(out.adminSettings.length, 0);
  assert.equal(out.auditLog.length, 0);
});

test("filterByUser : parrainage rattaché si le compte est parrain OU filleul", () => {
  const out2 = filterByUser(build(), 2); // filleul
  assert.equal(out2.referralRelationships.length, 1);
  const out1 = filterByUser(build(), 1); // parrain
  assert.equal(out1.referralRelationships.length, 1);
  assert.equal(out1.referralCommissions.length, 1);
});

test("filterByUser : un autre compte n'emporte pas les données d'autrui", () => {
  const out = filterByUser(build(), 1); // admin, sans paiement/module/cert
  assert.equal(out.authUsers.length, 1);
  assert.equal(out.authUsers[0].legacy_id, 1);
  assert.equal(out.payments.length, 0);
  assert.equal(out.modules.length, 0);
  assert.equal(out.certificates.length, 0);
  assert.equal(out.tests.length, 0);
});
