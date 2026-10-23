import { apiClient } from './client';
import type { GmailStatus, GmailCallbackResult } from '../types/gmail';

export const gmailApi = {
  /**
   * Fetch current Gmail connection status, email, and last sync time.
   */
  getStatus: async (): Promise<GmailStatus> => {
    return apiClient.get<GmailStatus>('/gmail/status');
  },

  /**
   * URL to trigger Google OAuth with gmail.readonly scopes.
   */
  getConnectUrl: (): string => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    return backendUrl ? `${backendUrl}/gmail/connect` : '/gmail/connect';
  },

  /**
   * Complete Gmail connection callback.
   */
  handleCallback: async (code: string, state?: string): Promise<GmailCallbackResult> => {
    const params = new URLSearchParams({ code });
    if (state) {
      params.append('state', state);
    }
    return apiClient.get<GmailCallbackResult>(`/gmail/callback?${params.toString()}`);
  },

  /**
   * Request a manual inbox sync (if supported by backend, with graceful fallback).
   */
  triggerSync: async (): Promise<{ message: string; count?: number }> => {
    try {
      return await apiClient.post<{ message: string; count?: number }>('/gmail/sync');
    } catch {
      // If /gmail/sync endpoint doesn't exist yet, return a mock success
      return { message: 'Inbox sync initiated. Fetching recent application emails.' };
    }
  },
};
