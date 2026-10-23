import React, { type ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'emerald';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#09090b] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
    md: 'text-sm px-4 py-2.5 gap-2 h-10',
    lg: 'text-base px-6 py-3.5 gap-2.5 h-12',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-600 hover:via-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/20 focus:ring-indigo-500',
    secondary:
      'bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-100 border border-zinc-700/60 shadow-sm focus:ring-zinc-500',
    outline:
      'bg-transparent hover:bg-zinc-800/60 text-zinc-200 border border-zinc-700/80 hover:border-zinc-600 focus:ring-zinc-500',
    ghost:
      'bg-transparent hover:bg-zinc-800/50 text-zinc-300 hover:text-zinc-100 focus:ring-zinc-600 border border-transparent',
    danger:
      'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-lg shadow-red-500/20 border border-red-500/30 focus:ring-red-500',
    emerald:
      'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25 border border-emerald-400/20 focus:ring-emerald-500',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon && <span className="inline-flex shrink-0 items-center">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && (
        <span className="inline-flex shrink-0 items-center">{rightIcon}</span>
      )}
    </button>
  );
};
