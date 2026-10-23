import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { gmailApi } from '../api/gmail';
import { useToast } from '../context/ToastContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Mail, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';

export const GmailCallbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const executedRef = useRef(false);

  useEffect(() => {
    if (executedRef.current) return;
    executedRef.current = true;

    const confirmGmailConnection = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state') || undefined;
      const errorParam = searchParams.get('error');

      if (errorParam) {
        setStatus('error');
        setErrorMessage(`Google authorization error: ${errorParam}`);
        toast.error('Gmail connection cancelled', errorParam);
        return;
      }

      if (!code) {
        // Fallback: check status directly
        try {
          const currentStatus = await gmailApi.getStatus();
          if (currentStatus.connected) {
            setStatus('success');
            toast.success('Gmail Account Connected', 'Your inbox is now linked.');
            navigate('/dashboard', { replace: true });
            return;
          }
        } catch {
          // Continue to error
        }
        setStatus('error');
        setErrorMessage('No authorization code provided in Gmail callback.');
        return;
      }

      try {
        setStatus('verifying');
        const result = await gmailApi.handleCallback(code, state);
        setStatus('success');
        toast.success(
          'Gmail Connected Successfully!',
          `Account: ${result.email || 'Linked Google Account'}`
        );
        navigate('/dashboard', { replace: true });
      } catch (err) {
        setStatus('error');
        const msg = err instanceof Error ? err.message : 'Failed to finalize Gmail connection';
        setErrorMessage(msg);
        toast.error('Gmail Connection Failed', msg);
      }
    };

    confirmGmailConnection();
  }, [searchParams, navigate, toast]);

  if (status === 'error') {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 border-rose-500/30 bg-zinc-900/90 text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
            <AlertCircle className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Gmail Linking Failed</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {errorMessage || 'Unable to store encrypted Gmail tokens on the backend.'}
            </p>
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => navigate('/dashboard')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Return to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 border-zinc-800 bg-zinc-900/80 text-center space-y-6">
        <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400 mx-auto shadow-xl shadow-emerald-500/20">
          <Mail className="w-8 h-8 text-emerald-400 animate-bounce" />
          <div className="absolute inset-0 rounded-2xl border-2 border-emerald-500/40 animate-ping opacity-25" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">Connecting Gmail...</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Verifying OAuth state and storing AES-256 encrypted refresh tokens securely.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 font-medium">
          <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
          <span>Configuring read-only access</span>
        </div>
      </Card>
    </div>
  );
};
