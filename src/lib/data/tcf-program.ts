/**
 * PROGRAMME TCF CANADA — Département A (Programmes officiels de langue).
 * Source unique de vérité pour la page /tcf. SÉPARÉ des Formations professionnelles
 * ET distinct du programme TEF Canada (examen différent, organisme différent).
 *
 * Le CURRICULUM réel est mutualisé avec la plateforme de tutorat (src/lib/data/tutorat.ts) :
 * 4 compétences × 4 niveaux (Fondation → Supérieur). Les fondations de langue sont
 * partagées entre TEF et TCF ; l'APPLICATION à l'examen est spécifique au TCF Canada.
 * Cette structure référence ce contenu — elle ne le duplique pas.
 *
 * INTÉGRITÉ DU CONTENU : faits d'examen = informations publiques (à vérifier auprès de
 * France Éducation international / IRCC / MIFI). ARCADINS n'administre pas l'examen
 * (cf. clause légale). AUCUNE statistique, garantie de résultat, reconnaissance ou tarif inventé.
 *
 * NOTE FACTUELLE : le TCF Canada comporte 4 épreuves (CO, CE, EE, EO). L'épreuve de
 * « maîtrise des structures de la langue » (MSL) appartient au TCF « tout public », PAS
 * au TCF Canada — elle n'est donc volontairement pas présentée ici.
 */
import type { SkillId, LevelId } from "@/types/tutorat";

export interface TcfCompetency {
  skill: SkillId;
  name: string;
  abbr: string;
  icon: string;
  /** Structure indicative de l'épreuve (fait public TCF Canada, à vérifier). */
  format: string;
  /** Échelle de niveaux évaluée par l'épreuve. */
  scale: string;
  /** Ce que l'on travaille (résumé pédagogique). */
  focus: string;
  /** Niveau d'entrée recommandé dans le tutorat mutualisé. */
  entryLevel: LevelId;
}

/**
 * Les 4 épreuves du TCF Canada (PAS de MSL — cf. note factuelle ci-dessus).
 * Formats DURÉES/QUESTIONS = indicatifs, à vérifier sur le site officiel.
 */
export const TCF_COMPETENCIES: TcfCompetency[] = [
  { skill: "comprehension-orale", name: "Compréhension orale", abbr: "CO", icon: "🎧", format: "Épreuve à choix multiples · ~35 min", scale: "CECRL A1–C2", focus: "Comprendre annonces, dialogues et documents sonores authentiques ; écoute globale et sélective.", entryLevel: "fondation" },
  { skill: "comprehension-ecrite", name: "Compréhension écrite", abbr: "CE", icon: "📖", format: "Épreuve à choix multiples · ~60 min", scale: "CECRL A1–C2", focus: "Lire et interpréter articles, courriels, formulaires et textes en contexte canadien et québécois.", entryLevel: "fondation" },
  { skill: "expression-ecrite", name: "Expression écrite", abbr: "EE", icon: "✍️", format: "3 tâches de rédaction · ~60 min", scale: "CECRL A1–C2", focus: "Rédiger message court, message formel et prise de position — structure, cohérence et vocabulaire.", entryLevel: "fondation" },
  { skill: "expression-orale", name: "Expression orale", abbr: "EO", icon: "🎤", format: "Entretien · ~12 min", scale: "CECRL A1–C2", focus: "Interagir, décrire et argumenter à l'oral — fluidité, prononciation et richesse lexicale.", entryLevel: "fondation" },
];

/** Modules de préparation complémentaires SPÉCIFIQUES au TCF Canada (au-delà des 4 compétences). */
export const TCF_PREP_MODULES: { icon: string; title: string; desc: string }[] = [
  { icon: "🏔️", title: "Préparation Québec (PEQ / MIFI)", desc: "Contextes, vocabulaire et repères propres au Québec, utiles pour le Programme de l'expérience québécoise et la sélection du MIFI." },
  { icon: "⏱️", title: "Simulations chronométrées TCF Canada", desc: "Entraînez-vous au format des 4 épreuves dans des conditions proches du réel, avec chronomètre — simulations indicatives, non officielles." },
  { icon: "📊", title: "Interprétation des scores CECRL & NCLC", desc: "Comprendre comment les résultats TCF Canada se lisent en niveaux CECRL, et comment ils sont convertis en NCLC pour l'immigration." },
];

/**
 * Correspondance INDICATIVE niveaux CECRL → NCLC pour le TCF Canada.
 * Les scores exacts par compétence et les seuils officiels sont publiés par IRCC et
 * France Éducation international. Repères de lecture, pas des valeurs officielles.
 */
export const TCF_LEVEL_TABLE: {
  headers: string[];
  rows: { cecrl: string; nclc: string; repere: string }[];
  note: string;
} = {
  headers: ["Niveau CECRL", "NCLC (indicatif)", "Repère"],
  rows: [
    { cecrl: "A2", nclc: "NCLC 3–4", repere: "Niveau de base" },
    { cecrl: "B1", nclc: "NCLC 5–6", repere: "Intermédiaire" },
    { cecrl: "B2", nclc: "NCLC 7–8", repere: "Seuil visé par de nombreux programmes d'immigration" },
    { cecrl: "C1", nclc: "NCLC 9–10", repere: "Avancé" },
    { cecrl: "C2", nclc: "NCLC 11–12", repere: "Supérieur" },
  ],
  note: "Correspondance indicative CECRL → NCLC. Les scores TCF Canada exacts par compétence et les seuils officiels sont publiés par IRCC et France Éducation international — vérifiez les valeurs à jour.",
};

/** À qui s'adresse le programme (profils réels de candidats). */
export const TCF_AUDIENCE: string[] = [
  "Candidats à l'immigration économique fédérale (Entrée express) devant prouver leur français.",
  "Candidats au Programme de l'expérience québécoise (PEQ) et à la sélection du Québec (MIFI).",
  "Candidats au Programme des travailleurs qualifiés du Québec.",
  "Demandeurs de résidence permanente au Canada.",
  "Futurs étudiants dans les universités et établissements francophones du Québec.",
];

/** Ce qui distingue le TCF Canada du TEF Canada (séparation explicite des deux examens). */
export const TCF_VS_TEF: { label: string; tcf: string }[] = [
  { label: "Organisme", tcf: "France Éducation international (ex-CIEP)" },
  { label: "Épreuves", tcf: "4 épreuves : CO, CE, EE, EO" },
  { label: "Échelle", tcf: "Niveaux CECRL (A1–C2), convertis en NCLC" },
  { label: "Reconnaissance", tcf: "IRCC (fédéral) et MIFI (Québec)" },
  { label: "Validité", tcf: "Résultats valables 2 ans" },
];

export interface TcfStage {
  n: string;
  title: string;
  desc: string;
}

/** Parcours pédagogique par étapes (référence le tutorat mutualisé pour le contenu réel). */
export const TCF_STAGES: TcfStage[] = [
  { n: "0", title: "Diagnostic & orientation", desc: "Objectif d'immigration (fédéral ou Québec), niveau CECRL estimé, score NCLC visé et parcours recommandé." },
  { n: "1", title: "Fondations de l'examen", desc: "Structure des 4 épreuves du TCF Canada, types de tâches, gestion du temps et stratégie d'étude." },
  { n: "2", title: "Les 4 compétences", desc: "Compréhension orale et écrite, expression écrite et orale — travaillées par niveau via la plateforme de tutorat mutualisée." },
  { n: "3", title: "Application TCF & simulations", desc: "Adaptation au format TCF Canada, préparation Québec (PEQ) et simulations chronométrées, indicatives." },
  { n: "4", title: "Préparation finale", desc: "Plan de révision personnalisé, priorités de dernière ligne droite et checklist du jour J." },
];

/** Points de méthode (spécifiques à la préparation TCF Canada). */
export const TCF_METHOD: string[] = [
  "Diagnostic initial et définition d'un objectif CECRL / NCLC réaliste.",
  "Travail structuré des 4 épreuves du TCF Canada, compétence par compétence.",
  "Fondations de langue mutualisées (grammaire, vocabulaire, méthodologie), appliquées au format TCF.",
  "Exercices d'entraînement progressifs, du niveau A1 au niveau C2.",
  "Préparation spécifique au Québec (PEQ / MIFI) lorsque c'est votre objectif.",
  "Simulations chronométrées proches du format réel — indicatives, non officielles.",
  "Accompagnement pédagogique et suivi selon le forfait choisi.",
];

/** Processus d'admission (modèle « demande d'admission », sans paiement en ligne au lancement). */
export const TCF_ADMISSION_STEPS: TcfStage[] = [
  { n: "1", title: "Demande d'admission", desc: "Vous remplissez le formulaire avec votre objectif (fédéral ou Québec) et votre niveau estimé." },
  { n: "2", title: "Échange avec un conseiller", desc: "Nous validons votre profil et vous recommandons un plan de préparation TCF Canada adapté." },
  { n: "3", title: "Plan personnalisé", desc: "Choix du forfait et calendrier de préparation selon votre échéance." },
  { n: "4", title: "Accès & démarrage", desc: "Vous accédez à la plateforme de tutorat et démarrez votre parcours TCF Canada." },
];

export interface TcfFaq {
  q: string;
  a: string;
}
export const TCF_FAQ: TcfFaq[] = [
  { q: "Qu'est-ce que le TCF Canada ?", a: "Le TCF Canada (Test de Connaissance du Français pour le Canada) est un test de français organisé par France Éducation international. Il est reconnu par IRCC pour l'immigration fédérale et par le MIFI pour les programmes d'immigration du Québec. Les résultats sont exprimés en niveaux CECRL et convertis en NCLC. ARCADINS propose la préparation, pas l'examen officiel." },
  { q: "Quelle est la différence avec le TEF Canada ?", a: "Ce sont deux examens distincts et également reconnus. Le TCF Canada est administré par France Éducation international ; le TEF Canada par la CCI Paris Île-de-France. Le contenu, le format des épreuves et le barème diffèrent. ARCADINS prépare aux deux : choisissez celui exigé ou accepté par votre programme d'immigration." },
  { q: "Le TCF Canada comporte-t-il une épreuve de « structures de la langue » ?", a: "Non. Le TCF Canada évalue 4 compétences : compréhension orale, compréhension écrite, expression écrite et expression orale. L'épreuve de maîtrise des structures de la langue (MSL) fait partie du TCF « tout public », pas du TCF Canada. Vérifiez toujours le format en vigueur sur le site officiel." },
  { q: "Combien de temps dure la préparation ?", a: "Cela dépend de votre niveau de départ et de votre objectif NCLC. Le programme est modulaire (du Fondation au Supérieur) et se suit à votre rythme ; un conseiller vous propose un calendrier réaliste lors de l'admission. Nous ne promettons pas de délai ni de résultat." },
  { q: "Combien de temps mes résultats sont-ils valides ?", a: "Les résultats du TCF Canada sont généralement valables 2 ans. Confirmez la durée applicable à votre démarche auprès de France Éducation international et des autorités d'immigration concernées." },
  { q: "ARCADINS administre-t-il l'examen officiel ?", a: "Non. ARCADINS est un organisme privé de préparation, non affilié à France Éducation international, IRCC ou MIFI. Vous passez l'examen officiel dans un centre agréé. Nos simulations sont indicatives et ne remplacent pas un résultat officiel." },
  { q: "Comment m'inscrire au programme ?", a: "Faites une demande d'admission : indiquez votre objectif et votre niveau. Un conseiller vous recontacte pour finaliser votre plan et votre forfait." },
];

/** Route canonique du programme TCF Canada + convention de CTA d'admission. */
export const TCF_ROUTE = "/tcf";
export const TCF_ADMISSION_HREF = "/contact?programme=tcf-canada";
export const TCF_PRICING_HREF = "/tarifs";
