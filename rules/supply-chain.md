---
trigger: model_decision
description: Use when adding or upgrading a dependency, changing build or CI
  configuration, or preparing a release artifact, to keep what you ship pinned,
  scanned, and attributable.
---

# Supply Chain

Every dependency is code you ship without reading, and every build is a claim
about what you shipped. Both have to hold up under an advisory.

## Dependencies

- **Pin exactly and commit the lockfile.** No floating range in a production
  path. A build that resolves differently tomorrow is not reproducible.
- **Adopt deliberately.** Check the last release, open advisories, maintainer
  count, and whether it duplicates something already installed.
- **No end-of-life component** — OS, runtime, database, or library. An EOL
  dependency receives no fixes, so a scan that reports it as clean is reporting
  the wrong thing.
- **Minimize.** Every package is attack surface, licence obligation, and upgrade
  debt. Reach for the standard library first.
- **Check the licence before adoption.** A copyleft dependency in a distributed
  binary is a legal decision, not an engineering default.
- **Read the install scripts.** No `postinstall` from an unknown package, no
  `curl | sh` in CI, and watch for the typo-squat of a name you meant.

## Scanning

Every scan runs in CI on every change, not on a quarterly calendar.

| Scan | Catches |
| --- | --- |
| SAST | Source-level flaws — tainted flow, unsafe API use |
| DAST | The running app answering a real hostile request |
| SCA | Vulnerable and unmaintained dependencies |
| Secret scanning | A credential before it reaches the remote — pre-commit and CI |
| Container scanning | Base image and OS packages |
| IaC scanning | The infrastructure definition, before it is applied |

A finding is triaged, assigned, and tracked. A scan whose output nobody reads is
a checkbox, not a control.

## Remediation SLAs

| Severity | Fix within |
| --- | --- |
| Critical | 24 hours |
| High | 7 days |
| Medium | 30 days |
| Low | 90 days |

- **Critical or High gates the merge** (see `deny-hard-gates`).
- **An accepted risk is time-bound**, with a named owner, a compensating
  control, and an expiry date. An open-ended acceptance is a finding you have
  chosen to keep.

## Artifacts

- **Publish an SBOM** with every release, so a consumer can map an advisory to
  their own exposure.
- **Reproducible builds.** Pin the toolchain, the base image, and the registry.
- **Sign commits and artifacts, and verify the signature in the pipeline.**
- **Control registry access.** No public push of an internal artifact, no
  anonymous pull from a private registry, no long-lived publish token.
