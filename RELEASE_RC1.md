# ARCADINS — RELEASE CANDIDATE 1 (RC1)

**Objet :** migration finale de l'ANCIENNE plateforme (`arcadins-training.com`, Node/Express +
SQLite sur Render) vers la NOUVELLE plateforme (Next.js + Supabase).
**Statut :** ✅ **Prêt — aucune écriture effectuée.** Tout le code, les scripts, les
migrations et la documentation sont en place ; **rien n'a encore été écrit dans Supabase.**
**Date :** 2026-07-28 · **Branche :** `audit-refonte` · **Option retenue :** **A** (préservation
des 14 tests d'essai de prospects).

---

## 1. Principe directeur

> Aucune perte de données. Aucun remplacement destructif. Aucune écriture sans sauvegarde
> vérifiée. Toutes les opérations transactionnelles et **idempotentes**. Chaque étape produit
> un rapport. Rollback complet possible à chaque étape.

Le double verrou de sécurité s'applique à **tous** les scripts d'écriture : rien ne s'exécute
sans `--live --confirm` **et** les identifiants de service Supabase présents dans
l'environnement. Par défaut, tout est en **dry-run (lecture seule)**.

## 2. Composants livrés

| Composant | Fichier | État |
|---|---|---|
| Schéma de réception legacy | `supabase/migrations/0005_legacy_import.sql` | Écrit — **non appliqué** |
| RPC transactionnelles (comptes, validation, rollback) | `supabase/migrations/0006_migration_rpcs.sql` | Écrit — **non appliqué** |
| Export lecture seule | `scripts/migration/export-legacy.mjs` | ✅ |
| Transformation (mapping, dédup, Option A) | `scripts/migration/transform.mjs` | ✅ |
| Import réel (idempotent, gardé) | `scripts/migration/import-core.mjs` + wrappers | ✅ |
| Réconciliation | `scripts/migration/reconcile.mjs` | ✅ |
| Validation post-import | `scripts/migration/validate-migration.mjs` | ✅ |
| Rollback | `scripts/migration/rollback.mjs` (→ RPC `migrate_rollback`) | ✅ |
| Orchestrateur dry-run | `scripts/migration/run-dryrun.mjs` | ✅ |
| Validateur de migration (admin) | `src/app/admin/migration/*` | ✅ |
| ARCADINS Platform Health (admin) | `src/app/admin/health/*` | ✅ |

## 3. Rapports RC1

- `BACKUP_REPORT.md` — preuve de la copie de sauvegarde de la base source.
- `DATABASE_VALIDATION_REPORT.md` — comptages attendus / réels + intégrité (généré).
- `FINAL_MIGRATION_REPORT.md` — bilan complet de la migration.
- `ROLLBACK_PLAN.md` — procédure d'annulation, à chaque étape.
- `PRODUCTION_CHECKLIST.md` — étapes avant écriture en production.
- `POST_DEPLOYMENT_CHECKLIST.md` — contrôles après import.
- `ARCADINS_MIGRATION_RECONCILIATION_REPORT.md` — réconciliation dry-run (copie locale, gitignoré).

## 4. Chiffres clés (dry-run sur copie de production, 0 perte)

| Entité | Source | Cible transformée | Rejets |
|---|---|---|---|
| Utilisateurs | 28 | 12 comptes + 16 prospects | 0 |
| Prospects (table) | 26 | 26 | 0 |
| Tests (Option A) | 35 | 35 | **0** |
| Modules | 168 | 168 | 0 |
| Certificats | 7 | 7 | 0 |
| Paiements confirmés | 10 | 10 | 0 |
| Réglages / Journaux | 5 / 14 | 5 / 14 | 0 |

**Source :** `arcadins-PROD.db` · sha256 `952c4126…83b5b` · intégrité `ok` · FK `0`.

## 5. Qualité

- `npm test` : suite verte (transformation + notifications + intégration).
- `npm run lint` : 0 erreur.
- Aucune donnée personnelle ni hachage dans les journaux (redaction systématique).

## 6. Prochaines étapes (sous autorisation explicite)

1. **BLOC B** — préparation staging : appliquer `0005` + `0006` sur un projet **staging**,
   tester la connexion bcrypt d'un compte réel (Scénario B).
2. **Import pilote** — un seul utilisateur (voir procédure au §7 du message de livraison).
3. **Migration complète** — entité par entité, avec validation après chacune.

> Aucune de ces étapes ne sera lancée sans votre feu vert écrit.
