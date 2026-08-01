/**
 * Runtime — Certification : VerificationEngine (Sprint H).
 *
 * Vérifie logiquement un document par identifiant public / numéro / QR / hash / signature. Ne révèle QUE le
 * minimum nécessaire (aucune donnée privée). Le navigateur ne décide jamais de la validité : la décision est ici.
 */
import type {
  CredentialPrivateRecord,
  CredentialVerificationRequest,
  CredentialVerificationResult,
  HashProvider,
  SignerProvider,
} from "./types.ts";
import type { CredentialRepository } from "./repository-contracts.ts";
import { CredentialIntegrityEngine } from "./credential-integrity-engine.ts";
import { QRVerificationPayloadBuilder, QR_PAYLOAD_VERSION } from "./qr-verification-payload.ts";

function resolve(repo: CredentialRepository, req: CredentialVerificationRequest): CredentialPrivateRecord | undefined {
  if (req.publicVerificationId) return repo.getByPublicId(req.publicVerificationId);
  if (req.documentNumber) return repo.getByDocumentNumber(req.documentNumber);
  if (req.qrPayload) return repo.getByPublicId(req.qrPayload.publicVerificationId);
  return undefined;
}

function minimal(record: CredentialPrivateRecord | null, status: CredentialVerificationResult["status"], reasonCodes: string[], at: string): CredentialVerificationResult {
  const snap = record?.currentVersion.snapshot ?? null;
  return {
    status,
    documentTitle: snap?.documentTitle ?? null,
    learnerDisplayName: snap?.learnerDisplayName ?? null,
    programTitle: snap?.programTitle ?? null,
    issuedAt: snap?.issuedAt ?? null,
    issuerDisplayName: snap?.issuerName ?? null,
    replacementReference: record?.replacedByPublicId ?? null,
    verificationStatementKey: "credential.verification.statement",
    reasonCodes,
    checkedAt: at,
  };
}

export const VerificationEngine = {
  verify(
    req: CredentialVerificationRequest,
    repo: CredentialRepository,
    hashProvider: HashProvider,
    verifier: Pick<SignerProvider, "verify">,
    now: Date,
  ): CredentialVerificationResult {
    const at = now.toISOString();

    // Version de QR non supportée.
    if (req.method === "qr" && req.qrPayload) {
      if (req.supportedVersion !== undefined && req.qrPayload.version > req.supportedVersion) return minimal(null, "unsupported_version", ["QR_VERSION_UNSUPPORTED"], at);
      if (req.qrPayload.version > QR_PAYLOAD_VERSION) return minimal(null, "unsupported_version", ["QR_VERSION_UNSUPPORTED"], at);
    }

    const record = resolve(repo, req);
    if (!record) return minimal(null, "not_found", ["CREDENTIAL_NOT_FOUND"], at);

    // Vérification du checksum QR (cohérence non-privée).
    if (req.method === "qr" && req.qrPayload && !QRVerificationPayloadBuilder.verifyChecksum(req.qrPayload, hashProvider)) {
      return minimal(record, "tampered", ["QR_CHECKSUM_MISMATCH"], at);
    }

    // Intégrité cryptographique (méthodes hash/signature ou contrôle systématique).
    const integrity = CredentialIntegrityEngine.verify(record.currentVersion.snapshot, record.currentVersion.integrity, hashProvider, verifier);
    if (!integrity.ok) return minimal(record, "tampered", integrity.tampered ? ["CONTENT_TAMPERED"] : ["SIGNATURE_INVALID"], at);
    if (req.method === "hash" && req.hash && req.hash !== record.currentVersion.integrity.contentHash.value) return minimal(record, "tampered", ["HASH_MISMATCH"], at);
    if (req.method === "signature" && req.signature && !verifier.verify(CredentialIntegrityEngine.canonicalize(record.currentVersion.snapshot), req.signature)) return minimal(record, "tampered", ["SIGNATURE_MISMATCH"], at);

    // Statut.
    switch (record.status) {
      case "revoked":
        return minimal(record, "revoked", ["CREDENTIAL_REVOKED", record.revocation?.publicReasonCode ?? "revoked_by_issuer"], at);
      case "suspended":
        return minimal(record, "suspended", ["CREDENTIAL_SUSPENDED"], at);
      case "replaced":
        return minimal(record, "replaced", ["CREDENTIAL_REPLACED"], at);
      case "expired":
        return minimal(record, "expired", ["CREDENTIAL_EXPIRED"], at);
      case "active":
      case "issued": {
        if (record.expiresAt && now.getTime() > new Date(record.expiresAt).getTime()) return minimal(record, "expired", ["CREDENTIAL_EXPIRED"], at);
        return minimal(record, "valid", ["VALID"], at);
      }
      case "draft":
      case "pending_approval":
      case "approved":
        return minimal(record, "requires_manual_verification", ["NOT_YET_ISSUED"], at);
      default:
        return minimal(record, "invalid", ["INVALID_STATE"], at);
    }
  },
};
