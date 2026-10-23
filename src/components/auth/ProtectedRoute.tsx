import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sparkles } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-4">
        <div className="relative flex flex-col items-center">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 mb-6 shadow-[0_0_40px_rgba(99,102,241,0.25)]">
            <Sparkles className="w-8 h-8 animate-pulse text-indigo-400" />
            <div className="absolute inset-0 rounded-2xl border-2 border-indigo-500/40 animate-ping opacity-25" />
          </div>
          <h3 className="text-lg font-semibold text-zinc-100">Verifying session...</h3>
          <p className="text-sm text-zinc-400 mt-1">Checking Chaseback credentials</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
