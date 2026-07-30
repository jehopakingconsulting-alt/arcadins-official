import { test } from "node:test";
import assert from "node:assert/strict";
import { marketingDigitalV2 as C } from "../../academic/marketing-digital-v2.ts";
import { createRuntimeStore } from "../store.ts";
import { ProgressEngine } from "../progress-engine.ts";
import { LearningEvents } from "../learning-events.ts";
import { BadgeRepository } from "../persistence/repositories.ts";
import type { Awards } from "../persistence/types.ts";
import { StudentDashboardController } from "./state.ts";
import {
  StudentStatistics,
  StudentProgress,
  StudentRecommendations,
  StudentNotifications,
  LearningCalendar,
  UpcomingLessons,
  RecentActivity,
  CourseOverview,
  CertificationStatus,
} from "./controllers.ts";
import { createStudentDashboard } from "./factories.ts";
import { validateDashboardState, DASHBOARD_DEEP_SPECS } from "./specs.ts";

const NOW = new Date("2026-07-30T12:00:00Z");

function stateAfterSomeActivity() {
  let s = ProgressEngine.init(C);
  s = ProgressEngine.openLesson(C, s, "mkt-v2-m1-l1", "2026-07-30T10:00:00Z");
  s = ProgressEngine.recordStudyTime(C, s, "mkt-v2-m1-l1", 120, "2026-07-30T10:05:00Z");
  s = ProgressEngine.markLessonComplete(C, s, "mkt-v2-m1-l1", "2026-07-30T10:10:00Z");
  s = ProgressEngine.saveNote(C, s, "mkt-v2-m1-l1", "note", "2026-07-30T10:11:00Z");
  return s;
}

function passModule1() {
  let s = ProgressEngine.init(C);
  for (const l of C.modules[0].lessons) s = ProgressEngine.submitQuiz(C, s, l.id, "qz", 85, true);
  s = ProgressEngine.submitSummative(C, s, 1, 80, true);
  s = ProgressEngine.submitPractical(C, s, 1);
  return s;
}

test("StudentStatistics : temps, leçons, modules, badges", () => {
  const s = stateAfterSomeActivity();
  const awards: Awards = { badges: [], certificates: [] };
  const stats = StudentStatistics.build(C, s, awards, NOW);
  assert.equal(stats.timeTotalSeconds, 120);
  assert.equal(stats.timeTodaySeconds, 120);
  assert.equal(stats.lessonsCompleted, 1);
  assert.ok(stats.lessonsTotal > 1);
  assert.equal(stats.modulesPassed, 0);
  assert.equal(stats.modulesTotal, C.modules.length);
  assert.ok(stats.badgesRemaining > 0);
});

test("StudentProgress : global/hebdo/quotidien + modules", () => {
  const s = stateAfterSomeActivity();
  const prog = StudentProgress.build(C, s, NOW);
  assert.ok(prog.globalPercent > 0);
  assert.equal(prog.modules.length, C.modules.length);
  assert.equal(prog.modules[0].state !== "locked", true);
  assert.equal(prog.modules[1].state, "locked");
});

test("StudentRecommendations : continuer, prochaine leçon, prochain objectif", () => {
  const s = stateAfterSomeActivity();
  const recs = StudentRecommendations.build(C, s);
  assert.ok(recs.some((r) => r.kind === "continue"));
  assert.ok(recs.some((r) => r.kind === "next-objective"));
});

test("UpcomingLessons : leçons à venir accessibles non complétées", () => {
  const s = stateAfterSomeActivity();
  const up = UpcomingLessons.build(C, s, 5);
  assert.ok(up.length > 0);
  assert.ok(!up.some((u) => u.lessonRef === "mkt-v2-m1-l1")); // déjà complétée
  assert.ok(!up.some((u) => u.moduleIndex === 2)); // module 2 verrouillé
});

test("RecentActivity : mappe les événements récents (hors position/temps)", () => {
  const s = stateAfterSomeActivity();
  const acts = RecentActivity.build(s);
  assert.ok(acts.some((a) => a.type === "lesson_completed"));
  assert.ok(acts.some((a) => a.type === "note_saved"));
  assert.ok(!acts.some((a) => a.type === ("study_time" as never)));
});

test("LearningCalendar : jours avec temps d'étude et leçons complétées", () => {
  const s = stateAfterSomeActivity();
  const cal = LearningCalendar.build(s);
  const day = cal.find((c) => c.day === "2026-07-30");
  assert.ok(day);
  assert.equal(day!.studySeconds, 120);
  assert.equal(day!.lessonsCompleted, 1);
});

test("CourseOverview : cours actif tant que non complété", () => {
  const s = stateAfterSomeActivity();
  const ov = CourseOverview.build(C, s);
  assert.equal(ov.active, true);
  assert.equal(ov.completed, false);
  assert.equal(ov.programSlug, C.slug);
});

test("CertificationStatus : verrouillée tant que non éligible, aucun examen dispo", () => {
  const s = stateAfterSomeActivity();
  const cert = CertificationStatus.build(C, s, { badges: [], certificates: [] });
  assert.equal(cert.status, "locked");
  assert.equal(cert.examsAvailable.length, 0);
});

test("StudentNotifications : examen prêt après module 1 ? (non — programme incomplet)", () => {
  const s = passModule1();
  const notifs = StudentNotifications.build(C, s, { badges: [], certificates: [] }, NOW);
  // Programme non entièrement complété → pas de notif « examen prêt ».
  assert.ok(!notifs.some((n) => n.kind === "exam-ready"));
});

test("StudentDashboardController : assemble une vue complète et valide", () => {
  const s = passModule1();
  const awards: Awards = BadgeRepository.award(C, s, { badges: [], certificates: [] });
  const view = StudentDashboardController.build(C, s, { awards, now: NOW, currentRef: "mkt-v2-m2-l1" });
  assert.equal(view.programSlug, C.slug);
  assert.equal(view.statistics.modulesPassed, 1);
  assert.ok(view.achievements.owned.length >= 1);
  assert.ok(view.timeline.find((t) => t.lessonRef === "mkt-v2-m2-l1")?.isCurrent);
  assert.equal(validateDashboardState(view).ok, true);
});

test("createStudentDashboard : dashboard vivant, émet refreshed au changement d'état", () => {
  const store = createRuntimeStore(C);
  const dash = createStudentDashboard({ curriculum: C, store });
  let refreshedCount = 0;
  dash.hooks.on("refreshed", () => refreshedCount++);
  store.dispatch(LearningEvents.lessonViewed("mkt-v2-m1-l1"));
  store.dispatch(LearningEvents.lessonCompleted("mkt-v2-m1-l1"));
  assert.equal(refreshedCount, 2);
  const view = dash.getState(NOW);
  assert.ok(view.statistics.lessonsCompleted >= 1);
  dash.dispose();
  store.dispatch(LearningEvents.lessonViewed("mkt-v2-m1-l2"));
  assert.equal(refreshedCount, 2); // plus d'abonnement après dispose
});

test("validateDashboardState : détecte des bornes incohérentes", () => {
  const s = stateAfterSomeActivity();
  const view = StudentDashboardController.build(C, s, { now: NOW });
  const broken = { ...view, statistics: { ...view.statistics, lessonsCompleted: 9999 } };
  const rep = validateDashboardState(broken);
  assert.equal(rep.ok, false);
  assert.ok(rep.errors.some((e) => e.code === "LESSONS"));
});

test("les DeepSpecs du dashboard sont documentées (>= 11)", () => {
  assert.ok(DASHBOARD_DEEP_SPECS.length >= 11);
  assert.ok(DASHBOARD_DEEP_SPECS.every((s) => s.id && s.description));
});
