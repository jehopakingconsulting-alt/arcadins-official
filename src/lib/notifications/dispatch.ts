// Orchestration des notifications. Pure et injectable (fournisseur + garde
// anti-duplication) pour être testable sans base ni fournisseur externe.

import type { EmailMessage, EmailProvider, DeliveryResult } from "./provider.ts";
import { renderEmailTemplate } from "./templates.ts";
import { parcoursOf, externalAudienceOf, type NotificationEvent, type Parcours } from "./events.ts";

export interface NotificationRecord {
  audience: "admin" | "student" | "tutor";
  recipient_id: string | null;
  parcours: Parcours;
  event: NotificationEvent;
  title: string;
  body: string;
  related_id: string;
}

export interface DeliveryLogRecord {
  parcours: Parcours;
  event: NotificationEvent;
  channel: "email" | "internal";
  provider: string | null;
  to_email: string | null;
  template_key: string | null;
  lang: string | null;
  status: DeliveryResult["status"];
  attempts: number;
  error: string | null;
  dedup_key: string;
}

export interface DispatchContext {
  event: NotificationEvent;
  relatedId: string;
  recipientEmail?: string;
  recipientId?: string | null;
  firstName?: string;
  lang?: string;
  attempt?: number;
}

export interface DispatchDeps {
  provider: EmailProvider;
  /** Renvoie true si cet envoi (dedup_key) a déjà été effectué. */
  alreadySent?: (dedupKey: string) => boolean | Promise<boolean>;
}

export interface DispatchResult {
  dedupKey: string;
  skipped: boolean;
  email?: { message: EmailMessage; result: DeliveryResult };
  recipientNotification?: NotificationRecord;
  deliveryLog: DeliveryLogRecord;
}

export function dedupKeyFor(ctx: DispatchContext): string {
  return `${ctx.event}:${ctx.relatedId}:${ctx.recipientId ?? ctx.recipientEmail ?? "anon"}`;
}

/** Notification interne destinée aux administrateurs (aucun courriel). */
export function buildAdminNotification(ctx: DispatchContext): NotificationRecord {
  const parcours = parcoursOf(ctx.event);
  const label = parcours === "tutoring" ? "demande de tutorat" : "candidature tuteur";
  return {
    audience: "admin",
    recipient_id: null, // file admin
    parcours,
    event: ctx.event,
    title: `Mise à jour — ${label}`,
    body: `Événement « ${ctx.event} » sur la ${label} ${ctx.relatedId}.`,
    related_id: ctx.relatedId,
  };
}

/**
 * Notifie le destinataire externe (élève ou candidat tuteur) : courriel via le
 * fournisseur + notification interne + journal de livraison, avec garde
 * anti-duplication. Ne lève pas si l'envoi échoue : le statut est journalisé.
 */
export async function dispatchExternalEvent(
  deps: DispatchDeps,
  ctx: DispatchContext,
): Promise<DispatchResult> {
  const parcours = parcoursOf(ctx.event);
  const audience = externalAudienceOf(ctx.event);
  const lang = ctx.lang || "fr";
  const attempt = ctx.attempt ?? 1;
  const dedupKey = dedupKeyFor(ctx);

  // Anti-duplication.
  if (deps.alreadySent && (await deps.alreadySent(dedupKey))) {
    return {
      dedupKey,
      skipped: true,
      deliveryLog: {
        parcours, event: ctx.event, channel: "email", provider: deps.provider.name,
        to_email: ctx.recipientEmail ?? null, template_key: ctx.event, lang,
        status: "skipped", attempts: attempt, error: "duplicate", dedup_key: dedupKey,
      },
    };
  }

  const rendered = renderEmailTemplate(ctx.event, lang, { firstName: ctx.firstName ?? "" });

  // Aucun destinataire ou aucun modèle → on journalise « ignoré ».
  if (!rendered || !ctx.recipientEmail) {
    return {
      dedupKey,
      skipped: true,
      recipientNotification: rendered
        ? { audience, recipient_id: ctx.recipientId ?? null, parcours, event: ctx.event, title: rendered.subject, body: rendered.body, related_id: ctx.relatedId }
        : undefined,
      deliveryLog: {
        parcours, event: ctx.event, channel: "email", provider: deps.provider.name,
        to_email: ctx.recipientEmail ?? null, template_key: rendered ? ctx.event : null, lang,
        status: "skipped", attempts: attempt, error: rendered ? "no_recipient_email" : "no_template", dedup_key: dedupKey,
      },
    };
  }

  const message: EmailMessage = {
    to: ctx.recipientEmail,
    subject: rendered.subject,
    body: rendered.body,
    from: process.env.EMAIL_FROM,
    replyTo: process.env.EMAIL_REPLY_TO,
  };

  let result: DeliveryResult;
  try {
    result = await deps.provider.send(message);
  } catch (e) {
    result = { status: "failed", provider: deps.provider.name, error: e instanceof Error ? e.message : "erreur" };
  }

  return {
    dedupKey,
    skipped: false,
    email: { message, result },
    recipientNotification: {
      audience, recipient_id: ctx.recipientId ?? null, parcours,
      event: ctx.event, title: rendered.subject, body: rendered.body, related_id: ctx.relatedId,
    },
    deliveryLog: {
      parcours, event: ctx.event, channel: "email", provider: result.provider,
      to_email: ctx.recipientEmail, template_key: ctx.event, lang,
      status: result.status, attempts: attempt, error: result.error ?? null, dedup_key: dedupKey,
    },
  };
}
