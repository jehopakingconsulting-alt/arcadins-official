# ARCADINS — Master Progress Matrix

**Branche :** `audit-refonte` · **Aucune fusion `main`, aucun déploiement production.**
**État global build :** `tsc` 0 · `eslint .` 0 · `npm test` 24/24 · `next build` vert · git propre.
**Convention statut :** ✅ Terminée · 🟡 Partiellement terminée · ⬜ Non commencée · ⛔ Bloquée (dépend d'une décision/infra).

> ⚠️ **Le projet complet n'est PAS terminé.** Ce tableau distingue le *code écrit et testable en isolation*
> du *fonctionnel de bout en bout*, qui dépend pour plusieurs items de l'application des migrations Supabase
> (non faite) et d'un environnement staging (non fait). Les formulaires tutorat/tuteur et le parrainage ne
> sont **pas fonctionnels de bout en bout** tant que les migrations ne sont pas appliquées.

---

## Tableau de suivi

| # | Fonctionnalité demandée | Statut | Fichiers modifiés | Routes | Tables BD | Tests réalisés | Preuve | Travail restant | Décision direction |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Plateforme complète « Tutorat TEF/TCF » | 🟡 | `lib/data/tutorat.ts`, `types/tutorat.ts`, `app/tutorat/**` | `/tutorat`, `/tutorat/[skill]/[level]` | — (statique) | `data/tutorat.test.ts` (5) + build 16 pages statiques + vérif navigateur | 16 pages générées, rendu `/tutorat/expression-orale/avance` confirmé | Contenu FR uniquement ; pas de leçons interactives/quiz ni suivi de progression comme le LMS | Veut-on un vrai LMS interactif tutorat (quiz, progression) ou une plateforme informative + tutorat humain ? |
| 2 | 4 compétences (CO, CE, EO, EE) | ✅ | `lib/data/tutorat.ts` | idem | — | `data/tutorat.test.ts` (SKILLS=4) | Test vert + grille affichée | — | — |
| 3 | 4 niveaux pédagogiques | ✅ | `lib/data/tutorat.ts` | idem | — | `data/tutorat.test.ts` (LEVELS=4, 16 modules) | Test vert + sélecteur affiché | — | — |
| 4 | Parcours étudiant | 🟡 | `app/tutorat/demande/**`, `app/api/tutorat/request/route.ts`, `lib/validation/tutoring.ts` | `/tutorat/demande`, `POST /api/tutorat/request` | `tutoring_requests`, `application_status_history`, `notifications`, `notification_delivery_logs` | Validation Zod, dispatch, historique testés ; démo intégration bout-en-bout | Confirmation UI distincte ; 503 propre si non migré ; `integration.test.ts` | Persistance réelle + RLS → **staging** ; pas d'espace élève de suivi | Appliquer 0001+0004 sur staging |
| 5 | Parcours « Devenir tuteur » | 🟡 | `app/devenir-tuteur/**`, `app/api/tutor/apply/route.ts`, `lib/validation/tutor.ts` | `/devenir-tuteur`, `POST /api/tutor/apply` | `tutor_applications`, `application_status_history`, `notifications`, `notification_delivery_logs` | idem #4 | Confirmation UI distincte ; démo bout-en-bout | Persistance réelle → **staging** | idem |
| 6 | Notifications différentes étudiants vs candidats tuteurs | 🟡 | `lib/notifications/**` (events/provider/templates/dispatch/persist) | via toutes les routes | `notifications`, `notification_delivery_logs`, `notification_preferences` | Confirmations distinctes, dispatch, dedup, erreur provider, console mode — 7 tests | **Vrai moteur** : fournisseur interchangeable (console/Resend), modèles multilingues, journal, anti-dup, retry | Envoi email réel nécessite `EMAIL_PROVIDER=resend` + clé (staging) | Fournir clé Resend + budget si envoi réel voulu |
| 7 | Gestion administrative des candidatures | 🟡 | `components/admin/StatusControl.tsx`, `app/admin/tuteurs/page.tsx`, `app/admin/tutorat/page.tsx`, `app/api/admin/**/status` | `/admin/tutorat`, `/admin/tuteurs`, `POST /api/admin/*/status` | lit + met à jour les 2 tables + `application_status_history` | Transition valide/invalide, refus non autorisé, historique — tests | Boutons de statut (confirmation+motif+réouverture), historique affiché, audit `changed_by` | Recherche/filtres avancés + affectation collaborateur + notes internes → à compléter ; test UI navigateur → staging | — |
| 8 | Programme de parrainage multigénérationnel | 🟡 | migration `0003`, `lib/data/referral-config.ts`, `lib/referral.ts` | `/parrainage` (404 si OFF) | `referral_codes`, `referral_relationships`, `referral_commissions` | `referral.test.ts` (6) | Tests verts ; `/parrainage` → **404 vérifié** (flag OFF) | Flag OFF ; migration non appliquée ; **calcul non branché sur les ventes Stripe** | Validation **juridique** du plan de rémunération avant activation |
| 9 | Calcul et historique des commissions | 🟡 | `lib/referral.ts`, `app/admin/parrainage/page.tsx`, migration `0003` | `/admin/parrainage` | `referral_commissions` | `referral.test.ts` (montants cents, troncature générations) | Tests verts | Calcul OK mais **jamais déclenché** (pas d'appel depuis le webhook) ; historique affichable mais vide | idem #8 |
| 10 | Protection auto-parrainage & fraude | 🟡 | migration `0003`, `lib/referral.ts` (`sanitizeReferralChain`) | — | `referral_commissions` unique + `referral_relationships` CHECK `referrer<>referee` | `referral.test.ts` : auto-parrainage retiré, cycles/doublons éliminés (2 tests) | Tests verts ; contrainte SQL anti-auto-parrainage + garde applicative | Reste : garde-fous IP/compte, plafond de commissions, statut `reversed` auto sur remboursement Stripe | Règles anti-fraude à valider (plafonds, délais, remboursements) |
| 11 | Tableau de bord admin avec rôles granulaires | ✅ (lecture) | `lib/rbac.ts`, `app/admin/**`, `middleware.ts`, migration `0002` | `/admin`, `/admin/*` | `profiles.role`, lit les files | `rbac.test.ts` (6) : matrice + isolation rôles | Redirections vérifiées ; tests verts | Actions d'écriture (gérer comptes/rôles via UI) non incluses ; nécessite migration 0002 + attribution rôle | Appliquer 0002 + désigner les admins |
| 12 | Page `/accreditations` | ✅ | `app/accreditations/**`, `lib/data/accreditations.ts` | `/accreditations` | — | Build + vérif navigateur (Ét.5) | Page état vide honnête rendue | — | Fournir d'éventuelles accréditations réelles + preuves |
| 13 | Composant `VerificationBadge` | ✅ | `components/ui/VerificationBadge.tsx` | — | — | Build ; garde-fou anti-fabrication (ne rend rien sans preuve) | Composant intégré | — | — |
| 14 | Restructuration complète des modules de formation | 🟡 | `lib/scoring.ts`, `lib/data/*` (éclatement `constants.ts`) | `/formations/**` | `programs`, `enrollments` | `pricing.test.ts` ; build | Éclatement + scoring central livrés (Ét.3) | **Double source de vérité** subsiste (M5) : `PROGRAMS.modules` vs `lib/lessons/*` non totalement unifiés ; enrichissement/traductions incomplets | Valider la structure cible unique des cours |
| 15 | Nouvelle navigation | ✅ | `components/layout/Header.tsx`, `Footer.tsx`, `components/ui/Icon.tsx` | toutes | — | Vérif navigateur (icônes SVG, 0 err console) | 8 icônes nav SVG + 4 footer confirmées | — | — |
| 16 | Bouton « Tutorat en TEF et TCF » | ✅ | `Header.tsx`, `i18n.ts` (`nav.tef`), `/tef` → `/tutorat` | `/tef`, lien `/tutorat` | — | Vérif navigateur | Libellé « Tutorat TEF / TCF » rendu (7 langues) | — | — |
| 17 | Bouton « Programmes d'immigration disponibles au Canada » | ✅ | `i18n.ts` (`nav.immigration`) | `/immigration` | — | `i18n.test.ts` (7 langues) | Libellé long rendu en 7 langues | — | — |
| 18 | Documents de formation des collaborateurs | ⬜ | — | — | — | — | — | **À CONSTRUIRE** : guides d'utilisation admin/tuteur/support | Public cible et format (PDF, wiki interne) ? |
| 19 | Environnement staging | 🟡 (kit prêt) | `ARCADINS_STAGING_GUIDE.md`, `.env.example`, `supabase/seed_demo.sql` | — | applique 0001/0002/0004 | — | Guide clé-en-main (20-30 min) + seed démo + modèle env | **Exécution** : créer le projet Supabase de test + preview Vercel (action direction), puis dérouler le guide | Provisionner Supabase de test + preview Vercel |
| 20 | Checklist de validation finale | 🟡 | `ARCADINS_REFONTE_REPORT.md` §3 | — | — | — | Checklist présente dans le rapport de bascule | Doc dédié signable + exécution réelle sur staging | Valider la checklist |
| 21 | Rapport QA complet | ⬜ | — | — | — | 24 tests automatisés existent | Suite de tests verte | **À CONSTRUIRE** : `ARCADINS_QA_REPORT.md` (plan de tests manuels, matrice de compatibilité, résultats) | — |
| 22 | Guide de déploiement | 🟡 | `ARCADINS_REFONTE_REPORT.md` §2/§4 | — | — | — | Procédure migrations + bascule présentes | Guide dédié complet (env vars, Vercel, Stripe, rollback) | — |

---

## Récapitulatif chiffré

- ✅ Terminées : **8** (#2, 3, 12, 13, 15, 16, 17, et 11 en lecture)
- 🟡 Partiellement : **10** (#1, 4, 5, 6, 7, 8, 9, 14, 20, 22)
- ⬜ Non commencées : **3** (#10*, 18, 21)  (*#10 : seule la contrainte anti-double-crédit existe)
- ⛔ Bloquées (infra/décision) : **1** (#19 staging)

---

## Migrations Supabase — état

| Migration | Crée | Réversible ? | Appliquée ? | Débloque |
|---|---|---|---|---|
| `0001_tutoring_and_tutor_applications.sql` | `tutoring_requests`, `tutor_applications` | ✅ section ROLLBACK (DOWN) | **NON** | #4, #5, #6, #7 |
| `0002_roles_expansion.sql` | élargit `profiles.role` | ✅ section ROLLBACK (DOWN) | **NON** | #11 |
| `0003_referrals.sql` | 3 tables parrainage (+ CHECK anti-auto-parrainage) | ✅ section ROLLBACK (DOWN) | **NON** | #8, #9, #10 |
| `0004_notifications.sql` | notifications, notification_preferences, notification_delivery_logs, application_status_history | ✅ section ROLLBACK (DOWN) | **NON** | #4, #5, #6, #7 |

> **Prochaine phase :** rendre ces migrations explicitement **réversibles** (section `-- DOWN`), puis les
> appliquer sur **staging** (jamais prod directement) pour permettre la démonstration fonctionnelle des #4–#10.

---

*Document vivant — mis à jour à chaque phase. Aucune action de production n'a été entreprise.*
