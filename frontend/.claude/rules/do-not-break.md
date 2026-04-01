# Do Not Break — Protected Patterns

These are patterns that are working correctly and must not be changed without explicit instruction from the user.

---

## App Bootstrap (`src/pages/_app.tsx`)

The provider order in `_app.tsx` is intentional and must be preserved:
```
Redux Provider
  └── ThemeProvider
        └── CssBaseline
              └── AuthProvider
                    └── SnackbarProvider
                          └── SnackbarUtilsConfigurator
                                └── ErrorBoundary
                                      └── Layout + Page
```
Do not add, remove, or reorder providers without understanding the dependency chain.

---

## RTK Query Base API (`src/services/base-api/index.ts`)

- The `prepareHeaders` function reads `auth.accessToken` from Redux state — this is the single point of auth header injection.
- `tagTypes` list must be updated when adding new feature services — do not remove existing tags.
- Do not change `reducerPath: 'baseApi'` — it is referenced in `store.ts`.

---

## Redux Store (`src/redux/store.ts`)

- `useAppDispatch` and `useAppSelector` are the typed wrappers — they must remain exported from this file.
- `persistAuth`, `loadPersistedAuth`, and `clearPersistedAuth` are the canonical localStorage helpers for auth — use them instead of writing new localStorage logic.
- The `baseApi.middleware` in the middleware chain is required for RTK Query caching to work — do not remove it.

---

## Per-Page Layout Pattern

The `getLayout` pattern on page components is the established way layouts are assigned. Do not break this by adding layout wrappers inside `_app.tsx` directly.

---

## Theme (`src/theme/`)

- `palette/index.ts` — primary `#38CAB5`, secondary `#35456D`. Do not change these without a design decision.
- `typography/index.ts` — font is Plus Jakarta Sans. Do not swap fonts without updating `_document.tsx` too.
- `overrides/index.ts` — component-level MUI overrides. Changes here affect every instance of those components globally.

---

## Auth Flow

- `AuthContext` is the runtime source of truth for `user` and `isAuthenticated`.
- `localStorage` keys `accessToken` and `userEmail` are used by `AuthContext` on page reload to rehydrate auth state. Do not rename these keys.
- `AuthGuard` depends on `useAuthContext()` — if the context changes, the guard must be updated too.

---

## Dynamic Import for ApexCharts

```tsx
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
```
This must remain dynamic with `ssr: false`. ApexCharts accesses browser APIs at import time and will crash Next.js SSR if imported normally.
