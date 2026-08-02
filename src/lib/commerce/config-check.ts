/**
 * ARCADINS — Validation de CONFIGURATION du commerce self-service. PUR / node-testable.
 * Refuse l'activation si la configuration est incomplète : PAS de repli silencieux vers
 * un mode non sécurisé. Utilisé par un endpoint d'état admin + au démarrage de la route
 * de checkout (défense en profondeur).
 */

export interface CommerceEnvLike {
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  NEXT_PUBLIC_SUPABASE_URL?: string;
  PROGRAM_CHECKOUT_ENABLED?: string;
}

export interface ConfigStatus {
  /** Le flag d'activation est-il demandé (ON) ? */
  flagOn: boolean;
  /** La config est-elle COMPLÈTE et sûre pour activer réellement le paiement ? */
  canActivate: boolean;
  /** Variables requises manquantes ou en placeholder. */
  missing: string[];
  /** La clé Stripe est-elle un placeholder (aucun paiement réel possible) ? */
  stripePlaceholder: boolean;
  /** Résumé lisible pour l'admin. */
  summary: string;
}

const PLACEHOLDERS = new Set(["", "sk_test_placeholder", "placeholder", "https://placeholder.supabase.co"]);

function present(v: string | undefined): boolean {
  return typeof v === "string" && v.trim() !== "" && !PLACEHOLDERS.has(v.trim());
}

/** Évalue l'état de configuration commerce (déterministe, sans I/O). */
export function evaluateCommerceConfig(env: CommerceEnvLike): ConfigStatus {
  const required: (keyof CommerceEnvLike)[] = [
    "STRIPE_SECRET_KEY",
    "STRIPE_WEBHOOK_SECRET",
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "NEXT_PUBLIC_SUPABASE_URL",
  ];
  const missing = required.filter((k) => !present(env[k]));
  const flagOn = env.PROGRAM_CHECKOUT_ENABLED === "true";
  const stripePlaceholder = !present(env.STRIPE_SECRET_KEY);
  const canActivate = flagOn && missing.length === 0;

  let summary: string;
  if (!flagOn) summary = "Flag OFF — commerce self-service inactif (production inchangée).";
  else if (missing.length > 0) summary = `Flag ON mais configuration INCOMPLÈTE — manquant : ${missing.join(", ")}. Activation refusée.`;
  else summary = "Configuration complète — commerce self-service prêt à activer.";

  return { flagOn, canActivate, missing, stripePlaceholder, summary };
}
