# ARCADINS — Changelog (branche `audit-refonte`)

> Aucune fusion `main`, aucun déploiement production. Toutes les dates : 2026-07-23.

## Phase — Notifications réelles & actions administratives (parcours élève & tuteur)
### Ajouté
- **Machines à états** serveur : `lib/tutoring/status.ts`, `lib/tutor/status.ts` (statuts + transitions validées + réouverture explicite).
- **Moteur de notifications** : `lib/notifications/` — événements (13), fournisseur interchangeable (console / Resend prêt), modèles multilingues (dont les messages FR officiels), dispatch avec journal de livraison, anti-duplication, gestion d'erreur.
- **Validation Zod** : `lib/validation/tutoring.ts`, `lib/validation/tutor.ts` (assainissement + bornes).
- **Limiteur de débit** : `lib/rate-limit.ts` (anti-spam / anti-soumissions multiples).
- **API** : refonte des soumissions `/api/tutorat/request` et `/api/tutor/apply` (validation + insert + historique + notifications élève/admin) ; nouvelles routes admin `/api/admin/tutoring/[id]/status` et `/api/admin/tutor/[id]/status` (rôle + transition + historique + notification).
- **Migrations** : `0004_notifications.sql` (notifications, notification_preferences, notification_delivery_logs, application_status_history — UP/DOWN, index, FK, RLS, CHECK).
- **Admin UI** : `components/admin/StatusControl.tsx` (changement de statut avec confirmation, motif, réouverture) ; historique affiché sur `/admin/tutorat` et `/admin/tuteurs`.
- **UI** : confirmations distinctes après soumission (élève vs tuteur), 7 langues.
- **Tests** : +26 tests (statuts, notifications, validation, intégration bout-en-bout) → **50 au total**.
- **Docs** : `ARCADINS_NOTIFICATION_MATRIX.md`, `ARCADINS_DATABASE_CHANGES.md`, `ARCADINS_QA_REPORT.md`, ce changelog.

### Modifié
- `0001_*.sql` : statuts alignés sur la nouvelle machine à états (+ `updated_at`).
- `ARCADINS_MASTER_PROGRESS_MATRIX.md` : statuts #4–#10 réévalués.

### Dépendances
- Ajout de `zod` (validation serveur). `npm audit` : 0 vulnérabilité.

## Phase — Kit de validation staging
### Ajouté
- `ARCADINS_STAGING_GUIDE.md` : procédure clé-en-main (création base de test, env, application 0001/0002/0004, seed, checklist de validation, activation Resend optionnelle).
- `.env.example` : modèle de variables d'environnement (aucune clé réelle ; exception `.gitignore`).
- `supabase/seed_demo.sql` : données de démonstration (1 demande élève + 1 candidature tuteur) pour peupler l'admin sur staging.
- Décision assumée : **arrêt de l'accumulation de fonctionnalités**, priorité à la validation en environnement réel (aligné avec la revue externe).

## Phases précédentes (rappel)
- Migrations réversibles (0001/0002/0003) + anti-auto-parrainage (`0cea2ca`).
- Master Progress Matrix (`9532370`).
- Conformité (partenariats inventés purgés) + protection i18n 7 langues (`7105e89`).
- Rapport de bascule (`9bcc3a8`).
- Étapes 1–10 de refonte (voir `ARCADINS_REFONTE_REPORT.md`).
