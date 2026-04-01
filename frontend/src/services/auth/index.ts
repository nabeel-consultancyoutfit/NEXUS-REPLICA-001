/**
 * Auth RTK Query service.
 *
 * Endpoints:
 *   login   — POST /api/auth/login      (returns JWT + user)
 *   signup  — POST /api/auth/signup     (returns JWT + user)
 *   getMe   — GET  /api/auth/me         (returns current user, requires token)
 *
 * All shapes are inferred from backend/src/auth/dto/auth-response.dto.ts.
 */
import { baseApi } from '@/services/base-api';
import type { AuthResponse, AuthUser } from '@/types/shared';

// ─── Request payload types ────────────────────────────────────────────────────

export interface LoginPayload {
  email:    string;
  password: string;
}

export interface SignupPayload {
  name:     string;
  email:    string;
  password: string;
}

// ─── Injected endpoints ───────────────────────────────────────────────────────

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation<AuthResponse, LoginPayload>({
      query: (body) => ({
        url:    'auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth', 'User'],
    }),

    signup: builder.mutation<AuthResponse, SignupPayload>({
      query: (body) => ({
        url:    'auth/signup',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth', 'User'],
    }),

    getMe: builder.query<AuthUser, void>({
      query:        () => 'auth/me',
      providesTags: ['User'],
    }),

  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetMeQuery,
} = authApi;
