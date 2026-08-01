-- ============================================================================
-- ARCADINS — Réception des données de l'ANCIENNE plateforme (migration legacy)
-- Migration ADDITIVE et réversible. NE PAS appliquer en production sans
-- sauvegarde vérifiée + autorisation explicite. Ne modifie AUCUNE table
-- existante : toutes les données legacy vont dans des tables dédiées `legacy_*`.
-- Voir ARCADINS_LEGACY_DATA_MAPPING.md.
-- ============================================================================

-- =========================== UP =============================================

-- Correspondance d'identifiants (réservée à la migration).
create table if not exists public.legacy_id_map (
  entity     text not null,                 -- 'user' | 'test' | 'module' | 'certificate' | ...
  legacy_id  bigint not null,
  new_id     uuid,
  created_at timestamptz not null default now(),
  primary key (entity, legacy_id)
);

-- Données pédagogiques riches d'un apprenant (1:1 avec profiles/auth.users).
create table if not exists public.legacy_learners (
  user_id                 uuid primary key references auth.users(id) on delete cascade,
  legacy_id               bigint unique,
  plan                    text,
  legacy_status           text,             -- trial | active | ...
  country                 text,
  phone                   text,
  phone_normalized        text,
  trial_done              boolean default false,
  trial_score             numeric,
  qualification_done      boolean default false,
  qualification_score     numeric,
  qualification_level     text,
  qualification_started_at timestamptz,
  final_test_done         boolean default false,
  final_test_score        numeric,
  final_test_passed       boolean default false,
  final_test_started_at   timestamptz,
  modules_progress        jsonb default '{}'::jsonb,
  current_module          int default 1,
  all_modules_done        boolean default false,
  certificate_id          text,
  certificate_generated_at timestamptz,
  access_expires_at       timestamptz,
  referral_code           text,
  is_tuteur_candidat      boolean default false,
  tuteur_application       jsonb,
  tuteur_status           text,
  tuteur_current_module   int,
  tuteur_all_modules_done boolean default false,
  tuteur_test_done        boolean default false,
  tuteur_test_score       numeric,
  tuteur_test_passed      boolean default false,
  moderator_permissions   jsonb,
  signup_ip               text,
  last_login_at           timestamptz,
  last_login_ip           text,
  last_login_device       text,
  created_at              timestamptz not null default now()
);

-- legacy_tests couvre TOUS les tests (comptes ET prospects) — aucune perte.
-- Un test appartient soit à un compte (user_id), soit à un prospect (prospect_id).
-- Pour les prospects : conversion auto vers un futur compte via l'email (converted).
create table if not exists public.legacy_tests (
  legacy_test_id bigint primary key,           -- id source (tests.id) — idempotent
  user_id        uuid references auth.users(id) on delete set null,        -- si compte
  prospect_id    uuid,   -- FK vers legacy_prospects ajoutée plus bas (ALTER) : évite la
                         -- référence en avant (legacy_prospects est créée après cette table)
  email          text,                          -- email normalisé (clé de rattachement futur)
  test_type      text,
  score          numeric,
  passed         boolean default false,
  attempt_number int default 1,
  langue         text,
  answers        jsonb default '[]'::jsonb,
  date           timestamptz,                   -- date historique du test (source)
  converted      boolean not null default false,-- le prospect est-il devenu un compte ?
  converted_at   timestamptz,
  imported_at    timestamptz not null default now(),
  check (user_id is not null or prospect_id is not null or email is not null)
);
create index if not exists legacy_tests_user_idx     on public.legacy_tests(user_id);
create index if not exists legacy_tests_prospect_idx on public.legacy_tests(prospect_id);
create index if not exists legacy_tests_email_idx    on public.legacy_tests(lower(email));

-- Rattachement automatique : quand un prospect (avec des legacy_tests) devient un
-- compte (même email), on lie ses tests et on marque converted.
create or replace function public.link_legacy_tests_on_signup()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  update public.legacy_tests
     set user_id = new.id, converted = true, converted_at = now()
   where user_id is null
     and email is not null
     and lower(email) = lower(new.email);
  return new;
end;
$$;
drop trigger if exists on_auth_user_created_link_tests on auth.users;
create trigger on_auth_user_created_link_tests
  after insert on auth.users
  for each row execute function public.link_legacy_tests_on_signup();

create table if not exists public.legacy_modules (
  id                   uuid primary key default gen_random_uuid(),
  legacy_id            bigint,
  user_id              uuid references auth.users(id) on delete cascade,
  track                text not null default 'learner' check (track in ('learner','tuteur')),
  module_number        int not null,
  status               text,
  started_at           timestamptz,
  completed_at         timestamptz,
  score                numeric,
  test_score           numeric,
  test_passed          boolean default false,
  test_attempts        int default 0,
  test_last_attempt_at timestamptz,
  unique (user_id, track, module_number)
);

create table if not exists public.legacy_certificates (
  id                 uuid primary key default gen_random_uuid(),
  legacy_id          bigint unique,
  user_id            uuid references auth.users(id) on delete set null,
  certificate_number text unique not null,
  nom                text,
  prenom             text,
  programme          text,
  score              numeric,
  issued_at          timestamptz,
  storage_path       text            -- objet dans le bucket privé legacy-certificates
);

create table if not exists public.legacy_payments (
  id                uuid primary key default gen_random_uuid(),
  legacy_id         bigint,
  user_id           uuid references auth.users(id) on delete set null,
  provider          text,            -- paypal | stripe | ...
  plan              text,
  amount_cents      int,
  currency          text default 'CAD',
  status            text,            -- confirmed | pending | ...
  method            text,
  notes             text,
  stripe_session_id text,
  payment_date      timestamptz,
  source            text not null default 'legacy_import',
  created_at        timestamptz not null default now(),
  unique (user_id, legacy_id)
);

create table if not exists public.legacy_prospects (
  id         uuid primary key default gen_random_uuid(),
  legacy_id  bigint,
  origin     text not null default 'prospects' check (origin in ('prospects','user_prospect')),
  nom        text,
  prenom     text,
  email      text,
  telephone  text,
  pays       text,
  source     text,
  created_at timestamptz,
  unique (origin, legacy_id)
);
create index if not exists legacy_prospects_email_idx on public.legacy_prospects(lower(email));

-- FK différée : legacy_tests.prospect_id → legacy_prospects.id (les deux tables
-- existent désormais). Idempotent : on retire puis on (re)crée la contrainte.
alter table public.legacy_tests
  drop constraint if exists legacy_tests_prospect_id_fkey;
alter table public.legacy_tests
  add constraint legacy_tests_prospect_id_fkey
  foreign key (prospect_id) references public.legacy_prospects(id) on delete set null;

-- Parrainage : relations (referred_by) ET commissions d'affiliation.
create table if not exists public.legacy_referrals (
  id                     uuid primary key default gen_random_uuid(),
  legacy_id              bigint,
  kind                   text not null check (kind in ('relationship','commission')),
  referrer_legacy_id     bigint,
  referee_legacy_id      bigint,
  referrer_id            uuid references auth.users(id) on delete set null,
  referee_id             uuid references auth.users(id) on delete set null,
  generation             int default 1,
  plan                   text,
  commission_amount_cents int default 0,
  currency               text default 'CAD',
  status                 text,
  created_at             timestamptz,
  paid_at                timestamptz,
  source                 text not null default 'legacy_import',
  unique (kind, legacy_id)
);
create index if not exists legacy_referrals_referrer_idx on public.legacy_referrals(referrer_legacy_id);

create table if not exists public.legacy_admin_settings (
  key   text primary key,
  value text
);

create table if not exists public.legacy_audit_log (
  id              uuid primary key default gen_random_uuid(),
  legacy_id       bigint unique,
  admin_legacy_id bigint,
  action          text,
  target_legacy_id bigint,
  details         jsonb,
  ip              text,
  created_at      timestamptz
);

-- ── RLS : lecture réservée aux administrateurs ; écritures via service role ──
do $$
declare t text;
begin
  foreach t in array array[
    'legacy_id_map','legacy_learners','legacy_tests','legacy_modules',
    'legacy_certificates','legacy_payments','legacy_prospects',
    'legacy_referrals','legacy_admin_settings','legacy_audit_log'
  ] loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('drop policy if exists %I_admin_read on public.%I;', t, t);
    execute format($p$create policy %I_admin_read on public.%I for select
      using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));$p$, t, t);
  end loop;
end $$;

-- ========================= FIN UP ===========================================

-- ============================================================================
-- ROLLBACK (DOWN) — destructif. À n'exécuter qu'après sauvegarde + décision.
-- ----------------------------------------------------------------------------
-- drop table if exists public.legacy_audit_log, public.legacy_admin_settings,
--   public.legacy_prospects, public.legacy_payments, public.legacy_certificates,
--   public.legacy_modules, public.legacy_tests, public.legacy_learners,
--   public.legacy_referrals, public.legacy_id_map cascade;
-- ============================================================================
