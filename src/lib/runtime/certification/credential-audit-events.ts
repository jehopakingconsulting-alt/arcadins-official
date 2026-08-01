/**
 * Runtime — Certification : CredentialAuditLog & événements immuables (Sprint H).
 *
 * Événements gelés (immuables). Aucune donnée personnelle sensible, aucun secret, aucune réponse d'examen.
 */
import type { CredentialAuditEvent, CredentialAuditEventType } from "./types.ts";

function make(type: CredentialAuditEventType, at: string, payload: Record<string, unknown> = {}): CredentialAuditEvent {
  return Object.freeze({ type, at, payload: Object.freeze({ ...payload }) }) as CredentialAuditEvent;
}

export const CredentialAuditEvents = {
  eligibilityChecked: (at: string, status: string, reasonCodes: string[]) => make("credential.eligibility_checked", at, { status, reasonCodes }),
  issuanceRequested: (at: string, commandId: string, issuanceKey: string) => make("credential.issuance_requested", at, { commandId, issuanceKey }),
  issuanceBlocked: (at: string, reasonCodes: string[]) => make("credential.issuance_blocked", at, { reasonCodes }),
  approvalRequested: (at: string, publicId: string) => make("credential.approval_requested", at, { publicId }),
  approved: (at: string, publicId: string) => make("credential.approved", at, { publicId }),
  snapshotCreated: (at: string, verificationId: string) => make("credential.snapshot_created", at, { verificationId }),
  integrityHashCreated: (at: string, algorithm: string) => make("credential.integrity_hash_created", at, { algorithm }),
  signatureCreated: (at: string, keyId: string) => make("credential.signature_created", at, { keyId }),
  issued: (at: string, publicId: string, documentNumber: string) => make("credential.issued", at, { publicId, documentNumber }),
  activated: (at: string, publicId: string) => make("credential.activated", at, { publicId }),
  verified: (at: string, publicId: string, status: string) => make("credential.verified", at, { publicId, status }),
  verificationFailed: (at: string, status: string, reasonCodes: string[]) => make("credential.verification_failed", at, { status, reasonCodes }),
  suspended: (at: string, publicId: string, reasonCode: string) => make("credential.suspended", at, { publicId, reasonCode }),
  revoked: (at: string, publicId: string, publicReasonCode: string) => make("credential.revoked", at, { publicId, publicReasonCode }),
  replacementRequested: (at: string, publicId: string, reason: string) => make("credential.replacement_requested", at, { publicId, reason }),
  replaced: (at: string, previousPublicId: string, newPublicId: string) => make("credential.replaced", at, { previousPublicId, newPublicId }),
  expired: (at: string, publicId: string) => make("credential.expired", at, { publicId }),
  cancelled: (at: string, publicId: string) => make("credential.cancelled", at, { publicId }),
  appealRequested: (at: string, publicId: string, appealId: string) => make("credential.appeal_requested", at, { publicId, appealId }),
  appealReviewed: (at: string, appealId: string, status: string) => make("credential.appeal_reviewed", at, { appealId, status }),
  restored: (at: string, publicId: string) => make("credential.restored", at, { publicId }),
  badgeIssued: (at: string, badgePublicId: string, kind: string) => make("badge.issued", at, { badgePublicId, kind }),
  badgeRevoked: (at: string, badgePublicId: string) => make("badge.revoked", at, { badgePublicId }),
};

/** Journal d'audit append-only en mémoire (aucune I/O). */
export class CredentialAuditLog {
  private events: CredentialAuditEvent[] = [];
  append(...events: CredentialAuditEvent[]): void {
    for (const e of events) this.events.push(e);
  }
  all(): CredentialAuditEvent[] {
    return [...this.events];
  }
  reference(): string {
    const last = this.events[this.events.length - 1];
    return `credaudit:${this.events.length}:${last?.at ?? "empty"}`;
  }
}
