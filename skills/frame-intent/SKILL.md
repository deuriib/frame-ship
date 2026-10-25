---
name: frame-intent
description: Use when a new initiative starts, quarterly planning begins, or a strategic pivot is considered.
---

# Frame Intent — Strategic Intent to Product Brief

*"Do things as if for God—that's why you work with excellence and dedication."*

## Overview

Elicit strategic intent and freeze it into a Product Brief + OKRs before any domain work starts. No specs, no code, no budgets committed here.

## Chain Contract

- **Previous:** none (chain entry for this pack)
- **Next:** `frame-ship:translate-to-spec`

## Role Binding

Bound to the **orchestrator**—classifies strategic intent and owns the brief. Domain owners do NOT write briefs; they receive them via reference.

## Process

0. **Pre-flight load — HARD STOP (subagents).** `skill(frame-intent)` loaded? Domain ownership identified? `execution_mode` about to be frozen? Any NO → STOP. FAIL → retry N=2 → escalate.
1. **Explore context first**—files, docs, recent commits, plus any sideways/external skills that assist discovery, planning, or decomposition. If the request spans multiple independent subsystems, flag it immediately and decompose into sub-initiatives (own BRIEF→SPEC cycle each); brainstorm the first through the normal flow.
2. **Classify first, announce, allow override.** Ratchet is one-way: hidden complexity upgrades the path. When in doubt, take the heavier path.
   - `spike-equivalent` — feasibility question; output is an answer, not a brief. Probe in 2–3 sentences, nod, recommendation. Throwaway labeled.
   - `bounded-initiative` — well-scoped intent with existing flow. Short BRIEF in chat, STOP for explicit yes. No file.
   - `architectural-initiative` — new direction/subsystem/restructure. Full flow + BRIEF file.
3. **Freeze execution as subagents only** (no mode question). Trivial <15-line reversible work is CEO fast-path, outside methodology. Freeze as `execution_mode` in brief; all specs follow unless overridden per SPEC with orchestrator waiver.
4. **Elicit one question at a time**—multiple-choice preferred, open-ended fine. Purpose, constraints, success criteria. One question per message.
5. **Propose 2–3 framings** with trade-offs—lead with recommendation and why. YAGNI ruthlessly.
6. **Present the BRIEF in sections** scaled to complexity; ask after each section. Cover problem, outcome, scope, stakeholders, constraints.
7. **Produce `docs/briefs/BRIEF-<slug>.md`** via `references/product-brief.md` with `Classification:`, `Framings-considered:`, `Approval:`, and `Domains-touched` from the 8-domain catalogue.
8. **Define 3–7 OKRs** via `references/okr-template.md`.
9. **Self-review the BRIEF** with fresh eyes—placeholder scan, internal consistency, scope check, ambiguity check. Fix inline, no re-review loop.
10. **User reviews before handoff.** Wait for explicit yes. HARD-GATE: ceremony scales with size; the approval itself never does.
11. **Identify required domain owners** (8-domain catalogue in `../AGENTS.md`) and flag cross-cutting concerns.
12. **Hand off** to `translate-to-spec` as `SPEC:<brief-path>#OKRs / HARD:<execution_mode+constraints> / GATE:<none-yet> / DOMAINS:<list>`.
13. **Close with a commit.** Example: `docs(brief-auth): add BRIEF-auth with OKRs and domains-touched`.

### C1 — Classification-Scaled Challenger (opt-in, REQ-001)

- Mechanics: `../using-frame-ship/references/challenge-round.md` — never redefined here.
- Budget: spike 1 question / bounded cap 3 / architectural cap 5.
- Falsifiable-bet: "what evidence would kill each framing?" recorded in `Framings-Considered`. Outcome: `grill: accepted|declined|exited|stalled`.

## What I Won't Do

- Write implementation specs (→ `translate-to-spec`).
- Bypass `translate-to-spec` for the core chain handoff—sideways/external skills are welcomed but the final brief handoff always targets `translate-to-spec` via reference-only packet.
- Approve my own brief or skip the HARD-GATE for any classification.
- Allocate budgets without finance domain owner approval.
- Commit to timelines without engineering domain owner feasibility input.

## Red Flags

| Thought | Reality |
|---|---|
| "Too simple to need a brief" | Simple = short brief in chat, not no brief. Two sentences, then approval. |
| "I'll call it bounded to skip the file" | Reaching for a label to skip work IS the doubt—take the heavier path. |
| "The design is obvious—start while they read" | The gate is the approval, not the length. Present, then stop until yes. |
| "They approved the probe, so the follow-up is approved" | Each initiative gets its own classification and its own approval. |
| "It grew, but almost done—no re-classify" | Hidden complexity upgrades the path. Stop and say so. |

## References

- `references/product-brief.md` — Product Brief template (includes `execution_mode`).
- `references/okr-template.md` — OKR template.