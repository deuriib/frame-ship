# People Review: SPEC-multi-default-people

**Reviewer:** people-reviewer (santana — people owner)
**Date:** 2026-09-20
**Verdict:** pass
**Spec:** `docs/specs/20_backlog/SPEC-multi-default-people.md`

## W-PPL-GATE Checklist

- [x] Uniform multi-only wording verified (W-MULTI + W-SEQ grep evidence attached)
  - `skills/using-frame-ship/SKILL.md`: W-MULTI 1×, W-SEQ 1×
  - `skills/using-frame-ship/references/bootstrap-checklist.md`: W-MULTI 1×, W-SEQ 1×
  - `skills/frame-intent/SKILL.md`: W-INTENT-STEP3 1×
  - `skills/frame-intent/references/product-brief.md`: W-BRIEF-MODE 1×
- [x] No min-gate path invoked; full-wave + refuter before qa established as the unified gate
- [x] Rule-change impact communicated (all roles informed of single-process mental model)

## NF-001 Narrow-Pattern Evaluation

The 4 naive `\bsingle\b` occurrences flagged in `TEST_MATRIX.md` are evaluated:
1. `skills/frame-intent/SKILL.md:54` ("single source for C1+C2") — Idiomatic English glossary anchor.
2. `skills/frame-intent/SKILL.md:64` ("single source §4") — Idiomatic English anchor.
3. `skills/quality-gate/references/domains/people-review.md:17` ("single-process wording") — Descriptive meta-phrase in the gate criteria itself.
4. `skills/quality-gate/references/domains/people-review.md:29` ("single-residue grep") — Meta-evidence description.

**Ruling:** Confirmed: Zero hits of `single` as a methodological mode branch. The narrow-pattern definition holds cleanly. The allowlisted occurrences are non-mode idioms and require no rewrites.

## Findings

None. All 7 functional requirements and 6 non-functional requirements pass.

## Verdict Rationale

pass — Wording is uniform, human warmth is preserved, mental model is consolidated into one natural process.
