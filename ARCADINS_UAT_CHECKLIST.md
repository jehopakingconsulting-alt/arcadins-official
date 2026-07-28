# ARCADINS — Check-list de recette utilisateur (UAT)

**But :** valider manuellement, à la souris, tous les parcours avant la mise en production.
**Environnement :** staging (`http://localhost:3002`, base Supabase de test, `EMAIL_PROVIDER=resend`).
**Comment l'utiliser :** cochez `[x]` chaque ligne réussie. Toute anomalie → notez-la en bas.

> Rappel : rien de tout ceci ne touche la production. Le déploiement reste soumis à votre autorisation.

---

## A. Parcours ÉLÈVE — demande de tutorat
- [ ] A1. Ouvrir `/tutorat` → la grille des **4 compétences** et le sélecteur de **4 niveaux** s'affichent.
- [ ] A2. Ouvrir une fiche `/tutorat/<compétence>/<niveau>` → objectifs, stratégies, tâche type visibles.
- [ ] A3. Aller sur `/tutorat/demande`, remplir le formulaire (choisir ≥ 1 compétence) → **« Votre demande de tutorat a bien été reçue. »**
- [ ] A4. Soumettre **sans** compétence → le bouton reste bloqué / message d'invite (pas d'envoi).
- [ ] A5. Vérifier la réception de l'e-mail élève (objet **« Confirmation de votre demande de tutorat en TEF et TCF »**).
- [ ] A6. Double-clic rapide sur « Envoyer » → **une seule** demande créée (protection anti-double-clic).

## B. Parcours TUTEUR — candidature
- [ ] B1. Ouvrir `/devenir-tuteur` → le parcours en 3 étapes + le formulaire s'affichent.
- [ ] B2. Soumettre une candidature (compétences + niveaux) → **« Votre candidature comme tuteur a bien été reçue et sera examinée. »**
- [ ] B3. Vérifier que ce message est **différent** de celui de l'élève (A3).
- [ ] B4. Vérifier la réception de l'e-mail tuteur (objet **« Confirmation de votre candidature comme tuteur »**).

## C. Sécurité / accès
- [ ] C1. Déconnecté, ouvrir `/admin` → redirection vers `/auth/login`.
- [ ] C2. Connecté avec un compte **sans** rôle admin → `/admin` redirige vers `/dashboard`.
- [ ] C3. (Optionnel, technique) `POST /api/admin/tutoring/<id>/status` sans session → **401**.

## D. Administration — demandes de tutorat (`/admin/tutorat`)
- [ ] D1. La liste affiche les demandes soumises (accents corrects, statut `submitted`).
- [ ] D2. Changer un statut **valide** : `submitted → under_review` → succès + bloc **Historique** mis à jour.
- [ ] D3. Poursuivre : `under_review → contacted → scheduled → enrolled` (chaque étape réussit).
- [ ] D4. Tenter une transition **invalide** (ex. revenir `under_review → submitted`) → **refus** (message d'erreur).
- [ ] D5. Statut nécessitant un **motif** (`closed` ou `cancelled`) sans motif → refus tant que le motif est vide.
- [ ] D6. L'élève reçoit un e-mail au changement (ex. mise en revue) — vérifier la boîte de test.

## E. Administration — candidatures tuteur (`/admin/tuteurs`)
- [ ] E1. La liste affiche les candidatures (statut `submitted`), **séparée** des demandes élèves.
- [ ] E2. `submitted → under_review → interview_requested → interview_scheduled → approved` (chaîne complète).
- [ ] E3. Sur une autre candidature : `under_review → rejected` (motif requis) → refus e-mail professionnel reçu.
- [ ] E4. Vérifier qu'une transition interdite (ex. `rejected → interview_scheduled`) est **refusée**.
- [ ] E5. Vérifier que les e-mails d'approbation / de refus arrivent avec le bon contenu.

## F. Multilingue & design
- [ ] F1. Changer de langue (FR/EN/ES/IT/PT/DE/HT) → l'interface bascule, pas de clé brute affichée.
- [ ] F2. Vérifier le thème **bleu marine / or** et les icônes (pas d'emoji cassé) sur accueil, /tutorat, /admin.
- [ ] F3. Boutons **« S'inscrire »** → `/auth/register` et **« Connexion »** → `/auth/login`.

## G. Journaux (contrôle en base, SQL Editor)
- [ ] G1. `application_status_history` : une ligne par changement, `changed_by` = id admin, `parcours` correct.
- [ ] G2. `notification_delivery_logs` : `status=sent`, `provider=resend`, `error` vide pour les envois.
- [ ] G3. Les deux parcours ne se mélangent jamais (aucune ligne `tutoring` avec un id de candidature, etc.).

---

## Avant la mise en production (rappels)
- [ ] P1. **Vérifier un domaine Resend** (ex. `arcadins-training.com`) + `EMAIL_FROM=noreply@…` (obligatoire pour écrire à de vrais destinataires).
- [ ] P2. **Sauvegarde complète** de la base de production.
- [ ] P3. Appliquer les migrations `0001` / `0002` / `0004` **en production** (procédure : `ARCADINS_REFONTE_REPORT.md` §2).
- [ ] P4. Merger `audit-refonte → main` (déclenche le déploiement Vercel).
- [ ] P5. Rejouer A→G sur la production avec des données de test, puis nettoyer.
- [ ] P6. Restaurer `.env.local.prod-backup` pour le dev local normal.

---

## Anomalies constatées
| # | Écran / action | Comportement observé | Attendu |
|---|---|---|---|
|   |                |                      |         |

*Note : la validation automatisée (lint / typecheck / 50 tests / build / audit) est déjà verte — cette
check-list couvre uniquement l'expérience utilisateur réelle, à cliquer.*