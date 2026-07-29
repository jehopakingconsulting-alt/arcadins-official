-- ============================================================================
-- ARCADINS — SEED QA (comptes de test) — ⚠️ À N'EXÉCUTER QUE SUR UN PROJET
-- SUPABASE DE TEST / LOCAL. NE JAMAIS EXÉCUTER SUR LA PRODUCTION.
--
-- Prérequis : migrations 0001→0007 appliquées sur la base QA (mêmes fichiers
-- que la prod). pgcrypto (extensions) présent (fourni par 0006).
--
-- Rôles réels du modèle (rbac.ts / CHECK 0002) : student, admin, tutor,
-- content_manager, finance_manager, support. ⚠️ « Super Admin » et « Manager »
-- N'EXISTENT PAS dans le modèle — non créés (règle : ne pas inventer de rôle).
--
-- Mot de passe commun de test : ArcadinsQA!2026
-- ============================================================================

do $$
declare
  v_pwd text := crypt('ArcadinsQA!2026', gen_salt('bf'));
  r record;
  v_uid uuid;
begin
  for r in
    select * from (values
      ('qa.student@arcadins.test',  'student',          'QA', 'Student'),
      ('qa.tutor@arcadins.test',    'tutor',            'QA', 'Tutor'),
      ('qa.support@arcadins.test',  'support',          'QA', 'Support'),
      ('qa.finance@arcadins.test',  'finance_manager',  'QA', 'Finance'),
      ('qa.content@arcadins.test',  'content_manager',  'QA', 'Content'),
      ('qa.admin@arcadins.test',    'admin',            'QA', 'Admin')
    ) as t(email, role, first_name, last_name)
  loop
    select id into v_uid from auth.users where lower(email) = r.email;
    if v_uid is null then
      v_uid := gen_random_uuid();
      insert into auth.users (
        instance_id, id, aud, role, email, encrypted_password,
        email_confirmed_at, created_at, updated_at,
        raw_app_meta_data, raw_user_meta_data, is_sso_user, is_anonymous
      ) values (
        '00000000-0000-0000-0000-000000000000', v_uid, 'authenticated', 'authenticated',
        r.email, v_pwd, now(), now(), now(),
        jsonb_build_object('provider','email','providers',jsonb_build_array('email')),
        jsonb_build_object('first_name', r.first_name, 'last_name', r.last_name, 'qa', true),
        false, false
      );
      insert into auth.identities (id, provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
      values (gen_random_uuid(), v_uid, v_uid,
              jsonb_build_object('sub', v_uid::text, 'email', r.email, 'email_verified', true),
              'email', null, now(), now());
    end if;

    insert into public.profiles (id, email, role, first_name, last_name, created_at)
    values (v_uid, r.email, r.role, r.first_name, r.last_name, now())
    on conflict (id) do update set role = excluded.role;
  end loop;
end $$;

-- Vérif : select email, role from public.profiles where email like 'qa.%@arcadins.test' order by role;
