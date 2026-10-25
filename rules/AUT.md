---
description: "Hard Automation (CI/CD & Ops) rules"
---

# AUT — Automation (CI/CD & Ops)

- **AUT-01** pipeline as code, versioned, reviewed, tested; no manual prod changes outside the pipeline.
- **AUT-02** branch protection: no direct pushes to main, required reviews, required status checks, signed commits.
- **AUT-03** least privilege for CI runners and service accounts; short-lived credentials; no shared long-lived secrets.
- **AUT-04** secrets in vault, injected at runtime, masked in logs, rotated, scanned pre-push and in-pipeline; no debug dumps or credential leakage in artifacts.
- **AUT-05** mandatory gates: lint, type-check, unit, integration, SAST/SCA/secret, license, a11y, bundle budget, Lighthouse where applicable.
- **AUT-06** Critical/High findings block merge and release; no manual override without written approval + remediation deadline.
- **AUT-07** reproducible builds; pinned deps and toolchain; SBOM generated and stored; artifacts signed with provenance (SLSA or equivalent); immutable registry.
- **AUT-08** progressive delivery: canary or blue/green with automated rollback on SLO breach.
- **AUT-09** feature flags for risky changes; kill switch per feature; flags removed after rollout.
- **AUT-10** migrations backward-compatible, expand/contract, rollback tested; no destructive schema change without backup and rehearsal.
- **AUT-11** environment parity; config as code; no snowflake servers.
- **AUT-12** change freeze windows respected; emergency change procedure documented with post-hoc review.
- **AUT-13** every deploy emits a change event with version, commit, actor, timestamp; rollback triggers on error rate, latency, or saturation breach.
- **AUT-14** alerts routed to on-call with runbook; no alert without action.
- **AUT-15** third-party actions and images pinned to digest; verified publishers only; no `latest`.
- **AUT-16** any manual step repeated ≥3 times is automated or ticketed; automation tested, idempotent, observable, with documented rollback.
- **AUT-17** no cron jobs without owner, monitoring, and failure alerting.
