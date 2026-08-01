-- ============================================================================
-- ARCADINS — MODÈLE ACADÉMIQUE (LMS versionné). Migration ADDITIVE, idempotente.
-- ⚠️ PRÉPARÉE MAIS **NON APPLIQUÉE**. NE PAS exécuter en production sans :
--    backup vérifié + préflight + GO explicite (même procédure que 0001→0008).
-- Aucune donnée existante modifiée/supprimée : uniquement CREATE TABLE IF NOT
-- EXISTS + ADD COLUMN IF NOT EXISTS + policies. Écritures sensibles = service role.
-- Voir ACADEMIC_DATABASE_SCHEMA.md / RLS_ACADEMIC_SECURITY_MATRIX.md.
-- ============================================================================

-- =========================== UP =============================================
begin;

create extension if not exists pgcrypto with schema extensions;

-- ── Versionnement de programme ──────────────────────────────────────────────
create table if not exists public.program_versions (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  program_slug  text not null,
  version_label text not null,
  status        text not null default 'draft' check (status in ('draft','review','approved','published','archived')),
  passing_score int  not null default 70 check (passing_score between 0 and 100),
  weighting     jsonb not null default '{}'::jsonb,
  published_at  timestamptz,
  unique (program_slug, version_label)
);
create index if not exists program_versions_slug_idx on public.program_versions (program_slug, status);

-- ── Modules / Leçons (contenu versionné ; blocs en jsonb) ────────────────────
create table if not exists public.modules (
  id                 uuid primary key default gen_random_uuid(),
  program_version_id uuid not null references public.program_versions (id) on delete cascade,
  code               text not null,
  position           int  not null,
  title              text not null,
  week_start         int, week_end int,
  competencies       jsonb not null default '[]'::jsonb,
  objectives         jsonb not null default '[]'::jsonb,
  prerequisites      jsonb not null default '[]'::jsonb,
  status             text not null default 'draft' check (status in ('draft','review','approved','published','archived')),
  unique (program_version_id, code)
);
create index if not exists modules_version_pos_idx on public.modules (program_version_id, position);

create table if not exists public.lessons (
  id           uuid primary key default gen_random_uuid(),
  module_id    uuid not null references public.modules (id) on delete cascade,
  position     int  not null,
  week         int,
  title        text not null,
  duration_min int,
  objectives   jsonb not null default '[]'::jsonb,
  content      jsonb not null default '[]'::jsonb,   -- blocs ordonnés typés
  resources    jsonb not null default '[]'::jsonb,
  glossary     jsonb not null default '[]'::jsonb,
  status       text not null default 'draft' check (status in ('draft','review','approved','published','archived')),
  unique (module_id, position)
);
create index if not exists lessons_module_pos_idx on public.lessons (module_id, position);

-- ── Évaluations / Banque de questions / Tentatives ──────────────────────────
create table if not exists public.assessments (
  id                 uuid primary key default gen_random_uuid(),
  program_version_id uuid not null references public.program_versions (id) on delete cascade,
  scope              text not null check (scope in ('lesson','module','final','diagnostic','bank')),
  ref_key            text,
  kind               text not null check (kind in ('quiz','summative','exam')),
  config             jsonb not null default '{}'::jsonb,
  passing_score      int  not null default 70 check (passing_score between 0 and 100)
);
create index if not exists assessments_version_scope_idx on public.assessments (program_version_id, scope);

create table if not exists public.assessment_questions (
  id            uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.assessments (id) on delete cascade,
  position      int  not null,
  type          text not null default 'mcq' check (type in ('mcq','multi','open','match','order')),
  prompt        text not null,
  options       jsonb not null default '[]'::jsonb,
  correct       jsonb,           -- jamais exposé au client pendant une tentative
  explanation   text,
  points        int  not null default 1
);
create index if not exists aq_assessment_idx on public.assessment_questions (assessment_id, position);

create table if not exists public.assessment_attempts (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  user_id            uuid not null references auth.users (id) on delete cascade,
  assessment_id      uuid not null references public.assessments (id) on delete cascade,
  program_version_id uuid references public.program_versions (id) on delete set null,
  score              int, passed boolean,
  started_at         timestamptz not null default now(),
  submitted_at       timestamptz,
  answers            jsonb not null default '[]'::jsonb   -- réponses de la tentative
);
create index if not exists attempts_user_assessment_idx on public.assessment_attempts (user_id, assessment_id, created_at desc);

-- ── Rubrics / Devoirs / Soumissions ─────────────────────────────────────────
create table if not exists public.rubrics (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  criteria jsonb not null default '[]'::jsonb
);
create table if not exists public.assignments (
  id                 uuid primary key default gen_random_uuid(),
  program_version_id uuid not null references public.program_versions (id) on delete cascade,
  kind               text not null check (kind in ('practical','final_project')),
  title              text not null,
  spec               jsonb not null default '{}'::jsonb,
  rubric_id          uuid references public.rubrics (id) on delete set null
);
create table if not exists public.submissions (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  user_id       uuid not null references auth.users (id) on delete cascade,
  assignment_id uuid not null references public.assignments (id) on delete cascade,
  payload       jsonb not null default '{}'::jsonb,
  status        text not null default 'submitted' check (status in ('submitted','awaiting_review','approved','rejected')),
  grade         int,
  feedback      jsonb,
  reviewed_by   uuid references auth.users (id) on delete set null,
  reviewed_at   timestamptz,
  unique (user_id, assignment_id)
);
create index if not exists submissions_user_idx on public.submissions (user_id, assignment_id);

-- ── Progression module (leçon : via extension de lesson_progress) ────────────
create table if not exists public.module_progress (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references auth.users (id) on delete cascade,
  module_id          uuid not null references public.modules (id) on delete cascade,
  program_version_id uuid references public.program_versions (id) on delete set null,
  state              text not null default 'locked' check (state in ('locked','available','in_progress','completed','passed','failed','needs_review')),
  score              int,
  updated_at         timestamptz not null default now(),
  unique (user_id, module_id)
);

-- ── Cohortes / Affectations tuteur / Événements / Traductions ───────────────
create table if not exists public.cohorts (
  id uuid primary key default gen_random_uuid(),
  program_version_id uuid not null references public.program_versions (id) on delete cascade,
  name text not null, start_date date, created_at timestamptz not null default now()
);
create table if not exists public.tutor_assignments (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid not null references auth.users (id) on delete cascade,
  student_id uuid not null references auth.users (id) on delete cascade,
  program_version_id uuid references public.program_versions (id) on delete set null,
  cohort_id uuid references public.cohorts (id) on delete set null,
  created_at timestamptz not null default now(),
  unique (tutor_id, student_id, program_version_id)
);
create index if not exists tutor_assignments_tutor_idx on public.tutor_assignments (tutor_id);
create index if not exists tutor_assignments_student_idx on public.tutor_assignments (student_id);

create table if not exists public.learning_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid references auth.users (id) on delete cascade,
  event_type text not null,
  ref jsonb not null default '{}'::jsonb
);
create index if not exists learning_events_user_idx on public.learning_events (user_id, created_at desc);

create table if not exists public.content_translations (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('program_version','module','lesson','assessment','assignment')),
  entity_id uuid not null,
  lang text not null,
  status text not null default 'draft_ai' check (status in ('source','draft_ai','review','approved','published','archived')),
  payload jsonb not null default '{}'::jsonb,
  source_version text,
  updated_at timestamptz not null default now(),
  unique (entity_type, entity_id, lang)
);

create table if not exists public.certificate_status_history (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  certificate_id uuid not null,
  from_status text, to_status text not null, reason text,
  changed_by uuid references auth.users (id) on delete set null
);
create index if not exists cert_status_hist_idx on public.certificate_status_history (certificate_id, created_at desc);

-- ── Extensions ADDITIVES de l'existant (jamais destructif) ──────────────────
alter table public.enrollments   add column if not exists program_version_id uuid;
alter table public.enrollments   add column if not exists cohort_id uuid;
alter table public.lesson_progress add column if not exists program_version_id uuid;
alter table public.lesson_progress add column if not exists score int;
alter table public.lesson_progress add column if not exists state text;
alter table public.certificates   add column if not exists program_version_id uuid;
alter table public.certificates   add column if not exists version_label text;
alter table public.certificates   add column if not exists status text default 'valid';
alter table public.certificates   add column if not exists hours int;
alter table public.certificates   add column if not exists issuing_authority text;

-- ── RLS ──────────────────────────────────────────────────────────────────────
alter table public.program_versions enable row level security;
alter table public.modules  enable row level security;
alter table public.lessons  enable row level security;
alter table public.assessments enable row level security;
alter table public.assessment_questions enable row level security;
alter table public.assessment_attempts  enable row level security;
alter table public.rubrics enable row level security;
alter table public.assignments enable row level security;
alter table public.submissions enable row level security;
alter table public.module_progress enable row level security;
alter table public.cohorts enable row level security;
alter table public.tutor_assignments enable row level security;
alter table public.learning_events enable row level security;
alter table public.content_translations enable row level security;
alter table public.certificate_status_history enable row level security;

-- Contenu publié : lecture publique.
drop policy if exists program_versions_pub_read on public.program_versions;
create policy program_versions_pub_read on public.program_versions for select using (status = 'published');
drop policy if exists modules_pub_read on public.modules;
create policy modules_pub_read on public.modules for select using (status = 'published');
drop policy if exists lessons_pub_read on public.lessons;
create policy lessons_pub_read on public.lessons for select using (status = 'published');
drop policy if exists translations_pub_read on public.content_translations;
create policy translations_pub_read on public.content_translations for select using (status = 'published');

-- Progression / tentatives / soumissions : propriétaire uniquement (lecture).
drop policy if exists attempts_owner_read on public.assessment_attempts;
create policy attempts_owner_read on public.assessment_attempts for select using (user_id = auth.uid());
drop policy if exists submissions_owner_read on public.submissions;
create policy submissions_owner_read on public.submissions for select using (user_id = auth.uid());
drop policy if exists module_progress_owner_read on public.module_progress;
create policy module_progress_owner_read on public.module_progress for select using (user_id = auth.uid());

-- Tuteur : lecture des tentatives/soumissions de ses étudiants assignés.
drop policy if exists attempts_tutor_read on public.assessment_attempts;
create policy attempts_tutor_read on public.assessment_attempts for select using (
  exists (select 1 from public.tutor_assignments ta where ta.tutor_id = auth.uid() and ta.student_id = assessment_attempts.user_id)
);
drop policy if exists submissions_tutor_read on public.submissions;
create policy submissions_tutor_read on public.submissions for select using (
  exists (select 1 from public.tutor_assignments ta where ta.tutor_id = auth.uid() and ta.student_id = submissions.user_id)
);
drop policy if exists tutor_assignments_self_read on public.tutor_assignments;
create policy tutor_assignments_self_read on public.tutor_assignments for select using (tutor_id = auth.uid() or student_id = auth.uid());

-- NB : assessment_questions.correct n'est jamais lu côté client (aucune policy de
-- lecture publique) ; la correction se fait au serveur (service role). Les écritures
-- (contenu, corrections, événements, migrations) passent toutes par le service role.

commit;

-- ============================================================================
-- ROLLBACK (DOWN) — réversible (tables neuves) ; les colonnes additives peuvent
-- rester (nullable, sans impact) ou être retirées si la table n'a pas d'autres usages.
-- ----------------------------------------------------------------------------
-- begin;
-- drop table if exists public.certificate_status_history, public.content_translations,
--   public.learning_events, public.tutor_assignments, public.cohorts, public.module_progress,
--   public.submissions, public.assignments, public.rubrics, public.assessment_attempts,
--   public.assessment_questions, public.assessments, public.lessons, public.modules,
--   public.program_versions cascade;
-- -- (Optionnel) retrait des colonnes additives — uniquement si non utilisées :
-- -- alter table public.enrollments drop column if exists program_version_id, drop column if exists cohort_id;
-- -- alter table public.lesson_progress drop column if exists program_version_id, drop column if exists score, drop column if exists state;
-- -- alter table public.certificates drop column if exists program_version_id, drop column if exists version_label,
-- --   drop column if exists status, drop column if exists hours, drop column if exists issuing_authority;
-- commit;
-- ============================================================================
