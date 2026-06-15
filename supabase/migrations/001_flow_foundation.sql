-- nf-flow-foundation: encrypted-at-rest private workspace for flow data.
-- Supabase Postgres runs on AES-256 encrypted EBS — disk-level encryption is
-- automatic. RLS ensures each user can only see and modify their own rows.
-- Run once in Supabase SQL Editor (Dashboard → SQL Editor → New query).

-- ───────────────────────────────────────────────
-- flow_templates  (user-saved extraction configs)
-- ───────────────────────────────────────────────
create table if not exists flow_templates (
  id           text        primary key,
  user_id      uuid        not null references auth.users(id) on delete cascade,
  name         text        not null,
  doc_type     text        not null,
  dimensions   jsonb       not null default '[]',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

alter table flow_templates enable row level security;

-- Single "own rows only" policy covers SELECT / INSERT / UPDATE / DELETE.
create policy "flow_templates_owner" on flow_templates
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists flow_templates_user_id_idx on flow_templates (user_id);

-- ──────────────────────────────────────────────────
-- flow_runs  (history of template executions)
-- ──────────────────────────────────────────────────
create table if not exists flow_runs (
  id             text        primary key,
  user_id        uuid        not null references auth.users(id) on delete cascade,
  template_id    text        not null,
  template_name  text        not null,
  file_names     jsonb       not null default '[]',
  doc_type       text        not null,
  status         text        not null check (status in ('ok', 'error')),
  error          text,
  created_at     timestamptz not null default now()
);

alter table flow_runs enable row level security;

create policy "flow_runs_owner" on flow_runs
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists flow_runs_user_id_idx      on flow_runs (user_id);
create index if not exists flow_runs_template_id_idx  on flow_runs (template_id);
