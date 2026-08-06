/**
 * Rendu d'e-mails transactionnels : HTML responsive (CSS inline, compatible
 * clients mail) + fallback texte brut. Fonctions PURES et testables — aucun
 * envoi, aucune dépendance runtime. Toute donnée dynamique est échappée.
 */

export interface EmailTemplateInput {
  /** Texte d'aperçu (masqué dans le corps, visible dans la liste d'inbox). */
  preheader?: string;
  heading: string;
  /** Phrase d'accroche sous le titre. */
  intro?: string;
  /** Paragraphes du corps (déjà en texte ; seront échappés). */
  paragraphs?: string[];
  /** Bouton d'action principal. */
  cta?: { label: string; url: string };
  /** Paires clé/valeur affichées en tableau (ex. récap d'une demande). */
  details?: { label: string; value: string }[];
  /** Petite note de bas de corps (avant le pied de page légal). */
  footerNote?: string;
}

const BRAND = {
  name: "ARCADINS Training Center",
  navy: "#0d1b2e",
  gold: "#c9a84c",
  address: "116 Albert Street, Suite 300, Ottawa (Ontario) Canada",
};

export function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** URL sûre pour un href (schémas http/https/mailto uniquement). */
function safeUrl(url: string): string {
  const u = String(url).trim();
  return /^(https?:|mailto:)/i.test(u) ? escapeHtml(u) : "#";
}

export function renderEmailHtml(input: EmailTemplateInput): string {
  const appUrl = (process.env.APP_URL || "https://arcadins-official.vercel.app").replace(/\/$/, "");
  const pre = input.preheader ? escapeHtml(input.preheader) : "";
  const paragraphs = (input.paragraphs || [])
    .map(
      (p) =>
        `<p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#3a4658;">${escapeHtml(p)}</p>`
    )
    .join("");
  const details = input.details?.length
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 20px;border-collapse:collapse;">${input.details
        .map(
          (d) =>
            `<tr><td style="padding:7px 0;font-size:13px;color:#8a94a6;width:38%;vertical-align:top;">${escapeHtml(
              d.label
            )}</td><td style="padding:7px 0;font-size:14px;color:#1c2738;font-weight:600;">${escapeHtml(
              d.value
            )}</td></tr>`
        )
        .join("")}</table>`
    : "";
  const cta = input.cta
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 24px;"><tr><td style="border-radius:9px;background:${BRAND.gold};">
         <a href="${safeUrl(input.cta.url)}" style="display:inline-block;padding:13px 28px;font-size:15px;font-weight:700;color:${BRAND.navy};text-decoration:none;border-radius:9px;">${escapeHtml(
           input.cta.label
         )}</a></td></tr></table>`
    : "";
  const intro = input.intro
    ? `<p style="margin:0 0 18px;font-size:16px;line-height:1.6;color:#1c2738;">${escapeHtml(input.intro)}</p>`
    : "";
  const footerNote = input.footerNote
    ? `<p style="margin:20px 0 0;font-size:12.5px;line-height:1.6;color:#8a94a6;">${escapeHtml(input.footerNote)}</p>`
    : "";

  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${escapeHtml(
    input.heading
  )}</title></head>
<body style="margin:0;padding:0;background:#eef1f5;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${pre}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1f5;padding:24px 12px;">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e7ee;">
      <tr><td style="background:${BRAND.navy};padding:22px 32px;">
        <span style="font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:700;color:#ffffff;letter-spacing:.5px;">ARCADINS</span>
        <span style="font-size:11px;color:${BRAND.gold};letter-spacing:2px;text-transform:uppercase;"> Training Center</span>
      </td></tr>
      <tr><td style="padding:32px;">
        <h1 style="margin:0 0 14px;font-family:Georgia,'Times New Roman',serif;font-size:23px;line-height:1.3;color:${BRAND.navy};">${escapeHtml(
          input.heading
        )}</h1>
        ${intro}${paragraphs}${details}${cta}${footerNote}
      </td></tr>
      <tr><td style="padding:20px 32px;background:#f7f9fc;border-top:1px solid #e2e7ee;">
        <p style="margin:0 0 4px;font-size:12px;color:#8a94a6;">${escapeHtml(BRAND.name)} · ${escapeHtml(
    BRAND.address
  )}</p>
        <p style="margin:0;font-size:12px;color:#8a94a6;">
          <a href="${appUrl}" style="color:#8a94a6;text-decoration:underline;">arcadins-training.com</a> ·
          Cet e-mail vous est envoyé suite à une action effectuée sur notre plateforme.
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

export function renderEmailText(input: EmailTemplateInput): string {
  const appUrl = (process.env.APP_URL || "https://arcadins-official.vercel.app").replace(/\/$/, "");
  const lines: string[] = [];
  lines.push(input.heading.toUpperCase());
  lines.push("");
  if (input.intro) lines.push(input.intro, "");
  for (const p of input.paragraphs || []) lines.push(p, "");
  if (input.details?.length) {
    for (const d of input.details) lines.push(`${d.label} : ${d.value}`);
    lines.push("");
  }
  if (input.cta) lines.push(`${input.cta.label} : ${input.cta.url}`, "");
  if (input.footerNote) lines.push(input.footerNote, "");
  lines.push("—");
  lines.push(`${BRAND.name}`);
  lines.push(BRAND.address);
  lines.push(appUrl);
  return lines.join("\n");
}

/** Construit les deux corps (html + texte) d'un coup. */
export function renderEmail(input: EmailTemplateInput): { html: string; text: string } {
  return { html: renderEmailHtml(input), text: renderEmailText(input) };
}
