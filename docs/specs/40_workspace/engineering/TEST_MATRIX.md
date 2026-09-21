# Test / Evidence Matrix: SPEC-subagents-naming-engineering

**Agent:** vasquez-specialist (engineering specialist under Vasquez)
**Date:** 2026-09-20
**Domains-Touched:** [engineering]

| REQ-ID | Evidence ID | Description | Type | Status | Commit |
|--------|-------------|-------------|------|--------|--------|
| REQ-ENG-001 | T-ENG-001 | `skills/translate-to-spec/SKILL.md` §3 step 0 pre-flight contract (`W-SUBAGENTS`) & `references/spec-template.md` line 9 updated to `subagents` | Review | pass | `007bf03` |
| REQ-ENG-002 | T-ENG-002 | `skills/execute-spec/SKILL.md` §2 supporting reference, §3 step 0 pre-flight (`W-SUBAGENTS`), and §3 step 1 execution_mode updated to `subagents` | Review | pass | `c22287e` |
| REQ-ENG-003 | T-ENG-003 | `skills/quality-gate/SKILL.md` §3 execution mode declaration & `references/gate-report.md` line 75 Load Evidence checklist updated to `subagents` | Review | pass | `070834c` |
| REQ-ENG-004 | T-ENG-004 | `skills/propose-changes/references/proposal-template.md` line 6 & `skills/verify-handoff/references/dod-checklist.md` line 14 updated to `subagents` | Review | pass | `f9e84d8` |
| REQ-ENG-005 | T-ENG-005 | `skills/git-worktree/SKILL.md` §1 purpose and §3 step 4 parallel lane discipline updated to `subagents` | Review | pass | `f32553f` |
| REQ-ENG-006 | T-ENG-006 | `skills/AGENTS.md`, `docs/AGENTS.md`, `docs/specs/AGENTS.md` (ADR-001..009), and root `AGENTS.md` updated to `subagents` | Review | pass | `c1e2b2a` |
| REQ-ENG-007 | T-ENG-007 | `docs/specs/12_adr/ADR-009-subagents-naming.md` registered in `12_adr/` | Review | pass | `62ff1a2` |
| REQ-ENG-008 | T-ENG-008 | `docs/specs/10_design/ARCHITECTURE.md` recorded in `10_design/` with INV-001..008 | Review | pass | `f4fd74c` |
| REQ-NF-001 | T-NF-001 | Historical immutability verified (`git diff --name-only` confirms 0 edits to `50_archive/` or prior ADRs) | Attestation | pass | `c1e2b2a` |
| REQ-NF-002 | T-NF-002 | Zero residue of `multi-subagents` verified via grep across all targeted active engineering files | Integration | pass | `c1e2b2a` |
| REQ-NF-003 | T-NF-003 | Toolchain verification: `mise run typecheck` exits status 0 with zero errors | Integration | pass | `c1e2b2a` |
| REQ-NF-004 | T-NF-004 | Security and privacy compliance (Ley 172-13, zero secrets/tokens/PII introduced) verified | Attestation | pass | `88f209a` |
| REQ-NF-005 | T-NF-005 | Atomic reversibility: discrete git commits per REQ-ID group with clean rollback paths | Attestation | pass | `c1e2b2a` |

Types: `Unit | Integration | E2E | Review | Sign-off | Attestation | Launch-check | Filing-proof`. Code REQs use tests; non-code REQs use review/sign-off/attestation with artifact path — REQ-ID trace mandatory for all 8 domains. See `references/testing-template.md` for standard directory paths, coverage thresholds, and Frame→Ship methodology fit.

## Coverage Summary

- Unit coverage: N/A (specification and documentation refactoring, zero runtime TS changes)
- Integration coverage: 100% (toolchain typecheck verification + multi-file grep residue scan passing)
- Evidence coverage: 13/13 REQ-IDs with linked artifact, commit sha, and verification proof (100%)
- Acceptance criteria covered: 13/13 (AC-REQ-ENG-001..008 + AC-REQ-NF-001..005)
