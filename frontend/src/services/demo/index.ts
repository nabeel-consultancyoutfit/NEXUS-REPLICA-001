/**
 * Demo service — RTK Query endpoints used by the dashboard to demonstrate
 * live API fetching via jsonplaceholder.typicode.com.
 *
 * This is an original workspace service, separate from any clone services.
 */
import { baseApi } from '@/services/base-api';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Post {
  id:     number;
  userId: number;
  title:  string;
  body:   string;
}

interface User {
  id:       number;
  name:     string;
  email:    string;
  username: string;
  phone:    string;
  website:  string;
}

// ─── Endpoints ────────────────────────────────────────────────────────────────
const demoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      providesTags: ['Posts'],
    }),
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: ['Demo'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetPostsQuery, useGetUsersQuery } = demoApi;
