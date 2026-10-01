---
name: subagent-driven-operations
description: Use when executing a rollout plan with a fleet of runners - dispatch per task, review evidence, fix-loop to green
---

# Subagent-Driven Operations

A controller runs the rollout; runners execute tasks. The controller never edits infra directly — it dispatches, reviews, and loops to green.

## When to Use

Approved rollout plan with 3+ tasks, or multi-env promotion where lanes are independent enough to parallelize per dispatching-parallel-runners. Two tasks or less → executing-rollouts inline.

## The Process

1. Controller loads plan, confirms env order + gates + rollback pointers.
2. Setup (same checks as executing-rollouts): clean tree, backend lock reachable, vault auth, tool versions.
3. Task loop: dispatch → report → review → fix-loop → complete.
4. Final review across envs → finishing-a-release.

## Setup

Model/runner selection: cheap fast runners for validation lanes (lint/plan/diff), strong runners for apply/sync and incident-adjacent tasks. Runners get least privilege: dev OIDC role for dev lanes, no prod creds outside the prod task.

## The Task Loop

### 1. Dispatch the runner

One task per dispatch. Prompt includes: task text verbatim from plan, workdir, env, state key, exact commands, evidence to return, abort line, and "do not touch other envs/lanes". Prod tasks add: "wait for human approval signal from controller before apply".

### 2. Handle the report

Runner returns: what ran, output excerpts, evidence links, red/green verdict. No verdict → ask once, then treat as red.

### 3. Review the task

Controller verifies: evidence matches the task (right env, right SHA), TDI chain green on this commit, no out-of-lane edits (`git status` / `plan` scope check). Trust the evidence, not the verdict — re-run the gate query on red flags.

### 4. The fix loop

Red → one fix direction per iteration (controller names the hypothesis, runner probes). Max 3 loops per task, then escalate: debugging-incidents for the lane, rest of fleet holds (no promotion past a red gate). Never widen the fix ("while you're there") inside the loop.

### 5. Complete the task

Record SHA/tag per env + evidence links in the plan file. Request next gate (stg→prd = human). Dispatch next task only after gate clears.

## Final Review

Same as executing-rollouts: all envs green, dashboards quiet, rollback SHAs recorded, no skipped gates.

## Finish

Controller summary (per-env SHAs, gates, rollback pointers) → verifying-releases → finishing-a-release.

## Common Rationalizations

| Excuse | Answer |
|--------|--------|
| "Runner said it's fine" | Evidence or it didn't happen. Re-check gates. |
| "Loop 4 will fix it" | 3 loops max. Escalate to incident process. |
| "Promote while lane X retries" | No promotion past red. Fleet holds. |
