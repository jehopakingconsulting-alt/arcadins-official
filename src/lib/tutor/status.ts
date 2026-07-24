// Machine à états — CANDIDATURES « DEVENIR TUTEUR ».
// Strictement distincte du parcours élève (voir lib/tutoring/status.ts).
// Les transitions sont validées côté serveur ; toute transition non déclarée est refusée.

export const TUTOR_STATUSES = [
  "submitted",
  "under_review",
  "interview_requested",
  "interview_scheduled",
  "approved",
  "rejected",
  "suspended",
  "archived",
] as const;

export type TutorStatus = (typeof TUTOR_STATUSES)[number];

export const TUTOR_INITIAL_STATUS: TutorStatus = "submitted";

// Transitions normales autorisées (flux nominal).
const TRANSITIONS: Record<TutorStatus, TutorStatus[]> = {
  submitted: ["under_review", "rejected", "archived"],
  under_review: ["interview_requested", "approved", "rejected", "archived"],
  interview_requested: ["interview_scheduled", "rejected", "archived"],
  interview_scheduled: ["approved", "rejected", "archived"],
  approved: ["suspended", "archived"],
  rejected: ["archived"], // pas de retour direct en entrevue sans réouverture
  suspended: ["approved", "archived"], // réintégration possible
  archived: [], // terminal (réactivation uniquement via reopen explicite)
};

// Réouverture explicite (action spéciale d'un administrateur autorisé) :
// un état terminal/refusé peut repasser en revue, jamais directement en entrevue/approbation.
const REOPEN_FROM: TutorStatus[] = ["rejected", "archived"];
const REOPEN_TO: TutorStatus = "under_review";

export interface TransitionCheck {
  ok: boolean;
  reason?: string;
}

export function isTutorStatus(v: unknown): v is TutorStatus {
  return typeof v === "string" && (TUTOR_STATUSES as readonly string[]).includes(v);
}

/**
 * Valide une transition de statut d'une candidature tuteur.
 * @param opts.reopen  true si l'administrateur déclenche une réouverture explicite.
 */
export function validateTutorTransition(
  from: string,
  to: string,
  opts: { reopen?: boolean } = {},
): TransitionCheck {
  if (!isTutorStatus(from)) return { ok: false, reason: `Statut de départ inconnu : ${from}` };
  if (!isTutorStatus(to)) return { ok: false, reason: `Statut cible inconnu : ${to}` };
  if (from === to) return { ok: false, reason: "Le statut cible est identique au statut actuel." };

  if (opts.reopen) {
    if (REOPEN_FROM.includes(from) && to === REOPEN_TO) return { ok: true };
    return { ok: false, reason: `Réouverture autorisée uniquement vers « ${REOPEN_TO} » depuis un état refusé/archivé.` };
  }

  if (TRANSITIONS[from].includes(to)) return { ok: true };
  return { ok: false, reason: `Transition interdite : ${from} → ${to}.` };
}

export function allowedTutorTargets(from: TutorStatus): TutorStatus[] {
  return TRANSITIONS[from];
}
