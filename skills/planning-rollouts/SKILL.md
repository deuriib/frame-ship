---
name: planning-rollouts
description: Use when you have an approved infra spec and need a promotion-safe rollout plan dev to stg to prd with rollback before any apply or deploy
---

# Writing Rollout Plans

Turn an approved infra spec into a promotion-safe rollout plan a junior operator can execute without improvising. Guardrails contract: `docs/guardrails.md` §§1, 3–4, 6, 8.

## Overview

A rollout plan is the only artifact that authorizes `apply`/`deploy`/`promote`. No plan, no prod writes. The plan names environments in order, gates between them, and the exact rollback for every step.

## Scope Check

If there is no approved spec (architectural) or approved in-chat design (bounded), stop — go back to designing-infrastructure. Plans never substitute for design.

## File Structure

Write the plan to `docs/plans/<date>-<slug>-rollout.md`:

```markdown
# [Change] Rollout Plan
Spec: docs/<spec>.md | Design: in-chat <date>
Stack: GH Actions+TF+AWS | GitLab+Argo | Azure+A K S
Environments: dev → stg → prd

## Gates
## Tasks
## Rollback per task
## Observability (dashboard/alert + change event per env — guardrails §4)
## Execution: inline | subagent-driven-operations
```

## Task Right-Sizing

One task = one environment promotion or one atomic infra unit (one `terraform apply` per module, one Argo sync per app, one Helm release). Never bundle dev+stg+prd into one task. Each task states its gate: `plan` clean + policy pass + human approval (for stg→prd always human).

## Step Granularity

Each step is one command the executor runs verbatim:

- `terraform init -backend-config=envs/dev.hcl && terraform plan -out=tfplan`
- `terraform apply tfplan` (only with prior `plan` artifact attached)
- `kubectl diff -f manifests/ && kubectl apply -f manifests/`
- `argocd app sync myapp --prune` (promotion via git commit first)
- `az pipelines run --...` / `gh workflow run deploy.yml --ref ...`

No "deploy the service"-level vagueness. State working dir, env file, and expected output.

## Global Constraints

- State is remote and locked (S3+Dynamo / Azure Storage / GitLab-managed). `apply` without lock fails closed.
- Secrets come from the vault (AWS Secrets Manager / Key Vault / GitLab masked vars / GH OIDC). No plaintext secrets in plan or repo.
- Prod promotion always requires explicit human approval in-chat or via environment protection rule. CI auto-promotes dev→stg only.
- Progressive delivery for risky changes: canary/blue-green with auto-rollback on SLO breach; flags carry kill switches and are removed after rollout (guardrails §3).
- Migrations backward-compatible (expand/contract) with tested rollback; freeze windows respected (guardrails §3).
- Every task has a rollback: `terraform apply` previous tag, Argo rollback to prior git SHA, Helm `rollback <release> <rev>`.
- Toil rule: a manual step the plan repeats ≥3× must be automated or ticketed (guardrails §6).

## Review Focus

After drafting, self-review for: missing gate between stg and prd, task that touches two envs, rollback that says "revert manually", missing dashboard/alert link, `apply` without a `plan` artifact.

## Task Structure

### Task N: [Promote X to ENV]

- Goal: one sentence.
- Steps: numbered commands, verbatim.
- Verify: `kubectl rollout status`, pipeline green, SLO query.
- Rollback: exact inverse command + git SHA/tag to restore.
- Done when: verify passes and evidence is pasted (plan output, rollout status).

## Execution Handoff

End the plan with: execution method selected by your human partner (inline via executing-rollouts, or fleet via subagent-driven-operations). Do not start executing on plan approval — ask which method, then hand off.
