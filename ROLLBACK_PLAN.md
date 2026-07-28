# ARCADINS — Plan de rollback (annulation de migration)

Principe : **on peut revenir en arrière à chaque étape**, sans perte des données natives de la
nouvelle plateforme. Les tables `legacy_*` ne contiennent QUE des données de migration ; leur
vidage n'affecte rien d'autre.

## Niveaux de rollback

### N0 — Avant toute écriture (état actuel)
Rien à annuler. Les migrations `0005`/`0006` ne sont pas appliquées. **Aucune action.**

### N1 — Migrations appliquées, aucun import
Annuler le schéma :
```sql
-- section DOWN de 0006 puis 0005 (voir fin de chaque fichier)
drop function if exists public.migrate_import_account(jsonb);
drop function if exists public.migrate_lookup(text, bigint);
drop function if exists public.migrate_validation_report();
drop function if exists public.migrate_rollback(boolean);
drop table if exists public.legacy_audit_log, public.legacy_admin_settings,
  public.legacy_prospects, public.legacy_payments, public.legacy_certificates,
  public.legacy_modules, public.legacy_tests, public.legacy_learners,
  public.legacy_referrals, public.legacy_id_map cascade;
```

### N2 — Données importées (pilote ou complet)
Rollback **atomique** via la RPC dédiée, sans supprimer le schéma :

```bash
# Lecture seule : liste ce qui serait vidé
node scripts/migration/rollback.mjs

# Exécution (garde les comptes auth) :
node scripts/migration/rollback.mjs --live --confirm

# Exécution + suppression des comptes auth créés par la migration :
node scripts/migration/rollback.mjs --live --confirm --purge-auth
```
La RPC `migrate_rollback(p_purge_auth)` exécute un `truncate … restart identity cascade` de
toutes les tables `legacy_*` **en une seule transaction**. Avec `--purge-auth`, elle supprime
d'abord les comptes `auth.users` référencés dans `legacy_id_map` (donc **uniquement** ceux
créés par l'import).

### N3 — Restauration complète depuis sauvegarde
En dernier recours, restaurer via **PITR Supabase** (point-in-time recovery) au timestamp
d'avant migration. Voir `BACKUP_REPORT.md` pour l'horodatage de référence.

## Vérification après rollback
```bash
node scripts/migration/validate-migration.mjs --check-target
```
Tous les comptages cible doivent revenir à **0** ; aucun test orphelin.

## Garanties
- Idempotent : réexécuter un rollback déjà effectué ne produit pas d'erreur.
- Non destructif pour le natif : aucune table applicative existante n'est touchée.
- L'ancienne plateforme reste **intacte et en ligne** jusqu'à bascule décidée séparément.
