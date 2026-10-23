import { apiClient } from './client';
import type { User } from '../types/user';

export interface LogoutResponse {
  message: string;
}

export const authApi = {
  /**
   * Fetch the currently authenticated user session.
   * Throws 401 if not authenticated.
   */
  getMe: async (): Promise<User> => {
    return apiClient.get<User>('/auth/me');
  },

  /**
   * Handle the callback after Google redirects with authorization code.
   * Backend sets the httpOnly access_token cookie and returns user profile.
   */
  handleGoogleCallback: async (code: string): Promise<User> => {
    return apiClient.get<User>(`/auth/google/callback?code=${encodeURIComponent(code)}`);
  },

  /**
   * Terminate user session and clear httpOnly cookie.
   */
  logout: async (): Promise<LogoutResponse> => {
    return apiClient.post<LogoutResponse>('/auth/logout');
  },

  /**
   * URL to trigger Google OAuth flow.
   */
  getGoogleLoginUrl: (): string => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    return backendUrl ? `${backendUrl}/auth/google` : '/auth/google';
  },
};
