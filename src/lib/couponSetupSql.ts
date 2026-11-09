/**
 * Copy of supabase/migrations/20261107000000_coupon_system.sql so the admin
 * panel can hand the exact setup SQL to whoever has the Supabase dashboard.
 * Keep the two files in sync when the schema changes.
 */
export const COUPON_SETUP_SQL = `-- Coupon system for Creators College course access. Safe to re-run.
create extension if not exists "pgcrypto";

create table if not exists public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  title text,
  percent_off numeric(5,2) not null default 100,
  max_uses int not null default 0,
  used_count int not null default 0,
  starts_at timestamptz,
  expires_at timestamptz,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists coupons_code_idx on public.coupons (code);
create index if not exists coupons_active_idx on public.coupons (active);

alter table public.coupons enable row level security;

create table if not exists public.coupon_orders (
  order_id text primary key,
  coupon_code text not null,
  amount numeric(10,2) not null
);

alter table public.coupon_orders enable row level security;

create or replace function public.coupon_use(p_code text)
returns int
language sql
security definer
set search_path = public, pg_catalog
as $$
  update public.coupons
     set used_count = used_count + 1,
         updated_at = now()
   where code = lower(p_code)
     and active = true
  returning used_count;
$$;

insert into public.coupons (code, title, percent_off, max_uses)
values (lower('CECILSSPECIAL'), 'Cecil''s free full course access', 100, 0)
on conflict (code) do update
  set title = excluded.title,
      percent_off = excluded.percent_off;
`;
