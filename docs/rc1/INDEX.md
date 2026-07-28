# ARCADINS — Archive RC1 (jalon `RC1_STAGING_SUCCESS`)

Manifeste des livrables produits pour la migration legacy → Supabase, du RC1 au pilote staging
réussi. Tous les fichiers sont versionnés sur la branche `audit-refonte` (commit taggé
`RC1_STAGING_SUCCESS`). Date d'archivage : **2026-07-28**.

## Audit & mapping (legacy)
- [ARCADINS_LEGACY_SYSTEM_AUDIT.md](../../ARCADINS_LEGACY_SYSTEM_AUDIT.md) — audit du système source.
- [ARCADINS_LEGACY_BACKUP_PLAN.md](../../ARCADINS_LEGACY_BACKUP_PLAN.md) — plan de sauvegarde source.
- [ARCADINS_LEGACY_DATA_MAPPING.md](../../ARCADINS_LEGACY_DATA_MAPPING.md) — mapping des données.

## Release Candidate 1
- [RELEASE_RC1.md](../../RELEASE_RC1.md) — synthèse RC1.
- [FINAL_MIGRATION_REPORT.md](../../FINAL_MIGRATION_REPORT.md) — bilan de migration.
- [ROLLBACK_PLAN.md](../../ROLLBACK_PLAN.md) — plan de rollback (N0→N3).
- [PRODUCTION_CHECKLIST.md](../../PRODUCTION_CHECKLIST.md) — checklist avant écriture.
- [POST_DEPLOYMENT_CHECKLIST.md](../../POST_DEPLOYMENT_CHECKLIST.md) — checklist post-import.
- [BACKUP_REPORT.md](../../BACKUP_REPORT.md) — preuve de sauvegarde source.
- [DATABASE_VALIDATION_REPORT.md](../../DATABASE_VALIDATION_REPORT.md) — validation (généré).

## Audit final RC1
- [RC1_FINAL_READINESS_REPORT.md](../../RC1_FINAL_READINESS_REPORT.md) — audit v1 (2 SQL blockers trouvés).
- [RC1_FINAL_READINESS_REPORT_v2.md](../../RC1_FINAL_READINESS_REPORT_v2.md) — v2 post-correctifs (GO STAGING).

## BLOC B — Staging
- [PRE_STAGING_CHECKLIST.md](../../PRE_STAGING_CHECKLIST.md) — sécurisation Phase 1.
- [MIGRATION_EXECUTION_REPORT.md](../../MIGRATION_EXECUTION_REPORT.md) — application `0000+0005+0006`.
- [STAGING_PILOT_REPORT.md](../../STAGING_PILOT_REPORT.md) — **pilote 1 utilisateur : ✅ GO**.

## Production (préparation, non exécuté)
- [PRODUCTION_IMPORT_PLAN.md](../../PRODUCTION_IMPORT_PLAN.md) — plan d'import progressif par lots.

## Scripts & migrations de référence
- `supabase/migrations/0005_legacy_import.sql`, `0006_migration_rpcs.sql`
- `supabase/STAGING_PILOT_APPLY.sql` (bundle staging `0000+0005+0006`)
- `scripts/migration/*` (export, transform, import, rollback, validate)

> Rapport à PII exclu de l'archive Git : `ARCADINS_MIGRATION_RECONCILIATION_REPORT.md` (gitignoré).
