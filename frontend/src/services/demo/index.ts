import { baseApi } from '@/services/base-api';

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface DemoUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

export const demoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts?_limit=5',
      providesTags: ['Demo'],
    }),
    getUsers: builder.query<DemoUser[], void>({
      query: () => '/users?_limit=5',
      providesTags: ['Users'],
    }),
    getPostById: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
    }),
    createPost: builder.mutation<
      Post,
      { title: string; body: string; userId: number }
    >({
      query: (body) => ({
        url: '/posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Demo'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetUsersQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
} = demoApi;
