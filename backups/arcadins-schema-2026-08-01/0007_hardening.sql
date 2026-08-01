-- ============================================================================
-- ARCADINS — DURCISSEMENT ENTERPRISE (suite audit RC1_INDEPENDENT_FINAL_AUDIT).
-- Migration ADDITIVE et idempotente. Ne modifie ni ne casse 0005/0006 (déjà
-- appliquées) : redéfinit une fonction via CREATE OR REPLACE (réversible) et
-- durcit les privilèges + le Storage. À appliquer sur staging PUIS prod.
-- Corrige : A2 (moindre privilège RPC), A3 (collision e-mail), A6 (Storage).
-- ============================================================================

-- =========================== UP =============================================

-- ── A2) Moindre privilège sur TOUTES les RPC de migration ────────────────────
-- SECURITY DEFINER contourne la RLS : seules les exécutions via service_role
-- (côté serveur admin / CLI) sont légitimes. On révoque à public/anon/authenticated
-- et on (ré)accorde explicitement à service_role.
revoke all on function public.migrate_import_account(jsonb)          from public, anon, authenticated;
revoke all on function public.migrate_lookup(text, bigint)           from public, anon, authenticated;
revoke all on function public.migrate_validation_report()            from public, anon, authenticated;
revoke all on function public.migrate_validation_user(bigint)        from public, anon, authenticated;
revoke all on function public.migrate_rollback(boolean)              from public, anon, authenticated;
revoke all on function public.migrate_rollback_user(bigint, boolean) from public, anon, authenticated;

grant execute on function public.migrate_import_account(jsonb)          to service_role;
grant execute on function public.migrate_lookup(text, bigint)           to service_role;
grant execute on function public.migrate_validation_report()            to service_role;
grant execute on function public.migrate_validation_user(bigint)        to service_role;
grant execute on function public.migrate_rollback(boolean)              to service_role;
grant execute on function public.migrate_rollback_user(bigint, boolean) to service_role;

-- ── A3) Collision e-mail : NE JAMAIS écraser rôle / métadonnées d'un compte ──
-- Redéfinition idempotente : sur conflit (compte existant), on ne touche PAS au
-- rôle, ni au mot de passe, ni aux métadonnées ; on ne remplit les noms que s'ils
-- sont vides. La décision de fusion se prend au pré-flight (preflight-collisions).
create or replace function public.migrate_import_account(payload jsonb)
returns uuid
language plpgsql
security definer
set search_path = public, auth, extensions
as $$
declare
  v_email      text := lower(trim(payload->>'email'));
  v_legacy_id  bigint := (payload->>'legacy_id')::bigint;
  v_uid        uuid;
  v_created    timestamptz := coalesce((payload->>'created_at')::timestamptz, now());
  v_role       text := coalesce(payload->>'role', 'student');
  v_pwd        text := payload->>'encrypted_password';
  v_existing   boolean := false;
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

  select id into v_uid from auth.users where lower(email) = v_email limit 1;
  v_existing := v_uid is not null;

  if not v_existing then
    v_uid := gen_random_uuid();
    insert into auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, created_at, updated_at,
      raw_app_meta_data, raw_user_meta_data, is_sso_user, is_anonymous
    ) values (
      '00000000-0000-0000-0000-000000000000', v_uid, 'authenticated', 'authenticated',
      v_email,
      coalesce(v_pwd, crypt(gen_random_uuid()::text, gen_salt('bf'))),
      v_created, v_created, now(),
      jsonb_build_object('provider','email','providers', jsonb_build_array('email'),'migrated',true),
      v_meta, false, false
    );
    insert into auth.identities (
      id, provider_id, user_id, identity_data, provider,
      last_sign_in_at, created_at, updated_at
    ) values (
      gen_random_uuid(), v_uid, v_uid,
      jsonb_build_object('sub', v_uid::text, 'email', v_email, 'email_verified', true),
      'email', null, v_created, now()
    );
  end if;

  -- Profil : rôle posé UNIQUEMENT à la création ; sur compte existant, on ne
  -- modifie NI le rôle NI les métadonnées, on ne comble que des noms vides.
  insert into public.profiles (id, email, role, first_name, last_name, created_at)
  values (v_uid, v_email, v_role,
          coalesce(payload->>'first_name',''), coalesce(payload->>'last_name',''), v_created)
  on conflict (id) do update
    set first_name = coalesce(nullif(public.profiles.first_name,''), excluded.first_name),
        last_name  = coalesce(nullif(public.profiles.last_name,''),  excluded.last_name);
        -- NOTE: 'role' volontairement ABSENT → jamais d'élévation via import.

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

  insert into public.legacy_id_map (entity, legacy_id, new_id)
  values ('user', v_legacy_id, v_uid)
  on conflict (entity, legacy_id) do update set new_id = excluded.new_id;

  return v_uid;
end;
$$;
revoke all on function public.migrate_import_account(jsonb) from public, anon, authenticated;
grant execute on function public.migrate_import_account(jsonb) to service_role;

-- ── A6) Storage : bucket PRIVÉ des certificats legacy + RLS admin-read ────────
-- Création idempotente, forcé privé. Écritures via service role (bypass RLS) ;
-- lecture via URL signée expirante (voir src/lib/storage/certificates.ts).
insert into storage.buckets (id, name, public)
values ('legacy-certificates', 'legacy-certificates', false)
on conflict (id) do update set public = false;

drop policy if exists legacy_certificates_admin_read on storage.objects;
create policy legacy_certificates_admin_read on storage.objects for select
  using (
    bucket_id = 'legacy-certificates'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ========================= FIN UP ===========================================

-- ============================================================================
-- ROLLBACK (DOWN) — réversible :
-- ----------------------------------------------------------------------------
-- drop policy if exists legacy_certificates_admin_read on storage.objects;
-- delete from storage.buckets where id = 'legacy-certificates';   -- si vide
-- -- Restaurer la version 0006 de migrate_import_account en ré-exécutant 0006.
-- -- Les grants/revokes A2 sont conservables (durcissement).
-- ============================================================================
