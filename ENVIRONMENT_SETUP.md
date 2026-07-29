# ARCADINS — Environment Setup

Source unique de vérité pour les variables d'environnement (alignée sur l'audit `process.env` du code).
**Aucune valeur réelle ici.** Local = `.env.local` (ignoré par git). Prod/Preview = dashboard Vercel.

## Variables applicatives (Vercel : Production + Preview ; miroir local dans `.env.local`)

| Variable | Rôle | Où la récupérer | Public/Privé | Oblig. |
|---|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL du projet Supabase | Supabase → Settings → API | **Public** | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé anon (RLS côté client) | Supabase → Settings → API | **Public** | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Écritures serveur (bypass RLS) | Supabase → Settings → API | **Privé** | ✅ |
| `NEXT_PUBLIC_SITE_URL` | URLs absolues / SEO / sitemap | votre domaine prod | **Public** | ✅ |
| `EMAIL_PROVIDER` | `resend` en prod (`console` en dev) | fixe | Public | ✅ |
| `RESEND_API_KEY` | Envoi e-mails | Resend → API Keys | **Privé** | ✅ |
| `EMAIL_FROM` | Expéditeur (domaine vérifié Resend) | Resend → Domains | Public | ✅ |
| `EMAIL_REPLY_TO` | Reply-to | au choix | Public | ⚪ opt |
| `STRIPE_SECRET_KEY` | Paiements (serveur) | Stripe → Developers → API keys | **Privé** | ✅ |
| `STRIPE_WEBHOOK_SECRET` | Vérif signature webhook | Stripe → Webhooks → endpoint | **Privé** | ✅ |
| `CRON_SECRET` | Auth `/api/cron/*` (503 si vide) | valeur longue aléatoire (vous) | **Privé** | ✅ |
| `UPSTASH_REDIS_REST_URL` | Rate-limit distribué | Upstash → Redis → REST | **Privé** | ⚪ opt |
| `UPSTASH_REDIS_REST_TOKEN` | Rate-limit distribué | Upstash → Redis → REST | **Privé** | ⚪ opt |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | Tracing OpenTelemetry | votre collecteur OTLP | **Privé** | ⚪ opt |
| `OTEL_SERVICE_NAME` | Nom de service OTel (`arcadins`) | fixe | Public | ⚪ opt |
| `NODE_ENV` | dev/prod | **géré automatiquement par Vercel** | — | auto |

## Secrets GitHub Actions (Settings → Secrets and variables → Actions)

| Secret | Rôle | Où la récupérer | Requis pour |
|---|---|---|---|
| `VERCEL_TOKEN` | Déploiement CLI | Vercel → Account → Tokens | `deploy.yml` |
| `VERCEL_ORG_ID` | ID org (non sensible) | `team_4UK9FEdhlhs1wzP8dEGAbt6n` | `deploy.yml` |
| `VERCEL_PROJECT_ID` | ID projet (non sensible) | `prj_OJqK94DQ9qOYTDUhfU4GoC7xAHGR` | `deploy.yml` |
| `PROD_URL` | Health-gate / smoke / uptime | domaine prod | `deploy.yml`, `uptime.yml` |
| `SUPABASE_DB_URL` | `pg_dump` (connexion Postgres) | Supabase → Settings → Database → URI | `backup.yml` |
| `BACKUP_PASSPHRASE` | Chiffrement des dumps | valeur forte (vous) | `backup.yml` |
| `SLACK_WEBHOOK_URL` | Alertes uptime | Slack Incoming Webhooks | `uptime.yml` (opt) |
| `GITHUB_TOKEN` | — | **auto (GitHub)** | ci |

## Répartition
- **GitHub uniquement** : `VERCEL_*`, `PROD_URL`, `SUPABASE_DB_URL`, `BACKUP_PASSPHRASE`, `SLACK_WEBHOOK_URL`.
- **Vercel uniquement (Prod+Preview)** : toutes les variables applicatives du 1ᵉʳ tableau.
- **Local (`.env.local`)** : miroir des variables applicatives, valeurs de dev/staging.
- **Public** (`NEXT_PUBLIC_*` + `EMAIL_PROVIDER`/`OTEL_SERVICE_NAME`) : exposées au client, non secrètes.
- **Privé** : toutes les autres — ne jamais afficher/committer.
