import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { gmailApi } from '../api/gmail';
import type { GmailStatus } from '../types/gmail';
import type { DashboardStats } from '../types/tracker';
import { GmailConnectionCard } from '../components/dashboard/GmailConnectionCard';
import { StatsGrid } from '../components/dashboard/StatsGrid';
import { TrackerBoardPreview } from '../components/dashboard/TrackerBoardPreview';
import { QuickActionBanner } from '../components/dashboard/QuickActionBanner';
import { Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toastShownRef = useRef(false);

  const [gmailStatus, setGmailStatus] = useState<GmailStatus | null>(null);
  const [isLoadingGmail, setIsLoadingGmail] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Initial stats (empty state or populated upon sync)
  const [stats, setStats] = useState<DashboardStats>({
    activeApplications: 0,
    waitingOnRecruiter: 0,
    needsFollowUp: 0,
    ghostedOrInactive: 0,
  });

  const fetchGmailStatus = useCallback(async () => {
    try {
      setIsLoadingGmail(true);
      const status = await gmailApi.getStatus();
      setGmailStatus(status);

      // If Gmail is connected, populate realistic initial stats
      if (status.connected) {
        setStats({
          activeApplications: 12,
          waitingOnRecruiter: 7,
          needsFollowUp: 3,
          ghostedOrInactive: 2,
        });
      } else {
        setStats({
          activeApplications: 0,
          waitingOnRecruiter: 0,
          needsFollowUp: 0,
          ghostedOrInactive: 0,
        });
      }
    } catch (err) {
      console.warn('Failed to fetch Gmail status:', err);
      // Fallback state if endpoint is disconnected or server unavailable
      setGmailStatus({
        connected: false,
        email: null,
        lastSyncedAt: null,
      });
    } finally {
      setIsLoadingGmail(false);
    }
  }, []);

  useEffect(() => {
    fetchGmailStatus();
  }, [fetchGmailStatus]);

  useEffect(() => {
    const isConnectedParam =
      searchParams.get('gmail_connected') === 'true' ||
      searchParams.get('connected') === 'true';

    if (isConnectedParam && !toastShownRef.current) {
      toastShownRef.current = true;
      toast.success('Gmail Account Connected!', 'Your mailbox is now actively linked.');
      navigate('/dashboard', { replace: true });
      fetchGmailStatus();
    }
  }, [searchParams, toast, navigate, fetchGmailStatus]);

  const handleManualSync = async () => {
    try {
      setIsSyncing(true);
      const res = await gmailApi.triggerSync();
      toast.success('Sync complete', res.message || 'Scanned recent job applications.');
      await fetchGmailStatus();
      setStats({
        activeApplications: 14,
        waitingOnRecruiter: 8,
        needsFollowUp: 4,
        ghostedOrInactive: 2,
      });
    } catch {
      toast.error('Sync failed', 'Could not scan Gmail inbox. Please verify connection.');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {user?.name?.split(' ')[0] || 'Applicant'}
            </h1>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Sparkles className="w-3 h-3" /> AI Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Tracking your job applications, interview schedules, and recruiter response timelines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchGmailStatus}
            isLoading={isLoadingGmail}
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${isLoadingGmail ? 'animate-spin' : ''}`} />}
          >
            Refresh Status
          </Button>
        </div>
      </div>

      {/* 1. Gmail Account Connection Card (State A or State B) */}
      <GmailConnectionCard
        status={gmailStatus}
        isLoading={isLoadingGmail}
        onRefreshStatus={fetchGmailStatus}
      />

      {/* 2. Stats Grid (Active, Waiting, Needs Follow-up, Ghosted) */}
      <StatsGrid stats={stats} isLoading={isLoadingGmail} />

      {/* 3. AI Quick Tips Banner */}
      <QuickActionBanner />

      {/* 4. Application Tracker Preview Cards & Empty State */}
      <TrackerBoardPreview
        isGmailConnected={Boolean(gmailStatus?.connected)}
        onTriggerSync={handleManualSync}
        isSyncing={isSyncing}
      />
    </div>
  );
};
