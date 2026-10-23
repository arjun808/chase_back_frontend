import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleSignInButton } from '../components/auth/GoogleSignInButton';
import { Card } from '../components/ui/Card';
import { Sparkles, ShieldCheck, ArrowLeft } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { isAuthenticated, isLoading, loginWithGoogle } = useAuth();

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Back to Home Link */}
      <div className="w-full max-w-md mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <Card className="w-full max-w-md p-8 bg-zinc-900/80 border-zinc-800 shadow-2xl relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mx-auto mb-4 shadow-lg shadow-indigo-500/10">
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className="text-2xl font-bold text-white tracking-tight">Welcome to Chaseback</h2>
          <p className="text-xs text-zinc-400 mt-2 max-w-xs mx-auto leading-relaxed">
            Never get ghosted again. Sign in to monitor your job applications and automate recruiter
            follow-ups.
          </p>
        </div>

        {/* Google Sign In Button */}
        <div className="space-y-4">
          <GoogleSignInButton onClick={loginWithGoogle} size="lg" text="Continue with Google" />

          <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-xs text-zinc-400 space-y-2">
            <div className="flex items-center gap-2 text-zinc-300 font-medium text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Enterprise Grade Privacy</span>
            </div>
            <ul className="space-y-1 text-[11px] text-zinc-400 pl-6 list-disc">
              <li>Read-only Gmail scope (`gmail.readonly`)</li>
              <li>Tokens encrypted with AES-256</li>
              <li>We never store or sell your emails</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-800/80 text-center">
          <p className="text-[11px] text-zinc-500">
            By signing in, you agree to Chaseback's{' '}
            <span className="text-zinc-400 underline cursor-pointer">Terms of Service</span> and{' '}
            <span className="text-zinc-400 underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </Card>
    </div>
  );
};
