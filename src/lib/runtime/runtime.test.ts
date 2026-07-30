import { test } from "node:test";
import assert from "node:assert/strict";
import { marketingDigitalV2 as C } from "../academic/marketing-digital-v2.ts";
import { buildInitialState, applyEvent, applyEvents } from "./runtime-state.ts";
import { LearningEvents } from "./learning-events.ts";
import { ProgressEngine } from "./progress-engine.ts";
import { CompletionCalculator } from "./completion-calculator.ts";
import { UnlockRules } from "./unlock-rules.ts";
import { ProgressCalculator } from "./progress-calculator.ts";
import { LearningPathEngine } from "./learning-path-engine.ts";
import { LessonEngine } from "./lesson-engine.ts";
import { StudySessionManager } from "./study-session-manager.ts";
import { BookmarkManager } from "./bookmark-manager.ts";
import { NoteManager } from "./note-manager.ts";
import { createRuntimeStore } from "./store.ts";
import { validateRuntimeState, RUNTIME_DEEP_SPECS } from "./specs.ts";
import { LEARNING_RUNTIME_ENABLED } from "./config.ts";

/** Valide entièrement le module 1 (3 leçons) → doit débloquer le module 2. */
function passModule1(state = ProgressEngine.init(C)) {
  let s = state;
  for (const l of C.modules[0].lessons) s = ProgressEngine.submitQuiz(C, s, l.id, `${l.id}-qz`, 85, true);
  s = ProgressEngine.submitSummative(C, s, 1, 80, true);
  s = ProgressEngine.submitPractical(C, s, 1);
  return s;
}

test("le flag runtime est désactivé par défaut", () => {
  assert.equal(LEARNING_RUNTIME_ENABLED, false);
});

test("état initial : module 1 ouvert, module 2 verrouillé", () => {
  const s = buildInitialState(C);
  assert.equal(s.modules[1].state, "available");
  assert.equal(s.modules[2].state, "locked");
  assert.equal(LessonEngine.isAccessible(s, "mkt-v2-m1-l1"), true);
  assert.equal(LessonEngine.isAccessible(s, "mkt-v2-m2-l1"), false);
});

test("le reducer est pur : l'état d'origine n'est pas muté", () => {
  const s0 = buildInitialState(C);
  const snapshot = JSON.stringify(s0);
  const s1 = applyEvent(C, s0, LearningEvents.lessonViewed("mkt-v2-m1-l1"));
  assert.notEqual(s0, s1);
  assert.equal(JSON.stringify(s0), snapshot, "s0 ne doit pas changer");
});

test("consulter une leçon la passe en in_progress et l'ajoute à l'historique", () => {
  let s = buildInitialState(C);
  s = ProgressEngine.openLesson(C, s, "mkt-v2-m1-l1");
  assert.equal(LessonEngine.stateOf(s, "mkt-v2-m1-l1"), "in_progress");
  assert.equal(BookmarkManager.history(s.bookmarks)[0].lessonRef, "mkt-v2-m1-l1");
});

test("compléter une leçon avec quiz réussi → passed ; sans quiz → completed", () => {
  let s = buildInitialState(C);
  s = ProgressEngine.submitQuiz(C, s, "mkt-v2-m1-l1", "qz", 90, true);
  s = ProgressEngine.markLessonComplete(C, s, "mkt-v2-m1-l1");
  assert.equal(LessonEngine.stateOf(s, "mkt-v2-m1-l1"), "passed");

  let s2 = buildInitialState(C);
  s2 = ProgressEngine.markLessonComplete(C, s2, "mkt-v2-m1-l2");
  assert.equal(LessonEngine.stateOf(s2, "mkt-v2-m1-l2"), "completed");
});

test("validation d'un module + déblocage du suivant (règles v2)", () => {
  const s = passModule1();
  assert.equal(CompletionCalculator.isModulePassed(C, s, 1), true);
  assert.equal(UnlockRules.isModuleUnlocked(C, s, 2), true);
  assert.equal(s.modules[2].state, "available");
  assert.equal(LessonEngine.isAccessible(s, "mkt-v2-m2-l1"), true);
});

test("un sommatif échoué met le module en needs_review", () => {
  let s = ProgressEngine.init(C);
  for (const l of C.modules[0].lessons) s = ProgressEngine.submitQuiz(C, s, l.id, "qz", 85, true);
  s = ProgressEngine.submitSummative(C, s, 1, 50, false);
  assert.equal(UnlockRules.deriveModuleState(C, s, 1), "needs_review");
  assert.equal(UnlockRules.isModuleUnlocked(C, s, 2), false);
});

test("le temps d'étude s'accumule par leçon et par jour, plafonné par heartbeat", () => {
  let study = StudySessionManager.empty();
  study = StudySessionManager.addSeconds(study, "mkt-v2-m1-l1", 60, "2026-07-30");
  study = StudySessionManager.addSeconds(study, "mkt-v2-m1-l1", 9999, "2026-07-30"); // plafonné
  assert.equal(StudySessionManager.forLesson(study, "mkt-v2-m1-l1"), 60 + 120);
  assert.equal(StudySessionManager.forDay(study, "2026-07-30"), 180);
  assert.equal(study.totalSeconds, 180);
});

test("notes : upsert et suppression sur note vide", () => {
  let notes = {};
  notes = NoteManager.save(notes, "mkt-v2-m1-l1", "ma note", "2026-07-30T10:00:00Z");
  assert.equal(NoteManager.get(notes, "mkt-v2-m1-l1")?.body, "ma note");
  notes = NoteManager.save(notes, "mkt-v2-m1-l1", "   ", "2026-07-30T10:01:00Z");
  assert.equal(NoteManager.get(notes, "mkt-v2-m1-l1"), undefined);
});

test("favoris : toggle on/off", () => {
  let s = buildInitialState(C);
  s = ProgressEngine.toggleBookmark(C, s, "mkt-v2-m1-l1", true);
  assert.deepEqual(BookmarkManager.favorites(s.bookmarks), ["mkt-v2-m1-l1"]);
  s = ProgressEngine.toggleBookmark(C, s, "mkt-v2-m1-l1", false);
  assert.deepEqual(BookmarkManager.favorites(s.bookmarks), []);
});

test("progression globale, score moyen et compétences après M1", () => {
  const s = passModule1();
  const view = ProgressCalculator.programProgressView(C, s, new Date("2026-07-30T12:00:00Z"));
  assert.ok(view.percent > 0 && view.percent < 100);
  assert.ok(view.averageScore !== null);
  // Compétences de M1 acquises (C1..C4).
  assert.ok(view.competenciesAcquired.includes("C1"));
  assert.equal(view.eligibleForCertificate, false);
});

test("temps restant estimé diminue quand des leçons sont complétées", () => {
  const s0 = buildInitialState(C);
  const r0 = ProgressCalculator.programProgressView(C, s0).estimatedRemainingSeconds;
  const s1 = ProgressEngine.markLessonComplete(C, s0, "mkt-v2-m1-l1");
  const r1 = ProgressCalculator.programProgressView(C, s1).estimatedRemainingSeconds;
  assert.ok(r1 < r0);
});

test("LearningPath : prochaine leçon et parcours", () => {
  const s = buildInitialState(C);
  assert.equal(LearningPathEngine.nextLesson(C, s), "mkt-v2-m1-l1");
  const path = LearningPathEngine.buildPath(C, s);
  assert.equal(path.length, C.modules.length);
  assert.equal(path[0].state, "available");
  assert.equal(path[1].state, "locked");
  assert.ok(path[1].lockedReason);
});

test("store : dispatch met à jour l'état, notifie et déclenche les hooks", () => {
  const store = createRuntimeStore(C);
  const seen: string[] = [];
  store.subscribe(() => seen.push("changed"));
  let unlocked = 0;
  store.hooks.on("moduleUnlocked", (p) => {
    if (p.moduleIndex === 2) unlocked++;
  });
  let completed = 0;
  store.hooks.on("lessonCompleted", () => completed++);

  for (const l of C.modules[0].lessons) store.dispatch(LearningEvents.quizSubmitted(l.id, "qz", 85, true));
  store.dispatch(LearningEvents.lessonCompleted("mkt-v2-m1-l1"));
  store.dispatch(LearningEvents.summativeSubmitted(1, 80, true));
  store.dispatch(LearningEvents.practicalSubmitted(1));

  assert.equal(store.getState().modules[2].state, "available");
  assert.equal(unlocked, 1, "moduleUnlocked émis une fois pour M2");
  assert.equal(completed, 1);
  assert.ok(seen.length > 0);
});

test("déterminisme : rejouer le journal reproduit l'état", () => {
  const s = passModule1();
  const replay = applyEvents(C, buildInitialState(C), s.events);
  assert.deepEqual(replay.modules, s.modules);
  assert.deepEqual(replay.lessons, s.lessons);
});

test("validateRuntimeState : état sain OK ; détecte une progression sur leçon verrouillée", () => {
  const ok = validateRuntimeState(C, passModule1());
  assert.deepEqual(ok.errors, [], JSON.stringify(ok.errors));

  // État corrompu : progression sur une leçon verrouillée.
  const bad = buildInitialState(C);
  bad.lessons["mkt-v2-m2-l1"] = { lessonRef: "mkt-v2-m2-l1", moduleIndex: 2, state: "locked", quizScore: 90 };
  const rep = validateRuntimeState(C, bad);
  assert.equal(rep.ok, false);
  assert.ok(rep.errors.some((e) => e.code === "LOCKED_WITH_PROGRESS"));
});

test("validateRuntimeState : détecte une leçon orpheline", () => {
  const bad = buildInitialState(C);
  bad.lessons["inconnu-xyz"] = { lessonRef: "inconnu-xyz", moduleIndex: 99, state: "available" };
  const rep = validateRuntimeState(C, bad);
  assert.ok(rep.errors.some((e) => e.code === "ORPHAN_LESSON"));
});

test("les DeepSpecs du runtime sont documentées (>= 10)", () => {
  assert.ok(RUNTIME_DEEP_SPECS.length >= 10);
  assert.ok(RUNTIME_DEEP_SPECS.every((s) => s.id && s.description));
});
