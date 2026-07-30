/**
 * Runtime — Certification : CredentialIdGenerator (Sprint H).
 *
 * Produit des identifiants OPAQUES, non séquentiels, non prédictibles, compatibles URL, sans donnée personnelle
 * ni identifiant Supabase. Déterministes uniquement lorsque l'idempotence l'exige (dérivés d'une clé logique).
 * Le numéro public suit un format professionnel configurable mais n'est jamais fondé sur un simple compteur.
 */
import type { HashProvider } from "./types.ts";

const URL_SAFE = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sans O/0/I/1 (lisible manuellement)

function encodeFromHex(hex: string, length: number): string {
  let out = "";
  for (let i = 0; i < length; i++) {
    const start = (i * 2) % Math.max(1, hex.length - 1);
    const pair = hex.slice(start, start + 2) || "0";
    const byte = parseInt(pair, 16) || 0;
    out += URL_SAFE[byte % URL_SAFE.length];
  }
  return out;
}

export interface CredentialIds {
  internalCredentialId: string;
  publicVerificationId: string;
  documentNumber: string;
  issuanceRequestId: string;
}

export const CredentialIdGenerator = {
  /**
   * Génère un identifiant public opaque à partir d'une graine de contenu (jamais de donnée personnelle en clair).
   * `contentSeed` est typiquement `internalId + issuanceKeyHash + seed` — non réversible vers l'apprenant.
   */
  publicVerificationId(contentSeed: string, hashProvider: HashProvider): string {
    const hex = hashProvider.hash(`pvid:${contentSeed}`);
    return `${encodeFromHex(hex, 6)}-${encodeFromHex(hex.slice(20), 6)}`;
  },

  /** Numéro de document professionnel : PREFIX-ANNÉE-XXXXXXXX (partie aléatoire dérivée d'un hash, pas d'un compteur). */
  documentNumber(prefix: string, year: number, contentSeed: string, hashProvider: HashProvider): string {
    const hex = hashProvider.hash(`docnum:${contentSeed}`);
    return `${prefix}-${year}-${encodeFromHex(hex, 8)}`;
  },

  /** Identifiant de version opaque. */
  versionId(contentSeed: string, version: number, hashProvider: HashProvider): string {
    const hex = hashProvider.hash(`ver:${version}:${contentSeed}`);
    return `v${version}-${encodeFromHex(hex, 8)}`;
  },

  /** Identifiant humainement lisible (groupes courts) pour vérification sans QR. */
  humanReadableId(publicVerificationId: string): string {
    return publicVerificationId.replace(/-/g, " ").toUpperCase();
  },
};
