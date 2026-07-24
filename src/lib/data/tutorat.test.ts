import { test } from "node:test";
import assert from "node:assert/strict";
import { SKILLS, LEVELS, getSkill, getLevel, getModule, allModuleParams, MODULES } from "./tutorat.ts";

test("le référentiel a 4 compétences et 4 niveaux", () => {
  assert.equal(SKILLS.length, 4);
  assert.equal(LEVELS.length, 4);
});

test("il existe exactement 16 modules (4×4), sans doublon", () => {
  assert.equal(MODULES.length, 16);
  const keys = new Set(MODULES.map((m) => `${m.skill}/${m.level}`));
  assert.equal(keys.size, 16);
});

test("chaque couple compétence×niveau a un module complet", () => {
  for (const s of SKILLS) {
    for (const l of LEVELS) {
      const m = getModule(s.id, l.id);
      assert.ok(m, `module manquant pour ${s.id}/${l.id}`);
      assert.ok(m!.summary.length > 0);
      assert.ok(m!.objectives.length >= 3, `objectifs insuffisants ${s.id}/${l.id}`);
      assert.ok(m!.strategies.length >= 3);
      assert.ok(m!.tips.length >= 3);
      assert.ok(m!.sampleTask.title.length > 0);
      assert.ok(m!.sampleTask.body.length >= 1);
    }
  }
});

test("allModuleParams renvoie 16 couples valides", () => {
  const params = allModuleParams();
  assert.equal(params.length, 16);
  for (const p of params) {
    assert.ok(getSkill(p.skill), `skill invalide ${p.skill}`);
    assert.ok(getLevel(p.level), `level invalide ${p.level}`);
  }
});

test("getSkill / getLevel renvoient undefined pour un identifiant inconnu", () => {
  assert.equal(getSkill("inexistant"), undefined);
  assert.equal(getLevel("inexistant"), undefined);
  assert.equal(getModule("x", "y"), undefined);
});
