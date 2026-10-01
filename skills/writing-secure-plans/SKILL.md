---
name: writing-secure-plans
description: Use when you have security-reviewed requirements for multi-step work, before touching code - produces an implementation plan with security gates
---

# Writing Secure Plans

## Overview

**A plan without security gates is a breach schedule.** Write plans a careful junior can execute without introducing vulns.

## When to Use

- Any multi-step task with an approved threat model or design
- Before touching code on architectural work
- When the work crosses trust boundaries

Do NOT write code in this skill. Plan only.

## Process

1. **Confirm inputs** — approved design/spec file path + abuse cases. If missing, stop and invoke security:threat-modeling.
2. **Decompose into tasks** — each task: goal, files touched, security constraint (validate/authorize/log), done-criteria. One concern per task.
3. **Order by risk** — auth, boundaries, and data handling first. Migrations and cleanup last.
4. **Attach gates per task:**
   - Input validation rule
   - Authorization check (who can call this)
   - Secret handling (no hardcode, no log)
   - Test that proves the abuse case fails (see security:secure-implementation)
5. **Right-size verification** — every task that touches a boundary gets a negative test. Pure internal refactors get existing-suite regression only.
6. **Write plan file** — `docs/security/plans/YYYY-MM-DD-<topic>-plan.md`, commit it.
7. **Present plan** — in chunks the partner can actually read. Get explicit approval + execution method (inline vs subagents).

## Plan Template

```markdown
# Plan: <topic>
Spec: <path to design doc>
Risk order: <why this order>

## Task 1: <name>
- Goal:
- Files:
- Security constraints:
- Abuse case it closes:
- Negative test:
- Done when:
```

## Red Flags

- "Plan is obvious, skip it" → obvious plans hide missing auth checks
- Task without a negative test on a boundary → add one
- "Tests later" → tests are part of the task, not a follow-up
- Giant tasks (half-day+) → split until each is verifiable

## Verification

- [ ] Every boundary task has a negative test
- [ ] Every state change has auth + logging specified
- [ ] No secrets in plan, logs, or fixtures
- [ ] Partner approved plan + execution method
