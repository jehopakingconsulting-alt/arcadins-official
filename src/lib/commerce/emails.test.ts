import { test } from "node:test";
import assert from "node:assert/strict";
import { buildEnrollmentEmail, sendEnrollmentEmail } from "./emails.ts";
import type { EmailProvider, DeliveryResult, EmailMessage } from "../notifications/provider.ts";

const ctx = { to: "jean@email.com", fullName: "Jean Dupont", programName: "TEF Canada", packageName: "Essential", amountLabel: "197,00 $ US", dashboardUrl: "https://x/dashboard", orderReference: "ORD-TEF-abc" };

test("payment_confirmation : sujet + contenu contextualisés", () => {
  const m = buildEnrollmentEmail("payment_confirmation", ctx)!;
  assert.match(m.subject, /Paiement confirmé/);
  assert.match(m.body, /TEF Canada/);
  assert.match(m.body, /197,00 \$ US/);
  assert.equal(m.to, "jean@email.com");
});

test("enrollment_confirmation : accès immédiat + lien espace", () => {
  const m = buildEnrollmentEmail("enrollment_confirmation", { ...ctx, accessExpiresLabel: "2026-12-31" })!;
  assert.match(m.body, /activée/);
  assert.match(m.body, /2026-12-31/);
  assert.match(m.body, /dashboard/);
});

test("type inconnu → null", () => {
  // @ts-expect-error test d'un type invalide
  assert.equal(buildEnrollmentEmail("nope", ctx), null);
});

class MockProvider implements EmailProvider {
  readonly name = "mock";
  sent: EmailMessage[] = [];
  mode: "ok" | "throw";
  constructor(mode: "ok" | "throw" = "ok") {
    this.mode = mode;
  }
  async send(m: EmailMessage): Promise<DeliveryResult> {
    if (this.mode === "throw") throw new Error("boom");
    this.sent.push(m);
    return { status: "sent", provider: this.name };
  }
}

test("sendEnrollmentEmail : succès via provider mock", async () => {
  const p = new MockProvider("ok");
  const out = await sendEnrollmentEmail("program_access", ctx, p);
  assert.equal(out.attempted, true);
  assert.equal(out.result?.status, "sent");
  assert.equal(p.sent.length, 1);
});

test("sendEnrollmentEmail : échec d'envoi capturé (jamais de throw)", async () => {
  const p = new MockProvider("throw");
  const out = await sendEnrollmentEmail("payment_confirmation", ctx, p);
  assert.equal(out.attempted, true);
  assert.equal(out.result?.status, "failed"); // capturé, pas de rollback
});
