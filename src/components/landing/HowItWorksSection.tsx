import React from 'react';
import { Badge } from '../ui/Badge';
import { CheckCircle2, Mail, Zap, ArrowRight } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Sign in & Connect Gmail',
      description:
        'One-click Google authentication with read-only Gmail access. We only look for job application emails.',
      icon: <Mail className="w-5 h-5 text-indigo-400" />,
    },
    {
      step: '02',
      title: 'AI Scans & Indexes Automatically',
      description:
        'Chaseback automatically groups threads by company, job title, recruiter contact, and current interview status.',
      icon: <Zap className="w-5 h-5 text-amber-400" />,
    },
    {
      step: '03',
      title: 'Get Ghosting Alerts & One-Click Nudges',
      description:
        'Get notified when a company goes cold. Generate polite, high-converting follow-up emails in seconds.',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    },
  ];

  return (
    <section className="py-16 md:py-24 border-t border-zinc-800/80">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <Badge variant="purple" size="sm" className="mb-3">
          Workflow
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          How Chaseback works in 3 simple steps
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 mt-3">
          Set it up in under 60 seconds and let AI monitor your pipeline 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((item, index) => (
          <div
            key={item.step}
            className="relative glass-card rounded-2xl p-6 border border-zinc-800/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-indigo-500/40 tracking-wider font-mono">
                  {item.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center">
                  {item.icon}
                </div>
              </div>

              <h4 className="text-base font-semibold text-zinc-100 mb-2">{item.title}</h4>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{item.description}</p>
            </div>

            {index < steps.length - 1 && (
              <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-zinc-600">
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
