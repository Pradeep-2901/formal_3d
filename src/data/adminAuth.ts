/**
 * FORMEL 3D — Admin Authentication & Security Management
 * Backed strictly by Supabase Auth and the secure public.admin_users role registry.
 * No dummy credentials or local fallbacks.
 */
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'super_admin';
}

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: AdminUser;
}

/**
 * Verifies whether the provided user ID exists in the admin_users table
 */
export const verifyAdminRole = async (userId: string): Promise<{ isAdmin: boolean; role?: 'admin' | 'super_admin' }> => {
  if (!isSupabaseConfigured) {
    return { isAdmin: false };
  }

  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('role')
      .eq('user_id', userId)
      .maybeSingle();

    if (error || !data) {
      return { isAdmin: false };
    }

    return { isAdmin: true, role: data.role };
  } catch (err) {
    console.error('Failed to verify admin role', err);
    return { isAdmin: false };
  }
};

/**
 * Sign in admin with Supabase email & password
 * Enforces admin authorization: if user is not in admin_users, signs them out and denies access.
 */
export const signInAdmin = async (emailInput: string, passwordInput: string): Promise<AuthResult> => {
  if (!isSupabaseConfigured) {
    return {
      success: false,
      error: 'Supabase is not configured. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are set in .env.local.'
    };
  }

  const cleanEmail = emailInput.trim();
  const cleanPassword = passwordInput.trim();

  if (!cleanEmail || !cleanPassword) {
    return { success: false, error: 'Please enter both email and password.' };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: cleanPassword
    });

    if (error || !data.user) {
      return {
        success: false,
        error: error?.message || 'Invalid email or password. Please try again.'
      };
    }

    // Enforce admin verification via public.admin_users
    const { isAdmin, role } = await verifyAdminRole(data.user.id);
    if (!isAdmin) {
      await supabase.auth.signOut();
      return {
        success: false,
        error: 'Access denied: This account is not registered as an authorized administrator.'
      };
    }

    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email || cleanEmail,
        role: role || 'admin'
      }
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'An unexpected error occurred during authentication.'
    };
  }
};

/**
 * Checks current active session and validates admin role
 */
export const checkIsAdminAuthenticated = async (): Promise<boolean> => {
  if (!isSupabaseConfigured) return false;

  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session?.user) return false;

    const { isAdmin } = await verifyAdminRole(session.user.id);
    if (!isAdmin) {
      await supabase.auth.signOut();
      return false;
    }

    return true;
  } catch {
    return false;
  }
};

/**
 * Returns current authenticated admin user details
 */
export const getCurrentAdminUser = async (): Promise<AdminUser | null> => {
  if (!isSupabaseConfigured) return null;

  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;

    const { isAdmin, role } = await verifyAdminRole(user.id);
    if (!isAdmin) return null;

    return {
      id: user.id,
      email: user.email || '',
      role: role || 'admin'
    };
  } catch {
    return null;
  }
};

/**
 * Updates admin password in Supabase Auth
 * Requires re-authentication with current password before allowing password change.
 */
export const updateAdminPassword = async (
  currentPasswordInput: string,
  newPasswordInput: string
): Promise<{ success: boolean; error?: string }> => {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Supabase is not configured.' };
  }

  const cleanCurrent = currentPasswordInput.trim();
  const cleanNew = newPasswordInput.trim();

  if (!cleanCurrent) {
    return { success: false, error: 'Please enter your current password.' };
  }

  if (!cleanNew || cleanNew.length < 6) {
    return { success: false, error: 'New password must be at least 6 characters long.' };
  }

  try {
    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr || !user || !user.email) {
      return { success: false, error: 'No active session found. Please sign in again.' };
    }

    // Step 1: Re-authenticate to verify current password
    const { error: reauthError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: cleanCurrent
    });

    if (reauthError) {
      return { success: false, error: 'Current password is incorrect.' };
    }

    // Step 2: Update password in Supabase Auth
    const { error: updateError } = await supabase.auth.updateUser({
      password: cleanNew
    });

    if (updateError) {
      return { success: false, error: updateError.message || 'Failed to update password.' };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to update password.' };
  }
};

/**
 * Sign out of Supabase
 */
export const signOutAdmin = async (): Promise<void> => {
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.error('Failed to sign out from Supabase', err);
  }
};
