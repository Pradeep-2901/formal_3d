import React from 'react';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#111413] border border-[#D6B477] shadow-2xl shadow-black text-xs font-mono-tech text-[#F4F0E7]">
        <CheckCircle2 className="w-4 h-4 text-[#D6B477]" />
        <span>{message}</span>
        <button onClick={onClose} className="text-[#A6A69F] hover:text-[#F4F0E7] ml-2">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
