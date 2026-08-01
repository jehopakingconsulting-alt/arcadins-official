import { test, expect, type Page } from "@playwright/test";
import fs from "node:fs";

/**
 * Sprint K3B — examen final RUNTIME (route de test `/learn-preview/exam`). Vérifie le rendu réel branché sur le
 * moteur d'examen (Sprint G) : admissibilité, instructions+acceptation, chronomètre autoritaire, navigation
 * contrôlée, soumission, résultat provisoire, décision finale, progression, absence de fuite (DOM/__NEXT_DATA__),
 * absence de requête externe et d'erreur console, responsive, axe. `?d=det` banque déterministe ; `?d=blocked`
 * non admissible ; `?d=timeout` chronomètre court (expiration).
 */
const AXE_PATH = "node_modules/axe-core/axe.min.js";
const LEAK = /correctOptionId|correctAnswer|answerKey|privateExplanation|reviewerNotes|integritySignals|internalDecisionReason|certificateId|gradingRule|hiddenRubric/i;

async function open(page: Page, query = "") {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(`/learn-preview/exam${query}`);
  await page.addStyleTag({ content: "*,*::before,*::after{transition:none!important;animation:none!important}" });
  const root = page.locator("#final-exam-preview");
  await expect(root).toBeVisible();
  return root;
}

async function acknowledgeAndStart(root: ReturnType<Page["locator"]>) {
  await expect(root.getByText(/admissible à l'examen final/)).toBeVisible();
  await root.getByRole("checkbox").first().check(); // acceptation des règles
  await root.getByRole("button", { name: /Démarrer l'examen/ }).click();
  await expect(root.getByRole("timer")).toBeVisible();
}

/** Répond o0 (bonne réponse) à chaque question, section par section, dans l'ordre séquentiel. */
async function answerAllSections(root: ReturnType<Page["locator"]>, optionIndex: number) {
  // Section courante.
  for (let pass = 0; pass < 2; pass++) {
    const radios = root.getByRole("radio");
    const count = await radios.count();
    for (let i = optionIndex; i < count; i += 2) await radios.nth(i).check();
    const nextSection = root.getByRole("button", { name: /Section suivante|Stratégie/ });
    if (await nextSection.first().isVisible().catch(() => false)) await nextSection.first().click();
  }
}

test("admissibilité affichée + instructions (variante réelle)", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  const root = await open(page);
  await expect(root.getByRole("heading", { name: /Admissibilité à l'examen final/ })).toBeVisible();
  await expect(root.getByText(/Vous êtes admissible/)).toBeVisible();
  await expect(root.getByText(/Instructions et règles/)).toBeVisible();
  const real = errors.filter((e) => !/websocket|hmr|hot-update|Fast Refresh|_next\/static|React DevTools|Hydration/i.test(e));
  expect(real, `console: ${real.join(" | ")}`).toHaveLength(0);
});

test("refus d'accès si non admissible (variante blocked)", async ({ page }) => {
  const root = await open(page, "?d=blocked");
  await expect(root.getByText(/n'êtes pas encore admissible/)).toBeVisible();
  await expect(root.getByRole("button", { name: /Démarrer l'examen/ })).toHaveCount(0);
});

test("acceptation OBLIGATOIRE des règles : démarrage désactivé tant que non acceptée", async ({ page }) => {
  const root = await open(page);
  const start = root.getByRole("button", { name: /Démarrer l'examen/ });
  await expect(start).toBeDisabled();
  await root.getByRole("checkbox").first().check();
  await expect(start).toBeEnabled();
});

test("démarrage : chronomètre autoritaire visible + 1re question", async ({ page }) => {
  const root = await open(page, "?d=det");
  await acknowledgeAndStart(root);
  await expect(root.getByTestId("exam-time-remaining")).toBeVisible();
  await expect(root.getByRole("group").first()).toBeVisible();
});

test("navigation clavier + réponse + navigation interdite refusée (sans changement de section)", async ({ page }) => {
  const root = await open(page, "?d=det");
  await acknowledgeAndStart(root);
  await root.getByRole("radio").first().focus();
  await page.keyboard.press("Space");
  await expect(root.getByRole("radio").first()).toBeChecked();
  // Aller à la section 2 (autorisé), puis tenter de revenir (interdit : allowBacktrack=false).
  await root.getByRole("button", { name: /Stratégie/ }).click();
  await expect(root.getByText(/Section 2 — question déterministe/).first()).toBeVisible();
  await root.getByRole("button", { name: /Fondamentaux/ }).click();
  await expect(root.getByText(/Navigation non autorisée/)).toBeVisible();
  await expect(root.getByText(/Section 2 — question déterministe/).first()).toBeVisible(); // toujours section 2
});

test("soumission → résultat provisoire → décision finale + progression", async ({ page }) => {
  const root = await open(page, "?d=det");
  await acknowledgeAndStart(root);
  await answerAllSections(root, 0); // toutes bonnes réponses
  await root.getByRole("button", { name: /^Soumettre l'examen/ }).click();
  await root.getByRole("button", { name: /Confirmer la soumission/ }).click();
  await expect(root.getByRole("heading", { name: /Résultat provisoire/ })).toBeVisible();
  await expect(root.getByText(/Résultat PROVISOIRE/)).toBeVisible();
  // Décision finale.
  await root.getByRole("button", { name: /Décision finale/ }).click();
  await expect(root.getByRole("heading", { name: /Décision finale/ })).toBeVisible();
  await expect(root.getByText(/Examen réussi/).first()).toBeVisible();
  await expect(root.getByTestId("certificate-eligibility")).toBeVisible(); // admissible, mais AUCUN certificat émis
  await expect(root.locator("#exam-progress-readout")).toContainText(/réussi/);
});

test("expiration : auto-soumission par le chronomètre autoritaire (variante timeout)", async ({ page }) => {
  const root = await open(page, "?d=timeout");
  await acknowledgeAndStart(root);
  // Chronomètre court (2s) : l'auto-soumission se déclenche via le tick.
  await expect(root.getByRole("heading", { name: /Résultat provisoire/ })).toBeVisible({ timeout: 15000 });
});

test("aucune fuite de correction dans le DOM ni __NEXT_DATA__", async ({ page }) => {
  const root = await open(page, "?d=det");
  await acknowledgeAndStart(root);
  await root.getByRole("radio").first().check();
  const html = await page.content();
  expect(LEAK.test(html), "aucune clé privée dans le HTML").toBeFalsy();
  const nextData = await page.evaluate(() => document.getElementById("__NEXT_DATA__")?.textContent ?? "");
  expect(LEAK.test(nextData), "aucune clé privée dans __NEXT_DATA__").toBeFalsy();
  const storage = await page.evaluate(() => JSON.stringify({ ls: { ...localStorage }, ss: { ...sessionStorage } }));
  expect(LEAK.test(storage), "aucune clé privée dans le stockage").toBeFalsy();
});

test("aucune requête réseau externe", async ({ page }) => {
  const external: string[] = [];
  page.on("request", (r) => {
    const u = r.url();
    if (!/^data:|^blob:|localhost|127\.0\.0\.1/.test(u)) external.push(u);
  });
  const root = await open(page, "?d=det");
  await acknowledgeAndStart(root);
  await answerAllSections(root, 0);
  await root.getByRole("button", { name: /^Soumettre l'examen/ }).click();
  await root.getByRole("button", { name: /Confirmer la soumission/ }).click();
  expect(external, `externes: ${external.join(", ")}`).toHaveLength(0);
});

test("axe : 0 violation critique/sérieuse (examen + résultat)", async ({ page }) => {
  const root = await open(page, "?d=det");
  await acknowledgeAndStart(root);
  await page.addScriptTag({ path: AXE_PATH });
  const run = async () => (await page.evaluate(async () => {
    // @ts-expect-error axe global
    return await window.axe.run("#final-exam-preview", { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] } });
  })) as { violations: { id: string; impact: string | null }[] };
  const inExam = await run();
  await answerAllSections(root, 0);
  await root.getByRole("button", { name: /^Soumettre l'examen/ }).click();
  await root.getByRole("button", { name: /Confirmer la soumission/ }).click();
  await expect(root.getByRole("heading", { name: /Résultat provisoire/ })).toBeVisible();
  await page.addScriptTag({ path: AXE_PATH });
  const inResult = await run();
  const blocking = [...inExam.violations, ...inResult.violations].filter((v) => v.impact === "critical" || v.impact === "serious");
  try { fs.mkdirSync("jqa-artifacts", { recursive: true }); fs.writeFileSync("jqa-artifacts/axe-final-exam.json", JSON.stringify(blocking, null, 2)); } catch { /* best-effort */ }
  expect(blocking, `violations: ${blocking.map((v) => `${v.id}(${v.impact})`).join(", ")}`).toHaveLength(0);
});

test("responsive : aucun débordement horizontal (360/390/768/1024/1366/1440/1920)", async ({ page }) => {
  for (const w of [360, 390, 768, 1024, 1366, 1440, 1920]) {
    await page.setViewportSize({ width: w, height: 900 });
    const root = await open(page, "?d=det");
    await acknowledgeAndStart(root);
    const overflow = await root.evaluate((el) => el.scrollWidth - el.clientWidth);
    expect(overflow, `overflow @${w}`).toBeLessThanOrEqual(1);
    await expect(root.getByRole("timer")).toBeVisible();
  }
});
