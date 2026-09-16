# Handoff: vasquez (CTO) — Portable Rewrite

**Spec Reference:** SPEC-002-agent-templates-portable
**Agent:** vasquez
**Date:** 2026-09-16
**Status:** complete
**Execution_Mode:** multi-subagents
**Gate Reference:** review wave in-session (readability APPROVE + risk APPROVE + refuter APPROVE + qa PASS) — OPEN
**Proposal:** docs/specs/40_workspace/vasquez/PROPOSED_CHANGES-002-portable.md
**ADR:** docs/specs/10_design/ADR-002-agent-templates-portable.md (partially supersedes ADR-001 meta-block sentence)

## Deliverables

| Artifact | Location | Status |
|----------|----------|--------|
| 68 portable templates | `skills/templates/agents/<domain>/<agent>.md` | done |
| Portable README | `skills/templates/agents/README.md` | done |
| Spec REQ-P1..P6 | `docs/specs/20_backlog/SPEC-002-agent-templates-portable.md` | done |
| Proposal | `docs/specs/40_workspace/vasquez/PROPOSED_CHANGES-002-portable.md` | done, approved (user + 4 gates) |
| ADR-002 | `docs/specs/10_design/ADR-002-agent-templates-portable.md` | done, accepted |
| Plugin untouched | `.opencode/plugins/frame-ship.ts` | verified (status + diff empty) |

## Definition of Done Checklist

- [x] Acceptance criteria satisfied (AC-P1: 68/68 contract sections, frontmatter clean; AC-P2: case-sensitive residue zero; AC-P3: refuter HOLDS craft-preserved all domains; AC-P4: gate OPEN + plugin untouched)
- [x] Tests passing (qa 6/6: count 68, frontmatter 0 violators, 10-pattern residue zero, headers 68/68×4, plugin empty, backend order ok; check-6 literal corrected — see judgment note)
- [x] No lint issues (no renames; skill §5 path cites intact; markdown has zero `](…)` links to break)
- [x] Security checks passing (risk APPROVE: no secrets/tokens/PII; minimization clause 68/68; least-privilege per role; no freelance fixes)
- [x] Documentation updated (README rewritten to actual schema; ADR-002 recorded)

## Traceability

REQ-P1 → 68 frontmatter + Capabilities → qa 1,2,4 + readability → this handoff
REQ-P2 → dispatch/packet/footer scrub → qa 3 + refuter CLAIM 2 → this handoff
REQ-P3 → agreement/Delegation/adapter 68/68 → qa 4 + refuter CLAIM 3 → this handoff
REQ-P4 → craft preserved → refuter CLAIM 1 + readability → this handoff
REQ-P5 → 68 + README, plugin empty → qa 1,5 + refuter CLAIM 4 → this handoff
REQ-P6 → 4 gate verdicts, no Critical/High open → this handoff

## Gate Verdicts

- review-readability: REQUEST_CHANGES (14 findings) → surgical retry → **APPROVE** (14/14 FIXED)
- review-risk: **APPROVE** (zero findings, no escalation)
- review-refuter: **APPROVE** (CLAIMs 1–4 HOLD; 1 Low hygiene note = espinoza dot_config path, fixed as F3)
- qa: **PASS** (5/6 green + check-6 red-on-bad-literal, corrected)

## Judgment Notes (assumptions stated)

1. qa check-6 RED was a prompt mis-specification, not a file defect: my qa
   prompt asserted `espinoza.md line 7 == "# Espinoza"`, but the approved F4
   fix put `# Espinoza — Automation Consultant` at line 6 (blank line 7),
   which satisfies README schema step 2 ("H1 craft heading") and was
   independently verified FIXED by readability. No file change made for the
   check; renaming to the bare literal would have contradicted the gate.
2. espinoza Write scoped to "owned automation outputs and scaffolds" (was
   output-only per old permission). Judgment: matches craft ("delivers
   automation code/scaffolds") while staying within task scope; risk saw no
   boundary change (no secrets/suite/bypass involved).
3. F12 (espinoza Boundaries dedupe) applied lightly: removed the true dupe
   (`NEVER self-dispatch` line, covered by Delegation), kept the concrete
   no-self-gate path (:110) and lesson duty (:112) as file-unique.
4. `delgado` kept as defined term in montilla.md only; 7 escalate lines now
   read `montilla` (CEO) for standalone clarity.

## Blockers / Open Questions

- Follow-up (not this unit): `skills/AGENTS.md:26` and
  `skills/using-frame-ship/references/tool-mapping.md:11` still describe the
  old template meta (`Template-For`/`Execution`, `mode: all|primary`). Needs
  a chain-doc touch-up; flagged, not executed (unit scope = templates dir).
- Pre-existing working-tree modifications (`M skills/*/SKILL.md`, untracked
  `docs/`, `skills/templates/`) predate this unit; this unit only wrote
  `skills/templates/agents/*` + the four SPEC-002 records above.

## Next Agent

montilla via `ship-release` if a release is wanted (notes + changelog +
rollback = revert these template edits). Lessons: bulk-script + sampled
gates scales to 68 files; readability catches what scans can't
(contradictions, dangling refs, stale paths); one surgical retry round
suffices when findings are concrete — never a third loop.
