# ARCADINS — Monitoring & Observabilité

## Signaux à surveiller
| Domaine | Signal | Seuil d'alerte |
|---|---|---|
| Disponibilité | 5xx / uptime endpoints clés | > 1 % 5xx sur 5 min |
| Auth | échecs de connexion anormaux | pic soudain |
| Paiement | webhooks Stripe en échec (signature/DB) | > 0 sur 15 min |
| Base | erreurs Postgres, saturation connexions | approche du plafond |
| Migration | `rejected > 0`, erreurs RPC | tout événement |
| Rate-limit | taux de `429` | pic (abus) ou 0 prolongé (limiteur HS) |
| Cron | `expire-pending` non exécuté / `5xx` | absence à 06:00 UTC |

## Sources
- **Logs Vercel** (fonctions/API) + **logs Supabase** (Postgres/Auth/Storage).
- Artefacts d'import : `scripts/migration/_data/report.json` + `errors.log` (sans PII) + logs de lot
  `logs/prod-import/*`.
- Écrans admin : **Migration Validator** (`/admin/migration`) et **Platform Health** (`/admin/health`,
  score /100).

## Recommandations (suivi)
- Brancher un collecteur/alerting (ex. Sentry pour les erreurs applicatives, alertes Supabase, log
  drains Vercel) — actuellement journaux `console.*` uniquement.
- Alerte sur webhook Stripe échoué et sur toute erreur d'import.

## Health checks
- `/admin/health` : DB, Auth, Storage, Paiements, E-mails, API, Certificats, Journaux, Migration.
- Objectif de score : **≥ 85/100** avant et après chaque lot d'import.
