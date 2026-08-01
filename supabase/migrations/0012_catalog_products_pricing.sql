-- ============================================================================
-- ARCADINS — CATALOGUE COMMERCIAL GÉNÉRIQUE & MOTEUR DE TARIFICATION (S1).
--
-- ⚠️ REDESIGN de la version S0 (jamais appliquée) : modèle commercial de niveau
-- mondial, ENTIÈREMENT PILOTÉ PAR LES DONNÉES (Back Office). AUCUNE logique métier
-- ni aucun forfait n'est codé en dur. TEF/TCF/langues/certifs/bundles = lignes.
--
-- Concepts : Product → Program → program_versions(0009) → Curriculum.
--   Package  = COMPOSITION de droits (entitlement grants, jsonb) — composable.
--   Offer    = prix vendable d'un package/bundle/addon/licence (multi-devise,
--              multi-pays, one-time | subscription | lifetime, Stripe id externe).
--   Discounts/Coupons/Scholarships = campagnes & réductions configurables.
--   Organizations/Licenses/Seats   = licences institution/entreprise/école/agence.
--
-- Migration ADDITIVE, idempotente, transactionnelle. **PRÉPARÉE, NON APPLIQUÉE.**
-- STAGING d'abord. Aucune donnée existante modifiée. Dépend de 0009.
-- ============================================================================

begin;
create extension if not exists pgcrypto with schema extensions;

-- ── Tenancy SEAM (S5.5) : frontière multi-tenant, RÉTRO-COMPATIBLE ────────────
-- Prépare white-label / entreprise / université / gouvernement / marketplace SANS
-- changer le comportement actuel. Un tenant « root » unique = comportement mono-tenant
-- d'aujourd'hui. AUCUNE logique métier tenant ici — uniquement la frontière + le résolveur.
create table if not exists public.tenants (
  id             uuid primary key default gen_random_uuid(),
  slug           text unique not null,
  name           text not null,
  kind           text not null default 'root' check (kind in ('root','white_label','enterprise','university','government','partner')),
  primary_domain text unique,
  branding       jsonb not null default '{}'::jsonb,   -- logo/couleurs/nom affiché (futur)
  status         text not null default 'active' check (status in ('active','suspended','archived')),
  created_at     timestamptz not null default now()
);

-- Tenant ROOT déterministe : toutes les données existantes/nouvelles y appartiennent par défaut.
insert into public.tenants (id, slug, name, kind)
values ('00000000-0000-0000-0000-000000000001', 'root', 'ARCADINS', 'root')
on conflict (slug) do nothing;

-- Résolveur de tenant courant. Par défaut = ROOT (mono-tenant, comportement identique).
-- À l'ère multi-tenant, une middleware posera `set_config('app.tenant_id', <uuid>, true)` par requête ;
-- ce résolveur le lira alors. Aujourd'hui : toujours ROOT. PUR / stable.
create or replace function public.current_tenant()
returns uuid language sql stable as $$
  select coalesce(
    nullif(current_setting('app.tenant_id', true), '')::uuid,
    '00000000-0000-0000-0000-000000000001'::uuid
  );
$$;

-- ─────────────────────────── Référentiels ──────────────────────────────────

-- Pays : devise par défaut + fiscalité (config Back Office).
create table if not exists public.countries (
  code             text primary key,                 -- ISO-2 ('CA','HT','FR',...)
  name             text not null,
  default_currency text not null default 'USD',
  tax_bps          int  not null default 0,           -- taxe en points de base (1500 = 15%)
  active           boolean not null default true
);

-- Program : identité pédagogique (générique), reliée aux versions 0009 par slug.
create table if not exists public.programs (
  id                uuid primary key default gen_random_uuid(),
  slug              text unique not null,
  title             text not null,
  kind              text not null default 'course',
  active_version_id uuid references public.program_versions(id),
  created_at        timestamptz not null default now()
);
alter table public.program_versions
  add column if not exists program_id uuid references public.programs(id);
create index if not exists program_versions_program_id_idx on public.program_versions(program_id);

-- Product : identité COMMERCIALE distincte (TEF et TCF = deux produits, en donnée).
create table if not exists public.products (
  id                  uuid primary key default gen_random_uuid(),
  slug                text unique not null,
  program_id          uuid references public.programs(id),
  title               text not null,
  subtitle            text,
  kind                text not null default 'course',   -- 'exam_prep'|'course'|'certification'|...
  status              text not null default 'draft' check (status in ('draft','active','archived')),
  certificate_wording text not null default 'Attestation de complétion',
  sort                int  not null default 0,
  created_at          timestamptz not null default now()
);
create index if not exists products_status_idx on public.products(status);

-- ─────────────────── Packages : composition de droits ───────────────────────
-- `grants` (jsonb[]) = liste de droits atomiques COMPOSABLES. Types (extensibles) :
--   {"type":"product_access","product_slug":"tef-canada","access_model":"limited","weeks":6}
--   {"type":"product_access","access_model":"lifetime"}
--   {"type":"mock_exam_pack","attempts":3}
--   {"type":"coaching_hours","hours":2}
--   {"type":"tutoring_sessions","sessions":4}
--   {"type":"ai_assistant","quota":"unlimited"}         -- ou {"quota_month":200}
--   {"type":"downloadable_resources","scope":"all"}
--   {"type":"support_level","level":"vip"}
--   {"type":"bundle_products","product_slugs":["tef-canada","tcf-canada"]}
-- Un nouvel add-on futur = un nouveau type de grant, SANS changement de schéma.
create table if not exists public.packages (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  product_id  uuid references public.products(id) on delete set null,  -- null si bundle multi-produits
  kind        text not null default 'single' check (kind in ('single','bundle','addon','license_plan')),
  name        text not null,
  description text,
  grants      jsonb not null default '[]'::jsonb,
  metadata    jsonb not null default '{}'::jsonb,
  sort        int  not null default 0,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);
create index if not exists packages_product_idx on public.packages(product_id, active);

-- Bundles multi-produits (liaison explicite en plus des grants, pour requêtes/analytics).
create table if not exists public.bundle_items (
  bundle_package_id uuid not null references public.packages(id) on delete cascade,
  product_id        uuid not null references public.products(id) on delete cascade,
  sort              int not null default 0,
  primary key (bundle_package_id, product_id)
);

-- ───────────────────────── Offers : prix vendables ──────────────────────────
-- Une offre = un prix pour un package, dans une devise, une portée pays, un modèle
-- de facturation. Plusieurs offres par package = multi-devise/pays/abonnement.
-- Stripe price id = CONFIG EXTERNE (jamais de logique métier ; peut rester null).
create table if not exists public.offers (
  id              uuid primary key default gen_random_uuid(),
  sku             text unique not null,
  package_id      uuid not null references public.packages(id) on delete cascade,
  currency        text not null default 'USD',
  country_scope   text[] not null default '{}',        -- vide = mondial ; sinon ISO-2 autorisés
  amount_cents    int  not null check (amount_cents >= 0),
  billing         text not null default 'one_time' check (billing in ('one_time','subscription','lifetime')),
  interval        text check (interval in ('month','year')),
  access_model    text not null default 'limited' check (access_model in ('limited','lifetime')),
  access_weeks    int,                                  -- si access_model='limited'
  stripe_price_id text,
  active_from     timestamptz,
  active_to       timestamptz,
  active          boolean not null default true,
  created_at      timestamptz not null default now()
);
create index if not exists offers_pkg_idx on public.offers(package_id, currency, active);

-- ──────────────────── Réductions / Coupons / Bourses ────────────────────────
create table if not exists public.discounts (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  kind            text not null check (kind in ('percent','fixed')),
  value           int  not null,                        -- percent: bps (2500=25%) ; fixed: cents
  applies_scope   jsonb not null default '{}'::jsonb,   -- {product_slugs?:[], package_slugs?:[], currencies?:[]}
  starts_at       timestamptz,
  ends_at         timestamptz,
  max_redemptions int,
  redemptions     int  not null default 0,
  active          boolean not null default true,
  created_at      timestamptz not null default now()
);

create table if not exists public.coupons (
  code            text primary key,                     -- code saisi par l'utilisateur
  discount_id     uuid not null references public.discounts(id) on delete cascade,
  max_redemptions int,
  per_user_limit  int not null default 1,
  active          boolean not null default true,
  created_at      timestamptz not null default now()
);
create table if not exists public.coupon_redemptions (
  coupon_code text not null references public.coupons(code) on delete cascade,
  user_id     uuid not null references auth.users(id) on delete cascade,
  offer_id    uuid references public.offers(id),
  redeemed_at timestamptz not null default now(),
  primary key (coupon_code, user_id, redeemed_at)
);

-- Bourses : réduction totale/partielle tracée + approbation (distincte des coupons).
create table if not exists public.scholarships (
  id           uuid primary key default gen_random_uuid(),
  code         text unique,
  kind         text not null check (kind in ('full','partial')),
  percent_bps  int,                                     -- si partial
  org_id       uuid,                                    -- FK org ajoutée plus bas
  status       text not null default 'active' check (status in ('active','revoked','expired')),
  notes        text,
  approved_by  uuid references auth.users(id),
  starts_at    timestamptz,
  ends_at      timestamptz,
  created_at   timestamptz not null default now()
);

-- ─────────── Organisations & Licences (institution/entreprise/école/agence) ──
create table if not exists public.organizations (
  id          uuid primary key default gen_random_uuid(),
  kind        text not null check (kind in ('institution','corporate','school','immigration_agency','partner')),
  name        text not null,
  country     text references public.countries(code),
  contact_email text,
  status      text not null default 'active' check (status in ('active','suspended','archived')),
  created_at  timestamptz not null default now()
);
alter table public.scholarships
  add constraint scholarships_org_fk foreign key (org_id) references public.organizations(id) on delete set null;

-- Licence = pool de sièges d'un package pour une organisation.
create table if not exists public.licenses (
  id          uuid primary key default gen_random_uuid(),
  org_id      uuid not null references public.organizations(id) on delete cascade,
  package_id  uuid not null references public.packages(id),
  seats       int  not null check (seats >= 0),
  seats_used  int  not null default 0,
  valid_from  timestamptz not null default now(),
  valid_to    timestamptz,
  status      text not null default 'active' check (status in ('active','suspended','expired')),
  created_at  timestamptz not null default now()
);
create table if not exists public.license_seats (
  license_id  uuid not null references public.licenses(id) on delete cascade,
  user_id     uuid not null references auth.users(id) on delete cascade,
  assigned_at timestamptz not null default now(),
  primary key (license_id, user_id)
);

-- ─────────────────── Inscriptions canoniques + projection ───────────────────
create table if not exists public.enrollments (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references auth.users(id) on delete cascade,
  learner_id         uuid not null,
  product_id         uuid references public.products(id),
  package_id         uuid references public.packages(id),
  offer_id           uuid references public.offers(id),
  program_id         uuid references public.programs(id),
  program_version_id uuid references public.program_versions(id),
  license_id         uuid references public.licenses(id),         -- si siège institutionnel
  status             text not null default 'active' check (status in ('active','inactive','suspended','expired')),
  entitlement        jsonb not null default '{}'::jsonb,          -- snapshot composé figé
  access_starts_at   timestamptz not null default now(),
  access_expires_at  timestamptz,                                  -- null = lifetime
  source             text not null default 'native',              -- native|legacy_projection|license
  entity_version     int not null default 1,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  unique (user_id, product_id)
);
create index if not exists enrollments_user_idx on public.enrollments(user_id);

create table if not exists public.progress_projection (
  learner_id         uuid not null,
  program_version_id uuid not null references public.program_versions(id),
  projected_from     text not null default 'legacy' check (projected_from in ('legacy','native')),
  synced_at          timestamptz not null default now(),
  primary key (learner_id, program_version_id)
);

-- ────────────────────────────────── RLS ─────────────────────────────────────
-- Catalogue vendable = lecture publique (actifs) ; écritures = service role (Back Office).
alter table public.countries        enable row level security;
alter table public.programs         enable row level security;
alter table public.products         enable row level security;
alter table public.packages         enable row level security;
alter table public.bundle_items     enable row level security;
alter table public.offers           enable row level security;
alter table public.discounts        enable row level security;
alter table public.coupons          enable row level security;
alter table public.coupon_redemptions enable row level security;
alter table public.scholarships     enable row level security;
alter table public.organizations    enable row level security;
alter table public.licenses         enable row level security;
alter table public.license_seats    enable row level security;
alter table public.enrollments      enable row level security;
alter table public.progress_projection enable row level security;

drop policy if exists countries_public_read on public.countries;
create policy countries_public_read on public.countries for select using (active);
drop policy if exists programs_public_read on public.programs;
create policy programs_public_read on public.programs for select using (true);
drop policy if exists products_public_read on public.products;
create policy products_public_read on public.products for select using (status = 'active');
drop policy if exists packages_public_read on public.packages;
create policy packages_public_read on public.packages for select using (active);
drop policy if exists bundle_items_public_read on public.bundle_items;
create policy bundle_items_public_read on public.bundle_items for select using (true);
drop policy if exists offers_public_read on public.offers;
create policy offers_public_read on public.offers for select using (active);

-- Coupons/discounts/bourses : PAS de lecture publique (validés côté serveur pour éviter
-- l'énumération de codes). Redemptions : l'utilisateur lit les siennes.
drop policy if exists coupon_redemptions_self_read on public.coupon_redemptions;
create policy coupon_redemptions_self_read on public.coupon_redemptions for select using (user_id = auth.uid());

-- Inscriptions : l'apprenant lit uniquement les siennes.
drop policy if exists enrollments_self_read on public.enrollments;
create policy enrollments_self_read on public.enrollments for select using (user_id = auth.uid());

-- Sièges de licence : l'utilisateur voit ses propres sièges.
drop policy if exists license_seats_self_read on public.license_seats;
create policy license_seats_self_read on public.license_seats for select using (user_id = auth.uid());

-- discounts/coupons/scholarships/organizations/licenses/progress_projection :
-- aucune policy de lecture publique → service role uniquement (Back Office / serveur).

-- ── Tenancy SEAM : colonne `tenant_id` sur les entités scopables ──────────────
-- NOT NULL + DEFAULT root → toutes les lignes appartiennent au tenant root : comportement
-- MONO-TENANT IDENTIQUE à aujourd'hui. Additif, idempotent. Les RLS actuelles ne sont PAS
-- modifiées (isolation par tenant = évolution ultérieure, via `current_tenant()` en gabarit).
do $$
declare t text;
begin
  foreach t in array array[
    'programs','products','packages','offers','discounts','coupons',
    'scholarships','organizations','licenses','enrollments'
  ] loop
    execute format(
      'alter table public.%I add column if not exists tenant_id uuid not null '
      || 'default ''00000000-0000-0000-0000-000000000001'' references public.tenants(id);', t);
    execute format('create index if not exists %I_tenant_idx on public.%I(tenant_id);', t, t);
  end loop;
end $$;

-- GABARIT RLS multi-tenant (NON appliqué — documentation) : à l'activation white-label,
-- ajouter à chaque policy publique le prédicat `and tenant_id = public.current_tenant()`.
-- Exemple : products_public_read → using (status='active' and tenant_id = public.current_tenant()).

commit;

-- ============================================================================
-- ROLLBACK (DOWN) — destructif, sur GO explicite :
--   drop table if exists public.progress_projection, public.enrollments,
--     public.license_seats, public.licenses, public.organizations,
--     public.scholarships, public.coupon_redemptions, public.coupons,
--     public.discounts, public.offers, public.bundle_items, public.packages,
--     public.products, public.countries cascade;
--   alter table public.program_versions drop column if exists program_id;
--   drop table if exists public.programs cascade;
--   -- Tenancy seam :
--   drop function if exists public.current_tenant();
--   -- (les colonnes tenant_id tombent avec les tables ci-dessus via cascade)
--   drop table if exists public.tenants cascade;
-- ============================================================================
