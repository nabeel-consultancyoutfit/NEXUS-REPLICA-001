# Approval Gate Protocol — NexusAI Agent System

This document defines how the mandatory human approval checkpoint works between agent phases.

---

## The Gate

Every agent — without exception — must pause at the approval gate between PROPOSE and EXECUTE.

```
┌─────────────────────────────────────────────────────────┐
│                   APPROVAL GATE                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Agent produces plan                                     │
│        │                                                 │
│        ▼                                                 │
│  ⏸ "Awaiting your approval."                            │
│        │                                                 │
│        ├── User replies: APPROVE     → Execute plan      │
│        ├── User replies: REVISE + feedback → New plan    │
│        ├── User replies: REJECT      → Discard, stop     │
│        └── User replies: PAUSE       → Hold, do nothing  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## User Commands

| Command | Meaning | Agent Response |
|---|---|---|
| `APPROVE` | Execute the plan exactly as proposed | Begin execution immediately |
| `APPROVE with changes: [...]` | Execute with specified modifications | Confirm changes, then execute |
| `REVISE: [feedback]` | Produce a new plan incorporating feedback | Output new plan, gate again |
| `REJECT` | Discard this plan, do not execute | Acknowledge and stop |
| `PAUSE` | Hold — will continue later | Acknowledge and wait |
| `EXPLAIN: [question]` | Clarify something in the plan | Answer, keep gate open |
| `SCOPE DOWN: [changes]` | Remove items from the plan | Output trimmed plan, gate again |

---

## What "Approval" Covers

When a user approves a plan, they are approving:
- The specific files listed under `FILES TO CREATE` / `FILES TO MODIFY`
- The specific steps listed under `IMPLEMENTATION PLAN`
- The API endpoints or test cases listed in the plan

The agent is **NOT** authorized to:
- Create additional files not in the approved plan
- Modify files not explicitly listed
- Add features beyond what was described
- Change the implementation approach

If during execution the agent discovers it needs to deviate, it must STOP and report the issue before proceeding.

---

## Approval Escalation

If an agent cannot proceed without a decision that wasn't covered in the approved plan:

```
⚠️ EXECUTION PAUSED — Decision Required
────────────────────────────────────────
During implementation of [step N], I encountered:

Issue: [clear description of the problem]

Option A: [describe approach]
  Pros: [...]   Cons: [...]

Option B: [describe approach]
  Pros: [...]   Cons: [...]

Reply with A, B, or provide alternative direction.
Execution will resume after your response.
```

---

## Re-approval Triggers

A new approval is required if:
- A bug fix introduces changes not in the original plan
- The QA report triggers a new task for an agent
- A mid-execution discovery requires adding new files
- The scope of a task expands beyond what was approved

Existing approval does NOT carry over to new work.

---

## Approval Log Convention

After each approval cycle, the agent should acknowledge it:

```
✅ APPROVED — Execution beginning now.
Plan reference: [feature name / task ID]
Files in scope: [N files]
Estimated steps: [N]
```
