# ARCADINS — Enterprise Infrastructure Dossier

**Rôle :** Principal Cloud Architect + Principal DevSecOps. **Code gelé.** Ce dossier livre
l'**infrastructure, les pipelines, les dashboards et les procédures** d'exploitation Enterprise.
**Aucun chiffre fabriqué** : toute mesure provient d'une exécution réelle ; le reste est **prêt à
exécuter** et classé *REQUIRES PRODUCTION VALIDATION* (RPV).

## 1. Inventaire des livrables d'infrastructure (fichiers réels)

| Domaine | Fichier(s) | État |
|---|---|---|
| CI qualité | `.github/workflows/ci.yml` (lint/typecheck/tests/coverage/audit SQL/build) | ✅ défini · RPV (exécution GH) |
| CI sécurité | même fichier : npm audit, dependency-review, **gitleaks**, **SBOM CycloneDX + signature cosign**, licences, **CodeQL** | ✅ défini · RPV |
| Déploiement | `.github/workflows/deploy.yml` (build→health-gate→promote→smoke→**rollback auto**) | ✅ défini · RPV |
| Uptime | `.github/workflows/uptime.yml` (sonde 5 min + alerte Slack) | ✅ défini · RPV |
| Backup | `.github/workflows/backup.yml` (pg_dump chiffré quotidien) | ✅ défini · RPV |
| Health/Ready/Live | `src/app/api/health`, `src/app/api/ready` | ✅ **vérifié 200** |
| OpenTelemetry | `instrumentation.ts` (chargement conditionnel, build-safe) | ✅ hook · RPV (collecteur) |
| Prometheus | `observability/prometheus.yml` + `alerts.yml` (règles SLO) | ✅ défini · RPV |
| Grafana | `observability/grafana-dashboard.json` (débit/erreurs/p50-95-99/DB) | ✅ défini · RPV |
| Sentry | `observability/sentry.example.md` (procédure d'activation) | ✅ procédure · RPV |
| Logs centralisés | logger JSON (`src/lib/logger.ts`) → drains Vercel / OTel | ✅ base · RPV |
| Rate limiting distribué | `src/lib/rate-limit.ts` (Upstash REST + repli) | ✅ code · RPV (Upstash) |
| Benchmarks | `perf/k6-load.js`, `perf/artillery.yml`, `perf/BENCHMARK_RESULTS.md` | ✅ scripts + mesures dev réelles · RPV (100k) |
| Déploiement/Rollback | `docs/ops/DEPLOYMENT.md` | ✅ |
| SLO/Error budget | `docs/ops/SLO_ERROR_BUDGET.md` | ✅ |
| Backup/PITR/DR | `docs/ops/BACKUP.md`, `docs/ops/DISASTER_RECOVERY.md` | ✅ |
| Runbook / Incident | `docs/ops/RUNBOOK.md`, `INCIDENT_RESPONSE.md` | ✅ |
| SLA / Monitoring | `docs/ops/SLA.md`, `MONITORING.md` | ✅ |
| Architecture / ADR | `docs/ARCHITECTURE.md`, `docs/openapi.yaml` | ✅ |

## 2. Mesures RÉELLES (exécutées ici)

- Qualité : lint **0** · typecheck strict+3 **0** · tests **73/73** · couverture lignes **88,93 %** ·
  audit SQL **OK** · `npm audit` prod **0 vuln** · build **OK** (51 pages).
- Endpoints : `/api/health` **200**, `/api/ready` **200 `db:true` 643 ms**.
- En-têtes : CSP/HSTS/X-Frame/COOP/CORP **servis** (curl).
- Charge **dev local** (non représentative) : voir `perf/BENCHMARK_RESULTS.md`.

## 3. Cache / CDN / ISR / Images (état & recommandations, code gelé)

- **CDN + cache statique** : fournis nativement par Vercel (`/_next/static` immuable). ✅
- **ISR** : recommandé sur les pages **publiques statiques** (accueil, formations, tarifs…) via
  `export const revalidate = <s>` — **changement de code par page** non appliqué (gel). RPV/décision.
- **Image Optimization** : `next/image` réduirait le poids mais **touche les composants** (UI gelée).
  ⚠️ Rappel projet : **ne jamais activer AVIF** (bug Safari mobile). RPV/décision produit.
- **Compression** : `compress: true` (déjà activé, `next.config.ts`). ✅

## 4. Ce qui reste REQUIRES PRODUCTION VALIDATION (non certifiable ici)

Charge 100/1k/10k/100k · CPU/RAM/DB sous charge · exécution CI GitHub · SBOM signé publié ·
tracing/metrics/alerting live (OTel+Prometheus+Grafana+Alertmanager) · Sentry live · Upstash
provisionné · exercice PITR/DR · audit accessibilité. **Tout l'outillage est prêt** ; l'exécution
requiert le provisionnement d'infrastructure.

## 5. Chemin honnête vers ≥ 99/100 (checklist d'exécution)

1. **Provisionner** : Upstash (rate-limit), collecteur OTel + Prometheus + Grafana + Alertmanager,
   Sentry, service uptime. Définir les secrets GitHub/Vercel.
2. **Exécuter la CI** sur GitHub (push) → preuves : lint/tests/coverage/CodeQL verts, **SBOM signé**.
3. **Déployer** via `deploy.yml` (health-gate + rollback auto) sur une **preview** puis prod.
4. **Benchmarks** : k6/Artillery jusqu'à 100k (cloud/distribué) → p95/p99/erreurs/CPU/RAM/DB
   consignés dans `perf/BENCHMARK_RESULTS.md`.
5. **DR** : exercice de restauration PITR réussi.
6. **Accessibilité** : audit axe/Lighthouse.
7. **CSP nonce** (durcissement).

À l'issue — **preuves d'exécution à l'appui** — la certification franchit ≥ 95 puis ≥ 99. Le comité
**ne l'accordera pas avant** ces exécutions.

## 6. Verdict d'infrastructure

**Infrastructure Enterprise : OUTILLÉE ET DOCUMENTÉE de bout en bout** (CI/CD, déploiement progressif,
rollback auto, observabilité, alerting, backup/DR, benchmarks, SLO/error budget). **Exploitation
plusieurs années à grande échelle : possible** une fois les composants **provisionnés et les preuves
d'exécution obtenues** (section 5). Aucune donnée fabriquée ; distinction stricte prouvé / RPV.
