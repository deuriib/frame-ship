# Test Matrix: Multi-default mechanics — Engineering Lane (vasquez)

**Spec:** `docs/specs/20_backlog/SPEC-multi-default-engineering.md` (REQ-001..007 + NF-001/002)
**Proposal:** `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md`
**Date:** 2026-09-20
**Skill:** `frame-ship:execute-spec` (loaded per mandatory order after `frame-ship:using-frame-ship`; role: engineering owner per `skills/execute-spec/SKILL.md` §2b + `skills/AGENTS.md` domain catalogue #1)

> **Singleton note:** canonical `docs/specs/40_workspace/engineering/TEST_MATRIX.md` slot (create-if-missing else update-in-place, never suffix). Prior content (Grilling lane) superseded, recoverable from git history.

## REQ → Test → Artifact Trace

| ID | Requirement | Test / Evidence | Artifact | Result |
|----|-------------|-----------------|----------|--------|
| E-001 | REQ-001 (translate-to-spec §3 + spec-template multi-only) | `grep -rn "single" skills/translate-to-spec/` → 0 hits post-change; read-through: pre-flight carries W-MULTI verbatim (1×), dispatch carries W-SEQ verbatim (1×); `spec-template.md:9` = multi-only CEO-waiver line | `skills/translate-to-spec/SKILL.md`, `skills/translate-to-spec/references/spec-template.md` | PASS |
| E-002 | REQ-002 (execute-spec §3 multi-only) | `grep -rn "single" skills/execute-spec/` → 0 mode-branch hits (2 allowlisted `singleton`/`the single TEST_MATRIX` lines only); W-MULTI 1×, W-SEQ 1× exact-match; §2 support line multi-only; singleton lines byte-identical | `skills/execute-spec/SKILL.md` | PASS |
| E-003 | REQ-003 (quality-gate §3 full-wave único + gate-report) | `grep -n "single" skills/quality-gate/SKILL.md skills/quality-gate/references/gate-report.md` → 0 hits; min-gate block removed; full-wave + refuter-before-qa + W-SEQ 1×; `gate-report.md:75` = multi-only | `skills/quality-gate/SKILL.md`, `skills/quality-gate/references/gate-report.md` | PASS |
| E-004 | REQ-004 (proposal-template + dod-checklist mode lines) | `grep -n "single" skills/propose-changes/references/proposal-template.md skills/verify-handoff/references/dod-checklist.md` → 0 hits; both lines declare `multi-subagents`; non-mode content byte-identical | `skills/propose-changes/references/proposal-template.md`, `skills/verify-handoff/references/dod-checklist.md` | PASS |
| E-005 | REQ-005 (git-worktree norm) | `grep -n "single" skills/git-worktree/SKILL.md` (lowercase) → 0 hits; `Single writer per file` (capital-S concurrency rule) kept per allowlist; line 34 = multi-only norm | `skills/git-worktree/SKILL.md` | PASS |
| E-006 | REQ-006 (AGENTS contract lines) | `grep -n "single" skills/AGENTS.md` → 0 hits; line 33 = multi-only; `AGENTS.md` root + `docs/AGENTS.md` + `docs/specs/AGENTS.md` verify-only: hits are allowlisted (`single-file` ×2, `*-single-dispatcher.md` trace example, `single-demo/` exception) — no change | `skills/AGENTS.md` (+ verify-only layers) | PASS |
| E-007 | REQ-007 (ADR-008 filed proposed) | Filing proof: `docs/specs/10_design/ADR-008-multi-default.md` exists, status proposed, carries decision + W-MULTI/W-SEQ verbatim + fast-path boundary + rollback; ADR-001..007 untouched | `docs/specs/10_design/ADR-008-multi-default.md` | PASS |
| E-NF-001 | REQ-NF-001 (docs-only, reversible, masked, history intact) | `git status --porcelain` shows only lane files (no `50_archive/`, no old ADRs, no past BRIEFs, no runtime `*.ts`); secret/PII pattern scan over diff → 0 findings; per-commit `git revert` rollback | git status + scan log (below) | PASS |
| E-NF-002 | REQ-NF-002 (zero live `single` as mode) | Lane-wide `grep -rn "single"` over the 10 touched surfaces → 0 mode-branch hits; remaining: 2 allowlisted `singleton`/`the single` lines (execute-spec) + capital-S `Single writer` (git-worktree) + historical/allowlisted AGENTS-layer hits — all logged in proposal §Allowlist | grep log (below) | PASS |

## Scoped Evidence (execute-spec phase)

- Pre-change grep (lane targets): `spec-template.md:9` dual-mode line; `translate-to-spec/SKILL.md:27` `(single AND multi)` + `Single = direct` branch; `execute-spec/SKILL.md:30` `('single' or 'multi-subagents')` + `single:` dispatch branch; `quality-gate/SKILL.md:50` min-gate `single:` branch + `gate-report.md:75` dual-mode line; `proposal-template.md:6` dual-mode line; `skills/AGENTS.md:33` dual-track frozen line; `dod-checklist.md`/`git-worktree` no lowercase-`single` mode branch (retouched to name multi-only norm).
- Post-change grep (lane targets): lowercase `single` → 2 hits, both allowlisted (`Singleton: the single IMPLEMENTATION_PLAN.md`, `Singleton: the single TEST_MATRIX.md` in `execute-spec/SKILL.md` — singleton discipline, not mode branch). Zero mode-branch hits. W-MULTI exact-match: 1× translate-to-spec, 1× execute-spec. W-SEQ exact-match: 1× translate-to-spec, 1× execute-spec, 1× quality-gate. Diff-0 vs people SPEC §4 confirmed via `grep -F` counts.
- `git status --porcelain` (lane scope): 10 modified (3 SKILL §3 blocks + spec-template + gate-report + proposal-template + dod-checklist + git-worktree + skills/AGENTS.md) + 1 created (ADR-008) + plan/matrix singletons updated. `50_archive/` untouched; no runtime/plugin change; no new deps.
- Commits: one per REQ group (see SHAs below), each body links REQ→test→artifact.

## Commits

| Commit | REQ group | Files |
|--------|-----------|-------|
| `a282881` | REQ-001 | translate-to-spec SKILL + spec-template |
| `35f83be` | REQ-002 | execute-spec SKILL |
| `7beb7cd` | REQ-003 | quality-gate SKILL + gate-report |
| `3484ce5` | REQ-004 | proposal-template + dod-checklist |
| `5780887` | REQ-005+006 | git-worktree SKILL + skills/AGENTS.md |
| `33717cd` | REQ-007 | ADR-008 create |
| `2b54530` | Trace | IMPLEMENTATION_PLAN + TEST_MATRIX (this file) |

## Gate Handoff Packet

`SPEC:docs/specs/20_backlog/SPEC-multi-default-engineering.md#REQ-001..007+NF-001..002 / HARD:multi-subagents+docs-only,reversible,masked,history-intact,max-2 / GATE:security-APPROVE(barrera)+arch-CONDITIONAL(vasquez, 4 closable) / DOMAINS:[engineering]` — W-DEP-1 fidelity (diff-0) + barrera attestation close at gate.
