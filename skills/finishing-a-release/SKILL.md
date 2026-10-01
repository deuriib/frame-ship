---
name: finishing-a-release
description: Use when a rollout is complete and green - merge, tag, promote record and clean up environments safely
---

# Finishing a Release

Close the release cleanly: record what shipped, promote the pointer, clean up without destroying evidence.

## Overview

A release isn't finished when prod is green — it's finished when the next operator can see what shipped, where, and how to undo it, and no stray environments linger.

## Step 1: Verify Gates

Run verifying-releases on the final env (usually prd). All five items green on the promoted SHA/tag. If anything is red, stop — this skill doesn't start until green.

```bash
git log --oneline -5
kubectl -n <ns> rollout status deploy/<name>
helm -n <ns> history <release> | tail -n 5
```

## Step 2: Detect Environment

Capture now, before any directory change:

```bash
git rev-parse --show-toplevel; git branch --show-current; git status --short
kubectl config current-context; kubectl config view --minify --output 'jsonpath={..namespace}'
```

Record: repo root, branch, target cluster + namespace. Cleanup later needs these.

## Step 3: Determine Target

`main`/`master` or the env-promotion branch (e.g. `envs/prd`) per repo convention. Release tags: `v<semver>` or `<service>-<env>-<sha>`. Ask if ambiguous — wrong target = wrong env gets the code.

## Step 4: Present Options

Present all applicable options, recommend one:

1. **Merge + tag (recommended for app releases):** merge release branch, tag SHA, push tag so pipelines cut artifacts.
2. **Promote pointer (GitOps):** commit new image tag/chart version to env path, let Argo sync. No direct `kubectl apply` to prod.
3. **Keep as-is:** leave branch/env running (preview still needed, prod freeze). State cost/owner.

For discard requests: confirm what gets deleted (branch? preview env? cloud resources?) — destroying cloud resources needs explicit naming, never implied.

## Step 5: Execute Choice

- Merge first, verify green on target, then tag. Never tag a SHA that hasn't passed gates on target.
- GitOps promotion: one commit per env, CI diff comment confirms, Argo Healthy+Synced before next env.
- Record per env: SHA/tag, pipeline run URL, rollback pointer (prior tag / prior SHA / `helm history` rev).

## Step 6: Cleanup Environments

Only after Step 5 is verified:

```bash
# Preview/ephemeral env teardown (stack adapter):
kubectl -n <preview-ns> delete namespace <preview-ns>   # K8s/Argo
terraform destroy -target=<preview module>              # TF preview (explicit target only)
az group delete -n <preview-rg> --no-wait               # Azure preview
git worktree list  # if worktrees were used, remove them
git branch -d <release-branch>  # only if merged
```

Never `terraform destroy` without `-target` on shared state. Never delete a namespace/cluster you didn't capture in Step 2.

## Quick Reference

Green gates → detect env → target → options → execute → verify → cleanup. Rollback pointers recorded before cleanup destroys the evidence.

## Common Rationalizations

| Excuse | Answer |
|--------|--------|
| "Cleanup can wait" | Stray preview envs bill money and confuse the next incident. |
| "Tag later" | Untagged SHAs can't be rolled back to. Tag now. |
| "Delete everything, start fresh" | Delete only what you named and your partner approved. |
