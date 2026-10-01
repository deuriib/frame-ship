---
name: executing-rollouts
description: Use when executing an approved rollout plan task-by-task as the implementer - one env at a time with gates and evidence
---

# Executing Rollouts

Execute the approved rollout plan exactly. No improvisation between environments.

## When to Use

Approved `planning-rollouts` plan in hand with execution method = inline. Fleet execution belongs to subagent-driven-operations.

## The Process

1. Load the plan file. Confirm env order, gates, rollback per task.
2. Setup: clean tree, locked state backend reachable, vault auth working, `plan` tool versions pinned.
3. Task loop (one task at a time, in order).
4. Final review across envs.
5. Hand off to finishing-a-release.

## Setup

```bash
git status --short && git pull --ff-only
terraform -version && kubectl version --client && helm version
terraform init -backend-config=envs/dev.hcl
```

Stack adapters: GH+TF+AWS (`gh auth status`, OIDC role assumable); GitLab+Argo (`argocd app list`, MR access); Azure (`az account show`, environment approvals visible). Stop if any check fails — fix auth/access first, never work around it.

## The Task Loop

### 1. Take the task

Announce: "Task N: promoting X to ENV." State gate, verify command, rollback command. One task active at a time.

### 2. Work the steps

Run plan steps verbatim. For `apply`/`sync` tasks: attach the `plan`/diff artifact from this exact commit first. If output diverges from plan expectations, stop — do not continue to next step. Diagnose with debugging-incidents if red.

### 3. The completion contract

Before marking a task done, paste evidence: plan output (clean or expected diff), apply/sync output, `kubectl rollout status`, pipeline run URL green. No evidence = not done.

### 4. Complete the task

Mark done, record SHA/tag deployed per env, then request the gate for the next env (stg→prd always needs human approval). Never auto-promote to prod.

## Final Review

All envs green, dashboards healthy, alerts silent, rollback SHAs recorded. Any skipped gate or missing evidence blocks finish.

## Finish

Summarize: what shipped per env, SHAs/tags, gates passed, where rollback pointers live. Hand off to verifying-releases (prod gate) then finishing-a-release.

## Common Rationalizations

| Excuse | Answer |
|--------|--------|
| "dev worked, skip stg" | stg is the gate. No skips. |
| "Same commit, plan from yesterday is fine" | Fresh `plan` per promotion. State drifts. |
| "Prod approval will slow us" | Approval is the job. Surface early with options. |
