// Fournisseur d'envoi interchangeable. Aucune clé n'est codée dans le dépôt :
// tout vient des variables d'environnement.
//   EMAIL_PROVIDER=console        (défaut développement, n'envoie rien)
//   EMAIL_PROVIDER=resend  + RESEND_API_KEY=...           (API HTTP — recommandé serverless)
//   EMAIL_PROVIDER=smtp    + SMTP_HOST/PORT/USER/PASS...  (SMTP littéral via nodemailer)
//   EMAIL_FROM=...  EMAIL_REPLY_TO=...  APP_URL=...

export interface EmailMessage {
  to: string;
  subject: string;
  /** Corps texte brut (fallback obligatoire pour la délivrabilité). */
  body: string;
  /** Corps HTML responsive (optionnel ; si absent, seul le texte est envoyé). */
  html?: string;
  from?: string;
  replyTo?: string;
}

export type DeliveryStatus = "sent" | "failed" | "skipped" | "pending";

export interface DeliveryResult {
  status: DeliveryStatus;
  provider: string;
  error?: string;
  /** Nombre de tentatives réellement effectuées (renseigné par withRetry). */
  attempts?: number;
  /** Identifiant de message renvoyé par le fournisseur, si disponible. */
  id?: string;
}

export interface EmailProvider {
  readonly name: string;
  send(message: EmailMessage): Promise<DeliveryResult>;
}

/** Fournisseur de développement : n'envoie rien, journalise en console. */
export class ConsoleProvider implements EmailProvider {
  readonly name = "console";
  async send(message: EmailMessage): Promise<DeliveryResult> {
    console.log(`[email:console] → ${message.to} — ${message.subject}${message.html ? " (html+text)" : " (text)"}`);
    return { status: "sent", provider: this.name };
  }
}

/** Fournisseur Resend (API HTTP). HTML + texte. Aucune clé en dur. */
export class ResendProvider implements EmailProvider {
  readonly name = "resend";
  private apiKey: string | undefined;
  constructor(apiKey: string | undefined = process.env.RESEND_API_KEY) {
    this.apiKey = apiKey;
  }

  async send(message: EmailMessage): Promise<DeliveryResult> {
    if (!this.apiKey) {
      return { status: "failed", provider: this.name, error: "RESEND_API_KEY manquant" };
    }
    const from = message.from || process.env.EMAIL_FROM;
    if (!from) {
      return { status: "failed", provider: this.name, error: "EMAIL_FROM manquant" };
    }
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${this.apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: message.to,
          reply_to: message.replyTo || process.env.EMAIL_REPLY_TO || undefined,
          subject: message.subject,
          text: message.body,
          ...(message.html ? { html: message.html } : {}),
        }),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) {
        let detail = `HTTP ${res.status}`;
        try {
          const j = await res.json();
          if (j?.message) detail = `HTTP ${res.status}: ${j.message}`;
        } catch {
          /* corps non-JSON */
        }
        return { status: "failed", provider: this.name, error: detail };
      }
      let id: string | undefined;
      try {
        id = (await res.json())?.id;
      } catch {
        /* pas de corps */
      }
      return { status: "sent", provider: this.name, id };
    } catch (e) {
      return { status: "failed", provider: this.name, error: e instanceof Error ? e.message : "erreur réseau" };
    }
  }
}

/**
 * Fournisseur SMTP littéral (nodemailer). Compatible tout serveur SMTP
 * (Resend SMTP, Mailgun, Amazon SES, Postmark, Gmail…). Import dynamique :
 * nodemailer n'est chargé que lorsque EMAIL_PROVIDER=smtp.
 */
export class SmtpProvider implements EmailProvider {
  readonly name = "smtp";
  async send(message: EmailMessage): Promise<DeliveryResult> {
    const host = process.env.SMTP_HOST;
    const from = message.from || process.env.EMAIL_FROM;
    if (!host) return { status: "failed", provider: this.name, error: "SMTP_HOST manquant" };
    if (!from) return { status: "failed", provider: this.name, error: "EMAIL_FROM manquant" };
    try {
      const nodemailer = (await import("nodemailer")).default;
      const port = Number(process.env.SMTP_PORT || 587);
      const transport = nodemailer.createTransport({
        host,
        port,
        // 465 = TLS implicite ; sinon STARTTLS.
        secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
        auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
        connectionTimeout: 8000,
        greetingTimeout: 8000,
        socketTimeout: 10000,
      });
      const info = await transport.sendMail({
        from,
        to: message.to,
        replyTo: message.replyTo || process.env.EMAIL_REPLY_TO || undefined,
        subject: message.subject,
        text: message.body,
        ...(message.html ? { html: message.html } : {}),
      });
      return { status: "sent", provider: this.name, id: info?.messageId };
    } catch (e) {
      return { status: "failed", provider: this.name, error: e instanceof Error ? e.message : "erreur SMTP" };
    }
  }
}

export interface RetryOptions {
  attempts?: number;
  baseDelayMs?: number;
  /** Injecté dans les tests pour éviter les délais réels. */
  sleep?: (ms: number) => Promise<void>;
}

/**
 * Décorateur de fiabilité : réessaie les envois en échec avec back-off
 * exponentiel. Les statuts « sent » et « skipped » sont renvoyés immédiatement.
 */
export function withRetry(provider: EmailProvider, opts: RetryOptions = {}): EmailProvider {
  const attempts = Math.max(1, opts.attempts ?? 3);
  const base = opts.baseDelayMs ?? 400;
  const sleep = opts.sleep ?? ((ms: number) => new Promise((r) => setTimeout(r, ms)));
  return {
    name: provider.name,
    async send(message: EmailMessage): Promise<DeliveryResult> {
      let last: DeliveryResult = { status: "failed", provider: provider.name, error: "non tenté" };
      for (let i = 1; i <= attempts; i++) {
        last = await provider.send(message);
        if (last.status === "sent" || last.status === "skipped") {
          return { ...last, attempts: i };
        }
        if (i < attempts) await sleep(base * 2 ** (i - 1));
      }
      return { ...last, attempts };
    },
  };
}

/**
 * Sélectionne le fournisseur selon EMAIL_PROVIDER (console par défaut) et
 * l'enrobe de retry (sauf console : rien à réessayer).
 */
export function getEmailProvider(env: NodeJS.ProcessEnv = process.env): EmailProvider {
  switch ((env.EMAIL_PROVIDER || "console").toLowerCase()) {
    case "resend":
      return withRetry(new ResendProvider(env.RESEND_API_KEY));
    case "smtp":
      return withRetry(new SmtpProvider());
    case "console":
    default:
      return new ConsoleProvider();
  }
}
