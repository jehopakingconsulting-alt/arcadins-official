# Scripts de migration ARCADINS (legacy → Supabase)

Pipeline **idempotent, dry-run par défaut**, pour migrer l'ancienne base **SQLite** (`arcadins.db`, backend
Express) vers **Supabase**. Voir `ARCADINS_LEGACY_DATA_MAPPING.md` et la migration `0005_legacy_import.sql`.

## ⚠️ Sécurité
- **Aucune écriture** nulle part sans `--live --confirm` **et** les creds Supabase (`NEXT_PUBLIC_SUPABASE_URL`
  + `SUPABASE_SERVICE_ROLE_KEY`). Sans ça, tout est simulation.
- La base source est ouverte **en lecture seule** ; jamais modifiée.
- Les exports (`_data/`) contiennent des hachages/PII → **gitignorés**, jamais committés.
- Les logs ne contiennent **ni mot de passe, ni hachage** ; les e-mails y sont **redactés** (`j***@ex.com`).

## Flux
```
export-legacy.mjs   SQLite → _data/legacy-export.json (+ meta: checksum, integrity, counts)
transform-legacy.mjs  export → _data/transformed.json (+ report.json, errors.log)
import-*.mjs        transformé → Supabase (users/payments/progress/results/certificates/referrals)
reconcile.mjs       compare source vs cible → ARCADINS_MIGRATION_RECONCILIATION_REPORT.md
run-dryrun.mjs      export + transform + reconcile (tout en dry-run)
```

## Utilisation (dry-run local)
```bash
# Tout le dry-run sur la copie locale (défaut : arcadins-training/server/arcadins.db)
node scripts/migration/run-dryrun.mjs

# Ou pointer une autre base (ex. la copie de PROD téléchargée)
node scripts/migration/run-dryrun.mjs --db "C:\\chemin\\arcadins-PROD.db"
```

## Drapeaux
`--dry-run` (défaut) · `--live` + `--confirm` (écriture réelle, gardée) · `--batch-size N` · `--only <entité>`
· `--user-id <id>` · `--resume` · `--db <chemin>` · `--report`.

## Import réel (uniquement après validation)
1. Appliquer `0005_legacy_import.sql` sur Supabase (staging d'abord).
2. Fournir la base de **production** (`--db`).
3. Tester la compatibilité **bcrypt** sur un compte pilote (staging).
4. `--live --confirm` **seulement** après le rapport de réconciliation validé.
