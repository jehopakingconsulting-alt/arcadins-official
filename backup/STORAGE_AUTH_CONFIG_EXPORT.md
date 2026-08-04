# ARCADINS — STORAGE, AUTH & CONFIG EXPORT GUIDE
**Deliverables 3, 4, 5. Run once with your credentials. Nothing here is automated by the AI.**

---

## 3. Storage backup (buckets)
> ARCADINS V2 does not rely on Supabase Storage for the public site (assets are in the repo / Vercel).
> If/when Storage buckets are used (V3 media/PDFs), export them like this.

**Option A — Supabase CLI (recommended):**
```bash
# Install once: https://supabase.com/docs/guides/cli
supabase login
supabase link --project-ref <your-project-ref>
# List buckets:
supabase storage ls
# Download a bucket, preserving hierarchy/filenames:
supabase storage cp --recursive ss://<bucket-name> ./backup/exports/<STAMP>/storage/<bucket-name>
```
**Option B — S3-compatible tools** (Supabase Storage is S3-compatible): use `rclone`/`aws s3 sync`
with the Storage endpoint + service key. Preserve: original hierarchy, filenames, `content-type`,
and object metadata (record the `metadata` JSON per object).

**Record for each bucket:** name, public/private, allowed MIME types, size limits, RLS policies.

---

## 4. Auth backup
Supabase Auth users live in the `auth` schema (not `public`). The `pg_dump` in `backup-all.sh` targets
`public`; to also capture auth users, dump the `auth` schema explicitly (store SECURELY — contains PII):
```bash
pg_dump "$DATABASE_URL" --no-owner --no-privileges -n auth --file=backup/exports/<STAMP>/auth_schema.sql
```
Also **document** (Supabase → Authentication → …):
- **Users:** count + export (`auth.users` via the dump above). Never expose publicly.
- **Providers enabled:** Email (password) — the only one used by V2. (Google/etc. if added later.)
- **Password recovery:** email template + **Redirect URLs** must include `…/auth/update-password`.
- **JWT:** JWT secret + expiry (Settings → API). **Placeholder only** — never store the real secret in the repo.
- **URL Configuration:** Site URL + all Redirect URLs (record the exact list).
- **Email templates:** confirm/recovery/magic-link (copy the HTML).

---

## 5. Supabase project configuration
Record (Supabase Dashboard → Project Settings):
- **Project ref / region / Postgres version.**
- **API:** `NEXT_PUBLIC_SUPABASE_URL`, anon key, service_role key → **placeholders only** in the repo;
  real values stored offline in a vault/password manager.
- **Extensions enabled:** see `EXTENSIONS.txt` from the backup (expect at least `pgcrypto`).
- **RLS policies:** see `RLS_POLICIES.txt`.
- **Database functions/triggers:** captured in `schema_only.sql` (e.g., `handle_new_user`, `current_tenant`).
- **Cron jobs:** ARCADINS uses a Vercel route `/api/cron/expire-pending` guarded by `CRON_SECRET`
  (not Supabase `pg_cron`). Record the Vercel Cron schedule if configured, + `CRON_SECRET` (offline).
- **Storage config:** buckets + policies (see §3).

### Environment variables (document as placeholders — real values OFFLINE only)
```
NEXT_PUBLIC_SUPABASE_URL=<https://<ref>.supabase.co>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>          # SECRET
STRIPE_SECRET_KEY=<sk_...>                            # SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<pk_...>
STRIPE_WEBHOOK_SECRET=<whsec_...>                     # SECRET
RESEND_API_KEY=<re_...>                               # SECRET
EMAIL_PROVIDER=resend
EMAIL_FROM=<from@domain>
EMAIL_REPLY_TO=<reply@domain>
NEXT_PUBLIC_SITE_URL=<https://www.arcadins-training.com>
CRON_SECRET=<random>                                 # SECRET
PROGRAM_CHECKOUT_ENABLED=false
NEXT_PUBLIC_PROGRAM_CHECKOUT_ENABLED=false
NEXT_PUBLIC_LEARNING_EXPERIENCE_ENABLED=false
NEXT_PUBLIC_MULTILANG_SWITCHER=false
```
> A `.env.example` in the repo root documents required variables. Keep the REAL values in a
> password manager / secrets vault, backed up offline in at least two locations.
