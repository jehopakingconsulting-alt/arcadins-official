# ARCADINS V3 — Architecture Freeze & Master Reference

> **Permanent architectural reference.** Documentation only — no code. Snapshot as of S4
> (commit `cf32068`). Repo `arcadins-official`. Stack: Next.js 16 (App Router, React 19, RSC),
> TypeScript, Tailwind v4, Supabase (Postgres + Auth + Storage), Stripe, Vercel.
> Facts: **593 TS/TSX files · 46 unit-test files · 652 tests green · 12 migrations** (0009/0011/0012
> versioned, not applied to prod). Production is unchanged (`origin/master a0b69c6`); all V3 work is
> local, flag-gated, staging-only.

---

## 1. Overall System Architecture

**Layered, hexagonal (ports & adapters), curriculum-as-data, server-authoritative.**

```
┌───────────────────────────────────────────────────────────────────┐
│ PRESENTATION  (RSC + minimal client)                              │
│   app/ routes · components/{ui/ds, program, dashboard, learn}     │
├───────────────────────────────────────────────────────────────────┤
│ APPLICATION   (services, server actions, view-model projection)   │
│   runtime/server, runtime/ui, catalog services                    │
├───────────────────────────────────────────────────────────────────┤
│ DOMAIN        (PURE deterministic engines — the core value)       │
│   catalog(pricing/entitlement) · enrollment · runtime/{journey,   │
│   assessment, exam, player, progress, certification, credential*} │
├───────────────────────────────────────────────────────────────────┤
│ PORTS         (interfaces: repositories, media, signing, KMS)     │
├───────────────────────────────────────────────────────────────────┤
│ ADAPTERS      Supabase repos · Stripe · node:crypto · Storage     │
└───────────────────────────────────────────────────────────────────┘
```

**Dependency rule:** presentation → application → domain → ports; adapters implement ports. Domain
engines are pure (injected clock/idFactory, no I/O) and depend on nothing outward. **Runtime flow:**
Server Component/Action calls a service → service composes domain engines over data from a repository
(adapter) → engine returns an immutable view-model → the **client-safe boundary guard**
(`ensure-client-safe`) verifies it → RSC renders; client components receive view-models only.

**Cross-cutting:** feature flags (inert-by-default), i18n (FR/EN/ES + 7-lang UI dict), RLS-first
security, append-only audit, idempotency/CAS on writes.

---

## 2. Repository Map

| Folder | Purpose | Owner | Depends on |
|---|---|---|---|
| `src/app/**` | Routes (RSC pages, API, auth) | Presentation | components, lib services |
| `src/components/ui/ds` | **Design system** (Button/Card/Badge/Alert/ProgressBar/Skeleton/EmptyState/ErrorState/Field/Container/Section) | Presentation | — |
| `src/components/{program,dashboard,learn,layout,home,admin,certificate,reviews}` | Feature UIs | Presentation | ui/ds, lib |
| `src/lib/catalog` | **Commerce engine** (types, pricing, entitlement, discounts) — PURE | Domain | — |
| `src/lib/enrollment` | **Enrollment provisioning** — PURE, idempotent | Domain | catalog |
| `src/lib/lesson-runtime` | Lesson presentation model + block classifier — PURE | Domain | runtime/ui, runtime/player (types) |
| `src/lib/program-presentation` | Generic marketing contract + instances (TEF) | Domain (data) | — |
| `src/lib/dashboard-shell` | Generic dashboard nav config | Domain (data) | program-presentation |
| `src/lib/runtime/**` | **Academic runtime**: journey, assessment, exam, player, progress, certification, credential-crypto, secure-orchestration, dashboard, ui, repositories, persistence, server | Domain + ports + adapters | ports |
| `src/lib/runtime/repositories` | **Supabase adapters** (program/enrollment/progress/assessment/exam/certification/audit) | Adapters | Supabase |
| `src/lib/academic` | Curriculum model (`ProgramCurriculumV2`) + question banks | Domain (data) | — |
| `src/lib/{supabase,stripe,storage}` | Infra clients | Adapters | Supabase/Stripe |
| `src/lib/{rbac,i18n,rate-limit,validation,notifications,referral,tutoring,logger}` | Cross-cutting services | Application | — |
| `src/lib/config`, `runtime/*flags*` | Feature flags | Cross-cutting | env |
| `supabase/migrations` | Versioned schema | Data | — |
| `scripts/migration` | Legacy V1→V2 pipeline (done) | Ops | — |
| `archive/v1-education-*` | Checksummed V1 educational archive (reference) | Reference | — |
| `docs/` | Architecture, plans, baseline | Docs | — |

---

## 3. Business Domains

| Domain | Status | Location | Notes |
|---|---|---|---|
| **Catalog** | ✅ engine + schema (S0/S1) | `lib/catalog`, `0012` | Product→Program→Version→Curriculum; generic |
| **Commerce** | ✅ engine (S1) | `lib/catalog` pricing/entitlement/discounts | Multi-currency/country, one-time/sub/lifetime, promos, coupons, scholarships, licenses, bundles, add-ons |
| **Enrollment** | ✅ engine (S3) | `lib/enrollment` | Idempotent; 6 sources; entitlement snapshot |
| **Learning Runtime** | ✅ engines exist; UI partial | `lib/runtime/{journey,progress,...}` | Mastery, recommendation, review-scheduler, remediation, study-planner |
| **Lesson Player** | ✅ UI (S4) | `components/learn/experience` | Metadata-driven, future-ready |
| **Authentication** | ✅ email/session; providers pending | `app/auth`, `lib/supabase`, `middleware` | Google/magic-link/reset = config |
| **Dashboard** | ✅ shell (S3) | `components/dashboard`, `app/espace` | 12 sections, generic |
| **Administration** | ✅ live areas | `app/admin/*` | Migration validator, health, reviews, tutors |
| **Media** | ⚙️ ports exist, players pending | `runtime/player/media` | Adapter contracts defined |
| **Certificates** | ✅ full engine; wiring pending | `runtime/certification*`, `credential-crypto` | Ed25519, QR, lifecycle, verifiable |
| **Notifications** | ✅ engine | `lib/notifications`, `0004` | Providers/templates/dispatch |
| **Analytics** | ⚙️ telemetry contract only | `lesson-runtime/block-kind` | Pipeline future |
| **AI** | ⛔ future | — | Extension point (assistant/recommendation) |
| **Future Mobile** | ⛔ future | — | View-models are transport-ready |

---

## 4. Data Flow (visitor → certificate)

```
Visitor → /programmes/[slug] (RSC, SEO)               [presentation]
  → Registration (/auth/register, Supabase Auth)      → auth.users + profiles (trigger)
  → Enrollment: provisionEnrollment(offer,package)    → entitlement snapshot, expiry [PURE]
  → Payment (Stripe, price_id from catalog.offers)    → webhook confirms (never hardcoded)
  → Learning: LessonPlayer renders ContentBlock[]     → resume/notes (persistence pending)
  → Progress: journey/progress engines derive %       → module/lesson/competency mastery [PURE]
  → Assessment/Exam: AssessmentEngine grades server   → attempts append-only, public feedback only
  → Completion eligibility → certification-authority   → secure-credential-orchestration
  → Credential: Ed25519 sign → PDF+QR → /verify/[id]  → public verification, no private data
```

Every write is idempotent/CAS; every server→client hop passes `ensure-client-safe`.

---

## 5. Database Map

**Legacy (live, migrated, read-only history):** `legacy_learners, legacy_prospects, legacy_tests,
legacy_modules, legacy_certificates, legacy_payments, legacy_referrals, legacy_admin_settings,
legacy_audit_log, legacy_id_map` (+ `migrate_*` RPCs). 294 rows imported; never mutated.

**Academic runtime (`0009`/`0011`, versioned, not in prod):** `program_versions, modules, lessons,
assessments, assessment_questions, assessment_attempts, assessment_sessions, exam_runtime_sessions,
rubrics, assignments, submissions, module_progress, cohorts, tutor_assignments, learning_events,
runtime_snapshots, runtime_events, content_translations, credential_integrity_records,
public_verification_events, certificate_status_history, academic_commands/results/audit_events`.

**Commerce (`0012`, versioned, not in prod):** `programs, products, packages(grants jsonb),
bundle_items, offers, discounts, coupons, coupon_redemptions, scholarships, organizations, licenses,
license_seats, countries, enrollments, progress_projection`.

**Live product tables (prod today):** `profiles, certificates, contact_requests, program_reviews,
tutoring_requests, tutor_applications, referral_*, notifications*` + Supabase `auth.*`, `storage.*`
(bucket `legacy-certificates`).

**Key relationships:** `products.program_id → programs`; `programs.slug ↔ program_versions.program_slug`
(+ new `program_id` FK); `offers → packages → products`; `enrollments → user/product/package/offer/
program_version/license`; credentials/attempts scoped by learner. **RLS**: catalog public-read;
enrollments/attempts self-read; discounts/coupons/scholarships service-role only.

**Future migrations:** apply order on staging `0009→0011→0012`; then progress/notes/bookmark persistence
tables, analytics events, org-billing. **No legacy table dropped** until parity + rollback + explicit auth.

---

## 6. Reusable Components

- **UI (design system):** Button, Card, Badge, Alert, ProgressBar, Skeleton, EmptyState, ErrorState,
  Field, Input, Container, Section, SectionHeading, Eyebrow, Stat. **Feature:** ProgramLanding,
  DashboardShell, LessonPlayer, LessonBlock, Header, Footer, Modal, Icon, VerificationBadge.
- **Contracts / view-models:** `runtime/ui/view-models`, `runtime/repositories/contracts`,
  `program-presentation/types`, `lesson-runtime/types`, catalog `types`.
- **Repositories (ports+adapters):** supabase-{program,enrollment,progress,assessment,exam,
  certification,audit}-repository + in-memory + factory + mappers.
- **Services/engines (pure):** pricing/entitlement/discounts, enrollment provisioning, journey
  (mastery/recommendation/review/remediation/study-planner), assessment (grading/partial-credit/
  competency/integrity), certification + credential-crypto, block-kind classifier.
- **Hooks/utilities:** `useLang`/`t`, rbac, rate-limit, validation, logger, notifications dispatch.

---

## 7. Extension Points (designed-in)

| Extension | Hook |
|---|---|
| **SCORM / H5P / Live classes** | New `ContentBlockType` → one `LessonBlock` case + `block-kind` entry; fallback already safe |
| **New media** | Implement `MediaPlayerAdapter` port (`runtime/player/media`) |
| **New product (TCF/IELTS/…)** | New `products/packages/offers` rows + a `ProgramPresentation` instance — zero engine code |
| **Marketplace / bundles** | `packages.kind='bundle'` + `bundle_items` + `bundle_products` grant |
| **API / white-label** | View-models are serializable; add a public API layer over services |
| **Enterprise / institutions** | `organizations` + `licenses` + `license_seats` (schema ready) |
| **Native mobile / desktop** | View-models are transport-agnostic; expose via API |
| **AI assistant** | `ai_assistant` entitlement grant + a service over recommendation engine |
| **KMS** | `external-kms-provider-contract` (credential-crypto) |

---

## 8. Security Review

- **Authentication:** Supabase Auth (email/password + session, `on_auth_user_created` trigger → profile).
  Google/magic-link/reset = provider config (not yet enabled).
- **Authorization / RBAC:** `lib/rbac.ts` (+ tests); roles admin/student/support/tutor via `profiles.role`.
- **RLS:** default-deny; catalog public-read (active only); enrollments/attempts/seats self-read;
  discounts/coupons/scholarships/progress_projection service-role only; legacy_* admin-read.
- **Server Actions / boundary:** server-authoritative writes; `ensure-client-safe` forbids answer-keys/
  secrets crossing to the client; question banks/grading kept server-side.
- **Secrets:** never in client/repo; Stripe price ids are config; credential signing keys via KMS port.
  Dev flags in gitignored `.env.local`.
- **Future risks:** (a) coupon-code enumeration → keep validation server-side (done by RLS); (b) auth
  provider misconfig on enable; (c) RLS coverage must be re-audited when `0012` applied; (d) rate-limit
  on enrollment/checkout endpoints.

---

## 9. Performance Review

- **RSC-first:** landing/dashboard/player static or server-rendered; minimal client JS (only interactive
  islands: FAQ, tabs, nav, notes).
- **Caching/streaming:** static prerender for public pages (`generateStaticParams`); content is
  version-immutable → CDN-cacheable; Suspense/streaming available for data pages.
- **Lazy/partial:** media placeholders (no eager media); images to be `next/image`-optimized on wiring.
- **DB:** RLS-scoped indexed reads; append-only tables; O(items) pure grading.
- **SEO:** `generateMetadata` + JSON-LD (Course/FAQPage) + canonical/OG/Twitter on program pages.
- **Gap:** formal Lighthouse/axe run pending (S9); per-locale routing for full multilingual SEO pending.

---

## 10. Technical Debt (categorized)

**Critical (before public launch):**
- Apply `0009/0011/0012` on staging + wire real persistence (enrollment/progress/notes) behind flags.
- Auth providers (Google, magic-link, reset) enable + test.
- Certificate PDF regeneration (7 legacy, Option 2) + issuance wiring to Supabase + KMS.
- Real Stripe checkout (price ids, webhooks) — currently no real payments.

**Important:**
- Real media players + captions (adapters → players).
- Dashboard sections 2–12 logic; recommendations/review UI in player.
- Lighthouse 95+ / axe AA audit; per-locale SEO routing.
- Offline queue + realtime sync.

**Optional:**
- Analytics pipeline (drop-off/popularity); admin authoring UI for catalog/curriculum.
- Bundle/marketplace UX; org-billing UX.

**Future vision:**
- AI assistant; SCORM/H5P/Live embedders; native mobile/desktop; public API/white-label.

---

## 11. Roadmap (S5 → V1.0)

| Sprint | Objective | Depends on | Complexity | Order |
|---|---|---|---|---|
| **S5** | Assessment/exam UI (quiz + mock) on existing engines | S4 | M | 1 |
| **S6** | Persistence wiring (staging): apply 0009/0011/0012, enroll/progress/notes repos + legacy projection | S0–S4 | **H** | 2 |
| **S7** | Auth providers (Google/magic-link/reset) + route protection hardening | S6 | M | 3 |
| **S8** | Certification wiring: issuance→Supabase+KMS, PDF+QR, `/verify`, 7-PDF regen | S6 | H | 4 |
| **S9** | Checkout: Stripe price ids + webhooks (staging, gated) | S6 | H | 5 |
| **S10** | Admin authoring (catalog/curriculum/pricing back-office) | S6 | H | 6 |
| **S11** | Media players + captions; recommendations/review UI | S5 | M | 7 |
| **S12** | Hardening: Lighthouse/axe, per-locale SEO, offline/sync, analytics | all | H | 8 |
| **RC** | Staging E2E on real data → pilot cohort → parity proof | S5–S12 | H | 9 |
| **V1.0** | Enable flags per cohort; retire legacy paths after parity + auth | RC | M | 10 |

---

## 12. Quality Assessment (/100)

| Category | Score | Rationale |
|---|---|---|
| Architecture | **92** | Clean layering, ports/adapters, pure engines, curriculum-as-data |
| Scalability | **88** | Stateless RSC, immutable versioned content, RLS-scoped reads |
| Maintainability | **90** | DDD folders, one-way deps, 652 tests, no duplication |
| Extensibility | **93** | Data-driven catalog, safe fallbacks, documented extension points |
| Performance | **80** | RSC-first + static; media/image opt & Lighthouse pending |
| Security | **83** | RLS-first, client-safe guard, RBAC; auth providers + 0012 RLS re-audit pending |
| Developer Experience | **88** | Typed, tested, flag-gated, reproducible gates |
| Documentation | **90** | This freeze + plans + baseline + migration docs |
| Accessibility | **85** | Landmarks/aria/focus/reduced-motion; formal axe audit pending |
| Internationalization | **84** | FR/EN/ES structure everywhere; per-locale SEO routing pending |
| **Overall** | **87** | Strong foundation; wiring + audits remain before launch |

---

## Executive Summary

**Current maturity.** ARCADINS V3 is a **well-architected platform foundation**, not yet a launched
product. The hard parts — the **pure, deterministic domain engines** (commerce/pricing, entitlement,
enrollment, journey/mastery/assessment/exam/progress, and a full verifiable-certification stack) — exist
and are tested (652 green). The **generic, data-driven** presentation (design system, program landing,
dashboard shell, universal lesson player) is built and flag-gated. TEF is only configuration; every future
product reuses the same runtime.

**Production readiness.** The **live V2 product is stable** (public site + migrated V1 data, `a0b69c6`).
The **V3 experience is staging-only and inert** (flags off, nothing applied to prod, `legacy_*` preserved).
It is **not production-ready** yet: persistence wiring, auth providers, real checkout, and certification
wiring are deliberately deferred.

**Remaining work (shortest safe path):** S6 persistence wiring is the linchpin (apply migrations on
staging, connect enrollment/progress/notes repos, project legacy history), then auth providers (S7),
certification (S8), checkout (S9), then hardening/audits (S12) and a staging E2E RC before enabling flags
per cohort.

**Strongest architectural decisions:** (1) pure engines with injected clock → deterministic + testable;
(2) curriculum/commerce as **data**, not code → unlimited products without redesign; (3) ports/adapters →
Supabase/Stripe/KMS swappable; (4) server-authoritative + `ensure-client-safe` boundary → no answer-keys/
secrets leak; (5) additive/flag-gated/reversible delivery → zero production risk during the build.

**Biggest risks:** (1) RLS coverage must be re-audited when `0012` is applied; (2) enabling real payments
and auth providers are irreversible-facing steps needing staged validation; (3) certificate PDF + KMS
wiring touches trust; (4) breadth of remaining wiring could invite scope creep — keep the sprint gates.

**Recommendations before public launch:** apply migrations on a dedicated staging project; complete
persistence + auth + certification + checkout behind flags; run Lighthouse ≥95 and axe AA; security review
of RLS + server actions + rate limits; pilot with one cohort on real data to prove parity; only then enable
flags per product. Keep the strict per-sprint gates (typecheck/lint/test/build/browser) and the
one-batch-at-a-time production discipline that has kept the migration and V3 build zero-incident so far.
