# ARCADINS — RC1 FINAL READINESS REPORT

**Type :** audit qualité pré-staging, **lecture seule** (aucun code modifié, aucune écriture Supabase, aucun import).
**Date :** 2026-07-28 · **Branche :** `audit-refonte` · **Commits audités :** `225064a` + `6af9bd2`.
**Auditeur :** revue systématique migrations / RBAC / CLI / rapports / ENV / dépendances / risques.

---

## ✔ État global

| Domaine | Étendue | Verdict |
|---|---|---|
| Scripts de migration & CLI | Complets, gardés, testés | 🟢 100 % |
| Espace admin (RBAC + middleware) | Défense en profondeur | 🟢 100 % |
| Documentation RC1 (7 rapports) | Tous présents | 🟢 100 % |
| Tests / lint / build | 64/64 · lint 0 · build OK | 🟢 100 % |
| Variables d'environnement | 1 oubli mineur (CRON_SECRET) | 🟡 90 % |
| Dépendances npm | Patchs mineurs + audit dev-only | 🟡 90 % |
| **Migrations SQL (prêtes à appliquer)** | **2 défauts bloquants** | 🔴 **60 %** |

### Niveau de préparation : **88 %**
La quasi-totalité de la chaîne est prête et prouvée. **Deux défauts SQL** dans `0005`/`0006`
(jamais détectés car aucune migration n'a encore été exécutée) **empêcheraient l'application sur
staging et le premier import**. Correctifs estimés < 15 min, mais ils conditionnent le GO.

---

## 1. Migrations SQL (0000 → 0006)

**Ordre / dépendances.** Chaîne linéaire cohérente : `0000` (profiles + trigger `handle_new_user`
+ contact_requests) → `0001` (tutoring/tutor) → `0002` (rôles) → `0003` (referrals) → `0004`
(notifications) → `0005` (tables `legacy_*`) → `0006` (RPC). Toutes additives, sections DOWN
présentes. `gen_random_uuid()` natif (PG13+) : OK partout.

### 🔴 BLOCKER #1 — `0005` : référence FK en avant (forward reference)
`legacy_tests` (ligne 65) déclare `prospect_id … references public.legacy_prospects(id)`, **mais
`legacy_prospects` n'est créée qu'à la ligne 152** (plus bas dans le même fichier). PostgreSQL
exige que la table référencée existe **au moment** du `create table`. → **`0005` échoue à
l'application** avec `relation "public.legacy_prospects" does not exist`.
**Correctif :** déplacer le bloc `create table … legacy_prospects` **avant** `create table …
legacy_tests` (ou retirer la FK et la rajouter en `alter table` après). Aucune donnée impactée.

### 🔴 BLOCKER #2 — `0006` : `migrate_import_account`, INSERT learner mal formé
Lignes 97-99 :
```sql
insert into public.legacy_learners
  select v_uid as user_id, x.*
  from jsonb_populate_record(null::public.legacy_learners, payload->'learner') x
```
`x` est un enregistrement **complet** `legacy_learners` — sa **première colonne est déjà
`user_id`**. `select v_uid, x.*` produit donc **N+1 valeurs** pour une table à N colonnes →
`INSERT has more expressions than target columns`. Comme la RPC est atomique par compte,
**chaque compte porteur de données `learner` (donc tous) échouerait**, annulant son import.
**Correctif :** énumérer les colonnes cibles explicitement, p. ex.
`insert into legacy_learners (user_id, legacy_id, plan, …) select v_uid, x.legacy_id, x.plan, …`
(ou `select (jsonb_populate_record(null::legacy_learners, (payload->'learner') || jsonb_build_object('user_id', v_uid::text))).*`).

### 🟡 MEDIUM #3 — `0006` : `crypt()` / `gen_salt('bf')` hors search_path
La fonction fixe `set search_path = public, auth`. Sur Supabase, `pgcrypto` (qui fournit
`crypt`/`gen_salt`) vit dans le schéma **`extensions`**, **non inclus** dans ce search_path. La
branche de repli (compte sans hash bcrypt) appellerait `crypt(...)` **introuvable** → erreur.
Aucun `create extension if not exists pgcrypto` dans les migrations.
**Correctif :** ajouter `extensions` au search_path de la fonction (`set search_path = public,
auth, extensions`) **ou** qualifier `extensions.crypt(...)` / `extensions.gen_salt('bf')`, et
garantir l'extension activée. Impact réel : uniquement les comptes **sans** bcrypt (repli) — les
28 comptes source ont tous un hash bcrypt, donc branche rarement atteinte, mais à corriger.

### 🟡 LOW #4 — `migrate_validation_report` : métrique « affiliation » lit la mauvaise source
`'affiliation' … from legacy_id_map where entity='commission'` — or l'import écrit le parrainage
dans **`legacy_referrals`**, jamais dans `legacy_id_map(entity='commission')`. Le Validateur
afficherait donc **toujours 0** en affiliation, même après import.
**Correctif :** compter `public.legacy_referrals`.

**Index & triggers vérifiés :** `legacy_tests` (user/prospect/email), `legacy_prospects(email)`,
`legacy_referrals(referrer)` présents ; trigger `on_auth_user_created_link_tests` (rattachement
prospect→compte via email) cohérent ; RLS admin-read sur les 10 tables `legacy_*`. RPC révoquées
au public (`anon`/`authenticated`). Rien à redire hormis #1–#4.

## 2. Routes Admin — RBAC & protection

**Défense en profondeur, validée :**
- **Middleware** (`src/middleware.ts`, matcher `/admin/:path*`, `/dashboard/:path*`, `/auth/:path*`) :
  redirige vers `/auth/login?redirect=…` si non connecté.
- **Layout admin** (`layout.tsx`) : `redirect('/auth/login')` si pas d'utilisateur, `redirect('/dashboard')`
  si `!canAccessAdmin(role)`.
- **Pages sensibles** re-vérifient la permission : `/admin/migration` et `/admin/health` renvoient
  `<NotAllowed/>` sans `migration.view` (admin uniquement dans `ROLE_PERMISSIONS`).
- **API** `/api/admin/migration/validate` : `401` si non connecté, `403` sans `migration.view`,
  `force-dynamic`, lecture seule (RPC de validation).
- ⚠️ Note : le middleware « échoue ouvert » si les variables Supabase sont absentes (retourne
  `next()`). Non bloquant car le layout re-garde côté serveur, mais à connaître.

## 3. Commandes CLI — paramètres, erreurs, codes de sortie

| Commande | Rôle | Défaut | Écriture réelle | Codes de sortie |
|---|---|---|---|---|
| `run-dryrun.mjs` | export→transform→reconcile | lecture seule | jamais | 0 |
| `import-users.mjs` (+payments/progress/results/certificates/referrals) | import par entité | **dry-run** | `--live --confirm` **+** (`--user-id` \| `--all`) **+** creds | `3` creds absentes · `5` refus sécurité/`--user-id` invalide · `6` `--user-id` inexistant |
| `rollback.mjs` | annulation | **dry-run** | `--live --confirm` (+`--user-id` pilote, +`--purge-auth`) | `2` id invalide · `3` creds · `4` échec RPC |
| `validate-migration.mjs` | contrôle | **lecture seule** | jamais (option `--check-target` = lecture) | `2` id invalide |

**Vérifié en exécution réelle :** `--live --confirm` sans cible → « refus de sécurité », **exit 5** ;
`--user-id abc` → exit 5 ; `--user-id 999999` → exit 6 ; dry-run pilote `--user-id 1` → 1 compte.
Double/triple verrou confirmé : rien n'écrit sans `--live` + `--confirm` + creds + cible explicite.

## 4. Rapports générés — présence

`RELEASE_RC1.md` ✅ · `FINAL_MIGRATION_REPORT.md` ✅ · `ROLLBACK_PLAN.md` ✅ · `BACKUP_REPORT.md` ✅ ·
`PRODUCTION_CHECKLIST.md` ✅ · `POST_DEPLOYMENT_CHECKLIST.md` ✅ · `DATABASE_VALIDATION_REPORT.md` ✅
(régénéré, portée complète : 12 comptes / 35 tests / 7 certifs). Réconciliation dry-run
(`ARCADINS_MIGRATION_RECONCILIATION_REPORT.md`, gitignoré) : **0 rejet**. Cohérence chiffres OK.

## 5. Variables d'environnement

**Utilisées (11) :** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SITE_URL`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`,
`RESEND_API_KEY`, `EMAIL_PROVIDER`, `EMAIL_FROM`, `EMAIL_REPLY_TO`, `CRON_SECRET`.
**Storage :** pas de variable dédiée (bucket via client Supabase authentifié par les clés ci-dessus).
- `.gitignore` : `.env*` ignoré sauf `.env.example` → **aucun secret committé** ✅.
- **`.env.example` couvre 10/11.** 🟡 **Oubli : `CRON_SECRET`** (utilisé par
  `/api/cron/expire-pending`). De plus, si `CRON_SECRET` est vide, le contrôle
  `authHeader !== 'Bearer undefined'` est contournable → **documenter + exiger une valeur forte**.

## 6. Dépendances npm

**Runtime (prod) :** `next 16.2.11`, `react/react-dom 19.2.4`, `@supabase/supabase-js 2.108.2`,
`@supabase/ssr 0.12.0`, `stripe 22.3.0`, `@stripe/stripe-js 9.8.0`, `zod 4.4.3` — sains, aucun
paquet inutilisé détecté, aucun paquet obsolète majeur.
- **Patchs mineurs disponibles** (non bloquants) : next `16.2.12`, supabase-js `2.110.9`,
  ssr `0.12.3`, stripe `22.3.2`, react `19.2.8`, tailwind `4.3.3`.
- **`npm audit` : 9 vulnérabilités « high »**, **toutes dans la chaîne ESLint**
  (`brace-expansion`/`minimatch`, `eslint-config-next`) = **devDependencies uniquement**, **absentes
  du bundle de production**. Risque réel faible ; à traiter par bump ESLint hors chemin critique.

## 7. Risques restants (exhaustif)

| # | Risque | Gravité | Probabilité | Mitigation |
|---|---|---|---|---|
| R1 | `0005` FK forward-ref → l'application de la migration échoue | **Critique** | **Certaine** | Réordonner `legacy_prospects` avant `legacy_tests` (Blocker #1) |
| R2 | `migrate_import_account` INSERT learner N+1 colonnes → import comptes échoue | **Critique** | **Certaine** | Colonnes explicites / override `user_id` (Blocker #2) |
| R3 | `crypt/gen_salt` hors search_path (repli sans bcrypt) | Moyen | Faible (tous ont bcrypt) | `search_path … extensions` + `create extension pgcrypto` |
| R4 | Validateur « affiliation » toujours 0 | Faible | Certaine si affichée | Compter `legacy_referrals` |
| R5 | Connexion bcrypt (Scénario B) non prouvée en réel | Élevé | Moyenne | Test de login réel sur staging avant prod (déjà planifié) |
| R6 | `CRON_SECRET` non documenté / contournable si vide | Moyen | Faible | Ajouter à `.env.example` + valeur forte obligatoire |
| R7 | PDF certificats non copiés vers Storage | Moyen | Certaine | Étape dédiée Storage `legacy-certificates` (BLOC B) |
| R8 | PITR prod non confirmé | Élevé | — | Activer PITR + noter horodatage (BACKUP_REPORT) |
| R9 | 9 vulns « high » ESLint (dev) | Faible | — | Bump ESLint ; hors runtime prod |
| R10 | Patchs mineurs runtime en retard | Faible | — | `npm update` avant bascule |
| R11 | Middleware « échoue ouvert » sans env | Faible | Faible | Couvert par garde serveur du layout ; surveiller |

## 8. Checklist complète

- [x] 7 migrations présentes, additives, DOWN fournies
- [ ] **`0005` réordonnée (Blocker #1)**
- [ ] **`migrate_import_account` corrigée (Blocker #2)**
- [ ] `search_path`/pgcrypto (R3) + `migrate_validation_report` affiliation (R4)
- [x] RBAC + middleware + gardes serveur (défense en profondeur)
- [x] CLI : dry-run par défaut, verrous `--live/--confirm/--user-id/--all`, codes de sortie testés
- [x] 7 rapports RC1 présents et cohérents
- [x] `.gitignore` protège les secrets
- [ ] `CRON_SECRET` ajouté à `.env.example` (R6)
- [x] 64/64 tests · lint 0 · build OK
- [ ] Patchs npm mineurs appliqués (optionnel avant staging)
- [ ] PITR prod confirmé (R8) — dossier BACKUP_REPORT

## Recommandations

1. **Corriger R1 + R2 avant toute application** (indispensables ; sans eux, staging échoue).
2. Corriger R3 + R4 dans la foulée (même passage SQL).
3. Ajouter `CRON_SECRET` à `.env.example` et exiger une valeur forte.
4. `npm update` (patchs mineurs) et planifier un bump ESLint pour vider `npm audit`.
5. Ne lancer l'import pilote qu'après **test de connexion bcrypt réel** sur staging (R5).

---

## VERDICT PROFESSIONNEL

# 🔴 NO GO STAGING

**Raisons détaillées :**
1. **Blocker #1 (R1)** — `0005_legacy_import.sql` contient une référence FK en avant
   (`legacy_tests` → `legacy_prospects` définie plus bas). **Son application sur staging
   échouerait immédiatement.** Le socle de la migration ne peut pas être créé en l'état.
2. **Blocker #2 (R2)** — `migrate_import_account` produit un `INSERT` à N+1 colonnes pour
   `legacy_learners`. **Le premier import de compte échouerait**, y compris l'import pilote d'un
   seul utilisateur qui est précisément l'objectif du BLOC B.

Ces deux défauts sont **certains** (100 % reproductibles à l'exécution) et n'ont pu être détectés
plus tôt que par cet audit, puisque **aucune migration n'a jamais été appliquée** (politique RC1
« zéro écriture » respectée). Ils sont **corrigibles en < 15 minutes** et n'entraînent **aucune
perte de données** (schéma non déployé).

**Le reste du projet est de qualité production** (scripts, garde-fous, RBAC, tests, docs). Dès que
R1 et R2 (idéalement R3–R4, R6) sont corrigés et re-vérifiés, le statut passe à **GO STAGING**.

**Préparation : 88 %. NO GO conditionnel — 2 correctifs SQL requis, puis GO.**
