# ARCADINS — Résultats de benchmark (preuves & procédure)

**Principe : aucun chiffre fabriqué.** Ci-dessous, les seules mesures **réellement exécutées** dans
l'environnement d'audit, honnêtement contextualisées, puis la procédure exacte pour les campagnes de
production (non exécutables ici).

## 1. Mesures RÉELLES obtenues ici (serveur DEV local, non représentatif)

Contexte : `next dev` (mono-thread, **recompile à la demande**, pas de build de prod, pas de CDN).
Ces chiffres **surestiment massivement** la latence de production (en prod, `/` est SSG servi par le
CDN, sub-10 ms typique). Outil : `scratchpad/bench.mjs` (Node natif), 2026-07-28.

| Cible | Concurrence | Total | ok | 5xx | p50 | p95 | p99 | Débit |
|---|---|---|---|---|---|---|---|---|
| `/` | 10 | 200 | 200 | 0 | 739 ms | 1130 ms | 1138 ms | 12,6 req/s |
| `/` | 50 | 500 | 500 | 0 | 3875 ms | 4900 ms | 4967 ms | 12,8 req/s |
| `/api/ready` | 20 | 200 | 200 | 0 | 241 ms | 828 ms | 859 ms | 63,1 req/s |

**Lecture honnête :** 0 erreur, mais latence/débit **plafonnés par le dev-server** (compilation à la
volée + mono-process). **Non extrapolable** à la prod. La readiness (241 ms p50) reflète surtout la
latence réseau vers Supabase (base distante).

## 2. Ce qui N'A PAS été mesuré ici (REQUIRES PRODUCTION VALIDATION)

- Paliers **100 / 1 000 / 10 000 / 100 000** utilisateurs : nécessitent k6 Cloud ou Artillery
  distribué (une machine ne génère pas ces volumes).
- **CPU/RAM** sous charge : métriques serveur = collecteur (OTel/Prometheus) en prod.
- **DB** sous charge : `pg_stat_statements`, connexions pooler, plans (`EXPLAIN ANALYZE`).
- **Timeouts/retries** en conditions réelles.

## 3. Procédure d'exécution en production (build optimisé + cible réelle)

### k6
```bash
# build de prod local ou preview Vercel comme cible
BASE_URL=https://<preview> k6 run -e STAGE=100  perf/k6-load.js
BASE_URL=https://<preview> k6 run -e STAGE=1k   perf/k6-load.js
# 10k/100k : k6 Cloud (k6 cloud run) — infra distribuée
```

### Artillery
```bash
BASE_URL=https://<preview> RATE=10   STAGE=100  artillery run perf/artillery.yml
BASE_URL=https://<preview> RATE=100  STAGE=1k   artillery run perf/artillery.yml
# 10k/100k : artillery workers distribués / Artillery Cloud
```

### Métriques à collecter (par palier)
latence moyenne · **p95 · p99** · débit (req/s) · **taux d'erreur** · timeouts · retries ·
**CPU · RAM** (via dashboards Grafana) · DB (connexions, latence requêtes, cache hit ratio).

### Seuils de succès (SLO)
p95 < 800 ms · p99 < 1500 ms · erreurs < 1 % · pas de saturation connexions DB.

## 4. Dashboards
Voir `observability/grafana-dashboard.json` (débit, erreurs 5xx, p50/p95/p99, latence readiness).
Alertes : `observability/alerts.yml`.

> Conclusion : la **tenue à grande échelle est certifiable uniquement après exécution** de ces
> campagnes en environnement de production/preview avec build optimisé + CDN + observabilité active.
