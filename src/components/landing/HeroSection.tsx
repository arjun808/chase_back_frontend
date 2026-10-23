import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { GoogleSignInButton } from '../auth/GoogleSignInButton';
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  const { isAuthenticated, loginWithGoogle } = useAuth();

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden text-center">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-indigo-600/15 via-violet-600/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6 shadow-inner animate-in fade-in slide-in-from-bottom-2">
        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
        <span>Introducing Chaseback 1.0 — Gmail AI Application Assistant</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6">
        Never get{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400">
          ghosted again.
        </span>
      </h1>

      {/* Required Exact Tagline */}
      <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
        AI-powered application tracker and reply assistant for your Gmail inbox.
      </p>

      {/* CTA Section */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-10">
        {isAuthenticated ? (
          <Link to="/dashboard" className="w-full">
            <button className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all">
              <span>Go to Your Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        ) : (
          <div className="w-full">
            <GoogleSignInButton
              onClick={loginWithGoogle}
              text="Sign in with Google"
              size="lg"
            />
            <p className="text-xs text-zinc-500 mt-2.5 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Read-only permissions. 100% confidential.</span>
            </p>
          </div>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-zinc-800/80 text-left">
        <div className="p-3">
          <div className="text-2xl font-bold text-zinc-100">82%</div>
          <div className="text-xs text-zinc-400">Response recovery with AI follow-ups</div>
        </div>
        <div className="p-3">
          <div className="text-2xl font-bold text-zinc-100">&lt; 30s</div>
          <div className="text-xs text-zinc-400">To connect & auto-index your applications</div>
        </div>
        <div className="p-3">
          <div className="text-2xl font-bold text-zinc-100">0 min</div>
          <div className="text-xs text-zinc-400">Manual data entry or spreadsheet updates</div>
        </div>
        <div className="p-3">
          <div className="text-2xl font-bold text-zinc-100">256-bit</div>
          <div className="text-xs text-zinc-400">Bank-level AES encryption on all tokens</div>
        </div>
      </div>
    </section>
  );
};
