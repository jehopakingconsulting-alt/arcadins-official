# ARCADINS — ARCHITECTURE SCORECARD

**Lentille :** 100 000 utilisateurs, multi-région, multi-années (exigeante). **Date :** 2026-07-28.
Barème plus strict que la « release » : ce qui n'est pas **démontré** est plafonné.

| Domaine | Note | Commentaire (démontré) |
|---|---|---|
| Architecture | **82 / 100** | Séparation claire, SOLID/KISS/YAGNI ; pas d'event-driven/CQRS ni couche service explicite. |
| Sécurité | **84 / 100** | OWASP de base couvert post-hardening ; manque nonce CSP, WAF, ASVS/pentest, scanning CI. |
| Backend | **72 / 100** | E-mail synchrone + sans timeout ; pas de queue/circuit-breaker/cache. |
| Frontend | **82 / 100** | i18n 7 langues, SEO, en-têtes ; Lighthouse/a11y/bundle non mesurés. |
| Database | **84 / 100** | RLS, migrations idempotentes, RPC atomiques, pagination ; mono-région, pas de réplicas. |
| API | **74 / 100** | Auth/authz/rate-limit/Zod ; pas de versioning/OpenAPI/contract tests. |
| DevOps | **80 / 100** | CI définie, secrets Vercel, rollback ; pas de canary/blue-green/IaC, CI non exécutée GH. |
| Infrastructure | **68 / 100** | Vercel + Supabase mono-région ; pas d'IaC, pas de multi-DC. |
| Scalabilité | **66 / 100** | PostgREST mutualise les connexions (+) ; pas de cache, e-mail sync, migration en boucle. |
| Performance | **62 / 100** | **Aucun test de charge** → tenue 100 k non prouvée ; pas de cache. |
| Observabilité | **60 / 100** | Health page + docs ; pas de logs struct./metrics/tracing/alertes. |
| Résilience | **72 / 100** | Fail-safe e-mail/Redis, rollback/DR docs ; Supabase = SPOF mono-région. |
| Documentation | **96 / 100** | ADR/Runbook/IR/DR/Monitoring/SLA/Playbook/checklists — exemplaire. |
| Maintenabilité | **88 / 100** | TS strict, 71 tests, structure lisible, docs. |
| Évolutivité | **80 / 100** | Libs découplées + flags ; pas d'architecture plugin/événementielle. |
| Production Readiness | **74 / 100** | Prêt production **contrôlée** ; pas web-scale sans S1–S4. |

## Note finale

### 🟡 **79 / 100** — Solide pour production contrôlée ; écarts de mise à l'échelle à combler pour le web-scale.

**Lecture :** +2 pts vs la note « release » interne (88) seraient trompeurs — ici le barème vise 100 k /
multi-région / multi-années, plus sévère. La note reflète des **écarts d'exploitation et de scalabilité**,
non des défauts de code. Priorités de remontée : **S1 (async/timeout), S2 (observabilité), S3 (load
test)** → gains rapides vers ~85+.

Détail des anomalies et plans : `ENTERPRISE_FINAL_AUDIT.md`. Décision : `PRODUCTION_CERTIFICATION.md`.
