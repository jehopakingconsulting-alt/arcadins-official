import { test } from "node:test";
import assert from "node:assert/strict";
import { renderEmailHtml, renderEmailText, renderEmail, escapeHtml } from "./email-template.ts";
import { withRetry, type EmailProvider, type EmailMessage, type DeliveryResult } from "./provider.ts";
import { buildContactAckEmail, buildContactAdminEmail } from "./contact-emails.ts";

// ── Templates ────────────────────────────────────────────────────────────────
test("renderEmailHtml : contient le titre, le préheader, le CTA et le pied de page", () => {
  const html = renderEmailHtml({
    preheader: "Aperçu inbox",
    heading: "Bonjour le monde",
    paragraphs: ["Un paragraphe."],
    cta: { label: "Cliquer ici", url: "https://arcadins-training.com/x" },
  });
  assert.match(html, /Bonjour le monde/);
  assert.match(html, /Aperçu inbox/);
  assert.match(html, /Cliquer ici/);
  assert.match(html, /https:\/\/arcadins-training\.com\/x/);
  assert.match(html, /ARCADINS/);
  assert.match(html, /^<!doctype html>/);
});

test("renderEmailHtml : échappe le contenu dynamique (anti-injection)", () => {
  const html = renderEmailHtml({ heading: "T", paragraphs: ["<script>alert(1)</script>"] });
  assert.doesNotMatch(html, /<script>alert\(1\)<\/script>/);
  assert.match(html, /&lt;script&gt;/);
});

test("renderEmailHtml : neutralise un href non http/mailto", () => {
  const html = renderEmailHtml({ heading: "T", cta: { label: "x", url: "javascript:alert(1)" } });
  assert.doesNotMatch(html, /javascript:alert/);
});

test("renderEmailText : fallback texte lisible avec titre et CTA", () => {
  const text = renderEmailText({
    heading: "Bonjour",
    paragraphs: ["Ligne 1"],
    cta: { label: "Ouvrir", url: "https://x.test/y" },
  });
  assert.match(text, /BONJOUR/);
  assert.match(text, /Ligne 1/);
  assert.match(text, /Ouvrir : https:\/\/x\.test\/y/);
});

test("renderEmail : produit html ET texte", () => {
  const { html, text } = renderEmail({ heading: "H" });
  assert.ok(html.length > 0 && text.length > 0);
});

test("escapeHtml : caractères spéciaux", () => {
  assert.equal(escapeHtml(`<a href="x">&'`), "&lt;a href=&quot;x&quot;&gt;&amp;&#39;");
});

// ── withRetry ────────────────────────────────────────────────────────────────
class FlakyProvider implements EmailProvider {
  readonly name = "flaky";
  private failuresLeft: number;
  public calls = 0;
  constructor(failuresLeft: number) {
    this.failuresLeft = failuresLeft;
  }
  async send(): Promise<DeliveryResult> {
    this.calls++;
    if (this.failuresLeft > 0) {
      this.failuresLeft--;
      return { status: "failed", provider: this.name, error: "temporaire" };
    }
    return { status: "sent", provider: this.name, id: "ok" };
  }
}

const noSleep = async () => {};
const msg: EmailMessage = { to: "a@b.c", subject: "s", body: "b" };

test("withRetry : réussit à la 2e tentative après un échec", async () => {
  const p = new FlakyProvider(1);
  const r = await withRetry(p, { attempts: 3, sleep: noSleep }).send(msg);
  assert.equal(r.status, "sent");
  assert.equal(r.attempts, 2);
  assert.equal(p.calls, 2);
});

test("withRetry : abandonne après N tentatives et renvoie la dernière erreur", async () => {
  const p = new FlakyProvider(99);
  const r = await withRetry(p, { attempts: 3, sleep: noSleep }).send(msg);
  assert.equal(r.status, "failed");
  assert.equal(r.attempts, 3);
  assert.equal(p.calls, 3);
  assert.equal(r.error, "temporaire");
});

test("withRetry : n'appelle qu'une fois si succès immédiat", async () => {
  const p = new FlakyProvider(0);
  const r = await withRetry(p, { attempts: 3, sleep: noSleep }).send(msg);
  assert.equal(r.status, "sent");
  assert.equal(p.calls, 1);
});

// ── Contact emails ───────────────────────────────────────────────────────────
const contactCtx = {
  firstName: "Marie",
  lastName: "Dupont",
  email: "marie@example.com",
  country: "Haïti",
  interest: "TEF Canada",
  message: "Bonjour, je souhaite des informations.",
};

test("buildContactAckEmail : destiné à l'utilisateur, html + texte", () => {
  const m = buildContactAckEmail(contactCtx);
  assert.equal(m.to, "marie@example.com");
  assert.match(m.subject, /reçu votre message/i);
  assert.ok(m.html && m.html.length > 0);
  assert.match(m.body, /Marie/);
});

test("buildContactAdminEmail : destiné à l'admin, reply-to = utilisateur, récap présent", () => {
  const m = buildContactAdminEmail(contactCtx, "equipe@arcadins-training.com");
  assert.equal(m.to, "equipe@arcadins-training.com");
  assert.equal(m.replyTo, "marie@example.com");
  assert.match(m.subject, /Marie Dupont/);
  assert.match(m.body, /marie@example\.com/);
  assert.match(m.body, /je souhaite des informations/);
});
