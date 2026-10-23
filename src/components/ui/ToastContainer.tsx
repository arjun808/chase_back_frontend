import React from 'react';
import { useToast, type ToastType } from '../../context/ToastContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  const icons: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />,
  };

  const borders: Record<ToastType, string> = {
    success: 'border-emerald-500/30 bg-emerald-950/40',
    warning: 'border-amber-500/30 bg-amber-950/40',
    error: 'border-rose-500/30 bg-rose-950/40',
    info: 'border-sky-500/30 bg-sky-950/40',
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl backdrop-blur-xl border shadow-xl shadow-black/40 text-zinc-100 transition-all duration-300 animate-in fade-in slide-in-from-top-3 ${borders[toast.type]}`}
        >
          <div className="mt-0.5">{icons[toast.type]}</div>
          <div className="flex-1 min-w-0">
            <h5 className="text-sm font-semibold text-zinc-100">{toast.title}</h5>
            {toast.message && (
              <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">{toast.message}</p>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-zinc-400 hover:text-zinc-100 p-1 rounded-md transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
