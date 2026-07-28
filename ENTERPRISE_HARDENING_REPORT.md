# ARCADINS — ENTERPRISE HARDENING REPORT

**Objet :** correction de **toutes** les anomalies de `RC1_INDEPENDENT_FINAL_AUDIT.md` (A1→A10).
**Principe :** changements **minimaux, élégants, documentés, réversibles** ; aucune atteinte à
l'architecture, aux migrations, imports, rollbacks, tests ou à la compatibilité.
**Date :** 2026-07-28 · **Branche :** `audit-refonte`.

## Résumé
Les 10 anomalies sont traitées. Les migrations `0005`/`0006` (déjà appliquées sur staging) restent
**immuables** ; tout le durcissement SQL est isolé dans une **nouvelle migration idempotente `0007`**.
Gates après durcissement : **lint 0 · typecheck 0 · tests 71/71 · audit SQL OK · build OK**, et
en-têtes de sécurité **vérifiés servis** en navigateur (page rendue sans régression).

---

## Corrections détaillées

### A1 — `loadIdMap` : pagination robuste (perte silencieuse > 1000 comptes)
- **Pourquoi** : `select` sans `range` plafonné par `db-max-rows` PostgREST → lignes au-delà de ~1000
  jamais lues → FK non résolues → **pertes silencieuses**.
- **Avant** : `target.from("legacy_id_map").select(...).eq(...)`.
- **Après** : helper `selectAllPaged()` itérant par pages de 1000 jusqu'à épuisement (loadIdMap +
  lecture `legacy_prospects`).
- **Impact** : supporte 100 → 100 000+ comptes, mémoire bornée à une page. **Perf** : neutre à petite
  échelle, correcte à grande. **Sécurité** : n/a. **Compat** : signature interne inchangée.
- **Rollback** : révert du helper ; comportement fonctionnel identique à ≤ 1000.

### A2 — Moindre privilège sur toutes les RPC `SECURITY DEFINER`
- **Pourquoi** : `migrate_validation_report/_user` ne révoquaient qu'`anon` ; `migrate_lookup` aucun
  revoke → exécutables par `authenticated`/`public` (contournement RLS).
- **Avant** : grants par défaut (PUBLIC).
- **Après** (`0007`) : `revoke all ... from public, anon, authenticated` sur les 6 RPC +
  `grant execute ... to service_role` explicite.
- **Impact** : fuite de comptages/mapping fermée. **Sécurité** : ✅ moindre privilège. **Compat** :
  CLI (service role) inchangé — prouvé, l'import continue de fonctionner.
- **Rollback** : réaccorder si besoin (déconseillé).

### A3 — Collision e-mail : aucune élévation de rôle/métadonnées
- **Pourquoi** : `migrate_import_account` écrasait `profiles.role` sur conflit → élévation possible d'un
  compte natif.
- **Avant** : `on conflict (id) do update set role = excluded.role, ...`.
- **Après** (`0007`, `create or replace`) : `on conflict` ne touche **ni rôle ni métadonnées** ; noms
  comblés uniquement si vides. + **pré-flight** `preflight-collisions.mjs` (lecture seule) + fonction
  pure `findCollisions` testée.
- **Impact** : **Sécurité** : ✅ pas d'escalade. **Compat** : import de comptes neufs inchangé.
- **Rollback** : ré-exécuter `0006` restaure l'ancienne fonction.

### A4 — En-têtes de sécurité / CSP
- **Avant** : `next.config.ts` vide.
- **Après** : CSP + HSTS + X-Frame-Options DENY + X-Content-Type-Options + Referrer-Policy +
  Permissions-Policy + COOP + CORP. `'unsafe-eval'` **dev uniquement** (React) ; strict en prod.
- **Impact** : **Sécurité** : ✅ défense en profondeur (clickjacking/XSS). **Compat** : rendu vérifié
  OK ; Stripe/Supabase autorisés. **Perf** : neutre.
- **Rollback** : retirer `headers()`.

### A5 — Enterprise Rate Limiter (serverless/edge, sans mémoire locale)
- **Avant** : `Map` en mémoire (inopérant multi-instances).
- **Après** : `enforceRateLimit` (Upstash Redis REST via `fetch`, **sans dépendance**) + repli mémoire
  (fail-open contrôlé) ; `rateLimit` sync conservé pour tests/compat. Routes `tutorat/request` et
  `tutor/apply` mises à jour (`await`).
- **Impact** : **Sécurité** : ✅ anti-spam effectif en prod. **Compat** : signature de repli conservée.
  **Perf** : un aller-retour Redis borné (timeout 1,5 s).
- **Rollback** : revenir à `rateLimit`.

### A6 — Storage : bucket privé + URLs signées
- **Avant** : bucket `legacy-certificates` non codifié.
- **Après** (`0007`) : bucket **privé** idempotent + policy RLS admin-read sur `storage.objects` ;
  helper `getCertificateSignedUrl` (URL signée expirante, 5 min).
- **Impact** : **Sécurité** : ✅ PII des certificats jamais publiques. **Compat** : additif.
- **Rollback** : drop policy + delete bucket (si vide).

### A7 — Performance (config sûre)
- **Après** : `poweredByHeader:false`, `reactStrictMode:true`, `compress:true`,
  `productionBrowserSourceMaps:false`.
- **Impact** : **Perf** : gains marginaux + surface réduite. **Compat** : aucun risque.
- **Rollback** : retirer les options. *(Analyse bundle/images approfondie = suivi non bloquant.)*

### A8 — CI/CD
- **Après** : `.github/workflows/ci.yml` (lint + typecheck + tests + audit SQL + build, Node 24,
  timeout 15 min, concurrency) + `scripts/migration/sql-audit.mjs` (version repo).
- **Impact** : **DevOps** : ✅ gate automatique avant merge/deploy. **Compat** : additif.
- **Rollback** : supprimer le workflow.

### A9 — Tests
- **Après** : `hardening.test.mjs` (pagination A1, collisions A3) + `rate-limit.test.ts` (A5). Suite
  **64 → 71**, tous verts.
- **Impact** : **Tests** : ✅ couverture des nouveaux chemins + edge cases (pages, dédup, repli).
- **Rollback** : supprimer les tests. *(E2E Playwright = suivi non bloquant.)*

### A10 — Documentation
- **Après** : `docs/ARCHITECTURE.md` (+ ADR), `docs/ops/{RUNBOOK,INCIDENT_RESPONSE,DISASTER_RECOVERY,
  MONITORING,SLA}.md` ; playbook déjà présent (`PRODUCTION_IMPORT_PLAN.md`).
- **Impact** : **Maintenabilité/Observabilité** : ✅ procédures officielles.

---

## Compatibilité & non-régression
- Architecture, migrations `0005`/`0006`, imports, rollbacks : **inchangés** (durcissement isolé en
  `0007`, réversible).
- Gates : **lint 0 · typecheck 0 · tests 71/71 · audit SQL OK · build OK** · en-têtes vérifiés servis.

## À appliquer (sous autorisation, hors de ce rapport)
- Migration `0007` sur **staging puis prod** (idempotente). Variables `UPSTASH_REDIS_REST_*` à
  provisionner pour activer le rate-limit distribué (sinon repli mémoire).
