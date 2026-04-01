# Feature Development Workflow — NexusAI Agent System

This document defines the full pipeline for developing a new feature from request to release.

---

## Trigger

Start a feature by writing:
```
/feature: <description>
```

Example:
```
/feature: build the AI model marketplace browse page with provider filters, capability chips, and model cards
```

---

## Full Pipeline Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                    FEATURE PIPELINE                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  [User] /feature: <description>                                       │
│       │                                                               │
│       ▼                                                               │
│  ┌─────────────────┐                                                  │
│  │  STAGE 1        │  Frontend Agent                                  │
│  │  UI Proposal    │  → Reads spec + existing code                    │
│  │                 │  → Produces FRONTEND_PLAN (UI only, mock data)   │
│  │                 │  → ⏸ GATE: awaits APPROVE                        │
│  └────────┬────────┘                                                  │
│           │ APPROVED                                                   │
│           ▼                                                            │
│  ┌─────────────────┐                                                  │
│  │  STAGE 2        │  Frontend Agent                                  │
│  │  UI Creation    │  → Builds pages, components, mock data           │
│  │                 │  → Emits TASK_COMPLETE + TASK_TRANSFER to BE     │
│  └────────┬────────┘                                                  │
│           │                                                            │
│           ▼                                                            │
│  ┌─────────────────┐                                                  │
│  │  STAGE 3        │  Backend Agent                                   │
│  │  API Proposal   │  → Reads FE handoff + required APIs              │
│  │                 │  → Produces BACKEND_PLAN (schema + endpoints)    │
│  │                 │  → ⏸ GATE: awaits APPROVE                        │
│  └────────┬────────┘                                                  │
│           │ APPROVED                                                   │
│           ▼                                                            │
│  ┌─────────────────┐                                                  │
│  │  STAGE 4        │  Backend Agent                                   │
│  │  API Creation   │  → Builds NestJS module, schema, controllers     │
│  │                 │  → Updates Swagger docs                          │
│  │                 │  → Emits TASK_COMPLETE + TASK_TRANSFER to FE     │
│  └────────┬────────┘                                                  │
│           │                                                            │
│           ▼                                                            │
│  ┌─────────────────┐                                                  │
│  │  STAGE 5        │  Frontend Agent                                  │
│  │  Integration    │  → Reads BE handoff + available endpoints        │
│  │  Proposal       │  → Produces FRONTEND_PLAN (RTK Query wiring)     │
│  │                 │  → ⏸ GATE: awaits APPROVE                        │
│  └────────┬────────┘                                                  │
│           │ APPROVED                                                   │
│           ▼                                                            │
│  ┌─────────────────┐                                                  │
│  │  STAGE 6        │  Frontend Agent                                  │
│  │  API Integration│  → Replaces mock data with RTK Query calls       │
│  │                 │  → Wires loading/error states, pagination        │
│  │                 │  → Emits TASK_COMPLETE + TASK_TRANSFER to QA     │
│  └────────┬────────┘                                                  │
│           │                                                            │
│           ▼                                                            │
│  ┌─────────────────┐                                                  │
│  │  STAGE 7        │  QA Agent                                        │
│  │  Test Proposal  │  → Reads all prior handoff notes                 │
│  │                 │  → Produces QA_PLAN (full test matrix)           │
│  │                 │  → ⏸ GATE: awaits APPROVE                        │
│  └────────┬────────┘                                                  │
│           │ APPROVED                                                   │
│           ▼                                                            │
│  ┌─────────────────┐                                                  │
│  │  STAGE 8        │  QA Agent                                        │
│  │  Test Execution │  → Runs all test cases                           │
│  │                 │  → Creates test spec files in tests/             │
│  │                 │  → Produces QA_REPORT                            │
│  └────────┬────────┘                                                  │
│           │                                                            │
│     ┌─────┴─────┐                                                      │
│     │           │                                                      │
│     ▼           ▼                                                      │
│  All pass    Bugs found                                                │
│     │            │                                                     │
│     ▼            ▼                                                     │
│  ✅ DONE     BUG-FIX WORKFLOW                                          │
│              (see bugfix-workflow.md)                                  │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Stage-by-Stage Detail

### Stage 1 & 2 — UI Creation

**Agent:** Frontend Agent
**Goal:** Build the complete UI using mock/static data first. No backend dependency yet.

Frontend Agent will:
1. Read `product-specification.md` for the feature spec
2. Read existing components (`components/`, `layout/`, `lib/`) for consistency
3. Read `frontend/.claude/CLAUDE.md` for design system rules
4. Build all pages, components, and types
5. Use mock data from `src/mock/` or inline fixtures
6. Leave placeholder comments where API calls will go

**Output:** Working UI page with mock data, plus `TASK_TRANSFER` to Backend Agent.

---

### Stage 3 & 4 — API Creation

**Agent:** Backend Agent
**Goal:** Build all required endpoints described in the Frontend Agent's handoff.

Backend Agent will:
1. Read the `TASK_TRANSFER` from Frontend Agent
2. Read `backend/src/` to understand existing module patterns
3. Design the Mongoose schema
4. Define DTOs with class-validator decorators
5. Build controller + service + module
6. Add full Swagger documentation
7. Register module in `AppModule`

**Output:** Live API endpoints, updated Swagger docs, plus `TASK_TRANSFER` to Frontend Agent.

---

### Stage 5 & 6 — API Integration

**Agent:** Frontend Agent
**Goal:** Replace all mock data with real RTK Query calls.

Frontend Agent will:
1. Read the `TASK_TRANSFER` from Backend Agent
2. Create or update `services/<feature>/index.ts` with `injectEndpoints()`
3. Update the page/component to use RTK Query hooks
4. Add loading states (skeleton / spinner)
5. Add error states (error boundary or error message)
6. Add empty state (`<EmptyState>` component)
7. Handle auth-protected endpoints (401 → redirect to login)
8. Handle pagination via `page` and `pageSize`

**Output:** Fully integrated feature with live data, plus `TASK_TRANSFER` to QA Agent.

---

### Stage 7 & 8 — QA Testing

**Agent:** QA Agent
**Goal:** Validate the complete feature against the acceptance criteria.

QA Agent will:
1. Read all `TASK_COMPLETE` and `TASK_TRANSFER` messages from prior stages
2. Build a test matrix covering API + UI + integration scenarios
3. Write test spec files in `tests/`
4. Run tests and record results
5. Issue `TASK_TRANSFER` bug reports for any failures

**Output:** `QA_REPORT` with pass/fail results. Either ✅ feature approved or bug-fix loop begins.

---

## Example — Real Scenario

**Feature:** `/feature: build the marketplace browse page`

| Stage | Agent | Action | Gate |
|---|---|---|---|
| 1 | Frontend | Reads spec, proposes: MarketplacePage + ModelCard + FilterSidebar + types | ⏸ User: APPROVE |
| 2 | Frontend | Creates page + components with mock model data | Auto-transfers to Backend |
| 3 | Backend | Proposes: models collection schema + 4 endpoints + DTOs | ⏸ User: APPROVE |
| 4 | Backend | Creates models module in NestJS | Auto-transfers to Frontend |
| 5 | Frontend | Proposes: modelsApi service + hook replacements in 3 components | ⏸ User: APPROVE |
| 6 | Frontend | Wires RTK Query, adds loading/empty/error states | Auto-transfers to QA |
| 7 | QA | Proposes: 18 test cases covering API + UI + integration | ⏸ User: APPROVE |
| 8 | QA | Runs tests, finds 2 bugs → issues transfers to Backend | Bug-fix loop begins |

---

## Parallel Work Note

By default this pipeline is sequential. However, for large features, the user may choose to:
- Run Stage 3 (API design) at the same time as Stage 2 (UI creation) if the API shape is already known
- Skip Stage 1 mock-data phase if the feature is purely API-driven

Any deviation from the default order must be explicitly stated by the user.
