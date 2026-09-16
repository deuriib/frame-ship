# Archive Record: git-worktree isolation (supporting skill)

**ID:** SPEC-git-worktree
**Owner:** automation owner (+ engineering owner for ops mechanics)
**Brief Reference:** docs/briefs/BRIEF-git-worktree.md (read-only, not modified)
**Status:** shipped (terminal — read-only, never edit in place; supersede with a new ID)
**Priority:** P0
**Execution_Mode:** multi-subagents (max 2 lanes, frozen at frame-intent)
**Gate:** OPEN 9/9 v2 — docs/specs/40_workspace/quality-gate/git-worktree/GATE_REPORT.md (no waiver)
**DoD:** 47/47 aggregate across 4 lane handoffs (12 eng + 12 auto + 12 sec + 10 people + gate 9/9 counted once; see §5)

## 1. Superseding Summary (what shipped)

Supporting skill `skills/git-worktree/` — orchestrator habit + `execute-spec`
isolation contract, not a stage. Chain
`frame-intent → … → ship-release` unchanged; plugin single-file zero-dep
untouched; 8-domain catalogue unchanged.

| Shipped | Path |
|---------|------|
| Skill contract | `skills/git-worktree/SKILL.md` (frontmatter exact `name: git-worktree`, body Title + creed + §1–§5; §5 resolves 4/4) |
| Lifecycle sequence | `skills/git-worktree/references/worktree-lifecycle.md` (create → verify → remove, branch-per-SPEC) |
| Win32 flow | `skills/git-worktree/references/pwsh-flow.md` (§§0–7, pwsh-only, serialized mise, mutex bound) |
| Fail-closed policy | `skills/git-worktree/references/guards.md` (§§1–9: boundary 4/4, slash-canonical, least-privilege, PII checkpoints, submodule, sandbox, allowlist, no-freelance-fixes) |
| Announce contract | `skills/git-worktree/references/announce-template.md` (§§1–5: uniform create/remove wording, consent + refusal + fatigue guard) |
| Ignore gate | `.gitignore:55-56` (`.worktrees/` trailing-slash; `git check-ignore -q .worktrees/` exit 0, `git ls-files -- .worktrees/` empty) |

Owner→domain convention (single writer per lane, no sideways edits):
`engineering owner → engineering` · `automation owner (+ engineering for ops
mechanics) → automation/ops` · `security owner (barrera lens) → security` ·
`santana (people owner) → people`.

## 2. Contract Links (paths only, by reference)

- Specs (4): `docs/specs/20_backlog/SPEC-git-worktree-engineering.md#REQ-001..008` · `docs/specs/20_backlog/SPEC-git-worktree-automation.md#REQ-AUTO-001..007` · `docs/specs/20_backlog/SPEC-git-worktree-security.md#REQ-SEC-001..008` · `docs/specs/20_backlog/SPEC-git-worktree-people.md#REQ-PPL-001..005`
- Architecture + decision: `docs/specs/10_design/ARCHITECTURE-git-worktree.md` (INV-001..009) · `docs/specs/10_design/ADR-004-git-worktree.md` · `docs/specs/40_workspace/engineering/ARCHITECTURE_REVIEW-git-worktree.md`
- Gate: `docs/specs/40_workspace/quality-gate/git-worktree/GATE_REPORT.md` (OPEN v2, 9/9 pass) + per-reviewer verdicts in `docs/specs/40_workspace/quality-gate/git-worktree/` (`readability.md`, `reliability.md`, `refuter.md`, `resilience.md`, `risk.md`, `qa.md`, `security-reviewer.md`, `automation-reviewer.md`, `people-reviewer.md`)
- Handoffs (4): `docs/specs/40_workspace/engineering/HANDOFF-git-worktree.md` · `docs/specs/40_workspace/automation/HANDOFF-git-worktree.md` · `docs/specs/40_workspace/security/HANDOFF-git-worktree.md` · `docs/specs/40_workspace/people/HANDOFF-git-worktree.md`
- Drill note: `docs/specs/40_workspace/engineering/DRILL-git-worktree-2spec.md` §§1–5 (2-SPEC dry run, residue-free; packet alias `docs/specs/40_workspace/vasquez/DRILL-git-worktree-2spec.md` does not exist — alias recorded in gate §Path Alias Correction, zero contract impact)
- Skill: `skills/git-worktree/` (`SKILL.md` + 4 refs above)

## 3. Per-Domain Artifact Index

- Engineering (`docs/specs/40_workspace/engineering/`): `PROPOSED_CHANGES-git-worktree-engineering.md` · `IMPLEMENTATION_PLAN-git-worktree-engineering.md` · `TEST_MATRIX-git-worktree-engineering.md` (8/8 REQ-IDs) · `PROPOSED_CHANGES-git-worktree-automation.md` + `IMPLEMENTATION_PLAN-git-worktree-automation.md` + `TEST_MATRIX-git-worktree-automation.md` (7/7, automation lane authored here) · `DRILL-git-worktree-2spec.md` · `ARCHITECTURE_REVIEW-git-worktree.md` · `HANDOFF-git-worktree.md`
- Automation/ops (`docs/specs/40_workspace/automation/`): `HANDOFF-git-worktree.md` (lane gate; runbook/matrix/drill live in skill + engineering paths above by reference)
- Security (`docs/specs/40_workspace/security/`): `PROPOSED_CHANGES-git-worktree-security.md` · `IMPLEMENTATION_PLAN-git-worktree-security.md` · `TEST_MATRIX-git-worktree-security.md` (8/8) · `SECURITY_REVIEW-git-worktree.md` (Conditional → cleared C-001..C-006) · `THREAT_MODEL-git-worktree.md` (STRIDE) · `HANDOFF-git-worktree.md`
- People (`docs/specs/40_workspace/people/`): `PROPOSED_CHANGES-git-worktree-people.md` · `IMPLEMENTATION_PLAN-git-worktree-people.md` · `TEST_MATRIX-git-worktree-people.md` (5/5, C-006 evidenced) · `HANDOFF-git-worktree.md`
- Lane matrices preserved in `40_workspace` (canonical scratch); nothing copied here — this record links, never pastes.

## 4. Rollback / Undo Plan

Revert (text, no worktree state involved):
`git checkout -- skills/git-worktree/` + revert the `.gitignore` hunk
(`.gitignore:55-56`, `.worktrees/` entry from SPEC-git-worktree-engineering
REQ-002 / C-001).

Residue (if lanes were ever live): `git worktree remove --force` per lane →
`git worktree prune` → verify `git worktree list` back to main-only (drill §4
demonstrated this sequence residue-free 2026-09-16).

Owner: engineering owner + automation owner. ETA: < 15 min (text revert +
verify; no data, no deploys, no external filings to retract).

## 5. Lessons Pointer (owning C-levels capture in HANDOFFs)

No standalone lessons file — chain close rule: lessons live with the owning
lane handoff on PASS. What each handoff holds:

- `docs/specs/40_workspace/engineering/HANDOFF-git-worktree.md` — skill-shape lesson (frontmatter exact, §5 4/4, zero-POSIX scan) + changelog N/A justification (internal supporting skill) + COND-004 override pointer (out-of-scope `M AGENTS.md`/`M README.md`, orchestrator override recorded in gate).
- `docs/specs/40_workspace/automation/HANDOFF-git-worktree.md` — ops lesson (drill residue-free sequence, mutex bound, TTL co-sign) + future-run note (live timestamped setup logs + green-in-worktree typecheck stay orchestrator-aggregated, non-blocking).
- `docs/specs/40_workspace/security/HANDOFF-git-worktree.md` — security lesson (scoped-export allowlist, probe-pattern vs real-secret scan discipline, no-freelance-fixes) + cross-lane notes (ignore entry owned by engineering lane; sandbox TTL rides orchestrator confirm; announce owned by people lane).
- `docs/specs/40_workspace/people/HANDOFF-git-worktree.md` — people lesson (exactly-once uniform announce, fatigue guard, team impact minimal 2+0) + AC-005 brief-back outcome (none needed — no Cross-domain request filed) + packet path-alias note (admin, non-blocking).

## 6. Traceability

| Requirement | Evidence | Gate |
|-------------|----------|------|
| REQ-001..008 (eng) | `docs/specs/40_workspace/engineering/TEST_MATRIX-git-worktree-engineering.md` 8/8 | GATE_REPORT v2 OPEN |
| REQ-AUTO-001..007 | `docs/specs/40_workspace/engineering/TEST_MATRIX-git-worktree-automation.md` 7/7 | automation-reviewer pass 3/3 |
| REQ-SEC-001..008 | `docs/specs/40_workspace/security/TEST_MATRIX-git-worktree-security.md` 8/8 | security-reviewer pass 5/5, 0 Crit/High |
| REQ-PPL-001..005 | `docs/specs/40_workspace/people/TEST_MATRIX-git-worktree-people.md` 5/5 | people-reviewer pass, P-001 cleared via drill |
