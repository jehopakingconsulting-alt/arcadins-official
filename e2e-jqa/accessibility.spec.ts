import { test, expect, type Page } from "@playwright/test";
import fs from "node:fs";
import { openPreview, switchView } from "./_helpers";

/**
 * Sprint J-QA — accessibilité RÉELLE via axe-core (déjà présent) injecté dans la page. L'audit est SCOPÉ à
 * `#student-experience` (l'UI construite au Sprint J) : la chrome marketing globale du site (header/footer)
 * est HORS PÉRIMÈTRE et ne doit pas être modifiée. Exigence : zéro violation `critical`/`serious` sur chaque vue.
 */

const AXE_PATH = "node_modules/axe-core/axe.min.js";

interface AxeViolation { id: string; impact: string | null; help: string; nodes: unknown[] }
interface AxeResult { violations: AxeViolation[] }

async function runAxe(page: Page, name: string): Promise<AxeViolation[]> {
  await page.addScriptTag({ path: AXE_PATH });
  const results = (await page.evaluate(async () => {
    // @ts-expect-error axe injecté globalement
    return await window.axe.run("#student-experience", { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] } });
  })) as AxeResult;
  try {
    fs.mkdirSync("jqa-artifacts", { recursive: true });
    fs.writeFileSync(`jqa-artifacts/axe-${name}.json`, JSON.stringify(results.violations, null, 2));
  } catch { /* artefact best-effort */ }
  return results.violations;
}

function blocking(violations: AxeViolation[]): AxeViolation[] {
  return violations.filter((v) => v.impact === "critical" || v.impact === "serious");
}

for (const view of ["Tableau de bord", "Parcours", "Leçon", "Quiz", "Progression", "Attestations"]) {
  test(`axe — ${view} : 0 violation critique/sérieuse`, async ({ page }) => {
    const shell = await openPreview(page);
    if (view !== "Tableau de bord") await switchView(shell, view);
    const violations = await runAxe(page, view.replace(/\s+/g, "-"));
    const critical = blocking(violations);
    expect(critical, `violations bloquantes: ${critical.map((v) => `${v.id}(${v.impact})`).join(", ")}`).toHaveLength(0);
  });
}

test("axe — dialogue de soumission de quiz (modale) : 0 violation critique/sérieuse", async ({ page }) => {
  const shell = await openPreview(page);
  await switchView(shell, "Quiz");
  await shell.getByRole("radio").first().check();
  await shell.getByRole("button", { name: /Suivant/ }).click();
  await shell.getByRole("button", { name: /Suivant/ }).click();
  await shell.getByRole("button", { name: "Soumettre" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  const violations = await runAxe(page, "quiz-dialog");
  expect(blocking(violations)).toHaveLength(0);
});

test("clavier — le lien d'évitement est focusable et devient visible au focus", async ({ page }) => {
  const shell = await openPreview(page);
  const skip = shell.getByRole("link", { name: /aller au contenu principal/i });
  await skip.focus();
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
});

test("clavier — la modale de quiz se ferme avec Échap", async ({ page }) => {
  const shell = await openPreview(page);
  await switchView(shell, "Quiz");
  await shell.getByRole("radio").first().check();
  await shell.getByRole("button", { name: /Suivant/ }).click();
  await shell.getByRole("button", { name: /Suivant/ }).click();
  await shell.getByRole("button", { name: "Soumettre" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
