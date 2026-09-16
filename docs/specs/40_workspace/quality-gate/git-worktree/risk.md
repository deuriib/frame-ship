# Risk Review: SPEC-git-worktree

**Reviewer:** review-risk (operational / regulatory / business risk lens)
**Date:** 2026-09-16
**Verdict:** conditional
**Skill:** skill(frame-ship:quality-gate) — routing table row "engineering → review-risk"; risk has no dedicated engineering checklist file (SKILL lists 5; risk rides the fast-gate note shape per prior `single-dispatcher/risk-review.md` precedent)
**Packet:** SPEC: skills/git-worktree/ (5 files) + .gitignore / HARD: execution_mode=multi-subagents, risk matrix + blast radius + rollback required, residual explicit / GATE: arch-Approved, sec-Conditional (C-001..C-006) / DOMAINS: [engineering, automation/ops, security, people]
**Role note:** I understand the risk-reviewer role first — assess residual, blast radius, and rollback adequacy; I never approve my own work (wrote no git-worktree content).

## Risk Matrix — residual review (C-001..C-006)

| Cond | State | Evidenced? | Proof |
|------|-------|------------|-------|
| C-001 (S-001): `.worktrees/` entry + `check-ignore` exit 0 + zero-tracked snapshot | Landed on disk, uncommitted | Substantially yes — attribution pending | `.gitignore:55-56` entry present; this-session probe slash exit 0, bare exit 1; reliability review cites `git ls-files .worktrees/` empty + `status --porcelain -- .worktrees/` empty; but `M .gitignore` means green is working-tree, not committed (see RK-003) |
| C-002 (S-002): secret/PII scan 0 hits + allowlisted exports | State holds, citation missing | Partial — needs log path | Refuter spot-check this session: POSIX `$(` 0 hits, high-signal `api_key\|passwd\|access_token\|bearer\|aws_access\|ghp_\|sk-` 0 hits, `TODO\|FIXME\|XXX\|HACK` 0 hits over `skills/git-worktree/**`; but eng + automation matrices cite unpathed "session shell log(s)" (refuter RF-004) — rows read `pass` without citable log |
| C-003 (S-003): live count ≤ 2, no shared creds, branch-per-SPEC | State holds, citation missing | Partial — needs snapshot path | This-session `git worktree list` → 1 entry (`D:/GitHub/frame-ship e7a6ba4 [main]`), count 1 ≤ 2; no shared-credential helper in diffs per security review; but both lane matrices cite "session shell log" with no snapshot path (refuter RF-004) |
| C-004 (S-004): submodule drill log or none-needed statement | Not executed | No | No `git submodule status` / `.gitmodules` probe output attached in any lane matrix or gate verdict read; guard text exists (`guards.md:82-100`, `worktree-lifecycle.md:26`) but drill log absent |
| C-005 (S-005): TTL + owner per worktree; fallback `Temp\opencode`-only with record | Defined, unexecuted | No (by nature pre-execution) | TTL contract pinned (`pwsh-flow.md:114-117`, `worktree-lifecycle.md:76`, `guards.md:102-117`); no live fallback record exists because no worktree has been created; ARCH Open Question on sandbox TTL still needs orchestrator confirm per security S-005 |
| C-006 (S-006): scoped excerpts only, exactly-once count in 2-SPEC dry run | Unexecuted | No | People matrix `TEST_MATRIX-git-worktree-people.md:25` + §C-006 slots still `<path-or-session-ref>` unfilled, self-states "carried, not closed here"; expectation "2 create + ≤2 remove" stated, not observed (refuter RF-005) |

**Answer: residual is NOT Low.** C-001 is the only condition substantially evidenced (modulo commit attribution); C-002/C-003 hold as states but lack citable logs; C-004/C-006 are unexecuted; C-005 is definitionally pending execution. Residual going into gate: **Medium** — bounded, fail-closed mechanics hold, but the gate cannot claim Low until C-002/C-003 carry log/snapshot paths and C-004/C-006 close with drill + dry-run evidence. No silent PASS.

## Blast Radius

- **Systems:** repo-local `.worktrees/<spec-id>` lanes (max 2), `.gitignore` single hunk (`:55-56`), `skills/git-worktree/` (5 files: SKILL + 4 references). Toolchain probes only (`check-ignore`, `worktree list`, `rg`/`Select-String`, `mise run typecheck`) — no runtime (`.opencode/plugins/frame-ship.ts`), no chain order, no catalogue changes. Failure contained to scratch lanes; `main` never blocked (dirty-refuse, ignore-STOP, red-STOP, remove+prune restore).
- **Teams:** orchestrator (dispatch ≤ 2, consent, TTL, mutex) + engineering (skill shape) + automation/ops (serialized setup, capacity, cleanup) + security (gates, boundaries, scans) + people (consent/announce/refusal wording) — coordinated via Cross-domain requests, no unilateral cross-domain edits. Third dispatch waits or escalates, never sideways.
- **Customers:** none directly (internal isolation control); indirect benefit is reduced leakage/contamination risk in parallel delivery. No customer-facing behavior changes.
- **Regulators:** Ley 172-13 (Dominican data protection) — minimization, checkpoint masking, purpose + TTL + deletion, scoped exports. Primary exposure is PII/secret leak via paths, logs, or gate evidence (R-002 class); currently 0-hit state confirmed by spot-check but rescan proof still owed at gate (C-002).
- **Revenue:** no direct pipeline/quota impact; indirect cost is rework and gate re-runs if ignore gate or scans fail — bounded by proposal-before-code (failure caught before implementation spend) and workspace-only rollback (one turn-batch).

## Rollback Adequacy

Adequate — all four proposals scope rollback to workspace-only revert with owner + ETA, no prod/data/key effects:

- Engineering: live test worktree `remove --force` + `prune` + `list` verify; revert `.gitignore` hunk (`checkout --` pre-commit, revert commit post-merge); delete `skills/git-worktree/`; confirm `status --porcelain` empty + typecheck green. Owner engineering (vasquez), ETA one turn-batch.
- Automation: worktree-scoped only (no workflows executed yet) — `remove --force` → `prune` → `list` + `.worktrees/` empty-or-absent; discard proposal doc pre-commit or `git revert` post-merge; confirm `status --porcelain` empty. Owners automation + engineering, ETA one turn-batch.
- Security: proposal phase revert = delete scratch proposal file; post-execution = follow-up proposal removing `guards.md` sections + revert `.gitignore` line + `remove`/`prune`/`list`. Owners security + engineering, ETA one session batch. No keys/perms touched — owner remediates live findings separately.
- People: retract comms only (correction notice, fall back to manual consent phrasing, withdraw Cross-domain brief if filed). Owner santana, ETA same session.

Caveat (ties to RK-003): with the baseline dirty, "rollback now = checkout/stash" would also discard the C-001 fix — revert order must land or explicitly carry the `.gitignore` hunk, not blindly stash. No wall-clock kill bound on hung installer (RL-001/RS-009) is a Low hygiene gap in rollback timing, not in rollback path.

## Findings

| ID | Severity | Location | Finding + Proof |
|----|----------|----------|-----------------|
| RK-001 | Medium | C-002/C-003/C-004/C-006 evidence | Residual Medium, not Low: C-004 drill log absent (no `submodule status` output in any matrix/verdict); C-006 dry run unexecuted (people matrix slots `<path-or-session-ref>` unfilled, "carried, not closed here"); C-002/C-003 states confirmed by refuter probes but lane citations are unpathed "session shell log(s)" (refuter RF-004). Gate must attach log paths + `list` snapshots + rescan proof and close drill + dry run before residual drops to Low. |
| RK-002 | Medium | `skills/git-worktree/SKILL.md:45-47` vs `skills/git-worktree/references/` + SKILL §3 steps 1/3/4 | §5 drift raises scope risk: §5 lists 1/4 references (`worktree-lifecycle.md` only) while §3 normatively consumes `guards.md`, `pwsh-flow.md`, `announce-template.md` (glob returns 4 files). Proof confirms readability RD-001 / refuter RF-001. Risk: security/automation/people lanes undiscoverable from skill entry → operators skip gates or improvise wording. Fix is 3 §5 lines (required, flips with readability/refuter). |
| RK-003 | Medium | Repo baseline 2026-09-16 (this-session `git status --porcelain`) | Dirty baseline is a contamination risk for the gate: `M .gitignore`, `M AGENTS.md`, `M README.md`, `?? docs/specs/40_workspace/quality-gate/git-worktree/`. Proof: same output reproduced this session. Per `worktree-lifecycle.md:20-26` + `pwsh-flow.md:30-38` + SKILL §3.2, non-empty means REFUSE `git worktree add` without session-recorded `override: <who> <timestamp> <reason>`. Gate must record override or land clean before any lane creates; C-001 green currently rides an uncommitted hunk. |
| RK-004 | Low | `skills/git-worktree/references/guards.md:33` vs `worktree-lifecycle.md:31` + `pwsh-flow.md:45`; `guards.md:44-46` vs `.gitignore:55-56` | Stale guard text + slash drift: `guards.md:33` bare `check-ignore -q .worktrees` vs canonical trailing-slash form; this-session probe slash exit 0 / bare exit 1 (no `.worktrees/` dir on disk) — copy-paste from guards STOPs on fresh clones (same as RD-003/RF-002). `guards.md:44-46` still records "entry absent, probe exits 1" while `.gitignore:55-56` entry is landed and slash probe is green (same as RF-006). Fix: slash form + one-line re-attestation; rides gate as hygiene. |
| RK-005 | Low | `skills/git-worktree/references/pwsh-flow.md:88-93` (§§3–4) | No wall-clock timeout on serialized installer mutex / external calls (`worktree add`, `mise install`, `typecheck`): waiter "waits" with escalation as the only bound; hung holder has no stated kill bound (same as RL-001/RS-009). Overlap prevented, failure STOP-and-fix-forward, escalation bounds the wait — hygiene only, rides gate, no handoff block. |

No finding above lacks proof; any claim without diff/scan/log ref would be REFUTED — none made here without one. No Critical/High risk findings; nothing surfaces same-session beyond this Conditional record per guardrails 9–11.

## Rationale

Conditional, not pass: mechanics are sound (dirty-refuse, ignore-STOP, red-STOP, max-2 guard, remove+prune restore, reference-only packets all pinned with file:line contracts, and the three probeable states hold — slash-ignore green, count 1 ≤ 2, 0-hit scans), but residual is Medium until C-002/C-003 carry citable logs and C-004/C-006 close — claiming Low now would be a silent PASS. Conditional, not fail: no counterexample breaks the lifecycle, and every Medium has a defined mitigation with an owner (RK-001 → lane owners attach logs/run drill + dry run; RK-002 → 3-line §5 fix; RK-003 → record override or land clean). Required to flip this review to pass: C-002/C-003 log + snapshot paths, C-004 drill log or none-needed statement, C-006 2-SPEC dry-run excerpts + announce count, RK-002 §5 fix, RK-003 override-or-clean record. RK-004/RK-005 ride as hygiene in the same pass. Verdict feeds gate synthesis; gate stays CONDITIONAL until readability/refuter/security conditions clear alongside these.
