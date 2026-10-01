---
name: verifying-releases
description: Use before claiming any deploy, promotion or infra change is done - run the pre-prod gate and confirm evidence
---

# Verifying Releases

Nothing is "done" until the gate passes on the promoted commit. Claims need output.

## Overview

Verification is a function: evidence in, done out. Run it before every env promotion claim, before merging the release PR/MR, before closing the incident.

## The Iron Law

**Evidence before assertions, always.** "Deployed", "healthy", "fixed" are forbidden without pasted output proving it on the exact SHA/tag promoted.

## The Gate Function

Full contract: `docs/guardrails.md` §§2, 4–5, 7–8. For the env being claimed, all must pass:

1. **Plan/diff clean or expected:** `terraform plan` (no unexpected diff), `kubectl diff` / `helm diff` / Argo `app diff` clean. Artifact attached.
2. **Pipeline green on this commit:** workflow/MR/pipeline run URL, all required checks passing. A green run on another commit does not count.
3. **Workload healthy:** `kubectl rollout status`, pods Ready, Helm release deployed, Argo app Healthy+Synced. Paste output.
4. **Policy pass:** `conftest test -p policy/` + checkov green on this commit. Exceptions linked with written approval + expiry (guardrails §2), not hand-waved.
5. **Observability quiet:** target dashboard healthy + no firing alert for this service over the last gate window (e.g. 15–30 min). Link both. Change event emitted (version/SHA, actor, timestamp — guardrails §4).
6. **Escalation check:** none of the §8 triggers present (bypass, secret leak, unsigned artifact, failed rollback). Any one halts the claim and opens an incident.

One failure → claim rejected, back to debugging-incidents or the failing task. No partial "done".

## Common Failures

| Claim | Missing evidence |
|-------|------------------|
| "Apply worked" | No `plan` artifact on this commit |
| "Deployed to prod" | `rollout status` from stg, not prd |
| "Tests pass" | Pipeline ran on a different SHA |
| "It's healthy" | No dashboard/alert link |
| "Policy is fine" | Policy step skipped "just this once" |

## Red Flags — STOP

- About to merge with a red or missing required check.
- "Verify in prod" as the plan.
- Screenshots of green from another env presented as this env.
- Time pressure cited as reason to skip a gate item.

## Key Patterns

Check the gate in env order (dev→stg→prd), cheapest first. `plan` before `apply` before `rollout status` before dashboards. Stop at the first failure — later green doesn't excuse earlier red.

## When To Apply

Every promotion, every release merge, every incident-fix claim, every "one-line YAML fix". Especially the one-line YAML fix.
