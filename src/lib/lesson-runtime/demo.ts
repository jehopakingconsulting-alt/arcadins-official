/**
 * ARCADINS — Leçon de DÉMONSTRATION (générique, contenu de test). Illustre le lecteur
 * piloté par métadonnées avec des blocs variés. Les vraies leçons proviendront du
 * curriculum (program_versions/lessons) à l'activation. Aucun média réel.
 */
import type { LessonPlayerModel } from "./types.ts";

export const demoLesson: LessonPlayerModel = {
  lessonId: "l-4-2",
  moduleTitle: "Module 4 · Expression écrite",
  title: "Structurer une lettre formelle",
  objectives: [
    "Identifier les parties d'une lettre formelle",
    "Employer les formules d'appel et de politesse adaptées",
    "Organiser un argumentaire clair en 3 paragraphes",
  ],
  competencies: [
    { code: "EE", label: { fr: "Expression écrite", en: "Writing", es: "Expresión escrita" } },
    { code: "GR", label: { fr: "Grammaire", en: "Grammar", es: "Gramática" } },
  ],
  blocks: [
    { id: "b1", type: "paragraph", text: "Une lettre formelle suit une structure précise. Maîtriser cette structure vous fait gagner des points au TEF, section Expression écrite (tâche 2)." },
    { id: "b2", type: "keyTakeaway", heading: "À retenir", text: "En-tête, objet, formule d'appel, corps en 3 paragraphes, formule de politesse, signature." },
    { id: "b3", type: "heading", text: "Les 3 paragraphes du corps" },
    { id: "b4", type: "list", items: ["Introduction : motif de la lettre", "Développement : argument principal + exemple", "Conclusion : demande ou proposition"] },
    { id: "b5", type: "video", heading: "Démonstration commentée", text: "Rédaction guidée d'une lettre de réclamation.", meta: { duration: "6:20" } },
    { id: "b6", type: "table", rows: [["Registre", "Formule d'appel", "Formule de politesse"], ["Formel", "Madame, Monsieur,", "Je vous prie d'agréer…"], ["Semi-formel", "Bonjour,", "Cordialement,"]] },
    { id: "b7", type: "callout", heading: "Astuce", text: "Reformulez l'objet dès la première phrase : l'examinateur repère immédiatement votre compréhension de la consigne." },
    { id: "b8", type: "audio", heading: "Modèle à l'oral", text: "Écoutez l'intonation d'une formule de politesse.", meta: { duration: "1:15" } },
    { id: "b9", type: "interactiveActivity", heading: "Exercice : remettez la lettre dans l'ordre", text: "Glissez-déposez les 6 parties." },
    { id: "b10", type: "warning", text: "Ne mélangez jamais tutoiement et registre formel : c'est une erreur pénalisante." },
    { id: "b11", type: "pdf", heading: "Fiche récapitulative", text: "Modèle imprimable des formules.", meta: { pages: 2 } },
    { id: "b12", type: "summary", text: "Vous savez désormais structurer une lettre formelle en 3 paragraphes avec les bonnes formules." },
    // Type inconnu volontaire → doit tomber sur le fallback sûr (future-ready).
    { id: "b13", type: "h5p", heading: "Simulation interactive (H5P)", text: "Contenu H5P — rendu enrichi à l'activation." },
  ],
  resources: [
    { id: "r1", kind: "pdf", label: "Fiche formules de politesse", meta: { pages: 2 } },
    { id: "r2", kind: "download", label: "Modèle de lettre (.docx)" },
    { id: "r3", kind: "link", label: "Grille d'évaluation TEF — Expression écrite" },
    { id: "r4", kind: "audio", label: "Banque d'intonations", meta: { duration: "8:00" } },
  ],
  progressPercent: 62,
  moduleLessons: [
    { id: "l-4-1", title: "Le courriel professionnel", completed: true, current: false, locked: false },
    { id: "l-4-2", title: "Structurer une lettre formelle", completed: false, current: true, locked: false },
    { id: "l-4-3", title: "Argumenter à l'écrit", completed: false, current: false, locked: false },
    { id: "l-4-4", title: "Atelier : rédaction chronométrée", completed: false, current: false, locked: true },
  ],
  previousLessonId: "l-4-1",
  nextLessonId: "l-4-3",
  resumeBlockIndex: 4,
};
