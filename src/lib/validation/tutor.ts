// Validation serveur (Zod) — CANDIDATURE « DEVENIR TUTEUR ».
// Distincte du schéma demande de tutorat. Assainit et borne toutes les entrées.

import { z } from "zod";

const SKILL_IDS = [
  "comprehension-ecrite", "comprehension-orale", "expression-ecrite", "expression-orale",
] as const;
const LEVEL_IDS = ["fondation", "intermediaire", "avance", "superieur"] as const;

const shortText = z.string().trim().max(120);
const longText = z.string().trim().max(2000);

export const tutorApplicationSchema = z.object({
  firstName: z.string().trim().min(1, "Prénom requis").max(80),
  lastName: z.string().trim().min(1, "Nom requis").max(80),
  email: z.string().trim().email("Courriel invalide").max(160),
  phone: shortText.optional().or(z.literal("")),
  skills: z.array(z.enum(SKILL_IDS)).min(1, "Sélectionnez au moins une compétence").max(4),
  levels: z.array(z.enum(LEVEL_IDS)).max(4).optional().default([]),
  experience: longText.optional().or(z.literal("")),
  qualifications: longText.optional().or(z.literal("")),
  motivation: longText.optional().or(z.literal("")),
  lang: z.string().trim().max(5).optional(),
});

export type TutorApplicationInput = z.infer<typeof tutorApplicationSchema>;
