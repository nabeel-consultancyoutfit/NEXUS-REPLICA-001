# Workspace Stack Reference

This file defines the exact conventions for all code generated inside `frontend/src/`.
Every code generation step in the clone skill must follow these rules.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (Pages Router) | 13.4 |
| Language | TypeScript | 5.x |
| UI Library | MUI (Material UI) | v5 |
| State | Redux Toolkit | latest |
| API | RTK Query via baseApi | latest |
| Forms | React Hook Form + Yup | latest |
| Tables | @tanstack/react-table | v8 |
| Charts | ApexCharts (SSR-disabled) | latest |
| Notifications | notistack | latest |
| Date | dayjs | latest |

---

## Theme Colors (use these, never hardcode hex values)

```
primary.main     → #38CAB5 (teal)
primary.light    → #6ED8C8
primary.dark     → #2A9E8C
secondary.main   → #35456D (dark navy)
secondary.light  → #5A6E9E
secondary.dark   → #243050
success.main     → #36B37E
warning.main     → #FFAB00
error.main       → #FF5630
info.main        → #00B8D9
background.default → #F9FAFB
background.paper   → #FFFFFF
text.primary       → #212B36
text.secondary     → #637381
```

Always reference as `sx={{ color: 'primary.main' }}` — never `sx={{ color: '#38CAB5' }}`.

---

## Directory Structure

```
frontend/src/
├── components/          Shared reusable components (PascalCase folders)
│   └── MyComponent/
│       └── index.tsx
├── pages/               Next.js routes (kebab-case folders)
│   └── my-route/
│       └── index.tsx
├── layout/              Layout shells (MainLayout, PlainLayout, Header, NavLinks)
├── hooks/               Custom hooks (use prefix)
├── services/            RTK Query endpoints (feature folders)
│   └── models/
│       └── index.ts
├── redux/slices/        Redux slices (feature folders)
│   └── models/
│       └── index.ts
├── types/
│   ├── shared/index.ts        Global types (ApiResponse, PaginatedResponse, etc.)
│   └── modules/<feature>/     Feature-specific types
│       └── index.ts
├── constants/
│   └── routes.tsx       ROUTES constant
├── mock/index.ts        Mock data for all features
├── lib/                 Helper utilities (snackbar, date-time)
├── utils/index.ts       Generic utility functions
├── contexts/            Context providers
└── GuardsAndPermissions/ AuthGuard, GuestGuard, PermissionsGuard
```

---

## Component Patterns

### Page structure (always)
```tsx
import { ReactElement } from 'react';
import { Container, Grid } from '@mui/material';
import AuthGuard from '@/GuardsAndPermissions/AuthGuard';
import PageHeader from '@/components/PageHeader';
import MainLayout from '@/layout/MainLayout';

function PageContent() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <PageHeader title="Page Title" subtitle="Optional subtitle" />
      {/* content */}
    </Container>
  );
}

export default function MyPage() {
  return (
    <AuthGuard>
      <PageContent />
    </AuthGuard>
  );
}

MyPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
```

### Public pages (no auth required)
```tsx
// Use GuestGuard for login/signup, no guard for fully public pages
export default function LoginPage() {
  return <GuestGuard><LoginContent /></GuestGuard>;
}
LoginPage.getLayout = (page: ReactElement) => <PlainLayout>{page}</PlainLayout>;
```

### Card component
```tsx
<Card sx={{ p: 3 }}>
  {/* content */}
</Card>
```

### Loading state
```tsx
// Skeleton for card grids
{isLoading ? (
  <Grid container spacing={2}>
    {Array.from({ length: 8 }).map((_, i) => (
      <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
        <Skeleton variant="rectangular" height={240} sx={{ borderRadius: 2 }} />
      </Grid>
    ))}
  </Grid>
) : (
  // actual content
)}
```

### Empty state
```tsx
import EmptyState from '@/components/EmptyState';
{data.length === 0 && !isLoading && (
  <EmptyState message="No items found" />
)}
```

### Form fields (always size="small")
```tsx
import { Controller } from 'react-hook-form';
<Controller
  name="fieldName"
  control={control}
  render={({ field }) => (
    <TextField
      {...field}
      fullWidth
      size="small"
      label="Field Label"
      error={!!errors.fieldName}
    />
  )}
/>
{errors.fieldName && (
  <FormHelperText error>{errors.fieldName.message}</FormHelperText>
)}
```

### Buttons (always use CustomButton)
```tsx
import CustomButton from '@/components/Buttons/CustomButton';
<CustomButton
  label="Save Changes"
  variant="contained"
  loading={isSubmitting}
  onClick={handleSubmit}
/>
```

### Status chip
```tsx
const statusColor: Record<string, 'success' | 'warning' | 'error'> = {
  active: 'success',
  pending: 'warning',
  inactive: 'error',
};
<Chip
  label={status}
  color={statusColor[status] ?? 'default'}
  size="small"
  variant="outlined"
/>
```

---

## RTK Query Service Pattern

```typescript
// frontend/src/services/models/index.ts
import { baseApi } from '@/services/base-api';
import { ApiResponse, PaginatedResponse } from '@/types/shared';
import { Model, ModelFilters } from '@/types/modules/models';

export const modelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getModels: builder.query<PaginatedResponse<Model>, ModelFilters>({
      query: (filters) => ({
        url: '/models',
        params: filters,
      }),
      providesTags: ['Models'],
    }),
    getModelById: builder.query<ApiResponse<Model>, string>({
      query: (id) => `/models/${id}`,
      providesTags: ['Models'],
    }),
    createModel: builder.mutation<ApiResponse<Model>, Partial<Model>>({
      query: (body) => ({ url: '/models', method: 'POST', body }),
      invalidatesTags: ['Models'],
    }),
  }),
});

export const { useGetModelsQuery, useGetModelByIdQuery, useCreateModelMutation } = modelsApi;
```

---

## Type Pattern

```typescript
// frontend/src/types/modules/models/index.ts

export interface Model {
  id: string;
  name: string;
  provider: string;
  description: string;
  capabilities: string[];
  rating: number;
  ratingCount: number;
  priceType: 'free' | 'paid' | 'freemium';
  price?: number;
  license: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ModelFilters {
  page?: number;
  pageSize?: number;
  search?: string;
  provider?: string;
  capability?: string;
  priceType?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
```

---

## Shared Types (already in frontend/src/types/shared/index.ts)

```typescript
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  statusCode: number;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
```

---

## Rules That Must Never Be Violated

1. `sx` prop only — never `style={{}}`, never CSS classes, never inline px values
2. `@/` path alias always — never `../../` relative imports
3. `CustomButton` always — never raw MUI `Button`
4. RTK Query via `baseApi.injectEndpoints()` — never raw `fetch` or `axios`
5. `useAppSelector` / `useAppDispatch` — never raw Redux hooks
6. ApexCharts must always be dynamically imported with `{ ssr: false }`
7. Every protected page needs `<AuthGuard>`, every auth page needs `<GuestGuard>`
8. Every page must declare `getLayout`
9. Every list must have `<EmptyState>` and a loading skeleton

---

## Navigation (update when adding new pages)

Update `frontend/src/layout/NavLinks/index.tsx` to add new routes.
Update `frontend/src/constants/routes.tsx` to add new ROUTES constants.
