# ARCADINS TRAINING CENTER — V2 PRODUCTION SNAPSHOT
**Status: 🟢 APPROVED FOR PUBLIC PRODUCTION — V2 BASELINE FROZEN**
Snapshot date: 2026-08-04 · Production commit: `6dfc922` (origin/master, in sync, clean tree)

> This document is the official close of V2. The V2 application code is **frozen**: no refactor,
> no optimization, no redesign, no new features. All further work happens in V3 (see
> `ARCADINS_V3_MASTER_ROADMAP.md`).

---

## 1. Final Release Summary
ARCADINS Training Center V2 is a bilingual-ready (FR-primary) education platform for French-test
preparation (TEF/TCF Canada) and professional training, targeting immigration to Canada.

**What V2 delivers to the public (live):**
- Marketing + information platform across two clearly separated departments:
  - **Department A — Official Language Programs:** `/tef`, `/tcf`, `/tutorat` (4 competencies × 4 levels).
  - **Department B — Professional Trainings:** 9 formations (`/formations/*`), each with deepened content.
- Transverse public pages: `/`, `/tarifs`, `/examens`, `/immigration`, `/temoignages`, `/accreditations`,
  `/a-propos`, `/faq`, `/guide`, `/blog`, `/contact`, `/devenir-tuteur`.
- Authentication: register, login, **password recovery** (`/auth/reset-password`, `/auth/update-password`).
- Enrollment model **at launch:** lead-generation (admission request via `/contact`). Self-service
  commerce is **built and dormant** (see §6).
- Certification acceptance verdict: all verified defects closed; content honest (no fabricated
  stats/testimonials/claims); WCAG-AA-aligned; strong security headers.

**Release scores at acceptance:** Production Readiness 90/100 · Codebase Health 95 · Security 92 ·
Maintainability 93 · Accessibility 90.

---

## 2. Final Architecture Summary
- **Framework:** Next.js 16.2.11 (App Router, React Server Components) · React 19 · TypeScript (strict).
- **Styling/design system:** Tailwind CSS v4 (`@theme inline` tokens: navy/gold, WCAG-AA contrast tokens).
- **Data/auth:** Supabase (PostgreSQL + Auth + Row-Level Security). 14 SQL migrations (`0000`–`0014`).
- **Payments:** Stripe (Checkout + webhooks) — inline server-priced sessions; BNPL-ready (Klarna/Affirm/Afterpay).
- **Email:** provider abstraction (`console` default, Resend in prod) — `EmailProvider` seam.
- **Hosting:** Vercel (Git-integration auto-deploy on push to `master`).
- **i18n:** custom system, 7 languages (fr/en/es/it/pt/de/ht); FR-primary at launch (switcher flag-gated).
- **Testing:** `node --test --experimental-strip-types` — **740 tests, green**.
- **Key architectural properties:** pure/composable domain logic (commerce, analytics, runtime) decoupled
  from I/O via adapters; feature-flag gating for unreleased subsystems; single-source-of-truth data files.

**Notable subsystems present in the repo:**
- **Commerce engine** (`src/lib/commerce/*`, `src/lib/catalog/*`) — server-authoritative pricing,
  registration-fee logic, checkout plans, entitlement composition. **Flag-gated OFF.**
- **Learning runtime (V3)** (`src/lib/runtime/*`, ~298 files) — exam/assessment, certification
  (incl. cryptographic credentials + QR verification), progress, dashboard. **Dormant** (`LEARNING_RUNTIME_ENABLED=false`).
- **Analytics engine** (`src/lib/analytics/*`) + admin dashboard (`/admin/analytics`).

---

## 3. Final Repository Status
- **Branch:** `master`. **HEAD = origin/master = `6dfc922`.** Working tree clean. In sync with remote.
- **Repo hygiene (verified):** `console.log` = 0 · `debugger` = 0 · `TODO/FIXME/HACK` = 0 in app/components.
  Full ESLint over `src/` = clean (0 unused/dead). `tsc --noEmit` clean. Production build clean.
- **Recommended release tag (not yet created):** `v2.1.0` (public-production-accepted gold master).
  Existing tags: `v1.0.0`…`v1.2.0`, `v2.0.0-production`.
- **Rollback commit:** previous stable tags remain available; immediate rollback target = `cd52a43` (pre-gold-polish) or any prior tag.

---

## 4. Production Deployment Summary
- **Platform:** Vercel project `arcadins-official`. Auto-deploys `master`.
- **Live URL (current):** `https://arcadins-official.vercel.app`.
- **Official domain:** `www.arcadins-training.com` — **currently served by the legacy V1 site on Render**
  (project PREDIKTA). Cutover to V2 is a planned, non-blocking step (see §6 / Deployment checklist).
- **Deploy flow:** `git push origin master` → Vercel build → live (~1–2 min).
- **Post-deploy smoke (standard):** key routes `200`, unknown route `404`, `/tarifs` free of legacy
  claims, `h1=1` per page, 0 console errors.

---

## 5. Production Environment Summary
**Vercel environment variables (present in Production):**
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
`STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`,
`RESEND_API_KEY`, `EMAIL_PROVIDER`, `EMAIL_FROM`, `NEXT_PUBLIC_SITE_URL`, `CRON_SECRET`.

**Feature flags (server/client):**
- `PROGRAM_CHECKOUT_ENABLED` — **OFF** (self-service commerce inactive).
- `NEXT_PUBLIC_PROGRAM_CHECKOUT_ENABLED` — **OFF** (commerce CTAs stay lead-gen).
- `NEXT_PUBLIC_LEARNING_EXPERIENCE_ENABLED` / `LEARNING_RUNTIME_ENABLED` — **OFF** (LMS dormant).
- `NEXT_PUBLIC_MULTILANG_SWITCHER` / `REFERRAL_ENABLED` — **OFF**.

**Pending owner config (non-blocking):**
- **Supabase → Auth → URL Configuration → Redirect URLs:** add `…/auth/update-password`
  (so password-reset *emails* land on the update-password page; pages are already live and correct).

**Database:** migrations `0000`–`0014` in repo. `0014` (program-commerce tables) **applied to prod**.
`0009`/`0011` (academic model / runtime integration) **not applied** (LMS dormant).

---

## 6. Technical Debt Summary (remaining future milestones only)
> None of the below are defects in the live V2 public platform. They are **planned V3+ milestones.**
- **Self-service commerce not activated** — engine built + tested + deployed behind flags; blocked on
  owner Stripe dashboard access (passkey recovery) + test-mode E2E.
- **LMS runtime dormant** — built + tested; requires migrations `0009`/`0011` + flag activation + content.
- **Two enrollment surfaces** (System-1 `enrollments` + `program_enrollments`) — intentional during the
  lead-gen→commerce transition; unify in V3 once commerce is live.
- **Social proof absent** — by design (no fabricated testimonials); populate from real cohorts in V3.
- **Core Web Vitals unmeasured** — recommend one Lighthouse pass; no known perf defect.
- **EN/ES incomplete** — FR-primary launch; full localization is a V3 item.
- **Official domain on V1/Render** — cutover to V2 pending.

---

## 7. Production Backup Checklist
- [ ] **Code:** GitHub `master` is the source of truth; tag each release (`v2.1.0`, …). Vercel retains
      immutable deployments per commit (instant rollback to any prior deploy).
- [ ] **Database:** Supabase is on the **Free plan (no automated backups)**. Before any production write:
      export a logical backup via `pg_dump` (or upgrade to Pro for daily backups + PITR).
- [ ] **Secrets:** store a secure offline copy of all env values (password manager / vault). They are
      **not** in the repo.
- [ ] **Migrations:** `supabase/migrations/*` are versioned in git = reproducible schema.
- [ ] **Content data:** single-source-of-truth data files (`src/lib/data/*`) are in git.

## 8. Disaster Recovery Checklist
- [ ] **Bad deploy:** Vercel → Deployments → promote the last-good deployment (instant), or
      `git revert` + push.
- [ ] **DB corruption/loss:** restore from latest `pg_dump` (Free plan) or PITR (Pro). Re-apply migrations
      `0000`–`0014` on a fresh Supabase project if rebuilding.
- [ ] **Secret leak:** rotate the affected key (Stripe/Supabase/Resend), update Vercel env, redeploy.
- [ ] **Domain/DNS incident:** V1 (Render) remains as a fallback until cutover; keep DNS records documented.
- [ ] **Stripe/webhook outage:** webhook is idempotent + retry-safe; Stripe retries failed deliveries.
- [ ] **RTO/RPO targets (recommended):** RTO ≤ 1h (Vercel rollback), RPO ≤ 24h (daily DB backup on Pro).

## 9. Security Checklist (verified in V2)
- [x] **Headers:** CSP, HSTS (2-yr, preload), X-Frame-Options DENY, X-Content-Type-Options nosniff,
      Referrer-Policy, Permissions-Policy.
- [x] **AuthZ:** RBAC (`src/lib/rbac.ts`), admin routes role-gated + `redirect`.
- [x] **RLS:** Supabase row-level security on user-owned tables (self-read policies).
- [x] **Input validation:** Zod on all public form submissions.
- [x] **Rate limiting:** `src/lib/rate-limit.ts` present.
- [x] **Open-redirect protection:** login `redirect` param sanitized (internal-only).
- [x] **Secrets:** none in repo; server-only service-role usage; publishable keys only on client.
- [x] **Webhook:** Stripe signature verification + idempotency ledger.
- [ ] **Recommended (ongoing):** periodic dependency audit (`npm audit`), secret rotation policy,
      move CSP off `'unsafe-inline'` when feasible (nonces) — V3.

## 10. Maintenance Manual
- **Local dev:** `npm run dev`. **Gates:** `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`.
- **Golden rule:** never merge to `master` unless typecheck + lint + tests + build are all green.
- **Deploy:** push to `master` (Vercel auto-deploys). Always run the post-deploy smoke (§4).
- **Content edits:** change the single-source data files (`src/lib/data/*`, `src/lib/i18n.ts`) — never
  hardcode duplicate values. Every public number has one authoritative source.
- **DB changes:** additive, idempotent, transactional migrations only; staging first; backup + explicit
  authorization before any production write; never destructive SQL on prod.
- **Feature flags:** unreleased subsystems stay OFF until fully tested; document any flag flip.
- **Coding conventions:** pure/composable domain logic + adapters; relative `.ts` imports in node-test
  files; no parameter properties in node-test code; strict typing; no dead code (ESLint enforced).

## 11. Operations Manual
- **Monitoring:** Vercel Analytics/Logs; `/admin/health` (platform config health); `/admin/analytics`
  (revenue/enrollments once commerce is live); `/admin/commerce` (orders/webhook events).
- **Contact/lead intake:** `/contact` → `contact_requests` table → `/admin/contacts`.
- **Admin access:** role `admin` on `profiles`; admin nav gated by permissions.
- **Incident response:** see Disaster Recovery (§8). Email failures are logged and never block a paid
  enrollment (best-effort dispatch).
- **Cron:** `/api/cron/expire-pending` (guarded by `CRON_SECRET`).
- **Support channels (public):** email `info@arcadins-training.com`, phone `+1 (514) 451-3436`, WhatsApp.

## 12. Future V3 Roadmap (pointer)
See the dedicated document **`ARCADINS_V3_MASTER_ROADMAP.md`** for the full milestone plan.

---

## Version boundaries

### ✅ Completed in V2 (frozen)
- Public marketing/information platform (2 departments, all pages).
- TEF & TCF program pages + shared `/tutorat` foundation.
- 9 professional formations with deepened content.
- Authentication + **password recovery**.
- Content integrity (no fabricated stats/testimonials/claims).
- Security hardening (headers, RLS, RBAC, rate-limit, validation).
- Accessibility (1 h1/page, alts, labels, contrast) + responsive (0 overflow).
- SEO (metadata, canonical, OG, JSON-LD, sitemap, robots).
- **Built-but-dormant:** self-service commerce engine (+ BNPL), analytics engine, admin analytics/commerce views, migration `0014`.

### 🔭 Planned for V3 (activation + product depth)
- Self-service commerce activation (Stripe live + BNPL) → payment = enrollment.
- LMS runtime activation (course player, progress, exams, certificates).
- Student dashboard (live), instructor tooling, promotions (coupons/referral wiring).
- Domain cutover to `arcadins-training.com`, full EN/ES localization.

### 🌅 Planned for V4 (scale + intelligence)
- AI tutor / AI study assistant / AI recommendations.
- Native mobile app.
- CRM + marketing automation at scale, multi-tenant / white-label, corporate licensing.

---
*End of V2 Production Snapshot. V2 baseline is frozen as of commit `6dfc922`.*
