/**
 * Runtime — Certification Authority : couche d'intégrité ABSTRAITE et injectable (Sprint K4A, §13).
 *
 * K4A prépare des références d'intégrité mais NE SIGNE PAS avec une clé réelle, N'intègre aucune clé privée,
 * NE génère aucune signature finale ni QR, et N'expose aucun matériel cryptographique. Le provider est injecté ;
 * l'implémentation par défaut est un checksum déterministe NON secret (djb2), clairement identifié « test ».
 */
export interface IntegrityProvider {
  /** Sérialisation canonique déterministe (clés triées). */
  canonicalize(payload: Record<string, unknown>): string;
  /** Checksum déterministe NON secret (ne prouve pas l'authenticité, seulement la cohérence). */
  checksum(canonical: string): string;
  /** Référence d'intégrité publique dérivée du payload (jamais une signature). */
  integrityReference(payload: Record<string, unknown>): string;
  /** Entrée logique qu'un signataire FUTUR (K4B+) pourrait signer — PAS une signature. */
  signatureInput(payload: Record<string, unknown>): string;
}

function canonicalize(payload: Record<string, unknown>): string {
  const walk = (v: unknown): unknown => {
    if (v === null || typeof v !== "object") return v;
    if (Array.isArray(v)) return v.map(walk);
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(v as Record<string, unknown>).sort()) out[k] = walk((v as Record<string, unknown>)[k]);
    return out;
  };
  return JSON.stringify(walk(payload));
}

/** djb2 — déterministe, NON cryptographique (aucune prétention d'authenticité). */
function djb2(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h.toString(16).padStart(8, "0");
}

/** Provider d'intégrité de TEST/préparation (aucun secret). */
export function createTestIntegrityProvider(): IntegrityProvider {
  return {
    canonicalize,
    checksum: (canonical) => djb2(canonical),
    integrityReference: (payload) => `k4a-integrity:${djb2(canonicalize(payload))}`,
    signatureInput: (payload) => canonicalize(payload), // entrée logique, JAMAIS signée ici
  };
}
