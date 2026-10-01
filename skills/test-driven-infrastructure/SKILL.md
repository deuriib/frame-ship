---
name: test-driven-infrastructure
description: Use when writing or changing Terraform, Bicep, Helm, manifests or pipelines - validate before code, red-green for infra
---

# Test-Driven Infrastructure (TDI)

Validate first, change second. No infra change merges without a failing check that it then makes pass.

## Overview

TDI is TDD for config: the "test" is `plan`/`lint`/`policy`/`dry-run`. Write or name the failing check before touching the resource. Prod applies without a prior green `plan` are forbidden.

## When to Use

Any change to `*.tf`, `*.bicep`, `Chart.yaml`, `values*.yaml`, `manifests/`, `Dockerfile`, `.github/workflows/`, `.gitlab-ci.yml`, `azure-pipelines.yml`.

## The Iron Law

**No `apply`/`sync`/`push-to-prod` without a green validation chain on the exact commit being promoted.** The chain:

1. Format + lint: `terraform fmt -check`, `tflint`, `kubeconform`/`kube-linter`, `helm lint`, `actionlint` / `gitlab-ci-lint`
2. Plan/diff: `terraform plan -out=tfplan` (save artifact), `kubectl diff`, `helm diff`
3. Policy: `conftest test -p skills/test-driven-infrastructure/policy/` plus `checkov` for Terraform depth. Critical/High blocks merge and promotion — override only with written approval + expiry recorded in the PR/MR.
4. At least one assertion your change flips from red to green (new check or updated expectation)

Builds reproducible: pinned providers, actions and images (digest, never `:latest`); SBOM stored per release; artifacts signed with provenance attested where the platform supports it.

## Red-Green for Infra

### RED — Watch it fail

Before the fix, run the chain and capture the failure:

```bash
terraform validate && terraform plan -out=tfplan   # expect: diff shows missing/wrong resource
tflint --chdir=infra/envs/dev
checkov -d infra/ --framework terraform
kubeconform -strict -summary manifests/
```

Record the red output. If everything is already green, your check is too weak — add the assertion that should fail (e.g. policy requiring the new tag, test expecting the new pipeline step).

### GREEN — Minimal change

Smallest HCL/YAML edit that turns the chain green. One resource or one step at a time. Re-run the full chain, paste green evidence.

### REFACTOR — Clean up

Dedupe with modules/charts/templates. Re-run chain after every refactor. No behavior drift between refactor commits.

## Policy as Code (`policy/` in this skill)

Rego rules enforced by conftest in the chain above. Add a rule only with: failing fixture, passing fixture, and skill text referencing it. Fixtures: `policy/fixtures.md`.

| Rule | What it blocks |
|------|----------------|
| `deny_latest_tag` | container images using `:latest` or untagged — pin to digest or immutable tag |
| `deny_open_ingress` | SG / firewall ingress open to `0.0.0.0/0` on sensitive ports — restrict CIDR |
| `deny_missing_labels` | K8s objects without `app.kubernetes.io/{name,version,managed-by}` |
| `deny_unencrypted_state` | Terraform backends without encryption at rest; no `local` backend in shared envs |

## Supply Chain

- Third-party actions/images pinned to digest, verified publishers only. Never `:latest` in prod paths.
- Per-build dependency and image scans; no unmaintained or critical-vuln deps promoted.
- Registry access controlled; no public push of internal artifacts.

## Stack Adapters

- **GH+TF+AWS:** `terraform plan` as PR artifact + `aws iam simulate` for IAM changes; EKS manifests via `kubeconform` + `helm template | kubeconform`.
- **GitLab+Argo:** `terraform plan` in MR pipeline, Argo `app diff` as comment; promotion = MR to env path, never direct apply.
- **Azure+A K S:** `terraform plan` / `az bicep build + what-if`; AKS via `helm diff` with environment approvals.

## Common Rationalizations

| Excuse | Answer |
|--------|--------|
| "Plan takes too long" | Long plans are why you run them before prod, not during. |
| "I'll validate after apply" | After apply is an incident, not validation. |
| "Policy is noise" | Tune the policy, don't skip it. Document the exception. |

## Red Flags — STOP and Start Over

- About to run `apply` with no `plan` artifact on this commit.
- Editing prod values directly to "test".
- Skipping policy because "it's a small change".
- Green chain on a different commit than the one being promoted.

## Verification Checklist

- [ ] Red captured before the change
- [ ] Full chain green on the promoted commit (paste output)
- [ ] `conftest test -p skills/test-driven-infrastructure/policy/` clean
- [ ] `plan`/diff artifact attached to PR/MR
- [ ] Rollback resource identified (prior state tag / git SHA)
- [ ] No escalation trigger present (see verifying-releases: bypass, secret leak, unsigned artifact, untested rollback)
