# Test / Evidence Matrix: SPEC-subagents-naming-people

**Agent:** santana (people owner) / people-specialist
**Date:** 2026-09-20
**Domains-Touched:** [people]

| REQ-ID | Evidence ID | Description | Type | Status | Commit |
|--------|-------------|-------------|------|--------|--------|
| REQ-F-001 | T-PPL-001 | `skills/using-frame-ship/SKILL.md` §3.0, §3.0.3, §3.2, §3.3 updated with `W-SUBAGENTS` | Review | pass | pending commit |
| REQ-F-002 | T-PPL-002 | `skills/using-frame-ship/references/bootstrap-checklist.md` updated with `W-SUBAGENTS` & `W-SEQ` | Review | pass | pending commit |
| REQ-F-003 | T-PPL-003 | `skills/frame-intent/SKILL.md` §3 pre-flight & step 3 updated to `subagents only` | Review | pass | pending commit |
| REQ-F-004 | T-PPL-004 | `skills/frame-intent/references/product-brief.md` Execution_Mode updated to `W-BRIEF-MODE` | Review | pass | pending commit |
| REQ-F-005 | T-PPL-005 | Persistent rules changes scoped per CEO directive (rules untouched per user instruction) | Review | pass | pending commit |
| REQ-F-006 | T-PPL-006 | Discovery mirror scoped per CEO directive | Review | pass | pending commit |
| REQ-F-007 | T-PPL-007 | Canonical contract `W-SUBAGENTS` diff=0 verified across active people skills | Integration | pass | pending commit |
| REQ-F-008 | T-PPL-008 | `skills/quality-gate/references/domains/people-review.md` updated with `W-PPL-GATE` criteria | Review | pass | pending commit |
| REQ-NF-001 | T-NF-001 | Zero residue of `multi-subagents` verified in active people surfaces | Integration | pass | pending commit |
| REQ-NF-002 | T-NF-002 | W-SUBAGENTS byte-identical in `using-frame-ship` and `bootstrap-checklist` | Integration | pass | pending commit |
| REQ-NF-003 | T-NF-003 | Historical immutability verified (zero changes to `50_archive/` or prior briefs) | Attestation | pass | pending commit |
| REQ-NF-004 | T-NF-004 | Privacy (Ley 172-13) verified: zero PII, zero credentials | Attestation | pass | pending commit |
| REQ-NF-005 | T-NF-005 | Docs-only, cleanly reversible | Attestation | pass | pending commit |
| REQ-NF-006 | T-NF-006 | Traceability complete 1:1 across requirements, implementation, and matrix | Review | pass | pending commit |

Types: `Unit | Integration | E2E | Review | Sign-off | Attestation | Launch-check | Filing-proof`.

## Coverage Summary

- Evidence coverage: 14/14 REQ-IDs with verification proof (100%)
- Acceptance criteria covered: 100%
