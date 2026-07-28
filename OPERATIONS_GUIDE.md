# ARCADINS — OPERATIONS GUIDE (index d'exploitation)

Guide d'exploitation Enterprise. Chaque domaine renvoie au document/outil de référence.

| Domaine | Référence |
|---|---|
| Déploiement (jour J) | `DEPLOYMENT_RUNBOOK.md` · `docs/ops/DEPLOYMENT.md` |
| Go-live (checklist) | `GO_LIVE_CHECKLIST.md` · `PRODUCTION_RELEASE_CHECKLIST.md` |
| Rollback | `ROLLBACK.md` · `ROLLBACK_PLAN.md` |
| Incident response | `docs/ops/INCIDENT_RESPONSE.md` |
| Disaster recovery | `docs/ops/DISASTER_RECOVERY.md` · `docs/ops/BACKUP.md` |
| Runbook courant | `docs/ops/RUNBOOK.md` |
| SLA / SLO / error budget | `docs/ops/SLA.md` · `docs/ops/SLO_ERROR_BUDGET.md` |
| Monitoring / observabilité | `docs/ops/MONITORING.md` · `observability/*` |
| Migration de données | `PRODUCTION_IMPORT_PLAN.md` (PRODUCTION MASTER PLAYBOOK) |
| Benchmarks | `perf/k6-load.js` · `perf/artillery.yml` · `perf/BENCHMARK_RESULTS.md` |
| Architecture / ADR / API | `docs/ARCHITECTURE.md` · `docs/openapi.yaml` |
| Infrastructure (dossier maître) | `ENTERPRISE_INFRASTRUCTURE.md` |

## Tâches récurrentes
- **Quotidien** : backup (`backup.yml`), revue alertes/uptime.
- **Hebdomadaire** : PR Dependabot (CI verte avant merge).
- **Mensuel** : revue SLO/error budget.
- **Trimestriel** : exercice de restauration PITR (DR), audit sécurité/dépendances.

## Chargement d'environnement (CLI, sans exposer les secrets)
```bash
set -a; source <(grep -E '^(NEXT_PUBLIC_SUPABASE_URL|SUPABASE_SERVICE_ROLE_KEY)=' .env.local); set +a
```

## Contacts / escalade
Voir `docs/ops/INCIDENT_RESPONSE.md` (sévérités, rôles, escalade).
