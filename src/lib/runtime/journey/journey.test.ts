import { test } from "node:test";
import assert from "node:assert/strict";
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import { marketingDigitalV2 as MKT } from "../../academic/marketing-digital-v2.ts";
import type { RuntimeState } from "../types.ts";
import { ProgressEngine } from "../progress-engine.ts";
import { JourneyEngine } from "./journey-engine.ts";
import { makeJourneyConfig } from "./config.ts";
import { MasteryEngine } from "./mastery-engine.ts";
import { PrerequisiteEngine } from "./prerequisite-engine.ts";
import { validateJourneyConfig, JOURNEY_DEEP_SPECS } from "./specs.ts";
import type { JourneyConfig, JourneyContext, JourneyRule } from "./types.ts";

const NOW = new Date("2026-08-31T09:00:00Z");

/** Programme linguistique générique (aucun TEF/TCF codé en dur) — 2 unités × 2 leçons. */
function genericProgram(): ProgramCurriculumV2 {
  const mk = (mi: number, comps: string[]) => ({
    index: mi,
    title: `Unité ${mi}`,
    weeks: [mi * 3 - 2, mi * 3 - 1, mi * 3] as [number, number, number],
    summary: "",
    competencies: comps,
    lessons: [1, 2].map((li) => ({
      id: `gen-m${mi}-l${li}`,
      title: `Leçon ${mi}.${li}`,
      objectives: ["o"],
      content: ["c"],
      keyTakeaways: ["k"],
      authored: true,
    })),
    assessments: [],
  });
  return {
    slug: "langue-generique",
    programVersion: "v1",
    title: "Programme linguistique générique",
    totalWeeks: 6,
    passingScore: 70,
    weights: { activities: 20, moduleQuizzes: 20, practicals: 25, finalProject: 20, finalExam: 15 },
    modules: [mk(1, ["LA"]), mk(2, ["LB"])],
    exitCompetencies: ["LA", "LB"],
  } as ProgramCurriculumV2;
}

function ctx(curriculum: ProgramCurriculumV2, state: RuntimeState, cfg: Partial<JourneyConfig> = {}, now = NOW, extra: Partial<JourneyContext> = {}): JourneyContext {
  return { curriculum, state, config: makeJourneyConfig(cfg), now, ...extra };
}

function passModule(curr: ProgramCurriculumV2, s: RuntimeState, moduleIndex: number, completeAt?: string) {
  const m = curr.modules.find((x) => x.index === moduleIndex)!;
  for (const l of m.lessons) {
    s = ProgressEngine.submitQuiz(curr, s, l.id, "qz", 85, true);
    if (completeAt) s = ProgressEngine.markLessonComplete(curr, s, l.id, completeAt);
  }
  s = ProgressEngine.submitSummative(curr, s, moduleIndex, 80, true);
  s = ProgressEngine.submitPractical(curr, s, moduleIndex);
  return s;
}

// ── Parcours linéaire normal ──
test("parcours linéaire : recommande la prochaine leçon, validation OK", () => {
  const r = JourneyEngine.generate(ctx(MKT, ProgressEngine.init(MKT)));
  assert.equal(r.validation.ok, true, JSON.stringify(r.validation.errors));
  // Sur un état neuf, la première leçon est recommandée (resume/continue/start-next).
  assert.ok(r.state.recommendations.some((x) => x.targetType === "lesson" && x.targetId === "mkt-v2-m1-l1"));
  assert.ok(r.state.nextRecommendedAction);
});

// ── Module verrouillé par prérequis + obligatoire d'abord ──
test("module verrouillé : action bloquée + prérequis obligatoire en tête", () => {
  const r = JourneyEngine.generate(ctx(MKT, ProgressEngine.init(MKT)));
  assert.ok(r.state.blockedActions.some((b) => b.targetId === "2" && b.mandatoryBlocked));
  assert.equal(r.state.recommendations[0].mandatory, true);
  assert.equal(r.state.recommendations[0].type, "complete-prerequisite");
});

// ── Prérequis circulaire ──
test("prérequis circulaire : détecté par validation", () => {
  const rules: JourneyRule[] = [
    { id: "c1", family: "prerequisite", data: { targetType: "module", targetId: "1", requires: [{ targetType: "module", targetId: "2" }], mandatory: true } },
  ];
  const r = JourneyEngine.generate(ctx(MKT, ProgressEngine.init(MKT), { rules }));
  assert.equal(r.validation.ok, false);
  assert.ok(r.validation.errors.some((e) => e.code === "PREREQ_CYCLE"));
});

// ── Débutant vs avancé ──
test("débutant : compétences insuffisantes ; avancé : compétence maîtrisée", () => {
  const beginner = MasteryEngine.build(ctx(MKT, ProgressEngine.init(MKT)));
  assert.ok(beginner.skills.every((s) => s.strength === "insufficient"));

  const advanced = MasteryEngine.build(ctx(MKT, passModule(MKT, ProgressEngine.init(MKT), 1)));
  const c1 = advanced.skills.find((s) => s.skillId === "C1");
  assert.ok(c1 && (c1.level === "passed" || c1.level === "mastered"));
});

// ── Étudiant inactif : déterministe et sûr ──
test("étudiant inactif : génère un état valide", () => {
  const r = JourneyEngine.generate(ctx(genericProgram(), ProgressEngine.init(genericProgram())));
  assert.equal(r.validation.ok, true);
});

// ── Étudiant en retard : objectif expiré ──
test("objectif programme expiré si date cible dépassée", () => {
  const cfg: Partial<JourneyConfig> = { goals: [{ id: "goal-program", type: "complete-program", targetDate: "2026-01-01T00:00:00Z", threshold: 100 }] };
  const r = JourneyEngine.generate(ctx(MKT, ProgressEngine.init(MKT), cfg));
  assert.ok(r.state.goals.some((g) => g.goalId === "goal-program" && g.status === "expired"));
});

// ── Compétence faible → renforcement ──
test("compétence faible : recommandation strengthen-skill", () => {
  let s = ProgressEngine.init(MKT);
  s = ProgressEngine.submitQuiz(MKT, s, "mkt-v2-m1-l1", "qz", 85, true); // 1 leçon sur 3 réussie
  const r = JourneyEngine.generate(ctx(MKT, s));
  assert.ok(r.state.recommendations.some((x) => x.type === "strengthen-skill"));
});

// ── Remédiation simple puis limite atteinte ──
test("remédiation : simple (non épuisée) puis épuisée à la limite", () => {
  let s = ProgressEngine.init(MKT);
  s = ProgressEngine.submitQuiz(MKT, s, "mkt-v2-m1-l1", "qz", 30, false);
  let r = JourneyEngine.generate(ctx(MKT, s));
  const plan = r.state.activeRemediations.find((p) => p.targetId === "mkt-v2-m1-l1")!;
  assert.equal(plan.attempt, 1);
  assert.equal(plan.exhausted, false);
  assert.ok(r.state.recommendations.some((x) => x.type === "redo-activity"));

  s = ProgressEngine.submitQuiz(MKT, s, "mkt-v2-m1-l1", "qz", 40, false);
  s = ProgressEngine.submitQuiz(MKT, s, "mkt-v2-m1-l1", "qz", 45, false); // 3 échecs = maxAttempts
  r = JourneyEngine.generate(ctx(MKT, s));
  const plan2 = r.state.activeRemediations.find((p) => p.targetId === "mkt-v2-m1-l1")!;
  assert.equal(plan2.exhausted, true);
  assert.equal(plan2.steps[0].action, "contact-tutor");
  assert.ok(!r.state.recommendations.some((x) => x.type === "redo-activity" && x.targetId === "mkt-v2-m1-l1"));
});

// ── Révisions échues (plusieurs concurrentes) ──
test("révisions échues : plusieurs items dus après réussites anciennes", () => {
  const s = passModule(MKT, ProgressEngine.init(MKT), 1, "2026-01-01T10:00:00Z"); // réussite ancienne
  const r = JourneyEngine.generate(ctx(MKT, s));
  const overdue = r.state.reviewQueue.filter((i) => i.overdue);
  assert.ok(overdue.length >= 1);
  assert.ok(r.state.recommendations.some((x) => x.type === "review"));
});

// ── Plan quotidien à faible disponibilité ──
test("plan quotidien : ne dépasse jamais la capacité (session partielle)", () => {
  const r = JourneyEngine.generate(ctx(MKT, ProgressEngine.init(MKT), { workload: { dailyMinutes: 30, activeDays: [0, 1, 2, 3, 4, 5, 6] } }));
  assert.ok(r.state.dailyPlan.totalMinutes <= 30);
  assert.ok(r.state.dailyPlan.sessions.length > 0);
});

// ── Plan hebdomadaire avec date cible ──
test("plan hebdomadaire : limité par la date cible", () => {
  const cfg: Partial<JourneyConfig> = {
    workload: { dailyMinutes: 60, activeDays: [0, 1, 2, 3, 4, 5, 6] },
    goals: [{ id: "goal-program", type: "complete-program", targetDate: "2026-09-02T09:00:00Z", threshold: 100 }],
  };
  const r = JourneyEngine.generate(ctx(MKT, ProgressEngine.init(MKT), cfg));
  assert.equal(r.state.weeklyPlan.targetDate, "2026-09-02T09:00:00Z");
  assert.ok(r.state.weeklyPlan.days.length <= 3); // du 31/08 au 02/09
});

// ── Contenu optionnel vs obligatoire ──
test("déblocage : cible optionnelle débloquée, obligatoire bloquée", () => {
  const optional = PrerequisiteEngine.unlockDecision(ctx(MKT, ProgressEngine.init(MKT), { optionalTargetIds: ["2"] }), "module", "2");
  assert.equal(optional.unlocked, true);
  assert.equal(optional.mandatoryBlocked, false);
  const mandatory = PrerequisiteEngine.unlockDecision(ctx(MKT, ProgressEngine.init(MKT)), "module", "2");
  assert.equal(mandatory.mandatoryBlocked, true);
});

// ── Programme entièrement terminé : pas de prochaine action ──
test("programme terminé (générique) : objectif complété, aucune prochaine leçon", () => {
  const G = genericProgram();
  let s = ProgressEngine.init(G);
  s = passModule(G, s, 1);
  s = passModule(G, s, 2);
  // Maîtrise pleinement validée (dont tuteur) → aucune recommandation de renforcement résiduelle.
  const r = JourneyEngine.generate(ctx(G, s, {}, NOW, { tutorValidatedSkillIds: ["LA", "LB"] }));
  assert.ok(r.state.goals.some((g) => g.goalId === "goal-program" && g.status === "completed"));
  assert.equal(r.state.currentLesson, null);
  assert.equal(r.state.nextRecommendedAction, null);
});

// ── Généricité : deux curricula distincts, même code ──
test("généricité : fonctionne pour Marketing ET un programme linguistique générique", () => {
  const rMkt = JourneyEngine.generate(ctx(MKT, ProgressEngine.init(MKT)));
  const rGen = JourneyEngine.generate(ctx(genericProgram(), ProgressEngine.init(genericProgram())));
  assert.equal(rMkt.validation.ok, true);
  assert.equal(rGen.validation.ok, true);
  assert.equal(rMkt.state.programSlug, "marketing-digital");
  assert.equal(rGen.state.programSlug, "langue-generique");
});

// ── Déterminisme & immutabilité ──
test("déterminisme : deux générations identiques à horloge fixe", () => {
  const s = passModule(MKT, ProgressEngine.init(MKT), 1, "2026-01-01T10:00:00Z");
  const a = JourneyEngine.generate(ctx(MKT, s));
  const b = JourneyEngine.generate(ctx(MKT, s));
  assert.deepEqual(a.state, b.state);
  assert.deepEqual(a.events, b.events);
});

test("immutabilité : l'état d'entrée n'est pas muté", () => {
  const s = passModule(MKT, ProgressEngine.init(MKT), 1);
  const before = JSON.stringify(s);
  JourneyEngine.generate(ctx(MKT, s));
  assert.equal(JSON.stringify(s), before);
});

// ── Confidentialité : aucune fuite de bonne réponse ──
test("confidentialité : le résultat n'expose aucune donnée de correction", () => {
  const r = JourneyEngine.generate(ctx(MKT, ProgressEngine.init(MKT)));
  const serialized = JSON.stringify(r);
  assert.equal(serialized.includes("correctIndex"), false);
  assert.equal(serialized.includes('"correct"'), false);
});

// ── Config & DeepSpecs ──
test("validateJourneyConfig : détecte des seuils non ordonnés", () => {
  const bad = makeJourneyConfig({ mastery: { thresholds: { practiced: 0.9, passed: 0.5, mastered: 0.3 } } as never });
  assert.equal(validateJourneyConfig(bad).ok, false);
});

test("les DeepSpecs du Journey sont documentées (>= 14)", () => {
  assert.ok(JOURNEY_DEEP_SPECS.length >= 14);
  assert.ok(JOURNEY_DEEP_SPECS.every((s) => s.id && s.description));
});
