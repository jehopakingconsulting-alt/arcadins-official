// Contrôle d'accès basé sur les rôles (RBAC) — Étape 9 (Ph. 15).
// Source unique de la cartographie rôle → permissions. La contrainte CHECK en
// base (migration 0002) garantit les valeurs de rôle valides ; la logique
// d'autorisation fine reste ici, côté code.

export type Role =
  | "student"
  | "admin"
  | "tutor"
  | "content_manager"
  | "finance_manager"
  | "support";

export type Permission =
  | "admin.access"            // accès au tableau de bord d'administration
  | "tutoring_requests.view"  // file des demandes de tutorat (élèves)
  | "tutor_applications.view" // file des candidatures tuteur
  | "contacts.view"           // demandes de contact
  | "enrollments.view"        // inscriptions / paiements
  | "content.manage"          // contenu pédagogique
  | "users.manage";           // rôles & comptes

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    "admin.access",
    "tutoring_requests.view",
    "tutor_applications.view",
    "contacts.view",
    "enrollments.view",
    "content.manage",
    "users.manage",
  ],
  // Gère les candidatures tuteur + le contenu, sans finance ni comptes.
  content_manager: ["admin.access", "tutor_applications.view", "content.manage"],
  // Vue finance + inscriptions.
  finance_manager: ["admin.access", "enrollments.view"],
  // Première ligne : demandes de tutorat + contacts.
  support: ["admin.access", "tutoring_requests.view", "contacts.view"],
  // Le tuteur n'a pas accès à l'admin (espace tuteur = étape ultérieure).
  tutor: [],
  student: [],
};

export function permissionsForRole(role: string | null | undefined): Permission[] {
  if (!role || !(role in ROLE_PERMISSIONS)) return [];
  return ROLE_PERMISSIONS[role as Role];
}

export function hasPermission(role: string | null | undefined, perm: Permission): boolean {
  return permissionsForRole(role).includes(perm);
}

/** A-t-il le droit d'ouvrir l'espace d'administration (au moins une permission) ? */
export function canAccessAdmin(role: string | null | undefined): boolean {
  return hasPermission(role, "admin.access");
}

/** Libellés lisibles pour l'interface d'administration. */
export const ROLE_LABELS: Record<Role, string> = {
  student: "Étudiant",
  admin: "Administrateur",
  tutor: "Tuteur",
  content_manager: "Gestion de contenu",
  finance_manager: "Gestion financière",
  support: "Support",
};
