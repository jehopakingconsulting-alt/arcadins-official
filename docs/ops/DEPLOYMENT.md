# ARCADINS — Deployment Guide (progressif, canary, blue/green, rollback)

## Modèle
Vercel produit des **déploiements immuables atomiques** (chaque build a une URL unique). La prod est
un **alias** pointant vers un déploiement. Cela fournit nativement le **blue/green** (bascule d'alias)
et le **rollback instantané** (re-pointage de l'alias) — sans downtime.

## Pipeline (`.github/workflows/deploy.yml`)
1. Build + `vercel deploy --prebuilt --prod` → déploiement **non promu** (green) avec URL unique.
2. **Health-gate** : `curl /api/ready` (jusqu'à 10 tentatives). Échec → pas de promotion.
3. `vercel promote <url>` → bascule de l'alias prod (blue→green).
4. **Smoke post-promotion** (`/api/health`). Échec → `vercel rollback` **automatique**.

## Canary (option)
- Vercel n'a pas de split de trafic natif par pourcentage sur le plan standard. Options :
  - **Canary applicatif** via un feature flag (comme `REFERRAL_ENABLED`) : activer une capacité pour
    un sous-ensemble, observer, généraliser.
  - **Edge Middleware** : router X % du trafic vers un déploiement canary (cookie/hash) si le plan le
    permet.
  - À défaut : blue/green (ci-dessus) + surveillance rapprochée post-promotion.

## Rollback
- **Automatique** : le pipeline rollback si le smoke échoue.
- **Manuel** : `vercel rollback` (alias) ou re-promouvoir un déploiement précédent depuis le dashboard.
- **Données/schéma** : `ROLLBACK_PLAN.md` (rollback.mjs + sections DOWN + PITR).

## Migrations DB
- Appliquées **hors pipeline app** (SQL Editor prod, gaté) : `0005 → 0006 → 0007`. Additives et
  réversibles. Ne jamais coupler une migration destructive à un déploiement app.

## Pré-requis secrets (GitHub)
`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `PROD_URL` (+ `SLACK_WEBHOOK_URL` optionnel).
