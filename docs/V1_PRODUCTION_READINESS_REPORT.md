# ARCADINS Training Center — V1 Production Readiness Report

> Final report after the **Two-Department Separation** restructuring (permanent architecture decisions
> D1/D2/D3/D5). All work is **local**; production is unchanged (`origin/master a0b69c6`). Official product
> name: **ARCADINS Training Center** (immutable). **Deployment awaits explicit authorization.**

---

## 1. Permanent architecture — the two departments

ARCADINS Training Center operates through **two strictly independent educational departments**:

| | **Department A** | **Department B** |
|---|---|---|
| Name | **Official Language Programs** | **Professional Trainings** |
| Public label (nav) | "Programmes officiels" / "Official Programs" | "Formations professionnelles" / "Professional Trainings" |
| Reserved word | **Programs** (never used for Dept B) | **Trainings / Formations** (never "Programs") |
| Scope | TEF · TCF · TFI · DELF · DALF, official tutoring, immigration & destination language prep | The 9 professional development trainings |
| V1 live entry | **`/tef`** (existing production URL — preserved) | **`/formations`** (existing production URL — preserved) |
| Pricing | own (surfaced on the Dept-A pages) | 1500 CAD each + registration fee + 3× installments (`/tarifs`) |
| Catalog source | Dept-A pages | `src/lib/data/programs.ts` (`PROGRAMS`, the 9) |

**Golden rule (permanent, all future versions):** two independent ecosystems — different catalogs, pricing,
enrollment, dashboards, learning paths, marketing. No shared pricing, no mixed navigation, no duplicated
content, no cross-category pages, no ambiguous terminology.

---

## 2. What was implemented (V1)

Reuse-first, additive, existing architecture — **no rebuild, no invented prices, no fake content**:

1. **Naming (D1)** — `nav.formations` relabelled to the **Professional Trainings** family across all 7
   languages (was EN "Programs" — the collision). New `nav.programs` key = **Official (Language) Programs**
   for Dept A. Terminology collision **eliminated** (verified FR + EN).
2. **Catalog split (D2)** — the TEF/TCF item (`francais-tef-tcf`) **removed** from the Professional Trainings
   catalog; TEF/TCF belongs to Department A only (lives under `/tef`). No duplicated entries.
3. **Programs go-live (D3)** — **V1 keeps `/tef` as the live Dept-A entry**; the generic `/programmes`
   catalog stays flag-gated (404 in prod). Existing production URLs preserved → **zero deployment risk / zero
   SEO regression**. Full `/programmes` catalog is a **V2** milestone (with redirects, backward-compatible).
4. **Homepage split (D5)** — new `DepartmentsSplit` section shown **immediately after the hero**: two clearly
   separated cards (Official Language Programs → `/tef`; Professional Trainings → `/formations`), each with its
   own badge, description and CTA. Hero CTAs repointed **one-per-department**.
5. **Header & Footer** — nav relabelled/reordered; footer "Formations" column split into two headed groups
   ("Programmes officiels" vs "Formations professionnelles"). No mixed terminology.

**Routing note (D1 vs D3):** D1's permanent canonical namespaces `/programs/*` and `/trainings/*` are the
**V2** target; for V1, D3 governs (preserve `/tef`, `/formations`). The V2 URL migration must ship with
redirects preserving SEO/hreflang/canonical.

---

## 3. Quality gates (this milestone)

| Gate | Result |
|---|---|
| `tsc --noEmit` (typecheck) | ✅ 0 errors |
| `eslint` (lint) | ✅ 0 errors |
| `node --test` (tests) | ✅ 673 / 673 pass |
| `next build` (production build) | ✅ OK — all routes compiled |
| Runtime (dev, FR + EN) | ✅ 0 console errors; nav, homepage split, footer render correctly |

---

## 4. V1 completion status (per D3 checklist)

| Item | Status |
|---|---|
| Two-department separation (naming, catalog, nav, homepage, footer) | ✅ **Done & verified** |
| TEF/TCF pages (`/tef`, `/tcf`, `/tutorat`) live | ✅ Existing, preserved |
| Professional Trainings catalog + detail + pricing (`/formations`, `/tarifs`) | ✅ Existing, preserved |
| CTAs / internal navigation / no dead links | ✅ Verified (0 `href="#"`, links resolve) |
| Multilingual routing (`/fr /en /es`), hreflang, canonical, SEO metadata | ✅ Verified (prior milestone) |
| Responsive (desktop/tablet/mobile) | ✅ Verified (prior milestone) |
| Login / register / dashboard shells | ✅ Present |
| **Enrollment → payment → certificate (live money/data path)** | ⛔ **Blocked** — needs staging Supabase + Stripe/provider credentials |
| Live auth providers, RLS live-audit, transactional email/storage | ⛔ **Blocked** — same dependency |
| Formal Lighthouse ≥95 + axe AA sweep; sitemap per-locale URLs | 🟠 Pending (recommended, additive) |

---

## 5. Known non-blocking items (tracked, not fixed here)

- **Generic "programmes/programs" wording** remains in some marketing copy (hero stat "9 Formations",
  `stats.*`, CTA labels). These are non-department-defining; the **department labels** (nav, homepage section,
  footer) are unambiguous. Copy polish → V2.
- **`PRICING` artifact** (`pricing-plans.ts`, 199/449) is reachable **only** through the flag-gated
  `/programmes` (404 in prod) → **not live-visible**, no live inconsistency. Left untouched (no invented
  prices). Resolve its role when the V2 Programs catalog is built.
- Unused i18n key `c.francais-tef-tcf` left in place (harmless; removable in a later cleanup).

---

## 6. Go / No-Go

- **✅ GO** — the two-department separation is complete, verified, and safe (existing URLs preserved, all
  gates green, no production change yet).
- **⛔ NO-GO for auto-deploy** — per governance, **deployment awaits your explicit authorization**. The live
  money/data path (enrollment/payment/certificates/auth) remains blocked on the **staging Supabase project +
  provider credentials** you must provision; that is a separate integration milestone, not part of this
  restructuring.

**Recommendation:** review the local changes / preview, then authorize (a) deploying the department-separation
restructuring to production (marketing/IA only — no infra dependency), and separately (b) provisioning staging
to unblock the live integration milestone.

**No production changes were made. `origin/master` remains `a0b69c6`.**
