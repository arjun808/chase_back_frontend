# Chaseback Frontend 🚀

> *"Never get ghosted again. AI-powered application tracker and reply assistant for your Gmail inbox."*

Frontend client for **Chaseback**, built with **React 19**, **TypeScript**, **Vite**, **TailwindCSS 4**, and **React Router DOM**.

---

## 🛠️ Features & Implementation Summary

### 1. Authentication & Session Management
- **`AuthContext`** (`src/context/AuthContext.tsx`): Verifies session via `/auth/me` on initial mount, holds `user`, `isLoading`, `isAuthenticated`, and exposes `loginWithGoogle()`, `logout()`, `refreshUser()`, and `setUserDirectly()`.
- **Google OAuth Sign In**: Branded `GoogleSignInButton` that initiates the OAuth flow at `/auth/google` (or `http://localhost:3000/auth/google`).
- **OAuth Callback Handler** (`/auth/callback`): Automatically parses the `code` parameter, exchanges it with the backend via `/auth/google/callback?code=...` (which sets an `httpOnly` cookie), and smoothly transitions the user into `/dashboard`.
- **Route Guard** (`src/components/auth/ProtectedRoute.tsx`): Protects `/dashboard` from unauthorized visits, displaying an animated session verification loader.

### 2. Gmail Integration Flow
- **`GmailConnectionCard`** (`src/components/dashboard/GmailConnectionCard.tsx`):
  - **State A (Disconnected)**: Explains the read-only scope permissions (`gmail.readonly`) and security guarantees (no emails stored, 256-bit encryption), with a direct "Connect Gmail Account" button (`/gmail/connect`).
  - **State B (Connected)**: Displays a green "Connected" badge with pulsing indicator, the linked Gmail address, the last synced timestamp, and a "Sync Inbox" trigger.
- **Gmail Callback Handler** (`/gmail/callback`): Handles OAuth callback with `code` & `state`, confirms connection via `/gmail/callback`, and returns to `/dashboard` with a success toast notification.

### 3. Application Tracker Dashboard
- **Top Navigation Bar**: Brand logo, user profile avatar, name, email, and one-click logout.
- **4 Key Stat Tiles**:
  - `Active Applications` (In Pipeline)
  - `Waiting on Recruiter` (Pending < 7 days)
  - `Needs Follow-up` (Take Action 7–14 days)
  - `Ghosted / Inactive` (Cold > 14 days)
- **Kanban & Board Preview**: Interactive empty state showcasing auto-detected applications, days elapsed, and AI follow-up suggestions with view toggles (Board vs. Table).
- **AI Quick Action Banner**: Displays background sync status and follow-up generation intelligence.

### 4. Landing & Login Page
- Dark aesthetic with rich slate/zinc tones, glowing gradient borders, and typography (Inter & Plus Jakarta Sans).
- Tagline and feature preview cards (Auto-detect applications, ghosting alerts, and AI follow-up replies).
- Security and privacy highlights.

---

## 📁 Project Architecture

```
src/
├── api/
│   ├── client.ts             # Typed fetch wrapper with credentials: 'include' & proxy support
│   ├── auth.ts               # /auth/me, /auth/google/callback, /auth/logout
│   └── gmail.ts              # /gmail/status, /gmail/connect, /gmail/callback, /gmail/sync
├── types/
│   ├── user.ts               # User and AuthContext interfaces
│   ├── gmail.ts              # GmailStatus, GmailCallbackResult
│   └── tracker.ts            # JobApplication, DashboardStats, ApplicationStage
├── context/
│   ├── AuthContext.tsx       # Auth provider & useAuth hook
│   └── ToastContext.tsx      # Dynamic toast alert provider & useToast hook
├── components/
│   ├── ui/
│   │   ├── Button.tsx        # Styled button with variants, sizes & loading states
│   │   ├── Card.tsx          # Glassmorphism container with Header, Title, Content, Footer
│   │   ├── Badge.tsx         # Status badges with pulse indicators
│   │   ├── Skeleton.tsx      # Pulse placeholder skeleton loader
│   │   ├── Avatar.tsx        # Dynamic gradient fallback avatar
│   │   └── ToastContainer.tsx# Floating animated toast alerts
│   ├── layout/
│   │   ├── Navbar.tsx        # Brand header with user dropdown
│   │   ├── Footer.tsx        # Security & privacy assurances
│   │   └── DashboardLayout.tsx # Master layout with ambient glow
│   ├── auth/
│   │   ├── GoogleSignInButton.tsx # Official branded Google button
│   │   └── ProtectedRoute.tsx     # Route protection guard
│   ├── dashboard/
│   │   ├── GmailConnectionCard.tsx# State A (disconnected) & State B (connected)
│   │   ├── StatCard.tsx      # Metric tile
│   │   ├── StatsGrid.tsx     # 4 stat cards grid
│   │   ├── TrackerBoardPreview.tsx # Board/table preview with empty sync state
│   │   └── QuickActionBanner.tsx   # AI insights banner
│   └── landing/
│       ├── HeroSection.tsx   # Dark hero with tagline and Google CTA
│       ├── FeaturesSection.tsx # 3 feature preview cards
│       └── HowItWorksSection.tsx # 3-step workflow
├── pages/
│   ├── LandingPage.tsx       # Root landing page (/)
│   ├── LoginPage.tsx         # Dedicated sign in (/login)
│   ├── DashboardPage.tsx     # Protected dashboard (/dashboard)
│   ├── AuthCallbackPage.tsx  # OAuth redirect handler (/auth/callback)
│   ├── GmailCallbackPage.tsx # Gmail OAuth redirect handler (/gmail/callback)
│   └── NotFoundPage.tsx      # 404 page
├── index.css                 # Tailwind CSS 4 directives, glassmorphism, scrollbars
└── App.tsx                   # Routes and Provider tree
```

---

## 🚀 Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start Dev Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173`.

   > **Note on Backend Integration**:
   > In `vite.config.ts`, reverse proxies are pre-configured for `/auth`, `/gmail`, and `/api` pointing to `http://localhost:3000`. All requests include `credentials: 'include'` so that NestJS `httpOnly` cookies (`access_token`) are seamlessly transmitted between the browser and backend.
