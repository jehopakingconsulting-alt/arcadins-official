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
  -- Cycle de vie : nouvelle → contactee → planifiee → close | archivee
  status        text not null default 'nouvelle'
                  check (status in ('nouvelle','contactee','planifiee','close','archivee'))
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
  -- Cycle de vie DISTINCT de celui des demandes élèves.
  status         text not null default 'recue'
                   check (status in ('recue','en_revue','entretien','acceptee','refusee','archivee'))
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
