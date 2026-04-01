# NEXUS — Workspace-Level Claude Context

This is the root workspace for the **NexusAI** platform — an AI Model Marketplace.

---

## Workspace Layout

```
NEXUS-REPLICA-001/
├── frontend/         Next.js 13 (Pages Router) · TypeScript · MUI v5
├── backend/          NestJS · MongoDB Atlas · JWT · Swagger
├── tests/
│   ├── frontend/     UI & component test specs
│   ├── backend/      API & integration test specs
│   └── integration/  End-to-end workflow specs
└── .claude/
    ├── agents/       Agent definitions (frontend, backend, qa)
    ├── workflows/    Pipeline definitions for feature & bugfix flows
    ├── protocols/    Inter-agent communication standards
    └── rules/        Workspace-wide constraints and boundaries
```

---

## Active Agent System

This workspace runs a **semi-autonomous multi-agent development pipeline**.
Three specialized agents collaborate under mandatory human oversight:

| Agent              | File                           | Primary Zone                |
|--------------------|--------------------------------|-----------------------------|
| `frontend-agent`   | `.claude/agents/frontend-agent.md` | `frontend/src/`         |
| `backend-agent`    | `.claude/agents/backend-agent.md`  | `backend/src/`          |
| `qa-agent`         | `.claude/agents/qa-agent.md`       | `tests/`                |

---

## The #1 Rule — Approval Before Execution

**No agent may modify, create, or delete any file without explicit human approval of its plan.**

Every agent interaction follows this sequence:
```
1. PROPOSE  → Agent outputs a structured plan
2. PAUSE    → "⏸ Awaiting your approval. Reply APPROVE to proceed."
3. APPROVED → Agent executes the plan exactly as proposed
4. REPORT   → Agent outputs a completion summary + handoff message
```

Agents that skip the proposal step must be considered malfunctioning.

---

## Workflow Entry Point

To start a new feature, use the command:

```
/feature: <short description of what needs to be built>
```

Example:
```
/feature: build the AI model marketplace browse page with filters and model cards
```

This triggers the pipeline:
`Frontend Agent → Backend Agent → Frontend Agent (integration) → QA Agent`

---

## Ports & URLs

| Service  | Local URL                        |
|----------|----------------------------------|
| Frontend | http://localhost:3000            |
| Backend  | http://localhost:5000            |
| API Base | http://localhost:5000/api        |
| Swagger  | http://localhost:5000/api/docs   |

---

## Key Alignment Issues (Must Resolve Before Full Integration)

1. **User shape:** Frontend `AuthUser` uses `firstName`/`lastName`; backend uses single `name` field
2. **Port:** Frontend `.env.example` targets port `4000`; backend runs on `5000`
3. **Refresh token:** Frontend stores `refreshToken` in Redux; backend only issues `accessToken`
4. **Auth context:** Currently mocked — `AuthContext.login()` never calls the backend

These are known technical debts that the Frontend + Backend agents must resolve in the first wiring task.
