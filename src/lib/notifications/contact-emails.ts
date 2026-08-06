import type { EmailMessage } from "./provider.ts";
import { renderEmail } from "./email-template.ts";

/**
 * Construit les e-mails liés au formulaire de contact. PUR (aucun envoi) :
 * la route API décide de l'envoi réel via getEmailProvider().
 */
export interface ContactContext {
  firstName: string;
  lastName: string;
  email: string;
  country?: string;
  interest?: string;
  message?: string;
}

const APP = (process.env.APP_URL || "https://arcadins-official.vercel.app").replace(/\/$/, "");

/** Accusé de réception envoyé à la personne qui a écrit. */
export function buildContactAckEmail(ctx: ContactContext): EmailMessage {
  const { html, text } = renderEmail({
    preheader: "Nous avons bien reçu votre message.",
    heading: "Message bien reçu",
    intro: `Bonjour ${ctx.firstName},`,
    paragraphs: [
      "Merci de nous avoir contactés. Votre demande a bien été enregistrée : un conseiller ARCADINS vous répondra sous 24 à 48 heures ouvrables.",
      "En attendant, vous pouvez explorer nos programmes de langue (TEF/TCF) et nos formations professionnelles.",
    ],
    cta: { label: "Découvrir les programmes", url: `${APP}/formations` },
    footerNote: "Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet e-mail.",
  });
  return { to: ctx.email, subject: "Nous avons bien reçu votre message — ARCADINS", body: text, html };
}

/** Notification interne envoyée à l'équipe (nouvelle demande à traiter). */
export function buildContactAdminEmail(ctx: ContactContext, adminTo: string): EmailMessage {
  const details = [
    { label: "Nom", value: `${ctx.firstName} ${ctx.lastName}` },
    { label: "E-mail", value: ctx.email },
    ...(ctx.country ? [{ label: "Pays", value: ctx.country }] : []),
    ...(ctx.interest ? [{ label: "Intérêt", value: ctx.interest }] : []),
  ];
  const { html, text } = renderEmail({
    preheader: `Nouvelle demande de ${ctx.firstName} ${ctx.lastName}`,
    heading: "Nouvelle demande de contact",
    intro: "Une nouvelle demande vient d'être soumise via le formulaire public.",
    details,
    paragraphs: ctx.message ? [`Message :`, ctx.message] : ["(Aucun message fourni.)"],
    cta: { label: "Ouvrir l'espace admin", url: `${APP}/admin` },
    footerNote: "Répondez directement à cette adresse pour contacter la personne.",
  });
  return {
    to: adminTo,
    subject: `[Contact] ${ctx.firstName} ${ctx.lastName}`,
    body: text,
    html,
    replyTo: ctx.email,
  };
}
