-- FAYD PLAN: struktur database awal

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  name text not null,
  color text not null default '#3b82f6',
  sort_order int not null default 0
);

create table if not exists recurring_rules (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  category_id uuid references categories on delete set null,
  title text not null,
  start_time time,
  end_time time,
  freq text not null check (freq in ('daily','weekdays','weekly','monthly')),
  days_of_week int[],          -- 1=Senin ... 7=Minggu (untuk freq weekly)
  day_of_month int,            -- untuk freq monthly
  start_date date not null default current_date,
  end_date date,
  skip_holiday boolean not null default true, -- tidak dibuat di tanggal libur nasional
  active boolean not null default true
);

create table if not exists activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  category_id uuid references categories on delete set null,
  rule_id uuid references recurring_rules on delete set null,
  title text not null,
  date date not null,
  start_time time,
  end_time time,
  priority int not null default 2 check (priority between 1 and 3),
  status text not null default 'belum' check (status in ('belum','proses','selesai','batal')),
  note text,
  result_note text,
  created_at timestamptz not null default now(),
  unique (rule_id, date)
);

create index if not exists activities_user_date_idx on activities (user_id, date);
create index if not exists categories_user_idx on categories (user_id);
create index if not exists rules_user_idx on recurring_rules (user_id);

create table if not exists holidays (
  date date primary key,
  name text not null,
  kind text not null check (kind in ('libur_nasional','cuti_bersama'))
);

alter table categories enable row level security;
alter table recurring_rules enable row level security;
alter table activities enable row level security;
alter table holidays enable row level security;

create policy "own categories" on categories for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "own rules" on recurring_rules for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "own activities" on activities for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "read holidays" on holidays for select to authenticated using (true);
