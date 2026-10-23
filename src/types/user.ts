export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  loginWithGoogle: () => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<User | null>;
  setUserDirectly: (user: User | null) => void;
}
