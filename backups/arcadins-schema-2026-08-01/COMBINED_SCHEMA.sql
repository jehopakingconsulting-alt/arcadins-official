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
-- ============================================================================
-- ARCADINS — Étape 8 (Ph. 10) : Parrainage multigénérationnel
-- Migration ADDITIVE et NON DESTRUCTIVE. À NE PAS appliquer en production sans
-- (1) une sauvegarde vérifiée, (2) l'autorisation explicite du responsable, et
-- (3) la VALIDATION JURIDIQUE du plan de rémunération (commissions).
--
-- Principe de conformité :
--   • Les commissions ne sont créées QUE sur des ventes réelles et payées
--     (référence à une inscription/paiement effectif). Aucune promesse de gain,
--     aucune commission « sur inscription gratuite ».
--   • Le plan (nombre de générations, taux) vit dans le code
--     (src/lib/data/referral-config.ts) et reste désactivé par défaut (flag OFF).
-- ============================================================================

-- ── 1. Codes de parrainage (un par parrain) ─────────────────────────────────
create table if not exists public.referral_codes (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  code        text not null unique,
  active      boolean not null default true
);
create index if not exists referral_codes_user_idx on public.referral_codes (user_id);

-- ── 2. Relations de parrainage (chaîne multigénérationnelle) ────────────────
-- generation = 1 (parrain direct), 2 (grand-parrain), 3, … selon le plan.
create table if not exists public.referral_relationships (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  referrer_id  uuid not null references auth.users (id) on delete cascade,
  referee_id   uuid not null references auth.users (id) on delete cascade,
  generation   int  not null check (generation >= 1),
  -- Anti-fraude : interdiction de l'auto-parrainage (un compte ne peut se
  -- parrainer lui-même, à aucune génération).
  constraint referral_no_self_referral check (referrer_id <> referee_id),
  unique (referrer_id, referee_id)
);
create index if not exists referral_rel_referee_idx  on public.referral_relationships (referee_id);
create index if not exists referral_rel_referrer_idx on public.referral_relationships (referrer_id);

-- ── 3. Commissions (uniquement sur ventes réelles payées) ───────────────────
create table if not exists public.referral_commissions (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  -- Bénéficiaire de la commission (le parrain d'une des générations).
  beneficiary_id uuid not null references auth.users (id) on delete cascade,
  -- Filleul dont l'achat déclenche la commission.
  buyer_id       uuid references auth.users (id) on delete set null,
  -- Vente de référence : lien vers l'inscription payée (source de vérité).
  enrollment_id  uuid,
  generation     int  not null check (generation >= 1),
  -- Montants en cents pour éviter les erreurs d'arrondi.
  sale_amount_cents       int not null check (sale_amount_cents >= 0),
  commission_amount_cents int not null check (commission_amount_cents >= 0),
  currency       text not null default 'CAD',
  -- pending → approved → paid | reversed (si remboursement de la vente)
  status         text not null default 'pending'
                   check (status in ('pending','approved','paid','reversed')),
  -- Empêche de créditer deux fois la même vente pour la même génération.
  unique (enrollment_id, beneficiary_id, generation)
);
create index if not exists referral_comm_beneficiary_idx on public.referral_commissions (beneficiary_id);
create index if not exists referral_comm_status_idx      on public.referral_commissions (status);

-- ── 4. RLS ──────────────────────────────────────────────────────────────────
alter table public.referral_codes         enable row level security;
alter table public.referral_relationships enable row level security;
alter table public.referral_commissions   enable row level security;

-- Chaque utilisateur lit SON propre code.
drop policy if exists referral_codes_owner_read on public.referral_codes;
create policy referral_codes_owner_read
  on public.referral_codes for select using (user_id = auth.uid());

-- Chaque utilisateur lit les relations où il est parrain.
drop policy if exists referral_rel_referrer_read on public.referral_relationships;
create policy referral_rel_referrer_read
  on public.referral_relationships for select using (referrer_id = auth.uid());

-- Chaque utilisateur lit SES commissions.
drop policy if exists referral_comm_owner_read on public.referral_commissions;
create policy referral_comm_owner_read
  on public.referral_commissions for select using (beneficiary_id = auth.uid());

-- Les écritures (création de relations et de commissions) passent par le
-- service role côté serveur, qui contourne la RLS. Aucune police d'insertion
-- publique n'est ouverte.

-- Fin de migration 0003 (UP).

-- ============================================================================
-- ROLLBACK (DOWN) — destructif : supprime les tables de parrainage et leurs
-- données. À n'exécuter qu'après sauvegarde et décision explicite.
-- ----------------------------------------------------------------------------
-- drop policy if exists referral_codes_owner_read     on public.referral_codes;
-- drop policy if exists referral_rel_referrer_read    on public.referral_relationships;
-- drop policy if exists referral_comm_owner_read      on public.referral_commissions;
-- drop table if exists public.referral_commissions;
-- drop table if exists public.referral_relationships;
-- drop table if exists public.referral_codes;
-- ============================================================================
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
-- ============================================================================
-- ARCADINS — MODÈLE ACADÉMIQUE (LMS versionné). Migration ADDITIVE, idempotente.
-- ⚠️ PRÉPARÉE MAIS **NON APPLIQUÉE**. NE PAS exécuter en production sans :
--    backup vérifié + préflight + GO explicite (même procédure que 0001→0008).
-- Aucune donnée existante modifiée/supprimée : uniquement CREATE TABLE IF NOT
-- EXISTS + ADD COLUMN IF NOT EXISTS + policies. Écritures sensibles = service role.
-- Voir ACADEMIC_DATABASE_SCHEMA.md / RLS_ACADEMIC_SECURITY_MATRIX.md.
-- ============================================================================

-- =========================== UP =============================================
begin;

create extension if not exists pgcrypto with schema extensions;

-- ── Versionnement de programme ──────────────────────────────────────────────
create table if not exists public.program_versions (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  program_slug  text not null,
  version_label text not null,
  status        text not null default 'draft' check (status in ('draft','review','approved','published','archived')),
  passing_score int  not null default 70 check (passing_score between 0 and 100),
  weighting     jsonb not null default '{}'::jsonb,
  published_at  timestamptz,
  unique (program_slug, version_label)
);
create index if not exists program_versions_slug_idx on public.program_versions (program_slug, status);

-- ── Modules / Leçons (contenu versionné ; blocs en jsonb) ────────────────────
create table if not exists public.modules (
  id                 uuid primary key default gen_random_uuid(),
  program_version_id uuid not null references public.program_versions (id) on delete cascade,
  code               text not null,
  position           int  not null,
  title              text not null,
  week_start         int, week_end int,
  competencies       jsonb not null default '[]'::jsonb,
  objectives         jsonb not null default '[]'::jsonb,
  prerequisites      jsonb not null default '[]'::jsonb,
  status             text not null default 'draft' check (status in ('draft','review','approved','published','archived')),
  unique (program_version_id, code)
);
create index if not exists modules_version_pos_idx on public.modules (program_version_id, position);

create table if not exists public.lessons (
  id           uuid primary key default gen_random_uuid(),
  module_id    uuid not null references public.modules (id) on delete cascade,
  position     int  not null,
  week         int,
  title        text not null,
  duration_min int,
  objectives   jsonb not null default '[]'::jsonb,
  content      jsonb not null default '[]'::jsonb,   -- blocs ordonnés typés
  resources    jsonb not null default '[]'::jsonb,
  glossary     jsonb not null default '[]'::jsonb,
  status       text not null default 'draft' check (status in ('draft','review','approved','published','archived')),
  unique (module_id, position)
);
create index if not exists lessons_module_pos_idx on public.lessons (module_id, position);

-- ── Évaluations / Banque de questions / Tentatives ──────────────────────────
create table if not exists public.assessments (
  id                 uuid primary key default gen_random_uuid(),
  program_version_id uuid not null references public.program_versions (id) on delete cascade,
  scope              text not null check (scope in ('lesson','module','final','diagnostic','bank')),
  ref_key            text,
  kind               text not null check (kind in ('quiz','summative','exam')),
  config             jsonb not null default '{}'::jsonb,
  passing_score      int  not null default 70 check (passing_score between 0 and 100)
);
create index if not exists assessments_version_scope_idx on public.assessments (program_version_id, scope);

create table if not exists public.assessment_questions (
  id            uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.assessments (id) on delete cascade,
  position      int  not null,
  type          text not null default 'mcq' check (type in ('mcq','multi','open','match','order')),
  prompt        text not null,
  options       jsonb not null default '[]'::jsonb,
  correct       jsonb,           -- jamais exposé au client pendant une tentative
  explanation   text,
  points        int  not null default 1
);
create index if not exists aq_assessment_idx on public.assessment_questions (assessment_id, position);

create table if not exists public.assessment_attempts (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  user_id            uuid not null references auth.users (id) on delete cascade,
  assessment_id      uuid not null references public.assessments (id) on delete cascade,
  program_version_id uuid references public.program_versions (id) on delete set null,
  score              int, passed boolean,
  started_at         timestamptz not null default now(),
  submitted_at       timestamptz,
  answers            jsonb not null default '[]'::jsonb   -- réponses de la tentative
);
create index if not exists attempts_user_assessment_idx on public.assessment_attempts (user_id, assessment_id, created_at desc);

-- ── Rubrics / Devoirs / Soumissions ─────────────────────────────────────────
create table if not exists public.rubrics (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  criteria jsonb not null default '[]'::jsonb
);
create table if not exists public.assignments (
  id                 uuid primary key default gen_random_uuid(),
  program_version_id uuid not null references public.program_versions (id) on delete cascade,
  kind               text not null check (kind in ('practical','final_project')),
  title              text not null,
  spec               jsonb not null default '{}'::jsonb,
  rubric_id          uuid references public.rubrics (id) on delete set null
);
create table if not exists public.submissions (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  user_id       uuid not null references auth.users (id) on delete cascade,
  assignment_id uuid not null references public.assignments (id) on delete cascade,
  payload       jsonb not null default '{}'::jsonb,
  status        text not null default 'submitted' check (status in ('submitted','awaiting_review','approved','rejected')),
  grade         int,
  feedback      jsonb,
  reviewed_by   uuid references auth.users (id) on delete set null,
  reviewed_at   timestamptz,
  unique (user_id, assignment_id)
);
create index if not exists submissions_user_idx on public.submissions (user_id, assignment_id);

-- ── Progression module (leçon : via extension de lesson_progress) ────────────
create table if not exists public.module_progress (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references auth.users (id) on delete cascade,
  module_id          uuid not null references public.modules (id) on delete cascade,
  program_version_id uuid references public.program_versions (id) on delete set null,
  state              text not null default 'locked' check (state in ('locked','available','in_progress','completed','passed','failed','needs_review')),
  score              int,
  updated_at         timestamptz not null default now(),
  unique (user_id, module_id)
);

-- ── Cohortes / Affectations tuteur / Événements / Traductions ───────────────
create table if not exists public.cohorts (
  id uuid primary key default gen_random_uuid(),
  program_version_id uuid not null references public.program_versions (id) on delete cascade,
  name text not null, start_date date, created_at timestamptz not null default now()
);
create table if not exists public.tutor_assignments (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid not null references auth.users (id) on delete cascade,
  student_id uuid not null references auth.users (id) on delete cascade,
  program_version_id uuid references public.program_versions (id) on delete set null,
  cohort_id uuid references public.cohorts (id) on delete set null,
  created_at timestamptz not null default now(),
  unique (tutor_id, student_id, program_version_id)
);
create index if not exists tutor_assignments_tutor_idx on public.tutor_assignments (tutor_id);
create index if not exists tutor_assignments_student_idx on public.tutor_assignments (student_id);

create table if not exists public.learning_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid references auth.users (id) on delete cascade,
  event_type text not null,
  ref jsonb not null default '{}'::jsonb
);
create index if not exists learning_events_user_idx on public.learning_events (user_id, created_at desc);

create table if not exists public.content_translations (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('program_version','module','lesson','assessment','assignment')),
  entity_id uuid not null,
  lang text not null,
  status text not null default 'draft_ai' check (status in ('source','draft_ai','review','approved','published','archived')),
  payload jsonb not null default '{}'::jsonb,
  source_version text,
  updated_at timestamptz not null default now(),
  unique (entity_type, entity_id, lang)
);

create table if not exists public.certificate_status_history (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  certificate_id uuid not null,
  from_status text, to_status text not null, reason text,
  changed_by uuid references auth.users (id) on delete set null
);
create index if not exists cert_status_hist_idx on public.certificate_status_history (certificate_id, created_at desc);

-- ── Extensions ADDITIVES de l'existant (jamais destructif) ──────────────────
alter table public.enrollments   add column if not exists program_version_id uuid;
alter table public.enrollments   add column if not exists cohort_id uuid;
alter table public.lesson_progress add column if not exists program_version_id uuid;
alter table public.lesson_progress add column if not exists score int;
alter table public.lesson_progress add column if not exists state text;
alter table public.certificates   add column if not exists program_version_id uuid;
alter table public.certificates   add column if not exists version_label text;
alter table public.certificates   add column if not exists status text default 'valid';
alter table public.certificates   add column if not exists hours int;
alter table public.certificates   add column if not exists issuing_authority text;

-- ── RLS ──────────────────────────────────────────────────────────────────────
alter table public.program_versions enable row level security;
alter table public.modules  enable row level security;
alter table public.lessons  enable row level security;
alter table public.assessments enable row level security;
alter table public.assessment_questions enable row level security;
alter table public.assessment_attempts  enable row level security;
alter table public.rubrics enable row level security;
alter table public.assignments enable row level security;
alter table public.submissions enable row level security;
alter table public.module_progress enable row level security;
alter table public.cohorts enable row level security;
alter table public.tutor_assignments enable row level security;
alter table public.learning_events enable row level security;
alter table public.content_translations enable row level security;
alter table public.certificate_status_history enable row level security;

-- Contenu publié : lecture publique.
drop policy if exists program_versions_pub_read on public.program_versions;
create policy program_versions_pub_read on public.program_versions for select using (status = 'published');
drop policy if exists modules_pub_read on public.modules;
create policy modules_pub_read on public.modules for select using (status = 'published');
drop policy if exists lessons_pub_read on public.lessons;
create policy lessons_pub_read on public.lessons for select using (status = 'published');
drop policy if exists translations_pub_read on public.content_translations;
create policy translations_pub_read on public.content_translations for select using (status = 'published');

-- Progression / tentatives / soumissions : propriétaire uniquement (lecture).
drop policy if exists attempts_owner_read on public.assessment_attempts;
create policy attempts_owner_read on public.assessment_attempts for select using (user_id = auth.uid());
drop policy if exists submissions_owner_read on public.submissions;
create policy submissions_owner_read on public.submissions for select using (user_id = auth.uid());
drop policy if exists module_progress_owner_read on public.module_progress;
create policy module_progress_owner_read on public.module_progress for select using (user_id = auth.uid());

-- Tuteur : lecture des tentatives/soumissions de ses étudiants assignés.
drop policy if exists attempts_tutor_read on public.assessment_attempts;
create policy attempts_tutor_read on public.assessment_attempts for select using (
  exists (select 1 from public.tutor_assignments ta where ta.tutor_id = auth.uid() and ta.student_id = assessment_attempts.user_id)
);
drop policy if exists submissions_tutor_read on public.submissions;
create policy submissions_tutor_read on public.submissions for select using (
  exists (select 1 from public.tutor_assignments ta where ta.tutor_id = auth.uid() and ta.student_id = submissions.user_id)
);
drop policy if exists tutor_assignments_self_read on public.tutor_assignments;
create policy tutor_assignments_self_read on public.tutor_assignments for select using (tutor_id = auth.uid() or student_id = auth.uid());

-- NB : assessment_questions.correct n'est jamais lu côté client (aucune policy de
-- lecture publique) ; la correction se fait au serveur (service role). Les écritures
-- (contenu, corrections, événements, migrations) passent toutes par le service role.

commit;

-- ============================================================================
-- ROLLBACK (DOWN) — réversible (tables neuves) ; les colonnes additives peuvent
-- rester (nullable, sans impact) ou être retirées si la table n'a pas d'autres usages.
-- ----------------------------------------------------------------------------
-- begin;
-- drop table if exists public.certificate_status_history, public.content_translations,
--   public.learning_events, public.tutor_assignments, public.cohorts, public.module_progress,
--   public.submissions, public.assignments, public.rubrics, public.assessment_attempts,
--   public.assessment_questions, public.assessments, public.lessons, public.modules,
--   public.program_versions cascade;
-- -- (Optionnel) retrait des colonnes additives — uniquement si non utilisées :
-- -- alter table public.enrollments drop column if exists program_version_id, drop column if exists cohort_id;
-- -- alter table public.lesson_progress drop column if exists program_version_id, drop column if exists score, drop column if exists state;
-- -- alter table public.certificates drop column if exists program_version_id, drop column if exists version_label,
-- --   drop column if exists status, drop column if exists hours, drop column if exists issuing_authority;
-- commit;
-- ============================================================================
-- =============================================================================
-- Migration 0011 — Academic Runtime Integration (Sprint I)
-- =============================================================================
-- ⚠️ NON APPLIQUÉE. Préparée uniquement. NE PAS exécuter `db push` / `migration up`
-- avant : backup + PITR, environnement QA, dataset anonymisé, preflight, validation
-- humaine et GO explicite (voir ACADEMIC_RUNTIME_MIGRATION_PLAN.md).
--
-- Propriétés : ADDITIVE uniquement (CREATE ... IF NOT EXISTS), idempotente autant que
-- possible, compatible avec 0009 (et 0010 si présente), SANS suppression, SANS
-- renommage destructif, SANS perte de données. Ne duplique PAS les tables de 0009
-- (program_versions, modules, lessons, assessments, assessment_attempts, rubrics,
-- module_progress, learning_events, certificate_status_history, …).
--
-- Sécurité : RLS activée sur chaque table ; AUCUNE politique permissive universelle ;
-- l'étudiant ne voit que ses données ; le rôle serveur opère de façon limitée.
-- =============================================================================

begin;

-- Extension utilitaire (idempotente).
create extension if not exists pgcrypto;

-- ─────────────────────────────────────────────────────────────────────────────
-- Idempotence des commandes académiques critiques.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.academic_commands (
  command_id        text primary key,
  idempotency_key   text not null,
  command_type      text not null,
  actor_id          uuid not null,
  resource_id       text,
  payload_hash      text not null,
  status            text not null default 'received'
                     check (status in ('received','processing','succeeded','failed_retryable','failed_final','expired')),
  result_reference  text,
  retry_count       integer not null default 0,
  started_at        timestamptz not null default now(),
  completed_at      timestamptz,
  failed_at         timestamptz,
  expires_at        timestamptz not null,
  version           integer not null default 1
);
-- Unicité logique d'idempotence (empêche toute double exécution concurrente).
create unique index if not exists academic_commands_idem_key_uidx on public.academic_commands (idempotency_key);
create index if not exists academic_commands_actor_idx on public.academic_commands (actor_id);
create index if not exists academic_commands_expires_idx on public.academic_commands (expires_at);
comment on table public.academic_commands is 'Sprint I: journal d''idempotence des commandes académiques (unicité par idempotency_key). Écrit par le rôle serveur uniquement.';

create table if not exists public.academic_command_results (
  command_id        text primary key references public.academic_commands(command_id) on delete cascade,
  result_json       jsonb not null default '{}'::jsonb,
  created_at        timestamptz not null default now()
);
comment on table public.academic_command_results is 'Sprint I: résultat logique d''une commande idempotente (rejeu → même résultat).';

-- ─────────────────────────────────────────────────────────────────────────────
-- Journal d'audit académique (append-only, sans donnée sensible).
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.academic_audit_events (
  id                uuid primary key default gen_random_uuid(),
  type              text not null,
  actor_id          uuid,
  correlation_id    text not null,
  resource_id       text,
  reason_codes      text[] not null default '{}',
  metadata          jsonb not null default '{}'::jsonb,
  at                timestamptz not null default now()
);
create index if not exists academic_audit_actor_idx on public.academic_audit_events (actor_id);
create index if not exists academic_audit_type_idx on public.academic_audit_events (type);
create index if not exists academic_audit_at_idx on public.academic_audit_events (at);
comment on table public.academic_audit_events is 'Sprint I: audit immuable (jamais de bonne réponse, clé, secret, token, PII superflue).';

-- ─────────────────────────────────────────────────────────────────────────────
-- Snapshots & événements du Learning Runtime (progression, jamais de barème).
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.runtime_snapshots (
  id                uuid primary key default gen_random_uuid(),
  owner_learner_id  uuid not null,
  program_id        text not null,
  snapshot_json     jsonb not null,
  version           integer not null default 1,
  updated_at        timestamptz not null default now(),
  created_at        timestamptz not null default now()
);
create index if not exists runtime_snapshots_owner_idx on public.runtime_snapshots (owner_learner_id);
comment on table public.runtime_snapshots is 'Sprint I: snapshot de progression (aucune donnée de correction).';

create table if not exists public.runtime_events (
  id                uuid primary key default gen_random_uuid(),
  owner_learner_id  uuid not null,
  type              text not null,
  payload_json      jsonb not null default '{}'::jsonb,
  at                timestamptz not null default now()
);
create index if not exists runtime_events_owner_idx on public.runtime_events (owner_learner_id);
comment on table public.runtime_events is 'Sprint I: événements d''apprentissage (progression/temps/favori/note).';

-- ─────────────────────────────────────────────────────────────────────────────
-- Sessions runtime d'évaluation formative & d'examen (état privé serveur).
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.assessment_sessions (
  session_id        text primary key,
  owner_learner_id  uuid not null,
  program_id        text not null,
  assessment_id     text not null,
  status            text not null,
  private_state_json jsonb not null,           -- barème/questions figées : JAMAIS exposé au client
  submitted_command_id text,
  version           integer not null default 1,
  updated_at        timestamptz not null default now(),
  created_at        timestamptz not null default now()
);
create index if not exists assessment_sessions_owner_idx on public.assessment_sessions (owner_learner_id);
comment on table public.assessment_sessions is 'Sprint I: état privé d''une tentative formative (correction serveur uniquement).';

create table if not exists public.exam_runtime_sessions (
  session_id        text primary key,
  owner_learner_id  uuid not null,
  program_id        text not null,
  exam_id           text not null,
  status            text not null,
  private_state_json jsonb not null,           -- sections figées/barème : JAMAIS exposé
  official_started_at timestamptz,
  official_submitted_at timestamptz,
  version           integer not null default 1,
  updated_at        timestamptz not null default now(),
  created_at        timestamptz not null default now()
);
create index if not exists exam_runtime_sessions_owner_idx on public.exam_runtime_sessions (owner_learner_id);
comment on table public.exam_runtime_sessions is 'Sprint I: session d''examen final ; chronomètre autoritaire côté serveur.';

-- ─────────────────────────────────────────────────────────────────────────────
-- Intégrité des credentials & journal de vérification publique.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.credential_integrity_records (
  id                uuid primary key default gen_random_uuid(),
  credential_id     text not null,
  public_verification_id text not null,
  version           integer not null default 1,
  content_hash      text not null,
  hash_algorithm    text not null,
  signature_algorithm text not null,
  signature_key_id  text not null,
  signature_value   text not null,             -- signature LOGIQUE ; aucune clé privée stockée
  created_at        timestamptz not null default now()
);
create unique index if not exists credential_integrity_pub_ver_uidx on public.credential_integrity_records (public_verification_id, version);
comment on table public.credential_integrity_records is 'Sprint I: hash + signature (clé jamais stockée). Vérifiable, non falsifiable.';

create table if not exists public.public_verification_events (
  id                uuid primary key default gen_random_uuid(),
  public_verification_id text not null,
  status            text not null,
  at                timestamptz not null default now()
);
create index if not exists public_verification_pub_ver_idx on public.public_verification_events (public_verification_id);
comment on table public.public_verification_events is 'Sprint I: journal des vérifications publiques (aucune donnée personnelle).';

-- ─────────────────────────────────────────────────────────────────────────────
-- RLS : activée partout ; AUCUNE politique permissive universelle.
-- (Les politiques SELECT/INSERT/UPDATE/DELETE détaillées par rôle sont documentées
--  dans RLS_ACADEMIC_SECURITY_MATRIX.md et à créer lors de l'application réelle.)
-- ─────────────────────────────────────────────────────────────────────────────
alter table public.academic_commands enable row level security;
alter table public.academic_command_results enable row level security;
alter table public.academic_audit_events enable row level security;
alter table public.runtime_snapshots enable row level security;
alter table public.runtime_events enable row level security;
alter table public.assessment_sessions enable row level security;
alter table public.exam_runtime_sessions enable row level security;
alter table public.credential_integrity_records enable row level security;
alter table public.public_verification_events enable row level security;

-- Étudiant : lecture de SES snapshots/événements uniquement (fail-closed par défaut RLS).
-- (CREATE POLICY ne supporte pas IF NOT EXISTS : on utilise DROP IF EXISTS + CREATE pour l'idempotence.)
drop policy if exists runtime_snapshots_owner_select on public.runtime_snapshots;
create policy runtime_snapshots_owner_select on public.runtime_snapshots
  for select using (auth.uid() = owner_learner_id);
drop policy if exists runtime_events_owner_select on public.runtime_events;
create policy runtime_events_owner_select on public.runtime_events
  for select using (auth.uid() = owner_learner_id);
drop policy if exists assessment_sessions_owner_select on public.assessment_sessions;
create policy assessment_sessions_owner_select on public.assessment_sessions
  for select using (auth.uid() = owner_learner_id);
drop policy if exists exam_runtime_sessions_owner_select on public.exam_runtime_sessions;
create policy exam_runtime_sessions_owner_select on public.exam_runtime_sessions
  for select using (auth.uid() = owner_learner_id);
-- Écritures : réservées au rôle serveur (service_role), jamais au client authentifié.
-- (Politiques d'INSERT/UPDATE ciblées à créer explicitement lors de l'application ;
--  en l'absence de politique, RLS refuse — comportement fail-closed voulu.)

commit;

-- =============================================================================
-- FIN 0011. Aucune donnée existante modifiée. Aucune table supprimée/renommée.
-- Ne pas appliquer sans preflight + postflight + validation humaine + GO.
-- =============================================================================
