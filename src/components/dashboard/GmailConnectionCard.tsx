import React, { useState } from 'react';
import type { GmailStatus } from '../../types/gmail';
import { gmailApi } from '../../api/gmail';
import { useToast } from '../../context/ToastContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Skeleton } from '../ui/Skeleton';
import {
  Mail,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Clock,
} from 'lucide-react';

interface GmailConnectionCardProps {
  status: GmailStatus | null;
  isLoading: boolean;
  onRefreshStatus: () => Promise<void>;
}

export const GmailConnectionCard: React.FC<GmailConnectionCardProps> = ({
  status,
  isLoading,
  onRefreshStatus,
}) => {
  const { toast } = useToast();
  const [isSyncing, setIsSyncing] = useState(false);

  const handleConnectGmail = () => {
    const connectUrl = gmailApi.getConnectUrl();
    window.location.href = connectUrl;
  };

  const handleSyncNow = async () => {
    try {
      setIsSyncing(true);
      const res = await gmailApi.triggerSync();
      toast.success('Sync complete', res.message || 'Gmail inbox scanned successfully');
      await onRefreshStatus();
    } catch {
      toast.error('Sync error', 'Failed to synchronize with Gmail');
    } finally {
      setIsSyncing(false);
    }
  };

  const formatLastSynced = (dateStr: string | null): string => {
    if (!dateStr) return 'Not synced yet';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;

      const now = new Date();
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

      if (diffInMinutes < 1) return 'Just now';
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) return `${diffInHours}h ago`;
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return dateStr;
    }
  };

  if (isLoading) {
    return (
      <Card className="border-zinc-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full max-w-md">
            <Skeleton className="w-12 h-12 rounded-2xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
          <Skeleton className="h-10 w-36 rounded-xl" />
        </div>
      </Card>
    );
  }

  const isConnected = Boolean(status?.connected);

  if (isConnected) {
    return (
      <Card
        glow="emerald"
        className="relative overflow-hidden border-emerald-500/20 bg-gradient-to-r from-emerald-950/20 via-zinc-900/60 to-zinc-900/80"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Connected Details */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center flex-wrap gap-2.5">
                <h3 className="text-base font-semibold text-zinc-100">Gmail Connected</h3>
                <Badge variant="success" size="sm" dot pulse>
                  Active Inbox Sync
                </Badge>
              </div>

              <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-400">
                <span className="font-medium text-zinc-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  {status?.email || 'Connected Google Account'}
                </span>
                <span className="flex items-center gap-1 text-zinc-400">
                  <Clock className="w-3.5 h-3.5 text-zinc-500" />
                  Last synced: <span className="text-zinc-300 font-medium">{formatLastSynced(status?.lastSyncedAt || null)}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Connected Actions */}
          <div className="flex items-center flex-wrap gap-3">
            <Button
              variant="secondary"
              size="sm"
              isLoading={isSyncing}
              leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />}
              onClick={handleSyncNow}
            >
              Sync Inbox
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleConnectGmail}
              leftIcon={<ExternalLink className="w-3.5 h-3.5 text-zinc-400" />}
            >
              Reconnect
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // State A: Disconnected
  return (
    <Card
      glow="indigo"
      className="relative overflow-hidden border-indigo-500/30 bg-gradient-to-br from-indigo-950/30 via-zinc-900/80 to-zinc-900"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/10">
            <Mail className="w-6 h-6 text-indigo-400" />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <h3 className="text-base font-semibold text-zinc-100">
                Connect your Gmail to start tracking
              </h3>
              <Badge variant="warning" size="sm" dot>
                Action Required
              </Badge>
            </div>
            <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Chaseback requires read-only Gmail access to automatically detect job applications,
              log recruiter replies, and calculate when you are in danger of being ghosted.
            </p>

            <div className="flex items-center flex-wrap gap-4 pt-1 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Read-only permission (`gmail.readonly`)
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Zero emails stored on server
              </span>
            </div>
          </div>
        </div>

        <div className="shrink-0 flex items-center">
          <Button
            variant="primary"
            size="md"
            onClick={handleConnectGmail}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto shadow-indigo-500/30"
          >
            Connect Gmail Account
          </Button>
        </div>
      </div>
    </Card>
  );
};
