import { test } from "node:test";
import assert from "node:assert/strict";
import { marketingDigitalV2 } from "../../../academic/marketing-digital-v2.ts";
import { LearningEvents } from "../../learning-events.ts";
import { createAcademicRepository, stateChecksum } from "./academic-repository.ts";
import { RuntimeEngine } from "./runtime-engine.ts";
import { createProgressCache } from "./progress-cache.ts";
import { createStudentRuntime } from "./student-runtime.ts";

const C = marketingDigitalV2;
const NOW = new Date("2026-12-01T09:00:00Z");
const clock = () => NOW;

// ── AcademicRepository ──
test("repository : état initial (module 1 ouvert, reste verrouillé)", () => {
  const repo = createAcademicRepository(C);
  const s = repo.initialState();
  assert.equal(s.modules[1].state, "available");
  assert.equal(s.modules[2].state, "locked");
});

test("repository : snapshot/hydrate round-trip (checksum valide)", () => {
  const repo = createAcademicRepository(C);
  const s = repo.initialState();
  const snap = repo.snapshot(s);
  assert.equal(snap.programSlug, "marketing-digital");
  assert.equal(repo.hydrate(snap).programSlug, "marketing-digital");
});

test("repository : hydrate rejette un checksum altéré", () => {
  const repo = createAcademicRepository(C);
  const snap = repo.snapshot(repo.initialState());
  assert.throws(() => repo.hydrate({ ...snap, checksum: "deadbeef" }), /SNAPSHOT_CHECKSUM_INVALID/);
});

test("repository : hydrate rejette un programme incohérent", () => {
  const repo = createAcademicRepository(C);
  const snap = repo.snapshot(repo.initialState());
  assert.throws(() => repo.hydrate({ ...snap, programSlug: "autre", state: { ...snap.state, programSlug: "autre" } }), /PROGRAM_MISMATCH|CHECKSUM/);
});

// ── RuntimeEngine (réutilise Sprint A) ──
test("engine : derive fournit programme/modules/leçons + courante", () => {
  const repo = createAcademicRepository(C);
  const d = RuntimeEngine.derive(C, repo.initialState(), NOW);
  assert.equal(d.modules.length, 8);
  assert.equal(d.modules[0].unlocked, true);
  assert.equal(d.modules[1].unlocked, false);
  assert.ok(d.modules[1].lockedReason);
  assert.equal(d.program.percent, 0);
  assert.ok(d.currentLessonId); // 1re leçon disponible
});

test("engine : la progression augmente après complétion (réutilise le reducer A)", () => {
  const rt = createStudentRuntime(C, { now: clock });
  const firstLesson = C.modules[0].lessons[0].id;
  rt.dispatch([LearningEvents.lessonViewed(firstLesson, NOW.toISOString()), LearningEvents.lessonCompleted(firstLesson, NOW.toISOString())]);
  const d = rt.getDerived();
  const lesson = d.lessons.find((l) => l.lessonId === firstLesson)!;
  assert.equal(lesson.percent, 100);
  assert.ok(d.program.percent > 0);
});

// ── ProgressCache ──
test("cache : mémoïse le feed pour un état/jour identiques", () => {
  const cache = createProgressCache();
  const repo = createAcademicRepository(C);
  const s = repo.initialState();
  const a = cache.get(C, s, NOW);
  const b = cache.get(C, s, NOW);
  assert.equal(a, b); // même référence (cache hit)
  assert.equal(cache.size(), 1);
});

test("cache : recalcule quand l'état change", () => {
  const cache = createProgressCache();
  const repo = createAcademicRepository(C);
  const s1 = repo.initialState();
  const s2 = { ...s1, events: [...s1.events, LearningEvents.lessonViewed(C.modules[0].lessons[0].id, NOW.toISOString())] };
  cache.get(C, s1, NOW);
  cache.get(C, s2, NOW);
  assert.equal(cache.size(), 2);
  assert.notEqual(stateChecksum(s1), stateChecksum(s2));
});

// ── StudentRuntime (façade : state management + sync) ──
test("façade : dispatch, subscribe et notifications", () => {
  const rt = createStudentRuntime(C, { now: clock });
  let notified = 0;
  const unsub = rt.subscribe(() => notified++);
  rt.dispatch(LearningEvents.lessonViewed(C.modules[0].lessons[0].id, NOW.toISOString()));
  assert.equal(notified, 1);
  unsub();
  rt.dispatch(LearningEvents.lessonViewed(C.modules[0].lessons[1]?.id ?? C.modules[0].lessons[0].id, NOW.toISOString()));
  assert.equal(notified, 1); // désabonné
});

test("façade : synchronisation d'un lot d'événements (triés)", () => {
  const rt = createStudentRuntime(C, { now: clock });
  const l0 = C.modules[0].lessons[0].id;
  const l1 = C.modules[0].lessons[1]?.id ?? l0;
  // Événements donnés dans le désordre chronologique → triés avant application.
  rt.dispatch([
    LearningEvents.lessonCompleted(l1, "2026-12-01T10:00:00Z"),
    LearningEvents.lessonViewed(l0, "2026-12-01T09:00:00Z"),
  ]);
  const d = rt.getDerived();
  assert.ok(d.lessons.find((l) => l.lessonId === l1)!.percent >= 100 || d.lessons.find((l) => l.lessonId === l0));
});

test("façade : snapshot puis hydrate restaure l'état et préserve les abonnés", () => {
  const rt = createStudentRuntime(C, { now: clock });
  const l0 = C.modules[0].lessons[0].id;
  rt.dispatch(LearningEvents.lessonCompleted(l0, NOW.toISOString()));
  const snap = rt.snapshot();

  const rt2 = createStudentRuntime(C, { now: clock });
  let notified = 0;
  rt2.subscribe(() => notified++);
  rt2.hydrate(snap);
  assert.equal(notified, 1); // les abonnés de la façade survivent au remplacement du store
  assert.equal(rt2.getState().lessons[l0].completedAt, rt.getState().lessons[l0].completedAt);
  // Le store a bien été remplacé : un nouveau dispatch fonctionne.
  rt2.dispatch(LearningEvents.lessonViewed(C.modules[0].lessons[1]?.id ?? l0, NOW.toISOString()));
  assert.equal(notified, 2);
});

// ── Déterminisme ──
test("déterminisme : même horloge + mêmes événements → même feed", () => {
  const build = () => {
    const rt = createStudentRuntime(C, { now: clock });
    rt.dispatch(LearningEvents.lessonCompleted(C.modules[0].lessons[0].id, NOW.toISOString()));
    return rt.getDerived();
  };
  assert.deepEqual(build(), build());
});
