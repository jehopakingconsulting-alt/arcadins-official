import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Vérification de signature « Standard Webhooks » — format utilisé par le
 * Send Email Hook de Supabase.
 *
 * Contenu signé : `{webhook-id}.{webhook-timestamp}.{corps brut}`
 * Signature     : base64( HMAC-SHA256(contenu, secret décodé) )
 * En-tête       : `webhook-signature: v1,<sig>` (plusieurs signatures possibles,
 *                 séparées par des espaces — rotation de secret).
 *
 * Le secret fourni par Supabase a la forme `v1,whsec_<base64>`.
 * Fonction PURE (hors horloge) : entièrement testable.
 */

export interface VerifyInput {
  /** Corps BRUT de la requête (jamais re-sérialisé : la signature porte sur ces octets). */
  rawBody: string;
  webhookId: string | null;
  webhookTimestamp: string | null;
  webhookSignature: string | null;
  /** Secret Supabase, ex. `v1,whsec_ABC...`. */
  secret: string;
  /** Tolérance d'horloge en secondes (anti-rejeu). */
  toleranceSeconds?: number;
  /** Horloge injectable (tests). */
  now?: () => number;
}

export interface VerifyResult {
  valid: boolean;
  reason?: string;
}

/** Décode le secret : accepte `v1,whsec_XXX`, `whsec_XXX` ou du base64 brut. */
export function decodeSecret(secret: string): Buffer {
  let s = secret.trim();
  const comma = s.indexOf(",");
  if (comma !== -1) s = s.slice(comma + 1); // retire « v1, »
  if (s.startsWith("whsec_")) s = s.slice("whsec_".length);
  return Buffer.from(s, "base64");
}

export function computeSignature(rawBody: string, id: string, timestamp: string, secret: string): string {
  const signedContent = `${id}.${timestamp}.${rawBody}`;
  return createHmac("sha256", decodeSecret(secret)).update(signedContent).digest("base64");
}

/** Comparaison à temps constant (évite les attaques temporelles). */
function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export function verifyWebhookSignature(input: VerifyInput): VerifyResult {
  const { rawBody, webhookId, webhookTimestamp, webhookSignature, secret } = input;
  if (!secret) return { valid: false, reason: "secret non configuré" };
  if (!webhookId || !webhookTimestamp || !webhookSignature) {
    return { valid: false, reason: "en-têtes de signature manquants" };
  }

  // Anti-rejeu : le horodatage doit être proche de maintenant.
  const tolerance = input.toleranceSeconds ?? 300;
  const now = (input.now ?? (() => Date.now()))();
  const ts = Number(webhookTimestamp);
  if (!Number.isFinite(ts)) return { valid: false, reason: "horodatage invalide" };
  if (Math.abs(now / 1000 - ts) > tolerance) return { valid: false, reason: "horodatage hors tolérance" };

  const expected = computeSignature(rawBody, webhookId, webhookTimestamp, secret);

  // L'en-tête peut contenir plusieurs signatures « v1,sig1 v1,sig2 ».
  for (const part of webhookSignature.split(" ")) {
    const value = part.includes(",") ? part.slice(part.indexOf(",") + 1) : part;
    if (safeEqual(value, expected)) return { valid: true };
  }
  return { valid: false, reason: "signature invalide" };
}
