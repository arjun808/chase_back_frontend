import { Bot, Zap } from 'lucide-react';

export const QuickActionBanner: React.FC = () => {
  return (
    <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/30 via-zinc-900/40 to-purple-950/20 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-start sm:items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-zinc-100">Chaseback AI Assistant</h4>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
              Automated
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Auto-scanning runs in the background. If a company hasn't replied in 7 days, Chaseback
            drafts a tailored follow-up based on your exact conversation history.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs text-indigo-400 font-medium flex items-center gap-1">
          <Zap className="w-3.5 h-3.5" /> 3x higher response rate
        </span>
      </div>
    </div>
  );
};
