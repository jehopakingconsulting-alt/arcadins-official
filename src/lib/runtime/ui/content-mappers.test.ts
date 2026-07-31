import { test } from "node:test";
import assert from "node:assert/strict";
import type { ProgramCurriculumV2 } from "../../academic/types.ts";
import { marketingDigitalV2 } from "../../academic/marketing-digital-v2.ts";
import {
  toProgramOverview, toJourneyViewModel, toLessonPlayerViewModel, toContentProgress,
  flattenLessons, lessonToBlocks, firstAccessibleLessonId, academicDashboardFocus,
} from "./content-mappers.ts";
import { buildAcademicStudentBundle } from "./academic-preview.ts";
import { containsForbiddenUiKeys, validateViewModel } from "./validation.ts";

const C = marketingDigitalV2;

test("toProgramOverview : aperçu fidèle du programme réel", () => {
  const o = toProgramOverview(C);
  assert.equal(o.programId, "marketing-digital");
  assert.equal(o.totalModules, 8);
  assert.equal(o.totalWeeks, 24);
  assert.equal(o.passThresholdPercent, 70);
});

test("toJourneyViewModel : 8 modules, semaines groupées, verrouillage par défaut", () => {
  const j = toJourneyViewModel(C);
  assert.equal(j.modules.length, 8);
  assert.equal(j.modules[0].status, "in_progress"); // module 1 accessible par défaut
  assert.equal(j.modules[1].status, "locked");
  const lockedLesson = j.modules[1].weeks[0].lessons[0];
  assert.equal(lockedLesson.lockedReasonCode, "PREREQUISITE_MODULE_INCOMPLETE");
  // Chaque module a 3 semaines.
  for (const m of j.modules) assert.equal(m.weeks.length, 3);
  // Les leçons du parcours ne fuient aucune donnée de correction.
  assert.equal(containsForbiddenUiKeys(j), false);
});

test("toLessonPlayerViewModel : contenu RÉEL en blocs, objectifs, précédent/suivant", () => {
  const firstId = firstAccessibleLessonId(C)!;
  const vm = toLessonPlayerViewModel(C, firstId)!;
  assert.ok(vm.titleKey.length > 0);
  assert.ok(vm.objectives.length > 0);
  assert.ok(vm.blocks.length > 0);
  assert.ok(vm.blocks.some((b) => b.type === "paragraph" && (b.text?.length ?? 0) > 40)); // vrai paragraphe rédigé
  assert.equal(vm.previousLessonId, null); // 1re leçon
  assert.ok(vm.nextLessonId); // a une suite
  assert.equal(containsForbiddenUiKeys(vm), false);
});

test("SÉCURITÉ : les answerKey des activités interactives ne fuient PAS dans les blocs", () => {
  // Trouver une leçon avec activités interactives (modules 2–8).
  let target: { lessonId: string; answerKey: string } | null = null;
  for (const m of C.modules) {
    for (const l of m.lessons) {
      if (l.interactiveActivities && l.interactiveActivities.length > 0 && l.interactiveActivities[0].answerKey.length > 0) {
        target = { lessonId: l.id, answerKey: l.interactiveActivities[0].answerKey[0] };
        break;
      }
    }
    if (target) break;
  }
  assert.ok(target, "au moins une activité interactive avec answerKey attendue");
  const vm = toLessonPlayerViewModel(C, target!.lessonId)!;
  const blob = JSON.stringify(vm);
  assert.equal(containsForbiddenUiKeys(vm), false);
  assert.equal(blob.includes(target!.answerKey), false, "la clé de correction ne doit jamais apparaître dans le lecteur");
});

test("toContentProgress : structure réelle, valeurs neutres, validée", () => {
  const p = toContentProgress(C);
  assert.equal(p.modules.length, 8);
  assert.equal(p.weeks.length, 24);
  assert.ok(validateViewModel(p).ok);
});

test("academicDashboardFocus : module courant + prochaine leçon dérivés du contenu", () => {
  const f = academicDashboardFocus(C);
  assert.match(f.currentModuleTitle ?? "", /Module 1/);
  assert.ok(f.nextLessonTitle && f.nextLessonTitle.length > 0);
});

test("buildAcademicStudentBundle : bundle réel + validé, sans fuite", () => {
  const b = buildAcademicStudentBundle(C);
  assert.equal(b.journey.modules.length, 8);
  assert.ok(b.lesson.blocks.length > 0);
  assert.equal(b.dashboard.program?.programTitle, "Marketing Digital et E-commerce");
  assert.equal(containsForbiddenUiKeys(b), false);
});

test("GÉNÉRIQUE : mappe un programme synthétique quelconque sans logique en dur", () => {
  const synthetic: ProgramCurriculumV2 = {
    slug: "tef-synth", programVersion: "v2", title: "TEF (synthétique)", totalWeeks: 6, passingScore: 60,
    weights: { activities: 20, moduleQuizzes: 20, practicals: 25, finalProject: 20, finalExam: 15 },
    exitCompetencies: ["C1", "C2"],
    modules: [
      { index: 1, title: "Compréhension", weeks: [1, 2, 3], summary: "s", competencies: ["C1"], assessments: [],
        lessons: [{ id: "syn-l1", title: "Écoute", objectives: ["obj"], content: ["Un paragraphe de démonstration synthétique."], keyTakeaways: ["à retenir"], authored: true }] },
      { index: 2, title: "Expression", weeks: [4, 5, 6], summary: "s", competencies: ["C2"], assessments: [],
        lessons: [{ id: "syn-l2", title: "Écrit", objectives: ["obj"], content: ["Autre paragraphe."], keyTakeaways: [], authored: true }] },
    ],
  };
  const j = toJourneyViewModel(synthetic);
  assert.equal(j.modules.length, 2);
  const vm = toLessonPlayerViewModel(synthetic, "syn-l1")!;
  assert.ok(vm.blocks.some((b) => b.type === "paragraph"));
  assert.equal(flattenLessons(synthetic).length, 2);
  assert.deepEqual(lessonToBlocks(synthetic.modules[0].lessons[0]).map((b) => b.type).includes("keyTakeaway"), true);
});
