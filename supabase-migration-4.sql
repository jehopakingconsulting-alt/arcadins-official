-- ═══════════════════════════════════════════════
-- ARCADINS — Migration 4: real certificates
-- ═══════════════════════════════════════════════

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  program_id uuid references public.programs(id) on delete cascade not null,
  course_slug text not null,
  certificate_number text unique not null,
  student_name text not null,
  issued_at timestamptz default now(),
  unique (user_id, program_id)
);

alter table public.certificates enable row level security;

-- Anyone can view a certificate by ID (public verification, e.g. via QR code)
create policy "Certificates are publicly viewable"
  on public.certificates for select
  using (true);

-- Only the authenticated owner can issue their own certificate
create policy "Users can insert own certificate"
  on public.certificates for insert
  with check (auth.uid() = user_id);
