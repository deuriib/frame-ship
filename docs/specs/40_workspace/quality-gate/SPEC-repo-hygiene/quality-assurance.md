# Quality Assurance Review: SPEC-repo-hygiene

**Reviewer:** quality-assurance (runs the real suite — test/evidence quality lens only)
**Date:** 2026-09-23
**Verdict:** pass

Packet accepted by reference: `SPEC:docs/specs/20_backlog/SPEC-repo-hygiene.md#REQ-001..007+REQ-NF-001..003 / HARD:subagents+zero-dep+no-runtime-behavior-change(sole exception REQ-007)+sequential-lane / GATE:none-yet / DOMAINS:[engineering,automation/ops]`.

Scope discipline: this review judges **whether the REQ→test→artifact→verdict chain holds and whether the evidence is of good quality**. The adversarial refutation wave (refuter.md, pass, post-remediation) is inherited as context and NOT re-done; where CE clearances intersected evidence quality (AC-004 grep, npm ci runtimes, pin ref, packet anchors), the decisive command was re-executed by this reviewer as an evidence check, not as re-refutation. Git stayed read-only (no add/commit/checkout/reset); exactly one file written: this verdict. Zero PII/secrets/tokens in this artifact.

## Checklist

- [x] **All acceptance criteria have tests/evidence** — AC-001 (workflow inspected: 2 jobs, push:[main]+pull_request, `permissions: contents: read`, 0 secret-shaped strings), AC-002 (`npm test` → 9/9, this reviewer, twice), AC-003 (negative check verified by code inspection — fail-capable, see below), AC-004 (reworded grep re-run: passes as now written), AC-005 (heading counts 1/1/1 + dup-`### Added` scan = 0), AC-007 (`typecheck` + `version:check` green), AC-008 (transform active + desc lines commented + `npm test`/typecheck green) — **7/8 provable now**; AC-006 (tag `v0.12.0`) is structurally pending ship-release step 7 and honestly recorded partial, not papered over.
- [x] **All REQ-IDs traceable to test IDs** — 10/10: REQ-001..007 → T-001..T-006, REQ-NF-001..003 → E-001..E-004; every matrix row re-executed this review (2 rows → findings below, neither breaking trace).
- [x] **Unit + integration + e2e coverage as appropriate** — unit/source-structural (registry sync, marker-guard ordering) + integration (5 real spawned hook fixture replays through the `hooks.json` contract); e2e N/A (repo tooling, no user surface).
- [x] **Regression suite updated** — no pre-existing suite; `8548efe` establishes the baseline (9 tests). Doc-drift regressions are guarded per spec-defined evidence form (recorded greps in TEST_MATRIX), not by new tests — that is the spec's own §5 scoping, not a gap against it.
- [x] **No flaky tests introduced** — greps over `tests/` for `sleep|Math.random|Date.now|new Date(|http://|fetch(` → **0 hits**; spawn uses a 15s deadline bound (condition-based, no sleeping); `cwd: ROOT` + `process.execPath` + committed fixtures → env-independent. 5 green runs total (this reviewer ×2 on v26; refuter on v26.9.0 **and** CI runtime v22.23.2; orchestrator) — 0 flakes, identical 9/9.
- [N/A] **Coverage threshold met** — spec §5 explicitly rejects coverage thresholds as theater at this size; AC coverage tracked instead (7/8 now, 8/8 at ship). Justification recorded in matrix Coverage Summary.
- [N/A] **Manual exploratory testing** — not applicable (no UI); substituted by independent triple execution of the suite across two Node majors.
- [x] **Status honesty** — REQ-006 row = `partial — README line pass, tag pending ship-release` (matches reality: `git tag -l` = v0.3.2, v0.11.0; no v0.12.0 anywhere); REQ-NF-003 = `in-progress — gate next` (completes with this gate wave). Both accurate as written.
- [x] **Deviation/finding records complete** — Deviations 1–2 recorded (script literal → RESOLVED `89d9d9b`; commit-race recovery disclosed with authoritative SHAs). F-001..F-006: all remediated, and the fixed state re-confirmed live by this reviewer's greps (see Evidence Re-runs). CE-001..CE-004: CLEARED with re-run proofs in refuter.md; records carry severity, location, owner, status — complete.

## Traceability

| REQ-ID | Test ID | Type | Status (this re-run) |
|--------|---------|------|----------------------|
| REQ-001 | T-001 | Review | pass — ci.yml: 2 jobs, push+PR, pinned (`jdx/mise-action@v3`), 0 secrets; commands replayed green |
| REQ-002 | T-002 | Unit | pass — 9/9 twice by this reviewer; assertions non-tautological (below) |
| REQ-003 | T-003 | Unit | pass — entry + lockfile + `npm ci --dry-run` exit 0 on npm 10.9.8 **and** npm@11; `package.json` diff = script line only (+2/−1), deps untouched |
| REQ-004 | T-004 | Review | pass — all greps re-run, all counts match; bun residuals exactly the 3 classified classes |
| REQ-005 | T-005 | Review | pass — v0.6.1/v0.7.0/v0.3.0 = 1/1/1; dup `### Added` = 0; v0.7.0 byte-identical to `e496c25` (re-verified) |
| REQ-006 | E-001 | Review | **partial (honest)** — tag rule README:195 present; `v0.12.0` lands at ship-release |
| REQ-007 | T-006 | Unit | pass — `PLAN_TAG`/`BUILD_TAG` active (agents.ts:358-359, guards :491/:517); `PLAN_DESCRIPTION`/`BUILD_DESCRIPTION` applications commented (:488/:498); typecheck + test green |
| REQ-NF-001 | E-002 | Attestation | pass — deps block untouched since `1c83b95`; tests import `node:*` builtins only; CI = checkout/mise/setup-node only |
| REQ-NF-002 | E-003 | Attestation | pass **with finding QA-002** — per-commit units single-revertible (12× `git show --stat`, each lane-pure); substance holds, single-SHA revert command as documented does not |
| REQ-NF-003 | E-004 | Attestation | pass at this gate — matrix rows + this verdict complete the chain; packet anchors `REQ-001..007` confirmed (sole `REQ-001..006` literal = remediation prose, PROPOSED_CHANGES:82) |

## Evidence Re-runs (vs TEST_MATRIX claims)

| Command | Result | Matches row |
|---|---|---|
| `npm test` (×2) | 9 pass / 0 fail, exit 0 | T-002, AC-002 ✔ |
| `npm run typecheck` / `npm run version:check` | exit 0 / all 7 files synced v0.11.0 | AC-007 ✔ |
| `npm ci --dry-run` + `npx -y npm@11 ci --dry-run` | exit 0 / exit 0 | T-003 post-`32210cf` claim ✔ |
| `grep -rn "hooks/context-inject" README.md` | 2 hits, both `plugins/antigravity/`-prefixed; non-prefixed = 0; tree-block `hooks/` only under `plugins/antigravity/` (README:229-231); root-level `^hooks/` = 0 | AC-004 reword ✔ runnable and passing |
| `grep -rn bun` / `grep -rni bun` (README, plugins/AGENTS.md, hooks/*.ts) | case-sensitive: 1 (`bundler` README:266); case-insensitive adds only `globalThis.Bun.file` (plugins/AGENTS.md:22) + `maybeBun` stdin code (3 hooks) → **0 runtime-claim hits, exactly the 3 classified classes** | T-004, AC-004, F-001..003 ✔ |
| tsc parity: README:266 vs `mise.toml` typecheck `run` | byte-identical 250-char command, both include `guardrails.ts` (line-diff clean) | T-004, AC-004 ✔ |
| Roadmap / counts | `[x]` at README:292-293; "not yet in repo" = 0; `Registers 12`=1 / `Registers 13`=0; plugins/AGENTS `0.8.0`=0; skills/AGENTS "12 dirs (bootstrap+9 stages+2 supporting)" | T-004, REQ-004 ✔ |
| Hook headers / replay lines / install comment | `#!/usr/bin/env node` + "run via `node …`" on all 3 hooks; plugins/AGENTS:32-34 node replay; README:263 "at repo root" | F-002..004 remediated ✔ |
| Changelog greps | `^## [v0.6.1]`=1, `[v0.7.0]`=1, `[v0.3.0]`=1; per-section dup `### Added`=0; v0.7.0 section byte-identical to `e496c25` | T-005, AC-005 ✔ |
| `git tag -l` | v0.3.2, v0.11.0 only; no v0.12.0 in CHANGELOG/tags | E-001 partial honest, AC-006 pending ✔ |
| `git diff 1c83b95..HEAD -- package.json` | +2/−1, `scripts` only, `dependencies` untouched | E-002, REQ-NF-001 ✔ |
| `git show --stat` × 12 lane SHAs | each touches only its own unit (tests / package / ci / docs / changelog / agents.ts / anchors / lockfile) | E-003 units ✔ |
| `git status --porcelain` | clean except this gate dir (matrix committed at `dfd01b7` → refuter carry-forward #2 resolved) | orchestrator note ✔ |
| secrets-pattern grep over ci.yml | 0 hits | T-001 "no secrets" ✔ |
| AC-003 inspection (`tests/smoke.test.mjs:63-88`) | fail-capable: entries parsed from live `skills.ts` source; missing dir → `assert.ok(existsSync…)` throws; entry removal → count≠12 fails; unregistered new dir → bidirectional fails; regex/`skills.ts` loss → `assert.ok(m)`/throw fails — fail-closed in every direction, by inspection as the AC prescribes | AC-003 ✔ |
| Assertion quality read (all 220 lines) | non-tautological: behavioral asserts (`decision` values, `Blocked:` prefix, **no value-echo exfil guard**, live SKILL.md body embedded, exact `{}` on later invocation) + self-validating fixture (`invocationNum > 0`) prevents vacuous replay; marker test enforces guard **before first push** in both brace-matched bodies — guard deletion or reordering turns it red | REQ-002 quality ✔ |

## Coverage

- Line coverage: **N/A** — smoke/contract suite (registry + source guards + fixture replays), not line-driven; coverage thresholds rejected in spec §5.
- Branch coverage: N/A (same).
- Acceptance criteria coverage: **7/8 provable now**; AC-006 completes at ship-release (tag is the release act itself). Determinism: 0 sleeps/random/time/network in tests; 5/5 green runs across 2 Node majors → 0 flaky.

## Findings

| ID | Severity | Finding | Proof |
|----|----------|---------|-------|
| QA-001 | Low | **Stale run instruction in the new test file's own header.** `tests/smoke.test.mjs:12` still documents `Run: node --test tests/` — the bare-directory form this spec *proved broken* (exit 1) on the CI Node runtime. F-006's remediation scope was "spec + plan text" (`TEST_MATRIX.md:41`, fixed `89d9d9b`) and missed the test file itself: `git log -- tests/smoke.test.mjs` shows it untouched since creation (`8548efe`), while a repo-wide sweep shows every other occurrence corrected. Comment-only (no runtime effect), but it is doc-drift of exactly the class this spec eliminates, inside the spec's own deliverable. **Owner:** engineering owner (comment fix; rides any doc sweep) | `tests/smoke.test.mjs:12` → `* Run: node --test tests/`; `TEST_MATRIX.md:29` deviation 1 + refuter RF-012 → bare dir exit 1 on node v22.23.2 (reproduced twice); `git log --oneline -- tests/smoke.test.mjs` → only `8548efe`; shipped entry `package.json:15` = quoted glob (correct) |
| QA-002 | Low | **E-003's "CI disable = revert `feb9014`" conflicts as written.** `a83347b` later modified `ci.yml` line 16, so reverting the file-creation commit alone hits a modify/delete conflict. The correct path is a two-commit revert (`git revert a83347b feb9014`, step 1 verified clean), and REQ-NF-002's **substance holds** (still revertible via `git revert`; CI files are never loaded by plugin runtime) — but the recorded evidence command stops with a conflict if executed literally. Evidence-text precision issue, not a reversibility failure. **Owner:** engineering owner (reword the E-003 row to the two-SHA sequence) | `TEST_MATRIX.md:17` → "CI disable = revert `feb9014`"; `git show feb9014 \| git apply --check -R` → exit 1 (2-way **and** `-3`); exact revert simulation `git merge-tree --write-tree --merge-base=<feb9014> HEAD <feb9014^>` → `CONFLICT (modify/delete): .github/workflows/ci.yml … deleted in 7efa7f7… and modified in HEAD`; mitigation verified: `git show a83347b \| git apply --check -R` → exit 0 |

No other evidence claim failed re-execution: all remaining matrix rows reproduced exactly as written.

## Verdict Rationale

- **pass.** The chain holds: every one of the 10 REQ rows carries a test/evidence ID, every claim was re-executed by this reviewer, the suite is deterministic and genuinely fail-capable (AC-003 verified by code-path inspection, not by trust), and status honesty is intact (REQ-006 partial, REQ-NF-003 in-progress-until-gate, AC-006 pending — none dressed up as green). CE-001..CE-004 clearances intersect my lens at four checkpoints, each re-run here and green (pin resolves, both npm majors dry-run clean, AC-004 grep passes as reworded, packet anchors read `REQ-001..007`).
- **conditional weighed and rejected:** conditions-clearing is for evidence gaps or falsified requirements that block certification. Both findings are Low/hygiene per severity scale (backlog class): neither invalidates an AC, neither breaks REQ→test→verdict trace, and both have owner + proof + trivial remediation that needs no gate condition to keep the release safe. Recorded here for the owner; the gate keeper may still fold them into COND items if desired — that call is theirs, not this reviewer's.
- **fail weighed and rejected:** no REQ substance failed. REQ-NF-002's revertibility was tested to its exact merge semantics and *holds* (two-SHA path clean, runtime isolation trivial); zero-dep, single-behavior-change (REQ-007, desc overrides still commented), byte-level changelog provenance, and 9/9×5 test runs all stand independently.
- Carried residuals acknowledged, not re-owned (already parked by the refuter with owners): first-green CI run observable only post-push (engineering owner, ship-release checkpoint — CI signal cannot be leaned on until then); lockfile `registry.npmmirror.com` resolved URLs reach GH-runner connectivity check at first push (automation owner). Neither is provable wrong today → no finding raised.
- Independence & hygiene: QA lens only — no other reviewer's role touched, no verdict file other than this one, no freelance fixes, git read-only throughout, zero PII/secrets.
