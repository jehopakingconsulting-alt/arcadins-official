/**
 * Runtime — Credential Crypto : provider de clés ÉPHÉMÈRES en mémoire (SERVER-ONLY, Sprint K4C-A, §6).
 *
 * Génère des paires Ed25519 via `node:crypto` au démarrage/rotation. La clé privée (`KeyObject`) reste dans la
 * CLÔTURE : jamais retournée, jamais sérialisée, jamais loggée, jamais dans un snapshot/enveloppe/ViewModel/audit.
 * La signature est effectuée PAR le provider. `.server.ts` : ne doit jamais être importé par un composant client.
 */
import { generateKeyPairSync, sign as cryptoSign, createHash, type KeyObject } from "node:crypto";
import type {
  CredentialCryptoAlgorithm, CredentialKeyReference, KeyMetadata, KeyStatus, PublicVerificationKey, SigningKeyHandle,
} from "./crypto-types.ts";
import type { CredentialKeyProvider, KeyRevocationRequest, KeyRotationRequest } from "./credential-key-provider.ts";
import type { KeyRevocationRecord, KeyRotationRecord } from "./crypto-types.ts";

interface KeyEntry {
  privateKey: KeyObject; // MATIÈRE PRIVÉE — reste dans cette clôture, jamais exposée
  meta: KeyMetadata;
  publicKeySpkiBase64: string;
  fingerprint: string;
}

export interface EphemeralKeyProviderContext {
  now: () => Date;
  ids: { keyReference: () => string; rotationId: () => string; revocationId: () => string };
}

const SIGNABLE_STATUSES: KeyStatus[] = ["active", "retiring"];

export function createInMemoryEphemeralKeyProvider(ctx: EphemeralKeyProviderContext, opts: { issuerCode?: string; generateInitial?: boolean } = {}): CredentialKeyProvider {
  const keys = new Map<CredentialKeyReference, KeyEntry>();
  const activeByIssuer = new Map<string, CredentialKeyReference>();
  const processed = new Map<string, string>(); // commandId → resultId (idempotence)
  const rotationLog = new Map<string, KeyRotationRecord>();
  const revocationLog = new Map<string, KeyRevocationRecord>();

  const fingerprintOf = (spkiB64: string) => createHash("sha256").update(spkiB64).digest("hex").slice(0, 32);

  function generate(issuerCode: string, algorithm: CredentialCryptoAlgorithm): KeyEntry {
    // Ed25519 uniquement en K4C-A (algorithme validé par la policy en amont).
    const { publicKey, privateKey } = generateKeyPairSync("ed25519");
    const spkiB64 = publicKey.export({ type: "spki", format: "der" }).toString("base64");
    const at = ctx.now().toISOString();
    const keyReference = ctx.ids.keyReference();
    const meta: KeyMetadata = { keyReference, issuerCode, algorithm, status: "active", createdAt: at, activatedAt: at, retiredAt: null, revokedAt: null, fingerprint: fingerprintOf(spkiB64), version: 1 };
    const entry: KeyEntry = { privateKey, meta, publicKeySpkiBase64: spkiB64, fingerprint: meta.fingerprint };
    keys.set(keyReference, entry);
    activeByIssuer.set(issuerCode, keyReference);
    return entry;
  }

  if (opts.generateInitial) generate(opts.issuerCode ?? "ARCADINS-PENDING", "Ed25519");

  const toPublic = (e: KeyEntry): PublicVerificationKey => ({
    keyReference: e.meta.keyReference, issuerCode: e.meta.issuerCode, algorithm: e.meta.algorithm,
    publicKeySpkiBase64: e.publicKeySpkiBase64, publicKeyFingerprint: e.fingerprint, status: e.meta.status,
    createdAt: e.meta.createdAt, retiredAt: e.meta.retiredAt, revokedAt: e.meta.revokedAt,
  });

  return {
    getActiveSigningKey({ issuerCode }): SigningKeyHandle | null {
      const ref = activeByIssuer.get(issuerCode);
      const e = ref ? keys.get(ref) : undefined;
      if (!e || e.meta.status !== "active") return null;
      return { keyReference: e.meta.keyReference, algorithm: e.meta.algorithm, createdAt: e.meta.createdAt, issuerCode };
    },
    getPublicVerificationKey: (ref) => { const e = keys.get(ref); return e ? toPublic(e) : null; },
    listVerificationKeys: (issuer) => [...keys.values()].filter((e) => e.meta.issuerCode === issuer).map(toPublic),
    getKeyStatus: (ref) => keys.get(ref)?.meta.status ?? null,
    getAlgorithm: (ref) => keys.get(ref)?.meta.algorithm ?? null,
    getKeyMetadata: (ref) => { const m = keys.get(ref)?.meta; return m ? { ...m } : null; },
    sign(ref, data) {
      const e = keys.get(ref);
      if (!e || !SIGNABLE_STATUSES.includes(e.meta.status) || data.length === 0) return null;
      // Signature Ed25519 : la clé privée ne quitte JAMAIS cette clôture.
      return cryptoSign(null, Buffer.from(data, "utf8"), e.privateKey).toString("base64");
    },
    rotateKey(request: KeyRotationRequest) {
      const enabled = request.enabled ?? false; // fail-closed
      if (!enabled) return { ok: false as const, reasonCode: "feature_disabled" };
      const existing = processed.get(request.commandId);
      if (existing) { const rec = rotationLog.get(existing)!; return { ok: true as const, record: rec }; }
      const prevRef = activeByIssuer.get(request.issuerCode) ?? null;
      if (prevRef) { const pe = keys.get(prevRef); if (pe) { pe.meta.status = "retired"; pe.meta.retiredAt = ctx.now().toISOString(); } }
      const entry = generate(request.issuerCode, request.algorithm);
      const rotationId = ctx.ids.rotationId();
      const record = { rotationId, issuerCode: request.issuerCode, algorithm: request.algorithm, previousKeyReference: prevRef, newKeyReference: entry.meta.keyReference, at: ctx.now().toISOString() };
      rotationLog.set(rotationId, record);
      processed.set(request.commandId, rotationId);
      return { ok: true as const, record };
    },
    revokeKey(request: KeyRevocationRequest) {
      const enabled = request.enabled ?? false; // fail-closed
      if (!enabled) return { ok: false as const, reasonCode: "feature_disabled" };
      const existing = processed.get(request.commandId);
      if (existing) { const rec = revocationLog.get(existing)!; return { ok: true as const, record: rec }; }
      const e = keys.get(request.keyReference);
      if (!e) return { ok: false as const, reasonCode: "unknown_key_reference" };
      const compromised = request.reason === "compromised";
      e.meta.status = compromised ? "compromised" : "revoked";
      e.meta.revokedAt = ctx.now().toISOString();
      if (activeByIssuer.get(e.meta.issuerCode) === request.keyReference) activeByIssuer.delete(e.meta.issuerCode);
      const revocationId = ctx.ids.revocationId();
      const record = { revocationId, keyReference: request.keyReference, publicReasonCode: request.publicReasonCode, internalReasonCode: request.internalReasonCode, compromised, at: ctx.now().toISOString() };
      revocationLog.set(revocationId, record);
      processed.set(request.commandId, revocationId);
      return { ok: true as const, record };
    },
  };
}
