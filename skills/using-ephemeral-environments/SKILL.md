---
name: using-ephemeral-environments
description: Use when a change needs isolation from shared envs - spin up a preview/ephemeral environment, verify clean, tear down after
---

# Using Ephemeral Environments

Isolate risky work. Preview envs are cattle: cheap to create, mandatory to destroy.

## Overview

Every infra/app change that can't be proven by `plan`/`diff` alone gets an ephemeral env: preview namespace, TF workspace, or review app. Shared dev/stg stay clean.

## Step 0: Detect Existing Isolation

```bash
git worktree list 2>/dev/null
kubectl config current-context; kubectl config view --minify --output 'jsonpath={..namespace}'
terraform workspace show 2>/dev/null
```

If already in a preview (namespace `pr-*`, workspace `preview-*`), stay there — don't nest previews. If in a submodule (not a worktree root), treat as normal repo.

## Step 1: Create Isolated Environment

Pick one, stack adapter first:

- **K8s preview (preferred for app/manifest changes):** `kubectl create ns preview-<pr>` + deploy branch SHA; Argo: ephemeral `Application` with auto-delete; GitLab review apps / GH preview via workflow.
- **TF workspace fallback:** `terraform workspace new preview-<pr>` with isolated state key (`envs/preview-<pr>.tfstate`), `-var-file=preview.tfvars`. Never point a preview at shared state.
- **Safety:** name includes PR/MR number + owner; TTL label (`expires-after: 48h`); no prod secrets — preview vault scope only.

## Step 2: Deploy + Setup

Deploy the branch SHA (not `main`), run migrations/seeds scoped to preview, wire preview URL. Record: namespace/workspace, URL, SHA, expiry.

## Step 3: Verify Clean Baseline

```bash
kubectl -n preview-<pr> rollout status deploy/<name>
kubectl -n preview-<pr> get pods
terraform plan  # in preview workspace: only expected diff
```

Baseline must be green before the change is tested there. Red baseline → fix env first (debugging-incidents), don't test on broken ground.

### Report

One block: env name, URL, SHA, baseline green evidence, expiry. This is what the reviewer clicks.

## Quick Reference

Detect → create (ns/workspace/review-app) → deploy SHA → baseline green → test → destroy. TTL on everything.

## Common Rationalizations

| Excuse | Answer |
|--------|--------|
| "Test in dev, it's empty" | Dev is shared. Preview is isolated. |
| "Teardown later" | Teardown is part of the task (finishing-a-release Step 6). Later = billed + confusing. |
| "Preview needs prod data" | Anonymized seed or nothing. Prod data in previews is a breach. |
