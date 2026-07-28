# ARCADINS — Secrets & Variables d'environnement (checklist Production)

**Établi à partir du code réel** (`grep process.env` + workflows). **Aucune valeur affichée.**
GitHub Secrets vérifiés **par nom** : `gh secret list` → **VIDE** (aucun secret configuré).
Vercel Env : non interrogeable via CLI ici → **vérification manuelle dashboard** (par nom + env).

## A. Variables applicatives (Vercel — Production & Preview)

| Nom | Oblig. | Service | Env | Où créer | Fonction | Risque si absent | Public/Secret | Rotation | Vérif (sans valeur) |
|---|---|---|---|---|---|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase | Prod+Preview | Vercel → Settings → Env | URL projet | App/DB HS | **Public** | non | présence par nom |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase | Prod+Preview | idem | clé anon (RLS) | Auth HS | **Public** | oui | présence par nom |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Supabase | Prod (+Preview si import) | idem | écritures serveur (bypass RLS) | routes admin/contact HS | **Secret** | oui | présence par nom |
| `STRIPE_SECRET_KEY` | ✅ | Stripe | Prod | idem | paiements serveur | Paiement HS | **Secret** | oui | présence par nom |
| `STRIPE_WEBHOOK_SECRET` | ✅ | Stripe | Prod | idem | signature webhook | Webhook rejeté (400) | **Secret** | oui | présence par nom |
| `RESEND_API_KEY` | ✅ | Resend | Prod | idem | envoi e-mails | e-mails non délivrés | **Secret** | oui | présence par nom |
| `EMAIL_PROVIDER` | ✅ | Resend | Prod | idem | doit valoir `resend` | e-mails en mode console | Public | non | valeur = `resend` |
| `EMAIL_FROM` | ✅ | Resend | Prod | idem | expéditeur (domaine vérifié) | délivrabilité KO | Public | non | présence par nom |
| `EMAIL_REPLY_TO` | ⚠️ opt | Resend | Prod | idem | reply-to | mineur | Public | non | présence par nom |
| `NEXT_PUBLIC_SITE_URL` | ✅ | App | Prod+Preview | idem | URLs absolues/SEO | liens/SEO cassés | **Public** | non | présence par nom |
| `CRON_SECRET` | ✅ | Vercel Cron | Prod | idem | auth `/api/cron/*` | cron 503 (refus si vide) | **Secret** | oui | présence par nom |
| `UPSTASH_REDIS_REST_URL` | ⚠️ opt | Upstash | Prod | idem | rate-limit distribué | repli mémoire (dégradé) | **Secret** | oui | présence par nom |
| `UPSTASH_REDIS_REST_TOKEN` | ⚠️ opt | Upstash | Prod | idem | rate-limit distribué | repli mémoire | **Secret** | oui | présence par nom |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | ⚠️ opt | OTel | Prod | idem | tracing | pas de traces | **Secret** | oui | présence par nom |
| `SENTRY_DSN` / `NEXT_PUBLIC_SENTRY_DSN` | ⚠️ opt | Sentry | Prod | idem | error tracking | erreurs non tracées | Secret/Public | oui | présence par nom |

> `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` et `APP_URL` figurent dans `.env.example` mais **ne sont plus
> référencés dans le code** (paiement via SDK serveur + Checkout hébergé) → **optionnels/inutilisés**.

## B. Secrets GitHub Actions (Settings → Secrets and variables → Actions)

| Nom | Oblig. | Workflow | Fonction | Risque si absent | Vérif |
|---|---|---|---|---|---|
| `VERCEL_TOKEN` | ✅ (si `deploy.yml`) | deploy | déploiement CLI | `deploy.yml` échoue | `gh secret list` |
| `VERCEL_ORG_ID` | ✅ (deploy) | deploy | ciblage projet | vercel CLI KO | `gh secret list` |
| `VERCEL_PROJECT_ID` | ✅ (deploy) | deploy | ciblage projet | vercel CLI KO | `gh secret list` |
| `PROD_URL` | ✅ (deploy/uptime) | deploy, uptime | health-gate/smoke/uptime | pas de gate/monitoring | `gh secret list` |
| `SUPABASE_DB_URL` | ✅ (backup) | backup | `pg_dump` | backup auto KO | `gh secret list` |
| `BACKUP_PASSPHRASE` | ✅ (backup) | backup | chiffrement dump | dump non chiffré | `gh secret list` |
| `SLACK_WEBHOOK_URL` | ⚠️ opt | uptime | alertes | pas d'alerte Slack | `gh secret list` |
| `GITHUB_TOKEN` | auto | ci | fourni par GitHub | — | automatique |

## C. Local (`.env.local`, jamais committé)
Mêmes variables applicatives (section A) en valeurs **de développement/staging**. Fichier ignoré par
git (`.gitignore` : `.env*` sauf `.env.example`). **Ne jamais committer.**

## Statut actuel (preuves)
- GitHub Secrets : **0 configuré** (`gh secret list` vide) → **🔴 à créer**.
- Vercel Env Production : **à vérifier au dashboard** (par nom, sans valeur).
- Aucune valeur sensible n'apparaît dans le code/dépôt (`grep` secrets en dur = 0).

## Procédure de vérification (sans exposer les valeurs)
```bash
gh secret list                     # noms des secrets GitHub
# Vercel (dashboard) : Project arcadins-official → Settings → Environment Variables
#   → filtrer par Production, vérifier la PRÉSENCE de chaque nom de la section A.
```
