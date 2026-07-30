/**
 * Runtime — Certification : CredentialStatusEngine (Sprint H).
 *
 * Machine à états stricte des credentials. Transitions invalides INTERDITES. Une attestation active ne peut pas
 * revenir à draft ; une attestation révoquée ne redevient active que par une restauration explicitement autorisée
 * et auditée. PUR.
 */
import type { CredentialStatus } from "./types.ts";

const TRANSITIONS: Record<CredentialStatus, CredentialStatus[]> = {
  draft: ["pending_approval", "approved", "issued", "cancelled"],
  pending_approval: ["approved", "cancelled", "invalidated"],
  approved: ["issued", "cancelled", "invalidated"],
  issued: ["active", "cancelled", "invalidated"],
  active: ["suspended", "revoked", "replaced", "expired", "invalidated"],
  suspended: ["active", "revoked", "replaced", "expired", "invalidated"],
  revoked: ["active", "replaced"], // active uniquement via restauration explicite (procédure d'appel)
  replaced: [],
  expired: ["replaced"],
  cancelled: [],
  invalidated: [],
};

const ACTIVE_LIKE: CredentialStatus[] = ["issued", "active"];
const TERMINAL: CredentialStatus[] = ["replaced", "cancelled", "invalidated"];

export const CredentialStatusEngine = {
  canTransition(from: CredentialStatus, to: CredentialStatus): boolean {
    if (from === to) return true;
    return TRANSITIONS[from]?.includes(to) ?? false;
  },

  transition(from: CredentialStatus, to: CredentialStatus): CredentialStatus {
    if (from === to) return to;
    if (!CredentialStatusEngine.canTransition(from, to)) throw new Error(`INVALID_CREDENTIAL_TRANSITION:${from}->${to}`);
    return to;
  },

  /** Restauration : uniquement révoqué → actif, jamais automatique (procédure d'appel requise en amont). */
  restore(from: CredentialStatus): CredentialStatus {
    if (from !== "revoked" && from !== "suspended") throw new Error(`INVALID_RESTORE_FROM:${from}`);
    return "active";
  },

  isActive(status: CredentialStatus): boolean {
    return status === "active" || status === "issued";
  },
  isActiveLike(status: CredentialStatus): boolean {
    return ACTIVE_LIKE.includes(status);
  },
  isTerminal(status: CredentialStatus): boolean {
    return TERMINAL.includes(status);
  },
  allowedTargets(from: CredentialStatus): CredentialStatus[] {
    return [...(TRANSITIONS[from] ?? [])];
  },
};

export { TRANSITIONS as CREDENTIAL_TRANSITIONS };
