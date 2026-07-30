/**
 * Runtime — Journey : DeepSpecs (Sprint E).
 */
import type { JourneyConfig } from "./types.ts";

export const JOURNEY_DEEP_SPECS: { id: string; description: string }[] = [
  { id: "J1", description: "Aucune logique propre à un programme : le comportement dépend du curriculum + de la config injectée." },
  { id: "J2", description: "Déterminisme : à état, config et horloge identiques, le résultat est exactement le même." },
  { id: "J3", description: "L'horloge est injectée (ctx.now) ; aucune lecture directe de Date.now() dans la logique métier." },
  { id: "J4", description: "Explicabilité : recommandations, verrouillages, remédiations et plans portent des reasonCodes." },
  { id: "J5", description: "Immutabilité : le moteur ne mute jamais l'état d'entrée." },
  { id: "J6", description: "Anti-boucles : détection des cycles de prérequis ; remédiations bornées (maxAttempts) avec sortie encadrée." },
  { id: "J7", description: "Tri stable des recommandations : obligatoire → échéance → priorité → confiance → id." },
  { id: "J8", description: "Respect du rythme : aucun jour ne dépasse la capacité configurée (sessions partielles si besoin)." },
  { id: "J9", description: "Maîtrise multi-signaux : jamais fondée uniquement sur un quiz ; seuils configurables ; déterministe." },
  { id: "J10", description: "Révision espacée déterministe et configurable, sans prétention scientifique garantie." },
  { id: "J11", description: "Pas de fausse IA : aucun LLM, aucune clé, aucun réseau ; recommandeur avancé injectable désactivé par défaut." },
  { id: "J12", description: "Confidentialité : aucune bonne réponse, note d'admin, secret ou donnée d'autrui exposés." },
  { id: "J13", description: "Impossible de recommander un contenu inaccessible (leçon verrouillée)." },
  { id: "J14", description: "Aucune dépendance React, aucune dépendance directe à Supabase, aucune lecture/écriture réelle en base." },
];

/** Valide la cohérence d'une configuration pédagogique. */
export function validateJourneyConfig(config: JourneyConfig): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (config.workload.dailyMinutes <= 0) errors.push("dailyMinutes doit être > 0.");
  const t = config.mastery.thresholds;
  if (!(t.practiced <= t.passed && t.passed <= t.mastered)) errors.push("Seuils de maîtrise non ordonnés (practiced ≤ passed ≤ mastered).");
  if (config.remediation.maxAttempts < 1) errors.push("maxAttempts doit être ≥ 1.");
  if (config.review.baseIntervalDays <= 0) errors.push("baseIntervalDays doit être > 0.");
  return { ok: errors.length === 0, errors };
}
