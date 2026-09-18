# Architecture: Automation Lane (Index - Not a Fork)

**Owner:** espinoza (Senior Automation Consultant) - automation owner
**Date:** 2026-09-18

## Overview

Lane-level index. Design truth lives in the numbered store; this file links it and records lane invariants. It forks nothing.

## Components

| Component | Responsibility | Interface |
|-----------|---------------|-----------|
| Numbered-store truth | Canonical contracts | `docs/specs/10_design/ARCHITECTURE.md`, `docs/specs/10_design/API_CONTRACTS.md` |
| Lane canonicals (9) | Singleton working set | This directory: `RELEASE_NOTES.md`, `ARCHITECTURE_REVIEW.md`, `DRILL.md`, `HANDOFF.md`, `IMPLEMENTATION_PLAN.md`, `PROPOSED_CHANGES.md`, `TEST_MATRIX.md`, `ARCHITECTURE.md` (this file), `API_CONTRACT.md` |
| Archive | Closed history, read-only | `docs/specs/50_archive/HANDOFF-git-worktree-automation.md` (this unit's moved original) |
| Requirements | REQ index for this unit | `docs/specs/15_requirements/REQ-singleton-consolidation-automation.md` |

## Invariants

- INV-001: Max one file per singleton type per lane — create if missing, update in place, never suffix, UPPER_SNAKE canonical.
- INV-002: No purge — consolidation is copy → hash-verify → delete-original into `50_archive/`.
- INV-003: Lane files link numbered-store truth; they never fork it. Ops runbook substance stays at `skills/git-worktree/references/pwsh-flow.md`, referenced by path.
- INV-004: Per-lane scope — other lanes belong to their owners (Cross-domain request via montilla).

## Non-Functional Requirements

- Performance: n/a (docs). Availability: n/a. Security: prohibition-only content (Guardrails 1-4); no PII (Ley 172-13 minimization).

## Consolidation Record

Created new — no prior variant; singleton slot established by SPEC-singleton-consolidation-automation (2026-09-18).
