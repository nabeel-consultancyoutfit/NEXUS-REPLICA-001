/**
 * authSlice — Redux slice for authentication state.
 *
 * This slice keeps `accessToken` in the Redux store so that
 * the RTK Query `prepareHeaders` function can inject the
 * Authorization header without touching localStorage directly.
 *
 * localStorage helpers (persistAuth / loadPersistedAuth / clearPersistedAuth)
 * are exported from here and used by AuthContext on mount and logout.
 * Do NOT rename the localStorage keys — AuthContext depends on them.
 */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthUser } from '@/types/shared';

// ─── localStorage keys (canonical — do not rename) ───────────────────────────
const LS_TOKEN = 'accessToken';
const LS_EMAIL = 'userEmail';

// ─── localStorage helpers ─────────────────────────────────────────────────────

/** Write token + email to localStorage after a successful login / signup */
export function persistAuth(token: string, user: AuthUser): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LS_TOKEN, token);
  localStorage.setItem(LS_EMAIL, user.email);
}

/** Read token + email from localStorage (called by AuthContext on mount) */
export function loadPersistedAuth(): { token: string; email: string } | null {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem(LS_TOKEN);
  const email = localStorage.getItem(LS_EMAIL);
  if (!token || !email) return null;
  return { token, email };
}

/** Remove auth data from localStorage on logout */
export function clearPersistedAuth(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LS_TOKEN);
  localStorage.removeItem(LS_EMAIL);
}

// ─── Slice ────────────────────────────────────────────────────────────────────

export interface AuthState {
  accessToken: string | null;
  user:        AuthUser | null;
}

const initialState: AuthState = {
  accessToken: null,
  user:        null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Called after a successful login / signup or on page-load rehydration.
     * Stores the JWT so prepareHeaders can attach it to every API request.
     */
    setCredentials(
      state,
      action: PayloadAction<{ token: string; user: AuthUser }>,
    ) {
      state.accessToken = action.payload.token;
      state.user        = action.payload.user;
    },

    /** Called on logout — wipes all auth state from Redux */
    clearCredentials(state) {
      state.accessToken = null;
      state.user        = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
