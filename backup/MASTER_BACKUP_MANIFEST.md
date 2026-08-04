# ARCADINS — MASTER BACKUP MANIFEST
**The complete inventory required to fully restore or re-platform ARCADINS.**
Baseline: V2 code frozen at `6dfc922` · Manifest date: 2026-08-04

> A restore is complete only when **every item below is present**. Items marked **[YOU GENERATE]** must be
> produced by running the provided scripts with your credentials (the AI cannot access your live DB/secrets).

---

## 1. Source code (in Git — the authoritative code backup)
| Item | Location | Notes |
|---|---|---|
| Application code | GitHub `arcadins-official` @ `6dfc922` | tag recommended `v2.1.0` |
| Migrations | `supabase/migrations/0000–0014` | schema-as-code (see caveat §5) |
| Env template | `.env.example` (repo root) | required variable names |
| Documentation | `docs/*.md` (dossier, business, investor, onboarding, founder, snapshot, roadmap) | permanent reference |
| Backup tooling | `backup/*` (this package) | scripts + guides |

## 2. Database backup **[YOU GENERATE]** — via `backup/scripts/backup-all.sh`
| File | Purpose |
|---|---|
| `full_dump.dump` | Custom-format full dump (authoritative — use with `pg_restore`) |
| `full_dump.sql` | Plain SQL full dump (schema + data + RLS + functions + triggers + extensions) |
| `schema_only.sql` | Schema only |
| `data_only.sql` | Data only (column-inserts) |
| `tables_csv/*.csv` | Per-table CSV (deliverable 2) |
| `tables_json/*.json` | Per-table JSON (deliverable 2) |
| `TABLES.txt`, `FUNCTIONS.txt`, `RLS_POLICIES.txt`, `EXTENSIONS.txt` | Inventories |

## 3. Auth backup **[YOU GENERATE]** — see `STORAGE_AUTH_CONFIG_EXPORT.md` §4
| Item | How |
|---|---|
| `auth_schema.sql` | `pg_dump -n auth` (PII — store encrypted) |
| Providers / JWT / recovery / Redirect URLs / email templates | Documented from dashboard |

## 4. Storage backup **[YOU GENERATE]** — see `STORAGE_AUTH_CONFIG_EXPORT.md` §3
| Item | How |
|---|---|
| Bucket objects (hierarchy + filenames + content-type + metadata) | Supabase CLI / S3 sync |
| Bucket configs + policies | Documented |
> V2 public site does not use Storage; applies from V3 (media/PDF).

## 5. Configuration **[YOU GENERATE / DOCUMENT]**
| Item | Where |
|---|---|
| Env variable **values** | Vault / password manager (offline, ≥2 locations) — **never in repo** |
| Supabase project ref/region/PG version | Documented |
| Extensions / RLS / functions / cron | `EXTENSIONS.txt` / `RLS_POLICIES.txt` / `schema_only.sql` / Vercel Cron |
| Vercel project + domain/DNS records | Documented |
| Stripe account (webhook endpoint, enabled methods incl. BNPL) | Documented |

## 6. Migration history & order (in repo — verified)
```
0000_staging_base · 0001_tutoring_and_tutor_applications · 0002_roles_expansion · 0003_referrals ·
0004_notifications · 0005_legacy_import · 0006_migration_rpcs · 0007_hardening · 0008_program_reviews ·
0009_academic_model · 0011_academic_runtime_integration · 0012_catalog_products_pricing ·
0013_audit_log · 0014_program_commerce
```
> ⚠️ **Caveat (critical):** migrations reproduce only the objects they define. Some production business
> tables (`enrollments`, `programs`, `certificates`, `lesson_progress`) were created directly in prod and
> are **not** in the migration files. **The `pg_dump` (§2) is the authoritative schema+data source.**

## 7. Restore procedure
See `RESTORE_GUIDE.md` (Path 1: new Supabase · Path 2: standard PostgreSQL) + validation checklist.

## 8. Portability
See `PORTABILITY_REPORT.md` (Supabase-specific vs pure Postgres; AWS/Azure/GCP/DO/self-host effort).

## 9. Reuse as a template
See `ARCADINS_PLATFORM_TEMPLATE.md`.

---

## Restore-readiness checklist (tick before declaring "backed up")
- [ ] Repo cloned + tag pushed (`v2.1.0`).
- [ ] `backup-all.sh` run → `exports/<STAMP>/` produced (dump + CSV + JSON + inventories).
- [ ] `auth_schema.sql` exported (if migrating accounts).
- [ ] Storage exported (if any buckets).
- [ ] Env values saved to vault (≥2 offline copies, encrypted).
- [ ] Dashboard configs documented (Supabase Auth/URLs, Stripe webhook, Vercel domain/cron).
- [ ] **Test restore performed** on a scratch Supabase/Postgres → app boots + 740 tests green.
- [ ] Backup folder stored **offline + encrypted**, in ≥2 locations, with the manifest date recorded.

**When every box is ticked, ARCADINS is fully backed up, restorable, and portable.**
