-- ═══════════════════════════════════════════════
-- ARCADINS — Migration 2: lessons progress + fixes
-- ═══════════════════════════════════════════════

-- 1. Allow program_id to be null (for subscription-plan enrollments)
alter table public.enrollments alter column program_id drop not null;

-- 2. Allow 'course' as a plan type (individual course purchases)
alter table public.enrollments drop constraint if exists enrollments_plan_check;
alter table public.enrollments add constraint enrollments_plan_check
  check (plan in ('starter', 'pro', 'professionnel', 'enterprise', 'course'));

-- 3. Lesson progress tracking
create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  course_slug text not null,
  lesson_index int not null,
  completed_at timestamptz default now(),
  unique (user_id, course_slug, lesson_index)
);

alter table public.lesson_progress enable row level security;

create policy "Users can view own lesson progress"
  on public.lesson_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own lesson progress"
  on public.lesson_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own lesson progress"
  on public.lesson_progress for delete
  using (auth.uid() = user_id);

-- 4. Replace seed programs with the 9 real active courses + 5 coming soon
delete from public.programs;

insert into public.programs (slug, name_fr, name_en, category, description_fr, duration, icon, price_monthly) values
  ('marketing-digital', 'Marketing Digital et E-commerce', 'Digital Marketing & E-commerce', 'tech', 'SEO/SEM, réseaux sociaux, publicité en ligne et création de boutiques e-commerce.', '24 semaines', '🌐', 350000),
  ('informatique', 'Informatique et Transformation Digitale', 'IT & Digital Transformation', 'tech', 'Cloud, IA appliquée, sécurité informatique et digitalisation des processus.', '24 semaines', '💻', 350000),
  ('francais-affaires', 'Français des Affaires et du Travail', 'Business & Workplace French', 'lang', 'Vocabulaire professionnel, communication d''entreprise.', '24 semaines', '🗣️', 300000),
  ('entrepreneuriat', 'Entrepreneuriat et Innovation', 'Entrepreneurship & Innovation', 'biz', 'Créer et gérer une entreprise au Canada. Plan d''affaires et financement.', '24 semaines', '🚀', 400000),
  ('finance', 'Gestion Financière et Comptabilité', 'Financial Management & Accounting', 'biz', 'Analyse de bilan, planification budgétaire, comptabilité et fiscalité.', '24 semaines', '📊', 400000),
  ('rh', 'Gestion des Ressources Humaines', 'Human Resources Management', 'biz', 'Droit du travail québécois, recrutement, gestion des talents.', '24 semaines', '🤝', 350000),
  ('tourisme', 'Tourisme et Gestion Hôtelière', 'Tourism & Hotel Management', 'biz', 'Gestion hôtelière, tourisme d''accueil, événementiel.', '24 semaines', '🏨', 350000),
  ('anglais-commercial', 'Anglais Commercial', 'Business English', 'lang', 'Anglais professionnel pour le milieu des affaires canadien.', '24 semaines', '🇬🇧', 300000),
  ('relation-aide', 'Relation d''Aide et Service Communautaire', 'Counseling & Community Services', 'soc', 'Intervention psychosociale, accompagnement communautaire.', '24 semaines', '❤️', 350000),
  ('francais-tef-tcf', 'Français Intensif TEF/TCF Canada', 'Intensive French TEF/TCF Canada', 'lang', 'Maîtrisez les 4 compétences linguistiques exigées. À venir.', '24 semaines', '🇫🇷', null),
  ('epe', 'Éducatrice à la Petite Enfance (EPE)', 'Early Childhood Educator (ECE)', 'soc', 'Formation reconnue Québec. À venir.', '24 semaines', '👶', null),
  ('pab', 'Préposé(e) aux Bénéficiaires (PAB)', 'Patient Attendant (PAB)', 'soc', 'Formation PAB reconnue MSSS Québec. À venir.', '24 semaines', '🩺', null),
  ('immigration-agent', 'Agent(e) de Soutien en Immigration', 'Immigration Support Agent', 'leg', 'Dossiers IRCC, formulaires, procédures. À venir.', '24 semaines', '🏛️', null),
  ('famille-sans-dette', 'Famille Sans Dette', 'Debt-Free Family', 'leg', 'Budget familial, crédit, épargne. À venir.', '24 semaines', '💰', null);
