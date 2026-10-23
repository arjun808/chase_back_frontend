import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Ghost, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 border-zinc-800 bg-zinc-900/80 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mx-auto">
          <Ghost className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold text-white">404</h2>
          <h3 className="text-lg font-semibold text-zinc-200">Page not found</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            This page disappeared or got ghosted. Let's get you back on track.
          </p>
        </div>

        <div className="pt-2">
          <Link to="/">
            <Button variant="primary" size="md" className="w-full" leftIcon={<Home className="w-4 h-4" />}>
              Back to Home
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};
