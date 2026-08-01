-- ============================================================================
-- ARCADINS — 0013 : Journal d'audit applicatif (sécurité / actions sensibles).
--
-- Distinct de `legacy_audit_log` (0005, artefact d'import V1). Ici : trace
-- append-only des actions sensibles (connexions admin, changements de rôle,
-- décisions de modération, remboursements, exports…). Écrit UNIQUEMENT via le
-- service role (côté serveur) ; lu UNIQUEMENT via le service role (dashboard admin).
--
-- Idempotent : réexécutable sans effet de bord. À appliquer sur staging PUIS prod
-- (gated) via le SQL Editor. Aucune donnée sensible en dur.
-- ============================================================================

create table if not exists public.audit_log (
  id           uuid primary key default gen_random_uuid(),
  occurred_at  timestamptz not null default now(),
  actor_id     uuid references auth.users (id) on delete set null,
  actor_email  text,
  actor_role   text,
  action       text not null,
  target_type  text,
  target_id    text,
  ip           inet,
  user_agent   text,
  metadata     jsonb not null default '{}'::jsonb
);

comment on table public.audit_log is
  'Journal d''audit append-only des actions sensibles. Écrit/lu via service role uniquement.';

-- Index de consultation (dashboard admin : par date, acteur, action, cible).
create index if not exists audit_log_occurred_at_idx on public.audit_log (occurred_at desc);
create index if not exists audit_log_actor_idx       on public.audit_log (actor_id);
create index if not exists audit_log_action_idx       on public.audit_log (action);
create index if not exists audit_log_target_idx       on public.audit_log (target_type, target_id);

-- RLS activé SANS aucune policy pour anon/authenticated → refus total côté client.
-- Le service role (serveur) contourne la RLS : c'est le seul chemin d'écriture/lecture.
alter table public.audit_log enable row level security;

-- Inviolabilité : interdit toute MODIFICATION ou SUPPRESSION (même via service role),
-- garantissant un journal append-only et à l'épreuve de la falsification.
create or replace function public.audit_log_prevent_mutation()
returns trigger language plpgsql as $$
begin
  raise exception 'audit_log est append-only : UPDATE/DELETE interdit';
  return null;
end;
$$;

drop trigger if exists audit_log_no_update on public.audit_log;
create trigger audit_log_no_update
  before update or delete on public.audit_log
  for each row execute function public.audit_log_prevent_mutation();
