import { test, expect, type Page } from "@playwright/test";
import { openPreview, switchView } from "./_helpers";

/**
 * Sprint J-QA — sécurité du DOM : aucune donnée de correction / privée n'atteint le HTML, les attributs data-*,
 * les props sérialisées (__NEXT_DATA__) ni le state client. Détection par CLÉS EXACTES (pas de sous-chaîne naïve).
 */

const FORBIDDEN_KEYS = [
  "correctOptionId", "correctOptionIds", "correctAnswer", "correctAnswers", "grading", "privateExplanation",
  "feedbackOnError", "private_state_json", "privateState", "answerKey", "rubricPrivate", "teacherOnly",
  "adminOnly", "internalScore", "scoringKey", "serviceRole", "service_role", "signatureValue", "reviewerNotes",
];

/** Cherche une clé JSON exacte : `"key":` ou `"key\":` (échappé dans __NEXT_DATA__) ou attribut `data-...="...key..."`. */
function keyRegex(key: string): RegExp {
  return new RegExp(`"${key}"\\s*:|\\\\"${key}\\\\"\\s*:|data-[\\w-]+="[^"]*\\b${key}\\b`);
}

async function collectClientSerialized(page: Page): Promise<string> {
  const html = await page.content();
  const nextData = await page.evaluate(() => {
    const el = document.getElementById("__NEXT_DATA__");
    return el?.textContent ?? "";
  });
  const dataAttrs = await page.evaluate(() => {
    const out: string[] = [];
    document.querySelectorAll("*").forEach((n) => {
      for (const a of Array.from(n.attributes)) if (a.name.startsWith("data-")) out.push(`${a.name}=${a.value}`);
    });
    return out.join(" | ");
  });
  return `${html}\n${nextData}\n${dataAttrs}`;
}

function assertNoForbidden(blob: string) {
  for (const key of FORBIDDEN_KEYS) {
    expect(keyRegex(key).test(blob), `clé interdite « ${key} » présente dans le DOM/props`).toBe(false);
  }
}

test("quiz NON soumis : aucune bonne réponse dans le DOM/props", async ({ page }) => {
  const shell = await openPreview(page);
  await switchView(shell, "Quiz");
  await expect(shell.getByRole("radio").first()).toBeVisible();
  assertNoForbidden(await collectClientSerialized(page));
});

test("quiz SOUMIS + résultat visible : aucune donnée de correction exposée", async ({ page }) => {
  const shell = await openPreview(page);
  await switchView(shell, "Quiz");
  await shell.getByRole("radio").first().check();
  await shell.getByRole("button", { name: /Suivant/ }).click();
  await shell.getByRole("button", { name: /Suivant/ }).click();
  await shell.getByRole("button", { name: "Soumettre" }).click();
  await page.getByRole("button", { name: "Confirmer" }).click();
  await expect(shell.getByRole("heading", { name: "Résultat" })).toBeVisible();
  assertNoForbidden(await collectClientSerialized(page));
});

test("leçon (module verrouillé visible) : aucune clé privée", async ({ page }) => {
  const shell = await openPreview(page);
  await switchView(shell, "Parcours");
  await shell.getByRole("button", { name: /Module 5/ }).click();
  assertNoForbidden(await collectClientSerialized(page));
});

test("attestation visible : aucun identifiant interne / secret / signature", async ({ page }) => {
  const shell = await openPreview(page);
  await switchView(shell, "Attestations");
  await expect(shell.getByText("Attestation de réussite ARCADINS").first()).toBeVisible();
  assertNoForbidden(await collectClientSerialized(page));
});

test("preuve : les bonnes réponses ne sont pas dans le state client (window)", async ({ page }) => {
  const shell = await openPreview(page);
  await switchView(shell, "Quiz");
  const leaked = await page.evaluate(() => {
    // Sérialise l'état global accessible au client à la recherche d'une clé de correction.
    const blob = JSON.stringify(Object.keys(window as unknown as Record<string, unknown>));
    return /correctOptionId|correctAnswer|grading|privateExplanation/.test(blob);
  });
  expect(leaked, "aucune clé de correction ne doit exister dans le scope client").toBe(false);
});
