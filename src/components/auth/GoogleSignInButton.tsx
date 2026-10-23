import React from 'react';
import { Loader2 } from 'lucide-react';

export interface GoogleSignInButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
  text?: string;
  className?: string;
  size?: 'md' | 'lg';
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onClick,
  isLoading = false,
  text = 'Continue with Google',
  className = '',
  size = 'lg',
}) => {
  const sizeStyles = {
    md: 'py-2.5 px-5 text-sm h-11',
    lg: 'py-3.5 px-6 text-base h-13',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className={`group relative inline-flex items-center justify-center gap-3 w-full font-medium rounded-xl text-zinc-100 bg-zinc-900/90 hover:bg-zinc-800/90 border border-zinc-700/80 hover:border-zinc-500/80 shadow-lg shadow-black/30 hover:shadow-indigo-500/10 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.99] ${sizeStyles[size]} ${className}`}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
      ) : (
        <svg
          className="w-5 h-5 shrink-0 transition-transform group-hover:scale-105"
          viewBox="0 0 24 24"
        >
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
          />
        </svg>
      )}
      <span className="font-semibold tracking-tight">{text}</span>
    </button>
  );
};
