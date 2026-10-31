---
name: research
description: Use when a task has high uncertainty, a novel domain, or a dependency on data not yet in hand.
---

# Research — Discovery & Data Gathering

*"Do things as if for God—that's why you work with excellence and dedication."*

## Overview

Perform focused discovery to reduce uncertainty before freezing strategic intent. This prevents 'discovery-bloat' in the BRIEF phase and reduces rework in specs.

## Chain Contract

- **Previous:** none (optional chain entry)
- **Next:** `frame-ship:frame-intent`

## Role Binding

Bound to the **orchestrator** or a designated **Research Specialist**. The goal is to produce evidence, not final decisions.

## Process

0. **Pre-flight load.** `skill(research)` loaded? Objective defined?
1. **Define Research Questions.** List the specific unknowns that block a confident BRIEF.
2. **Gather Evidence.** Use websearch, codebase exploration, and documentation reviews.
3. **Synthesize Findings.** Map evidence to the research questions.
4. **Produce Research Document.** Create a findings file in `docs/frame-ship/research/<slug>-findings.md`.
5. **Handoff.** Pass the findings to `frame-intent` to inform the BRIEF and OKRs.

## Deliverable

A findings document containing:
- Cited sources.
- Answers to open questions.
- Explicit links to the FRAME criteria it will inform.

## References

- `references/decision-aid.md` — When to research vs. when to waive.
