// Fournisseur d'envoi interchangeable. Aucune clé n'est codée dans le dépôt :
// tout vient des variables d'environnement.
//   EMAIL_PROVIDER=console        (défaut développement)
//   RESEND_API_KEY=...            (activation Resend)
//   EMAIL_FROM=...  EMAIL_REPLY_TO=...  APP_URL=...

export interface EmailMessage {
  to: string;
  subject: string;
  body: string;
  from?: string;
  replyTo?: string;
}

export type DeliveryStatus = "sent" | "failed" | "skipped" | "pending";

export interface DeliveryResult {
  status: DeliveryStatus;
  provider: string;
  error?: string;
}

export interface EmailProvider {
  readonly name: string;
  send(message: EmailMessage): Promise<DeliveryResult>;
}

/** Fournisseur de développement : n'envoie rien, journalise en console. */
export class ConsoleProvider implements EmailProvider {
  readonly name = "console";
  async send(message: EmailMessage): Promise<DeliveryResult> {
    console.log(`[email:console] → ${message.to} — ${message.subject}`);
    return { status: "sent", provider: this.name };
  }
}

/** Fournisseur Resend, prêt à être activé (aucune clé en dur). */
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
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${this.apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: message.from || process.env.EMAIL_FROM,
          to: message.to,
          reply_to: message.replyTo || process.env.EMAIL_REPLY_TO,
          subject: message.subject,
          text: message.body,
        }),
      });
      if (!res.ok) {
        return { status: "failed", provider: this.name, error: `HTTP ${res.status}` };
      }
      return { status: "sent", provider: this.name };
    } catch (e) {
      return { status: "failed", provider: this.name, error: e instanceof Error ? e.message : "erreur réseau" };
    }
  }
}

/** Sélectionne le fournisseur selon EMAIL_PROVIDER (console par défaut). */
export function getEmailProvider(env: NodeJS.ProcessEnv = process.env): EmailProvider {
  switch ((env.EMAIL_PROVIDER || "console").toLowerCase()) {
    case "resend":
      return new ResendProvider(env.RESEND_API_KEY);
    // « sendgrid » / « postmark » pourront être ajoutés ici ultérieurement.
    case "console":
    default:
      return new ConsoleProvider();
  }
}
