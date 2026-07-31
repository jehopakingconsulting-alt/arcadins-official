import { test, expect, type Page } from "@playwright/test";

/**
 * Sprint K3-S — sécurité de la FRONTIÈRE serveur→client sur les routes de preview académiques. Prouve
 * qu'aucune VALEUR privée (contenu d'answerKey, explication de banque, sentinelle) n'apparaît dans le HTML,
 * le RSC Flight Payload, __NEXT_DATA__, les scripts, le stockage navigateur ni la console — et que les pages
 * se rendent toujours (non-régression). On scanne les VALEURS privées, pas les noms de clés (qui figurent
 * légitimement dans les blocklists des gardes côté client).
 */

// VALEURS EXCLUSIVEMENT privées : contenu d'answerKey (clés de correction) — retirées par `toPublicCurriculum`
// et jamais présentes dans les banques synthétiques. NB : on n'utilise PAS de texte pédagogique public (ex.
// « AARRR… » figure dans les `keyTakeaways` publics d'une leçon et traverse donc légitimement la frontière).
const PRIVATE_NEEDLES = [
  "1 → sondage (mesurer combien).",
  "2 → entretien (comprendre le pourquoi).",
  "3 → observation (mesurer le comportement réel).",
  "PRIVATE_ANSWER_KEY_SENTINEL_K3S",
  "PRIVATE_CORRECT_OPTION_SENTINEL_K3S",
];

const ROUTES = ["/learn-preview/runtime", "/learn-preview/quiz", "/learn-preview/exam"];

function scan(text: string): string[] {
  return PRIVATE_NEEDLES.filter((n) => text.includes(n));
}

async function collectRscBodies(page: Page, url: string): Promise<string> {
  const bodies: string[] = [];
  page.on("response", async (res) => {
    const ct = (res.headers()["content-type"] ?? "").toLowerCase();
    if (ct.includes("text/html") || ct.includes("text/x-component") || ct.includes("application/json")) {
      try { bodies.push(await res.text()); } catch { /* corps binaire ignoré */ }
    }
  });
  await page.goto(url, { waitUntil: "networkidle" });
  return bodies.join("\n");
}

for (const route of ROUTES) {
  test(`frontière sûre : ${route} — aucune valeur privée (HTML/Flight/__NEXT_DATA__/scripts/storage/console)`, async ({ page }) => {
    const consoleText: string[] = [];
    const errors: string[] = [];
    page.on("console", (m) => { consoleText.push(m.text()); if (m.type() === "error") errors.push(m.text()); });

    const network = await collectRscBodies(page, route);

    const html = await page.content();
    const domHtml = await page.evaluate(() => document.documentElement.innerHTML);
    const nextData = await page.evaluate(() => document.getElementById("__NEXT_DATA__")?.textContent ?? "");
    const scripts = await page.evaluate(() => [...document.querySelectorAll("script")].map((s) => s.textContent ?? "").join("\n"));
    const storage = await page.evaluate(() => JSON.stringify({ ls: { ...localStorage }, ss: { ...sessionStorage } }));

    const surfaces: Record<string, string> = { network, html, domHtml, nextData, scripts, storage, console: consoleText.join("\n") };
    for (const [name, text] of Object.entries(surfaces)) {
      const hits = scan(text);
      expect(hits, `valeur privée dans ${name} @ ${route}: ${hits.join(", ")}`).toHaveLength(0);
    }

    const realErrors = errors.filter((e) => !/websocket|hmr|hot-update|Fast Refresh|_next\/static|React DevTools|Hydration/i.test(e));
    expect(realErrors, `console errors @ ${route}: ${realErrors.join(" | ")}`).toHaveLength(0);
  });
}

test("non-régression : les 3 previews se rendent toujours", async ({ page }) => {
  await page.goto("/learn-preview/runtime");
  await expect(page.locator("#runtime-progress-preview").getByRole("heading", { name: "Ma progression" })).toBeVisible();

  await page.goto("/learn-preview/quiz");
  await expect(page.locator("#quiz-runtime-preview").getByRole("button", { name: /Commencer le quiz/ })).toBeVisible();

  await page.goto("/learn-preview/exam");
  await expect(page.locator("#final-exam-preview").getByRole("heading", { name: /Admissibilité à l'examen final/ })).toBeVisible();
});
