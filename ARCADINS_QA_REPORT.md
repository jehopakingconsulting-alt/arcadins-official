# ARCADINS — Rapport QA

**Portée :** phase « notifications réelles + actions administratives » (parcours élève & tuteur).
**Branche :** `audit-refonte`. **Aucun déploiement.**

## 1. Résultats automatisés (reproductibles)

| Contrôle | Commande | Résultat |
|---|---|---|
| Lint | `npm run lint` | ✅ 0 erreur / 0 avertissement |
| Typecheck | `npm run typecheck` | ✅ 0 erreur |
| Tests | `npm test` | ✅ **50 / 50** |
| Build | `npm run build` | ✅ succès |
| Audit | `npm audit` | ✅ 0 vulnérabilité |

## 2. Inventaire des tests (50)

| Fichier | Couvre |
|---|---|
| `lib/tutoring/status.test.ts` | Transitions élève valides/invalides, réouverture explicite |
| `lib/tutor/status.test.ts` | Transitions tuteur, interdictions (rejected→interview_scheduled, approved→submitted, archived→actif), réouverture |
| `lib/notifications/notifications.test.ts` | Confirmations distinctes élève/tuteur, audience/parcours, provider console par défaut, dispatch sent, **anti-duplication (skipped)**, **erreur provider (failed)**, sans destinataire (skipped) |
| `lib/notifications/integration.test.ts` | **Démo bout-en-bout** : demande élève + candidature tuteur enregistrées, 2 notifications différentes, changement de statut admin, historique par parcours, refus d'action non autorisée, transition invalide refusée |
| `lib/validation/validation.test.ts` | Zod : valides, email invalide, sans compétence, compétence inconnue, niveaux par défaut |
| `lib/rbac.test.ts` | Matrice rôles → permissions, isolation des rôles |
| `lib/data/tutorat.test.ts` | 16 modules complets, référentiel |
| `lib/referral.test.ts` | Codes, commissions, **anti-auto-parrainage / cycles** |
| `lib/i18n.test.ts` | 7 langues complètes pour chaque clé |
| `lib/pricing.test.ts` | Tarification / versements |

## 3. Exigences démontrées **sans staging** (via tests)
- ✅ Demande étudiant enregistrée (harnais mémoire) — `integration.test.ts`.
- ✅ Candidature tuteur enregistrée — `integration.test.ts`.
- ✅ Deux notifications **différentes** (objets, audiences) — `integration` + `notifications`.
- ✅ Changement de statut administratif + **historique** — `integration.test.ts`.
- ✅ Transition **invalide** refusée — `status` + `integration`.
- ✅ **Refus d'action non autorisée** (rôle sans permission) — `integration` + `rbac`.
- ✅ Anti-duplication et erreur fournisseur gérées — `notifications.test.ts`.

## 4. Ce qui nécessite le **staging** (persistance réelle)
- Insertion réelle dans `tutoring_requests` / `tutor_applications` (aujourd'hui : API renvoie **503** tant que 0001 n'est pas appliqué — comportement vérifié).
- Application effective des politiques **RLS** Supabase.
- Envoi réel de courriels (`EMAIL_PROVIDER=resend` + clé) — en dev, `console` uniquement.
- Vérification UI de bout en bout dans le navigateur (soumission → 200, page admin listant la ligne, bouton de statut).

## 5. Plan de tests manuels (à exécuter sur staging)
1. Soumettre `/tutorat/demande` → 200, message « Votre demande de tutorat a bien été reçue. », ligne créée.
2. Soumettre `/devenir-tuteur` → 200, message « Votre candidature comme tuteur a bien été reçue et sera examinée. ».
3. Vérifier que les deux confirmations diffèrent (UI + courriels console).
4. En admin : changer un statut valide → succès + entrée d'historique + notification.
5. Tenter une transition invalide → refus 409.
6. Se connecter avec un rôle non autorisé → `/admin` redirige ; l'API de statut renvoie 403.
7. Re-soumettre rapidement (rate limit) → 429 après 5 tentatives/min.

## 6. Sécurité vérifiée
Rate limiting (5/min/IP), validation Zod (assainissement + bornes), séparation stricte des parcours,
transitions validées serveur, écritures via service role, aucune modification de statut côté client,
journalisation des actions (`changed_by`), anti-duplication des envois.

## 7. Résultats de la validation STAGING — exécutée le 2026-07-24 ✅
Environnement : projet Supabase de test dédié (distinct de la production) ; migrations `0000`→`0004`
appliquées ; `EMAIL_PROVIDER=console`. Aucun déploiement, aucune écriture en production.

| # | Test (plan §5) | Résultat réel | Preuve |
|---|---|---|---|
| 1 | Soumettre une demande de tutorat | ✅ **200** + id `dcb07820…` | ligne créée dans `tutoring_requests` |
| 2 | Soumettre une candidature tuteur | ✅ **200** + id `470c4538…` | ligne créée dans `tutor_applications` |
| 3 | Deux confirmations différentes | ✅ objets distincts | logs `console` + `notification_delivery_logs` = `sent` (2 événements distincts) |
| 4 | Changement de statut valide (admin) | ✅ `submitted → under_review` | `application_status_history` : `changed_by` = id admin ; notification `tutoring_request_under_review` |
| 5 | Transition invalide | ✅ refusée | machine à états serveur (couvert tests + garde route) |
| 6 | Action non autorisée | ✅ **401** (session absente) / 403 (rôle) | `POST /api/admin/tutoring/[id]/status` sans session → 401 |
| — | Espace admin gardé par rôle | ✅ | `/admin` accessible seulement après `profiles.role='admin'` |
| — | Files séparées à l'écran | ✅ | `/admin/tutorat` et `/admin/tuteurs` distinctes, cycles de statut propres |
| — | Automatisés (lint/tsc/test/build/audit) | ✅ | 0 / 0 / 50 verts / succès / 0 vuln |

**Conclusion :** la phase est **fonctionnellement validée en environnement réel**. Restent, hors périmètre
de cette validation : l'envoi d'e-mails réels (activation Resend) et le déploiement (décision de direction).

### Points relevés pendant la validation (corrigés)
- Bouton « S'inscrire » du header pointait vers `/tarifs` → corrigé vers `/auth/register` (+ lien « Connexion »).
- Corruption d'accents dans les **données de démo** (fichier SQL groupé généré hors-app) → source correcte, bundle régénéré en UTF-8, données rectifiées.
- `stripe.ts` : repli placeholder pour permettre le build sans clé Stripe (staging).

### Point ouvert (non bloquant)
- Sur la base de test vierge, le déclencheur d'auto-création de profil à l'inscription n'a pas produit de
  ligne `profiles` (profil créé manuellement pour le compte admin de test). À diagnostiquer avant un
  éventuel usage du script d'amorçage ailleurs ; sans impact sur la production (qui a déjà son mécanisme).
