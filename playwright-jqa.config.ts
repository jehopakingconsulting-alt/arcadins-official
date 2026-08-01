import { defineConfig, devices } from "@playwright/test";

/**
 * Config Playwright dédiée au Sprint J-QA — validation RÉELLE de l'UI étudiante en navigateur (Chromium),
 * contre un serveur `next dev` LOCAL. La route de test `/learn-preview` n'est active que via
 * `LEARN_UI_PREVIEW_LOCAL=1` (jamais en production). Aucune donnée réelle, aucune API de production.
 */
const PORT = Number(process.env.JQA_PORT || 3050);
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e-jqa",
  timeout: 60_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["list"], ["json", { outputFile: "jqa-artifacts/results.json" }]],
  outputDir: "jqa-artifacts/test-output",
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: `next dev -p ${PORT}`,
    url: `${BASE_URL}/learn-preview`,
    reuseExistingServer: false,
    timeout: 180_000,
    env: { LEARN_UI_PREVIEW_LOCAL: "1", NODE_ENV: "development" },
  },
});
