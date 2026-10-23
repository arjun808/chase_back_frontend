import React from 'react';
import type { DashboardStats } from '../../types/tracker';
import { StatCard } from './StatCard';
import { Briefcase, Hourglass, BellRing, Ghost } from 'lucide-react';

interface StatsGridProps {
  stats: DashboardStats;
  isLoading?: boolean;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats, isLoading = false }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Active Applications */}
      <StatCard
        label="Active Applications"
        value={stats.activeApplications}
        icon={<Briefcase className="w-5 h-5" />}
        iconGradient="bg-gradient-to-tr from-indigo-600 to-indigo-400"
        badgeText="In Pipeline"
        badgeVariant="purple"
        description="Applied & in review"
        isLoading={isLoading}
      />

      {/* 2. Waiting on Recruiter */}
      <StatCard
        label="Waiting on Recruiter"
        value={stats.waitingOnRecruiter}
        icon={<Hourglass className="w-5 h-5" />}
        iconGradient="bg-gradient-to-tr from-sky-600 to-cyan-400"
        badgeText="Pending"
        badgeVariant="info"
        description="Awaiting response (< 7d)"
        isLoading={isLoading}
      />

      {/* 3. Needs Follow-up */}
      <StatCard
        label="Needs Follow-up"
        value={stats.needsFollowUp}
        icon={<BellRing className="w-5 h-5" />}
        iconGradient="bg-gradient-to-tr from-amber-600 to-amber-400"
        badgeText="Take Action"
        badgeVariant="warning"
        description="No reply for 7-14 days"
        isLoading={isLoading}
      />

      {/* 4. Ghosted / Inactive */}
      <StatCard
        label="Ghosted / Inactive"
        value={stats.ghostedOrInactive}
        icon={<Ghost className="w-5 h-5" />}
        iconGradient="bg-gradient-to-tr from-rose-600 to-rose-400"
        badgeText="Cold"
        badgeVariant="error"
        description="No response > 14 days"
        isLoading={isLoading}
      />
    </div>
  );
};
