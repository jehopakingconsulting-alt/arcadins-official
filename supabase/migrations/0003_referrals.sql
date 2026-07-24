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
