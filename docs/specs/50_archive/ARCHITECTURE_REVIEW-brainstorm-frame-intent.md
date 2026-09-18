# Architecture Review: SPEC-brainstorm-frame-intent-engineering

**Reviewer:** engineering owner
**Date:** 2026-09-16
**Verdict:** Approved

## Contract Compliance

| Invariant | Status | Notes |
|-----------|--------|-------|
| INV-001 No handoff without approval | pass | HARD-GATE + per-section + file review gate in proposal |
| INV-002 One-way ratchet, no downgrade | pass | classify-first with upgrade-only rule |
| INV-003 Reference-only, briefs never specs/code | pass | outputs BRIEF + OKRs; packet to translate-to-spec |
| INV-004 Zero sideways invocations | pass | writing-plans / visual-companion / superpowers paths excluded with reason |
| Chain: fixed 9-stage order preserved | pass | in-place frame-intent upgrade, no new stage/gate |
| Chain: frontmatter + body shape convention | pass | `name: frame-intent` exact; creed in SKILL only |

## ADR Required?

- [x] Yes — ADR-006-brainstorm-frame-intent created

## Conditions for Approval

People-owner tone check on Red Flags carries into execute-spec. Security hygiene S-001 (no secrets/PII in examples) rides gate sampling.

## Sign-off

- [x] engineering owner
