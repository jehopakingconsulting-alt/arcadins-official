# TEF Canada — Vertical Slice Implementation Plan

> Plan only. **No implementation until GO.** First production-grade end-to-end product flow, TEF Canada as
> reference product. Reuses existing engines/repos; builds the product/pricing layer, content, UX, certification
> wiring, and legacy projection. Everything flag-gated, additive, reversible. Honors the 8 authoritative decisions.

---

## A. What already exists → REUSE (do not rebuild)

| Layer | Existing asset | Use |
|---|---|---|
| Curriculum model | `src/lib/academic/types.ts` (`ProgramCurriculumV2`, `ModuleV2`, `LessonV2`, `SummativeAssessment`, `FinalExam`, `Rubric`, `GradingWeights`, `BankQuestion`) | TEF content authored against this |
| Learning runtime | `runtime/` (runtime-engine.derive, journey, progression, navigation) | Journey/unlock/percent computation |
| Assessment | `assessment/AssessmentEngine` + grading/partial-credit/competency/integrity/selector/feedback/public-serializer | Quiz + mock-exam flow |
| Exam | `exam/*` + `navigation-policy-engine` | Secure mock exam |
| Certification | `certification/`, `credential-issuance/`, `credential-crypto/` (Ed25519), `secure-credential-orchestration/`, `certification-authority/` | Attestation issue + sign + verify + lifecycle |
| Persistence | `repositories/supabase-{program,enrollment,progress,assessment,exam,certification,audit}-repository.ts` + factory/contracts/mappers | Wire engines to Supabase |
| Client-safe boundary | `ui/security/ensure-client-safe` + `public-curriculum` | Mandatory server→client guard |
| View models | `ui/view-models.ts` | Client contracts |
| Schema | migrations `0009_academic_model`, `0011_academic_runtime_integration` (program_versions, modules, lessons, assessments, assessment_sessions, module_progress, runtime_snapshots, credential_integrity_records, public_verification_events, content_translations, …) | Apply on staging; extend, don't recreate |
| Migrated history | `legacy_*` + `legacy_id_map` (283 rows live) | Projection source |

**~75% of the slice is wiring + content + UX.** Genuinely new: the **Product/Package/Pricing** layer, **legacy→canonical projection**, **PDF+QR document generation UX**, and the **student/admin UX shells**.

---

## B. What must be BUILT (minimal for the slice)

### B1. Canonical tables to add (new migration `0012_products_pricing.sql`, additive, NOT applied to prod)
```
catalog.products            (id, slug 'tef-canada', kind 'exam_prep', title, status, certificate_wording, active)
catalog.product_versions    (product_id, semver, program_version_id → existing program_versions, published_at)   -- binds product ↔ curriculum
catalog.packages            (product_id, tier 'starter|essential|premium|vip', access_weeks, mock_attempts, coaching_hours, support_level)
catalog.prices              (package_id, currency, amount_cents, billing 'one_time|subscription', stripe_price_id, promo_starts, promo_ends, active)
enroll.enrollments          (learner_id, product_version_id, package_id, entitlement snapshot, access_starts, access_expires, source)   -- confirm vs existing enrollment repo; extend if present
runtime.progress_projection (learner_id, product_version_id, projected_from 'legacy'|'native', synced_at)   -- idempotent bridge marker
```
- Confirm whether an `enrollments` table already exists behind `supabase-enrollment-repository`; if so, **extend** (add product/package/entitlement columns) rather than duplicate.
- **Stripe price IDs live only in `catalog.prices.stripe_price_id`** (external config), never in code.

### B2. Product & pricing service + config
- `src/lib/catalog/` — product/package/price loaders, entitlement resolver (pure), currency-aware price selection, promo-window check (injected clock). No Stripe calls yet.
- TEF packages seeded from the **provisional V1 tiers** (Starter $97 / Essential $147 / Premium $247 / VIP $347 USD) as data, not code. Configurable per B1.

### B3. TEF product content (ProgramCurriculumV2 v1.0)
- Author TEF Canada as `program_versions` 1.0 using the existing `COURSE_LESSONS` French content + V1 archive as source. **Reusable content blocks** with a **TEF-specific curriculum mapping** (so TCF later reuses blocks without duplication). Immutable once published.

### B4. Legacy → canonical projection (idempotent)
- `src/lib/bridge/legacy-projection.server.ts` — on a migrated learner's first TEF access, project `legacy_learners` + `legacy_modules` into `runtime.progress` for the TEF version, guarded by `progress_projection` marker (run-once, CAS). **Never recompute/alter** legacy; read-only source.

### B5. Certification wiring + historical PDF regeneration
- Connect `secure-credential-orchestration` to the Supabase certification repo + a **key-provider adapter** (Supabase Vault / ephemeral for staging).
- **Deterministic PDF+QR generator** (`src/lib/certification/document/`): renders attestation from a credential record → PDF, QR = public verify URL + fingerprint. Legal-safe wording.
- **Legacy PDF regeneration (Decision 3, Option 2):** deterministic job that, for each of the 7 `legacy_certificates`, regenerates the PDF from the preserved record (identity, cert number, issue date, programme, result), marks it a regenerated historical copy, links to the existing legacy record, **issues NO new credential identity**, verifies no duplicate, writes an **audit entry per document**. Output to `legacy-certificates/<uuid>.pdf`.

### B6. UX shells (flag-gated routes)
- `/tef` product landing + offer (packages) → `/tef/inscription` (package select) → auth/enroll → `/tef/apprendre` (dashboard → module nav → lesson player → quiz → results/recommendations → completion → attestation) ; public `/verify/[id]`; admin visibility under `/admin`.

---

## C. Feature flags (all OFF in prod)
`TEF_PRODUCT_ENABLED`, `TEF_RUNTIME_ENABLED`, `CERTIFICATION_LIVE_ENABLED`, `LEGACY_PROJECTION_ENABLED`, `TEF_CHECKOUT_ENABLED` (real payments stay off until checkout+prod env validated — Decision 4).

---

## D. Sprint sequence (each: build → gates → atomic commit → report → STOP for GO)

| Sprint | Scope | Flow points | Acceptance criteria |
|---|---|---|---|
| **S0 Schema+contracts freeze** | `0012` migration (staging only) + catalog/entitlement TS contracts + apply `0009`/`0011` on staging | — | Migration applies clean on staging; types compile; in-memory adapters green; 0 prod change |
| **S1 Product & pricing** | `catalog/` service + TEF packages/prices seed (V1 tiers as data) + entitlement resolver | 1,2 | Unit tests: price-by-currency, promo window, entitlement resolution; no Stripe call |
| **S2 Landing + offer** | `/tef` landing + package presentation (design system, i18n, a11y) | 1,2 | Renders 4 packages from data; responsive; axe clean; client-safe scan pass |
| **S3 Enroll + auth** | register/login reuse + `/tef/inscription` enroll → `enroll.enrollments` | 3,4 | Enroll writes entitlement snapshot; access window set; RLS scoped; idempotent |
| **S4 Dashboard + nav** | student dashboard (mastery/next-action) + module/lesson navigation on runtime-engine | 5,6 | Journey derived server-side; view-models only; no private data crosses boundary |
| **S5 Lesson player + quiz** | lesson player (typed blocks) + formative quiz via AssessmentEngine | 7,8,9 | Server grades; answer keys never client-side; progress+competency updated (CAS) |
| **S6 Mock assessment + results** | one mock-exam flow + results/recommendations + completion eligibility | 10,11,12 | Exam integrity enforced; eligibility computed by engine; public feedback only |
| **S7 Certification + verify** | issue attestation (Ed25519) + PDF+QR + `/verify/[id]` | 13,14 | Deterministic signed credential; public verify shows no private data; lifecycle available |
| **S8 Legacy projection + PDF regen + admin** | first-login projection for a migrated learner + 7-PDF regeneration + admin visibility | 15,16 | Projection idempotent, history unaltered; 7 PDFs regenerated, 0 duplicate credentials, audit per doc; admin sees learner+credential |
| **S9 Hardening** | responsive, a11y, security boundary + private-data scans, Playwright E2E, rollback proof | 17,18,19,20 | Full gate suite green end-to-end on staging; rollback rehearsed |

**Shortest safe path to a usable production-ready TEF flow:** S0→S1→S3→S4→S5→S7 gives a demoable enrolled-learner→lesson→quiz→attestation path; S2/S6/S8/S9 complete the production bar. (S8 projection can precede public launch but not gate the first internal demo.)

---

## E. Per-sprint gate suite (Decision 7)
typecheck · lint · `node --test` unit · integration (adapters) · Playwright browser · axe a11y · responsive (375/768/1280) · client-boundary + private-data scan (`ensure-client-safe`, bundle scan) · commit hash + files changed + remaining risks · **STOP for GO**.

---

## F. Guardrails (standing)
Additive migrations, staging-first, flags OFF in prod, no real payments, no destructive ops, no edits to existing prod records, don't touch the 8 other programs, `legacy_*` preserved until parity+rollback proven + explicit authorization. Small reversible commits; master untouched until a merge is explicitly authorized.

---

## G. Open confirmations before S0
1. **Enrollment table:** extend the existing one (behind `supabase-enrollment-repository`) or add `enroll.enrollments`? (I'll confirm by inspection at S0 start.)
2. **Staging project:** same Supabase project with flags, or a separate staging project for `0009`/`0011`/`0012`? (Recommended: separate staging to exercise schema safely.)
3. **First demo target:** internal staging demo after S7, or wait for full S9 before you review?
