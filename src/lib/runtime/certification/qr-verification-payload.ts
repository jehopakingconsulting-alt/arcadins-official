/**
 * Runtime — Certification : QRVerificationPayloadBuilder (Sprint H).
 *
 * Construit un CONTRAT logique de QR code (aucune image générée). Le payload pointe uniquement vers un identifiant
 * de vérification OPAQUE : ni donnée personnelle, ni score, ni identifiant interne, ni secret, ni signature privée.
 */
import type { HashProvider, QRVerificationPayload } from "./types.ts";

export const QR_PAYLOAD_VERSION = 1;

export const QRVerificationPayloadBuilder = {
  build(opts: {
    verificationUrlBase: string;
    publicVerificationId: string;
    documentNumber?: string;
    issuerCode: string;
    hashProvider: HashProvider;
  }): QRVerificationPayload {
    const checksum = opts.hashProvider.hash(`qr:${opts.publicVerificationId}:${opts.documentNumber ?? ""}`).slice(0, 8);
    return {
      version: QR_PAYLOAD_VERSION,
      verificationUrlBase: opts.verificationUrlBase,
      publicVerificationId: opts.publicVerificationId,
      documentNumber: opts.documentNumber,
      checksum,
      issuerCode: opts.issuerCode,
    };
  },

  /** URL logique de vérification (le client construira l'image ; ici seul le contrat compte). */
  toUrl(payload: QRVerificationPayload): string {
    const base = payload.verificationUrlBase.replace(/\/+$/, "");
    return `${base}/${payload.publicVerificationId}?v=${payload.version}&k=${payload.checksum}`;
  },

  /** Vérifie la cohérence du checksum court d'un payload QR. */
  verifyChecksum(payload: QRVerificationPayload, hashProvider: HashProvider): boolean {
    const expected = hashProvider.hash(`qr:${payload.publicVerificationId}:${payload.documentNumber ?? ""}`).slice(0, 8);
    return expected === payload.checksum;
  },
};
