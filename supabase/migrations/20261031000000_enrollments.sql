-- Creators College course access schema.
-- Applied with: npx supabase db push
-- Safe to re-run: it adds any missing columns/indexes.

create extension if not exists "pgcrypto";

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  order_id text not null unique,
  name text,
  phone text not null,
  email text,
  user_id uuid,
  course_slug text not null default 'content-creation',
  status text not null default 'active' check (status in ('active', 'revoked', 'refunded')),
  provider text not null default 'cashfree',
  amount numeric(10, 2),
  currency text default 'INR',
  expires_at timestamptz,
  claimed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.enrollments add column if not exists user_id uuid;
alter table public.enrollments add column if not exists claimed_at timestamptz;

create index if not exists enrollments_phone_idx on public.enrollments (phone);
create index if not exists enrollments_status_idx on public.enrollments (status);
create index if not exists enrollments_user_id_idx on public.enrollments (user_id);
create index if not exists enrollments_email_idx on public.enrollments (email);

alter table public.enrollments enable row level security;

-- Intentionally no policies: the table is only reachable with the
-- service role key, which stays on the server. The anon key cannot read it.
