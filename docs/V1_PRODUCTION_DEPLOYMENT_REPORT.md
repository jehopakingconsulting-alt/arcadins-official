# ARCADINS Training Center — V1 Production Deployment Report

> Deployment of the frontend architecture improvements (department separation + SEO/security hardening),
> authorized as Option 1. Unfinished backend/features remain flag-gated (404 in prod); the production
> database was **not** touched. Official product name: **ARCADINS Training Center**.

---

## Deployment status: ✅ LIVE & VERIFIED

| Field | Value |
|---|---|
| Status | **Deployed & verified** |
| Deployed commit | **`626e255`** (master), range `a0b69c6..626e255` (24 commits) |
| Git remote | github.com/jehopakingconsulting-alt/arcadins-official |
| Production URL | https://arcadins-official.vercel.app |
| Vercel deployment URL | *auto-created by Vercel Git integration — see Vercel dashboard for the immutable per-deploy URL* |
| Build | Vercel Git-integration build; local `next build` green before push; deploy live in ~48s |
| Previous prod (rollback point) | `a0b69c6` — restorable via Vercel "Promote previous deployment" or `git revert` |
| Database | **Untouched** — migration/SQL files shipped as repo files only; nothing applied |

> Note: the immutable Vercel deployment URL and raw build logs live in the Vercel dashboard, which is not
> accessible from this environment. The production URL above is verified live.

---

## Post-deployment verification (run against the live production URL)

**Pages — all HTTP 200 (17/17):** `/`, `/formations`, `/formations/marketing-digital`, `/tef`, `/tcf`,
`/tarifs`, `/examens`, `/immigration`, `/temoignages`, `/contact`, `/faq`, `/a-propos`, `/guide`, `/blog`,
`/tutorat`, `/auth/login`, `/auth/register`.

**Unfinished features safely hidden — all HTTP 404 (5/5):** `/programmes/tef-canada`, `/espace`,
`/apprendre/demo`, `/parrainage`, `/learn-preview`. → confirms `NEXT_PUBLIC_LEARNING_EXPERIENCE_ENABLED`
is **not** enabled in prod and `REFERRAL_ENABLED=false`. Unknown route → 404 (branded not-found).

**Navigation & CTAs:** nav renders **"Programmes officiels" → /tef** and **"Formations professionnelles" →
/formations**; hero CTAs one-per-department; two-department homepage section ("Choisissez votre parcours")
renders with both cards and correct CTAs. No dead links.

**Multilingual routing / SEO:** canonical `https://arcadins-official.vercel.app/fr`; hreflang fr/en/es/x-default;
sitemap.xml = **44 URLs** (incl. the 9 course pages) on the real prod domain with hreflang alternates;
robots.txt references the prod sitemap and allows indexing (disallows /dashboard /admin /api).

**Console:** **0 errors** on the live homepage; branded 404 confirmed on a flag-gated route.

**Responsive:** measured 0 horizontal overflow at 320px pre-deploy on home/formations/tarifs (unchanged in prod).

---

## Not certified in this environment (require the Vercel/provider dashboards or missing tooling)
- **Lighthouse scores** (Performance/SEO/Best-Practices/Accessibility ≥95) — Lighthouse is not runnable here;
  run it against the production URL from Chrome DevTools / PageSpeed Insights to obtain real numbers.
- **Formal axe / WCAG AA** sweep — same (tooling unavailable here).
- **Vercel build logs / immutable deploy URL** — in the Vercel dashboard.
- **`NEXT_PUBLIC_LEARNING_EXPERIENCE_ENABLED` prod env value** — inferred **off** from the 5/5 404s above;
  confirm in Vercel → Settings → Environment Variables.

---

## What is now live (user-visible)
Department separation (Official Language Programs vs Professional Trainings), restructured nav/header/footer,
two-department homepage, corrected CTAs, per-locale routing (/fr /en /es) with hreflang/canonical, per-course
metadata, richer sitemap, branded 404, home JSON-LD. Everything else (V3 learning experience, commerce,
enrollment, dashboards, /programmes catalog, referral) is shipped-but-flag-hidden (404) for Phase 2.

---

## Phase 2 — remaining tasks to reach enterprise 100/100
1. Provision **staging Supabase** + provider credentials (Stripe live, email, storage, Upstash).
2. **Connect Supabase** (apply `0009/0011/0012` on staging → prod; live RLS audit) and wire persistence.
3. **Complete authentication** (providers, reset, session hardening) end-to-end.
4. **Connect Stripe** — live checkout, webhooks, invoices, currency/taxes/receipts/refunds.
5. **Complete enrollment** flows (course + program), duplicate prevention, email confirmation, dashboard sync.
6. **Finish student dashboard** and **instructor dashboard** (wire to live data).
7. **Complete the TEF/TCF ecosystem** and **finish every pricing page** for Department A.
8. **Finish the remaining 8 Professional Trainings** content.
9. **Localization pass**: translate FR-only public content (blog, tcf, a-propos, guide, legal modals) to EN/ES.
10. Run **Lighthouse ≥95** + **axe AA**; add `og:image`; environment-gate robots for previews.
11. When each subsystem is validated on staging, flip its flag per product (progressive go-live).

**Production URL:** https://arcadins-official.vercel.app · **Live commit:** `626e255`.
