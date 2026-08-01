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
