import { test } from "node:test";
import assert from "node:assert/strict";
import { marketingDigitalV2 } from "../../../academic/marketing-digital-v2.ts";
import { LearningEvents } from "../../learning-events.ts";
import { createStudentRuntime } from "./student-runtime.ts";
import { createLearningNavigator } from "./learning-navigator.ts";
import { NavigationEngine } from "./navigation-engine.ts";

const C = marketingDigitalV2;
const NOW = new Date("2026-12-01T09:00:00Z");
const clock = () => NOW;
const flat = NavigationEngine.orderedLessons(C).map((f) => f.lessonId);
const L0 = flat[0];
const L1 = flat[1];
const L2 = flat[2];

function rt() {
  return createStudentRuntime(C, { now: clock });
}

test("état initial : leçon courante = 1re disponible, pas de précédent", () => {
  const nav = createLearningNavigator(rt()).getState();
  assert.equal(nav.currentLessonId, L0);
  assert.equal(nav.currentIndex, 0);
  assert.equal(nav.previousLessonId, null);
  assert.equal(nav.canGoPrevious, false);
  assert.equal(nav.nextLessonId, L1);
  assert.equal(nav.canGoNext, true);
  assert.equal(nav.totalLessons, flat.length);
});

test("prochaine étape : « start » sur une leçon disponible non commencée", () => {
  const nav = createLearningNavigator(rt()).getState();
  assert.equal(nav.nextStep.kind, "start");
  assert.equal(nav.nextStep.lessonId, L0);
});

test("goToLesson : ouvre une leçon accessible et la marque courante", () => {
  const navr = createLearningNavigator(rt());
  const r = navr.goToLesson(L1);
  assert.equal(r.moved, true);
  assert.equal(r.navigation.currentLessonId, L1);
  assert.equal(r.navigation.previousLessonId, L0);
  assert.equal(r.navigation.canGoPrevious, true);
});

test("goNext / goPrevious : navigation séquentielle", () => {
  const navr = createLearningNavigator(rt());
  navr.goToLesson(L0);
  const n1 = navr.goNext();
  assert.equal(n1.moved, true);
  assert.equal(n1.navigation.currentLessonId, L1);
  const n2 = navr.goNext();
  assert.equal(n2.navigation.currentLessonId, L2);
  const p = navr.goPrevious();
  assert.equal(p.moved, true);
  assert.equal(p.navigation.currentLessonId, L1);
});

test("verrouillage : naviguer vers une leçon d'un module verrouillé est refusé", () => {
  const navr = createLearningNavigator(rt());
  const lockedLesson = C.modules[1].lessons[0].id; // module 2 verrouillé au départ
  const r = navr.goToLesson(lockedLesson);
  assert.equal(r.moved, false);
  assert.equal(r.reasonCode, "LESSON_LOCKED");
});

test("prochaine étape : « module_locked » quand la leçon courante est terminée et la suivante est verrouillée", () => {
  const runtime = rt();
  const navr = createLearningNavigator(runtime);
  // Aller à la DERNIÈRE leçon du module 1 puis la TERMINER (sans valider le module → module 2 reste verrouillé).
  const m1Lessons = C.modules[0].lessons.map((l) => l.id);
  const lastM1 = m1Lessons[m1Lessons.length - 1];
  navr.goToLesson(lastM1);
  runtime.dispatch(LearningEvents.lessonCompleted(lastM1, NOW.toISOString()));
  const nav = navr.getState();
  // La leçon suivante appartient au module 2 (verrouillé au départ).
  assert.ok(C.modules[1].lessons.some((l) => l.id === nav.nextLessonId), "la suivante est bien dans le module 2");
  assert.equal(nav.canGoNext, false);
  assert.equal(nav.nextStep.kind, "module_locked");
  assert.equal(nav.nextStep.moduleIndex, 2);
});

test("reprise automatique : resumeLessonId = dernière leçon consultée non terminée", () => {
  const runtime = rt();
  const navr = createLearningNavigator(runtime);
  navr.goToLesson(L0);
  navr.goToLesson(L1); // dernière consultée = L1 (en cours)
  const nav = navr.getState();
  assert.equal(nav.resumeLessonId, L1);
  // resume() y ramène.
  const r = navr.resume();
  assert.equal(r.navigation.currentLessonId, L1);
});

test("reprise après interruption : snapshot → hydrate → resume reprend au bon endroit", () => {
  const a = rt();
  const na = createLearningNavigator(a);
  na.goToLesson(L1);
  const snap = a.snapshot();

  const b = rt();
  b.hydrate(snap);
  const nb = createLearningNavigator(b);
  assert.equal(nb.getState().resumeLessonId, L1);
  assert.equal(nb.getState().currentLessonId, L1);
});

test("déterminisme : même parcours → même état de navigation", () => {
  const build = () => {
    const navr = createLearningNavigator(rt());
    navr.goToLesson(L0);
    navr.goNext();
    return navr.getState();
  };
  assert.deepEqual(build(), build());
});

test("goToLesson refuse une leçon inconnue", () => {
  const r = createLearningNavigator(rt()).goToLesson("inexistante-xyz");
  assert.equal(r.moved, false);
  assert.equal(r.reasonCode, "UNKNOWN_LESSON");
});

test("complétion : nextStep = program_complete si toutes les leçons sont terminées", () => {
  const runtime = rt();
  // Marquer toutes les leçons de tous les modules comme complétées (via événements bruts, en débloquant au fil).
  // On simule la complétion module par module en soumettant sommatif + pratique pour débloquer la suite.
  for (const m of C.modules) {
    for (const l of m.lessons) {
      runtime.dispatch([LearningEvents.lessonViewed(l.id, NOW.toISOString()), LearningEvents.quizSubmitted(l.id, "q", 100, true, NOW.toISOString()), LearningEvents.lessonCompleted(l.id, NOW.toISOString())]);
    }
    runtime.dispatch([LearningEvents.summativeSubmitted(m.index, 100, true, NOW.toISOString()), LearningEvents.practicalSubmitted(m.index, NOW.toISOString())]);
  }
  const nav = NavigationEngine.computeState(C, runtime.getState(), runtime.getDerived());
  assert.equal(nav.nextStep.kind, "program_complete");
});
