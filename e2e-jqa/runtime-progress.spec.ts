import { test, expect, type Page } from "@playwright/test";
import fs from "node:fs";

/**
 * Sprint K2C — visualisation de la progression RUNTIME (route de test `/learn-preview/runtime`).
 * Vérifie le rendu réel des données issues du RuntimeProvider + navigation, l'accessibilité (axe) et le responsive.
 */

const AXE_PATH = "node_modules/axe-core/axe.min.js";

async function open(page: Page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/learn-preview/runtime");
  await page.addStyleTag({ content: "*,*::before,*::after{transition:none!important;animation:none!important}" });
  const root = page.locator("#runtime-progress-preview");
  await expect(root).toBeVisible();
  return root;
}

test("rendu : progression réelle (avancement, module actuel, temps, résumé)", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  const root = await open(page);
  await expect(root.getByRole("heading", { name: "Ma progression" })).toBeVisible();
  await expect(root.getByRole("progressbar", { name: /Avancement global/ })).toBeVisible();
  await expect(root.getByRole("heading", { name: "Module actuel" })).toBeVisible();
  await expect(root.getByRole("heading", { name: "Prochain module" })).toBeVisible();
  await expect(root.getByRole("heading", { name: "Résumé pédagogique" })).toBeVisible();
  await expect(root.getByText(/Temps étudié/)).toBeVisible();
  // Étiquette démonstration présente.
  await expect(root.getByText("Progression de démonstration")).toBeVisible();
  const real = errors.filter((e) => !/websocket|hmr|hot-update|Fast Refresh|_next\/static|React DevTools|Hydration/i.test(e));
  expect(real, `console: ${real.join(" | ")}`).toHaveLength(0);
});

test("avancement global affiché > 0 % (données runtime réelles)", async ({ page }) => {
  const root = await open(page);
  const value = await root.getByRole("progressbar", { name: /Avancement global/ }).getAttribute("aria-valuenow");
  expect(Number(value)).toBeGreaterThan(0);
});

test("axe : 0 violation critique/sérieuse", async ({ page }) => {
  await open(page);
  await page.addScriptTag({ path: AXE_PATH });
  const res = (await page.evaluate(async () => {
    // @ts-expect-error axe global
    return await window.axe.run("#runtime-progress-preview", { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] } });
  })) as { violations: { id: string; impact: string | null }[] };
  const blocking = res.violations.filter((v) => v.impact === "critical" || v.impact === "serious");
  try { fs.mkdirSync("jqa-artifacts", { recursive: true }); fs.writeFileSync("jqa-artifacts/axe-runtime-progress.json", JSON.stringify(res.violations, null, 2)); } catch { /* best-effort */ }
  expect(blocking, `violations: ${blocking.map((v) => `${v.id}(${v.impact})`).join(", ")}`).toHaveLength(0);
});

test("responsive : aucun débordement horizontal (360/768/1440)", async ({ page }) => {
  for (const w of [360, 768, 1440]) {
    await page.setViewportSize({ width: w, height: 900 });
    const root = await open(page);
    const overflow = await root.evaluate((el) => el.scrollWidth - el.clientWidth);
    expect(overflow, `overflow @${w}`).toBeLessThanOrEqual(1);
  }
});
