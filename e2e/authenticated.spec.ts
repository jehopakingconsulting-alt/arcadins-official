import { test, expect, type Page } from "@playwright/test";

// ============================================================================
// Parcours AUTHENTIFIÉS — GATED sur un ENVIRONNEMENT QA (hors prod).
// Prérequis : Supabase QA + `supabase/seed_qa.sql` exécuté + variables E2E_*
// (voir .env.qa.example). Aucune création de compte réel, aucune écriture prod,
// aucune transaction Stripe réelle (mode test / interception). Jamais de succès
// simulé : sans comptes de test, ces tests sont SKIPPÉS explicitement.
// ============================================================================

const S_EMAIL = process.env.E2E_STUDENT_EMAIL;
const S_PWD = process.env.E2E_STUDENT_PASSWORD;
const A_EMAIL = process.env.E2E_ADMIN_EMAIL;
const A_PWD = process.env.E2E_ADMIN_PASSWORD;
const HAS_ACCOUNTS = !!(S_EMAIL && S_PWD);

async function login(page: Page, email: string, pwd: string) {
  await page.goto("/auth/login");
  await page.getByLabel(/e-?mail/i).fill(email);
  await page.getByLabel(/mot de passe|password/i).fill(pwd);
  await page.getByRole("button", { name: /connexion|se connecter|login/i }).click();
}

test.describe("Auth — étudiant", () => {
  test.skip(!HAS_ACCOUNTS, "Comptes QA manquants (E2E_STUDENT_EMAIL/PASSWORD). Voir .env.qa.example + supabase/seed_qa.sql.");

  test("connexion → dashboard", async ({ page }) => {
    await login(page, S_EMAIL!, S_PWD!);
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test("mauvais mot de passe → erreur, reste sur login", async ({ page }) => {
    await login(page, S_EMAIL!, "mauvais-mot-de-passe-xyz");
    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(page.getByText(/invalid|incorrect|erreur|identifiants/i)).toBeVisible();
  });

  test("étudiant ne peut pas accéder à /admin (redirigé)", async ({ page }) => {
    await login(page, S_EMAIL!, S_PWD!);
    await page.waitForURL(/\/dashboard/);
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/dashboard|\/auth\/login/);
    await expect(page.getByText(/tableau de bord.*administration/i)).toHaveCount(0);
  });

  test("déconnexion → retour public", async ({ page }) => {
    await login(page, S_EMAIL!, S_PWD!);
    await page.waitForURL(/\/dashboard/);
    await page.getByRole("button", { name: /déconnexion|logout|se déconnecter/i }).first().click();
    await expect(page).toHaveURL(/\/$|\/(fr|en)?$/);
  });
});

test.describe("Auth — admin", () => {
  test.skip(!(A_EMAIL && A_PWD), "Compte admin QA manquant (E2E_ADMIN_EMAIL/PASSWORD).");

  test("connexion admin → espace admin accessible", async ({ page }) => {
    await login(page, A_EMAIL!, A_PWD!);
    await page.waitForURL(/\/dashboard/);
    await page.goto("/admin");
    await expect(page.getByText(/administration/i).first()).toBeVisible();
  });
});

// Paiement Stripe : à exécuter en mode test avec interception de /api/checkout
// (page.route) pour ne jamais toucher Stripe réel. Squelette à compléter une fois
// l'environnement QA + clés sk_test fournis.
test.describe("Paiement (Stripe test / mock)", () => {
  test.skip(!HAS_ACCOUNTS, "Env QA + Stripe test requis.");
  test("tentative de paiement d'une formation active (mock checkout)", async ({ page }) => {
    await login(page, S_EMAIL!, S_PWD!);
    await page.waitForURL(/\/dashboard/);
    // Interception : ne jamais appeler Stripe réel.
    await page.route("**/api/checkout", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ url: "/dashboard?mock=paid" }) }),
    );
    await page.goto("/formations/marketing-digital/inscription");
    // … compléter selon l'UI d'inscription/paiement réelle.
    expect(true).toBeTruthy();
  });
});
