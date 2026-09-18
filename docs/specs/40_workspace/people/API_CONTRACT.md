# API Contract: People Lane (Index — Not a Fork)

**Owner:** santana (CHRO/CPO) | **Date:** 2026-09-18 | **Spec:** SPEC-singleton-consolidation-people

## Contract Pointer

API truth lives in the numbered store: `docs/specs/10_design/API_CONTRACTS.md`. This file forks nothing — it records the lane's file-contract so future people writes never suffix.

## Singleton File-Contract (lane discipline)

- Canonical set (exact, UPPER_SNAKE): `RELEASE_NOTES.md`, `ARCHITECTURE_REVIEW.md`, `DRILL.md`, `HANDOFF.md`, `IMPLEMENTATION_PLAN.md`, `PROPOSED_CHANGES.md`, `TEST_MATRIX.md`, `ARCHITECTURE.md`, `API_CONTRACT.md` (this file) in `docs/specs/40_workspace/people/`.
- Rule: create-if-missing / update-in-place / never-suffix. New variants of a type edit the canonical; suffixed copies are never created in-lane.
- `SPEC-*.md` is out of scope (not a singleton type) — trace anchors stay.
- Moves to `50_archive/` are copy → SHA256-verify → delete-original (no purge); renames carry lane provenance infix only when the bare archive name is taken.

## Consolidation Record

Created new — no prior variant; singleton slot established by SPEC-singleton-consolidation-people (2026-09-18).
