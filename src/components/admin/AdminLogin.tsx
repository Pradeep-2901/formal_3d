import React, { useState } from 'react';
import { 
  Lock, User, Eye, EyeOff, ArrowLeft, ShieldCheck, 
  AlertCircle, KeyRound 
} from 'lucide-react';
import { signInAdmin } from '../../data/adminAuth';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onExit: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onExit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await signInAdmin(trimmedUsername, trimmedPassword);
      if (res.success) {
        onLoginSuccess();
      } else {
        setErrorMessage(res.error || 'Invalid username or password.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'An unexpected error occurred during authentication.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF3E2] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden font-sans selection:bg-[#D3B8F5]/50 selection:text-[#563829]">
      
      {/* Background Decorative Clay Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#EAE2F8]/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#FEF1CD]/60 blur-3xl pointer-events-none" />

      {/* Top Navigation Bar: Return to Public Storefront */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between">
        <button
          onClick={onExit}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl clay-btn-soft text-xs font-semibold text-[#563829] cursor-pointer hover:bg-white transition-all shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Storefront</span>
        </button>

        <span className="text-[11px] font-semibold text-[#563829]/60 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
          <span>Admin Portal</span>
        </span>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md clay-card-cream rounded-3xl p-7 sm:p-9 border-2 border-white shadow-xl relative z-10">
        
        {/* Studio Brand Header */}
        <div className="text-center pb-6 border-b border-[#563829]/15 mb-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#080A0A] border-2 border-[#C6A15B] flex items-center justify-center shadow-md mb-3.5 group hover:scale-105 transition-transform">
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#C6A15B]" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="rgba(198,161,91,0.25)"/>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#242322] tracking-tight">
            FORMEL 3D
          </h1>
          <p className="text-xs font-semibold text-[#C6A15B] uppercase tracking-widest mt-1">
            Studio Admin Authentication
          </p>
          <p className="text-xs text-[#563829]/75 mt-1.5 leading-relaxed">
            Please sign in with your authorized admin credentials to manage creations, categories, and customer custom enquiries.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs font-medium text-red-700 flex items-center gap-2.5 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Username Field */}
          <div>
            <label htmlFor="adminUsername" className="block text-xs font-bold text-[#242322] mb-1.5">
              Admin Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#563829]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="adminUsername"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="Enter admin username"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#563829]/20 focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/20 focus:outline-none text-xs text-[#242322] shadow-2xs font-medium transition-all"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="adminPassword" className="block text-xs font-bold text-[#242322] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#563829]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="adminPassword"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-[#563829]/20 focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/20 focus:outline-none text-xs text-[#242322] shadow-2xs font-medium transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#563829]/50 hover:text-[#242322] cursor-pointer p-1"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-2xl text-xs font-bold uppercase tracking-wider text-[#242322] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isSubmitting
                  ? 'opacity-60 bg-[#E8DECE] cursor-not-allowed'
                  : 'clay-btn-gold hover:scale-[1.02]'
              }`}
            >
              <KeyRound className="w-4 h-4" />
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Studio'}</span>
            </button>
          </div>

        </form>

        {/* Security Note Footer */}
        <div className="mt-6 pt-4 border-t border-[#563829]/15 text-center">
          <p className="text-[11px] text-[#563829]/65">
            Protected by Supabase Auth with Row-Level Security (RLS) enforcement.
          </p>
        </div>

      </div>

    </div>
  );
};
