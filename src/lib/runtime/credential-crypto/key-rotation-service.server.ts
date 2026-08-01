/**
 * Runtime — Credential Crypto : CredentialKeyRotationService (SERVER-ONLY, §12). Une seule clé active par
 * issuer ; ancienne clé → retired ; credentials historiques toujours vérifiables ; aucune ré-signature
 * silencieuse. Idempotent (le provider gère la clé de commande). Horloge injectée. Fail-closed.
 */
import { KEY_ROTATION_ENABLED } from "./crypto-flags.ts";
import type { CredentialKeyProvider, KeyRotationRequest } from "./credential-key-provider.ts";
import type { KeyRotationRecord } from "./crypto-types.ts";
import type { CryptoRepositories } from "./crypto-repositories.ts";
import { makeCryptoAudit } from "./crypto-audit.ts";

export type RotationOutcome = { ok: true; record: KeyRotationRecord } | { ok: false; reasonCode: string };

export const CredentialKeyRotationService = {
  rotate(keyProvider: CredentialKeyProvider, request: KeyRotationRequest, deps: { repos: CryptoRepositories; now: () => Date; eventId: () => string }): RotationOutcome {
    const enabled = request.enabled ?? KEY_ROTATION_ENABLED;
    const at = deps.now().toISOString();
    deps.repos.audit.append(makeCryptoAudit({ eventId: deps.eventId(), at, operation: "KEY_ROTATION_REQUESTED", result: enabled ? "ok" : "denied", reasonCode: enabled ? "ok" : "feature_disabled", keyReference: request.issuerCode }));
    if (!enabled) return { ok: false, reasonCode: "feature_disabled" };
    const res = keyProvider.rotateKey({ ...request, enabled: true });
    if (!res.ok) return res;
    deps.repos.rotations.save(res.record);
    deps.repos.audit.append(makeCryptoAudit({ eventId: deps.eventId(), at, operation: "KEY_ROTATED", result: "ok", reasonCode: "rotated", keyReference: res.record.newKeyReference }));
    if (res.record.previousKeyReference) deps.repos.audit.append(makeCryptoAudit({ eventId: deps.eventId(), at, operation: "KEY_RETIREMENT_COMPLETED", result: "ok", reasonCode: "retired", keyReference: res.record.previousKeyReference }));
    return res;
  },
};
