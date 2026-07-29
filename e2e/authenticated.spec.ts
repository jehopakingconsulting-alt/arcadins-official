import { test, expect } from "@playwright/test";

// ============================================================================
// Parcours AUTHENTIFIÉS (étudiant / tuteur / admin) + Stripe.
// GATED : ces tests exigent un ENVIRONNEMENT DE TEST HORS PRODUCTION avec des
// comptes seed (E2E_STUDENT_EMAIL/PASSWORD, E2E_ADMIN_EMAIL/PASSWORD, …) et un
// Stripe en mode test. On NE crée PAS de compte réel ni n'écrit en prod, et on
// NE simule PAS un succès. Tant que E2E_STUDENT_EMAIL n'est pas fourni, ils sont
// SKIPPÉS explicitement (jamais faussement verts).
// ============================================================================

const HAS_TEST_ACCOUNTS = !!process.env.E2E_STUDENT_EMAIL && !!process.env.E2E_STUDENT_PASSWORD;

test.describe("Parcours authentifiés (gated sur comptes de test)", () => {
  test.skip(!HAS_TEST_ACCOUNTS,
    "Comptes de test manquants (E2E_STUDENT_EMAIL/PASSWORD, E2E_ADMIN_EMAIL/PASSWORD). " +
    "Fournir un projet Supabase de test + comptes seed hors prod pour activer ces parcours.");

  test("connexion étudiant → dashboard", async ({ page }) => {
    await page.goto("/auth/login");
    await page.getByLabel(/e-?mail/i).fill(process.env.E2E_STUDENT_EMAIL!);
    await page.getByLabel(/mot de passe|password/i).fill(process.env.E2E_STUDENT_PASSWORD!);
    await page.getByRole("button", { name: /connexion|se connecter|login/i }).click();
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test("mauvais mot de passe → message d'erreur", async ({ page }) => {
    await page.goto("/auth/login");
    await page.getByLabel(/e-?mail/i).fill(process.env.E2E_STUDENT_EMAIL!);
    await page.getByLabel(/mot de passe|password/i).fill("mauvais-mot-de-passe-xyz");
    await page.getByRole("button", { name: /connexion|se connecter|login/i }).click();
    await expect(page.getByText(/invalid|incorrect|erreur|identifiants/i)).toBeVisible();
  });

  test("étudiant ne peut pas accéder à /admin", async ({ page, context }) => {
    // (login étudiant puis /admin → doit rediriger vers /dashboard)
    await page.goto("/auth/login");
    await page.getByLabel(/e-?mail/i).fill(process.env.E2E_STUDENT_EMAIL!);
    await page.getByLabel(/mot de passe|password/i).fill(process.env.E2E_STUDENT_PASSWORD!);
    await page.getByRole("button", { name: /connexion|se connecter|login/i }).click();
    await page.waitForURL(/\/dashboard/);
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/dashboard/);
    void context;
  });

  // Admin, tuteur, examens, certificats, Stripe (mode test) : à compléter une fois
  // l'environnement de test fourni. Aucune transaction financière réelle.
});
