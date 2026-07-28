import { test } from "node:test";
import assert from "node:assert/strict";
import { Report } from "./lib.mjs";
import { transformAll } from "./transform.mjs";

const sample = () => ({
  users: [
    { id: 1, email: "ADMIN@Ex.com", nom: "A", prenom: "X", role: "admin", password_hash: "$2a$10$aaaaaaaaaaaaaaaaaaaaaa", created_at: "2026-06-01 10:00:00" },
    { id: 2, email: "learner@ex.com", nom: "B", prenom: "Y", role: "apprenant", password_hash: "$2a$10$bbbbbbbbbbbbbbbbbbbbbb", created_at: "2026-06-05 10:00:00", payment_confirmed: 1, payment_method: "paypal", referred_by: 1 },
    { id: 3, email: "LEARNER@ex.com", nom: "B2", prenom: "Y2", role: "apprenant", created_at: "2026-06-10 10:00:00" }, // doublon de #2
    { id: 4, email: "lead@ex.com", nom: "L", prenom: "Z", role: "prospect", created_at: "2026-06-02 10:00:00" },
    { id: 5, email: "not-an-email", nom: "C", prenom: "W", role: "apprenant", created_at: "2026-06-03 10:00:00" }, // invalide
  ],
  prospects: [{ id: 1, email: "p@ex.com", nom: "P", prenom: "Q", created_at: "2026-06-04 10:00:00" }],
  tests: [
    { id: 1, user_id: 2, test_type: "final", score: 80, passed: 1, attempt_number: 1, answers: "[]", created_at: "2026-06-06 10:00:00" },
    { id: 2, user_id: 999, test_type: "trial", score: 10 }, // orphelin
  ],
  modules: [{ id: 1, user_id: 2, module_number: 1, status: "done", completed_at: "2026-06-07 10:00:00" }],
  tuteur_modules: [],
  certificates: [{ id: 1, user_id: 2, certificate_number: "ARC-1", nom: "B", prenom: "Y", score: 82, issued_at: "2026-06-08 10:00:00", pdf_path: "x.pdf" }],
  affiliate_commissions: [{ id: 1, referrer_id: 1, referred_user_id: 2, plan: "essential", amount: 25.5, status: "paid", created_at: "2026-06-09 10:00:00", paid_at: "2026-06-10 10:00:00" }],
  admin_settings: [{ key: "passing_score_final", value: "70" }],
  admin_audit_log: [],
});

test("dédup email + séparation prospects + rejet email invalide", () => {
  const r = new Report();
  const out = transformAll(sample(), r);
  assert.equal(out.authUsers.length, 2, "2 comptes réels (admin + apprenant)");
  assert.equal(out.prospects.length, 2, "1 prospect(user) + 1 prospect(table)");
  const rejReasons = r.errors.map(e => e.reason);
  assert.ok(rejReasons.includes("email_invalide"), "email invalide rejeté");
  assert.ok(rejReasons.includes("doublon_email_ignore"), "doublon email ignoré");
});

test("mapping des rôles + stratégie bcrypt", () => {
  const out = transformAll(sample(), new Report());
  const admin = out.profiles.find(p => p.legacy_id === 1);
  const learner = out.profiles.find(p => p.legacy_id === 2);
  assert.equal(admin.role, "admin");
  assert.equal(learner.role, "student");
  assert.equal(out.authUsers.find(u => u.legacy_id === 1).password_strategy, "bcrypt_import");
  assert.equal(out.authUsers.find(u => u.legacy_id === 2).password_strategy, "bcrypt_import");
  // le hash réel n'est jamais exposé
  assert.equal(out.authUsers[0].encrypted_password, "<<bcrypt>>");
});

test("paiement confirmé + parrainage + commission en cents", () => {
  const out = transformAll(sample(), new Report());
  assert.equal(out.payments.length, 1);
  assert.equal(out.payments[0].source, "legacy_import");
  assert.equal(out.referralRelationships.length, 1);
  assert.equal(out.referralCommissions[0].commission_amount_cents, 2550);
  assert.equal(out.referralCommissions[0].status, "paid");
});

test("orphelins rejetés + dates historiques conservées", () => {
  const r = new Report();
  const out = transformAll(sample(), r);
  assert.equal(out.tests.length, 1, "test orphelin (user 999) rejeté");
  assert.ok(r.errors.some(e => e.entity === "tests" && e.reason === "user_introuvable"));
  const learner = out.profiles.find(p => p.legacy_id === 2);
  assert.equal(learner.created_at, "2026-06-05T10:00:00.000Z", "date d'inscription conservée");
  assert.equal(out.certificates.length, 1);
  assert.equal(out.certificates[0].certificate_number, "ARC-1");
});
