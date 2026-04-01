# Workspace Conventions — NexusAI Agent System

Global rules that apply to every agent working in this workspace.

---

## 1. Plan Before You Code

The golden rule of this workspace:
**No file is modified without an approved plan.**

The sequence is always:
```
READ context → ANALYZE requirements → PROPOSE plan → WAIT → EXECUTE → REPORT
```

An agent that jumps straight to execution is operating incorrectly.

---

## 2. Naming Conventions

### Frontend

| Item | Convention | Example |
|---|---|---|
| Component folder | PascalCase | `ModelCard/index.tsx` |
| Page folder | kebab-case | `marketplace/index.tsx` |
| Hook | `use` prefix, camelCase | `useModelFilters.tsx` |
| Redux slice folder | camelCase | `slices/models/index.ts` |
| RTK Query service | feature name | `services/models/index.ts` |
| Type file | `index.ts` | `types/modules/models/index.ts` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_PAGE_SIZE = 100` |
| Routes | kebab-case URL | `/marketplace`, `/model-detail` |

### Backend

| Item | Convention | Example |
|---|---|---|
| NestJS module folder | camelCase | `models/` |
| Schema file | `<name>.schema.ts` | `model.schema.ts` |
| DTO file | `<action>-<name>.dto.ts` | `create-model.dto.ts` |
| Controller | `<name>.controller.ts` | `models.controller.ts` |
| Service | `<name>.service.ts` | `models.service.ts` |
| Module | `<name>.module.ts` | `models.module.ts` |
| Enum | PascalCase | `ModelStatus.Active` |

### Tests

| Item | Convention | Example |
|---|---|---|
| Backend test | `<name>.spec.ts` | `models.spec.ts` |
| Frontend test | `<name>.spec.ts` | `marketplace.spec.ts` |
| Integration test | `<feature>-flow.spec.ts` | `marketplace-flow.spec.ts` |
| Test ID | `TC` + zero-padded number | `TC01`, `TC12` |
| Bug ID | `BUG` + zero-padded number | `BUG-001`, `BUG-012` |

---

## 3. Git Commit Conventions

All commits follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(marketplace): add model card grid with filter sidebar
fix(auth): handle duplicate email with 409 instead of 500
chore(deps): upgrade @nestjs/mongoose to 10.0.4
refactor(models): extract pagination logic to shared utility
test(qa): add TC07 for special character search edge case
docs(swagger): update model endpoints with response schemas
```

Format: `type(scope): lowercase short description`

Scopes match the feature or module being changed:
`auth`, `users`, `models`, `marketplace`, `chat`, `agents`, `qa`, `config`

---

## 4. Environment Variable Rules

- All secrets belong in `.env` files — never in source code
- Frontend env vars: must be prefixed `NEXT_PUBLIC_` only for non-sensitive values
- Backend env vars: accessed only via `ConfigService.get('VAR_NAME')` — never `process.env.X` in code
- Both projects have `.env.example` with placeholder values — keep it updated when adding new vars

---

## 5. API Response Standards

All backend API responses must conform to the shapes in `frontend/src/types/shared/index.ts`:

```typescript
// Standard success response
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  statusCode: number;
}

// Paginated response
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
```

Errors are handled by `backend/src/common/filters/all-exceptions.filter.ts` — always:
```json
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "User with ID \"abc\" not found",
  "timestamp": "2026-04-01T12:00:00.000Z",
  "path": "/api/users/abc"
}
```

---

## 6. Documentation Rules

- All new NestJS controllers must have `@ApiTags`, `@ApiOperation`, `@ApiResponse` on every endpoint
- All new DTOs must have `@ApiProperty` / `@ApiPropertyOptional` on every field
- Swagger must remain up-to-date — never merge backend code that breaks the Swagger build
- Frontend: complex hooks and utility functions should have JSDoc comments
- No auto-generated README files unless explicitly requested

---

## 7. Performance Awareness

Agents must flag — not silently skip — performance issues:

| Issue | Where to flag |
|---|---|
| Missing DB index | In `BACKEND_PLAN` under a "Performance Notes" section |
| N+1 query pattern | In `BACKEND_PLAN` with suggested fix |
| Large component re-renders | In `FRONTEND_PLAN` with suggested optimization |
| Missing pagination | In `BACKEND_PLAN` or `FRONTEND_PLAN` — all list endpoints must paginate |
| ApexCharts SSR | Always dynamic import with `{ ssr: false }` |

---

## 8. Security Baseline

Every agent must maintain:

**Frontend:**
- Tokens stored in Redux + localStorage (current pattern) — never in cookies without `httpOnly`
- No secrets in `NEXT_PUBLIC_` env vars
- No `dangerouslySetInnerHTML` without sanitization
- Auth guard on every protected route

**Backend:**
- Passwords: bcrypt 12 rounds, `select: false` on schema, never in responses
- JWT secret: loaded via `ConfigService`, minimum 32 chars in production
- CORS: explicit origin whitelist only
- All inputs validated via `class-validator` DTOs
- Swagger: do not expose internal error details in production

---

## 9. Expansion Slots (Future Agents)

When the following agents are added, they will follow the same PROPOSE → APPROVE → EXECUTE pattern:

| Future Agent | Responsibility | Zone |
|---|---|---|
| `devops-agent` | Docker, GitHub Actions CI/CD, deployment scripts | `devops/`, `Dockerfile`, `.github/` |
| `data-agent` | Analytics events, data pipelines, reporting | `data/`, `backend/src/analytics/` |
| `security-agent` | Security audits, penetration test reports, hardening | `security/`, audit reports |
| `docs-agent` | Architecture diagrams, API docs generation, changelogs | `docs/` |

No current agent should create files in these future zones.
