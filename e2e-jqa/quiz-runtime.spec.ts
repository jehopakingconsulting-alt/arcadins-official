import { test, expect, type Page } from "@playwright/test";
import fs from "node:fs";

/**
 * Sprint K3A — quiz formatif RUNTIME (route de test `/learn-preview/quiz`). Vérifie le rendu réel branché sur
 * le moteur d'évaluation (Sprint F), la navigation, l'accessibilité (axe), le responsive, l'absence de fuite
 * de correction dans le DOM/objets sérialisés, l'absence de requête externe et d'erreur console.
 *
 * `?d=det` : banque synthétique déterministe (bonne réponse = 1re option) pour prouver réussite/échec réels.
 */
const AXE_PATH = "node_modules/axe-core/axe.min.js";
const LEAK = /correctOptionId|correctOptionIds|privateExplanation|feedbackOnError|grading/i;

async function open(page: Page, query = "") {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(`/learn-preview/quiz${query}`);
  await page.addStyleTag({ content: "*,*::before,*::after{transition:none!important;animation:none!important}" });
  const root = page.locator("#quiz-runtime-preview");
  await expect(root).toBeVisible();
  return root;
}

async function startDet(page: Page) {
  const root = await open(page, "?d=det");
  await root.getByRole("button", { name: /Commencer le quiz/ }).click();
  await expect(root.getByRole("group")).toBeVisible(); // fieldset de la 1re question
  return root;
}

/** Répond à toutes les questions déterministes en choisissant la Nième option (0 = bonne réponse). */
async function answerAllDet(page: Page, root: ReturnType<Page["locator"]>, optionIndex: number, count = 3) {
  for (let i = 0; i < count; i++) {
    const radios = root.getByRole("radio");
    await radios.nth(optionIndex).check();
    const nextBtn = root.getByRole("button", { name: /Suivant/ });
    if (await nextBtn.isVisible().catch(() => false)) await nextBtn.click();
  }
}

test("ouverture : écran de démarrage puis 1re question rendue", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  const root = await open(page);
  await expect(root.getByRole("button", { name: /Commencer le quiz/ })).toBeVisible();
  await root.getByRole("button", { name: /Commencer le quiz/ }).click();
  await expect(root.getByRole ? root.getByRole("group") : root).toBeVisible();
  await expect(root.getByRole("progressbar")).toBeVisible();
  const real = errors.filter((e) => !/websocket|hmr|hot-update|Fast Refresh|_next\/static|React DevTools|Hydration/i.test(e));
  expect(real, `console: ${real.join(" | ")}`).toHaveLength(0);
});

test("navigation clavier : sélection puis suivant/précédent", async ({ page }) => {
  const root = await startDet(page);
  await root.getByRole("radio").first().focus();
  await page.keyboard.press("Space"); // coche via clavier
  await expect(root.getByRole("radio").first()).toBeChecked();
  // L'ordre des questions est mélangé par graine : on vérifie que la question CHANGE (pas son numéro).
  const first = (await root.locator("legend").first().textContent())?.trim();
  await root.getByRole("button", { name: /Suivant/ }).click();
  const second = (await root.locator("legend").first().textContent())?.trim();
  expect(second).not.toEqual(first);
  await root.getByRole("button", { name: /Précédent/ }).click();
  await expect(root.locator("legend").first()).toHaveText(first ?? "");
});

test("progression du quiz : la barre reflète les réponses", async ({ page }) => {
  const root = await startDet(page);
  const before = await root.getByRole("progressbar").getAttribute("aria-valuenow");
  await root.getByRole("radio").first().check();
  const after = await root.getByRole("progressbar").getAttribute("aria-valuenow");
  expect(Number(after)).toBeGreaterThan(Number(before));
});

test("soumission incomplète : bouton Soumettre désactivé sans réponse", async ({ page }) => {
  const root = await startDet(page);
  // Aller jusqu'à la dernière question SANS répondre.
  for (let i = 0; i < 2; i++) await root.getByRole("button", { name: /Suivant/ }).click();
  const submit = root.getByRole("button", { name: /Soumettre/ });
  await expect(submit).toBeDisabled();
});

test("résultat RÉUSSI (réponses correctes) + progression mise à jour", async ({ page }) => {
  const root = await startDet(page);
  await answerAllDet(page, root, 0); // 1re option = bonne réponse
  await root.getByRole("button", { name: /Soumettre/ }).click();
  await root.getByRole("button", { name: /Confirmer/ }).click();
  await expect(root.getByRole("heading", { name: /Résultat/ })).toBeVisible();
  await expect(root.getByText("100%", { exact: true })).toBeVisible();
  await expect(root.getByText(/score 100%/)).toBeVisible(); // lecture de progression runtime
});

test("résultat ÉCHOUÉ (réponses fausses) + reprise proposée", async ({ page }) => {
  const root = await startDet(page);
  await answerAllDet(page, root, 1); // 2e option = mauvaise réponse
  await root.getByRole("button", { name: /Soumettre/ }).click();
  await root.getByRole("button", { name: /Confirmer/ }).click();
  await expect(root.getByText("0%", { exact: true })).toBeVisible();
  await expect(root.getByRole("button", { name: /Reprendre le quiz/ })).toBeVisible();
});

test("reprise : relance un nouveau quiz jouable", async ({ page }) => {
  const root = await startDet(page);
  await answerAllDet(page, root, 1);
  await root.getByRole("button", { name: /Soumettre/ }).click();
  await root.getByRole("button", { name: /Confirmer/ }).click();
  await root.getByRole("button", { name: /Reprendre le quiz/ }).click();
  await expect(root.getByRole("group")).toBeVisible(); // un nouveau quiz jouable (fieldset de question)
  await expect(root.locator("legend").first()).toContainText("Question déterministe");
});

test("aucune fuite de correction dans le DOM ni __NEXT_DATA__", async ({ page }) => {
  const root = await startDet(page);
  await root.getByRole("radio").first().check();
  const html = await page.content();
  expect(LEAK.test(html), "aucune clé de correction dans le HTML").toBeFalsy();
  const nextData = await page.evaluate(() => {
    const el = document.getElementById("__NEXT_DATA__");
    return el ? el.textContent ?? "" : "";
  });
  expect(LEAK.test(nextData), "aucune clé de correction dans __NEXT_DATA__").toBeFalsy();
  // Aucune bonne réponse marquée dans les options rendues.
  const optionAttrs = await page.evaluate(() =>
    [...document.querySelectorAll("input[type=radio],input[type=checkbox]")].map((i) => i.outerHTML).join(""),
  );
  expect(/correct|answer|isCorrect/i.test(optionAttrs)).toBeFalsy();
});

test("aucune requête réseau externe", async ({ page }) => {
  const external: string[] = [];
  page.on("request", (r) => {
    const u = r.url();
    if (!/^data:|^blob:|localhost|127\.0\.0\.1/.test(u)) external.push(u);
  });
  const root = await startDet(page);
  await answerAllDet(page, root, 0);
  await root.getByRole("button", { name: /Soumettre/ }).click();
  await root.getByRole("button", { name: /Confirmer/ }).click();
  expect(external, `externes: ${external.join(", ")}`).toHaveLength(0);
});

test("axe : 0 violation critique/sérieuse (démarrage + question + résultat)", async ({ page }) => {
  const root = await startDet(page);
  await answerAllDet(page, root, 0);
  await root.getByRole("button", { name: /Soumettre/ }).click();
  await root.getByRole("button", { name: /Confirmer/ }).click();
  await expect(root.getByRole("heading", { name: /Résultat/ })).toBeVisible();
  await page.addScriptTag({ path: AXE_PATH });
  const res = (await page.evaluate(async () => {
    // @ts-expect-error axe global
    return await window.axe.run("#quiz-runtime-preview", { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] } });
  })) as { violations: { id: string; impact: string | null }[] };
  const blocking = res.violations.filter((v) => v.impact === "critical" || v.impact === "serious");
  try { fs.mkdirSync("jqa-artifacts", { recursive: true }); fs.writeFileSync("jqa-artifacts/axe-quiz-runtime.json", JSON.stringify(res.violations, null, 2)); } catch { /* best-effort */ }
  expect(blocking, `violations: ${blocking.map((v) => `${v.id}(${v.impact})`).join(", ")}`).toHaveLength(0);
});

test("responsive : aucun débordement horizontal (360/390/768/1366/1440/1920)", async ({ page }) => {
  for (const w of [360, 390, 768, 1366, 1440, 1920]) {
    await page.setViewportSize({ width: w, height: 900 });
    const root = await startDet(page);
    const overflow = await root.evaluate((el) => el.scrollWidth - el.clientWidth);
    expect(overflow, `overflow @${w}`).toBeLessThanOrEqual(1);
    // Le bouton Soumettre/Suivant reste visible.
    await expect(root.getByRole("button").first()).toBeVisible();
  }
});
