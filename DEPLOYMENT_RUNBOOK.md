# ARCADINS — DEPLOYMENT RUNBOOK (jour de mise en production)

Procédure ordonnée, gatée. Chaque phase = un point d'arrêt avec décision GO/NO-GO explicite.
Références : `GO_LIVE_CHECKLIST.md`, `ROLLBACK.md`, `docs/ops/*`, `PRODUCTION_RELEASE_CHECKLIST.md`.

## Pré-conditions (bloquantes)
- [ ] CI verte sur GitHub (lint/typecheck/tests/coverage/CodeQL/SBOM/build) — `.github/workflows/ci.yml`.
- [ ] Secrets GitHub + Vercel configurés (voir §Secrets).
- [ ] **Backup + PITR** de la prod confirmés et horodatés.

## Phase 1 — Base de données (prod)
1. Backup + PITR (horodatage : `______`).
2. SQL Editor prod → appliquer **dans l'ordre** : `0005_legacy_import.sql` → `0006_migration_rpcs.sql`
   → `0007_hardening.sql`. (Ne PAS appliquer `0000` : prod possède déjà `profiles`.)
3. Vérifier : `select proname from pg_proc where proname like 'migrate_%';` +
   `select tablename from pg_tables where tablename like 'legacy_%';` + bucket `legacy-certificates`.
4. **Décision GO/NO-GO.**

## Phase 2 — Application
5. Merge `audit-refonte → main` (déclenche `deploy.yml`).
6. Pipeline : build → **health-gate** `/api/ready` → promote → smoke `/api/health` → **rollback auto** si KO.
7. Vérifier en-têtes (CSP/HSTS) + `/api/health` 200 + `/api/ready` 200 sur le domaine prod.
8. **Décision GO/NO-GO.**

## Phase 3 — Import des données (par lots gatés)
9. Pré-flight collisions e-mail : `node scripts/migration/preflight-collisions.mjs --check-target`.
10. **LOT 1 (5 comptes)** puis validation complète (`validate-migration.mjs --check-target` + login réel).
11. **STOP** → autorisation → **LOT 2** → … (voir `PRODUCTION_IMPORT_PLAN.md`).
12. LOT FINAL (référence) + copie PDF → bucket `legacy-certificates`.

## Phase 4 — Post-déploiement
13. Smoke tests + `POST_DEPLOYMENT_CHECKLIST.md`.
14. Monitoring actif (uptime, alertes) ; observer 24–48 h.

## Secrets requis
- **Vercel** : `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
  `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `RESEND_API_KEY`,
  `EMAIL_PROVIDER=resend`, `EMAIL_FROM`, `EMAIL_REPLY_TO`, `NEXT_PUBLIC_SITE_URL`, `APP_URL`,
  `CRON_SECRET`, (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` — option), (`OTEL_*`, `SENTRY_DSN` — option).
- **GitHub** : `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `PROD_URL`, `SUPABASE_DB_URL`,
  `BACKUP_PASSPHRASE`, (`SLACK_WEBHOOK_URL` — option).

## Arrêt d'urgence
À tout signal critique → `ROLLBACK.md`. Ne jamais poursuivre un lot en cas de `rejected>0` / erreur RPC.
