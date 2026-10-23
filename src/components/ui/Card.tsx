import React, { type HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: 'none' | 'indigo' | 'emerald' | 'purple';
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glow = 'none',
  hoverEffect = false,
  ...props
}) => {
  const glowStyles = {
    none: '',
    indigo: 'hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] hover:border-indigo-500/30',
    emerald: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:border-emerald-500/30',
    purple: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:border-purple-500/30',
  };

  return (
    <div
      className={`glass-card rounded-2xl p-6 text-zinc-100 transition-all duration-300 ${
        hoverEffect ? 'hover:-translate-y-0.5' : ''
      } ${glowStyles[glow]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col space-y-1.5 pb-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <h3
      className={`text-lg font-semibold leading-none tracking-tight text-zinc-50 ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <p className={`text-sm text-zinc-400 mt-1 leading-relaxed ${className}`} {...props}>
      {children}
    </p>
  );
};

export const CardContent: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex items-center pt-4 border-t border-zinc-800/80 ${className}`} {...props}>
      {children}
    </div>
  );
};
