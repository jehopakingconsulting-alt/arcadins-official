-- ARCADINS — Postflight APRÈS migration 0009 (lecture seule). Confirme que la
-- structure est en place ET que les données existantes sont INCHANGÉES.

select 'tables_creees (attendu 15)' k, count(*)::text v
  from pg_class where relkind='r'
   and relname in ('program_versions','modules','lessons','assessments','assessment_questions',
                   'assessment_attempts','rubrics','assignments','submissions','module_progress',
                   'cohorts','tutor_assignments','learning_events','content_translations',
                   'certificate_status_history')
union all
select 'rls_active (attendu 15=true)', count(*)::text
  from pg_class where relkind='r' and relrowsecurity
   and relname in ('program_versions','modules','lessons','assessments','assessment_questions',
                   'assessment_attempts','rubrics','assignments','submissions','module_progress',
                   'cohorts','tutor_assignments','learning_events','content_translations',
                   'certificate_status_history')
union all
select 'policies_creees', count(*)::text
  from pg_policies where tablename in ('program_versions','modules','lessons','assessment_attempts',
                                       'submissions','module_progress','tutor_assignments','content_translations')
union all
select 'colonnes_additives (attendu 10)',
       count(*)::text
  from information_schema.columns
 where (table_name='enrollments'   and column_name in ('program_version_id','cohort_id'))
    or (table_name='lesson_progress' and column_name in ('program_version_id','score','state'))
    or (table_name='certificates'  and column_name in ('program_version_id','version_label','status','hours','issuing_authority'))
union all
select 'certificates.status_defaut',
       coalesce((select column_default from information_schema.columns
                 where table_name='certificates' and column_name='status'), '(absent)')
union all
-- Preuve de non-régression : comptes inchangés vs préflight.
select 'compte_enrollments', count(*)::text from public.enrollments
union all
select 'compte_lesson_progress', count(*)::text from public.lesson_progress
union all
select 'compte_certificates', count(*)::text from public.certificates;
