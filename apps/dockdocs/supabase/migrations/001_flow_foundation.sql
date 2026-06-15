-- nf-flow-foundation: document persistence layer
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor → New query).
-- The service_role key (SUPABASE_SERVICE_ROLE_KEY) must be set in Netlify env vars
-- before any server-side write functions will work.

-- ── documents ─────────────────────────────────────────────────────────────────
-- One row per PDF the user has processed and chosen to save.
-- storage_path is reserved for v2 file storage; v1 stores extracted text only.

create table if not exists public.documents (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null references auth.users(id) on delete cascade,
  name        text        not null,
  mime        text        not null default 'application/pdf',
  byte_size   bigint,
  page_count  int,
  storage_path text,
  created_at  timestamptz not null default now()
);

alter table public.documents enable row level security;

create policy "documents: owner select"
  on public.documents for select
  using (auth.uid() = user_id);

create policy "documents: owner insert"
  on public.documents for insert
  with check (auth.uid() = user_id);

create policy "documents: owner update"
  on public.documents for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "documents: owner delete"
  on public.documents for delete
  using (auth.uid() = user_id);

-- ── document_texts ─────────────────────────────────────────────────────────────
-- Extracted text content. chunk_index allows splitting large docs (≥60k chars)
-- across multiple rows while keeping each chunk under API limits.

create table if not exists public.document_texts (
  id          uuid        primary key default gen_random_uuid(),
  document_id uuid        not null references public.documents(id) on delete cascade,
  user_id     uuid        not null references auth.users(id) on delete cascade,
  chunk_index int         not null default 0,
  content     text        not null,
  created_at  timestamptz not null default now(),
  unique (document_id, chunk_index)
);

alter table public.document_texts enable row level security;

create policy "document_texts: owner select"
  on public.document_texts for select
  using (auth.uid() = user_id);

create policy "document_texts: owner insert"
  on public.document_texts for insert
  with check (auth.uid() = user_id);

create policy "document_texts: owner update"
  on public.document_texts for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "document_texts: owner delete"
  on public.document_texts for delete
  using (auth.uid() = user_id);

-- ── indexes ───────────────────────────────────────────────────────────────────
create index if not exists documents_user_id_created_at
  on public.documents (user_id, created_at desc);

create index if not exists document_texts_document_id
  on public.document_texts (document_id, chunk_index);
