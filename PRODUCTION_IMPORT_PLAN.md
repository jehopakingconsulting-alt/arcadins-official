# ARCADINS — PRODUCTION_IMPORT_PLAN

**Statut :** PLAN uniquement. **Aucun import production n'est autorisé par ce document.**
**Règle absolue :** aucune écriture sur la production sans autorisation explicite, par lot.
**Date :** 2026-07-28 · **Pré-requis validé :** pilote staging réussi (`STAGING_PILOT_REPORT.md`).

---

## 0. Cible & réalité du jeu de données

- **Projet production :** `banhxhbmepsbaxhjydjd` (nouvelle plateforme LIVE). ⚠️ contient déjà des
  données réelles → **backup + PITR obligatoires**.
- **Volume source réel** (copie prod vérifiée, sha256 `952c4126…`) :
  **12 comptes** (1 admin, 10 students, 1 support) · 42 prospects · 35 tests · 168 modules ·
  10 paiements · 7 certificats · 5 réglages · 14 journaux.
- **IDs des 12 comptes :** `1, 2, 3, 7, 10, 16, 17, 19, 20, 21, 23, 24`.

> **Note de cadence.** Le découpage demandé (5 / 25 / 100) dépasse le volume réel (12 comptes).
> Le plan **respecte l'esprit** (vagues croissantes + validation complète entre chaque) en
> l'adaptant au volume : **Lot 1 = 5 comptes**, **Lot 2 = 7 comptes restants**, **Lot 3 = données
> de référence** (prospects, tests prospects, réglages, journaux). Aucun import massif d'un coup ;
> **les comptes Auth sont toujours créés un par un** (`--user-id`), **jamais** `--all`.

## 1. Stratégie d'import

- **Additif et idempotent** : tout va dans les tables `legacy_*` + création de comptes `auth`
  via la RPC atomique `migrate_import_account` (upsert par email). Réexécutable sans doublon.
- **Comptes = un par un** : pour chaque `legacy_id`, on lance les 6 entités scellées `--user-id`.
  Le drapeau `--all` reste **interdit sur `users`**.
- **Données de référence non nominatives** (prospects, réglages, journaux, tests de prospects) :
  importées en dernier lot, via les scripts dédiés (upsert par clé naturelle, aucun compte auth).
- **Verrous** inchangés : `--live` + `--confirm` + creds service-role + cible explicite.

## 2. Ordre d'exécution

### Étape 0 — Préparation production (gate critique)
1. **Backup complet** du projet prod + **PITR** activé, horodatage noté.
2. Appliquer **seulement** `0005_legacy_import.sql` puis `0006_migration_rpcs.sql` dans le SQL
   Editor prod. ⚠️ **NE PAS** appliquer `0000` (prod possède déjà `profiles` et les tables métier).
3. Vérifier (lecture) : `migrate_validation_report()` répond, comptes = 0.
4. **Pré-flight collisions e-mail** (voir §9, risque R1) : lister les emails legacy déjà présents
   dans `auth.users` prod ; décider du traitement avant le Lot 1.

### Étape 1 — Lot 1 (5 comptes) : `2, 3, 7, 10, 16`
Pour chaque id, dans l'ordre : `users → payments → progress → results → certificates → referrals`.
```bash
for id in 2 3 7 10 16; do
  for e in users payments progress results certificates referrals; do
    node scripts/migration/import-$e.mjs --live --confirm --user-id $id
  done
done
node scripts/migration/validate-migration.mjs --check-target
```
Puis **validation complète** (§7) + **test de connexion bcrypt réel** sur ≥1 compte du lot.

### Étape 2 — Lot 2 (7 comptes restants) : `17, 19, 20, 21, 23, 24, 1`
Idem, puis validation complète + login test (inclut le compte `admin` id 1 et `support` id 24).

### Étape 3 — Lot 3 (données de référence)
```bash
node scripts/migration/import-prospects.mjs     --live --confirm --all
node scripts/migration/import-results.mjs       --live --confirm --all   # inclut tests prospects
node scripts/migration/import-referrals.mjs     --live --confirm --all   # relie referrer/referee
# (réglages & journaux via leurs scripts dédiés en --all)
```
Validation **globale** : cible attendue = 12 comptes · 42 prospects · 35 tests · 168 modules ·
10 paiements · 7 certifs · 5 réglages · 14 journaux.

### Étape 4 — Storage
Copier les **7 PDF de certificats** vers le bucket privé `legacy-certificates`
(métadonnées déjà importées).

## 3. Durée estimée

| Phase | Estimation |
|---|---|
| Application `0005`+`0006` | < 30 s |
| Lot 1 (5 comptes × 6 entités) | ~30–60 s |
| Lot 2 (7 comptes) | ~45–75 s |
| Lot 3 (référence) | ~15 s |
| **Total compute** | **< 5 minutes** |

## 4. Estimation du temps d'arrêt

**≈ 0 (aucune interruption de service requise).** L'import est **additif** : il crée des comptes
`auth` et remplit des tables `legacy_*` sans modifier les tables métier existantes ni les sessions
en cours. L'**ancienne** plateforme reste en ligne, la **nouvelle** aussi. Recommandation : opérer
en **fenêtre à faible trafic** par prudence, mais **aucune maintenance bloquante** n'est nécessaire.

## 5. Procédure de reprise

- **Idempotent par conception** : réexécuter un id ou un lot ne crée aucun doublon (upsert par
  email / clé naturelle ; `legacy_id_map` trace les comptes déjà créés).
- **Interruption en cours de lot** → relancer le lot entier : les comptes déjà importés sont
  simplement ré-upsertés (aucun effet de bord).
- **Vérifier l'avancement** à tout moment : `validate-migration.mjs --check-target` (lecture).

## 6. Rollback complet

| Portée | Commande | Effet |
|---|---|---|
| Un compte | `rollback.mjs --live --confirm --user-id <id> --purge-auth` | supprime les données legacy + le compte auth de cet id |
| Un lot | boucle du tableau ci-dessus sur les ids du lot | annule le lot |
| **Global** | `rollback.mjs --live --confirm --purge-auth` | `truncate` de toutes les tables `legacy_*` + purge des comptes auth **créés par la migration** (via `legacy_id_map`) |

> Le rollback global ne supprime **que** les comptes référencés dans `legacy_id_map` (créés par
> l'import) — **jamais** les utilisateurs natifs de la nouvelle plateforme. En dernier recours :
> **PITR** au point de restauration pré-migration.

## 7. Checkpoints & validations après chaque lot

Après **chaque** lot, tout doit être vert avant de continuer :
- [ ] `rejected = 0` et `Erreurs journalisées : 0` sur chaque import.
- [ ] `validate-migration.mjs --check-target` : comptes cumulés = attendus du lot.
- [ ] Intégrité : `tests_orphelins = 0`, `certificats_dupliques = 0`, `mappings_casses = 0`.
- [ ] **≥ 1 connexion bcrypt réelle réussie** sur un compte du lot (valide le Scénario B).
- [ ] Contrôle applicatif : profil + progression visibles pour un compte migré.
- [ ] Écran admin « Migration Validator » : catégories ✅ ; « Platform Health » ≥ 85/100.

## 8. Critères GO / NO GO

**GO (passer au lot suivant)** si **toutes** les cases du §7 sont ✅.
**NO GO / STOP** si l'un de ces signaux apparaît :
- un `rejected > 0` ou une erreur `rpc:` / `upsert_…` ;
- un écart de comptage inexpliqué ou une intégrité non nulle ;
- **échec de la connexion bcrypt** (déclenche le repli Scénario C : lien de réinitialisation) ;
- toute collision e-mail non anticipée modifiant un compte existant.
→ En NO GO : **arrêter**, produire un rapport d'erreur, **rollback du lot**, corriger, rejouer.

## 9. Risques résiduels

| # | Risque | Gravité | Probabilité | Mitigation |
|---|---|---|---|---|
| R1 | **Collision e-mail** : un email legacy existe déjà dans `auth.users` prod → la RPC (idempotente) n'écrase pas le mot de passe mais **upsert le rôle** et rattache learner/id_map au compte existant | Élevé | Faible-Moyenne | **Pré-flight** liste des collisions avant Lot 1 ; décider au cas par cas (skip / rattacher) ; envisager de ne pas écraser `role` |
| R2 | **Connexion bcrypt non prouvée** en prod jusqu'au 1er login réel | Élevé | Moyenne | Test login obligatoire dès le Lot 1 (§7) ; repli Scénario C |
| R3 | **PDF certificats** non copiés (métadonnées seules) | Moyen | Certaine | Étape 4 Storage dédiée |
| R4 | **referrer/referee** non résolus si parrain importé dans un lot ultérieur | Faible | Moyenne | Passe finale `import-referrals --all` au Lot 3 (après tous les comptes) |
| R5 | Application de migration sur prod (DDL) | Moyen | Faible | Backup+PITR avant ; appliquer **uniquement** `0005`+`0006` ; transactionnel |
| R6 | Sur-écriture involontaire de données natives | Élevé | Très faible | Import 100 % additif (`legacy_*`), aucun `update` des tables métier ; rollback global ne touche pas le natif |
| R7 | `--all` lancé par erreur sur `users` | Élevé | Très faible | Interdit par le garde-fou `resolveScope` (refus sans `--user-id` ni `--all`) ; procédure n'utilise `--all` que sur prospects/tests/referrals |

## 10. Critères GO / NO GO globaux (fin d'import)

**GO import terminé** si : 12 comptes + 42 prospects + 35 tests + 168 modules + 10 paiements +
7 certifs + 5 réglages + 14 journaux, intégrité toute à 0, ≥ 1 login réussi par lot, PDF copiés.
**NO GO** sinon → rollback global + PITR si nécessaire.

---

## Séquence d'autorisation (rappel)

1. Ce plan validé par vous.
2. Backup + PITR prod + application `0005`/`0006` (avec votre feu vert).
3. **Lot 1 (5)** → validation complète → **STOP / votre autorisation**.
4. **Lot 2 (7)** → validation complète → **STOP / votre autorisation**.
5. **Lot 3 (référence)** + Storage → validation globale → **STOP**.
6. Décision de bascule (séparée).

> **Aucune écriture prod ne sera lancée sans votre autorisation explicite, lot par lot.**
