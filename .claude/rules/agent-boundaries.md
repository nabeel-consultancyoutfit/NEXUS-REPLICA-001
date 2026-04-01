# Agent Boundaries & File Ownership Rules

This document defines which agent owns which directories and what each agent is strictly prohibited from touching.

---

## File Ownership Map

```
NEXUS-REPLICA-001/
│
├── frontend/
│   ├── src/
│   │   ├── components/        ✅ FRONTEND AGENT only
│   │   ├── pages/             ✅ FRONTEND AGENT only
│   │   ├── layout/            ✅ FRONTEND AGENT only
│   │   ├── hooks/             ✅ FRONTEND AGENT only
│   │   ├── services/          ✅ FRONTEND AGENT only
│   │   ├── redux/slices/      ✅ FRONTEND AGENT only
│   │   ├── types/             ✅ FRONTEND AGENT only
│   │   ├── utils/             ✅ FRONTEND AGENT only
│   │   ├── constants/         ✅ FRONTEND AGENT only
│   │   ├── mock/              ✅ FRONTEND AGENT only
│   │   ├── lib/               ✅ FRONTEND AGENT only
│   │   ├── styles/            ✅ FRONTEND AGENT only
│   │   ├── contexts/          ✅ FRONTEND AGENT only
│   │   └── GuardsAndPermissions/ ✅ FRONTEND AGENT only
│   │
│   ├── src/theme/             ⚠️  FRONTEND AGENT — requires explicit user instruction
│   ├── next.config.js         ⚠️  FRONTEND AGENT — requires explicit user instruction
│   ├── package.json           ⚠️  FRONTEND AGENT — requires explicit user instruction
│   ├── .env.local             ✅ FRONTEND AGENT (env values only)
│   └── tsconfig.json          ⚠️  FRONTEND AGENT — requires explicit user instruction
│
├── backend/
│   ├── src/
│   │   ├── auth/              ✅ BACKEND AGENT only
│   │   ├── users/             ✅ BACKEND AGENT only
│   │   ├── config/            ✅ BACKEND AGENT only
│   │   ├── common/            ✅ BACKEND AGENT only
│   │   └── [new modules]/     ✅ BACKEND AGENT only
│   │
│   ├── src/app.module.ts      ✅ BACKEND AGENT (to register new modules)
│   ├── src/main.ts            ⚠️  BACKEND AGENT — requires explicit user instruction
│   ├── .env                   ✅ BACKEND AGENT (env values only)
│   ├── package.json           ⚠️  BACKEND AGENT — requires explicit user instruction
│   └── tsconfig.json          ⚠️  BACKEND AGENT — requires explicit user instruction
│
├── tests/
│   ├── frontend/              ✅ QA AGENT only
│   ├── backend/               ✅ QA AGENT only
│   ├── integration/           ✅ QA AGENT only
│   └── bug-log.md             ✅ QA AGENT only
│
├── .claude/
│   ├── agents/                🔒 READ-ONLY for all agents (system config)
│   ├── workflows/             🔒 READ-ONLY for all agents (system config)
│   ├── protocols/             🔒 READ-ONLY for all agents (system config)
│   └── rules/                 🔒 READ-ONLY for all agents (system config)
│
└── product-specification.md   🔒 READ-ONLY for all agents (source of truth)
```

---

## Strict Prohibitions

### Frontend Agent MUST NOT:
- Read, write, or modify any file in `backend/`
- Read, write, or modify any file in `tests/`
- Modify `.claude/` configuration files
- Modify `product-specification.md`
- Install npm packages without user instruction
- Use `style={{}}` prop (use `sx` only)
- Use raw `fetch()` or `axios()` (use RTK Query only)

### Backend Agent MUST NOT:
- Read, write, or modify any file in `frontend/`
- Read, write, or modify any file in `tests/`
- Modify `.claude/` configuration files
- Hardcode secrets in source code (use `ConfigService`)
- Create endpoints without Swagger decorators
- Return password fields in API responses
- Skip DTO validation

### QA Agent MUST NOT:
- Modify any file in `frontend/src/`
- Modify any file in `backend/src/`
- Fix bugs directly in source code
- Create files outside `tests/`
- Mark tests as passed without running them

### ALL Agents MUST NOT:
- Skip the approval gate (PROPOSE → PAUSE → EXECUTE)
- Modify `.claude/` system files
- Exceed their approved file scope
- Make silent assumptions — escalate all ambiguities

---

## Conflict Resolution

When two agents need to change the same file:

1. **User is the final arbiter** — present the conflict and ask for direction
2. **No agent silently overrides another's work** — always flag it
3. **Types that are shared** between FE and BE should be discussed with the user; they currently live in `frontend/src/types/shared/` but a shared `types/` root may be appropriate

### Common Conflict Zones

| File | Potential Conflict | Resolution |
|---|---|---|
| `frontend/src/types/shared/index.ts` | FE types vs BE response shapes | Frontend Agent owns the file; Backend Agent proposes changes as part of its plan |
| `backend/src/main.ts` | Port, CORS origins, global config | Backend Agent owns; Frontend Agent reports needed CORS changes as part of its plan |
| `frontend/src/config.tsx` | BASE_URL, env vars | Frontend Agent owns; Backend Agent communicates port/path changes in handoff |

---

## Directory Creation Rules

Agents may create new directories only within their allowed zones:

```
Frontend Agent may create:
  frontend/src/pages/<new-page>/
  frontend/src/components/<NewComponent>/
  frontend/src/services/<feature>/
  frontend/src/redux/slices/<feature>/
  frontend/src/types/modules/<feature>/
  frontend/src/hooks/
  (and any subdirectory within frontend/src/)

Backend Agent may create:
  backend/src/<new-module>/
  backend/src/<new-module>/schemas/
  backend/src/<new-module>/dto/
  (and any subdirectory within backend/src/)

QA Agent may create:
  tests/frontend/<feature>/
  tests/backend/<feature>/
  tests/integration/<feature>/
  (and any subdirectory within tests/)
```

---

## Future Agent Zones (Reserved)

These zones are reserved for future agents and must not be populated by current agents:

```
devops/         → DevOps Agent (Docker, CI/CD, deployment)
data/           → Data Agent (analytics, pipelines, transformations)
security/       → Security Agent (audit reports, pen test results)
docs/           → Documentation Agent (API docs, architecture diagrams)
```
