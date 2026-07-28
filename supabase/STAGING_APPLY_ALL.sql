-- ARCADINS STAGING - application groupee (0000 + 0001 + 0002 + 0004 + seed).
-- A executer UNE fois dans le SQL Editor du projet arcadins-staging UNIQUEMENT.

-- ============================================================
-- FICHIER : migrations\0000_staging_base.sql
-- ============================================================
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


-- ============================================================
-- FICHIER : migrations\0001_tutoring_and_tutor_applications.sql
-- ============================================================
-- ============================================================================
-- ARCADINS — Étape 7 (Ph. 9) : Tutorat étudiant vs candidature tuteur
-- Migration ADDITIVE. Ne supprime rien. À NE PAS appliquer en production sans
-- (1) une sauvegarde vérifiée et (2) l'autorisation explicite du responsable.
--
-- Deux files de notifications SÉPARÉES :
--   • tutoring_requests   → demandes d'accompagnement émises par des ÉLÈVES
--   • tutor_applications  → candidatures de personnes souhaitant DEVENIR TUTEUR
-- Les deux tables sont indépendantes : chaque flux a son propre cycle de statut
-- et sera traité dans une file distincte du futur tableau de bord admin (Ét. 9).
-- ============================================================================

-- ── 1. Demandes de tutorat (élèves) ─────────────────────────────────────────
create table if not exists public.tutoring_requests (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  -- Lien optionnel vers un compte existant (les demandes anonymes sont permises).
  user_id       uuid references auth.users (id) on delete set null,
  first_name    text not null,
  last_name     text not null,
  email         text not null,
  phone         text,
  -- Compétences visées : sous-ensemble de
  -- {comprehension-ecrite, comprehension-orale, expression-ecrite, expression-orale}
  skills        text[] not null default '{}',
  -- Niveau visé : fondation | intermediaire | avance | superieur
  target_level  text,
  -- Niveau actuel auto-évalué (texte libre court).
  current_level text,
  -- Objectif (ex. : score CLB visé, échéance, motif d'immigration).
  goal          text,
  -- Disponibilités déclarées (texte libre).
  availability  text,
  message       text,
  -- Cycle de vie (parcours ÉLÈVE) — voir src/lib/tutoring/status.ts :
  -- submitted → under_review → contacted → scheduled → enrolled → closed | cancelled
  status        text not null default 'submitted'
                  check (status in ('submitted','under_review','contacted','scheduled','enrolled','closed','cancelled')),
  updated_at    timestamptz not null default now()
);

create index if not exists tutoring_requests_status_idx  on public.tutoring_requests (status);
create index if not exists tutoring_requests_created_idx on public.tutoring_requests (created_at desc);

-- ── 2. Candidatures « Devenir tuteur » ──────────────────────────────────────
create table if not exists public.tutor_applications (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  user_id        uuid references auth.users (id) on delete set null,
  first_name     text not null,
  last_name      text not null,
  email          text not null,
  phone          text,
  -- Compétences que le candidat peut enseigner (mêmes identifiants que ci-dessus).
  skills         text[] not null default '{}',
  -- Niveaux que le candidat peut couvrir : sous-ensemble des niveaux.
  levels         text[] not null default '{}',
  experience     text,      -- années / contexte d'enseignement
  qualifications text,      -- diplômes, certifications (déclaratif)
  motivation     text,
  -- Cycle de vie DISTINCT (parcours TUTEUR) — voir src/lib/tutor/status.ts :
  -- submitted → under_review → interview_requested → interview_scheduled →
  -- approved | rejected | suspended | archived
  status         text not null default 'submitted'
                   check (status in ('submitted','under_review','interview_requested','interview_scheduled','approved','rejected','suspended','archived')),
  updated_at     timestamptz not null default now()
);

create index if not exists tutor_applications_status_idx  on public.tutor_applications (status);
create index if not exists tutor_applications_created_idx on public.tutor_applications (created_at desc);

-- ── 3. RLS ──────────────────────────────────────────────────────────────────
-- Les insertions passent par le service role (API serveur), qui contourne RLS.
-- On active RLS et on n'ouvre la LECTURE qu'aux administrateurs. Aucune police
-- publique : aucune de ces données n'est lisible depuis le client anonyme.
alter table public.tutoring_requests  enable row level security;
alter table public.tutor_applications enable row level security;

drop policy if exists tutoring_requests_admin_read on public.tutoring_requests;
create policy tutoring_requests_admin_read
  on public.tutoring_requests for select
  using (exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

drop policy if exists tutor_applications_admin_read on public.tutor_applications;
create policy tutor_applications_admin_read
  on public.tutor_applications for select
  using (exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

-- Fin de migration 0001 (UP).

-- ============================================================================
-- ROLLBACK (DOWN) — à exécuter séparément, uniquement pour annuler cette
-- migration. Destructif : supprime les tables et LEURS DONNÉES. À n'utiliser
-- qu'après sauvegarde et décision explicite.
-- ----------------------------------------------------------------------------
-- drop policy if exists tutoring_requests_admin_read  on public.tutoring_requests;
-- drop policy if exists tutor_applications_admin_read on public.tutor_applications;
-- drop table if exists public.tutoring_requests;
-- drop table if exists public.tutor_applications;
-- ============================================================================


-- ============================================================
-- FICHIER : migrations\0002_roles_expansion.sql
-- ============================================================
-- ============================================================================
-- ARCADINS — Étape 9 (Ph. 15) : Rôles étendus & permissions
-- Migration ADDITIVE et NON DESTRUCTIVE. À NE PAS appliquer en production sans
-- (1) une sauvegarde vérifiée et (2) l'autorisation explicite du responsable.
--
-- Objectif : élargir la contrainte CHECK de profiles.role (aujourd'hui limitée
-- à 'student' | 'admin') pour couvrir les rôles opérationnels requis. Les
-- comptes existants gardent leur rôle : la nouvelle contrainte est un SUR-ENSEMBLE
-- de l'ancienne, aucune ligne existante n'est invalidée.
--
-- La cartographie rôle → permissions vit dans le code (src/lib/rbac.ts) et non
-- en base, pour rester simple à faire évoluer sans nouvelle migration.
-- ============================================================================

do $$
begin
  -- Retire l'ancienne contrainte CHECK sur profiles.role si elle existe,
  -- quel que soit son nom généré.
  if exists (
    select 1 from information_schema.table_constraints
    where table_schema = 'public'
      and table_name = 'profiles'
      and constraint_type = 'CHECK'
      and constraint_name = 'profiles_role_check'
  ) then
    alter table public.profiles drop constraint profiles_role_check;
  end if;
end $$;

-- Valeur par défaut inchangée : tout nouveau compte reste 'student'.
alter table public.profiles
  alter column role set default 'student';

-- Nouvelle contrainte, sur-ensemble de l'ancienne.
alter table public.profiles
  add constraint profiles_role_check
  check (role in (
    'student',
    'admin',
    'tutor',
    'content_manager',
    'finance_manager',
    'support'
  ));

-- Fin de migration 0002 (UP).

-- ============================================================================
-- ROLLBACK (DOWN) — restaure la contrainte d'origine (student|admin).
-- ⚠️ Échouera si des comptes portent déjà un nouveau rôle : les réaffecter à
-- 'student' au préalable. À n'exécuter qu'après sauvegarde et décision.
-- ----------------------------------------------------------------------------
-- update public.profiles set role = 'student'
--   where role not in ('student','admin');
-- alter table public.profiles drop constraint if exists profiles_role_check;
-- alter table public.profiles
--   add constraint profiles_role_check check (role in ('student','admin'));
-- ============================================================================


-- ============================================================
-- FICHIER : migrations\0004_notifications.sql
-- ============================================================
-- ============================================================================
-- ARCADINS — Phase notifications & actions admin
-- Migration ADDITIVE et réversible. NE PAS appliquer en production sans
-- sauvegarde vérifiée + autorisation explicite. Dépend de 0001 (tables tutorat)
-- et 0002 (rôles). Appliquer d'abord 0001 et 0002.
--
-- Sépare strictement les deux parcours (élève vs tuteur) via un discriminant
-- `parcours` + des clés étrangères distinctes. Journaux, notifications et
-- statuts ne se mélangent jamais.
-- ============================================================================

-- =========================== UP =============================================

-- ── 1. Historique des changements de statut (journal d'audit) ───────────────
create table if not exists public.application_status_history (
  id                   uuid primary key default gen_random_uuid(),
  created_at           timestamptz not null default now(),
  -- Discriminant de parcours : garantit des journaux distincts et interrogeables.
  parcours             text not null check (parcours in ('tutoring','tutor')),
  tutoring_request_id  uuid references public.tutoring_requests (id) on delete cascade,
  tutor_application_id uuid references public.tutor_applications (id) on delete cascade,
  from_status          text,
  to_status            text not null,
  event                text,
  reason               text,
  changed_by           uuid references auth.users (id) on delete set null,
  -- Exactement une des deux FK est renseignée, cohérente avec `parcours`.
  constraint ash_one_parcours check (
    (parcours = 'tutoring' and tutoring_request_id is not null and tutor_application_id is null)
    or
    (parcours = 'tutor' and tutor_application_id is not null and tutoring_request_id is null)
  )
);
create index if not exists ash_tutoring_idx on public.application_status_history (tutoring_request_id, created_at desc);
create index if not exists ash_tutor_idx    on public.application_status_history (tutor_application_id, created_at desc);
create index if not exists ash_parcours_idx on public.application_status_history (parcours, created_at desc);

-- ── 2. Notifications internes (tableau de bord) ─────────────────────────────
create table if not exists public.notifications (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  -- Public cible : file admin, ou notification destinée à un utilisateur.
  audience     text not null check (audience in ('admin','student','tutor')),
  recipient_id uuid references auth.users (id) on delete cascade, -- null = tous les admins
  parcours     text not null check (parcours in ('tutoring','tutor')),
  event        text not null,
  title        text not null,
  body         text not null,
  related_id   uuid, -- id de la demande ou de la candidature concernée
  read_at      timestamptz
);
create index if not exists notifications_recipient_idx on public.notifications (recipient_id, created_at desc);
create index if not exists notifications_audience_idx  on public.notifications (audience, created_at desc);

-- ── 3. Préférences de notification (par utilisateur) ────────────────────────
create table if not exists public.notification_preferences (
  user_id       uuid primary key references auth.users (id) on delete cascade,
  email_enabled boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ── 4. Journal de livraison des courriels ───────────────────────────────────
create table if not exists public.notification_delivery_logs (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  notification_id uuid references public.notifications (id) on delete set null,
  parcours     text check (parcours in ('tutoring','tutor')),
  event        text not null,
  channel      text not null default 'email' check (channel in ('email','internal')),
  provider     text,             -- console | resend | …
  to_email     text,
  template_key text,
  lang         text,
  status       text not null default 'pending'
                 check (status in ('pending','sent','failed','skipped')),
  attempts     int  not null default 0,
  error        text,
  -- Anti-duplication : une même notification (événement + entité + destinataire)
  -- ne peut être journalisée/envoyée deux fois.
  dedup_key    text unique
);
create index if not exists ndl_status_idx on public.notification_delivery_logs (status, created_at desc);
create index if not exists ndl_event_idx  on public.notification_delivery_logs (event, created_at desc);

-- ── 5. RLS & permissions par rôle ───────────────────────────────────────────
alter table public.application_status_history  enable row level security;
alter table public.notifications               enable row level security;
alter table public.notification_preferences    enable row level security;
alter table public.notification_delivery_logs  enable row level security;

-- Helper inline : l'utilisateur courant est-il administrateur ?
-- (les politiques dupliquent la sous-requête faute de fonction dédiée)

-- Historique : lecture réservée aux administrateurs.
drop policy if exists ash_admin_read on public.application_status_history;
create policy ash_admin_read on public.application_status_history for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Notifications : l'utilisateur lit les siennes ; l'admin lit la file admin.
drop policy if exists notifications_owner_read on public.notifications;
create policy notifications_owner_read on public.notifications for select
  using (
    recipient_id = auth.uid()
    or (audience = 'admin' and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  );

-- Préférences : chacun gère les siennes.
drop policy if exists notif_prefs_owner_all on public.notification_preferences;
create policy notif_prefs_owner_all on public.notification_preferences for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Journaux de livraison : lecture administrateur uniquement.
drop policy if exists ndl_admin_read on public.notification_delivery_logs;
create policy ndl_admin_read on public.notification_delivery_logs for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Toutes les écritures passent par le service role (serveur), qui contourne RLS.
-- Aucune police d'insertion/mise à jour publique n'est ouverte : un utilisateur
-- ne peut donc pas modifier un statut ni un journal en manipulant une requête.

-- ========================= FIN UP ===========================================


-- ============================================================================
-- ROLLBACK (DOWN) — destructif : supprime tables + données. À n'exécuter
-- qu'après sauvegarde et décision explicite.
-- ----------------------------------------------------------------------------
-- drop policy if exists ndl_admin_read           on public.notification_delivery_logs;
-- drop policy if exists notif_prefs_owner_all    on public.notification_preferences;
-- drop policy if exists notifications_owner_read on public.notifications;
-- drop policy if exists ash_admin_read           on public.application_status_history;
-- drop table if exists public.notification_delivery_logs;
-- drop table if exists public.notification_preferences;
-- drop table if exists public.notifications;
-- drop table if exists public.application_status_history;
-- ============================================================================


-- ============================================================
-- FICHIER : seed_demo.sql
-- ============================================================
-- ============================================================================
-- ARCADINS — Données de DÉMONSTRATION (staging uniquement, JAMAIS en production).
-- À exécuter APRÈS les migrations 0001, 0002, 0004. Insère un exemple par
-- parcours pour peupler le tableau de bord admin. Nettoyer après la démo.
-- ============================================================================

-- 1) Une demande de tutorat (parcours élève)
with req as (
  insert into public.tutoring_requests
    (first_name, last_name, email, skills, target_level, goal, status)
  values
    ('Démo', 'Élève', 'demo.eleve@example.test',
     array['comprehension-orale','expression-orale'], 'avance',
     'Atteindre CLB 8 avant décembre', 'submitted')
  returning id
)
insert into public.application_status_history
  (parcours, tutoring_request_id, from_status, to_status, event)
select 'tutoring', id, null, 'submitted', 'tutoring_request_submitted' from req;

-- 2) Une candidature tuteur (parcours tuteur)
with app as (
  insert into public.tutor_applications
    (first_name, last_name, email, skills, levels, experience, motivation, status)
  values
    ('Démo', 'Tuteur', 'demo.tuteur@example.test',
     array['expression-ecrite','comprehension-ecrite'], array['intermediaire','avance'],
     '3 ans d''enseignement du FLE', 'Accompagner les nouveaux arrivants', 'submitted')
  returning id
)
insert into public.application_status_history
  (parcours, tutor_application_id, from_status, to_status, event)
select 'tutor', id, null, 'submitted', 'tutor_application_submitted' from app;

-- 3) (Manuel) Désigner un administrateur pour accéder à /admin :
--    update public.profiles set role = 'admin' where id = '<uuid_compte_test>';

-- Nettoyage après démo :
--   delete from public.tutoring_requests  where email = 'demo.eleve@example.test';
--   delete from public.tutor_applications where email = 'demo.tuteur@example.test';


