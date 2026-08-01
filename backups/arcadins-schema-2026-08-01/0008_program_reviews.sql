-- ============================================================================
-- ARCADINS — Avis & notes des étudiants par formation.
-- Migration ADDITIVE et réversible. NE PAS appliquer en production sans
-- sauvegarde vérifiée + autorisation explicite (même procédure que 0001→0007).
--
-- Un avis appartient à un utilisateur, pour une formation (program_slug =
-- source de vérité applicative PROGRAMS). Écritures via service role (l'API
-- vérifie l'authentification + l'inscription réelle). Lecture publique
-- UNIQUEMENT des avis approuvés (modération admin). Un avis par (user, slug).
-- ============================================================================

-- =========================== UP =============================================
create table if not exists public.program_reviews (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  user_id      uuid not null references auth.users (id) on delete cascade,
  program_slug text not null,
  rating       int  not null check (rating between 1 and 5),
  comment      text,
  status       text not null default 'pending' check (status in ('pending','approved','rejected')),
  unique (user_id, program_slug)
);
create index if not exists program_reviews_slug_status_idx on public.program_reviews (program_slug, status, created_at desc);

alter table public.program_reviews enable row level security;

-- Lecture publique : uniquement les avis approuvés.
drop policy if exists program_reviews_public_read on public.program_reviews;
create policy program_reviews_public_read on public.program_reviews for select
  using (status = 'approved');

-- L'auteur peut lire ses propres avis (y compris en attente).
drop policy if exists program_reviews_owner_read on public.program_reviews;
create policy program_reviews_owner_read on public.program_reviews for select
  using (user_id = auth.uid());

-- Aucune police d'INSERT/UPDATE publique : toutes les écritures passent par le
-- service role (API serveur), qui vérifie auth + inscription + modère.

-- ========================= FIN UP ===========================================

-- ============================================================================
-- ROLLBACK (DOWN) — destructif :
-- ----------------------------------------------------------------------------
-- drop policy if exists program_reviews_public_read on public.program_reviews;
-- drop policy if exists program_reviews_owner_read on public.program_reviews;
-- drop table if exists public.program_reviews;
-- ============================================================================
