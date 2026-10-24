-- ====================================================================
-- FORMEL 3D — Core Database Schema, Role-Level Authorization & RLS
-- Idempotent schema migration for Supabase PostgreSQL
-- ====================================================================

-- 1. Enable required extensions
create extension if not exists "uuid-ossp";

-- 2. Admin Users Table (Links to Supabase auth.users)
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade unique,
  email text not null,
  role text not null default 'admin' check (role in ('admin', 'super_admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for rapid user lookup during auth verification
create index if not exists idx_admin_users_user_id on public.admin_users(user_id);

-- 3. Categories Table
create table if not exists public.categories (
  id text primary key,
  name text not null,
  description text default '',
  image text not null,
  video_url text default '',
  accent_color text not null default '#D3B8F5',
  tag text default '',
  item_count int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. Products Table
create table if not exists public.products (
  id text primary key,
  name text not null,
  subtitle text default '',
  category text not null references public.categories(id) on update cascade on delete restrict,
  description text not null default '',
  images text[] not null default '{}',
  video_url text default '',
  is_customizable boolean not null default false,
  status text not null default 'published' check (status in ('published', 'draft')),
  specs jsonb default '{}'::jsonb,
  features text[] default '{}',
  badge text default '',
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Product indexes for fast filtering
create index if not exists idx_products_category on public.products(category);
create index if not exists idx_products_status on public.products(status);
create index if not exists idx_products_is_featured on public.products(is_featured);

-- 5. Customization Enquiries Table
create table if not exists public.customization_enquiries (
  id text primary key,
  product_id text,
  product_name text not null,
  printed_name text not null,
  name_length int not null default 0,
  is_long_name_review boolean not null default false,
  delivery_address text not null,
  phone_number text not null,
  pincode text not null,
  theme_type text not null default 'custom' check (theme_type in ('simple', 'custom', 'other')),
  theme_description text not null default '',
  penholder text not null default 'no' check (penholder in ('yes', 'no')),
  additional_requirements text,
  status text not null default 'new' check (status in ('new', 'contacted', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists idx_enquiries_status on public.customization_enquiries(status);
create index if not exists idx_enquiries_created_at on public.customization_enquiries(created_at desc);

-- 6. Helper Function: Check if currently executing user is verified admin
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = auth.uid()
  );
$$;

-- 7. Row Level Security (RLS) Enablement
alter table public.admin_users enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.customization_enquiries enable row level security;

-- ====================================================================
-- RLS POLICIES
-- ====================================================================

-- A. Admin Users Policies
drop policy if exists "Admins can view their own profile" on public.admin_users;
drop policy if exists "Super admins can manage admin users" on public.admin_users;
drop policy if exists "Authenticated users can verify admin status" on public.admin_users;

-- Allow authenticated users to view admin_users to verify their role
create policy "Authenticated users can verify admin status"
  on public.admin_users for select
  to authenticated
  using (true);

create policy "Super admins can manage admin users"
  on public.admin_users for all
  to authenticated
  using (auth.uid() = user_id);

-- B. Categories Policies
-- Public can read all categories
drop policy if exists "Categories are viewable by everyone" on public.categories;
create policy "Categories are viewable by everyone"
  on public.categories for select
  using (true);

-- Admins can create, update, delete categories
drop policy if exists "Admins can manage categories" on public.categories;
create policy "Admins can manage categories"
  on public.categories for all
  using (public.is_admin())
  with check (public.is_admin());

-- C. Products Policies
-- Public can read published products; Admins can read both published and drafts
drop policy if exists "Published products are viewable by everyone" on public.products;
create policy "Published products are viewable by everyone"
  on public.products for select
  using (status = 'published' or public.is_admin());

-- Admins can create, update, delete products
drop policy if exists "Admins can manage products" on public.products;
create policy "Admins can manage products"
  on public.products for all
  using (public.is_admin())
  with check (public.is_admin());

-- D. Customization Enquiries Policies
-- Anyone (including anonymous visitors) can submit an enquiry
drop policy if exists "Anyone can submit an enquiry" on public.customization_enquiries;
create policy "Anyone can submit an enquiry"
  on public.customization_enquiries for insert
  with check (
    length(trim(printed_name)) > 0 and
    length(trim(delivery_address)) > 0 and
    length(trim(phone_number)) >= 10
  );

-- Only verified admins can read, update status, or delete enquiries
drop policy if exists "Admins can view enquiries" on public.customization_enquiries;
create policy "Admins can view enquiries"
  on public.customization_enquiries for select
  using (public.is_admin());

drop policy if exists "Admins can update enquiries" on public.customization_enquiries;
create policy "Admins can update enquiries"
  on public.customization_enquiries for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can delete enquiries" on public.customization_enquiries;
create policy "Admins can delete enquiries"
  on public.customization_enquiries for delete
  using (public.is_admin());

-- ====================================================================
-- Storage Bucket for Shared Product Media (Images & Videos)
-- ====================================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-media',
  'product-media',
  true,
  52428800, -- 50MB max file size
  array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'video/mp4', 'video/webm', 'video/quicktime', 'video/ogg']
)
on conflict (id) do update set
  public = true,
  file_size_limit = 52428800,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'video/mp4', 'video/webm', 'video/quicktime', 'video/ogg'];

-- Storage RLS: Public can view assets; Admins can upload, modify, delete
drop policy if exists "Public access to product-media" on storage.objects;
create policy "Public access to product-media"
  on storage.objects for select
  using (bucket_id = 'product-media');

drop policy if exists "Admins can upload to product-media" on storage.objects;
create policy "Admins can upload to product-media"
  on storage.objects for insert
  with check (bucket_id = 'product-media' and public.is_admin());

drop policy if exists "Admins can update product-media" on storage.objects;
create policy "Admins can update product-media"
  on storage.objects for update
  using (bucket_id = 'product-media' and public.is_admin());

drop policy if exists "Admins can delete from product-media" on storage.objects;
create policy "Admins can delete from product-media"
  on storage.objects for delete
  using (bucket_id = 'product-media' and public.is_admin());
