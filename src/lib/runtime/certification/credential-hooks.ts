/**
 * Runtime — Certification : hooks de cycle de vie (Sprint H).
 *
 * ⚠️ Pas des hooks React. Bus d'abonnement PUR, agnostique, implémentations no-op sûres par défaut.
 */
export type CredentialHookName =
  | "beforeEligibilityCheck"
  | "afterEligibilityCheck"
  | "beforeIssuance"
  | "afterIssuance"
  | "beforeSigning"
  | "afterSigning"
  | "beforeActivation"
  | "afterActivation"
  | "beforeVerification"
  | "afterVerification"
  | "beforeSuspension"
  | "afterSuspension"
  | "beforeRevocation"
  | "afterRevocation"
  | "beforeReplacement"
  | "afterReplacement"
  | "beforeBadgeIssuance"
  | "afterBadgeIssuance"
  | "onIntegrityFailure"
  | "onAppealRequested";

type AnyHandler = (payload: unknown) => void;

export interface CredentialHooks {
  on(name: CredentialHookName, handler: AnyHandler): () => void;
  off(name: CredentialHookName, handler: AnyHandler): void;
  emit(name: CredentialHookName, payload?: unknown): void;
}

export function createCredentialHooks(): CredentialHooks {
  const handlers = new Map<CredentialHookName, Set<AnyHandler>>();
  const hooks: CredentialHooks = {
    on(name, handler) {
      const set = handlers.get(name) ?? new Set();
      set.add(handler);
      handlers.set(name, set);
      return () => hooks.off(name, handler);
    },
    off(name, handler) {
      handlers.get(name)?.delete(handler);
    },
    emit(name, payload) {
      handlers.get(name)?.forEach((h) => h(payload));
    },
  };
  return hooks;
}

export const NOOP_CREDENTIAL_HOOKS: Readonly<Record<CredentialHookName, AnyHandler>> = Object.freeze({
  beforeEligibilityCheck: () => {},
  afterEligibilityCheck: () => {},
  beforeIssuance: () => {},
  afterIssuance: () => {},
  beforeSigning: () => {},
  afterSigning: () => {},
  beforeActivation: () => {},
  afterActivation: () => {},
  beforeVerification: () => {},
  afterVerification: () => {},
  beforeSuspension: () => {},
  afterSuspension: () => {},
  beforeRevocation: () => {},
  afterRevocation: () => {},
  beforeReplacement: () => {},
  afterReplacement: () => {},
  beforeBadgeIssuance: () => {},
  afterBadgeIssuance: () => {},
  onIntegrityFailure: () => {},
  onAppealRequested: () => {},
});
