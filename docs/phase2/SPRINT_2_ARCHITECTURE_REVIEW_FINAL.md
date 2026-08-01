# ARCADINS Training Center — Sprint 2: Final Enterprise Architecture Review

> Second-pass validation against enterprise-LMS standards, before Migration 0014. **No SQL.** Verdict per
> dimension is one of: ✅ **COVERED** (seam already exists — explained), ➕ **ADDITIVE EXTENSION** (missing,
> but added without redesign — the seam is reserved), ❌ **REDESIGN RISK** (would force structural rework).
> **Result: zero ❌. Every gap is ➕ additive.** The guarantee in §5 holds *provided* the two "adopt-now"
> seams (tenant_id on all business tables; unified audit taxonomy) are taken in the early migrations.

---

## 1. Multi-tenancy — tenant / organization / campus / country

| Concern | Verdict | Detail |
|---|---|---|
| **tenant** | ✅ + ➕ | `tenants` table (root/white_label/enterprise/university/government/partner) + `current_tenant()` resolver exist. `tenant_id` present on **10 commerce tables** only. **➕ Extend `tenant_id` (default root, FK) to ALL business tables** (academic content, orders, payments, assets, engagement, discussion) — new tables get it at birth; academic tables get an additive backfill. |
| **organization** | ✅ | `organizations` (institution/corporate/school/immigration_agency/partner) + `licenses`/`license_seats` for B2B seats. |
| **campus** | ➕ | **No campus/branch entity.** Add `campuses` (`org_id → organizations`, name, country, `tenant_id`); `enrollments`/`licenses`/`cohorts` gain optional `campus_id`. Additive. |
| **country** | ✅ | `countries` reference (currency + `tax_bps`); `organizations.country`, `offers.country_scope`. **➕** add `profiles.country` for user-level locale/tax. |

**Why it's not a redesign:** the tenant boundary already exists as a first-class root with a resolver; adding
`tenant_id` columns + a `campuses` table is pure `ALTER ADD COLUMN` / `CREATE TABLE`. **Decision to adopt now:**
make `tenant_id` mandatory on every new business table and backfill the academic ones in 0016 — otherwise a
future white-label launch means altering large tables (still additive, but avoidable churn).

---

## 2. Academic Engine — is it Program-centric, not Course-centric?

**Verdict: ✅ COVERED, Program/Version-centric — with one genuine addition (Learning Path).**

| Concept | Backing | Verdict |
|---|---|---|
| Program | `programs` (identity) | ✅ |
| Version | `program_versions` (versioned curriculum root: passing_score, weighting, publish lifecycle) | ✅ |
| Curriculum | `program_versions` **is** the curriculum root (modules hang off it) | ✅ (implicit) |
| Module | `modules` (competencies/objectives/prerequisites) | ✅ |
| Lesson | `lessons` (typed content blocks, resources, glossary) | ✅ |
| Activity | `assessments` + `assignments` + typed `lessons.content` blocks | ✅ concrete types (no generic `activities` table — **not needed**; a unified abstraction would add indirection without new capability) |
| Quiz | `assessments(kind='quiz')` + `assessment_questions` + `assessment_attempts` | ✅ |
| Assignment | `assignments` + `submissions` + `rubrics` | ✅ |
| Exam | `assessments(scope='final')` + `exam_runtime_sessions` (server-authoritative timer) | ✅ |
| Certificate | `certificates` + `certificate_status_history` + `credential_integrity_records` | ✅ |
| **Learning Path** | — | ➕ **MISSING** — add `learning_paths` + `learning_path_items` (ordered programs/products toward a goal, e.g. an "Immigration track" = TEF program + a professional training). |

**Why it's genuinely program-centric:** the model is `program → version → module → lesson`, with content
**versioned** and **translatable** (`content_translations`), assessments scoped lesson/module/final, and a
separate **runtime** layer (`assessment_sessions`, `exam_runtime_sessions`, `runtime_snapshots`) decoupled
from content by design. This is an LMS curriculum engine, not a flat "courses" table. The only missing
first-class concept is the **Learning Path** (cross-program sequencing) — additive.

---

## 3. Commerce Engine — full billing stack?

**Verdict: ➕ Strong catalog/pricing core; several billing tables are genuinely missing (all additive, phased into their sprints).**

| Concept | Verdict | Detail |
|---|---|---|
| Products | ✅ | `products` |
| Offers | ✅ | `offers` (multi-currency/country, one_time/subscription/lifetime, `stripe_price_id`) |
| Coupons | ✅ | `discounts` + `coupons` + `coupon_redemptions` |
| Taxes | ✅ + ➕ | per-country `countries.tax_bps` + `orders.tax_cents` capture. **➕** add `tax_rates` only if multi-jurisdiction (province/VAT) is needed. |
| **Invoices** | ➕ | **MISSING** — add `invoices` (number, fiscal PDF path, billing address snapshot, totals) derived from orders. |
| **Subscriptions** | ➕ | offers support subscription *pricing*, but no lifecycle table — add `subscriptions` (`stripe_subscription_id`, status, current_period_end, cancel_at). |
| Transactions | ✅ (designed) | `payments` (Stripe PaymentIntents) from Sprint-2 plan. |
| **Payment Methods** | ➕ | **MISSING** — add `payment_methods` (`stripe_payment_method_id`, brand, last4, exp) for re-billing. |
| Refunds | ✅ (designed) | `refunds` from Sprint-2 plan. |
| **Stripe Events** | ➕ | **MISSING & important** — add `stripe_events` (event id UNIQUE, type, payload, processed_at) for **idempotent webhook** processing/audit. |
| **Accounting Ledger** | ➕ | **MISSING** — add append-only `ledger_entries` (account, debit/credit cents, currency, ref) for revenue recognition. Advanced — build in Sprint 4 wiring, seam reserved now. |

**Why it's not a redesign:** the catalog/pricing/entitlement core (products/packages/offers/discounts/
scholarships/licenses/enrollments) is complete and correct. Orders, payments, invoices, subscriptions,
payment_methods, stripe_events and the ledger are **new tables that hang off `orders`/`offers`/`auth.users`**
— nothing existing changes shape. They're phased into **Sprint 4 (Payments)** where they're actually wired;
Sprint 2 just reserves the seams (orders/payments in 0017).

---

## 4. Enterprise Audit — one spine for all event classes

**Verdict: ✅ COVERED by a generic model — needs only a classification column + a documented taxonomy (additive).**

The existing `audit_log` (0013) is **already a universal event sink**: `actor_id/email/role` + free-form
`action` + `target_type`/`target_id` + `metadata jsonb` + `ip`/`user_agent`, **append-only** (UPDATE/DELETE
blocked by trigger), service-role-only. Every class you list is just an `action` namespace:

| Event class | How it's recorded | Extra |
|---|---|---|
| System / Security / Authentication / Admin | `audit_log` with `action='auth.login'`, `security.rate_limit_block`, `admin.role_change`, … | — |
| Payment | `audit_log('payment.*')` **+** the `payments`/`refunds`/`stripe_events` ledger | — |
| Notification / Email | **`notification_delivery_logs`** already logs channel/provider/status/attempts/dedup | already specialized |
| Course / Academic | **`academic_audit_events`** + `learning_events` + `certificate_status_history` | already specialized |
| API | usually observability (OTEL hooks exist), not Postgres | reserve `api.*` action namespace |

**➕ The single refinement:** add two columns to `audit_log` — `category text CHECK IN (system, security,
auth, admin, payment, notification, email, api, course, data)` and `severity text CHECK IN (info, warning,
critical)` — and publish the **action taxonomy**. That turns the generic log into a filterable enterprise
audit spine **without any redesign** (the specialized logs remain as high-fidelity satellites).

**Why "already covered":** an append-only actor+action+target+metadata log is the canonical enterprise audit
shape; you extend it by convention (new `action`/`category` values), never by schema change.

---

## 5. Scalability — will any future feature force a redesign?

**Verdict: ✅ No structural redesign required — conditional on adopting two seams now.**

Structural properties already in place that prevent redesign:
- **UUID PKs** everywhere (no id exhaustion, merge-safe across tenants/imports).
- **Tenant seam** (`tenants` + `current_tenant()`) — mono-tenant today, white-label later with no app change.
- **`text` + `CHECK` enums** (not native ENUM) — values evolve with a cheap CHECK swap, no type migration.
- **`jsonb` payloads** for flexible/versioned content, entitlements, metadata — new fields need no columns.
- **Content versioning** (`program_versions`, `content_translations`) — new curriculum ≠ new schema.
- **Read-model projections** (`progress_projection`) + **idempotency journal** (`academic_commands`) +
  **append-only event logs** — CQRS-friendly; scale reads without touching writes.
- **Decoupled runtime** (text-id links, no FK to content) — runtime scales/shards independently.

**Two seams to adopt now so the guarantee holds (both additive):**
1. **`tenant_id` on every business table** (not just the 10 commerce ones) — else white-label later means
   altering large academic/engagement tables. Adopt in 0016.
2. **Unified audit taxonomy** (`category`/`severity` on `audit_log`) — adopt in 0015.

**Scale levers available later with zero app/redesign impact:** declarative **partitioning** of the high-volume
append-only tables (`audit_log`, `learning_events`, `runtime_events`, `stripe_events`) by time; read replicas;
`jsonb` → generated columns/indexes as query patterns emerge. All are ops-level, not schema redesign.

---

## Revised migration plan (folds in this review — still additive, staging-first, gated)

| Mig | Title | Adds |
|---|---|---|
| **0014** | Base reconciliation | self-contained base (certificates/enrollments/lesson_progress) + **enrollments drift fix** |
| **0015** | Roles + audit spine | `instructor`/`superadmin` roles; `is_admin()`/`is_staff()`; **`audit_log.category`/`severity`** + taxonomy |
| **0016** | Tenancy completion + taxonomy | **`tenant_id` on all remaining business tables**; enable RLS on `tenants`; `campuses`; `departments`; `categories`/`product_categories` |
| **0017** | Commerce ledger | `orders`, `order_items`, `payments`, `refunds`, **`invoices`**, **`subscriptions`**, **`payment_methods`**, **`stripe_events`**, **`ledger_entries`** (seams; wired in Sprint 4) |
| **0018** | Content assets | `assets`, `lesson_assets` (+ storage buckets/policies) |
| **0019** | Engagement | `notes`, `bookmarks`, `discussion_threads`, `discussion_posts` |
| **0020** | Academic paths | **`learning_paths`**, `learning_path_items` |
| **0021** | (deferred) Analytics marts / partitioning | only when raw events prove insufficient / volume warrants |

---

## Bottom line
- **Academic engine:** ✅ genuinely Program/Version-centric; only **Learning Path** missing (additive).
- **Multi-tenancy:** ✅ seam exists; **extend `tenant_id` everywhere + add `campuses`** (additive).
- **Commerce:** ✅ catalog/pricing complete; **invoices/subscriptions/payment_methods/stripe_events/ledger**
  are new tables reserved now, wired in Sprint 4 (additive).
- **Audit:** ✅ generic append-only spine already universal; **+`category`/`severity` + taxonomy** (additive).
- **Scalability:** ✅ **no redesign** for any planned enterprise feature, given the two adopt-now seams.

**Every gap is `CREATE TABLE` / `ALTER ADD COLUMN` — zero destructive change, zero rebuild.** With this
revised plan, the architecture meets enterprise-LMS standards and is future-proof against structural redesign.

**Approve and I begin Migration 0014 (base reconciliation) — staging-first, gated, reversible. No SQL until you say go.**
