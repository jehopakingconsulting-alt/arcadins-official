// Plateforme de tutorat TEF / TCF — modèle de données.
// Le contenu pédagogique est rédigé en français (source unique) ; l'habillage
// d'interface est traduit via src/lib/i18n.ts, comme pour le LMS.
//
// Conformité : ARCADINS prépare aux tests, elle ne les administre pas. Aucun
// « garantie de score » ni chiffre de réussite n'est promis ici.

/** Les 4 compétences évaluées par le TEF/TCF Canada. */
export type SkillId =
  | "comprehension-ecrite"
  | "comprehension-orale"
  | "expression-ecrite"
  | "expression-orale";

/** Les 4 paliers de tutorat, alignés sur les bandes CLB/NCLC. */
export type LevelId = "fondation" | "intermediaire" | "avance" | "superieur";

export interface Skill {
  id: SkillId;
  /** Libellé court (FR) — traduit à l'affichage via i18n `tut.skill.<id>`. */
  labelFr: string;
  /** Abréviation officieuse affichée dans les badges (CE, CO, EE, EO). */
  abbr: string;
  /** Emoji d'appoint (remplaçable par une icône ultérieurement). */
  icon: string;
}

export interface Level {
  id: LevelId;
  labelFr: string;
  /** Cadre européen de référence (indicatif). */
  cefr: string;
  /** Bande CLB/NCLC visée (indicatif). */
  clb: string;
}

/** Un module = croisement d'une compétence et d'un niveau (16 au total). */
export interface TutoratModule {
  skill: SkillId;
  level: LevelId;
  /** Phrase de cadrage du module. */
  summary: string;
  /** Ce que l'apprenant sait faire à l'issue du module. */
  objectives: string[];
  /** Stratégies et méthodes travaillées en tutorat. */
  strategies: string[];
  /** Points de vigilance / axes de progression fréquents. */
  focus: string[];
  /** Une tâche d'entraînement représentative (format proche de l'examen). */
  sampleTask: { title: string; body: string[] };
  /** Conseils pratiques, actionnables entre deux séances. */
  tips: string[];
}
