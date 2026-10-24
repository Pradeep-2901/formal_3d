-- ====================================================================
-- FORMEL 3D — Add Username-Based Authentication Support
-- Allows the store owner to log in using a custom username (e.g. 'admin')
-- without exposing personal emails in login prompts or interface headers.
-- ====================================================================

-- 1. Add username column and index to admin_users table
alter table public.admin_users 
  add column if not exists username text unique;

create index if not exists idx_admin_users_username 
  on public.admin_users(lower(username));

-- 2. Create secure definer function to resolve username/alias to auth email
create or replace function public.get_admin_email_by_username(p_username text)
returns text
language sql
security definer
set search_path = public
stable
as $$
  select email from public.admin_users
  where lower(trim(username)) = lower(trim(p_username))
     or lower(trim(email)) = lower(trim(p_username))
     or lower(trim(split_part(email, '@', 1))) = lower(trim(p_username))
  limit 1;
$$;

-- 3. Grant execute permission so login form can resolve username before authenticating
grant execute on function public.get_admin_email_by_username(text) to anon, authenticated;
