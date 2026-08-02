import { test } from "node:test";
import assert from "node:assert/strict";
import { decideProgramAccess, resolveFirstLesson } from "./access.ts";

const NOW = new Date("2026-08-02T00:00:00Z");
const future = "2026-12-31T00:00:00Z";
const past = "2026-01-01T00:00:00Z";

test("aucun entitlement → locked", () => {
  assert.equal(decideProgramAccess({ requestedProgram: "tef-canada", enrollment: null, now: NOW }), "locked");
});

test("entitlement TEF actif → allow (scénario 12 : TEF débloque TEF)", () => {
  assert.equal(
    decideProgramAccess({ requestedProgram: "tef-canada", enrollment: { program_code: "tef-canada", status: "active", access_expires_at: future }, now: NOW }),
    "allow",
  );
});

test("acheteur TEF ne peut pas ouvrir TCF → wrong_program (scénario 20)", () => {
  assert.equal(
    decideProgramAccess({ requestedProgram: "tcf-canada", enrollment: { program_code: "tef-canada", status: "active", access_expires_at: future }, now: NOW }),
    "wrong_program",
  );
});

test("acheteur TCF ne peut pas ouvrir TEF → wrong_program (scénario 19)", () => {
  assert.equal(
    decideProgramAccess({ requestedProgram: "tef-canada", enrollment: { program_code: "tcf-canada", status: "active", access_expires_at: future }, now: NOW }),
    "wrong_program",
  );
});

test("entitlement expiré → expired (scénario 21)", () => {
  assert.equal(
    decideProgramAccess({ requestedProgram: "tef-canada", enrollment: { program_code: "tef-canada", status: "active", access_expires_at: past }, now: NOW }),
    "expired",
  );
});

test("statut pending → pending (activation en cours)", () => {
  assert.equal(
    decideProgramAccess({ requestedProgram: "tef-canada", enrollment: { program_code: "tef-canada", status: "pending", access_expires_at: null }, now: NOW }),
    "pending",
  );
});

test("statut refunded/suspended → suspended", () => {
  assert.equal(
    decideProgramAccess({ requestedProgram: "tef-canada", enrollment: { program_code: "tef-canada", status: "refunded", access_expires_at: future }, now: NOW }),
    "suspended",
  );
});

test("resolveFirstLesson : TEF ne renvoie jamais vers TCF", () => {
  const t = resolveFirstLesson("tef-canada")!;
  assert.equal(t.marketing, "/tef");
  assert.equal(t.firstLesson, "/tutorat/comprehension-orale/fondation");
  assert.ok(!t.firstLesson.includes("tcf"));
  assert.equal(t.purchaseCta, "/inscription?program=tef-canada");
});

test("resolveFirstLesson : programme inconnu → null", () => {
  assert.equal(resolveFirstLesson("informatique"), null);
});
