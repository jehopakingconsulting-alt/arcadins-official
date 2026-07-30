/**
 * Runtime — Server : environnement d'exécution partagé des services applicatifs (Sprint I).
 *
 * Regroupe le contexte de requête serveur, les repositories, l'horloge/idFactory injectés, l'audit et un garde
 * d'autorisation réutilisable. Toute écriture académique passe par ici — jamais par le navigateur.
 */
import type { AcademicRepositories } from "../repositories/contracts.ts";
import type { AcademicRequestContext, AuthorizationDecision, ResourceOwnership } from "../integration/types.ts";
import { AcademicAuthorizationService } from "../integration/authorization-service.ts";
import { AcademicAuditService, type AuditSink, createInMemoryAuditSink } from "../integration/audit-service.ts";
import { AcademicAuthorizationError, AcademicFeatureDisabledError } from "../integration/errors.ts";
import { isAcademicPersistenceEnabled } from "../integration/config.ts";

export interface ServiceEnv {
  ctx: AcademicRequestContext;
  repos: AcademicRepositories;
  now: Date;
  idFactory: () => string;
  audit: AuditSink;
}

export function createServiceEnv(input: { ctx: AcademicRequestContext; repos: AcademicRepositories; now: Date; idFactory: () => string; audit?: AuditSink }): ServiceEnv {
  return { ctx: input.ctx, repos: input.repos, now: input.now, idFactory: input.idFactory, audit: input.audit ?? createInMemoryAuditSink() };
}

/** Garde : lève une erreur typée si la persistance est OFF ou l'autorisation refusée. */
export function requireAuthorized(env: ServiceEnv, ownership: ResourceOwnership): AuthorizationDecision {
  if (!isAcademicPersistenceEnabled(env.ctx.featureFlags)) {
    throw new AcademicFeatureDisabledError({ correlationId: env.ctx.correlationId, reasonCodes: ["ACADEMIC_PERSISTENCE_DISABLED"] });
  }
  const decision = AcademicAuthorizationService.authorize(env.ctx, ownership);
  if (!decision.allowed) {
    throw new AcademicAuthorizationError({ correlationId: env.ctx.correlationId, reasonCodes: decision.reasonCodes, metadata: { status: decision.status } });
  }
  return decision;
}

/** Émet un événement d'audit redacté. */
export function audit(env: ServiceEnv, type: Parameters<typeof AcademicAuditService.event>[0], opts: { resourceId?: string | null; reasonCodes?: string[]; metadata?: Record<string, unknown> } = {}): void {
  AcademicAuditService.emit(env.audit, AcademicAuditService.event(type, {
    at: env.now.toISOString(),
    actorId: env.ctx.authenticatedUserId,
    correlationId: env.ctx.correlationId,
    resourceId: opts.resourceId ?? null,
    reasonCodes: opts.reasonCodes,
    metadata: opts.metadata,
  }));
}
