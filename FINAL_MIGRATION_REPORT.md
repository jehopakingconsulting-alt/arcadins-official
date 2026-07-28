# ARCADINS — Rapport final de migration

**Date :** 2026-07-28 · **Statut :** prêt, **aucune écriture effectuée** · **Option :** A.

## 1. Source

- Application : `ARCADINS API v1.0.0` (Node/Express + SQLite `better-sqlite3`, WAL) sur Render.
- Copie de travail : `arcadins-PROD.db` (obtenue par `.backup()` lecture seule, WAL-consistant).
- Empreinte : sha256 `952c4126c6ef0f6bb0e234ce1afb018a5bb6244000173c73fc86379674183b5b`.
- Taille : 102 400 octets · `PRAGMA integrity_check` = **ok** · `foreign_key_check` = **0**.

## 2. Cible

- Next.js 16 / React 19 / Supabase (Postgres) / Resend / Stripe.
- Tables de réception dédiées `legacy_*` (migration additive `0005`), **sans toucher** aux
  tables natives de la nouvelle plateforme.
- Comptes créés de manière **atomique** via la RPC `migrate_import_account` (auth.users +
  identities + profiles + legacy_learners + legacy_id_map dans une seule transaction).

## 3. Mapping (résumé)

| Source | Cible | Règle |
|---|---|---|
| `users` (role prospect) | `legacy_prospects` | lead, sans compte auth |
| `users` (autres rôles) | `auth.users` + `profiles` + `legacy_learners` | dédup email (garde le plus ancien) |
| `password_hash` | `auth.users.encrypted_password` | bcrypt `$2a$10$` importé tel quel (Scénario B) |
| `tests` (compte) | `legacy_tests` (kind=account) | rattaché au compte |
| `tests` (prospect) | `legacy_tests` (kind=prospect) | **Option A** : conservé, rattachable via email |
| `modules` / `tuteur_modules` | `legacy_modules` (track) | progression pédagogique |
| `certificates` | `legacy_certificates` (+ Storage) | numéro unique |
| `users.payment_confirmed` | `legacy_payments` | historique, **aucun prélèvement** |
| `referred_by` / `affiliate_commissions` | `legacy_referrals` | relations + commissions |
| `admin_settings` / `admin_audit_log` | `legacy_admin_settings` / `legacy_audit_log` | tel quel |

## 4. Résultat du dry-run (réconciliation complète)

12 comptes · 42 prospects · 35 tests (**0 rejeté**) · 168 modules · 7 certificats ·
10 paiements · 1 relation de parrainage · 5 réglages · 14 journaux. **0 rejet, 0 erreur.**

## 5. Authentification (Scénario B)

Tous les hachages source sont bcrypt (`$2a$10$…`) — l'import direct dans
`auth.users.encrypted_password` est **techniquement viable**. Il **doit être validé sur
staging** par un test de connexion réel avant la production. Repli (Scénario C) : lien de
réinitialisation sécurisé si un compte ne se connecte pas.

## 6. Points de vigilance

- Application de `0005` + `0006` requise avant tout import.
- PDF des certificats à copier dans le bucket privé `legacy-certificates`.
- Le trigger `link_legacy_tests_on_signup` rattache automatiquement les tests d'un prospect
  qui crée plus tard un compte au même email.

## 7. Traçabilité

Chaque exécution produit `scripts/migration/_data/report.json` + `errors.log` (gitignorés,
sans PII). Réconciliation dans `ARCADINS_MIGRATION_RECONCILIATION_REPORT.md`.
