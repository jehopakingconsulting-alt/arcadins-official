import { test } from "node:test";
import assert from "node:assert/strict";
import { parseEnrollmentForm, forfaitsPath, isOfficialProgram } from "./enrollment-session.ts";

const valid = {
  fullName: "Jean Dupont",
  email: "jean@email.com",
  phone: "+33 6 00 00 00 00",
  country: "France",
  objective: "immigration-federal",
  frenchLevel: "intermediaire",
  program: "tef-canada",
  packageChoice: "essential",
  acceptTerms: true,
  newsletter: true,
};

test("formulaire valide accepté + normalisé", () => {
  const r = parseEnrollmentForm(valid);
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.data.fullName, "Jean Dupont");
    assert.equal(r.data.program, "tef-canada");
    assert.equal(r.data.newsletter, true);
  }
});

test("packageChoice par défaut = later ; newsletter par défaut = false", () => {
  const { packageChoice, ...rest } = valid;
  void packageChoice;
  const r = parseEnrollmentForm({ ...rest, newsletter: undefined });
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.data.packageChoice, "later");
    assert.equal(r.data.newsletter, false);
  }
});

test("consentement contractuel OBLIGATOIRE (acceptTerms doit être true)", () => {
  const r = parseEnrollmentForm({ ...valid, acceptTerms: false });
  assert.equal(r.ok, false);
  if (!r.ok) assert.ok(r.errors.acceptTerms);
});

test("email invalide rejeté", () => {
  const r = parseEnrollmentForm({ ...valid, email: "pas-un-email" });
  assert.equal(r.ok, false);
  if (!r.ok) assert.ok(r.errors.email);
});

test("champs requis manquants rejetés", () => {
  const r = parseEnrollmentForm({ acceptTerms: true });
  assert.equal(r.ok, false);
});

test("newsletter reste distinct du consentement contractuel", () => {
  // newsletter=false mais acceptTerms=true → valide (le refus newsletter ne bloque pas).
  const r = parseEnrollmentForm({ ...valid, newsletter: false });
  assert.equal(r.ok, true);
});

test("forfaitsPath : encode l'identifiant de session, pas de donnée perso", () => {
  assert.equal(forfaitsPath("sess_abc123"), "/inscription/forfaits?session=sess_abc123");
});

test("isOfficialProgram : TEF/TCF = true, formation pro = false", () => {
  assert.equal(isOfficialProgram("tef-canada"), true);
  assert.equal(isOfficialProgram("tcf-canada"), true);
  assert.equal(isOfficialProgram("marketing-digital"), false);
});
