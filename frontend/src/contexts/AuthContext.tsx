
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAppDispatch } from '@/redux/store';
import { setCredentials, clearCredentials } from '@/redux/slices/auth';

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // Mock user from localStorage
      const mockUser: AuthUser = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: localStorage.getItem('userEmail') || 'admin@example.com',
        role: 'admin',
      };
      setUser(mockUser);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Store mock token and email
      localStorage.setItem('accessToken', 'mock-token-123');
      localStorage.setItem('userEmail', email);

      // Create mock user
      const mockUser: AuthUser = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email,
        role: 'admin',
      };

      setUser(mockUser);
      setIsAuthenticated(true);

      // Dispatch to Redux
      dispatch(setCredentials({ user: mockUser, accessToken: 'mock-token-123', refreshToken: 'mock-refresh-123' }));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userEmail');
    setUser(null);
    setIsAuthenticated(false);
    dispatch(clearCredentials());
  };

  const value: AuthContextValue = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
}
