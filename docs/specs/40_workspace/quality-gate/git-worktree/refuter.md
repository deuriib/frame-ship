# Refuter Review: SPEC-git-worktree

**Reviewer:** review-refuter (adversarial, engineering)
**Date:** 2026-09-16
**Verdict:** conditional
**Skill:** skill(frame-ship:quality-gate) + `skills/quality-gate/references/engineering/refuter-review.md`

## Mission

Attempt to **falsify** the implementation claims. Success = a counterexample with proof. A claim without proof is REFUTED per HARD; every finding below carries its own proof.

## Refuted Claims

| Claim | Evidence Demanded | Result |
|-------|-------------------|--------|
| T-001 — SKILL §5 resolves to existing refs (eng matrix) | §5 lists all normatively-consumed refs | **REFUTED** — `skills/git-worktree/SKILL.md:45-47` lists 1/4 files (`worktree-lifecycle.md` only); `references/` holds 4 files (glob proof); §3 steps 1/3/4 normatively consume `announce-template.md`, `guards.md`, `pwsh-flow.md`. Confirms readability RD-001. |
| C-001 — check-ignore green + zero tracked paths (eng lane) | Citable log path + status snapshot ref | **REFUTED as cited** — matrix cites "session shell logs for this lane, commands run post-edit" with no path. State independently CONFIRMED by refuter probe: `git check-ignore -q .worktrees/` exit 0, `.gitignore:55-56` entry present (see RF-004/RF-006). Lane proof missing. |
| C-003 — live count ≤2 snapshot (eng + automation lanes) | `git worktree list` snapshot path | **REFUTED as cited** — both matrices cite "session shell log for this lane" with no path. State independently CONFIRMED: `git worktree list` → 1 entry (`D:/GitHub/frame-ship e7a6ba4 [main]`), count 1 ≤ 2. Lane proof missing. |
| C-002 — secret scans 0 hits (eng + automation lanes) | Scan command + log ref over stated file set | **REFUTED as cited, state CONFIRMED by spot-check** — lanes cite "returns 0 hits" with no log path. Refuter re-ran: POSIX `$(` over `skills/git-worktree/**` 0 hits; high-signal `api_key\|passwd\|access_token\|bearer\|aws_access\|ghp_\|sk-` 0 hits; `TODO\|FIXME\|XXX\|HACK` 0 hits. State holds; lane citation lacks proof. |
| SEC T-002 — observed `.gitignore` 53 lines, zero hits, probe exit 1 (sec matrix) | Current `.gitignore` state matching observation | **REFUTED (stale)** — matrix `TEST_MATRIX-git-worktree-security.md:10` records 53 lines / absent entry / exit 1. Current: 56 lines, entry at `.gitignore:55-56`, slash-form exit 0, bare-form exit 1. Engineering lane has since landed the entry; sec observation superseded, not re-attested. |
| PPL E-001..E-004 — consent/announce/refusal/fatigue proven at dry run (people matrix) | Filled excerpt paths + 2-SPEC announce count | **REFUTED (unexecuted)** — matrix §C-006 lists slots only: `session transcript excerpt: <path-or-session-ref>`, `removal announce excerpt: <path-or-session-ref>`, `dirty-baseline drill log: <path-or-session-ref>`; count "expect 2 create + ≤2 remove" not observed. Matrix itself states "carried, not closed here". In-table `pass` ≠ proven. |
| 28/28 pass implies gate-ready | 8+7+8+5 rows each with citable artifact | **REFUTED** — matrices exist 4/4 and rows sum 8+7+8+5=28, all marked `pass` in-table (verified by read). But ≥6 evidence items cite unpathed "session shell log(s)", `pending — orchestrator owns commits`, or unfilled `<path-or-session-ref>` slots. Count holds; readiness does not. |

Refuted: 7 of 7 claims tried as cited (3 states independently confirmed, 4 states stale/missing).

## Findings

| ID | Severity | Location | Finding + Proof |
|----|----------|----------|-----------------|
| RF-001 | Medium | `skills/git-worktree/SKILL.md:45-47` | §5 drift falsifies T-001. Proof: §5 lists only `worktree-lifecycle.md`; glob of `skills/git-worktree/references/` returns 4 files (`worktree-lifecycle.md`, `guards.md`, `pwsh-flow.md`, `announce-template.md`); SKILL §3 steps 1/3/4 consume the other three by reference. Fix: add 3 missing §5 lines (same as readability RD-001, required). |
| RF-002 | Low | `skills/git-worktree/references/guards.md:33` | Bare-form `check-ignore` contradicts canonical slash form. Proof: `guards.md:33` bare `git check-ignore -q .worktrees` vs `worktree-lifecycle.md:31` + `pwsh-flow.md:45` trailing-slash; refuter probe: slash exit 0, bare exit 1 (no `.worktrees/` dir on disk). Copy-paste from guards STOPs on fresh clones. Fix: slash form in guards (same as RD-003). |
| RF-003 | Medium | repo baseline 2026-09-16 | Baseline dirty — new `add` needs recorded override. Proof: `git status --porcelain` → `M .gitignore`, `M AGENTS.md`, `M README.md`, `?? docs/specs/40_workspace/quality-gate/git-worktree/`. Per skill §3 step 2, non-empty means REFUSE `git worktree add` without session-recorded override. Gate must record `override: <who> <timestamp> <reason>` or land clean before any lane creates. |
| RF-004 | Medium | eng + automation matrices C-001/C-003/C-002 sections | Claims without citable logs. Proof: eng matrix "Log excerpt paths: session shell logs for this lane" / "Snapshot path: session shell log for this lane"; auto matrix same phrasing; scan sections "returns 0 hits" with no log path; all commits "pending — orchestrator owns commits". Fix: attach log paths + `list` snapshots + rescan proof, or downgrade rows from `pass` to `pending`. |
| RF-005 | Medium | `docs/specs/40_workspace/santana/TEST_MATRIX-git-worktree-people.md:25` + §C-006 | People dry run unexecuted. Proof: excerpt slots `<path-or-session-ref>` unfilled; §C-006 "carried, not closed here"; count expectation ("expect 1+≤1 per lane") stated, not observed. Fix: run orchestrator-aggregated 2-SPEC dry run, fill excerpt paths + announce count, then gate closes C-006. |
| RF-006 | Low | `docs/specs/40_workspace/barrera/TEST_MATRIX-git-worktree-security.md:10` | Stale security observation. Proof: matrix records 53-line `.gitignore`, zero hits, exit 1; current `.gitignore` 56 lines with entry `:55-56`, slash probe exit 0. Fix: security lane re-attests T-002 against landed entry (one line + probe code). |

## Verdict Rationale

- Falsification succeeded on citations, not on mechanics: the three independently probeable states all hold (slash-form ignore green, live count 1 ≤ 2, 0-hit scans), so `fail` (spec invalidated) overstates harm — no counterexample breaks the lifecycle, ignore gate, capacity guard, or scan posture.
- But 7/7 claims as cited lack proof, are stale, or are unexecuted (RF-001..RF-006 with diff/scan/log proof above), including the load-bearing T-001 (§5) and the people dry run. In-table `pass` ≠ proven `pass`; the gate cannot OPEN on this packet.
- `conditional`: clear RF-001 (3-line §5 fix) + RF-004 log attachments + RF-005 dry run + RF-006 re-attestation (required); RF-002 slash fix and RF-003 override-or-clean record recommended in the same pass. Re-check flips this review to `pass (could not falsify)` when every refuted row carries a path, code, or snapshot.
