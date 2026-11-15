---
trigger: model_decision
description: Use when adding or changing a CI pipeline, build job, deployment
  workflow, or scheduled automation, to keep every stage reproducible, gated,
  and reversible.
---

# DevOps

A pipeline is the only thing that runs the same way twice, and the only place a
check can be trusted. Policy that already lives elsewhere is referenced here,
not repeated: pipeline integrity in `deny-hard-gates`, the merge gate in
`commit-conventions`, scanning and signatures in `security/supply-chain`,
flags and environment parity in `architecture`.

## Stages

- **Order cheap checks first.** Lint and format before typecheck, typecheck
  before tests, tests before build. The pipeline's job is to fail in seconds,
  not to be fair to every step.
- **Every stage also runs locally, with one command.** A stage that only exists
  in CI cannot be debugged; reproduce it on a laptop or it will be bypassed.
- **Pin the toolchain.** Runner image, language version, and every CLI, by exact
  version and from the same lockfile the developers use.
- **No job without a timeout.** A hung job holds a runner and masks the failure
  behind a status that never lands.
- **Fail the run on a warning you care about.** Warnings that never fail become
  warnings nobody reads.

## Speed

- **Cache by lockfile hash.** A cache key that is not derived from the
  dependency manifest serves stale artifacts, which is worse than a cold build.
- **Split independent work.** Lint, test, and build in parallel; only serialize
  what genuinely depends on the previous step.
- **Never re-run to get green.** A flaky stage is fixed or quarantined with an
  owner — `testing-strategy` owns the policy.

## Secrets and identity

- **No secret in a pipeline file, log, or artifact.** The pipeline's own
  credentials are governed by `identity-and-data` — federated, scoped, and
  rotated.
- **Least privilege for the token the pipeline holds.** A test job does not need
  deploy rights.
- **Never print a secret while debugging.** Mask it at the source, not in the log
  filter — `deny-hard-gates` forbids writing it at all.

## Artifacts

- **Build once, promote the same artifact.** Rebuilding for each environment
  means you shipped something you never tested.
- **Immutable and digest-addressed.** An artifact tagged `latest` is not an
  artifact; pin the digest.
- **Retain what an incident needs** — the artifact, its provenance, and the
  test output that approved it.

## Delivery

- **Progressive by default.** Canary or blue-green with an automatic rollback on
  the error-rate signal, rather than a switch that replaces every instance at
  once.
- **A rollback path that has been exercised**, not one that only exists on
  paper. If the rollback is untested, the deploy is one-way.
- **Deploys are idempotent.** Running the same deploy twice leaves the same
  state; a deploy that appends or toggles is a deploy that corrupts on retry.
- **The pipeline change is a code change.** Pipeline config and deploy scripts
  are reviewed, tested on a branch, and never self-merged.
- **Migrations are forward-only and backward compatible.** The previous release
  must still work against the new schema, so the deploy and the migration can be
  separated.

## Scheduled automation

- **Every scheduled job is idempotent and safe to re-run**, because the scheduler
  will eventually run it twice.
- **Every scheduled job reports failure somewhere a human sees.** A cron that
  fails silently is an outage with a delay.
- **Every scheduled job has an owner** and a reason to exist. A job nobody
  remembers is a job nobody will fix.
