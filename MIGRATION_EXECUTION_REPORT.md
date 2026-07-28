# ARCADINS — MIGRATION_EXECUTION_REPORT (BLOC B · Phase 2)

**Date :** 2026-07-28 · **Environnement : STAGING** `arcadins-staging` (`wntvixwcabnzbsithppo`).
**Production : non touchée.**

## Application

| Élément | Détail |
|---|---|
| Projet cible | `arcadins-staging` — ref `wntvixwcabnzbsithppo` (= `.env.local`) |
| Bundle appliqué | `supabase/STAGING_PILOT_APPLY.sql` = `0000` + `0005` + `0006` (ordre des dépendances) |
| Méthode | SQL Editor Supabase (une exécution) |
| Résultat | **`Success. No rows returned`** — tout le DDL exécuté sans erreur |
| État base avant | vierge (No migrations / No backups) |

## Vérification post-application (CLI, LECTURE SEULE)

Contrôle via les RPC de validation (leur exécution lit **toutes** les tables `legacy_*` + `auth.users`) :

| Contrôle | Méthode | Résultat |
|---|---|---|
| Tables `legacy_*` (10) présentes | `migrate_validation_report()` s'exécute sans erreur | ✅ |
| RPC globale | `migrate_validation_report()` → counts tous à 0 | ✅ |
| RPC pilote | `migrate_validation_user(2)` → mapped=false, counts 0 | ✅ |
| `migrate_lookup('user',2)` | répond (null, non encore importé) | ✅ |
| Comptages cible (avant import) | comptes 0 · tests 0 · certifs 0 | ✅ cohérent (vide) |

## Éléments couverts par l'application (attestés par « Success » sur l'ensemble du DDL)

- **Contraintes** : PK des tables `legacy_*`, `unique` (id_map, learners, modules, certificates,
  payments, prospects, referrals), **FK différée** `legacy_tests_prospect_id_fkey`
  (`ALTER TABLE ADD CONSTRAINT` exécuté sans erreur — correctif B1 validé), `check` (tests, modules,
  referrals, prospects).
- **Index** : `legacy_tests_user/prospect/email_idx`, `legacy_prospects_email_idx`,
  `legacy_referrals_referrer_idx`.
- **Triggers** : `on_auth_user_created` (profil auto) + `on_auth_user_created_link_tests`
  (rattachement prospect→compte).
- **RPC** : `migrate_import_account`, `migrate_lookup`, `migrate_validation_report`,
  `migrate_rollback`, `migrate_rollback_user`, `migrate_validation_user` (créées + `revoke` appliqués).
- **Extensions** : `create extension if not exists pgcrypto with schema extensions` exécuté.
- **search_path** : `migrate_import_account` en `public, auth, extensions` (correctif R3).
- **Permissions** : `revoke all … from public/anon/authenticated` sur les fonctions sensibles.

## Verdict Phase 2

✅ **Migrations appliquées et vérifiées sur staging. Aucune erreur.** Prêt pour la Phase 3
(import pilote d'un seul utilisateur, `--user-id 2`).
