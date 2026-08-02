/**
 * PROGRAMME TEF CANADA — Département A (Programmes officiels de langue).
 * Source unique de vérité pour la page /tef. SÉPARÉ des Formations professionnelles.
 *
 * Le CURRICULUM réel vit dans la plateforme de tutorat (src/lib/data/tutorat.ts) :
 * 4 compétences × 4 niveaux (Fondation → Supérieur, NCLC 1–12). Cette structure
 * référence ce contenu — elle ne le duplique pas.
 *
 * Faits d'examen = informations publiques officielles du TEF Canada (à vérifier auprès
 * des autorités ; ARCADINS n'administre pas l'examen — cf. clause légale). AUCUNE
 * statistique, garantie, reconnaissance ou tarif inventé.
 */
import type { SkillId, LevelId } from "@/types/tutorat";

export interface TefCompetency {
  skill: SkillId;
  name: string;
  abbr: string;
  icon: string;
  /** Structure officielle de l'épreuve (fait public TEF Canada). */
  format: string;
  /** Ce que l'on travaille (résumé pédagogique). */
  focus: string;
  /** Niveau d'entrée recommandé dans le tutorat. */
  entryLevel: LevelId;
}

export const TEF_COMPETENCIES: TefCompetency[] = [
  { skill: "comprehension-orale", name: "Compréhension orale", abbr: "CO", icon: "🎧", format: "≈ 60 questions · 40 minutes", focus: "Comprendre annonces, dialogues, messages et documents sonores authentiques.", entryLevel: "fondation" },
  { skill: "comprehension-ecrite", name: "Compréhension écrite", abbr: "CE", icon: "📖", format: "≈ 50 questions · 60 minutes", focus: "Lire et interpréter courriels, articles, consignes et textes argumentatifs.", entryLevel: "fondation" },
  { skill: "expression-ecrite", name: "Expression écrite", abbr: "EE", icon: "✍️", format: "2 tâches · 60 minutes", focus: "Rédiger des messages et des textes structurés, corrigés et expliqués.", entryLevel: "fondation" },
  { skill: "expression-orale", name: "Expression orale", abbr: "EO", icon: "🗣️", format: "≈ 5 tâches · 12–15 minutes", focus: "Interagir, décrire et argumenter à l'oral, avec coaching et feedback.", entryLevel: "fondation" },
];

/** À qui s'adresse le programme (profils réels de candidats). */
export const TEF_AUDIENCE: string[] = [
  "Candidats à l'immigration économique (Entrée express, programmes provinciaux).",
  "Demandeurs de résidence permanente devant prouver leur niveau de français.",
  "Candidats au Programme de l'expérience québécoise (PEQ) et à la sélection du Québec.",
  "Futurs étudiants en milieu francophone au Canada.",
  "Personnes visant la citoyenneté canadienne.",
];

/** Parcours pédagogique par étapes (référence le tutorat pour le contenu réel). */
export interface TefStage {
  n: string;
  title: string;
  desc: string;
}
export const TEF_STAGES: TefStage[] = [
  { n: "0", title: "Diagnostic & orientation", desc: "Objectif d'immigration, score NCLC visé, niveau estimé et parcours recommandé." },
  { n: "1", title: "Fondations de l'examen", desc: "Structure du test, types de questions, gestion du temps et stratégie d'étude." },
  { n: "2", title: "Les 4 compétences", desc: "Compréhension orale et écrite, expression orale et écrite — travaillées par niveau, du Fondation au Supérieur." },
  { n: "3", title: "Simulations intégrées", desc: "Épreuves partielles puis complètes, chronométrées, proches du format réel." },
  { n: "4", title: "Préparation finale", desc: "Plan de révision personnalisé, priorités de dernière ligne droite et checklist du jour J." },
];

/** Processus d'admission (aligné sur le modèle « demande d'admission », sans paiement en ligne au lancement). */
export const TEF_ADMISSION_STEPS: TefStage[] = [
  { n: "1", title: "Demande d'admission", desc: "Vous remplissez le formulaire avec votre objectif et votre niveau estimé." },
  { n: "2", title: "Échange avec un conseiller", desc: "Nous validons votre profil et vous recommandons un plan de préparation adapté." },
  { n: "3", title: "Plan personnalisé", desc: "Choix du forfait et calendrier de préparation selon votre échéance." },
  { n: "4", title: "Accès & démarrage", desc: "Vous accédez à la plateforme de tutorat et démarrez votre parcours." },
];

export interface TefFaq {
  q: string;
  a: string;
}
export const TEF_FAQ: TefFaq[] = [
  { q: "Qu'est-ce que le TEF Canada ?", a: "Le Test d'Évaluation de Français (TEF Canada) est un test de français reconnu par Immigration, Réfugiés et Citoyenneté Canada (IRCC) pour l'immigration et la citoyenneté. Les résultats sont convertis en niveaux NCLC. ARCADINS propose la préparation, pas l'examen officiel." },
  { q: "Combien de temps dure la préparation ?", a: "Cela dépend de votre niveau de départ et de votre score cible. Le programme est modulaire (du Fondation au Supérieur) et se suit à votre rythme ; un conseiller vous propose un calendrier réaliste lors de l'admission." },
  { q: "Quels niveaux sont couverts ?", a: "Quatre niveaux progressifs : Fondation (A1–A2), Intermédiaire (B1), Avancé (B2) et Supérieur (C1–C2), correspondant aux NCLC 1 à 12." },
  { q: "Comment se déroule la préparation ?", a: "Vous travaillez les 4 compétences via la plateforme de tutorat : objectifs, stratégies, tâches d'entraînement type et conseils, avec un accompagnement pédagogique selon votre forfait." },
  { q: "ARCADINS administre-t-il l'examen officiel ?", a: "Non. ARCADINS est un organisme privé de préparation. Vous devez passer l'examen officiel dans un centre agréé. Nos simulations sont indicatives et ne remplacent pas un résultat officiel." },
  { q: "Comment m'inscrire au programme ?", a: "Faites une demande d'admission : indiquez votre objectif et votre niveau. Un conseiller vous recontacte pour finaliser votre plan et votre forfait." },
];

/** Route canonique du programme TEF Canada + convention de CTA d'admission. */
export const TEF_ROUTE = "/tef";
export const TEF_ADMISSION_HREF = "/contact?programme=tef-canada";
export const TEF_PRICING_HREF = "/tarifs";
