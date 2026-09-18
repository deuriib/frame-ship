# API Contract: Automation Lane (Singleton File-Contract)

**Owner:** espinoza (Senior Automation Consultant) - automation owner
**Date:** 2026-09-18

## Overview

No service API changes in this unit (docs-only). This file records the lane's file-contract and points to the service contract truth.

## Contract Truth

Service contracts: `docs/specs/10_design/API_CONTRACTS.md` (unchanged by this unit).

## Lane File-Contract (the singleton rule, enforced)

| Rule | Value |
|------|-------|
| Canonical set | `RELEASE_NOTES.md`, `ARCHITECTURE_REVIEW.md`, `DRILL.md`, `HANDOFF.md`, `IMPLEMENTATION_PLAN.md`, `PROPOSED_CHANGES.md`, `TEST_MATRIX.md`, `ARCHITECTURE.md`, `API_CONTRACT.md` |
| Casing | UPPER_SNAKE exactly |
| Missing | create |
| Present | update in place |
| Suffixing | never (`-<slug>`, `-<id>`, lowercase mirrors all forbidden) |
| Retired variants | move to `docs/specs/50_archive/` byte-identical, record source → archive path |
| Purge | forbidden |
| Lane scope | `40_workspace/automation/` only; other lanes via Cross-domain request to montilla |

## Consolidation Record

Created new — no prior variant; singleton slot established by SPEC-singleton-consolidation-automation (2026-09-18).
