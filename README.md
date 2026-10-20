# FORMEL 3D — Bespoke 3D Printing Studio & Catalog

FORMEL 3D is a modern web application and product showcase platform for custom 3D printed creations, kids' sensory toys & puzzles, personalized name stands, and bespoke engineering prints.

Built with a tactile, claymorphic design language, smooth interactive product customizers, official WhatsApp ordering, and a secure Supabase-backed Studio Admin Portal.

---

## 🚀 Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS v4, Custom Claymorphic Design System
- **Icons & Assets:** Lucide React, Canvas Confetti, Vector SVGs
- **Backend & Auth:** Supabase (Email/Password Auth, Row-Level Security, PostgreSQL, Media Storage)

---

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/SOUNTHAR-R/Formel_3D.git
cd Formel_3D
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your Supabase credentials in `.env.local`:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-anon-key
```

### 4. Run development server
```bash
npm run dev
```

### 5. Build for production
```bash
npm run build
```

---

## 🛡️ Studio Admin Portal

The project includes an integrated Studio Admin Portal for catalog management:
- Secure authentication via Supabase Auth.
- Authorization enforced at the database level using `public.admin_users` and RLS policies.
- In-portal password management with re-authentication.
- Product publishing, drafting, duplication, and media management.
