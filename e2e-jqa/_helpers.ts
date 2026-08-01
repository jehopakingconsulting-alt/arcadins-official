import { type Page, type Locator, expect } from "@playwright/test";

/**
 * Ouvre la preview locale et retourne le conteneur de l'expérience étudiante (`#student-experience`).
 * Les animations sont désactivées (stabilité + prefers-reduced-motion) et les sélecteurs sont scopés à l'UI
 * étudiante — la chrome marketing globale (header/footer du site) est HORS PÉRIMÈTRE J-QA.
 */
export async function openPreview(page: Page): Promise<Locator> {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/learn-preview");
  await page.addStyleTag({ content: "*,*::before,*::after{transition:none!important;animation:none!important;scroll-behavior:auto!important}" });
  const shell = page.locator("#student-experience");
  await expect(shell).toBeVisible();
  await expect(shell.getByText("Données de démonstration")).toBeVisible();
  return shell;
}

export async function switchView(shell: Locator, label: string): Promise<void> {
  await shell.getByRole("button", { name: label, exact: true }).click();
}
