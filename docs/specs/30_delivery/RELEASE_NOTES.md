# Release Notes: v0.12.0 — Repo Hygiene (CI, Smoke Tests, Doc-Truth)

**Date:** 2026-09-23
**Release Version:** v0.12.0
**Release Manager:** orchestrator / operations owner function (engineering owner + automation owner mechanics)
**Specs Included:** SPEC-repo-hygiene
**Domains-Touched:** [engineering, automation/ops]
**Ship Type:** rollout (non-breaking repository tooling + documentation; no deploy/filing/launch)

## Highlights

- **First CI pipeline:** `.github/workflows/ci.yml` — 2 jobs (typecheck + tests + version lockstep) on `push:main` + `pull_request`, least-privilege `permissions: contents: read`, action refs API-verified (`jdx/mise-action@v3`), zero secrets.
- **Zero-dep smoke suite:** `tests/smoke.test.mjs` via `node:test` only — 9/9 passing: registry sync (12 agent entries + bidirectional negative), hook marker guards, 5 Antigravity fixture replays (allow/deny/first/later/format-note).
- **Reproducible installs:** `package-lock.json` committed; `npm ci --dry-run` exit 0 on npm 10.9.8 and npm 11.20.0; registry-default (no explicit mirror URLs); `npm test` script wired.
- **Doc-truth sweep:** README/AGENTS/hook headers now match runtime reality — three-plugin split-lane structure (`skills` + `agents` + `guardrails` + composed entry), `Registers 12` skills, bun-runtime claims removed, `withTimeout` claim scoped honestly.
- **REQ-007 active:** plan/build enrichment transform enabled per sponsor design — description overrides stay commented, comment reconciled, zero logic change (`git show fdda81a` = comments only).

## Verification & Quality Gates

- **Gate: OPEN** — `GATE_REPORT.md`: 7/7 independent reviewer verdicts pass (refuter, readability, reliability, resilience, risk, quality-assurance, automation-reviewer); COND-001..004 cleared with proof commits; 2 C3 waivers recorded (W1 first-CI-green at push, W2 live-host permission confirmation), both expiring at this release.
- **Evidence:** 12/12 test-matrix rows evidence-linked, 0 missing commit refs; tests 9/9 exit 0; typecheck exit 0; version lockstep 7/7 at v0.12.0; PII/secret scan clean (Ley 172-13).

## Changes

### Features

- CI workflow — least-privilege, 2 jobs, major-tag pins (SPEC-repo-hygiene, automation/ops).
- Zero-dep smoke test suite + `npm test` entry (SPEC-repo-hygiene, engineering).
- Committed lockfile for `npm ci` (SPEC-repo-hygiene, engineering).

### Fixes

- Broken action pin `jdx/action-mise` → `jdx/mise-action@v3` (wave-1 CE-001).
- npm 11 `EUSAGE` on `npm ci` — platform optional deps added to lockfile (CE-002).
- Doc drift: two-plugin/four-file claims, `both lanes`, stale test header, false rollback attestation, false npmmirror provenance (wave-1 CE-003/004 + wave-2 RD/RL/risk/AUT findings).
- CHANGELOG section repairs (`v0.6.1`, `v0.7.0` restored; `v0.3.0` order normalized).

### Domain Ships

- **Automation:** CI workflow enabled — activates on first push to `main`; run #1 green confirmation is waiver W1 (owner: engineering owner, expiry: this push, same session).
- **Engineering:** doc-truth + zero-dep tests + lockfile landed; REQ-NF-001 zero-dep invariant held (`git diff package.json` = script line only).

### Breaking Changes

- None. REQ-007 restores designed transform behavior (idempotent, built-in descriptions untouched) — non-breaking by sponsor design; README/INSTALL/MIGRATION templates not required (conditional on deploy+breaking).

### Known Issues

- Backlog Lows (non-blocking, owner engineering owner): unpinned `npx typescript` in `mise.toml`, no malformed-payload fixture, no `timeout-minutes` on workflow — recorded in `GATE_REPORT.md`.
- W2: plan-permission persistence unconfirmable at gate (no live host) — verify at first `plan` agent use; owner engineering owner.

## Rollback / Undo

- **Code revert:** CI removal = `git revert a83347b` then `git revert feb9014` in that order (lone `feb9014` revert conflicts post-`a83347b`; two-SHA path merge-tree-verified) or delete `.github/workflows/ci.yml`; tests = revert `8548efe`; lockfile = revert `7efa7f7` (+follow-ups); doc fixes = revert their commits; REQ-007 = revert `1640510`/`fdda81a`.
- **Tag retract:** `git tag -d v0.12.0` (+ remote delete if pushed).
- **ETA:** < 5 min per unit. **Owner:** engineering owner (automation mechanics: automation owner).
- **Non-code undo:** none required — no filings, comms, campaigns, or customer-facing changes in this release.
