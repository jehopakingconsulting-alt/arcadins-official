-- ═══════════════════════════════════════════════
-- ARCADINS — Migration 3: registration fee + payment deadlines + suspension
-- ═══════════════════════════════════════════════

-- 1. New enrollment statuses: pending_payment (fee paid, awaiting 1st
--    installment) and suspended (missed a scheduled monthly payment)
alter table public.enrollments drop constraint if exists enrollments_status_check;
alter table public.enrollments add constraint enrollments_status_check
  check (status in ('pending_payment', 'active', 'suspended', 'cancelled', 'expired'));

-- 2. Deadline for the first installment (30 days after registration fee payment)
alter table public.enrollments add column if not exists payment_deadline timestamptz;

-- 3. Track which installment number we're on (1, 2, 3) for display purposes
alter table public.enrollments add column if not exists installments_paid int default 0;
