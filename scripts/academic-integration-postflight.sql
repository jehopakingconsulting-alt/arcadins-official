-- =============================================================================
-- POSTFLIGHT — Academic Runtime Integration (Sprint I)  [LECTURE SEULE]
-- =============================================================================
-- À exécuter APRÈS application de 0011 (en QA). N'ÉCRIT RIEN. Vérifie que les objets
-- ont été créés, qu'aucun objet n'a été supprimé, et que les comptes restent cohérents.
-- =============================================================================

-- 1. Objets créés par 0011 présents ?
select 'created_tables' as check, table_name
from information_schema.tables
where table_schema = 'public'
  and table_name in (
    'academic_commands','academic_command_results','academic_audit_events','runtime_snapshots','runtime_events',
    'assessment_sessions','exam_runtime_sessions','credential_integrity_records','public_verification_events'
  )
order by table_name;

-- 2. Contraintes & unicité d'idempotence.
select 'unique_indexes' as check, indexname, tablename from pg_indexes
where schemaname = 'public'
  and indexname in ('academic_commands_idem_key_uidx','credential_integrity_pub_ver_uidx');

-- 3. Index attendus.
select 'indexes' as check, indexname, tablename from pg_indexes
where schemaname = 'public'
  and tablename in ('academic_commands','runtime_snapshots','runtime_events','exam_runtime_sessions','academic_audit_events');

-- 4. Politiques RLS présentes (aucune politique permissive universelle attendue).
select 'policies' as check, schemaname, tablename, policyname, cmd
from pg_policies where schemaname = 'public'
  and tablename in ('runtime_snapshots','runtime_events','assessment_sessions','exam_runtime_sessions')
order by tablename, policyname;

-- 5. RLS activée sur toutes les nouvelles tables.
select 'rls_enabled' as check, relname, relrowsecurity
from pg_class where relnamespace = 'public'::regnamespace
  and relname in ('academic_commands','academic_audit_events','runtime_snapshots','runtime_events',
                  'assessment_sessions','exam_runtime_sessions','credential_integrity_records','public_verification_events')
order by relname;

-- 6. Aucun objet 0009 supprimé (les tables historiques doivent toujours exister).
select 'legacy_tables_present' as check, table_name
from information_schema.tables
where table_schema = 'public'
  and table_name in ('program_versions','modules','lessons','assessments','assessment_attempts','rubrics','module_progress','learning_events')
order by table_name;

-- 7. Cohérence : aucune commande d'idempotence en double.
select 'idempotency_duplicates_after' as check, idempotency_key, count(*)
from public.academic_commands group by idempotency_key having count(*) > 1;

-- =============================================================================
-- FIN POSTFLIGHT. Aucune écriture effectuée. Preuve de non-suppression via §6.
-- =============================================================================
