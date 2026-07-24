import { test } from "node:test";
import assert from "node:assert/strict";
import { tutoringRequestSchema } from "./tutoring.ts";
import { tutorApplicationSchema } from "./tutor.ts";

test("demande de tutorat : valide", () => {
  const r = tutoringRequestSchema.safeParse({
    firstName: "Ana", lastName: "K", email: "ana@ex.co", skills: ["comprehension-ecrite"], targetLevel: "b2-invalide",
  });
  // targetLevel invalide → optionnel donc rejeté seulement si présent : ici il l'est → échec
  assert.equal(r.success, false);
});

test("demande de tutorat : minimal valide", () => {
  const r = tutoringRequestSchema.safeParse({
    firstName: "Ana", lastName: "K", email: "ana@ex.co", skills: ["comprehension-orale"],
  });
  assert.equal(r.success, true);
});

test("demande de tutorat : email invalide rejeté", () => {
  const r = tutoringRequestSchema.safeParse({ firstName: "A", lastName: "B", email: "pas-un-email", skills: ["expression-orale"] });
  assert.equal(r.success, false);
});

test("demande de tutorat : sans compétence rejetée", () => {
  const r = tutoringRequestSchema.safeParse({ firstName: "A", lastName: "B", email: "a@b.co", skills: [] });
  assert.equal(r.success, false);
});

test("candidature tuteur : valide + niveaux par défaut", () => {
  const r = tutorApplicationSchema.safeParse({
    firstName: "Sam", lastName: "T", email: "sam@ex.co", skills: ["expression-ecrite"],
  });
  assert.equal(r.success, true);
  if (r.success) assert.deepEqual(r.data.levels, []);
});

test("candidature tuteur : compétence inconnue rejetée", () => {
  const r = tutorApplicationSchema.safeParse({
    firstName: "Sam", lastName: "T", email: "sam@ex.co", skills: ["inexistant"],
  });
  assert.equal(r.success, false);
});
