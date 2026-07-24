// Événements de notification — DISTINCTS par parcours. Un événement de tutorat
// ne partage jamais son type, son modèle ni sa file avec un événement tuteur.

export const TUTORING_EVENTS = [
  "tutoring_request_submitted",
  "tutoring_request_under_review",
  "tutoring_request_contacted",
  "tutoring_session_scheduled",
  "tutoring_request_enrolled",
  "tutoring_request_closed",
] as const;

export const TUTOR_EVENTS = [
  "tutor_application_submitted",
  "tutor_application_under_review",
  "tutor_interview_requested",
  "tutor_interview_scheduled",
  "tutor_application_approved",
  "tutor_application_rejected",
  "tutor_application_suspended",
] as const;

export type TutoringEvent = (typeof TUTORING_EVENTS)[number];
export type TutorEvent = (typeof TUTOR_EVENTS)[number];
export type NotificationEvent = TutoringEvent | TutorEvent;

export type Parcours = "tutoring" | "tutor";
export type Audience = "admin" | "student" | "tutor";

export function parcoursOf(event: NotificationEvent): Parcours {
  return (TUTORING_EVENTS as readonly string[]).includes(event) ? "tutoring" : "tutor";
}

/** Le destinataire « externe » d'un événement (l'élève ou le candidat tuteur). */
export function externalAudienceOf(event: NotificationEvent): Audience {
  return parcoursOf(event) === "tutoring" ? "student" : "tutor";
}

/** Statut de tutoring_requests → événement correspondant (null si aucun). */
export const TUTORING_STATUS_EVENT: Record<string, TutoringEvent | null> = {
  submitted: "tutoring_request_submitted",
  under_review: "tutoring_request_under_review",
  contacted: "tutoring_request_contacted",
  scheduled: "tutoring_session_scheduled",
  enrolled: "tutoring_request_enrolled",
  closed: "tutoring_request_closed",
  cancelled: null,
};

/** Statut de tutor_applications → événement correspondant (null si aucun). */
export const TUTOR_STATUS_EVENT: Record<string, TutorEvent | null> = {
  submitted: "tutor_application_submitted",
  under_review: "tutor_application_under_review",
  interview_requested: "tutor_interview_requested",
  interview_scheduled: "tutor_interview_scheduled",
  approved: "tutor_application_approved",
  rejected: "tutor_application_rejected",
  suspended: "tutor_application_suspended",
  archived: null,
};
