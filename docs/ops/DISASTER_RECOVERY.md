# ARCADINS — Disaster Recovery (DR)

## Objectifs
- **RPO** (perte de données max tolérée) : ≤ 24 h (backups quotidiens) ; ≤ minutes avec PITR activé.
- **RTO** (temps de rétablissement cible) : ≤ 2 h pour une restauration Supabase.

## Sauvegardes
- **Supabase** : backups automatiques + **PITR** (selon plan). Vérifier la fraîcheur avant toute
  opération sensible (`PRODUCTION_RELEASE_CHECKLIST` §1).
- **Source legacy** : copie vérifiée (sha256) conservée hors dépôt (voir `BACKUP_REPORT.md`).
- **Code** : Git (branches + tags `RC1_*`). Aucune donnée sensible committée (`.env*` ignoré).

## Scénarios & réponses
| Scénario | Réponse |
|---|---|
| Corruption après import | `rollback` (compte/lot/global) → re-import ; sinon **PITR** au point pré-migration |
| Suppression accidentelle de données | **PITR** au timestamp juste avant |
| Perte du projet Supabase | Restaurer depuis backup / recréer projet + réappliquer migrations `0000→0007` + réimport |
| Compromission de secret | Rotation (RUNBOOK) + révocation + audit |
| Panne région | Restauration dans une région disponible ; DNS/redéploiement Vercel |

## Procédure de restauration (résumé)
1. Décider PITR vs backup complet (selon RPO). 2. Restaurer la base. 3. Réappliquer les migrations
manquantes si base recréée. 4. Vérifier (`validate-migration --check-target`, smoke tests). 5. Rouvrir
le trafic. 6. Post-mortem.

## Tests DR
- Rollback testé sur staging (pilote : rollback + ré-import OK).
- **À planifier** : exercice de restauration PITR sur un projet de test (au moins trimestriel).
