---
name: frame-intent
description: Convert strategic direction into a structured Product Brief and OKR set. Use when a new initiative starts, quarterly planning begins, or a strategic pivot is considered. Triggered by "start a new initiative", "define OKRs", or "strategic planning".
---

# Frame-Intent — Strategic Intent to Product Brief

> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

## 1. Purpose

Elicit strategic intent and freeze it into a Product Brief + OKRs before any
domain work starts. No specs, no code, no budgets committed here.

## 2. Chain Contract

- Previous: none (chain entry for this pack)
- Next: frame-ship:translate-to-spec

```text
frame-ship:frame-intent → frame-ship:translate-to-spec → frame-ship:propose-changes → frame-ship:review-security / frame-ship:review-architecture → frame-ship:execute-spec
  → frame-ship:quality-gate → frame-ship:verify-handoff → frame-ship:ship-release
```

## 2b. Role Binding (Org)

- **Bound to:** Orchestrator — classifies strategic intent and owns the brief.
- Domain owners do NOT write briefs; they receive them via reference.

## 3. Process

0. Pre-flight LOAD — HARD STOP (single AND multi): `skill(frame-intent)` loaded? Agent template read (dispatcher resolves which)? `execution_mode` about to be frozen? Any NO → STOP, load first. FAIL → retry N=2 → escalate. Output cites skill + template path.
1. Ask the initiator: What problem? Who is affected? What does success look like?
2. Ask execution mode once per initiative: `single` (direct, no `task`, one specialist + min gate, small fully-specified units) or `multi-subagents` (default, `task(subagent_type="general")` max 2 parallel + full review wave). Freeze as `execution_mode` in brief; all specs follow it unless overridden per SPEC with orchestrator waiver.
3. Produce `docs/briefs/BRIEF-<slug>.md` using `references/product-brief.md` with `Domains-touched` declared from the 8-domain catalogue.
4. Define 2–4 OKRs using `references/okr-template.md`.
5. Identify required domain owners (engineering, security, finance, legal, marketing, people, revenue, automation — 8-domain catalogue in `../AGENTS.md`) and flag cross-cutting concerns (data lens where schema/PII involved). Read the ONE dispatched domain owner template fully; cite other `agents/<domain>/<agent>.md` craft by path, never paste other bodies.
6. Hand off the brief reference to `frame-ship:translate-to-spec` as `SPEC:<brief-path>#OKRs / HARD:<execution_mode+constraints> / GATE:<none-yet> / DOMAINS:<list>`.
7. Close with work-unit commit per `../using-frame-ship/references/commit-convention.md` (guidance only). Example: `docs(brief-auth): add BRIEF-auth with OKRs and domains-touched`.

## 4. What I won't do

- Write implementation specs (→ `frame-ship:translate-to-spec`).
- Allocate budgets without finance domain owner approval.
- Commit to timelines without engineering domain owner feasibility input.

## 5. References

- `references/product-brief.md` — Product Brief template (includes `execution_mode`).
- `references/okr-template.md` — OKR template.
- `../using-frame-ship/references/commit-convention.md` — Commit format + per-stage examples (guidance only; see `frame-ship:using-frame-ship`).
