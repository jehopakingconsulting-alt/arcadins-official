import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

// Bucket PRIVÉ (créé par la migration 0007). Les certificats contiennent des PII
// (nom, score) : jamais d'accès public. On sert via une URL SIGNÉE expirante,
// générée côté serveur (service role) après contrôle d'accès applicatif.
export const LEGACY_CERTIFICATES_BUCKET = "legacy-certificates";

/**
 * Retourne une URL signée temporaire pour un objet du bucket privé.
 * @param path      chemin de l'objet (ex. `ARC-1.pdf`)
 * @param expiresIn durée de validité en secondes (défaut 5 min)
 */
export async function getCertificateSignedUrl(path: string, expiresIn = 300): Promise<string | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.storage
    .from(LEGACY_CERTIFICATES_BUCKET)
    .createSignedUrl(path, expiresIn);
  if (error) {
    console.error(`getCertificateSignedUrl(${path}):`, error.message);
    return null;
  }
  return data?.signedUrl ?? null;
}
