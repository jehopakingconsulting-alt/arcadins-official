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
