# ARCADINS — Audit des migrations Production

**Objets réels** relevés par inspection des fichiers (`grep`). **État Production = À PROUVER** via
`scripts/ops/prod-preflight.sql` (exécuter dans le SQL Editor prod ; je ne peux pas interroger la prod
depuis cet environnement — `.env.local` cible le staging). **Aucune migration n'est déclarée appliquée
sans preuve.**

## Matrice

| Migration | Objets créés/modifiés | Dépendances | État Prod | Preuve requise | Risque | Rollback dispo | Action | Statut |
|---|---|---|---|---|---|---|---|---|
| **0000** staging_base | `profiles`, `contact_requests` (2 t), `handle_new_user` (fn), trigger `on_auth_user_created`, 3 policies | `auth.users` | ❓ à prouver | tables+fn+trigger (préflight §1,3,4) | ⚠️ **staging-only** : prod possède déjà `profiles` → **NE PAS réappliquer** | n/a | Vérifier présence ; **ne pas rejouer** en prod | À vérifier |
| **0001** tutoring/tutor | `tutoring_requests`, `tutor_applications` (2 t), 2 policies | 0000 (`profiles`) | ❓ à prouver | préflight §1 | formulaires tutorat/tuteur = 503 si absent | DOWN commenté | Appliquer si absent | À vérifier |
| **0002** roles_expansion | `ALTER` CHECK `profiles.role` (+tutor/…roles) | 0000 | ❓ à prouver | préflight §2 | rôles admin étendus indisponibles | DOWN | Appliquer si absent | À vérifier |
| **0003** referrals | `referral_codes/relationships/commissions` (3 t), 3 policies | 0000 | ❓ à prouver | préflight §1 | parrainage HS (flag OFF de toute façon) | DOWN | Appliquer si absent | À vérifier |
| **0004** notifications | `notifications`, `notification_preferences`, `notification_delivery_logs`, `application_status_history` (4 t), 4 policies | 0001, 0002 | ❓ à prouver | préflight §1 | journaux/notifs admin absents | DOWN | Appliquer si absent | À vérifier |
| **0005** legacy_import | 10 tables `legacy_*`, fn `link_legacy_tests_on_signup`, trigger, 1 policy(loop) | `auth.users`, `profiles` | ❓ à prouver | préflight §1,3,4 | import legacy impossible ; admin Migration/Health « non activé » | DOWN (drop cascade) | Appliquer (Phase 1 go-live) | À vérifier |
| **0006** migration_rpcs | 6 fn `migrate_*`, extension `pgcrypto` | 0005 | ❓ à prouver | préflight §3,5 | RPC import/validation absentes | DOWN | Appliquer après 0005 | À vérifier |
| **0007** hardening | fn `migrate_import_account` (redéf), 1 policy storage, **bucket `legacy-certificates`** | 0005, 0006 | ❓ à prouver | préflight §3,6,7 | moindre privilège RPC + bucket privé absents | DOWN | Appliquer après 0006 | À vérifier |

## Propriétés vérifiées (analyse statique, preuve `sql-audit.mjs` = 0 défaut)
- **Ordre** : 0000→0007 linéaire, dépendances respectées. **Idempotence** : `create ... if not exists`,
  `create or replace`, upserts. **Réversibilité** : sections DOWN présentes. **FK** : pas de référence
  en avant (corrigé A1/B1). **Extensions** : `pgcrypto` (0006). **Pas de suppression/écrasement** de
  données existantes (100 % additif).
- **Aucun risque de collision** avec les tables natives : tout le legacy va dans `legacy_*`.

## Règle critique
- **0000 est « staging-only »** (recrée `profiles`) : en PRODUCTION, `profiles` existe déjà → **ne
  jamais réappliquer 0000**. En prod, n'appliquer que les migrations **absentes** (à déterminer par le
  préflight), dans l'ordre, en commençant par celles réellement manquantes (typiquement `0005→0006→0007`,
  et `0001-0004` **seulement si le préflight prouve leur absence**).

## Plan d'application (sous GO, backup préalable obligatoire)
Pour **chaque** migration manquante, dans l'ordre :
1. Backup/PITR confirmés (Phase Backup).
2. Exécuter le fichier dans le SQL Editor prod.
3. **Re-exécuter `prod-preflight.sql`** → prouver la présence des objets.
4. Health-check `/api/ready` (après déploiement app) + tests ciblés (auth, tutorat, paiement,
   affiliation, certificats, progression).
5. **Erreur** → rollback via section DOWN de la migration concernée + PITR si nécessaire.
6. Journaliser (migration, horodatage, preuve, résultat).

> **Aucune migration n'est appliquée par cette intervention.** Le préflight fournit la vérité terrain ;
> le plan ci-dessus s'exécute uniquement sous votre GO explicite.
