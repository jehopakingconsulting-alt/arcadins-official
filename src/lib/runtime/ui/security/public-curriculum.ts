/**
 * Runtime — UI/Security : projection PUBLIQUE et STRUCTURELLE du curriculum (Sprint K3-S).
 *
 * `toPublicCurriculum` construit, par LISTE BLANCHE explicite, une version STRUCTURELLE du programme : identités
 * de modules/leçons, titres, objectifs, compétences, seuils — mais AUCUN contenu privé (activités interactives
 * avec `answerKey`, quiz/banque, exercices, rubriques, examen). Les moteurs des Sprints A/K2A ne lisent que la
 * structure (slug, index de module, id de leçon…) : la projection est donc iso-fonctionnelle pour la
 * progression, sans jamais transporter de bonne réponse vers le client. Le résultat est validé par la garde.
 *
 * PUR / node-testable. Imports RELATIFS uniquement.
 */
import type { ModuleV2, ProgramCurriculumV2, SummativeAssessment } from "../../../academic/types.ts";
import { ensureClientSafePayload } from "./ensure-client-safe.ts";

/** Assessment PUBLIC : seuils/poids uniquement (SummativeAssessment ne contient aucune bonne réponse). */
function publicAssessment(a: SummativeAssessment): SummativeAssessment {
  return { id: a.id, kind: a.kind, title: a.title, passThreshold: a.passThreshold, weightHint: a.weightHint };
}

function publicModule(m: ModuleV2): ModuleV2 {
  return {
    index: m.index,
    title: m.title,
    weeks: m.weeks,
    summary: m.summary,
    competencies: [...m.competencies],
    // Leçons : identité + libellés publics UNIQUEMENT (aucun contenu/quiz/activité privés).
    lessons: m.lessons.map((l) => ({
      id: l.id,
      title: l.title,
      objectives: [...l.objectives],
      content: [], // contenu privé/éditorial retiré de la frontière client
      keyTakeaways: [...l.keyTakeaways],
      authored: l.authored,
      module: l.module,
      week: l.week,
      competencies: l.competencies ? [...l.competencies] : undefined,
      durationMinutes: l.durationMinutes,
    })),
    assessments: m.assessments.map(publicAssessment),
    // Champs enrichis privés (weeklyQuizzes / finalExam / rubric / links / activités) VOLONTAIREMENT omis.
  };
}

/** Projection publique structurelle du curriculum (validée : aucune clé privée ne franchit la frontière). */
export function toPublicCurriculum(curriculum: ProgramCurriculumV2): ProgramCurriculumV2 {
  const projected: ProgramCurriculumV2 = {
    slug: curriculum.slug,
    programVersion: curriculum.programVersion,
    title: curriculum.title,
    totalWeeks: curriculum.totalWeeks,
    passingScore: curriculum.passingScore,
    weights: { ...curriculum.weights },
    modules: curriculum.modules.map(publicModule),
    exitCompetencies: [...curriculum.exitCompetencies],
  };
  return ensureClientSafePayload(projected, "curriculum");
}
