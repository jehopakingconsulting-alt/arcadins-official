-- ============================================================================
-- ARCADINS — CATALOGUE GÉNÉRIQUE : Produits, Programmes, Forfaits, Tarifs,
-- Inscriptions canoniques + marqueur de projection d'historique.
--
-- PLATEFORME GÉNÉRIQUE — RIEN de spécifique à TEF/TCF ici. TEF, TCF, cours de
-- langues, certifications pro, etc. sont des DONNÉES (lignes), pas du schéma.
-- Hiérarchie : Product → Program → program_versions(0009) → modules → lessons …
--
-- Migration ADDITIVE, idempotente, transactionnelle. **PRÉPARÉE, NON APPLIQUÉE.**
-- STAGING d'abord (backup + préflight + GO). Aucune donnée existante modifiée :
-- uniquement CREATE TABLE/COLUMN IF NOT EXISTS + policies. Dépend de 0009.
-- ============================================================================

-- =========================== UP =============================================
begin;

create extension if not exists pgcrypto with schema extensions;

-- ── Program : identité PÉDAGOGIQUE d'un parcours (générique) ─────────────────
-- Relié aux versions existantes (0009 program_versions.program_slug) par slug.
create table if not exists public.programs (
  id                 uuid primary key default gen_random_uuid(),
  slug               text unique not null,          -- ex. 'tef-canada' (donnée, pas de logique)
  title              text not null,
  kind               text not null default 'course',-- 'exam_prep' | 'course' | 'certification' | ...
  active_version_id  uuid references public.program_versions(id),
  created_at         timestamptz not null default now()
);

-- Lien propre program_versions → programs (additif ; backfill par slug).
alter table public.program_versions
  add column if not exists program_id uuid references public.programs(id);
create index if not exists program_versions_program_id_idx on public.program_versions(program_id);

-- ── Product : identité COMMERCIALE distincte (générique) ─────────────────────
-- Un produit livre un programme. TEF et TCF = deux produits distincts (données).
create table if not exists public.products (
  id                  uuid primary key default gen_random_uuid(),
  slug                text unique not null,          -- ex. 'tef-canada', 'tcf-canada', 'anglais-pro'
  program_id          uuid not null references public.programs(id),
  title               text not null,
  subtitle            text,
  kind                text not null default 'course',
  status              text not null default 'draft' check (status in ('draft','active','archived')),
  certificate_wording text not null default 'Attestation de complétion',  -- légalement sûr (décision 2)
  sort                int  not null default 0,
  created_at          timestamptz not null default now()
);
create index if not exists products_status_idx on public.products(status);

-- ── Package : niveaux de service/accès (générique, configurable) ─────────────
create table if not exists public.product_packages (
  id             uuid primary key default gen_random_uuid(),
  product_id     uuid not null references public.products(id) on delete cascade,
  tier           text not null,                       -- 'starter'|'essential'|'premium'|'vip'|... (donnée)
  name           text not null,
  access_weeks   int  not null default 6,
  mock_attempts  int  not null default 1,
  coaching_hours numeric not null default 0,
  support_level  text not null default 'standard',    -- 'standard'|'priority'|'vip'
  perks          jsonb not null default '[]'::jsonb,
  sort           int  not null default 0,
  active         boolean not null default true,
  created_at     timestamptz not null default now(),
  unique (product_id, tier)
);

-- ── Price : tarifs configurables (multi-devise, one-time/abonnement, promos) ──
-- Stripe price id = CONFIG externe (décision 4), jamais de logique métier.
create table if not exists public.product_prices (
  id              uuid primary key default gen_random_uuid(),
  package_id      uuid not null references public.product_packages(id) on delete cascade,
  currency        text not null default 'USD',
  amount_cents    int  not null check (amount_cents >= 0),
  billing         text not null default 'one_time' check (billing in ('one_time','subscription')),
  interval        text check (interval in ('month','year')),   -- si subscription
  stripe_price_id text,                                          -- config externe (peut être null tant que checkout OFF)
  promo_label     text,
  promo_starts    timestamptz,
  promo_ends      timestamptz,
  active          boolean not null default true,
  created_at      timestamptz not null default now()
);
create index if not exists product_prices_pkg_idx on public.product_prices(package_id, currency, active);

-- ── Enrollment CANONIQUE (n'existait pas — aucune duplication d'historique) ──
-- Conforme au contrat EnrollmentRow (repositories/contracts.ts) + produit/forfait
-- + entitlement figé. L'historique migré reste dans legacy_* (non dupliqué).
create table if not exists public.enrollments (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references auth.users(id) on delete cascade,
  learner_id         uuid not null,                    -- = user_id (aligné profils)
  product_id         uuid references public.products(id),
  package_id         uuid references public.product_packages(id),
  program_id         uuid references public.programs(id),
  program_version_id uuid references public.program_versions(id),
  status             text not null default 'active' check (status in ('active','inactive','suspended','expired')),
  entitlement        jsonb not null default '{}'::jsonb,   -- snapshot: {access_weeks,mock_attempts,coaching_hours,support_level}
  access_starts_at   timestamptz not null default now(),
  access_expires_at  timestamptz,
  source             text not null default 'native',       -- 'native' | 'legacy_projection'
  entity_version     int not null default 1,               -- concurrence optimiste (VersionedEntity)
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  unique (user_id, product_id)
);
create index if not exists enrollments_user_idx on public.enrollments(user_id);
create index if not exists enrollments_product_idx on public.enrollments(product_id);

-- ── Marqueur idempotent de projection d'historique legacy → canonique ────────
create table if not exists public.progress_projection (
  learner_id         uuid not null,
  program_version_id uuid not null references public.program_versions(id),
  projected_from     text not null default 'legacy' check (projected_from in ('legacy','native')),
  synced_at          timestamptz not null default now(),
  primary key (learner_id, program_version_id)
);

-- ── RLS ─────────────────────────────────────────────────────────────────────
-- Catalogue = lecture publique (produits/forfaits/tarifs actifs). Écritures = service role.
alter table public.programs          enable row level security;
alter table public.products          enable row level security;
alter table public.product_packages  enable row level security;
alter table public.product_prices    enable row level security;
alter table public.enrollments       enable row level security;
alter table public.progress_projection enable row level security;

drop policy if exists programs_public_read on public.programs;
create policy programs_public_read on public.programs for select using (true);

drop policy if exists products_public_read on public.products;
create policy products_public_read on public.products for select using (status = 'active');

drop policy if exists packages_public_read on public.product_packages;
create policy packages_public_read on public.product_packages for select using (active);

drop policy if exists prices_public_read on public.product_prices;
create policy prices_public_read on public.product_prices for select using (active);

-- Inscriptions : l'apprenant lit UNIQUEMENT les siennes ; écritures via service role.
drop policy if exists enrollments_self_read on public.enrollments;
create policy enrollments_self_read on public.enrollments for select using (user_id = auth.uid());

-- progress_projection : aucun accès client (service role uniquement, bypass RLS).

commit;

-- ========================= FIN UP ===========================================
-- ============================================================================
-- ROLLBACK (DOWN) — destructif, sur GO explicite uniquement :
--   drop table if exists public.progress_projection, public.enrollments,
--     public.product_prices, public.product_packages, public.products cascade;
--   alter table public.program_versions drop column if exists program_id;
--   drop table if exists public.programs cascade;
-- ============================================================================
