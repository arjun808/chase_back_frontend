import React, { type HTMLAttributes } from 'react';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-lg bg-zinc-800/80 border border-zinc-700/20 ${className}`}
      {...props}
    />
  );
};
