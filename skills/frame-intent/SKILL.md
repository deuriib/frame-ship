---
name: frame-intent
description: Convert CEO/COO strategic direction into a structured Product Brief and OKR set. Use when a new initiative starts, quarterly planning begins, or a strategic pivot is considered. Triggered by "start a new initiative", "define OKRs", or "strategic planning".
---

# Frame-Intent — Strategic Intent to Product Brief

> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

## 1. Purpose

Elicit strategic intent and freeze it into a Product Brief + OKRs before any
domain work starts. No specs, no code, no budgets committed here.

## 2. Chain Contract

- Previous: none (chain entry for this pack)
- Next: translate-to-spec

```text
frame-intent → translate-to-spec → propose-changes → review-* → execute-spec
  → quality-gate → verify-handoff → ship-release
```

## 2b. Role Binding (Org)

- **Bound to:** `montilla` (CEO) — classifies intent and owns the brief.
- C-levels do NOT write briefs; they receive them via reference.

## 3. Process

0. Pre-flight LOAD — HARD STOP (single AND multi): `skill(frame-intent)` loaded? `read(agents/c-level/montilla.md)` done? `execution_mode` about to be frozen? Any NO → STOP, load first. FAIL → retry N=2 → escalate. Output cites skill + template path.
1. Ask the initiator: What problem? Who is affected? What does success look like?
2. Ask execution mode once per initiative: `single` (direct, no `task`, one specialist + min gate, small fully-specified units) or `multi-subagents` (default, `task(subagent_type="general")` max 2 parallel + full review wave). Freeze as `execution_mode` in brief; all specs follow it unless overridden per SPEC with CEO waiver.
3. Produce `docs/briefs/BRIEF-<slug>.md` using `references/product-brief.md` with `Domains-touched` declared from the 8-domain catalogue.
4. Define 2–4 OKRs using `references/okr-template.md`.
5. Identify required C-levels (vasquez-engineering, barrera-security, dauhajre-finance, subero-legal, vera-marketing, santana-people, montero-revenue, espinoza-automation per `../AGENTS.md` catalogue) and flag cross-cutting concerns (data lens where schema/PII involved). Read the ONE dispatched C-level template fully; cite other `agents/<domain>/<agent>.md` craft by path, never paste other bodies.
6. Hand off the brief reference to `translate-to-spec` as `SPEC:<brief-path>#OKRs / HARD:<execution_mode+constraints> / GATE:<none-yet> / DOMAINS:<list>`.

## 4. What I won't do

- Write implementation specs (→ `translate-to-spec`).
- Allocate budgets without `dauhajre` (CFO).
- Commit to timelines without `vasquez` (CTO) feasibility input.

## 5. References

- `references/product-brief.md` — Product Brief template (includes `execution_mode`).
- `references/okr-template.md` — OKR template.
- `../../agents/README.md` — Vendored agent templates index (reference-only craft).
