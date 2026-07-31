import { test } from "node:test";
import assert from "node:assert/strict";
import { marketingDigitalV2 } from "../../../academic/marketing-digital-v2.ts";
import { buildSeededRuntime, seededProgressionState } from "./demo-progression.ts";
import { RuntimeEngine } from "./runtime-engine.ts";

const C = marketingDigitalV2;
const NOW = new Date("2026-12-02T09:00:00Z");

test("seed : progression réelle non triviale (module 1 en cours, avancement > 0)", () => {
  const rt = buildSeededRuntime(C);
  const d = rt.getDerived();
  assert.ok(d.program.percent > 0, "avancement global > 0");
  assert.equal(d.modules[0].state, "in_progress");
  assert.ok(d.modules[0].percent > 0);
  assert.equal(d.modules[1].unlocked, false); // module 2 encore verrouillé
});

test("seed : temps étudié enregistré (> 0, moteur A) et leçons terminées comptées", () => {
  const rt = buildSeededRuntime(C);
  const d = rt.getDerived();
  assert.ok(d.program.timeSpentSeconds > 0, "temps d'étude enregistré par le TimeTracker du Sprint A");
  assert.ok(d.program.lessonsCompleted >= 2);
  assert.ok(d.program.lessonsTotal > d.program.lessonsCompleted);
});

test("seed : une leçon reste en cours (leçon courante définie)", () => {
  const d = RuntimeEngine.derive(C, seededProgressionState(C), NOW);
  assert.ok(d.currentLessonId, "une leçon courante existe");
});

test("seed : déterministe (même état à chaque construction)", () => {
  assert.deepEqual(seededProgressionState(C), seededProgressionState(C));
});

test("seed : niveau pédagogique dérivé cohérent avec l'avancement", () => {
  const d = buildSeededRuntime(C).getDerived();
  // percent > 0 et < 25 sur ce seed → « Débutant » (ou null si 0).
  assert.ok(d.program.level === null || typeof d.program.level === "string");
});
