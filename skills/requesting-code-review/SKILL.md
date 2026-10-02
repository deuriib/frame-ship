---
name: requesting-code-review
description: Use when completing tasks, implementing major features, or before merging to verify work meets requirements
---

# Requesting Code Review

Dispatch a code reviewer subagent to catch issues before they cascade. The reviewer gets precisely crafted context for evaluation — never your session's history.

**Core principle:** Review early, review often.

## When to Request Review

**Mandatory:**
- After each task in subagent-driven development
- After completing major feature
- Before merge to main

**Optional but valuable:**
- When stuck (fresh perspective)
- Before refactoring (baseline check)
- After fixing complex bug

## How to Request

**1. Get git SHAs:**
```bash
BASE_SHA=$(git rev-parse HEAD~1)  # or: git merge-base origin/main HEAD
HEAD_SHA=$(git rev-parse HEAD)
```

**2. Dispatch 5 independent reviewers in parallel:**

Issue all five dispatches in the same response — they run concurrently with
isolated context (see `dispatching-parallel-agents`). Same DESCRIPTION +
PLAN + BASE/HEAD to each, never session history.

- Readability → template at [readability-reviewer.md](readability-reviewer.md)
- Reliability → template at [reliability-reviewer.md](reliability-reviewer.md)
- Refuter → template at [refuter-reviewer.md](refuter-reviewer.md)
- Risk → template at [risk-reviewer.md](risk-reviewer.md)
- Resilience → template at [resilience-reviewer.md](resilience-reviewer.md)

Single reviewer at [code-reviewer.md](code-reviewer.md) remains the fallback
when the change is trivial (docs typo-only) or only one seat is affordable.

**Placeholders (same for all five):**
- `{DESCRIPTION}` - Brief summary of what you built
- `{PLAN_OR_REQUIREMENTS}` - What it should do
- `{BASE_SHA}` - Starting commit
- `{HEAD_SHA}` - Ending commit

**3. Merge verdicts with AND-gate:**
- Any Critical from any reviewer = No merge. Fix first.
- Refuter "No / Conditionally" = treat as Critical until disproven with code/tests.
- Conflicting feedback → `receiving-code-review`: verify each item against the codebase, push back with reasoning if wrong.
- Fix Criticals immediately, Importants before proceeding, Minors later.

## Example (5 reviewers, parallel)

```
[Just completed Task 2: Add verification function]

You: Requesting 5-way review before proceeding.

BASE_SHA=$(git log --oneline | grep "Task 1" | head -1 | awk '{print $1}')
HEAD_SHA=$(git rev-parse HEAD)

[Dispatch 5 reviewers in ONE response — same context to each]
  Readability: DESCRIPTION: Added verifyIndex() and repairIndex() with 4 issue types / PLAN: Task 2 ... / BASE: a7981ec / HEAD: 3df7661
  Reliability: (same DESCRIPTION / PLAN / BASE / HEAD)
  Refuter: (same DESCRIPTION / PLAN / BASE / HEAD)
  Risk: (same DESCRIPTION / PLAN / BASE / HEAD)
  Resilience: (same DESCRIPTION / PLAN / BASE / HEAD)

[Verdicts]: readability With fixes, reliability Yes, refuter Conditionally, risk With fixes, resilience Yes
You: [Refuter condition unproven → treat as Critical. Fix + re-verify.]
[Continue to Task 3]
```

## Common Rationalizations

| Excuse | Reality |
|--------|---------|
| "I'll just review the diff myself instead of dispatching a reviewer" | You're the coordinator — reviewing the diff inline burns the context window you need to keep driving the work. Dispatch a reviewer subagent: the diff and the evaluation live in its context, and only the findings come back to you. |
| "The reviewer needs my whole session history to understand the change" | Hand it precisely crafted context, never your session's history. That keeps the reviewer on the work product, not your thought process. |

## Red Flags

**Never:**
- Skip review because "it's simple"
- Ignore Critical issues
- Proceed with unfixed Important issues
- Argue with valid technical feedback

**If reviewer wrong:**
- Push back with technical reasoning
- Show code/tests that prove it works
- Request clarification

See templates at: [code-reviewer.md](code-reviewer.md) (single-reviewer fallback),
[readability-reviewer.md](readability-reviewer.md),
[reliability-reviewer.md](reliability-reviewer.md),
[refuter-reviewer.md](refuter-reviewer.md),
[risk-reviewer.md](risk-reviewer.md),
[resilience-reviewer.md](resilience-reviewer.md).
