# ARCADINS V3 — MASTER DELIVERY PLAN (V1.0)

> **Single source of truth for the remainder of development.** Documentation only — no code.
> Baseline: S4 (`cf32068`), Architecture Freeze (`b284d86`). Production = live V2 (`a0b69c6`),
> unchanged. All V3 work local, flag-gated, staging-only, `legacy_*` preserved.
> Date of plan: 2026-08-01. Overall completion estimate: **~42%** (see §Estimates).

---

## 0. What is DONE (the foundation)

| Area | State | Evidence |
|---|---|---|
| V1→V2 data migration | ✅ complete (294 rows, integrity 0) | 9 batches, `migrate_*` |
| Architecture Freeze | ✅ | `docs/ARCHITECTURE_FREEZE_V3.md` |
| Commerce engine (pricing/entitlement/discounts) | ✅ pure + tested | `lib/catalog`, `0012` |
| Enrollment engine | ✅ pure + tested (idempotent, 6 sources) | `lib/enrollment` |
| Presentation system (design system + generic landing) | ✅ flag-gated | `components/ui/ds`, `components/program` |
| Dashboard shell (12 sections) | ✅ flag-gated | `components/dashboard`, `/espace` |
| Generic product model | ✅ Product→Program→Version→Curriculum | `0012`, `academic/types` |
| Lesson runtime (metadata player) | ✅ flag-gated | `components/learn/experience` |
| Academic runtime engines (journey/assessment/exam/progress/certification/crypto) | ✅ pure + tested, **not wired to DB/UI** | `lib/runtime/**` |
| Supabase repository adapters | ✅ exist, **not wired** | `runtime/repositories` |
| Migrations `0009/0011/0012` | ⚙️ versioned, **not applied** | `supabase/migrations` |

**Not done:** persistence wiring, auth providers, real checkout, certification wiring, media players,
admin authoring, audits (Lighthouse/axe/security), analytics, offline/sync.

---

## 1. EPICS

| # | Epic | Objective | Deps | Complexity | Tech risk | Business value | Prod impact |
|---|---|---|---|---|---|---|---|
| **E1** | Staging Foundation & Persistence | Apply `0009/0011/0012` on a dedicated staging project; wire enrollment/progress/notes/bookmarks repos; project legacy history | done engines | **H** | RLS coverage, mapping drift | Unblocks everything | None (staging) |
| **E2** | Authentication Completion | Google OAuth, magic-link, password reset, session hardening, RBAC route protection | E1 | M | provider misconfig | Onboarding | None until enabled |
| **E3** | Assessment & Exam Experience | Quiz + mock-exam UI on existing engines; results/feedback; eligibility | E1 | M | integrity/anti-fraud UX | Core learning value | None (gated) |
| **E4** | Certification Delivery | Issuance→Supabase+KMS, deterministic PDF+QR, `/verify`, 7 legacy-PDF regen | E1 | **H** | trust/crypto/KMS | Credibility | None (gated) |
| **E5** | Commerce Checkout | Stripe price ids + Checkout + webhooks; entitlement on payment; coupons/scholarship/license flows | E1 | **H** | money-path correctness | Revenue | Real payments (staged) |
| **E6** | Admin Back-Office | Configure products/packages/offers/discounts/curriculum/cohorts from UI (no code) | E1 | H | authoring safety | Ops autonomy | None (gated) |
| **E7** | Media & Recommendations | Real video/audio/pdf players + captions; recommendation/review UI | E3 | M | media perf/a11y | Engagement | None (gated) |
| **E8** | Quality, Perf, SEO, A11y | Lighthouse≥95, axe AA, per-locale SEO, image opt, streaming | E1–E7 | M | breadth | Launch quality | None |
| **E9** | Resilience: Offline, Sync, Analytics, Monitoring | Offline queue + realtime sync; analytics pipeline; logging/monitoring/alerting; rate limits | E1 | M | conflict-resolution | Reliability/insight | None |
| **E10** | Launch & Cutover | Staging RC on real data → pilot cohort → parity proof → enable flags per product | E1–E9 | H | data parity | Go-live | **Production** |

---

## 2. FEATURES (per epic — condensed)

### E1 — Staging Foundation & Persistence
- **F1.1 Staging project + migration apply** — tasks: create staging Supabase, apply `0009→0011→0012`, preflight; **AC:** clean apply, RLS present, 0 prod change; **tests:** migration preflight, RLS matrix; **deps:** —.
- **F1.2 Enrollment persistence** — wire `supabase-enrollment-repository` to `provisionEnrollment`; **AC:** idempotent create, entitlement snapshot stored; **tests:** integration (in-mem + staging), idempotency.
- **F1.3 Progress persistence** — wire `progress-engine`/`module_progress` + resume; **AC:** CAS writes, resume restores; **tests:** concurrency/CAS.
- **F1.4 Notes/bookmarks/favorites/downloads** — repos + contracts; **AC:** self-scoped RLS; **tests:** RLS self-read.
- **F1.5 Legacy projection** — idempotent back-fill `legacy_* → progress`; **AC:** run-once, history unaltered; **tests:** idempotency, parity counts.

### E2 — Authentication
- **F2.1 Google OAuth** · **F2.2 Magic link** · **F2.3 Password reset** · **F2.4 Session/refresh hardening** · **F2.5 RBAC route guards** — AC: each provider round-trips on staging, protected routes redirect, roles enforced; tests: middleware unit + e2e per flow.

### E3 — Assessment & Exam
- **F3.1 Quiz player** · **F3.2 Mock-exam runner (timed, integrity)** · **F3.3 Server grading + public feedback** · **F3.4 Completion eligibility** — AC: no answer-key client-side, attempts append-only, eligibility computed by engine; tests: grading, integrity, boundary scan.

### E4 — Certification
- **F4.1 Issuance orchestration→Supabase** · **F4.2 KMS key provider** · **F4.3 PDF+QR generator (deterministic)** · **F4.4 Public `/verify/[id]`** · **F4.5 7 legacy-PDF regen + audit** — AC: signed verifiable credential, no private data on verify, no duplicate identity, audit per doc; tests: signature/verify, determinism, dedupe.

### E5 — Checkout
- **F5.1 Stripe price-id mapping** · **F5.2 Checkout session** · **F5.3 Webhook → enrollment** · **F5.4 Coupon/scholarship/license application** — AC: entitlement granted only on confirmed payment, idempotent webhooks, no hardcoded ids; tests: webhook idempotency, quote↔charge parity, no double-charge.

### E6 — Admin Back-Office
- **F6.1 Catalog editor (products/packages/offers/discounts)** · **F6.2 Curriculum authoring (versions/modules/lessons/items)** · **F6.3 Cohorts/licenses/scholarships** · **F6.4 Publish workflow** — AC: everything configurable без code, draft→publish immutable versions; tests: authoring validation, RLS admin-only.

### E7 — Media & Recommendations
- **F7.1 Video/audio players + captions** · **F7.2 PDF viewer** · **F7.3 Recommendation surface** · **F7.4 Review queue** — AC: a11y media (captions, keyboard), recommendations from engine; tests: adapter contracts, a11y.

### E8 — Quality/Perf/SEO/A11y
- **F8.1 Lighthouse≥95** · **F8.2 axe AA** · **F8.3 per-locale routing + hreflang** · **F8.4 image opt/streaming** — AC: thresholds met on key routes; tests: CI Lighthouse/axe, Playwright.

### E9 — Resilience
- **F9.1 Offline queue + replay** · **F9.2 Realtime sync** · **F9.3 Analytics events** · **F9.4 Monitoring/logging/alerting** · **F9.5 Rate limiting** — AC: conflict-safe sync, anonymized analytics, alerts wired; tests: conflict cases, rate-limit unit.

### E10 — Launch
- **F10.1 Staging E2E on real data** · **F10.2 Pilot cohort** · **F10.3 Parity proof** · **F10.4 Flag enablement per product** — AC: parity 100%, rollback rehearsed, sign-off; tests: full regression + e2e + DR drill.

---

## 3. Sprint Planning (S5 → V1.0)

> Each sprint: build → gates (typecheck/lint/unit/integration/browser/a11y/responsive/boundary-scan) →
> atomic commit → report → **STOP for GO**. Staging-only, flags off in prod.

**S5 — Assessment/Exam Experience (E3, part)**
- Objectives: quiz + mock UI on existing engines; server grading; results.
- Deliverables: `components/learn/assessment/*`, results view-models.
- Files: `components/learn/**`, `lib/runtime/assessment` (reuse). Tests: grading/integrity/boundary.
- Exit: quiz+mock run gated, no answer-key leak, gates green.

**S6 — Staging Foundation & Persistence (E1)** ← *linchpin*
- Objectives: staging project, apply 0009/0011/0012, enrollment+progress+notes persistence, legacy projection.
- Deliverables: repo wiring, projection job, RLS matrix doc.
- Files: `lib/runtime/repositories/**`, `lib/enrollment`, `lib/bridge/*`. Tests: integration, idempotency, RLS.
- Exit: real enroll→learn→progress→resume on staging; 0 prod change.

**S7 — Authentication Completion (E2)**
- Deliverables: providers enabled on staging, RBAC guards. Files: `app/auth/**`, `middleware.ts`, `lib/rbac`.
- Tests: e2e per provider, guard unit. Exit: all auth flows pass on staging.

**S8 — Certification Delivery (E4)**
- Deliverables: issuance→Supabase+KMS, PDF+QR, `/verify`, 7 legacy regen. Files: `runtime/certification*`, `credential-crypto`, `app/verify`.
- Tests: sign/verify, determinism, dedupe. Exit: verifiable credential + legacy PDFs, no dup identity.

**S9 — Commerce Checkout (E5)**
- Deliverables: Stripe price ids, Checkout, webhook→enrollment, coupon/scholarship/license. Files: `lib/stripe`, `app/api/webhook`, checkout UI.
- Tests: webhook idempotency, quote↔charge parity. Exit: staged real payment → entitlement, no double-charge.

**S10 — Admin Back-Office (E6)**
- Deliverables: catalog + curriculum authoring + publish workflow. Files: `app/admin/**`, admin services.
- Tests: authoring validation, RLS admin-only. Exit: full config without code.

**S11 — Media & Recommendations (E7)**
- Deliverables: media players + captions, recommendation/review UI. Files: `runtime/player/media` adapters, `components/learn/**`.
- Tests: adapter contracts, a11y media. Exit: real media + engine-driven recommendations.

**S12 — Quality/Perf/SEO/A11y + Resilience (E8/E9)**
- Deliverables: Lighthouse≥95, axe AA, per-locale SEO, offline/sync, analytics, monitoring, rate limits.
- Tests: CI Lighthouse/axe, conflict/sync, rate-limit. Exit: thresholds met, alerts live.

**S13 — Release Candidate & Cutover (E10)**
- Deliverables: staging E2E on real data, pilot cohort, parity proof, DR drill, flag enablement plan.
- Tests: full regression + e2e + rollback drill. Exit: parity 100%, sign-off → **V1.0**.

---

## 4. Risk Register

**Blockers (must resolve to progress):**
- No dedicated staging project yet (E1/S6). Everything real-data depends on it.
- Migrations `0009/0011/0012` unapplied.

**High risk:**
- Money path (E5): webhook idempotency, no double-charge, quote↔charge parity.
- Certification/KMS (E4): signing-key custody, verifiable-credential correctness, no duplicate identity.
- RLS re-audit when `0012` applied (security).
- Legacy projection parity (E1): must never mutate history.

**Medium risk:**
- Auth provider config (E2). Offline sync conflict-resolution (E9). Per-locale SEO routing (E8).
- Admin authoring safety (E6): draft/publish immutability.

**Low risk:**
- Media player a11y polish. Recommendation UI. Dashboard sections 2–12 content.

**Technical debt (carried):** real media players; analytics pipeline; formal Lighthouse/axe; image opt;
per-locale routing; dashboard section logic; SCORM/H5P/Live embedders; AI assistant; native mobile.

---

## 5. Production Readiness Checklist

- **Security:** RLS re-audited (all tables), RBAC enforced, server actions validated (Zod), secrets in env/KMS, no client secrets, CSP/headers, dependency audit.
- **Performance:** Lighthouse ≥95 (key routes), image opt, streaming/Suspense, DB indexes, cache headers.
- **Payments:** Stripe live keys, webhook signing verified, idempotency, refund/dispute path, tax config, no hardcoded price ids.
- **Emails:** transactional provider (Resend) verified domain, templates (welcome/reset/receipt/cert), deliverability/SPF/DKIM.
- **Authentication:** email+Google+magic-link+reset tested, session/refresh, lockout/rate-limit, MFA-ready.
- **Administration:** catalog/curriculum authoring, publish workflow, migration validator, health dashboard.
- **Certificates:** issuance+sign+verify, PDF+QR, revocation/replacement, legacy regen, audit trail.
- **SEO:** metadata, JSON-LD, canonical/hreflang, sitemap, robots, OG/Twitter.
- **Accessibility:** axe AA on key flows, keyboard, screen-reader, captions, contrast, focus, reduced-motion.
- **Monitoring/Logging:** error tracking, uptime, alerting, structured logs, audit events.
- **Backups/DR:** manual backup cadence (Free-plan reality) or upgrade to PITR; restore drill; RTO/RPO documented.
- **Rate limiting:** auth/checkout/enrollment/api endpoints.
- **Legal/Privacy:** Terms, Privacy, Legal notice, cookie consent (privacy-first), Loi 25/GDPR export/delete.
- **Analytics:** anonymized learning/dropoff/completion; consent-gated.

---

## 6. Launch Checklist (deployment day)

1. Backup verified (DB + Storage) + rollback tag.
2. Staging RC signed off; regression + e2e green.
3. Apply migrations to prod (gated SQL Editor, transactional) in order.
4. Env vars/secrets set (Stripe live, KMS, providers, flags).
5. Enable flags **per product/cohort** (not global).
6. Smoke: register → enroll → lesson → progress → assessment → certificate → verify.
7. Payments smoke (small real charge + refund) on live.
8. SEO/robots/sitemap live; noindex removed on public routes.
9. Monitoring/alerts confirmed receiving.
10. Support channel + status page ready. Announce.

## 7. Post-Launch Checklist

- **Monitoring:** watch errors/latency/uptime 72h; alert thresholds.
- **Bug fixing:** triage board; hotfix path (branch → gates → gated deploy).
- **Performance:** real-user metrics vs Lighthouse; DB slow-query review.
- **User feedback:** in-app feedback, pilot interviews, funnel analytics.
- **Roadmap V1.1:** TCF product, remaining 8 pro programs, AI assistant, mobile app, marketplace, per-locale SEO, SCORM/H5P.

---

## 8. Objective Evaluation (/100)

| Category | Score | Note |
|---|---|---|
| Architecture | 92 | Clean, pure engines, ports/adapters |
| Scalability | 88 | Stateless RSC, immutable content |
| Security | 78 | RLS-first + guard; providers + 0012 RLS audit pending |
| Maintainability | 90 | 652 tests, DDD, no dup |
| Performance | 78 | RSC/static; audits + media opt pending |
| Accessibility | 82 | Built-in a11y; formal axe pending |
| Developer Experience | 88 | Typed/tested/gated |
| Documentation | 92 | Freeze + this plan + baselines |
| Business Readiness | 60 | Product/pricing modeled; checkout/admin pending |
| Production Readiness | 45 | Staging + wiring not done |
| Commercial Readiness | 48 | No real payments yet |
| Learning Experience | 72 | Player built; assessment/media/persistence pending |
| Administration | 65 | Live admin exists; V3 authoring pending |
| Internationalization | 84 | FR/EN/ES structure; per-locale SEO pending |
| AI Readiness | 55 | Entitlement + engine hooks; no AI yet |
| **Weighted overall** | **~74** | Strong foundation, wiring remains |

---

## 9. Estimates

- **Current completion:** **~42%** of V1.0 (foundation + engines + presentation done; wiring/audits/launch remain).
- **Remaining effort:** ~9 focused sprints (S5–S13) + RC.
- **Estimated remaining sprints:** **9** (S5→S13).
- **Estimated production-readiness date:** with 1 sprint/week cadence and the strict per-sprint GO gates,
  **~9–12 weeks** from S5 start (indicative **early-to-mid Q4 2026**), gated by: dedicated staging project
  availability, Stripe/KMS/provider setup, and one pilot-cohort parity cycle. Backup posture (Free-plan =
  manual) may add time or warrant a plan upgrade before launch.

---

## 10. Recommended immediate next step
Start **S6 (Staging Foundation & Persistence)** *before* or *in parallel with* S5 — it is the blocker that
unblocks real-data validation for every other epic. Requires a **dedicated staging Supabase project**
(please provision) so `0009/0011/0012` can be applied safely away from production.
