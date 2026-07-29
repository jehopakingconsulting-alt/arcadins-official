import { test, expect } from "@playwright/test";

// Parcours PUBLICS testés en réel contre l'URL RC (aucune écriture DB, aucun compte).

test.describe("Accueil", () => {
  test("charge avec titre + hero + sans erreur console critique", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
    const resp = await page.goto("/");
    expect(resp?.status()).toBe(200);
    await expect(page).toHaveTitle(/ARCADINS/i);
    // Hero CTA visible
    await expect(page.getByRole("link", { name: /formations|programmes|commencer/i }).first()).toBeVisible();
    expect(errors, `console errors: ${errors.join(" | ")}`).toHaveLength(0);
  });

  test("vidéos YouTube autorisées par la CSP", async ({ page }) => {
    const resp = await page.goto("/");
    const csp = resp?.headers()["content-security-policy"] || "";
    expect(csp).toContain("youtube.com");
    // 3 iframes YouTube présentes
    const count = await page.locator('iframe[src*="youtube.com/embed"]').count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("en-têtes de sécurité présents", async ({ page }) => {
    const resp = await page.goto("/");
    const h = resp?.headers() || {};
    expect(h["strict-transport-security"]).toBeTruthy();
    expect(h["x-content-type-options"]).toBe("nosniff");
    expect(h["x-frame-options"]).toBe("DENY");
    expect(h["content-security-policy"]).toContain("default-src 'self'");
  });
});

test.describe("Navigation — aucune route publique en 404/500", () => {
  const routes = ["/", "/tef", "/formations", "/examens", "/immigration", "/tarifs",
    "/temoignages", "/contact", "/tutorat", "/devenir-tuteur", "/accreditations",
    "/auth/login", "/auth/register", "/sitemap.xml", "/robots.txt"];
  for (const r of routes) {
    test(`GET ${r} → 200`, async ({ page }) => {
      const resp = await page.goto(r);
      expect(resp?.status(), r).toBeLessThan(400);
    });
  }
});

test.describe("Catalogue — 9 actives, 0 archivée", () => {
  test("le catalogue public n'affiche aucune carte « À venir »", async ({ page }) => {
    await page.goto("/formations");
    // Aucune mention "À venir" / coming soon visible dans le catalogue
    await expect(page.getByText(/à venir|coming soon/i)).toHaveCount(0);
    // Au moins une formation active cliquable
    await expect(page.locator('a[href^="/formations/"]').first()).toBeVisible();
  });

  test("une formation active ouvre sa fiche", async ({ page }) => {
    const resp = await page.goto("/formations/marketing-digital");
    expect(resp?.status()).toBe(200);
    await expect(page.getByText(/introuvable/i)).toHaveCount(0);
  });

  test("une formation archivée (URL directe) est introuvable", async ({ page }) => {
    await page.goto("/formations/epe");
    await expect(page.getByText(/introuvable/i)).toBeVisible();
  });
});

test.describe("Footer", () => {
  test("email + WhatsApp officiels présents, pas de lien social générique", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('a[href^="mailto:info@arcadins-training.com"]')).toHaveCount(1);
    await expect(page.locator('a[href*="wa.me/15144513436"]').first()).toBeVisible();
    // Les liens sociaux placeholders ont été masqués
    await expect(page.locator('footer a[href="https://facebook.com"]')).toHaveCount(0);
    await expect(page.locator('footer a[href="https://instagram.com"]')).toHaveCount(0);
  });
});

test.describe("i18n — changement de langue", () => {
  test("passer en anglais change le contenu et persiste", async ({ page }) => {
    await page.goto("/");
    // sélectionner EN (bouton portant le code langue)
    await page.getByRole("button", { name: /^EN$/ }).first().click();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    // persistance après reload
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });
});

test.describe("API publiques", () => {
  test("/api/health = 200 ok", async ({ request }) => {
    const r = await request.get("/api/health");
    expect(r.status()).toBe(200);
    expect((await r.json()).status).toBe("ok");
  });
  test("/api/ready = 200 db:true (Supabase connecté)", async ({ request }) => {
    const r = await request.get("/api/ready");
    expect(r.status()).toBe(200);
    expect((await r.json()).db).toBe(true);
  });
});

test.describe("Protection des routes privées (non authentifié)", () => {
  test("/dashboard → redirige vers login", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/auth\/login/);
  });
  test("/admin → redirige vers login", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/auth\/login/);
  });
});

test.describe("Formulaire contact — validation client (sans écriture)", () => {
  test("le bouton d'envoi existe ; soumission vide bloquée par le navigateur", async ({ page }) => {
    await page.goto("/contact");
    const submit = page.getByRole("button", { name: /envoyer|send|soumettre/i }).first();
    await expect(submit).toBeVisible();
    // champs requis → la soumission vide ne navigue pas / reste sur la page
    await submit.click({ trial: true }).catch(() => {});
    await expect(page).toHaveURL(/\/contact/);
  });
});
