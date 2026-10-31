-- Admin analytics schema: events, lesson progress, and aggregated RPCs.
-- Safe to re-run.

create table if not exists public.analytics_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  event_name text not null,
  user_id uuid,
  email text,
  session_id text,
  path text,
  referrer text,
  referrer_host text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  device_type text,
  browser text,
  os text,
  country text,
  region text,
  city text,
  ip_hash text,
  duration_seconds integer,
  value numeric(12, 2),
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists analytics_events_created_idx on public.analytics_events (created_at desc);
create index if not exists analytics_events_name_created_idx on public.analytics_events (event_name, created_at desc);
create index if not exists analytics_events_user_created_idx on public.analytics_events (user_id, created_at desc);
create index if not exists analytics_events_session_idx on public.analytics_events (session_id);
create index if not exists analytics_events_path_idx on public.analytics_events (path);

create table if not exists public.lesson_progress (
  id bigint generated always as identity primary key,
  user_id uuid not null,
  order_id text not null,
  lesson_id text not null,
  module_number text not null,
  lesson_index integer not null,
  completed boolean not null default false,
  watched_seconds integer not null default 0,
  first_viewed_at timestamptz not null default now(),
  completed_at timestamptz,
  last_viewed_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

create index if not exists lesson_progress_order_idx on public.lesson_progress (order_id);
create index if not exists lesson_progress_user_idx on public.lesson_progress (user_id, completed);
create index if not exists lesson_progress_lesson_idx on public.lesson_progress (lesson_id);

alter table public.analytics_events enable row level security;
alter table public.lesson_progress enable row level security;

-- No policies on purpose: only the server-side service role can read/write.

create or replace function public.admin_overview(p_days integer default 30)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_days integer := greatest(1, least(coalesce(p_days, 30), 365));
  v_start timestamptz := now() - ((greatest(1, least(coalesce(p_days, 30), 365)) || ' days')::interval);
begin
  return jsonb_build_object(
    'range_days', v_days,
    'revenue', coalesce((select sum(amount) from enrollments where status = 'active' and created_at >= v_start), 0),
    'orders', (select count(*) from enrollments where created_at >= v_start),
    'active_enrollments', (select count(*) from enrollments where status = 'active' and (expires_at is null or expires_at > now())),
    'new_enrollments', (select count(*) from enrollments where created_at >= v_start),
    'linked_enrollments', (select count(*) from enrollments where status = 'active' and user_id is not null),
    'students_active_7d', (select count(distinct user_id) from analytics_events where user_id is not null and created_at >= now() - interval '7 days'),
    'lessons_completed', (select count(*) from lesson_progress where completed and completed_at >= v_start),
    'video_plays', (select count(*) from analytics_events where event_name = 'lesson_play' and created_at >= v_start),
    'sessions', (select count(distinct session_id) from analytics_events where session_id is not null and created_at >= v_start),
    'page_views', (select count(*) from analytics_events where event_name = 'page_view' and created_at >= v_start),
    'unique_visitors', (select count(distinct session_id) from analytics_events where session_id is not null and event_name = 'page_view' and created_at >= v_start),
    'checkout_starts', (select count(*) from analytics_events where event_name = 'checkout_start' and created_at >= v_start),
    'payments_verified', (select count(*) from analytics_events where event_name = 'payment_verified' and created_at >= v_start),
    'logins', (select count(*) from analytics_events where event_name = 'login_success' and created_at >= v_start),
    'lesson_views', (select count(*) from analytics_events where event_name = 'lesson_view' and created_at >= v_start),
    'funnel', jsonb_build_array(
      jsonb_build_object('step', 'Checkout started', 'count', (select count(distinct coalesce(user_id::text, session_id)) from analytics_events where event_name = 'checkout_start' and created_at >= v_start)),
      jsonb_build_object('step', 'Payment verified', 'count', (select count(distinct coalesce(user_id::text, session_id)) from analytics_events where event_name = 'payment_verified' and created_at >= v_start)),
      jsonb_build_object('step', 'Signed in', 'count', (select count(distinct coalesce(user_id::text, session_id)) from analytics_events where event_name = 'login_success' and created_at >= v_start)),
      jsonb_build_object('step', 'Opened a lesson', 'count', (select count(distinct coalesce(user_id::text, session_id)) from analytics_events where event_name = 'lesson_view' and created_at >= v_start)),
      jsonb_build_object('step', 'Completed a lesson', 'count', (select count(distinct coalesce(user_id::text, session_id)) from analytics_events where event_name = 'lesson_complete' and created_at >= v_start))
    ),
    'daily', coalesce((
      select jsonb_agg(day_row order by day)
      from (
        select d as day,
          jsonb_build_object(
            'date', to_char(d::date, 'YYYY-MM-DD'),
            'revenue', coalesce((select sum(e.amount) from enrollments e where e.status = 'active' and e.created_at >= d and e.created_at < d + interval '1 day'), 0),
            'orders', (select count(*) from enrollments e where e.created_at >= d and e.created_at < d + interval '1 day'),
            'enrollments', (select count(*) from enrollments e where e.created_at >= d and e.created_at < d + interval '1 day'),
            'page_views', (select count(*) from analytics_events a where a.event_name = 'page_view' and a.created_at >= d and a.created_at < d + interval '1 day'),
            'sessions', (select count(distinct a.session_id) from analytics_events a where a.session_id is not null and a.created_at >= d and a.created_at < d + interval '1 day'),
            'lessons_completed', (select count(*) from lesson_progress lp where lp.completed and lp.completed_at >= d and lp.completed_at < d + interval '1 day')
          ) as day_row
        from generate_series((current_date - (v_days - 1))::timestamptz, current_date::timestamptz, interval '1 day') d
      ) s
    ), '[]'::jsonb),
    'recent_enrollments', coalesce((
      select jsonb_agg(to_jsonb(e))
      from (
        select order_id, name, email, phone, status, amount, created_at, user_id
        from enrollments
        order by created_at desc
        limit 8
      ) e
    ), '[]'::jsonb),
    'top_lessons', coalesce((
      select jsonb_agg(to_jsonb(l))
      from (
        select lesson_id, module_number, lesson_index,
          count(distinct user_id) as viewers,
          count(*) filter (where completed) as completions
        from lesson_progress
        group by lesson_id, module_number, lesson_index
        order by viewers desc, completions desc
        limit 8
      ) l
    ), '[]'::jsonb)
  );
end;
$$;

create or replace function public.admin_traffic(p_days integer default 30)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_days integer := greatest(1, least(coalesce(p_days, 30), 365));
  v_start timestamptz := now() - ((greatest(1, least(coalesce(p_days, 30), 365)) || ' days')::interval);
begin
  return jsonb_build_object(
    'range_days', v_days,
    'paths', coalesce((
      select jsonb_agg(to_jsonb(p)) from (
        select coalesce(path, '/') as path, count(*) as views, count(distinct session_id) as sessions
        from analytics_events
        where event_name = 'page_view' and created_at >= v_start
        group by coalesce(path, '/')
        order by views desc
        limit 15
      ) p
    ), '[]'::jsonb),
    'referrers', coalesce((
      select jsonb_agg(to_jsonb(r)) from (
        select coalesce(nullif(referrer_host, ''), 'Direct') as source, count(*) as visits
        from analytics_events
        where event_name = 'page_view' and created_at >= v_start
        group by coalesce(nullif(referrer_host, ''), 'Direct')
        order by visits desc
        limit 12
      ) r
    ), '[]'::jsonb),
    'utm', coalesce((
      select jsonb_agg(to_jsonb(u)) from (
        select coalesce(nullif(utm_source, ''), 'None') as source, coalesce(nullif(utm_medium, ''), '-') as medium, count(*) as visits
        from analytics_events
        where event_name = 'page_view' and created_at >= v_start
        group by coalesce(nullif(utm_source, ''), 'None'), coalesce(nullif(utm_medium, ''), '-')
        order by visits desc
        limit 12
      ) u
    ), '[]'::jsonb),
    'countries', coalesce((
      select jsonb_agg(to_jsonb(c)) from (
        select coalesce(nullif(country, ''), 'Unknown') as country, count(*) as visits
        from analytics_events
        where event_name = 'page_view' and created_at >= v_start
        group by coalesce(nullif(country, ''), 'Unknown')
        order by visits desc
        limit 12
      ) c
    ), '[]'::jsonb),
    'cities', coalesce((
      select jsonb_agg(to_jsonb(c)) from (
        select coalesce(nullif(city, ''), 'Unknown') as city, count(*) as visits
        from analytics_events
        where event_name = 'page_view' and created_at >= v_start
        group by coalesce(nullif(city, ''), 'Unknown')
        order by visits desc
        limit 12
      ) c
    ), '[]'::jsonb),
    'devices', coalesce((
      select jsonb_agg(to_jsonb(d)) from (
        select coalesce(nullif(device_type, ''), 'unknown') as device, count(*) as visits
        from analytics_events
        where event_name = 'page_view' and created_at >= v_start
        group by coalesce(nullif(device_type, ''), 'unknown')
        order by visits desc
      ) d
    ), '[]'::jsonb),
    'browsers', coalesce((
      select jsonb_agg(to_jsonb(b)) from (
        select coalesce(nullif(browser, ''), 'unknown') as browser, count(*) as visits
        from analytics_events
        where event_name = 'page_view' and created_at >= v_start
        group by coalesce(nullif(browser, ''), 'unknown')
        order by visits desc
        limit 10
      ) b
    ), '[]'::jsonb),
    'os', coalesce((
      select jsonb_agg(to_jsonb(o)) from (
        select coalesce(nullif(os, ''), 'unknown') as os, count(*) as visits
        from analytics_events
        where event_name = 'page_view' and created_at >= v_start
        group by coalesce(nullif(os, ''), 'unknown')
        order by visits desc
        limit 10
      ) o
    ), '[]'::jsonb),
    'hourly', coalesce((
      select jsonb_agg(to_jsonb(h) order by h.hour) from (
        select extract(hour from created_at)::int as hour, count(*) as events
        from analytics_events
        where created_at >= now() - interval '7 days'
        group by extract(hour from created_at)::int
      ) h
    ), '[]'::jsonb)
  );
end;
$$;

create or replace function public.admin_lessons()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
begin
  return jsonb_build_object(
    'lessons', coalesce((
      select jsonb_agg(to_jsonb(l) order by l.module_number, l.lesson_index)
      from (
        select module_number, lesson_index, lesson_id,
          count(distinct user_id) as viewers,
          count(*) filter (where completed) as completions,
          coalesce(round(avg(watched_seconds)), 0)::int as avg_seconds,
          max(last_viewed_at) as last_viewed_at
        from lesson_progress
        group by module_number, lesson_index, lesson_id
      ) l
    ), '[]'::jsonb),
    'totals', jsonb_build_object(
      'viewers', (select count(distinct user_id) from lesson_progress),
      'completions', (select count(*) from lesson_progress where completed),
      'tracked_lessons', (select count(distinct lesson_id) from lesson_progress)
    )
  );
end;
$$;

create or replace function public.admin_students(
  p_search text default null,
  p_status text default null,
  p_limit integer default 25,
  p_offset integer default 0
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_search text := nullif(trim(coalesce(p_search, '')), '');
  v_status text := nullif(trim(coalesce(p_status, '')), '');
  v_limit integer := least(greatest(coalesce(p_limit, 25), 1), 100);
  v_offset integer := greatest(coalesce(p_offset, 0), 0);
begin
  return (
    with filtered as (
      select e.*,
        (select count(*) from lesson_progress lp where lp.user_id = e.user_id and lp.completed) as completed_lessons,
        (select max(lp.last_viewed_at) from lesson_progress lp where lp.user_id = e.user_id) as last_lesson_at,
        (select max(a.created_at) from analytics_events a where a.user_id = e.user_id) as last_active_at
      from enrollments e
      where (v_search is null or e.email ilike '%' || v_search || '%' or e.name ilike '%' || v_search || '%' or e.phone ilike '%' || v_search || '%' or e.order_id ilike '%' || v_search || '%')
        and (v_status is null or e.status = v_status)
    )
    select jsonb_build_object(
      'total', (select count(*) from filtered),
      'rows', coalesce((
        select jsonb_agg(to_jsonb(f))
        from (select * from filtered order by created_at desc limit v_limit offset v_offset) f
      ), '[]'::jsonb)
    )
  );
end;
$$;

create or replace function public.admin_student(p_order_id text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_enrollment enrollments;
begin
  select * into v_enrollment from enrollments where order_id = p_order_id;
  if not found then
    return null;
  end if;

  return jsonb_build_object(
    'enrollment', to_jsonb(v_enrollment),
    'progress', coalesce((
      select jsonb_agg(to_jsonb(l) order by l.module_number, l.lesson_index)
      from (
        select lesson_id, module_number, lesson_index, completed, watched_seconds, first_viewed_at, completed_at, last_viewed_at
        from lesson_progress
        where user_id = v_enrollment.user_id
        order by module_number, lesson_index
      ) l
    ), '[]'::jsonb),
    'events', coalesce((
      select jsonb_agg(to_jsonb(e))
      from (
        select event_name, path, device_type, browser, os, country, city, created_at, metadata
        from analytics_events
        where (v_enrollment.user_id is not null and user_id = v_enrollment.user_id)
           or (v_enrollment.email is not null and lower(email) = lower(v_enrollment.email))
        order by created_at desc
        limit 40
      ) e
    ), '[]'::jsonb),
    'stats', jsonb_build_object(
      'completed_lessons', (select count(*) from lesson_progress where user_id = v_enrollment.user_id and completed),
      'lessons_opened', (select count(*) from lesson_progress where user_id = v_enrollment.user_id),
      'watch_seconds', coalesce((select sum(watched_seconds) from lesson_progress where user_id = v_enrollment.user_id), 0),
      'last_active_at', (select max(created_at) from analytics_events where user_id = v_enrollment.user_id),
      'event_count', (select count(*) from analytics_events where user_id = v_enrollment.user_id)
    )
  );
end;
$$;

create or replace function public.admin_events(
  p_event text default null,
  p_search text default null,
  p_limit integer default 50,
  p_offset integer default 0
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_event text := nullif(trim(coalesce(p_event, '')), '');
  v_search text := nullif(trim(coalesce(p_search, '')), '');
  v_limit integer := least(greatest(coalesce(p_limit, 50), 1), 200);
  v_offset integer := greatest(coalesce(p_offset, 0), 0);
begin
  return (
    with filtered as (
      select *
      from analytics_events
      where (v_event is null or event_name = v_event)
        and (v_search is null or email ilike '%' || v_search || '%' or path ilike '%' || v_search || '%' or session_id ilike '%' || v_search || '%')
    )
    select jsonb_build_object(
      'total', (select count(*) from filtered),
      'rows', coalesce((
        select jsonb_agg(to_jsonb(f))
        from (select * from filtered order by created_at desc limit v_limit offset v_offset) f
      ), '[]'::jsonb)
    )
  );
end;
$$;

create or replace function public.prune_analytics(p_days integer default 180)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_deleted integer;
  v_days integer := greatest(30, coalesce(p_days, 180));
begin
  delete from analytics_events where created_at < now() - ((v_days || ' days')::interval);
  get diagnostics v_deleted = row_count;
  return v_deleted;
end;
$$;

revoke execute on function public.admin_overview(integer) from public, anon, authenticated;
revoke execute on function public.admin_traffic(integer) from public, anon, authenticated;
revoke execute on function public.admin_lessons() from public, anon, authenticated;
revoke execute on function public.admin_students(text, text, integer, integer) from public, anon, authenticated;
revoke execute on function public.admin_student(text) from public, anon, authenticated;
revoke execute on function public.admin_events(text, text, integer, integer) from public, anon, authenticated;
revoke execute on function public.prune_analytics(integer) from public, anon, authenticated;

grant execute on function public.admin_overview(integer) to service_role;
grant execute on function public.admin_traffic(integer) to service_role;
grant execute on function public.admin_lessons() to service_role;
grant execute on function public.admin_students(text, text, integer, integer) to service_role;
grant execute on function public.admin_student(text) to service_role;
grant execute on function public.admin_events(text, text, integer, integer) to service_role;
grant execute on function public.prune_analytics(integer) to service_role;
