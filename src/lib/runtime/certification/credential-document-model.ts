/**
 * Runtime — Certification : CredentialDocumentModel (Sprint H).
 *
 * Modèle ABSTRAIT de document (préparation à une future génération PDF — AUCUN PDF ni image QR produits ici).
 * Ne contient que des données publiques + clés i18n. Support d'accessibilité prévu (texte sélectionnable, ordre
 * de lecture logique, identifiant lisible manuellement, descriptions alternatives).
 */
import type {
  CredentialDocumentModel,
  CredentialLanguage,
  CredentialPrivateRecord,
  QRVerificationPayload,
} from "./types.ts";
import { CANONICAL_LANGUAGE } from "./types.ts";
import { SUPPORTED_LANGUAGES } from "./config.ts";
import { CredentialIdGenerator } from "./credential-id-generator.ts";

export const CredentialDocumentModelBuilder = {
  build(record: CredentialPrivateRecord, qrPayload: QRVerificationPayload, languageOrder: CredentialLanguage[] = SUPPORTED_LANGUAGES): CredentialDocumentModel {
    const snap = record.currentVersion.snapshot;
    return {
      header: { issuerName: snap.issuerName, brandingVersion: snap.brandingVersion, templateVersion: snap.templateVersion },
      issuer: { name: snap.issuerName, displayName: snap.issuerName, signatoryReferences: [...snap.authorizedSignatoryReferences] },
      title: { key: "credential.title.achievement_attestation", text: snap.documentTitle },
      recipient: { displayName: snap.learnerDisplayName },
      program: { title: snap.programTitle, programId: snap.programId, version: snap.programVersion },
      completion: { date: snap.completionDate, finalScore: snap.finalScore },
      competencies: snap.competencies.map((c) => ({ competencyCode: c.competencyCode, labelKey: c.labelKey, achieved: c.achieved })),
      distinction: { present: false, labelKey: null },
      issuance: { documentNumber: snap.documentNumber, issuedAt: snap.issuedAt, version: record.currentVersion.version },
      signatures: snap.authorizedSignatoryReferences.map((reference) => ({ reference })),
      verification: {
        publicVerificationId: record.publicVerificationId,
        statementKey: "credential.verification.statement",
        humanReadableId: CredentialIdGenerator.humanReadableId(record.publicVerificationId),
      },
      qrPayload,
      legalNotices: [...snap.legalNoticeKeys],
      footer: { languageOrder, canonicalLanguage: CANONICAL_LANGUAGE },
      versionMetadata: { policyVersion: snap.credentialPolicyVersion, templateVersion: snap.templateVersion, brandingVersion: snap.brandingVersion, language: snap.language },
      accessibility: {
        selectableText: true,
        logicalReadingOrder: true,
        humanReadableId: CredentialIdGenerator.humanReadableId(record.publicVerificationId),
        altTextKeys: ["credential.alt.logo", "credential.alt.qr", "credential.alt.signature"],
      },
    };
  },
};
