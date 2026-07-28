# ARCADINS — PRE_STAGING_CHECKLIST (BLOC B · Phase 1 — Sécurisation)

**Date :** 2026-07-28 · **Environnement cible : STAGING uniquement** · **Production : interdite.**

> Objectif : franchir toutes les sécurités AVANT la moindre écriture. Si un point critique
> échoue ou reste ouvert → **STOP**, on n'applique rien.

---

## 1. Confirmation de la cible (STAGING, pas PROD)

| Contrôle | Attendu | Constaté | État |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` (`.env.local`) | projet **staging** | `wntvixwcabnzbsithppo.supabase.co` | ✅ |
| ≠ projet production | ≠ `banhxhbmepsbaxhjydjd` | différent | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` présent | oui (jamais affiché) | présent | ✅ |
| Sauvegarde `.env.local.prod-backup` | existe (retour dev possible) | existe | ✅ |

**→ Cible confirmée : STAGING.** ✅

## 2. Backup complet du STAGING  — ⛔ ACTION UTILISATEUR (dashboard)

Je **ne peux pas** générer le backup moi-même : cela requiert la chaîne de connexion Postgres
(secret que je ne dois pas manipuler) ou le tableau de bord Supabase.

- [ ] Dashboard Supabase (projet `wntvixwcabnzbsithppo`) → **Database → Backups** → créer/valider
      une sauvegarde récente **avant** toute migration.
- [ ] Alternative : `pg_dump` de la base staging (connexion via *Project Settings → Database*).
- [ ] Horodatage de la sauvegarde noté : `__________________________`

## 3. PITR (Point-In-Time Recovery)  — ⛔ ACTION UTILISATEUR (dashboard)

- [ ] Vérifier l'état PITR du projet staging (selon le plan Supabase). Si indisponible, la
      sauvegarde du point 2 fait foi.
- [ ] Point de restauration de référence (pré-migration) noté : `__________________________`

## 4. Outillage de migration

| Contrôle | Constaté | Conséquence |
|---|---|---|
| `supabase` CLI installé | ❌ non | Migrations appliquées via **SQL Editor** (geste utilisateur) |
| Fichiers migration prêts | ✅ `0005`, `0006` (audit statique : 0 blocker) | Copier/coller dans SQL Editor |
| Données d'import préparées | ✅ `_data/transformed.json` (12 comptes, 0 rejet) | Prêt pour l'import pilote |

## 5. Gate critique — conditions de poursuite

On ne passe à la **Phase 2 (migrations)** QUE si **tous** ces points sont ✅ :

- [x] Cible = STAGING confirmée
- [ ] **Backup staging effectué et horodaté** (point 2)
- [ ] **PITR / point de restauration confirmé** (point 3)
- [ ] Décision explicite d'appliquer `0005` puis `0006`

> ⚠️ **Tant que le backup + PITR ne sont pas confirmés, STOP — aucune migration, aucun import.**

---

## Candidat pilote recommandé (Phase 3)

**`--user-id 2`** — profil *student*, couverture maximale : 1 paiement · 14 modules · 4 tests ·
1 certificat · 1 relation de parrainage (filleul du compte 1). Il exerce Auth + identities +
profile + learner + progression + paiements + certificats + tests + affiliation en un seul compte.
*(Aucune donnée personnelle affichée : sélection par `legacy_id` + volumétrie uniquement.)*

## Rappel de la procédure sécurisée (Phases 2→5)

- **Phase 2** — appliquer `0005` puis `0006` (SQL Editor), puis vérifier contraintes/index/triggers/
  RPC/permissions/extensions/search_path → `MIGRATION_EXECUTION_REPORT.md`.
- **Phase 3** — import pilote strict : `node scripts/migration/import-users.mjs --live --confirm --user-id 2`
  (jamais `--all`).
- **Phase 4** — Validator + Health + lint/tests/build + API + RBAC + **rollback** + **ré-import**
  (démontrer idempotence, 0 doublon, 0 perte).
- **Phase 5** — `STAGING_PILOT_REPORT.md` (durée, migrations, compte, résultats, logs, scores, GO/NO GO).

**Statut Phase 1 : cible sécurisée ✅ — EN ATTENTE des gates critiques (backup + PITR) côté utilisateur.**
