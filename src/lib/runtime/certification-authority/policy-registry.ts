/**
 * Runtime — Certification Authority : registre de politiques PUR et déterministe (Sprint K4A, §10).
 *
 * Politiques VERSIONNÉES. Une politique modifiée ne modifie JAMAIS rétroactivement un credential déjà autorisé
 * (les versions sont figées dans l'autorisation). Aucune clé secrète.
 */
import type { CredentialType } from "./authority-types.ts";

export interface CertificationPolicy {
  issuerCode: string;
  credentialType: CredentialType;
  programReference: string; // "*" = tous les programmes
  curriculumVersion: string; // "*" = toutes versions
  showPublicScore: boolean;
  validityDays: number | null; // null = sans expiration
  allowReplacement: boolean;
  allowRevocation: boolean;
  allowRetake: boolean;
  allowAppeal: boolean;
  locales: string[];
  publicMentionsKey: string; // clé i18n de mention publique
  version: number;
}

export interface PolicyQuery {
  issuerCode: string;
  credentialType: CredentialType;
  programReference: string;
  curriculumVersion: string;
}

export class CertificationPolicyRegistry {
  private readonly policies: CertificationPolicy[];
  constructor(policies: CertificationPolicy[] = []) {
    this.policies = [...policies];
  }
  register(policy: CertificationPolicy): void {
    this.policies.push(policy);
  }
  all(): CertificationPolicy[] {
    return [...this.policies];
  }
  hasIssuer(issuerCode: string): boolean {
    return this.policies.some((p) => p.issuerCode === issuerCode);
  }
  hasCredentialType(issuerCode: string, credentialType: CredentialType): boolean {
    return this.policies.some((p) => p.issuerCode === issuerCode && p.credentialType === credentialType);
  }
  /** Résolution déterministe : correspondance exacte prioritaire, puis jokers "*". */
  resolve(q: PolicyQuery): CertificationPolicy | null {
    const matches = this.policies.filter(
      (p) => p.issuerCode === q.issuerCode && p.credentialType === q.credentialType &&
        (p.programReference === q.programReference || p.programReference === "*") &&
        (p.curriculumVersion === q.curriculumVersion || p.curriculumVersion === "*"),
    );
    if (matches.length === 0) return null;
    // Spécificité décroissante (moins de jokers d'abord), puis version décroissante — déterministe.
    matches.sort((a, b) => {
      const wa = (a.programReference === "*" ? 1 : 0) + (a.curriculumVersion === "*" ? 1 : 0);
      const wb = (b.programReference === "*" ? 1 : 0) + (b.curriculumVersion === "*" ? 1 : 0);
      return wa !== wb ? wa - wb : b.version - a.version;
    });
    return matches[0];
  }
}

/** Politique de DÉMONSTRATION (K4A) — aucune reconnaissance officielle inventée, émetteur « en attente ». */
export function defaultPolicyRegistry(): CertificationPolicyRegistry {
  return new CertificationPolicyRegistry([
    {
      issuerCode: "ARCADINS-PENDING",
      credentialType: "completion_certificate",
      programReference: "*",
      curriculumVersion: "*",
      showPublicScore: false,
      validityDays: null,
      allowReplacement: true,
      allowRevocation: true,
      allowRetake: true,
      allowAppeal: true,
      locales: ["fr", "en"],
      publicMentionsKey: "certification.mention.attestation_de_reussite",
      version: 1,
    },
  ]);
}
