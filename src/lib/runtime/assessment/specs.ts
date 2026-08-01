/**
 * Runtime — Assessment : DeepSpecs (Sprint F).
 */
export const ASSESSMENT_DEEP_SPECS: { id: string; description: string }[] = [
  { id: "A1", description: "Aucune réponse correcte dans PublicQuestion / la session publique (sérialisation contrôlée + garde `containsForbiddenKeys`)." },
  { id: "A2", description: "Correction PRIVÉE conçue pour le serveur ; le navigateur ne détermine jamais le score officiel." },
  { id: "A3", description: "Scores bornés : 0 ≤ earnedPoints ≤ maximumPoints, y compris en crédit partiel." },
  { id: "A4", description: "Déterminisme : sélection (graine) et correction identiques à état/config identiques." },
  { id: "A5", description: "Idempotence : rejouer la même soumission ne recrée pas de résultat, ne consomme pas de tentative, ne duplique pas d'événements." },
  { id: "A6", description: "Versionnement : la tentative fige ses questions ; modifier la banque après coup ne change pas un résultat passé." },
  { id: "A7", description: "Révision manuelle : gradingStatus = pending_manual_review, résultat non définitif (provisoire)." },
  { id: "A8", description: "Nombre maximal de tentatives respecté ; délai de reprise appliqué ; reprise = nouvelle tentative liée sans écraser l'historique." },
  { id: "A9", description: "Aucune progression académique modifiée directement : le moteur renvoie résultat/signaux/événements." },
  { id: "A10", description: "Contrat d'échange de compétences vers le Journey Engine (sans dupliquer le MasteryEngine)." },
  { id: "A11", description: "Intégrité défensive non intrusive : soumission double, question étrangère, expiration, checksum, version, rejeu — aucune biométrie/webcam." },
  { id: "A12", description: "Générique : aucun contenu propre à un programme codé en dur ; règles injectées." },
  { id: "A13", description: "Accessibilité logique (temps supplémentaire) et multilingue (clés i18n) prévus dans les contrats." },
  { id: "A14", description: "Aucune dépendance React, aucun accès Supabase/réseau ; flag FORMATIVE_ASSESSMENT_ENABLED = false." },
];
