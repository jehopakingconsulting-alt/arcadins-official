# ARCADINS — Stratégie Git officielle

**Établie le 2026-07-28** (CTO / Release Manager). Fondée sur l'état **réel** vérifié, pas supposé.

## Branche de production officielle : **`master`**
- **GitHub** : branche par défaut = `master` (vérifié `gh repo view` + `origin/HEAD → master`).
- **Vercel** : Production Branch = branche par défaut du repo → `master` (à confirmer au dashboard ;
  Vercel CLI indisponible dans l'environnement d'audit).
- **Décision** : on **conserve `master`**. **`main` n'est PAS créé** (inutile). Toute la documentation
  et les workflows opérationnels sont alignés sur `master`.

## Modèle de branches
- `master` = **production** (protégée — à configurer, cf. rapport).
- `audit-refonte` = **branche d'intégration** portant toute la Release Candidate (RC1 + hardening +
  infra). C'est elle qui sera fusionnée dans `master` au go-live, après CI verte.
- Branches de correctif : `fix/*` à partir de `master`, PR + CI + revue.

## Flux de release (aligné `deploy.yml`)
1. Push `audit-refonte` → **CI** (lint/typecheck/tests/coverage/CodeQL/SBOM/build).
2. Ouvrir une **PR `audit-refonte → master`** → required status checks verts + revue.
3. Merge → **déploiement** (`deploy.yml` : health-gate `/api/ready` → promote → smoke → rollback auto).
4. Rollback : `vercel rollback` (alias) — instantané.

## Règles
- Jamais de push direct sur `master` (via PR uniquement, une fois la protection activée).
- Aucune fusion vers `master` sans CI verte + backup/PITR prod confirmés (migrations DB hors pipeline).
- Documents historiques (audits/rapports datés) conservés tels quels : ce sont des **archives**, non
  des documents opérationnels ; seules les procédures actives sont alignées sur `master`.
