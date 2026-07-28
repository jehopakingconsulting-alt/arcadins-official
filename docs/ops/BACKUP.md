# ARCADINS — Backup & PITR

## Couches de sauvegarde
1. **Backups managés Supabase** (quotidiens, selon plan) — première ligne.
2. **PITR** (Point-In-Time Recovery) — restauration à la minute (selon plan). **RPO ≤ minutes.**
3. **Dump logique quotidien** (`.github/workflows/backup.yml`) : `pg_dump -Fc` chiffré (GPG),
   artefact rétention 30 j — copie indépendante hors Supabase.

## Secrets requis (backup CI)
- `SUPABASE_DB_URL` (chaîne de connexion Postgres — jamais en clair, secret GitHub).
- `BACKUP_PASSPHRASE` (chiffrement GPG symétrique du dump).

## Restauration
- **PITR** : dashboard Supabase → Database → PITR → timestamp pré-incident (voir `DISASTER_RECOVERY.md`).
- **Dump logique** :
  ```bash
  gpg --batch --passphrase "$BACKUP_PASSPHRASE" -d arcadins-<ts>.dump.gpg > restore.dump
  pg_restore --clean --if-exists -d "$TARGET_DB_URL" restore.dump
  ```

## Vérification (obligatoire, périodique)
- **Un backup non testé n'est pas un backup.** Restaurer trimestriellement sur un projet de test et
  valider (`validate-migration.mjs --check-target`, smoke tests). Statut actuel : **REQUIRES
  PRODUCTION VALIDATION** (exercice à planifier).

## Avant toute migration prod
- Backup + PITR **confirmés et horodatés** (`PRODUCTION_RELEASE_CHECKLIST.md` §1).
