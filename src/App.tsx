import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ToastContainer } from './components/ui/ToastContainer';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { AuthCallbackPage } from './pages/AuthCallbackPage';
import { GmailCallbackPage } from './pages/GmailCallbackPage';
import { NotFoundPage } from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <ToastContainer />
          <DashboardLayout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/auth/callback" element={<AuthCallbackPage />} />
              <Route path="/gmail/callback" element={<GmailCallbackPage />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />

              {/* 404 Fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </DashboardLayout>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;