# Bug Fix Workflow — NexusAI Agent System

This document defines the pipeline for handling bugs reported by the QA Agent or directly by the user.

---

## Trigger Sources

A bug fix cycle begins from one of three sources:

| Source | Trigger |
|---|---|
| QA Agent | Emits `TASK_TRANSFER` with bug reports after a failed test run |
| User | Reports a bug directly: `/bug: <description>` |
| Code Review | A reviewer identifies a defect |

---

## Bug Fix Pipeline

```
┌─────────────────────────────────────────────────────────────────────┐
│                     BUG-FIX PIPELINE                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Bug reported (QA transfer OR user /bug: command)                     │
│       │                                                               │
│       ▼                                                               │
│  ┌─────────────────┐                                                  │
│  │  TRIAGE         │  Identify which agent is responsible             │
│  │                 │  FE bug → Frontend Agent                         │
│  │                 │  BE bug → Backend Agent                          │
│  │                 │  Unclear → Ask user to decide                    │
│  └────────┬────────┘                                                  │
│           │                                                            │
│           ▼                                                            │
│  ┌─────────────────┐                                                  │
│  │  STAGE B1       │  Responsible Agent                               │
│  │  Fix Proposal   │  → Reads bug report in detail                    │
│  │                 │  → Produces FIX_PLAN                             │
│  │                 │  → ⏸ GATE: awaits APPROVE                        │
│  └────────┬────────┘                                                  │
│           │ APPROVED                                                   │
│           ▼                                                            │
│  ┌─────────────────┐                                                  │
│  │  STAGE B2       │  Responsible Agent                               │
│  │  Fix Execution  │  → Implements fix                                │
│  │                 │  → Emits TASK_COMPLETE                           │
│  └────────┬────────┘                                                  │
│           │                                                            │
│           ▼                                                            │
│  ┌─────────────────┐                                                  │
│  │  STAGE B3       │  QA Agent                                        │
│  │  Re-test Plan   │  → Reads fix summary                             │
│  │                 │  → Proposes targeted regression test plan        │
│  │                 │  → ⏸ GATE: awaits APPROVE                        │
│  └────────┬────────┘                                                  │
│           │ APPROVED                                                   │
│           ▼                                                            │
│  ┌─────────────────┐                                                  │
│  │  STAGE B4       │  QA Agent                                        │
│  │  Re-test        │  → Runs regression + previously failed tests     │
│  │  Execution      │  → Produces updated QA_REPORT                   │
│  └────────┬────────┘                                                  │
│           │                                                            │
│     ┌─────┴─────┐                                                      │
│     │           │                                                      │
│     ▼           ▼                                                      │
│  All pass    New bugs                                                  │
│     │            │                                                     │
│     ▼            └─────────────── Loop back to TRIAGE                 │
│  ✅ Bug closed                                                         │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## FIX_PLAN Format

The responsible agent uses this format when proposing a fix:

```
═══════════════════════════════════════════════════════
FIX_PLAN
───────────────────────────────────────────────────────
Agent:       [frontend-agent | backend-agent]
Bug ID:      [BUG-001]
Severity:    [CRITICAL | HIGH | MEDIUM | LOW]
Triggered by: qa-agent
───────────────────────────────────────────────────────
BUG SUMMARY
  Description: [copied from QA report]
  Location:    [file + line or endpoint]
  Root cause:  [agent's diagnosis of WHY this is happening]
───────────────────────────────────────────────────────
FIX APPROACH
  Strategy: [what will be changed and why it fixes the bug]
───────────────────────────────────────────────────────
IMPLEMENTATION PLAN
  Step 1: [action — file path — what changes]
  Step 2: [action — file path — what changes]
  Step N: ...
───────────────────────────────────────────────────────
FILES TO MODIFY
  - [list]
FILES TO CREATE
  - (none | list)
───────────────────────────────────────────────────────
REGRESSION RISK
  [Are there other areas of the codebase that might be
   affected by this fix? List them here.]
───────────────────────────────────────────────────────
APPROVAL_REQUIRED: true
═══════════════════════════════════════════════════════
⏸ AWAITING APPROVAL
Reply APPROVE to implement this fix.
```

---

## Severity-Based Priority

| Severity | Action |
|---|---|
| `CRITICAL` | Stop all other work. Fix immediately. Re-test before anything else continues. |
| `HIGH` | Fix before the feature is released. Pause the pipeline until resolved. |
| `MEDIUM` | Fix within the same sprint/cycle. Other work may continue in parallel. |
| `LOW` | Log and fix at next opportunity. Does not block release. |

---

## Multiple Bug Reports

When QA reports multiple bugs in a single `QA_REPORT`:

1. Sort bugs by severity (CRITICAL first)
2. Group by agent (all FE bugs together, all BE bugs together)
3. Fix one severity group at a time
4. Re-test after each group is fixed

Never batch unrelated bug fixes into a single `FIX_PLAN` — one plan per bug or closely related bug cluster.

---

## User-Reported Bugs

When a user reports a bug directly using `/bug: <description>`:

```
/bug: The marketplace search bar crashes the page when I type a special character
```

The system responds:
1. Identify responsible agent (FE or BE?)
2. Invoke that agent
3. Agent produces a `FIX_PLAN`
4. Gate awaits APPROVE
5. Fix is implemented
6. QA runs targeted regression

---

## Bug Tracking Log

Each time a bug is fixed, append a record to:
`tests/bug-log.md`

Format:
```markdown
## BUG-001 — [SHORT TITLE]
- **Severity:** HIGH
- **Reported by:** qa-agent
- **Fixed by:** backend-agent
- **Date:** YYYY-MM-DD
- **Root cause:** [one sentence]
- **Fix:** [one sentence]
- **Test:** tests/backend/models.spec.ts TC07
- **Status:** ✅ CLOSED
```
