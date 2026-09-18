# Implementation Plan: Grilling Integration C1+C2 — Engineering Lane

**Agent:** vasquez (Senior CTO / engineering owner) — engineering lane C1+C2
**Date:** 2026-09-18
**Proposal:** `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` (C1+C2, approved change list)
**Spec Reference:** `docs/specs/10_design/SPEC-grilling-integration-engineering.md#REQ-001..002` + `docs/specs/10_design/SPEC-grilling-integration-people.md#REQ-P-001..006` (by reference)
**Execution_Mode:** multi-subagents (this lane + security C3+C4 lane in parallel; frozen unless orchestrator waiver)
**Domains-Touched:** [engineering, people, security] — owns: engineering (C1+C2 wiring)
**Approvals:** arch Approved (`ARCHITECTURE_REVIEW.md`, ADR-007 proposed) · security Conditional (`SECURITY_REVIEW.md` C-1..C-6 binding — met as evidence, this is the clearance)
**TTL:** 90 days or next release, whichever first (orchestrator-confirmed)

> **Singleton note:** canonical `docs/specs/40_workspace/engineering/IMPLEMENTATION_PLAN.md` slot per execute-spec discipline (create-if-missing else update-in-place, never suffix). Prior content (Antigravity discovery-path fix, 2026-09-18) is superseded by this unit and recoverable from git history (`git log -- docs/specs/40_workspace/engineering/IMPLEMENTATION_PLAN.md`); same for `TEST_MATRIX.md`.

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | C1: add opt-in classification-scaled challenger section to frame-intent (spike 1 / bounded cap 3 / architectural cap 5 + ratchet + falsifiable-bet + people inserts 1–6 verbatim-in-intent, original wording only) | `skills/frame-intent/SKILL.md` (file-modify) | TEST_MATRIX.md E-001..E-006 | 30 min |
| 2 | C2: add pre-approval grill trigger + one-pass budget section to propose-changes (trigger list + terminal approve/reject + repo-untouched + people inserts verbatim-in-intent) | `skills/propose-changes/SKILL.md` (file-modify) | TEST_MATRIX.md E-007..E-012 | 30 min |
| 3 | C2 refs: trigger checklist hook + one-pass budget line + masking-reminder pointer in proposal template; budget note + blast-radius trigger pointer in risk assessment | `skills/propose-changes/references/proposal-template.md`, `skills/propose-changes/references/risk-assessment.md` (file-modify) | TEST_MATRIX.md E-013/E-014 | 20 min |
| 4 | Samples (0 PII/secrets): 1 sample BRIEF `Framings-Considered` (C1 challenger + falsifiable-bet) + 1 sample proposal round (C2 trigger + one-pass) | `docs/specs/40_workspace/engineering/SAMPLE-grilling-C1.md`, `SAMPLE-grilling-C2.md` (new evidence artifacts) | TEST_MATRIX.md E-015/E-016 + scan log | 20 min |
| 5 | Evidence: banned-lexicon grep (= 0), secret/PII scan log (0 raw), clause-presence checks, no-new-dir/stage/reviewer/dep diff, `mise run typecheck` | workspace + skills diff | TEST_MATRIX.md Coverage Summary | 15 min |
| 6 | Commits: one per REQ-ID with REQ→test→artifact in body; hand off to quality-gate with packet intact | git | commit SHAs in TEST_MATRIX.md | 10 min |

Each step maps to its REQ-ID commit (step 1+4a → REQ-001; steps 2+3+4b → REQ-002); plan/matrix singletons ride their REQ commit, never batched across REQs.

## Order of Operations

Steps run 1→6. Skill-text edits (1–3) land before samples (4) so samples demonstrate shipped wording, not draft intent. Evidence (5) runs on the final diff — grep/scan proof is meaningless on partial state. Commits (6) split strictly by REQ-ID: REQ-001 commit first (C1 + C1 sample + this plan), REQ-002 commit second (C2 + refs + C2 sample + matrix). No dependency between C1 and C2 text — either could land first; order is traceability choice, not technical need.

## Rollback Points

Rollback point after any step: `git checkout -- skills/frame-intent/SKILL.md skills/propose-changes/SKILL.md skills/propose-changes/references/` + delete sample artifacts; post-commit rollback is `git revert <sha>` per REQ-ID (commits never batch REQs, so revert is surgical). ETA < 15 min; owner vasquez with people co-sign on wording revert. No data migration, no prod surface.

## Quality Gates

Domain checks (delete non-touched, keep evidence path):

- [ ] Engineering: skill-text diff review + banned-lexicon grep = 0 + `mise run typecheck` unaffected (docs-only, no runtime change)
- [ ] Finance: N/A (skill-text only, no budget/pipeline surface)
- [ ] Legal: N/A (original wording only — LICENSE open question stays with orchestrator; no verbatim external text reused)
- [ ] Marketing: N/A
- [ ] People: people-owner co-sign on tone/budget wording (C1 caps + ratchet + inserts 1–6 intent-match, REQ-P-004 co-owned) — collected at quality-gate
- [ ] Revenue: N/A
- [ ] Automation/ops: N/A (no runbook/flags/capacity surface)
- [ ] Security: masking co-sign REQ-P-006 + conditions C-1..C-6 met as evidence (scan log, clause presence, no scope drift) — re-verified at quality-gate

Scope guard: implement ONLY the approved change list. Any need beyond it → STOP + new proposal, never freelance. Any need beyond [engineering, people, security] → formal Cross-domain request to orchestrator (montilla), never sideways.
