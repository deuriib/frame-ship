# Test / Evidence Matrix: SPEC-repo-hygiene

**Agent:** engineering specialist (evidence) + orchestrator (verification)
**Date:** 2026-09-23
**Domains-Touched:** [engineering, automation/ops]

| REQ-ID | Evidence ID | Description | Type | Status | Commit |
|--------|-------------|-------------|------|--------|--------|
| REQ-001 | T-001 | `.github/workflows/ci.yml`: 2 jobs on push:main + pull_request, `permissions: contents: read`, major-tag pins, no secrets; both job command sequences replayed locally (R-001 mitigation); pin validity API-verified at gate — `jdx/action-mise` → 404, corrected to `jdx/mise-action@v3` (`v3` ref exists) per refuter CE-001 | Review | pass | `feb9014`, `a4c1c8f`, `a83347b` |
| REQ-002 | T-002 | `tests/smoke.test.mjs` — 9/9: registry sync (12 entries, frontmatter `name`==dir + non-empty description, bidirectional new-dir negative), marker guard precedes every `event.system.push` in both hooks (brace-matched hook bodies), 5 agy fixture replays (allow→`decision:allow`, deny→`decision:deny` + `Blocked:` without echoing matched value, first→injects bootstrap, later→`{}`, format-note→`{}`) | Unit | pass | `8548efe` |
| REQ-003 | T-003 | `npm test` entry + committed `package-lock.json`; `npm ci --dry-run` exit 0 — gate-scoped per refuter CE-002: npm 10.9.8 (repo/CI default) exit 0; npm 11.20.0 EUSAGE reproduced (5 platform optionals missing) → lockfile +65 optional-only lines → BOTH majors exit 0 post-fix; `git diff package.json` empty; `dependencies` untouched; spec/proposal script text aligned to the shipped glob form with the exit-1 rationale (F-006) | Unit | pass | `7efa7f7`, `89d9d9b`, `32210cf` |
| REQ-004 | T-004 | Greps: `bun ./hooks/` = 0, root `hooks/context-inject` = 0 (remaining hits antigravity/-prefixed only), raw tsc + typecheck comments contain `guardrails.ts`, Roadmap items `[x]` + "(not yet in repo)" trimmed, tag-truth rule present, `AGENTS.md` count = 12-with-arithmetic, `plugins/AGENTS.md` `0.8.0` = 0, `skills.ts` `Registers 12` = 1 / `Registers 13` = 0 (diff = comment line only, +1/-1); residual sweep: bun runtime claims in README / `plugins/AGENTS.md` / hook headers = 0 (residual hits classified legit: `bundler` substring, `globalThis.Bun.file` API, `maybeBun` stdin code — logic untouched), hook shebang + run-via comment → `node` real path, install comment → repo root | Review | pass | `ae97e42`, `89d9d9b`, `98d8182` |
| REQ-005 | T-005 | `grep -c "^## \[v0.6.1\]"` = 1; `grep -c "^## \[v0.7.0\]"` = 1; restored section byte-verified against `git show e496c25:CHANGELOG.md`; v0.8.0 keeps only original Added/Changed; residual sweep: `grep -c "^## \[v0.3.0\]"` = 1 (provenance `19532cd`; merged verbatim, heading order 0.3.3→0.3.2→0.3.1→0.3.0; all 4 load-order bullets present) | Review | pass | `0e556a1`, `89d9d9b`, `45f3995` |
| REQ-006 | E-001 | Tag rule stated in README Contributing (`CHANGELOG.md` section → matching `git tag vX.Y.Z`); `v0.12.0` bump + tag lands at ship-release (step 7) | Review | partial — README line pass, tag pending ship-release | `ae97e42` (line) / pending (tag) |
| REQ-007 | T-006 | `agents.ts` transform block active (38/38 diff), `PLAN_DESCRIPTION`/`BUILD_DESCRIPTION` overrides stay commented; `mise run typecheck` exit 0 + `npm test` exit 0 post-inclusion; sponsor directive recorded in `PROPOSED_CHANGES.md` | Unit | pass | `1640510` |
| REQ-NF-001 | E-002 | `git diff package.json` = script line only, `dependencies` block untouched; zero new deps in tests (node:test/assert only) + CI (mise/checkout/setup-node only); behavior change limited to REQ-007 | Attestation | pass | `7efa7f7`, `1640510` |
| REQ-NF-002 | E-003 | Per-REQ units revert in reverse commit order (later same-file fixes first) — rollback <15 min, substance verified; CI disable = revert `a83347b` then `feb9014` (merge-tree verified clean — a lone `feb9014` revert conflicts post-`a83347b`) or delete the workflow file; no data/external comms. (Wave-2 correction: original "single-revertible / revert `feb9014`" attestation refuted by QA-002/AUT-002/risk-5.) | Attestation | pass | all listed; corrected at gate wave-2 |
| REQ-NF-003 | E-004 | This matrix + `quality-gate/SPEC-repo-hygiene/GATE_REPORT.md` (7/7 reviewers pass, gate OPEN, COND-001..004 cleared, 2 C3 waivers W1/W2 with expiry at ship-release) | Attestation | pass | `GATE_REPORT.md` (2026-09-23) |

## Orchestrator verification (independent re-run, 2026-09-23)

- `npm test` → 9 pass / 0 fail. `mise run typecheck` → 0. `node scripts/bump-version.mjs --check` → all 7 files synchronized at v0.11.0.
- `git status --porcelain` = clean after final commit; file set matched approved change list exactly.
- Prohibition-clause scan over `.github/`, `tests/`, `package-lock.json` → no credential-shaped content (fixture names `deny`/`secret` are replay vectors, allowlisted).
- Gate-finding remediations (refuter CE-001..004) re-verified orchestrator-side: `jdx/action-mise` API 404 vs `jdx/mise-action` 200 + `v3` ref exists; npm 11.20.0 EUSAGE reproduced then cleared (lockfile platform optionals +65), npm 10.9.8 exit 0 preserved, `package.json` diff empty; packet anchors `REQ-001..006` → `REQ-001..007` in spec/plan/proposal; AC-004 grep now runnable. Lockfile provenance CORRECTED (risk-1: the earlier "pre-existing since `7efa7f7`, all resolved URLs" claim in this line was false): `7efa7f7` had **zero** `resolved` fields; the 5 explicit `registry.npmmirror.com` URLs were introduced by `32210cf` (npm 11 regen under the user's registry config). Wave-2 remediation stripped them — `grep -c npmmirror` → 0, JSON valid, `npm ci --dry-run` exit 0 on npm 10.9.8 **and** npm 11.20.0; every entry registry-default again (each consumer resolves via its own configured registry). Residual closed; refuter note aligned (refuter.md addendum).

## Deviations (recorded, not silent)

1. **REQ-003 script literal:** plan/spec text said `node --test tests/`; bare directory exits 1 on node v22.23.2 (reproduced orchestrator-side, exit=1). Shipped `node --test "tests/*.test.mjs"` (quoted glob, Node-expanded). **RESOLVED:** spec + proposal now state the glob form with the exit-1 rationale (`89d9d9b`).
2. **Commit race recovery:** five parallel git commands contended on `index.lock`, merging S1+S2; unpushed history was rewritten (`reset --soft` + sequential re-commit) so one commit per REQ holds as planned. Final SHAs above are authoritative.

## Findings (residual sweep — all remediated)

| # | Finding | Severity | Location | Owner | Status |
|---|---------|----------|----------|-------|--------|
| F-001 | README prose claims hooks run via `bun`; `hooks.json` runs via `node` (L72/L89/roadmap L288) | Medium | `README.md` | engineering owner | remediated `98d8182` |
| F-002 | `plugins/AGENTS.md` COMMANDS replay lines say `bun`; contract is `node` | Medium | `plugins/AGENTS.md` | engineering owner | remediated `98d8182` |
| F-003 | Hook file headers say `run via bun ./hooks/…` (stale path + runtime; comment-only) | Low | `plugins/antigravity/hooks/*.ts` | engineering owner | remediated `98d8182` |
| F-004 | `mise run install` comment says "npm install in .opencode/" — runs at repo root | Low | `README.md` | engineering owner | remediated `98d8182` |
| F-005 | Duplicate `## [v0.3.0]` headers remain (09-16 + 09-15), out of REQ-005's named scope | Low | `CHANGELOG.md` | engineering owner | remediated `45f3995` |
| F-006 | REQ-003/plan literal `node --test tests/` ≠ shipped working form | Low | spec + plan text | engineering owner | remediated `89d9d9b` |

Remediation = residual sweep approved by sponsor 2026-09-23 ("approved"); text amended first (`89d9d9b` — proposal-before-code), then one fix commit per REQ class (`98d8182` REQ-004, `45f3995` REQ-005). **0 open findings entering the quality gate.**

## Gate findings (refuter wave — all remediated, re-verified pass)

| # | Severity | Finding | Status |
|---|----------|---------|--------|
| CE-001 | High | `ci.yml` pinned nonexistent `jdx/action-mise@v3` (API 404) — typecheck job would die at step 2 on first push | CLEARED — `a83347b` (`jdx/mise-action@v3`, refs verified), record `a4c1c8f` |
| CE-002 | Medium | `npm ci` evidence over-scoped: npm 11 EUSAGE (5 platform optionals missing from lockfile) | CLEARED — `32210cf` (+65 optional-only lines; npm 10.9.8 + 11.19.1 + 11.20.0 all exit 0; `package.json` diff empty) |
| CE-003 | Low | AC-004 grep literal un-runnable (correct `plugins/antigravity/` paths matched the substring) | CLEARED — `a4c1c8f` (AC-004 reworded; grep passes: 2 prefixed hits, 0 bare-root) |
| CE-004 | Low | Packet anchors `REQ-001..006` stale in spec:46 / proposal:8 / plan:7 | CLEARED — `a4c1c8f` (all → `REQ-001..007`; sole remaining literal = remediation-record prose, a before→after trail) |

Refuter re-verification: `quality-gate/SPEC-repo-hygiene/refuter.md` → **pass**, 0 new findings. Carried-forward residuals for gate keeper: first-CI-run observable only post-push (ship-release checkpoint, engineering owner); `registry.npmmirror.com` lockfile URLs (see orchestrator verification note, automation owner).

## Coverage Summary

- Unit coverage: N/A percent (smoke/contract suite — registry + guards + fixture replays, not line-coverage driven; justification: zero-dep harness-less repo, `node:test` only)
- Evidence coverage: 6/7 REQ-IDs fully pass; REQ-006 partial (tag at ship-release); REQ-NF-003 completes at gate
- Acceptance criteria covered: AC-001..005, AC-007, AC-008 pass; AC-006 pending ship-release; 0 failing tests, 0 flaky (deterministic source-assert + fixture replays, no sleeps)
