# ARCADINS — Audit de l'ancien système (Phase 1)

**Objet :** cartographier l'ancienne plateforme `arcadins-training.com` avant toute migration vers la
nouvelle (Next.js + Supabase). **Aucun import, aucune écriture, aucune modification de la production.**
**Date :** 2026-07-28 · **Portée de l'audit :** surface **publique** observable (frontend + API publique)
uniquement — je n'ai **aucun accès** au code backend, à la base Render, ni aux données authentifiées.

> Légende : ✅ **Observé** (constaté directement) · ❓ **À confirmer** (nécessite votre dev / un export /
> l'accès Render). Les points ❓ sont regroupés en fin de document (« Accès & exports nécessaires »).

---

## 0. Résumé exécutif
- **Architecture** ✅ : frontend **HTML/JS statique** + backend **Node.js / Express** (`ARCADINS API v1.0.0`)
  déployé sur **Render**, servant l'API sous un chemin relatif **`/api`** sur le même domaine.
- **Aucun** service tiers de données détecté côté frontend ✅ : **pas de Firebase, pas de Supabase, pas de
  Google Sheets/Airtable, pas de gapi**. La base vit **côté serveur** (custom Express + une base ❓).
- **Authentification** ✅ : **JWT (Bearer token)** maison, jeton en `localStorage.arc_token`, login via
  `/api/access/login`.
- **Volumétrie** ✅ (tableau de bord admin) : **27 comptes**, 10 apprenants actifs, 10 paiements confirmés,
  23 tests d'essai, 10 qualifications, 8 modules terminés, 7 certificats, 0 compte bloqué.
  → **Jeu de données petit et très gérable** pour une migration.
- **Faisabilité** : élevée. Un endpoint d'**export CSV natif** existe déjà (`/api/admin/export/csv`).

---

## 1–17. Réponses aux points d'audit demandés

| # | Point | Constat |
|---|---|---|
| 1 | Fournisseur de base de données | ❓ **À confirmer.** Backend Express sur Render ; la base est côté serveur (typiquement **MongoDB Atlas** ou **PostgreSQL/MySQL**). Non déterminable depuis le public. |
| 2 | Système d'authentification | ✅ **JWT Bearer** maison. `/api/access/login`, `/api/access/register`, `/api/admin/me`. Jeton en `localStorage.arc_token`, objet utilisateur en `localStorage.arc_user`. |
| 3 | Tables / collections | ❓ Schéma non accessible, mais **modèle déduit** des endpoints admin (voir §Modèle) : utilisateurs, paiements, prospects, modules/progression, certificats, affiliés/commissions, modérateurs, journal d'audit, paramètres. |
| 4 | Clés primaires | ❓ À confirmer (probable `_id` Mongo **ou** `id` SQL). On conservera un **`legacy_id`** pour chaque enregistrement. |
| 5 | Clés étrangères | ❓ À confirmer (probable `user_id` sur paiements, certificats, progression, affiliés). |
| 6 | Identifiants utilisateurs | ✅ **courriel** + identifiant interne. `arc_user` contient l'objet utilisateur côté client. |
| 7 | Stockage des mots de passe | ✅ hachés **côté serveur** (jamais exposés). ❓ algorithme à confirmer (**bcrypt** probable). → **presque certainement scénario C** (réinitialisation, voir Phase 4). **Jamais de mot de passe en clair.** |
| 8 | localStorage / sessionStorage | ✅ `arc_token`, `arc_user`, `arc_ref` (**code de parrainage capté**), `arc_lang`, `arc_cookies` ; `arc_visited`, `arc_notif_closed`. ⚠️ Ce ne sont **pas** la base — seulement session/préférences client. |
| 9 | Fichiers JSON/JS servant de base | ✅ **Non.** `i18n.js` (~203 Ko) = **traductions**, pas des données utilisateurs. Aucune base JSON côté client. |
| 10 | Google Sheets / Airtable / Firebase / Supabase | ✅ **Aucun détecté** côté frontend. Backend custom. |
| 11 | Stockage des certificats | ❓ Endpoint `/api/admin/certificates/:id/download`. Fichiers servis par le backend. ⚠️ Le **filesystem Render est éphémère** — à vérifier **où les PDF persistent réellement** (S3 ? généré à la volée ? base ?). |
| 12 | Stockage des documents | ❓ Idem certificats — à confirmer. |
| 13 | Fonctionnement de la progression | ❓ `/api/admin/module-stats` + champs utilisateur (modules commencés/terminés, %). Calcul **serveur** — formule à confirmer. |
| 14 | Calcul des résultats | ❓ Tests d'essai + **score test final** + qualifications. Logique serveur à confirmer. |
| 15 | Fonctionnement des paiements | ✅ **PayPal** (confirmation manuelle admin : « Confirmer paiements PayPal ») ; ❓ Stripe possible. Statuts `en attente` / `confirmé`. → à migrer en **historique** (`source=legacy_import`), **aucun** nouveau prélèvement. |
| 16 | Fonctionnement du parrainage | ✅ `arc_ref` (capture du code) + `/api/admin/affiliates` + `markCommission`. Modèle **parrain / filleul / commission**. ❓ structure exacte à confirmer. |
| 17 | Données du tableau de bord admin | ✅ Agrégats via `/api/admin/stats` (comptes, actifs, paiements, tests, qualifications, modules, certificats, bloqués). |

---

## Modèle de données déduit (à confirmer par le schéma réel)
D'après les endpoints et fonctions du back-office :

- **users / comptes** — nom, courriel, téléphone, pays, **rôle**, **statut** (actif/bloqué), **forfait/plan**
  (ex. `essential`), **date d'inscription**, **niveau**, **qualification**, **modules commencés/terminés**,
  **score test final**, **certificat**. *(actions admin : créer, bloquer, supprimer, réinitialiser test final, détail, export CSV)*
- **payments** — fournisseur (PayPal/…), plan, montant, devise ❓, **statut**, date, utilisateur.
- **prospects** — nom, courriel, pays, date.
- **modules / progression** — `module-stats`, éléments commencés/terminés, %.
- **tests / résultats** — tests d'essai, tentatives ❓, **score final**, qualifications.
- **certificates** — titulaire, programme, numéro ❓, date, fichier, statut, URL.
- **affiliates / commissions** — parrain, filleul, montant/commission, statut.
- **moderators** — rôles & permissions (`applySidebarPerms`).
- **audit-log** — journal des actions admin.
- **settings** — paramètres plateforme.

## Inventaire des endpoints API observés
```
Public   : /api/health · /api/access/login · /api/access/register
Admin    : /api/admin/me · /api/admin/stats
           /api/admin/users · /api/admin/users/:id
           /api/admin/export/csv          ← EXPORT NATIF (clé pour la migration)
           /api/admin/payments
           /api/admin/prospects
           /api/admin/module-stats
           /api/admin/certificates · /api/admin/certificates/:id(/download)
           /api/admin/affiliates · /api/admin/affiliates/:id
           /api/admin/broadcast
           /api/admin/settings
           /api/admin/audit-log
           /api/admin/moderators · /api/admin/moderators/:id
           /api/admin/email/test · /api/admin/email/test-send
```

---

## 🔑 Accès & exports nécessaires (pour compléter Phases 3–5)
> **Lecture seule. Aucun secret, aucun mot de passe en clair, jamais.**

1. **Export CSV natif** (le plus simple, vous l'avez déjà) : depuis l'ancien back-office, bouton/endpoint
   **`/api/admin/export/csv`** → exportez les comptes (et, si le bouton le permet, paiements / certificats /
   affiliés). Envoyez-moi les CSV **ou** un **échantillon anonymisé** de quelques lignes de chaque table.
2. **Type de base + schéma** : demandez à votre développeur, **ou** dans le **dashboard Render** → service
   backend → *Environment* / *Connect* : **MongoDB ? PostgreSQL ? MySQL ?** + si possible un **dump complet**
   (`mongodump` ou `pg_dump`).
3. **Algorithme de hachage des mots de passe** (bcrypt / argon2 / scrypt) → pour trancher le scénario d'auth
   (A/B/**C**). *(Ne m'envoyez aucun hash ni mot de passe.)*
4. **Où sont stockés les certificats/documents (PDF)** : filesystem Render, S3, ou générés à la volée ?
5. Idéalement : **accès lecture au code backend** (ou juste les fichiers de **modèles/schéma** : `models/`,
   `schema.*`, `routes/`) — ça permet une cartographie **exacte** (Phase 3) au lieu de déductions.

---

## Prochaine étape (en attente de VOTRE feu vert)
Conformément à vos consignes, **je n'entame aucun import**. Dès réception des exports ci-dessus (au moins le
CSV des comptes + le type de base), je passe à :
- **Phase 2** — `ARCADINS_LEGACY_BACKUP_PLAN.md` (procédure de sauvegarde complète, checksums, restauration) ;
- **Phase 3** — `ARCADINS_LEGACY_DATA_MAPPING.md` (correspondance champ à champ vers Supabase) ;
- puis Phases 4–11 (auth, scripts idempotents dry-run, pilote, réconciliation, runbook de bascule).

**Rien ne touche la production, ni l'ancienne ni la nouvelle, sans votre autorisation explicite.**
