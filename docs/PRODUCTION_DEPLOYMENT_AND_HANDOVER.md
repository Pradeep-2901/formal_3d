# FORMEL 3D — Production Deployment & Business Owner Handover Guide

This document contains step-by-step instructions for deploying the **FORMEL 3D** application to production and handing over management to the business owner.

---

## 1. Summary of Architectural Improvements Completed

1. **Cross-Device Password & Session Behavior (Fixed):**
   * Password changes in the Admin Portal now execute `supabase.auth.signOut({ scope: 'others' })`, invalidating all active refresh tokens on other devices (e.g., laptop).
   * Active session checks now use `supabase.auth.getUser()`, which validates token authenticity against Supabase Auth servers rather than trusting stale browser `localStorage`. When a token is revoked or invalidated on another device, the local session terminates immediately.
   * Attempting fresh logins with old credentials fails with an explicit error message.

2. **Cloud Database & Row-Level Security (PostgreSQL):**
   * Created idempotent SQL migration ([supabase/migrations/20261024000000_formel3d_core_schema.sql](file:///d:/Formel_3D/supabase/migrations/20261024000000_formel3d_core_schema.sql)).
   * Tables: `public.admin_users`, `public.categories`, `public.products`, `public.customization_enquiries`.
   * Enforced Row-Level Security (RLS):
     * Products: Public can read published items; only verified `admin_users` can create, edit, or delete.
     * Enquiries: Public visitors can insert custom orders; only verified `admin_users` can view, update status, or delete.
     * Categories: Public can read; only `admin_users` can modify.

3. **Hybrid Resilient Storage Service:**
   * Customer enquiries submitted on any customer phone/laptop are now saved directly into the cloud `customization_enquiries` table, appearing in the owner's Admin Portal in real time.
   * Hybrid caching ensures the public storefront loads instantly from local cache while syncing fresh updates in the background. If the database connection is interrupted, the storefront continues operating smoothly without downtime.

4. **Hosted Shared Media (Supabase Storage):**
   * Configured `product-media` bucket (public read, authenticated admin upload/delete).
   * Media uploads in the Admin Portal automatically upload to Supabase Storage, ensuring images and video clips resolve across all devices.
   * Preserved all existing static SVG vector files in `/images/products/` so no existing product visuals are affected.

5. **Performance & Code-Splitting:**
   * Code-split the Studio Admin Portal with `React.lazy()` and `Suspense`.
   * Configured vendor code-splitting in Vite 8.
   * Primary visitor bundle dropped from **665 kB** to **136 kB** (29.7 kB gzipped).

6. **Deployment Configuration:**
   * Created `vercel.json` with SPA routing rewrites, security headers (`nosniff`, `DENY` clickjacking, strict referrer), and image cache control.

---

## 2. Action Items for the User & Business Owner

Follow these sequential steps to connect your cloud infrastructure and deploy:

### Step 1: Create Supabase Project & Run Database Migrations

1. Go to [https://supabase.com](https://supabase.com) and create an account or sign in.
2. Click **New Project**:
   * Name: `FORMEL 3D`
   * Database Password: *Choose a strong password and save it securely.*
   * Region: Choose the region closest to your customers (e.g., `South Asia (Mumbai)` for India).
3. Once the project is created, open the **SQL Editor** from the left sidebar.
4. Copy the entire contents of [supabase/migrations/20261024000000_formel3d_core_schema.sql](file:///d:/Formel_3D/supabase/migrations/20261024000000_formel3d_core_schema.sql) and paste into the SQL Editor. Click **Run**.
5. Copy the entire contents of [supabase/seed.sql](file:///d:/Formel_3D/supabase/seed.sql) and paste into the SQL Editor. Click **Run**.
   *(This populates all 5 categories and 11 initial products).*

---

### Step 2: Create the Admin User & Configure Username Login

The Admin Portal uses **Username & Password** authentication so that you never have to share or expose your personal email to clients or team members.

1. In your Supabase Dashboard, navigate to **Authentication** -> **Users**.
2. If not already created, click **Add User** -> **Create User**:
   * Enter your admin email (e.g., `admin@formel3d.com` or your personal email).
   * Enter your chosen admin password.
   * Check **Auto Confirm User?** -> Click **Create User**.
3. Open the **SQL Editor** in Supabase and run the following script:
   ```sql
   -- 1. Enable username column & RPC resolver
   alter table public.admin_users add column if not exists username text unique;
   create index if not exists idx_admin_users_username on public.admin_users(lower(username));

   create or replace function public.get_admin_email_by_username(p_username text)
   returns text language sql security definer set search_path = public stable as $$
     select email from public.admin_users
     where lower(trim(username)) = lower(trim(p_username))
        or lower(trim(email)) = lower(trim(p_username))
        or lower(trim(split_part(email, '@', 1))) = lower(trim(p_username))
     limit 1;
   $$;
   grant execute on function public.get_admin_email_by_username(text) to anon, authenticated;

   -- 2. Set the desired admin username (e.g. 'admin' or 'formel_admin')
   -- Replace 'pradeepsai2901@gmail.com' with the email used in Supabase Auth if different:
   update public.admin_users
   set username = 'admin'
   where lower(trim(email)) = lower(trim('pradeepsai2901@gmail.com'));
   ```
4. Now, the business owner can simply log in at `#admin` using:
   * **Username:** `admin` (or whatever handle you chose)
   * **Password:** *(The admin password)*

---

### Step 3: Configure Local Environment

1. In your local repository root, create `.env.local` by copying `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
2. In Supabase Dashboard, go to **Project Settings** -> **API**:
   * Copy **Project URL** -> paste as `VITE_SUPABASE_URL`
   * Copy **anon / public key** -> paste as `VITE_SUPABASE_PUBLISHABLE_KEY`
3. Save `.env.local`. Test locally by running:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173/#admin` and verify you can sign in with your admin credentials.

---

### Step 4: Deploy to Vercel

1. Push your repository to GitHub (ensure `.env.local` is **NOT** committed; it is already in `.gitignore`).
2. Go to [https://vercel.com](https://vercel.com) and log in.
3. Click **Add New...** -> **Project** -> Select your `Formel_3D` repository.
4. In the **Environment Variables** section, add the two variables:
   * `VITE_SUPABASE_URL` = *(Your Supabase Project URL)*
   * `VITE_SUPABASE_PUBLISHABLE_KEY` = *(Your Supabase Publishable Anon Key)*
5. Click **Deploy**. Vercel will build and deploy the application in under a minute.

---

### Step 5: Configure Supabase Auth Redirect URLs

1. In Supabase Dashboard, go to **Authentication** -> **URL Configuration**.
2. Set **Site URL** to your Vercel deployment URL (e.g., `https://formel-3d.vercel.app` or your custom domain).
3. Under **Redirect URLs**, add:
   * `https://your-domain.vercel.app/**`
   * `http://localhost:5173/**`
4. Click **Save**.

---

### Step 6: Production Verification Checklist

* [ ] **Customer Journey:** Open your live URL on mobile. Type a name in the live 3D preview on the home page.
* [ ] **Enquiry Flow:** Fill out the customizer form and submit. Verify:
  * Enquiry summary opens in WhatsApp with pre-filled message directed to `+91 8438594772`.
  * Enquiry record appears in the Supabase `customization_enquiries` table.
* [ ] **Admin Portal:** Visit `#admin` on your laptop. Verify the customer enquiry appears under the **Enquiries** tab.
* [ ] **Cross-Device Sync:** Change a product's description or add a new creation on your laptop. Refresh your mobile phone and confirm the change is visible.
* [ ] **Security Test:** Change your password in **Security Settings**. Verify that other devices are signed out and require the new password.

---

## 3. Business Owner Maintenance & Operations

### Managing Products & Categories
* Navigate to your website and click the small lock icon in the footer (or go to `your-site.com/#admin`).
* **Add a creation:** Click **New Creation**. Enter product name, material, layer height, and print time. Select an SVG preset or upload a custom photo/video.
* **Visibility:** Toggle between **Published** (live on storefront) and **Draft** (hidden from visitors).
* **Categories:** Add or edit category cards with custom pastel accent colors.

### Reviewing Customer Enquiries
* Open the **Customer Enquiries** tab in the Admin Portal.
* View customer names, motif preferences, phone numbers, delivery addresses, and postal PIN codes.
* Contact the customer directly via phone or WhatsApp to confirm order details and initiate 3D printing.

### Backing Up Data
* In the Admin Portal, open the **Backup & Restore** tab.
* Click **Export Catalog JSON** once a month to keep an offline backup file on your local machine.
* Supabase also creates automated daily PostgreSQL backups on their infrastructure.

### Emergency Rollback
* If you ever make an accidental deletion or mistake in the Admin Portal, use the **Export Catalog JSON** file to restore, or re-run `supabase/seed.sql` in the Supabase SQL editor to reset to initial studio creations.
