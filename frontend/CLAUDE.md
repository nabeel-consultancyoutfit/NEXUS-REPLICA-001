# AAC Boilerplate — Project Documentation

> A clean, production-ready Next.js + TypeScript boilerplate following the AAC (Air Apple Cart) architecture pattern.
> This project is intentionally free of business logic — it serves as a verified starting point for any new module or product.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (Pages Router) | 13.4.19 |
| Language | TypeScript | 5.2.2 |
| UI Library | React | 18.2.0 |
| Component Library | Material UI (MUI) | 5.15.18 |
| State Management | Redux Toolkit | 1.9.5 |
| Server State / API | RTK Query (built into Redux Toolkit) | 1.9.5 |
| React Binding | React Redux | 8.1.2 |
| Table | @tanstack/react-table | 8.10.3 |
| Charts | ApexCharts + react-apexcharts | 3.49.0 |
| MUI Charts | @mui/x-charts | 7.2.0 |
| Date Picker | @mui/x-date-pickers | 7.2.0 |
| Form Management | React Hook Form | 7.46.2 |
| Form Validation | Yup | 1.3.1 |
| Notifications | Notistack | 3.0.1 |
| Date Utilities | date-fns | 2.30.0 |
| Date Utilities (alt) | dayjs | 1.11.10 |
| Real-time | Socket.io Client | 4.7.2 |
| Utilities | Lodash | 4.17.21 |
| Token Decode | jwt-decode | 4.0.0 |

---

## Architecture Overview

This project follows a **feature-based modular architecture** .

```
src/
├── assets/               # Static icons and images
├── components/           # Shared, reusable UI components
│   ├── Buttons/          # CustomButton, CustomIconButton, CustomLoadingButton
│   ├── CommonDialog/     # Reusable modal/dialog
│   ├── DataTable/        # Generic table component
│   ├── EmptyState/       # Empty state UI
│   ├── ErrorBoundary/    # React error boundary
│   ├── LoadingSpinner/   # Loading indicator
│   └── PageHeader/       # Page title + breadcrumbs + actions
├── config.tsx            # App-wide config (BASE_URL, pagination, date formats)
├── constants/            # Routes, strings, permissions
│   ├── routes.tsx
│   └── strings.ts
├── contexts/             # React Contexts
│   └── AuthContext.tsx   # Authentication context + Provider
├── GuardsAndPermissions/ # Route access control
│   ├── AuthGuard.tsx     # Requires authenticated user
│   ├── GuestGuard.tsx    # Redirects authenticated users away
│   └── PermissionsGuard.tsx  # Role/permission-based guard
├── hooks/                # Custom React hooks
│   ├── useAuth.tsx       # Auth state + login/logout
│   ├── usePath.tsx       # Router wrapper with isActive helper
│   ├── useResponsive.tsx # MUI breakpoint queries
│   └── useToggle.tsx     # Boolean toggle helper
├── layout/               # Page layout shells
│   ├── Header/           # Top AppBar
│   ├── MainLayout/       # Sidebar + Header + content wrapper
│   ├── NavLinks/         # Sidebar navigation
│   └── PlainLayout/      # Minimal centered layout (for auth pages)
├── lib/                  # Low-level utility wrappers
│   ├── date-time.tsx     # date-fns wrappers
│   └── snackbar.tsx      # Notistack helper (showSuccess, showError, etc.)
├── mock/                 # Static mock/seed data for development
│   └── index.ts
├── modules/              # Feature module stubs (to be expanded per feature)
│   ├── auth/
│   ├── dashboard/
│   └── settings/
├── pages/                # Next.js Pages Router
│   ├── _app.tsx          # App wrapper (Redux, MUI, Auth, Snackbar)
│   ├── _document.tsx     # HTML document (fonts, meta)
│   ├── index.tsx         # Redirects to /dashboard
│   ├── login/            # Login page
│   ├── dashboard/        # Demo dashboard (all deps working)
│   ├── settings/         # Settings page stub
│   ├── 403.tsx           # Access denied
│   └── 404.tsx           # Not found
├── redux/                # Redux state management
│   ├── store.ts          # Store config + typed hooks
│   └── slices/
│       ├── auth/         # Auth state (user, tokens, isAuthenticated)
│       ├── ui/           # UI state (sidebarOpen, theme, pageTitle)
│       └── counter/      # Demo slice (proves Redux works)
├── services/             # RTK Query API services
│   ├── base-api/         # createApi base with auth headers + tag types
│   └── demo/             # Demo endpoints (JSONPlaceholder — proves RTK Query works)
├── styles/
│   └── globals.css       # Global CSS + scrollbar
├── theme/                # MUI theme configuration
│   ├── index.ts          # createTheme (palette + typography + shadows + overrides)
│   ├── overrides/        # Component-level MUI overrides
│   ├── palette/          # Color palette (Primary: #38CAB5, Secondary: #35456D)
│   ├── shadows/          # Custom shadow definitions
│   └── typography/       # Font + text scale (Plus Jakarta Sans)
├── types/                # TypeScript type definitions
│   ├── shared/           # ApiResponse, PaginatedResponse, TableColumn, Status…
│   └── modules/          # Module-specific types (add as features grow)
└── utils/                # General utility functions
    └── index.ts          # formatDate, capitalize, truncate, formatCurrency, etc.
```

---

## Key Patterns

### 1. Per-Page Layout Pattern
Each page declares its own layout via `getLayout`:
```tsx
MyPage.getLayout = (page: ReactElement) => <PlainLayout>{page}</PlainLayout>;
```
`_app.tsx` calls `Component.getLayout` if defined, otherwise defaults to `MainLayout`.

### 2. RTK Query API Pattern
All API calls go through `baseApi` (in `services/base-api/index.ts`).
Feature services inject their endpoints:
```ts
export const myFeatureApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query<Item[], void>({
      query: () => '/items',
      providesTags: ['MyTag'],
    }),
  }),
});
export const { useGetItemsQuery } = myFeatureApi;
```

### 3. Redux State Pattern
Each feature gets its own slice in `redux/slices/<feature>/index.ts`.
Always use the typed hooks:
```ts
const dispatch = useAppDispatch();
const value = useAppSelector((state) => state.mySlice.value);
```

### 4. Route Guards
Protect pages by wrapping with guards at the top of the component:
```tsx
export default function MyPage() {
  return (
    <AuthGuard>
      <MyPageContent />
    </AuthGuard>
  );
}
```

### 5. Toast Notifications
Use the `lib/snackbar` helpers anywhere (inside or outside React):
```ts
import { showSuccess, showError, showWarning, showInfo } from '@/lib/snackbar';
showSuccess('Saved successfully!');
showError('Something went wrong.');
```

### 6. Component Convention
Each component folder follows this structure:
```
components/MyComponent/
├── index.tsx              # The component
├── MyComponent.types.ts   # Props interface (for complex components)
└── MyComponent.data.ts    # Static config/data (if needed)
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_BASE_URL` | Backend REST API base URL |
| `NEXT_PUBLIC_SOCKET_URL` | Socket.io server URL |
| `NEXT_PUBLIC_APP_NAME` | App display name |

---

## Getting Started

```bash
# Install dependencies
npm install

# Copy env file
cp .env.example .env.local

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
You will be redirected to `/dashboard` (login with demo credentials: `admin@example.com` / any password).

---

## Demo Dashboard

The `/dashboard` page is a **live dependency verification screen**. It proves each library is installed and working:

| Section | Dependency | What it shows |
|---|---|---|
| Redux Toolkit | `@reduxjs/toolkit` | Counter with increment / decrement / step |
| RTK Query | `@reduxjs/toolkit` (RTK Query) | Live fetch from JSONPlaceholder API |
| TanStack Table | `@tanstack/react-table` | Paginated table with mock data |
| ApexCharts | `react-apexcharts` | Animated line chart |
| React Hook Form + Yup | `react-hook-form` + `yup` | Validated form with field errors |
| MUI X Date Picker | `@mui/x-date-pickers` | Interactive date picker |
| Notistack | `notistack` | Toast buttons (success, error, warning, info) |

---

## Coding Conventions

- **File naming**: PascalCase for components (`MyComponent/index.tsx`), camelCase for hooks/utils
- **Route naming**: kebab-case (`/air-sales`, `/edit-profile`)
- **Constants**: SCREAMING_SNAKE_CASE
- **Types/Interfaces**: PascalCase, suffix with descriptive noun (`UserBasic`, `ApiResponse<T>`)
- **Commits**: Follow Conventional Commits format (`feat:`, `fix:`, `chore:`, `refactor:`)
- **Path aliases**: Always use `@/` instead of relative paths (`import X from '@/components/...'`)
- **No inline styles**: Use MUI `sx` prop or theme overrides

---

## Adding a New Feature Module

1. Create the folder: `src/modules/myFeature/`
2. Add RTK Query service: `src/services/myFeature/index.ts`
3. Add Redux slice (if local state needed): `src/redux/slices/myFeature/index.ts`
4. Register in store: `src/redux/store.ts`
5. Add page route: `src/pages/my-feature/index.tsx`
6. Add nav item to: `src/layout/NavLinks/index.tsx`
7. Add types: `src/types/modules/myFeature/index.ts`
8. Add route constant: `src/constants/routes.tsx`

---

## CI / Deployment

- **Dockerfile** included for containerized builds
- **docker-compose.yml** for local container dev
- **Jenkinsfile** for CI/CD pipeline

```bash
docker-compose up -d
```

---

*This boilerplate was scaffolded to mirror the AAC-FE-DEV-001 architecture. All business logic has been intentionally omitted — add features module by module.*
