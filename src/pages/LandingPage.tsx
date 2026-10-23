import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { GoogleSignInButton } from '../components/auth/GoogleSignInButton';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { isAuthenticated, loginWithGoogle } = useAuth();

  return (
    <div className="space-y-12">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />

      {/* Bottom CTA Card */}
      <section className="py-12">
        <div className="relative rounded-3xl overflow-hidden glass-card border border-indigo-500/30 p-8 md:p-12 text-center bg-gradient-to-b from-indigo-950/40 via-zinc-900 to-zinc-950 shadow-2xl shadow-indigo-500/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to take control of your applications?
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Connect your Gmail in seconds and never wonder if a recruiter ghosted you again.
            </p>

            <div className="pt-4 max-w-xs mx-auto">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <button className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all">
                    <span>Enter Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              ) : (
                <GoogleSignInButton onClick={loginWithGoogle} size="md" />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
