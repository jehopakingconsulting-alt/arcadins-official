# ARCADINS — SLO / SLI / Error Budget

## SLI (indicateurs mesurés)
- **Disponibilité** : part des requêtes non-5xx sur endpoints publics + auth.
- **Latence** : p95 / p99 du temps de réponse HTTP.
- **Readiness** : succès de `/api/ready` (base joignable).

## SLO (objectifs, fenêtre glissante 30 j)
| SLI | SLO |
|---|---|
| Disponibilité | **99,9 %** |
| Latence p95 | **< 800 ms** |
| Latence p99 | **< 1500 ms** |
| Readiness | **99,9 %** |

## Error Budget
- Budget d'erreur (dispo 99,9 %) = **0,1 %** ≈ **43 min/mois** d'indisponibilité tolérée.
- **Politique de consommation** :
  - Budget > 50 % restant → déploiements normaux.
  - Budget 10–50 % → gel des changements risqués, focus fiabilité.
  - Budget < 10 % → **feature freeze**, seuls correctifs de fiabilité ; post-mortem obligatoire.

## Mesure
- Source : métriques OTel → Prometheus (`observability/`), alertes SLO (`alerts.yml`), dashboards
  Grafana (`grafana-dashboard.json`).
- Uptime synthétique : `.github/workflows/uptime.yml` + service externe recommandé.

## Revue
- Revue mensuelle des SLO/error budget. Ajuster selon engagements clients réels (le cas échéant, SLA
  contractuel dérivé de ces SLO — voir `SLA.md`).
