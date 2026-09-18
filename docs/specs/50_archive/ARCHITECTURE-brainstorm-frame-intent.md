# Architecture Contract: brainstorm → frame-intent

**Owner:** engineering owner
**Version:** v1
**Last Updated:** 2026-09-16
**Domains-Touched:** [engineering, people]

## Overview

`frame-intent` stays chain entry (BRIEF + OKRs only, orchestrator-owned). Brainstorming rigor is folded in as classify-first elicitation with HARD-GATE: every initiative is classified, refined one question at a time, framed as 2–3 options, then approved section by section before reference-only handoff to `translate-to-spec`. No specs, code, or sideways invocations here.

## Components

| Component | Responsibility | Interface |
|-----------|---------------|-----------|
| SKILL.md §3 | Classify + ratchet + HARD-GATE + one-at-a-time + framings + decompose + sectioned approval + self-review | trigger: new initiative / OKRs / pivot |
| product-brief.md | Adds `Classification:`, `Framings-considered:`, `Approval:` fields | reference template |
| okr-template.md | Unchanged (OKRs still 2–4 per brief) | reference template |

## Data Flow

Initiator intent → Explore context → Classify (spike / bounded / architectural) + announce → One-at-a-time questions → 2–3 framings + recommendation → Sectioned BRIEF + per-section yes → Self-review (fix inline) → User reviews BRIEF file → Packet `SPEC/HARD/GATE/DOMAINS` → translate-to-spec.

## Invariants

- INV-001: No handoff without explicit user approval; approval scales down, never away.
- INV-002: Ratchet is one-way: hidden complexity upgrades spike→bounded→architectural; nothing downgrades mid-initiative.
- INV-003: Reference-only packets; frame-intent writes briefs, never specs or code.
- INV-004: Zero sideways invocations (no writing-plans, no visual-companion, no superpowers paths).

## Non-Functional Requirements

- Performance: n/a (docs-only)
- Availability: n/a
- Security: elicitation examples carry no secrets/PII; prompt checkpoints minimize PII, security owner to confirm on demand
