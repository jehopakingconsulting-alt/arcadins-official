import { test } from "node:test";
import assert from "node:assert/strict";
import { buildAuthEmail, buildVerifyUrl, type AuthHookPayload } from "./auth-emails.ts";
import { verifyWebhookSignature, computeSignature } from "./webhook-signature.ts";

const SUPA = "https://banhxhbmepsbaxhjydjd.supabase.co";

function payload(type: string, extra: Partial<AuthHookPayload["email_data"]> = {}): AuthHookPayload {
  return {
    user: { id: "u1", email: "etudiant@example.com" },
    email_data: {
      token: "123456",
      token_hash: "hash_abc",
      redirect_to: "https://arcadins-official.vercel.app/auth/update-password",
      email_action_type: type,
      ...extra,
    },
  };
}

// ── URL de vérification ──────────────────────────────────────────────────────
test("buildVerifyUrl : construit l'URL Supabase avec jeton, type et redirection", () => {
  const u = buildVerifyUrl(SUPA, "hash_abc", "recovery", "https://app.test/x");
  assert.match(u, /^https:\/\/banhxhbmepsbaxhjydjd\.supabase\.co\/auth\/v1\/verify\?/);
  assert.match(u, /token=hash_abc/);
  assert.match(u, /type=recovery/);
  assert.match(u, /redirect_to=https%3A%2F%2Fapp\.test%2Fx/);
});

test("buildVerifyUrl : sans redirection", () => {
  const u = buildVerifyUrl(SUPA + "/", "h", "signup");
  assert.doesNotMatch(u, /redirect_to/);
  assert.doesNotMatch(u, /\.co\/\/auth/); // pas de double slash
});

// ── Construction des e-mails ─────────────────────────────────────────────────
test("recovery : sujet, destinataire, lien de vérification et HTML", () => {
  const m = buildAuthEmail(payload("recovery"), SUPA);
  assert.ok(m);
  assert.equal(m.to, "etudiant@example.com");
  assert.match(m.subject, /Réinitialisation/i);
  assert.match(m.html as string, /auth\/v1\/verify/);
  assert.match(m.html as string, /type=recovery/);
  assert.match(m.body, /Choisir un nouveau mot de passe/);
});

test("signup : e-mail de confirmation d'inscription", () => {
  const m = buildAuthEmail(payload("signup"), SUPA);
  assert.ok(m);
  assert.match(m.subject, /Confirmez votre inscription/i);
  assert.match(m.html as string, /type=signup/);
});

test("magiclink : lien de connexion", () => {
  const m = buildAuthEmail(payload("magiclink"), SUPA);
  assert.ok(m);
  assert.match(m.subject, /lien de connexion/i);
});

test("invite : invitation", () => {
  const m = buildAuthEmail(payload("invite"), SUPA);
  assert.ok(m);
  assert.match(m.subject, /invité/i);
});

test("email_change : l'e-mail part vers la NOUVELLE adresse", () => {
  const p = payload("email_change");
  p.user.new_email = "nouvelle@example.com";
  const m = buildAuthEmail(p, SUPA);
  assert.ok(m);
  assert.equal(m.to, "nouvelle@example.com");
});

test("reauthentication : contient le CODE et aucun lien de vérification", () => {
  const m = buildAuthEmail(payload("reauthentication"), SUPA);
  assert.ok(m);
  assert.match(m.body, /123456/);
  assert.doesNotMatch(m.html as string, /auth\/v1\/verify/);
});

test("payload sans destinataire → null", () => {
  const p = payload("recovery");
  p.user.email = undefined;
  assert.equal(buildAuthEmail(p, SUPA), null);
});

test("payload sans jeton (action nécessitant un lien) → null", () => {
  const p = payload("recovery", { token_hash: undefined });
  assert.equal(buildAuthEmail(p, SUPA), null);
});

test("type d'action inconnu → null", () => {
  assert.equal(buildAuthEmail(payload(""), SUPA), null);
});

// ── Signature du webhook ─────────────────────────────────────────────────────
const SECRET = "v1,whsec_" + Buffer.from("arcadins-secret-de-test-0123456789").toString("base64");
const NOW = 1_800_000_000_000; // horloge fixe
const TS = String(Math.floor(NOW / 1000));
const BODY = JSON.stringify({ hello: "world" });
const ID = "msg_1";

test("signature valide → acceptée", () => {
  const sig = computeSignature(BODY, ID, TS, SECRET);
  const r = verifyWebhookSignature({
    rawBody: BODY, webhookId: ID, webhookTimestamp: TS,
    webhookSignature: `v1,${sig}`, secret: SECRET, now: () => NOW,
  });
  assert.equal(r.valid, true);
});

test("corps modifié → rejetée", () => {
  const sig = computeSignature(BODY, ID, TS, SECRET);
  const r = verifyWebhookSignature({
    rawBody: JSON.stringify({ hello: "pirate" }), webhookId: ID, webhookTimestamp: TS,
    webhookSignature: `v1,${sig}`, secret: SECRET, now: () => NOW,
  });
  assert.equal(r.valid, false);
});

test("horodatage trop ancien → rejetée (anti-rejeu)", () => {
  const oldTs = String(Math.floor(NOW / 1000) - 10_000);
  const sig = computeSignature(BODY, ID, oldTs, SECRET);
  const r = verifyWebhookSignature({
    rawBody: BODY, webhookId: ID, webhookTimestamp: oldTs,
    webhookSignature: `v1,${sig}`, secret: SECRET, now: () => NOW,
  });
  assert.equal(r.valid, false);
  assert.match(r.reason as string, /horodatage/);
});

test("en-têtes manquants → rejetée", () => {
  const r = verifyWebhookSignature({
    rawBody: BODY, webhookId: null, webhookTimestamp: null,
    webhookSignature: null, secret: SECRET, now: () => NOW,
  });
  assert.equal(r.valid, false);
});

test("secret absent → rejetée (endpoint inutilisable sans configuration)", () => {
  const r = verifyWebhookSignature({
    rawBody: BODY, webhookId: ID, webhookTimestamp: TS,
    webhookSignature: "v1,x", secret: "", now: () => NOW,
  });
  assert.equal(r.valid, false);
});

test("plusieurs signatures (rotation de secret) → acceptée si l'une correspond", () => {
  const sig = computeSignature(BODY, ID, TS, SECRET);
  const r = verifyWebhookSignature({
    rawBody: BODY, webhookId: ID, webhookTimestamp: TS,
    webhookSignature: `v1,mauvaise v1,${sig}`, secret: SECRET, now: () => NOW,
  });
  assert.equal(r.valid, true);
});
