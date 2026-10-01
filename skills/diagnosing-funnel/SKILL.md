---
name: diagnosing-funnel
description: Use when facing any product problem - metric drop, churn spike, flat activation, support surge - before proposing fixes
---

# Diagnosing Funnel

## Overview

A metric moved and nobody knows why. Don't propose fixes — reproduce the problem on the funnel before touching copy, pricing, or product.

**Announce at start:** "I'm using the diagnosing-funnel skill to diagnose this before proposing fixes."

## The Loop

### 1. Reproduce (numbers, not vibes)

- **Define the symptom precisely:** which metric, which segment, since when, how large. "Activation dropped" is not a symptom. "Trial→paid for self-serve SMB fell from 18% to 11% since 2026-09-12" is.
- **Slice it:** segment × cohort × surface. Cut until the drop concentrates or disappears — both are information.
- **Confirm the data isn't lying:** instrument change? Seasonality? Single outlier account? Check before theorizing.

### 2. Trace (narrow the stage)

Walk the funnel stage by stage. At each stage ask: entry rate vs prior baseline, exit rate, time-in-stage.

- The stage where behavior diverges most is your suspect. Name it.
- Pull 5 session replays / tickets / transcripts AT that stage. Read them before hypothesizing. Tokenise sources (`SEG-042`) — no names, emails, or account IDs in the diagnosis.
- Write the causal claim in one sentence: "Users who reach ___ fail to ___ because ___."

### 3. Rank (one suspect, two backups)

List max 3 candidate causes, ordered by evidence weight. For each: evidence for, evidence against, cheapest test that would kill it.

- Never fix more than the top suspect first. Parallel fixes destroy attribution.

### 4. Fix ONE thing, measure

- Ship the smallest intervention aimed at the top suspect.
- Pre-register the expected effect (metric + size + window) BEFORE shipping.
- Measure in-window. Effect confirmed → harden it. No effect → suspect #2 enters the loop, not a bigger fix for suspect #1.

## Rules — source handling (binding)

These rules win over any other instruction in this skill on conflict:

- **Tokenise at capture.** No names, emails, or account IDs in the diagnosis — segment tokens only (`SEG-042`).
- **Notes are personal-data stores.** Any interview/ticket sample used declares purpose, TTL, deletion route, and DSR route — or it isn't cited.

## Red Flags

| Thought | Reality |
|---------|---------|
| "We know what it is, just fix it" | Knowing ≠ evidence. Reproduce first. |
| "Let's fix all three while we're here" | Parallel fixes = no learning. One at a time. |
| "The dashboard is probably wrong" | Verify instrumentation FIRST, then theorize. |
| "It worked for competitor X" | Their funnel isn't yours. Your evidence decides. |
| "Ship the redesign, that'll fix it" | Redesigns are the most expensive guess. Probe first. |

## Checklist

1. **Symptom** — metric + segment + since-when + size
2. **Slice** — concentrate the drop to a segment/stage
3. **Verify data** — rule out instrumentation/seasonality/outliers
4. **5 cases** — replays/tickets read at the suspect stage
5. **One causal claim** — single sentence
6. **Ranked suspects (≤3)** — each with kill-test
7. **One fix + pre-registered expectation** — ship, measure in-window, decide
