# ARCADINS — PRODUCTION_IMPORT_PLAN (générique, par pourcentages)

**Statut :** PLAN + PLAYBOOK officiels. **Aucun import production n'est autorisé par ce document.**
**Règle absolue :** aucune écriture prod sans autorisation explicite, **lot par lot**.
**Portée :** volume-agnostique — valable pour **50, 500, 5 000 ou 50 000 comptes** sans modification
de structure. **Pré-requis validé :** pilote staging réussi (`STAGING_PILOT_REPORT.md`, tag
`RC1_STAGING_SUCCESS`).

> Ce document ne dépend **pas** du nombre actuel d'utilisateurs. Tout est exprimé en **pourcentage**
> de la population source `N` (nombre total de comptes à migrer, découvert à l'exécution). L'instance
> concrète du jour (N = 12) figure en **Annexe A**, à titre d'exemple uniquement.

---

## 1. Principes directeurs (invariants, quel que soit N)

1. **Additif & idempotent** : écritures dans `legacy_*` + création de comptes `auth` via la RPC
   atomique `migrate_import_account` (upsert par email). Toute étape est ré-exécutable sans doublon.
2. **Comptes créés un par un** (`--user-id`) **ou par lot résumable** — **jamais** `--all` sur `users`.
3. **Vagues croissantes** validées **intégralement** avant la suivante.
4. **Aucune modification des données natives** : les tables métier de la nouvelle plateforme ne sont
   jamais mises à jour ; seules `legacy_*` et `auth.users` (nouveaux comptes) sont écrites.
5. **Zéro import massif d'un coup.** Chaque lot est un point d'arrêt avec décision GO/NO GO.
6. **Temps d'arrêt ≈ 0** à toute échelle (import additif, aucune interruption de service).

## 2. Découpage par pourcentage (générique)

Soit `N` = nombre total de comptes source. Taille d'un lot : `taille_i = ceil(N × pct_i)`.
L'ordre de sélection est **déterministe** (tri par `legacy_id` croissant) pour garantir reprise et
non-recouvrement.

| Lot | Part du lot | Cumulé | Rôle |
|---|---|---|---|
| **LOT 1** | ≈ **5 %** | 5 % | Vague de confiance (petite, surveillée) |
| **LOT 2** | ≈ **15 %** | 20 % | Montée en charge |
| **LOT 3** | ≈ **30 %** | 50 % | Moitié de la population |
| **LOT 4** | ≈ **50 %** | 100 % | Solde des comptes |
| **LOT FINAL / Clôture** | données de référence | 100 % | Prospects, tests de prospects, réglages, journaux, Storage + **réconciliation globale** |

**Garde-bas d'échelle :** si `ceil(N × 5 %) < 5`, plafonner LOT 1 à `min(5, N)` comptes (un petit
N n'empêche pas une première vague prudente). À grand N, les pourcentages priment.

### Exemples de tailles de lots (comptes) selon N
| N | LOT 1 (5 %) | LOT 2 (15 %) | LOT 3 (30 %) | LOT 4 (50 %) |
|---|---|---|---|---|
| 50 | 3 → **5** (garde-bas) | 8 | 15 | 25 |
| 500 | 25 | 75 | 150 | 250 |
| 5 000 | 250 | 750 | 1 500 | 2 500 |
| 50 000 | 2 500 | 7 500 | 15 000 | 25 000 |

## 3. Protocole PAR LOT (identique pour chaque lot)

> Ce protocole en 9 points s'applique **à l'identique** à LOT 1 → LOT 4 (le LOT FINAL suit la
> variante §4). Il est le cœur réutilisable du playbook.

**Sélection du lot (déterministe, résumable) :** les `taille_i` comptes de plus petit `legacy_id`
**non encore présents** dans `legacy_id_map` (entity='user'). → reprise automatique.

**Import (par compte, ordre des entités) :** `users → payments → progress → results → certificates → referrals`.

### 3.1 Durée estimée
`durée ≈ taille_lot × t_compte`, où `t_compte` est mesuré/calibré sur staging :
- **mode boucle `--user-id`** (petits volumes) : `t_compte ≈ 1–3 s` (dominé par le démarrage de
  process node) ;
- **mode lot résumable** (gros volumes, cf. §5) : `t_compte ≈ 0,05–0,2 s`.

| N | LOT 4 (mode) | Durée indicative |
|---|---|---|
| 50 | boucle | ~1 min |
| 500 | lot résumable | ~1–3 min |
| 5 000 | lot résumable | ~10–25 min |
| 50 000 | lot résumable | ~1,5–3 h (fractionnable en sous-lots) |

### 3.2 Critères GO / NO GO
- **GO (lot suivant)** si **toutes** les validations §3.3/§3.4 sont ✅.
- **NO GO / STOP** si : `rejected > 0`, erreur `rpc:`/`upsert_…`, écart de comptage inexpliqué,
  intégrité non nulle, **échec de connexion bcrypt**, ou collision e-mail non anticipée.

### 3.3 Validations AUTOMATIQUES (script, lecture seule)
- `validate-migration.mjs --check-target` : comptes cumulés = attendu du cumul.
- Intégrité : `tests_orphelins = 0`, `certificats_dupliques = 0`, `mappings_casses = 0`.
- `rejected = 0` et `Erreurs journalisées : 0` sur chaque entité.
- Comparaison **cumul attendu vs réel** (delta = taille du lot).

### 3.4 Validations MANUELLES (humaines)
- **≥ 1 connexion bcrypt réelle** réussie sur un compte du lot (Scénario B).
- Contrôle applicatif : profil + progression visibles pour un compte migré.
- Écran admin « Migration Validator » : catégories ✅ ; « Platform Health » ≥ 85/100.
- Revue rapide des cas particuliers (admin/support, comptes à collision e-mail éventuelle).

### 3.5 Rollback (du lot)
- Par compte : `rollback.mjs --live --confirm --user-id <id> --purge-auth`.
- Par lot : boucle sur les ids du lot.
- (Global : voir §4.3.)

### 3.6 Reprise
- **Idempotente** : relancer le lot ne crée aucun doublon (upsert + `legacy_id_map`).
- Interruption en cours → relancer le lot ; les comptes déjà faits sont ignorés par la sélection §3.
- État à tout moment : `validate-migration.mjs --check-target` (lecture).

### 3.7 Journalisation
- Sortie de chaque lot capturée dans `logs/prod-import/LOT<i>-<YYYYMMDD-HHMM>.log`.
- Artefacts machine : `scripts/migration/_data/report.json` + `errors.log` (sans PII).
- Table de traçabilité : `legacy_id_map` (comptes créés) + horodatage des exécutions.

### 3.8 Checkpoints
- **Avant** le lot : snapshot/PITR confirmé, cumul attendu noté.
- **Pendant** : après chaque sous-lot (gros N), contrôle intermédiaire des compteurs.
- **Après** : validations §3.3/§3.4 + décision GO/NO GO consignée.

### 3.9 Rapport produit
- `LOT<i>_IMPORT_REPORT.md` : cumul comptes, deltas, intégrité, résultat login, logs, GO/NO GO.

## 4. LOT FINAL / Clôture

### 4.1 Contenu
- **Prospects** (`import-prospects --all`), **tests de prospects** (`import-results --all`),
  **réglages** et **journaux** (scripts dédiés `--all`), puis **passe finale
  `import-referrals --all`** (résout referrer/referee une fois tous les comptes présents).
- **Storage** : copie des PDF de certificats vers le bucket privé `legacy-certificates`.

### 4.2 Validation globale
Cible finale = 100 % des comptes + toutes les entités de référence ; intégrité toute à 0 ;
`validate-migration.mjs --check-target` = attendu complet.

### 4.3 Rollback GLOBAL
`rollback.mjs --live --confirm --purge-auth` → `truncate` de toutes les tables `legacy_*` +
purge des comptes auth **créés par la migration** (via `legacy_id_map`), **jamais** les comptes
natifs. Dernier recours : **PITR** au point pré-migration.

## 5. Outillage & prérequis d'échelle

- **Petit volume (≤ ~200 comptes)** : la **boucle `--user-id`** existante suffit (prouvée au pilote).
- **Grand volume (> ~200 comptes)** : ajouter **avant** les runs un **sélecteur de lot résumable**
  au CLI — p. ex. `--limit <n>` (importe les `n` prochains comptes absents de `legacy_id_map`, tri
  `legacy_id`) — pour éviter des milliers de démarrages de process. **Cette évolution devra être
  développée puis re-testée sur staging** (mêmes garde-fous : `--live --confirm`, jamais `--all`
  sur `users`) et validée avant tout usage prod. Le présent plan reste inchangé : seul le *moyen*
  d'itérer sur un lot change, pas la stratégie.
- **Fractionnement** : à très grand N, chaque lot se subdivise en sous-lots (p. ex. 500) avec
  checkpoint intermédiaire ; la reprise idempotente garantit l'absence de recouvrement.

---

# 6. PRODUCTION MASTER PLAYBOOK

> **Procédure officielle de migration ARCADINS.** Volume-agnostique, réutilisable plusieurs années.
> À suivre pas à pas pour toute migration legacy → Supabase, quel que soit le nombre d'utilisateurs.

## 6.1 Rôles & responsabilités
- **Opérateur migration** : exécute les scripts, produit les rapports de lot.
- **Valideur (métier/propriétaire)** : donne le GO/NO GO explicite **par lot** (obligatoire).
- **Astreinte technique** : disponible pour rollback/PITR pendant les fenêtres d'import.

## 6.2 Pré-requis d'environnement (gate critique, avant tout)
1. **Vérifier la cible** : l'URL/ref du projet = **production ARCADINS** attendue, confirmée à voix
   haute et dans le rapport. Jamais d'ambiguïté staging/prod.
2. **Backup complet + PITR** activés, **horodatage pré-migration** noté.
3. Appliquer **uniquement** `0005_legacy_import.sql` puis `0006_migration_rpcs.sql` (les migrations
   `0000–0004` existent déjà en prod). Vérifier `migrate_validation_report()` (lecture).
4. **Pré-flight collisions e-mail** : lister les emails source déjà présents dans `auth.users` prod ;
   décider du traitement (skip / rattacher sans écraser le rôle) **avant** LOT 1.
5. Geler la source (aucune écriture nouvelle côté ancienne plateforme pendant la fenêtre, si possible)
   ou noter le point de coupure pour un rattrapage delta ultérieur.

## 6.3 Boucle standard d'un lot (résumé opérationnel)
```
Pour chaque LOT (1→4) :
  1. Confirmer PITR + cumul attendu (checkpoint entrée)
  2. Sélection déterministe des comptes du lot (tri legacy_id, absents de legacy_id_map)
  3. Import par compte : users→payments→progress→results→certificates→referrals
  4. Validations AUTO (validate --check-target + intégrité)
  5. Validations MANUELLES (login bcrypt réel + revue applicative + Health)
  6. Produire LOT<i>_IMPORT_REPORT.md
  7. Décision GO/NO GO → attendre l'autorisation explicite du Valideur
  8. NO GO → rollback du lot + rapport d'erreur + STOP
Puis LOT FINAL (référence + Storage) → validation globale → décision de bascule
```

## 6.4 Matrice de rollback
| Portée | Commande | Cible |
|---|---|---|
| Compte | `rollback.mjs --live --confirm --user-id <id> --purge-auth` | 1 compte migré |
| Lot | boucle sur ids du lot | comptes du lot |
| Global | `rollback.mjs --live --confirm --purge-auth` | tous les comptes migrés + `legacy_*` |
| Catastrophe | **PITR** au point pré-migration | base entière |

## 6.5 Portes de décision (obligatoires)
- Après **chaque** lot : GO/NO GO **explicite** du Valideur avant de continuer.
- Aucune vague ne s'enchaîne automatiquement. Aucune exception.

## 6.6 Artefacts standard d'une migration
- `PRE_STAGING_CHECKLIST` / `PRODUCTION_CHECKLIST` (sécurisation).
- `MIGRATION_EXECUTION_REPORT` (application des migrations).
- `LOT<i>_IMPORT_REPORT` (un par lot).
- `POST_DEPLOYMENT_CHECKLIST` (clôture).
- Logs horodatés `logs/prod-import/` + `report.json`/`errors.log` (sans PII).

## 6.7 Critères de réussite globale
100 % des comptes + entités de référence importés ; intégrité toute à 0 ; ≥ 1 login réussi par
lot ; PDF certificats copiés ; aucun impact sur les données natives. Sinon → rollback + PITR.

## 6.8 Réutilisation pour un futur volume (50 / 500 / 5 000 / 50 000)
1. Découvrir `N` (comptage source) → dériver les tailles de lot via §2.
2. Choisir le **mode d'itération** selon N (boucle vs lot résumable, §5).
3. Dérouler §6.2 → §6.5 à l'identique. **Aucune modification de structure requise.**

---

## Risques résiduels (invariants)
| # | Risque | Gravité | Mitigation |
|---|---|---|---|
| R1 | Collision e-mail avec un compte natif | Élevé | Pré-flight (§6.2.4) ; ne pas écraser le rôle |
| R2 | Connexion bcrypt non prouvée | Élevé | Login réel obligatoire dès LOT 1 ; repli Scénario C |
| R3 | PDF certificats non copiés | Moyen | LOT FINAL / Storage |
| R4 | referrer/referee non résolus | Faible | Passe finale `referrals --all` |
| R5 | DDL sur prod | Moyen | Backup+PITR ; appliquer seulement `0005`+`0006` |
| R6 | Sur-écriture du natif | Élevé | Import 100 % additif ; rollback n'affecte pas le natif |
| R7 | `--all` sur `users` par erreur | Élevé | Garde-fou `resolveScope` (refus sans cible) |
| R8 | Volume élevé → lenteur boucle | Moyen | Mode lot résumable (§5) testé sur staging avant prod |

---

## Annexe A — Instance courante (exemple, N = 12)

*À titre d'illustration seulement ; le plan ci-dessus reste la référence générique.*

- Source : 12 comptes (`1,2,3,7,10,16,17,19,20,21,23,24` — 1 admin, 10 students, 1 support).
- Application du barème (garde-bas actif) : LOT 1 = 5 (`2,3,7,10,16`), LOT 2 = 7 restants
  (`17,19,20,21,23,24,1`), LOT FINAL = 42 prospects + 35 tests + 5 réglages + 14 journaux + Storage.
- Durée totale estimée (mode boucle) : < 5 min compute. Temps d'arrêt ≈ 0.

## Séquence d'autorisation (rappel)
1. Ce plan/playbook validé. → 2. Backup+PITR+`0005`/`0006` (feu vert). → 3. LOT 1 → validation →
**STOP/autorisation**. → 4. LOT 2 → … → LOT 4 → LOT FINAL → décision de bascule.

> **Aucune écriture prod sans autorisation explicite, lot par lot. Aucun push.**
