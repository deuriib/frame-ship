---
name: dispatching-parallel-runners
description: Use when facing 2+ independent DevOps tasks with no shared state - fan out envs, regions or matrix legs concurrently
---

# Dispatching Parallel Runners

Run independent work concurrently. Shared state runs sequentially — no exceptions.

## Overview

Parallelize by independence: different envs with separate state, different services with no shared DB/migration, different matrix legs, independent validations (lint + policy + plan-dry-run). One shared thing (state file, DB, cluster, prod gate) → sequential.

## When to Use

- Validate dev/stg/prd `plan`s concurrently (read-only, no applies).
- Lint + policy + kubeconform in one wave.
- Independent service deploys to separate namespaces.
- Matrix legs (regions, arch, versions) with isolated state.

## The Pattern

### 1. Identify Independent Domains

Name the shared-state boundary out loud: "dev/stg/prd plans share nothing (separate backends) → parallel. Applies share the prod gate → sequential."

### 2. Create Focused Runner Tasks

One task = one bounded unit with its own env, workdir, state key, and evidence requirement. Include: exact commands, expected output, where to paste evidence, and the abort line ("stop and report if X").

### 3. Dispatch in Parallel

Launch all runners in one wave. Each runner owns its lane — no cross-edits, no shared files, no "helping" another lane.

### 4. Review and Integrate

Collect evidence per lane (plan outputs, lint results). Any lane red → that lane goes to debugging-incidents; green lanes wait, they don't absorb the red lane's work. Promotions still follow env order after integration.

## Runner Task Structure

```text
Lane: <env/service/leg>
Workdir: <path> | State: <key, must be unique per lane>
Commands: <verbatim>
Evidence: <what to paste back>
Abort if: <condition>
```

## Common Mistakes

- Parallel `apply` against one state file (lock fights, corruption).
- Parallel migrations on one DB.
- Two lanes editing the same Helm values file.
- Promoting prd from a lane while another lane is still red.

## When NOT to Use

Single-env change, shared state/backend, prod promotion step, anything one lane's failure must stop immediately (incident mitigation — one driver, not a fleet).

## Verification

All lanes reported evidence, no shared-state collision, integration order (dev→stg→prd) preserved, red lanes have incident entries.
