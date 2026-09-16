# Readability Review: plugin-001-concise-prompts

**Reviewer:** review-readability
**Date:** 2026-09-16
**Spec Reference:** INTENT-2026-09-16-concise-plugin-prompts (`docs/specs/40_workspace/vasquez/PROPOSED_CHANGES.md`)
**Target:** `.opencode/plugins/frame-ship.ts` @ `1a805bc` (156 lines, 9,685 chars)
**Execution_Mode:** single (direct execution — no `task()` tool in this harness; skill + template read first per adapter)
**Verdict:** pass

## Checklist

- [x] Naming is intention-revealing (no `data`, `tmp`, `x`)
- [x] Functions have single responsibility
- [x] Nesting depth <= 3 (changed lines only — all flat template literals)
- [x] Comments explain WHY, not WHAT
- [x] Public APIs documented
- [x] No dead code or commented-out blocks
- [x] Consistent style with surrounding code

## Findings

| ID | Severity | Location | Finding |
|----|----------|----------|---------|
| RD-001 | Low | `.opencode/plugins/frame-ship.ts:18-22` | `WORKFLOW_CARD` lines are long single-line strings (~400+ chars/line). Intentional — injection payload, not edited by hand per line. No action. |
| RD-002 | Low | `.opencode/plugins/frame-ship.ts:59-82` | `resolveSkillsDir` nests to depth 4 (try > if > if > if). Pre-existing, verbatim per REQ-005, out of scope for this change. No action. |

## Verdict Rationale

The change touches string literals only. New literals keep greppable anchors (`MARKER` prefix, numbered rules `1.`–`14.`, `CHAIN` interpolation) so the compact form stays scannable. `CHAIN` const (`frame-ship.ts:13-14`) is a named, intention-revealing single source replacing 4x inline literals. Comments state WHY (e.g., `frame-ship.ts:16` "Full detail lives in skills/*/SKILL.md … keeps contract + routing only"; `frame-ship.ts:24` "same meaning"). No renames, no dead code, no style drift. Two Low findings, both explicitly no-action.

## Craft + Process

- Skill: `skills/quality-gate/SKILL.md` (stage `quality-gate`, reviewer routing + verdict shapes)
- Template: `agents/engineering/review-readability.md` (CODE lens, DETECT → REVIEW → CATEGORIZE → PRIORITIZE → REPORT)
- Checklist shape: `skills/quality-gate/references/engineering/readability-review.md`
