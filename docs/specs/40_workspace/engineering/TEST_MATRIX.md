# Test / Evidence Matrix: SPEC-repo-hygiene

**Agent:** engineering specialist (evidence) + orchestrator (verification)
**Date:** 2026-09-23
**Domains-Touched:** [engineering, automation/ops]

| REQ-ID | Evidence ID | Description | Type | Status | Commit |
|--------|-------------|-------------|------|--------|--------|
| REQ-001 | T-001 | `.github/workflows/ci.yml`: 2 jobs on push:main + pull_request, `permissions: contents: read`, major-tag pins, no secrets; both job command sequences replayed locally (R-001 mitigation) | Review | pass | `feb9014` |
| REQ-002 | T-002 | `tests/smoke.test.mjs` — 9/9: registry sync (12 entries, frontmatter `name`==dir + non-empty description, bidirectional new-dir negative), marker guard precedes every `event.system.push` in both hooks (brace-matched hook bodies), 5 agy fixture replays (allow→`decision:allow`, deny→`decision:deny` + `Blocked:` without echoing matched value, first→injects bootstrap, later→`{}`, format-note→`{}`) | Unit | pass | `8548efe` |
| REQ-003 | T-003 | `npm test` entry + committed `package-lock.json`; `npm ci --dry-run` exit 0; `dependencies` untouched | Unit | pass | `7efa7f7` |
| REQ-004 | T-004 | Greps: `bun ./hooks/` = 0, root `hooks/context-inject` = 0 (remaining hits antigravity/-prefixed only), raw tsc + typecheck comments contain `guardrails.ts`, Roadmap items `[x]` + "(not yet in repo)" trimmed, tag-truth rule present, `AGENTS.md` count = 12-with-arithmetic, `plugins/AGENTS.md` `0.8.0` = 0, `skills.ts` `Registers 12` = 1 / `Registers 13` = 0 (diff = comment line only, +1/-1) | Review | pass | `ae97e42` |
| REQ-005 | T-005 | `grep -c "^## \[v0.6.1\]"` = 1; `grep -c "^## \[v0.7.0\]"` = 1; restored section byte-verified against `git show e496c25:CHANGELOG.md`; v0.8.0 keeps only original Added/Changed | Review | pass | `0e556a1` |
| REQ-006 | E-001 | Tag rule stated in README Contributing (`CHANGELOG.md` section → matching `git tag vX.Y.Z`); `v0.12.0` bump + tag lands at ship-release (step 7) | Review | partial — README line pass, tag pending ship-release | `ae97e42` (line) / pending (tag) |
| REQ-007 | T-006 | `agents.ts` transform block active (38/38 diff), `PLAN_DESCRIPTION`/`BUILD_DESCRIPTION` overrides stay commented; `mise run typecheck` exit 0 + `npm test` exit 0 post-inclusion; sponsor directive recorded in `PROPOSED_CHANGES.md` | Unit | pass | `1640510` |
| REQ-NF-001 | E-002 | `git diff package.json` = script line only, `dependencies` block untouched; zero new deps in tests (node:test/assert only) + CI (mise/checkout/setup-node only); behavior change limited to REQ-007 | Attestation | pass | `7efa7f7`, `1640510` |
| REQ-NF-002 | E-003 | Per-REQ commit units each single-revertible: `8548efe` `7efa7f7` `feb9014` `ae97e42` `0e556a1` `1640510`; CI disable = revert `feb9014`; no data/external comms | Attestation | pass | all listed |
| REQ-NF-003 | E-004 | This matrix + `quality-gate/<spec-id>/GATE_REPORT.md` (verdict pending gate) | Attestation | in-progress — gate next | pending |

## Orchestrator verification (independent re-run, 2026-09-23)

- `npm test` → 9 pass / 0 fail. `mise run typecheck` → 0. `node scripts/bump-version.mjs --check` → all 7 files synchronized at v0.11.0.
- `git status --porcelain` = clean after final commit; file set matched approved change list exactly.
- Prohibition-clause scan over `.github/`, `tests/`, `package-lock.json` → no credential-shaped content (fixture names `deny`/`secret` are replay vectors, allowlisted).

## Deviations (recorded, not silent)

1. **REQ-003 script literal:** plan/spec text said `node --test tests/`; bare directory exits 1 on node v22.23.2 (reproduced orchestrator-side, exit=1). Shipped `node --test "tests/*.test.mjs"` (quoted glob, Node-expanded). REQ text alignment proposed in the residual-sweep approval.
2. **Commit race recovery:** five parallel git commands contended on `index.lock`, merging S1+S2; unpushed history was rewritten (`reset --soft` + sequential re-commit) so one commit per REQ holds as planned. Final SHAs above are authoritative.

## Open findings (reported, unapproved scope — specialist report §6)

| # | Finding | Severity | Location | Owner |
|---|---------|----------|----------|-------|
| F-001 | README prose claims hooks run via `bun`; `hooks.json` runs via `node` (L72/L89/roadmap L288) | Medium | `README.md` | engineering owner |
| F-002 | `plugins/AGENTS.md` COMMANDS replay lines say `bun`; contract is `node` | Medium | `plugins/AGENTS.md` | engineering owner |
| F-003 | Hook file headers say `run via bun ./hooks/…` (stale path + runtime; comment-only) | Low | `plugins/antigravity/hooks/*.ts` | engineering owner |
| F-004 | `mise run install` comment says "npm install in .opencode/" — runs at repo root | Low | `README.md` | engineering owner |
| F-005 | Duplicate `## [v0.3.0]` headers remain (09-16 + 09-15), out of REQ-005's named scope | Low | `CHANGELOG.md` | engineering owner |
| F-006 | REQ-003/plan literal `node --test tests/` ≠ shipped working form | Low | spec + plan text | engineering owner |

Remediation = residual-sweep approval (extend REQ-004/REQ-005 + align REQ-003 text); **no freelance fixes** — sponsor approval pending, then one fix commit per REQ class before gate.

## Coverage Summary

- Unit coverage: N/A percent (smoke/contract suite — registry + guards + fixture replays, not line-coverage driven; justification: zero-dep harness-less repo, `node:test` only)
- Evidence coverage: 6/7 REQ-IDs fully pass; REQ-006 partial (tag at ship-release); REQ-NF-003 completes at gate
- Acceptance criteria covered: AC-001..005, AC-007, AC-008 pass; AC-006 pending ship-release; 0 failing tests, 0 flaky (deterministic source-assert + fixture replays, no sleeps)
