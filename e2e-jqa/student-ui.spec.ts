import { test, expect } from "@playwright/test";
import { openPreview, switchView } from "./_helpers";

/**
 * Sprint J-QA — rendu RÉEL, interactions, états et responsive de l'expérience étudiante (données de démo).
 * Serveur `next dev` local ; route `/learn-preview` (test-only). Aucune API de production.
 * Sélecteurs scopés à `#student-experience` (la chrome marketing globale est hors périmètre).
 */

const VIEWS = ["Tableau de bord", "Parcours", "Leçon", "Quiz", "Progression", "Attestations"] as const;

test.describe("Rendu & navigation", () => {
  test("le shell se charge avec identité fictive et badge démo", async ({ page }) => {
    const shell = await openPreview(page);
    await expect(shell.getByText("Étudiant Démo").first()).toBeVisible();
    await expect(shell.getByRole("main")).toBeVisible();
    await expect(shell.getByRole("link", { name: /aller au contenu principal/i })).toBeAttached();
  });

  test("navigation entre les 6 vues principales", async ({ page }) => {
    const shell = await openPreview(page);
    for (const v of VIEWS) {
      await switchView(shell, v);
      await expect(shell.getByRole("button", { name: v, exact: true })).toHaveAttribute("aria-current", "page");
    }
  });

  test("réponse HTTP 200 sur la preview locale", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const resp = await page.goto("/learn-preview");
    expect(resp?.status()).toBe(200);
  });
});

test.describe("Dashboard & progression", () => {
  test("affiche progression, prochaine leçon, recommandations et notifications", async ({ page }) => {
    const shell = await openPreview(page);
    await expect(shell.getByText(/Bonjour, Étudiant Démo/)).toBeVisible();
    await expect(shell.getByRole("progressbar", { name: /Progression globale/ })).toBeVisible();
    await expect(shell.getByRole("heading", { name: "Recommandations" })).toBeVisible();
    await expect(shell.getByRole("heading", { name: "Notifications" })).toBeVisible();
  });

  test("bouton reprendre ouvre le lecteur de leçon", async ({ page }) => {
    const shell = await openPreview(page);
    await shell.getByRole("button", { name: "Reprendre" }).click();
    await expect(shell.getByRole("button", { name: "Marquer comme terminé" })).toBeVisible();
  });
});

test.describe("Parcours", () => {
  test("les modules verrouillés affichent une raison (fournie par la donnée)", async ({ page }) => {
    const shell = await openPreview(page);
    await switchView(shell, "Parcours");
    await shell.getByRole("button", { name: /Module 5/ }).click();
    await expect(shell.getByText(/Terminez le module précédent/).first()).toBeVisible();
  });
});

test.describe("Lecteur de leçon", () => {
  test("rendu du CONTENU RÉEL, objectifs, « terminer » désactivé (serveur autoritaire)", async ({ page }) => {
    const shell = await openPreview(page);
    await switchView(shell, "Leçon");
    // Le lecteur affiche le contenu académique réel (titre de leçon + objectifs + paragraphe rédigé substantiel).
    await expect(shell.getByRole("heading", { name: "Objectifs" })).toBeVisible();
    const article = shell.locator("article");
    const longParagraph = await article.locator("p").evaluateAll((ps) => ps.some((p) => (p.textContent || "").length > 80));
    expect(longParagraph, "au moins un paragraphe de contenu rédigé (réel)").toBe(true);
    await expect(shell.getByRole("button", { name: "Marquer comme terminé" })).toBeDisabled();
  });

  test("ajout d'une note (local, démo)", async ({ page }) => {
    const shell = await openPreview(page);
    await switchView(shell, "Leçon");
    await shell.getByRole("tab", { name: "Notes" }).click();
    await shell.getByPlaceholder("Écrire une note…").fill("Note QA de démonstration");
    await shell.getByRole("button", { name: /Ajouter \(démo\)/ }).click();
    await expect(shell.getByText("Note QA de démonstration")).toBeVisible();
  });

  test("mode concentration bascule et masque la barre latérale", async ({ page }) => {
    const shell = await openPreview(page);
    await switchView(shell, "Leçon");
    await expect(shell.getByRole("tab", { name: "Sommaire" })).toBeVisible();
    await shell.getByRole("button", { name: "Mode concentration" }).click();
    await expect(shell.getByRole("tab", { name: "Sommaire" })).toHaveCount(0);
  });
});

test.describe("Quiz formatif", () => {
  test("répondre, soumettre (confirmation) et voir le résultat — score corrigé serveur", async ({ page }) => {
    const shell = await openPreview(page);
    await switchView(shell, "Quiz");
    await shell.getByRole("radio").first().check();
    await shell.getByRole("button", { name: /Suivant/ }).click();
    await shell.getByRole("button", { name: /Suivant/ }).click();
    await shell.getByRole("button", { name: "Soumettre" }).click();
    await expect(page.getByRole("dialog", { name: /Soumettre le quiz/ })).toBeVisible();
    await page.getByRole("button", { name: "Confirmer" }).click();
    await expect(shell.getByRole("heading", { name: "Résultat" })).toBeVisible();
    await expect(shell.getByText("75%")).toBeVisible();
  });
});

test.describe("Attestations & badges", () => {
  test("attestation avec réf. masquée + badges (obtenus/verrouillés)", async ({ page }) => {
    const shell = await openPreview(page);
    await switchView(shell, "Attestations");
    await expect(shell.getByText("Attestation de réussite ARCADINS").first()).toBeVisible();
    await expect(shell.getByText(/••••/).first()).toBeVisible();
    await expect(shell.getByRole("heading", { name: "Badges", exact: true })).toBeVisible();
  });
});

test.describe("Responsive — 6 dimensions, aucun débordement horizontal du shell", () => {
  const viewports = [
    { name: "mobile-360", width: 360, height: 800 },
    { name: "mobile-390", width: 390, height: 844 },
    { name: "tablet-768", width: 768, height: 1024 },
    { name: "laptop-1366", width: 1366, height: 768 },
    { name: "desktop-1440", width: 1440, height: 900 },
    { name: "wide-1920", width: 1920, height: 1080 },
  ];
  for (const vp of viewports) {
    test(`${vp.name} (${vp.width}×${vp.height}) : pas de scroll horizontal`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      const shell = await openPreview(page);
      const overflow = await shell.evaluate((el) => el.scrollWidth - el.clientWidth);
      expect(overflow, `débordement horizontal du shell à ${vp.width}px`).toBeLessThanOrEqual(1);
    });
  }
});

test.describe("Réseau — aucune API de production", () => {
  test("aucune requête vers un domaine externe pendant la démo", async ({ page }) => {
    const external: string[] = [];
    page.on("request", (r) => {
      const url = r.url();
      if (!url.startsWith("http://localhost") && !url.startsWith("data:") && !url.startsWith("blob:")) external.push(url);
    });
    const shell = await openPreview(page);
    await shell.getByRole("button", { name: "Reprendre" }).click();
    expect(external, `requêtes externes: ${external.join(" | ")}`).toHaveLength(0);
  });
});
