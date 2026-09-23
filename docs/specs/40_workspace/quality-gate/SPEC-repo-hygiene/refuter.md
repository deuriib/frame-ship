# Refuter Review: SPEC-repo-hygiene

**Reviewer:** review-refuter (adversarial, independent — refuter role only)
**Date:** 2026-09-23
**Verdict:** pass

## Mission

Attempt to **falsify** the implementation. Every REQ claim demanded proof
(diff/scan/log/test output); every proof was re-executed read-only by this
reviewer. Success for this role = finding a counterexample; a claim without
reproducible proof is REFUTED in both directions.

Packet accepted by reference: `SPEC:docs/specs/20_backlog/SPEC-repo-hygiene.md#REQ-001..007+REQ-NF-001..003 / HARD:subagents+zero-dep+no-runtime-behavior-change(sole exception REQ-007)+sequential-lane / GATE:none-yet / DOMAINS:[engineering,automation/ops]`.

## Attack Vectors Tried

| ID | Hypothesis (claim under attack) | Attempt | Result |
|----|----------------------------------|---------|--------|
| RF-001 | REQ-001: CI workflow with pinned third-party actions is runnable | Read `.github/workflows/ci.yml`; resolved every `uses:` ref against the GitHub API (2026-09-23) | **Falsified** → CE-001 |
| RF-002 | REQ-002: `tests/smoke.test.mjs` covers registry sync + marker guard on both hooks + 5 fixture replays; 9/9 | Re-ran `npm test` (node v26.9.0) **and** shipped glob under CI runtime `mise exec node@22 -- node --test "tests/*.test.mjs"` (node v22.23.2); read all 220 test lines | Confirmed (9/9 both runtimes, exit 0; coverage matches spec text (a)/(b)/(c); AC-003 negative check present at `tests/smoke.test.mjs:63-88`) |
| RF-003 | REQ-003 + T-003: test entry, lockfile committed, deps unchanged, **`npm ci --dry-run` exit 0** | `git diff` package.json; `git ls-files package-lock.json`; `npm ci --dry-run` under default npm **and** under CI npm | Core confirmed (script-line-only diff +2/-1, deps untouched, lockfile tracked); **evidence claim falsified** → CE-002 |
| RF-004 | REQ-004/AC-004: doc-drift fixes + residual sweep (bun runtime claims = 0 with classified residuals) | Greps: `hooks/context-inject`, bare `hooks/`, `bun` (case-sensitive + `-i`), `0.8.0`, `Registers 12/13`, `not yet in repo`, README structure/roadmap/tsc vs `mise.toml`, hook diffs of `98d8182` | Underlying REQ-004 **Confirmed** (root stale path 0; tsc line byte-matches `mise.toml`; roadmap `[x]` L292-293; bun residuals exactly the 3 classified classes: `bundler` README:266, `globalThis.Bun.file` plugins/AGENTS.md:22, `maybeBun` in 3 hooks; hook-header changes comment/shebang only); **AC text falsified** → CE-003 |
| RF-005 | REQ-005/AC-005: single v0.6.1/v0.7.0/v0.3.0 headings, no doubled `### Added`, verbatim provenance | Heading `grep -c`; per-version Added duplicate scan; `diff` of current v0.7.0 section vs `git show e496c25:CHANGELOG.md`; union check vs both v0.3.0 sections in `19532cd` | Confirmed (1/1/1; 0 dup Added anywhere; v0.7.0 **byte-identical**; merged v0.3.0 = verbatim union — 5 bullets = 1 from the 09-15 section + 4 from the 09-16 section, all bullet texts byte-match; heading order 0.3.3→0.3.2→0.3.1→0.3.0; heading date 09-15 = an original date, nothing invented) |
| RF-006 | REQ-006 known partial: tag rule stated, `v0.12.0` lands at ship-release | `git tag -l`; `grep` README Contributing | Confirmed honest partial (tag list = `v0.3.2`, `v0.11.0` only; rule line README:195) |
| RF-007 | REQ-007/AC-008: transform active, description overrides commented, single approved behavior change | Read `plugins/opencode/agents.ts:345-400,488-517`; `git show 1640510 --stat` (38/38 ✓); `git diff d043f85^ HEAD -- agents.ts` | Confirmed (permissions + idempotent `PLAN_TAG`/`BUILD_TAG` active at L489/491/517; `// agent.description = …` at L488/498; delta vs pre-disable state = **exactly** the 2 commented description lines, 2+/2-; typecheck + `npm test` green on this tree) |
| RF-008 | REQ-NF-001: zero new deps, behavior change limited to REQ-007 | `git diff 1c83b95..HEAD -- package.json`; import scan of tests (node:test/assert only); plugin-source commit sweep | Confirmed (`dependencies` block untouched; only plugin-source diffs in the whole lane = skills.ts comment `ae97e42` + agents.ts `1640510`) |
| RF-009 | REQ-NF-002: one single-revertible commit per work unit | `git show --stat` for all 15 SHAs | Confirmed (8548efe=tests only, 7efa7f7=package only, feb9014=ci only, ae97e42/0e556a1/98d8182/45f3995=docs/changelog, 1640510=agents.ts only; `git status --porcelain` clean) |
| RF-010 | REQ-NF-003: complete REQ→test→artifact→verdict chain, packets reference-only | Matrix rows vs commits vs spec anchors | Partially falsified → CE-004 (packet anchors stale) |
| RF-011 | TEST_MATRIX rows hold as written | Re-executed every row's command | 1 row falsified → CE-002 (`npm ci --dry-run`); all other rows reproduced |
| RF-012 | Deviation/F-006: bare `node --test tests/` exits 1 on node v22.23.2 | `mise exec node@22 -- node --test tests/` | Confirmed (exit 1 on v22.23.2; shipped quoted-glob form exit 0 on same runtime — CI-safe) |
| RF-013 | Residual sweep: bun runtime claims 0, `## [v0.3.0]` = 1 | `grep -rni bun …`; `grep -c "^## \[v0.3.0\]"` | Confirmed exactly as classified |
| RF-014 | No secrets/PII/credential-shaped content in new files | Prohibition-clause pattern greps over `.github/`, `tests/`, `package-lock.json` | Clean (0 matches; fixture names are allowlisted replay vectors) |

## Findings

| ID | Severity | Finding | Proof |
|----|----------|---------|-------|
| CE-001 | High | **CI typecheck job references a nonexistent action repo.** `.github/workflows/ci.yml:16` pins `jdx/action-mise@v3`; that repository does not exist, so the `typecheck` job fails at step 2 on the first push/PR — REQ-001's "runs … with two jobs" is not achievable as shipped, T-001's workflow evidence missed pin validity (local replay covers `run:` commands only, not `uses:` refs), and spec risk R-001 has materialized. The canonical repo `jdx/mise-action` exists and does carry a `v3` major tag, so the mitigation is small and available. **Owner:** engineering owner (CI mechanics: automation owner) | `GET https://api.github.com/repos/jdx/action-mise` → 404 (2026-09-23, retried on `/git/refs/tags` → 404); `GET .../repos/jdx/mise-action` → 200; its tag list contains `v3`,`v3.0.0`…`v4`; workflow line read: `16: - uses: jdx/action-mise@v3` |
| CE-002 | Medium | **T-003's `npm ci --dry-run` exit 0 claim does not hold across runtimes.** Reproduced exit 1 twice under the machine's default npm 11.19.1 with `EUSAGE: … packages … in sync. Missing: @msgpackr-extract/…-darwin-arm64@3.0.4 from lock file` (platform-optional resolution), while the CI runtime (node v22.23.2 / npm 10.9.8, `mise exec node@22 -- npm ci --dry-run`) exits 0. Network ruled out (`npm ping` → PONG). Impact: the recorded evidence claim and R-002's "verified locally (npm ci clean)" are over-scoped — CI stays green, but a plain local `npm ci` fails for anyone on current npm. Mitigation available (re-scope the evidence row to the npm version used, or regenerate the lock so it validates on both). **Owner:** engineering owner | `npm ci --dry-run` → exit 1, attempts 1+2, error head: `npm error code EUSAGE … Missing: @msgpackr-extract/msgpackr-extract-darwin-arm64@3.0.4 from lock file`; `mise exec node@22 -- npm ci --dry-run` → `up to date … ci22_exit=0`; `npm ping` → `PONG` true; `TEST_MATRIX.md` T-003 row (line 11); `PROPOSED_CHANGES.md` R-002 (line 59) |
| CE-003 | Low | **AC-004's literal evidence command is unachievable as written.** AC-004 (`SPEC-repo-hygiene.md:36`) states `grep -rn "hooks/context-inject" README.md` → 0 hits; it returns 2 (README:96, README:104) because the corrected paths `plugins/antigravity/hooks/context-inject.ts` contain the pattern. The underlying fix is correct (0 ROOT-level stale refs — both hits are antigravity-prefixed) and `TEST_MATRIX.md` T-004 records the accurate formulation ("root hooks/context-inject = 0, remaining hits antigravity/-prefixed only"), so REQ-004 itself stands; the AC text needs a root-anchored pattern to be re-runnable as an AC. **Owner:** engineering owner | `grep -rn "hooks/context-inject" README.md` → `README.md:96`, `README.md:104`, exit 0 (expected 0 per AC-004); structure-block context read (README:229-231 shows `hooks/` nested under `plugins/antigravity/` — correct) |
| CE-004 | Low | **Packet anchors stale after the REQ-007 fold-in.** The canonical handoff packet in the spec (`SPEC-repo-hygiene.md:46`) and the proposal's `Packets` line (`PROPOSED_CHANGES.md:8`) still enumerate `#REQ-001..006` although REQ-007 is in scope (amendment `73b17cd` updated §2/§3/approvals but not these two lines); the orchestrator's live packet says `REQ-001..007`. Under-enumeration in the reference-only envelope = a REQ-NF-003 traceability hygiene gap. REQ-007 itself is fully documented (spec §2:23, trace row:72, REQ index:17, approvals:80), so impact is consistency, not lost trace. **Owner:** engineering owner | `SPEC-repo-hygiene.md:46` → `…SPEC-repo-hygiene.md#REQ-001..006+REQ-NF-001..003…`; `PROPOSED_CHANGES.md:8` → `…SPEC-repo-hygiene.md#REQ-001..006 / HARD:…`; vs spec line 23 (`REQ-007`) and dispatch packet `#REQ-001..007+REQ-NF-001..003` |

Counterexamples found = the 4 findings above; no further falsification succeeded (see Attack Vectors — 10 of 14 vectors Confirmed, 4 produced findings).

## Verdict Rationale

- **conditional** = counterexamples exist, mitigations available; none invalidates the spec's core. `fail` was weighed and rejected: every substantive requirement (REQ-002 test coverage, REQ-004/005 doc+changelog truth with byte-level provenance, REQ-007 single-behavior-change with 2-line delta proof, REQ-NF-001/002 zero-dep + per-unit revert) independently re-proved green on re-execution, and REQ-006's partial is honestly recorded. `pass` was weighed and rejected: CE-001 falsifies REQ-001 as shipped (a workflow whose typecheck job cannot start), and CE-002 falsifies a recorded evidence claim — a refuter cannot pass what it just falsified.
- Conditions to clear (gate keeper maps to COND-00x): (1) CE-001 — action ref resolves to an existing repo/tag and a first-green CI run is recorded before ship; (2) CE-002 — T-003/R-002 evidence re-scoped to the runtime used or the lockfile made npm-major-portable, with the row re-recorded; (3) CE-003 + CE-004 — AC-004 grep pattern and the two packet anchors corrected in a text sweep (may ride the ship-release doc pass).
- Residual risk stated, not assumed: third-party actions remain major-tag mutable (R-006, existing acceptance with owner + public-flip expiry); until CE-001 clears, CI provides **zero** signal — the repo ships with no functioning verification lane, so the quality gate cannot lean on "CI green" evidence.
- No freelance fixes performed: this review is read-only evidence work; all remediation belongs to the finding owners. Exactly one file written: this verdict. Zero PII/secrets/tokens in this artifact.

## Re-verification (post-remediation, 2026-09-23)

Scope: condition-clearance of THIS reviewer's CE-001..CE-004 only — not a
re-run of the full refutation wave, no other reviewer's roles touched
(independence preserved). Every proof below was re-executed fresh by this
reviewer; git stayed read-only; one file written: this verdict.

| CE | Status | Decisive evidence (re-run 2026-09-23) |
|----|--------|----------------------------------------|
| CE-001 | **CLEARED** | `.github/workflows/ci.yml:16` now `uses: jdx/mise-action@v3` (fix commit `a83347b`, 1 insertion/1 deletion; correction record in `a4c1c8f` + `PROPOSED_CHANGES.md:82`). Fresh GitHub API: `GET repos/jdx/action-mise` → **404** (old ref still dead), `GET repos/jdx/mise-action` → **200**, `GET .../git/refs/tags/v3` → **200** (`refs/tags/v3` → sha `5228313ee0372e111a38da051671ca30fc5a96db`). The pin resolves to an existing repo + existing major tag. |
| CE-002 | **CLEARED** | `npm ci --dry-run` (default npm 10.9.8) → **exit 0**; `npx -y npm@11 ci --dry-run` (npm 11.20.0) → **exit 0**; **the exact original falsifier** `npx -y npm@11.19.1 ci --dry-run` → **exit 0**. Commit `32210cf` touches only `package-lock.json`, +65/−0 lines; added package keys = exactly the 5 missing `@msgpackr-extract/*` platform-optional entries (darwin-arm64, darwin-x64, linux-arm, linux-arm64, win32-x64) with 5 `optional: true` — nothing beyond the optional entries; `git show 32210cf -- package.json` → empty diff (zero-dep invariant intact). Post-remediation `npm test` → fail 0, exit 0. T-003 row re-scoped with both npm majors + reproduction recorded (`TEST_MATRIX.md` working tree, commit pending with owner). |
| CE-003 | **CLEARED** | AC-004 reworded at `SPEC-repo-hygiene.md:36` to "matches only `plugins/antigravity/`-prefixed paths (bare root `hooks/` claims = 0)". Grep as NOW written, run by this reviewer: `grep -rn "hooks/context-inject" README.md` → 2 hits (README:96,104), non-`plugins/antigravity/`-prefixed hits = **0**, bare-root hits = **0** → the AC is runnable and passes as stated. |
| CE-004 | **CLEARED** | Anchor lines re-read: `SPEC-repo-hygiene.md:46` → `#REQ-001..007+REQ-NF-001..003`; `PROPOSED_CHANGES.md:8` (and `:3` Spec Reference) → `REQ-001..007`; `IMPLEMENTATION_PLAN.md:7` → `REQ-001..007` (amendment `a4c1c8f`). Literal grep `REQ-001..006` across the 3 files returns exactly 1 hit — `PROPOSED_CHANGES.md:82`, the remediation record's before→after prose ("`REQ-001..006` → `REQ-001..007`"), an audit-trail quotation, not a packet anchor (a strict grep-to-0 would also strike this record line and this verdict's own findings table). All 3 packet anchors corrected → condition met. |

Residuals carried forward (stated, not assumed):

1. A first-green CI run is observable only after the first push — structurally unverifiable at gate time, so CE-001 clearance rests on ref resolution (API-proven). Ship-release checkpoint: confirm the first CI run green on push. **Owner:** engineering owner.
2. `TEST_MATRIX.md` carries the CE re-record rows (T-001/T-003 + orchestrator re-verify note) in the working tree, uncommitted at this pass — commit discipline stays with the owner; evidence content verified above. **[RESOLVED 2026-09-23: re-record landed in `dfd01b7` — stat verified this pass = `TEST_MATRIX.md` +14/−2 only.]**
3. Disclosed by the owner outside this pass's scope: lockfile `resolved` URLs use `registry.npmmirror.com` (pre-existing since `7efa7f7`, integrity-pinned) — owner automation owner, GH-runner reachability of that mirror confirmed at first push (`TEST_MATRIX.md` working tree). Not one of CE-001..004; recorded here for the gate keeper, not adjudicated by this pass. **[SUPERSEDED/CLEARED 2026-09-23: the "pre-existing since `7efa7f7`" provenance in this line was FALSE (risk-reviewer refutation, independently re-verified by this reviewer); URLs now stripped, both npm majors exit 0 → mirror residual CLEARED, no longer carried. See Addendum below — history kept, not deleted.]**

**Final verdict: pass** — all four counterexamples cleared by fresh evidence
(the exact falsifying runtimes and commands re-executed green); no new
counterexample opened during re-verification. The Attack Vectors and Findings
tables above are the original review, unmodified.

### Addendum (2026-09-23 — mirror residual provenance correction)

Correction pass on this reviewer's own carried residual 3 (mirror-URL note): the
"pre-existing since `7efa7f7`" provenance mirrored from the orchestrator's
matrix note was REFUTED as false (risk-reviewer finding); every fact below was
independently re-executed by this reviewer before writing:

1. **False provenance, corrected:** `git show 7efa7f7:package-lock.json | grep -c '"resolved"'` → **0** — the original lockfile had zero `resolved` fields, so mirror URLs were NOT pre-existing since `7efa7f7`. The 5 explicit `registry.npmmirror.com` URLs were introduced by `32210cf` (the CE-002 lockfile regen under npm 11 with the machine's registry config): `git show 32210cf:package-lock.json | grep -c npmmirror` → **5**, all in added lines (`git show 32210cf -- package-lock.json | grep -c '^+.*npmmirror'` → 5).
2. **Stripped + verified this pass:** current `grep -c npmmirror package-lock.json` → **0**; `node -e "JSON.parse(readFileSync('package-lock.json','utf8'))"` → **valid**; `npm ci --dry-run` (npm 10.9.8) → **exit 0**; `npx -y npm@11 ci --dry-run` (npm 11.20.0) → **exit 0**. Strip state: working tree — no lockfile commit after `32210cf` (`git log 32210cf..HEAD -- package-lock.json` → empty; `git diff --stat -- package-lock.json` → 5 deletions); commit stays with the owner.
3. **Mirror residual status: CLEARED (URLs stripped, both npm majors exit 0)** — removed from carried-forward residuals; residual 3 above is superseded by this addendum (history preserved, not deleted).
4. Also resolved since: residual 2 — matrix re-record landed in `dfd01b7` (stat: `TEST_MATRIX.md` +14/−2 only). **Residual still carried: (1) first-CI-green-run checkpoint at ship-release (owner: engineering owner).**

Verdict unchanged: **refuter: pass** — 4/4 CE cleared; this correction fixes a
provenance note, opens no new counterexample.
