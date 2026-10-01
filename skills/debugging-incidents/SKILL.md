---
name: debugging-incidents
description: Use when a pipeline is red, a deploy failed, an alert fires or prod degrades - systematic root-cause before any fix
---

# Debugging Incidents

Find the root cause first. Fixes without causes become the next incident.

## Overview

Four phases, in order. Skip one and you own the repeat. Stabilize (stop the bleed) before root-causing only when users are impacted — then come back and finish all four.

## The Iron Law

**No fix without a reproduced cause.** Reproduce in logs, in `plan`/`diff`, or in a non-prod environment before changing prod. "I think it's X" is a hypothesis, not a cause.

## When to Use

Red pipeline, failed `apply`/`sync`, CrashLoopBackOff, alert firing, SLO burn, "it worked in dev".

## The Four Phases

### Phase 1: Stabilize + Investigate

If users impacted: mitigate first (rollback to last green SHA/tag, scale, failover) — then investigate. Capture: exact error, when it started (deploy SHA / pipeline run id), blast radius (envs, services), last green state.

```bash
gh run view <id> --log-failed
kubectl -n <ns> get events --sort-by=.lastTimestamp | tail -n 30
kubectl -n <ns> logs deploy/<name> --previous --tail=200
kubectl -n <ns> describe pod <pod>   # events + exit codes, not just logs
terraform plan   # unexpected diff = drift or state divergence
argocd app get <app> --show-operation 2>/dev/null
```

Read status pages and recent merges before theorizing. One failed step at a time.

### Phase 2: Pattern Analysis

What changed? (deploy, infra edit, secret rotation, quota, cert expiry.) What is constant? (one env vs all, one AZ vs all.) Correlate: pipeline run timeline vs alert start vs deploy SHA. Check the boring causes first: expired secret/cert, quota/limit, image tag moved (`:latest`), env var typo, RBAC/OIDC breakage, state lock.

### Phase 3: Hypothesis and Testing

One hypothesis, one probe, in non-prod or dry-run:

- `terraform plan` / `kubectl diff` / `helm diff` to confirm drift theory
- Replay the failed pipeline step on a branch
- `kubectl run debug --rm -i --image=...` for network/DNS theories
- Query the SLO/alert expression directly to confirm the trigger

Rank by evidence, not seniority. Kill theories with output, not opinions.

### Phase 4: Fix + Harden

Minimal fix that addresses the root cause (not the symptom). Then harden so this class can't recur: pipeline assertion, policy rule, alert, runbook entry. Verify with the full TDI chain green + the original failure scenario now passing. Paste both.

## Stack Adapters

- **GH+TF+AWS:** `gh run view`, CloudTrail for IAM/apply mysteries, EKS `kubectl auth can-i`, CloudWatch Container Insights.
- **GitLab+Argo:** MR pipeline logs + Argo `app history`/`app diff`; sync failures almost always = git-env drift or Helm value mismatch.
- **Azure+A K S:** pipeline timeline + `az deployment what-if`, AKS `kubectl get events`, Azure Monitor/KQL for the alert query.

## Red Flags — STOP and Follow Process

- Editing prod to "try something".
- Re-running the pipeline hoping it goes green.
- Two fixes at once ("while I'm here").
- Closing the incident without the hardening step.

## Common Rationalizations

| Excuse | Answer |
|--------|--------|
| "Rollback first, ask later is slow" | Rollback IS the fast path — it's pre-approved. |
| "Logs are too noisy" | Filter by run id / pod / time window, don't read everything. |
| "It's flaky" | Flaky has a cause too (timeout, race, quota). Name it. |

## Quick Reference

Symptom → first look: red pipeline → failed step log; CrashLoop → `describe` + previous logs; ImagePull → tag/registry/secret; Pending → quota/affinity/PVC; Argo OutOfSync → `app diff`; TF fail → state lock / provider creds; SLO burn → alert query + recent deploy SHA.

## Handoff

Incident closed only when: cause named with evidence, fix verified, hardening merged (check/policy/alert/runbook), and the timeline is written for authoring-runbooks.
