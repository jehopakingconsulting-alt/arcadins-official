/**
 * Runtime — Credential Crypto : CredentialKeyRevocationService (SERVER-ONLY, §13). Sépare raison publique /
 * interne. Une révocation de clé ne supprime ni ne modifie les credentials historiques. Idempotent. Fail-closed.
 */
import { KEY_REVOCATION_ENABLED } from "./crypto-flags.ts";
import type { CredentialKeyProvider, KeyRevocationRequest } from "./credential-key-provider.ts";
import type { KeyRevocationRecord } from "./crypto-types.ts";
import type { CryptoRepositories } from "./crypto-repositories.ts";
import { makeCryptoAudit } from "./crypto-audit.ts";

export type KeyRevocationOutcome = { ok: true; record: KeyRevocationRecord } | { ok: false; reasonCode: string };

export const CredentialKeyRevocationService = {
  revoke(keyProvider: CredentialKeyProvider, request: KeyRevocationRequest, deps: { repos: CryptoRepositories; now: () => Date; eventId: () => string }): KeyRevocationOutcome {
    const enabled = request.enabled ?? KEY_REVOCATION_ENABLED;
    const at = deps.now().toISOString();
    deps.repos.audit.append(makeCryptoAudit({ eventId: deps.eventId(), at, operation: "KEY_REVOCATION_REQUESTED", result: enabled ? "ok" : "denied", reasonCode: enabled ? "ok" : "feature_disabled", keyReference: request.keyReference }));
    if (!enabled) return { ok: false, reasonCode: "feature_disabled" };
    const res = keyProvider.revokeKey({ ...request, enabled: true });
    if (!res.ok) return res;
    deps.repos.revocations.save(res.record);
    deps.repos.audit.append(makeCryptoAudit({ eventId: deps.eventId(), at, operation: res.record.compromised ? "KEY_COMPROMISE_RECORDED" : "KEY_REVOKED", result: "ok", reasonCode: request.publicReasonCode, keyReference: request.keyReference }));
    return res;
  },
};
