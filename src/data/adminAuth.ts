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
 * Verifies whether the provided user ID or email exists in the admin_users table
 */
export const verifyAdminRole = async (
  userId: string, 
  email?: string
): Promise<{ isAdmin: boolean; role?: 'admin' | 'super_admin'; error?: string }> => {
  if (!isSupabaseConfigured) {
    return { isAdmin: false, error: 'Supabase is not configured' };
  }

  try {
    let query = supabase.from('admin_users').select('role, user_id, email');
    
    if (email && email.trim()) {
      query = query.or(`user_id.eq.${userId},email.ilike.${email.trim()}`);
    } else {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      console.error('[verifyAdminRole] Supabase query error:', error);
      return { isAdmin: false, error: error.message };
    }

    if (!data) {
      console.warn('[verifyAdminRole] No admin_users row found for:', { userId, email });
      return { isAdmin: false, error: 'Account not found in public.admin_users' };
    }

    // Auto-link user_id if it was registered with null or different ID
    if (data.user_id !== userId && email) {
      await supabase
        .from('admin_users')
        .update({ user_id: userId })
        .ilike('email', email.trim());
    }

    return { isAdmin: true, role: data.role };
  } catch (err: any) {
    console.error('Failed to verify admin role', err);
    return { isAdmin: false, error: err?.message };
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

    // Enforce admin verification via public.admin_users (matching by UUID or email)
    const { isAdmin, role, error: roleError } = await verifyAdminRole(data.user.id, data.user.email || cleanEmail);
    if (!isAdmin) {
      await supabase.auth.signOut();
      const detail = roleError ? ` (${roleError})` : '';
      return {
        success: false,
        error: `Access denied: This account is not registered as an authorized administrator.${detail}`
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
 * Checks current active session and validates admin role with live server verification.
 * Uses getUser() to ensure revoked, expired, or superseded tokens are rejected.
 */
export const checkIsAdminAuthenticated = async (): Promise<boolean> => {
  if (!isSupabaseConfigured) return false;

  try {
    // Actively validate token against Supabase Auth server (rejects revoked tokens)
    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr || !user) {
      // Local token is invalid, expired, or revoked on another device
      await supabase.auth.signOut({ scope: 'local' });
      return false;
    }

    const { isAdmin } = await verifyAdminRole(user.id, user.email);
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
 * Returns current authenticated admin user details with live server check
 */
export const getCurrentAdminUser = async (): Promise<AdminUser | null> => {
  if (!isSupabaseConfigured) return null;

  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;

    const { isAdmin, role } = await verifyAdminRole(user.id, user.email);
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
 * Immediately revokes active sessions on other devices (e.g., laptop/mobile) so they must re-authenticate.
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

    // Step 3: Invalidate all other active sessions across other devices
    // This guarantees that if password was changed on mobile, laptop is signed out immediately!
    try {
      await supabase.auth.signOut({ scope: 'others' });
    } catch (signOutErr) {
      console.warn('[Supabase Auth] Note on scope:others signout:', signOutErr);
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
