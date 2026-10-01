# Superpowers DevOps Guardrails

Canonical safety contract for every pipeline, IaC change and rollout in this repo.
Skills enforce it; this doc is the source of truth they point to.

## 1. Pipeline integrity

- Pipeline as code, versioned, reviewed, tested. No manual prod writes outside it
  (`terraform apply`, `kubectl apply`, `argocd app sync` to prod run only from the pipeline or an approved rollout task).
- Branch protection: no direct-to-main, required reviews + status checks on every release path.
- Least-privilege runners: OIDC / workload identity / short-lived tokens. Secrets injected from the vault
  (AWS Secrets Manager / Key Vault / GitLab masked vars / GH encrypted secrets), masked in logs, rotated, scanned pre-push and in-pipeline.
- No `echo $SECRET`, no `--debug` dumps of env, no secret in `plan` output committed to the repo.

**Adapters:** GH Actions → environments + required reviewers + OIDC to AWS. GitLab → protected branches + masked vars, Argo syncs only what git holds. Azure DevOps → environment approvals + variable groups linked to Key Vault.

## 2. Validation chain (TDI gate)

Every infra change passes, in order: format+lint (`terraform fmt`, `tflint`, `kubeconform`/`kube-linter`, `helm lint`, `actionlint`), plan/diff artifact (`terraform plan`, `kubectl/helm diff`, Argo `app diff`), policy (`policy/` via conftest — see §7).
Critical/High blocks merge and promotion. Override only with written approval + expiry date recorded in the PR/MR.
Builds reproducible: pinned providers, actions and images (digest, never `:latest`); SBOM stored per release; artifacts signed with provenance attested where the platform supports it.

## 3. Progressive deployment

- Promotion order dev → stg → prd. stg → prd always needs explicit human approval (in-chat or environment gate).
- Risky changes ship canary/blue-green (Argo Rollouts / CodeDeploy / Flagger) with automatic rollback on SLO breach.
- Feature flags carry a kill switch each and are removed after rollout — no permanent flags.
- Data migrations are backward-compatible (expand/contract) with tested rollback; no destructive schema change without backup + rehearsal.
- Env parity: config as code, no snowflakes. Freeze windows respected; emergency path allowed only with post-hoc review filed within 24h.

## 4. Observability & response

- Every deploy emits a change event: version/SHA, actor, timestamp, env. `verifying-releases` requires it before "done".
- Auto-rollback on error/latency/saturation breach per the rollout plan's SLO.
- Every alert routes to on-call with a linked runbook — no alert without an action.
- Incident automation: paging, status page, comms templates ready before prod promotion.

## 5. Supply chain

- Third-party actions/images pinned to digest, verified publishers only. Never `:latest` in prod paths.
- Per-build dependency and image scans; no unmaintained or critical-vuln deps promoted.
- Registry access controlled; no public push of internal artifacts.

## 6. Toil reduction

- A manual step repeated ≥3× must be automated or ticketed with an owner.
- Automation is tested, idempotent, observable, and ships with documented rollback.
- No cron/schedule without owner + monitoring + failure alerts.

## 7. Policy as code (`policy/`)

Rego rules enforced by conftest in the TDI chain:

| Rule | What it blocks |
|------|----------------|
| `deny_latest_tag` | container images using `:latest` or untagged |
| `deny_open_ingress` | SG / firewall rules open to `0.0.0.0/0` on sensitive ports |
| `deny_missing_labels` | K8s objects without `app.kubernetes.io/{name,version,managed-by}` |
| `deny_unencrypted_state` | Terraform backends without encryption at rest |

Add a rule only with: failing fixture, passing fixture, and the skill text that references it.

## 8. Evidence & escalation

Retain per release: pipeline logs, gate results, SBOM, signatures/provenance, deploy/rollback events, approval records.
Any of these halts the pipeline, notifies security + owner, and opens an incident — no silent retries:

- gate bypassed or forced green
- secret exposure (log, artifact, state)
- unsigned artifact promoted
- failed or untested rollback
