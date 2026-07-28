# ARCADINS — RC1 INDEPENDENT FINAL AUDIT

**Auditeur :** indépendant (rôles combinés : Principal Architect / Staff Eng / DevOps / Security /
DBA Postgres-Supabase / QA Lead / Release Manager). **Non-développeur du projet.**
**Nature :** audit **lecture seule**. Aucune modification, migration, écriture, commit, tag, push.
**Date :** 2026-07-28 · **Réf :** branche `audit-refonte`, tags `RC1_STAGING_SUCCESS` / `RC1_RELEASE_READY`.
**Méthode :** inspection du code, des migrations, des RPC, de la config, des scripts et des rapports ;
constats **démontrés** (fichier + ligne), pas supposés.

---

## 1. Résumé exécutif

Le projet est **mature et déployable pour une migration gérée, additive et réversible** : pilote
staging prouvé (idempotence + rollback + zéro perte), migrations idempotentes et auditées, RPC
d'import **atomiques**, garde-fous d'écriture stricts, documentation exceptionnelle (playbook +
checklists). Le webhook Stripe vérifie sa signature, les routes admin sont gardées (session +
permission + réouverture admin-only), les secrets ne sont pas committés.

**Cependant**, un audit exigeant relève des faiblesses **non bloquantes au périmètre actuel (N=12,
migration gatée)** mais **à corriger avant montée en charge / durcissement public** : exposition de
RPC de validation à `authenticated`/`public`, absence d'en-têtes de sécurité/CSP, limiteur de débit
inefficace en serverless, écrasement possible du rôle sur collision e-mail, politiques de bucket
Storage non codifiées, et surtout un **plafond de pagination (`loadIdMap`)** qui provoquerait une
**perte silencieuse au-delà de ~1000 comptes**. Aucune de ces anomalies n'est un blocage critique
immédiat pour le plan par lots validé, mais elles conditionnent l'approbation.

**Verdict : 🟡 RELEASE APPROVED WITH CONDITIONS** (voir §8).

## 2. Forces (démontrées)

- **Migrations idempotentes + réversibles** : `create ... if not exists`, sections DOWN, FK différée
  correcte, `truncate ... cascade` de rollback ; audit statique = 0 forward-ref / 0 parité incorrecte.
- **Atomicité de l'import de compte** : `migrate_import_account` (auth.users + identities + profiles
  + legacy_learners + legacy_id_map) en une transaction ; idempotent par email.
- **Garde-fous d'écriture** : `resolveScope` refuse tout import réel sans `--user-id` ni `--all` ;
  dry-run par défaut ; verrous `--live/--confirm` + creds. Prouvé en exécution (exit 5/6).
- **Sécurité applicative de base** : webhook Stripe `constructEvent` (signature vérifiée,
  `src/app/api/webhook/route.ts:16`), routes admin gardées (`getAdminSession` + `hasPermission`,
  `401/403`, reopen admin-only), cron durci (`503` si secret absent), `.env*` gitignoré sauf exemple.
- **RLS** sur toutes les tables `legacy_*` (lecture admin via `profiles.role='admin'`), écritures via
  service role uniquement. Politiques `format(%I)` = pas d'injection d'identifiant.
- **Qualité & doc** : lint 0, 64/64 tests, build OK, TypeScript, i18n 7 langues, sitemap/robots,
  et une documentation de release de niveau entreprise (playbook + checklists).

## 3. Faiblesses (démontrées)

- **RPC de validation trop ouvertes** : `migrate_validation_report()` et `migrate_validation_user()`
  ne révoquent que `anon` (`0006:248,253`) → `authenticated` conserve l'EXECUTE ; `migrate_lookup()`
  **sans aucun `revoke`** → EXECUTE par défaut à `PUBLIC`. Étant `SECURITY DEFINER`, elles
  contournent la RLS : un utilisateur connecté (voire anonyme pour `migrate_lookup`) peut appeler
  `/rest/v1/rpc/…` et lire des comptages de migration / résoudre `legacy_id → uuid`.
- **Aucun en-tête de sécurité / CSP** : `next.config.ts` est vide (`headers()` absent) → pas de CSP,
  HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy.
- **Limiteur de débit en mémoire** (`src/lib/rate-limit.ts`) : `Map` locale → inefficace sur Vercel
  serverless (instances éphémères/multiples), contournable → formulaires publics exposés au spam.
- **`loadIdMap` non paginé** (`scripts/migration/import-core.mjs`) : `select` sans `range` → plafonné
  par `db-max-rows` PostgREST (souvent 1000). Au-delà de ~1000 comptes, les mappings manquants font
  résoudre `user_id=null` → lignes **filtrées et silencieusement perdues**.
- **Écrasement de rôle sur collision e-mail** : `migrate_import_account` upsert `profiles.role` depuis
  le payload legacy (`0006:…do update set role = excluded.role`) → un compte natif existant pourrait
  voir son rôle modifié par la valeur legacy.
- **Storage non codifié** : le bucket `legacy-certificates` et ses politiques ne sont créés par
  aucune migration ; les certificats (noms/scores = PII) exigent un bucket privé + policies.
- **Pas de CI/CD** : `.github/workflows` absent → lint/tests/build ne sont exécutés qu'à la main ;
  aucun gate automatique avant déploiement Vercel.
- **Tests** : unitaires + un test d'intégration **in-memory** ; **aucun e2e**, aucune intégration
  base réelle, couverture non mesurée.
- **Observabilité** : journaux `console.*` seulement ; pas de monitoring/alerting structuré ; l'appel
  Resend (`fetch`) est **sans timeout** → risque de blocage.

## 4. Risques

| Domaine | Risque | Horizon |
|---|---|---|
| Sécurité | Fuite de comptages/uuid via RPC ouvertes ; clickjacking/XSS faute de CSP | Immédiat (faible impact) |
| Scalabilité | Perte silencieuse > 1000 comptes (`loadIdMap`) ; rate-limit inopérant | Dès gros volume |
| Métier | Rôle d'un compte natif écrasé par une valeur legacy | À l'import prod (collision) |
| Données | Certificats PII dans un bucket non sécurisé | À l'étape Storage |
| Opérationnel | Backup/PITR manuels ; pas de CI ; monitoring minimal | Continu |
| Concurrence | Deux imports simultanés du même id → upserts concurrents (idempotents mais non verrouillés) | Faible |

## 5. Tableau des anomalies

| # | Sévérité | Prob. | Anomalie | Impact | Correction proposée (non appliquée) |
|---|---|---|---|---|---|
| A1 | **Élevé (échelle)** | Certaine > 1000 comptes | `loadIdMap` non paginé (cap PostgREST) | Perte silencieuse de lignes dépendantes | Paginer par `range()` en boucle jusqu'à épuisement (ou RPC set-based) ; **exiger** avant tout lot > 1000 |
| A2 | Moyen | Moyenne | RPC `migrate_validation_report/_user/lookup` exécutables par `authenticated`/`public` | Lecture de comptages + mapping `legacy_id→uuid` | `revoke all ... from public, anon, authenticated` sur les trois |
| A3 | Moyen | Faible-Moy. | `migrate_import_account` écrase `profiles.role` sur collision e-mail | Élévation/altération de rôle d'un compte natif | Ne pas écraser `role` sur conflit (`do update` sans `role`), ou skip sur collision (décidé au pré-flight) |
| A4 | Moyen | Certaine | Aucun en-tête de sécurité / CSP (`next.config.ts` vide) | Défense en profondeur XSS/clickjacking absente | Ajouter `headers()` : CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy |
| A5 | Moyen | Certaine (serverless) | Rate-limit en mémoire | Anti-spam contournable multi-instances | Magasin partagé (Upstash/Redis) avant exposition publique |
| A6 | Moyen | Certaine à l'étape Storage | Bucket `legacy-certificates` + policies non codifiés | Certificats PII potentiellement exposés/absents | Migration créant le bucket privé + RLS Storage + test d'accès |
| A7 | Faible-Moy. | — | Pas de CI/CD | Régression non bloquée avant deploy | Workflow GitHub Actions : lint + tests + build + audit SQL |
| A8 | Faible | Faible | `fetch` Resend sans timeout/retry | Requête pendante en cas d'incident réseau | `AbortController` + timeout + retry idempotent |
| A9 | Faible | — | Pas d'e2e, couverture non mesurée | Angles morts fonctionnels | Playwright smoke + `c8`/coverage |
| A10 | Info | — | Optimisation images/bundle non configurée | Perf marginale | Analyse bundle + `next/image` (AVIF volontairement évité, cf. Safari) |

> **Aucune anomalie CRITIQUE** (pas de contournement d'authentification, pas de RCE, pas de fuite de
> secret, pas de corruption garantie au périmètre gaté actuel). A1 est **Élevé mais conditionnel**
> (> 1000 comptes) : sans effet sur le pilote et les lots validés à l'échelle actuelle.

## 6. Score détaillé

| Domaine | Note | Justification |
|---|---|---|
| Architecture | **88 / 100** | Séparation Front/API/DB nette, RBAC central, migrations additives ; logique admin dans les pages, pas de couche service explicite. |
| Sécurité | **68 / 100** | Bases saines (webhook, admin gardé, secrets, RLS) mais A2/A3/A4/A5/A6. |
| Backend | **74 / 100** | Validation Zod, routes gardées ; pas de timeout/retry, observabilité faible. |
| Frontend | **80 / 100** | Build OK, i18n, SEO ; a11y/responsive/error-boundaries non prouvés. |
| Base de données | **78 / 100** | Schéma + RPC atomiques solides ; A1 (pagination) et A2 (grants). |
| Performance | **72 / 100** | App légère OK ; pas d'analyse bundle/cache, images non optimisées. |
| Scalabilité | **62 / 100** | A1 + rate-limit + boucle par process ; plan reconnaît le besoin de mode résumable. |
| Maintenabilité | **85 / 100** | TS, tests, structure claire, docs abondantes. |
| Documentation | **95 / 100** | Playbook + checklists + rapports de niveau entreprise. |
| Production Readiness | **70 / 100** | Runbooks excellents mais pas de CI/CD, backup/PITR manuels, monitoring minimal. |
| **SCORE GLOBAL** | **77 / 100** | Déployable sous conditions ; non « release parfaite ». |

## 7. Checklist de Production (indépendante)

**Pré-flight**
- [ ] Cible = production confirmée (URL/ref) ; staging/prod non confondus.
- [ ] Backup + PITR vérifiés (horodatage noté).
- [ ] Secrets présents et non committés ; `CRON_SECRET` fort.
- [ ] **Correctifs conditions A2, A3, A4, A6 appliqués** (voir §8) ; A1 avant tout lot > 1000.
- [ ] `0005` + `0006` seuls à appliquer en prod ; dry-run réconcilié.

**Déploiement**
- [ ] Appliquer `0005`/`0006` (transactionnel) ; vérifier tables/RPC/FK/trigger/pgcrypto.
- [ ] Pré-flight collisions e-mail exécuté ; décisions prises.
- [ ] Import **par lots** (5/15/30/50 % / clôture), un compte à la fois, jamais `--all` sur `users`.

**Rollback**
- [ ] Testé : compte / lot / global / PITR. Disponible et documenté (`ROLLBACK_PLAN.md`).

**Post-deployment**
- [ ] Comptages cumulés = attendus ; intégrité `orphelins/dup/mappings = 0`.
- [ ] PDF certificats copiés dans un bucket **privé** vérifié.

**Smoke tests**
- [ ] ≥ 1 connexion bcrypt réelle réussie par lot (sinon repli Scénario C).
- [ ] Parcours clé : login → dashboard → progression → certificat.

**Monitoring**
- [ ] Logs prod propres (`rejected=0`, `Erreurs=0`) ; alertes actives ; latence nominale.

**Validation**
- [ ] `PRODUCTION_RELEASE_CHECKLIST.md` remplie et **signée** (tech + métier) ; GO explicite par lot.

## 8. Verdict final

# 🟡 RELEASE APPROVED WITH CONDITIONS

**Justification.** Le socle est prêt pour une **migration gérée, additive, réversible et gatée** :
pilote prouvé, atomicité, idempotence, rollback, garde-fous, documentation. **Aucun défaut critique
immédiat.** L'approbation est **conditionnée** à la correction — **avant** l'import production et la
montée en charge — des points suivants :

1. **A1 (obligatoire avant tout lot > ~1000 comptes)** : paginer `loadIdMap` (perte silencieuse
   sinon). Sans objet pour le pilote/les petits lots ; **bloquant** au-delà.
2. **A2** : révoquer l'EXECUTE de `migrate_validation_report/_user` et `migrate_lookup` à
   `public/anon/authenticated`.
3. **A3** : ne pas écraser `profiles.role` sur collision e-mail (ou skip sur collision).
4. **A6** : codifier le bucket privé `legacy-certificates` + policies **avant** l'étape Storage.
5. **A4/A5** : en-têtes de sécurité/CSP + rate-limit partagé **avant** exposition publique durcie.

Recommandé mais non bloquant : **A7** (CI/CD), **A8/A9/A10**.

Tant que ces conditions ne sont pas traitées, la migration **peut** se dérouler au périmètre validé
(petits lots gatés, un compte à la fois), mais le projet **ne doit pas** être considéré « release
parfaite / production-grade à grande échelle ».

## 9. Signature d'audit

- **Audit :** RC1 Independent Final Audit — lecture seule, aucune modification effectuée.
- **Périmètre :** code, migrations, RPC, config, scripts, docs (branche `audit-refonte`).
- **Constats :** démontrés (fichier:ligne), non supposés. **10 anomalies**, 0 critique, 1 élevée
  conditionnelle.
- **Score global :** **77/100** — **🟡 APPROVED WITH CONDITIONS**.
- **Horodatage :** 2026-07-28.
- **Note d'intégrité :** aucune écriture Supabase, aucune migration, aucun import, aucun commit,
  aucun tag, aucun push n'a été réalisé pour produire ce rapport.
