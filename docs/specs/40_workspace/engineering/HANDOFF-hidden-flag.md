# HANDOFF — hidden flag (engineering → ship-release)

**SPEC:** `docs/specs/40_workspace/engineering/SPEC-hidden-flag-engineering.md`
**HARD:** single + optional-only + backward-compatible + exact shape `hidden:true`
**GATE:** OPEN (`docs/specs/40_workspace/quality-gate/hidden-flag/GATE_REPORT.md` 4/4 pass, 0 findings; ARCH-APPROVED, ADR waived)
**DOMAINS:** [engineering]
**Date:** 2026-09-17 | **Owner:** vasquez (CTO)

## Deliverables

- `.opencode/plugins/frame-ship.ts` — `AgentManifestEntry.hidden?: boolean`, 8 C-level `mode:all` `hidden:true`, mirror Records + conditional spread on both inserts, provenance comment overlay.
- `docs/specs/10_design/ARCHITECTURE.md` — INV-004 overlay sentence (contract doc touch).
- Chain artifacts: SPEC-hidden-flag-engineering.md, PROPOSED_CHANGES-hidden-flag.md, ARCHITECTURE_REVIEW-hidden-flag.md (APPROVED), IMPLEMENTATION_PLAN-hidden-flag.md, TEST_MATRIX-hidden-flag.md, quality-gate/hidden-flag/ (4 reviews + GATE_REPORT).

## DoD (engineering)

- [x] qa verdict green (qa-review.md PASS; `mise run typecheck` EXIT 0)
- [x] ADR updated or explicitly waived (ARCHITECTURE_REVIEW-hidden-flag.md: WAIVED with rationale; ARCHITECTURE.md INV-004 touched per acceptance)
- [x] Docs named in acceptance criteria touched (ARCHITECTURE.md overlay done)
- [x] Review wave passed, no Critical/High (readability + risk + refuter + qa 4/4 PASS, 0 findings)
- [x] REQ→test→artifact→verdict trace intact (TEST_MATRIX 6/6 → artifacts → GATE OPEN)

## REQ→test→artifact→verdict trace

REQ-001 → interface line + typecheck → `frame-ship.ts:242-247` → PASS | REQ-002 → grep 8 entry lines, montilla 0 → `frame-ship.ts:260-267` → PASS | REQ-003 → subagent-hidden grep 0 → untouched → PASS | REQ-004 → mirror types + dual conditional spread → `frame-ship.ts:344-345,376-377` → PASS | NF-001 → typecheck + diff scope → PASS | NF-002 → secret scan 0 → PASS → GATE OPEN → this HANDOFF.

## Risks / Assumptions

- Risk (explicit residual): host ignoring unknown `hidden` → roster not decluttered, harmless (no wedge). Owner: engineering.
- Assumption: host honors optional `hidden` on `config.agents`/`config.agent` entries; absent flag = host default (subagents hidden by default — hence untouched).

## Lesson capture

Small optional display flags ride conditional spread (`...(cond ? {k:v} : {})`) to keep absent-shape byte-identical — backward-compat without migration. Recall before next roster refactor.

## Next

`frame-ship:ship-release` — commit + release notes decision (version triple untouched v0.6.0; ship-release decides bump or docs-only). No cross-domain need; no waiver.
