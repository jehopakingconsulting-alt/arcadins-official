/**
 * ARCADINS — Emails du parcours commercial (inscription/paiement/accès).
 * Templates PURS (node-testable) + envoi via l'abstraction EmailProvider existante
 * (provider.ts). L'échec d'envoi ne DOIT JAMAIS annuler une inscription payée : la
 * fonction d'envoi est best-effort et renvoie un statut sans lever.
 */
import { getEmailProvider, type EmailProvider, type EmailMessage, type DeliveryResult } from "../notifications/provider.ts";

export type EnrollmentEmailKind =
  | "account_created"
  | "payment_confirmation"
  | "enrollment_confirmation"
  | "program_access"
  | "payment_failed"
  | "refund_confirmation"
  | "access_expiring"
  | "admin_activation_failure";

export interface EnrollmentEmailContext {
  to: string;
  fullName?: string;
  programName?: string;
  packageName?: string;
  amountLabel?: string; // ex. "197,00 $ US"
  dashboardUrl?: string;
  supportEmail?: string;
  accessExpiresLabel?: string | null;
  orderReference?: string;
}

const SUPPORT = "info@arcadins-training.com";

/** Construit un email (PUR). Renvoie null pour un type inconnu. */
export function buildEnrollmentEmail(kind: EnrollmentEmailKind, ctx: EnrollmentEmailContext): EmailMessage | null {
  const name = ctx.fullName?.trim() || "";
  const hi = name ? `Bonjour ${name},` : "Bonjour,";
  const support = ctx.supportEmail || SUPPORT;
  const dash = ctx.dashboardUrl || "";
  const prog = ctx.programName || "votre programme";
  const foot = `\n\nBesoin d'aide ? ${support}\n— ARCADINS Training Center`;

  switch (kind) {
    case "account_created":
      return { to: ctx.to, subject: "Bienvenue chez ARCADINS Training Center", body: `${hi}\n\nVotre compte ARCADINS a été créé. Vous pouvez maintenant finaliser votre inscription et accéder à votre espace étudiant.${dash ? `\n\nAccéder à mon espace : ${dash}` : ""}${foot}` };
    case "payment_confirmation":
      return { to: ctx.to, subject: `Paiement confirmé — ${prog}`, body: `${hi}\n\nNous confirmons la réception de votre paiement${ctx.amountLabel ? ` de ${ctx.amountLabel}` : ""} pour ${prog}${ctx.packageName ? ` (forfait ${ctx.packageName})` : ""}.${ctx.orderReference ? `\nRéférence : ${ctx.orderReference}` : ""}${foot}` };
    case "enrollment_confirmation":
      return { to: ctx.to, subject: `Inscription activée — ${prog}`, body: `${hi}\n\nVotre inscription à ${prog} est activée. Votre accès est immédiat.${ctx.accessExpiresLabel ? `\nAccès valable jusqu'au ${ctx.accessExpiresLabel}.` : ""}${dash ? `\n\nAccéder à mon programme : ${dash}` : ""}${foot}` };
    case "program_access":
      return { to: ctx.to, subject: `Comment démarrer — ${prog}`, body: `${hi}\n\nVoici comment démarrer votre préparation ${prog} : connectez-vous à votre espace, ouvrez votre première leçon et suivez votre progression.${dash ? `\n\nCommencer : ${dash}` : ""}${foot}` };
    case "payment_failed":
      return { to: ctx.to, subject: `Paiement non abouti — ${prog}`, body: `${hi}\n\nVotre paiement pour ${prog} n'a pas abouti. Aucun accès payant n'a été activé. Vous pouvez réessayer à tout moment.${foot}` };
    case "refund_confirmation":
      return { to: ctx.to, subject: `Remboursement confirmé — ${prog}`, body: `${hi}\n\nNous confirmons le remboursement lié à ${prog}${ctx.amountLabel ? ` (${ctx.amountLabel})` : ""}. L'accès correspondant est ajusté selon nos conditions.${foot}` };
    case "access_expiring":
      return { to: ctx.to, subject: `Votre accès ${prog} arrive à échéance`, body: `${hi}\n\nVotre accès à ${prog}${ctx.accessExpiresLabel ? ` expire le ${ctx.accessExpiresLabel}` : " arrive bientôt à échéance"}. Renouvelez pour continuer votre préparation.${foot}` };
    case "admin_activation_failure":
      return { to: ctx.to, subject: `[ADMIN] Échec d'activation — ${prog}`, body: `Échec de traitement/activation détecté.\nProgramme : ${prog}\nRéférence : ${ctx.orderReference || "n/a"}\nÀ vérifier dans l'admin (événements webhook).` };
    default:
      return null;
  }
}

export interface EnrollmentEmailOutcome {
  kind: EnrollmentEmailKind;
  attempted: boolean;
  result: DeliveryResult | null;
}

/**
 * Envoie un email d'inscription (best-effort). N'ANNULE JAMAIS une inscription :
 * toute erreur est capturée et renvoyée comme statut « failed » à journaliser.
 */
export async function sendEnrollmentEmail(
  kind: EnrollmentEmailKind,
  ctx: EnrollmentEmailContext,
  provider: EmailProvider = getEmailProvider(),
): Promise<EnrollmentEmailOutcome> {
  const message = buildEnrollmentEmail(kind, ctx);
  if (!message) return { kind, attempted: false, result: null };
  try {
    const result = await provider.send(message);
    return { kind, attempted: true, result };
  } catch (e) {
    return { kind, attempted: true, result: { status: "failed", provider: provider.name, error: e instanceof Error ? e.message : "erreur" } };
  }
}
