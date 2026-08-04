# ARCADINS_PLATFORM_TEMPLATE
**A reusable blueprint to start a NEW education platform from ARCADINS instead of from scratch.**

> Use this to spin up a sibling product (e.g., another training/exam-prep platform) reusing ARCADINS's
> architecture, schema, auth, and conventions — changing only branding, content, and products.

---

## What the template gives you
- **Architecture:** Next.js 16 (App Router/RSC) + TypeScript + Tailwind v4 + Supabase + Stripe + Vercel.
- **Schema:** 14 versioned migrations (`supabase/migrations/0000–0014`) — tenancy seam, catalog/commerce,
  audit log, notifications, roles/RBAC, referrals.
- **Auth:** Supabase email/password + password recovery pages (`/auth/reset-password`, `/auth/update-password`).
- **Commerce engine (flag-gated):** server-authoritative pricing, checkout plans, entitlements, BNPL-ready.
- **Learning runtime (dormant):** assessment/exam, certification (+QR), progress, dashboard.
- **Analytics engine + admin dashboards.**
- **Conventions:** pure domain logic + adapters, single-source data files, i18n (7 langs), flags,
  security headers, RLS, rate-limit, Zod, `node --test`.

## How to fork into a new product
1. **Clone & rename**
   ```bash
   git clone <repo> new-platform && cd new-platform
   # Update package name, README, branding tokens (Tailwind theme in globals.css).
   ```
2. **New backends**
   - Create a fresh Supabase project. Apply migrations in order (`0000 → 0014`) OR restore from a
     template dump. Set env vars from `.env.example`.
   - Create a fresh Stripe account (products defined by inline server pricing — no pre-created price IDs).
3. **Swap content, keep structure**
   - Replace `src/lib/data/*` (programs, plans, program pages) with the new product's catalog.
   - Replace copy in `src/lib/i18n.ts`; keep the key structure.
   - Replace brand colors/logo (design tokens) — do not restructure the design system.
4. **Toggle features via flags** — keep unfinished subsystems OFF until tested.
5. **Verify** — `typecheck + lint + test + build` green → deploy.

## What to change vs. keep
| Change (per product) | Keep (reuse) |
|---|---|
| Branding, colors, logo, copy, i18n text | Design system, component library, layout patterns |
| Product catalog, pricing, programs | Commerce/catalog/entitlement engines |
| Domain, Supabase/Stripe projects, env | Migrations, RLS model, RBAC, auth flows |
| Marketing pages content | Security headers, validation, testing conventions |

## Golden rules inherited
- Honesty first: no fabricated proof, no unguaranteeable promises.
- One authoritative source per number/price/claim.
- Flag-gate unreleased features; test-mode/staging before prod.
- Additive, reversible, backup-gated DB changes.

**Result:** a new platform reaches "production-grade skeleton" in days, not months — reusing a proven,
tested, secure foundation.
