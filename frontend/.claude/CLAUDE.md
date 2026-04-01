# AAC Boilerplate — Claude Context

This file gives Claude the essential context needed to work effectively in this codebase.

---

## What This Project Is

A production-ready **Next.js 13 (Pages Router) + TypeScript** boilerplate for the AAC (Air Apple Cart) team. It is intentionally free of business logic — it is a verified starting point for any new product or module.

Full project documentation lives in `/CLAUDE.md` at the root.

---

## Tech Stack (Quick Reference)

| Layer | Technology |
|---|---|
| Framework | Next.js 13.4 — Pages Router |
| Language | TypeScript 5.2 |
| UI | Material UI v5 (`@mui/material`) |
| State | Redux Toolkit + RTK Query |
| Forms | React Hook Form + Yup |
| Tables | @tanstack/react-table v8 |
| Charts | ApexCharts (SSR-disabled dynamic import) |
| Notifications | Notistack (`showSuccess`, `showError`, etc. from `@/lib/snackbar`) |
| Date | date-fns (utils) + dayjs (MUI date picker adapter) |
| Real-time | Socket.io Client |

---

## Key Directories

```
src/
├── components/     Shared UI components (CustomButton, StatsCard, PageHeader, etc.)
├── contexts/       AuthContext — runtime auth state
├── GuardsAndPermissions/  AuthGuard, GuestGuard, PermissionsGuard
├── hooks/          useAuth, useToggle, useResponsive, usePath
├── layout/         MainLayout, PlainLayout, Header, NavLinks
├── lib/            snackbar helpers, date-time wrappers
├── pages/          Next.js routes (index, login, dashboard, settings, 403, 404)
├── redux/          store.ts + slices (auth, ui, counter)
├── services/       base-api (RTK Query) + demo endpoints
├── theme/          MUI theme (palette, typography, shadows, overrides)
├── types/          shared types (ApiResponse, PaginatedResponse, etc.)
└── utils/          formatDate, capitalize, truncate, formatCurrency
```

---

## Agents Available

| Agent | When to Use |
|---|---|
| `code-reviewer` | Before committing — checks conventions, TypeScript, patterns |
| `doc-reviewer` | Check JSDoc, inline comments, and markdown accuracy |
| `frontend-designer` | Building new screens or components with MUI |
| `performance-reviewer` | Before a release or when the app feels slow |
| `security-reviewer` | Before any production deploy — auth, tokens, XSS |

---

## Skills Available

| Skill | When to Use |
|---|---|
| `add-feature-module` | Scaffolding a full new feature (types → service → slice → page → nav) |
| `add-data-table` | Adding a paginated TanStack Table to any page |
| `add-form` | Building a React Hook Form + Yup form (standalone or in a modal) |

---

## Rules

All coding rules live in `.claude/rules/`:
- `project-conventions.md` — naming, imports, styling, state, API, forms, guards
- `do-not-break.md` — protected patterns that must not be changed silently

---

## Important Behaviours

- **Single source of truth for auth:** `AuthContext` owns `user` + `isAuthenticated` at runtime. Redux `auth` slice mirrors it — do not create a third source.
- **No raw `fetch`/`axios`:** All API calls go through `baseApi.injectEndpoints()`.
- **No inline styles:** Use MUI `sx` prop only.
- **ApexCharts must be dynamically imported** with `{ ssr: false }`.
- **Guards redirect inside `useEffect`**, never during render.
- **Path alias:** Always `@/` — never relative imports.

---

## Environment

Copy `.env.example` → `.env.local` and set:
- `NEXT_PUBLIC_BASE_URL` — backend REST API base URL
- `NEXT_PUBLIC_SOCKET_URL` — Socket.io server URL
- `NEXT_PUBLIC_APP_NAME` — app display name

Demo credentials: `admin@example.com` / any password (mock auth).
