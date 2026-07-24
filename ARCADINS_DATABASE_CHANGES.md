# ARCADINS — Changements de base de données

Toutes les migrations sont **additives et réversibles** (section UP + ROLLBACK/DOWN). **Aucune n'est appliquée
en production.** Ordre d'application : `0001` → `0002` → `0004` (→ `0003` seulement si parrainage activé).
À exécuter sur **staging** d'abord, jamais directement en production.

## Tables & statuts

### `tutoring_requests` (0001) — parcours ÉLÈVE
Champs : identité, contact, `skills[]`, `target_level`, `current_level`, `goal`, `availability`, `message`,
`status`, `created_at`, `updated_at`, `user_id` (nullable).
**Statuts (CHECK)** : `submitted · under_review · contacted · scheduled · enrolled · closed · cancelled`.

### `tutor_applications` (0001) — parcours TUTEUR
Champs : identité, contact, `skills[]`, `levels[]`, `experience`, `qualifications`, `motivation`,
`status`, `created_at`, `updated_at`, `user_id` (nullable).
**Statuts (CHECK)** : `submitted · under_review · interview_requested · interview_scheduled · approved · rejected · suspended · archived`.

### `profiles.role` (0002)
Contrainte élargie : `student · admin · tutor · content_manager · finance_manager · support` (sur-ensemble non destructif).

### `application_status_history` (0004) — journal d'audit
`parcours` (`tutoring|tutor`), `tutoring_request_id` **xor** `tutor_application_id` (CHECK `ash_one_parcours`),
`from_status`, `to_status`, `event`, `reason`, `changed_by`, `created_at`. Index par entité et par parcours.

### `notifications` (0004) — file interne
`audience` (`admin|student|tutor`), `recipient_id` (null = tous les admins), `parcours`, `event`, `title`,
`body`, `related_id`, `read_at`, `created_at`. Index par destinataire et par audience.

### `notification_preferences` (0004)
`user_id` (PK), `email_enabled`, timestamps.

### `notification_delivery_logs` (0004)
`event`, `channel` (`email|internal`), `provider`, `to_email`, `template_key`, `lang`,
`status` (`pending|sent|failed|skipped`), `attempts`, `error`, `dedup_key` **unique**, timestamps. Index status/event.

## RLS & permissions
- **tutoring_requests / tutor_applications** : lecture réservée aux admins ; écritures via service role.
- **application_status_history / notification_delivery_logs** : lecture admin uniquement.
- **notifications** : l'utilisateur lit les siennes (`recipient_id = auth.uid()`) ; l'admin lit la file `audience='admin'`.
- **notification_preferences** : chacun gère les siennes.
- **Aucune police d'écriture publique** : un utilisateur ne peut pas modifier un statut ni un journal via une requête directe.

## Sécurité anti-fraude (rappel migration 0003, parrainage)
`referral_relationships` : CHECK `referrer_id <> referee_id` (anti-auto-parrainage) ;
`referral_commissions` : `unique(enrollment_id, beneficiary_id, generation)` (anti-double-crédit).

## Environnement compatible staging
1. Créer un projet Supabase de test (ou une base de préproduction).
2. Appliquer `0001`, `0002`, `0004` via le SQL Editor (section UP), en transaction, avec les SELECT de contrôle.
3. Renseigner les variables d'environnement (`EMAIL_PROVIDER=console` au départ).
4. Attribuer un rôle admin à un compte de test (`update profiles set role='admin' …`).
5. Démontrer les parcours de bout en bout.
