/**
 * Runtime — Exam : DeepSpecs (Sprint G).
 *
 * Invariants exécutables du moteur d'examen final sécurisé. Chaque spec est couverte par au moins un test.
 */
export const EXAM_DEEP_SPECS: { id: string; description: string }[] = [
  { id: "G1", description: "Aucune réponse correcte / barème dans la session publique (sérialiseur contrôlé + garde `containsForbiddenKeys` élargie)." },
  { id: "G2", description: "Chronomètre AUTORITAIRE fondé sur l'horloge injectée ; le navigateur ne détermine jamais le temps officiel (aucun Date.now dans la logique)." },
  { id: "G3", description: "Correction PRIVÉE conçue pour le serveur ; le navigateur ne calcule jamais le score officiel." },
  { id: "G4", description: "Une session soumise devient IMMUABLE ; toute réponse ultérieure est rejetée." },
  { id: "G5", description: "Résultat PROVISOIRE distinct du résultat DÉFINITIF ; la correction humaine requise reste bloquante." },
  { id: "G6", description: "Un certificat est IMPOSSIBLE tant que le résultat n'est pas finalisé, valide, révisé et réussi." },
  { id: "G7", description: "Idempotence des commandes critiques (commandId) : rejeu = même résultat, aucune double session/tentative/résultat/événement." },
  { id: "G8", description: "Versionnement figé : la session fige la version exacte ; une modification ultérieure ne change jamais une tentative terminée." },
  { id: "G9", description: "Admissibilité configurable : eligible / ineligible / conditionally_eligible / requires_manual_approval, chaque refus motivé par des reason codes." },
  { id: "G10", description: "Sélection et ordre DÉTERMINISTES des questions (graine dérivée par section)." },
  { id: "G11", description: "Transitions d'état valides uniquement ; transitions illégales interdites." },
  { id: "G12", description: "Reprise = nouvelle tentative liée (`previousAttemptId`), jamais d'écrasement d'une tentative antérieure ; budget/délai respectés." },
  { id: "G13", description: "Tentative invalidée / annulée jamais convertible silencieusement en réussite." },
  { id: "G14", description: "Scores bornés (0 ≤ earned ≤ max) ; sections cohérentes avec le global ; chronomètre non négatif." },
  { id: "G15", description: "Règles éliminatoires et seuils de section appliqués au résultat définitif." },
  { id: "G16", description: "Intégrité DÉFENSIVE non intrusive (checksum, question étrangère, expiration, rejeu, dérive, heartbeat) — aucune biométrie/webcam, reason codes neutres." },
  { id: "G17", description: "Correction hybride : automatique + révision humaine versionnée (assignation, seconde révision, divergence, escalade, approbation)." },
  { id: "G18", description: "Générique : aucun contenu propre à un programme (Marketing/TEF/TCF/DELF) codé en dur ; règles injectées." },
  { id: "G19", description: "Réutilisation par composition des contrats du Sprint F (questions, normalisation, correction, sérialisation publique)." },
  { id: "G20", description: "Aucune dépendance React, aucun accès Supabase/réseau, aucun LLM ; flag FINAL_EXAM_ENABLED = false." },
];
