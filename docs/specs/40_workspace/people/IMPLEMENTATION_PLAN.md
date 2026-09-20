# Implementation Plan: Multi-Default Wording — People Lane (execute-spec)

**Spec:** `docs/specs/40_workspace/people/SPEC-multi-default-people.md#REQ-F-001..007+REQ-NF-001..006` | **Owner:** santana (people owner — `skills/AGENTS.md` domain #6 people → people owner; role understood before acting per `skills/using-frame-ship/SKILL.md §3.0.3`) | **Date:** 2026-09-20
**Mode:** multi-subagents (frozen at BRIEF-multi-default, inherited via SPEC header; docs-only lane, repo-direct, no worktree) — skill `frame-ship:execute-spec`
**Proposal:** `docs/specs/40_workspace/people/PROPOSED_CHANGES.md` §Diff plan 1–5 (approved substance; impl files untouched pre-execution — verified by reads 2026-09-20)

## Objective

Apply the approved proposal verbatim: 5 skill-surface files to multi-only wording (W-MULTI / W-SEQ / W-BRIEF-MODE / W-INTENT-STEP3 / W-PPL-GATE), zero scope beyond §Changes.

## Steps

1. **Group A — using-frame-ship surfaces (REQ-F-001/002/005/006):** edit `skills/using-frame-ship/SKILL.md` §3 (L38 + L41 + L65–67 block → W-MULTI + W-SEQ verbatim) and `skills/using-frame-ship/references/bootstrap-checklist.md` (L10 + L11 → W-MULTI + W-SEQ pointer). Verify: `grep -n "single" SKILL` = 0; `grep -n "single.*direct.*no task" checklist` = 0. Commit 1.
2. **Group B — frame-intent surfaces (REQ-F-003/004):** edit `skills/frame-intent/SKILL.md` §3 (L32 + L39 → W-INTENT-STEP3 verbatim + override-clause retained + L45 scope-check reword) and `skills/frame-intent/references/product-brief.md` (L7 → W-BRIEF-MODE verbatim). Verify: `grep -n "Ask execution mode once"` = 0; `grep -n "single | multi"` = 0. Commit 2.
3. **Group C — people-reviewer criteria (REQ-F-007):** append W-PPL-GATE 3 inserts to `skills/quality-gate/references/domains/people-review.md` Checklist (additive, hygiene intact) + rationale evidence line. Verify by read-through. Commit 3.
4. **Evidence (REQ-NF-001..006):** update this plan + `TEST_MATRIX.md` in place (singletons, never suffixed); run residue greps + canonical diff check; record waiver-flag on NF-001 naive-pattern false positives (`single source` C1 idiom ×2, `single-process`/`single-residue` W-PPL-GATE meta ×2 — none is a `single` mode branch; gate decides narrow-pattern vs reword). Commit 4 (lane evidence only).
5. **Hand off** to `frame-ship:quality-gate` (people-reviewer + barrera) with packet intact. No sideways.

## Order & Dependencies

Sequential 1 → 2 → 3 → 4 → 5. No parallel lanes inside people lane (single-threaded docs edits). vasquez engineering lane runs parallel outside this file (DEP-1 verbatim-consume; never touched here).

## Rollback Points

- Per-group revert: `git revert <commit>` per group (ETA < 5 min each); full-lane revert: revert commits 1–4 in reverse order (ETA < 15 min). Owner santana. Cross-lane: notify vasquez to re-verify diff-0 after any revert.
- No migrations, no flags, no deploys, no archive/BRIEF touches (NF-003).

## Prior Plans Indexed (not re-executed)

| Source | Outcome carried forward |
|--------|-------------------------|
| Consolidation 2026-09-18 plan (superseded section above) | 9-type singleton method (create-if-missing else update-in-place, never suffixed) — reused here for plan/matrix singletons |
| `PROPOSED_CHANGES.md` §Diff plan 1–5 | Verbatim edit map executed in steps 1–3 above |
