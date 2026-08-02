import { test } from "node:test";
import assert from "node:assert/strict";
import { categorizeLegacyEnrollment, summarizeReconciliation } from "./v1-reconciliation.ts";

const NOW = new Date("2026-08-02T00:00:00Z");

test("inscription active à un programme officiel → active_paid (ne pas re-facturer)", () => {
  const r = categorizeLegacyEnrollment(
    { user_id: "u1", program_id: "p1", program_slug: "tef-canada", plan: "course", billing: "full", status: "active", stripe_subscription_id: "sub_1", expires_at: "2026-12-31T00:00:00Z" },
    NOW,
  );
  assert.equal(r.category, "active_paid_enrollment");
  assert.equal(r.programCode, "tef-canada");
});

test("sans user_id → missing_account", () => {
  const r = categorizeLegacyEnrollment(
    { user_id: null, program_id: "p1", program_slug: "tef-canada", plan: null, billing: null, status: "active", stripe_subscription_id: null, expires_at: null },
    NOW,
  );
  assert.equal(r.category, "missing_account");
});

test("sans programme → missing_program", () => {
  const r = categorizeLegacyEnrollment(
    { user_id: "u1", program_id: null, program_slug: null, plan: null, billing: null, status: "active", stripe_subscription_id: null, expires_at: null },
    NOW,
  );
  assert.equal(r.category, "missing_program");
});

test("accès expiré → expired_enrollment (lecture seule, pas de re-facturation)", () => {
  const r = categorizeLegacyEnrollment(
    { user_id: "u1", program_id: "p1", program_slug: "tef-canada", plan: "course", billing: "full", status: "active", stripe_subscription_id: null, expires_at: "2026-01-01T00:00:00Z" },
    NOW,
  );
  assert.equal(r.category, "expired_enrollment");
});

test("statut suspended → revue manuelle", () => {
  const r = categorizeLegacyEnrollment(
    { user_id: "u1", program_id: "p1", program_slug: "tcf-canada", plan: "course", billing: "installment", status: "suspended", stripe_subscription_id: "sub_2", expires_at: null },
    NOW,
  );
  assert.equal(r.category, "manual_review_required");
});

test("summarize : compte par catégorie sans rien modifier", () => {
  const rows = [
    { user_id: "u1", program_id: "p1", program_slug: "tef-canada", plan: "c", billing: "full", status: "active", stripe_subscription_id: null, expires_at: "2026-12-31T00:00:00Z" },
    { user_id: null, program_id: "p1", program_slug: "tef-canada", plan: null, billing: null, status: "active", stripe_subscription_id: null, expires_at: null },
  ];
  const s = summarizeReconciliation(rows, NOW);
  assert.equal(s.total, 2);
  assert.equal(s.byCategory.active_paid_enrollment, 1);
  assert.equal(s.byCategory.missing_account, 1);
});
