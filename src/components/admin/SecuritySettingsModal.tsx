import React, { useState, useEffect } from 'react';
import { 
  X, Lock, KeyRound, ShieldCheck, 
  AlertCircle, CheckCircle, Eye, EyeOff 
} from 'lucide-react';
import { 
  getCurrentAdminUser, 
  updateAdminPassword 
} from '../../data/adminAuth';

interface SecuritySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessToast: (message: string) => void;
}

export const SecuritySettingsModal: React.FC<SecuritySettingsModalProps> = ({
  isOpen,
  onClose,
  onSuccessToast
}) => {
  const [adminEmail, setAdminEmail] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      getCurrentAdminUser().then((user) => {
        if (user) {
          setAdminEmail(user.email);
        }
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setErrorMessage(null);
      setSuccessMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const trimmedCurrent = currentPassword.trim();
    const trimmedNew = newPassword.trim();
    const trimmedConfirm = confirmPassword.trim();

    if (!trimmedCurrent) {
      setErrorMessage('Please enter your current password.');
      return;
    }

    if (!trimmedNew || trimmedNew.length < 6) {
      setErrorMessage('New password must be at least 6 characters long.');
      return;
    }

    if (trimmedNew !== trimmedConfirm) {
      setErrorMessage('New password and confirmation do not match.');
      return;
    }

    if (trimmedCurrent === trimmedNew) {
      setErrorMessage('New password must be different from current password.');
      return;
    }

    setIsSaving(true);
    try {
      const res = await updateAdminPassword(trimmedCurrent, trimmedNew);
      if (res.success) {
        setSuccessMessage('Password updated successfully!');
        onSuccessToast('Admin password updated successfully in Supabase.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        setErrorMessage(res.error || 'Failed to update password.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'An error occurred while updating password.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      
      <div className="clay-card-cream rounded-3xl w-full max-w-lg p-6 sm:p-8 border-2 border-white shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#563829]/15">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#C6A15B]/20 border border-[#C6A15B]/40 flex items-center justify-center text-[#8D6E14]">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#242322]">
                Admin Security & Password
              </h2>
              <span className="text-[11px] text-[#563829]/75 block">
                Update authenticated Supabase admin password
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-black/5 text-[#563829]/60 hover:text-[#242322] cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Info Strip */}
        <div className="mb-5 p-3 rounded-2xl bg-white/80 border border-[#563829]/10 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#563829]">
            <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
            <span>Active Admin: <strong className="text-[#242322] font-semibold">{adminEmail || 'Loading...'}</strong></span>
          </div>
          <span className="text-[10px] text-[#2E7D32] font-medium bg-[#2E7D32]/10 px-2 py-0.5 rounded-md">
            Supabase Protected
          </span>
        </div>

        {/* Alerts */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-200 text-xs font-semibold text-green-800 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Change Form */}
        <form onSubmit={handleUpdate} className="space-y-4">
          
          {/* Current Password */}
          <div>
            <label className="block text-xs font-bold text-[#242322] mb-1">
              Current Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#563829]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showCurrentPass ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password to verify identity"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-[#563829]/20 focus:border-[#C6A15B] focus:outline-none text-xs text-[#242322]"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPass(!showCurrentPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#563829]/50 hover:text-[#242322] cursor-pointer"
              >
                {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <span className="text-[10px] text-[#563829]/65 mt-1 block">
              Required for security re-authentication before updating password.
            </span>
          </div>

          <div className="pt-2 border-t border-[#563829]/10">
            <span className="text-xs font-bold text-[#C6A15B] uppercase tracking-wider block mb-3">
              New Password
            </span>

            {/* New Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#242322] mb-1">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#563829]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-white border border-[#563829]/20 focus:border-[#C6A15B] focus:outline-none text-xs text-[#242322]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#563829]/50 hover:text-[#242322] cursor-pointer"
                  >
                    {showNewPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#242322] mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#563829]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirmPass ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-type new password"
                    className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-white border border-[#563829]/20 focus:border-[#C6A15B] focus:outline-none text-xs text-[#242322]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#563829]/50 hover:text-[#242322] cursor-pointer"
                  >
                    {showConfirmPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#563829]/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl clay-btn-soft text-xs font-semibold text-[#563829] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#242322] shadow-md transition-all cursor-pointer ${
                isSaving ? 'opacity-60 bg-[#E8DECE]' : 'clay-btn-gold hover:scale-[1.02]'
              }`}
            >
              {isSaving ? 'Updating...' : 'Update Password'}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
