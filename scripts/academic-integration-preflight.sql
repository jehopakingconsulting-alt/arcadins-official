-- =============================================================================
-- PREFLIGHT — Academic Runtime Integration (Sprint I)  [LECTURE SEULE]
-- =============================================================================
-- Ce script N'ÉCRIT RIEN. Il inspecte l'état de la base AVANT une éventuelle
-- application de 0011. Exécuter en QA d'abord. Aucun CREATE/ALTER/INSERT/UPDATE/DELETE.
-- =============================================================================

-- 1. Tables attendues (0009 + cibles 0011) présentes ?
select 'tables' as check, table_name, true as exists
from information_schema.tables
where table_schema = 'public'
  and table_name in (
    'program_versions','modules','lessons','assessments','assessment_attempts','rubrics','module_progress','learning_events',
    'academic_commands','academic_command_results','academic_audit_events','runtime_snapshots','runtime_events',
    'assessment_sessions','exam_runtime_sessions','credential_integrity_records','public_verification_events'
  )
order by table_name;

-- 2. Colonnes des tables cibles 0011 (si déjà créées).
select 'columns' as check, table_name, column_name, data_type
from information_schema.columns
where table_schema = 'public'
  and table_name in ('academic_commands','runtime_snapshots','exam_runtime_sessions','credential_integrity_records')
order by table_name, ordinal_position;

-- 3. Doublons d'idempotence potentiels (si la table existe).
select 'idempotency_duplicates' as check, idempotency_key, count(*)
from public.academic_commands
group by idempotency_key having count(*) > 1;

-- 4. Clés étrangères existantes sur le périmètre académique.
select 'foreign_keys' as check, tc.table_name, tc.constraint_name
from information_schema.table_constraints tc
where tc.constraint_type = 'FOREIGN KEY' and tc.table_schema = 'public'
  and tc.table_name in ('modules','lessons','assessment_attempts','module_progress')
order by tc.table_name;

-- 5. Comptes orphelins (inscriptions sans utilisateur), progression sans inscription — heuristiques.
select 'orphan_enrollments' as check, count(*) as n
from public.enrollments e
left join auth.users u on u.id = e.user_id
where u.id is null;

select 'orphan_module_progress' as check, count(*) as n
from public.module_progress mp
left join public.modules m on m.id = mp.module_id
where m.id is null;

-- 6. Cohérence des versions académiques.
select 'program_versions' as check, program_id, count(*) as versions
from public.program_versions group by program_id order by program_id;

-- 7. Fonctions, triggers, RLS et index sur le périmètre.
select 'functions' as check, routine_name from information_schema.routines
where routine_schema = 'public' and routine_name ilike 'academic%';

select 'rls_enabled' as check, relname, relrowsecurity
from pg_class where relnamespace = 'public'::regnamespace
  and relname in ('runtime_snapshots','exam_runtime_sessions','assessment_sessions','academic_commands');

select 'indexes' as check, indexname, tablename from pg_indexes
where schemaname = 'public' and tablename in ('academic_commands','runtime_snapshots','exam_runtime_sessions');

-- =============================================================================
-- FIN PREFLIGHT. Aucune écriture effectuée.
-- =============================================================================
