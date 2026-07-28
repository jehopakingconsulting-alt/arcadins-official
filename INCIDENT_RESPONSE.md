# ARCADINS — Incident Response

> Document de référence : **[`docs/ops/INCIDENT_RESPONSE.md`](docs/ops/INCIDENT_RESPONSE.md)**
> (sévérités SEV-1/2/3, procédure générale, playbooks ciblés, escalade).

Résumé : détecter → contenir → évaluer → corriger/rollback (`ROLLBACK.md`) → vérifier
(`/api/health`, `/api/ready`, `validate-migration.mjs`) → communiquer → post-mortem sans blâme.
Alerting : `observability/alerts.yml` + `uptime.yml`.
