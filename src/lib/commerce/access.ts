/**
 * ARCADINS — Décisions d'ACCÈS aux Programmes officiels (gate d'entitlement) + résolution
 * de la première leçon. PUR / déterministe / node-testable. Aucune I/O.
 *
 * La décision est prise CÔTÉ SERVEUR à partir d'un enregistrement d'inscription
 * (program_enrollments) : un achat TEF ne donne accès qu'à TEF (séparation stricte).
 */
import { isProgramCode, type ProgramCode } from "./program-commerce.ts";

export type AccessDecision =
  | "allow"          // entitlement actif → accès autorisé
  | "locked"         // aucun entitlement → afficher l'état verrouillé + CTA d'achat
  | "expired"        // entitlement expiré → page de renouvellement
  | "suspended"      // suspendu/remboursé → accès retiré selon politique
  | "pending"        // paiement confirmé, activation en cours (webhook non encore traité)
  | "wrong_program"; // entitlement d'un AUTRE programme → refus

export interface ProgramEnrollmentLike {
  program_code: string;
  status: string; // 'active' | 'suspended' | 'expired' | 'refunded' | 'pending'
  access_expires_at: string | null;
}

export interface AccessInput {
  requestedProgram: string;
  enrollment: ProgramEnrollmentLike | null;
  now: Date;
}

/** Décide l'accès à un programme officiel (décision serveur, jamais côté client seul). */
export function decideProgramAccess(input: AccessInput): AccessDecision {
  const { requestedProgram, enrollment, now } = input;
  if (!isProgramCode(requestedProgram)) return "locked";
  if (!enrollment) return "locked";
  if (enrollment.program_code !== requestedProgram) return "wrong_program";

  switch (enrollment.status) {
    case "pending":
      return "pending";
    case "suspended":
    case "refunded":
      return "suspended";
    case "expired":
      return "expired";
    case "active": {
      if (enrollment.access_expires_at == null) return "allow"; // accès à vie
      return now <= new Date(enrollment.access_expires_at) ? "allow" : "expired";
    }
    default:
      return "locked";
  }
}

export interface FirstLessonTarget {
  /** Accueil du programme (fallback si la première leçon n'est pas résolue). */
  programHome: string;
  /** Première leçon accessible (respecte le déblocage séquentiel : niveau fondation). */
  firstLesson: string;
  /** Route publique du programme (marketing) pour l'état verrouillé. */
  marketing: string;
  /** CTA d'achat (sélection de forfait) pour l'état verrouillé. */
  purchaseCta: string;
}

/**
 * Résout la destination post-inscription pour un programme officiel. L'apprentissage
 * TEF/TCF passe par la plateforme de tutorat mutualisée (première leçon = niveau
 * fondation, compréhension orale). Ne redirige JAMAIS un acheteur TEF vers TCF.
 */
export function resolveFirstLesson(program: string): FirstLessonTarget | null {
  if (!isProgramCode(program)) return null;
  const marketing = program === "tcf-canada" ? "/tcf" : "/tef";
  return {
    programHome: "/tutorat",
    firstLesson: "/tutorat/comprehension-orale/fondation",
    marketing,
    purchaseCta: `/inscription?program=${program}`,
  };
}

/** Programme officiel typé (helper de commodité). */
export function asProgramCode(v: string): ProgramCode | null {
  return isProgramCode(v) ? v : null;
}
