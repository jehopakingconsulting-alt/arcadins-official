import { defineConfig, devices } from "@playwright/test";

// Cible de validation = URL RC Vercel (environnement officiel de validation).
// Les parcours PUBLICS sont testés en réel contre cette URL (aucune écriture DB,
// aucune création de compte). Les parcours AUTHENTIFIÉS (e2e/authenticated.spec.ts)
// nécessitent des comptes de test hors prod → gated (test.skip documenté).
const BASE_URL = process.env.E2E_BASE_URL || "https://arcadins-official.vercel.app";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  retries: 1,
  reporter: [["list"]],
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
});
