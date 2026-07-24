// Machine à états — DEMANDES DE TUTORAT (parcours ÉLÈVE).
// Strictement distincte du parcours « Devenir tuteur » (voir lib/tutor/status.ts).
// Les transitions sont validées côté serveur ; toute transition non déclarée est refusée.

export const TUTORING_STATUSES = [
  "submitted",
  "under_review",
  "contacted",
  "scheduled",
  "enrolled",
  "closed",
  "cancelled",
] as const;

export type TutoringStatus = (typeof TUTORING_STATUSES)[number];

export const TUTORING_INITIAL_STATUS: TutoringStatus = "submitted";

// Transitions normales autorisées (flux nominal).
const TRANSITIONS: Record<TutoringStatus, TutoringStatus[]> = {
  submitted: ["under_review", "cancelled"],
  under_review: ["contacted", "closed", "cancelled"],
  contacted: ["scheduled", "closed", "cancelled"],
  scheduled: ["enrolled", "contacted", "closed", "cancelled"],
  enrolled: ["closed"],
  closed: [], // terminal (réouverture uniquement via reopen explicite)
  cancelled: [], // terminal
};

// Réouverture explicite (action spéciale d'un administrateur autorisé) :
// un état terminal peut repasser en revue, jamais directement à un état avancé.
const REOPEN_FROM: TutoringStatus[] = ["closed", "cancelled"];
const REOPEN_TO: TutoringStatus = "under_review";

export interface TransitionCheck {
  ok: boolean;
  reason?: string;
}

export function isTutoringStatus(v: unknown): v is TutoringStatus {
  return typeof v === "string" && (TUTORING_STATUSES as readonly string[]).includes(v);
}

/**
 * Valide une transition de statut d'une demande de tutorat.
 * @param opts.reopen  true si l'administrateur déclenche une réouverture explicite.
 */
export function validateTutoringTransition(
  from: string,
  to: string,
  opts: { reopen?: boolean } = {},
): TransitionCheck {
  if (!isTutoringStatus(from)) return { ok: false, reason: `Statut de départ inconnu : ${from}` };
  if (!isTutoringStatus(to)) return { ok: false, reason: `Statut cible inconnu : ${to}` };
  if (from === to) return { ok: false, reason: "Le statut cible est identique au statut actuel." };

  if (opts.reopen) {
    if (REOPEN_FROM.includes(from) && to === REOPEN_TO) return { ok: true };
    return { ok: false, reason: `Réouverture autorisée uniquement vers « ${REOPEN_TO} » depuis un état terminal.` };
  }

  if (TRANSITIONS[from].includes(to)) return { ok: true };
  return { ok: false, reason: `Transition interdite : ${from} → ${to}.` };
}

export function allowedTutoringTargets(from: TutoringStatus): TutoringStatus[] {
  return TRANSITIONS[from];
}
