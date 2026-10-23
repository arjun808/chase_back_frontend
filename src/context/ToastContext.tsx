import React, { createContext, useContext, useState, useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => void;
  removeToast: (id: string) => void;
  toast: {
    success: (title: string, message?: string) => void;
    error: (title: string, message?: string) => void;
    info: (title: string, message?: string) => void;
    warning: (title: string, message?: string) => void;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const addToast = useCallback(
    ({ type, title, message, duration = 4500 }: Omit<ToastItem, 'id'>) => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      setToasts((prev) => [...prev, { id, type, title, message, duration }]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const toastHelpers = {
    success: (title: string, message?: string) => addToast({ type: 'success', title, message }),
    error: (title: string, message?: string) => addToast({ type: 'error', title, message }),
    info: (title: string, message?: string) => addToast({ type: 'info', title, message }),
    warning: (title: string, message?: string) => addToast({ type: 'warning', title, message }),
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, toast: toastHelpers }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
