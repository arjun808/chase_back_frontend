import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import {
  Sparkles,
  LogOut,
  ChevronDown,
  LayoutDashboard,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      toast.info('Logged out successfully', 'See you back soon!');
      navigate('/');
    } catch {
      toast.error('Logout error', 'Failed to complete logout request');
    } finally {
      setIsLoggingOut(false);
      setIsDropdownOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/35 transition-all">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
              Chaseback
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              AI
            </span>
          </div>
        </Link>

        {/* Right Navigation */}
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex items-center gap-3 p-1.5 pr-3 rounded-full bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 transition-all cursor-pointer select-none"
              >
                <Avatar name={user.name} email={user.email} size="sm" />
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-semibold text-zinc-100 max-w-[130px] truncate">
                    {user.name}
                  </span>
                  <span className="text-[11px] text-zinc-400 max-w-[130px] truncate">
                    {user.email}
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 rounded-xl glass-panel border border-zinc-700/80 shadow-2xl py-2 z-40 animate-in fade-in zoom-in-95">
                    {/* User summary in dropdown */}
                    <div className="px-4 py-2.5 border-b border-zinc-800/80">
                      <p className="text-xs text-zinc-400">Signed in as</p>
                      <p className="text-sm font-semibold text-zinc-100 truncate">{user.name}</p>
                      <p className="text-xs text-zinc-400 truncate mt-0.5">{user.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-indigo-400" />
                        Dashboard
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-zinc-800/80">
                      <button
                        type="button"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex items-center gap-2.5 w-full text-left px-4 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-rose-400" />
                        <span>{isLoggingOut ? 'Logging out...' : 'Log out'}</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link to="/login">
                <Button variant="primary" size="sm">
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
