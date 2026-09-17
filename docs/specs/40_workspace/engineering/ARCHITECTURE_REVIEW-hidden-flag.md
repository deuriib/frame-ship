# ARCHITECTURE_REVIEW — hidden flag

**SPEC:** `docs/specs/40_workspace/engineering/SPEC-hidden-flag-engineering.md`
**Proposal:** `docs/specs/40_workspace/engineering/PROPOSED_CHANGES-hidden-flag.md`
**Contract:** `docs/specs/10_design/ARCHITECTURE.md` (INV-001..008)
**Verdict:** APPROVED (no ADR required — minor additive overlay, waived with rationale)

## Contract compliance

- INV-001 single-file zero-dep: HOLDS — proposal adds one optional field + conditional spread, no imports/deps.
- INV-002 idempotent/never-clobbers: HOLDS — `??=` + conditional spread preserves byte-identical objects when hidden absent; `hidden:true` inserts still `??=`.
- INV-003 prompts bodies only: HOLDS — no agent file touched.
- INV-004 roster-exact: HOLDS with overlay — 74 keys, modes, alias unchanged; hidden is display-only overlay (8× C-level all, montilla visible, 0 subagent). ARCHITECTURE.md INV-004 line gets one-sentence overlay note at execute time (contract doc touch, not a decision change).
- INV-005 defaults stable: HOLDS — `default_agent`/`subagent_depth` untouched.
- INV-006 version triple: HOLDS — untouched per proposal.
- INV-007 reference-only provenance: HOLDS — no bodies pasted.
- INV-008 deny-default: HOLDS — no secrets in diff.

## ADR decision

WAIVED — additive optional display flag, no invariant break, no trade-off between alternatives (exact shape `hidden:true` frozen by brief). Rationale recorded here instead of a new ADR file. ARCHITECTURE.md INV-004 overlay sentence is the contract update.

## Conditions for execute-spec

1. Exact `hidden: true` boolean literal on the 8 named C-level lines only.
2. Conditional spread in BOTH mirror inserts (agents + agent).
3. Both Record types gain `hidden?: boolean`.
4. Subagent lines untouched; montilla untouched.
5. `mise run typecheck` green.

## Trace

REQ-001..004 + NF-001/002 → compliant → APPROVED → execute-spec cleared.
