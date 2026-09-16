# ADR-005: debugging as pre-proposal diagnostic lens, not chain stage

**Date:** 2026-09-16
**Deciders:** engineering owner, automation owner
**Status:** accepted

## Context

Systematic debugging must gate bug fixes without breaking the fixed 9-stage chain or creating a sideways loop.

## Decision

`debugging` ships as `skills/debugging/` advisory skill invoked pre-proposal/pre-execute; it produces evidence + hypothesis and hands off via PROPOSED_CHANGES. No new gate, no stage reorder.

## Consequences

### Positive

- Chain order preserved; guess-fixes blocked at proposal/execute entry.
- 3-failure→architecture escalation rides existing orchestrator path.

### Negative

- Agents must learn trigger (bug → debug first); mitigated by explicit trigger line + chain binding.

## Supersedes / Superseded By

None.
