# Skill: Add Feature Module

Use this skill when the user asks to scaffold a new feature module (e.g. "add a Users module", "create an Orders feature").

---

## Steps to Follow

Given a feature name (e.g. `users`), create all of the following in order:

### 1. Types — `src/types/modules/<feature>/index.ts`
Define the core data types for this feature. At minimum include a primary entity type and a form/input type.

```ts
// src/types/modules/users/index.ts
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
```

### 2. RTK Query Service — `src/services/<feature>/index.ts`
Inject endpoints into `baseApi`. Use appropriate tag types.

```ts
// src/services/users/index.ts
import { baseApi } from '@/services/base-api';
import type { User, CreateUserInput } from '@/types/modules/users';
import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/shared';

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<PaginatedResponse<User>, PaginationParams>({
      query: (params) => ({ url: '/users', params }),
      providesTags: ['Users'],
    }),
    getUserById: builder.query<ApiResponse<User>, string>({
      query: (id) => `/users/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'Users', id }],
    }),
    createUser: builder.mutation<ApiResponse<User>, CreateUserInput>({
      query: (body) => ({ url: '/users', method: 'POST', body }),
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation<ApiResponse<User>, { id: string; body: Partial<CreateUserInput> }>({
      query: ({ id, body }) => ({ url: `/users/${id}`, method: 'PATCH', body }),
      invalidatesTags: (_result, _err, { id }) => [{ type: 'Users', id }, 'Users'],
    }),
    deleteUser: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({ url: `/users/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
```

### 3. Redux Slice (if local UI state is needed) — `src/redux/slices/<feature>/index.ts`
Only create a slice if this feature needs local state (filters, selected rows, modal open state, etc.).

```ts
// src/redux/slices/users/index.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UsersUIState {
  selectedUserId: string | null;
  isModalOpen: boolean;
}

const initialState: UsersUIState = {
  selectedUserId: null,
  isModalOpen: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<string | null>) => {
      state.selectedUserId = action.payload;
    },
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});

export const { setSelectedUser, toggleModal } = usersSlice.actions;
export default usersSlice.reducer;
```

Then register it in `src/redux/store.ts`:
```ts
import usersReducer from '@/redux/slices/users';
// add to reducer map:
users: usersReducer,
```

### 4. Route Constant — `src/constants/routes.tsx`
Add the route to the existing routes object.

### 5. Page — `src/pages/<feature>/index.tsx`
Create the page component with `AuthGuard` and `getLayout`.

```tsx
import { ReactElement } from 'react';
import { Container } from '@mui/material';
import AuthGuard from '@/GuardsAndPermissions/AuthGuard';
import MainLayout from '@/layout/MainLayout';
import PageHeader from '@/components/PageHeader';

function UsersContent() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <PageHeader title="Users" subtitle="Manage your users" />
      {/* feature content here */}
    </Container>
  );
}

export default function UsersPage() {
  return (
    <AuthGuard>
      <UsersContent />
    </AuthGuard>
  );
}

UsersPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
```

### 6. Nav Link — `src/layout/NavLinks/index.tsx`
Add the new route to the navigation links array.

---

## Checklist Before Finishing

- [ ] Types defined in `src/types/modules/<feature>/index.ts`
- [ ] RTK Query service with CRUD endpoints created
- [ ] New tag type added to `baseApi` tagTypes if needed
- [ ] Redux slice created and registered in store (if local state needed)
- [ ] Route constant added to `src/constants/routes.tsx`
- [ ] Page created with `AuthGuard` + `getLayout`
- [ ] Nav link added
