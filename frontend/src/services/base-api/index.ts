/**
 * RTK Query base API.
 *
 * All feature-specific APIs (auth, users, models …) are created by calling
 * `baseApi.injectEndpoints()` in their own service files.
 *
 * The `prepareHeaders` function reads `auth.accessToken` from Redux state and
 * injects it as a Bearer token — this is the SINGLE point of auth header
 * injection. Do not duplicate this logic elsewhere.
 *
 * When adding new feature services, add their tag types to the `tagTypes` list
 * below. Do not remove existing tags.
 */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/redux/store';

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3008/api';

export const baseApi = createApi({
  reducerPath: 'baseApi',   // referenced in store.ts — do not rename

  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ['Auth', 'User', 'Model'],

  // Endpoints are injected by each feature service file
  endpoints: () => ({}),
});
