---
name: using-devops
description: Use when starting any DevOps conversation - routes CI/CD, IaC, Kubernetes, observability and incident work to the right skill before any action
---

<SUBAGENT-STOP>
If you were dispatched as a subagent to execute a specific task, ignore this skill.
</SUBAGENT-STOP>

<EXTREMELY-IMPORTANT>
If you think there is even a 1% chance a skill might apply to what you are doing, you ABSOLUTELY MUST invoke the skill.

IF A SKILL APPLIES TO YOUR TASK, YOU DO NOT HAVE A CHOICE. YOU MUST USE IT.

This is not negotiable. You cannot rationalize your way out of this.
</EXTREMELY-IMPORTANT>

## The Rule

**Invoke relevant or requested skills BEFORE any response or action** — including clarifying questions, exploring the repo, or checking pipeline logs. If it turns out wrong for the situation, you don't have to use it.

**Before entering plan mode:** if you haven't already designed the infrastructure change, invoke the designing-infrastructure skill first.

Then announce "Using [skill] to [purpose]" and follow the skill exactly. If it has a checklist, create a todo per item.

## Skill Priority

When multiple skills apply, process skills come first — they set the approach, then execution skills carry it out. designing-infrastructure and debugging-incidents are this repo's most common process skills, but the rule holds for any of them.

- "Let's add a pipeline / provision infra / deploy X" → devops:designing-infrastructure first, then planning-rollouts.
- "Pipeline is red / deploy failed / prod is down" → devops:debugging-incidents first, then domain skills.
- "Promote to staging/prod" → devops:planning-rollouts, then executing-rollouts.

## Stack Adaptation

Detect the stack from repo files before acting. Default to GitHub Actions + Terraform + AWS when ambiguous — state the assumption out loud so your human partner can override it.

| Signal | Stack |
|--------|-------|
| `.github/workflows/`, `*.tf`, `eksctl`/`EKS` | GH Actions + Terraform + AWS/EKS |
| `.gitlab-ci.yml`, `argocd/`, `Chart.yaml` | GitLab CI + ArgoCD + K8s |
| `azure-pipelines.yml`, `*.bicep`, `aks` | Azure DevOps + Bicep/Terraform + AKS |

Apply the matching adapter inside each skill. Never mix adapters in one change (no Argo manifests inside a GH Actions-only repo) unless your human partner explicitly asks.

## Routing Table

| Request | Skill |
|---------|-------|
| Which guardrails apply / can I skip a gate | test-driven-infrastructure (validation+supply chain+policy) · verifying-releases (evidence+escalation) · planning-rollouts (progressive+toil) · requesting-release-review (pipeline integrity) — no skipping without written approval + expiry |
| New pipeline, new infra, new environment, new deploy target | designing-infrastructure |
| Rollout/promotion plan dev→stg→prd, rollback strategy | planning-rollouts |
| Terraform/Helm/manifest change with validation | test-driven-infrastructure |
| Red pipeline, failed deploy, alert firing, SLO burn | debugging-incidents |
| Execute an approved rollout plan | executing-rollouts |
| Pre-prod gate: plan diff, policy, smoke checks | verifying-releases |
| Ask for release/infra review | requesting-release-review |
| Handle review feedback on infra/release | receiving-release-review |
| Merge, tag, release, promote, cleanup env | finishing-a-release |
| Fan out envs/matrices in parallel | dispatching-parallel-runners |
| Fleet of runners/operators working a rollout | subagent-driven-operations |
| Preview/ephemeral environment for a change | using-ephemeral-environments |
| Pipeline framework itself is broken | diagnosing-pipelines |
| New reusable runbook/skill | authoring-runbooks |

## Red Flags

These thoughts mean STOP—you're rationalizing:

| Thought | Reality |
|---------|---------|
| "This is just a simple YAML tweak" | YAML tweaks take down prod. Check for skills. |
| "I need more context first" | Skill check comes BEFORE clarifying questions. |
| "Let me look at the pipeline logs first" | Skills tell you HOW to investigate. Check first. |
| "I'll apply this Terraform quickly" | Unplanned applies drift state. Design first. |
| "Let me check kubectl/files quickly" | Files lack conversation context. Check for skills. |
| "This doesn't need a formal skill" | If a skill exists, use it. |
| "I remember this skill" | Skills evolve. Read current version. |
| "The skill is overkill" | Simple deploys become outages. Use it. |
| "I'll just do this one thing first" | Check BEFORE doing anything. |
| "This feels productive" | Undisciplined action causes incidents. Skills prevent this. |
| "I know what that means" | Knowing the concept ≠ using the skill. Invoke it. |
| "`terraform apply` on prod is fine, I checked" | Approval-gated applies only. Plan first, approve, then apply. |

## Platform Adaptation

If your harness appears here, read its reference file for special instructions:

- Claude Code: `references/claude-code-tools.md`
- Codex: `references/codex-tools.md`
- Pi: `references/pi-tools.md`
- Antigravity: `references/antigravity-tools.md`
- Hermes Agent: `references/hermes-tools.md`
- Muse: `references/muse-tools.md`

## User Instructions

User instructions (CLAUDE.md, AGENTS.md, GEMINI.md, etc, direct requests) take precedence over skills, which in turn override default behavior. Only skip skill workflows or instructions when your human partner has explicitly told you to.
