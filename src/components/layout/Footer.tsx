import React from 'react';
import { ShieldCheck, Lock, Mail, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand + Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-semibold text-zinc-200">Chaseback</span>
              <span className="text-xs text-zinc-500">— Never get ghosted again</span>
            </div>
            <p className="text-xs text-zinc-400">
              AI-powered job application tracker and reply assistant for your Gmail inbox.
            </p>
          </div>

          {/* Security Badges */}
          <div className="flex items-center flex-wrap justify-center gap-4 text-xs text-zinc-400">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Read-Only Gmail Scope</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
              <Lock className="w-3.5 h-3.5 text-indigo-400" />
              <span>256-Bit Encrypted Tokens</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>No Email Content Stored</span>
            </span>
          </div>
        </div>

        <div className="border-t border-zinc-800/60 mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-2">
          <p>© {new Date().getFullYear()} Chaseback Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-zinc-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-zinc-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-zinc-400 cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
