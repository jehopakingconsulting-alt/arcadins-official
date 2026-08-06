import { NextResponse, after } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { enforceRateLimit } from "@/lib/rate-limit";
import { getEmailProvider } from "@/lib/notifications/provider.ts";
import { buildContactAckEmail, buildContactAdminEmail, type ContactContext } from "@/lib/notifications/contact-emails.ts";

// Formulaire de contact public. Écriture via service role côté serveur (comme
// les autres formulaires) : `contact_requests` a la RLS activée (lecture admin
// uniquement), donc un client anonyme ne peut pas insérer. Rate-limité (anti-spam).
export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rl = await enforceRateLimit(`contact:${ip}`, 5, 60_000);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Trop de soumissions. Réessayez plus tard." }, { status: 429 });
    }

    const data = await request.json();
    const { firstName, lastName, email, country, interest, message } = data;

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from("contact_requests").insert({
      first_name: firstName,
      last_name: lastName,
      email,
      country,
      interest,
      message,
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Erreur base de données" }, { status: 500 });
    }

    // E-mails BEST-EFFORT après la réponse (ne bloquent jamais l'utilisateur et
    // n'échouent jamais la requête). Inertes tant que EMAIL_PROVIDER=console.
    // La source de vérité reste l'enregistrement `contact_requests` déjà écrit.
    const ctx: ContactContext = { firstName, lastName, email, country, interest, message };
    const adminTo = process.env.CONTACT_NOTIFY_TO || process.env.EMAIL_REPLY_TO || "";
    after(async () => {
      const provider = getEmailProvider();
      const jobs: Promise<void>[] = [];
      // Accusé de réception à l'utilisateur.
      jobs.push(
        provider.send(buildContactAckEmail(ctx)).then((r) => {
          if (r.status !== "sent") console.error(`[contact:ack] échec (${provider.name}): ${r.error}`);
        })
      );
      // Notification interne (uniquement si une adresse admin est configurée).
      if (adminTo) {
        jobs.push(
          provider.send(buildContactAdminEmail(ctx, adminTo)).then((r) => {
            if (r.status !== "sent") console.error(`[contact:admin] échec (${provider.name}): ${r.error}`);
          })
        );
      }
      await Promise.allSettled(jobs);
    });

    return NextResponse.json({ success: true, message: "Demande reçue" });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
