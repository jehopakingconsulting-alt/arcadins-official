import { test } from "node:test";
import assert from "node:assert/strict";
import { validateTutoringTransition, allowedTutoringTargets, TUTORING_INITIAL_STATUS } from "./status.ts";

test("statut initial = submitted", () => {
  assert.equal(TUTORING_INITIAL_STATUS, "submitted");
});

test("transitions valides du parcours élève", () => {
  assert.ok(validateTutoringTransition("submitted", "under_review").ok);
  assert.ok(validateTutoringTransition("under_review", "contacted").ok);
  assert.ok(validateTutoringTransition("contacted", "scheduled").ok);
  assert.ok(validateTutoringTransition("scheduled", "enrolled").ok);
  assert.ok(validateTutoringTransition("enrolled", "closed").ok);
});

test("transitions invalides refusées", () => {
  assert.equal(validateTutoringTransition("submitted", "enrolled").ok, false); // saut interdit
  assert.equal(validateTutoringTransition("closed", "enrolled").ok, false);   // terminal
  assert.equal(validateTutoringTransition("cancelled", "under_review").ok, false);
  assert.equal(validateTutoringTransition("submitted", "submitted").ok, false); // identique
  assert.equal(validateTutoringTransition("foo", "under_review").ok, false);   // inconnu
});

test("réouverture explicite : terminal → under_review uniquement", () => {
  assert.ok(validateTutoringTransition("closed", "under_review", { reopen: true }).ok);
  assert.ok(validateTutoringTransition("cancelled", "under_review", { reopen: true }).ok);
  assert.equal(validateTutoringTransition("closed", "enrolled", { reopen: true }).ok, false);
  assert.equal(validateTutoringTransition("submitted", "under_review", { reopen: true }).ok, false);
});

test("allowedTutoringTargets renvoie les cibles déclarées", () => {
  assert.deepEqual(allowedTutoringTargets("enrolled"), ["closed"]);
  assert.deepEqual(allowedTutoringTargets("closed"), []);
});
