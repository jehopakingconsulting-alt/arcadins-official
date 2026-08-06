import { NextResponse } from "next/server";
import { getEmailProvider } from "@/lib/notifications/provider.ts";
import { buildAuthEmail, type AuthHookPayload } from "@/lib/notifications/auth-emails.ts";
import { verifyWebhookSignature } from "@/lib/notifications/webhook-signature.ts";

/**
 * SEND EMAIL HOOK de Supabase Auth.
 *
 * Supabase appelle cet endpoint au lieu d'envoyer lui-même les e-mails
 * d'authentification (confirmation d'inscription, réinitialisation de mot de
 * passe, lien magique, changement d'adresse, invitation). Nous les envoyons via
 * le fournisseur déjà validé en production, avec la charte ARCADINS.
 *
 * Sécurité : la requête DOIT porter une signature « Standard Webhooks » valide
 * (secret `SEND_EMAIL_HOOK_SECRET`). Sans secret configuré, l'endpoint refuse
 * tout — il ne peut donc pas être détourné pour envoyer des e-mails arbitraires.
 *
 * Contrat : renvoyer 200 = e-mail pris en charge. Tout autre code fait échouer
 * l'action côté Supabase (l'utilisateur voit une erreur), donc on ne renvoie une
 * erreur QUE si l'envoi a réellement échoué.
 */
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  // Corps BRUT : la signature porte sur ces octets exacts (ne jamais re-sérialiser).
  const rawBody = await request.text();

  const check = verifyWebhookSignature({
    rawBody,
    webhookId: request.headers.get("webhook-id"),
    webhookTimestamp: request.headers.get("webhook-timestamp"),
    webhookSignature: request.headers.get("webhook-signature"),
    secret: process.env.SEND_EMAIL_HOOK_SECRET || "",
  });
  if (!check.valid) {
    console.error(`[auth-hook] signature refusée : ${check.reason}`);
    // `reason` est un libellé technique sans donnée sensible ; `secretConfigured`
    // est un simple booléen. Exposés pour rendre l'endpoint diagnosticable en prod
    // (le secret lui-même n'est jamais renvoyé).
    return NextResponse.json(
      {
        error: "unauthorized",
        reason: check.reason,
        secretConfigured: Boolean(process.env.SEND_EMAIL_HOOK_SECRET),
        headersSeen: {
          id: Boolean(request.headers.get("webhook-id")),
          timestamp: Boolean(request.headers.get("webhook-timestamp")),
          signature: Boolean(request.headers.get("webhook-signature")),
        },
      },
      { status: 401 }
    );
  }

  let payload: AuthHookPayload;
  try {
    payload = JSON.parse(rawBody) as AuthHookPayload;
  } catch {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  if (!supabaseUrl) {
    console.error("[auth-hook] NEXT_PUBLIC_SUPABASE_URL manquant");
    return NextResponse.json({ error: "server misconfigured" }, { status: 500 });
  }

  const message = buildAuthEmail(payload, supabaseUrl);
  if (!message) {
    console.error(
      `[auth-hook] payload inexploitable (type=${payload?.email_data?.email_action_type ?? "?"})`
    );
    return NextResponse.json({ error: "unsupported action" }, { status: 400 });
  }

  const provider = getEmailProvider();
  const result = await provider.send(message);
  if (result.status !== "sent") {
    console.error(`[auth-hook] échec d'envoi (${provider.name}) : ${result.error}`);
    return NextResponse.json({ error: "email delivery failed" }, { status: 500 });
  }

  console.log(
    `[auth-hook] envoyé : ${payload.email_data?.email_action_type} → ${message.to} (${provider.name})`
  );
  return NextResponse.json({}, { status: 200 });
}
