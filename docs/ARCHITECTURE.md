# ARCADINS — Architecture & ADR

## Vue d'ensemble
- **Front + API** : Next.js 16 (App Router, React 19, TypeScript strict) — pages SSG/SSR + routes
  API serveur (`src/app/api/*`).
- **Données/Auth** : Supabase (Postgres + Auth GoTrue + Storage). RLS activée ; service role réservé
  au serveur (`src/lib/supabase/admin.ts`).
- **Paiement** : Stripe (webhook signé). **E-mail** : Resend (fournisseur interchangeable).
- **Migration legacy** : scripts idempotents `scripts/migration/*` + RPC transactionnelles
  (`0005`–`0007`).

## Séparation des responsabilités
| Couche | Emplacement | Rôle |
|---|---|---|
| Présentation | `src/app/**` (pages, composants) | UI, i18n (7 langues) |
| API/serveur | `src/app/api/**` | validation (Zod), RBAC, orchestration |
| Domaine | `src/lib/**` | RBAC, notifications, scoring, rate-limit, storage |
| Données | `supabase/migrations/**` + RPC | schéma, RLS, fonctions atomiques |
| Migration | `scripts/migration/**` | export→transform→import→validate→rollback |

## Décisions d'architecture (ADR)
- **ADR-001 — Réception legacy dans des tables `legacy_*` dédiées.** *Pourquoi* : additif, aucune
  atteinte aux tables métier ; rollback = `truncate` sûr. *Conséquence* : double lecture temporaire
  jusqu'à consolidation ultérieure.
- **ADR-002 — Import de compte via RPC atomique `migrate_import_account`.** *Pourquoi* : auth + profil
  + learner + mapping en une transaction ; idempotent par email. *Conséquence* : logique sensible en
  base (SECURITY DEFINER) → privilèges durcis (0007).
- **ADR-003 — Auth Scénario B (import du hash bcrypt).** *Pourquoi* : continuité de connexion sans
  reset massif. *Repli* : Scénario C (lien de réinitialisation).
- **ADR-004 — Garde-fous d'écriture CLI (`resolveScope`).** *Pourquoi* : rendre impossible un import
  massif accidentel ; dry-run par défaut. *Conséquence* : import par `--user-id`, jamais `--all` sur
  les comptes.
- **ADR-005 — Rate limiting distribué (Upstash REST) avec repli mémoire.** *Pourquoi* : serverless
  sans état partagé. *Conséquence* : dépend d'Upstash en prod ; fail-open contrôlé si indispo.
- **ADR-006 — En-têtes de sécurité/CSP au niveau `next.config`.** *Compromis* : `'unsafe-inline'`
  temporaire (hydratation Next) ; évolution vers nonce.

Voir aussi : `PRODUCTION_IMPORT_PLAN.md` (PRODUCTION MASTER PLAYBOOK), `docs/ops/*`.
