/**
 * Runtime — Credential Crypto : CredentialSignatureService (SERVER-ONLY, Sprint K4C-A, §10).
 *
 * Vérifie une signature asymétrique avec la clé PUBLIQUE (aucune matière privée). `.server.ts` : jamais importé
 * par un composant client. La vérification échoue à la moindre altération (payload/digest/signature/clé).
 */
import { verify as cryptoVerify, createPublicKey } from "node:crypto";
import type { CredentialKeyProvider } from "./credential-key-provider.ts";
import { validateSignatureEnvelope, SIGNATURE_ENVELOPE_VERSION, type SignatureEnvelopeV2 } from "./signature-envelope-v2.ts";

export const CredentialSignatureService = {
  /** Valide la structure d'une enveloppe (aucune matière privée, champs requis). */
  validateSignatureEnvelope,

  /** Résout la clé publique liée au keyReference de l'enveloppe. */
  resolveVerificationKey(envelope: SignatureEnvelopeV2, keyProvider: CredentialKeyProvider) {
    return keyProvider.getPublicVerificationKey(envelope.keyReference);
  },

  /** Vérifie cryptographiquement une signature détachée sur un digest. */
  verifyDetachedPayload(payloadDigest: string, envelope: SignatureEnvelopeV2, keyProvider: CredentialKeyProvider): boolean {
    const validation = validateSignatureEnvelope(envelope);
    if (!validation.ok) return false;
    if (envelope.signatureVersion !== SIGNATURE_ENVELOPE_VERSION) return false;
    if (envelope.payloadDigest !== payloadDigest) return false;
    const pub = keyProvider.getPublicVerificationKey(envelope.keyReference);
    if (!pub) return false;
    try {
      const publicKey = createPublicKey({ key: Buffer.from(pub.publicKeySpkiBase64, "base64"), format: "der", type: "spki" });
      return cryptoVerify(null, Buffer.from(payloadDigest, "utf8"), publicKey, Buffer.from(envelope.signatureValue, "base64"));
    } catch {
      return false;
    }
  },
};
