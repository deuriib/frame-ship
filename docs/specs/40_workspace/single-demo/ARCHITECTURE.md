# Architecture: Single-Demo Lane (Index - Not a Fork)

**Owner:** general (administrative owner, single-demo lane)
**Date:** 2026-09-18
**Skill:** `D:\GitHub\frame-ship\skills\execute-spec\SKILL.md` (single mode, direct)

## Overview

Lane-level index. Design truth lives in the numbered store; this file links it and records lane invariants. It forks nothing.

## Components

| Component | Responsibility | Interface |
|-----------|---------------|-----------|
| Numbered-store truth | Canonical contracts | `docs/specs/10_design/ARCHITECTURE.md`, `docs/specs/10_design/API_CONTRACTS.md` |
| Lane canonicals (9) | Singleton working set | This directory: `RELEASE_NOTES.md`, `ARCHITECTURE_REVIEW.md`, `DRILL.md`, `HANDOFF.md`, `IMPLEMENTATION_PLAN.md`, `PROPOSED_CHANGES.md`, `TEST_MATRIX.md`, `ARCHITECTURE.md` (this file), `API_CONTRACT.md` |
| Archive | Closed history, read-only | `docs/specs/50_archive/{RELEASE_NOTES-demo-single-demo,implementation-plan-single-demo,test-matrix-single-demo}.md` (this unit's moved originals) |
| Requirements | REQ index for this unit | `docs/specs/15_requirements/REQ-singleton-consolidation-single-demo.md` |
| Demo trace (out-of-scope class, untouched) | Prior docs-fix chain | `SPEC-single-demo-docs-fix.md`, `SECURITY_REVIEW.md`, `GATE_REPORT.md`, `quality-gate/` |

## Invariants

- INV-001: Max one file per singleton type per lane — create if missing, update in place, never suffix, UPPER_SNAKE canonical.
- INV-002: No purge — consolidation is copy → hash-verify → delete-original into `50_archive/`.
- INV-003: Lane files link numbered-store truth; they never fork it. Docs-fix demo substance stays referenced by path.
- INV-004: Per-lane scope — other lanes belong to their owners (Cross-domain request via montilla).

## Non-Functional Requirements

- Performance: n/a (docs). Availability: n/a. Security: prohibition-only content (Guardrails 1-4); no PII (Ley 172-13 minimization).

## Consolidation Record

Created new — no prior variant; singleton slot established by SPEC-singleton-consolidation-single-demo (2026-09-18).
