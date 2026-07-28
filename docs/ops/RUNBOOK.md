# ARCADINS — RUNBOOK opérationnel

Procédures courantes. Toutes les commandes CLI chargent l'environnement sans exposer les secrets :
`set -a; source <(grep -E '^(NEXT_PUBLIC_SUPABASE_URL|SUPABASE_SERVICE_ROLE_KEY)=' .env.local); set +a`.

## Déployer
- Merge sur `master` (branche de production) → build Vercel automatique. CI (GitHub Actions) doit être vert : lint, typecheck,
  tests, audit SQL, build.

## Vérifier l'état d'une migration (lecture seule)
```bash
node scripts/migration/validate-migration.mjs --check-target
```

## Import d'un compte (pilote / lot) — jamais --all sur users
```bash
node scripts/migration/import-users.mjs --live --confirm --user-id <ID>
# puis payments / progress / results / certificates / referrals
```

## Pré-flight collisions e-mail (avant tout import prod)
```bash
node scripts/migration/preflight-collisions.mjs --check-target
```

## Rollback
```bash
node scripts/migration/rollback.mjs --live --confirm --user-id <ID> --purge-auth   # un compte
node scripts/migration/rollback.mjs --live --confirm --purge-auth                  # global
```

## Rotation d'un secret
1. Générer le nouveau secret (Supabase/Stripe/Resend/Upstash/CRON).
2. Mettre à jour Vercel (Project → Settings → Environment Variables) + `.env.local`.
3. Redéployer. 4. Révoquer l'ancien.

## Cron (expiration des paiements en attente)
- `vercel.json` → `/api/cron/expire-pending` (06:00 UTC). Refuse `503` si `CRON_SECRET` absent.

## Purger le rate-limit (dev)
- Redémarrer le process (mémoire) ou vider la clé Upstash correspondante.
