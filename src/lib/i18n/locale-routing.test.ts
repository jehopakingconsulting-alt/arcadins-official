import { test } from "node:test";
import assert from "node:assert/strict";
import { stripLocale, withLocale, detectLocale, localeAlternates, isRoutedLocale, toRoutedLocale } from "./locale-routing.ts";

test("stripLocale : préfixe reconnu vs rétro-compatible", () => {
  assert.deepEqual(stripLocale("/fr/faq"), { locale: "fr", path: "/faq" });
  assert.deepEqual(stripLocale("/en"), { locale: "en", path: "/" });
  assert.deepEqual(stripLocale("/faq"), { locale: null, path: "/faq" }, "sans préfixe = inchangé");
  assert.deepEqual(stripLocale("/"), { locale: null, path: "/" });
  assert.deepEqual(stripLocale("/de/x"), { locale: null, path: "/de/x" }, "de non routé → pas un préfixe");
});

test("withLocale : idempotent (ne double pas le préfixe)", () => {
  assert.equal(withLocale("en", "/faq"), "/en/faq");
  assert.equal(withLocale("es", "/"), "/es");
  assert.equal(withLocale("en", "/fr/faq"), "/en/faq", "remplace le préfixe existant");
});

test("detectLocale : cookie > Accept-Language > défaut", () => {
  assert.equal(detectLocale("en-US,en;q=0.9", "es"), "es", "cookie prioritaire");
  assert.equal(detectLocale("en-US,en;q=0.9", null), "en");
  assert.equal(detectLocale("it-IT,it;q=0.9", null), "fr", "it non routé → défaut");
  assert.equal(detectLocale(null, null), "fr");
});

test("localeAlternates : canonical + hreflang complet", () => {
  const a = localeAlternates("https://x.com/", "/faq", "en");
  assert.equal(a.canonical, "https://x.com/en/faq");
  assert.deepEqual(a.languages, {
    fr: "https://x.com/fr/faq", en: "https://x.com/en/faq", es: "https://x.com/es/faq", "x-default": "https://x.com/fr/faq",
  });
  assert.equal(localeAlternates("https://x.com", "/", "fr").canonical, "https://x.com/fr");
});

test("isRoutedLocale / toRoutedLocale", () => {
  assert.equal(isRoutedLocale("fr"), true);
  assert.equal(isRoutedLocale("de"), false);
  assert.equal(toRoutedLocale("ht"), "fr");
  assert.equal(toRoutedLocale("es"), "es");
});
