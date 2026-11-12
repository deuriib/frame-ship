---
name: research
description: Use when a task has high uncertainty, a novel domain, or a dependency on data not yet in hand.
---

# Research — Discovery & Data Gathering

*"Do things as if for God—that's why you work with excellence and dedication."*

## Overview

Perform focused discovery to reduce uncertainty before freezing strategic intent. Ends in a **GO / NO-GO / PIVOT** verdict against named thresholds — the cheapest kill point in the chain, before a brief is ever written.

## Chain Contract

- **Previous:** none (optional chain entry)
- **Next:** `frame-ship:frame-intent` (on GO) | stop / re-scope (on NO-GO / PIVOT)

## Role Binding

Bound to the **orchestrator** or a designated **Research Specialist**. The goal is evidence + a verdict, not a decision — a **named human** owns GO/NO-GO/PIVOT when it commits budget or scope.

## Process

0. **Pre-flight load** (contract: `../using-frame-ship/references/pre-flight.md`). `skill(research)` loaded? Objective defined? Decision owner named?
1. **Define Research Questions.** List the specific unknowns that block a confident BRIEF.
2. **Gather Evidence.** Websearch, codebase exploration, documentation review. Every claim carries a source a second person can open.
3. **Synthesize Findings.** Map evidence to the questions; label each claim `evidenced / weak / contradicted / unknown`.
4. **Produce `RESEARCH_FINDINGS`.** `docs/frame-ship/research/<slug>-findings.md` with the claim register + verdict.
5. **Issue the verdict.** `GO / NO-GO / PIVOT` against the thresholds in `references/decision-aid.md`. NO-GO is a normal, non-punished outcome.
6. **Handoff.** GO → `frame-intent` (findings inform BRIEF + OKRs). NO-GO/PIVOT → stop or re-scope with the named owner.

## Deliverable

- `RESEARCH_FINDINGS` — claim register (every claim labelled, each `evidenced` row carrying a source a second person can open).
- A `GO / NO-GO / PIVOT` verdict with the named decision owner.

## What I Won't Do

- Proceed to `frame-intent` on a NO-GO, or treat silence as approval.
- Issue a verdict that commits budget or scope without a named human owner.

## References

- `references/decision-aid.md` — When to research vs. waive + the verdict thresholds.
