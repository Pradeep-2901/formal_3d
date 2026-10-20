import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseKey = (
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  ''
).trim();

// Configuration check: validates URL format and non-empty key
export const isSupabaseConfigured: boolean = Boolean(
  supabaseUrl &&
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('your-project-id') &&
  supabaseKey &&
  supabaseKey.length > 20 &&
  !supabaseKey.includes('your-supabase')
);

if (!isSupabaseConfigured) {
  const missingFields: string[] = [];
  if (!supabaseUrl || supabaseUrl.includes('your-project-id')) {
    missingFields.push('VITE_SUPABASE_URL');
  }
  if (!supabaseKey || supabaseKey.includes('your-supabase') || supabaseKey.length <= 20) {
    missingFields.push('VITE_SUPABASE_PUBLISHABLE_KEY');
  }

  console.warn(
    `[Supabase] Configuration incomplete. Missing: ${missingFields.join(', ')}. ` +
    `Please set these environment variables in .env.local to enable cloud database & storage.`
  );
}

// Initialize client safely. If configuration is missing, use safe placeholders to avoid app startup crashes.
export const supabase: SupabaseClient = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://placeholder.supabase.co',
  isSupabaseConfigured ? supabaseKey : 'placeholder-anon-key'
);
