/**
 * Runtime — Certification : configuration & déterminisme (Sprint H).
 *
 * Flag INDÉPENDANT désactivé par défaut. Politiques par défaut agnostiques du programme, PRNG et fabrique d'ids
 * déterministes injectables, contexte d'exécution. Aucune clé réelle, aucune reconnaissance officielle inventée.
 */
import type {
  CredentialLanguage,
  CredentialPolicy,
  HashProvider,
  SignerProvider,
} from "./types.ts";
import { createRng as createAssessmentRng, createIdFactory as createAssessmentIdFactory } from "../assessment/config.ts";

/** Le moteur de certification reste désactivé tant que l'UI / le serveur / la signature réelle ne sont pas prêts. */
export const CERTIFICATION_ENGINE_ENABLED = false;

/** Intitulé par défaut du document (aucune reconnaissance externe supposée). */
export const DEFAULT_DOCUMENT_TITLE = "ATTESTATION DE RÉUSSITE ARCADINS";

/** Expressions strictement interdites (aucune reconnaissance officielle inventée). */
export const FORBIDDEN_RECOGNITION_CLAIMS = [
  "diplôme reconnu par le gouvernement",
  "diplôme d'état",
  "diplôme ministériel",
  "certification gouvernementale",
  "accréditation officielle",
  "équivalence universitaire",
  "reconnaissance professionnelle garantie",
] as const;

export const SUPPORTED_LANGUAGES: CredentialLanguage[] = ["fr", "en", "es", "it", "pt", "de", "ht"];

/** Politique par défaut : seule `achievement_attestation` est activable ultérieurement. */
export function defaultAchievementAttestationPolicy(programId: string, overrides: Partial<CredentialPolicy> = {}): CredentialPolicy {
  return {
    credentialType: "achievement_attestation",
    programId,
    publicTitleKey: "credential.title.achievement_attestation",
    descriptionKey: "credential.description.achievement_attestation",
    issuanceConditions: {
      requireFinalExamPassed: true,
      requireFinalProjectValidated: false,
      requireFullProgress: false,
      minimumFinalScorePercent: null,
      requiredCompetencyCodes: [],
    },
    allowedPublicFields: [
      "publicVerificationId",
      "documentNumber",
      "credentialType",
      "documentTitle",
      "learnerDisplayName",
      "programTitle",
      "issuedAt",
      "completionDate",
      "status",
      "issuerDisplayName",
      "competencies",
      "version",
      "verificationStatement",
      "replacementReference",
    ],
    disclosesFinalScore: false,
    expiration: { kind: "never" },
    replacement: { allowed: true, supersedePrevious: true },
    revocation: { allowed: true, publicReasonAllowed: ["revoked_by_issuer", "superseded", "academic_review", "technical_reissue"] },
    associatedBadgeDefinitionIds: [],
    institutionalSignatureKeyId: "arc-signing-key-v1",
    languages: SUPPORTED_LANGUAGES,
    templateVersion: 1,
    brandingVersion: 1,
    legalNoticeKeys: ["credential.legal.internal_attestation_notice"],
    version: 1,
    activatedAt: null,
    retiredAt: null,
    activatable: true,
    ...overrides,
  };
}

/** PRNG déterministe (réutilise le mulberry32 partagé). */
export function createRng(seed: number): () => number {
  return createAssessmentRng(seed);
}

/** Fabrique d'identifiants déterministe (préfixe + compteur), injectable. */
export function createIdFactory(prefix = "cred", start = 0): () => string {
  return createAssessmentIdFactory(prefix, start);
}

export interface CertificationContext {
  now: Date; // horloge INJECTÉE — seule autorité temporelle
  seed: number; // graine déterministe INJECTÉE
  idFactory: () => string; // fabrique d'ids INJECTÉE
  hashProvider: HashProvider; // haché déterministe INJECTÉ
  signer: SignerProvider; // signature INJECTÉE (aucune clé réelle en dur)
  verificationUrlBase: string; // base d'URL de vérification INJECTÉE
  issuerCode: string;
}

export function createCertificationContext(opts: {
  now: Date;
  hashProvider: HashProvider;
  signer: SignerProvider;
  seed?: number;
  idFactory?: () => string;
  verificationUrlBase?: string;
  issuerCode?: string;
}): CertificationContext {
  return {
    now: opts.now,
    seed: opts.seed ?? 1,
    idFactory: opts.idFactory ?? createIdFactory("cred"),
    hashProvider: opts.hashProvider,
    signer: opts.signer,
    verificationUrlBase: opts.verificationUrlBase ?? "https://verify.arcadins.example/c",
    issuerCode: opts.issuerCode ?? "ARC",
  };
}
