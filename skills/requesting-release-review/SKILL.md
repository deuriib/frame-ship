---
name: requesting-release-review
description: Use when an infra change, pipeline or rollout is ready for review - package plan diff, blast radius and rollback for reviewers
---

# Requesting Release Review

Make review easy: the reviewer should approve in one pass or reject with a pointer, never guess.

## Overview

A release review request is a package, not a ping. Send everything the reviewer needs to judge blast radius: what changes, what it affects, how it rolls back.

## When to Request Review

TDI chain green on the exact commit, verifying-releases gate passed for non-prod envs, plan/diff artifact attached. Never request review on red.

## How to Request

One message (PR/MR description or chat) with:

1. **What + why:** one paragraph linked to the spec/design.
2. **Stack + envs:** adapter (GH/GitLab/Azure), env order, which envs this change touches.
3. **Plan/diff:** `terraform plan` summary (resources add/change/destroy counts), `helm diff` / Argo diff highlights. Destroys called out by name.
4. **Blast radius:** services, namespaces, clusters, data stores affected. "None" is forbidden — say what you checked.
5. **Rollback:** exact command + SHA/tag to restore, tested or labeled untested.
6. **Gates:** which checks are required, which are green, links to runs.
7. **What to look at:** files/lines where reviewer attention matters most.

```text
Release review: <change> → <env order>
Plan: +3/~1/-0 (destroy: none) | run: <url>
Rollback: helm rollback <rel> <rev> / TF tag <tag>
Look at: infra/envs/prd/main.tf:40-80, charts/x/values-prd.yaml
```

## Common Rationalizations

| Excuse | Answer |
|--------|--------|
| "It's urgent, skip review" | Urgent changes need review most. Ask for expedited, not skipped. |
| "Small change, no review" | Small changes cause big outages. Request it. |
| "Reviewer knows the context" | Package it anyway — reviewers forget, on-call rotates. |

## Red Flags

- Requesting review without the plan artifact.
- Marking your own prod promotion approved.
- Pressure to merge before required checks finish.
- Rollback section says "we'll figure it out".
