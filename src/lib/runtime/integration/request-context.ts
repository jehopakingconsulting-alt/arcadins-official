/**
 * Runtime — Integration : AcademicRequestContext builder (Sprint I).
 *
 * Construit le contexte serveur à partir de l'identité SERVEUR authentifiée. Le client ne peut JAMAIS imposer
 * `learnerId`, `enrollmentId`, `roles` ni `permissions` : ces champs proviennent exclusivement de `ServerIdentity`.
 * Les indices client (locale, timestamp, user-agent, ip, idempotencyKey) sont INFORMATIFS et hachés si sensibles.
 */
import type { AcademicFeatureFlags } from "./config.ts";
import { ACADEMIC_FEATURE_FLAGS } from "./config.ts";
import type { AcademicRequestContext, ClientRequestHints, ServerIdentity } from "./types.ts";

function djb2(input: string): string {
  let h = 5381;
  for (let i = 0; i < input.length; i++) h = ((h << 5) + h + input.charCodeAt(i)) >>> 0;
  return h.toString(16);
}

export interface BuildContextInput {
  identity: ServerIdentity;
  hints?: ClientRequestHints;
  now: Date; // horloge SERVEUR injectée
  idFactory: () => string;
  featureFlags?: AcademicFeatureFlags;
}

export function buildAcademicRequestContext(input: BuildContextInput): AcademicRequestContext {
  const hints = input.hints ?? {};
  const id = input.identity;
  return {
    // Autorité serveur — jamais surchargeable par le client.
    authenticatedUserId: id.authenticatedUserId,
    learnerId: id.learnerId,
    enrollmentId: id.enrollmentId,
    programId: id.programId,
    programVersionId: id.programVersionId,
    roles: [...id.roles],
    permissions: [...id.permissions],
    enrollmentStatus: id.enrollmentStatus ?? null,
    accessExpiresAt: id.accessExpiresAt ?? null,
    // Informations client (jamais autoritaires).
    locale: sanitizeLocale(hints.locale),
    requestId: input.idFactory(),
    correlationId: hints.correlationId && /^[\w-]{1,64}$/.test(hints.correlationId) ? hints.correlationId : input.idFactory(),
    idempotencyKey: hints.idempotencyKey && /^[\w-]{1,128}$/.test(hints.idempotencyKey) ? hints.idempotencyKey : null,
    clientTimestamp: hints.clientTimestamp ?? null,
    serverTimestamp: input.now.toISOString(),
    userAgentHash: hints.userAgent ? djb2(hints.userAgent) : null,
    ipHash: hints.ip ? djb2(hints.ip) : null,
    featureFlags: input.featureFlags ?? ACADEMIC_FEATURE_FLAGS,
    authorizationScope: deriveScope(id),
  };
}

/**
 * Construit un contexte en IGNORANT explicitement toute tentative du client d'imposer une identité.
 * `clientClaimedIdentity` est fourni uniquement pour être JETÉ (démonstration/sécurité).
 */
export function buildContextIgnoringClientIdentity(input: BuildContextInput & { clientClaimedIdentity?: Partial<ServerIdentity> }): AcademicRequestContext {
  // On n'utilise JAMAIS clientClaimedIdentity : seule `input.identity` (serveur) fait foi.
  void input.clientClaimedIdentity;
  return buildAcademicRequestContext(input);
}

function sanitizeLocale(locale: string | undefined): string {
  if (!locale) return "fr";
  return /^[a-z]{2}(-[A-Z]{2})?$/.test(locale) ? locale : "fr";
}

function deriveScope(id: ServerIdentity): string[] {
  const scope: string[] = [];
  if (id.roles.includes("learner")) scope.push("self:read", "self:write");
  if (id.roles.includes("tutor")) scope.push("assigned:read", "assigned:review");
  if (id.roles.includes("academic_reviewer")) scope.push("review:read", "review:write");
  if (id.roles.includes("content_manager")) scope.push("content:read");
  if (id.roles.includes("administrator")) scope.push("admin:read");
  if (id.roles.includes("server_service")) scope.push("service:write");
  return scope;
}
