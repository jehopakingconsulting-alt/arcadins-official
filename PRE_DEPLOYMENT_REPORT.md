# ARCADINS — Rapport de pré-déploiement

**Date :** 2026-07-28 · **Branche de prod officielle : `master`** (voir `GIT_STRATEGY.md`).
**Légende :** ✅ Conforme · ⚠ À configurer · ❌ Bloquant. **Preuves : commandes réelles (gh/git).**

| # | Élément | État | Preuve / détail |
|---|---|---|---|
| 1 | Branche par défaut GitHub | ✅ | `gh repo view` → `defaultBranchRef=master` |
| 2 | `origin/HEAD` | ✅ | `git ls-remote --symref` → `refs/heads/master` |
| 3 | Vercel Production Branch | ⚠ | Vercel CLI absent ici → **confirmer au dashboard** (défaut = `master`) |
| 4 | Docs & workflows alignés `master` | ✅ | ci.yml, deploy.yml, DEPLOYMENT_RUNBOOK, RUNBOOK, RELEASE_FINAL_REPORT alignés ce tour |
| 5 | Branch Protection (`master`) | ⚠ | `gh api …/branches/master/protection` → **404 « Branch not protected »** → à activer |
| 6 | Required Status Checks | ⚠ | Aucun (dépend de la CI enregistrée après 1er push) → à activer avec la protection |
| 7 | GitHub Actions enregistrées | ⚠ | `gh workflow list` → vide (workflows locaux sur `audit-refonte`, **jamais poussés**) → actifs au 1er push |
| 8 | GitHub Secrets | ⚠ | `gh secret list` → vide → à renseigner : `VERCEL_TOKEN/ORG_ID/PROJECT_ID`, `PROD_URL`, `SUPABASE_DB_URL`, `BACKUP_PASSPHRASE`, (`SLACK_WEBHOOK_URL`) |
| 9 | Vercel Environment Variables | ⚠ | Non interrogeable ici → **confirmer au dashboard** (Supabase/Stripe/Resend/CRON…) |
| 10 | Arbre Git propre | ✅ | `git status` propre |
| 11 | RC prouvée (lint/tsc/tests/build/audit) | ✅ | lint 0 · tsc 0 · 73/73 · audit SQL 0 · npm audit prod 0 vuln · build 0 warning |
| 12 | Migrations `0005/0006/0007` (prod) | ⚠ | présentes, **non appliquées en prod** (Phase 1 runbook) |
| 13 | Backup + PITR prod | ⚠ | à confirmer + horodater (dashboard Supabase) |
| 14 | `audit-refonte` poussé | ⚠ | **non poussé** — c'est l'objet du 1er push sécurisé |

## Synthèse
- **❌ Bloquant : AUCUN** pour le **premier push sécurisé** (pousser une **branche de feature**
  n'affecte ni `master` ni la production).
- **⚠ À configurer (avant la fusion vers `master` / le déploiement, pas avant le 1er push)** :
  Branch Protection + Required Status Checks, GitHub Secrets, Vercel Env Vars, backup/PITR,
  application des migrations prod. Confirmations dashboard : Vercel Production Branch + Env Vars.
- **✅ Conforme** : stratégie Git (`master`), docs/workflows alignés, RC prouvée, arbre propre.

## Séquence recommandée (rappel, chaque étape sous GO)
1. **Push `audit-refonte`** (feature branch) → déclenche la CI → preuve « CI verte ». *(zéro impact prod)*
2. Configurer Secrets + Branch Protection + Required Status Checks.
3. Confirmer Vercel Production Branch + Env Vars (dashboard).
4. Backup + PITR + migrations prod (`0005→0006→0007`).
5. PR `audit-refonte → master` (CI verte) → merge → déploiement + rollback auto.
6. Import données par lots gatés.

---

**Le projet est prêt pour le premier push sécurisé.**
