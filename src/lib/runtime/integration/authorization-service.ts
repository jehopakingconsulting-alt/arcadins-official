/**
 * Runtime — Integration : AcademicAuthorizationService (Sprint I).
 *
 * Décisions d'autorisation PURES et auditables. L'identité serveur du contexte est la source de vérité ;
 * le client ne peut jamais élargir ses droits. Chaque décision produit des reason codes.
 */
import type { AcademicFeatureFlags } from "./config.ts";
import { isAcademicPersistenceEnabled } from "./config.ts";
import type {
  AcademicRequestContext,
  AuthorizationDecision,
  AuthorizationDecisionStatus,
  ResourceOwnership,
} from "./types.ts";

function deny(status: AuthorizationDecisionStatus, ...reasonCodes: string[]): AuthorizationDecision {
  return { status, allowed: false, reasonCodes };
}
const ALLOW: AuthorizationDecision = { status: "allowed", allowed: true, reasonCodes: ["ALLOWED"] };

export const AcademicAuthorizationService = {
  /**
   * Autorise une opération académique. Vérifie flag → authentification → inscription → programme → rôle/permission
   * → propriété → expiration/suspension. La première violation gagne (fail-closed).
   */
  authorize(ctx: AcademicRequestContext, ownership: ResourceOwnership, opts: { requiresPersistence?: boolean } = {}): AuthorizationDecision {
    // Feature flag (fail-closed).
    if ((opts.requiresPersistence ?? true) && !isAcademicPersistenceEnabled(ctx.featureFlags)) return deny("feature_disabled", "ACADEMIC_PERSISTENCE_DISABLED");
    if (ownership.requiresFeature && !ctx.featureFlags[ownership.requiresFeature]) return deny("feature_disabled", `FEATURE_DISABLED:${ownership.requiresFeature}`);

    // Authentification.
    if (!ctx.authenticatedUserId) return deny("unauthenticated", "NOT_AUTHENTICATED");

    // Rôle serveur : accès de service limité (bypass ownership mais pas le flag).
    const isService = ctx.roles.includes("server_service");
    const isAdmin = ctx.roles.includes("administrator");

    // Rôles requis.
    if (ownership.requiredRoles && ownership.requiredRoles.length > 0 && !ownership.requiredRoles.some((r) => ctx.roles.includes(r)) && !isAdmin) {
      return deny("forbidden", "ROLE_REQUIRED");
    }
    // Permission requise.
    if (ownership.requiredPermission && !ctx.permissions.includes(ownership.requiredPermission) && !isAdmin && !isService) {
      return deny("forbidden", "PERMISSION_REQUIRED");
    }

    // Programme.
    if (ownership.programId && ctx.programId && ownership.programId !== ctx.programId && !isAdmin && !isService) {
      return deny("program_mismatch", "PROGRAM_MISMATCH");
    }

    // Propriété de la ressource (étudiant ↔ ses données uniquement). Admin/service exemptés.
    // Le tuteur n'accède qu'aux apprenants qui lui sont ASSIGNÉS (jamais un accès universel).
    const isTutor = ctx.roles.includes("tutor");
    const owns =
      (ownership.ownerLearnerId != null && ctx.learnerId != null && ownership.ownerLearnerId === ctx.learnerId) ||
      (ownership.ownerUserId != null && ctx.authenticatedUserId != null && ownership.ownerUserId === ctx.authenticatedUserId);
    const tutorAssigned = isTutor && ownership.ownerLearnerId != null && (ownership.assignedLearnerIds ?? []).includes(ownership.ownerLearnerId);
    if ((ownership.ownerLearnerId != null || ownership.ownerUserId != null) && !owns && !isAdmin && !isService && !tutorAssigned) {
      return deny("resource_not_owned", "RESOURCE_NOT_OWNED");
    }

    return ALLOW;
  },

  /** Vérifie l'accès à l'inscription (existence, statut, expiration). */
  checkEnrollmentAccess(ctx: AcademicRequestContext, now: Date): AuthorizationDecision {
    if (!ctx.authenticatedUserId) return deny("unauthenticated", "NOT_AUTHENTICATED");
    if (ctx.roles.includes("administrator") || ctx.roles.includes("server_service")) return ALLOW;
    if (!ctx.enrollmentId) return deny("enrollment_missing", "ENROLLMENT_MISSING");
    if (ctx.enrollmentStatus === "suspended") return deny("forbidden", "ENROLLMENT_SUSPENDED");
    if (ctx.enrollmentStatus === "inactive") return deny("enrollment_inactive", "ENROLLMENT_INACTIVE");
    if (ctx.enrollmentStatus === "expired") return deny("access_expired", "ENROLLMENT_EXPIRED");
    if (ctx.accessExpiresAt && now.getTime() > new Date(ctx.accessExpiresAt).getTime()) return deny("access_expired", "ACCESS_EXPIRED");
    return ALLOW;
  },

  /** Vérifie qu'un flag précis est actif. */
  featureEnabled(flags: AcademicFeatureFlags, key: keyof AcademicFeatureFlags): AuthorizationDecision {
    return flags[key] ? ALLOW : deny("feature_disabled", `FEATURE_DISABLED:${key}`);
  },
};
