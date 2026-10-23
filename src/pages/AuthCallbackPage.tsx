import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authApi } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Sparkles, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';

export const AuthCallbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUserDirectly, refreshUser } = useAuth();
  const { toast } = useToast();

  const [status, setStatus] = useState<'exchanging' | 'success' | 'error'>('exchanging');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Prevent double execution in React 18/19 strict mode
  const executedRef = useRef(false);

  useEffect(() => {
    if (executedRef.current) return;
    executedRef.current = true;

    const exchangeCode = async () => {
      const code = searchParams.get('code');
      const errorParam = searchParams.get('error');

      if (errorParam) {
        setStatus('error');
        setErrorMessage(`Google authentication error: ${errorParam}`);
        toast.error('Authentication cancelled', errorParam);
        return;
      }

      if (!code) {
        // If no code, check if user is already authenticated (e.g. backend handled redirect directly)
        try {
          const existingUser = await refreshUser();
          if (existingUser) {
            setStatus('success');
            navigate('/dashboard', { replace: true });
            return;
          }
        } catch {
          // Continue to error
        }
        setStatus('error');
        setErrorMessage('No authorization code found in callback URL.');
        return;
      }

      try {
        setStatus('exchanging');
        const user = await authApi.handleGoogleCallback(code);
        setUserDirectly(user);
        setStatus('success');
        toast.success(`Welcome to Chaseback, ${user.name}!`, 'Signed in successfully');
        navigate('/dashboard', { replace: true });
      } catch (err) {
        setStatus('error');
        const msg = err instanceof Error ? err.message : 'Failed to complete Google authentication';
        setErrorMessage(msg);
        toast.error('Sign in failed', msg);
      }
    };

    exchangeCode();
  }, [searchParams, navigate, setUserDirectly, refreshUser, toast]);

  if (status === 'error') {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 border-rose-500/30 bg-zinc-900/90 text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
            <AlertCircle className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Authentication Failed</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {errorMessage || 'Unable to exchange Google authorization code with the server.'}
            </p>
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => navigate('/login')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Back to Sign In
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 border-zinc-800 bg-zinc-900/80 text-center space-y-6">
        <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 mx-auto shadow-xl shadow-indigo-500/20">
          <Sparkles className="w-8 h-8 animate-pulse text-indigo-400" />
          <div className="absolute inset-0 rounded-2xl border-2 border-indigo-500/40 animate-ping opacity-25" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">Completing Sign In...</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Securing your session and exchanging authorization tokens with Chaseback server.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 font-medium">
          <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
          <span>Finalizing authentication</span>
        </div>
      </Card>
    </div>
  );
};
