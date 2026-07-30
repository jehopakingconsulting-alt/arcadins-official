/**
 * Runtime — Certification : CredentialPolicyRegistry (Sprint H).
 *
 * Registre en mémoire des politiques de credential VERSIONNÉES (aucune I/O). Une émission fige la version exacte ;
 * une modification future ne change jamais un document déjà émis. Par défaut seul `achievement_attestation` est
 * activable ; les autres types restent non activables tant qu'ils ne sont pas explicitement autorisés.
 */
import type { CredentialPolicy, CredentialType } from "./types.ts";

function key(programId: string, type: CredentialType, version: number): string {
  return `${programId}::${type}::${version}`;
}

export class CredentialPolicyRegistry {
  private policies: Map<string, CredentialPolicy> = new Map();

  register(policy: CredentialPolicy): void {
    this.policies.set(key(policy.programId, policy.credentialType, policy.version), structuredClone(policy));
  }

  get(programId: string, type: CredentialType, version: number): CredentialPolicy | undefined {
    const p = this.policies.get(key(programId, type, version));
    return p ? structuredClone(p) : undefined;
  }

  /** Politique active la plus récente pour un (programme, type) à la date `at`, activable uniquement. */
  resolveActive(programId: string, type: CredentialType, at: Date): CredentialPolicy | undefined {
    const atMs = at.getTime();
    const candidates = [...this.policies.values()].filter((p) => {
      if (p.programId !== programId || p.credentialType !== type) return false;
      if (!p.activatable) return false;
      if (p.activatedAt && new Date(p.activatedAt).getTime() > atMs) return false;
      if (p.retiredAt && new Date(p.retiredAt).getTime() <= atMs) return false;
      return true;
    });
    if (candidates.length === 0) return undefined;
    return structuredClone(candidates.reduce((a, b) => (b.version > a.version ? b : a)));
  }

  all(): CredentialPolicy[] {
    return [...this.policies.values()].map((p) => structuredClone(p));
  }
}
