/**
 * Runtime — Certification : CredentialIntegrityEngine (Sprint H).
 *
 * Mécanisme cryptographique INJECTABLE et testable : canonicalisation déterministe du snapshot, hachage de contenu
 * (SHA-256 pur, déterministe, standard — pas de fonction faible), signature logique par un `SignerProvider` injecté,
 * vérification de signature et détection d'altération, version d'algorithme et rotation de clé.
 *
 * AUCUNE clé privée réelle en dur. Le provider de test ci-dessous n'est PAS destiné à la production.
 */
import type {
  CredentialIntegrityEnvelope,
  CredentialSnapshot,
  HashProvider,
  SignerProvider,
} from "./types.ts";

export const CANONICAL_VERSION = 1;

/** Canonicalisation déterministe : JSON à clés triées récursivement (ordre stable). */
export function canonicalize(value: unknown): string {
  const seen = new Set<unknown>();
  const walk = (v: unknown): unknown => {
    if (v === null || typeof v !== "object") return v;
    if (seen.has(v)) throw new Error("CANONICALIZE_CYCLE");
    seen.add(v);
    if (Array.isArray(v)) {
      const arr = v.map(walk);
      seen.delete(v);
      return arr;
    }
    const obj = v as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(obj).sort()) out[k] = walk(obj[k]);
    seen.delete(v);
    return out;
  };
  return JSON.stringify(walk(value));
}

// ─────────────────────────── SHA-256 pur (déterministe) ───────────────────────────
const K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];

function rotr(x: number, n: number): number {
  return (x >>> n) | (x << (32 - n));
}

/** Encode une chaîne en octets UTF-8. */
function utf8Bytes(str: string): number[] {
  const bytes: number[] = [];
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i);
    if (code < 0x80) bytes.push(code);
    else if (code < 0x800) {
      bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
    } else if (code >= 0xd800 && code <= 0xdbff) {
      // paire de substitution
      const hi = code;
      const lo = str.charCodeAt(++i);
      code = 0x10000 + ((hi - 0xd800) << 10) + (lo - 0xdc00);
      bytes.push(0xf0 | (code >> 18), 0x80 | ((code >> 12) & 0x3f), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
    } else {
      bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
    }
  }
  return bytes;
}

/** SHA-256 déterministe (retourne un hex de 64 caractères). */
export function sha256Hex(input: string): string {
  const h = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
  const bytes = utf8Bytes(input);
  const bitLen = bytes.length * 8;
  bytes.push(0x80);
  while (bytes.length % 64 !== 56) bytes.push(0);
  // longueur sur 64 bits (les 32 bits hauts sont nuls pour nos tailles)
  for (let i = 0; i < 4; i++) bytes.push(0);
  bytes.push((bitLen >>> 24) & 0xff, (bitLen >>> 16) & 0xff, (bitLen >>> 8) & 0xff, bitLen & 0xff);

  const w = new Array<number>(64);
  for (let chunk = 0; chunk < bytes.length; chunk += 64) {
    for (let i = 0; i < 16; i++) {
      w[i] = (bytes[chunk + i * 4] << 24) | (bytes[chunk + i * 4 + 1] << 16) | (bytes[chunk + i * 4 + 2] << 8) | bytes[chunk + i * 4 + 3];
    }
    for (let i = 16; i < 64; i++) {
      const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
      const s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
    }
    let [a, b, c, d, e, f, g, hh] = h;
    for (let i = 0; i < 64; i++) {
      const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
      const ch = (e & f) ^ (~e & g);
      const t1 = (hh + S1 + ch + K[i] + w[i]) | 0;
      const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const t2 = (S0 + maj) | 0;
      hh = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
    }
    h[0] = (h[0] + a) | 0; h[1] = (h[1] + b) | 0; h[2] = (h[2] + c) | 0; h[3] = (h[3] + d) | 0;
    h[4] = (h[4] + e) | 0; h[5] = (h[5] + f) | 0; h[6] = (h[6] + g) | 0; h[7] = (h[7] + hh) | 0;
  }
  return h.map((x) => (x >>> 0).toString(16).padStart(8, "0")).join("");
}

/** Provider de hachage par défaut (SHA-256 pur). */
export function createDefaultHashProvider(): HashProvider {
  return { algorithm: "SHA-256", hash: (input: string) => sha256Hex(input) };
}

/**
 * Provider de signature de TEST (HMAC-like via SHA-256). La clé secrète est FOURNIE au runtime (jamais en dur).
 * NON destiné à la production : à remplacer par une signature asymétrique côté serveur lors du branchement réel.
 */
export function createTestSigner(opts: { keyId: string; secret: string; hashProvider?: HashProvider }): SignerProvider {
  const hp = opts.hashProvider ?? createDefaultHashProvider();
  const compute = (canonical: string) => hp.hash(`${opts.keyId}:${opts.secret}:${canonical}`);
  return {
    algorithm: "HMAC-SHA256-TEST",
    activeKeyId: opts.keyId,
    sign: (canonical: string) => ({ algorithm: "HMAC-SHA256-TEST", keyId: opts.keyId, value: compute(canonical) }),
    verify: (canonical: string, signature) => signature.keyId === opts.keyId && signature.value === compute(canonical),
  };
}

/** Vérificateur multi-clés (rotation) : plusieurs keyId supportés simultanément. */
export function createMultiKeyVerifier(signers: SignerProvider[]): Pick<SignerProvider, "verify"> & { keyIds: string[] } {
  const byKey = new Map(signers.map((s) => [s.activeKeyId, s]));
  return {
    keyIds: [...byKey.keys()],
    verify: (canonical, signature) => byKey.get(signature.keyId)?.verify(canonical, signature) ?? false,
  };
}

export const CredentialIntegrityEngine = {
  canonicalize,

  /** Hash de contenu déterministe du snapshot. */
  hashSnapshot(snapshot: CredentialSnapshot, hashProvider: HashProvider): { algorithm: string; value: string } {
    return { algorithm: hashProvider.algorithm, value: hashProvider.hash(canonicalize(snapshot)) };
  },

  /** Construit l'enveloppe d'intégrité (hash + signature). */
  seal(snapshot: CredentialSnapshot, hashProvider: HashProvider, signer: SignerProvider): CredentialIntegrityEnvelope {
    const canonical = canonicalize(snapshot);
    const contentHash = { algorithm: hashProvider.algorithm, value: hashProvider.hash(canonical) };
    const signature = signer.sign(canonical);
    return { canonicalVersion: CANONICAL_VERSION, contentHash, signature };
  },

  /** Vérifie l'intégrité : hash recalculé identique + signature valide. */
  verify(snapshot: CredentialSnapshot, envelope: CredentialIntegrityEnvelope, hashProvider: HashProvider, verifier: Pick<SignerProvider, "verify">): { ok: boolean; tampered: boolean; signatureValid: boolean } {
    const canonical = canonicalize(snapshot);
    const recomputed = hashProvider.hash(canonical);
    const tampered = recomputed !== envelope.contentHash.value;
    const signatureValid = verifier.verify(canonical, envelope.signature);
    return { ok: !tampered && signatureValid, tampered, signatureValid };
  },
};
