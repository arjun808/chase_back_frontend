import React, { useState } from 'react';
import type { JobApplication } from '../../types/tracker';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Kanban,
  Table as TableIcon,
  Search,
  Sparkles,
  Inbox,
  Clock,
  ArrowUpRight,
  RefreshCw,
} from 'lucide-react';

interface TrackerBoardPreviewProps {
  isGmailConnected: boolean;
  onTriggerSync?: () => void;
  isSyncing?: boolean;
}

// Sample detected application for rich preview
const SAMPLE_APPLICATIONS: JobApplication[] = [
  {
    id: 'sample-1',
    company: 'Stripe',
    role: 'Senior Frontend Engineer',
    stage: 'needs_follow_up',
    appliedDate: '12 days ago',
    lastEmailDate: '7 days ago',
    daysSinceLastContact: 7,
    threadSubject: 'Thank you for speaking with our recruiting team',
    recruiterName: 'Sarah Jenkins',
    suggestedAction: 'Send Follow-up #1 (Optimal timing: Tuesday 9:30 AM)',
    ghostScore: 68,
  },
  {
    id: 'sample-2',
    company: 'Linear',
    role: 'Product Designer / Design Engineer',
    stage: 'interview',
    appliedDate: '5 days ago',
    lastEmailDate: 'Yesterday',
    daysSinceLastContact: 1,
    threadSubject: 'Invitation: Portfolio & Technical Deep Dive',
    recruiterName: 'Karri Saarinen',
    suggestedAction: 'Review interview prep checklist',
    ghostScore: 12,
  },
  {
    id: 'sample-3',
    company: 'Vercel',
    role: 'Full Stack Solutions Architect',
    stage: 'waiting_on_recruiter',
    appliedDate: '8 days ago',
    lastEmailDate: '3 days ago',
    daysSinceLastContact: 3,
    threadSubject: 'Application received: Solutions Architect',
    recruiterName: 'Automated (Greenhouse)',
    suggestedAction: 'No action needed yet (within normal 5-day window)',
    ghostScore: 24,
  },
];

export const TrackerBoardPreview: React.FC<TrackerBoardPreviewProps> = ({
  isGmailConnected,
  onTriggerSync,
  isSyncing = false,
}) => {
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  return (
    <div className="space-y-4">
      {/* Top Filter and Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/40"
            />
          </div>

          <div className="flex items-center gap-1 bg-zinc-900/80 border border-zinc-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                activeFilter === 'all'
                  ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('needs_follow_up')}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                activeFilter === 'needs_follow_up'
                  ? 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Needs Action
            </button>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-zinc-900/80 border border-zinc-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setViewMode('board')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'board'
                  ? 'bg-indigo-600 text-white'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Board View"
            >
              <Kanban className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-indigo-600 text-white'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Table View"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Board Container */}
      <div className="relative rounded-2xl border border-zinc-800/80 bg-zinc-950/50 p-6 overflow-hidden">
        {/* Empty State Overlay / Sync Trigger */}
        <div className="text-center py-10 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4 text-indigo-400 shadow-xl shadow-indigo-500/10">
            <Inbox className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-bold text-zinc-100 tracking-tight">
            {isGmailConnected
              ? 'Ready to sync your applications'
              : 'Connect Gmail to populate your tracker'}
          </h3>

          <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
            {isGmailConnected
              ? 'Your Gmail account is linked! Trigger your first scan to auto-detect job applications, interview invites, and recruiter threads.'
              : 'Once connected, Chaseback scans confirmation emails and parses recruiter threads into a real-time Kanban board.'}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            {isGmailConnected ? (
              <Button
                variant="primary"
                size="md"
                onClick={onTriggerSync}
                isLoading={isSyncing}
                leftIcon={<RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />}
              >
                Scan Gmail Inbox
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  window.location.href = '/gmail/connect';
                }}
                leftIcon={<Sparkles className="w-4 h-4" />}
              >
                Connect Gmail to Auto-Populate
              </Button>
            )}
          </div>
        </div>

        {/* Board Preview Mockup Section */}
        <div className="mt-8 pt-8 border-t border-zinc-900">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Interactive Preview
              </span>
              <Badge variant="purple" size="sm">
                AI Detection Demo
              </Badge>
            </div>
            <span className="text-xs text-zinc-500">How your detected applications will appear</span>
          </div>

          {/* Kanban / Cards Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SAMPLE_APPLICATIONS.map((app) => (
              <Card
                key={app.id}
                hoverEffect
                className="bg-zinc-900/70 border-zinc-800/80 p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-300 font-bold text-xs border border-zinc-700">
                      {app.company[0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-100">{app.company}</h4>
                      <p className="text-xs text-zinc-400 truncate max-w-[150px]">{app.role}</p>
                    </div>
                  </div>

                  {app.stage === 'needs_follow_up' && (
                    <Badge variant="warning" size="sm" dot pulse>
                      Follow-up
                    </Badge>
                  )}
                  {app.stage === 'interview' && (
                    <Badge variant="success" size="sm">
                      Interview
                    </Badge>
                  )}
                  {app.stage === 'waiting_on_recruiter' && (
                    <Badge variant="info" size="sm">
                      Waiting
                    </Badge>
                  )}
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800/60 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-zinc-400 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      Last contact: {app.lastEmailDate}
                    </span>
                    <span className="text-zinc-500">{app.daysSinceLastContact}d ago</span>
                  </div>
                  <p className="text-zinc-300 text-xs font-medium truncate">
                    "{app.threadSubject}"
                  </p>
                </div>

                {/* AI Suggestion box */}
                {app.suggestedAction && (
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5 text-[11px] text-indigo-400 font-medium">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate max-w-[180px]">{app.suggestedAction}</span>
                    </div>
                    <button
                      type="button"
                      className="text-zinc-400 hover:text-zinc-200 transition-colors p-1"
                      title="Generate follow-up email"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
