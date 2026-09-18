# Review: refuter - Singleton Consolidation (Automation Lane)

**Reviewer:** review-refuter, adversarial (single-mode direct, espinoza) | **Date:** 2026-09-18
**Spec:** SPEC-singleton-consolidation-automation

## Attempted Refutations (all refuted)

1. "Archived rename (`HANDOFF-git-worktree-automation.md`) breaks the byte-identical claim." — REFUTED: only the filename carries lane provenance (a bare `HANDOFF-git-worktree.md` lineage already exists in engineering archive history); bytes are hash-verified identical (`D74C6E06…CF76` both sides, HASH_MATCH).
2. "`SPEC-singleton-consolidation-automation.md` still violates the singleton." — REFUTED: SPEC is not one of the 9 briefed types; documented out-of-scope in SPEC §5 and proposal assumptions (same as engineering precedent's SPEC trio).
3. "8 of 9 canonicals are invented content for a 1-file lane." — REFUTED: create-if-missing is the briefed rule, not invention; each of the 8 records "created new — no prior variant" and uniformity with the engineering precedent (commit `07a75de`) is the point — future writes need a slot, not a new suffix.
4. "HANDOFF.md reduces a 12/12 DoD to an index — substance lost." — REFUTED: full 12/12 DoD (REQ-AUTO-001..007, T-001..T-007, ops appendix 6/6) remains readable in the archived original; reference-only packets principle forbids the paste.
5. "Other lanes still breach the rule, so the unit fails." — REFUTED: HARD scope is per-lane; other lanes are formally Cross-domain-requested to montilla in HANDOFF.md. Touching them here would be sideways.

## Verdict: ✅ PASS (no standing refutation)
