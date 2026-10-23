import React from 'react';
import { Card } from '../ui/Card';
import { Badge, type BadgeVariant } from '../ui/Badge';
import { Skeleton } from '../ui/Skeleton';

export interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  iconGradient: string;
  badgeText?: string;
  badgeVariant?: BadgeVariant;
  description?: string;
  isLoading?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  iconGradient,
  badgeText,
  badgeVariant = 'neutral',
  description,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <Card className="p-5 border-zinc-800">
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <Skeleton className="w-16 h-5 rounded-full" />
        </div>
        <Skeleton className="h-8 w-20 mb-2" />
        <Skeleton className="h-4 w-32" />
      </Card>
    );
  }

  return (
    <Card hoverEffect className="p-5 border-zinc-800/80 bg-zinc-900/60 transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md ${iconGradient}`}
        >
          {icon}
        </div>
        {badgeText && (
          <Badge variant={badgeVariant} size="sm">
            {badgeText}
          </Badge>
        )}
      </div>

      <div className="space-y-1">
        <div className="text-2xl font-bold tracking-tight text-zinc-100">{value}</div>
        <div className="text-xs font-semibold text-zinc-300">{label}</div>
        {description && <div className="text-[11px] text-zinc-400 mt-1">{description}</div>}
      </div>
    </Card>
  );
};
