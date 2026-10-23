import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import {
  Inbox,
  AlertTriangle,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 border-t border-zinc-800/80">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <Badge variant="purple" size="sm" className="mb-3">
          Core Capabilities
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Supercharge your job search pipeline
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 mt-3">
          Never let an opportunity slip through the cracks. Everything is handled right from your
          Gmail inbox without moving a finger.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feature 1: Auto-detect applications */}
        <Card
          hoverEffect
          glow="indigo"
          className="bg-zinc-900/60 border-zinc-800 p-6 flex flex-col justify-between space-y-4"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Inbox className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">Auto-Detect Applications</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
                Connect your Gmail once. Chaseback scans job confirmation emails from Greenhouse,
                Lever, Ashby, Workday, and direct recruiters.
              </p>
            </div>

            {/* Interactive snippet */}
            <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-xs space-y-2">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-zinc-300 font-semibold">Greenhouse.io</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  Detected
                </span>
              </div>
              <p className="text-zinc-300 text-xs truncate">
                "Thank you for applying to Figma — Staff Engineer"
              </p>
              <div className="text-[10px] text-zinc-500 flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                Parsed & categorized automatically
              </div>
            </div>
          </div>

          <div className="pt-2 text-xs text-indigo-400 font-medium flex items-center gap-1">
            <span>Zero manual entry</span>
          </div>
        </Card>

        {/* Feature 2: Ghosting alerts */}
        <Card
          hoverEffect
          glow="purple"
          className="bg-zinc-900/60 border-zinc-800 p-6 flex flex-col justify-between space-y-4"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">Ghosting Alerts & Scoring</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
                Chaseback tracks elapsed days since the recruiter's last message, calculating
                probabilistic ghosting risk so you know when to nudge.
              </p>
            </div>

            {/* Interactive snippet */}
            <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-zinc-300 font-semibold">Stripe Recruiter</span>
                <Badge variant="warning" size="sm" dot pulse>
                  8 Days Silent
                </Badge>
              </div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: '70%' }} />
              </div>
              <div className="flex justify-between text-[10px] text-zinc-400">
                <span>Ghosting Risk</span>
                <span className="text-amber-400 font-semibold">70% (High)</span>
              </div>
            </div>
          </div>

          <div className="pt-2 text-xs text-amber-400 font-medium flex items-center gap-1">
            <span>Smart nudge schedule alerts</span>
          </div>
        </Card>

        {/* Feature 3: AI follow-up replies */}
        <Card
          hoverEffect
          glow="emerald"
          className="bg-zinc-900/60 border-zinc-800 p-6 flex flex-col justify-between space-y-4"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">AI Follow-up Replies</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
                One-click drafted responses that reference your exact previous thread, role
                specifications, and interview notes for maximum reply rate.
              </p>
            </div>

            {/* Interactive snippet */}
            <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-zinc-400">
                <span className="text-indigo-400 font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Draft Ready
                </span>
                <span className="text-zinc-500">Recruiter Follow-up #1</span>
              </div>
              <p className="text-zinc-300 text-[11px] italic line-clamp-2 leading-relaxed">
                "Hi Sarah, following up on our conversation regarding the Senior Frontend role..."
              </p>
            </div>
          </div>

          <div className="pt-2 text-xs text-emerald-400 font-medium flex items-center gap-1">
            <span>One-click Gmail ready replies</span>
          </div>
        </Card>
      </div>
    </section>
  );
};
