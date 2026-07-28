# ARCADINS — Cartographie des données legacy → Supabase (Phase 3)

**Source :** SQLite `arcadins.db` (ancien backend Express). **Cible :** Supabase (PostgreSQL) de la nouvelle
plateforme. **Aucun import réel sans le fichier de production et votre validation.**

> Principe : préserver **toutes** les données et l'**exactitude historique**. On conserve systématiquement le
> **`legacy_id`** et les **dates d'origine**. Les entités qui n'ont pas d'équivalent dans le schéma actuel sont
> reçues dans des tables dédiées **`legacy_*`** (voir migration `0005_legacy_import.sql`, **non appliquée**),
> pour ne rien dénaturer de l'application existante.

## Stratégie de destination (résumé)
| Entité legacy | Destination Supabase |
|---|---|
| `users` (comptes) | **`auth.users`** (compte + `email` + hash bcrypt) + **`profiles`** (rôle, nom) + **`legacy_learners`** (données pédagogiques riches) |
| `users` (rôle `prospect`) | **`legacy_prospects`** (pas de compte auth) |
| `users.is_tuteur_candidat=1` | **`tutor_applications`** (table existante) + `legacy_learners.tuteur_*` |
| `tests` | **`legacy_tests`** |
| `modules`, `tuteur_modules` | **`legacy_modules`** (discriminant `track`) |
| `certificates` | **`legacy_certificates`** (+ PDF) |
| paiements (colonnes `users.*`) | **`legacy_payments`** (`source='legacy_import'`, aucun prélèvement) |
| `affiliate_commissions` + `referral_code`/`referred_by` | **`referral_relationships`** + **`referral_commissions`** (existantes) |
| `prospects` | **`legacy_prospects`** |
| `admin_settings` | **`legacy_admin_settings`** |
| `admin_audit_log` | **`legacy_audit_log`** |
| **correspondance d'ID** | **`legacy_id_map`** (`entity`, `legacy_id` → `new_id`) — protégée, réservée migration |

---

## 1. `users` → `auth.users` + `profiles` + `legacy_learners`  🔴 CRITIQUE
| Col. source | Type | Exemple (anonymisé) | Destination | Transformation | Validation | Si vide | Si doublon | Criticité |
|---|---|---|---|---|---|---|---|---|
| `id` | int | 12 | `legacy_id_map.legacy_id` + `legacy_learners.legacy_id` | conserver tel quel | entier > 0 | rejet | clé unique | 🔴 |
| `email` | text | j***@ex.com | `auth.users.email` / `profiles.email` | **lower + trim** (normalisation) | format e-mail | rejet | **dédup par email normalisé** (garder le + ancien `created_at`, fusionner progression la + avancée) | 🔴 |
| `password_hash` | text | `$2a$10$…` | `auth.users.encrypted_password` | **import direct bcrypt** (Scénario B) ; sinon fallback reset | commence par `$2a$/$2b$` | compte sans mdp → **fallback lien reset** | — | 🔴 |
| `nom`,`prenom` | text | D***, J*** | `profiles.last_name/first_name` + `legacy_learners` | trim | non nul | `''` | — | 🟠 |
| `telephone`(+`_normalized`) | text | +1… | `legacy_learners.phone/phone_normalized` | garder + normaliser | — | null | info | 🟢 |
| `pays` | text | Canada | `legacy_learners.country` | trim | — | null | — | 🟢 |
| `role` | text | apprenant | `profiles.role` | **map** : `prospect→student` (sans compte), `apprenant→student`, `tuteur→tutor`, `moderator→support`, `admin→admin` | ∈ ensemble | `student` | — | 🔴 |
| `status` | text | active | `legacy_learners.legacy_status` | conserver (`trial/active/…`) | — | `trial` | — | 🟠 |
| `plan`,`payment_plan` | text | essential | `legacy_learners.plan` | conserver | — | null | — | 🟠 |
| `created_at` | text | 2026-06-09 | `profiles.created_at` + `legacy_learners.created_at` | **conserver date historique** (parse `datetime('now')`) | date valide | now() | — | 🔴 |
| `trial_done/score`,`qualification_done/score/level`,`final_test_done/score/passed`,`final_test_started_at`,`qualification_started_at` | int/real/text | 1 / 82 / B2 | `legacy_learners.*` (mêmes noms) | conserver | bornes 0–100 | 0 / null | — | 🟠 |
| `modules_progress` | JSON text | `{"1":"done"}` | `legacy_learners.modules_progress` (jsonb) | `JSON.parse` sûr (fallback `{}`) | JSON valide | `{}` | — | 🟠 |
| `current_module`,`all_modules_done` | int | 5 / 0 | `legacy_learners.*` | conserver | — | 1 / 0 | — | 🟢 |
| `certificate_id`,`certificate_generated_at` | text | ARC-2026-… | `legacy_learners.*` (+ lien `legacy_certificates`) | conserver | — | null | — | 🟠 |
| `payment_confirmed/plan/date/method/notes`,`stripe_session_id`,`access_expires_at` | mixte | 1 / paypal | **`legacy_payments`** (1 ligne si `payment_confirmed=1`) + `legacy_learners.access_expires_at` | `source='legacy_import'` ; **jamais** de prélèvement | — | pas de ligne paiement | 1 paiement / user | 🔴 |
| `referral_code` | text(UNIQUE) | 7K9QX2AB | `legacy_learners.referral_code` | conserver | unique | générer si null | unique | 🟠 |
| `referred_by` | int | 3 | `referral_relationships` (referrer=map(referred_by), referee=self, generation=1) | résoudre via `legacy_id_map` | FK valide | pas de relation | — | 🟠 |
| `is_tuteur_candidat`,`tuteur_application`,`tuteur_*` | int/JSON | 1 / {…} | **`tutor_applications`** + `legacy_learners.tuteur_*` | si `=1` : créer candidature (statut mappé) | JSON valide | ignorer | 1 / user | 🟠 |
| `reset_token(+expires)` | text | — | **NE PAS migrer** (jetons éphémères) | — | — | — | — | 🟢 |
| `signup_ip`,`last_login_ip/device`,`last_login_at` | text | — | `legacy_learners.*` (métadonnées) | conserver (utile) | — | null | — | 🟢 |
| `moderator_permissions` | JSON | — | `legacy_learners.moderator_permissions` | conserver | JSON | null | — | 🟢 |

## 2. `tests` → `legacy_tests`  🟠
`id→legacy_id` · `user_id→user_id`(via map) · `test_type` conserver · `score/passed/attempt_number` conserver ·
`answers` JSON→jsonb (fallback `[]`) · `created_at` **conserver**. Rejet si `user_id` introuvable dans le map.

## 3. `modules` + `tuteur_modules` → `legacy_modules`  🟠
Ajout d'un discriminant `track ∈ {learner, tuteur}`. `user_id`(map) · `module_number` · `status` ·
`started_at/completed_at` **conservés** · `score`,`test_score/passed/attempts/last_attempt_at`.
Unicité `(user_id, track, module_number)` → **idempotent** (upsert).

## 4. `certificates` → `legacy_certificates`  🟠
`certificate_number`(UNIQUE, **conserver**) · `user_id`(map) · `nom/prenom/programme/score/issued_at` ·
`pdf_path` → référence au fichier PDF (voir §8). **Ne pas transformer en « certification officielle »** :
conserver l'appellation **« Attestation de complétion ARCADINS »** si aucune reconnaissance prouvée.

## 5. `affiliate_commissions` → `referral_relationships` + `referral_commissions`  🟠
Relation : `referrer_id`→`referrer_id`, `referred_user_id`→`referee_id`, `generation=1` (parrainage 1 niveau).
Commission : `amount`(REAL) → `commission_amount_cents = round(amount*100)` · `plan` conservé ·
`status` : `pending→pending`, `paid→paid` · `currency='CAD'` · `created_at/paid_at` **conservés** ·
`source='legacy_import'`. **Anti-auto-parrainage** déjà garanti par le CHECK `referrer<>referee`.

## 6. `prospects` (+ `users` rôle prospect) → `legacy_prospects`  🟢
`nom/prenom/email/telephone/pays/source/created_at` conservés · `legacy_id` conservé · dédup par email.

## 7. `admin_settings` → `legacy_admin_settings` ; `admin_audit_log` → `legacy_audit_log`  🟢
Copie fidèle (référence/traçabilité). Les paramètres (passing_score_final=70, total_modules=14…) servent au
recalcul de progression (Phase 6).

## 8. Fichiers PDF associés (certificats)  🟠
Source : `server/certificates/<certificate_number>.pdf`. Cible : **Supabase Storage** (bucket privé
`legacy-certificates`) ; `legacy_certificates.storage_path` pointe vers l'objet. Générer une **URL signée**
à la demande. Empêcher la duplication (clé = `certificate_number`).

---

## Règles transverses (obligatoires)
- **Dédup comptes** : uniquement par **email normalisé** (jamais par nom seul) + `legacy_id`.
- **Idempotence** : chaque import est un **upsert** sur une clé stable (`legacy_id` / `email` / `certificate_number`).
- **Dates historiques** : jamais remplacées par `now()`.
- **Aucun mot de passe en clair** ; les hachages ne figurent **jamais** dans les logs.
- **Prospects** : pas de compte `auth.users` (ce sont des leads, pas des connexions).
- **Comportement valeurs invalides** : rejet journalisé (fichier d'erreurs), jamais d'insertion partielle silencieuse.

## Stratégie mots de passe (Phase 4)
- **Format vérifié** : tous les hachages sont **bcrypt `$2a$10$`** → **Scénario B** (import direct) **techniquement
  compatible** avec Supabase Auth (GoTrue vérifie bcrypt).
- **Méthode** : insérer dans `auth.users` avec `encrypted_password = <hash bcrypt>` (via SQL/service role),
  `email_confirmed_at` renseigné. **À VALIDER par un test de connexion sur staging** (compte pilote) avant de
  garantir la conservation.
- **Fallback obligatoire (Scénario C)** : si un hash est absent/incompatible, le compte est créé **sans mot de
  passe** et l'apprenant reçoit un **lien sécurisé de définition/réinitialisation** — sa **progression est
  conservée** dans tous les cas.

*Le schéma cible correspondant est défini dans `supabase/migrations/0005_legacy_import.sql` (NON appliquée).*
