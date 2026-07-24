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
