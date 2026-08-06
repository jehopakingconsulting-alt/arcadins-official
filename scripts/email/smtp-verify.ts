/**
 * Envoi d'un e-mail de TEST via le fournisseur configuré (EMAIL_PROVIDER).
 * À exécuter par le propriétaire avec ses secrets — l'IA n'a pas accès aux clés.
 *
 * Exemples :
 *   EMAIL_PROVIDER=resend RESEND_API_KEY=re_xxx EMAIL_FROM="ARCADINS <no-reply@arcadins-training.com>" \
 *     npm run email:test -- --to=vous@gmail.com
 *
 *   EMAIL_PROVIDER=smtp SMTP_HOST=smtp.resend.com SMTP_PORT=587 SMTP_USER=resend SMTP_PASS=re_xxx \
 *     EMAIL_FROM="ARCADINS <no-reply@arcadins-training.com>" npm run email:test -- --to=vous@gmail.com
 *
 * Critère de succès = l'e-mail est REÇU dans la boîte, OUVRABLE, et le lien CTA fonctionne.
 */
import { getEmailProvider } from "../../src/lib/notifications/provider.ts";
import { renderEmail } from "../../src/lib/notifications/email-template.ts";

function arg(name: string): string | undefined {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : undefined;
}

async function main() {
  const to = arg("to");
  if (!to) {
    console.error("Usage : npm run email:test -- --to=adresse@exemple.com");
    process.exit(2);
  }
  const provider = getEmailProvider();
  const stamp = arg("stamp") || "test";
  const appUrl = (process.env.APP_URL || "https://arcadins-official.vercel.app").replace(/\/$/, "");

  console.log(`Fournisseur : ${process.env.EMAIL_PROVIDER || "console"} · From : ${process.env.EMAIL_FROM || "(non défini)"}`);
  console.log(`Destinataire : ${to}`);

  const { html, text } = renderEmail({
    preheader: "E-mail de test ARCADINS — délivrabilité",
    heading: "E-mail de test ARCADINS",
    intro: "Ceci est un envoi de vérification.",
    paragraphs: [
      "Si vous lisez cet e-mail, la configuration SMTP/expéditeur fonctionne.",
      `Repère de ce test : ${stamp}.`,
    ],
    details: [
      { label: "Fournisseur", value: process.env.EMAIL_PROVIDER || "console" },
      { label: "Expéditeur", value: process.env.EMAIL_FROM || "(non défini)" },
    ],
    cta: { label: "Vérifier le lien (ouvrir le site)", url: appUrl },
    footerNote: "Vérifiez : réception (pas en spam), rendu HTML, et que le bouton ouvre bien le site.",
  });

  const result = await provider.send({
    to,
    subject: `Test ARCADINS — ${stamp}`,
    body: text,
    html,
  });

  console.log("Résultat :", JSON.stringify(result));
  if (result.status !== "sent") {
    console.error("ÉCHEC d'envoi. Vérifiez les variables d'environnement et la vérification du domaine.");
    process.exit(1);
  }
  console.log("Envoi accepté par le fournisseur. → Vérifiez maintenant la RÉCEPTION dans la boîte.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
