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
set search_path = public, auth
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
  if payload ? 'learner' and jsonb_typeof(payload->'learner') = 'object' then
    insert into public.legacy_learners
      select v_uid as user_id, x.*
      from jsonb_populate_record(null::public.legacy_learners, payload->'learner') x
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
      'affiliation',   (select count(*) from public.legacy_id_map where entity = 'commission'),
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
