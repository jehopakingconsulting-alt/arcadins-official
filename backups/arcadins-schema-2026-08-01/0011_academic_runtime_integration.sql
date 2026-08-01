-- =============================================================================
-- Migration 0011 — Academic Runtime Integration (Sprint I)
-- =============================================================================
-- ⚠️ NON APPLIQUÉE. Préparée uniquement. NE PAS exécuter `db push` / `migration up`
-- avant : backup + PITR, environnement QA, dataset anonymisé, preflight, validation
-- humaine et GO explicite (voir ACADEMIC_RUNTIME_MIGRATION_PLAN.md).
--
-- Propriétés : ADDITIVE uniquement (CREATE ... IF NOT EXISTS), idempotente autant que
-- possible, compatible avec 0009 (et 0010 si présente), SANS suppression, SANS
-- renommage destructif, SANS perte de données. Ne duplique PAS les tables de 0009
-- (program_versions, modules, lessons, assessments, assessment_attempts, rubrics,
-- module_progress, learning_events, certificate_status_history, …).
--
-- Sécurité : RLS activée sur chaque table ; AUCUNE politique permissive universelle ;
-- l'étudiant ne voit que ses données ; le rôle serveur opère de façon limitée.
-- =============================================================================

begin;

-- Extension utilitaire (idempotente).
create extension if not exists pgcrypto;

-- ─────────────────────────────────────────────────────────────────────────────
-- Idempotence des commandes académiques critiques.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.academic_commands (
  command_id        text primary key,
  idempotency_key   text not null,
  command_type      text not null,
  actor_id          uuid not null,
  resource_id       text,
  payload_hash      text not null,
  status            text not null default 'received'
                     check (status in ('received','processing','succeeded','failed_retryable','failed_final','expired')),
  result_reference  text,
  retry_count       integer not null default 0,
  started_at        timestamptz not null default now(),
  completed_at      timestamptz,
  failed_at         timestamptz,
  expires_at        timestamptz not null,
  version           integer not null default 1
);
-- Unicité logique d'idempotence (empêche toute double exécution concurrente).
create unique index if not exists academic_commands_idem_key_uidx on public.academic_commands (idempotency_key);
create index if not exists academic_commands_actor_idx on public.academic_commands (actor_id);
create index if not exists academic_commands_expires_idx on public.academic_commands (expires_at);
comment on table public.academic_commands is 'Sprint I: journal d''idempotence des commandes académiques (unicité par idempotency_key). Écrit par le rôle serveur uniquement.';

create table if not exists public.academic_command_results (
  command_id        text primary key references public.academic_commands(command_id) on delete cascade,
  result_json       jsonb not null default '{}'::jsonb,
  created_at        timestamptz not null default now()
);
comment on table public.academic_command_results is 'Sprint I: résultat logique d''une commande idempotente (rejeu → même résultat).';

-- ─────────────────────────────────────────────────────────────────────────────
-- Journal d'audit académique (append-only, sans donnée sensible).
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.academic_audit_events (
  id                uuid primary key default gen_random_uuid(),
  type              text not null,
  actor_id          uuid,
  correlation_id    text not null,
  resource_id       text,
  reason_codes      text[] not null default '{}',
  metadata          jsonb not null default '{}'::jsonb,
  at                timestamptz not null default now()
);
create index if not exists academic_audit_actor_idx on public.academic_audit_events (actor_id);
create index if not exists academic_audit_type_idx on public.academic_audit_events (type);
create index if not exists academic_audit_at_idx on public.academic_audit_events (at);
comment on table public.academic_audit_events is 'Sprint I: audit immuable (jamais de bonne réponse, clé, secret, token, PII superflue).';

-- ─────────────────────────────────────────────────────────────────────────────
-- Snapshots & événements du Learning Runtime (progression, jamais de barème).
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.runtime_snapshots (
  id                uuid primary key default gen_random_uuid(),
  owner_learner_id  uuid not null,
  program_id        text not null,
  snapshot_json     jsonb not null,
  version           integer not null default 1,
  updated_at        timestamptz not null default now(),
  created_at        timestamptz not null default now()
);
create index if not exists runtime_snapshots_owner_idx on public.runtime_snapshots (owner_learner_id);
comment on table public.runtime_snapshots is 'Sprint I: snapshot de progression (aucune donnée de correction).';

create table if not exists public.runtime_events (
  id                uuid primary key default gen_random_uuid(),
  owner_learner_id  uuid not null,
  type              text not null,
  payload_json      jsonb not null default '{}'::jsonb,
  at                timestamptz not null default now()
);
create index if not exists runtime_events_owner_idx on public.runtime_events (owner_learner_id);
comment on table public.runtime_events is 'Sprint I: événements d''apprentissage (progression/temps/favori/note).';

-- ─────────────────────────────────────────────────────────────────────────────
-- Sessions runtime d'évaluation formative & d'examen (état privé serveur).
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.assessment_sessions (
  session_id        text primary key,
  owner_learner_id  uuid not null,
  program_id        text not null,
  assessment_id     text not null,
  status            text not null,
  private_state_json jsonb not null,           -- barème/questions figées : JAMAIS exposé au client
  submitted_command_id text,
  version           integer not null default 1,
  updated_at        timestamptz not null default now(),
  created_at        timestamptz not null default now()
);
create index if not exists assessment_sessions_owner_idx on public.assessment_sessions (owner_learner_id);
comment on table public.assessment_sessions is 'Sprint I: état privé d''une tentative formative (correction serveur uniquement).';

create table if not exists public.exam_runtime_sessions (
  session_id        text primary key,
  owner_learner_id  uuid not null,
  program_id        text not null,
  exam_id           text not null,
  status            text not null,
  private_state_json jsonb not null,           -- sections figées/barème : JAMAIS exposé
  official_started_at timestamptz,
  official_submitted_at timestamptz,
  version           integer not null default 1,
  updated_at        timestamptz not null default now(),
  created_at        timestamptz not null default now()
);
create index if not exists exam_runtime_sessions_owner_idx on public.exam_runtime_sessions (owner_learner_id);
comment on table public.exam_runtime_sessions is 'Sprint I: session d''examen final ; chronomètre autoritaire côté serveur.';

-- ─────────────────────────────────────────────────────────────────────────────
-- Intégrité des credentials & journal de vérification publique.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.credential_integrity_records (
  id                uuid primary key default gen_random_uuid(),
  credential_id     text not null,
  public_verification_id text not null,
  version           integer not null default 1,
  content_hash      text not null,
  hash_algorithm    text not null,
  signature_algorithm text not null,
  signature_key_id  text not null,
  signature_value   text not null,             -- signature LOGIQUE ; aucune clé privée stockée
  created_at        timestamptz not null default now()
);
create unique index if not exists credential_integrity_pub_ver_uidx on public.credential_integrity_records (public_verification_id, version);
comment on table public.credential_integrity_records is 'Sprint I: hash + signature (clé jamais stockée). Vérifiable, non falsifiable.';

create table if not exists public.public_verification_events (
  id                uuid primary key default gen_random_uuid(),
  public_verification_id text not null,
  status            text not null,
  at                timestamptz not null default now()
);
create index if not exists public_verification_pub_ver_idx on public.public_verification_events (public_verification_id);
comment on table public.public_verification_events is 'Sprint I: journal des vérifications publiques (aucune donnée personnelle).';

-- ─────────────────────────────────────────────────────────────────────────────
-- RLS : activée partout ; AUCUNE politique permissive universelle.
-- (Les politiques SELECT/INSERT/UPDATE/DELETE détaillées par rôle sont documentées
--  dans RLS_ACADEMIC_SECURITY_MATRIX.md et à créer lors de l'application réelle.)
-- ─────────────────────────────────────────────────────────────────────────────
alter table public.academic_commands enable row level security;
alter table public.academic_command_results enable row level security;
alter table public.academic_audit_events enable row level security;
alter table public.runtime_snapshots enable row level security;
alter table public.runtime_events enable row level security;
alter table public.assessment_sessions enable row level security;
alter table public.exam_runtime_sessions enable row level security;
alter table public.credential_integrity_records enable row level security;
alter table public.public_verification_events enable row level security;

-- Étudiant : lecture de SES snapshots/événements uniquement (fail-closed par défaut RLS).
-- (CREATE POLICY ne supporte pas IF NOT EXISTS : on utilise DROP IF EXISTS + CREATE pour l'idempotence.)
drop policy if exists runtime_snapshots_owner_select on public.runtime_snapshots;
create policy runtime_snapshots_owner_select on public.runtime_snapshots
  for select using (auth.uid() = owner_learner_id);
drop policy if exists runtime_events_owner_select on public.runtime_events;
create policy runtime_events_owner_select on public.runtime_events
  for select using (auth.uid() = owner_learner_id);
drop policy if exists assessment_sessions_owner_select on public.assessment_sessions;
create policy assessment_sessions_owner_select on public.assessment_sessions
  for select using (auth.uid() = owner_learner_id);
drop policy if exists exam_runtime_sessions_owner_select on public.exam_runtime_sessions;
create policy exam_runtime_sessions_owner_select on public.exam_runtime_sessions
  for select using (auth.uid() = owner_learner_id);
-- Écritures : réservées au rôle serveur (service_role), jamais au client authentifié.
-- (Politiques d'INSERT/UPDATE ciblées à créer explicitement lors de l'application ;
--  en l'absence de politique, RLS refuse — comportement fail-closed voulu.)

commit;

-- =============================================================================
-- FIN 0011. Aucune donnée existante modifiée. Aucune table supprimée/renommée.
-- Ne pas appliquer sans preflight + postflight + validation humaine + GO.
-- =============================================================================
