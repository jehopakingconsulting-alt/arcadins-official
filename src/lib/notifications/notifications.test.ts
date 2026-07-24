import { test } from "node:test";
import assert from "node:assert/strict";
import { renderEmailTemplate } from "./templates.ts";
import { ConsoleProvider, getEmailProvider, type EmailProvider, type EmailMessage, type DeliveryResult } from "./provider.ts";
import { dispatchExternalEvent } from "./dispatch.ts";
import { parcoursOf, externalAudienceOf } from "./events.ts";

// Fournisseur de capture pour les tests.
class CaptureProvider implements EmailProvider {
  readonly name = "capture";
  sent: EmailMessage[] = [];
  async send(m: EmailMessage): Promise<DeliveryResult> { this.sent.push(m); return { status: "sent", provider: this.name }; }
}
class FailingProvider implements EmailProvider {
  readonly name = "failing";
  async send(): Promise<DeliveryResult> { throw new Error("boom"); }
}

test("les deux confirmations sont DISTINCTES (élève vs tuteur)", () => {
  const student = renderEmailTemplate("tutoring_request_submitted", "fr", { firstName: "Ana" });
  const tutor = renderEmailTemplate("tutor_application_submitted", "fr", { firstName: "Ana" });
  assert.ok(student && tutor);
  assert.notEqual(student!.subject, tutor!.subject);
  assert.match(student!.subject, /demande de tutorat/i);
  assert.match(tutor!.subject, /candidature comme tuteur/i);
  assert.match(student!.body, /^Bonjour Ana,/);
});

test("parcours et audience sont corrects et séparés", () => {
  assert.equal(parcoursOf("tutoring_request_submitted"), "tutoring");
  assert.equal(parcoursOf("tutor_application_submitted"), "tutor");
  assert.equal(externalAudienceOf("tutoring_request_submitted"), "student");
  assert.equal(externalAudienceOf("tutor_application_submitted"), "tutor");
});

test("le fournisseur par défaut (env vide) est la console", () => {
  const p = getEmailProvider({} as NodeJS.ProcessEnv);
  assert.equal(p.name, "console");
  assert.ok(getEmailProvider({ EMAIL_PROVIDER: "resend", RESEND_API_KEY: "x" } as unknown as NodeJS.ProcessEnv).name === "resend");
});

test("dispatch : envoi réussi journalisé 'sent' + notification destinataire", async () => {
  const provider = new CaptureProvider();
  const res = await dispatchExternalEvent(
    { provider },
    { event: "tutoring_request_submitted", relatedId: "req-1", recipientEmail: "a@b.co", firstName: "Ana" },
  );
  assert.equal(res.deliveryLog.status, "sent");
  assert.equal(res.skipped, false);
  assert.equal(provider.sent.length, 1);
  assert.equal(res.recipientNotification?.audience, "student");
  assert.match(res.email!.message.subject, /demande de tutorat/i);
});

test("dispatch : anti-duplication → 'skipped', aucun envoi", async () => {
  const provider = new CaptureProvider();
  const res = await dispatchExternalEvent(
    { provider, alreadySent: () => true },
    { event: "tutor_application_submitted", relatedId: "app-1", recipientEmail: "a@b.co", firstName: "Ana" },
  );
  assert.equal(res.skipped, true);
  assert.equal(res.deliveryLog.status, "skipped");
  assert.equal(provider.sent.length, 0);
});

test("dispatch : erreur fournisseur → 'failed' sans exception", async () => {
  const res = await dispatchExternalEvent(
    { provider: new FailingProvider() },
    { event: "tutor_application_submitted", relatedId: "app-2", recipientEmail: "a@b.co", firstName: "Ana" },
  );
  assert.equal(res.deliveryLog.status, "failed");
  assert.match(res.deliveryLog.error ?? "", /boom/);
});

test("dispatch : sans courriel destinataire → 'skipped' (ignoré)", async () => {
  const res = await dispatchExternalEvent(
    { provider: new ConsoleProvider() },
    { event: "tutoring_request_submitted", relatedId: "req-3", firstName: "Ana" },
  );
  assert.equal(res.deliveryLog.status, "skipped");
});
