# Handoff: engineering owner → ship-release

**Spec Reference:** SPEC-repo-hygiene
**Agent:** engineering owner (orchestrator-synthesized; work executed by subagents)
**Date:** 2026-09-23
**Status:** complete
**Domains-Touched:** [engineering, automation/ops]

**Packet:** `SPEC:docs/specs/20_backlog/SPEC-repo-hygiene.md#REQ-001..007+REQ-NF-001..003 / HARD:subagents+zero-dep+no-runtime-behavior-change+sequential-lane / GATE:OPEN (9df1de9) / DOMAINS:[engineering,automation/ops]`

## Deliverables

| Artifact | Location / Evidence | Status |
|----------|---------------------|--------|
| CI workflow | `.github/workflows/ci.yml` (2 jobs, `permissions: contents: read`, pins API-verified) — `feb9014`, `a4c1c8f`, `a83347b` | done |
| Smoke tests (zero-dep) | `tests/smoke.test.mjs` — 9/9 pass / 0 fail, exit 0 (`npm test`, node:test only) — `8548efe`, header `4526b63` | done |
| Lockfile + npm script | `package-lock.json` committed, registry-default (npmmirror grep 0), `npm ci --dry-run` exit 0 on npm 10.9.8 AND npm 11.20.0 — `7efa7f7`, `32210cf`, `2de0839` | done |
| Doc-drift cleanup | README / root `AGENTS.md` / `plugins/AGENTS.md` / hook headers / CHANGELOG sections — `ae97e42`, `98d8182`, `45f3995`, `89d9d9b`, `dfd01b7`, wave-2 `4526b63` `fdda81a` `449f386` `11d7ff6` | done |
| REQ-007 transform | `plugins/opencode/agents.ts` active, overrides stay commented, comment reconciled (zero logic) — `1640510`, `fdda81a` | done |
| Tests / Evidence | `40_workspace/engineering/TEST_MATRIX.md` — 12 rows; every matrix-cited commit resolves (0 missing) | done |
| Gate record | `40_workspace/quality-gate/SPEC-repo-hygiene/` — `GATE_REPORT.md` (OPEN, 7/7 pass, W1/W2 waivers) + 7 reviewer verdicts — `9df1de9` | done |
| Domain artifact | N/A (no external filings/contracts/campaigns for this spec) | N/A |
| Changelog entry | `CHANGELOG.md` — lands with `bump-version.mjs minor --changelog` at ship-release (AC-006 defers) | pending (next stage) |

## Definition of Done Checklist

### Common (all domains)

- [x] **All acceptance criteria met** — REQ-001..005, REQ-007, REQ-NF-001..003 = `pass` in matrix; REQ-006 = partial **by spec design** (AC-006 defers bump+tag to ship-release step 7) — single deferral, owner engineering owner, closes same session at ship-release.
- [x] **C4 — every REQ links evidence, present AND resolves AND relevant** — 12/12 matrix rows carry concrete proof (greps, fixture replays, API checks, dry-runs, merge-tree); commit-ref loop over the matrix: **0 missing SHAs**; files cited exist. Zero attestation-only rows: the three `Attestation`-type rows (E-002/E-003/E-004) carry reproducible commands independently re-run by reviewers (automation re-verified merge-tree both steps; reliability re-ran both npm majors; risk re-ran all greps). No C4 FAIL.
- [x] **C4 FAIL residual-risk + owner** — N/A (zero C4 FAILs); the 2 carried conditions are recorded as waiver rows W1/W2 in `GATE_REPORT.md` with accepted-risk + controls + expiry + owner.
- [x] **Edge cases / failure modes handled** — reviewer-probed: deny path without echoing matched value, missing ids skipped, idempotent replays (tag check), stdin-corruption fail-closed, npm 11 EUSAGE reproduced→fixed. Residual gap (malformed-payload fixture) recorded as backlog Low RL-004, owner engineering owner.
- [x] **Gate OPEN** — `GATE_REPORT.md` (`9df1de9`): 7/7 pass, COND-001..004 all cleared by reviewer re-verification, W1/W2 waivers recorded against the three-block bar (expiry at ship-release v0.12.0).
- [x] **Load evidence** — `skill(frame-ship:verify-handoff)` loaded once at stage start; template paths cited (`references/dod-checklist.md`, `references/handoff-template.md`); execution mode `subagents` declared; packet reference-only, intact.
- [x] **Docs/changelog updated for user-facing impact** — README (three-plugin truth, structure block, anti-pattern counts) + both AGENTS files updated in-wave; CHANGELOG entry lands with the version bump at ship-release (Keep a Changelog ordering honored there).

### Engineering (engineering owner)

- [x] **Lint passes, zero warnings** — no linter in repo: **N/A by approved scope** (zero-dep, no new tooling — user constraint); strict `tsc` + `node:test` are the enforcement; typecheck exit 0, no warnings.
- [x] **Type checks pass** — `npm run typecheck` exit 0 on current tree (2026-09-23).
- [x] **Test coverage meets threshold** — **no coverage threshold by approved scope** (explicitly excluded: "no overengineering"); proxy = 9/9 smoke suite incl. bidirectional registry negative + 5 fixture replays; exit 0.
- [x] **No TODO/FIXME left in code** — 2 grep hits classified, both guardrails *rule prose* in `guardrails.ts:38,118` ("tickets for TODOs", "No TODOs without ticket" — policy text, not pending-work markers); true markers in `plugins/ tests/ scripts/ .github/` = 0.

### Security (only if security-touched)

- [x] **N/A by routing** — no auth/data/external-API/PII surface (stated not assumed in proposal §Security Considerations; security reviewer excluded from routing for that reason). Gate PII checkpoint still ran: prohibition-clause scan clean, zero secrets/PII across verdicts, report, and code — evidence in `GATE_REPORT.md` §PII checkpoint.

### Domain appendix (touched only)

- [x] **Engineering (engineering owner)** — all rows above.
- [x] **Automation/ops (automation owner + engineering owner)** — workflow tested: full CI-sequence replayed green locally on the exact tree (typecheck, both npm majors dry-run, tests, lockstep, 3 action refs API-200); rollback checked: two-SHA revert path merge-tree-verified (`a83347b` + `feb9014`), disable = revert/delete documented in proposal §Rollback + matrix E-003; runbook/monitoring/flags: N/A (single CI workflow, no flags) — first-green monitoring = W1 waiver with re-review owner.
- Finance / legal / marketing / people / revenue / data lens: **N/A** — untouched, rows deleted from gate per template (routing rationale in `GATE_REPORT.md`).

### Documentation

- [x] **API docs OR domain artifact filed** — no public API (N/A); domain artifacts filed in agreed locations: spec (backlog), matrix/proposal/plan (40_workspace/engineering), gate records (40_workspace/quality-gate).
- [x] **Changelog entry** — added at ship-release via `bump-version.mjs minor --changelog` (REQ-006/AC-006 design: bump+tag+notes are the release step, not a handoff step).
- [x] **ADR if architecture contract changed** — none required: no invariant broken or created, no new component, no cross-domain contract change (zero-dep + split-lane contracts held; REQ-007 is sponsor-original code re-enabled as designed) → per `docs/specs/AGENTS.md` ADR rule, no ADR; architecture review not triggered.

## C4 note (single deferral)

REQ-006's pending half (v0.12.0 bump + tag) is evidence-deferred **by the spec's own AC**, not missing: completed at ship-release in this same session; residual-risk = release step skipped → owner engineering owner; closes or handoff flips back.

## Blockers / Open Questions

None blocking. Carried with owners (detail in `GATE_REPORT.md`):
- **W1** first-CI-green at push — expiry = first push, ship-release session; re-review owner engineering owner.
- **W2** live-host permission confirmation — expiry = first `plan` use (unified at ship-release); re-review owner engineering owner.
- Backlog Lows (non-blocking): RL-003/risk-4 unpinned TS, RL-004 malformed fixture, RL-005 `timeout-minutes`, resilience R-001/R-002 — owner engineering owner.

## Next Agent

**frame-ship:ship-release** — load skill once, then: `node scripts/bump-version.mjs minor --changelog` (v0.11.0 → **v0.12.0**, lockstep 7 files), `git tag v0.12.0`, release notes in `30_delivery/`, archive promote-then-purge (`git mv` spec → `50_archive/SPEC-repo-hygiene/`, copy `GATE_REPORT.md` + this `HANDOFF.md` there, `ARCHIVE-RECORD.md` index, purge the 4 lane singletons + `quality-gate/SPEC-repo-hygiene/` only), confirm **W1** (first CI run green) before the release closes, then orchestrator asks the user about `git push`.
