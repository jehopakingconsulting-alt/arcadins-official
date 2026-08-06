import type { EmailMessage } from "./provider.ts";
import { renderEmail } from "./email-template.ts";

/**
 * E-mails d'AUTHENTIFICATION (confirmation d'inscription, réinitialisation de
 * mot de passe, lien magique, changement d'e-mail, invitation).
 *
 * Ces e-mails sont normalement émis par Supabase Auth. Ici ils sont produits par
 * NOTRE code, appelé via le « Send Email Hook » de Supabase : on maîtrise ainsi
 * la délivrabilité (fournisseur déjà validé) ET le design (charte ARCADINS).
 *
 * Fonctions PURES : aucune I/O, entièrement testables.
 */

export type AuthEmailActionType =
  | "signup"
  | "recovery"
  | "magiclink"
  | "email_change"
  | "email_change_current"
  | "email_change_new"
  | "invite"
  | "reauthentication";

export interface AuthHookPayload {
  user: { id?: string; email?: string; new_email?: string };
  email_data: {
    token?: string;
    token_hash?: string;
    token_new?: string;
    token_hash_new?: string;
    redirect_to?: string;
    email_action_type?: string;
    site_url?: string;
  };
}

/**
 * Construit l'URL de vérification Supabase. C'est ce lien qui valide le jeton
 * puis redirige l'utilisateur vers la page applicative (`redirect_to`).
 */
export function buildVerifyUrl(
  supabaseUrl: string,
  tokenHash: string,
  type: string,
  redirectTo?: string
): string {
  const base = supabaseUrl.replace(/\/$/, "");
  const params = new URLSearchParams({ token: tokenHash, type });
  if (redirectTo) params.set("redirect_to", redirectTo);
  return `${base}/auth/v1/verify?${params.toString()}`;
}

interface Copy {
  subject: string;
  heading: string;
  intro?: string;
  paragraphs: string[];
  cta: string;
  footerNote: string;
}

/** Textes par type d'action (français — langue principale de la plateforme). */
function copyFor(type: AuthEmailActionType, code?: string): Copy {
  const ignore = "Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet e-mail : aucune action ne sera effectuée.";
  switch (type) {
    case "signup":
      return {
        subject: "Confirmez votre inscription — ARCADINS Training Center",
        heading: "Confirmez votre inscription",
        intro: "Bienvenue chez ARCADINS Training Center !",
        paragraphs: [
          "Il ne reste qu'une étape : confirmez votre adresse e-mail pour activer votre compte et accéder à votre espace étudiant.",
        ],
        cta: "Confirmer mon adresse",
        footerNote: `Ce lien expire après un court délai pour votre sécurité. ${ignore}`,
      };
    case "recovery":
      return {
        subject: "Réinitialisation de votre mot de passe — ARCADINS",
        heading: "Réinitialiser votre mot de passe",
        paragraphs: [
          "Vous avez demandé la réinitialisation de votre mot de passe ARCADINS. Cliquez sur le bouton ci-dessous pour en choisir un nouveau.",
        ],
        cta: "Choisir un nouveau mot de passe",
        footerNote: `Ce lien expire après un court délai pour votre sécurité. ${ignore} Votre mot de passe actuel reste inchangé.`,
      };
    case "magiclink":
      return {
        subject: "Votre lien de connexion — ARCADINS",
        heading: "Connexion à votre espace",
        paragraphs: ["Cliquez sur le bouton ci-dessous pour vous connecter à votre espace ARCADINS."],
        cta: "Me connecter",
        footerNote: `Ce lien à usage unique expire rapidement. ${ignore}`,
      };
    case "invite":
      return {
        subject: "Vous êtes invité(e) — ARCADINS Training Center",
        heading: "Vous êtes invité(e)",
        paragraphs: [
          "Vous avez été invité(e) à rejoindre la plateforme ARCADINS Training Center. Acceptez l'invitation pour créer votre compte.",
        ],
        cta: "Accepter l'invitation",
        footerNote: ignore,
      };
    case "email_change":
    case "email_change_current":
    case "email_change_new":
      return {
        subject: "Confirmez votre nouvelle adresse e-mail — ARCADINS",
        heading: "Confirmez votre nouvelle adresse",
        paragraphs: [
          "Une modification de l'adresse e-mail de votre compte ARCADINS a été demandée. Confirmez-la pour qu'elle prenne effet.",
        ],
        cta: "Confirmer cette adresse",
        footerNote: `${ignore} L'adresse actuelle reste active tant que la confirmation n'a pas eu lieu.`,
      };
    case "reauthentication":
      return {
        subject: "Votre code de vérification — ARCADINS",
        heading: "Code de vérification",
        paragraphs: [
          "Pour confirmer votre identité, saisissez le code ci-dessous dans la plateforme :",
          code ? `Code : ${code}` : "(code indisponible)",
        ],
        cta: "",
        footerNote: `Ce code expire rapidement. ${ignore}`,
      };
  }
}

/**
 * Construit l'e-mail d'authentification à envoyer. Renvoie `null` si le payload
 * ne permet pas de construire un message exploitable (destinataire ou jeton absent).
 */
export function buildAuthEmail(payload: AuthHookPayload, supabaseUrl: string): EmailMessage | null {
  const type = (payload.email_data?.email_action_type || "") as AuthEmailActionType;
  if (!type) return null;

  // Pour un changement d'adresse, c'est la NOUVELLE adresse qui doit confirmer.
  const to =
    type === "email_change_new" || type === "email_change"
      ? payload.user?.new_email || payload.user?.email
      : payload.user?.email;
  if (!to) return null;

  const c = copyFor(type, payload.email_data?.token);
  if (!c) return null;

  const tokenHash =
    type === "email_change_new"
      ? payload.email_data?.token_hash_new || payload.email_data?.token_hash
      : payload.email_data?.token_hash;

  // La réauthentification transmet un CODE, pas un lien.
  const needsLink = type !== "reauthentication";
  if (needsLink && !tokenHash) return null;

  const verifyUrl = needsLink
    ? buildVerifyUrl(supabaseUrl, tokenHash as string, type, payload.email_data?.redirect_to)
    : undefined;

  const { html, text } = renderEmail({
    preheader: c.subject,
    heading: c.heading,
    intro: c.intro,
    paragraphs: c.paragraphs,
    ...(verifyUrl ? { cta: { label: c.cta, url: verifyUrl } } : {}),
    footerNote: c.footerNote,
  });

  return { to, subject: c.subject, body: text, html };
}
