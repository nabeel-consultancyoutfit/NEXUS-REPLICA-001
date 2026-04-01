# Frontend Boilerplate — Project Rules for Claude

These rules apply to every task Claude performs in this codebase. Follow them without exception unless the user explicitly overrides one.

---

## 1. File & Folder Structure

- Components → `src/components/MyComponent/index.tsx`
- Pages → `src/pages/my-route/index.tsx`
- Hooks → `src/hooks/useMyHook.tsx`
- Redux slices → `src/redux/slices/<feature>/index.ts`
- RTK Query services → `src/services/<feature>/index.ts`
- Types → `src/types/shared/index.ts` or `src/types/modules/<feature>/index.ts`
- Utils → `src/utils/index.ts`
- Constants → `src/constants/`
- Layout shells → `src/layout/<Name>/index.tsx`

Never create files outside these folders unless the user asks.

---

## 2. Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Component files | PascalCase | `UserCard/index.tsx` |
| Hooks | camelCase with `use` prefix | `useUserProfile.tsx` |
| Services / utils | camelCase | `formatDate.ts` |
| Routes (URL) | kebab-case | `/user-profile` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_PAGE_SIZE` |
| Types / Interfaces | PascalCase + noun suffix | `UserBasic`, `ApiResponse<T>` |
| Redux slices | camelCase | `authSlice` |
| Enum values | PascalCase | `Status.Active` |

---

## 3. TypeScript Rules

- **No `any`** — ever. Use `unknown` and narrow, or define a proper type.
- All function parameters and return types must be explicitly typed.
- All exported component props must have an interface (suffix: `Props`).
- Shared types go in `src/types/` — never inline types that are used in more than one file.
- Duplicate type declarations are not allowed — import, don't re-declare.

---

## 4. Imports

- Always use `@/` alias — never relative paths like `../../components`.
- Import order (enforced by ESLint):
  1. React
  2. External libraries
  3. Internal (`@/`) imports
  4. Styles
- Named imports only for MUI icons and lodash functions — no barrel/default imports.

---

## 5. Styling

- **No inline `style={{}}`** — use MUI `sx` prop exclusively.
- **No hardcoded colors or px values** — always reference theme tokens.
  - ✅ `sx={{ color: 'primary.main', p: 2 }}`
  - ❌ `sx={{ color: '#38CAB5', padding: '16px' }}`
- MUI component overrides go in `src/theme/overrides/index.ts`.
- Never add a new CSS class in `globals.css` without a strong reason.

---

## 6. State Management

- Read state with `useAppSelector` — never raw `useSelector`.
- Dispatch actions with `useAppDispatch` — never raw `useDispatch`.
- Do not put business logic in reducers — reducers only update state shape.
- New slices must be registered in `src/redux/store.ts`.
- Auth state single source of truth is `AuthContext` — do not duplicate auth fields in other slices.

---

## 7. API Calls

- All API calls go through `baseApi.injectEndpoints()` in `src/services/<feature>/index.ts`.
- Never use raw `fetch` or `axios` directly in components or hooks.
- Every endpoint must define `providesTags` (queries) or `invalidatesTags` (mutations).
- Response types must be fully typed — no implicit `any`.

---

## 8. Forms

- All forms use `react-hook-form` with `Controller` for MUI fields.
- Validation schema defined with `yup` outside the component body.
- Every field must render its error message via `<FormHelperText error>`.
- Submit handlers must handle loading state and use `showSuccess`/`showError` from `@/lib/snackbar`.

---

## 9. Route Guards

- Every protected page must be wrapped in `<AuthGuard>`.
- Redirects inside guards must be inside `useEffect` — never in the render body.
- Role-gated content uses `<PermissionsGuard>`.

---

## 10. Page Layout Pattern

Every page must declare its layout via `getLayout`:
```tsx
MyPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
```
Use `PlainLayout` for auth pages (login, 403, 404). Use `MainLayout` for all authenticated pages.

---

## 11. Commits

Follow Conventional Commits:
- `feat:` — new feature
- `fix:` — bug fix
- `chore:` — tooling, deps, config
- `refactor:` — code change with no behavior change
- `docs:` — documentation only
- `style:` — formatting only
- `test:` — tests only

---

## 12. What Claude Must NOT Do

- Do not install new npm packages without asking the user first.
- Do not modify `src/theme/` files unless the task is explicitly about theming.
- Do not delete any existing files unless explicitly told to.
- Do not create a README or markdown documentation file unless asked.
- Do not add `console.log` statements to committed code.
- Do not bypass ESLint rules with `// eslint-disable`.
