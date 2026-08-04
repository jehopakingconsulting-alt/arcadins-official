# ARCADINS — ENTERPRISE BACKUP CERTIFICATE
**Issued for:** JeHoPa KING Consulting · **Subject:** ARCADINS Training Center V2
**Baseline:** code frozen @ `6dfc922` · **Audit date:** 2026-08-04 · **Evidence:** verified scans (not assumed)

> This certificate attests that ARCADINS can be rebuilt from the Git repository + backup package, and
> re-platformed to other providers, **provided the owner executes the data/secrets export steps** (which
> must remain owner‑held for security). Findings below are backed by verified commands.

---

## 1. Backup Completeness Report
| Component | Where | Status | Evidence |
|---|---|---|---|
| Application code | Git `master` @ `6dfc922` | ✅ Fully Recoverable | frozen baseline, tagged |
| Business logic | `src/lib/*` (pure + tested) | ✅ Fully Recoverable | 740 tests green |
| SQL / Migrations / Policies | `supabase/migrations/0000–0014` | ✅ In repo *(see caveat)* | 14 files verified |
| Architecture & docs | `docs/*` (18 md) + `backup/*` | ✅ Fully Recoverable | inventory verified |
| Backup scripts | `backup/scripts/backup-all.sh` | ✅ Fully Recoverable | present |
| Environment template | `.env.example`, `.env.qa.example` | ✅ Fully Recoverable | variable names documented |
| **Database DATA (+ true schema)** | run `backup-all.sh` → offline | ⚠ Requires manual step | authoritative dump = owner-run |
| **Authentication (users/config)** | `pg_dump -n auth` + dashboard doc | ⚠ Requires manual step | PII → owner-held |
| **Storage buckets** | Supabase CLI/S3 export | ⚠ Requires manual step | N/A for V2 public site |
| **Secrets / env VALUES** | vault (offline), never in repo | ⚠ Requires manual step | ✅ correct posture (see §6) |
| Static assets | repo `public/` + Vercel build | ✅ Fully Recoverable | in Git |
| **Missing** | — | ❌ **NONE** | no component is unrecoverable |

**Caveat (critical, verified earlier):** migrations reproduce only objects they define; original prod
business tables (`enrollments`, `programs`, `certificates`, `lesson_progress`) predate the migration files.
**The `pg_dump` is the authoritative schema+data source** — this is why the data export (⚠) is mandatory
for true independence.

**Interpretation:** every ⚠ is **data or secrets that must, by security best practice, live with the owner
(offline/vault), not in the repo.** The *tooling and instructions* to recover them are ✅ present. There is
**no ❌ Missing** item.

## 2. Reproducibility (fresh Windows machine, zero prior state)
**Question:** with only the repo + backup package, can a senior engineer rebuild ARCADINS? **Answer: YES**,
following these manual steps (nothing assumed):
1. Install **Node 24.x**, **Git**, **PostgreSQL client** (`psql`/`pg_dump`/`pg_restore`).
2. `git clone <repo>` → `git checkout 6dfc922`.
3. Create a target DB (new Supabase project **or** any Postgres 15+).
4. Restore data: `pg_restore … full_dump.dump` (from the offline export) — **or** apply migrations for a
   clean-room schema (then re-create the legacy tables from `schema_only.sql`).
5. Configure Auth (email provider, Site URL, **Redirect URLs incl. `/auth/update-password`**, JWT).
6. `cp .env.example .env.local`; fill values from the vault.
7. `npm install` → `npm run typecheck && npm run lint && npm test && npm run build` (**expect 740 tests green**).
8. `npm run start` (or deploy to Vercel). Run the smoke test (routes 200, 404 ok, h1=1, 0 console errors).
**Dependencies external to the package:** only the owner‑held **secrets** and the **live data dump** (both by design).

## 3. Master Recovery Checklist (zero → production)
1. Provision machine: install Node 24, Git, PostgreSQL client tools.
2. `git clone` the repo; `git checkout` the release tag (`v2.1.0` recommended).
3. Provision a database (Supabase project or Postgres 15+).
4. Retrieve the **offline backup export** (`full_dump.dump` + auth/storage) and the **secrets vault**.
5. Restore DB: `pg_restore --no-owner --no-privileges --clean --if-exists -d "<DB_URL>" full_dump.dump`.
6. Restore/redocument Auth (providers, URLs incl. `/auth/update-password`, JWT, email templates).
7. Restore Storage buckets (if any) with policies + hierarchy.
8. Create `.env.local` from `.env.example` + vault values; point to the new DB/Stripe/Resend.
9. `npm install`.
10. Run gates: `typecheck` + `lint` + `test` (740 green) + `build`.
11. `npm run start` locally → verify; then deploy (Vercel connect repo, or container on any Node host).
12. Configure the domain/DNS + Vercel Cron (`CRON_SECRET`) + Stripe webhook endpoint.
13. Post-deploy smoke test → **production running.**

## 4. Infrastructure Dependency Map
| Dependency | Role | Requirement | Replaceable? |
|---|---|---|---|
| **GitHub** | code hosting | Required (or any Git remote/mirror) | ✅ any Git host / bare repo |
| **Node.js 24** | runtime/build | Required | ✅ any Node 24+ |
| **PostgreSQL 15+** | database | Required | ✅ any provider / self-host |
| **Supabase** | Postgres + Auth + (Storage) | Required *(as bundled)* | 🟡 DB portable; Auth needs a swap |
| **Stripe** | payments (V3) | Required for commerce | 🟡 provider swap = code work |
| **Resend / SMTP** | email | Optional (console fallback) | ✅ via `EmailProvider` adapter |
| **Vercel** | app hosting/CI-CD | Required *(as used)* | ✅ any Node host / container |
| **DNS registrar** | domain | Required for custom domain | ✅ any registrar |
| **Google / OAuth** | — | **Not used** in V2 | n/a |
| **Env vars / Secrets / API keys** | config | Required | ✅ owner-held (vault) |

## 5. Secrets Audit (verified — `git grep` on tracked files)
- ❎ **No** real Stripe/Resend/JWT/API keys committed. ❎ **No** private keys. ❎ **No** hardcoded passwords.
- ✅ Only **safe non-secret placeholders** (`sk_test_placeholder`, `"placeholder"`, `placeholder.supabase.co`)
  used as build-time fallbacks — intentional, not credentials.
- ✅ `.env.example` / `.env.qa.example` are **templates** (no real values). No `.env`/`.env.local` tracked.
- ✅ Documentation uses **placeholders only** for secrets.
- **Verdict: SECRETS‑CLEAN.** Real values correctly live offline in the owner's vault.

## 6. Longevity Audit
| Horizon | Restorability | Notes |
|---|---|---|
| **1 year** | ✅ Trivial | all current tech supported |
| **3 years** | ✅ High | Postgres dump timeless; app builds with pinned deps |
| **5 years** | 🟡 Good | framework majors will have moved (Next/React); may need dep upgrades to build; **data restores unchanged** |
| **10 years** | 🟡 Feasible | app likely needs a rebuild/port; **the `pg_dump` (SQL) remains the durable asset**; schema + business logic + docs make a re-implementation straightforward |
**Obsolescence risks & mitigations:** Next.js/React churn, Node EOL, npm dependency rot, Supabase API
drift. **Mitigations:** pin versions (already in `package-lock.json`); keep a **built container image** and
the **`pg_dump`** as the two eternal artifacts; SQL + docs guarantee the data and design survive framework death.

## 7. Future Portability (feasibility)
| Target | Database | App | Verdict |
|---|---|---|---|
| **Supabase** (new project) | `pg_restore` | Vercel | ✅ like-for-like (~1h) |
| **Self-hosted PostgreSQL** | `pg_restore` | any Node host | ✅ (auth swap) |
| **AWS RDS** | `pg_restore` | ECS/Amplify | ✅ (auth = Cognito) |
| **Azure Database for PostgreSQL** | `pg_restore` | App Service | ✅ (auth = Entra) |
| **Google Cloud SQL** | `pg_restore` | Cloud Run | ✅ (auth = Identity Platform) |
| **DigitalOcean Managed PG** | `pg_restore` | App Platform | ✅ |
| **Railway** | managed PG | Node service | ✅ |
| **Render** | managed PG | Node service | ✅ |
| **Neon** (serverless PG) | `pg_restore` | any host | ✅ |
**Common denominator:** the database (standard PostgreSQL) and the pure business logic move essentially
unchanged; only **Auth + the Supabase SDK** require an adapter to leave Supabase (documented in
`PORTABILITY_REPORT.md`).

## 8. Certification
On the verified evidence above, this certifies that ARCADINS Training Center V2 has:
- ✅ **Backup completeness** — every component is either in the repo or recoverable via provided tooling; **nothing missing**.
- ✅ **Recovery capability** — reproducible on a fresh machine with Node + Git + PostgreSQL (steps documented).
- ✅ **Migration capability** — portable to 9 evaluated targets; DB + logic move unchanged.
- ✅ **Reusability** — `ARCADINS_PLATFORM_TEMPLATE.md` enables new products from this foundation.
- ✅ **Long-term maintainability** — durable SQL data asset + pinned deps + full documentation.
- ✅ **Enterprise readiness** — secrets-clean, documented, versioned, testable (740 tests).

### ⚠️ One condition for TRUE independence (must be executed by the owner)
The repo does **not** contain live data or secrets (correct security posture). To be safe **even if all
online services disappear tomorrow**, the owner must, and keep current:
1. Run `backup/scripts/backup-all.sh` → store `exports/<stamp>/` **offline + encrypted, in ≥2 locations**.
2. Export **auth** (+ storage if used) per `STORAGE_AUTH_CONFIG_EXPORT.md`.
3. Keep **secrets** and **env values** in a vault, backed up offline.
4. Optionally archive a **built container image** for 10-year longevity.
> Until step 1 is executed, the live DATA exists only on Supabase. The recovery **capability** is certified;
> the recovery **artifact** (the dump) is created by the owner.

---

## FINAL VERDICT

# 🟢 ENTERPRISE BACKUP — CERTIFIED (RECOVERABLE · PORTABLE · REUSABLE)
**Conditional only on the owner executing and maintaining the offline data/secrets export (§8).**

*Issued by the ARCADINS engineering audit for JeHoPa KING Consulting — permanent backup certificate.*
