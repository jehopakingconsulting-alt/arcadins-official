# ARCADINS — GO-LIVE CHECKLIST

Case cochée = **vérifiée réellement**. Toute case bloquante non cochée = **NO-GO**.

## A. Code & qualité (prouvé en local)
- [x] Lint 0 · TypeScript 0 (strict + noUnused*/noFallthrough)
- [x] Tests 73/73 · couverture lignes 88,93 %
- [x] Audit SQL 0 défaut · `npm audit` prod **0 vulnérabilité**
- [x] Build **0 warning** (51 pages)
- [x] Arbre Git propre, tout committé (branche `audit-refonte`)

## B. Sécurité
- [x] RLS activée (tables sensibles + Storage) ; RPC moindre privilège (0007)
- [x] En-têtes CSP/HSTS/X-Frame/COOP/CORP servis (vérifié curl)
- [x] Secrets non committés (`.env*` ignoré) ; 0 secret en dur
- [x] Endpoints protégés (admin 401/403 ; webhook signé ; cron 503-si-vide ; formulaires rate-limités)
- [ ] CI sécurité **exécutée** (CodeQL/SBOM signé/gitleaks) — *REQUIRES PRODUCTION VALIDATION*
- [ ] Pentest / OWASP ASVS — *RPV*

## C. Base de données
- [x] Migrations idempotentes/réversibles (audit statique)
- [ ] `0005/0006/0007` **appliquées en prod** — *à faire (Runbook Phase 1)*
- [ ] Backup + PITR prod confirmés + horodatés — *à faire*

## D. Infra & déploiement
- [x] Pipelines : `ci.yml`, `deploy.yml` (rollback auto), `uptime.yml`, `backup.yml`, `dependabot.yml`
- [ ] Secrets GitHub + Vercel renseignés — *à faire*
- [ ] Domaine/DNS/certificat (Vercel gère TLS) — *à confirmer*

## E. Services externes
- [ ] Resend : **domaine vérifié** + `EMAIL_FROM` (sinon e-mails limités) — *à faire*
- [x] Stripe : webhook `constructEvent` (signature) — code vérifié
- [x] Supabase : service role serveur ; readiness OK
- [ ] Upstash (rate-limit distribué) — *option, sinon repli mémoire*

## F. Observabilité
- [x] `/api/health`, `/api/ready` (vérifiés 200) ; logger JSON ; hook OTel build-safe
- [ ] OTel/Prometheus/Grafana/Sentry **live** + alerting — *RPV (provisionnement)*

## G. Performance / scalabilité
- [ ] Benchmarks k6/Artillery 100→100k **exécutés** — *RPV*
- [x] Compression activée ; CDN Vercel (statique)
- [ ] ISR/Image optimization — *décision produit (code gelé)*

## H. Documentation
- [x] Runbook, Rollback, Incident, DR, Ops, SLA/SLO, Playbook, OpenAPI, Checklists

**GO** uniquement quand toutes les cases **bloquantes** (C.migrations+backup, D.secrets, E.Resend) sont
vertes. Les *RPV* n'empêchent pas une mise en ligne **contrôlée** mais restent à exécuter en prod.
