# Review: refuter — SPEC-singleton-consolidation-people (people lane)

**Reviewer:** review-refuter (min-gate, single mode, adversarial) | **Date:** 2026-09-18
**Verdict:** ✅ PASS (5 attempted refutations, all refuted)

## Attempted Refutations

1. **"A variant was missed — lane still has a suffixed singleton."** — REFUTED: post-move glob shows 10 files = 9 canonicals + SPEC pair… wait, 11 files (9 + 2 SPECs). Zero `*-*.md` among the 9 types; both remaining suffixed files are `SPEC-*.md` (out-of-scope class by brief).
2. **"An archived copy differs from its source (silent edit during move)."** — REFUTED: 7/7 post-copy hash == pre-move hash (8-hex prefixes logged at move time; full SHA256 in TEST_MATRIX).
3. **"The two-variant merge dropped the single-dispatcher CANCELLED state (F-008)."** — REFUTED: TEST_MATRIX §Carried-Forward Verdicts records F-008 CANCELLED + NF-005 superseded explicitly.
4. **"This unit changed people wording (announce-template / agent-rules) under a filing cover."** — REFUTED: all 9 canonicals are filing/index writes; both prior wordings are referenced, never reworded; no `agents/` or `skills/` file touched (scan: people lane + archive only).
5. **"Another lane was touched sideways."** — REFUTED: changed paths are `40_workspace/people/` + 7 `50_archive/*-people.md` files + 5 gate files; engineering/automation/security/single-demo untouched.

## Findings

None survive. No ❌, no ⚠️.
