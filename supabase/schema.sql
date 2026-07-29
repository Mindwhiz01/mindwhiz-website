-- ---------------------------------------------------------------------------
-- MindWhiz admin dashboard — Supabase schema
-- Run this once in your Supabase project: SQL Editor → paste → Run.
-- All writes go through the Next.js admin API using the SERVICE ROLE key,
-- so Row Level Security stays ON with no public policies (default deny).
-- ---------------------------------------------------------------------------

-- Blog posts -----------------------------------------------------------------
create table if not exists public.blog_posts (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  excerpt     text not null default '',
  category    text not null default 'Operations',
  date        date not null default current_date,
  read_time   text not null default '5 min read',
  author_name text not null default 'MindWhiz Team',
  author_role text not null default 'Editorial',
  author_avatar text not null default '',
  image       text not null default '',
  featured    boolean not null default false,
  published   boolean not null default true,
  -- Body is an ordered array of blocks: {type:'p'|'h2'|'quote'|'list', text?, items?}
  body        jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Case studies ---------------------------------------------------------------
create table if not exists public.case_studies (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  client      text not null,
  category    text not null default '',
  result      text not null default '',
  highlights  jsonb not null default '[]'::jsonb,   -- string[]
  img         text not null default '',
  logo        text not null default '',
  services    jsonb not null default '[]'::jsonb,   -- string[]
  challenge   text not null default '',
  approach    jsonb not null default '[]'::jsonb,   -- string[]
  outcomes    jsonb not null default '[]'::jsonb,   -- string[]
  metrics     jsonb not null default '[]'::jsonb,   -- {value,label}[]
  quote_text  text not null default '',
  quote_author text not null default '',
  published   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Newsletter subscribers -----------------------------------------------------
create table if not exists public.newsletter_subscribers (
  id           uuid primary key default gen_random_uuid(),
  email        text unique not null,
  status       text not null default 'subscribed',  -- subscribed | unsubscribed
  source       text not null default 'website',
  created_at   timestamptz not null default now()
);

-- Lock everything down: RLS on, no policies => only the service role
-- (used by the server-side admin API) can read/write.
alter table public.blog_posts             enable row level security;
alter table public.case_studies           enable row level security;
alter table public.newsletter_subscribers enable row level security;
