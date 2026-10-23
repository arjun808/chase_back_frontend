import React from 'react';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'purple';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  pulse?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  pulse = false,
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full select-none';

  const sizeStyles: Record<BadgeSize, string> = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  const variantStyles: Record<BadgeVariant, { badge: string; dot: string }> = {
    success: {
      badge: 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30',
      dot: 'bg-emerald-400',
    },
    warning: {
      badge: 'bg-amber-950/60 text-amber-300 border border-amber-500/30',
      dot: 'bg-amber-400',
    },
    error: {
      badge: 'bg-rose-950/60 text-rose-300 border border-rose-500/30',
      dot: 'bg-rose-400',
    },
    info: {
      badge: 'bg-sky-950/60 text-sky-300 border border-sky-500/30',
      dot: 'bg-sky-400',
    },
    neutral: {
      badge: 'bg-zinc-800/80 text-zinc-300 border border-zinc-700/60',
      dot: 'bg-zinc-400',
    },
    purple: {
      badge: 'bg-indigo-950/60 text-indigo-300 border border-indigo-500/30',
      dot: 'bg-indigo-400',
    },
  };

  const currentVariant = variantStyles[variant];

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${currentVariant.badge} ${className}`}>
      {dot && (
        <span className="relative flex h-2 w-2 shrink-0">
          {pulse && (
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentVariant.dot}`}
            />
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${currentVariant.dot}`} />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
};
