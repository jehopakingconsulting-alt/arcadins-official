-- ============================================================================
-- ARCADINS STAGING — APPLICATION PILOTE (projet arcadins-staging UNIQUEMENT)
-- Base vierge -> applique dans l'ordre : 0000 (profiles) + 0005 + 0006.
-- NE JAMAIS EXECUTER EN PRODUCTION. Genere le 2026-07-28.
-- ============================================================================

-- >>>>>>>>>>>>>>>>>>>>>> 0000_staging_base.sql <<<<<<<<<<<<<<<<<<<<<<
-- ============================================================================
-- ARCADINS — AMORÇAGE STAGING UNIQUEMENT.
-- ⚠️ NE PAS EXÉCUTER EN PRODUCTION : la production possède déjà `profiles`,
-- son déclencheur d'inscription et les tables métier. Ce script recrée le
-- MINIMUM nécessaire sur un projet Supabase de TEST vierge pour valider la
-- phase « tutorat / tuteur / notifications ». À exécuter AVANT 0001/0002/0004.
-- ============================================================================

-- ── profiles (minimal) ──────────────────────────────────────────────────────
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text,
  first_name text,
  last_name  text,
  role       text not null default 'student',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists profiles_self_read on public.profiles;
create policy profiles_self_read on public.profiles for select using (id = auth.uid());

drop policy if exists profiles_self_update on public.profiles;
create policy profiles_self_update on public.profiles for update using (id = auth.uid());

-- Crée automatiquement un profil à chaque inscription (comme en production).
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, first_name, last_name)
  values (new.id, new.email,
          new.raw_user_meta_data->>'first_name',
          new.raw_user_meta_data->>'last_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── contact_requests (utilisée par la page admin « Contacts ») ──────────────
create table if not exists public.contact_requests (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text,
  last_name  text,
  email      text,
  country    text,
  interest   text,
  message    text
);
alter table public.contact_requests enable row level security;
-- Lecture admin ; écritures via service role.
drop policy if exists contact_requests_admin_read on public.contact_requests;
create policy contact_requests_admin_read on public.contact_requests for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Fin de l'amorçage staging.
-- ROLLBACK (test uniquement) :
--   drop trigger if exists on_auth_user_created on auth.users;
--   drop function if exists public.handle_new_user();
--   drop table if exists public.contact_requests;
--   drop table if exists public.profiles;

-- >>>>>>>>>>>>>>>>>>>>>> 0005_legacy_import.sql <<<<<<<<<<<<<<<<<<<<<<
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

-- >>>>>>>>>>>>>>>>>>>>>> 0006_migration_rpcs.sql <<<<<<<<<<<<<<<<<<<<<<
-- ============================================================================
-- ARCADINS — RPC transactionnelles de MIGRATION (legacy → Supabase).
-- Migration ADDITIVE. NE PAS appliquer en production sans sauvegarde vérifiée
-- + autorisation explicite. Dépend de 0005_legacy_import.sql (tables legacy_*).
--
-- Objectif : rendre CHAQUE import d'un compte ATOMIQUE (auth.users + identities
-- + profiles + legacy_learners + legacy_id_map dans une seule fonction =
-- une seule transaction). Idempotent : ré-exécutable sans doublon.
--
-- ⚠️  Ces fonctions écrivent dans le schéma `auth`. Elles DOIVENT être testées
--     sur un projet STAGING (test de connexion bcrypt réel) AVANT toute prod.
-- ============================================================================

-- =========================== UP =============================================

-- pgcrypto fournit crypt()/gen_salt() (repli mot de passe). Sur Supabase il est
-- déjà présent dans le schéma `extensions` ; cette ligne est un no-op idempotent.
create extension if not exists pgcrypto with schema extensions;

-- ── 1) Création/di-idempotente d'un compte réel + données pédagogiques ───────
-- payload attendu (jsonb) :
-- {
--   "legacy_id": 2,
--   "email": "x@y.com",
--   "encrypted_password": "$2a$10$....",   -- hash bcrypt DÉJÀ calculé (source)
--   "role": "student",
--   "first_name": "...", "last_name": "...", "country": "...",
--   "created_at": "2026-06-05T10:00:00Z",
--   "learner": { ...colonnes legacy_learners... }   -- optionnel
-- }
-- Retour : uuid du compte (existant ou nouvellement créé).
create or replace function public.migrate_import_account(payload jsonb)
returns uuid
language plpgsql
security definer
-- `extensions` inclus pour résoudre crypt()/gen_salt() (pgcrypto) dans le repli.
set search_path = public, auth, extensions
as $$
declare
  v_email      text := lower(trim(payload->>'email'));
  v_legacy_id  bigint := (payload->>'legacy_id')::bigint;
  v_uid        uuid;
  v_created    timestamptz := coalesce((payload->>'created_at')::timestamptz, now());
  v_role       text := coalesce(payload->>'role', 'student');
  v_pwd        text := payload->>'encrypted_password';
  v_meta       jsonb := jsonb_build_object(
                  'first_name', coalesce(payload->>'first_name',''),
                  'last_name',  coalesce(payload->>'last_name',''),
                  'country',    payload->>'country',
                  'legacy_id',  v_legacy_id,
                  'migrated',   true
                );
begin
  if v_email is null or v_email = '' then
    raise exception 'migrate_import_account: email manquant (legacy_id=%)', v_legacy_id;
  end if;

  -- Idempotence : compte déjà présent (par email) → on récupère son id.
  select id into v_uid from auth.users where lower(email) = v_email limit 1;

  if v_uid is null then
    v_uid := gen_random_uuid();
    insert into auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, created_at, updated_at,
      raw_app_meta_data, raw_user_meta_data, is_sso_user, is_anonymous
    ) values (
      '00000000-0000-0000-0000-000000000000', v_uid, 'authenticated', 'authenticated',
      v_email,
      -- si pas de hash bcrypt fourni → mot de passe inutilisable (reset requis)
      coalesce(v_pwd, crypt(gen_random_uuid()::text, gen_salt('bf'))),
      v_created, v_created, now(),
      jsonb_build_object('provider','email','providers', jsonb_build_array('email'),'migrated',true),
      v_meta, false, false
    );

    -- Identité e-mail (obligatoire pour la connexion par mot de passe).
    insert into auth.identities (
      id, provider_id, user_id, identity_data, provider,
      last_sign_in_at, created_at, updated_at
    ) values (
      gen_random_uuid(), v_uid, v_uid,
      jsonb_build_object('sub', v_uid::text, 'email', v_email, 'email_verified', true),
      'email', null, v_created, now()
    );
  else
    -- Compte existant : on NE touche PAS au mot de passe ni à l'email (sécurité).
    null;
  end if;

  -- Profil applicatif (upsert idempotent).
  insert into public.profiles (id, email, role, first_name, last_name, created_at)
  values (v_uid, v_email, v_role,
          coalesce(payload->>'first_name',''), coalesce(payload->>'last_name',''), v_created)
  on conflict (id) do update
    set role = excluded.role,
        first_name = coalesce(nullif(excluded.first_name,''), public.profiles.first_name),
        last_name  = coalesce(nullif(excluded.last_name,''),  public.profiles.last_name);

  -- Données pédagogiques riches (si fournies), upsert idempotent sur user_id.
  -- On fusionne user_id = v_uid DANS le jsonb, puis jsonb_populate_record produit
  -- exactement les colonnes de legacy_learners (aucune valeur en trop).
  if payload ? 'learner' and jsonb_typeof(payload->'learner') = 'object' then
    insert into public.legacy_learners
      select r.*
      from jsonb_populate_record(
             null::public.legacy_learners,
             (payload->'learner') || jsonb_build_object('user_id', v_uid::text)
           ) r
    on conflict (user_id) do update set
      legacy_id = excluded.legacy_id, plan = excluded.plan, legacy_status = excluded.legacy_status,
      country = excluded.country, phone = excluded.phone, phone_normalized = excluded.phone_normalized,
      modules_progress = excluded.modules_progress, current_module = excluded.current_module,
      all_modules_done = excluded.all_modules_done, referral_code = excluded.referral_code;
  end if;

  -- Correspondance d'identifiants (idempotent).
  insert into public.legacy_id_map (entity, legacy_id, new_id)
  values ('user', v_legacy_id, v_uid)
  on conflict (entity, legacy_id) do update set new_id = excluded.new_id;

  return v_uid;
end;
$$;

-- ── 2) Résolution d'un new_id à partir d'un legacy_id (helper import) ─────────
create or replace function public.migrate_lookup(p_entity text, p_legacy_id bigint)
returns uuid
language sql stable security definer set search_path = public as $$
  select new_id from public.legacy_id_map where entity = p_entity and legacy_id = p_legacy_id;
$$;

-- ── 3) Validation de la migration (comptages + intégrité) → jsonb ────────────
-- Utilisée par l'écran « Migration Validator » de l'admin. LECTURE SEULE.
create or replace function public.migrate_validation_report()
returns jsonb
language sql stable security definer set search_path = public, auth as $$
  select jsonb_build_object(
    'generated_at', now(),
    'counts', jsonb_build_object(
      'comptes',       (select count(*) from public.legacy_id_map where entity = 'user'),
      'prospects',     (select count(*) from public.legacy_prospects),
      'paiements',     (select count(*) from public.legacy_payments),
      'progression',   (select count(*) from public.legacy_modules),
      'certificats',   (select count(*) from public.legacy_certificates),
      'journaux',      (select count(*) from public.legacy_audit_log),
      'tests',         (select count(*) from public.legacy_tests),
      'affiliation',   (select count(*) from public.legacy_referrals),
      'reglages',      (select count(*) from public.legacy_admin_settings)
    ),
    'integrity', jsonb_build_object(
      -- Aucun test « orphelin » (ni compte ni prospect ni email).
      'tests_orphelins', (select count(*) from public.legacy_tests
                          where user_id is null and prospect_id is null and email is null),
      -- Aucun certificat avec numéro dupliqué (garanti par contrainte unique, vérif défensive).
      'certificats_dupliques', (select count(*) - count(distinct certificate_number)
                                from public.legacy_certificates),
      -- Chaque compte mappé pointe vers un auth.users existant (FK vérifiée).
      'mappings_casses', (select count(*) from public.legacy_id_map m
                          where m.entity = 'user'
                            and not exists (select 1 from auth.users u where u.id = m.new_id))
    )
  );
$$;

-- ── 4) Rollback ATOMIQUE de la migration (vide les tables legacy_*) ──────────
-- p_purge_auth = true → supprime AUSSI les comptes auth créés par la migration
-- (uniquement ceux référencés dans legacy_id_map, entity='user'). Destructif.
create or replace function public.migrate_rollback(p_purge_auth boolean default false)
returns jsonb
language plpgsql security definer set search_path = public, auth as $$
declare v_accounts int := 0;
begin
  if p_purge_auth then
    with del as (
      delete from auth.users u
      using public.legacy_id_map m
      where m.entity = 'user' and m.new_id = u.id
      returning u.id
    ) select count(*) into v_accounts from del;
  end if;

  -- Ordre indifférent : CASCADE gère les FK. Tables 100% données de migration.
  truncate table
    public.legacy_tests, public.legacy_modules, public.legacy_certificates,
    public.legacy_payments, public.legacy_referrals, public.legacy_learners,
    public.legacy_prospects, public.legacy_admin_settings,
    public.legacy_audit_log, public.legacy_id_map
  restart identity cascade;

  return jsonb_build_object('purged_accounts', v_accounts, 'legacy_tables_truncated', true, 'at', now());
end;
$$;
revoke all on function public.migrate_rollback(boolean) from public, anon, authenticated;

-- ── 4bis) Rollback d'UN SEUL utilisateur (mode pilote) ───────────────────────
-- Supprime uniquement les données legacy rattachées à ce compte + son mapping.
-- p_purge_auth = true → supprime aussi le compte auth (et son profil par cascade).
create or replace function public.migrate_rollback_user(p_legacy_id bigint, p_purge_auth boolean default false)
returns jsonb
language plpgsql security definer set search_path = public, auth as $$
declare v_uid uuid;
begin
  select new_id into v_uid from public.legacy_id_map where entity = 'user' and legacy_id = p_legacy_id;
  if v_uid is null then
    return jsonb_build_object('found', false, 'legacy_id', p_legacy_id);
  end if;

  delete from public.legacy_tests        where user_id = v_uid;
  delete from public.legacy_modules      where user_id = v_uid;
  delete from public.legacy_certificates where user_id = v_uid;
  delete from public.legacy_payments     where user_id = v_uid;
  delete from public.legacy_referrals    where referrer_id = v_uid or referee_id = v_uid;
  delete from public.legacy_learners     where user_id = v_uid;
  delete from public.legacy_id_map       where entity = 'user' and legacy_id = p_legacy_id;

  if p_purge_auth then
    delete from auth.users where id = v_uid;  -- cascade → profiles
  end if;

  return jsonb_build_object('found', true, 'user', v_uid, 'legacy_id', p_legacy_id, 'purged_auth', p_purge_auth, 'at', now());
end;
$$;
revoke all on function public.migrate_rollback_user(bigint, boolean) from public, anon, authenticated;

-- ── 5bis) Validation d'UN SEUL utilisateur (mode pilote) — LECTURE SEULE ──────
create or replace function public.migrate_validation_user(p_legacy_id bigint)
returns jsonb
language plpgsql stable security definer set search_path = public, auth as $$
declare v_uid uuid;
begin
  select new_id into v_uid from public.legacy_id_map where entity = 'user' and legacy_id = p_legacy_id;
  return jsonb_build_object(
    'legacy_id', p_legacy_id,
    'mapped', v_uid is not null,
    'auth_exists', exists (select 1 from auth.users u where u.id = v_uid),
    'counts', jsonb_build_object(
      'comptes',     (case when v_uid is not null then 1 else 0 end),
      'paiements',   (select count(*) from public.legacy_payments     where user_id = v_uid),
      'progression', (select count(*) from public.legacy_modules      where user_id = v_uid),
      'certificats', (select count(*) from public.legacy_certificates where user_id = v_uid),
      'tests',       (select count(*) from public.legacy_tests        where user_id = v_uid),
      'affiliation', (select count(*) from public.legacy_referrals    where referrer_id = v_uid or referee_id = v_uid)
    )
  );
end;
$$;
revoke all on function public.migrate_validation_user(bigint) from anon;

-- Droits : seul le service_role appelle les fonctions d'écriture ; la validation
-- est appelée côté serveur admin (service role également). On révoque au public.
revoke all on function public.migrate_import_account(jsonb) from public, anon, authenticated;
revoke all on function public.migrate_validation_report() from anon;

-- ========================= FIN UP ===========================================

-- ============================================================================
-- ROLLBACK (DOWN) — à n'exécuter qu'après décision.
-- ----------------------------------------------------------------------------
-- drop function if exists public.migrate_import_account(jsonb);
-- drop function if exists public.migrate_lookup(text, bigint);
-- drop function if exists public.migrate_validation_report();
-- drop function if exists public.migrate_rollback(boolean);
-- drop function if exists public.migrate_rollback_user(bigint, boolean);
-- drop function if exists public.migrate_validation_user(bigint);
-- ============================================================================
