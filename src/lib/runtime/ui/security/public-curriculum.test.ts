import { test } from "node:test";
import assert from "node:assert/strict";
import { marketingDigitalV2 } from "../../../academic/marketing-digital-v2.ts";
import { toPublicCurriculum } from "./public-curriculum.ts";
import { inspectClientSafe } from "./ensure-client-safe.ts";
import { RuntimeEngine } from "../runtime/runtime-engine.ts";
import { seededProgressionState } from "../runtime/demo-progression.ts";

const NOW = new Date("2026-12-02T09:00:00Z");

test("projection publique : AUCUNE clé privée (answerKey/correct/quiz…)", () => {
  const pub = toPublicCurriculum(marketingDigitalV2);
  assert.equal(inspectClientSafe(pub).safe, true);
  const json = JSON.stringify(pub);
  assert.ok(!/answerKey|"correct":|interactiveActivities|questionIds|feedbackOnError|privateExplanation/i.test(json), "aucune donnée privée dans la projection");
});

test("projection publique : structure conservée (mêmes ids de modules/leçons)", () => {
  const pub = toPublicCurriculum(marketingDigitalV2);
  assert.equal(pub.slug, marketingDigitalV2.slug);
  assert.equal(pub.modules.length, marketingDigitalV2.modules.length);
  for (let i = 0; i < pub.modules.length; i++) {
    assert.equal(pub.modules[i].index, marketingDigitalV2.modules[i].index);
    assert.deepEqual(pub.modules[i].lessons.map((l) => l.id), marketingDigitalV2.modules[i].lessons.map((l) => l.id));
  }
});

test("iso-fonctionnel : progression dérivée IDENTIQUE (plein vs public)", () => {
  const pub = toPublicCurriculum(marketingDigitalV2);
  const full = marketingDigitalV2;
  const dFull = RuntimeEngine.derive(full, seededProgressionState(full), NOW);
  const dPub = RuntimeEngine.derive(pub, seededProgressionState(pub), NOW);
  assert.deepEqual(dPub.program, dFull.program, "vue de progression identique");
  assert.deepEqual(dPub.modules.map((m) => [m.state, m.percent, m.unlocked]), dFull.modules.map((m) => [m.state, m.percent, m.unlocked]));
});

test("contenu privé retiré (lessons.content vidé, pas d'activités interactives)", () => {
  const pub = toPublicCurriculum(marketingDigitalV2);
  for (const m of pub.modules) {
    for (const l of m.lessons) {
      assert.deepEqual(l.content, []);
      assert.equal(l.interactiveActivities, undefined);
      assert.equal(l.quiz, undefined);
      assert.equal(l.activity, undefined);
    }
    assert.equal(m.weeklyQuizzes, undefined);
    assert.equal(m.finalExam, undefined);
  }
});

test("source non mutée", () => {
  const before = marketingDigitalV2.modules[0].lessons[0].content.length;
  toPublicCurriculum(marketingDigitalV2);
  assert.equal(marketingDigitalV2.modules[0].lessons[0].content.length, before);
});
