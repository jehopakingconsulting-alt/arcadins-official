# ARCADINS TRAINING CENTER — V3 MASTER ROADMAP
**Executive planning document — not an implementation.** Prepared for investors, future developers,
and long-term maintainers. Baseline: V2 frozen at commit `6dfc922` (see `ARCADINS_V2_PRODUCTION_SNAPSHOT.md`).

> **Strategic thesis:** V2 shipped a stable, honest public platform *and* a large amount of built-but-dormant
> infrastructure (commerce engine, LMS runtime, analytics, certification). **V3 is primarily an ACTIVATION
> and INTEGRATION program, not a green-field build.** The dominant risk is not "can we build it" but
> "activate safely, verify end-to-end, and load real content." Sequencing matters: revenue first, then
> learning depth, then intelligence.

**Complexity legend:** S (days) · M (1–2 weeks) · L (3–6 weeks) · XL (multi-month).

---

## PHASE 1 — STUDENT COMMERCE (self-service enrollment)
- **Objectives:** Replace lead-gen ("demande d'admission, 24–48h") with instant self-service enrollment
  for TEF/TCF and the 9 formations. Payment = enrollment.
- **Scope:** Enrollment form → package/modality selection → account → checkout → auto-enrollment →
  access. Program-specific entitlements (TEF unlocks TEF only). Registration-fee (one-time, global) logic.
- **Dependencies:** V2 commerce engine (built, flag-gated), migration `0014` (applied). **Owner Stripe
  dashboard access** (currently blocked on passkey recovery).
- **Estimated complexity:** **M** (mostly activation + wiring; engine exists).
- **Risks:** business-rule correctness (currency, fee, installments); duplicate enrollment; access control.
- **Business value:** **Highest** — converts a brochure into a transacting product; unlocks revenue and scale.
- **Deliverables:** live enrollment funnel; program/formation checkout; entitlement gating; admin order views.

## PHASE 2 — STRIPE PAYMENTS (full activation + financing)
- **Objectives:** Production-grade payments: cards, ARCADINS installments (3×/6×), and external financing
  (Klarna · Affirm · Afterpay).
- **Scope:** Stripe live keys + test-mode E2E first (30 mandatory scenarios); webhook (idempotent,
  signature-verified); success/cancel/refund flows; invoices/receipts.
- **Dependencies:** Phase 1; Stripe account config (enable BNPL in Payment methods); `STRIPE_WEBHOOK_SECRET`.
- **Estimated complexity:** **M**.
- **Risks:** real-charge safety (test mode first, no real charge without authorization); webhook reliability;
  installment default handling (suspend/restore).
- **Business value:** **High** — flexible payment options materially lift conversion for CA$1,500 programs.
- **Deliverables:** verified payment chain; BNPL live; refund + failed-payment handling; billing artifacts.

## PHASE 3 — STUDENT DASHBOARD (live)
- **Objectives:** A real post-purchase home: purchased programs, progress, continue-learning, certificates,
  billing, notifications.
- **Scope:** Activate the built dashboard components against live enrollment/progress data; empty/loading states.
- **Dependencies:** Phases 1–2; learning migrations (`0009`/`0011`) for progress data.
- **Estimated complexity:** **M**.
- **Risks:** data mapping between enrollment surfaces (unify System-1 + program_enrollments).
- **Business value:** **High** — retention, perceived value, reduced support.
- **Deliverables:** live student dashboard; unified enrollment read model.

## PHASE 4 — LMS ACTIVATION (course player + progress + exams)
- **Objectives:** Turn on the dormant learning runtime: lessons, media, resources, progress persistence,
  exams (auto-graded), sequential unlocking.
- **Scope:** Apply migrations `0009`/`0011`; flip `LEARNING_RUNTIME_ENABLED` / `NEXT_PUBLIC_LEARNING_EXPERIENCE_ENABLED`;
  wire runtime engines ↔ UI ↔ Supabase repositories; load real course content.
- **Dependencies:** Phases 1–3; **content authoring** (academic content complete only for marketing-digital).
- **Estimated complexity:** **L–XL** (activation is L; content authoring is XL).
- **Risks:** content completeness is the critical path; runtime↔DB persistence correctness; performance at scale.
- **Business value:** **High** — this is the actual "learning platform" promise.
- **Deliverables:** working course player; progress engine; exam engine; per-program content packs.

## PHASE 5 — CERTIFICATES (issuance + verification portal)
- **Objectives:** Automatic certificate on completion: unique number, QR, public verification portal, PDF.
- **Scope:** Activate the built certification/credential subsystem (incl. cryptographic signing) + public
  verification route; honest wording ("Certificate of Completion", not "official").
- **Dependencies:** Phase 4 (completion signals); key management for signatures.
- **Estimated complexity:** **M** (engine over-built; mostly activation + PDF/portal wiring).
- **Risks:** legal wording accuracy; key custody; verification-URL stability.
- **Business value:** **Medium-High** — tangible outcome, shareable proof, credibility.
- **Deliverables:** auto-issued certificates; `/verify` portal; downloadable PDFs.

## PHASE 6 — AI TUTOR (assistance layer)
- **Objectives:** AI study assistant, practice conversations, quiz generation, progress coaching — on top of
  the AI-ready runtime.
- **Scope:** Integrate an LLM (default to the latest Claude models) behind the existing composable runtime;
  guardrails, cost controls, honest "AI-assisted" labeling.
- **Dependencies:** Phase 4 (content + progress signals); model provider + budget; privacy review.
- **Estimated complexity:** **L**.
- **Risks:** accuracy/hallucination; cost per student; data privacy; over-promising "AI" capabilities.
- **Business value:** **Medium-High** — differentiation + engagement; premium tier upsell.
- **Deliverables:** AI tutor in the player; AI practice; AI quiz generation; usage metering.

## PHASE 7 — AFFILIATE / REFERRAL
- **Objectives:** Growth via referral codes and affiliate tracking (honest, disclosed).
- **Scope:** Activate the existing referral module; affiliate attribution, payouts config, dashboards.
- **Dependencies:** Phases 1–2 (transactions to attribute); `REFERRAL_ENABLED` flag.
- **Estimated complexity:** **M**.
- **Risks:** fraud/self-referral; payout accounting; disclosure compliance (CASL).
- **Business value:** **Medium** — lower CAC, viral growth.
- **Deliverables:** referral codes; affiliate dashboard; attribution + payout reporting.

## PHASE 8 — CRM (relationship + lifecycle)
- **Objectives:** Manage prospects → students → alumni lifecycle; segmentation; lifecycle emails.
- **Scope:** Unify `contact_requests`, enrollments, and student profiles into a CRM view; automated
  lifecycle campaigns (welcome, reminders, renewals, win-back).
- **Dependencies:** Phases 1–3; email provider (Resend) at scale.
- **Estimated complexity:** **L**.
- **Risks:** data unification; email deliverability/consent (CASL); PII governance.
- **Business value:** **Medium-High** — retention + LTV + reactivation.
- **Deliverables:** CRM admin; lifecycle automation; segmentation + consent management.

## PHASE 9 — ANALYTICS (business + learning intelligence)
- **Objectives:** Executive + operator analytics: revenue, enrollments, completion, dropout, cohort, LTV,
  funnel, exam outcomes.
- **Scope:** Extend the built analytics engine + admin dashboard; add funnel + product analytics
  (GA4/Plausible); investor-grade reporting.
- **Dependencies:** Phases 1–5 (data to analyze).
- **Estimated complexity:** **M**.
- **Risks:** metric definitions/consistency; privacy-compliant tracking.
- **Business value:** **High** — data-driven decisions + investor reporting.
- **Deliverables:** analytics dashboards; funnel tracking; scheduled reports.

## PHASE 10 — MOBILE APP
- **Objectives:** Native mobile learning experience (offline lessons, notifications, on-the-go practice).
- **Scope:** React Native / Expo client consuming the same APIs; auth, player, progress, notifications.
- **Dependencies:** Phases 1–5 (stable APIs + content); app-store accounts.
- **Estimated complexity:** **XL**.
- **Risks:** app-store review; offline sync; maintenance of a second client; scope creep.
- **Business value:** **Medium** — reach + engagement; strategic once web is proven.
- **Deliverables:** iOS/Android apps; offline mode; push notifications.

---

## Recommended sequencing & gates
1. **Revenue path first:** Phases 1 → 2 → 3 (commerce + payments + dashboard). Gate: 30-scenario test-mode E2E.
2. **Learning depth:** Phases 4 → 5 (LMS + certificates). Gate: content complete per program + progress persistence verified.
3. **Growth & intelligence:** Phases 7 → 9 → 6 → 8 (referral, analytics, AI, CRM).
4. **Reach:** Phase 10 (mobile) once web economics are proven.

## Cross-cutting non-negotiables (carry from V2)
- Honesty over marketing (no fabricated proof, no unguaranteeable promises).
- Feature-flag every unreleased subsystem; test-mode/staging before production.
- Additive, reversible, backup-gated database changes.
- Every public number = one authoritative source.
- Security, accessibility, and performance never regress.

---
*This roadmap is a plan, not an authorization to build. Each phase begins only on explicit owner GO.*
