/**
 * Runtime — Certification : DeepSpecs (Sprint H).
 */
export const CERTIFICATION_DEEP_SPECS: { id: string; description: string }[] = [
  { id: "H1", description: "Aucun credential sur résultat provisoire, échoué, ou avec certificateEligibility=false." },
  { id: "H2", description: "Source de vérité = ExamResultContract FINALISÉ (Sprint G) ou contrat académique équivalent validé." },
  { id: "H3", description: "Émission IDEMPOTENTE (commandId) : rejeu = même credential, aucun doublon, aucun événement critique dupliqué." },
  { id: "H4", description: "Dédoublonnage : deux credentials actifs identiques pour la même réussite interdits (clé logique)." },
  { id: "H5", description: "Snapshot IMMUABLE : une modification ultérieure de la formation/politique/branding ne change pas un document émis." },
  { id: "H6", description: "Version publiée IMMUABLE : toute évolution crée une nouvelle version." },
  { id: "H7", description: "Identifiant public OPAQUE, non séquentiel, sans donnée personnelle ni identifiant Supabase." },
  { id: "H8", description: "Payload QR sans donnée personnelle/privée ; pointe vers un identifiant de vérification opaque." },
  { id: "H9", description: "Vue publique MINIMALE (liste blanche) ; garde `containsForbiddenKeys` en défense en profondeur." },
  { id: "H10", description: "Intégrité cryptographique : hash déterministe (SHA-256 pur) + signature vérifiable, invalide après altération." },
  { id: "H11", description: "Aucune clé privée réelle en dur : hash et signer INJECTÉS ; provider de test non destiné à la production." },
  { id: "H12", description: "Rotation de clé : plusieurs keyId vérifiables simultanément." },
  { id: "H13", description: "Statuts stricts : actif ne revient pas à draft ; révoqué ne redevient actif que par restauration explicite auditée." },
  { id: "H14", description: "Révocation conservée dans l'historique ; motif public ≠ motif privé (sensibles non publiés)." },
  { id: "H15", description: "Remplacement lié bidirectionnellement ; ancien document marqué `replaced` avec référence publique du nouveau." },
  { id: "H16", description: "Vérification logique (public_id / documentNumber / QR / hash / signature) ; valide/révoqué/suspendu/remplacé/expiré/not_found/tampered." },
  { id: "H17", description: "Badges émis uniquement sur preuve admissible (jamais sur un simple affichage client) ; dédoublonnés." },
  { id: "H18", description: "Aucune reconnaissance officielle inventée ; intitulé par défaut « ATTESTATION DE RÉUSSITE ARCADINS »." },
  { id: "H19", description: "Générique : aucune logique propre à Marketing/TEF/TCF/DELF ; i18n par clés (fr canonique)." },
  { id: "H20", description: "Aucun accès Supabase/réseau, aucun PDF, aucune image QR, aucune migration ; flag CERTIFICATION_ENGINE_ENABLED=false." },
];
