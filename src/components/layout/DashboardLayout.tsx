import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-slate-100 relative selection:bg-indigo-500 selection:text-white">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] radial-glow-purple opacity-70" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[400px] radial-glow-emerald opacity-50" />
      </div>

      <Navbar />

      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <Footer />
    </div>
  );
};
