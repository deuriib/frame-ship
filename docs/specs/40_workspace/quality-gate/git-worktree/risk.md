# Risk Review: SPEC-git-worktree — RE-CHECK (fix loop N=1)

**Reviewer:** review-risk (operational / regulatory / business risk lens)
**Date:** 2026-09-16
**Verdict:** pass
**Skill:** skill(frame-ship:quality-gate) — routing table row "engineering → review-risk"; risk has no dedicated engineering checklist file (SKILL lists 5; risk rides the fast-gate shape per prior `single-dispatcher/risk-review.md` precedent)
**Packet:** SPEC: skills/git-worktree/ post-fix (§5 4/4) + TEST_MATRIX post-fix (engineering, automation, security, people) + drill note `docs/specs/40_workspace/engineering/DRILL-git-worktree-2spec.md` + prior verdict `docs/specs/40_workspace/quality-gate/git-worktree/risk.md` (conditional RK-001..RK-005) / HARD: execution_mode=multi-subagents, residual explicit (no silent PASS), finding w/o proof = REFUTED / GATE: CONDITIONAL → re-check RK-001..RK-005 (logs pathed? §5 fixed? dry run executed? override recorded? hygiene closed?) / DOMAINS: [engineering, automation/ops, security, people]
**Role note:** I understand the risk-reviewer role first — assess residual, blast radius, and rollback adequacy; I never approve my own work (wrote no git-worktree content). Fix loop N=1, retry 1 of 2.
**Path alias (recorded):** packet cited `docs/specs/40_workspace/vasquez/DRILL-git-worktree-2spec.md`; file verified at `docs/specs/40_workspace/engineering/DRILL-git-worktree-2spec.md` (same for TEST_MATRIX files — `engineering/` is authoritative, `vasquez/` is a stale alias). Content verified regardless; orchestrator to correct the reference at re-gate.
**Sibling re-checks (by reference):** security-pass, refuter-pass, automation-pass, readability-conditional (1 Low RD-002 `$root` only).

## Residual Reassessment

**Residual: Low. Owner: engineering owner (vasquez) + orchestrator (gate aggregation).**

Going-in residual was Medium (C-002/C-003 unpathed, C-004/C-006 unexecuted). All five prior risk findings clear with proof below. What remains is hygiene, not risk: readability RD-002 (`$root` → `$worktreeRoot` rename, Low, owned by engineering/vasquez, out of risk scope, no handoff block) plus orchestrator-aggregated pendings honestly marked conditional-pass in-matrix (timestamped setup logs, `typecheck`-green drill — automation lane, no live overlap claimed). Blast radius unchanged and contained (repo-local lanes, workspace-only rollback, no customer/prod surface). Rollback now drill-EXECUTED (DRILL §4: remove ×2 + prune + list-back-to-main-only + branch delete + residue check, all exit 0), not just defined. No silent PASS — residual is stated Low with owners, not zero.

## Findings (current-state)

| ID | Severity | Location | Finding + Proof |
|----|----------|----------|-----------------|
| RK-001 | — (cleared, was Medium) | C-002/C-003/C-004/C-006 evidence | CLEARED. C-002 pathed: sec T-004 0 real values (tight-pattern sole match is the documented probe-pattern string at `guards.md:71`, SSN 0, email 0, 2026-09-16) + eng C-002 tight-pattern 0 hits + auto `rg -c '\$\('` exit 1 (0 POSIX hits, cross-checked `Select-String` Count 0); refuter confirms `Select-String "session shell log"` over all 4 matrices → 0 hits (no unpathed cites remain). C-003 pathed: eng `git worktree list` → 1 entry (`D:/GitHub/frame-ship 923a16f [main]`, 1 ≤ 2) + auto drill-time list → 2 entries ≤ 2 + live main-only re-probes (security, automation, refuter). C-004 none-needed: sec T-005 `git submodule status` empty exit 0 + `Test-Path .gitmodules` False (2026-09-16); guard + drill steps pinned in `guards.md` §5. C-006 executed: DRILL §2 (ANNOUNCE-001/002, 2/2 exactly-once) + §3 (list 1→2→3-incl-main) + §4 (cleanup executed, residue-free CONFIRMED) + §5 excerpt paths/counts; people matrix §C-006 fills excerpt paths + counts pointing at DRILL §§1/2/4 + override record. |
| RK-002 | — (cleared, was Medium) | `skills/git-worktree/SKILL.md:45-50` | CLEARED. §5 now lists 4/4 references (`worktree-lifecycle.md`, `guards.md`, `pwsh-flow.md`, `announce-template.md`); verified by direct read + refuter (lane diff `SKILL.md \| 3 +++`), automation AUT-002, readability RD-001. Security/automation/people lanes discoverable from skill entry; no drift. |
| RK-003 | — (cleared, was Medium) | Repo baseline + override record | CLEARED via recorded override (accepted, not a violation). Override: `override: orchestrator 2026-09-16 COND-004-proceed-documented-dirty-baseline` (DRILL §1 + §5) with dirty disposition (in-scope `M .gitignore` own lane; out-of-scope `M AGENTS.md`, `M README.md` never touched, never in diff-stat). Scope verified: lane diff `--name-only -- skills/git-worktree/ .gitignore` = 4 files only; `git diff -- AGENTS.md README.md` carries zero worktree content (refuter + security S-GATE-004). Next `add` still requires override-or-clean per skill §3 step 2 — rule holds, this instance is documented. |
| RK-004 | — (cleared, was Low) | `skills/git-worktree/references/guards.md:32-50` | CLEARED. Slash-canonical gate block (`git check-ignore -q .worktrees/`, §2 line 33) + spelling-independent rule (§§36-38) + refreshed observation (§§44-47: 56 lines, entry `:55-56`, slash exit 0 green on fresh clones, bare exit 1 = dir-existence variant only, never the probe). Matches `worktree-lifecycle.md:31` + `pwsh-flow.md:45`. Confirmed by security S-GATE-003, refuter RF-002/RF-006, readability RD-003. |
| RK-005 | — (cleared, was Low) | `skills/git-worktree/references/pwsh-flow.md:95-102` | CLEARED. Installer-mutex waiter now wall-clock bounded: `AddMinutes(10)` + `STOP: mutex wait exceeded, notify orchestrator` + 30s sleep loop, notify-only (never kills another lane's installer). Verified by automation AUT-003 (rg-verified text). Overlap prevented, failure STOP-and-fix-forward, escalation bounds the wait — hygiene closed. |

No finding above lacks proof; any claim without diff/scan/log ref is REFUTED — none made here without one. No Critical/High risk findings; no new findings opened. Cleared 5/5, persisting 0/5.

## Blast Radius (re-check — unchanged, contained)

- **Systems:** repo-local `.worktrees/<spec-id>` lanes (max 2), `.gitignore` single hunk (`:55-56`), `skills/git-worktree/` (SKILL + 4 references). Drill proved max-2 live and residue-free return to main-only. No runtime (`.opencode/plugins/frame-ship.ts`), no chain order, no catalogue changes.
- **Teams:** orchestrator (dispatch ≤ 2, consent, TTL, mutex, COND-004 override) + engineering + automation/ops + security + people — coordinated via Cross-domain requests, no unilateral cross-domain edits.
- **Customers / Revenue:** none directly (internal isolation control); indirect benefit is reduced leakage/contamination risk. No customer-facing changes; rework cost bounded by proposal-before-code + workspace-only rollback.
- **Regulators (Ley 172-13):** minimization + checkpoints + purpose/TTL/deletion + scoped exports all pinned (`guards.md` §§4/6/7); 0 secret/PII values per dated scans; exports allowlisted only (paths + exit codes + counts, zero bodies).

## Rollback Adequacy (re-check — now EXECUTED)

Previously adequate-as-defined; now adequate-and-drilled: DRILL §4 executed `remove --force` ×2 + `prune` + `list` back to main-only + branch delete + `Test-Path` False ×2 + `status --porcelain -- .worktrees/` empty + `branch --list "drill/*"` empty → residue-free CONFIRMED, all exit 0. Per-lane workspace-only reverts (engineering/automation/security/people) unchanged with owner + one-turn-batch ETA; revert order must still land-or-carry the `.gitignore` hunk, not blindly stash (RK-003 caveat carries). No wall-clock kill gap remains (RK-005 bound). No prod/data/key effects in any rollback path.

## Rationale (per prior finding)

- RK-001 cleared: the load-bearing gap (unpathed states + unexecuted drill/dry-run) is closed — C-002/C-003 carry pathed log/snapshot/scan proof across all four matrices + live re-probes, C-004 carries a none-needed drill statement with probe proof, C-006 carries an executed dry run with exactly-once counts + excerpt paths + residue-free snapshots. Residual drops Medium → Low on this basis.
- RK-002 cleared: §5 drift fixed (4/4 listed) — scope risk gone, confirmed by three sibling re-checks.
- RK-003 cleared: dirty-baseline contamination risk converted to a recorded, scoped override — rule honored, out-of-scope files verified untouched.
- RK-004/RK-005 cleared: both hygiene items landed verbatim (slash form + re-attestation; 10-min notify-only bound).
- Pass, not conditional: zero Medium/High remains; the single remaining Low (RD-002 naming, engineering-owned, out of risk scope) rides the gate report per guardrails 9–11 and does not block handoff on the risk axis. Fail would overstate — no counterexample breaks the lifecycle, the fail-closed ignore gate, the max-2 guard, or the scan posture (refuter could not falsify, 6/6 cleared).
