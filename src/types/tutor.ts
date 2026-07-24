// Étape 7 (Ph. 9) — Deux flux séparés : demande de tutorat (élève) et
// candidature tuteur. Chaque flux a son propre payload et son cycle de statut.
// Voir la migration supabase/migrations/0001_tutoring_and_tutor_applications.sql.

import type { SkillId, LevelId } from "@/types/tutorat";

/** Demande d'accompagnement soumise par un élève. */
export interface TutoringRequestPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  skills: SkillId[];
  targetLevel?: LevelId;
  currentLevel?: string;
  goal?: string;
  availability?: string;
  message?: string;
}

/** Candidature d'une personne souhaitant devenir tuteur. */
export interface TutorApplicationPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  skills: SkillId[];
  levels: LevelId[];
  experience?: string;
  qualifications?: string;
  motivation?: string;
}

export type TutoringRequestStatus =
  | "nouvelle" | "contactee" | "planifiee" | "close" | "archivee";

export type TutorApplicationStatus =
  | "recue" | "en_revue" | "entretien" | "acceptee" | "refusee" | "archivee";
