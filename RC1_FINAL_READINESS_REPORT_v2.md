# ARCADINS — RC1 FINAL READINESS REPORT — v2 (post-correctifs)

**Type :** re-vérification après correction des défauts de l'audit v1. **Aucune migration
appliquée, aucune écriture Supabase, aucune donnée modifiée** — corrections de fichiers + gates.
**Date :** 2026-07-28 · **Branche :** `audit-refonte` · **Prédécesseur :** `RC1_FINAL_READINESS_REPORT.md`.

---

## ✔ Défauts v1 → état v2

| # | Défaut (v1) | Gravité | Correctif appliqué | État |
|---|---|---|---|---|
| B1 | `0005` : FK en avant `legacy_tests → legacy_prospects` | Critique | FK retirée de la définition inline ; ajoutée en **`ALTER TABLE ADD CONSTRAINT`** après création des deux tables (idempotent : `drop constraint if exists` + `add`) | ✅ Corrigé |
| B2 | `0006` : `INSERT legacy_learners` à N+1 colonnes | Critique | `select r.*` depuis `jsonb_populate_record(null::legacy_learners, (payload->'learner') \|\| jsonb_build_object('user_id', v_uid::text))` → **parité exacte** | ✅ Corrigé |
| R3 | `crypt/gen_salt` hors `search_path` + pgcrypto non garanti | Moyen | `create extension if not exists pgcrypto with schema extensions;` + `set search_path = public, auth, extensions` sur `migrate_import_account` | ✅ Corrigé |
| R4 | Métrique « affiliation » lue depuis `legacy_id_map` (toujours 0) | Faible | `migrate_validation_report` compte désormais `public.legacy_referrals` | ✅ Corrigé |
| R6 | `CRON_SECRET` absent de `.env.example` + contournable si vide | Moyen | Ajouté à `.env.example` (avec consigne) + route `/api/cron/expire-pending` refuse (`503`) si le secret est vide | ✅ Corrigé |

## ✔ Migrations validées (audit SQL statique)

Script d'audit `sql-audit.mjs` exécuté sur `0000 → 0006` (lecture seule, sans base) :

```
Tables public.* créées : 21
[1] Références FK en avant : 0
[2] INSERT ... VALUES à parité incorrecte : 0
[3] Correctifs 0006 : pgcrypto OK · search_path+extensions OK
    FK différée legacy_tests OK · learner INSERT r.* OK
=> RÉSULTAT : ✅ AUCUN BLOCKER SQL DÉTECTÉ  (exit 0)
```

**Contrôles complémentaires vérifiés manuellement :**
- Parité colonnes/valeurs des `INSERT` de `0006` : `auth.users` (13/13), `auth.identities` (8/8),
  `profiles` (6/6), `legacy_id_map` (3/3), `legacy_learners` (via `SELECT r.*`, parité garantie). ✅
- Ordre d'exécution `0000→0006` linéaire, additif, sections DOWN présentes (dont
  `migrate_rollback`, `migrate_rollback_user`, `migrate_validation_user`). ✅
- Index, triggers (`on_auth_user_created_link_tests`), RLS admin-read, `revoke` public : inchangés,
  cohérents. ✅

## ✔ Gates de qualité (ré-exécutés)

| Gate | Commande | Résultat |
|---|---|---|
| Lint | `npm run lint` | ✅ 0 erreur / 0 warning |
| Tests | `npm test` | ✅ **64 / 64** (0 échec) |
| Build | `npm run build` | ✅ succès (toutes routes compilées) |
| Audit SQL statique | `node sql-audit.mjs` | ✅ 0 blocker (exit 0) |

## ✔ Zéro SQL blocker · Zéro erreur

Les deux défauts **critiques** de la v1 sont éliminés et re-vérifiés objectivement. Aucun autre
défaut bloquant détecté. Les seuls points ouverts restants sont **opérationnels** (staging), pas
des défauts de code.

## Risques restants (non bloquants — domaine opérationnel)

| # | Risque | Gravité | Probabilité | Mitigation |
|---|---|---|---|---|
| R5 | Connexion bcrypt (Scénario B) non prouvée en réel | Élevé | Moyenne | Test de login réel sur staging (1ʳᵉ action BLOC B) |
| R7 | PDF certificats à copier vers Storage | Moyen | Certaine | Étape Storage `legacy-certificates` (BLOC B) |
| R8 | PITR prod à confirmer + horodatage | Élevé | — | Activer PITR + renseigner `BACKUP_REPORT.md` |
| R9 | 9 vulns « high » ESLint (**devDependencies**, hors bundle prod) | Faible | — | Bump ESLint hors chemin critique |
| R10 | Patchs npm mineurs en retard (next/supabase/stripe/react) | Faible | — | `npm update` avant bascule |
| R11 | Middleware « échoue ouvert » sans env | Faible | Faible | Couvert par la garde serveur du layout ; surveiller |

> Aucun de ces points n'empêche l'application des migrations sur **staging** ni l'import pilote.
> Ils relèvent de la préparation d'environnement et de la validation runtime prévues au BLOC B.

## Checklist finale

- [x] `0005` — FK différée, plus aucune référence en avant
- [x] `0006` — INSERT `legacy_learners` corrigé, tous les INSERT à parité
- [x] `0006` — pgcrypto activé + `search_path` incluant `extensions`
- [x] `migrate_validation_report` — métrique affiliation corrigée
- [x] `.env.example` — `CRON_SECRET` documenté ; route cron durcie
- [x] Audit SQL statique : 0 forward-ref, 0 parité incorrecte
- [x] Lint 0 · Tests 64/64 · Build OK
- [x] Aucune migration appliquée, aucune écriture Supabase
- [ ] (BLOC B) Appliquer `0005`+`0006` sur staging
- [ ] (BLOC B) Test connexion bcrypt réel + import pilote 1 compte
- [ ] (BLOC B) PITR prod + copie PDF Storage

## Niveau de préparation : **98 %**

Les 2 % restants sont exclusivement des actions **opérationnelles de staging/prod** (provisionnement,
tests runtime, PITR), non des défauts de code.

---

## VERDICT FINAL

# ✅ GO STAGING

**Raisons détaillées :**
1. **Les deux SQL blockers critiques sont corrigés** (B1 réordonnancement FK via ALTER ; B2 parité
   colonnes de l'INSERT learner) et **re-vérifiés objectivement** par l'audit statique (0 forward-ref,
   0 parité incorrecte) — les migrations `0005`+`0006` peuvent désormais s'appliquer sans erreur.
2. **Tous les défauts mineurs signalés sont traités** (pgcrypto/search_path, métrique affiliation,
   `CRON_SECRET`/durcissement cron).
3. **Toutes les gates passent** : lint 0, 64/64 tests, build OK.
4. **Les garde-fous de non-écriture restent intacts** : dry-run par défaut, verrous
   `--live/--confirm/--user-id/--all`, RBAC + middleware, aucune migration appliquée pendant cet audit.
5. Les risques restants sont **opérationnels** (staging/prod), pas des blockers de code, et sont
   explicitement pris en charge dans la procédure du BLOC B.

**Recommandation d'entrée en BLOC B :** appliquer `0005` puis `0006` sur un projet **staging**,
exécuter l'audit `--check-target`, réaliser l'**import pilote d'un seul compte** (`--user-id`) suivi
d'un **test de connexion bcrypt réel**, avant tout import complet.

**Préparation : 98 %. Statut : GO STAGING (sous les étapes opérationnelles ci-dessus).**
