// Validation serveur (Zod) — SOUMISSION D'UNE DEMANDE DE TUTORAT (élève).
// Distincte du schéma candidature tuteur. Assainit et borne toutes les entrées.

import { z } from "zod";

const SKILL_IDS = [
  "comprehension-ecrite", "comprehension-orale", "expression-ecrite", "expression-orale",
] as const;
const LEVEL_IDS = ["fondation", "intermediaire", "avance", "superieur"] as const;

const shortText = z.string().trim().max(120);
const longText = z.string().trim().max(2000);

export const tutoringRequestSchema = z.object({
  firstName: z.string().trim().min(1, "Prénom requis").max(80),
  lastName: z.string().trim().min(1, "Nom requis").max(80),
  email: z.string().trim().email("Courriel invalide").max(160),
  phone: shortText.optional().or(z.literal("")),
  skills: z.array(z.enum(SKILL_IDS)).min(1, "Sélectionnez au moins une compétence").max(4),
  targetLevel: z.enum(LEVEL_IDS).optional(),
  currentLevel: shortText.optional().or(z.literal("")),
  goal: longText.optional().or(z.literal("")),
  availability: shortText.optional().or(z.literal("")),
  message: longText.optional().or(z.literal("")),
  lang: z.string().trim().max(5).optional(),
});

export type TutoringRequestInput = z.infer<typeof tutoringRequestSchema>;
