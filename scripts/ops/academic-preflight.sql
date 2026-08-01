-- ARCADINS — Préflight AVANT migration 0009 (lecture seule). À exécuter dans le
-- SQL Editor de la base cible. Confirme l'état AVANT (tables cibles absentes,
-- colonnes additives absentes). N'écrit rien.

select 'tables_cibles_presentes' k,
       coalesce(string_agg(relname, ', ' order by relname), '(aucune — attendu)') v
  from pg_class
 where relkind = 'r'
   and relname in ('program_versions','modules','lessons','assessments','assessment_questions',
                   'assessment_attempts','rubrics','assignments','submissions','module_progress',
                   'cohorts','tutor_assignments','learning_events','content_translations',
                   'certificate_status_history')
union all
select 'colonnes_additives_deja_la',
       coalesce(string_agg(table_name || '.' || column_name, ', '), '(aucune — attendu)')
  from information_schema.columns
 where (table_name='enrollments'   and column_name in ('program_version_id','cohort_id'))
    or (table_name='lesson_progress' and column_name in ('program_version_id','score','state'))
    or (table_name='certificates'  and column_name in ('program_version_id','version_label','status','hours','issuing_authority'))
union all
-- Sécurité : confirmer qu'on ne va PAS toucher aux données existantes.
select 'compte_enrollments', count(*)::text from public.enrollments
union all
select 'compte_lesson_progress', count(*)::text from public.lesson_progress
union all
select 'compte_certificates', count(*)::text from public.certificates;
