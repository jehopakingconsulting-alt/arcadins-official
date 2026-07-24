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
