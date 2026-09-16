# Architecture Contract: debugging

**Owner:** engineering owner
**Version:** v1
**Last Updated:** 2026-09-16
**Domains-Touched:** [engineering, automation/ops]

## Overview

`debugging` is a pre-proposal diagnostic skill. It runs before `propose-changes`/`execute-spec` on any bug, produces root-cause evidence + single hypothesis, and hands off via reference-only packets. It writes no code and approves nothing.

## Components

| Component | Responsibility | Interface |
|-----------|---------------|-----------|
| SKILL.md | Iron Law + 4-phase gates + red flags + escalation | trigger: bug/failure before fixes |
| root-cause-tracing.md | Backward trace technique | reference |
| defense-in-depth.md | Post-fix layered validation | reference |
| condition-based-waiting.md | Condition polling over sleep | reference |

## Data Flow

Bug report → Phase-1 evidence (errors/repro/diff/boundary logs/trace) → Phase-2 pattern diff → Phase-3 single hypothesis + minimal test → Phase-4 failing test → PROPOSED_CHANGES → chain (review→execute→gate→handoff→ship).

## Invariants

- INV-001: No fix proposed without completed Phase-1 evidence.
- INV-002: One hypothesis / one change at a time; no bundled fixes.
- INV-003: ≥3 failed fixes → architecture question + human escalation, never silent Fix #4.
- INV-004: Reference-only packets; debugging never edits impl files directly.

## Non-Functional Requirements

- Performance: n/a (docs-only)
- Availability: n/a
- Security: examples carry no secrets/PII; evidence logging least-privilege, security owner to confirm
