import { test } from "node:test";
import assert from "node:assert/strict";
import { validateTutorTransition, allowedTutorTargets, TUTOR_INITIAL_STATUS } from "./status.ts";

test("statut initial = submitted", () => {
  assert.equal(TUTOR_INITIAL_STATUS, "submitted");
});

test("transitions valides du parcours tuteur", () => {
  assert.ok(validateTutorTransition("submitted", "under_review").ok);
  assert.ok(validateTutorTransition("under_review", "interview_requested").ok);
  assert.ok(validateTutorTransition("interview_requested", "interview_scheduled").ok);
  assert.ok(validateTutorTransition("interview_scheduled", "approved").ok);
  assert.ok(validateTutorTransition("approved", "suspended").ok);
  assert.ok(validateTutorTransition("suspended", "approved").ok);
});

test("interdictions explicites de l'énoncé", () => {
  // rejected → interview_scheduled interdit sans réouverture
  assert.equal(validateTutorTransition("rejected", "interview_scheduled").ok, false);
  // approved → submitted interdit
  assert.equal(validateTutorTransition("approved", "submitted").ok, false);
  // archived → actif interdit sans action spéciale
  assert.equal(validateTutorTransition("archived", "approved").ok, false);
  assert.equal(validateTutorTransition("archived", "under_review").ok, false);
});

test("réouverture explicite : refusé/archivé → under_review uniquement", () => {
  assert.ok(validateTutorTransition("rejected", "under_review", { reopen: true }).ok);
  assert.ok(validateTutorTransition("archived", "under_review", { reopen: true }).ok);
  assert.equal(validateTutorTransition("rejected", "interview_scheduled", { reopen: true }).ok, false);
  assert.equal(validateTutorTransition("approved", "under_review", { reopen: true }).ok, false);
});

test("allowedTutorTargets", () => {
  assert.deepEqual(allowedTutorTargets("archived"), []);
  assert.ok(allowedTutorTargets("under_review").includes("approved"));
});
