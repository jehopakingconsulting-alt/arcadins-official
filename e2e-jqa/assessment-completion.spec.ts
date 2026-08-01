import { test, expect, type Page } from "@playwright/test";
import fs from "node:fs";

/**
 * Sprint K3C — bilan d'évaluation (route `/learn-preview/results`). Vérifie le rendu des scénarios
 * déterministes (provisoire/final/révision/reprise/certification), l'absence de certificat/badge/QR, l'absence
 * de donnée privée/code interne dans le DOM, l'accessibilité (axe) et le responsive.
 */
const AXE_PATH = "node_modules/axe-core/axe.min.js";
// Clés privées (insensible à la casse) ; les CODES internes sont vérifiés séparément en SENSIBLE à la casse
// (« FINAL_PASS » interne ≠ statut public « final_pass »).
const FORBIDDEN_KEYS = /reviewerNotes|evaluatorNotes|internalDecisionReason|integritySignals|privateScoreBreakdown|certificateId|"badge"|qrImage|"pdf"/i;
const INTERNAL_CODES = ["FINAL_PASS", "EXAM_BELOW_THRESHOLD", "MANDATORY_QUIZ_NOT_PASSED", "ELIMINATORY_SECTION_FAILED"];

async function open(page: Page, query = "") {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(`/learn-preview/results${query}`);
  await page.addStyleTag({ content: "*,*::before,*::after{transition:none!important;animation:none!important}" });
  const root = page.locator("#completion-preview");
  await expect(root).toBeVisible();
  return root;
}

test("ouverture + navigation entre scénarios (provisoire → final)", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  const root = await open(page, "?d=provisional_pass");
  await expect(root.getByTestId("completion-status")).toContainText("Réussite provisoire");
  // Naviguer vers un autre scénario.
  await root.getByRole("button", { name: "Programme réussi" }).click();
  await expect(root.getByTestId("completion-status")).toContainText("Programme réussi");
  const real = errors.filter((e) => !/websocket|hmr|hot-update|Fast Refresh|_next\/static|React DevTools|Hydration/i.test(e));
  expect(real, `console: ${real.join(" | ")}`).toHaveLength(0);
});

test("réussite finale : admissible certification, AUCUN certificat émis", async ({ page }) => {
  const root = await open(page, "?d=final_pass");
  await expect(root.getByTestId("completion-cert-eligible")).toBeVisible();
  await expect(root.getByText(/Aucun certificat n'a encore été émis/)).toBeVisible();
  // Aucun certificat/badge/QR/PDF réellement rendu.
  await expect(root.getByRole("img")).toHaveCount(0);
  const html = await root.innerHTML();
  expect(/certificateId|qrcode|qr-code|badge-earned|\.pdf/i.test(html)).toBeFalsy();
});

test("révision manuelle en attente", async ({ page }) => {
  const root = await open(page, "?d=manual_review_pending");
  await expect(root.getByTestId("completion-status")).toContainText("Révision manuelle en attente");
});

test("reprise disponible / épuisée", async ({ page }) => {
  let root = await open(page, "?d=retake_available");
  await expect(root.getByTestId("completion-retake")).toContainText("nouvelle tentative");
  root = await open(page, "?d=retake_exhausted");
  await expect(root.getByTestId("completion-status")).toContainText("Reprises épuisées");
});

test("compétences + prochaine action affichées", async ({ page }) => {
  const root = await open(page, "?d=final_pass");
  await expect(root.getByRole("heading", { name: /Compétences/ })).toBeVisible();
  await expect(root.getByTestId("completion-next")).toBeVisible();
});

test("aucune donnée privée ni code interne dans le DOM/__NEXT_DATA__", async ({ page }) => {
  const root = await open(page, "?d=final_pass");
  const html = await page.content();
  const nextData = await page.evaluate(() => document.getElementById("__NEXT_DATA__")?.textContent ?? "");
  expect(FORBIDDEN_KEYS.test(html), "DOM sans clé privée").toBeFalsy();
  expect(FORBIDDEN_KEYS.test(nextData), "__NEXT_DATA__ sans clé privée").toBeFalsy();
  for (const code of INTERNAL_CODES) {
    expect(html.includes(code), `code interne ${code} dans le DOM`).toBeFalsy();
    expect(nextData.includes(code), `code interne ${code} dans __NEXT_DATA__`).toBeFalsy();
  }
  await expect(root).toBeVisible();
});

test("aucune requête réseau externe", async ({ page }) => {
  const external: string[] = [];
  page.on("request", (r) => { const u = r.url(); if (!/^data:|^blob:|localhost|127\.0\.0\.1/.test(u)) external.push(u); });
  const root = await open(page, "?d=final_pass");
  await root.getByRole("button", { name: "Échec provisoire" }).click();
  expect(external, `externes: ${external.join(", ")}`).toHaveLength(0);
});

test("navigation clavier entre scénarios", async ({ page }) => {
  const root = await open(page, "?d=final_pass");
  await root.getByRole("button", { name: "Réussite provisoire" }).focus();
  await page.keyboard.press("Enter");
  await expect(root.getByTestId("completion-status")).toContainText("Réussite provisoire");
});

test("axe : 0 violation critique/sérieuse", async ({ page }) => {
  await open(page, "?d=final_pass");
  await page.addScriptTag({ path: AXE_PATH });
  const res = (await page.evaluate(async () => {
    // @ts-expect-error axe global
    return await window.axe.run("#completion-preview", { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] } });
  })) as { violations: { id: string; impact: string | null }[] };
  const blocking = res.violations.filter((v) => v.impact === "critical" || v.impact === "serious");
  try { fs.mkdirSync("jqa-artifacts", { recursive: true }); fs.writeFileSync("jqa-artifacts/axe-completion.json", JSON.stringify(blocking, null, 2)); } catch { /* best-effort */ }
  expect(blocking, `violations: ${blocking.map((v) => `${v.id}(${v.impact})`).join(", ")}`).toHaveLength(0);
});

test("responsive : aucun débordement (360/390/768/1366/1440/1920)", async ({ page }) => {
  for (const w of [360, 390, 768, 1366, 1440, 1920]) {
    await page.setViewportSize({ width: w, height: 900 });
    const root = await open(page, "?d=final_pass");
    const overflow = await root.evaluate((el) => el.scrollWidth - el.clientWidth);
    expect(overflow, `overflow @${w}`).toBeLessThanOrEqual(1);
  }
});
