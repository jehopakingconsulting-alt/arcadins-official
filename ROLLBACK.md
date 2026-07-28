# ARCADINS — ROLLBACK (référence rapide)

Procédures d'annulation, par couche. Détails migration : `ROLLBACK_PLAN.md`.

## Application (Vercel)
- **Automatique** : `deploy.yml` exécute `vercel rollback` si le smoke post-promotion échoue.
- **Manuel** : `vercel rollback` (re-pointe l'alias prod vers le déploiement précédent) — instantané,
  sans downtime. Ou re-promouvoir un déploiement antérieur depuis le dashboard.

## Données (import legacy)
- **Un compte** : `node scripts/migration/rollback.mjs --live --confirm --user-id <ID> --purge-auth`
- **Un lot** : boucle sur les ids du lot.
- **Global** : `node scripts/migration/rollback.mjs --live --confirm --purge-auth`
  → `truncate` des tables `legacy_*` + purge des comptes auth **créés par la migration** uniquement.

## Schéma
- Sections **DOWN** (commentées) en fin de chaque migration (`0005`, `0006`, `0007`).

## Catastrophe
- **PITR** Supabase au point de restauration pré-migration (voir `DISASTER_RECOVERY.md`).

## Règle
- Idempotent : rejouer un rollback déjà fait ne produit pas d'erreur.
- Ne touche **jamais** les données natives de la nouvelle plateforme (import 100 % additif).
