import { test } from "node:test";
import assert from "node:assert/strict";
import { UI, LANGS } from "./i18n.ts";

test("il y a bien 7 langues déclarées", () => {
  assert.deepEqual(LANGS, ["fr", "en", "es", "it", "pt", "de", "ht"]);
});

test("chaque clé i18n fournit les 7 langues, toutes non vides", () => {
  const incomplete: string[] = [];
  for (const [key, value] of Object.entries(UI)) {
    for (const lang of LANGS) {
      const s = (value as Record<string, string>)[lang];
      if (typeof s !== "string" || s.trim() === "") {
        incomplete.push(`${key}:${lang}`);
      }
    }
  }
  assert.deepEqual(incomplete, [], `traductions manquantes: ${incomplete.join(", ")}`);
});

test("aucune clé n'a de langue superflue hors des 7 attendues", () => {
  const extra: string[] = [];
  for (const [key, value] of Object.entries(UI)) {
    for (const lang of Object.keys(value as Record<string, string>)) {
      if (!(LANGS as string[]).includes(lang)) extra.push(`${key}:${lang}`);
    }
  }
  assert.deepEqual(extra, []);
});
