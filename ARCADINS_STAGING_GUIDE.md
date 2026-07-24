# ARCADINS — Guide de validation staging (clé en main)

But : valider en **environnement réel** (base + RLS + courriels + parcours admin) sans toucher à la
production. Durée estimée : **20–30 minutes**. Ne jamais exécuter ces étapes sur la base de production.

> Prérequis côté direction : un **projet Supabase de test** (le plan gratuit suffit) distinct de la prod,
> et un déploiement de préproduction (Vercel *preview* sur la branche `audit-refonte`) — ou une exécution
> locale `npm run dev` pointant sur la base de test.

---

## Étape 1 — Créer la base de test
1. Créer un **nouveau projet Supabase** (ne pas réutiliser la base de production).
2. Récupérer : `Project URL`, `anon key`, `service_role key`.

## Étape 2 — Configurer l'environnement
Copier `.env.example` → `.env.local` et renseigner **les clés du projet de TEST** :
```
NEXT_PUBLIC_SUPABASE_URL=...(test)
NEXT_PUBLIC_SUPABASE_ANON_KEY=...(test)
SUPABASE_SERVICE_ROLE_KEY=...(test)
APP_URL=http://localhost:3000
EMAIL_PROVIDER=console        # aucun envoi réel au départ
```
> Tant que `EMAIL_PROVIDER=console`, les courriels sont seulement tracés en console — parfait pour valider
> la logique avant de brancher Resend.

## Étape 3 — Appliquer les migrations (SQL Editor du projet de test)
Exécuter **dans l'ordre**, chacune en transaction, en vérifiant les contrôles :

1. `supabase/migrations/0001_tutoring_and_tutor_applications.sql` (section UP)
   ```sql
   select to_regclass('public.tutoring_requests'), to_regclass('public.tutor_applications'); -- non null
   ```
2. `supabase/migrations/0002_roles_expansion.sql` (section UP)
   ```sql
   select count(*) from public.profiles
     where role not in ('student','admin','tutor','content_manager','finance_manager','support'); -- 0
   ```
   > Prérequis : la table `public.profiles` doit exister (schéma existant). Sur une base de test vierge,
   > recréer d'abord le schéma de base (profiles/programs/enrollments/…) ou restaurer une copie de structure.
3. `supabase/migrations/0004_notifications.sql` (section UP)
   ```sql
   select to_regclass('public.notifications'),
          to_regclass('public.notification_delivery_logs'),
          to_regclass('public.application_status_history');
   ```

## Étape 4 — Données de démo + rôle admin
1. Exécuter `supabase/seed_demo.sql` (insère 1 demande élève + 1 candidature tuteur).
2. Créer/choisir un compte de test via l'inscription, puis lui donner le rôle admin :
   ```sql
   update public.profiles set role = 'admin' where id = '<uuid_du_compte_test>';
   ```

## Étape 5 — Lancer et valider (checklist)
Démarrer (`npm run dev`) ou ouvrir le déploiement *preview*, puis dérouler `ARCADINS_QA_REPORT.md` §5 :

| # | Test | Attendu |
|---|---|---|
| 1 | Soumettre `/tutorat/demande` | 200 · « Votre demande de tutorat a bien été reçue. » · ligne créée |
| 2 | Soumettre `/devenir-tuteur` | 200 · « Votre candidature comme tuteur a bien été reçue et sera examinée. » |
| 3 | Comparer les deux confirmations | messages **différents** (UI + traces console des courriels) |
| 4 | `/admin/tutorat` et `/admin/tuteurs` | listes peuplées, statut `submitted`, historique visible |
| 5 | Changer un statut valide (ex. `submitted → under_review`) | succès · nouvelle entrée d'historique · trace courriel |
| 6 | Tenter une transition invalide (ex. `under_review → submitted`) | refus **409** |
| 7 | Se connecter avec un rôle non admin | `/admin` redirige ; API statut → **403** |
| 8 | Re-soumettre 6× en < 1 min | **429** après 5 (rate limit) |
| 9 | Vérifier RLS | un utilisateur non admin ne lit pas `tutoring_requests`/`tutor_applications` |

## Étape 6 (optionnelle) — Activer l'envoi réel de courriels
1. Créer un compte Resend, un domaine vérifié, une clé API.
2. Dans `.env.local` (test) : `EMAIL_PROVIDER=resend`, `RESEND_API_KEY=...`, `EMAIL_FROM=...`, `EMAIL_REPLY_TO=...`.
3. Re-soumettre une demande → vérifier la réception réelle + le journal `notification_delivery_logs` (`status=sent`).

## Étape 7 — Décision
Si la checklist passe intégralement sur staging, la base technique est validée. **La fusion `main`
et le déploiement production restent soumis à votre approbation explicite** (voir `ARCADINS_REFONTE_REPORT.md`).

---

### Notes
- Rien dans ce guide ne s'exécute automatiquement : chaque étape est manuelle et sous votre contrôle.
- Le rate limiting est en mémoire (mono-instance) ; pour un staging multi-instances, prévoir un magasin
  partagé (Upstash/Redis) — sans incidence sur la validation fonctionnelle.
- Nettoyer les données de démo après validation (requêtes de `seed_demo.sql`).
