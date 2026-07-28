# ARCADINS — Rapport de sauvegarde (source legacy)

## 1. Sauvegarde de la base source

| Élément | Valeur |
|---|---|
| Application source | `ARCADINS API v1.0.0` (Node/Express + SQLite, Render) |
| Méthode | `better-sqlite3` `.backup()` — **lecture seule**, WAL-consistant |
| Fichier de travail | `arcadins-PROD.db` |
| Taille | 102 400 octets |
| sha256 | `952c4126c6ef0f6bb0e234ce1afb018a5bb6244000173c73fc86379674183b5b` |
| `PRAGMA integrity_check` | **ok** |
| `PRAGMA foreign_key_check` | **0** violation |
| Transfert | gzip + base64 vérifié par checksum (paste terminal), décodage confirmé identique |

> La base source **n'a jamais été modifiée** : la copie a été produite par `.backup()` vers un
> fichier temporaire, sans écriture sur la base de production.

## 2. Contenu vérifié (comptages source)

| Table | Lignes |
|---|---|
| users | 28 (16 prospect · 10 apprenant · 1 moderator · 1 admin) |
| prospects | 26 |
| tests | 35 |
| modules | 168 |
| tuteur_modules | 0 |
| certificates | 7 |
| affiliate_commissions | 0 |
| admin_settings | 5 |
| admin_audit_log | 14 |
| paiements confirmés | 10 |
| tests finaux réussis | 7 |

## 3. Sauvegarde de la cible (Supabase)

- [ ] **PITR** (point-in-time recovery) activé sur le projet de production — à confirmer avant
      toute application de migration.
- [ ] Horodatage de référence pré-migration noté ici : `__________________________`.
- [ ] Export ponctuel supplémentaire (optionnel) avant l'import complet.

## 4. Emplacement & rétention

- Copie source conservée hors dépôt (contient des données personnelles et des hachages).
- Les exports/transforms locaux (`scripts/migration/_data/`) sont **gitignorés**.
- Rétention recommandée : conserver la copie source jusqu'à validation finale + 30 jours.

> Ce rapport doit être complété (cases PITR + horodatage) **avant** la première écriture en
> production, conformément à `PRODUCTION_CHECKLIST.md`.
