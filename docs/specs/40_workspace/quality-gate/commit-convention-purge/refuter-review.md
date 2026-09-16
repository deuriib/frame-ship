# Refuter Review: commit-convention-purge (f859726)

**Reviewer:** review-refuter (adversarial, engineering gate)
**Date:** 2026-09-16
**Verdict:** conditional ("could not falsify purge; one Low staleness finding with mitigation")
**Skill:** frame-ship:quality-gate (`skills/quality-gate/SKILL.md` — adversarial refuter before QA, single mode min gate)
**Role:** engineering gate reviewer (refuter + qa slice: this file covers refuter only), dispatched by orchestrator (Montilla CEO)
**SPEC:** `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` (commit a17c7d8)
**HARD:** doc-only purge — §A 14 deletions + §B citation edits executed in f859726; §C history kept per orchestrator ruling; `skills/using-frame-ship/references/commit-convention.md` intentionally deleted in f859726 — do NOT require it
**GATE:** engineering single-domain, single mode
**DOMAINS:** engineering

## Mission

Attempt to **falsify** commit f859726. Success = a counterexample: a dangling pointer, a missed file, broken markdown, or scope creep outside §A/§B.

## Attack Vectors Tried

| ID | Hypothesis | Attempt | Result |
|----|-----------|---------|--------|
| RF-001 | A tracked `*commit-convention*` file survives the purge | `git ls-files "*commit-convention*"` at HEAD (f859726) | Confirmed (zero files — empty output). ✅ |
| RF-002 | A live citation to the deleted path survives in `skills/` | `rg -n -i "commit-convention" skills/` → exit 1, zero matches | Confirmed (zero matches). ✅ |
| RF-003 | A live (non-§C) pointer survives repo-wide | `git grep -n "commit-convention" -- .` → matches in exactly 5 files, all classified below | Confirmed (only §C history + proposal self-description). ✅ |
| RF-004 | f859726 touches files outside the §A/§B set (scope creep) | `git show --name-only --pretty=format: f859726` → 27 paths, diffed against §A table (14) + §B table (13 files) | Confirmed (exact match, no extras). ✅ |
| RF-005 | Citation edits break markdown (§5 bullets, close lines) | `git show HEAD:<9 SKILLs>` tails + `rg "Close with a commit|Commit one commit|Commit closings|Each step maps"` | Confirmed (all tails clean, close lines well-formed). ✅ |
| RF-006 | `skills/AGENTS.md:24` file-count survives deletion unchanged and goes stale | Read `skills/AGENTS.md:24` vs `git ls-files "skills/using-frame-ship"` | **Falsified (minor)** — stale count found, see CE-001. ⚠️ |
| RF-007 | Proposal's "21 lines" claim vs actual 23 edits hides missed/skipped lines | Count §B table rows (23) vs `git show --stat f859726` modified files (13) + commit message ("23 citation lines across 13 files") | Confirmed impl-side (23/23 done); staleness is in the proposal doc text only, see CE-002. ⚠️ |

## Counterexamples Found

| ID | Counterexample | Impact | Reproduction |
|----|---------------|--------|--------------|
| CE-001 | `skills/AGENTS.md:24` still reads "`translate-to-spec` + `using-frame-ship` 4 (SKILL + 3 refs)" but `using-frame-ship/` now holds 3 files (SKILL + `bootstrap-checklist.md` + `tool-mapping.md`). The purge deleted 1 ref without updating the count. | Low — index/count prose only; no dangling pointer, no broken link, no behavior change. Readers miscount dir contents. | `git ls-files "skills/using-frame-ship"` → 3 lines; read `skills/AGENTS.md:24`. |
| CE-002 | `PROPOSED_CHANGES.md` says "21 live citation lines" (§Summary L11, §Rationale L80, §B header "21 lines") but the §B table itself lists 23 rows (L42–L64) and f859726 implements 23 across 13 files. Proposal text is internally stale, not the implementation. | Low — documentation inconsistency in the (already-committed, pre-execution) proposal; impl matches the 23-row table exactly. No action in f859726. | Count table rows L42–L64 in `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` (23) vs its "21" prose (3 occurrences). |

## Verdict Rationale

- No dangling pointer, missed file, broken markdown, or scope creep found: RF-001 through RF-005 all confirm the purge with log/diff/scan proof.
- CE-001 is a genuine (Low) miss adjacent to §B scope: the file-count sentence in `skills/AGENTS.md` is now wrong by one. Mitigation is a one-line follow-up edit, not a revert.
- CE-002 is proposal-doc staleness only; the implementation followed the correct 23-row table. Recorded so the gate report does not inherit the "21" number.
- Per guardrails: every finding above carries proof (command + output class); no proof-free claims. Therefore **conditional**, not fail: the purge itself could not be falsified.

## Mitigation for CE-001 (follow-up, not a revert)

- One-line edit: `skills/AGENTS.md:24` → "`translate-to-spec` 4 (SKILL + 3 refs); `using-frame-ship` 3 (SKILL + 2 refs)" (or equivalent split). Owner: engineering owner. ETA: minutes. Gate may open CONDITIONAL with this as COND-001, or orchestrator may waive as Low hygiene for a later work unit.
