# ARCADINS — Monitoring & Error Tracking (checklist Production)

| Élément | État (preuve) | Action | Provisionnement payant ? |
|---|---|---|---|
| `/api/health` (liveness) | ✅ codé, testé 200 (local/CI) | actif après déploiement | non |
| `/api/ready` (readiness, sonde DB) | ✅ codé, testé 200 `db:true` | actif après déploiement | non |
| Logs structurés | ✅ `src/lib/logger.ts` (JSON) | brancher log drains Vercel | non |
| Monitoring uptime | ⚠️ `.github/workflows/uptime.yml` présent, **non actif** | activer + `PROD_URL` secret | non (option service externe) |
| Alertes (Slack) | ⚠️ prévu dans uptime.yml | `SLACK_WEBHOOK_URL` | non |
| Sentry (error tracking) | ⚠️ **non installé** (doc `observability/sentry.example.md`) | installer si souhaité | ⚠️ **demande GO** (plan) |
| OpenTelemetry (tracing) | ⚠️ hook `instrumentation.ts` prêt, **inactif** | provisionner collecteur + `OTEL_*` | ⚠️ **demande GO** |
| Seuils d'erreur (SLO) | ✅ définis `docs/ops/SLO_ERROR_BUDGET.md` + `observability/alerts.yml` | brancher Prometheus/Alertmanager | selon offre |
| Rollback sur health-check rouge | ✅ `deploy.yml` (smoke → `vercel rollback`) | actif si `deploy.yml` utilisé + secrets | non |
| Suivi 4xx/5xx | ⚠️ via logs/OTel | dashboards Grafana (`observability/`) | selon offre |
| Alertes paiement (webhook Stripe échoué) | ⚠️ à brancher | règle d'alerte sur logs webhook | non |
| Alertes auth | ⚠️ à brancher | règle sur pics d'échecs login | non |
| Alertes migration (`rejected>0`) | ✅ scripts journalisent `report.json`/`errors.log` | surveiller lors des imports | non |

## Minimum pour go-live (sans service payant)
- [ ] `/api/health` + `/api/ready` accessibles en prod (après déploiement)
- [ ] `uptime.yml` activé + `PROD_URL` (+ `SLACK_WEBHOOK_URL` option)
- [ ] Logs Vercel consultés ; `deploy.yml` rollback-sur-échec opérationnel (secrets)

## Recommandé (peut nécessiter provisionnement — **GO requis**)
- [ ] Sentry (error tracking) · OpenTelemetry + Prometheus + Grafana (tracing/metrics/dashboards)

> **Aucun service payant n'est provisionné par cette intervention.**
