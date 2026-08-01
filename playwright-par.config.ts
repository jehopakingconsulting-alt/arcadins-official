import { defineConfig, devices } from "@playwright/test";

/**
 * Config Playwright — Product Acceptance Review (PAR). Audit RÉEL de toutes les pages routables contre un serveur
 * `next dev` LOCAL. La route de preview étudiante `/learn-preview` est active via `LEARN_UI_PREVIEW_LOCAL=1`
 * (jamais en production). Aucune donnée réelle, aucune écriture, aucune API de production ciblée.
 */
const PORT = Number(process.env.PAR_PORT || 3070);
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e-par",
  timeout: 90_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["list"], ["json", { outputFile: "par-artifacts/results.json" }]],
  outputDir: "par-artifacts/test-output",
  use: { baseURL: BASE_URL, trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `next dev -p ${PORT}`,
    url: `${BASE_URL}/`,
    reuseExistingServer: false,
    timeout: 180_000,
    env: { LEARN_UI_PREVIEW_LOCAL: "1", NODE_ENV: "development" },
  },
});
