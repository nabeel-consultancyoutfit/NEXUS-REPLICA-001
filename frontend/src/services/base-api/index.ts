import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/redux/store';

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://jsonplaceholder.typicode.com';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Auth', 'Users', 'Posts', 'Demo', 'Settings', 'Notifications'],
  endpoints: () => ({}),
});
