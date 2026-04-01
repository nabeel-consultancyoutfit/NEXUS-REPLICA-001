# Task Transfer Protocol — NexusAI Agent System

This document defines the standard inter-agent communication format.
All agents must use this protocol when passing work to another agent.

---

## Overview

When one agent completes its phase and the next agent needs to begin, the completing agent emits a `TASK_TRANSFER` message. This message is **not** an execution command — it is a **handoff notification** that presents context to the receiving agent.

The receiving agent must still produce its own PLAN and wait for human APPROVAL before doing any work.

---

## TASK_TRANSFER Message Format

```
╔═══════════════════════════════════════════════════════╗
║                    TASK_TRANSFER                      ║
╠═══════════════════════════════════════════════════════╣
║  from:     [frontend-agent | backend-agent | qa-agent]
║  to:       [frontend-agent | backend-agent | qa-agent]
║  feature:  [short feature or task name]
║  status:   awaiting_manual_approval
╠═══════════════════════════════════════════════════════╣
║  CONTEXT
║
║  [2-3 sentence summary of what was just completed
║   and why the receiving agent is being triggered]
╠═══════════════════════════════════════════════════════╣
║  HANDOFF DATA
║
║  [The specific information the receiving agent needs.
║   Format depends on transfer type — see examples below]
╠═══════════════════════════════════════════════════════╣
║  APPROVAL_REQUIRED: true
║  NEXT_STEP: [what the receiving agent should do next]
╚═══════════════════════════════════════════════════════╝
```

---

## Transfer Type Examples

### 1. Frontend → Backend (APIs Required)

Emitted by Frontend Agent when UI is done but needs backend endpoints.

```
╔═══════════════════════════════════════════════════════╗
║                    TASK_TRANSFER                      ║
╠═══════════════════════════════════════════════════════╣
║  from:     frontend-agent
║  to:       backend-agent
║  feature:  marketplace-browse-page
║  status:   awaiting_manual_approval
╠═══════════════════════════════════════════════════════╣
║  CONTEXT
║
║  The Marketplace browse page UI is complete at
║  frontend/src/pages/marketplace/index.tsx.
║  It renders a model card grid with filters but
║  currently uses mock data. Real API endpoints
║  are needed to connect the live data layer.
╠═══════════════════════════════════════════════════════╣
║  REQUIRED APIs
║
║  GET  /api/models
║       Query params: page, pageSize, search, provider,
║                     capability, priceType, sortBy, sortOrder
║       Response:     PaginatedResponse<Model>
║
║  GET  /api/models/:id
║       Response:     Model (full detail)
║
║  GET  /api/models/providers
║       Response:     Provider[] (for filter dropdown)
║
║  POST /api/models/:id/bookmark   [JWT required]
║       Response:     { bookmarked: boolean }
╠═══════════════════════════════════════════════════════╣
║  DATA SHAPE EXPECTED BY FRONTEND
║
║  Model {
║    id: string
║    name: string
║    provider: string
║    description: string
║    capabilities: string[]
║    rating: number
║    ratingCount: number
║    priceType: 'free' | 'paid' | 'freemium'
║    price?: number
║    license: string
║    tags: string[]
║    createdAt: Date
║  }
╠═══════════════════════════════════════════════════════╣
║  APPROVAL_REQUIRED: true
║  NEXT_STEP: Backend Agent should produce a BACKEND_PLAN
║             for these endpoints, then await user APPROVE.
╚═══════════════════════════════════════════════════════╝
```

---

### 2. Backend → Frontend (APIs Ready for Integration)

Emitted by Backend Agent when APIs are complete and ready to integrate.

```
╔═══════════════════════════════════════════════════════╗
║                    TASK_TRANSFER                      ║
╠═══════════════════════════════════════════════════════╣
║  from:     backend-agent
║  to:       frontend-agent
║  feature:  marketplace-browse-page
║  status:   awaiting_manual_approval
╠═══════════════════════════════════════════════════════╣
║  CONTEXT
║
║  All Marketplace API endpoints are live on the backend.
║  Swagger docs updated at http://localhost:5000/api/docs.
║  Frontend can now replace mock data with real RTK Query calls.
╠═══════════════════════════════════════════════════════╣
║  AVAILABLE ENDPOINTS
║
║  GET  /api/models              ✅  (paginated, filterable)
║  GET  /api/models/:id          ✅  (full model detail)
║  GET  /api/models/providers    ✅  (for filter dropdown)
║  POST /api/models/:id/bookmark ✅  (JWT required)
╠═══════════════════════════════════════════════════════╣
║  INTEGRATION NOTES
║
║  - Auth: protected endpoints need Bearer token in header
║    (baseApi's prepareHeaders already handles this)
║  - Pagination: use page + pageSize query params
║  - Filtering: all filters are optional query params
║  - Error handling: 401 = redirect to login, 404 = show EmptyState
╠═══════════════════════════════════════════════════════╣
║  APPROVAL_REQUIRED: true
║  NEXT_STEP: Frontend Agent should produce a FRONTEND_PLAN
║             for API integration, then await user APPROVE.
╚═══════════════════════════════════════════════════════╝
```

---

### 3. Frontend → QA (UI Complete, Request Testing)

Emitted by Frontend Agent after completing a feature and requesting QA.

```
╔═══════════════════════════════════════════════════════╗
║                    TASK_TRANSFER                      ║
╠═══════════════════════════════════════════════════════╣
║  from:     frontend-agent
║  to:       qa-agent
║  feature:  marketplace-browse-page
║  status:   awaiting_manual_approval
╠═══════════════════════════════════════════════════════╣
║  CONTEXT
║
║  Marketplace browse page with live API integration is
║  complete. UI renders model cards from real backend data,
║  filters are wired, pagination is working, and bookmarking
║  requires JWT. Ready for full QA testing.
╠═══════════════════════════════════════════════════════╣
║  WHAT WAS BUILT
║
║  Page:       frontend/src/pages/marketplace/index.tsx
║  Components: ModelCard, FilterSidebar, LabFilterBar,
║              CapabilityChips, SearchBar
║  Services:   frontend/src/services/models/index.ts
║  Types:      frontend/src/types/modules/models/index.ts
╠═══════════════════════════════════════════════════════╣
║  ACCEPTANCE CRITERIA (for QA reference)
║
║  ✅ Models load from GET /api/models with pagination
║  ✅ Search filters the list in real-time
║  ✅ Provider filter pills work
║  ✅ Clicking a model opens /marketplace/:id detail
║  ✅ Bookmark button works for logged-in users
║  ✅ Bookmark button shows login prompt for guests
║  ✅ Empty state shows when no models match filters
║  ✅ Loading skeleton shows during fetch
╠═══════════════════════════════════════════════════════╣
║  APPROVAL_REQUIRED: true
║  NEXT_STEP: QA Agent should produce a QA_PLAN covering
║             the acceptance criteria above, then await APPROVE.
╚═══════════════════════════════════════════════════════╝
```

---

### 4. Backend → QA (API Complete, Request Testing)

Emitted by Backend Agent after completing API work.

```
╔═══════════════════════════════════════════════════════╗
║                    TASK_TRANSFER                      ║
╠═══════════════════════════════════════════════════════╣
║  from:     backend-agent
║  to:       qa-agent
║  feature:  marketplace-browse-page
║  status:   awaiting_manual_approval
╠═══════════════════════════════════════════════════════╣
║  CONTEXT
║
║  Marketplace API module is fully implemented.
║  All CRUD + search + bookmark endpoints are live.
╠═══════════════════════════════════════════════════════╣
║  ENDPOINTS TO TEST
║
║  GET  /api/models              public   pagination + filters
║  GET  /api/models/:id          public   single model
║  GET  /api/models/providers    public   provider list
║  POST /api/models/:id/bookmark JWT      bookmark toggle
╠═══════════════════════════════════════════════════════╣
║  EDGE CASES TO COVER
║
║  - Invalid pagination params (page=0, pageSize=999)
║  - Non-existent model ID (expect 404)
║  - Bookmark without auth (expect 401)
║  - Empty search query (expect full list)
║  - Very long search string (expect graceful handling)
╠═══════════════════════════════════════════════════════╣
║  APPROVAL_REQUIRED: true
║  NEXT_STEP: QA Agent should produce a QA_PLAN for API
║             testing, then await user APPROVE.
╚═══════════════════════════════════════════════════════╝
```

---

### 5. QA → Frontend or Backend (Bug Found)

Emitted by QA Agent when bugs are found and a fix is needed.

```
╔═══════════════════════════════════════════════════════╗
║                    TASK_TRANSFER                      ║
╠═══════════════════════════════════════════════════════╣
║  from:     qa-agent
║  to:       backend-agent         ← or frontend-agent
║  feature:  marketplace-browse-page
║  status:   awaiting_manual_approval
╠═══════════════════════════════════════════════════════╣
║  CONTEXT
║
║  QA testing found 2 bugs that must be fixed before
║  this feature can be released. Both are backend issues.
╠═══════════════════════════════════════════════════════╣
║  BUG REPORTS
║
║  BUG-001  HIGH
║    Endpoint:    GET /api/models
║    Description: Returns 500 when 'search' param contains
║                 special characters (e.g. "C++")
║    Steps:       GET /api/models?search=C%2B%2B
║    Expected:    200 with filtered results or empty array
║    Actual:      500 Internal Server Error
║    Test file:   tests/backend/models.spec.ts TC07
║
║  BUG-002  MEDIUM
║    Endpoint:    POST /api/models/:id/bookmark
║    Description: Bookmarking same model twice returns 500
║                 instead of toggling the bookmark off
║    Steps:       POST /api/models/abc123/bookmark (twice)
║    Expected:    Second call returns { bookmarked: false }
║    Actual:      500 MongoError duplicate key
║    Test file:   tests/backend/models.spec.ts TC12
╠═══════════════════════════════════════════════════════╣
║  APPROVAL_REQUIRED: true
║  NEXT_STEP: Backend Agent should produce a BACKEND_PLAN
║             for these bug fixes, then await user APPROVE.
║             After fixes, QA will re-run affected test cases.
╚═══════════════════════════════════════════════════════╝
```

---

## Transfer Routing Map

```
User Request
    │
    ▼
Frontend Agent (UI)
    │
    ├─── Needs APIs? ──────────────────► Backend Agent (API design)
    │                                         │
    │                                         └─── APIs ready ──► Frontend Agent (integration)
    │                                                                   │
    │                                         ┌─────────────────────────┘
    │                                         │
    ▼                                         ▼
QA Agent ◄──────────────────────── UI + Integration complete
    │
    ├─── Bugs in FE? ──────────────────► Frontend Agent (fix)
    ├─── Bugs in BE? ──────────────────► Backend Agent (fix)
    └─── All passed? ──────────────────► ✅ Feature Complete
```

---

## Rules

1. A `TASK_TRANSFER` is **not** an execution command. It is context for the next agent's planning phase.
2. The receiving agent must ALWAYS produce its own plan and wait for user APPROVE.
3. A transfer message must include enough context that the receiving agent doesn't need to ask basic questions.
4. If a transfer would trigger two agents simultaneously, the user must decide the order.
5. Circular transfers (A→B→A→B) are allowed for iterative bug-fix cycles, but each cycle requires a new approval.
