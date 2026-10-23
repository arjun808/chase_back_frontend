import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, AuthContextType } from '../types/user';
import { authApi } from '../api/auth';
import { ApiError } from '../api/client';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentUser = useCallback(async (): Promise<User | null> => {
    try {
      setIsLoading(true);
      setError(null);
      const currentUser = await authApi.getMe();
      setUser(currentUser);
      return currentUser;
    } catch (err) {
      if (err instanceof ApiError && err.statusCode === 401) {
        // Expected when user is not logged in yet
        setUser(null);
      } else {
        const message = err instanceof Error ? err.message : 'Authentication check failed';
        // Only set error if not simply an unauthenticated 401
        if (err instanceof ApiError && err.statusCode !== 401) {
          setError(message);
        }
        setUser(null);
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const loginWithGoogle = useCallback(() => {
    const targetUrl = authApi.getGoogleLoginUrl();
    window.location.href = targetUrl;
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await authApi.logout();
    } catch (err) {
      console.warn('Logout request warning:', err);
    } finally {
      setUser(null);
      setError(null);
      setIsLoading(false);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    return fetchCurrentUser();
  }, [fetchCurrentUser]);

  const setUserDirectly = useCallback((newUser: User | null) => {
    setUser(newUser);
    setError(null);
    setIsLoading(false);
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: Boolean(user),
    error,
    loginWithGoogle,
    logout,
    refreshUser,
    setUserDirectly,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
