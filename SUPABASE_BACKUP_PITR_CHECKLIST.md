# ARCADINS — Backup & PITR Supabase (checklist manuelle)

Non vérifiable automatiquement ici (pas d'accès dashboard prod ; `.env.local`=staging). À réaliser
manuellement sur le projet de **PRODUCTION**. **Ne rien exécuter d'écriture. Ne rien supprimer.**

## Projet cible
- Projet PROD : **`banhxhbmepsbaxhjydjd`** (à confirmer) · Région : `______` · Plan : `______`.

## Contrôles dashboard (chemins exacts)
| # | Contrôle | Chemin dashboard | Preuve à capturer |
|---|---|---|---|
| 1 | Statut base | Project → Home | capture « Healthy » |
| 2 | Backups existants | Database → **Backups** | date/heure du dernier backup |
| 3 | PITR activé | Database → Backups → **Point in Time** | statut + fenêtre de rétention |
| 4 | Rétention | idem | nb de jours conservés |
| 5 | Restauration possible | idem (bouton Restore visible) | capture |

## À noter (rapport)
- Projet ID : `______` · Région : `______`
- Dernier backup : `______ (UTC)`
- PITR : `activé / inactif` · Rétention : `___ jours`
- **Point de retour pré-migration** (timestamp UTC) : `__________________`
- Propriétaire responsable : `__________`

## Backup logique (COMPLÉMENT — sous GO explicite uniquement)
Ne PAS exécuter sans autorisation. Chaîne de connexion = secret (jamais en clair).
```bash
# Dump custom-format compressé (lecture seule côté données)
pg_dump "$SUPABASE_DB_URL" -Fc -f "arcadins-prod-$(date -u +%Y%m%d-%H%M).dump"

# Contrôle d'intégrité du dump (liste le contenu sans restaurer)
pg_restore --list "arcadins-prod-YYYYMMDD-HHMM.dump" | head
# + taille et somme de contrôle
ls -la arcadins-prod-*.dump && sha256sum arcadins-prod-*.dump
```
> Automatisation disponible : `.github/workflows/backup.yml` (quotidien, chiffré) — nécessite les
> secrets `SUPABASE_DB_URL` + `BACKUP_PASSPHRASE`.

## Test de restauration (recommandé, sur projet de TEST, sous GO)
```bash
pg_restore --clean --if-exists -d "$TEST_DB_URL" arcadins-prod-YYYYMMDD-HHMM.dump
# puis : node scripts/migration/validate-migration.mjs --check-target
```

## Procédure de rollback
- **PITR** au timestamp pré-migration (dashboard) — voir `docs/ops/DISASTER_RECOVERY.md`.
- Ou restauration du dump logique sur un point de retour.

## Statut GO / NO-GO (à cocher avec preuves)
- [ ] Backup récent existe (preuve #2)
- [ ] PITR confirmé **ou** dump logique + test de restauration OK
- [ ] Restauration techniquement possible (preuve)
- [ ] Point de retour pré-migration identifié + horodaté
→ **GO** uniquement si les 4 cases sont prouvées, sinon **NO-GO**.
