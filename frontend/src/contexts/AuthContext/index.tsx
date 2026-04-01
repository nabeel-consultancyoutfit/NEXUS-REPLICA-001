/**
 * AuthContext — runtime source of truth for authentication state.
 *
 * Responsibilities:
 *   • Rehydrate auth from localStorage on every page load
 *   • Provide `user`, `isAuthenticated`, `login()`, and `logout()` to the tree
 *   • Keep the Redux auth slice in sync so RTK Query can inject Bearer tokens
 *
 * localStorage keys (canonical — do not rename):
 *   'accessToken'  — the JWT
 *   'userEmail'    — the user's email address
 *
 * Usage:
 *   const { user, isAuthenticated, login, logout } = useAuthContext();
 */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useAppDispatch } from '@/redux/store';
import {
  setCredentials,
  clearCredentials,
  persistAuth,
  loadPersistedAuth,
  clearPersistedAuth,
} from '@/redux/slices/auth';
import type { AuthUser } from '@/types/shared';

// ─── Context shape ────────────────────────────────────────────────────────────

interface AuthContextValue {
  /** The currently authenticated user, or null for guests */
  user:            AuthUser | null;
  /** True when a valid token exists and user is loaded */
  isAuthenticated: boolean;
  /** Called after a successful login / signup response */
  login:           (token: string, user: AuthUser) => void;
  /** Called when the user clicks Logout */
  logout:          () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user:            null,
  isAuthenticated: false,
  login:           () => undefined,
  logout:          () => undefined,
});

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<AuthUser | null>(null);

  // ── Rehydrate on mount ────────────────────────────────────────────────────
  useEffect(() => {
    const persisted = loadPersistedAuth();
    if (persisted) {
      const hydrated: AuthUser = {
        id:    '',
        name:  '',
        email: persisted.email,
        role:  'user',
      };
      dispatch(setCredentials({ token: persisted.token, user: hydrated }));
      setUser(hydrated);
    }
  // Only run once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── login ─────────────────────────────────────────────────────────────────
  const login = useCallback(
    (token: string, authUser: AuthUser) => {
      persistAuth(token, authUser);
      dispatch(setCredentials({ token, user: authUser }));
      setUser(authUser);
    },
    [dispatch],
  );

  // ── logout ────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    clearPersistedAuth();
    dispatch(clearCredentials());
    setUser(null);
  }, [dispatch]);

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, login, logout }),
    [user, login, logout],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Returns the current auth context.
 * Must be used inside <AuthProvider> (already mounted in _app.tsx).
 */
export function useAuthContext(): AuthContextValue {
  return useContext(AuthContext);
}
