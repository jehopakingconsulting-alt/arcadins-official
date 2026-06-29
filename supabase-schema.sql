-- ═══════════════════════════════════════════════
-- ARCADINS Training Center — Database Schema
-- ═══════════════════════════════════════════════

-- 1. Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  first_name text,
  last_name text,
  email text unique not null,
  country text,
  phone text,
  language text default 'fr',
  role text default 'student' check (role in ('student', 'admin')),
  stripe_customer_id text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 2. Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, first_name, last_name, country)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'country'
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Programs
create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_fr text not null,
  name_en text,
  category text not null,
  description_fr text,
  description_en text,
  duration text,
  icon text,
  is_certified boolean default true,
  price_monthly int,
  price_annual int,
  created_at timestamptz default now()
);

alter table public.programs enable row level security;

create policy "Programs are viewable by everyone"
  on public.programs for select
  using (true);

-- 4. Enrollments
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  program_id uuid references public.programs(id) on delete cascade not null,
  plan text check (plan in ('starter', 'pro', 'enterprise')),
  billing text default 'monthly' check (billing in ('monthly', 'annual')),
  status text default 'active' check (status in ('active', 'cancelled', 'expired')),
  stripe_subscription_id text,
  enrolled_at timestamptz default now(),
  expires_at timestamptz
);

alter table public.enrollments enable row level security;

create policy "Users can view own enrollments"
  on public.enrollments for select
  using (auth.uid() = user_id);

-- 5. Contact Requests
create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  country text,
  interest text,
  message text,
  created_at timestamptz default now()
);

alter table public.contact_requests enable row level security;

create policy "Anyone can insert contact requests"
  on public.contact_requests for insert
  with check (true);

create policy "Only admins can view contact requests"
  on public.contact_requests for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- 6. Seed programs
insert into public.programs (slug, name_fr, name_en, category, description_fr, duration, icon) values
  ('francais-tef-tcf', 'Français Intensif TEF/TCF Canada', 'Intensive French TEF/TCF Canada', 'lang', 'Maîtrisez les 4 compétences linguistiques exigées.', '12 semaines', '🇫🇷'),
  ('francais-affaires', 'Français des Affaires & du Travail', 'Business & Workplace French', 'lang', 'Vocabulaire professionnel, communication d''entreprise.', '8 semaines', '🗣️'),
  ('leadership', 'Leadership & Gestion d''Équipe', 'Leadership & Team Management', 'biz', 'Compétences pour diriger une équipe multiculturelle.', '10 semaines', '👑'),
  ('finance', 'Gestion Financière & Comptabilité', 'Financial Management & Accounting', 'biz', 'Analyse de bilan, planification budgétaire.', '10 semaines', '📊'),
  ('entrepreneuriat', 'Entrepreneuriat & Innovation', 'Entrepreneurship & Innovation', 'biz', 'Créer et gérer une entreprise au Canada.', '12 semaines', '🚀'),
  ('rh', 'Ressources Humaines & Talents', 'Human Resources & Talent', 'biz', 'Droit du travail québécois, recrutement.', '8 semaines', '🤝'),
  ('informatique', 'Informatique & Transformation Digitale', 'IT & Digital Transformation', 'tech', 'Cloud, IA, sécurité informatique.', '12 semaines', '💻'),
  ('marketing-digital', 'Marketing Digital & E-commerce', 'Digital Marketing & E-commerce', 'tech', 'SEO/SEM, réseaux sociaux, boutiques en ligne.', '8 semaines', '🌐'),
  ('epe', 'Éducatrice à la Petite Enfance', 'Early Childhood Educator', 'soc', 'Formation reconnue Québec, 0-5 ans.', '16 semaines', '👶'),
  ('pab', 'Préposé(e) aux Bénéficiaires', 'Patient Attendant', 'soc', 'Formation PAB reconnue MSSS Québec.', '20 semaines', '🩺'),
  ('immigration-agent', 'Agent de Soutien en Immigration', 'Immigration Support Agent', 'leg', 'Dossiers IRCC, formulaires, accompagnement.', '14 semaines', '🏛️'),
  ('famille-sans-dette', 'Famille Sans Dette', 'Debt-Free Family', 'leg', 'Budget familial, crédit, épargne.', '6 semaines', '💰');
