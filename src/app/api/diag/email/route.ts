import { NextResponse } from "next/server";
import { getEmailProvider } from "@/lib/notifications/provider.ts";
import { renderEmail } from "@/lib/notifications/email-template.ts";
import { enforceRateLimit } from "@/lib/rate-limit";

/**
 * ENDPOINT TEMPORAIRE DE DIAGNOSTIC E-MAIL — à SUPPRIMER une fois SMTP validé.
 *
 * Sécurité par conception (aucune authentification requise, mais inoffensif) :
 *  - NE renvoie AUCUN secret : seulement des booléens, la longueur/préfixe de clé
 *    et le DOMAINE de l'expéditeur (information publique, présente dans chaque e-mail).
 *  - L'envoi de test ne peut viser QUE l'adresse interne configurée
 *    (CONTACT_NOTIFY_TO / EMAIL_REPLY_TO) : impossible de s'en servir comme relais.
 *  - Rate-limité.
 *
 * Intérêt : l'envoi est fait de façon SYNCHRONE et renvoie l'erreur brute du
 * fournisseur — ce que les logs seuls ne donnent pas toujours. Cela distingue aussi
 * un échec d'envoi d'un problème d'exécution différée (`after()`) côté /api/contact.
 */
export const dynamic = "force-dynamic";

/** Extrait uniquement le domaine d'un « Nom <adresse@domaine> » (non sensible). */
function domainOf(from: string | undefined): string | null {
  if (!from) return null;
  const m = from.match(/<([^>]+)>/);
  const addr = (m ? m[1] : from).trim();
  const at = addr.lastIndexOf("@");
  return at === -1 ? "(format invalide — pas de @)" : addr.slice(at);
}

export async function GET(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rl = await enforceRateLimit(`diag-email:${ip}`, 8, 60_000);
  if (!rl.allowed) {
    return NextResponse.json({ error: "rate limited" }, { status: 429 });
  }

  const url = new URL(request.url);
  const doSend = url.searchParams.get("send") === "1";

  const provider = getEmailProvider();
  const from = process.env.EMAIL_FROM;
  const apiKey = process.env.RESEND_API_KEY;
  // Destinataire VERROUILLÉ : jamais fourni par l'appelant.
  const lockedTo = process.env.CONTACT_NOTIFY_TO || process.env.EMAIL_REPLY_TO || "";

  const config = {
    EMAIL_PROVIDER_value: process.env.EMAIL_PROVIDER || "(ABSENTE → repli console)",
    providerSelected: provider.name,
    EMAIL_FROM_present: Boolean(from),
    EMAIL_FROM_domain: domainOf(from),
    EMAIL_FROM_hasDisplayName: Boolean(from && from.includes("<")),
    RESEND_API_KEY_present: Boolean(apiKey),
    RESEND_API_KEY_prefix: apiKey ? apiKey.slice(0, 3) : null,
    RESEND_API_KEY_length: apiKey ? apiKey.length : 0,
    CONTACT_NOTIFY_TO_present: Boolean(process.env.CONTACT_NOTIFY_TO),
    EMAIL_REPLY_TO_present: Boolean(process.env.EMAIL_REPLY_TO),
    APP_URL: process.env.APP_URL || "(absente)",
    SMTP_HOST_present: Boolean(process.env.SMTP_HOST),
    nodeEnv: process.env.NODE_ENV || null,
  };

  let testSend: unknown = "non demandé (ajouter ?send=1)";
  if (doSend) {
    if (!lockedTo) {
      testSend = { skipped: "aucun destinataire interne configuré (CONTACT_NOTIFY_TO / EMAIL_REPLY_TO)" };
    } else {
      const { html, text } = renderEmail({
        preheader: "Diagnostic e-mail ARCADINS",
        heading: "Diagnostic d'infrastructure e-mail",
        intro: "Envoi de test synchrone.",
        paragraphs: ["Si vous recevez cet e-mail, le fournisseur accepte et délivre correctement."],
        cta: { label: "Ouvrir le site", url: process.env.APP_URL || "https://arcadins-official.vercel.app" },
      });
      // Envoi SYNCHRONE : on veut l'erreur brute du fournisseur dans la réponse.
      testSend = await provider.send({
        to: lockedTo,
        subject: "Diagnostic ARCADINS — test d'envoi",
        body: text,
        html,
      });
    }
  }

  return NextResponse.json({ config, testSend }, { headers: { "Cache-Control": "no-store" } });
}
