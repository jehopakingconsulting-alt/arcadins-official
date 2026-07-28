-- ============================================================================
-- ARCADINS — PRÉ-FLIGHT PRODUCTION (LECTURE SEULE). À exécuter dans le SQL Editor
-- du projet de PRODUCTION. N'écrit RIEN. Fournit la PREUVE de l'état des
-- migrations 0000→0007 (tables/fonctions/policies/triggers/extensions/buckets).
-- Copier la sortie de chaque bloc pour PRODUCTION_MIGRATION_AUDIT.md.
-- ============================================================================

-- 0) Journal de migrations (si géré par Supabase CLI) :
select version, name from supabase_migrations.schema_migrations order by version;
-- (Si la table n'existe pas : les migrations ont été appliquées à la main → se fier aux contrôles ci-dessous.)

-- 1) TABLES attendues par migration (présence)
select 'profiles' t, to_regclass('public.profiles') is not null present      -- 0000
union all select 'contact_requests', to_regclass('public.contact_requests') is not null
union all select 'tutoring_requests', to_regclass('public.tutoring_requests') is not null   -- 0001
union all select 'tutor_applications', to_regclass('public.tutor_applications') is not null
union all select 'referral_codes', to_regclass('public.referral_codes') is not null          -- 0003
union all select 'referral_relationships', to_regclass('public.referral_relationships') is not null
union all select 'referral_commissions', to_regclass('public.referral_commissions') is not null
union all select 'notifications', to_regclass('public.notifications') is not null            -- 0004
union all select 'notification_preferences', to_regclass('public.notification_preferences') is not null
union all select 'notification_delivery_logs', to_regclass('public.notification_delivery_logs') is not null
union all select 'application_status_history', to_regclass('public.application_status_history') is not null
union all select 'legacy_id_map', to_regclass('public.legacy_id_map') is not null            -- 0005
union all select 'legacy_learners', to_regclass('public.legacy_learners') is not null
union all select 'legacy_tests', to_regclass('public.legacy_tests') is not null
union all select 'legacy_prospects', to_regclass('public.legacy_prospects') is not null
union all select 'legacy_referrals', to_regclass('public.legacy_referrals') is not null
order by 1;

-- 2) COLONNE 0002 (expansion du CHECK role) — présence des rôles étendus
select conname, pg_get_constraintdef(oid) def
from pg_constraint where conrelid = 'public.profiles'::regclass and contype = 'c';

-- 3) FONCTIONS RPC (0005/0006/0007)
select proname from pg_proc
where proname in ('link_legacy_tests_on_signup','migrate_import_account','migrate_lookup',
  'migrate_validation_report','migrate_validation_user','migrate_rollback','migrate_rollback_user',
  'handle_new_user') order by 1;

-- 4) TRIGGERS
select tgname from pg_trigger
where tgname in ('on_auth_user_created','on_auth_user_created_link_tests') order by 1;

-- 5) EXTENSIONS (0006 pgcrypto)
select extname from pg_extension where extname = 'pgcrypto';

-- 6) POLICIES RLS (échantillon par table sensible)
select schemaname, tablename, policyname from pg_policies
where tablename in ('profiles','contact_requests','tutoring_requests','tutor_applications',
  'legacy_id_map','legacy_certificates') order by tablename, policyname;

-- 7) BUCKET Storage (0007)
select id, public from storage.buckets where id = 'legacy-certificates';

-- 8) RLS activée sur les tables sensibles
select relname, relrowsecurity from pg_class
where relname in ('profiles','contact_requests','tutoring_requests','legacy_id_map') order by 1;
