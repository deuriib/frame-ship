---
name: designing-infrastructure
description: "You MUST use this before any infra/pipeline/platform work - new pipelines, Terraform, Kubernetes, environments, deploys. Turns ideas into approved specs before any code."
---

# Designing Infrastructure Into Specs

Turn infra ideas into fully formed, approved specs through short collaborative dialogue.

Start by classifying how much process the request needs, then work
through your path: understand intent, refine the design, present it,
and get your human partner's approval.

## Establish Shared Understanding

1. **Discover intent.** Identify the target outcome, environment (dev/stg/prd), blast radius, and success signal (pipeline green, deploy healthy, SLO met). When missing, ask one focused question about purpose or blast radius before proposing tools. Knowing "it's EKS" does not tell you why they want it.
2. **Write back your understanding.** Summarize outcome, constraints (stack, region/cluster, compliance), and success criteria in a short note. Separate what they said from assumptions. Invite correction before treating this as the design brief.
3. **Carry intent into the design.** Preserve the agreed understanding in the design artifact. Check every proposed pipeline step and infra resource against it.

<HARD-GATE>
Before taking any implementation action — writing pipeline YAML, Terraform/HCL/Bicep, Helm values, manifests, Dockerfiles, installing infra dependencies, running apply/kubectl/az — complete the selected path's prerequisites:

- Spike: the human partner approves the question and probe.
- Bounded: the human partner approves the short in-chat design.
- Architectural: the human partner reviews and approves the written spec, then reviews the written rollout plan and selects its execution method.

A reply approves the stage actually presented. Approval of an idea does not approve artifacts that do not exist yet. Resume at the earliest incomplete stage. Read-only exploration (reading workflows, `terraform plan`, `kubectl --dry-run=client`) is allowed while prerequisites remain incomplete. Writes (`apply`, `push`, `kubectl apply`, merges) are not.
</HARD-GATE>

## Three Paths

Classify out loud before your first question so your partner can override:

- **Spike** — a feasibility question ("can we run this on AKS?", "is Argo faster?") whose output is an answer, not infra you keep. Present question + probe in 2-3 sentences, get a nod, then find out as cheaply as correctness allows (ephemeral env, `plan`, dry-run). No spec file. Report findings as a recommendation; anything built stays labeled throwaway.
- **Bounded** — a well-scoped change to infra that already exists: a new pipeline step, a variable, a one-file Helm value. The flow must already be here to read. Ask what matters, present a short design IN CHAT (a few sentences to a few short paragraphs), and STOP. Change only starts on approval.
- **Architectural** — a new pipeline, new environment, new cluster, new deploy target, or anything touching prod promotion. Write a spec file (`docs/<name>-infra-spec.md`): outcome, non-goals, stack adapter (GH/GitLab/Azure), environments, promotion path, rollback, observability (what dashboard/alert proves health), cost estimate. Partner reviews spec, then planning-rollouts writes the rollout plan.

## Stack Adapters

Pick one per change. Default: GH Actions + Terraform + AWS.

- **GH Actions + TF + AWS/EKS:** workflows in `.github/workflows/`, `terraform plan` artifact on PR, OIDC to AWS (no long-lived keys), EKS via Helm or raw manifests.
- **GitLab + Argo + K8s:** `.gitlab-ci.yml` stages (validate→plan→apply), ArgoCD `Application` per env, promotion = git commit to env path, never `kubectl apply` from CI to prod directly.
- **Azure DevOps + AKS:** `azure-pipelines.yml` with environments + approvals, Bicep or Terraform with state in Azure Storage, promotion via environment gates.

## Anti-Pattern: "Too Simple To Need Approval"

A one-line YAML change that skips design is how prod goes down. If it touches `.github/workflows`, `.gitlab-ci.yml`, `azure-pipelines.yml`, `*.tf`, `Chart.yaml`, `values*.yaml`, `manifests/`, it needs at least the bounded path.

## Red Flags

| Thought | Reality |
|---------|---------|
| "It's just YAML" | YAML is prod. Design it. |
| "I'll apply and revert if it breaks" | Reverts don't restore state/dbs. Spec first. |
| "I know which stack they want" | State the assumption out loud. |
| "Spec is overhead" | Spec is the rollback plan. |

## Checklist

- [ ] Intent written back and corrected
- [ ] Path classified out loud (spike/bounded/architectural)
- [ ] Stack adapter named (GH/GitLab/Azure)
- [ ] Blast radius + rollback sketched before approval request
- [ ] Approval received for the actual artifact presented
- [ ] Handoff: architectural → planning-rollouts; bounded → test-driven-infrastructure

## Process Flow

1. Intent note → correction
2. Classify path out loud
3. Questions that matter only (max 3 per round)
4. Design (in-chat or spec file)
5. Explicit approval → hand off, never jump straight to apply
