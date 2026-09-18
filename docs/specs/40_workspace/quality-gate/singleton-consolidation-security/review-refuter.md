# Review: refuter — SPEC-singleton-consolidation-security

**Reviewer:** refuter lens (min gate, single mode)
**Date:** 2026-09-18
**Verdict:** ✅ PASS (4 attempted refutations, all refuted)

1. "A Conditional verdict was dropped from the index" — REFUTED: 6/6 reviews indexed (1 Approved + 5 Conditional, single-dispatcher counted as APPROVE-with-conditions); archive holds all 6 files.
2. "HANDOFF rename to `HANDOFF-git-worktree-security.md` loses bytes" — REFUTED: SHA256 `45EDDE36…CA40` match pre/post; rename forced by existing same-named engineering file (different bytes `DB71DE3E…`), precedent `PROPOSED_CHANGES-hidden-flag.md`.
3. "The lane SPEC file violates the singleton rule" — REFUTED: SPEC is not one of the 9 types; engineering precedent kept its SPEC trio untouched.
4. "14 deletes = purge" — REFUTED: git records 14 renames with 0-line diffs; every byte lives in `50_archive/`.
