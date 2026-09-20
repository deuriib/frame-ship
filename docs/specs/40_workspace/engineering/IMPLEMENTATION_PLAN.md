# Implementation Plan: Multi-default mechanics — Engineering Lane

**Agent:** vasquez (engineering owner)
**Date:** 2026-09-20
**Proposal:** `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` (approved substance; REQ-001..007 + REQ-NF-001/002)
**Spec Reference:** `docs/specs/20_backlog/SPEC-multi-default-engineering.md#REQ-001..007+NF-001..002` (by reference)
**Brief:** `docs/briefs/BRIEF-multi-default.md` (approved 2026-09-20 — condition 3 satisfied)
**Execution_Mode:** multi-subagents (frozen at frame-intent; single-session, docs-only, reversible via per-commit `git revert`)
**Domains-Touched:** [engineering]
**Approvals:** security APPROVE (barrera, no conditions) · arch CONDITIONAL (vasquez, 4 closable: ADR-008 filed proposed; gate re-verifies grep-0+diff-0; BRIEF-approved DONE; barrera attestation at gate)

> **Singleton note:** canonical `docs/specs/40_workspace/engineering/IMPLEMENTATION_PLAN.md` slot per execute-spec discipline (create-if-missing else update-in-place, never suffix). Prior content (Grilling C1+C2, 2026-09-18) is superseded by this unit and recoverable from git history (`git log -- docs/specs/40_workspace/engineering/IMPLEMENTATION_PLAN.md`); same for `TEST_MATRIX.md`.

## Steps

| Step | REQ | Description | Target / Files | Evidence Location |
|------|-----|-------------|----------------|-------------------|
| 1 | REQ-001 | Rewrite `translate-to-spec` §3 pre-flight + dispatch + carry-forward to multi-only (W-MULTI + W-SEQ verbatim); `spec-template.md:9` Execution_Mode multi-only | `skills/translate-to-spec/SKILL.md`, `skills/translate-to-spec/references/spec-template.md` | TEST_MATRIX.md E-001 |
| 2 | REQ-002 | Rewrite `execute-spec` §3 mode-confirm + dispatch to multi-only (W-MULTI + W-SEQ verbatim); §2 support line multi-only; singleton lines unchanged | `skills/execute-spec/SKILL.md` | TEST_MATRIX.md E-002 |
| 3 | REQ-003 | Rewrite `quality-gate` §3 execution-mode block (min-gate removed, full-wave único + refuter-before-qa + W-SEQ); `gate-report.md:75` load-evidence multi-only | `skills/quality-gate/SKILL.md`, `skills/quality-gate/references/gate-report.md` | TEST_MATRIX.md E-003 |
| 4 | REQ-004 | Retouch mode lines in `proposal-template.md:6` + `dod-checklist.md:14` to multi-only; non-mode content byte-identical | `skills/propose-changes/references/proposal-template.md`, `skills/verify-handoff/references/dod-checklist.md` | TEST_MATRIX.md E-004 |
| 5 | REQ-005 + REQ-006 | `git-worktree` §3 norm touch-up (multi-only ref; `Single writer` allowlist kept) + `skills/AGENTS.md:33` frozen-mode line multi-only; AGENTS layers verify-only (no dual-track quotes) | `skills/git-worktree/SKILL.md`, `skills/AGENTS.md` | TEST_MATRIX.md E-005/E-006 |
| 6 | REQ-007 | File ADR-008 (status proposed) per proposal draft: decision + W-SEQ verbatim + fast-path boundary + rollback | `docs/specs/10_design/ADR-008-multi-default.md` (create) | TEST_MATRIX.md E-007 |
| 7 | NF-001/NF-002 | Evidence sweep: lane grep-0 mode-branch (allowlist logged), W-MULTI/W-SEQ diff-0, `git status` lane-only, secret/PII scan 0, archive untouched | diff + status | TEST_MATRIX.md E-NF-001/E-NF-002 |
| 8 | — | Commits: one per REQ group with REQ→test→artifact in body; hand off to quality-gate with packet intact | git | commit SHAs in TEST_MATRIX.md |

## Order of Operations

Steps run 1→8. Skill-text edits (1–5) land before ADR filing (6) so the ADR describes shipped wording, not draft intent. Evidence sweep (7) runs on the final diff — grep proof is meaningless on partial state. Commits (8) split strictly by REQ group: REQ-001, REQ-002, REQ-003, REQ-004, REQ-005+006, REQ-007, trace — never batch unrelated REQs.

## Rollback Points

Rollback point after any step: `git checkout -- skills/ docs/specs/10_design/ADR-008-multi-default.md` + delete ADR-008 if created; post-commit rollback is `git revert <sha>` per REQ group (commits never batch REQs, so revert is surgical). ETA < 15 min; owner vasquez. No data migration, no prod surface.

## Quality Gates

- [ ] Engineering: line-scoped diff review (mode lines only, non-mode byte-identical) + lane grep-0 + W diff-0
- [ ] Security: barrera text-only wording review attestation at gate (no auth/data/API surface)
- [ ] People: santana DEP-1 wording-fidelity ratification (W-MULTI/W-SEQ diff 0) at gate
- [ ] Privacy (Ley 172-13): zero PII/secrets in diff; role handles are session personas; masked allowlisted evidence only

Scope guard: implement ONLY the approved change list. Any need beyond it → STOP + new proposal, never freelance. Any need beyond [engineering] → formal Cross-domain request to orchestrator (montilla), never sideways.
