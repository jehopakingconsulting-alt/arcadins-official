# ARCADINS — ENTERPRISE FINAL AUDIT (comité d'architecture)

**Lentille :** 100 000 utilisateurs · multi-pays · multi-langues · multi-datacenters · multi-années.
**Nature :** lecture seule. **Aucune modification** (aucune preuve d'un correctif *indispensable* ici).
**Date :** 2026-07-28 · **Réf :** `audit-refonte` (post-hardening `355d558`).

> Posture : ne rien supposer, tout démontrer. Ce qui n'est pas prouvé est traité comme **non acquis**.

---

## Résumé exécutif

ARCADINS est une base **soignée, sûre et exceptionnellement documentée** pour son échelle actuelle
(centre de formation, quelques milliers d'utilisateurs, mono-région). Le durcissement RC1 a corrigé
les défauts fonctionnels/sécurité identifiés. **Pour l'échelle cible du comité (100 k, multi-région,
multi-années), le projet présente des écarts ARCHITECTURAUX** — non des bugs — qui empêchent une
certification « web-scale » aujourd'hui : traitements synchrones dans le chemin requête, absence de
cache/ISR, observabilité minimale, mono-région (Supabase = point de défaillance unique), et
**aucune preuve de test de charge**. Aucune anomalie **critique** ; plusieurs **hautes** conditionnent
la mise à l'échelle.

**Verdict d'ensemble : production CONTRÔLÉE approuvée ; « web-scale » NON certifié sans les conditions §Anomalies.**

## 1. Architecture (SOLID/DRY/KISS/YAGNI/Clean/DDD/CQRS/Event/Dependency Rule)
- **Forces** : séparation Front / API / Domaine (`src/lib`) / Données nette ; RBAC central ; migrations
  additives ; libs découplées (notifications, scoring, rate-limit) ; KISS/YAGNI respectés.
- **Écarts** : pas de **DDD/CQRS/event-driven** ni de **couche service** explicite (logique parfois
  dans les pages/routes). Acceptable à petite échelle ; à 100 k, l'absence de **bus d'événements/queue**
  rend les effets de bord (e-mails) synchrones (voir Backend). Dependency Rule globalement respectée
  (le domaine ne dépend pas de l'UI).

## 2. Sécurité (OWASP Top10/ASVS/API, CWE, MITRE, NIST, CIS, Zero-Trust)
- **Forces (post-hardening)** : webhook Stripe signé ; RBAC + gardes serveur ; RPC au **moindre
  privilège** (0007) ; **RLS** sur tables sensibles + Storage privé ; en-têtes **CSP/HSTS/X-Frame/COOP**
  vérifiés servis ; secrets non committés ; validation **Zod** (anti mass-assignment) ; SQL via
  PostgREST/paramétré (pas d'injection) ; rate-limit distribué.
- **Écarts** : CSP `'unsafe-inline'` (nonce à venir) ; pas d'**ASVS/pentest** formel ; pas de **WAF** ;
  pas de **scanning** CI (CodeQL/Dependabot/secret-scan) ; Zero-Trust partiel (pas de mTLS interne, mais
  surface serverless réduite). SSRF : surface faible (pas d'appel URL utilisateur). CSRF : APIs
  token-based + cookies SameSite (Supabase) → risque faible ; à confirmer par tests.

## 3. Base de données
- **Forces** : RLS + policies ; migrations **idempotentes/réversibles** (audit statique 0 défaut) ;
  RPC d'import **atomiques** ; `loadIdMap` désormais **paginé** ; index sur clés de jointure.
- **Écarts** : **mono-région**, pas de **réplicas de lecture** ni de stratégie de **partitionnement**
  (volumes actuels faibles) ; pas de verrou consultatif pour imports concurrents (risque faible, un seul
  opérateur) ; deadlocks improbables (upserts courts). Migration idempotente ✅, rollback ✅.

## 4. API (REST/RPC/OpenAPI/Contract/Versioning/Auth/Replay/CSRF/SSRF/Injection/Mass-Assignment)
- **Forces** : auth/authz gardées ; rate-limit ; Zod ; injections couvertes.
- **Écarts** : **pas de versioning** d'API, **pas d'OpenAPI**, **pas de contract testing** ; pas de
  protection anti-**replay** explicite (hors signature Stripe) ; pas de pagination standardisée exposée.

## 5. Frontend
- **Forces** : i18n **7 langues** (`src/lib/i18n.ts`, testé) ; SEO (sitemap/robots) ; en-têtes de
  sécurité sans régression (rendu vérifié) ; SSG/SSR mixte.
- **Écarts** : **Lighthouse/a11y non mesurés** ; pas d'**analyse de bundle** ; images non optimisées
  (AVIF volontairement évité — Safari) ; error boundaries non prouvées.

## 6. Backend (scalabilité/caching/queues/workers/retry/circuit-breaker/timeout/backpressure)
- **Écart majeur (S1)** : l'**e-mail est envoyé de façon synchrone dans le chemin de la requête**
  (`await dispatchExternalEvent` dans `api/tutorat/request`) et le `fetch` Resend est **sans timeout** →
  **latence + backpressure** sous charge / incident réseau.
- **Écarts** : **aucune queue/worker** ; **pas de circuit-breaker** ; **pas de caching** (voir S5) ;
  retry limité. PostgREST/supabase-js **mutualise les connexions** (bon point : pas d'épuisement de
  connexions Postgres en serverless).

## 7. DevOps (CI/CD/secrets/rollback/canary/blue-green/flags/observability)
- **Forces** : **CI définie** (lint/typecheck/test/audit SQL/build) ; secrets via Vercel ; rollback DB
  documenté ; un feature-flag (`REFERRAL_ENABLED`).
- **Écarts** : CI **non encore exécutée sur GitHub** (aucun push) ; **pas de canary/blue-green** ; pas
  de framework de **feature flags** ; pas d'**IaC** ; pas de scanning de dépendances/CodeQL.

## 8. Monitoring / Observabilité
- **Écart majeur (S2)** : **pas de logs structurés** (console.*), **pas de metrics**, **pas de
  tracing/OpenTelemetry**, **pas d'alerting** externe, **pas de dashboards**. Health/readiness partiels
  via `/admin/health` (nécessite session admin). Pas de liveness/readiness standard exposé.

## 9. Résilience (pannes Supabase/Storage/Email/Redis/DNS/réseau/CDN/serveur)
| Panne | Comportement actuel |
|---|---|
| Email (Resend) | Dégradation **gracieuse** (dispatch marque `failed`, cœur non bloqué) ✅ — mais latence si pas de timeout |
| Redis (Upstash) | **Fail-open** vers mémoire ✅ |
| Supabase (DB/Auth) | **Panne totale de l'app** ❌ (SPOF, mono-région) |
| Storage | Certificats indisponibles ❌ (dégradation partielle) |
| DNS/CDN/serveur | Géré par Vercel ; **pas de multi-région** applicative |
- **Écart (S4)** : pas de **multi-datacenter**, pas de **DR automatisé**, pas de **chaos testing**.

## 10. Performance (100 / 1 k / 10 k / 100 k / 1 M)
- **Écart majeur (S3)** : **aucun test de charge**. La tenue à 10 k+ est **non démontrée**. Absence de
  cache → charge DB **linéaire** au trafic. CPU/RAM/latence sous charge = **inconnus**. → toute
  affirmation « 100 k prêt » serait **non prouvée**.

## 11. Documentation
- **Excellente** : ADR (`docs/ARCHITECTURE.md`), Runbook, Incident Response, DR, Monitoring, SLA/SLO,
  Playbook (`PRODUCTION_IMPORT_PLAN.md`), checklists release. Manque : **OpenAPI**, résultats de
  **load test**, **diagrammes** C4.

## 12. Production Readiness
- **Prête pour une production CONTRÔLÉE** (échelle actuelle, mono-région, déploiement gaté par lots).
- **Non certifiable web-scale** avant traitement de S1–S4 (+ S5/S6/S8).

---

## Tableau des anomalies (échelle Enterprise)

| # | Anomalie | Gravité | Impact | Risque | Prob. | Coût | Temps | Priorité | Recommandation |
|---|---|---|---|---|---|---|---|---|---|
| S1 | E-mail synchrone en requête + `fetch` Resend sans timeout | Haute | Latence/backpressure | Requêtes lentes/bloquées sous incident | Moyenne | Faible | 0,5–1 j | **P1** | Rendre l'envoi asynchrone (queue/`after`) + `AbortSignal.timeout` |
| S2 | Observabilité absente (logs struct./metrics/tracing/alertes) | Haute | Aveugle en prod | MTTR élevé, incidents non vus | Élevée | Moyen | 2–3 j | **P1** | Sentry + OpenTelemetry + log drains + alertes |
| S3 | Aucun test de charge | Haute | Perf 100 k inconnue | Effondrement sous pic | Moyenne | Faible-Moy | 1–2 j | **P1** | k6/Artillery : 1 k→100 k, définir seuils |
| S4 | Mono-région / SPOF Supabase, pas de DR auto | Haute | Indispo multi-DC | Panne régionale = arrêt | Faible-Moy | Élevé | semaines | **P2** | Stratégie multi-région/réplicas + DR testé |
| S5 | Pas de cache/ISR | Moyenne | Charge DB linéaire | Coût/latence à l'échelle | Élevée | Faible | 1–2 j | **P2** | ISR `revalidate` + cache CDN pour pages publiques |
| S6 | Pas de versioning/OpenAPI/contract tests | Moyenne | Ruptures de contrat | Régressions clientes | Moyenne | Moyen | 2–3 j | **P2** | `/api/v1` + OpenAPI + tests de contrat |
| S7 | Import migration en boucle par process | Moyenne | Lenteur > 200 comptes | Fenêtres longues | Certaine>200 | Faible | 1 j | **P2** | Mode `--limit` résumable (déjà planifié) |
| S8 | Pas d'e2e / couverture non mesurée | Moyenne | Angles morts | Régressions non vues | Moyenne | Moyen | 2–3 j | **P2** | Playwright smoke + couverture |
| S9 | CSP `'unsafe-inline'` | Faible-Moy | XSS résiduel | Exploitation si faille | Faible | Moyen | 1–2 j | **P3** | CSP à **nonce** |
| S10 | Pas d'IaC/canary/blue-green/flags | Faible-Moy | Déploiements risqués | Rollback lent | Faible | Moyen | 3–5 j | **P3** | Canary Vercel + flags + IaC |
| S11 | CI non exécutée sur GH + pas de scanning | Faible-Moy | Régressions/CVE | Merge non gardé | Moyenne | Faible | 0,5 j | **P2** | Activer CI + Dependabot + CodeQL |

> **Aucune anomalie CRITIQUE.** S1–S3 sont **hautes** et conditionnent l'échelle 100 k ; S4 conditionne
> le multi-région. Aucune ne bloque une **production contrôlée** au périmètre actuel.

## Conclusion
La qualité d'ingénierie et de documentation est **au-dessus de la moyenne du marché**. Les écarts sont
**de mise à l'échelle et d'exploitation**, pas de correction de code urgente. Voir
`ARCHITECTURE_SCORECARD.md` et `PRODUCTION_CERTIFICATION.md`.
