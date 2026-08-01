# ARCAdINS V1 → V2 — Complete Production Inventory & Migration Matrix

> **Read-only.** No production write, no import, no credentials used. Built from the V1 codebase
> (`C:\Users\PC\Desktop\arcadins-training`), the sha256-verified PROD export copy
> (`scripts/migration/_data/legacy-export.json`, sha256 `952c4126…83b5b`, integrity ok, 0 FK violations),
> and the V2 Supabase migrations.
> **Nothing is migrated until you approve this matrix.**

---

## PART A — V1 PRODUCTION INVENTORY (what actually exists)

### A1. Database (SQLite `arcadins.db` / `arcadins-PROD.db`) — 9 tables, real row counts

| Table | Rows | Purpose | Key columns |
|---|---|---|---|
| `users` | **28** | Auth + student + tutor-candidate, all-in-one | id, nom, prenom, email(UNIQUE), **password_hash (bcrypt)**, role, status, plan, trial/qualification/final scores, `modules_progress` (JSON), current_module, certificate_id, payment_* , stripe_session_id, referral_code, referred_by, reset_token, signup_ip, last_login_* , moderator_permissions, tuteur_* (17 cols) |
| `prospects` | **26** | Leads (no account) | id, nom, prenom, email, telephone, pays, source |
| `tests` | **35** | Trial/qualification/final attempts | user_id(FK), test_type, score, passed, attempt_number, answers(JSON) |
| `modules` | **168** | Per-student module progress | user_id(FK), module_number, status, score, test_score, test_passed, test_attempts |
| `certificates` | **7** | Issued certificates | user_id(FK), certificate_number(UNIQUE), nom, prenom, programme, score, issued_at, **pdf_path** |
| `tuteur_modules` | **0** | Tutor-track progress | (empty) |
| `affiliate_commissions` | **0** | Referral commissions | (empty) |
| `admin_settings` | **5** | Config (max_attempts_final=3, max_attempts_trial=1, passing_score_final=70, passing_score_qualification=0, total_modules=14) | key, value |
| `admin_audit_log` | **14** | Admin actions | admin_id, action, target_user_id, details, ip |

**Total meaningful rows: 283.** No SQLite triggers, views, RLS, or cron (SQLite backend — those concepts are Postgres-side, created fresh in V2).

### A2. Authentication
- **bcrypt** password hashes in `users.password_hash`. `reset_token` / `reset_token_expires` transient.
- Roles: `role` (prospect/student/tuteur/admin/moderator) + `status` (trial/active/…) + `moderator_permissions` (JSON).

### A3. Products, pricing & curriculum (⚠️ key finding)
- **ONE unified commercial product** in V1: `"TEF & TCF Canada - Préparation Complète"` (certificates.programme default).
- **14 shared modules** (`admin_settings.total_modules = 14`; `MODULE_TITLES`/`MODULE_DESCRIPTIONS` in `server/routes/modules.js`). The **same 14 modules** serve both TEF and TCF candidates.
- **4 pricing tiers** (`server/routes/plans.js`, one-time USD): Starter **$97** / Essential **$147** / Premium **$247** / VIP **$347** (6–12 weeks). **Not** split by TEF vs TCF.
- **Question banks** (code, not DB): `server/data/questionBank.js` (shared TEF+TCF), `server/data/tuteurTest.js`.
- **TEF vs TCF is the learner's target-exam objective (`plan`/objective), not a separate product, curriculum, module set, exam, or certificate.** There is no separate "TEF product" or "TCF product" data in V1 production to migrate.

### A4. Storage & media
- **Certificate PDFs**: `server/certificates/*.pdf` (referenced by `certificates.pdf_path`; 7 certificates → 7 PDFs; 1 sample present locally: `ARC-2026-YYWFUG63.pdf`).
- **Static images**: `assets/img/` (logo.svg, logo-nav.svg, hero/, blog/). No videos in production.

### A5. Server features (Express `server/`)
auth · trial · qualification · modules · finalTest · certificate (PDF gen via `services/pdf.js`) · plans (Stripe checkout) · affiliate · tuteur · contact · admin · email (`services/email.js`). **Notifications** = transactional email only (no notifications table in V1).

---

## PART B — V2 TARGET (what already exists to receive it)

- **Postgres/Supabase**, 45+ tables. Dedicated **receiving tables** already built (migration `0005`): `legacy_learners`, `legacy_prospects`, `legacy_tests`, `legacy_modules`, `legacy_certificates`, `legacy_admin_settings`, `legacy_audit_log`, `legacy_referrals`, `legacy_id_map` + `auth.users`/`profiles`/`referral_*`.
- **Migration RPCs** (`0006`): `migrate_import_account`, `migrate_lookup`, `migrate_validation_report`, `migrate_rollback`, `migrate_rollback_user`, `migrate_validation_user`.
- **Storage**: private bucket **`legacy-certificates`** + admin-read RLS (declared in `0005`).
- **Mapping doc** `ARCADINS_LEGACY_DATA_MAPPING.md` already authored.
- **State**: migrations `0005`/`0006` are **versioned files, NOT applied to the prod DB** (confirmed earlier). Import pipeline dry-run passes clean (283 rows, 0 rejects).

---

## PART C — MIGRATION MATRIX (4 categories)

### 1) ✅ Already migrated / covered in V2
| Asset | V2 status |
|---|---|
| Public content (TEF, **TCF**, FAQ, guide, blog, about, legal) | Phase 2 ✅ shipped |
| App features (auth, dashboard, learn/modules, examens, certificates, tutorat, referral, admin, contact, notifications engine) | Phase 1 ✅ reimplemented |
| Receiving schema (`legacy_*`, `referral_*`, `legacy_id_map`) + migration RPCs + `legacy-certificates` bucket | Built ✅ (files; **not yet applied to prod DB**) |
| Import/transform/reconcile/rollback pipeline | Built ✅, dry-run green |

### 2) 🔴 Needs migration (real production data — not yet imported)
| V1 source | Rows | → V2 destination | Risk |
|---|---|---|---|
| `users` (accounts) | 12* | `auth.users` + `profiles` + `legacy_learners` | 🔴 identity/bcrypt |
| `users`/`prospects` (leads) | 16*+26 | `legacy_prospects` | 🟢 |
| `tests` | 35 | `legacy_tests` | 🟠 |
| `modules` | 168 | `legacy_modules` | 🟠 progression |
| `certificates` | 7 | `legacy_certificates` | 🟠 never re-issue |
| Certificate **PDFs** | 7 | `legacy-certificates` bucket | 🟠 storage upload |
| `admin_settings` | 5 | `legacy_admin_settings` | 🟢 |
| `admin_audit_log` | 14 | `legacy_audit_log` | 🟢 |
| bcrypt password hashes | 12 | auth strategy (see reconciliation) | 🔴 |

*transform splits 28 `users` into ~12 real accounts + 16 lead-prospects (email dedupe). `tuteur_modules`/`affiliate_commissions` = 0 rows → nothing to import.

### 3) 🟠 Needs reconciliation (business decision required before/at migration)
| Item | V1 reality | V2 reality | Decision needed |
|---|---|---|---|
| **TEF/TCF as "separate products"** | ONE shared product, 14 shared modules, 1 certificate programme | `/tef` + `/tcf` content pages; no separate product/curriculum/pricing objects | Do you want V2 to **create** two independent products (net-new authoring), or keep V1's unified model? This is **product design, not data migration** — the split data does not exist in V1. |
| **Pricing model** | Starter $97 / Essential $147 / Premium $247 / VIP $347 **USD**, one-time | Starter 199/159 · Professionnel 449/359 · Entreprise **CAD**, monthly/annual SaaS | Which pricing is authoritative for V2? Currencies, tiers, and billing model differ entirely. |
| **Certificate wording** | "certificat officiel" | "attestation de complétion" (legal-safe) | Keep V2's legal-safe wording on migrated records? (recommended: yes) |
| **Module curriculum depth** | 14 modules (code content + question bank) | 8-lesson live tracks (non-TEF/TCF programs) | Should V1's 14-module TEF/TCF curriculum be ported as a V2 learning track, or remain the runtime-v2 curriculum? |
| **Password strategy** | bcrypt hashes | Supabase auth | bcrypt re-verify vs forced reset-on-first-login (recommended: reset email) |
| **Roles/permissions** | role+status+moderator_permissions (JSON) | RBAC roles (migration `0002`) | Map V1 roles → V2 RBAC values |

### 4) ⚪ Obsolete (with justification)
| Asset | Why obsolete |
|---|---|
| `reset_token`, `reset_token_expires` | Transient security tokens; Supabase auth issues its own. Migrating them is a security anti-pattern. |
| `signup_ip`, `last_login_ip`, `last_login_device` | Telemetry PII; V2 auth tracks its own sessions. Drop for data-minimization (unless you require audit retention). |
| `tuteur_modules`, `affiliate_commissions` | **0 rows** — nothing to migrate (receiving structure already exists if needed later). |
| SQLite `stripe_session_id` as live handle | Historical reference only; do **not** replay against Stripe. Store as read-only legacy metadata. |
| V1 Express server code, `.db` file, `netlify.toml`/`render.yaml` | Replaced by V2 Next.js/Supabase/Vercel. Not migrated (superseded infrastructure). |

---

## PART D — EXECUTION ORDER (after you approve, one category at a time)

1. **Gate:** you confirm the §3 reconciliation decisions (esp. TEF/TCF product model + pricing).
2. **Backup proof** (you, in Supabase) → then apply `0005` + `0006` on **staging**.
3. Import **category 2** in dependency order: admin_settings → prospects → users(accounts) → tests → modules → certificates → **PDF storage** → audit_log.
4. Validate each batch (`migrate_validation_report`, row-count parity) before the next.
5. Password reset emails (not hash replay). Rollback (`migrate_rollback*`) verified reversible throughout.

**No production write occurs until you approve this matrix and provide, one at a time, each required access.**

---

## VERDICT

**INVENTORY COMPLETE — MIGRATION MATRIX READY FOR YOUR APPROVAL.**
283 production rows + 7 certificate PDFs catalogued; receiving schema, RPCs, storage bucket, and import pipeline already built (dry-run clean). **The one blocking clarification is §3: TEF/TCF are a single unified product in V1, not separate products — please confirm the intended V2 product & pricing model before any import.**
