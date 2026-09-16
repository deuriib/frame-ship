# Risk Review: commit-convention-purge

**Reviewer:** review-risk (engineering gate reviewer, dispatched by orchestrator Montilla CEO)
**Date:** 2026-09-16
**Verdict:** pass
**Skill:** `frame-ship:quality-gate` (`skills/quality-gate/SKILL.md` — single mode, min gate). Note: no dedicated risk checklist exists under `references/engineering/` or `references/domains/` (5 + 9 files, none `*risk*`); this review follows the gate-report "fast gate note" shape against the proposal's own Risk Assessment (§R-001–R-003, Blast Radius, Rollback).
**Packet:** SPEC `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` (commit `a17c7d8`) / HARD doc-only purge, §A 14 deletions + §B 23 citation edits, §C history kept per orchestrator ruling / GATE engineering single-domain, single mode (readability+risk only — this file) / DOMAINS engineering

## Risk Disposition (proposal R-001–R-003 vs evidence from `f859726`)

| ID | Proposal risk | Disposition |
|----|---------------|-------------|
| R-001 | Dangling reference missed (Low/Med) | **Cleared.** `git ls-files \| grep -i commit-convention` → 0 files; `rg commit-convention skills/` → 0 matches; 0 `+` diff lines mention `commit-convention`. Post-edit state meets the DoD grep bar (only §C history lines remain). |
| R-002 | Future agents lose commit-format guidance (Low/Low) | **Accepted as designed.** Every stage SKILL keeps its own close line + per-stage example; only the shared pointer clause is gone. Git history retains the deleted template for reference. No action. |
| R-003 | "Full purge incl. history" judged incomplete without §C scrub (Med/Low) | **Resolved by orchestrator ruling.** §C prose kept (CHANGELOG 2 + RELEASE_NOTES 3 + archive/handoff 2 = 7 lines); scrub-if-ordered is a separate follow-up work unit. No silent risk — decision is explicit in proposal §C and the commit message. |

## Blast Radius (verified vs proposal)

- **Scope exact — ✅.** Commit touches exactly 27 files = 14 §A deletions + 13 §B edits. No other paths in `git show f859726 --stat`. Plugin runtime (`frame-ship.ts`), toolchain (`mise.toml`), `package.json`, `tests/` untouched. No build/test/deploy path references the deleted files.
- **Systems/customers/revenue/regulators:** none — markdown only, no auth/data/API/PII, no trust boundary crossed. Security/architecture review N/A holds.
- **Teams:** subtractive change only; no new process to learn. One Low readability note (stale file count in `skills/AGENTS.md:24`) tracked as COND-001 in `readability-review.md` — not a risk item, no rollback implication.
- **Rollback:** single-commit `git revert f859726` restores all 14 files + 13 edits. Working tree currently clean (`git status --short` empty). Revert path identified, no external sends to undo.

## Residual Risks

None above Low. No Critical/High items — nothing to surface same-session per guardrail §10.

## Assumptions

1. Doc-only scope holds — verified by stat (27 markdown paths only); no security/architecture review required, consistent with proposal assumptions.
2. `skills/using-frame-ship/references/commit-convention.md` intentionally deleted per commit `f859726` — it is not required and its absence never fails this gate (orchestrator order).
3. **Glob-scope note for refuter/QA:** this review dir itself is named `quality-gate/commit-convention-purge/`, so a naive `**/*commit-convention*` path glob will now match gate artifacts. REQ-001's "zero files" evidence must be scoped to tracked implementation paths (as run: `git ls-files | grep -i commit-convention` → 0) or exclude `quality-gate/commit-convention-purge/`. Informational only — these files postdate the commit and are not purge leftovers.

## Verdict Rationale

Pass. Blast radius matches the proposal exactly, all three proposal risks are cleared/accepted/resolved with evidence, rollback is a single revert, and no new risk was introduced by the commit. The sole open item (COND-001, Low, readability) does not alter the risk posture.
