/**
 * ARCADINS — Modèle de SESSION D'INSCRIPTION (parcours self-service).
 * Valide le formulaire d'inscription (réf. V1 « Commencer maintenant — Accès immédiat »)
 * et borne toutes les entrées côté serveur. PUR (Zod) + node-testable.
 *
 * Le formulaire NE crée JAMAIS d'accès payant : il crée une session d'inscription
 * REPRISE (resumable) référencée par un identifiant serveur opaque. Le choix du
 * forfait, l'authentification puis le paiement Stripe suivent. Aucune donnée
 * personnelle en clair dans l'URL — seul l'identifiant de session circule.
 */
import { z } from "zod";
import { isProgramCode } from "./program-commerce.ts";

/** Objectifs proposés (alignés Département A — immigration/études/travail). */
export const ENROLLMENT_OBJECTIVES = [
  "immigration-federal",
  "immigration-quebec",
  "etudes",
  "travail",
  "citoyennete",
  "autre",
] as const;

/** Niveau de français estimé déclaré par l'étudiant. */
export const FRENCH_LEVELS = [
  "debutant",
  "intermediaire",
  "avance",
  "superieur",
  "inconnu",
] as const;

/** Forfaits (deferred = « Je choisirai plus tard »). */
export const PACKAGE_CHOICES = ["starter", "essential", "premium", "vip", "later"] as const;

export const enrollmentFormSchema = z.object({
  fullName: z.string().trim().min(2, "Nom complet requis").max(120),
  email: z.string().trim().email("Courriel invalide").max(200),
  phone: z.string().trim().min(6, "Téléphone requis").max(40),
  country: z.string().trim().min(2, "Pays requis").max(80),
  objective: z.enum(ENROLLMENT_OBJECTIVES),
  frenchLevel: z.enum(FRENCH_LEVELS),
  /** Programme visé : TEF/TCF (Dép. A) ou slug d'une formation professionnelle active. */
  program: z.string().trim().min(2).max(60),
  /** Forfait souhaité (ou « later » = à choisir sur la page forfaits). */
  packageChoice: z.enum(PACKAGE_CHOICES).default("later"),
  /** Consentement CONTRACTUEL (CT + confidentialité) — obligatoire. */
  acceptTerms: z.literal(true, { message: "Vous devez accepter les conditions" }),
  /** Consentement newsletter — OPTIONNEL et distinct du consentement contractuel. */
  newsletter: z.boolean().default(false),
});

export type EnrollmentForm = z.infer<typeof enrollmentFormSchema>;

export interface ParseOk {
  ok: true;
  data: EnrollmentForm;
}
export interface ParseErr {
  ok: false;
  errors: Record<string, string>;
}

/** Valide + normalise le formulaire. Ne fait AUCUNE I/O. */
export function parseEnrollmentForm(input: unknown): ParseOk | ParseErr {
  const res = enrollmentFormSchema.safeParse(input);
  if (res.success) return { ok: true, data: res.data };
  const errors: Record<string, string> = {};
  for (const issue of res.error.issues) {
    const key = issue.path.join(".") || "form";
    if (!errors[key]) errors[key] = issue.message;
  }
  return { ok: false, errors };
}

export type EnrollmentSessionStatus = "started" | "package_selected" | "checkout" | "completed" | "abandoned";

/** Route canonique de sélection de forfait (l'identifiant de session, jamais les données perso). */
export function forfaitsPath(sessionRef: string): string {
  return `/inscription/forfaits?session=${encodeURIComponent(sessionRef)}`;
}

/** Le programme visé est-il un Programme officiel (Dép. A) éligible au checkout self-service TEF/TCF ? */
export function isOfficialProgram(program: string): boolean {
  return isProgramCode(program);
}
