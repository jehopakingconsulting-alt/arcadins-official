# ARCADINS — PORTABILITY REPORT
**What depends on Supabase · what is pure PostgreSQL · how to migrate to other clouds.**

---

## Summary
ARCADINS is **highly portable**. The data layer is standard PostgreSQL; the coupling to Supabase is
concentrated in **Auth** and the **client SDK**. The application (Next.js) runs on any Node host.

## Dependency map
| Component | Coupling | Portability |
|---|---|---|
| **Database schema/data** | Pure PostgreSQL (15+), `pgcrypto` extension | ✅ Fully portable (`pg_dump`/`pg_restore`) |
| **RLS policies** | Use `auth.uid()` (Supabase Auth GUC) | 🟡 Adapt the current-user function, or enforce authZ in app |
| **Auth (users, providers, JWT, recovery)** | Supabase Auth (`auth` schema + GoTrue) | 🟡 Replace with Auth.js/Clerk/Cognito; migrate `auth.users` |
| **Client access** | `@supabase/supabase-js` + `@supabase/ssr` | 🟡 Swap for `pg`/Prisma/Drizzle + chosen auth SDK (app change) |
| **Storage** | Supabase Storage (S3-compatible) | ✅ S3-compatible → any S3/GCS/Azure Blob |
| **Payments** | Stripe (provider-agnostic of host) | ✅ Fully portable |
| **Email** | `EmailProvider` abstraction (Resend today) | ✅ Swap providers via one adapter |
| **Hosting** | Vercel (Next.js) | ✅ Any Node host / container (Netlify, Render, AWS, GCP, Azure, DO, self-host) |
| **Cron** | Vercel Cron → `/api/cron/*` + `CRON_SECRET` | ✅ Any scheduler (system cron, cloud scheduler) |

## What is PURE PostgreSQL (moves anywhere with zero changes)
- All `public` tables, indexes, constraints, FKs, sequences, defaults, views.
- Functions/triggers that don't call Supabase-only features (e.g., `handle_new_user`, `current_tenant`).
- The `pgcrypto` extension (available on all major managed Postgres).

## What is Supabase-specific (needs an adapter to leave)
1. **Auth** — `auth.users` + GoTrue. Migration path: export `auth.users`, stand up an alternative auth,
   remap foreign keys (`user_id`) and the current-user function used by RLS.
2. **`auth.uid()` in RLS** — replace with your auth's session function, or move authorization to the API layer.
3. **`@supabase/*` SDKs** — replace with a Postgres driver/ORM + your auth SDK (application-code change, V3+).
4. **Storage & Realtime** (if used) — S3-compatible storage migrates cleanly; Realtime would need an alternative.

## Migration targets (effort estimate)
| Target | DB | Auth | App host | Effort |
|---|---|---|---|---|
| **Another Supabase project** | pg_restore | native | Vercel | **S** (like-for-like) |
| **AWS** (RDS Postgres + Cognito + Amplify/ECS) | pg_restore | replace | container | **M–L** |
| **Azure** (Postgres Flexible + Entra + App Service) | pg_restore | replace | app service | **M–L** |
| **Google Cloud** (Cloud SQL + Identity Platform + Cloud Run) | pg_restore | replace | Cloud Run | **M–L** |
| **DigitalOcean** (Managed Postgres + your auth + App Platform) | pg_restore | replace | app platform | **M** |
| **Self-hosted** (Postgres + Auth.js + Node/Nginx) | pg_restore | Auth.js | VM/container | **M–L** |

## Recommended portability practices (carry forward)
- Keep business logic **pure** (no vendor calls in `lib/*` domain code) — already the case.
- Keep the **EmailProvider** adapter pattern — extend it for any provider.
- Keep authorization logic expressible **both** via RLS and app-layer checks, easing an auth swap.
- Version the schema in migrations; take regular `pg_dump` backups (the true source of restore truth).

**Conclusion:** ARCADINS can be rebuilt on another Supabase project in ~an hour (dump/restore), and
re-platformed to AWS/Azure/GCP/DO/self-hosted in weeks (mostly Auth + SDK swap), with the **database and
business logic moving essentially unchanged.**
