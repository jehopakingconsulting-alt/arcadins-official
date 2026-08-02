-- ============================================================================
-- ARCADINS — COMMERCE SELF-SERVICE des Programmes officiels (TEF & TCF Canada).
--
-- ⚠️ PRÉPARÉE, NON APPLIQUÉE. Migration ADDITIVE, idempotente, transactionnelle.
-- STAGING d'abord, puis PROD sous SAUVEGARDE + AUTORISATION EXPLICITE.
--
-- Choix de conception : surface DÉDIÉE `program_*` (self-contained) pour éviter toute
-- collision avec la table `enrollments` héritée (System 1 : formations/abonnements,
-- colonnes plan/installments_paid/…). Aucune donnée existante n'est modifiée. Une
-- réconciliation ultérieure vers un modèle unifié reste possible (documentée).
--
-- Encode les règles CONFIRMÉES (2026-08-02) : USD, frais d'inscription $100 UNIQUE &
-- GLOBAL (une fois par étudiant, tous programmes), paiement intégral (pas d'échelonnement).
-- ============================================================================

begin;
create extension if not exists pgcrypto with schema extensions;

-- ── Session d'inscription reprise (le formulaire N'ACCORDE PAS l'accès) ──────
-- La donnée personnelle du formulaire est stockée ICI (serveur), jamais dans l'URL.
create table if not exists public.enrollment_sessions (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid references auth.users(id) on delete set null,  -- lié après auth
  program_code   text not null,
  package_choice text not null default 'later'
                   check (package_choice in ('starter','essential','premium','vip','later')),
  profile        jsonb not null default '{}'::jsonb,                  -- nom/email/pays/objectif/niveau…
  status         text not null default 'started'
                   check (status in ('started','package_selected','checkout','completed','abandoned')),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index if not exists enrollment_sessions_user_idx on public.enrollment_sessions(user_id);

-- ── Frais d'inscription GLOBAL (une seule fois par étudiant, tous programmes) ─
create table if not exists public.registration_fee_payments (
  user_id           uuid primary key references auth.users(id) on delete cascade,
  amount_cents      int  not null default 10000,
  currency          text not null default 'usd',
  stripe_session_id text,
  paid_at           timestamptz not null default now()
);

-- ── Inscription + entitlement des Programmes officiels (TEF/TCF) ─────────────
-- UNE inscription par (user, program_code) → idempotence stricte (pas de doublon).
create table if not exists public.program_enrollments (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references auth.users(id) on delete cascade,
  program_code       text not null,                    -- 'tef-canada' | 'tcf-canada'
  package_key        text not null check (package_key in ('starter','essential','premium','vip')),
  offer_amount_cents int  not null check (offer_amount_cents >= 0),
  currency           text not null default 'usd',
  entitlement        jsonb not null default '{}'::jsonb, -- snapshot composé figé (composeEntitlements)
  status             text not null default 'active'
                       check (status in ('active','suspended','expired','refunded')),
  access_starts_at   timestamptz not null default now(),
  access_expires_at  timestamptz,                        -- null = à vie (non utilisé au lancement)
  stripe_session_id  text,
  order_reference    text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  unique (user_id, program_code)
);
create index if not exists program_enrollments_user_idx on public.program_enrollments(user_id);

-- ── Idempotence webhook : un événement Stripe traité une seule fois ──────────
create table if not exists public.program_purchase_events (
  stripe_event_id text primary key,
  event_type      text not null,
  processed_at    timestamptz not null default now()
);

-- ────────────────────────────────── RLS ─────────────────────────────────────
alter table public.enrollment_sessions        enable row level security;
alter table public.registration_fee_payments  enable row level security;
alter table public.program_enrollments        enable row level security;
alter table public.program_purchase_events    enable row level security;

-- L'étudiant lit uniquement SES lignes. Écritures = service role (checkout/webhook serveur).
drop policy if exists enrollment_sessions_self_read on public.enrollment_sessions;
create policy enrollment_sessions_self_read on public.enrollment_sessions
  for select using (user_id = auth.uid());

drop policy if exists registration_fee_self_read on public.registration_fee_payments;
create policy registration_fee_self_read on public.registration_fee_payments
  for select using (user_id = auth.uid());

drop policy if exists program_enrollments_self_read on public.program_enrollments;
create policy program_enrollments_self_read on public.program_enrollments
  for select using (user_id = auth.uid());

-- program_purchase_events : aucune lecture publique (service role uniquement).

commit;

-- ============================================================================
-- ROLLBACK (DOWN) — sur GO explicite :
--   drop table if exists public.program_purchase_events,
--     public.program_enrollments, public.registration_fee_payments,
--     public.enrollment_sessions cascade;
-- ============================================================================
