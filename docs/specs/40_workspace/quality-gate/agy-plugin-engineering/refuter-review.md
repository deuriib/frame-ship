# Review: refuter — SPEC-agy-plugin-engineering

**Reviewer:** review-refuter (adversarial, single mode direct)
**Date:** 2026-09-17
**Verdict:** pass
**Findings:** 0 blocking (3 challenges raised and answered)

## Challenges

1. **"1:1 parity is overstated — threshold reminder ≠ compaction event."** Answered: ARCH documents it as an explicit delta (INV table + README mapping row), not a hidden gap. The reminder content is byte-identical; only the trigger differs. Sustained as documented delta.
2. **"`invocationNum === 0` vs external spec claiming `=== 1`."** Answered: official hooks docs (fetched 2026-09-17) state 0-indexed, first is 0; SPEC REQ-008 records the discrepancy + backstop (`rules/frame-ship.md` orients the session even if the guard ever misses). Refuter accepts with the backstop in place.
3. **"Canary fixture will trip naive secret scanners in CI."** Answered: AC-006 names the exact file + value (`AKIAIOSFODNN7EXAMPLE`, AWS-docs example) and bounds expected hits; gate evidence T-007a reviews them. Sustained as documented exception.
4. **"`skills/` reuse assumes agy recurses into `skills/*/`."** Answered: README + R-009 flag it as verify-at-install with a flat-shim fallback; bootstrap still injects via hook regardless. Sustained as flagged assumption, not a silent one.

No challenge survived as an undocumented gap. Nothing to refute further.
